package eu.remk.coaching

import android.app.AlarmManager
import android.app.KeyguardManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import org.json.JSONArray
import org.json.JSONObject
import java.util.Calendar

/**
 * RE:MK v36.5 – Sperrbildschirm-Manager (An/Aus, Countdown-Timer & Wochen-Routinen)
 * Arbeitet auch bei komplett geschlossener App über AlarmManager + BootReceiver + leichten Service!
 */
object RemkLockscreenManager {
    const val PREFS = "REMK_NATIVE_OS_VAULT"
    const val KEY_CFG = "remk_v365_lockscreen_cfg_json"
    const val ACTION_ROUTINE_START = "eu.remk.coaching.ACTION_LOCK_ROUTINE_START"
    const val ACTION_ROUTINE_STOP = "eu.remk.coaching.ACTION_LOCK_ROUTINE_STOP"
    const val CHANNEL_ID = "remk_lockscreen_service_v365"
    const val NOTIF_ID = 9365

    fun getConfigJson(context: Context): String {
        return context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY_CFG, "") ?: ""
    }

    fun getActiveMode(context: Context): String {
        val raw = getConfigJson(context)
        return try { JSONObject(raw).optString("mode", "shopping") } catch (e: Exception) { "shopping" }
    }

    fun getRemainingMinutes(context: Context): Int {
        val raw = getConfigJson(context)
        return try {
            val endMs = JSONObject(raw).optLong("endTimestampMs", 0L)
            if (endMs > System.currentTimeMillis()) ((endMs - System.currentTimeMillis()) / 60000L).toInt() + 1 else 0
        } catch (e: Exception) { 0 }
    }

    fun saveAndApplyConfig(context: Context, jsonStr: String) {
        val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        prefs.edit().putString(KEY_CFG, jsonStr).apply()
        val obj = try { JSONObject(jsonStr) } catch (e: Exception) { return }
        val enabled = obj.optBoolean("enabled", false)
        val mode = obj.optString("mode", "shopping")
        val endMs = obj.optLong("endTimestampMs", 0L)

        scheduleAllRoutines(context, obj.optJSONArray("routines"))

        if (enabled && (endMs == 0L || endMs > System.currentTimeMillis())) {
            startLockscreenService(context, mode, endMs)
        } else {
            stopLockscreenService(context)
        }
    }

    fun startLockscreenNow(context: Context, mode: String, durationMinutes: Int) {
        val endMs = if (durationMinutes > 0) System.currentTimeMillis() + durationMinutes * 60000L else 0L
        val obj = try { JSONObject(getConfigJson(context).ifEmpty { "{}" }) } catch (e: Exception) { JSONObject() }
        obj.put("enabled", true)
        obj.put("mode", mode)
        obj.put("endTimestampMs", endMs)
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY_CFG, obj.toString()).apply()
        startLockscreenService(context, mode, endMs)
    }

    fun stopLockscreenMode(context: Context) {
        val obj = try { JSONObject(getConfigJson(context).ifEmpty { "{}" }) } catch (e: Exception) { JSONObject() }
        obj.put("enabled", false)
        obj.put("endTimestampMs", 0L)
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY_CFG, obj.toString()).apply()
        cancelAlarm(context, 9501, ACTION_ROUTINE_STOP)
        stopLockscreenService(context)
    }

    fun startLockscreenService(context: Context, mode: String, endTimestampMs: Long) {
        try {
            if (endTimestampMs > System.currentTimeMillis()) {
                scheduleExactAlarm(context, endTimestampMs, 9501, ACTION_ROUTINE_STOP, mode, 0L)
            }
            val svc = Intent(context, RemkLockscreenService::class.java).apply {
                putExtra("remk_lock_mode", mode)
                putExtra("remk_lock_end_ms", endTimestampMs)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(svc)
            } else {
                context.startService(svc)
            }
        } catch (e: Exception) {}
    }

    fun stopLockscreenService(context: Context) {
        try {
            context.stopService(Intent(context, RemkLockscreenService::class.java))
        } catch (e: Exception) {}
    }

    fun rescheduleFromStorage(context: Context) {
        val raw = getConfigJson(context)
        if (raw.isEmpty()) return
        try {
            val obj = JSONObject(raw)
            scheduleAllRoutines(context, obj.optJSONArray("routines"))
            val enabled = obj.optBoolean("enabled", false)
            val endMs = obj.optLong("endTimestampMs", 0L)
            if (enabled && (endMs == 0L || endMs > System.currentTimeMillis())) {
                startLockscreenService(context, obj.optString("mode", "shopping"), endMs)
            }
        } catch (e: Exception) {}
    }

    private fun scheduleAllRoutines(context: Context, routines: JSONArray?) {
        if (routines == null) return
        val now = System.currentTimeMillis()
        for (i in 0 until routines.length()) {
            val r = routines.optJSONObject(i) ?: continue
            val reqStart = 9600 + i * 2
            val reqStop = 9601 + i * 2
            if (!r.optBoolean("enabled", false)) {
                cancelAlarm(context, reqStart, ACTION_ROUTINE_START)
                cancelAlarm(context, reqStop, ACTION_ROUTINE_STOP)
                continue
            }
            val jsDay = r.optInt("dayOfWeek", 6) // 0=So..6=Sa -> Calendar.SUNDAY=1..SATURDAY=7
            val calDay = (jsDay % 7) + 1
            val startMin = r.optInt("startMin", 16 * 60)
            val endMin = r.optInt("endMin", 17 * 60 + 30)
            val mode = r.optString("mode", "shopping")

            val startCal = Calendar.getInstance().apply {
                set(Calendar.DAY_OF_WEEK, calDay)
                set(Calendar.HOUR_OF_DAY, startMin / 60)
                set(Calendar.MINUTE, startMin % 60)
                set(Calendar.SECOND, 0)
                set(Calendar.MILLISECOND, 0)
                if (timeInMillis <= now) add(Calendar.WEEK_OF_YEAR, 1)
            }
            val durMs = ((endMin - startMin).coerceAtLeast(15)) * 60000L
            val endMs = startCal.timeInMillis + durMs

            scheduleExactAlarm(context, startCal.timeInMillis, reqStart, ACTION_ROUTINE_START, mode, endMs)
            scheduleExactAlarm(context, endMs, reqStop, ACTION_ROUTINE_STOP, mode, 0L)
        }
    }

    private fun scheduleExactAlarm(context: Context, triggerAtMs: Long, reqCode: Int, actionStr: String, mode: String, endMs: Long) {
        try {
            val am = context.getSystemService(Context.ALARM_SERVICE) as? AlarmManager ?: return
            val i = Intent(context, RemkLockscreenReceiver::class.java).apply {
                action = actionStr
                putExtra("remk_lock_mode", mode)
                putExtra("remk_lock_end_ms", endMs)
            }
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            } else PendingIntent.FLAG_UPDATE_CURRENT
            val pi = PendingIntent.getBroadcast(context, reqCode, i, flags)

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                if (am.canScheduleExactAlarms()) {
                    am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAtMs, pi)
                } else {
                    am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAtMs, pi)
                }
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAtMs, pi)
            } else {
                am.setExact(AlarmManager.RTC_WAKEUP, triggerAtMs, pi)
            }
        } catch (e: Exception) {}
    }

    private fun cancelAlarm(context: Context, reqCode: Int, actionStr: String) {
        try {
            val am = context.getSystemService(Context.ALARM_SERVICE) as? AlarmManager ?: return
            val i = Intent(context, RemkLockscreenReceiver::class.java).apply { action = actionStr }
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            } else PendingIntent.FLAG_UPDATE_CURRENT
            am.cancel(PendingIntent.getBroadcast(context, reqCode, i, flags))
        } catch (e: Exception) {}
    }
}

class RemkLockscreenReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            RemkLockscreenManager.ACTION_ROUTINE_START -> {
                val mode = intent.getStringExtra("remk_lock_mode") ?: "shopping"
                val endMs = intent.getLongExtra("remk_lock_end_ms", 0L)
                val durMin = if (endMs > System.currentTimeMillis()) ((endMs - System.currentTimeMillis()) / 60000L).toInt().coerceAtLeast(1) else 60
                RemkLockscreenManager.startLockscreenNow(context, mode, durMin)
            }
            RemkLockscreenManager.ACTION_ROUTINE_STOP -> {
                RemkLockscreenManager.stopLockscreenMode(context)
                RemkLockscreenManager.rescheduleFromStorage(context)
            }
        }
    }
}

class RemkBootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED || intent.action == Intent.ACTION_MY_PACKAGE_REPLACED) {
            RemkLockscreenManager.rescheduleFromStorage(context)
        }
    }
}

class RemkLockscreenService : Service() {
    private var activeMode: String = "shopping"
    private var endMs: Long = 0L
    private var screenReceiverRegistered = false

    private val screenReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            if (endMs > 0L && System.currentTimeMillis() >= endMs) {
                RemkLockscreenManager.stopLockscreenMode(context)
                stopSelf()
                return
            }
            if (intent.action == Intent.ACTION_SCREEN_ON) {
                val km = context.getSystemService(Context.KEYGUARD_SERVICE) as? KeyguardManager
                if (km != null && km.isKeyguardLocked) {
                    try {
                        val open = Intent(context, RemkLockscreenActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP
                            putExtra("remk_lock_mode", activeMode)
                        }
                        context.startActivity(open)
                    } catch (e: Exception) {}
                }
            }
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        activeMode = intent?.getStringExtra("remk_lock_mode") ?: RemkLockscreenManager.getActiveMode(this)
        endMs = intent?.getLongExtra("remk_lock_end_ms", 0L) ?: 0L
        startForegroundNotif()

        if (!screenReceiverRegistered) {
            val f = IntentFilter().apply {
                addAction(Intent.ACTION_SCREEN_ON)
                addAction(Intent.ACTION_SCREEN_OFF)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                registerReceiver(screenReceiver, f, Context.RECEIVER_NOT_EXPORTED)
            } else {
                registerReceiver(screenReceiver, f)
            }
            screenReceiverRegistered = true
        }
        return START_STICKY
    }

    private fun startForegroundNotif() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            val ch = NotificationChannel(
                RemkLockscreenManager.CHANNEL_ID,
                "RE:MK Aktiver Sperrbildschirm-Modus",
                NotificationManager.IMPORTANCE_LOW
            )
            nm.createNotificationChannel(ch)
        }
        val modeLabel = when (activeMode) {
            "workout" -> "🏋️ Training"
            "nutrition" -> "🍲 Ernährung"
            "mobility" -> "🧘 Mobility"
            else -> "🛒 Einkaufsliste"
        }
        val openPi = PendingIntent.getActivity(
            this, 9366,
            Intent(this, RemkLockscreenActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP
                putExtra("remk_lock_mode", activeMode)
            },
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE else PendingIntent.FLAG_UPDATE_CURRENT
        )
        val stopPi = PendingIntent.getBroadcast(
            this, 9367,
            Intent(this, RemkLockscreenReceiver::class.java).apply { action = RemkLockscreenManager.ACTION_ROUTINE_STOP },
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE else PendingIntent.FLAG_UPDATE_CURRENT
        )
        val remMin = RemkLockscreenManager.getRemainingMinutes(this)
        val notif = NotificationCompat.Builder(this, RemkLockscreenManager.CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_lock_idle_lock)
            .setContentTitle("🔒 RE:MK Sperrbildschirm aktiv: $modeLabel")
            .setContentText(if (remMin > 0) "Automatisch aus in ca. $remMin Min. • Tippen zum Öffnen" else "Tippen zum direkten Öffnen ohne Entsperren")
            .setOngoing(true)
            .setLocalOnly(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setContentIntent(openPi)
            .addAction(android.R.drawable.ic_menu_close_clear_cancel, "Ausschalten", stopPi)
            .build()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            startForeground(RemkLockscreenManager.NOTIF_ID, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE)
        } else {
            startForeground(RemkLockscreenManager.NOTIF_ID, notif)
        }
    }

    override fun onDestroy() {
        if (screenReceiverRegistered) {
            try { unregisterReceiver(screenReceiver) } catch (e: Exception) {}
            screenReceiverRegistered = false
        }
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
