package eu.remk.coaching

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.graphics.Color
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.VibrationEffect
import android.os.Vibrator
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.view.KeyEvent
import android.view.View
import android.view.WindowManager
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.RemoteInput
import androidx.core.content.ContextCompat
import org.json.JSONArray
import org.json.JSONObject
import android.os.Environment
import android.util.Base64
import androidx.core.content.FileProvider
import java.io.File
import java.util.Locale

/**
 * RE:MK Coaching – Native Android App Engine v25.1 (Kotlin)
 * 1. Zero-Jank / Zero-Flicker Engine (#121212 Hardware-Layer + Instant Widget Deep-Switch)
 * 2. Echtzeit Hardware-Schrittzähler (Sensor.TYPE_STEP_COUNTER)
 * 3. Nativer Sprach-Coach (mit striktem Mute-Lock) + Automatisches Spotify/Musik Audio-Ducking
 * 4. 4 Interaktive Android Homescreen-Widgets mit JSON-Warteschlange & 10ms Direkt-Reaktion
 * 5. Smartwatch- & Sperrbildschirm-Cockpit mit Touch-Button ("✓ 80kg × 10") & Vorauswahl-Zahnrad ("⚙️ Ändern")
 * 6. Show-When-Locked Gym-Modus (Bedienung auf dem Sperrbildschirm ohne ständiges Entsperren)
 */
class MainActivity : AppCompatActivity(), SensorEventListener, TextToSpeech.OnInitListener {

    private lateinit var webView: WebView
    private var isWebViewLoaded: Boolean = false
    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null
    private val FILE_CHOOSER_RESULT_CODE = 1001
    private val PERMISSION_REQUEST_CODE = 2002
    val CREATE_DOCUMENT_REQUEST_CODE = 3003
    var pendingExportBytes: ByteArray? = null
    var pendingExportMimeType: String = "application/json"
    var pendingExportIsBackup: Boolean = false

    private var sensorManager: SensorManager? = null
    private var stepSensor: Sensor? = null
    private var ttsEngine: TextToSpeech? = null
    private var isTtsReady: Boolean = false

    private var audioManager: AudioManager? = null
    private var audioFocusRequest: AudioFocusRequest? = null

    private val watchCommandReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == RemkWidgetProvider.ACTION_EXECUTE_WATCH_COMMAND) {
                syncWaterFromWidgetIfPending()
                processPendingWatchAndLockscreenCommands()
            }
        }
    }

    companion object {
        const val WATCH_CHANNEL_ID = "remk_smartwatch_rest_channel_v251"
        const val LOCKSCREEN_COCKPIT_CHANNEL_ID = "remk_lockscreen_cockpit_channel_v267"
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        applyLockscreenGymMode(true)

        try {
            val darkBg = Color.parseColor("#121212")
            window.decorView.setBackgroundColor(darkBg)
            window.statusBarColor = darkBg
            window.navigationBarColor = darkBg
        } catch (e: Exception) {}

        audioManager = getSystemService(Context.AUDIO_SERVICE) as? AudioManager
        RemkWidgetProvider.ensureDailyWaterReset(this)
        createSmartwatchAndLockscreenChannels()
        requestEssentialRuntimePermissions()
        initHardwareStepCounter()
        initTextToSpeechEngine()
        registerWatchCommandReceiver()

        webView = WebView(this)
        webView.setBackgroundColor(Color.parseColor("#121212"))
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        webView.overScrollMode = View.OVER_SCROLL_NEVER
        setContentView(webView)

        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.setGeolocationEnabled(true)
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.allowFileAccessFromFileURLs = true
        settings.allowUniversalAccessFromFileURLs = true
        settings.mediaPlaybackRequiresUserGesture = false
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(webView, true)

        webView.addJavascriptInterface(RemkNativeBridge(this), "RemkAndroidBridge")

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                if (url.startsWith("file://") ||
                    url.contains("script.google.com") ||
                    url.contains("openfoodfacts.org") ||
                    url.contains("openstreetmap.org")
                ) {
                    return false
                }
                return try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    startActivity(intent)
                    true
                } catch (e: Exception) {
                    false
                }
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                isWebViewLoaded = true
                CookieManager.getInstance().flush()
                pushSavedHardwareStepsToWebView()
                syncWaterFromWidgetIfPending()
                processPendingWatchAndLockscreenCommands()
                handleWidgetLaunchIntent(intent)
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: PermissionRequest?) {
                request?.grant(request.resources)
            }

            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                callback?.invoke(origin, true, false)
            }

            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                fileUploadCallback?.onReceiveValue(null)
                fileUploadCallback = filePathCallback
                return try {
                    val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = "*/*"
                    }
                    startActivityForResult(intent, FILE_CHOOSER_RESULT_CODE)
                    true
                } catch (e: Exception) {
                    fileUploadCallback = null
                    false
                }
            }
        }

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
            isWebViewLoaded = true
        } else {
            webView.loadUrl("file:///android_asset/index.html")
        }
    }

    fun applyLockscreenGymMode(enabled: Boolean) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
                setShowWhenLocked(enabled)
                setTurnScreenOn(enabled)
            } else {
                @Suppress("DEPRECATION")
                if (enabled) {
                    window.addFlags(
                        WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                        WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                    )
                } else {
                    window.clearFlags(
                        WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                        WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                    )
                }
            }
        } catch (e: Exception) {}
    }

    private fun registerWatchCommandReceiver() {
        try {
            val filter = IntentFilter(RemkWidgetProvider.ACTION_EXECUTE_WATCH_COMMAND)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                registerReceiver(watchCommandReceiver, filter, Context.RECEIVER_NOT_EXPORTED)
            } else {
                registerReceiver(watchCommandReceiver, filter)
            }
        } catch (e: Exception) {}
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
        if (isWebViewLoaded) {
            syncWaterFromWidgetIfPending()
            pushSavedHardwareStepsToWebView()
            processPendingWatchAndLockscreenCommands()
            handleWidgetLaunchIntent(intent)
        }
    }

    override fun onStart() {
        super.onStart()
        val gymLock = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE).getBoolean("lockscreen_gym_mode_v25", true)
        applyLockscreenGymMode(gymLock)
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            val gymLock = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE).getBoolean("lockscreen_gym_mode_v25", true)
            applyLockscreenGymMode(gymLock)
        }
    }

    override fun onResume() {
        super.onResume()
        val gymLock = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE).getBoolean("lockscreen_gym_mode_v25", true)
        applyLockscreenGymMode(gymLock)
        RemkWidgetProvider.ensureDailyWaterReset(this)
        if (isWebViewLoaded) {
            syncWaterFromWidgetIfPending()
            pushSavedHardwareStepsToWebView()
            processPendingWatchAndLockscreenCommands()
        }
    }

    private fun initTextToSpeechEngine() {
        try {
            ttsEngine = TextToSpeech(this, this)
        } catch (e: Exception) {}
    }

    private var duckReleaseRunnable: Runnable? = null
    private val duckHandler = Handler(Looper.getMainLooper())

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            try {
                val res = ttsEngine?.setLanguage(Locale.GERMANY)
                isTtsReady = (res != TextToSpeech.LANG_MISSING_DATA && res != TextToSpeech.LANG_NOT_SUPPORTED)
                if (!isTtsReady) {
                    ttsEngine?.setLanguage(Locale.GERMAN)
                    isTtsReady = true
                }
                ttsEngine?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                    override fun onStart(utteranceId: String?) {}
                    override fun onDone(utteranceId: String?) {
                        abandonAudioDuckingAfterSpeech()
                    }
                    @Deprecated("Deprecated in Java")
                    override fun onError(utteranceId: String?) {
                        abandonAudioDuckingAfterSpeech()
                    }
                })
            } catch (e: Exception) {}
        }
    }

    private fun requestAudioDuckingForSpeech(estimatedMs: Long = 3200L) {
        try {
            val am = audioManager ?: return
            abandonAudioDuckingAfterSpeech()
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val attrs = AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ASSISTANCE_NAVIGATION_GUIDANCE)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                    .build()
                val req = AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
                    .setAudioAttributes(attrs)
                    .setAcceptsDelayedFocusGain(false)
                    .setOnAudioFocusChangeListener {}
                    .build()
                audioFocusRequest = req
                am.requestAudioFocus(req)
            } else {
                @Suppress("DEPRECATION")
                am.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
            }
            val r = Runnable { abandonAudioDuckingAfterSpeech() }
            duckReleaseRunnable = r
            duckHandler.postDelayed(r, estimatedMs)
        } catch (e: Exception) {}
    }

    private fun abandonAudioDuckingAfterSpeech() {
        try {
            duckReleaseRunnable?.let { duckHandler.removeCallbacks(it) }
            duckReleaseRunnable = null
            val am = audioManager ?: return
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                audioFocusRequest?.let {
                    am.abandonAudioFocusRequest(it)
                    audioFocusRequest = null
                }
            } else {
                @Suppress("DEPRECATION")
                am.abandonAudioFocus(null)
            }
        } catch (e: Exception) {}
    }

    fun stopNativeCoachSpeech() {
        try {
            ttsEngine?.stop()
            abandonAudioDuckingAfterSpeech()
        } catch (e: Exception) {}
    }

    fun speakNativeCoachText(text: String, pitch: Float, rate: Float) {
        try {
            val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            if (prefs.getBoolean("coach_muted_v251", false)) {
                stopNativeCoachSpeech()
                return
            }
            if (isTtsReady && ttsEngine != null && text.isNotBlank()) {
                val estDurationMs = ((text.length * 65L) + 1100L).coerceIn(2000L, 6200L)
                requestAudioDuckingForSpeech(estDurationMs)
                ttsEngine?.setPitch(pitch.coerceIn(0.6f, 1.6f))
                ttsEngine?.setSpeechRate(rate.coerceIn(0.7f, 1.6f))
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    ttsEngine?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "remk_coach_${System.currentTimeMillis()}")
                } else {
                    @Suppress("DEPRECATION")
                    ttsEngine?.speak(text, TextToSpeech.QUEUE_FLUSH, null)
                }
            }
        } catch (e: Exception) {}
    }

    private fun pushSavedHardwareStepsToWebView() {
        try {
            val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val todayKey = "step_baseline_" + java.text.SimpleDateFormat("yyyyMMdd", Locale.GERMANY).format(java.util.Date())
            if (!prefs.contains(todayKey)) {
                prefs.edit().putInt("steps_today", 0).apply()
            }
            val todaySteps = prefs.getInt("steps_today", 0).coerceAtLeast(0)
            webView.post {
                webView.evaluateJavascript(
                    "if(typeof window.onNativeAndroidStepsUpdated==='function') window.onNativeAndroidStepsUpdated($todaySteps);",
                    null
                )
            }
        } catch (e: Exception) {}
    }

    private fun syncWaterFromWidgetIfPending() {
        try {
            val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val pendingWaterAddMl = prefs.getInt("pending_widget_water_add_ml", 0)
            if (pendingWaterAddMl > 0) {
                prefs.edit().putInt("pending_widget_water_add_ml", 0).apply()
                webView.post {
                    webView.evaluateJavascript(
                        "if(typeof window.addWaterFromNativeWidgetV247==='function') window.addWaterFromNativeWidgetV247($pendingWaterAddMl);",
                        null
                    )
                }
            }
        } catch (e: Exception) {}
    }

    fun processPendingWatchAndLockscreenCommands() {
        try {
            if (!isWebViewLoaded) return
            val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val rawQueue = prefs.getString("pending_commands_queue_v251", "[]") ?: "[]"
            val arr = try { JSONArray(rawQueue) } catch (e: Exception) { JSONArray() }
            if (arr.length() > 0) {
                prefs.edit()
                    .putString("pending_commands_queue_v251", "[]")
                    .remove("pending_watch_cmd")
                    .remove("pending_watch_payload")
                    .apply()
                for (i in 0 until arr.length()) {
                    val obj = arr.optJSONObject(i) ?: continue
                    val cmd = obj.optString("cmd", "")
                    val payload = obj.optString("payload", "")
                        .replace("\\", "\\\\")
                        .replace("'", "\\'")
                        .replace("\n", " ")
                    if (cmd.isNotEmpty()) {
                        webView.post {
                            webView.evaluateJavascript(
                                "if(typeof window.onNativeWatchCommandReceivedV250==='function') window.onNativeWatchCommandReceivedV250('$cmd', '$payload');",
                                null
                            )
                        }
                    }
                }
                return
            }

            val singleCmd = prefs.getString("pending_watch_cmd", "") ?: ""
            if (singleCmd.isNotEmpty()) {
                val payload = (prefs.getString("pending_watch_payload", "") ?: "")
                    .replace("\\", "\\\\")
                    .replace("'", "\\'")
                    .replace("\n", " ")
                prefs.edit()
                    .remove("pending_watch_cmd")
                    .remove("pending_watch_payload")
                    .apply()
                webView.post {
                    webView.evaluateJavascript(
                        "if(typeof window.onNativeWatchCommandReceivedV250==='function') window.onNativeWatchCommandReceivedV250('$singleCmd', '$payload');",
                        null
                    )
                }
            }
        } catch (e: Exception) {}
    }

    private fun handleWidgetLaunchIntent(intent: Intent?) {
        if (intent == null) return
        val widgetMode = intent.getStringExtra("remk_widget_mode") ?: intent.data?.getQueryParameter("widget") ?: return
        val sportSubMode = intent.getStringExtra("remk_sport_mode") ?: intent.data?.getQueryParameter("sport") ?: ""

        intent.removeExtra("remk_widget_mode")
        intent.removeExtra("remk_sport_mode")
        if (intent.data != null) {
            intent.data = null
        }

        if (widgetMode.isNotEmpty()) {
            val jsCall = "window.__pendingNativeWidgetMode='$widgetMode'; window.__pendingNativeSportMode='$sportSubMode'; " +
                "if(typeof window.launchFromNativeWidgetV266==='function') { window.launchFromNativeWidgetV266('$widgetMode', '$sportSubMode'); } " +
                "else if(typeof window.launchFromNativeWidgetV247==='function') { window.launchFromNativeWidgetV247('$widgetMode', '$sportSubMode'); }"
            webView.post { webView.evaluateJavascript(jsCall, null) }
            webView.postDelayed({ webView.evaluateJavascript(jsCall, null) }, 380L)
            webView.postDelayed({ webView.evaluateJavascript(jsCall, null) }, 850L)
        }
    }

    private fun createSmartwatchAndLockscreenChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            val watchChannel = NotificationChannel(
                WATCH_CHANNEL_ID,
                "RE:MK Smartwatch & Pausen-Timer (Mit Touch-Button & Vorauswahl)",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Sendet Pausen-Timer, 1-Tap Satz-Button & Vorauswahl-Zahnrad auf Smartwatch und Sperrbildschirm"
                enableVibration(true)
                vibrationPattern = longArrayOf(0, 250, 100, 250, 100, 350)
                lockscreenVisibility = android.app.Notification.VISIBILITY_PUBLIC
            }
            nm.createNotificationChannel(watchChannel)

            val lockChannel = NotificationChannel(
                LOCKSCREEN_COCKPIT_CHANNEL_ID,
                "RE:MK Sperrbildschirm Live-Cockpit (Neben Spotify)",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Zeigt aktuelle Übung, Zielgewicht, Satz-Button und Zahnrad direkt auf dem Sperrbildschirm"
                setShowBadge(false)
                setSound(null, null)
                enableVibration(false)
                lockscreenVisibility = android.app.Notification.VISIBILITY_PUBLIC
            }
            nm.createNotificationChannel(lockChannel)
        }
    }

    private fun requestEssentialRuntimePermissions() {
        val perms = mutableListOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            perms.add(Manifest.permission.BLUETOOTH_CONNECT)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            perms.add(Manifest.permission.POST_NOTIFICATIONS)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            perms.add(Manifest.permission.ACTIVITY_RECOGNITION)
        }
        val missing = perms.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }
        if (missing.isNotEmpty()) {
            ActivityCompat.requestPermissions(this, missing.toTypedArray(), PERMISSION_REQUEST_CODE)
        }
    }

    private fun initHardwareStepCounter() {
        try {
            sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
            stepSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)
            stepSensor?.let {
                sensorManager?.registerListener(this, it, SensorManager.SENSOR_DELAY_UI)
            }
        } catch (e: Exception) {}
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event?.sensor?.type == Sensor.TYPE_STEP_COUNTER) {
            val totalBootSteps = event.values[0].toInt()
            val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val todayKey = "step_baseline_" + java.text.SimpleDateFormat("yyyyMMdd", Locale.GERMANY).format(java.util.Date())
            prefs.edit().putInt("last_raw_boot_steps", totalBootSteps).apply()
            var baseline = prefs.getInt(todayKey, -1)
            val savedManualFloor = prefs.getInt("steps_today", 0).coerceAtLeast(0)
            if (baseline < 0 || totalBootSteps < baseline) {
                baseline = (totalBootSteps - savedManualFloor).coerceAtLeast(0)
                prefs.edit().putInt(todayKey, baseline).apply()
            }
            val todaySteps = (totalBootSteps - baseline).coerceAtLeast(savedManualFloor)
            prefs.edit()
                .putInt("steps_today", todaySteps)
                .putString("widget_steps", todaySteps.toString())
                .apply()

            RemkWidgetProvider.broadcastUpdateAllWidgets(this)

            if (isWebViewLoaded) {
                webView.post {
                    webView.evaluateJavascript(
                        "if(typeof window.onNativeAndroidStepsUpdated==='function') window.onNativeAndroidStepsUpdated($todaySteps);",
                        null
                    )
                }
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onPause() {
        super.onPause()
        try {
            if (isWebViewLoaded) {
                webView.evaluateJavascript("if(typeof window.saveFormState==='function') window.saveFormState();", null)
            }
            CookieManager.getInstance().flush()
        } catch (e: Exception) {}
    }

    override fun onDestroy() {
        try {
            unregisterReceiver(watchCommandReceiver)
        } catch (e: Exception) {}
        try {
            abandonAudioDuckingAfterSpeech()
            ttsEngine?.stop()
            ttsEngine?.shutdown()
        } catch (e: Exception) {}
        super.onDestroy()
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            webView.evaluateJavascript(
                "(function(){ " +
                "  if (typeof window.navigateBackOneLevelV231 === 'function' && window.navigateBackOneLevelV231()) { " +
                "    return 'HANDLED'; " +
                "  } " +
                "  return 'DEFAULT'; " +
                "})();"
            ) { result ->
                if (result != null && result.contains("DEFAULT")) {
                    if (webView.canGoBack()) {
                        webView.goBack()
                    } else {
                        moveTaskToBack(true)
                    }
                }
            }
            return true
        }
        return super.onKeyDown(keyCode, event)
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == FILE_CHOOSER_RESULT_CODE) {
            val results = if (resultCode == Activity.RESULT_OK && data?.data != null) {
                arrayOf(data.data!!)
            } else null
            fileUploadCallback?.onReceiveValue(results)
            fileUploadCallback = null
        } else if (requestCode == CREATE_DOCUMENT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data?.data != null) {
                val uri = data.data!!
                try {
                    val takeFlags = Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION
                    contentResolver.takePersistableUriPermission(uri, takeFlags)
                } catch (e: Exception) {}
                try {
                    pendingExportBytes?.let { bytes ->
                        contentResolver.openOutputStream(uri, "wt")?.use { out ->
                            out.write(bytes)
                            out.flush()
                        }
                    }
                    if (pendingExportIsBackup) {
                        getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
                            .edit()
                            .putString("linked_backup_uri_v269", uri.toString())
                            .apply()
                    }
                } catch (e: Exception) {}
            }
            pendingExportBytes = null
            pendingExportIsBackup = false
        }
    }
}

class RemkNativeBridge(private val activity: MainActivity) {
    private val context: Context = activity.applicationContext
    private val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
    private val handler = Handler(Looper.getMainLooper())
    private var scheduledTimerRunnable: Runnable? = null


    @JavascriptInterface
    fun saveAutoBackupPayload(jsonPayload: String): Boolean {
        return try {
            prefs.edit().putString("auto_backup_latest_v269", jsonPayload).apply()
            val docsDir = context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS) ?: context.filesDir
            if (!docsDir.exists()) docsDir.mkdirs()
            val backupFile = File(docsDir, "REMK_Auto_Backup_Latest.json")
            backupFile.writeText(jsonPayload, Charsets.UTF_8)

            // Falls der Nutzer eine Cloud-/Ordner-Datei verknüpft hat, aktualisiere sie direkt lautlos!
            val linkedUriStr = prefs.getString("linked_backup_uri_v269", "") ?: ""
            if (linkedUriStr.isNotEmpty()) {
                try {
                    val uri = Uri.parse(linkedUriStr)
                    context.contentResolver.openOutputStream(uri, "wt")?.use { out ->
                        out.write(jsonPayload.toByteArray(Charsets.UTF_8))
                        out.flush()
                    }
                } catch (e: Exception) {}
            }
            true
        } catch (e: Exception) {
            false
        }
    }

    @JavascriptInterface
    fun loadAutoBackupPayload(): String {
        return try {
            val docsDir = context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS) ?: context.filesDir
            val backupFile = File(docsDir, "REMK_Auto_Backup_Latest.json")
            if (backupFile.exists()) {
                backupFile.readText(Charsets.UTF_8)
            } else {
                prefs.getString("auto_backup_latest_v269", "") ?: ""
            }
        } catch (e: Exception) {
            prefs.getString("auto_backup_latest_v269", "") ?: ""
        }
    }

    @JavascriptInterface
    fun saveOrShareNativeFile(fileName: String, mimeType: String, contentOrBase64: String, isBase64: Boolean, openSaveDialog: Boolean) {
        handler.post {
            try {
                val bytes = if (isBase64) {
                    val cleanB64 = contentOrBase64.substringAfter("base64,", contentOrBase64)
                    Base64.decode(cleanB64, Base64.DEFAULT)
                } else {
                    contentOrBase64.toByteArray(Charsets.UTF_8)
                }

                val exportDir = File(context.cacheDir, "exports")
                if (!exportDir.exists()) exportDir.mkdirs()
                val outFile = File(exportDir, fileName)
                outFile.writeBytes(bytes)

                if (openSaveDialog) {
                    activity.pendingExportBytes = bytes
                    activity.pendingExportMimeType = mimeType
                    activity.pendingExportIsBackup = fileName.endsWith(".json", ignoreCase = true)
                    val createIntent = Intent(Intent.ACTION_CREATE_DOCUMENT).apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = mimeType
                        putExtra(Intent.EXTRA_TITLE, fileName)
                    }
                    activity.startActivityForResult(createIntent, activity.CREATE_DOCUMENT_REQUEST_CODE)
                } else {
                    val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", outFile)
                    val shareIntent = Intent(Intent.ACTION_SEND).apply {
                        type = mimeType
                        putExtra(Intent.EXTRA_STREAM, uri)
                        putExtra(Intent.EXTRA_SUBJECT, fileName)
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    }
                    val chooser = Intent.createChooser(shareIntent, "RE:MK Datei speichern / teilen ($fileName)")
                    activity.startActivity(chooser)
                }
            } catch (e: Exception) {}
        }
    }

    @JavascriptInterface
    fun saveNativeSession(jsonPayload: String) {
        prefs.edit().putString("auth_session_v24", jsonPayload).apply()
    }

    @JavascriptInterface
    fun loadNativeSession(): String {
        return prefs.getString("auth_session_v24", "") ?: ""
    }

    @JavascriptInterface
    fun clearNativeSession() {
        prefs.edit().remove("auth_session_v24").apply()
    }

    @JavascriptInterface
    fun setLockscreenGymMode(enabled: Boolean) {
        prefs.edit().putBoolean("lockscreen_gym_mode_v25", enabled).apply()
        handler.post {
            activity.applyLockscreenGymMode(enabled)
        }
    }

    @JavascriptInterface
    fun setNativeCoachMuted(muted: Boolean) {
        prefs.edit()
            .putBoolean("coach_muted_v251", muted)
            .putString("widget_coach_status", if (muted) "🔇 Coach: AUS" else "🗣️🔥 Coach: AN")
            .apply()
        if (muted) {
            handler.post { activity.stopNativeCoachSpeech() }
        }
        RemkWidgetProvider.broadcastUpdateAllWidgets(context)
    }

    @JavascriptInterface
    fun setNativeStepsToday(manualSteps: Int) {
        val cleanSteps = manualSteps.coerceAtLeast(0)
        val todayKey = "step_baseline_" + java.text.SimpleDateFormat("yyyyMMdd", Locale.GERMANY).format(java.util.Date())
        val rawBoot = prefs.getInt("last_raw_boot_steps", -1)
        val ed = prefs.edit()
            .putInt("steps_today", cleanSteps)
            .putString("widget_steps", cleanSteps.toString())
        if (rawBoot >= 0) {
            ed.putInt(todayKey, (rawBoot - cleanSteps).coerceAtLeast(0))
        }
        ed.apply()
        RemkWidgetProvider.broadcastUpdateAllWidgets(context)
    }

    @JavascriptInterface
    fun getNativeStepsToday(): Int {
        val todayKey = "step_baseline_" + java.text.SimpleDateFormat("yyyyMMdd", Locale.GERMANY).format(java.util.Date())
        if (!prefs.contains(todayKey)) {
            return 0
        }
        return prefs.getInt("steps_today", 0).coerceAtLeast(0)
    }

    @JavascriptInterface
    fun speakCoachVoice(text: String, pitch: Float, rate: Float) {
        if (prefs.getBoolean("coach_muted_v251", false)) return
        handler.post {
            activity.speakNativeCoachText(text, pitch, rate)
        }
    }

    @JavascriptInterface
    fun triggerHapticFeedback(style: String) {
        try {
            val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator ?: return
            if (style == "timer_alarm" || style == "rest_done") {
                val pattern = longArrayOf(0, 250, 100, 250, 100, 380)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    vibrator.vibrate(VibrationEffect.createWaveform(pattern, -1))
                } else {
                    @Suppress("DEPRECATION")
                    vibrator.vibrate(pattern, -1)
                }
                return
            }
            val durationMs = if (style == "heavy") 40L else 18L
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(durationMs, VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                @Suppress("DEPRECATION")
                vibrator.vibrate(durationMs)
            }
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun sendInstantWatchNotification(title: String, body: String) {
        fireNativeWristNotification(title, body, 9001, false)
    }

    @JavascriptInterface
    fun updateLockscreenWorkoutCockpit(title: String, body: String, targetWeightStr: String, targetRepsStr: String) {
        prefs.edit()
            .putString("watch_target_weight", targetWeightStr)
            .putString("watch_target_reps", targetRepsStr)
            .apply()
        fireNativeWristNotification(title, body, 9003, true)
    }

    @JavascriptInterface
    fun dismissLockscreenWorkoutCockpit() {
        try {
            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            nm.cancel(9003)
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun scheduleWatchNotification(title: String, body: String, delayMs: Long) {
        cancelWatchNotification()
        val runnable = Runnable {
            triggerHapticFeedback("timer_alarm")
            fireNativeWristNotification(title, body, 9002, false)
        }
        scheduledTimerRunnable = runnable
        handler.postDelayed(runnable, delayMs.coerceAtLeast(500L))
    }

    @JavascriptInterface
    fun cancelWatchNotification() {
        scheduledTimerRunnable?.let { handler.removeCallbacks(it) }
        scheduledTimerRunnable = null
    }

    @JavascriptInterface
    fun updateHomescreenWidget(kcalStr: String, protStr: String, workoutTitle: String, stepsStr: String) {
        prefs.edit()
            .putString("widget_kcal", kcalStr)
            .putString("widget_prot", protStr)
            .putString("widget_workout", workoutTitle)
            .putString("widget_steps", stepsStr)
            .apply()

        RemkWidgetProvider.broadcastUpdateAllWidgets(context)
    }

    @JavascriptInterface
    fun updateAllWidgetsJson(jsonPayload: String) {
        try {
            RemkWidgetProvider.ensureDailyWaterReset(context)
            val obj = JSONObject(jsonPayload)
            val ed = prefs.edit()
            if (obj.has("kcal")) ed.putString("widget_kcal", obj.optString("kcal"))
            if (obj.has("prot")) ed.putString("widget_prot", obj.optString("prot"))
            if (obj.has("carbs")) ed.putString("widget_carbs", obj.optString("carbs"))
            if (obj.has("fat")) ed.putString("widget_fat", obj.optString("fat"))
            if (obj.has("water")) ed.putString("widget_water", obj.optString("water"))
            if (obj.has("waterMl")) ed.putInt("widget_water_ml", obj.optInt("waterMl", 0))
            if (obj.has("waterTargetL")) ed.putString("widget_water_target_l", obj.optString("waterTargetL", "2,8"))
            if (obj.has("recipePreview")) ed.putString("widget_recipe_preview", obj.optString("recipePreview"))
            if (obj.has("meal0Kcal")) ed.putString("widget_meal0_kcal", obj.optString("meal0Kcal"))
            if (obj.has("meal1Kcal")) ed.putString("widget_meal1_kcal", obj.optString("meal1Kcal"))
            if (obj.has("meal2Kcal")) ed.putString("widget_meal2_kcal", obj.optString("meal2Kcal"))
            if (obj.has("meal3Kcal")) ed.putString("widget_meal3_kcal", obj.optString("meal3Kcal"))
            if (obj.has("meal0Done")) ed.putBoolean("meal_slot_done_0", obj.optBoolean("meal0Done"))
            if (obj.has("meal1Done")) ed.putBoolean("meal_slot_done_1", obj.optBoolean("meal1Done"))
            if (obj.has("meal2Done")) ed.putBoolean("meal_slot_done_2", obj.optBoolean("meal2Done"))
            if (obj.has("meal3Done")) ed.putBoolean("meal_slot_done_3", obj.optBoolean("meal3Done"))

            if (obj.has("workoutTitle")) ed.putString("widget_workout", obj.optString("workoutTitle"))
            if (obj.has("nextEx")) ed.putString("widget_next_ex", obj.optString("nextEx"))
            if (obj.has("watchTargetWeight")) ed.putString("watch_target_weight", obj.optString("watchTargetWeight"))
            if (obj.has("watchTargetReps")) ed.putString("watch_target_reps", obj.optString("watchTargetReps"))

            if (obj.has("shopItem0")) ed.putString("widget_shop_item_0", obj.optString("shopItem0"))
            if (obj.has("shopItem1")) ed.putString("widget_shop_item_1", obj.optString("shopItem1"))
            if (obj.has("shopItem2")) ed.putString("widget_shop_item_2", obj.optString("shopItem2"))
            if (obj.has("shopOpenQueueJson")) ed.putString("widget_shop_open_json", obj.optString("shopOpenQueueJson"))

            if (obj.has("steps")) ed.putString("widget_steps", obj.optString("steps"))
            if (obj.has("stepKcal")) ed.putString("widget_step_kcal", obj.optString("stepKcal"))
            if (obj.has("enduranceSummary")) ed.putString("widget_endurance_summary", obj.optString("enduranceSummary"))
            if (obj.has("lastRun")) ed.putString("widget_last_run", obj.optString("lastRun"))
            if (obj.has("sleep")) ed.putString("widget_sleep", obj.optString("sleep"))
            if (obj.has("pulse")) ed.putString("widget_pulse", obj.optString("pulse"))
            if (obj.has("readiness")) ed.putString("widget_readiness", obj.optString("readiness"))
            if (obj.has("coachMuted")) ed.putBoolean("coach_muted_v251", obj.optBoolean("coachMuted"))
            ed.apply()
            RemkWidgetProvider.broadcastUpdateAllWidgets(context)
        } catch (e: Exception) {}
    }

    /**
     * Erzeugt die interaktive Smartwatch- & Sperrbildschirm-Notification mit:
     * 1. Haupt-Touch-Button mit konkretem Gewicht & Wdh.: "✓ 80kg × 10" (1 Fingertipp hakt den Satz sofort ab!)
     * 2. Vorauswahl-Zahnrad-Button: "⚙️ Ändern (82,5kg / +1Wdh)" (öffnet direkt auf der Watch fertige Touch-Vorauswahl-Buttons für Gewicht & Wdh.)
     * 3. Pausen-Button: "⏱️ +30s Pause"
     */
    private fun fireNativeWristNotification(title: String, body: String, notifId: Int, isPersistentCockpit: Boolean) {
        try {
            val tapIntent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            val pendingFlags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }
            val pendingIntent = PendingIntent.getActivity(context, notifId, tapIntent, pendingFlags)

            val rawW = (prefs.getString("watch_target_weight", "80") ?: "80").replace(",", ".").toDoubleOrNull() ?: 80.0
            val targetR = (prefs.getString("watch_target_reps", "10") ?: "10").toIntOrNull() ?: 10
            val fmtW = { v: Double -> if (v % 1.0 == 0.0) v.toInt().toString() else v.toString().replace(".", ",") }
            val wStr = fmtW(rawW)
            val wPlus = fmtW(rawW + 2.5)
            val wMinus = fmtW((rawW - 2.5).coerceAtLeast(0.0))

            // Action 1: Direkt-Touch-Button mit konkretem Gewicht × Wdh. ("✓ 80kg × 10")
            val completeSetIntent = RemkWidgetProvider.buildBroadcastPendingIntent(
                context,
                RemkWidgetProvider.ACTION_WATCH_COMPLETE_SET,
                9101
            )
            val actionCompleteSet = NotificationCompat.Action.Builder(
                android.R.drawable.checkbox_on_background,
                "✓ ${wStr}kg × $targetR",
                completeSetIntent
            ).build()

            // Action 2: Vorauswahl-Buttons für Gewicht & Wiederholungen auf der Smartwatch
            val gearChoices = arrayOf<CharSequence>(
                "${wStr}x${targetR} (Ziel)",
                "${wPlus}x${targetR} (+2,5kg)",
                "${wMinus}x${targetR} (-2,5kg)",
                "${wStr}x${targetR + 1} (+1 Wdh.)",
                "${wStr}x${(targetR - 1).coerceAtLeast(1)} (-1 Wdh.)"
            )
            val remoteInput = RemoteInput.Builder(RemkWidgetProvider.KEY_WATCH_WEIGHT_REPS_INPUT)
                .setLabel("⚙️ Gewicht×Wdh. antippen:")
                .setChoices(gearChoices)
                .build()
            val gearPendingIntent = RemkWidgetProvider.buildBroadcastPendingIntent(
                context,
                RemkWidgetProvider.ACTION_WATCH_LOG_CUSTOM_SET,
                9102,
                true
            )
            val actionGearAdjust = NotificationCompat.Action.Builder(
                android.R.drawable.ic_menu_preferences,
                "⚙️ Ändern (${wPlus}kg / +1Wdh)",
                gearPendingIntent
            ).addRemoteInput(remoteInput).build()

            // Action 3: Button "⏱️ +30s Pause"
            val addRestIntent = RemkWidgetProvider.buildBroadcastPendingIntent(
                context,
                RemkWidgetProvider.ACTION_WATCH_ADD_REST_30,
                9103
            )
            val actionAddRest = NotificationCompat.Action.Builder(
                android.R.drawable.ic_popup_sync,
                "⏱️ +30s Pause",
                addRestIntent
            ).build()

            val channelId = if (isPersistentCockpit) MainActivity.LOCKSCREEN_COCKPIT_CHANNEL_ID else MainActivity.WATCH_CHANNEL_ID
            val builder = NotificationCompat.Builder(context, channelId)
                .setSmallIcon(R.drawable.ic_launcher)
                .setLargeIcon(BitmapFactory.decodeResource(context.resources, R.drawable.ic_launcher))
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(NotificationCompat.BigTextStyle().bigText(body))
                .setPriority(if (isPersistentCockpit) NotificationCompat.PRIORITY_DEFAULT else NotificationCompat.PRIORITY_HIGH)
                .setCategory(if (isPersistentCockpit) NotificationCompat.CATEGORY_STATUS else NotificationCompat.CATEGORY_ALARM)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setSilent(isPersistentCockpit)
                .setOngoing(isPersistentCockpit)
                .setAutoCancel(!isPersistentCockpit)
                .setContentIntent(pendingIntent)
                .addAction(actionCompleteSet)
                .addAction(actionGearAdjust)
                .addAction(actionAddRest)
            if (!isPersistentCockpit) {
                builder.setFullScreenIntent(pendingIntent, true)
            }

            if (!isPersistentCockpit) {
                builder.setVibrate(longArrayOf(0, 250, 100, 250, 100, 350))
            }

            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            nm.notify(notifId, builder.build())
        } catch (e: Exception) {}
    }
}
