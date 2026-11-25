package eu.remk.coaching

import android.app.AlarmManager
import android.app.NotificationManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import androidx.core.app.NotificationCompat
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build
import android.widget.RemoteViews
import androidx.core.app.RemoteInput
import org.json.JSONArray
import org.json.JSONObject
import java.util.Locale
import kotlin.math.roundToInt

/**
 * RE:MK Coaching v26.3 Pro – 4 Full-Bleed Screenshot-Style Widgets + Smartwatch-Brücke:
 * 1. RemkWidgetProvider (🍎 Ernährung, 4 Yazio-Mahlzeiten-Cards zum Direkt-Abhaken, Rezept-Vorschau & +250ml Wasser)
 * 2. RemkWorkoutWidgetProvider (🏋️ Live-Training im Screenshot-Design: Notiz/Gerät-Box, 💡 Startgewicht-Hilfe, ±2,5kg & 3 Satz-Zeilen mit 1RM & ✓)
 * 3. RemkEnduranceWidgetProvider (🛒 Interaktive Einkaufsliste im Card-Design mit Auto-Nachrücken + GPS-Start)
 * 4. RemkHealthWidgetProvider (❤️ Vital, Schritte, 🗣️ Coach AN/AUS Direkt-Schalter & ⏱️ 90s Timer Direkt-Start)
 * 5. Pixel Watch 4 & Smartwatch Set-Logger Receiver
 */
class RemkWidgetProvider : AppWidgetProvider() {

    companion object {
        const val ACTION_ADD_WATER_250 = "eu.remk.coaching.ACTION_ADD_WATER_250"
        const val ACTION_TOGGLE_MEAL_SLOT = "eu.remk.coaching.ACTION_TOGGLE_MEAL_SLOT"
        const val ACTION_TOGGLE_SHOP_ITEM = "eu.remk.coaching.ACTION_TOGGLE_SHOP_ITEM"
        const val ACTION_SHOP_PAGE_STEP = "eu.remk.coaching.ACTION_SHOP_PAGE_STEP"
        const val ACTION_OPEN_LOCKSCREEN_QUICK = "eu.remk.coaching.ACTION_OPEN_LOCKSCREEN_QUICK"
        const val ACTION_WORKOUT_STEP_WEIGHT = "eu.remk.coaching.ACTION_WORKOUT_STEP_WEIGHT"
        const val ACTION_WORKOUT_STEP_REPS = "eu.remk.coaching.ACTION_WORKOUT_STEP_REPS"
        const val ACTION_WORKOUT_COMPLETE_SET = "eu.remk.coaching.ACTION_WORKOUT_COMPLETE_SET"
        const val ACTION_STARTER_WEIGHT_HELP = "eu.remk.coaching.ACTION_STARTER_WEIGHT_HELP"
        const val ACTION_TOGGLE_COACH_MUTE = "eu.remk.coaching.ACTION_TOGGLE_COACH_MUTE"
        const val ACTION_START_TIMER_90 = "eu.remk.coaching.ACTION_START_TIMER_90"
        const val ACTION_COCKPIT_ROTATE_BODY = "eu.remk.coaching.ACTION_COCKPIT_ROTATE_BODY"
        const val ACTION_COCKPIT_TOGGLE_VIEW = "eu.remk.coaching.ACTION_COCKPIT_TOGGLE_VIEW"
        const val ACTION_COCKPIT_TOGGLE_QUEST = "eu.remk.coaching.ACTION_COCKPIT_TOGGLE_QUEST"
        const val ACTION_WORKOUT_SWITCH_EX = "eu.remk.coaching.ACTION_WORKOUT_SWITCH_EX"
        const val ACTION_NATIVE_REST_DONE = "eu.remk.coaching.ACTION_NATIVE_REST_DONE"
        const val ACTION_REFRESH_WIDGETS = "eu.remk.coaching.ACTION_REFRESH_WIDGETS"
        const val ACTION_WATCH_COMPLETE_SET = "eu.remk.coaching.ACTION_WATCH_COMPLETE_SET"
        const val ACTION_WATCH_LOG_CUSTOM_SET = "eu.remk.coaching.ACTION_WATCH_LOG_CUSTOM_SET"
        const val ACTION_WATCH_ADD_REST_30 = "eu.remk.coaching.ACTION_WATCH_ADD_REST_30"
        const val ACTION_WEAR_SYNC_EVENT = "eu.remk.coaching.ACTION_WEAR_SYNC_EVENT"
        const val ACTION_EXECUTE_WATCH_COMMAND = "eu.remk.coaching.ACTION_EXECUTE_WATCH_COMMAND"
        const val KEY_WATCH_WEIGHT_REPS_INPUT = "remk_watch_weight_reps_input"

        fun enqueueCommandForWebView(context: Context, cmd: String, payload: String) {
            try {
                val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
                val rawQueue = prefs.getString("pending_commands_queue_v251", "[]") ?: "[]"
                val arr = try { JSONArray(rawQueue) } catch (e: Exception) { JSONArray() }
                val item = JSONObject().apply {
                    put("cmd", cmd)
                    put("payload", payload)
                    put("ts", System.currentTimeMillis())
                }
                arr.put(item)
                prefs.edit()
                    .putString("pending_commands_queue_v251", arr.toString())
                    .putString("pending_watch_cmd", cmd)
                    .putString("pending_watch_payload", payload)
                    .apply()
                context.sendBroadcast(Intent(ACTION_EXECUTE_WATCH_COMMAND).setPackage(context.packageName))
            } catch (e: Exception) {}
        }

        fun ensureDailyWaterReset(context: Context) {
            try {
                val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
                val todayStr = java.text.SimpleDateFormat("yyyyMMdd", Locale.GERMANY).format(java.util.Date())
                val lastWaterDate = prefs.getString("water_date_stamp", "") ?: ""
                if (lastWaterDate != todayStr) {
                    val targetL = prefs.getString("widget_water_target_l", "2,8") ?: "2,8"
                    prefs.edit()
                        .putString("water_date_stamp", todayStr)
                        .putInt("widget_water_ml", 0)
                        .putInt("pending_widget_water_add_ml", 0)
                        .putString("widget_water", "💧 0,00 / $targetL L")
                        .putBoolean("meal_slot_done_0", false)
                        .putBoolean("meal_slot_done_1", false)
                        .putBoolean("meal_slot_done_2", false)
                        .putBoolean("meal_slot_done_3", false)
                        .apply()
                }
            } catch (e: Exception) {}
        }

        fun broadcastUpdateAllWidgets(context: Context) {
            try {
                val mgr = AppWidgetManager.getInstance(context)
                val providers = arrayOf(
                    RemkWidgetProvider::class.java,
                    RemkWorkoutWidgetProvider::class.java,
                    RemkEnduranceWidgetProvider::class.java,
                    RemkHealthWidgetProvider::class.java,
                    RemkCockpitWidgetProvider::class.java,
                    RemkCalendarWidgetProvider::class.java
                )
                for (cls in providers) {
                    val ids = mgr.getAppWidgetIds(ComponentName(context, cls))
                    if (ids != null && ids.isNotEmpty()) {
                        val intent = Intent(context, cls).apply {
                            action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
                            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
                        }
                        context.sendBroadcast(intent)
                    }
                }
            } catch (e: Exception) {}
        }

        fun buildLaunchPendingIntent(
            context: Context,
            mode: String,
            reqCode: Int,
            sportMode: String = ""
        ): PendingIntent {
            val intent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
                putExtra("remk_widget_mode", mode)
                if (sportMode.isNotEmpty()) {
                    putExtra("remk_sport_mode", sportMode)
                }
            }
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }
            return PendingIntent.getActivity(context, reqCode, intent, flags)
        }

        fun buildQuickInputPendingIntent(context: Context, quickMode: String, reqCode: Int): PendingIntent {
            val intent = Intent(context, RemkQuickInputActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                putExtra("remk_quick_mode", quickMode)
            }
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            } else PendingIntent.FLAG_UPDATE_CURRENT
            return PendingIntent.getActivity(context, reqCode, intent, flags)
        }

        fun syncLegacyTop3ShopSlotsFromList(prefs: android.content.SharedPreferences, arr: JSONArray) {
            val openList = mutableListOf<String>()
            for (i in 0 until arr.length()) {
                val o = arr.optJSONObject(i) ?: continue
                if (!o.optBoolean("checked", false)) {
                    val q = o.optInt("qty", 1)
                    val t = o.optString("text", "").trim()
                    if (t.isNotEmpty()) openList.add(if (q > 1) "${q}× $t" else t)
                }
            }
            val page = prefs.getInt("widget_shop_page_v365", 0).coerceAtLeast(0)
            val totalPages = ((openList.size + 2) / 3).coerceAtLeast(1)
            val safePage = page.coerceIn(0, totalPages - 1)
            val offset = safePage * 3
            val ed = prefs.edit()
                .putInt("widget_shop_page_v365", safePage)
                .putInt("widget_shop_open_count_v365", openList.size)
                .putString("widget_endurance_summary", "🛒 EINKAUF (${openList.size} offen • Seite ${safePage + 1}/$totalPages)")
            for (k in 0..2) {
                val txt = openList.getOrNull(offset + k)
                ed.putString("widget_shop_item_$k", if (txt != null) "☐ $txt" else "✓ Alle Artikel dieser Seite erledigt")
            }
            ed.apply()
        }

        fun buildBroadcastPendingIntent(
            context: Context,
            actionStr: String,
            reqCode: Int,
            mutableForRemoteInput: Boolean = false,
            extraVal: String = ""
        ): PendingIntent {
            val intent = Intent(context, RemkWidgetProvider::class.java).apply {
                action = actionStr
                if (extraVal.isNotEmpty()) {
                    putExtra("remk_extra_val", extraVal)
                }
            }
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                PendingIntent.FLAG_UPDATE_CURRENT or (if (mutableForRemoteInput) PendingIntent.FLAG_MUTABLE else PendingIntent.FLAG_IMMUTABLE)
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_UPDATE_CURRENT or (if (mutableForRemoteInput) 0 else PendingIntent.FLAG_IMMUTABLE)
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }
            return PendingIntent.getBroadcast(context, reqCode, intent, flags)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val extraVal = intent.getStringExtra("remk_extra_val") ?: ""

        when (intent.action) {
            ACTION_ADD_WATER_250 -> {
                ensureDailyWaterReset(context)
                val curMl = prefs.getInt("widget_water_ml", 0) + 250
                val pendingAdd = prefs.getInt("pending_widget_water_add_ml", 0) + 250
                val targetL = prefs.getString("widget_water_target_l", "2,8") ?: "2,8"
                val litersStr = String.format(Locale.GERMANY, "💧 %.2f / %s L", curMl / 1000.0f, targetL)
                prefs.edit()
                    .putInt("widget_water_ml", curMl)
                    .putInt("pending_widget_water_add_ml", pendingAdd)
                    .putString("widget_water", litersStr)
                    .apply()
                broadcastUpdateAllWidgets(context)
                context.sendBroadcast(Intent(ACTION_EXECUTE_WATCH_COMMAND).setPackage(context.packageName))
            }
            ACTION_TOGGLE_MEAL_SLOT -> {
                val slotIdx = extraVal.toIntOrNull() ?: 0
                val keyDone = "meal_slot_done_$slotIdx"
                val nextDone = !prefs.getBoolean(keyDone, false)
                val slotKcalRaw = prefs.getString("widget_meal${slotIdx}_kcal", "550 kcal") ?: "550"
                val slotKcal = Regex("(\\d+)").find(slotKcalRaw)?.groupValues?.getOrNull(1)?.toIntOrNull() ?: 550
                val curKcalRaw = prefs.getString("widget_kcal", "2450 kcal offen") ?: "2450"
                val curKcal = Regex("(\\d+)").find(curKcalRaw)?.groupValues?.getOrNull(1)?.toIntOrNull() ?: 2450
                val nextKcal = if (nextDone) (curKcal - slotKcal).coerceAtLeast(0) else (curKcal + slotKcal)
                prefs.edit()
                    .putBoolean(keyDone, nextDone)
                    .putString("widget_kcal", "$nextKcal kcal offen")
                    .apply()
                enqueueCommandForWebView(context, "TOGGLE_MEAL_SLOT", slotIdx.toString())
                broadcastUpdateAllWidgets(context)
            }
            ACTION_OPEN_LOCKSCREEN_QUICK -> {
                val mode = extraVal.ifEmpty { RemkLockscreenManager.getActiveMode(context) }
                RemkLockscreenManager.startLockscreenNow(context, mode, 60)
                try {
                    context.startActivity(Intent(context, RemkLockscreenActivity::class.java).apply {
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP
                        putExtra("remk_lock_mode", mode)
                    })
                } catch (e: Exception) {}
            }
            ACTION_SHOP_PAGE_STEP -> {
                val step = extraVal.toIntOrNull() ?: 1
                val curPage = prefs.getInt("widget_shop_page_v365", 0)
                val arr = try { JSONArray(prefs.getString("remk_shop_list_sync_v365", "[]") ?: "[]") } catch (e: Exception) { JSONArray() }
                var openCnt = 0
                for (i in 0 until arr.length()) {
                    val o = arr.optJSONObject(i) ?: continue
                    if (!o.optBoolean("checked", false)) openCnt++
                }
                val totalPages = ((openCnt + 2) / 3).coerceAtLeast(1)
                val nextPage = ((curPage + step) % totalPages + totalPages) % totalPages
                prefs.edit().putInt("widget_shop_page_v365", nextPage).apply()
                syncLegacyTop3ShopSlotsFromList(prefs, arr)
                broadcastUpdateAllWidgets(context)
            }
            ACTION_TOGGLE_SHOP_ITEM -> {
                val slotIdxV365 = extraVal.toIntOrNull() ?: 0
                val clickedTxtV365 = (prefs.getString("widget_shop_item_$slotIdxV365", "") ?: "")
                    .replace("☐", "").replace("☑", "").replace(Regex("^\\d+×\\s*"), "").trim()
                val syncArr = try { JSONArray(prefs.getString("remk_shop_list_sync_v365", "[]") ?: "[]") } catch (e: Exception) { JSONArray() }
                if (syncArr.length() > 0 && clickedTxtV365.isNotEmpty() && !clickedTxtV365.startsWith("✓")) {
                    for (i in 0 until syncArr.length()) {
                        val o = syncArr.optJSONObject(i) ?: continue
                        if (!o.optBoolean("checked", false) && o.optString("text", "").trim().equals(clickedTxtV365, ignoreCase = true)) {
                            o.put("checked", true)
                            break
                        }
                    }
                    prefs.edit().putString("remk_shop_list_sync_v365", syncArr.toString()).apply()
                    syncLegacyTop3ShopSlotsFromList(prefs, syncArr)
                    enqueueCommandForWebView(context, "TOGGLE_SHOP_ITEM_TEXT", clickedTxtV365)
                    broadcastUpdateAllWidgets(context)
                    return
                }
                val slotIdx = extraVal.toIntOrNull() ?: 0
                val itemText = prefs.getString("widget_shop_item_$slotIdx", "") ?: ""
                try {
                    val rawAll = prefs.getString("widget_shop_open_json", "[]") ?: "[]"
                    val arr = JSONArray(rawAll)
                    val remaining = mutableListOf<String>()
                    var removedTarget = false
                    val cleanTarget = itemText.replace("☐", "").replace("☑", "").trim()
                    for (i in 0 until arr.length()) {
                        val s = arr.optString(i, "")
                        val cleanS = s.replace("☐", "").replace("☑", "").trim()
                        if (!removedTarget && cleanS == cleanTarget) {
                            removedTarget = true
                        } else {
                            remaining.add(s)
                        }
                    }
                    val newArr = JSONArray()
                    remaining.forEach { newArr.put(it) }
                    val ed = prefs.edit()
                        .putString("widget_shop_open_json", newArr.toString())
                        .putString("widget_endurance_summary", "🛒 EINKAUFSLISTE (${remaining.size} offen • Antippen = ✓)")
                    for (k in 0..2) {
                        ed.putString(
                            "widget_shop_item_$k",
                            if (k < remaining.size) remaining[k] else "✅ Erledigt!"
                        )
                    }
                    ed.apply()
                } catch (e: Exception) {}
                enqueueCommandForWebView(context, "TOGGLE_SHOP_ITEM_TEXT", itemText)
                broadcastUpdateAllWidgets(context)
            }
            ACTION_WORKOUT_STEP_WEIGHT -> {
                val delta = extraVal.toDoubleOrNull() ?: 2.5
                val curW = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
                val curR = prefs.getString("watch_target_reps", "10") ?: "10"
                val nextW = (curW + delta).coerceAtLeast(0.0)
                val wFormatted = if (nextW % 1.0 == 0.0) nextW.toInt().toString() else nextW.toString().replace(".", ",")
                prefs.edit()
                    .putString("watch_target_weight", nextW.toString())
                    .putString("widget_next_ex", "⚖️ Aktueller Satz: $wFormatted kg × $curR Wdh. (WDH antippen = ±1)")
                    .apply()
                enqueueCommandForWebView(context, "STEP_WORKOUT_WEIGHT", delta.toString())
                broadcastUpdateAllWidgets(context)
            }
            ACTION_WORKOUT_STEP_REPS -> {
                val deltaR = extraVal.toIntOrNull() ?: 1
                val curR = (prefs.getString("watch_target_reps", "10") ?: "10").toIntOrNull() ?: 10
                val nextR = if (curR + deltaR > 30) 5 else if (curR + deltaR < 1) 15 else (curR + deltaR)
                val curW = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
                val wFormatted = if (curW % 1.0 == 0.0) curW.toInt().toString() else curW.toString().replace(".", ",")
                prefs.edit()
                    .putString("watch_target_reps", nextR.toString())
                    .putString("widget_next_ex", "⚖️ Aktueller Satz: $wFormatted kg × $nextR Wdh. (WDH antippen = ±1)")
                    .apply()
                enqueueCommandForWebView(context, "STEP_WORKOUT_REPS", deltaR.toString())
                broadcastUpdateAllWidgets(context)
            }
            ACTION_STARTER_WEIGHT_HELP -> {
                val curW = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
                val warmW = ((curW * 0.75) / 2.5).roundToInt() * 2.5
                val wFormatted = if (warmW % 1.0 == 0.0) warmW.toInt().toString() else warmW.toString().replace(".", ",")
                prefs.edit()
                    .putString("watch_target_weight", warmW.toString())
                    .putString("widget_next_ex", "💡 Startgewicht-Hilfe aktiv: $wFormatted kg × 10 Wdh.")
                    .apply()
                enqueueCommandForWebView(context, "APPLY_STARTER_WEIGHT_HELP", warmW.toString())
                broadcastUpdateAllWidgets(context)
            }
            ACTION_WORKOUT_COMPLETE_SET, ACTION_WATCH_COMPLETE_SET -> {
                val curW = prefs.getString("watch_target_weight", "77.5") ?: "77.5"
                val curR = prefs.getString("watch_target_reps", "10") ?: "10"
                val requestedSet = extraVal.toIntOrNull()?.coerceIn(1, 3)
                val curSetNum = requestedSet ?: prefs.getInt("widget_active_set_num", 1).coerceIn(1, 3)
                val nextSetNum = if (curSetNum < 3) curSetNum + 1 else 1
                val curWorkoutTitle = prefs.getString("widget_workout", "Bankdrücken • Satz 1") ?: "Bankdrücken • Satz 1"
                val baseEx = curWorkoutTitle.split("•")[0].trim()
                val wDisp = curW.replace(".", ",")
                val ed = prefs.edit()
                    .putInt("widget_active_set_num", nextSetNum)
                    .putString("widget_workout", "$baseEx • Satz $nextSetNum")
                    .putString("widget_next_ex", "✅ Satz $curSetNum ($wDisp kg × $curR) abgehakt! ⏱️ 90s Pause läuft")
                if (curSetNum == 3) {
                    ed.putBoolean("widget_set1_done", false)
                    ed.putBoolean("widget_set2_done", false)
                    ed.putBoolean("widget_set3_done", false)
                } else {
                    ed.putBoolean("widget_set${curSetNum}_done", true)
                }
                ed.apply()
                enqueueCommandForWebView(context, "COMPLETE_SET", "${curW}x${curR}")
                dismissWatchNotification(context)
                broadcastUpdateAllWidgets(context)
            }
            ACTION_WATCH_LOG_CUSTOM_SET -> {
                val results = RemoteInput.getResultsFromIntent(intent)
                val userInput = results?.getCharSequence(KEY_WATCH_WEIGHT_REPS_INPUT)?.toString()?.trim() ?: "TARGET"
                enqueueCommandForWebView(context, "LOG_CUSTOM_SET", userInput)
                dismissWatchNotification(context)
                broadcastUpdateAllWidgets(context)
            }
            ACTION_WATCH_ADD_REST_30 -> {
                enqueueCommandForWebView(context, "ADD_REST_30", "30")
            }
            ACTION_WEAR_SYNC_EVENT -> {
                val wearAction = intent.getStringExtra("action") ?: ""
                val wearDetails = intent.getStringExtra("details") ?: ""
                if (wearAction.isNotEmpty()) {
                    enqueueCommandForWebView(context, wearAction, wearDetails)
                    broadcastUpdateAllWidgets(context)
                }
            }
            ACTION_TOGGLE_COACH_MUTE -> {
                val nextMuted = !prefs.getBoolean("coach_muted_v251", false)
                prefs.edit()
                    .putBoolean("coach_muted_v251", nextMuted)
                    .putString("widget_coach_status", if (nextMuted) "🔇 Coach: AUS" else "🗣️🔥 Coach: AN")
                    .apply()
                enqueueCommandForWebView(context, "SET_COACH_MUTE", if (nextMuted) "off" else "drill")
                broadcastUpdateAllWidgets(context)
            }
            ACTION_COCKPIT_ROTATE_BODY -> {
                val curAng = prefs.getInt("widget_cockpit_angle_v379", 0)
                prefs.edit().putInt("widget_cockpit_angle_v379", (curAng + 1) % 3).apply()
                broadcastUpdateAllWidgets(context)
            }
            ACTION_COCKPIT_TOGGLE_VIEW -> {
                val curMode = prefs.getInt("widget_cockpit_view_v379", 0)
                prefs.edit().putInt("widget_cockpit_view_v379", (curMode + 1) % 2).apply()
                broadcastUpdateAllWidgets(context)
            }
            ACTION_COCKPIT_TOGGLE_QUEST -> {
                val qIdx = (extraVal.toIntOrNull() ?: 0).coerceIn(0, 2)
                val kDone = "widget_m${qIdx + 1}_done_v379"
                val kTxt  = "widget_m${qIdx + 1}_v368"
                val nextDone = !prefs.getBoolean(kDone, false)
                val oldTxt = prefs.getString(kTxt, "○ Mission") ?: "○ Mission"
                val cleanTxt = oldTxt.replaceFirst(Regex("^[✓○]\\s*"), "")
                val newTxt = (if (nextDone) "✓ " else "○ ") + cleanTxt
                val curXpPct = prefs.getInt("widget_xp_pct_v368", 25)
                val nextXpPct = (curXpPct + (if (nextDone) 8 else -8)).coerceIn(0, 100)
                prefs.edit()
                    .putBoolean(kDone, nextDone)
                    .putString(kTxt, newTxt)
                    .putInt("widget_xp_pct_v368", nextXpPct)
                    .apply()
                enqueueCommandForWebView(context, "TOGGLE_QUEST_SLOT", qIdx.toString())
                broadcastUpdateAllWidgets(context)
            }
            ACTION_WORKOUT_SWITCH_EX -> {
                val delta = extraVal.toIntOrNull() ?: 1
                enqueueCommandForWebView(context, "SWITCH_EXERCISE", delta.toString())
                prefs.edit().putString("widget_next_ex", if (delta > 0) "⏭️ Nächste Übung wird geladen..." else "⏮️ Vorherige Übung wird geladen...").apply()
                broadcastUpdateAllWidgets(context)
            }
            ACTION_START_TIMER_90 -> {
                enqueueCommandForWebView(context, "START_TIMER_90", "90")
                try {
                    val am = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
                    val pi = buildBroadcastPendingIntent(context, ACTION_NATIVE_REST_DONE, 9901)
                    val triggerAt = System.currentTimeMillis() + 90_000L
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pi)
                    } else {
                        am.set(AlarmManager.RTC_WAKEUP, triggerAt, pi)
                    }
                    prefs.edit().putString("widget_next_ex", "⏱️ 90s Pause läuft (Alarm um ${java.text.SimpleDateFormat("HH:mm:ss", Locale.GERMANY).format(java.util.Date(triggerAt))})").apply()
                    broadcastUpdateAllWidgets(context)
                } catch (e: Exception) {}
            }
            ACTION_NATIVE_REST_DONE -> {
                try {
                    val vib = context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        vib?.vibrate(VibrationEffect.createWaveform(longArrayOf(0, 220, 120, 280), -1))
                    } else {
                        @Suppress("DEPRECATION") vib?.vibrate(350)
                    }
                    val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                    val launchPi = buildLaunchPendingIntent(context, "workout", 9902)
                    val notif = NotificationCompat.Builder(context, MainActivity.WATCH_CHANNEL_ID)
                        .setSmallIcon(R.drawable.ic_launcher)
                        .setContentTitle("⏱️ RE:MK 90s Pause beendet!")
                        .setContentText("Bereit für deinen nächsten Satz 💪")
                        .setPriority(NotificationCompat.PRIORITY_HIGH)
                        .setAutoCancel(true)
                        .setContentIntent(launchPi)
                        .build()
                    nm.notify(9902, notif)
                    prefs.edit().putString("widget_next_ex", "✅ 90s Pause fertig – Nächster Satz bereit!").apply()
                    broadcastUpdateAllWidgets(context)
                } catch (e: Exception) {}
            }
            ACTION_REFRESH_WIDGETS -> {
                broadcastUpdateAllWidgets(context)
            }
        }
    }

    private fun dismissWatchNotification(context: Context) {
        try {
            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            nm.cancel(9001)
            nm.cancel(9002)
        } catch (e: Exception) {}
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        ensureDailyWaterReset(context)
        val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val kcal = prefs.getString("widget_kcal", "2450 kcal offen") ?: "2450 kcal offen"
        val prot = prefs.getString("widget_prot", "165g EW") ?: "165g EW"
        val carbs = prefs.getString("widget_carbs", "250g KH") ?: "250g KH"
        val fat = prefs.getString("widget_fat", "70g Fett") ?: "70g Fett"
        val water = prefs.getString("widget_water", "💧 0,00 / 2,8 L") ?: "💧 0,00 / 2,8 L"
        val recipePreview = prefs.getString("widget_recipe_preview", "🍽️ Rezept: Hähnchen-Reis-Bowl (720 kcal)") ?: "🍽️ Rezept: Hähnchen-Reis-Bowl"

        val m0Done = prefs.getBoolean("meal_slot_done_0", false)
        val m1Done = prefs.getBoolean("meal_slot_done_1", false)
        val m2Done = prefs.getBoolean("meal_slot_done_2", false)
        val m3Done = prefs.getBoolean("meal_slot_done_3", false)

        val m0Kcal = prefs.getString("widget_meal0_kcal", "580 kcal") ?: "580 kcal"
        val m1Kcal = prefs.getString("widget_meal1_kcal", "720 kcal") ?: "720 kcal"
        val m2Kcal = prefs.getString("widget_meal2_kcal", "410 kcal") ?: "410 kcal"
        val m3Kcal = prefs.getString("widget_meal3_kcal", "690 kcal") ?: "690 kcal"

        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.remk_widget)
            views.setTextViewText(R.id.widget_header_title, "🍎 RE:MK ERNÄHRUNG & MAKRO-RADAR")
            views.setTextViewText(R.id.widget_kpi_text, "🔥 $kcal  •  $water")
            views.setTextViewText(R.id.widget_workout_sub, "💪 $prot  |  🌾 $carbs  |  🥑 $fat")
            views.setTextViewText(R.id.widget_recipe_preview, recipePreview)

            views.setTextViewText(R.id.btn_meal_slot_0, (if (m0Done) "✅ " else "☕ ") + "Frühstück\n" + m0Kcal + (if (m0Done) "  ✓" else "  ☐"))
            views.setTextViewText(R.id.btn_meal_slot_1, (if (m1Done) "✅ " else "🍲 ") + "Mittagessen\n" + m1Kcal + (if (m1Done) "  ✓" else "  ☐"))
            views.setTextViewText(R.id.btn_meal_slot_2, (if (m2Done) "✅ " else "🍎 ") + "Snack\n" + m2Kcal + (if (m2Done) "  ✓" else "  ☐"))
            views.setTextViewText(R.id.btn_meal_slot_3, (if (m3Done) "✅ " else "🥗 ") + "Abendessen\n" + m3Kcal + (if (m3Done) "  ✓" else "  ☐"))
            views.setInt(R.id.btn_meal_slot_0, "setBackgroundResource", if (m0Done) R.drawable.remk_w_row_done_bg else R.drawable.remk_w_row_active_bg)
            views.setInt(R.id.btn_meal_slot_1, "setBackgroundResource", if (m1Done) R.drawable.remk_w_row_done_bg else R.drawable.remk_w_row_inactive_bg)
            views.setInt(R.id.btn_meal_slot_2, "setBackgroundResource", if (m2Done) R.drawable.remk_w_row_done_bg else R.drawable.remk_w_row_inactive_bg)
            views.setInt(R.id.btn_meal_slot_3, "setBackgroundResource", if (m3Done) R.drawable.remk_w_row_done_bg else R.drawable.remk_w_row_inactive_bg)

            views.setOnClickPendingIntent(
                R.id.btn_meal_slot_0,
                buildBroadcastPendingIntent(context, ACTION_TOGGLE_MEAL_SLOT, 110, false, "0")
            )
            views.setOnClickPendingIntent(
                R.id.btn_meal_slot_1,
                buildBroadcastPendingIntent(context, ACTION_TOGGLE_MEAL_SLOT, 111, false, "1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_meal_slot_2,
                buildBroadcastPendingIntent(context, ACTION_TOGGLE_MEAL_SLOT, 112, false, "2")
            )
            views.setOnClickPendingIntent(
                R.id.btn_meal_slot_3,
                buildBroadcastPendingIntent(context, ACTION_TOGGLE_MEAL_SLOT, 113, false, "3")
            )

            views.setOnClickPendingIntent(
                R.id.btn_widget_water_add,
                buildBroadcastPendingIntent(context, ACTION_ADD_WATER_250, 104)
            )
            views.setOnClickPendingIntent(
                R.id.btn_widget_workout,
                buildLaunchPendingIntent(context, "nutrition", 101)
            )
            views.setOnClickPendingIntent(
                R.id.btn_widget_maps,
                buildLaunchPendingIntent(context, "bls_search", 105)
            )

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}

/**
 * Widget 2: 🏋️ RE:MK Live-Workout im exakten Screenshot-Design (Notiz/Gerät, 💡 Startgewicht-Hilfe, ±2,5kg & 3 Satz-Zeilen)
 */
class RemkWorkoutWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val workout = prefs.getString("widget_workout", "Bankdrücken • Satz 1") ?: "Bankdrücken • Satz 1"
        val nextEx = prefs.getString("widget_next_ex", "⚖️ Direkt ändern • Zahl tippen = exakte Eingabe") ?: "⚖️ Direkt ändern"
        val rawW = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
        val rawR = (prefs.getString("watch_target_reps", "10") ?: "10").toIntOrNull() ?: 10
        val activeSetNum = prefs.getInt("widget_active_set_num", 1).coerceIn(1, 3)

        val s1Done = prefs.getBoolean("widget_set1_done", activeSetNum > 1)
        val s2Done = prefs.getBoolean("widget_set2_done", activeSetNum > 2)
        val s3Done = prefs.getBoolean("widget_set3_done", false)

        val wStr = if (rawW % 1.0 == 0.0) rawW.toInt().toString() else rawW.toString().replace(".", ",")
        val rStr = rawR.toString()
        val ormStr = (rawW * (1.0 + rawR / 30.0)).roundToInt().toString()

        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.remk_widget_workout)
            views.setTextViewText(R.id.w_workout_title, "🏋️ $workout")
            views.setTextViewText(R.id.w_workout_next_ex, nextEx)

            views.setTextViewText(R.id.w_set1_num, if (s1Done) "✓" else "1")
            views.setTextViewText(R.id.w_set1_kg, "$wStr kg ✏️")
            views.setTextViewText(R.id.w_set1_reps, "$rStr Wdh ✏️")
            views.setTextViewText(R.id.w_set1_1rm, ormStr)

            views.setTextViewText(R.id.w_set2_num, if (s2Done) "✓" else "2")
            views.setTextViewText(R.id.w_set2_kg, "$wStr kg")
            views.setTextViewText(R.id.w_set2_reps, "$rStr Wdh")
            views.setTextViewText(R.id.w_set2_1rm, ormStr)

            views.setTextViewText(R.id.w_set3_num, if (s3Done) "✓" else "3")
            views.setTextViewText(R.id.w_set3_kg, "$wStr kg")
            views.setTextViewText(R.id.w_set3_reps, "$rStr Wdh")
            views.setTextViewText(R.id.w_set3_1rm, ormStr)

            views.setInt(R.id.w_set_row_1, "setBackgroundResource", if (s1Done) R.drawable.remk_w_row_done_bg else if (activeSetNum == 1) R.drawable.remk_w_row_active_bg else R.drawable.remk_w_row_inactive_bg)
            views.setInt(R.id.w_set_row_2, "setBackgroundResource", if (s2Done) R.drawable.remk_w_row_done_bg else if (activeSetNum == 2) R.drawable.remk_w_row_active_bg else R.drawable.remk_w_row_inactive_bg)
            views.setInt(R.id.w_set_row_3, "setBackgroundResource", if (s3Done) R.drawable.remk_w_row_done_bg else if (activeSetNum == 3) R.drawable.remk_w_row_active_bg else R.drawable.remk_w_row_inactive_bg)

            views.setInt(R.id.btn_w_complete_set_direct, "setBackgroundResource", if (activeSetNum == 1 || s1Done) R.drawable.remk_w_check_green_sq else R.drawable.remk_w_check_dim_sq)
            views.setInt(R.id.btn_w_complete_set_2, "setBackgroundResource", if (activeSetNum == 2 || s2Done) R.drawable.remk_w_check_green_sq else R.drawable.remk_w_check_dim_sq)
            views.setInt(R.id.btn_w_complete_set_3, "setBackgroundResource", if (activeSetNum == 3 || s3Done) R.drawable.remk_w_check_green_sq else R.drawable.remk_w_check_dim_sq)

            // 100% DIREKT IM WIDGET OHNE APP-START: -2,5 kg | +2,5 kg | -1 Wdh | +1 Wdh
            views.setOnClickPendingIntent(
                R.id.btn_w_minus_weight,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_STEP_WEIGHT, 210, false, "-2.5")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_plus_weight,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_STEP_WEIGHT, 211, false, "2.5")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_minus_reps,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_STEP_REPS, 218, false, "-1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_plus_reps,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_STEP_REPS, 219, false, "1")
            )

            // Antippen auf KG- oder WDH-Wert öffnet leichtes transparentes Mini-Zahlenpopup OHNE Haupt-App!
            val quickWeightPi = RemkWidgetProvider.buildQuickInputPendingIntent(context, "weight", 220)
            val quickRepsPi = RemkWidgetProvider.buildQuickInputPendingIntent(context, "reps", 221)
            views.setOnClickPendingIntent(R.id.w_set1_kg, quickWeightPi)
            views.setOnClickPendingIntent(R.id.w_set2_kg, quickWeightPi)
            views.setOnClickPendingIntent(R.id.w_set3_kg, quickWeightPi)
            views.setOnClickPendingIntent(R.id.w_set1_reps, quickRepsPi)
            views.setOnClickPendingIntent(R.id.w_set2_reps, quickRepsPi)
            views.setOnClickPendingIntent(R.id.w_set3_reps, quickRepsPi)

            views.setOnClickPendingIntent(
                R.id.btn_w_prev_ex,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_SWITCH_EX, 220, false, "-1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_next_ex,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_SWITCH_EX, 221, false, "1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_complete_set_direct,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_COMPLETE_SET, 212, false, "1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_complete_set_2,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_COMPLETE_SET, 213, false, "2")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_complete_set_3,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_COMPLETE_SET, 214, false, "3")
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_start_workout,
                RemkWidgetProvider.buildLaunchPendingIntent(context, "workout", 201)
            )
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}

class RemkEnduranceWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val syncArr = try { JSONArray(prefs.getString("remk_shop_list_sync_v365", "[]") ?: "[]") } catch (e: Exception) { JSONArray() }
        if (syncArr.length() > 0) {
            RemkWidgetProvider.syncLegacyTop3ShopSlotsFromList(prefs, syncArr)
        }
        val item0 = prefs.getString("widget_shop_item_0", "☐ 1,2 kg Geflügelbrustfilet") ?: "☐ 1,2 kg Geflügelbrustfilet"
        val item1 = prefs.getString("widget_shop_item_1", "☐ 1,5 kg Magerquark / Skyr") ?: "☐ 1,5 kg Magerquark / Skyr"
        val item2 = prefs.getString("widget_shop_item_2", "☐ 750 g Basmatireis & Haferflocken") ?: "☐ 750 g Basmatireis & Haferflocken"
        val summary = prefs.getString("widget_endurance_summary", "🛒 LIVE-EINKAUFSLISTE (1-TAP = ✓)") ?: "🛒 LIVE-EINKAUFSLISTE"

        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.remk_widget_endurance)
            views.setTextViewText(R.id.w_endurance_kpi, summary)
            views.setTextViewText(R.id.btn_shop_item_0, item0)
            views.setTextViewText(R.id.btn_shop_item_1, item1)
            views.setTextViewText(R.id.btn_shop_item_2, item2)

            views.setOnClickPendingIntent(
                R.id.btn_shop_item_0,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_TOGGLE_SHOP_ITEM, 310, false, "0")
            )
            views.setOnClickPendingIntent(
                R.id.btn_shop_item_1,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_TOGGLE_SHOP_ITEM, 311, false, "1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_shop_item_2,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_TOGGLE_SHOP_ITEM, 312, false, "2")
            )
            views.setOnClickPendingIntent(
                R.id.btn_shop_prev,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_SHOP_PAGE_STEP, 320, false, "-1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_shop_next,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_SHOP_PAGE_STEP, 321, false, "1")
            )
            // Direkt ohne Haupt-App-Start ergänzen (Schreiben / Sprechen / Barcode-Scan)
            views.setOnClickPendingIntent(R.id.btn_shop_add_text, RemkWidgetProvider.buildQuickInputPendingIntent(context, "shop_text", 322))
            views.setOnClickPendingIntent(R.id.btn_shop_add_voice, RemkWidgetProvider.buildQuickInputPendingIntent(context, "shop_voice", 323))
            views.setOnClickPendingIntent(R.id.btn_shop_add_scan, RemkWidgetProvider.buildQuickInputPendingIntent(context, "shop_scan", 324))
            views.setOnClickPendingIntent(R.id.btn_w_run, RemkWidgetProvider.buildLaunchPendingIntent(context, "shopping", 301))

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}

class RemkHealthWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val todayKey = "step_baseline_" + java.text.SimpleDateFormat("yyyyMMdd", Locale.GERMANY).format(java.util.Date())
        val realSteps = if (prefs.contains(todayKey)) prefs.getInt("steps_today", 0).coerceAtLeast(0) else 0
        val stepsStr = prefs.getString("widget_steps", realSteps.toString()) ?: realSteps.toString()
        val stepKcal = prefs.getString("widget_step_kcal", "🔥 0 kcal") ?: "🔥 0 kcal"
        val sleep = prefs.getString("widget_sleep", "😴 7,5 Std.") ?: "😴 7,5 Std."
        val pulse = prefs.getString("widget_pulse", "❤️ 62 BPM") ?: "❤️ 62 BPM"
        val readiness = prefs.getString("widget_readiness", "⚡ 92% Fit") ?: "⚡ 92% Fit"
        val isMuted = prefs.getBoolean("coach_muted_v251", false)
        val coachLabel = if (isMuted) "🔇 Coach: AUS" else "🗣️🔥 Coach: AN"

        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.remk_widget_health)
            views.setTextViewText(R.id.w_health_steps, "👟 $stepsStr Schritte  •  $stepKcal")
            views.setTextViewText(R.id.w_health_vitals, "$pulse  |  $sleep  |  $readiness")
            views.setTextViewText(R.id.btn_w_toggle_coach, coachLabel)

            views.setOnClickPendingIntent(
                R.id.btn_w_toggle_coach,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_TOGGLE_COACH_MUTE, 410)
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_start_timer,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_START_TIMER_90, 411)
            )
            views.setOnClickPendingIntent(
                R.id.btn_w_open_health,
                RemkWidgetProvider.buildLaunchPendingIntent(context, "health_hub", 401)
            )
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}

/**
 * Widget 5 (NEU v36.5): 🏆 RE:MK Vollbild-Cockpit (4x5 / ganze Seite)
 * Zeigt Level, Rang, XP, ACWR, Kalorien, Protein, Wasser (+250 ml), Schritte,
 * aktuelles Training (✓ Satz), Einkaufs-Zähler (+Text) & Tägliche Missionen!
 */
class RemkCockpitWidgetProvider : AppWidgetProvider() {
    private fun loadRotatedBodyFrame(context: Context, isFemale: Boolean, angleIdx: Int): Bitmap? {
        return try {
            val resId = if (isFemale) R.drawable.remk_w_cockpit_body_w else R.drawable.remk_w_cockpit_body_m
            val opts = BitmapFactory.Options().apply { inScaled = false }
            val sheet = BitmapFactory.decodeResource(context.resources, resId, opts) ?: return null
            if (sheet.width >= sheet.height) {
                val fw = sheet.width / 3
                val safeIdx = angleIdx.coerceIn(0, 2)
                Bitmap.createBitmap(sheet, safeIdx * fw, 0, fw, sheet.height)
            } else {
                sheet
            }
        } catch (e: Exception) {
            null
        }
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        RemkWidgetProvider.ensureDailyWaterReset(context)
        val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val lvlOn = prefs.getBoolean("widget_level_enabled_v365", true)
        val lv = prefs.getInt("widget_level_num_v365", 1)
        val rankTitle = prefs.getString("widget_rank_title_v365", "E-Rang Einsteiger") ?: "E-Rang Einsteiger"
        val xpPct = prefs.getInt("widget_xp_pct_v368", 25).coerceIn(0, 100)
        val xpText = prefs.getString("widget_xp_text_v368", "0 / 475 XP") ?: "0 / 475 XP"
        val gender = prefs.getString("widget_gender_v368", "m") ?: "m"
        val dotsLine = prefs.getString("widget_dots_line_v368", "DOTS · 80 KG") ?: "DOTS · 80 KG"
        val acwrText = prefs.getString("widget_acwr_text_v368", "ACWR 1,00") ?: "ACWR 1,00"

        val strVal = prefs.getInt("widget_str_v368", 50).coerceIn(0, 100)
        val athVal = prefs.getInt("widget_ath_v379", 55).coerceIn(0, 100)
        val endVal = prefs.getInt("widget_end_v368", 50).coerceIn(0, 100)
        val mobVal = prefs.getInt("widget_mob_v379", prefs.getInt("widget_vit_v368", 55)).coerceIn(0, 100)
        val recVal = prefs.getInt("widget_rec_v368", 78).coerceIn(0, 100)
        val conVal = prefs.getInt("widget_con_v368", 52).coerceIn(0, 100)

        val angleIdx = prefs.getInt("widget_cockpit_angle_v379", 0) % 3
        val viewMode = prefs.getInt("widget_cockpit_view_v379", 0) % 2
        val angleLabel = when (angleIdx) { 1 -> "↻ 90° Seite"; 2 -> "↻ Hinten"; else -> "↻ Vorne" }
        val bodyBmp = loadRotatedBodyFrame(context, gender == "w", angleIdx)

        val waterMl = prefs.getInt("widget_water_ml", 0)
        val waterL = String.format(Locale.GERMANY, "%.1f", waterMl / 1000.0f)
        val targetL = prefs.getString("widget_water_target_l", "2,8") ?: "2,8"
        val workout = (prefs.getString("widget_workout", "Training bereit") ?: "Training bereit").split("•")[0].trim()
        val rawW = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
        val rawR = prefs.getString("watch_target_reps", "10") ?: "10"
        val wStr = if (rawW % 1.0 == 0.0) rawW.toInt().toString() else rawW.toString().replace(".", ",")

        val todayKey = "step_baseline_" + java.text.SimpleDateFormat("yyyyMMdd", Locale.GERMANY).format(java.util.Date())
        val realSteps = if (prefs.contains(todayKey)) prefs.getInt("steps_today", 0).coerceAtLeast(0) else 0
        val steps = prefs.getString("widget_steps", realSteps.toString()) ?: realSteps.toString()

        val shopArr = try { JSONArray(prefs.getString("remk_shop_list_sync_v365", "[]") ?: "[]") } catch (e: Exception) { JSONArray() }
        var openShop = 0
        for (i in 0 until shopArr.length()) {
            if (!(shopArr.optJSONObject(i)?.optBoolean("checked", false) ?: false)) openShop++
        }

        val m1 = prefs.getString("widget_m1_v368", "○ Wasser-Ziel") ?: "○ Wasser-Ziel"
        val m2 = prefs.getString("widget_m2_v368", "○ Protein-Ziel") ?: "○ Protein-Ziel"
        val m3 = prefs.getString("widget_m3_v368", "○ Workout / 8k") ?: "○ Workout / 8k"
        val calToday = prefs.getString("widget_cal_today_title", "🏋️ Heute aktiv") ?: "🏋️ Heute aktiv"
        val kcalLeft = prefs.getString("widget_kcal", "2450 kcal") ?: "2450 kcal"

        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.remk_widget_cockpit)
            views.setTextViewText(R.id.w_ck_level, if (lvlOn) "LV. $lv" else "COCKPIT")
            views.setTextViewText(R.id.w_ck_rank, if (lvlOn) rankTitle.uppercase() else "RE:MK 360°")
            views.setTextViewText(R.id.btn_ck_toggle_view, if (viewMode == 0) "📊 6-Axis" else "📅 Heute")
            views.setProgressBar(R.id.w_ck_xp_bar, 100, if (lvlOn) xpPct else 100, false)
            views.setTextViewText(R.id.w_ck_xp_line, if (lvlOn) xpText else "$acwrText 🟢")
            views.setTextViewText(R.id.w_ck_dots_line, "$dotsLine · $acwrText")
            views.setTextViewText(R.id.w_ck_angle_lbl, angleLabel)
            if (bodyBmp != null) {
                views.setImageViewBitmap(R.id.w_ck_body_img, bodyBmp)
            }

            if (viewMode == 0) {
                views.setTextViewText(R.id.w_ck_lbl_1, "STR Kraft")
                views.setTextViewText(R.id.w_ck_val_str, strVal.toString())
                views.setProgressBar(R.id.w_ck_bar_str, 100, strVal, false)

                views.setTextViewText(R.id.w_ck_lbl_2, "ATH Athletik")
                views.setTextViewText(R.id.w_ck_val_ath, athVal.toString())
                views.setProgressBar(R.id.w_ck_bar_ath, 100, athVal, false)

                views.setTextViewText(R.id.w_ck_lbl_3, "END Ausdauer")
                views.setTextViewText(R.id.w_ck_val_end, endVal.toString())
                views.setProgressBar(R.id.w_ck_bar_end, 100, endVal, false)

                views.setTextViewText(R.id.w_ck_lbl_4, "MOB Mobility")
                views.setTextViewText(R.id.w_ck_val_vit, mobVal.toString())
                views.setProgressBar(R.id.w_ck_bar_vit, 100, mobVal, false)

                views.setTextViewText(R.id.w_ck_lbl_5, "REC Erholung")
                views.setTextViewText(R.id.w_ck_val_rec, recVal.toString())
                views.setProgressBar(R.id.w_ck_bar_rec, 100, recVal, false)

                views.setTextViewText(R.id.w_ck_lbl_6, "CON Konstanz")
                views.setTextViewText(R.id.w_ck_val_con, conVal.toString())
                views.setProgressBar(R.id.w_ck_bar_con, 100, conVal, false)
            } else {
                val waterPct = ((waterMl / 2800.0) * 100.0).toInt().coerceIn(0, 100)
                val stepPct = (((steps.replace(".", "").toIntOrNull() ?: 0) / 100.0)).toInt().coerceIn(0, 100)
                views.setTextViewText(R.id.w_ck_lbl_1, "📅 Termin heute")
                views.setTextViewText(R.id.w_ck_val_str, calToday.take(12))
                views.setProgressBar(R.id.w_ck_bar_str, 100, 100, false)

                views.setTextViewText(R.id.w_ck_lbl_2, "🔥 Kalorien")
                views.setTextViewText(R.id.w_ck_val_ath, kcalLeft.take(11))
                views.setProgressBar(R.id.w_ck_bar_ath, 100, 75, false)

                views.setTextViewText(R.id.w_ck_lbl_3, "💧 Hydration")
                views.setTextViewText(R.id.w_ck_val_end, "$waterL L")
                views.setProgressBar(R.id.w_ck_bar_end, 100, waterPct, false)

                views.setTextViewText(R.id.w_ck_lbl_4, "👟 Schritte")
                views.setTextViewText(R.id.w_ck_val_vit, steps)
                views.setProgressBar(R.id.w_ck_bar_vit, 100, stepPct, false)

                views.setTextViewText(R.id.w_ck_lbl_5, "🛡️ Belastung")
                views.setTextViewText(R.id.w_ck_val_rec, acwrText)
                views.setProgressBar(R.id.w_ck_bar_rec, 100, recVal, false)

                views.setTextViewText(R.id.w_ck_lbl_6, "⚡ Fortschritt")
                views.setTextViewText(R.id.w_ck_val_con, "$xpPct%")
                views.setProgressBar(R.id.w_ck_bar_con, 100, xpPct, false)
            }

            views.setTextViewText(R.id.w_ck_water, "$waterL / $targetL L")
            views.setTextViewText(R.id.w_ck_workout_title, "🏋️ $workout")
            views.setTextViewText(R.id.w_ck_workout_set, "✓ $wStr kg × $rawR")
            views.setTextViewText(R.id.w_ck_shop_count, if (openShop > 0) "$openShop offen" else "+ Artikel")
            views.setTextViewText(R.id.w_ck_steps, "👟 $steps")
            views.setTextViewText(R.id.btn_ck_m1, m1)
            views.setTextViewText(R.id.btn_ck_m2, m2)
            views.setTextViewText(R.id.btn_ck_m3, m3)

            // Lebendige 1-Tap Interaktionen direkt auf dem Homescreen!
            views.setOnClickPendingIntent(
                R.id.btn_ck_rotate_body,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_COCKPIT_ROTATE_BODY, 520)
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_toggle_view,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_COCKPIT_TOGGLE_VIEW, 521)
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_m1,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_COCKPIT_TOGGLE_QUEST, 522, false, "0")
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_m2,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_COCKPIT_TOGGLE_QUEST, 523, false, "1")
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_m3,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_COCKPIT_TOGGLE_QUEST, 524, false, "2")
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_water,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_ADD_WATER_250, 510)
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_complete_set,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_WORKOUT_COMPLETE_SET, 511)
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_shop_quick,
                RemkWidgetProvider.buildQuickInputPendingIntent(context, "shop_text", 512)
            )
            views.setOnClickPendingIntent(
                R.id.btn_ck_lockscreen,
                RemkWidgetProvider.buildBroadcastPendingIntent(context, RemkWidgetProvider.ACTION_OPEN_LOCKSCREEN_QUICK, 513, false, "shopping")
            )
            views.setOnClickPendingIntent(
                R.id.w_ck_bonus_banner,
                RemkWidgetProvider.buildLaunchPendingIntent(context, "activity", 525)
            )
            views.setOnClickPendingIntent(
                R.id.w_ck_header_box,
                RemkWidgetProvider.buildLaunchPendingIntent(context, "cockpit", 501)
            )

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}

class RemkCalendarWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val todayTitle = prefs.getString("widget_cal_today_title", "🏋️ Heute · 17:30 Uhr") ?: "🏋️ Heute · 17:30 Uhr"
        val todaySub = prefs.getString("widget_cal_today_sub", "Öffne RE:MK für deinen Wochenplan") ?: "RE:MK Wochenplan"
        val next1 = prefs.getString("widget_cal_next1", "Mi 17:30 • 🏋️ Gym") ?: "Mi 17:30 • 🏋️ Gym"
        val next2 = prefs.getString("widget_cal_next2", "Fr 17:30 • 🏋️ Gym") ?: "Fr 17:30 • 🏋️ Gym"
        val next3 = prefs.getString("widget_cal_next3", "Mo 17:30 • 🛋️ Zuhause") ?: "Mo 17:30 • 🛋️ Zuhause"

        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.remk_widget_calendar)
            views.setTextViewText(R.id.w_cal_today_title, todayTitle)
            views.setTextViewText(R.id.w_cal_today_sub, todaySub)
            views.setTextViewText(R.id.w_cal_next_1, "• $next1")
            views.setTextViewText(R.id.w_cal_next_2, "• $next2")
            views.setTextViewText(R.id.w_cal_next_3, "• $next3")

            views.setOnClickPendingIntent(R.id.btn_cal_open, RemkWidgetProvider.buildLaunchPendingIntent(context, "calendar", 601))
            views.setOnClickPendingIntent(R.id.w_cal_header, RemkWidgetProvider.buildLaunchPendingIntent(context, "calendar", 602))
            views.setOnClickPendingIntent(R.id.btn_cal_start_workout, RemkWidgetProvider.buildLaunchPendingIntent(context, "workout", 603))
            views.setOnClickPendingIntent(R.id.btn_cal_add_activity, RemkWidgetProvider.buildLaunchPendingIntent(context, "activity", 604))

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
