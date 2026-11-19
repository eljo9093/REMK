/* ============================================================================
   RE:MK v35.4 – SPORTWISSENSCHAFTLICHE INTELLIGENZ-, SYNC- & CLEAN-MODAL-ENGINE
   - ACWR (Acute:Chronic Workload Ratio 7d vs. 28d)
   - Muskel-Erholungs-Heatmap (36–72h Recovery-Kurve für KI-Comic-Figur)
   - MEV / MAV / MRV Wochen-Volumen-Ampel pro Muskelgruppe
   - Symmetrie-Wächter (Push:Pull & Quad:Hintere Kette)
   - Bidirektionale Double-Progression (Up & Down Autoregulation)
   - Adaptiver TDEE-Kalibrator & 1-Tap Coach-Check-in-Report (WhatsApp/Everfit)
   - CleanUI Bottom-Sheet-Modals (ersetzt native prompt/confirm Popups)
   - Einheitliches CleanUI Trainings-Verlauf-Modal (Single Source of Truth)
   ============================================================================ */
(function initRemkIntelligenceV354() {
  "use strict";
  if (window.REMK_INTELLIGENCE && window.REMK_INTELLIGENCE.version === "35.9") return;

  const FATIGUE_KEY = "remk_v354_muscle_fatigue_v1";
  const UNIFIED_HIST_KEY = "remk_v354_unified_ex_history_v1";

  function safeParse(raw, fb) {
    try { return JSON.parse(raw); } catch (e) { return fb; }
  }

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getSlot() {
    try {
      if (typeof window.getActiveTrainingPartnerSlot === "function") return window.getActiveTrainingPartnerSlot();
      return localStorage.getItem("remk_active_partner_slot") || "p1";
    } catch (e) { return "p1"; }
  }

  function scopedKey(base) {
    return getSlot() === "p2" ? (base + "_p2") : base;
  }

  function isProMode() {
    try {
      if (typeof window.isBeginnerFocusModeV228 === "function") {
        return !window.isBeginnerFocusModeV228();
      }
      return localStorage.getItem("remk_experience_ui_mode_v228") !== "beginner";
    } catch (e) { return true; }
  }

  function toggleExperienceMode() {
    try {
      const nextPro = !isProMode();
      localStorage.setItem("remk_experience_ui_mode_v228", nextPro ? "pro" : "beginner");
      if (typeof window.applyExperienceModeClassV228 === "function") {
        window.applyExperienceModeClassV228();
      }
      if (typeof window.showV351Toast === "function") {
        window.showV351Toast(nextPro ? "🔥 Profi-Modus aktiv (alle Metriken)" : "🌱 Einsteiger-Modus aktiv (fokussiert)");
      }
      if (document.body.classList.contains("remk-v34-in-workout") && typeof window.renderV345FitnessCleanPanel === "function") {
        window.renderV345FitnessCleanPanel(true);
      } else if (document.body.classList.contains("remk-v34-in-nutrition") && typeof window.renderV345NutritionCleanPanel === "function") {
        window.renderV345NutritionCleanPanel();
      } else if (typeof window.renderV345StartHub === "function") {
        window.renderV345StartHub();
      }
    } catch (e) {}
  }

  // =========================================================================
  // 1. MUSKEL-ERHOLUNGS-ENGINE (36–72h Recovery-Kurve pro Muskelgruppe)
  // =========================================================================
  const RECOVERY_HOURS_BY_ZONE = {
    chest: 54, upper_back: 54, lats: 54, lower_back: 64,
    quads: 66, hamstrings: 64, glutes: 60,
    shoulders_front: 44, shoulders_side: 40, shoulders_rear: 42,
    biceps: 40, triceps: 42, forearms: 36, traps: 44,
    abs: 36, obliques: 36, calves: 40
  };

  function recordMuscleFatigue(exObj, rirVal) {
    if (!exObj || !window.REMK_ANATOMY || typeof window.REMK_ANATOMY.detectExerciseMuscles !== "function") return;
    try {
      const m = window.REMK_ANATOMY.detectExerciseMuscles([exObj]);
      const data = safeParse(localStorage.getItem(scopedKey(FATIGUE_KEY)) || "{}", {});
      const now = Date.now();
      const rir = (rirVal != null && !isNaN(rirVal)) ? Number(rirVal) : 2;
      const intensityMult = rir <= 0 ? 1.35 : (rir === 1 ? 1.15 : (rir === 2 ? 1.0 : 0.8));

      (m.primary || []).forEach(function (z) {
        const cur = data[z] || { ts: now, load: 0 };
        const decayH = Math.max(0, (now - (cur.ts || now)) / 3600000);
        const remLoad = Math.max(0, (cur.load || 0) * Math.max(0, 1 - decayH / (RECOVERY_HOURS_BY_ZONE[z] || 48)));
        data[z] = { ts: now, load: Math.min(10, +(remLoad + 1.45 * intensityMult).toFixed(2)) };
      });
      (m.secondary || []).forEach(function (z) {
        const cur = data[z] || { ts: now, load: 0 };
        const decayH = Math.max(0, (now - (cur.ts || now)) / 3600000);
        const remLoad = Math.max(0, (cur.load || 0) * Math.max(0, 1 - decayH / (RECOVERY_HOURS_BY_ZONE[z] || 48)));
        data[z] = { ts: now, load: Math.min(10, +(remLoad + 0.65 * intensityMult).toFixed(2)) };
      });
      localStorage.setItem(scopedKey(FATIGUE_KEY), JSON.stringify(data));
    } catch (e) {}
  }

  function getMuscleRecoveryMap() {
    const out = {};
    const data = safeParse(localStorage.getItem(scopedKey(FATIGUE_KEY)) || "{}", {});
    const now = Date.now();
    Object.keys(RECOVERY_HOURS_BY_ZONE).forEach(function (z) {
      const entry = data[z];
      if (!entry || !entry.ts || !entry.load) {
        out[z] = 100;
        return;
      }
      const hoursElapsed = Math.max(0, (now - entry.ts) / 3600000);
      const baseH = RECOVERY_HOURS_BY_ZONE[z] || 48;
      const needH = baseH * Math.min(1.45, Math.max(0.55, entry.load / 5.5));
      const pct = Math.min(100, Math.max(12, Math.round((hoursElapsed / needH) * 100)));
      out[z] = pct;
    });
    return out;
  }

  // =========================================================================
  // 2. ACWR – ACUTE:CHRONIC WORKLOAD RATIO (7 Tage vs. 28 Tage)
  // =========================================================================
  function computeAcwrStats(histList, currentSessionVol, currentSessionSets) {
    const now = Date.now();
    const dayMs = 86400000;
    const items = (Array.isArray(histList) ? histList : []).slice();
    if ((currentSessionVol || 0) > 0 || (currentSessionSets || 0) > 0) {
      items.push({
        date: new Date().toISOString().slice(0, 10),
        volumeKg: currentSessionVol || 0,
        doneSets: currentSessionSets || 0
      });
    }

    let acuteLoad = 0;
    let chronicLoad = 0;
    let activeDays28 = 0;
    items.forEach(function (it) {
      const ts = it && it.date ? Date.parse(it.date + "T12:00:00") : now;
      if (isNaN(ts)) return;
      const ageDays = (now - ts) / dayMs;
      if (ageDays < -1 || ageDays > 28) return;
      const load = (Number(it.volumeKg) > 0) ? Number(it.volumeKg) : (Number(it.doneSets) || 0) * 450;
      chronicLoad += load;
      activeDays28++;
      if (ageDays <= 7) acuteLoad += load;
    });

    if (chronicLoad <= 0 || activeDays28 < 4) {
      return {
        ratio: 1.0,
        status: "optimal",
        color: "#10b981",
        label: `Basis (${activeDays28}/4 Sessions)`,
        hint: "Ab 4 geloggten Einheiten berechnet ACWR automatisch dein exaktes 7- vs. 28-Tage-Belastungsverhältnis.",
        acuteKg: Math.round(acuteLoad),
        chronicWeeklyKg: Math.round(chronicLoad)
      };
    }

    const weeksSpan = Math.max(1, Math.min(4, activeDays28 >= 4 ? 4 : Math.max(1.5, activeDays28 * 0.85)));
    const chronicWeekly = chronicLoad / weeksSpan;
    const ratio = +(acuteLoad / Math.max(1, chronicWeekly)).toFixed(2);

    if (ratio > 1.45) {
      return {
        ratio: ratio,
        status: "high",
        color: "#ef4444",
        label: "Überlastungs-Warnung",
        hint: "Akute 7-Tage-Last liegt >45% über deinem 4-Wochen-Schnitt. Empfehlung: heute −15% Readiness oder Deload-Woche.",
        acuteKg: Math.round(acuteLoad),
        chronicWeeklyKg: Math.round(chronicWeekly)
      };
    }
    if (ratio < 0.78) {
      return {
        ratio: ratio,
        status: "low",
        color: "#38bdf8",
        label: "Frisch / Kapazität frei",
        hint: "Deine aktuelle Wochenlast liegt unter deinem gewohnten Schnitt – ideal für eine progressive Steigerung.",
        acuteKg: Math.round(acuteLoad),
        chronicWeeklyKg: Math.round(chronicWeekly)
      };
    }
    return {
      ratio: ratio,
      status: "optimal",
      color: "#10b981",
      label: "Optimal-Zone (Sweetspot)",
      hint: "Perfekte Balance zwischen Wachstumsreiz und Regeneration (Zielbereich 0.80 – 1.35).",
      acuteKg: Math.round(acuteLoad),
      chronicWeeklyKg: Math.round(chronicWeekly)
    };
  }

  // =========================================================================
  // 3. MEV / MAV / MRV VOLUMEN-AMPEL & SYMMETRIE-WÄCHTER
  // =========================================================================
  const VOLUME_BENCHMARKS = [
    { key: "chest",      label: "Brust",           mev: 8,  mav: 14, mrv: 20, zones: ["chest"] },
    { key: "back",       label: "Rücken & Lat",    mev: 10, mav: 16, mrv: 22, zones: ["upper_back", "lats"] },
    { key: "shoulders",  label: "Schultern",       mev: 6,  mav: 14, mrv: 20, zones: ["shoulders_front", "shoulders_side", "shoulders_rear"] },
    { key: "quads",      label: "Quads (Beine)",   mev: 8,  mav: 14, mrv: 20, zones: ["quads"] },
    { key: "posterior",  label: "Glutes & Hams",   mev: 6,  mav: 12, mrv: 18, zones: ["hamstrings", "glutes"] },
    { key: "biceps",     label: "Bizeps",          mev: 6,  mav: 12, mrv: 18, zones: ["biceps"] },
    { key: "triceps",    label: "Trizeps",         mev: 6,  mav: 12, mrv: 18, zones: ["triceps"] },
    { key: "core",       label: "Core & Waden",    mev: 4,  mav: 10, mrv: 16, zones: ["abs", "obliques", "calves"] }
  ];

  function computeWeeklyVolumeAndSymmetry(days) {
    const setsByGroup = {};
    VOLUME_BENCHMARKS.forEach(function (b) { setsByGroup[b.key] = { planned: 0, done: 0 }; });

    let pushSets = 0;
    let pullSets = 0;
    let quadSets = 0;
    let postSets = 0;

    (days || []).forEach(function (d) {
      (d.exercises || []).forEach(function (ex) {
        const workSets = (ex.sets || []).filter(function (s) { return s.setType !== 'W'; });
        const planned = workSets.length;
        const done = workSets.filter(function (s) { return s.done; }).length;
        const det = (window.REMK_ANATOMY && typeof window.REMK_ANATOMY.detectExerciseMuscles === "function")
          ? window.REMK_ANATOMY.detectExerciseMuscles([ex])
          : { primary: [], secondary: [] };
        const pSet = new Set(det.primary || []);
        const sSet = new Set(det.secondary || []);

        VOLUME_BENCHMARKS.forEach(function (b) {
          const hitPrim = b.zones.some(function (z) { return pSet.has(z); });
          const hitSec = !hitPrim && b.zones.some(function (z) { return sSet.has(z); });
          if (hitPrim) {
            setsByGroup[b.key].planned += planned;
            setsByGroup[b.key].done += done;
          } else if (hitSec) {
            setsByGroup[b.key].planned += planned * 0.5;
            setsByGroup[b.key].done += done * 0.5;
          }
        });

        // Push vs Pull & Quad vs Posterior Ratios
        if (pSet.has("chest") || pSet.has("shoulders_front") || pSet.has("triceps")) pushSets += planned;
        if (pSet.has("upper_back") || pSet.has("lats") || pSet.has("shoulders_rear") || pSet.has("biceps")) pullSets += planned;
        if (pSet.has("quads")) quadSets += planned;
        if (pSet.has("hamstrings") || pSet.has("glutes")) postSets += planned;
      });
    });

    const ampel = VOLUME_BENCHMARKS.map(function (b) {
      const rec = setsByGroup[b.key];
      const pl = Math.round(rec.planned);
      const dn = Math.round(rec.done);
      let zone = "MAV";
      let color = "#10b981";
      if (pl === 0) { zone = "—"; color = "#64748b"; }
      else if (pl < b.mev) { zone = "Unter MEV"; color = "#38bdf8"; }
      else if (pl > b.mrv) { zone = "Über MRV!"; color = "#ef4444"; }
      else if (pl > b.mav) { zone = "MAV–MRV"; color = "#f59e0b"; }
      else { zone = "Optimal (MAV)"; color = "#10b981"; }
      return { key: b.key, label: b.label, planned: pl, done: dn, mev: b.mev, mav: b.mav, mrv: b.mrv, zone: zone, color: color };
    });

    const ppRatio = pullSets > 0 ? +(pushSets / pullSets).toFixed(2) : (pushSets > 0 ? 2.0 : 1.0);
    const qhRatio = postSets > 0 ? +(quadSets / postSets).toFixed(2) : (quadSets > 0 ? 2.0 : 1.0);

    let ppHint = "Ausgewogenes Druck-Zug-Verhältnis (gesunde Schultern).";
    let ppColor = "#10b981";
    if (ppRatio > 1.35) { ppHint = "Push-lastig – ergänze 2–3 Sätze Rudern oder Face Pulls für Schultergesundheit."; ppColor = "#f59e0b"; }
    else if (ppRatio < 0.7) { ppHint = "Pull-dominant – sehr rückenfreundlich, Brust/Schulter bei Bedarf leicht anheben."; ppColor = "#38bdf8"; }

    let qhHint = "Gute Balance zwischen Oberschenkel-Vorderseite und hinterer Kette.";
    let qhColor = "#10b981";
    if (qhRatio > 1.4) { qhHint = "Quad-dominant – RDL oder Beinbeuger schützen Knie & unteren Rücken."; qhColor = "#f59e0b"; }
    else if (qhRatio < 0.65 && (quadSets + postSets) > 0) { qhHint = "Starke hintere Kette – Kniebeugen/Beinpresse ergänzen die Quads."; qhColor = "#38bdf8"; }

    return {
      ampel: ampel,
      symmetry: {
        pushSets: pushSets, pullSets: pullSets, ppRatio: ppRatio, ppHint: ppHint, ppColor: ppColor,
        quadSets: quadSets, postSets: postSets, qhRatio: qhRatio, qhHint: qhHint, qhColor: qhColor
      }
    };
  }

  // =========================================================================
  // 4. BIDIREKTIONALE DOUBLE-PROGRESSION (UP & DOWN AUTOREGULATION)
  // =========================================================================
  function evaluateSmartAutoreg(curEx) {
    if (!curEx || !Array.isArray(curEx.sets) || curEx.sets.length < 2) return null;
    const lastDoneIdx = curEx.sets.map(function (s, i) { return s.done ? i : -1; }).filter(function (i) { return i >= 0; }).pop();
    if (lastDoneIdx === undefined || lastDoneIdx + 1 >= curEx.sets.length) return null;
    if (curEx.sets[lastDoneIdx + 1].done) return null;

    const ld = curEx.sets[lastDoneIdx];
    const nextSet = curEx.sets[lastDoneIdx + 1];
    if (ld.setType === "W" || nextSet.setType === "W") return null;
    const kg = parseFloat(ld.kg) || 0;
    const reps = parseInt(ld.reps, 10) || 0;
    const targetReps = parseInt(ld.targetReps, 10) || 10;
    const rir = (ld.rir != null) ? Number(ld.rir) : 2;
    if (kg < 4) return null;

    // 1. Ermüdung -> Backoff (-7.5%)
    if (rir === 0 || reps <= Math.floor(targetReps * 0.75)) {
      const backoffKg = Math.max(2.5, Math.round((kg * 0.925) / 2.5) * 2.5);
      if (backoffKg < nextSet.kg) {
        return {
          direction: "down",
          nextIdx: lastDoneIdx + 1,
          recKg: backoffKg,
          color: "#f59e0b",
          bg: "rgba(245,158,11,0.12)",
          border: "rgba(245,158,11,0.5)",
          text: `⚡ <strong>Autoregulation (Backoff):</strong> Hohe Ermüdung (RIR ${rir}). Empfehlung für Satz ${lastDoneIdx + 2}: <strong>${backoffKg} kg</strong>`
        };
      }
    }

    // 2. Starke Reserve -> Progressive Overload (+1.25 / +2.5 / +5 kg)
    if (reps >= targetReps && rir >= 2) {
      const mech = String(curEx.mech || "").toLowerCase();
      const name = String(curEx.name || "").toLowerCase();
      let inc = 2.5;
      if (/leg_squat|leg_press|hinge|kniebeug|kreuzheben|beinpress/.test(mech + " " + name) && kg >= 40) {
        inc = 5.0;
      } else if (/iso|kurzhantel|kh|seitheben|curl|trizeps|butterfly|fly/.test(mech + " " + name)) {
        inc = 1.25;
      }
      const upKg = +(kg + inc).toFixed(2);
      if (upKg > nextSet.kg) {
        return {
          direction: "up",
          nextIdx: lastDoneIdx + 1,
          recKg: upKg,
          color: "#10b981",
          bg: "rgba(16,185,129,0.12)",
          border: "rgba(16,185,129,0.48)",
          text: `🚀 <strong>Double-Progression:</strong> Ziel erreicht mit RIR ${rir}! Empfehlung für Satz ${lastDoneIdx + 2}: <strong>${upKg} kg (+${inc} kg)</strong>`
        };
      }
    }
    return null;
  }

  // =========================================================================
  // 5. ADAPTIVER TDEE-KALIBRATOR (EMA-GEWICHTSTREND VS. KALORIENZIEL)
  // =========================================================================
  function computeAdaptiveTdeeStatus(targetKcal) {
    try {
      const savedRealTdee = parseInt(localStorage.getItem("remk_adaptive_tdee_v290") || "0", 10) || 0;
      const bmList = (typeof window.getSavedBodyMeasurementsList === "function")
        ? (window.getSavedBodyMeasurementsList() || [])
        : [];
      const weights = bmList
        .map(function (b) { return { date: b.date || "", w: parseFloat(b.weight || b.kg || 0) }; })
        .filter(function (x) { return x.w > 30 && x.w < 250; });

      let emaDelta14 = null;
      let estRealTdee = savedRealTdee;
      let spanDays = 0;
      if (weights.length >= 2) {
        const recent = weights[weights.length - 1];
        const prev = weights[Math.max(0, weights.length - Math.min(weights.length, 6))];
        const tsRecent = Date.parse(recent.date);
        const tsPrev = Date.parse(prev.date);
        const realSpan = (!isNaN(tsRecent) && !isNaN(tsPrev)) ? Math.round((tsRecent - tsPrev) / 86400000) : 0;
        spanDays = realSpan;
        if (realSpan >= 10) {
          const dKg = +(recent.w - prev.w).toFixed(2);
          emaDelta14 = dKg;
          const dDays = Math.max(10, Math.min(28, realSpan));
          const implied = Math.round((targetKcal || 2200) - (dKg * 7700 / dDays));
          if (implied > 1200 && implied < 5500) estRealTdee = implied;
        }
      }

      const goal = (document.getElementById("goal_nutrition")?.value || document.getElementById("goal_training")?.value || "").toLowerCase();
      let badge = spanDays > 0 && spanDays < 10
        ? `Kalibrierung läuft (${spanDays}/10 Tage Wiegedaten)`
        : "Trage ab 10 Tagen 2 Wiegewerte im Cockpit ein für die Auto-Kalibrierung.";
      let deltaKcal = 0;
      if (emaDelta14 !== null && spanDays >= 10) {
        if (/abnehm|cut|defizit/.test(goal) && emaDelta14 >= -0.05) {
          badge = "Plateau erkannt · −150 kcal empfohlen";
          deltaKcal = -150;
        } else if (/aufbau|bulk|masse/.test(goal) && emaDelta14 <= 0.05) {
          badge = "Aufbau stagniert · +150 kcal empfohlen";
          deltaKcal = 150;
        } else {
          badge = `Trend ${emaDelta14 > 0 ? "+" : ""}${emaDelta14} kg · Ziel auf Kurs`;
        }
      }

      return {
        estRealTdee: estRealTdee || targetKcal || 2200,
        emaDelta14: emaDelta14,
        badge: badge,
        deltaKcal: deltaKcal,
        weighIns: weights.length
      };
    } catch (e) {
      return { estRealTdee: targetKcal || 2200, emaDelta14: null, badge: "Bereit für 14-Tage-Kalibrierung", deltaKcal: 0, weighIns: 0 };
    }
  }

  function applyQuickTdeeAdjust(deltaKcal) {
    try {
      const calInp = document.getElementById("calories");
      const cur = parseInt(calInp?.value || localStorage.getItem("remk_saved_target_cals") || "2200", 10) || 2200;
      const next = Math.max(1300, Math.min(5200, cur + (parseInt(deltaKcal, 10) || 0)));
      if (calInp) {
        calInp.value = String(next);
        if (typeof calInp.onchange === "function") calInp.onchange();
      }
      localStorage.setItem("remk_adaptive_tdee_v290", String(next));
      if (typeof window.saveFormState === "function") window.saveFormState();
      if (typeof window.showV351Toast === "function") {
        window.showV351Toast(`🎯 Kalorienziel angepasst: ${next} kcal/Tag`);
      }
      if (typeof window.renderV345NutritionCleanPanel === "function") window.renderV345NutritionCleanPanel();
    } catch (e) {}
  }

  // =========================================================================
  // 6. SINGLE-SOURCE-OF-TRUTH ARCHIV-SYNC + CLEANUI VERLAUF-MODAL
  // =========================================================================
  function syncExerciseRecordToArchive(exName, kg, reps, rir) {
    try {
      const clean = String(exName || "").replace(/^\s*[\u{1F300}-\u{1FAFF}\u2600-\u27BF]+\s*/gu, "").replace(/\[[^\]]+\]/g, "").trim();
      if (!clean || (kg <= 0 && reps <= 0)) return;
      const list = safeParse(localStorage.getItem(scopedKey(UNIFIED_HIST_KEY)) || "[]", []);
      const est1Rm = kg > 0 ? Math.round(kg * (1 + reps / 30)) : 0;
      const today = new Date().toISOString().slice(0, 10);
      const id = today + "|" + clean.toLowerCase();
      const idx = list.findIndex(function (x) { return x.id === id; });
      const rec = {
        id: id,
        date: today,
        name: clean,
        kg: Number(kg) || 0,
        reps: parseInt(reps, 10) || 0,
        rir: (rir != null) ? Number(rir) : 2,
        est1Rm: est1Rm
      };
      if (idx >= 0) {
        if (rec.est1Rm >= (list[idx].est1Rm || 0) || rec.kg >= (list[idx].kg || 0)) {
          list[idx] = rec;
        }
      } else {
        list.unshift(rec);
      }
      localStorage.setItem(scopedKey(UNIFIED_HIST_KEY), JSON.stringify(list.slice(0, 300)));
    } catch (e) {}
  }

  function collectAllUnifiedHistoryEntries() {
    const entries = safeParse(localStorage.getItem(scopedKey(UNIFIED_HIST_KEY)) || "[]", []);
    const seen = new Set(entries.map(function (e) { return e.id; }));

    // Auch CleanUI-Logs (remk_v34_workout_logs_v1) direkt einbeziehen
    try {
      const logs = safeParse(localStorage.getItem(scopedKey("remk_v34_workout_logs_v1")) || "{}", {});
      const prMap = safeParse(localStorage.getItem(scopedKey("remk_v34_pr_map_v1")) || "{}", {});
      Object.keys(prMap).forEach(function (exKey) {
        const clean = String(exKey).replace(/\[[^\]]+\]/g, "").trim();
        const best = Number(prMap[exKey]) || 0;
        const id = "pr|" + clean.toLowerCase();
        if (best > 0 && !seen.has(id) && !entries.some(function (e) { return e.name.toLowerCase() === clean.toLowerCase(); })) {
          entries.push({
            id: id,
            date: new Date().toISOString().slice(0, 10),
            name: clean.charAt(0).toUpperCase() + clean.slice(1),
            kg: best,
            reps: 1,
            rir: 1,
            est1Rm: best,
            isPrRecord: true
          });
          seen.add(id);
        }
      });
    } catch (e) {}

    // Auch Legacy-Archiv-Einträge (remk_workout_history) einlesen (ohne Doppelung)
    try {
      const leg = safeParse(localStorage.getItem("remk_workout_history") || "[]", []);
      (Array.isArray(leg) ? leg : []).slice(0, 20).forEach(function (item, idx) {
        if (!item) return;
        const title = item.planTitle || item.title || ("Session " + (item.date || ""));
        const id = "legacy|" + idx + "|" + (item.date || "");
        if (!seen.has(id) && item.exercises && Array.isArray(item.exercises)) {
          item.exercises.forEach(function (ex) {
            const cn = String(ex.name || "").replace(/\[[^\]]+\]/g, "").replace(/^\s*[\u{1F300}-\u{1FAFF}\u2600-\u27BF]+\s*/gu, "").trim();
            const kg = parseFloat(ex.weight || ex.kg || 0) || 0;
            const reps = parseInt(ex.reps || 10, 10) || 10;
            if (cn && kg > 0) {
              const eid = (item.date || "alt") + "|" + cn.toLowerCase();
              if (!seen.has(eid)) {
                entries.push({ id: eid, date: item.date || "Archiv", name: cn, kg: kg, reps: reps, est1Rm: Math.round(kg * (1 + reps / 30)) });
                seen.add(eid);
              }
            }
          });
        }
      });
    } catch (e) {}

    return entries;
  }

  function openCleanWorkoutHistoryModal() {
    let modal = document.getElementById("remk-v354-history-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "remk-v354-history-modal";
      modal.style.cssText = "position:fixed;inset:0;background:rgba(2,6,23,0.78);backdrop-filter:blur(6px);z-index:2000900;display:flex;align-items:flex-end;justify-content:center;padding:10px;";
      modal.addEventListener("click", function (ev) { if (ev.target === modal) modal.style.display = "none"; });
      document.body.appendChild(modal);
    }
    modal.style.display = "flex";
    renderCleanHistoryContent("");
  }

  function renderCleanHistoryContent(query) {
    const modal = document.getElementById("remk-v354-history-modal");
    if (!modal) return;
    const q = String(query || "").trim().toLowerCase();
    const all = collectAllUnifiedHistoryEntries();
    const filtered = q ? all.filter(function (e) { return e.name.toLowerCase().includes(q) || String(e.date).includes(q); }) : all;

    const listHtml = filtered.length ? filtered.map(function (e) {
      const safeId = escHtml(e.id).replace(/'/g, "\\'");
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:11px 12px;border-radius:14px;background:var(--v34-card-soft,#171c28);border:1px solid var(--v34-border,rgba(148,163,184,0.2));margin-bottom:8px;">
          <div style="min-width:0;flex:1;">
            <div style="font-size:0.86rem;font-weight:800;color:var(--v34-text,#f8fafc);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(e.name)}</div>
            <div style="font-size:0.72rem;color:var(--v34-muted,#94a3b8);margin-top:2px;">
              ${escHtml(e.date)} &bull; <strong style="color:#ff5e00;">${e.kg} kg × ${e.reps}</strong> ${e.est1Rm ? `&bull; 🏆 1RM: ${e.est1Rm} kg` : ""}
            </div>
          </div>
          <div style="display:flex;gap:5px;flex-shrink:0;">
            <button type="button" onclick="window.REMK_INTELLIGENCE.editHistoryEntry('${safeId}')" style="border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card,#111622);color:var(--v34-text,#f8fafc);border-radius:9px;padding:6px 8px;font-size:0.74rem;font-weight:800;cursor:pointer;">✏️</button>
            <button type="button" onclick="window.REMK_INTELLIGENCE.deleteHistoryEntry('${safeId}')" style="border:1px solid rgba(239,68,68,0.35);background:rgba(239,68,68,0.12);color:#f87171;border-radius:9px;padding:6px 8px;font-size:0.74rem;font-weight:800;cursor:pointer;">🗑️</button>
          </div>
        </div>
      `;
    }).join("") : `<div style="text-align:center;padding:24px 10px;color:var(--v34-muted,#94a3b8);font-size:0.82rem;">Noch keine Einträge gefunden. Hake im Training deinen ersten Satz ab!</div>`;

    const existingList = document.getElementById("remk-v354-hist-list");
    if (existingList) {
      existingList.innerHTML = listHtml;
      return;
    }

    modal.innerHTML = `
      <div style="width:100%;max-width:520px;max-height:84vh;display:flex;flex-direction:column;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.22));border-radius:22px;padding:16px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <div>
            <div style="font-size:0.7rem;font-weight:900;color:#ff5e00;text-transform:uppercase;">Single Source of Truth</div>
            <strong style="font-size:1.05rem;">📜 Trainings-Verlauf &amp; PRs</strong>
          </div>
          <button type="button" onclick="document.getElementById('remk-v354-history-modal').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>
        <input type="search" id="remk-v354-hist-search" placeholder="Übung suchen (z. B. Bankdrücken, Kniebeuge)..." oninput="window.REMK_INTELLIGENCE.filterHistory(this.value)"
          style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:12px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#171c28);color:var(--v34-text,#f8fafc);font-size:0.84rem;margin-bottom:10px;"/>
        <div id="remk-v354-hist-list" style="overflow-y:auto;flex:1;padding-right:2px;">${listHtml}</div>
      </div>
    `;
  }

  function editHistoryEntry(id) {
    const list = safeParse(localStorage.getItem(scopedKey(UNIFIED_HIST_KEY)) || "[]", []);
    const item = list.find(function (x) { return x.id === id; });
    if (!item) {
      if (typeof window.showV351Toast === "function") window.showV351Toast("ℹ️ Nur aktuelle Log-Einträge sind direkt editierbar");
      return;
    }
    openPromptSheet({
      title: "✏️ Wert korrigieren",
      subtitle: item.name + " (" + item.date + ")",
      placeholder: "Gewicht in kg (z. B. 42.5)",
      initialValue: String(item.kg),
      inputType: "text",
      onSave: function (val) {
        const num = parseFloat(String(val || "").replace(",", "."));
        if (!isNaN(num) && num >= 0) {
          item.kg = num;
          item.est1Rm = num > 0 ? Math.round(num * (1 + (item.reps || 10) / 30)) : 0;
          localStorage.setItem(scopedKey(UNIFIED_HIST_KEY), JSON.stringify(list));
          renderCleanHistoryContent(document.getElementById("remk-v354-hist-search")?.value || "");
          if (typeof window.showV351Toast === "function") window.showV351Toast("✅ Eintrag korrigiert");
        }
      }
    });
  }

  function deleteHistoryEntry(id) {
    openConfirmSheet({
      title: "🗑️ Eintrag löschen?",
      message: "Soll dieser Ausreißer / Verlaufseintrag dauerhaft entfernt werden?",
      confirmLabel: "Löschen",
      danger: true,
      onConfirm: function () {
        const list = safeParse(localStorage.getItem(scopedKey(UNIFIED_HIST_KEY)) || "[]", []);
        const next = list.filter(function (x) { return x.id !== id; });
        localStorage.setItem(scopedKey(UNIFIED_HIST_KEY), JSON.stringify(next));
        renderCleanHistoryContent(document.getElementById("remk-v354-hist-search")?.value || "");
        if (typeof window.showV351Toast === "function") window.showV351Toast("🗑️ Eintrag gelöscht");
      }
    });
  }

  // =========================================================================
  // 7. CLEANUI BOTTOM-SHEET MODALS (ERSETZT NATIVE PROMPT / CONFIRM POPUPS)
  // =========================================================================
  function ensureSheetModal() {
    let el = document.getElementById("remk-v354-sheet-modal");
    if (!el) {
      el = document.createElement("div");
      el.id = "remk-v354-sheet-modal";
      el.style.cssText = "position:fixed;inset:0;background:rgba(2,6,23,0.74);backdrop-filter:blur(5px);z-index:2000950;display:none;align-items:flex-end;justify-content:center;padding:12px;";
      el.addEventListener("click", function (ev) { if (ev.target === el) el.style.display = "none"; });
      document.body.appendChild(el);
    }
    return el;
  }

  function openPromptSheet(opts) {
    const o = opts || {};
    const modal = ensureSheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:460px;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="width:38px;height:4px;border-radius:99px;background:rgba(148,163,184,0.35);margin:0 auto 12px auto;"></div>
        <div style="font-size:1rem;font-weight:900;margin-bottom:4px;">${escHtml(o.title || "Eingabe")}</div>
        ${o.subtitle ? `<div style="font-size:0.78rem;color:var(--v34-muted,#94a3b8);margin-bottom:12px;line-height:1.4;">${escHtml(o.subtitle)}</div>` : ""}
        <input id="remk-v354-sheet-input" type="${o.inputType || 'text'}" value="${escHtml(o.initialValue != null ? o.initialValue : '')}" placeholder="${escHtml(o.placeholder || '')}"
          style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:14px;border:1.5px solid rgba(255,94,0,0.55);background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.95rem;font-weight:700;margin-bottom:14px;"/>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button type="button" id="remk-v354-sheet-cancel" style="padding:11px;border-radius:14px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.84rem;font-weight:800;cursor:pointer;">Abbrechen</button>
          <button type="button" id="remk-v354-sheet-ok" style="padding:11px;border-radius:14px;border:none;background:#ff5e00;color:#ffffff;font-size:0.84rem;font-weight:900;cursor:pointer;">${escHtml(o.confirmLabel || "Speichern")}</button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
    const inp = document.getElementById("remk-v354-sheet-input");
    const okBtn = document.getElementById("remk-v354-sheet-ok");
    const cancelBtn = document.getElementById("remk-v354-sheet-cancel");
    if (inp) {
      setTimeout(function () { inp.focus(); inp.select(); }, 40);
      inp.onkeydown = function (ev) { if (ev.key === "Enter") okBtn.click(); };
    }
    cancelBtn.onclick = function () { modal.style.display = "none"; };
    okBtn.onclick = function () {
      const val = inp ? inp.value : "";
      modal.style.display = "none";
      if (typeof o.onSave === "function") o.onSave(val);
    };
  }

  function openConfirmSheet(opts) {
    const o = opts || {};
    const modal = ensureSheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:440px;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="width:38px;height:4px;border-radius:99px;background:rgba(148,163,184,0.35);margin:0 auto 12px auto;"></div>
        <div style="font-size:1rem;font-weight:900;margin-bottom:6px;">${escHtml(o.title || "Bestätigen")}</div>
        <div style="font-size:0.82rem;color:var(--v34-muted,#94a3b8);margin-bottom:16px;line-height:1.45;">${escHtml(o.message || "")}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button type="button" id="remk-v354-sheet-cancel" style="padding:11px;border-radius:14px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.84rem;font-weight:800;cursor:pointer;">Abbrechen</button>
          <button type="button" id="remk-v354-sheet-ok" style="padding:11px;border-radius:14px;border:none;background:${o.danger ? '#ef4444' : '#ff5e00'};color:#ffffff;font-size:0.84rem;font-weight:900;cursor:pointer;">${escHtml(o.confirmLabel || "Bestätigen")}</button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
    document.getElementById("remk-v354-sheet-cancel").onclick = function () { modal.style.display = "none"; };
    document.getElementById("remk-v354-sheet-ok").onclick = function () {
      modal.style.display = "none";
      if (typeof o.onConfirm === "function") o.onConfirm();
    };
  }

  // =========================================================================
  // 8. 1-TAP COACH-CHECK-IN-ZUSAMMENFASSUNG (WHATSAPP / EVERFIT / CLIPBOARD)
  // =========================================================================
  function shareCoachCheckinSummary(extra) {
    const e = extra || {};
    const usr = localStorage.getItem("remk_user_name") || "Athlet";
    const steps = parseInt(localStorage.getItem("remk_daily_steps_count") || localStorage.getItem("remk_steps_today") || "0", 10) || 0;
    const water = parseFloat(localStorage.getItem("remk_drank_liters_today") || "0") || 0;
    const cals = document.getElementById("calories")?.value || localStorage.getItem("remk_saved_target_cals") || "—";
    const hist = safeParse(localStorage.getItem(scopedKey("remk_v34_workout_history_v1")) || "[]", []);
    const acwr = computeAcwrStats(hist, e.dayVol || 0, e.dayDone || 0);
    const bmList = (typeof window.getSavedBodyMeasurementsList === "function") ? (window.getSavedBodyMeasurementsList() || []) : [];
    const lastW = bmList.length ? (bmList[bmList.length - 1].weight || bmList[bmList.length - 1].kg || "—") : "—";

    const lines = [
      `📊 *RE:MK Coaching Check-in – ${usr}* (${new Date().toLocaleDateString("de-DE")})`,
      e.dayTitle ? `🏋️ Einheit: ${e.dayTitle}` : "",
      `✅ Sätze: ${e.dayDone != null ? e.dayDone : "—"} | Tonnage: ${Math.round(e.dayVol || 0).toLocaleString("de-DE")} kg`,
      e.best1Rm ? `🥇 Bestes 1-RM: ${e.best1Rm} kg (${e.bestEx || ""})` : "",
      `⚡ ACWR-Lastfaktor: ${acwr.ratio} (${acwr.label})`,
      `⚖️ Gewicht: ${lastW} kg | 🔥 Ziel: ${cals} kcal`,
      `🚶 Schritte: ${steps.toLocaleString("de-DE")} | 💧 Wasser: ${water.toFixed(1)} L`
    ].filter(Boolean).join("\n");

    if (navigator.share) {
      navigator.share({ title: "RE:MK Coaching Check-in", text: lines }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lines).then(function () {
        if (typeof window.showV351Toast === "function") window.showV351Toast("📋 Coach-Check-in kopiert (bereit für WhatsApp!)");
      }).catch(function () {});
    } else {
      openPromptSheet({ title: "📋 Coach-Check-in kopieren", initialValue: lines, confirmLabel: "Fertig" });
    }
  }


  // =========================================================================
  // 9. RP-HYPERTROPHY SESSION FEEDBACK (PUMP / GELENKE / ERSCHÖPFUNG)
  // =========================================================================
  const RP_FEEDBACK_KEY = "remk_v355_rp_feedback_v1";
  const QUICK_KCAL_KEY  = "remk_v355_quick_kcal_v1";
  const CONSISTENCY_KEY = "remk_v355_consistency_days_v1";

  function getTodayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function getSessionFeedback() {
    const all = safeParse(localStorage.getItem(scopedKey(RP_FEEDBACK_KEY)) || "{}", {});
    return all[getTodayKey()] || { pump: 2, joints: 3, fatigue: 2 };
  }

  function setSessionFeedback(field, val) {
    const all = safeParse(localStorage.getItem(scopedKey(RP_FEEDBACK_KEY)) || "{}", {});
    const cur = all[getTodayKey()] || { pump: 2, joints: 3, fatigue: 2 };
    cur[field] = Number(val) || 2;
    all[getTodayKey()] = cur;
    localStorage.setItem(scopedKey(RP_FEEDBACK_KEY), JSON.stringify(all));
    if (document.body.classList.contains("remk-v34-in-workout") && typeof window.renderV345FitnessCleanPanel === "function") {
      window.renderV345FitnessCleanPanel(true);
    }
  }

  function getNextWeekVolumeAdvice(fb) {
    const f = fb || getSessionFeedback();
    if (f.joints <= 1 || f.fatigue >= 3) {
      return { color: "#ef4444", text: "🩹 Gelenk-/Ermüdungsschutz: Nächste Woche −1 Satz oder −10 % Last (Deload-Check)." };
    }
    if (f.pump >= 2 && f.joints >= 2 && f.fatigue <= 1) {
      return { color: "#10b981", text: "🚀 Top-Reiz & hohe Reserve: Nächste Woche +1 Arbeitssatz oder +2,5 kg Progression!" };
    }
    return { color: "#38bdf8", text: "✅ Optimaler Hypertrophie-Reiz: Satzzahl nächste Woche beibehalten & Wdh./Gewicht steigern." };
  }

  // =========================================================================
  // 10. MACROFACTOR-STYLE 1-TAP QUICK-ADD (KALORIEN & PROTEIN) + MO-SO KONSTANZ
  // =========================================================================
  function getTodayQuickAdd() {
    const all = safeParse(localStorage.getItem(scopedKey(QUICK_KCAL_KEY)) || "{}", {});
    return all[getTodayKey()] || { kcal: 0, prot: 0 };
  }

  function addQuickNutrition(deltaKcal, deltaProt) {
    const all = safeParse(localStorage.getItem(scopedKey(QUICK_KCAL_KEY)) || "{}", {});
    const cur = all[getTodayKey()] || { kcal: 0, prot: 0 };
    cur.kcal = Math.max(0, (cur.kcal || 0) + (parseInt(deltaKcal, 10) || 0));
    cur.prot = Math.max(0, (cur.prot || 0) + (parseInt(deltaProt, 10) || 0));
    all[getTodayKey()] = cur;
    localStorage.setItem(scopedKey(QUICK_KCAL_KEY), JSON.stringify(all));
    markDayConsistent();
    if (typeof window.showV351Toast === "function") {
      window.showV351Toast(`⚡ Schnell-Log: +${deltaKcal} kcal / +${deltaProt} g EW`);
    }
    if (typeof window.renderV345NutritionCleanPanel === "function") window.renderV345NutritionCleanPanel();
  }

  function resetTodayQuickAdd() {
    const all = safeParse(localStorage.getItem(scopedKey(QUICK_KCAL_KEY)) || "{}", {});
    delete all[getTodayKey()];
    localStorage.setItem(scopedKey(QUICK_KCAL_KEY), JSON.stringify(all));
    if (typeof window.renderV345NutritionCleanPanel === "function") window.renderV345NutritionCleanPanel();
  }

  function markDayConsistent() {
    try {
      const map = safeParse(localStorage.getItem(scopedKey(CONSISTENCY_KEY)) || "{}", {});
      map[getTodayKey()] = true;
      localStorage.setItem(scopedKey(CONSISTENCY_KEY), JSON.stringify(map));
    } catch (e) {}
  }

  function getWeeklyConsistencyStrip() {
    const map = safeParse(localStorage.getItem(scopedKey(CONSISTENCY_KEY)) || "{}", {});
    const hist = safeParse(localStorage.getItem(scopedKey("remk_v34_workout_history_v1")) || "[]", []);
    hist.forEach(function (h) { if (h && h.date) map[h.date] = true; });

    const today = new Date();
    const dow = (today.getDay() + 6) % 7; // Mo=0..So=6
    const labels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const days = [];
    let hit = 0;
    let passed = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(today.getTime() - (dow - i) * 86400000);
      const iso = d.toISOString().slice(0, 10);
      const isFuture = i > dow;
      const done = Boolean(map[iso]);
      if (!isFuture) {
        passed++;
        if (done) hit++;
      }
      days.push({ label: labels[i], iso: iso, done: done, isToday: i === dow, isFuture: isFuture });
    }
    const pct = passed > 0 ? Math.round((hit / passed) * 100) : 0;
    return { days: days, hit: hit, passed: passed, pct: pct };
  }

  window.REMK_INTELLIGENCE = {
    getSessionFeedback: getSessionFeedback,
    setSessionFeedback: setSessionFeedback,
    getNextWeekVolumeAdvice: getNextWeekVolumeAdvice,
    getTodayQuickAdd: getTodayQuickAdd,
    addQuickNutrition: addQuickNutrition,
    resetTodayQuickAdd: resetTodayQuickAdd,
    markDayConsistent: markDayConsistent,
    getWeeklyConsistencyStrip: getWeeklyConsistencyStrip,
    version: "35.9",
    isProMode: isProMode,
    toggleExperienceMode: toggleExperienceMode,
    recordMuscleFatigue: recordMuscleFatigue,
    getMuscleRecoveryMap: getMuscleRecoveryMap,
    computeAcwrStats: computeAcwrStats,
    computeWeeklyVolumeAndSymmetry: computeWeeklyVolumeAndSymmetry,
    evaluateSmartAutoreg: evaluateSmartAutoreg,
    computeAdaptiveTdeeStatus: computeAdaptiveTdeeStatus,
    applyQuickTdeeAdjust: applyQuickTdeeAdjust,
    syncExerciseRecordToArchive: syncExerciseRecordToArchive,
    openCleanWorkoutHistoryModal: openCleanWorkoutHistoryModal,
    filterHistory: renderCleanHistoryContent,
    editHistoryEntry: editHistoryEntry,
    deleteHistoryEntry: deleteHistoryEntry,
    openPromptSheet: openPromptSheet,
    openConfirmSheet: openConfirmSheet,
    shareCoachCheckinSummary: shareCoachCheckinSummary
  };

  // CleanUI Trainings-Verlauf-Modal global andocken
  function installHistoryHook() {
    window.openWorkoutHistoryModal = openCleanWorkoutHistoryModal;
  }
  installHistoryHook();
  setTimeout(installHistoryHook, 250);
  setTimeout(installHistoryHook, 900);
})();
