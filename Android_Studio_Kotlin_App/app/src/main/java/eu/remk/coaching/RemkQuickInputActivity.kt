package eu.remk.coaching

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.os.Bundle
import android.speech.RecognizerIntent
import android.text.InputType
import android.view.Gravity
import android.view.ViewGroup
import android.view.Window
import android.view.WindowManager
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.util.Locale
import kotlin.concurrent.thread

/**
 * RE:MK v36.5 – Schlankes, transparentes natives Mini-Popup OHNE WebView-Start!
 * Erlaubt direkte Eingaben aus Homescreen-Widgets & vom Sperrbildschirm:
 *  - Exaktes Trainingsgewicht / Wiederholungen
 *  - Einkaufsartikel per Schreiben, Sprechen (RecognizerIntent) oder EAN-Barcode (OpenFoodFacts)
 */
class RemkQuickInputActivity : Activity() {

    private val REQ_VOICE = 7401
    private var mode: String = "weight"

    override fun onCreate(savedInstanceState: Bundle?) {
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
        } else {
            @Suppress("DEPRECATION")
            window.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON)
        }
        window.setBackgroundDrawable(ColorDrawable(Color.parseColor("#B3020617")))
        window.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)

        mode = intent?.getStringExtra("remk_quick_mode") ?: "weight"

        if (mode == "shop_voice") {
            launchNativeVoiceInput()
            return
        }
        buildDialogUi()
    }

    private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()

    private fun roundedBg(fillHex: String, strokeHex: String = "#2A354B", radiusDp: Int = 14): GradientDrawable {
        return GradientDrawable().apply {
            setColor(Color.parseColor(fillHex))
            cornerRadius = dp(radiusDp).toFloat()
            setStroke(dp(1), Color.parseColor(strokeHex))
        }
    }

    private fun launchNativeVoiceInput() {
        try {
            val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
                putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                putExtra(RecognizerIntent.EXTRA_LANGUAGE, "de-DE")
                putExtra(RecognizerIntent.EXTRA_PROMPT, "Artikel nennen (z. B. Hafermilch und Bananen)")
            }
            @Suppress("DEPRECATION")
            startActivityForResult(intent, REQ_VOICE)
        } catch (e: Exception) {
            Toast.makeText(this, "Spracheingabe nicht verfügbar – bitte tippen", Toast.LENGTH_SHORT).show()
            mode = "shop_text"
            buildDialogUi()
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQ_VOICE) {
            if (resultCode == RESULT_OK && data != null) {
                val results = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
                val spoken = results?.firstOrNull()?.trim() ?: ""
                if (spoken.isNotEmpty()) {
                    val added = addItemsToSharedShoppingList(this, spoken)
                    Toast.makeText(this, "🎤 $added Artikel hinzugefügt", Toast.LENGTH_SHORT).show()
                }
            }
            finish()
        }
    }

    private fun buildDialogUi() {
        val prefs = getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
        val isDark = prefs.getBoolean("remk_native_theme_is_dark", true)
        val cardHex = if (isDark) "#111824" else "#FFFFFF"
        val textHex = if (isDark) "#F8FAFC" else "#0F172A"
        val mutedHex = if (isDark) "#94A3B8" else "#475569"
        val inpHex = if (isDark) "#090D14" else "#F1F5F9"

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(dp(20), dp(20), dp(20), dp(20))
            setOnClickListener { finish() }
        }

        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            background = roundedBg(cardHex, "#FF5E00", 20)
            setPadding(dp(18), dp(16), dp(18), dp(16))
            isClickable = true
            layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        }

        val titleTv = TextView(this).apply {
            textSize = 16f
            setTextColor(Color.parseColor(textHex))
            setTypeface(null, android.graphics.Typeface.BOLD)
            text = when (mode) {
                "weight" -> "⚖️ Trainingsgewicht ändern (kg)"
                "reps" -> "🔁 Wiederholungen ändern"
                "shop_scan" -> "📷 Produkt-Barcode (EAN) eintragen"
                else -> "🛒 Einkaufs-Artikel hinzufügen"
            }
        }
        card.addView(titleTv)

        val hintTv = TextView(this).apply {
            textSize = 12f
            setTextColor(Color.parseColor(mutedHex))
            setPadding(0, dp(4), 0, dp(10))
            text = when (mode) {
                "weight" -> "Direkt im Widget speichern – ohne die Haupt-App zu öffnen."
                "reps" -> "Exakte Wiederholungszahl für den aktuellen Satz."
                "shop_scan" -> "EAN-Nummer eingeben (z. B. 4008400401621) – OpenFoodFacts erkennt das Produkt automatisch!"
                else -> "Mehrere Artikel einfach mit Komma oder „und“ trennen (z. B. Milch, Bananen und Spüli)."
            }
        }
        card.addView(hintTv)

        val edit = EditText(this).apply {
            background = roundedBg(inpHex, "#334155", 12)
            setTextColor(Color.parseColor(textHex))
            setHintTextColor(Color.parseColor(mutedHex))
            setPadding(dp(14), dp(12), dp(14), dp(12))
            textSize = 17f
            when (mode) {
                "weight" -> {
                    inputType = InputType.TYPE_CLASS_NUMBER or InputType.TYPE_NUMBER_FLAG_DECIMAL
                    setText((prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(".", ","))
                    selectAll()
                }
                "reps" -> {
                    inputType = InputType.TYPE_CLASS_NUMBER
                    setText(prefs.getString("watch_target_reps", "10") ?: "10")
                    selectAll()
                }
                "shop_scan" -> {
                    inputType = InputType.TYPE_CLASS_NUMBER
                    hint = "EAN-Barcode (8–14 Ziffern)..."
                }
                else -> {
                    inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
                    hint = "z. B. Hafermilch, Äpfel, Spüli..."
                }
            }
        }
        card.addView(edit)

        // Schnell-Step-Buttons bei Gewicht & Wiederholungen
        if (mode == "weight" || mode == "reps") {
            val stepRow = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                setPadding(0, dp(10), 0, dp(4))
            }
            val deltas = if (mode == "weight") listOf(-5.0, -2.5, 2.5, 5.0) else listOf(-2.0, -1.0, 1.0, 2.0)
            deltas.forEach { dVal ->
                val b = Button(this).apply {
                    text = if (dVal > 0) "+${if (dVal % 1.0 == 0.0) dVal.toInt() else dVal.toString().replace(".", ",")}"
                           else "${if (dVal % 1.0 == 0.0) dVal.toInt() else dVal.toString().replace(".", ",")}"
                    textSize = 13f
                    setTextColor(Color.parseColor(textHex))
                    background = roundedBg(inpHex, "#334155", 10)
                    layoutParams = LinearLayout.LayoutParams(0, dp(40), 1f).apply { setMargins(dp(3), 0, dp(3), 0) }
                    setOnClickListener {
                        val cur = edit.text.toString().replace(",", ".").toDoubleOrNull() ?: 0.0
                        val nxt = (cur + dVal).coerceAtLeast(if (mode == "reps") 1.0 else 0.0)
                        edit.setText(if (nxt % 1.0 == 0.0) nxt.toInt().toString() else nxt.toString().replace(".", ","))
                        edit.setSelection(edit.text.length)
                    }
                }
                stepRow.addView(b)
            }
            card.addView(stepRow)
        }

        // Action-Leiste: Abbrechen & Speichern
        val btnRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, dp(14), 0, 0)
        }
        val cancelBtn = Button(this).apply {
            text = "Abbrechen"
            setTextColor(Color.parseColor(mutedHex))
            background = roundedBg(inpHex, "#334155", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(44), 1f).apply { setMargins(0, 0, dp(6), 0) }
            setOnClickListener { finish() }
        }
        val saveBtn = Button(this).apply {
            text = if (mode == "shop_scan") "🔍 Suchen & Hinzufügen" else "✓ Speichern"
            setTextColor(Color.WHITE)
            background = roundedBg("#FF5E00", "#FF5E00", 12)
            layoutParams = LinearLayout.LayoutParams(0, dp(44), 1.4f).apply { setMargins(dp(6), 0, 0, 0) }
            setOnClickListener {
                val raw = edit.text.toString().trim()
                if (raw.isEmpty()) {
                    finish()
                    return@setOnClickListener
                }
                when (mode) {
                    "weight" -> {
                        val wVal = raw.replace(",", ".").toDoubleOrNull()
                        if (wVal != null && wVal >= 0.0) {
                            val wFmt = if (wVal % 1.0 == 0.0) wVal.toInt().toString() else wVal.toString().replace(".", ",")
                            val curR = prefs.getString("watch_target_reps", "10") ?: "10"
                            prefs.edit()
                                .putString("watch_target_weight", wVal.toString())
                                .putString("widget_next_ex", "⚖️ Aktueller Satz: $wFmt kg × $curR Wdh.")
                                .apply()
                            RemkWidgetProvider.enqueueCommandForWebView(this@RemkQuickInputActivity, "SET_WORKOUT_WEIGHT", wVal.toString())
                            RemkWidgetProvider.broadcastUpdateAllWidgets(this@RemkQuickInputActivity)
                            Toast.makeText(this@RemkQuickInputActivity, "⚖️ $wFmt kg gespeichert", Toast.LENGTH_SHORT).show()
                        }
                        finish()
                    }
                    "reps" -> {
                        val rVal = raw.toIntOrNull()?.coerceIn(1, 50)
                        if (rVal != null) {
                            val curW = (prefs.getString("watch_target_weight", "77.5") ?: "77.5").replace(",", ".").toDoubleOrNull() ?: 77.5
                            val wFmt = if (curW % 1.0 == 0.0) curW.toInt().toString() else curW.toString().replace(".", ",")
                            prefs.edit()
                                .putString("watch_target_reps", rVal.toString())
                                .putString("widget_next_ex", "⚖️ Aktueller Satz: $wFmt kg × $rVal Wdh.")
                                .apply()
                            RemkWidgetProvider.enqueueCommandForWebView(this@RemkQuickInputActivity, "SET_WORKOUT_REPS", rVal.toString())
                            RemkWidgetProvider.broadcastUpdateAllWidgets(this@RemkQuickInputActivity)
                            Toast.makeText(this@RemkQuickInputActivity, "🔁 $rVal Wdh. gespeichert", Toast.LENGTH_SHORT).show()
                        }
                        finish()
                    }
                    "shop_scan" -> {
                        isEnabled = false
                        text = "⏳ Suche Produkt..."
                        lookupOpenFoodFactsAndAdd(raw)
                    }
                    else -> {
                        val cnt = addItemsToSharedShoppingList(this@RemkQuickInputActivity, raw)
                        Toast.makeText(this@RemkQuickInputActivity, "🛒 $cnt Artikel hinzugefügt", Toast.LENGTH_SHORT).show()
                        finish()
                    }
                }
            }
        }
        btnRow.addView(cancelBtn)
        btnRow.addView(saveBtn)
        card.addView(btnRow)
        root.addView(card)
        setContentView(root)
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE)
        edit.requestFocus()
    }

    private fun lookupOpenFoodFactsAndAdd(ean: String) {
        thread {
            var productName = ""
            val candidates = mutableListOf(ean)
            if (ean.length == 12) candidates.add("0$ean")
            else if (ean.length == 13 && ean.startsWith("0")) candidates.add(ean.substring(1))
            val bases = listOf(
                "https://world.openfoodfacts.org/api/v2/product/",
                "https://de.openfoodfacts.org/api/v0/product/"
            )
            outer@ for (code in candidates) {
                for (base in bases) {
                    try {
                        val url = URL("$base$code.json")
                        val conn = (url.openConnection() as HttpURLConnection).apply {
                            connectTimeout = 4000
                            readTimeout = 4000
                            setRequestProperty("User-Agent", "REMK-Coaching-Android/37.8")
                        }
                        if (conn.responseCode == 200) {
                            val body = conn.inputStream.bufferedReader().use { it.readText() }
                            val obj = JSONObject(body)
                            val prod = obj.optJSONObject("product")
                            if (prod != null && obj.optInt("status", 1) != 0) {
                                val nm = prod.optString("product_name_de").ifEmpty { prod.optString("product_name") }.trim()
                                val brand = prod.optString("brands").split(",").firstOrNull()?.trim().orEmpty()
                                val qty = prod.optString("quantity").trim()
                                if (nm.isNotEmpty()) {
                                    val fullNm = if (brand.isNotEmpty() && !nm.contains(brand, ignoreCase = true)) "$brand $nm" else nm
                                    productName = if (qty.isNotEmpty()) "$fullNm ($qty)" else fullNm
                                    conn.disconnect()
                                    break@outer
                                }
                            }
                        }
                        conn.disconnect()
                    } catch (e: Exception) {}
                }
            }

            runOnUiThread {
                val finalLabel = if (productName.isNotEmpty()) productName else "Produkt EAN $ean"
                addItemsToSharedShoppingList(this@RemkQuickInputActivity, finalLabel)
                Toast.makeText(this@RemkQuickInputActivity, "📷 $finalLabel hinzugefügt", Toast.LENGTH_SHORT).show()
                finish()
            }
        }
    }

    companion object {
        fun addItemsToSharedShoppingList(context: Context, rawInput: String): Int {
            val prefs = context.getSharedPreferences("REMK_NATIVE_OS_VAULT", Context.MODE_PRIVATE)
            val arr = try { JSONArray(prefs.getString("remk_shop_list_sync_v365", "[]") ?: "[]") } catch (e: Exception) { JSONArray() }
            val parts = rawInput.split(Regex("\\s*(?:,|;|\\bund\\b|\\n)\\s*", RegexOption.IGNORE_CASE))
                .map { it.trim() }
                .filter { it.isNotEmpty() }

            var addedCount = 0
            for (itemText in parts) {
                val norm = itemText.lowercase(Locale.GERMANY)
                var merged = false
                for (i in 0 until arr.length()) {
                    val o = arr.optJSONObject(i) ?: continue
                    val existing = o.optString("text", "").trim()
                    if (!o.optBoolean("checked", false) && existing.lowercase(Locale.GERMANY).contains(norm)) {
                        val qty = o.optInt("qty", 1) + 1
                        o.put("qty", qty)
                        merged = true
                        break
                    }
                }
                if (!merged) {
                    arr.put(JSONObject().apply {
                        put("id", "nat_${System.currentTimeMillis()}_$addedCount")
                        put("text", itemText)
                        put("qty", 1)
                        put("checked", false)
                        put("custom", true)
                    })
                }
                addedCount++
                RemkWidgetProvider.enqueueCommandForWebView(context, "ADD_SHOP_ITEM_TEXT", itemText)
            }
            prefs.edit().putString("remk_shop_list_sync_v365", arr.toString()).apply()
            RemkWidgetProvider.syncLegacyTop3ShopSlotsFromList(prefs, arr)
            RemkWidgetProvider.broadcastUpdateAllWidgets(context)
            return addedCount
        }
    }
}
