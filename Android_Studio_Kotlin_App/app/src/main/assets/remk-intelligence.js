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
  if (window.REMK_INTELLIGENCE && window.REMK_INTELLIGENCE.version === "36.2") return;

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
      const brainRec = (window.REMK_SCIENCE_BRAIN && window.REMK_SCIENCE_BRAIN.getBrainConfig().recoveryBaseHours) || RECOVERY_HOURS_BY_ZONE;
      const learnMult = (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.getLearnedRecoveryMultiplier === "function") ? window.REMK_SCIENCE_BRAIN.getLearnedRecoveryMultiplier(z) : 1.0;
      const baseH = (brainRec[z] || RECOVERY_HOURS_BY_ZONE[z] || 48) * learnMult;
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
      const protM = (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.getProtectionMode === "function") ? window.REMK_SCIENCE_BRAIN.getProtectionMode() : { mode: "none" };
      const done = Boolean(map[iso]) || (protM.mode !== "none" && i === dow);
      if (!isFuture) {
        passed++;
        if (done) hit++;
      }
      days.push({ label: labels[i], iso: iso, done: done, isToday: i === dow, isFuture: isFuture });
    }
    const pct = passed > 0 ? Math.round((hit / passed) * 100) : 0;
    return { days: days, hit: hit, passed: passed, pct: pct };
  }


  // =========================================================================
  // 11. FREEMIUM FREE- VS. PRO-MODUS (ALPHA PROGRESSION PRINZIP) + UPGRADE-SHEET
  // =========================================================================
  const TALLY_PRO_URL = "https://tally.so/r/obPV5e";
  const MANUAL_PLANS_KEY = "remk_v360_manual_plans_v1";
  const SFR_KEY = "remk_v360_exercise_sfr_v1";

  function isRemkProUnlocked() {
    try {
      // Admin Preview-Schalter erlaubt dem Admin das Testen des Free-Modus jederzeit
      if (localStorage.getItem("remk_admin_free_preview_v360") === "true") return false;
      const licKey = String(localStorage.getItem("remk_license_key") || "").trim().toUpperCase();
      if (licKey && licKey !== "FREE" && licKey !== "GUEST") return true;
      if (localStorage.getItem("remk_apk_permanent_unlock_v236") === "true" && localStorage.getItem("remk_free_mode") !== "true") {
        return true;
      }
      if (localStorage.getItem("remk_free_mode") === "true") return false;
      return localStorage.getItem("remk_access_granted") === "true";
    } catch (e) {
      return true;
    }
  }

  function startRemkFreeMode() {
    try {
      localStorage.setItem("remk_free_mode", "true");
      localStorage.setItem("remk_access_granted", "true");
      localStorage.setItem("remk_user_role", "Free");
      if (!localStorage.getItem("remk_user_name")) localStorage.setItem("remk_user_name", "Athlet");
      document.documentElement.classList.add("remk-session-unlocked", "remk-boot-calm");
      const lockEl = document.getElementById("remk-lock-screen");
      if (lockEl) lockEl.style.display = "none";
      if (typeof window.showV351Toast === "function") {
        window.showV351Toast("🚀 Willkommen im RE:MK Free-Modus!");
      }
      if (typeof window.renderV352LockedTopBar === "function") window.renderV352LockedTopBar();
      if (typeof window.renderV345StartHub === "function") window.renderV345StartHub();
    } catch (e) {}
  }

  function openProLoginFromFree() {
    try {
      const sheet = document.getElementById("remk-v354-sheet-modal");
      if (sheet) sheet.style.display = "none";
      localStorage.removeItem("remk_admin_free_preview_v360");
      const lockEl = document.getElementById("remk-lock-screen");
      if (lockEl) {
        lockEl.style.display = "flex";
        lockEl.style.zIndex = "2000999";
      }
    } catch (e) {}
  }

  function toggleAdminFreePreview() {
    try {
      const cur = localStorage.getItem("remk_admin_free_preview_v360") === "true";
      if (cur) localStorage.removeItem("remk_admin_free_preview_v360");
      else localStorage.setItem("remk_admin_free_preview_v360", "true");
      if (typeof window.showV351Toast === "function") {
        window.showV351Toast(cur ? "🔥 Zurück im Admin/Pro-Modus" : "👀 Free-Modus Vorschau aktiv");
      }
      if (typeof window.renderV352LockedTopBar === "function") window.renderV352LockedTopBar();
      if (document.body.classList.contains("remk-v34-in-workout") && typeof window.renderV345FitnessCleanPanel === "function") {
        window.renderV345FitnessCleanPanel(true);
      } else if (document.body.classList.contains("remk-v34-in-nutrition") && typeof window.renderV345NutritionCleanPanel === "function") {
        window.renderV345NutritionCleanPanel();
      } else if (typeof window.renderV345StartHub === "function") {
        window.renderV345StartHub();
      }
    } catch (e) {}
  }

  function openRemkProUpgradeSheet(featureLabel) {
    const modal = ensureSheetModal();
    const feat = String(featureLabel || "Dieses Pro-Feature");
    modal.innerHTML = `
      <div style="width:100%;max-width:460px;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1.5px solid rgba(255,94,0,0.45);border-radius:24px;padding:20px 18px;box-shadow:0 24px 60px rgba(0,0,0,0.5);">
        <div style="width:40px;height:4px;border-radius:99px;background:rgba(148,163,184,0.35);margin:0 auto 12px auto;"></div>
        <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:99px;background:rgba(255,94,0,0.16);color:#ff5e00;font-size:0.7rem;font-weight:900;text-transform:uppercase;margin-bottom:8px;">
          🔒 RE:MK PRO FEATURE
        </div>
        <div style="font-size:1.1rem;font-weight:900;margin-bottom:6px;line-height:1.25;">${escHtml(feat)}</div>
        <div style="font-size:0.8rem;color:var(--v34-muted,#94a3b8);margin-bottom:12px;line-height:1.45;">
          Im Free-Modus bleiben dein komplettes CleanUI-Logbuch, 18 KI-Comic-Übungsposen, der manuelle Plan-Baukasten (2 Pläne), 1RM/PRs und 18 Basis-Rezepte dauerhaft kostenlos. Mit <strong>RE:MK Pro</strong> schaltest du das volle Coaching-System frei:
        </div>
        <div style="display:grid;grid-template-columns:1fr;gap:5px;margin-bottom:14px;font-size:0.77rem;font-weight:700;padding:10px 12px;border-radius:14px;background:var(--v34-card-soft,#181f2e);border:1px solid var(--v34-border,rgba(148,163,184,0.2));">
          <div>⚡ Unbegrenzter KI-Trainings- &amp; Ernährungsplan-Generator (4–12 Wochen)</div>
          <div>👨‍👩‍👧 Familien- &amp; Kinder-Topf-Skalierung, Teller-Tausch &amp; 160+ Rezepte</div>
          <div>🧠 Alle 12 Profi-Algorithmen (Double-Progression, ACWR, MEV/MRV, Plateau, SFR)</div>
          <div>⌚ Pixel Watch 4 Live-Sync, Android-Widgets, Partner-Modus &amp; PDF-Export</div>
        </div>
        <button type="button" onclick="window.open('${TALLY_PRO_URL}', '_blank')" style="width:100%;padding:13px;border-radius:14px;border:none;background:linear-gradient(135deg,#ff5e00,#ff8c00);color:#ffffff;font-size:0.88rem;font-weight:900;cursor:pointer;margin-bottom:8px;">
          🚀 RE:MK Pro freischalten
        </button>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button type="button" onclick="window.REMK_INTELLIGENCE.openProLoginFromFree()" style="padding:10px;border-radius:13px;border:1px solid rgba(16,185,129,0.48);background:rgba(16,185,129,0.14);color:#10b981;font-size:0.78rem;font-weight:900;cursor:pointer;">🔑 Key eingeben</button>
          <button type="button" onclick="document.getElementById('remk-v354-sheet-modal').style.display='none'" style="padding:10px;border-radius:13px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.78rem;font-weight:800;cursor:pointer;">Weiter im Free-Modus</button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
  }

  // =========================================================================
  // 12. MANUELLER PLAN-BAUKASTEN (FREE: BIS 2 PLÄNE | PRO: UNBEGRENZT)
  // =========================================================================
  const MANUAL_PRESET_EXERCISES = [
    { name: "Langhantel-Bankdrücken", mech: "push_horiz", sets: 3, reps: 10 },
    { name: "Kurzhantel-Schrägbankdrücken", mech: "push_horiz", sets: 3, reps: 10 },
    { name: "Dips (Barren)", mech: "push_horiz", sets: 3, reps: 10 },
    { name: "Cable Flys / Butterfly", mech: "push_horiz", sets: 3, reps: 12 },
    { name: "Kurzhantel-Schulterdrücken", mech: "push_vert", sets: 3, reps: 10 },
    { name: "Seitheben (Kurzhantel)", mech: "push_iso", sets: 3, reps: 15 },
    { name: "Trizeps Pushdowns (Kabelzug)", mech: "push_iso", sets: 3, reps: 12 },
    { name: "Klimmzüge (Pull-Ups)", mech: "pull_vert", sets: 3, reps: 8 },
    { name: "Latzug breit zur Brust", mech: "pull_vert", sets: 3, reps: 10 },
    { name: "T-Bar Rudern (Brustgestützt)", mech: "pull_horiz", sets: 3, reps: 10 },
    { name: "Sitzendes Kabelrudern", mech: "pull_horiz", sets: 3, reps: 10 },
    { name: "Vorgebeugtes Kurzhantel-Rudern", mech: "pull_horiz", sets: 3, reps: 10 },
    { name: "Face Pulls (Seil)", mech: "pull_iso", sets: 3, reps: 15 },
    { name: "Kurzhantel Bizeps-Curls", mech: "pull_iso", sets: 3, reps: 12 },
    { name: "Langhantel-Kniebeugen", mech: "leg_squat", sets: 3, reps: 8 },
    { name: "45°-Beinpresse", mech: "leg_press", sets: 3, reps: 10 },
    { name: "Bulgarian Split Squats", mech: "leg_uni", sets: 3, reps: 10 },
    { name: "Rumänisches Kreuzheben (RDL)", mech: "hinge", sets: 3, reps: 10 },
    { name: "Kreuzheben (Klassisch / Sumo)", mech: "hinge", sets: 3, reps: 6 },
    { name: "Wadenheben stehend", mech: "calf", sets: 3, reps: 15 },
    { name: "Crunches / Hanging Leg Raises", mech: "core", sets: 3, reps: 15 }
  ];

  let _manualDraft = { title: "Mein eigener Plan", exercises: [0, 7, 14, 4, 9] };

  function loadSavedManualPlans() {
    const arr = safeParse(localStorage.getItem(scopedKey(MANUAL_PLANS_KEY)) || "[]", []);
    return Array.isArray(arr) ? arr : [];
  }

  function openManualPlanBuilderSheet() {
    const modal = ensureSheetModal();
    const savedPlans = loadSavedManualPlans();
    const isPro = isRemkProUnlocked();

    const savedHtml = savedPlans.length ? `
      <div style="margin-bottom:10px;">
        <div style="font-size:0.72rem;font-weight:900;color:var(--v34-muted,#94a3b8);margin-bottom:5px;">📂 GESPEICHERTE EIGENE PLÄNE (${savedPlans.length}${isPro ? '' : '/2 Free'})</div>
        ${savedPlans.map(function (pl, idx) {
          return `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding:8px 10px;border-radius:12px;background:var(--v34-card-soft,#181f2e);border:1px solid var(--v34-border,rgba(148,163,184,0.22));margin-bottom:5px;">
              <div style="min-width:0;flex:1;">
                <div style="font-size:0.82rem;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(pl.title)}</div>
                <div style="font-size:0.68rem;color:var(--v34-muted,#94a3b8);">${(pl.exercises || []).length} Übungen</div>
              </div>
              <button type="button" onclick="window.REMK_INTELLIGENCE.activateSavedManualPlan(${idx})" style="border:none;background:#10b981;color:#fff;border-radius:9px;padding:5px 9px;font-size:0.72rem;font-weight:900;cursor:pointer;">Start</button>
              <button type="button" onclick="window.REMK_INTELLIGENCE.deleteSavedManualPlan(${idx})" style="border:1px solid rgba(239,68,68,0.4);background:rgba(239,68,68,0.12);color:#f87171;border-radius:9px;padding:5px 8px;font-size:0.72rem;font-weight:800;cursor:pointer;">🗑️</button>
            </div>
          `;
        }).join("")}
      </div>
    ` : "";

    const exPickerHtml = MANUAL_PRESET_EXERCISES.map(function (ex, idx) {
      const sel = _manualDraft.exercises.includes(idx);
      return `
        <button type="button" onclick="window.REMK_INTELLIGENCE.toggleManualDraftEx(${idx})"
          style="display:flex;align-items:center;justify-content:space-between;width:100%;text-align:left;padding:8px 10px;border-radius:11px;margin-bottom:5px;cursor:pointer;border:1px solid ${sel ? '#ff5e00' : 'var(--v34-border,rgba(148,163,184,0.22))'};background:${sel ? 'rgba(255,94,0,0.15)' : 'var(--v34-card-soft,#181f2e)'};color:var(--v34-text,#f8fafc);font-size:0.78rem;font-weight:800;">
          <span>${sel ? '✅' : '➕'} ${escHtml(ex.name)}</span>
          <span style="font-size:0.68rem;color:var(--v34-muted,#94a3b8);">${ex.sets}×${ex.reps}</span>
        </button>
      `;
    }).join("");

    modal.innerHTML = `
      <div style="width:100%;max-width:480px;max-height:86vh;display:flex;flex-direction:column;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:16px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <div style="font-size:0.68rem;font-weight:900;color:#10b981;text-transform:uppercase;">${isPro ? 'Unbegrenzt · Pro' : 'Kostenlos · Bis zu 2 Pläne'}</div>
            <strong style="font-size:1.02rem;">🛠️ Manueller Plan-Baukasten</strong>
          </div>
          <button type="button" onclick="document.getElementById('remk-v354-sheet-modal').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>
        ${savedHtml}
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px;">
          <button type="button" onclick="window.REMK_INTELLIGENCE.applyManualStarterTemplate('gk')" style="border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);border-radius:9px;padding:4px 8px;font-size:0.69rem;font-weight:800;cursor:pointer;">⚡ Ganzkörper</button>
          <button type="button" onclick="window.REMK_INTELLIGENCE.applyManualStarterTemplate('ok')" style="border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);border-radius:9px;padding:4px 8px;font-size:0.69rem;font-weight:800;cursor:pointer;">💪 Oberkörper</button>
          <button type="button" onclick="window.REMK_INTELLIGENCE.applyManualStarterTemplate('uk')" style="border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);border-radius:9px;padding:4px 8px;font-size:0.69rem;font-weight:800;cursor:pointer;">🦵 Unterkörper</button>
          <button type="button" onclick="window.REMK_INTELLIGENCE.applyManualStarterTemplate('push')" style="border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);border-radius:9px;padding:4px 8px;font-size:0.69rem;font-weight:800;cursor:pointer;">🔥 Push/Pull</button>
        </div>
        <input type="text" id="remk-v360-manual-title" value="${escHtml(_manualDraft.title)}" oninput="window.REMK_INTELLIGENCE.setManualDraftTitle(this.value)" placeholder="Plan-Name (z. B. Push / Ganzkörper)"
          style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:12px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.86rem;font-weight:800;margin-bottom:8px;"/>
        <div style="font-size:0.72rem;font-weight:800;color:var(--v34-muted,#94a3b8);margin-bottom:5px;">Übungen auswählen (${_manualDraft.exercises.length} gewählt):</div>
        <div style="overflow-y:auto;flex:1;padding-right:2px;margin-bottom:10px;">${exPickerHtml}</div>
        <button type="button" onclick="window.REMK_INTELLIGENCE.saveAndStartManualPlan()" style="width:100%;padding:12px;border-radius:14px;border:none;background:#ff5e00;color:#fff;font-size:0.86rem;font-weight:900;cursor:pointer;">
          💾 Plan speichern &amp; direkt starten
        </button>
      </div>
    `;
    modal.style.display = "flex";
  }

  function setManualDraftTitle(val) { _manualDraft.title = String(val || "Mein eigener Plan"); }

  function toggleManualDraftEx(idx) {
    const pos = _manualDraft.exercises.indexOf(idx);
    if (pos >= 0) _manualDraft.exercises.splice(pos, 1);
    else _manualDraft.exercises.push(idx);
    openManualPlanBuilderSheet();
  }

  function injectManualPlanIntoDomAndOpen(planObj) {
    const resBox = document.getElementById("result-box");
    if (!resBox) return;
    const rowsHtml = (planObj.exercises || []).map(function (ex, eIdx) {
      const inputsHtml = Array.from({ length: ex.sets || 3 }, function (_, sIdx) {
        return `<input type="text" class="log-input-box" id="w1_man_${eIdx}_${sIdx}" placeholder="40" value="">`;
      }).join("");
      return `
        <tr data-plan-idx="${eIdx}" data-mech="${escHtml(ex.mech || 'push_horiz')}">
          <td class="exercise-col">
            <div class="exercise-name">${escHtml(ex.name)}</div>
            <div class="target-note">${ex.sets || 3}x${ex.reps || 10} | Pause: 90s</div>
            <div class="tempo-note">Tempo: 2-0-1-1</div>
          </td>
          <td class="week-col" data-week="1">${inputsHtml}</td>
        </tr>
      `;
    }).join("");

    document.querySelectorAll(".wizard-step").forEach(function (el) { el.classList.remove("active"); });
    resBox.innerHTML = `
      <div class="result-section remk-workout-day-group" data-wday-title="${escHtml(planObj.title)}">
        <h4>🏋️ Tag 1: ${escHtml(planObj.title)}</h4>
        <table class="plan-table"><tbody>${rowsHtml}</tbody></table>
      </div>
    `;
    resBox.style.display = "block";
    localStorage.setItem("remk_active_single_page", "workout");
    if (window.v34State) {
      window.v34State.fitSubTab = "logger";
      window.v34State.activeDayIdx = 0;
      window.v34State.activeExIdx = 0;
      window.v34State.activeSetIdx = 0;
    }
    if (typeof window.saveCurrentPlanSnapshot === "function") {
      try { window.saveCurrentPlanSnapshot(planObj.title); } catch (e) {}
    }
    document.body.classList.add("remk-v34-in-workout");
    document.body.classList.remove("remk-v34-in-nutrition");
    if (typeof window.renderV345FitnessCleanPanel === "function") window.renderV345FitnessCleanPanel();
    const modal = document.getElementById("remk-v354-sheet-modal");
    if (modal) modal.style.display = "none";
  }

  function saveAndStartManualPlan() {
    if (_manualDraft.exercises.length === 0) {
      if (typeof window.showV351Toast === "function") window.showV351Toast("⚠️ Bitte mindestens 1 Übung auswählen!");
      return;
    }
    const list = loadSavedManualPlans();
    if (!isRemkProUnlocked() && list.length >= 2) {
      openRemkProUpgradeSheet("📂 Mehr als 2 eigene Trainingspläne speichern");
      return;
    }
    const planObj = {
      title: (_manualDraft.title || "Mein eigener Plan").trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      exercises: _manualDraft.exercises.map(function (i) { return MANUAL_PRESET_EXERCISES[i]; }).filter(Boolean)
    };
    list.unshift(planObj);
    localStorage.setItem(scopedKey(MANUAL_PLANS_KEY), JSON.stringify(list.slice(0, 12)));
    injectManualPlanIntoDomAndOpen(planObj);
    if (typeof window.showV351Toast === "function") window.showV351Toast("✅ Eigener Plan gestartet!");
  }

  function activateSavedManualPlan(idx) {
    const list = loadSavedManualPlans();
    if (list[idx]) injectManualPlanIntoDomAndOpen(list[idx]);
  }

  function deleteSavedManualPlan(idx) {
    const list = loadSavedManualPlans();
    list.splice(idx, 1);
    localStorage.setItem(scopedKey(MANUAL_PLANS_KEY), JSON.stringify(list));
    openManualPlanBuilderSheet();
  }

  // =========================================================================
  // 13. ALLE 7 NEUEN SPORTWISSENSCHAFTLICHEN ALGORITHMEN (v36.0)
  // =========================================================================

  // #1 Effektive Wiederholungen (Stimulating Reps) & Junk-Volume-Detektor
  function computeStimulatingRepsStats(days) {
    let stimReps = 0;
    let totalWorkSets = 0;
    let junkSets = 0;
    (days || []).forEach(function (d) {
      (d.exercises || []).forEach(function (ex) {
        (ex.sets || []).forEach(function (s) {
          if (!s.done || s.setType === "W") return;
          totalWorkSets++;
          const rir = (s.rir != null && !isNaN(s.rir)) ? Number(s.rir) : 2;
          const eff = rir <= 0 ? 5 : (rir === 1 ? 4 : (rir === 2 ? 3 : (rir === 3 ? 2 : 0)));
          stimReps += eff;
          if (rir >= 4) junkSets++;
        });
      });
    });
    const junkPct = totalWorkSets > 0 ? Math.round((junkSets / totalWorkSets) * 100) : 0;
    let verdict = "Noch keine Arbeitssätze absolviert.";
    let color = "#94a3b8";
    if (totalWorkSets > 0) {
      if (junkPct >= 35) {
        verdict = `⚠️ ${junkPct}% leichte Sätze (RIR 4+ = Junk-Volume). Trainiere näher ans Muskelversagen (RIR 1–2).`;
        color = "#f59e0b";
      } else {
        verdict = `🔥 Hohe Satz-Qualität: ${stimReps} effektive Wachstums-Wdh. bei nur ${junkPct}% Junk-Volume!`;
        color = "#10b981";
      }
    }
    return { stimReps: stimReps, totalWorkSets: totalWorkSets, junkSets: junkSets, junkPct: junkPct, verdict: verdict, color: color };
  }

  // #2 Wiedereinstiegs- & Detraining-Ramp-In (nach >10 Tagen Trainingspause)
  function computeDetrainingRampIn() {
    const hist = safeParse(localStorage.getItem(scopedKey("remk_v34_workout_history_v1")) || "[]", []);
    if (!Array.isArray(hist) || hist.length === 0) return null;
    const dates = hist.map(function (h) { return h && h.date ? Date.parse(h.date + "T12:00:00") : 0; }).filter(Boolean);
    if (!dates.length) return null;
    const lastTs = Math.max.apply(null, dates);
    const gapDays = Math.floor((Date.now() - lastTs) / 86400000);
    if (gapDays < 10) return null;
    if (gapDays > 28) {
      return { gapDays: gapDays, pctDrop: 20, setsCut: 1, label: `🛡️ Wiedereinstieg nach ${gapDays} Tagen Pause: −20% Last & −1 Satz empfohlen.` };
    }
    if (gapDays >= 15) {
      return { gapDays: gapDays, pctDrop: 15, setsCut: 1, label: `🛡️ Wiedereinstieg nach ${gapDays} Tagen Pause: −15% Last & −1 Satz empfohlen.` };
    }
    return { gapDays: gapDays, pctDrop: 10, setsCut: 0, label: `🛡️ Wiedereinstieg nach ${gapDays} Tagen Pause: −10% Schutz-Reduktion für Woche 1.` };
  }

  // #3 3-Einheiten-Plateau-Wächter pro Übung
  function detectExercisePlateau(exName) {
    const clean = String(exName || "").replace(/^\s*[\u{1F300}-\u{1FAFF}\u2600-\u27BF]+\s*/gu, "").replace(/\[[^\]]+\]/g, "").trim().toLowerCase();
    if (!clean) return null;
    const list = safeParse(localStorage.getItem(scopedKey(UNIFIED_HIST_KEY)) || "[]", []);
    const matches = list.filter(function (x) { return x && String(x.name || "").toLowerCase() === clean && (x.est1Rm || 0) > 0; });
    if (matches.length < 3) return null;
    // list is newest-first
    const r0 = matches[0].est1Rm;
    const r1 = matches[1].est1Rm;
    const r2 = matches[2].est1Rm;
    if (r0 <= r1 && r1 <= r2) {
      return {
        sessions: 3,
        best1Rm: Math.max(r0, r1, r2),
        tip: `📉 Plateau seit 3 Einheiten (~${r0} kg 1RM): Wechsle auf 6–8 Wdh., tausche die Variante oder nutze einen Mikro-Deload.`
      };
    }
    return null;
  }

  // #4 Relativkraft-Score & Kraft-Level (DOTS-inspirierte KG-Normierung)
  function computeRelativeStrengthLevels(days) {
    const bw = Math.max(40, parseFloat(document.getElementById("weight")?.value || localStorage.getItem("remk_saved_weight") || "78") || 78);
    const isFemale = (window.REMK_ANATOMY && window.REMK_ANATOMY.getGender() === "w");
    const gFactor = isFemale ? 1.38 : 1.0;

    let bestRatio = 0;
    let bestName = "";
    let best1Rm = 0;
    (days || []).forEach(function (d) {
      (d.exercises || []).forEach(function (ex) {
        (ex.sets || []).forEach(function (s) {
          const effRm = s.est1Rm || ((window.REMK_SCIENCE_BRAIN && ex.isBw) ? window.REMK_SCIENCE_BRAIN.calc1RmUpTo25(window.REMK_SCIENCE_BRAIN.getEffectiveLoadKg(ex.name, ex.mech, s.kg, true), s.reps) : 0);
          if (s.setType === "W" || !effRm) return;
          const m = String(ex.mech || "").toLowerCase();
          const n = String(ex.name || "").toLowerCase();
          let norm = 1.0;
          if (/hinge|kreuzheben|deadlift/.test(m + " " + n)) norm = 0.62;
          else if (/leg_squat|kniebeug|squat/.test(m + " " + n)) norm = 0.72;
          else if (/push_horiz|bankdrück|bench/.test(m + " " + n)) norm = 1.0;
          else if (/push_vert|schulterdrück/.test(m + " " + n)) norm = 1.45;
          else if (/pull_horiz|pull_vert|rudern|latzug|klimmzug/.test(m + " " + n)) norm = 1.15;
          else return;
          const score = (effRm / bw) * norm * gFactor;
          if (score > bestRatio) {
            bestRatio = score;
            bestName = ex.name;
            best1Rm = effRm;
          }
        });
      });
    });

    const dotsApprox = Math.round(bestRatio * 265);
    let tier = "Einsteiger";
    let color = "#38bdf8";
    if (bestRatio >= 1.55) { tier = "Elite"; color = "#a855f7"; }
    else if (bestRatio >= 1.25) { tier = "Profi"; color = "#ff5e00"; }
    else if (bestRatio >= 0.98) { tier = "Athlet"; color = "#10b981"; }
    else if (bestRatio >= 0.72) { tier = "Fortgeschritten"; color = "#22c55e"; }

    return {
      tier: tier,
      color: color,
      ratio: +bestRatio.toFixed(2),
      dotsApprox: dotsApprox,
      bestName: bestName,
      best1Rm: best1Rm,
      bw: bw
    };
  }

  // #5 Stimulus-to-Fatigue-Ratio (SFR) pro Übung
  function recordExerciseSfr(exName, pump, joints) {
    try {
      const key = String(exName || "").replace(/\[[^\]]+\]/g, "").trim().toLowerCase();
      if (!key) return;
      const map = safeParse(localStorage.getItem(scopedKey(SFR_KEY)) || "{}", {});
      const score = +((Number(pump || 2) + Number(joints || 3)) / 2).toFixed(2);
      map[key] = { score: score, pump: Number(pump || 2), joints: Number(joints || 3), ts: Date.now() };
      localStorage.setItem(scopedKey(SFR_KEY), JSON.stringify(map));
    } catch (e) {}
  }

  function getExerciseSfrBadge(exName) {
    try {
      const key = String(exName || "").replace(/\[[^\]]+\]/g, "").trim().toLowerCase();
      const map = safeParse(localStorage.getItem(scopedKey(SFR_KEY)) || "{}", {});
      const entry = map[key];
      if (!entry) return null;
      if (entry.joints <= 1) return { label: "⚠️ SFR: Gelenklastig", color: "#ef4444" };
      if (entry.score >= 2.5) return { label: "⭐ Top-SFR Übung", color: "#10b981" };
      return { label: "✓ Solide SFR", color: "#38bdf8" };
    } catch (e) { return null; }
  }

  // #6 Dynamischer ZNS-/ATP-Pausen-Algorithmus
  function computeDynamicRestSeconds(curEx, setObj, readinessMode) {
    const m = String((curEx && curEx.mech) || "").toLowerCase();
    const n = String((curEx && curEx.name) || "").toLowerCase();
    const reps = parseInt((setObj && setObj.reps) || (curEx && curEx.targetReps) || 10, 10) || 10;
    const rir = (setObj && setObj.rir != null) ? Number(setObj.rir) : 2;
    const isCompound = /squat|hinge|press|push_horiz|push_vert|pull_vert|pull_horiz|kniebeug|kreuzheben|bankdrück|rudern|klimmzug|dip/.test(m + " " + n);
    let sec = 90;
    if (isCompound) {
      if (reps <= 6 || rir <= 1) sec = 150;
      else sec = 110;
    } else {
      sec = (rir === 0) ? 75 : 60;
    }
    if (readinessMode === "red") sec += 30;
    else if (readinessMode === "yellow") sec += 15;
    return Math.min(210, Math.max(45, sec));
  }

  // #7 Protein-Timing (Leucin-Schwelle 25–40g) & Diät-Refeed-Impuls
  function computeProteinTimingAndRefeed(meals, targetKcal) {
    const list = Array.isArray(meals) ? meals : [];
    const mainMeals = list.filter(function (m) { return (m.kcal || 0) >= 250; });
    const hitCount = mainMeals.filter(function (m) { return (m.prot || 0) >= 25; }).length;
    const totalMain = mainMeals.length;
    const timingOk = totalMain === 0 || hitCount >= Math.max(1, totalMain - 1);

    const goal = (document.getElementById("goal_nutrition")?.value || document.getElementById("goal_training")?.value || "").toLowerCase();
    const isCut = /abnehm|cut|defizit|-300|-500/.test(goal) || (parseInt(document.getElementById("athlete_goal")?.value || "0", 10) < 0);
    const histCount = safeParse(localStorage.getItem(scopedKey("remk_v34_workout_history_v1")) || "[]", []).length;
    const refeedDue = isCut && (histCount > 0 && histCount % 6 === 0);

    return {
      hitCount: hitCount,
      totalMain: totalMain,
      timingOk: timingOk,
      timingText: totalMain > 0
        ? (timingOk
          ? `✅ Leucin-Schwelle optimal: ${hitCount}/${totalMain} Mahlzeiten erreichen ≥25g Protein.`
          : `⚠️ Ungleiche Protein-Verteilung (${hitCount}/${totalMain} ≥25g): Stärke proteinarme Mahlzeiten für optimale MPS.`)
        : "Generiere deinen Plan für die Leucin-/Protein-Timing-Analyse.",
      isCut: isCut,
      refeedDue: refeedDue,
      refeedText: refeedDue
        ? `🍚 Refeed-Impuls aktiv: Plane heute +${Math.round((targetKcal || 2000) * 0.18)} kcal aus Kohlenhydraten für volle Glykogenspeicher & Hormone.`
        : (isCut ? "🔥 Diät-Modus aktiv: Alle 10–14 Tage empfiehlt sich 1 gezielter High-Carb-Refeed auf Erhaltungskalorien." : "")
    };
  }


  // =========================================================================
  // 14. v36.1: STARTER-VORLAGEN + WOCHEN-KALORIEN-BANK + SONNTAGS-RECAP
  // =========================================================================
  const CAL_BANK_KEY = "remk_v361_calorie_bank_v1";

  function requireRemkPro(featureLabel) {
    if (isRemkProUnlocked()) return true;
    openRemkProUpgradeSheet(featureLabel || "Dieses RE:MK Pro-Feature");
    return false;
  }

  function applyManualStarterTemplate(tplKey) {
    if (tplKey === "gk") {
      _manualDraft = { title: "Ganzkörper Basis (3×/Woche)", exercises: [0, 7, 14, 9, 4, 20] };
    } else if (tplKey === "ok") {
      _manualDraft = { title: "Oberkörper Fokus", exercises: [1, 7, 9, 4, 5, 13, 6] };
    } else if (tplKey === "uk") {
      _manualDraft = { title: "Unterkörper & Core", exercises: [14, 17, 15, 16, 19, 20] };
    } else {
      _manualDraft = { title: "Push / Pull Hybrid", exercises: [0, 2, 3, 8, 10, 12] };
    }
    openManualPlanBuilderSheet();
  }

  function getIsoWeekKey() {
    const d = new Date();
    const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = utc.getUTCDay() || 7;
    utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((utc - yearStart) / 86400000) + 1) / 7);
    return utc.getUTCFullYear() + "-W" + String(weekNo).padStart(2, "0");
  }

  function getCalorieBankStatus() {
    const all = safeParse(localStorage.getItem(scopedKey(CAL_BANK_KEY)) || "{}", {});
    const wk = getIsoWeekKey();
    const surplus = parseInt(all[wk] || 0, 10) || 0;
    const dow = (new Date().getDay() + 6) % 7; // Mo=0..So=6
    const remDays = Math.max(1, 7 - dow);
    const dailyOffset = surplus !== 0 ? Math.round(-surplus / remDays) : 0;
    return {
      weekKey: wk,
      surplusKcal: surplus,
      remainingDays: remDays,
      dailyOffsetKcal: dailyOffset,
      hint: surplus > 0
        ? `⚖️ +${surplus} kcal Wochen-Überschuss: Sanfter Ausgleich von ${dailyOffset} kcal/Tag über die nächsten ${remDays} Tag(e).`
        : (surplus < 0
          ? `🔋 ${Math.abs(surplus)} kcal Puffer angespart (+${Math.abs(dailyOffset)} kcal/Tag frei für Wochenende/Grillen).`
          : "Ausgeglichen – bei Grillen, Pizza oder Puffer-Tagen einfach 1-Tap ausgleichen.")
    };
  }

  function addCalorieBankEntry(deltaKcal) {
    const all = safeParse(localStorage.getItem(scopedKey(CAL_BANK_KEY)) || "{}", {});
    const wk = getIsoWeekKey();
    const next = Math.max(-2500, Math.min(3500, (parseInt(all[wk] || 0, 10) || 0) + (parseInt(deltaKcal, 10) || 0)));
    all[wk] = next;
    localStorage.setItem(scopedKey(CAL_BANK_KEY), JSON.stringify(all));
    if (typeof window.showV351Toast === "function") {
      window.showV351Toast(`🏦 Wochen-Kalorien-Bank: ${deltaKcal > 0 ? '+' : ''}${deltaKcal} kcal verbucht`);
    }
    if (typeof window.renderV345NutritionCleanPanel === "function") window.renderV345NutritionCleanPanel();
  }

  function resetCalorieBank() {
    const all = safeParse(localStorage.getItem(scopedKey(CAL_BANK_KEY)) || "{}", {});
    delete all[getIsoWeekKey()];
    localStorage.setItem(scopedKey(CAL_BANK_KEY), JSON.stringify(all));
    if (typeof window.renderV345NutritionCleanPanel === "function") window.renderV345NutritionCleanPanel();
  }

  function buildWeeklyRecapSummary(days) {
    const hist = safeParse(localStorage.getItem(scopedKey("remk_v34_workout_history_v1")) || "[]", []);
    const now = Date.now();
    let sessions7d = 0, vol7d = 0, sets7d = 0;
    (Array.isArray(hist) ? hist : []).forEach(function (h) {
      if (!h || !h.date) return;
      const age = (now - Date.parse(h.date + "T12:00:00")) / 86400000;
      if (age >= -1 && age <= 7) {
        sessions7d++;
        vol7d += Number(h.volumeKg || 0);
        sets7d += Number(h.doneSets || 0);
      }
    });
    let liveSets = 0, liveVol = 0;
    (days || []).forEach(function (d) {
      (d.exercises || []).forEach(function (ex) {
        (ex.sets || []).forEach(function (s) {
          if (s.done) { liveSets++; liveVol += (parseFloat(s.kg) || 0) * (parseInt(s.reps, 10) || 0); }
        });
      });
    });
    const totalVol = Math.round(vol7d + liveVol);
    const totalSets = sets7d + liveSets;
    const cons = getWeeklyConsistencyStrip();
    const prCount = Object.keys(safeParse(localStorage.getItem(scopedKey("remk_v34_pr_map_v1")) || "{}", {})).length;
    const bmList = (typeof window.getSavedBodyMeasurementsList === "function") ? (window.getSavedBodyMeasurementsList() || []) : [];
    const lastW = bmList.length ? (bmList[bmList.length - 1].weight || bmList[bmList.length - 1].kg || "—") : "—";
    return {
      sessions: Math.max(sessions7d, liveSets > 0 ? 1 : 0),
      totalVol: totalVol,
      totalSets: totalSets,
      consistencyPct: cons.pct,
      prCount: prCount,
      lastWeight: lastW
    };
  }

  function shareWeeklyRecapSummary(days) {
    const r = buildWeeklyRecapSummary(days || []);
    const usr = localStorage.getItem("remk_user_name") || "Athlet";
    const text = [
      `🏆 *RE:MK Wochen-Recap – ${usr}* (${getIsoWeekKey()})`,
      `🏋️ Einheiten: ${r.sessions} | Arbeitssätze: ${r.totalSets}`,
      `⚡ Wochen-Tonnage: ${r.totalVol.toLocaleString("de-DE")} kg | 🥇 PRs: ${r.prCount}`,
      `🔥 Wochen-Konstanz: ${r.consistencyPct}% | ⚖️ Gewicht: ${r.lastWeight} kg`,
      `— Powered by RE:MK Coaching`
    ].join("\n");
    if (navigator.share) {
      navigator.share({ title: "RE:MK Wochen-Recap", text: text }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (typeof window.showV351Toast === "function") window.showV351Toast("📋 Wochen-Recap kopiert (bereit für WhatsApp!)");
      }).catch(function () {});
    } else {
      openPromptSheet({ title: "📋 Wochen-Recap kopieren", initialValue: text, confirmLabel: "Fertig" });
    }
  }

  window.REMK_INTELLIGENCE = {
    requireRemkPro: requireRemkPro,
    applyManualStarterTemplate: applyManualStarterTemplate,
    getCalorieBankStatus: getCalorieBankStatus,
    addCalorieBankEntry: addCalorieBankEntry,
    resetCalorieBank: resetCalorieBank,
    buildWeeklyRecapSummary: buildWeeklyRecapSummary,
    shareWeeklyRecapSummary: shareWeeklyRecapSummary,
    isRemkProUnlocked: isRemkProUnlocked,
    startRemkFreeMode: startRemkFreeMode,
    openProLoginFromFree: openProLoginFromFree,
    toggleAdminFreePreview: toggleAdminFreePreview,
    openRemkProUpgradeSheet: openRemkProUpgradeSheet,
    openManualPlanBuilderSheet: openManualPlanBuilderSheet,
    setManualDraftTitle: setManualDraftTitle,
    toggleManualDraftEx: toggleManualDraftEx,
    saveAndStartManualPlan: saveAndStartManualPlan,
    activateSavedManualPlan: activateSavedManualPlan,
    deleteSavedManualPlan: deleteSavedManualPlan,
    computeStimulatingRepsStats: computeStimulatingRepsStats,
    computeDetrainingRampIn: computeDetrainingRampIn,
    detectExercisePlateau: detectExercisePlateau,
    computeRelativeStrengthLevels: computeRelativeStrengthLevels,
    recordExerciseSfr: recordExerciseSfr,
    getExerciseSfrBadge: getExerciseSfrBadge,
    computeDynamicRestSeconds: computeDynamicRestSeconds,
    computeProteinTimingAndRefeed: computeProteinTimingAndRefeed,
    getSessionFeedback: getSessionFeedback,
    setSessionFeedback: setSessionFeedback,
    getNextWeekVolumeAdvice: getNextWeekVolumeAdvice,
    getTodayQuickAdd: getTodayQuickAdd,
    addQuickNutrition: addQuickNutrition,
    resetTodayQuickAdd: resetTodayQuickAdd,
    markDayConsistent: markDayConsistent,
    getWeeklyConsistencyStrip: getWeeklyConsistencyStrip,
    version: "36.2",
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
  window.isRemkProUnlocked = isRemkProUnlocked;
  window.startRemkFreeMode = startRemkFreeMode;
  window.openRemkProUpgradeSheet = openRemkProUpgradeSheet;
  window.requireRemkPro = requireRemkPro;
  installHistoryHook();
  setTimeout(installHistoryHook, 250);
  setTimeout(installHistoryHook, 900);
})();
