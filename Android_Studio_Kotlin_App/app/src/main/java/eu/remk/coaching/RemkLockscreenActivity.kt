package eu.remk.coaching

import android.app.Activity
import android.app.KeyguardManager
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.Paint
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.view.ViewGroup
import android.view.Window
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import org.json.JSONArray
import kotlin.math.max

/**
 * RE:MK v36.5 – Nativer Sperrbildschirm-Modus für JEDEN Bereich (auch bei geschlossener App!):
 *  - 🛒 Einkaufsliste (alle Artikel scroll- & abhakbar + Tippen / Sprechen / Barcode-Scan)
 *  - 🏋️ Training (±2,5 kg, ±1 Wdh., exakte Zahl per Mini-Popup, ✓ Satz abhaken & Pausen-Timer)
 *  - 🍲 Ernährung / Heute (Mahlzeiten abhaken + +250 ml Wasser + Makros)
 *  - 🧘 Mobility / Timer (30s / 60s / 90s Halte-Timer)
 */
class RemkLockscreenActivity : Activity() {

    private var activeMode: String = "shopping"
    private lateinit var contentHost: LinearLayout
    private lateinit var headerSubTv: TextView
    private val uiHandler = Handler(Looper.getMainLooper())
    private var timerSecLeft: Int = 0
    private var timerRunning: Boolean = false
    private val tickRunnable = object : Runnable {
        override fun run() {
            if (timerRunning && timerSecLeft > 0) {
                timerSecLeft--
                renderModeContent()
                if (timerSecLeft > 0) uiHandler.postDelayed(this, 1000L)
                else timerRunning = false
            }
            updateCountdownHeader()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
        } else {
            @Suppress("DEPRECATION")
            window.addFlags(
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
            )
        }
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        activeMode = intent?.getStringExtra("remk_lock_mode")
            ?: RemkLockscreenManager.getActiveMode(this)

        buildShellUi(prefs.getBoolean("remk_native_theme_is_dark", true))
    }

    override fun onResume() {
        super.onResume()
        updateCountdownHeader()
        renderModeContent()
    }

    override fun onDestroy() {
        uiHandler.removeCallbacks(tickRunnable)
        super.onDestroy()
    }

    private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()

    private fun roundedBg(fillHex: String, strokeHex: String = "#2A354B", radiusDp: Int = 14): GradientDrawable {
        return GradientDrawable().apply {
            setColor(Color.parseColor(fillHex))
            cornerRadius = dp(radiusDp).toFloat()
            setStroke(dp(1), Color.parseColor(strokeHex))
        }
    }

    private fun buildShellUi(isDark: Boolean) {
        val bgHex = if (isDark) "#090D14" else "#F3F6FB"
        val cardHex = if (isDark) "#111824" else "#FFFFFF"
        val textHex = if (isDark) "#F8FAFC" else "#0F172A"
        val mutedHex = if (isDark) "#94A3B8" else "#475569"

        window.statusBarColor = Color.parseColor(bgHex)
        window.navigationBarColor = Color.parseColor(bgHex)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(Color.parseColor(bgHex))
            setPadding(dp(14), dp(18), dp(14), dp(16))
        }

        // Top Bar
        val topBar = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            background = roundedBg(cardHex, "#FF5E00", 16)
            setPadding(dp(14), dp(10), dp(12), dp(10))
        }
        val titleBox = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            layoutParams = LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f)
        }
        titleBox.addView(TextView(this).apply {
            text = "🔒 RE:MK SPERRBILDSCHIRM"
            textSize = 13f
            setTextColor(Color.parseColor("#FF5E00"))
            setTypeface(null, android.graphics.Typeface.BOLD)
        })
        headerSubTv = TextView(this).apply {
            text = "Direkt bedienbar ohne Entsperren"
            textSize = 11.5f
            setTextColor(Color.parseColor(mutedHex))
        }
        titleBox.addView(headerSubTv)
        topBar.addView(titleBox)

        val stopBtn = Button(this).apply {
            text = "✕ Aus"
            textSize = 12f
            setTextColor(Color.WHITE)
            background = roundedBg("#EF4444", "#EF4444", 10)
            layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, dp(36))
            setOnClickListener {
                RemkLockscreenManager.stopLockscreenMode(this@RemkLockscreenActivity)
                finish()
            }
        }
        topBar.addView(stopBtn)
        root.addView(topBar)

        // Mode Switcher Bar (4 Modi)
        val modeRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, dp(10), 0, dp(10))
        }
        val modes = listOf(
            "shopping" to "🛒 Einkauf",
            "workout" to "🏋️ Training",
            "nutrition" to "🍲 Heute",
            "mobility" to "🧘 Timer"
        )
        modes.forEach { (mKey, mLbl) ->
            val b = Button(this).apply {
                text = mLbl
                textSize = 11.5f
                setTextColor(Color.parseColor(if (activeMode == mKey) "#FFFFFF" else textHex))
                background = roundedBg(if (activeMode == mKey) "#FF5E00" else cardHex, if (activeMode == mKey) "#FF5E00" else "#334155", 12)
                layoutParams = LinearLayout.LayoutParams(0, dp(38), 1f).apply { setMargins(dp(3), 0, dp(3), 0) }
                setOnClickListener {
                    activeMode = mKey
                    buildShellUi(isDark)
                    renderModeContent()
                }
            }
            modeRow.addView(b)
        }
        root.addView(modeRow)

        // Scrollable Content Host
        val scroll = ScrollView(this).apply {
            layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f)
        }
        contentHost = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(0, dp(4), 0, dp(12))
        }
        scroll.addView(contentHost)
        root.addView(scroll)

        // Bottom Safe Open Main App Button (verlangt Entsperren -> Datenschutz!)
        val openAppBtn = Button(this).apply {
            text = "🔓 Entsperren & Haupt-App öffnen"
            textSize = 12.5f
            setTextColor(Color.parseColor(textHex))
            background = roundedBg(cardHex, "#334155", 14)
            layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(44)).apply {
                topMargin = dp(8)
            }
            setOnClickListener {
                val km = getSystemService(Context.KEYGUARD_SERVICE) as? KeyguardManager
                val launch = Intent(this@RemkLockscreenActivity, MainActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                    putExtra("remk_widget_mode", activeMode)
                }
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && km != null && km.isKeyguardLocked) {
                    km.requestDismissKeyguard(this@RemkLockscreenActivity, object : KeyguardManager.KeyguardDismissCallback() {
                        override fun onDismissSucceeded() {
                            startActivity(launch)
                            finish()
                        }
                    })
                } else {
                    startActivity(launch)
                    finish()
                }
            }
        }
        root.addView(openAppBtn)

        setContentView(root)
        updateCountdownHeader()
        renderModeContent()
    }

    private fun updateCountdownHeader() {
        val remMin = RemkLockscreenManager.getRemainingMinutes(this)
        headerSubTv.text = when {
            remMin > 0 -> "⏱️ Aktiv auf Sperrbildschirm • noch $remMin Min."
            else -> "Direkt bedienbar ohne Entsperren"
        }
    }

    private fun renderModeContent() {
        if (!::contentHost.isInitialized) return
        contentHost.removeAllViews()
        val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val isDark = prefs.getBoolean("remk_native_theme_is_dark", true)
        val cardHex = if (isDark) "#111824" else "#FFFFFF"
        val textHex = if (isDark) "#F8FAFC" else "#0F172A"
        val mutedHex = if (isDark) "#94A3B8" else "#475569"

        when (activeMode) {
            "shopping" -> renderShoppingLockView(prefs, cardHex, textHex, mutedHex)
            "workout" -> renderWorkoutLockView(prefs, cardHex, textHex, mutedHex)
            "nutrition" -> renderNutritionLockView(prefs, cardHex, textHex, mutedHex)
            else -> renderMobilityLockView(cardHex, textHex, mutedHex)
        }
    }

    private fun renderShoppingLockView(prefs: android.content.SharedPreferences, cardHex: String, textHex: String, mutedHex: String) {
        // Schnell-Eingabe-Leiste: Schreiben, Sprechen, Barcode-Scan, Erledigte leeren
        val bar = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, 0, 0, dp(10))
        }
        listOf(
            Triple("✏️ +Text", "shop_text", "#10B981"),
            Triple("🎤 Sprechen", "shop_voice", "#38BDF8"),
            Triple("📷 Scan", "shop_scan", "#FF5E00")
        ).forEach { (lbl, qMode, col) ->
            bar.addView(Button(this).apply {
                text = lbl
                textSize = 12f
                setTextColor(Color.WHITE)
                background = roundedBg(col, col, 12)
                layoutParams = LinearLayout.LayoutParams(0, dp(42), 1f).apply { setMargins(dp(3), 0, dp(3), 0) }
                setOnClickListener {
                    startActivity(Intent(this@RemkLockscreenActivity, RemkQuickInputActivity::class.java).apply {
                        putExtra("remk_quick_mode", qMode)
                    })
                }
            })
        }
        contentHost.addView(bar)

        val arr = try { JSONArray(prefs.getString("remk_shop_list_sync_v365", "[]") ?: "[]") } catch (e: Exception) { JSONArray() }
        val openIndices = mutableListOf<Int>()
        val doneIndices = mutableListOf<Int>()
        for (i in 0 until arr.length()) {
            val o = arr.optJSONObject(i) ?: continue
            if (o.optBoolean("checked", false)) doneIndices.add(i) else openIndices.add(i)
        }

        if (openIndices.isEmpty() && doneIndices.isEmpty()) {
            contentHost.addView(TextView(this).apply {
                text = "🛒 Deine Einkaufsliste ist noch leer.\nNutze oben ✏️ +Text, 🎤 Sprechen oder 📷 Scan!"
                textSize = 14f
                setTextColor(Color.parseColor(mutedHex))
                gravity = Gravity.CENTER
                setPadding(dp(16), dp(28), dp(16), dp(28))
            })
            return
        }

        val ordered = openIndices + doneIndices
        ordered.forEach { idx ->
            val obj = arr.optJSONObject(idx) ?: return@forEach
            val checked = obj.optBoolean("checked", false)
            val qty = obj.optInt("qty", 1)
            val txt = obj.optString("text", "")
            val prefix = if (checked) "☑ " else "☐ "
            val qtyPrefix = if (qty > 1) "${qty}× " else ""

            val row = TextView(this).apply {
                text = "$prefix$qtyPrefix$txt"
                textSize = 15f
                setTextColor(Color.parseColor(if (checked) mutedHex else textHex))
                setTypeface(null, android.graphics.Typeface.BOLD)
                if (checked) paintFlags = paintFlags or Paint.STRIKE_THRU_TEXT_FLAG
                background = roundedBg(if (checked) "#132922" else cardHex, if (checked) "#10B981" else "#334155", 13)
                setPadding(dp(14), dp(13), dp(14), dp(13))
                layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply {
                    bottomMargin = dp(7)
                }
                setOnClickListener {
                    obj.put("checked", !checked)
                    prefs.edit().putString("remk_shop_list_sync_v365", arr.toString()).apply()
                    RemkWidgetProvider.syncLegacyTop3ShopSlotsFromList(prefs, arr)
                    RemkWidgetProvider.enqueueCommandForWebView(this@RemkLockscreenActivity, "TOGGLE_SHOP_ITEM_TEXT", txt)
                    RemkWidgetProvider.broadcastUpdateAllWidgets(this@RemkLockscreenActivity)
                    renderModeContent()
                }
            }
            contentHost.addView(row)
        }

        if (doneIndices.isNotEmpty()) {
            contentHost.addView(Button(this).apply {
                text = "🧹 ${doneIndices.size} erledigte Artikel entfernen"
                textSize = 12.5f
                setTextColor(Color.parseColor("#EF4444"))
                background = roundedBg(cardHex, "#EF4444", 12)
                layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(42)).apply { topMargin = dp(6) }
                setOnClickListener {
                    val kept = JSONArray()
                    for (i in 0 until arr.length()) {
                        val o = arr.optJSONObject(i) ?: continue
                        if (!o.optBoolean("checked", false)) kept.put(o)
                    }
                    prefs.edit().putString("remk_shop_list_sync_v365", kept.toString()).apply()
                    RemkWidgetProvider.syncLegacyTop3ShopSlotsFromList(prefs, kept)
                    RemkWidgetProvider.enqueueCommandForWebView(this@RemkLockscreenActivity, "CLEAR_DONE_SHOP_ITEMS", "1")
                    RemkWidgetProvider.broadcastUpdateAllWidgets(this@RemkLockscreenActivity)
                    renderModeContent()
                }
            })
        }
    }

    private fun renderWorkoutLockView(prefs: android.content.SharedPreferences, cardHex: String, textHex: String, mutedHex: String) {
        val title = prefs.getString("widget_workout", "Bankdrücken • Satz 1") ?: "Bankdrücken • Satz 1"
        val curW = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
        val curR = (prefs.getString("watch_target_reps", "10") ?: "10").toIntOrNull() ?: 10
        val wStr = if (curW % 1.0 == 0.0) curW.toInt().toString() else curW.toString().replace(".", ",")

        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            background = roundedBg(cardHex, "#FF5E00", 18)
            setPadding(dp(16), dp(16), dp(16), dp(16))
        }
        card.addView(TextView(this).apply {
            text = "🏋️ $title"
            textSize = 18f
            setTextColor(Color.parseColor(textHex))
            setTypeface(null, android.graphics.Typeface.BOLD)
        })
        card.addView(TextView(this).apply {
            text = if (timerRunning && timerSecLeft > 0) "⏱️ Pausen-Timer läuft: ${timerSecLeft}s" else "Antippen für exakte Zahl oder ± direkt ändern"
            textSize = 12.5f
            setTextColor(Color.parseColor(if (timerRunning) "#10B981" else mutedHex))
            setPadding(0, dp(4), 0, dp(14))
        })

        // Gewicht-Zeile: -2.5 | [80,0 kg] | +2.5
        val wRow = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; setPadding(0, 0, 0, dp(10)) }
        wRow.addView(Button(this).apply {
            text = "−2,5"
            setTextColor(Color.parseColor(textHex))
            background = roundedBg("#232D40", "#334155", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(48), 1f)
            setOnClickListener { stepWeight(-2.5) }
        })
        wRow.addView(Button(this).apply {
            text = "⚖️ $wStr kg ✏️"
            textSize = 15f
            setTextColor(Color.parseColor("#FF5E00"))
            background = roundedBg("#090D14", "#FF5E00", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(48), 1.6f).apply { setMargins(dp(6), 0, dp(6), 0) }
            setOnClickListener {
                startActivity(Intent(this@RemkLockscreenActivity, RemkQuickInputActivity::class.java).apply { putExtra("remk_quick_mode", "weight") })
            }
        })
        wRow.addView(Button(this).apply {
            text = "+2,5"
            setTextColor(Color.parseColor("#38BDF8"))
            background = roundedBg("#132538", "#38BDF8", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(48), 1f)
            setOnClickListener { stepWeight(2.5) }
        })
        card.addView(wRow)

        // Wdh-Zeile: -1 | [10 Wdh.] | +1
        val rRow = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; setPadding(0, 0, 0, dp(14)) }
        rRow.addView(Button(this).apply {
            text = "−1"
            setTextColor(Color.parseColor(textHex))
            background = roundedBg("#232D40", "#334155", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(48), 1f)
            setOnClickListener { stepReps(-1) }
        })
        rRow.addView(Button(this).apply {
            text = "🔁 $curR Wdh. ✏️"
            textSize = 15f
            setTextColor(Color.parseColor("#10B981"))
            background = roundedBg("#090D14", "#10B981", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(48), 1.6f).apply { setMargins(dp(6), 0, dp(6), 0) }
            setOnClickListener {
                startActivity(Intent(this@RemkLockscreenActivity, RemkQuickInputActivity::class.java).apply { putExtra("remk_quick_mode", "reps") })
            }
        })
        rRow.addView(Button(this).apply {
            text = "+1"
            setTextColor(Color.parseColor("#10B981"))
            background = roundedBg("#0E2922", "#10B981", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(48), 1f)
            setOnClickListener { stepReps(1) }
        })
        card.addView(rRow)

        // Satz abhaken CTA
        card.addView(Button(this).apply {
            text = "✓ SATZ ABHAKEN & 90s PAUSE STARTEN"
            textSize = 14.5f
            setTextColor(Color.WHITE)
            background = roundedBg("#10B981", "#10B981", 14)
            layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(52))
            setOnClickListener {
                sendBroadcast(Intent(this@RemkLockscreenActivity, RemkWidgetProvider::class.java).apply {
                    action = RemkWidgetProvider.ACTION_WORKOUT_COMPLETE_SET
                })
                timerSecLeft = 90
                timerRunning = true
                uiHandler.removeCallbacks(tickRunnable)
                uiHandler.postDelayed(tickRunnable, 1000L)
                Toast.makeText(this@RemkLockscreenActivity, "✓ Satz geloggt! 90s Pause läuft", Toast.LENGTH_SHORT).show()
                uiHandler.postDelayed({ renderModeContent() }, 200L)
            }
        })
        contentHost.addView(card)
    }

    private fun stepWeight(delta: Double) {
        val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val cur = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
        val nxt = max(0.0, cur + delta)
        prefs.edit().putString("watch_target_weight", nxt.toString()).apply()
        RemkWidgetProvider.enqueueCommandForWebView(this, "STEP_WORKOUT_WEIGHT", delta.toString())
        RemkWidgetProvider.broadcastUpdateAllWidgets(this)
        renderModeContent()
    }

    private fun stepReps(delta: Int) {
        val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val cur = (prefs.getString("watch_target_reps", "10") ?: "10").toIntOrNull() ?: 10
        val nxt = (cur + delta).coerceIn(1, 50)
        prefs.edit().putString("watch_target_reps", nxt.toString()).apply()
        RemkWidgetProvider.enqueueCommandForWebView(this, "STEP_WORKOUT_REPS", delta.toString())
        RemkWidgetProvider.broadcastUpdateAllWidgets(this)
        renderModeContent()
    }

    private fun renderNutritionLockView(prefs: android.content.SharedPreferences, cardHex: String, textHex: String, mutedHex: String) {
        val kcal = prefs.getString("widget_kcal", "2.450 kcal") ?: "2.450 kcal"
        val prot = prefs.getString("widget_prot", "165 g P") ?: "165 g P"
        val waterMl = prefs.getInt("widget_water_ml", 0)
        val waterL = String.format("%.2f", waterMl / 1000.0).replace(".", ",")
        val targetL = prefs.getString("widget_water_target_l", "2,8") ?: "2,8"

        val top = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            background = roundedBg(cardHex, "#10B981", 16)
            setPadding(dp(16), dp(14), dp(16), dp(14))
            layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { bottomMargin = dp(10) }
        }
        top.addView(TextView(this).apply {
            text = "🍲 $kcal  •  $prot"
            textSize = 16.5f
            setTextColor(Color.parseColor(textHex))
            setTypeface(null, android.graphics.Typeface.BOLD)
        })
        top.addView(TextView(this).apply {
            text = "💧 Wasser heute: $waterL / $targetL L"
            textSize = 14f
            setTextColor(Color.parseColor("#38BDF8"))
            setPadding(0, dp(6), 0, dp(10))
        })
        top.addView(Button(this).apply {
            text = "💧 +250 ml Wasser trinken"
            setTextColor(Color.WHITE)
            background = roundedBg("#0284C7", "#38BDF8", 12)
            layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(46))
            setOnClickListener {
                sendBroadcast(Intent(this@RemkLockscreenActivity, RemkWidgetProvider::class.java).apply {
                    action = RemkWidgetProvider.ACTION_ADD_WATER_250
                })
                uiHandler.postDelayed({ renderModeContent() }, 180L)
            }
        })
        contentHost.addView(top)

        val mealLabels = listOf("🌅 Frühstück", "☀️ Mittagessen", "🍎 Snack", "🌙 Abendessen")
        mealLabels.forEachIndexed { idx, lbl ->
            val done = prefs.getBoolean("meal_slot_done_$idx", false)
            val mKcal = prefs.getString("widget_meal${idx}_kcal", "") ?: ""
            contentHost.addView(TextView(this).apply {
                text = "${if (done) "☑" else "☐"} $lbl  ${if (mKcal.isNotEmpty()) "• $mKcal" else ""}"
                textSize = 14.5f
                setTextColor(Color.parseColor(if (done) "#10B981" else textHex))
                setTypeface(null, android.graphics.Typeface.BOLD)
                background = roundedBg(if (done) "#0E2922" else cardHex, if (done) "#10B981" else "#334155", 13)
                setPadding(dp(14), dp(13), dp(14), dp(13))
                layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { bottomMargin = dp(7) }
                setOnClickListener {
                    sendBroadcast(Intent(this@RemkLockscreenActivity, RemkWidgetProvider::class.java).apply {
                        action = RemkWidgetProvider.ACTION_TOGGLE_MEAL_SLOT
                        putExtra("remk_extra_val", idx.toString())
                    })
                    uiHandler.postDelayed({ renderModeContent() }, 180L)
                }
            })
        }
    }

    private fun renderMobilityLockView(cardHex: String, textHex: String, mutedHex: String) {
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_HORIZONTAL
            background = roundedBg(cardHex, "#38BDF8", 18)
            setPadding(dp(18), dp(22), dp(18), dp(22))
        }
        card.addView(TextView(this).apply {
            text = "🧘 MOBILITY & HALTE-TIMER"
            textSize = 13f
            setTextColor(Color.parseColor("#38BDF8"))
            setTypeface(null, android.graphics.Typeface.BOLD)
        })
        card.addView(TextView(this).apply {
            val mm = timerSecLeft / 60
            val ss = timerSecLeft % 60
            text = String.format("%02d:%02d", mm, ss)
            textSize = 46f
            setTextColor(Color.parseColor(textHex))
            setTypeface(null, android.graphics.Typeface.BOLD)
            setPadding(0, dp(10), 0, dp(16))
        })
        val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
        listOf(30 to "30s", 60 to "60s", 90 to "90s", 120 to "2 Min").forEach { (sec, lbl) ->
            row.addView(Button(this).apply {
                text = lbl
                setTextColor(Color.WHITE)
                background = roundedBg("#0284C7", "#38BDF8", 12)
                layoutParams = LinearLayout.LayoutParams(0, dp(44), 1f).apply { setMargins(dp(3), 0, dp(3), 0) }
                setOnClickListener {
                    timerSecLeft = sec
                    timerRunning = true
                    uiHandler.removeCallbacks(tickRunnable)
                    uiHandler.postDelayed(tickRunnable, 1000L)
                    renderModeContent()
                }
            })
        }
        card.addView(row)
        if (timerRunning) {
            card.addView(Button(this).apply {
                text = "⏸️ Stoppen"
                setTextColor(Color.WHITE)
                background = roundedBg("#EF4444", "#EF4444", 12)
                layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(44)).apply { topMargin = dp(10) }
                setOnClickListener {
                    timerRunning = false
                    uiHandler.removeCallbacks(tickRunnable)
                    renderModeContent()
                }
            })
        }
        contentHost.addView(card)
    }
}
