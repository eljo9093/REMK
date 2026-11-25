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
import android.content.ContentUris
import android.content.ContentValues
import android.content.IntentFilter
import android.provider.CalendarContract
import java.util.TimeZone
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
import java.security.MessageDigest
import android.view.Gravity
import android.widget.TextView

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
    private var lastAppliedLockscreenGymMode: Boolean? = null
    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null
    private var pendingWebViewPermRequest: PermissionRequest? = null
    private val WEBVIEW_CAMERA_PERM_CODE = 1099
    private var capturedCameraUri: Uri? = null
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
        private const val EXPECTED_PACKAGE_NAME = "eu.remk.coaching"
        // Optional: Fuer Play Store / eigenen Release-Keystore hier spaeter den SHA-256 Fingerprint pinnen (ohne Doppelpunkte, Grossbuchstaben).
        // Leer = akzeptiert GitHub Actions & Android Studio Signatur, blockt aber dennoch Package-Klone & entfernte RE:MK-Assets.
        private const val EXPECTED_RELEASE_CERT_SHA256 = ""
    }

    fun computeApkSignatureSha256(): String {
        return try {
            val signatures = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                val pi = packageManager.getPackageInfo(packageName, PackageManager.GET_SIGNING_CERTIFICATES)
                val si = pi.signingInfo
                if (si != null) {
                    if (si.hasMultipleSigners()) si.apkContentsSigners else si.signingCertificateHistory
                } else null
            } else {
                @Suppress("DEPRECATION")
                packageManager.getPackageInfo(packageName, PackageManager.GET_SIGNATURES).signatures
            }
            val certBytes = signatures?.firstOrNull()?.toByteArray() ?: return ""
            val digest = MessageDigest.getInstance("SHA-256").digest(certBytes)
            digest.joinToString("") { "%02X".format(it) }
        } catch (e: Exception) {
            ""
        }
    }

    private fun verifyAppIntegrityOrLock(): Boolean {
        try {
            // 1. Strikter Package-ID-Schutz gegen Repackaging unter fremder App-ID
            if (applicationContext.packageName != EXPECTED_PACKAGE_NAME) return false

            // 2. Kryptografischer APK-Signatur-Check (SHA-256)
            val sigSha256 = computeApkSignatureSha256()
            if (sigSha256.length < 32) return false
            if (EXPECTED_RELEASE_CERT_SHA256.isNotEmpty() && !sigSha256.equals(EXPECTED_RELEASE_CERT_SHA256, ignoreCase = true)) {
                return false
            }

            // 3. Asset-Integritaetspruefung: RE:MK-Marke & Login-Schranke muessen im Asset vorhanden sein
            val headBytes = ByteArray(16384)
            val readLen = assets.open("index.html").use { it.read(headBytes) }
            val headText = String(headBytes, 0, readLen.coerceAtLeast(0), Charsets.UTF_8)
            if (!headText.contains("RE:MK", ignoreCase = true)) return false
            return true
        } catch (e: Exception) {
            return false
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // v37.14 Anti-Tamper & Urheberrechts-Schutz
        if (!verifyAppIntegrityOrLock()) {
            val lockTxt = TextView(this).apply {
                text = "🔒 RE:MK 360° Integritaetsschutz\n\nUnautorisierte Modifikation oder falsche Paket-Signatur erkannt.\n© RE:MK Coaching (remk.eu)"
                setTextColor(Color.WHITE)
                setBackgroundColor(Color.parseColor("#090d14"))
                gravity = Gravity.CENTER
                textSize = 15f
                setPadding(48, 48, 48, 48)
            }
            setContentView(lockTxt)
            return
        }

        // WebView Remote-Debugging fuer Fremdzugriffe per USB sperren
        try { WebView.setWebContentsDebuggingEnabled(false) } catch (_: Exception) {}

        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        applyLockscreenGymMode(true)

        val savedThemeIsDark = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            .getBoolean("remk_native_theme_is_dark", true)
        applyNativeThemeChrome(savedThemeIsDark)

        audioManager = getSystemService(Context.AUDIO_SERVICE) as? AudioManager
        RemkWidgetProvider.ensureDailyWaterReset(this)
        createSmartwatchAndLockscreenChannels()
        requestEssentialRuntimePermissions()
        initHardwareStepCounter()
        initTextToSpeechEngine()
        registerWatchCommandReceiver()

        webView = WebView(this)
        webView.setBackgroundColor(Color.parseColor(if (savedThemeIsDark) "#090d14" else "#f3f6fb"))
        // v36.4: LAYER_TYPE_NONE nutzt native WebView-GPU-Beschleunigung OHNE Offscreen-Buffer-Reset beim Minimieren/Wiederöffnen!
        webView.setLayerType(View.LAYER_TYPE_NONE, null)
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
            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                if (request?.isForMainFrame == true && request.url?.toString()?.startsWith("file:///android_asset/") == false) {
                    view?.loadUrl("file:///android_asset/index.html")
                }
            }
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
                if (request == null) return
                val wantsCam = request.resources?.any { it == PermissionRequest.RESOURCE_VIDEO_CAPTURE } == true
                if (wantsCam && ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                    pendingWebViewPermRequest?.deny()
                    pendingWebViewPermRequest = request
                    runOnUiThread {
                        ActivityCompat.requestPermissions(this@MainActivity, arrayOf(Manifest.permission.CAMERA), WEBVIEW_CAMERA_PERM_CODE)
                    }
                } else {
                    runOnUiThread { request.grant(request.resources) }
                }
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
                capturedCameraUri = null
                return try {
                    val isCapture = fileChooserParams?.isCaptureEnabled == true
                    val acceptTypes = fileChooserParams?.acceptTypes ?: emptyArray()
                    val wantsImage = acceptTypes.isEmpty() || acceptTypes.any { it.contains("image") || it.contains("*/*") }

                    val cameraIntent = if (wantsImage) {
                        try {
                            val exportDir = File(cacheDir, "exports")
                            if (!exportDir.exists()) exportDir.mkdirs()
                            val photoFile = File(exportDir, "remk_meal_${System.currentTimeMillis()}.jpg")
                            val uri = FileProvider.getUriForFile(this@MainActivity, "${packageName}.fileprovider", photoFile)
                            capturedCameraUri = uri
                            Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE).apply {
                                putExtra(android.provider.MediaStore.EXTRA_OUTPUT, uri)
                                addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION or Intent.FLAG_GRANT_READ_URI_PERMISSION)
                            }
                        } catch (e: Exception) { null }
                    } else null

                    if (isCapture && cameraIntent != null) {
                        // Startet sofort direkt die Handykamera ohne Dateimanager-Umweg!
                        startActivityForResult(cameraIntent, FILE_CHOOSER_RESULT_CODE)
                    } else {
                        val contentIntent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                            addCategory(Intent.CATEGORY_OPENABLE)
                            type = "*/*"
                        }
                        if (cameraIntent != null) {
                            val chooser = Intent.createChooser(contentIntent, "Foto direkt aufnehmen oder Datei wählen").apply {
                                putExtra(Intent.EXTRA_INITIAL_INTENTS, arrayOf(cameraIntent))
                            }
                            startActivityForResult(chooser, FILE_CHOOSER_RESULT_CODE)
                        } else {
                            startActivityForResult(contentIntent, FILE_CHOOSER_RESULT_CODE)
                        }
                    }
                    true
                } catch (e: Exception) {
                    fileUploadCallback = null
                    capturedCameraUri = null
                    false
                }
            }
        }

        val verPrefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        if (verPrefs.getInt("last_web_asset_ver", 0) != 392) {
            try { webView.clearCache(true) } catch (e: Exception) {}
            verPrefs.edit().putInt("last_web_asset_ver", 392).apply()
            webView.loadUrl("file:///android_asset/index.html")
        } else if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
            isWebViewLoaded = true
        } else {
            webView.loadUrl("file:///android_asset/index.html")
        }
    }

    fun applyNativeThemeChrome(isDark: Boolean) {
        try {
            val bgHex = if (isDark) "#090d14" else "#f3f6fb"
            val bgColor = Color.parseColor(bgHex)
            window.decorView.setBackgroundColor(bgColor)
            window.statusBarColor = bgColor
            window.navigationBarColor = bgColor
            if (::webView.isInitialized) {
                webView.setBackgroundColor(bgColor)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                val ctrl = window.insetsController
                val mask = android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS or
                    android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                ctrl?.setSystemBarsAppearance(if (isDark) 0 else mask, mask)
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                @Suppress("DEPRECATION")
                var flags = window.decorView.systemUiVisibility
                @Suppress("DEPRECATION")
                flags = if (isDark) {
                    flags and View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR.inv()
                } else {
                    flags or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
                }
                @Suppress("DEPRECATION")
                window.decorView.systemUiVisibility = flags
            }
        } catch (e: Exception) {}
    }

    fun applyLockscreenGymMode(enabled: Boolean) {
        if (lastAppliedLockscreenGymMode == enabled) return
        lastAppliedLockscreenGymMode = enabled
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
        // v36.4: Kein asymmetrisches webView.onResume() (da onPause() bewusst weggelassen) -> verhindert Resume-Flackern!
        val gymLock = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE).getBoolean("lockscreen_gym_mode_v25", true)
        applyLockscreenGymMode(gymLock)
        RemkWidgetProvider.ensureDailyWaterReset(this)
        initHardwareStepCounter()
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

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == WEBVIEW_CAMERA_PERM_CODE) {
            val req = pendingWebViewPermRequest
            pendingWebViewPermRequest = null
            if (req != null) {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    req.grant(req.resources)
                } else {
                    req.deny()
                }
            }
            return
        }
        if (requestCode == PERMISSION_REQUEST_CODE) {
            initHardwareStepCounter()
            pushSavedHardwareStepsToWebView()
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onPause() {
        super.onPause()
        try {
            if (isWebViewLoaded) {
                webView.evaluateJavascript(
                    "if(typeof window.flushRemkStateImmediateV280==='function') { window.flushRemkStateImmediateV280(); } " +
                    "else if(typeof window.saveFormState==='function') { window.saveFormState(); }",
                    null
                )
            }
            CookieManager.getInstance().flush()
            RemkWidgetProvider.broadcastUpdateAllWidgets(this)
            // v36.0: webView.onPause() entfernt -> verhindert schwarzen GPU-Frame bei Rückkehr aus Sperrbildschirm
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
            val results = if (resultCode == Activity.RESULT_OK) {
                if (data?.data != null) {
                    arrayOf(data.data!!)
                } else if (capturedCameraUri != null) {
                    arrayOf(capturedCameraUri!!)
                } else null
            } else null
            fileUploadCallback?.onReceiveValue(results)
            fileUploadCallback = null
            capturedCameraUri = null
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
    fun setLockscreenConfigJson(jsonPayload: String): Boolean {
        return try {
            RemkLockscreenManager.saveAndApplyConfig(context, jsonPayload)
            true
        } catch (e: Exception) { false }
    }

    @JavascriptInterface
    fun getLockscreenConfigJson(): String {
        return RemkLockscreenManager.getConfigJson(context)
    }

    @JavascriptInterface
    fun openLockscreenNow(mode: String, durationMinutes: Int) {
        try {
            RemkLockscreenManager.startLockscreenNow(context, mode, durationMinutes)
            activity.runOnUiThread {
                activity.startActivity(Intent(activity, RemkLockscreenActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP
                    putExtra("remk_lock_mode", mode)
                })
            }
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun stopLockscreenNow() {
        try {
            RemkLockscreenManager.stopLockscreenMode(context)
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun openAndroidLockscreenPermissions() {
        activity.runOnUiThread {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    val am = context.getSystemService(Context.ALARM_SERVICE) as? android.app.AlarmManager
                    if (am != null && !am.canScheduleExactAlarms()) {
                        activity.startActivity(Intent(android.provider.Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM).apply {
                            data = Uri.parse("package:${context.packageName}")
                        })
                        return@runOnUiThread
                    }
                }
                activity.startActivity(Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
                    data = Uri.parse("package:${context.packageName}")
                })
            } catch (e: Exception) {}
        }
    }

    @JavascriptInterface
    fun openNativeQuickInput(quickMode: String) {
        activity.runOnUiThread {
            try {
                activity.startActivity(Intent(activity, RemkQuickInputActivity::class.java).apply {
                    putExtra("remk_quick_mode", quickMode)
                })
            } catch (e: Exception) {}
        }
    }

    @JavascriptInterface
    fun getShopListJson(): String {
        return prefs.getString("remk_shop_list_sync_v365", "[]") ?: "[]"
    }

    @JavascriptInterface
    fun saveShopListJson(jsonStr: String) {
        try {
            val arr = JSONArray(jsonStr)
            prefs.edit().putString("remk_shop_list_sync_v365", arr.toString()).apply()
            RemkWidgetProvider.syncLegacyTop3ShopSlotsFromList(prefs, arr)
            RemkWidgetProvider.broadcastUpdateAllWidgets(context)
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun setNativeThemeMode(isDark: Boolean) {
        try {
            prefs.edit().putBoolean("remk_native_theme_is_dark", isDark).apply()
            activity.runOnUiThread {
                activity.applyNativeThemeChrome(isDark)
            }
        } catch (e: Exception) {}
    }

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
    fun saveWatchSyncPayloadNative(jsonPayload: String) {
        try {
            prefs.edit()
                .putString("watch_live_sync_payload_v280", jsonPayload)
                .putLong("watch_live_sync_ts_v280", System.currentTimeMillis())
                .apply()
            RemkWidgetProvider.broadcastUpdateAllWidgets(context)
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun loadWatchSyncPayloadNative(): String {
        return prefs.getString("watch_live_sync_payload_v280", "") ?: ""
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
    fun setWatchMirrorNotificationsEnabled(mirrorToWatch: Boolean) {
        prefs.edit()
            .putBoolean("mirror_notifs_to_watch_v373", mirrorToWatch)
            .apply()
    }

    @JavascriptInterface
    fun isWatchMirrorNotificationsEnabled(): Boolean {
        return prefs.getBoolean("mirror_notifs_to_watch_v373", false)
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
            if (obj.has("shopItemsJson")) ed.putString("remk_shop_list_sync_v365", obj.optString("shopItemsJson"))
            if (obj.has("levelEnabled")) ed.putBoolean("widget_level_enabled_v365", obj.optBoolean("levelEnabled", true))
            if (obj.has("levelNum")) ed.putInt("widget_level_num_v365", obj.optInt("levelNum", 1))
            if (obj.has("rankTitle")) ed.putString("widget_rank_title_v365", obj.optString("rankTitle"))
            if (obj.has("xpText")) ed.putString("widget_xp_text_v365", obj.optString("xpText"))
            if (obj.has("questSummary")) ed.putString("widget_quest_summary_v365", obj.optString("questSummary"))
            if (obj.has("acwrText")) ed.putString("widget_acwr_text_v365", obj.optString("acwrText"))
            if (obj.has("xpPct")) ed.putInt("widget_xp_pct_v368", obj.optInt("xpPct", 0))
            if (obj.has("gender")) ed.putString("widget_gender_v368", obj.optString("gender", "m"))
            if (obj.has("dotsLine")) ed.putString("widget_dots_line_v368", obj.optString("dotsLine"))
            if (obj.has("strVal")) ed.putInt("widget_str_v368", obj.optInt("strVal", 50))
            if (obj.has("endVal")) ed.putInt("widget_end_v368", obj.optInt("endVal", 50))
            if (obj.has("vitVal")) ed.putInt("widget_vit_v368", obj.optInt("vitVal", 50))
            if (obj.has("recVal")) ed.putInt("widget_rec_v368", obj.optInt("recVal", 75))
            if (obj.has("conVal")) ed.putInt("widget_con_v368", obj.optInt("conVal", 50))
            if (obj.has("bonusTitle")) ed.putString("widget_bonus_title_v368", obj.optString("bonusTitle"))
            if (obj.has("m1Text")) ed.putString("widget_m1_v368", obj.optString("m1Text"))
            if (obj.has("m2Text")) ed.putString("widget_m2_v368", obj.optString("m2Text"))
            if (obj.has("athVal")) ed.putInt("widget_ath_v379", obj.optInt("athVal", 55))
            if (obj.has("mobVal")) ed.putInt("widget_mob_v379", obj.optInt("mobVal", 55))
            if (obj.has("m1Done")) ed.putBoolean("widget_m1_done_v379", obj.optBoolean("m1Done", false))
            if (obj.has("m2Done")) ed.putBoolean("widget_m2_done_v379", obj.optBoolean("m2Done", false))
            if (obj.has("m3Done")) ed.putBoolean("widget_m3_done_v379", obj.optBoolean("m3Done", false))
            if (obj.has("calTodayTitle")) ed.putString("widget_cal_today_title", obj.optString("calTodayTitle"))
            if (obj.has("calTodaySub")) ed.putString("widget_cal_today_sub", obj.optString("calTodaySub"))
            if (obj.has("calNext1")) ed.putString("widget_cal_next1", obj.optString("calNext1"))
            if (obj.has("calNext2")) ed.putString("widget_cal_next2", obj.optString("calNext2"))
            if (obj.has("calNext3")) ed.putString("widget_cal_next3", obj.optString("calNext3"))
            if (obj.has("m3Text")) ed.putString("widget_m3_v368", obj.optString("m3Text"))
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
            val mirrorToWatch = prefs.getBoolean("mirror_notifs_to_watch_v373", false)
            val builder = NotificationCompat.Builder(context, channelId)
                .setSmallIcon(R.drawable.ic_launcher)
                .setLocalOnly(!mirrorToWatch)
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

    // =========================================================================
    // v37.9: NATIVER ANDROID KALENDER LIVE-SYNC (CalendarContract + Konflikt-Check)
    // =========================================================================
    private fun findPrimaryWritableCalendarId(): Long {
        val projection = arrayOf(
            CalendarContract.Calendars._ID,
            CalendarContract.Calendars.IS_PRIMARY,
            CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL
        )
        var fallbackId = -1L
        try {
            context.contentResolver.query(
                CalendarContract.Calendars.CONTENT_URI,
                projection,
                "${CalendarContract.Calendars.VISIBLE} = 1",
                null,
                null
            )?.use { cur ->
                while (cur.moveToNext()) {
                    val id = cur.getLong(0)
                    val isPrim = cur.getInt(1) == 1
                    val access = cur.getInt(2)
                    if (access >= CalendarContract.Calendars.CAL_ACCESS_CONTRIBUTOR) {
                        if (isPrim) return id
                        if (fallbackId < 0L) fallbackId = id
                    }
                }
            }
        } catch (e: Exception) {}
        return fallbackId
    }

    @JavascriptInterface
    fun hasCalendarPermission(): Boolean {
        val r = ContextCompat.checkSelfPermission(context, Manifest.permission.READ_CALENDAR) == PackageManager.PERMISSION_GRANTED
        val w = ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_CALENDAR) == PackageManager.PERMISSION_GRANTED
        return r && w
    }

    @JavascriptInterface
    fun requestCalendarPermission() {
        try {
            if (context is Activity) {
                ActivityCompat.requestPermissions(
                    context,
                    arrayOf(Manifest.permission.READ_CALENDAR, Manifest.permission.WRITE_CALENDAR),
                    7791
                )
            }
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun checkCalendarConflictsJson(eventsJson: String): String {
        val out = JSONObject()
        if (!hasCalendarPermission()) {
            out.put("ok", false)
            out.put("needPermission", true)
            out.put("conflicts", JSONArray())
            return out.toString()
        }
        val conflicts = JSONArray()
        try {
            val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val savedIdsMap = try { JSONObject(prefs.getString("remk_cal_event_ids_v379", "{}") ?: "{}") } catch (e: Exception) { JSONObject() }
            val remkIdSet = mutableSetOf<Long>()
            val itKeys = savedIdsMap.keys()
            while (itKeys.hasNext()) {
                val idL = savedIdsMap.optLong(itKeys.next(), -1L)
                if (idL > 0L) remkIdSet.add(idL)
            }

            val arr = JSONArray(eventsJson)
            val proj = arrayOf(
                CalendarContract.Instances.EVENT_ID,
                CalendarContract.Instances.TITLE,
                CalendarContract.Instances.ALL_DAY
            )
            for (i in 0 until arr.length()) {
                val ev = arr.optJSONObject(i) ?: continue
                val sMs = ev.optLong("startMs", 0L)
                val eMs = ev.optLong("endMs", 0L)
                if (sMs <= 0L || eMs <= sMs) continue
                val builder = CalendarContract.Instances.CONTENT_URI.buildUpon()
                ContentUris.appendId(builder, sMs + 60000L)
                ContentUris.appendId(builder, eMs - 60000L)
                context.contentResolver.query(builder.build(), proj, null, null, null)?.use { cur ->
                    while (cur.moveToNext()) {
                        val exEventId = cur.getLong(0)
                        val exTitle = cur.getString(1) ?: "Termin"
                        val isAllDay = cur.getInt(2) == 1
                        if (isAllDay || remkIdSet.contains(exEventId) || exTitle.startsWith("RE:MK")) continue
                        conflicts.put(JSONObject().apply {
                            put("date", ev.optString("dateStr", ""))
                            put("time", ev.optString("timeStr", ""))
                            put("title", ev.optString("title", "RE:MK Training"))
                            put("existingTitle", exTitle)
                        })
                        break
                    }
                }
            }
            out.put("ok", true)
            out.put("conflicts", conflicts)
        } catch (e: Exception) {
            out.put("ok", false)
            out.put("error", e.message ?: "Konflikt-Check fehlgeschlagen")
            out.put("conflicts", conflicts)
        }
        return out.toString()
    }

    @JavascriptInterface
    fun syncWorkoutCalendarEventsNative(eventsJson: String): String {
        val out = JSONObject()
        if (!hasCalendarPermission()) {
            out.put("ok", false)
            out.put("needPermission", true)
            return out.toString()
        }
        try {
            val calId = findPrimaryWritableCalendarId()
            if (calId < 0L) {
                out.put("ok", false)
                out.put("error", "Kein schreibbarer Kalender auf dem Gerät gefunden.")
                return out.toString()
            }
            val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val savedIdsMap = try { JSONObject(prefs.getString("remk_cal_event_ids_v379", "{}") ?: "{}") } catch (e: Exception) { JSONObject() }
            val tzId = TimeZone.getDefault().id
            val arr = JSONArray(eventsJson)
            var synced = 0
            for (i in 0 until arr.length()) {
                val ev = arr.optJSONObject(i) ?: continue
                val uid = ev.optString("uid", "remk_$i")
                val sMs = ev.optLong("startMs", 0L)
                val eMs = ev.optLong("endMs", 0L)
                if (sMs <= 0L || eMs <= sMs) continue

                val cv = ContentValues().apply {
                    put(CalendarContract.Events.CALENDAR_ID, calId)
                    put(CalendarContract.Events.TITLE, ev.optString("title", "RE:MK Training"))
                    put(CalendarContract.Events.DESCRIPTION, ev.optString("description", ""))
                    put(CalendarContract.Events.EVENT_LOCATION, ev.optString("location", ""))
                    put(CalendarContract.Events.DTSTART, sMs)
                    put(CalendarContract.Events.DTEND, eMs)
                    put(CalendarContract.Events.EVENT_TIMEZONE, tzId)
                }

                val existingId = savedIdsMap.optLong(uid, -1L)
                var updated = false
                if (existingId > 0L) {
                    val updUri = ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, existingId)
                    val rows = try { context.contentResolver.update(updUri, cv, null, null) } catch (e: Exception) { 0 }
                    if (rows > 0) updated = true
                }
                if (!updated) {
                    val insUri = context.contentResolver.insert(CalendarContract.Events.CONTENT_URI, cv)
                    val newId = insUri?.lastPathSegment?.toLongOrNull() ?: -1L
                    if (newId > 0L) savedIdsMap.put(uid, newId)
                }
                synced++
            }
            prefs.edit().putString("remk_cal_event_ids_v379", savedIdsMap.toString()).apply()
            out.put("ok", true)
            out.put("syncedCount", synced)
        } catch (e: Exception) {
            out.put("ok", false)
            out.put("error", e.message ?: "Kalender-Sync Fehler")
        }
        return out.toString()
    }

    @JavascriptInterface
    fun clearRemkCalendarEventsNative(): String {
        val out = JSONObject()
        if (!hasCalendarPermission()) {
            out.put("ok", false)
            out.put("deletedCount", 0)
            return out.toString()
        }
        var deleted = 0
        try {
            val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val savedIdsMap = try { JSONObject(prefs.getString("remk_cal_event_ids_v379", "{}") ?: "{}") } catch (e: Exception) { JSONObject() }
            val keys = savedIdsMap.keys()
            while (keys.hasNext()) {
                val idL = savedIdsMap.optLong(keys.next(), -1L)
                if (idL > 0L) {
                    val delUri = ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, idL)
                    deleted += try { context.contentResolver.delete(delUri, null, null) } catch (e: Exception) { 0 }
                }
            }
            prefs.edit().remove("remk_cal_event_ids_v379").apply()
            out.put("ok", true)
            out.put("deletedCount", deleted)
        } catch (e: Exception) {
            out.put("ok", false)
            out.put("deletedCount", deleted)
        }
        return out.toString()
    }

    @JavascriptInterface
    fun getApkSignatureSha256(): String {
        return try {
            (context as? MainActivity)?.computeApkSignatureSha256() ?: ""
        } catch (e: Exception) {
            ""
        }
    }

}
