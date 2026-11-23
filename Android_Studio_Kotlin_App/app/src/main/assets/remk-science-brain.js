/* ============================================================================
   RE:MK v36.2 – SCIENCE-BRAIN (EBENE A + B), BODYWEIGHT-ENGINE & 360°-KOPPLUNG
   - Over-the-Air Parameter-Sync (remk_science_brain.json) mit 100% Offline-Fallback
   - Individuelles Lern-Hirn (persönliche Erholungskurve & SFR-Präferenz)
   - Bodyweight-Last- & Gym-Transfer-Engine (BW * Faktor + Zusatz / - Assist, p1/p2)
   - CleanUI <-> remk_strength_memory_v194 Brücke (bis 25 Wdh.)
   - Tagestyp-Carb-/Kalorien-Cycling (Training / Spieltag / Ruhetag / Schutzmodus)
   - 4-Modul-Kopplung (sRPE -> ACWR & Heatmap, Auto-Cool-Down-Flow, Gelenkschutz)
   - Rollen-Einstieg, Morgen-Readiness, Schutzmodus, Multi-Gym, Zutaten-Sperre,
     Offline-BLS-Suche, 1-Tap Voll-Backup/Restore, Privates Vorher-Nachher-Studio
   ============================================================================ */
(function initRemkScienceBrainV362() {
  "use strict";
  if (window.REMK_SCIENCE_BRAIN && window.REMK_SCIENCE_BRAIN.version === "36.2") return;

  const DEFAULT_BRAIN_CFG = {"version": "2026.11", "updatedAt": "2026-11-20", "sources": ["ISSN Protein & Timing Position Stand", "ACSM Strength & Conditioning Guidelines", "RP Hypertrophy Volume Landmarks (MEV/MAV/MRV)", "Gabbett ACWR Workload Management", "FIFA 11+ & Nordic Hamstring Injury Prevention"], "bodyweightFactors": {"pullup_dip": 0.95, "pistol_single_leg": 0.85, "pushup_flat": 0.65, "bw_squat_lunge": 0.65, "inverted_row": 0.6, "core_iso": 0.0}, "recoveryBaseHours": {"chest": 54, "upper_back": 54, "lats": 54, "lower_back": 64, "quads": 66, "hamstrings": 64, "glutes": 60, "shoulders_front": 44, "shoulders_side": 40, "shoulders_rear": 42, "biceps": 40, "triceps": 42, "forearms": 36, "traps": 44, "abs": 36, "obliques": 36, "calves": 40}, "acwr": {"lowMax": 0.78, "sweetMin": 0.8, "sweetMax": 1.35, "highAlert": 1.45}, "nutritionCycling": {"trainingDayKcalMult": 1.1, "trainingDayCarbMult": 1.2, "matchDayKcalMult": 1.16, "matchDayCarbMult": 1.32, "restDayKcalMult": 0.9, "restDayCarbMult": 0.78, "sickTravelKcalMult": 1.0, "sickExtraWaterL": 0.5, "leucineMinProtG": 25}, "matchdayPeriodization": {"MD-4": {"label": "Kraft & Explosivität (MD-4)", "volMult": 1.0, "intMult": 0.95, "focus": "Kraft, Sprints & Richtungswechsel (COD)"}, "MD-3": {"label": "Hohe Intensität & Schnelligkeit (MD-3)", "volMult": 0.9, "intMult": 0.95, "focus": "Kurz-Sprints, Sprünge & Core-Stabilität"}, "MD-2": {"label": "Tapering & Spritzigkeit (MD-2)", "volMult": 0.65, "intMult": 0.85, "focus": "Geringes Volumen, explosive Kontakte, 0% Muskelkater"}, "MD-1": {"label": "Aktivierung & Neuromuskulär (MD-1)", "volMult": 0.4, "intMult": 0.75, "focus": "Kurze Antritte, Mobility, Reaktions-Drills"}, "MD": {"label": "Spieltag / Wettkampf (MD)", "volMult": 0.25, "intMult": 0.7, "focus": "RAMP Warm-Up, Carb-Loading & Elektrolyte"}, "MD+1": {"label": "Aktive Regeneration (MD+1)", "volMult": 0.35, "intMult": 0.55, "focus": "Durchblutung, leichtes Stretching & Schlaf"}, "MD+2": {"label": "Wiedereinstieg & Prävention (MD+2)", "volMult": 0.75, "intMult": 0.8, "focus": "FIFA 11+, Rumpf, Oberkörper & Technik"}}, "explainers": {"acwr": "ACWR vergleicht deine Belastung der letzten 7 Tage mit deinem 4-Wochen-Schnitt. Zwischen 0,80 und 1,35 wächst du optimal bei minimalem Verletzungsrisiko.", "mev_mrv": "MEV = Mindest-Sätze für Muskelaufbau · MAV = optimaler Bereich · MRV = Erholungsgrenze. Darüber hinaus wächst du nicht schneller, sondern ermüdest nur stärker.", "sfr": "SFR (Stimulus-to-Fatigue-Ratio) misst, wie viel Muskelreiz (Pump) eine Übung im Verhältnis zur Gelenkbelastung liefert. Top-SFR-Übungen bevorzugt RE:MK für dich.", "dots": "Relativkraft (DOTS) setzt deine bewegten Gewichte ins Verhältnis zu deinem Körpergewicht und Geschlecht – so vergleichst du deine echte Leistungsfähigkeit fair.", "bw_load": "Bei Eigengewichtsübungen rechnet RE:MK automatisch deinen realen Körpergewichts-Anteil (z. B. 95% bei Klimmzügen, 65% bei Liegestützen) plus Zusatz- oder Minus-Assistgewicht ein.", "cycling": "Tagestyp-Cycling verteilt mehr Kohlenhydrate auf Trainings- & Spieltage und etwas weniger auf Ruhetage – bei konstantem Protein und exakt gleichem Wochenschnitt."}};
  const OTA_CACHE_KEY = "remk_v362_science_brain_ota_v1";
  const LEARNED_REC_KEY = "remk_v362_learned_recovery_v1";
  const PROTECTION_KEY = "remk_v362_protection_mode_v1";
  const CYCLING_MODE_KEY = "remk_v362_nutri_cycling_on_v1";
  const DAYTYPE_MAP_KEY = "remk_v362_daytype_map_v1";
  const JOINT_FLAGS_KEY = "remk_v362_joint_flags_v1";
  const ROLE_MODE_KEY = "remk_v362_user_role_view_v1";
  const GYM_PROFILE_KEY = "remk_v362_gym_profile_v1";
  const BLOCKED_ING_KEY = "remk_v362_blocked_ingredients_v1";
  const MORNING_CHECK_KEY = "remk_v362_morning_readiness_v1";
  const PROGRESS_IDB_NAME = "remk_v362_progress_photos_db";
  const PROGRESS_IDB_STORE = "progress";

  function safeParse(raw, fb) {
    try { return JSON.parse(raw); } catch (e) { return fb; }
  }

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  // =========================================================================
  // 1. EBENE B: REMOTE SCIENCE BRAIN CONFIG (OTA-SYNC + OFFLINE-FALLBACK)
  // =========================================================================
  let _activeCfg = (function loadCachedBrain() {
    const cached = safeParse(localStorage.getItem(OTA_CACHE_KEY) || "null", null);
    if (cached && cached.version && cached.bodyweightFactors) return cached;
    return DEFAULT_BRAIN_CFG;
  })();

  function getBrainConfig() { return _activeCfg; }

  function syncRemoteBrainConfigSilent() {
    try {
      if (!navigator.onLine || typeof fetch !== "function") return;
      fetch("./remk_science_brain.json?t=" + Math.floor(Date.now() / 3600000), { cache: "no-store" })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (data) {
          if (data && data.version && data.bodyweightFactors && data.acwr) {
            _activeCfg = data;
            localStorage.setItem(OTA_CACHE_KEY, JSON.stringify(data));
          }
        })
        .catch(function () {});
    } catch (e) {}
  }

  // =========================================================================
  // 2. EBENE A: INDIVIDUELLES LERN-HIRN (PERSÖNLICHE ERHOLUNG + ?-ERKLÄRUNGEN)
  // =========================================================================
  function getLearnedRecoveryMultiplier(zone) {
    const map = safeParse(localStorage.getItem(scopedKey(LEARNED_REC_KEY)) || "{}", {});
    const val = parseFloat(map[zone]);
    return (!isNaN(val) && val >= 0.7 && val <= 1.45) ? val : 1.0;
  }

  function learnFromSessionFeedback(days, fb) {
    try {
      if (!fb || !window.REMK_ANATOMY) return;
      const map = safeParse(localStorage.getItem(scopedKey(LEARNED_REC_KEY)) || "{}", {});
      const touched = new Set();
      (days || []).forEach(function (d) {
        (d.exercises || []).forEach(function (ex) {
          if ((ex.sets || []).some(function (s) { return s.done; })) {
            const det = window.REMK_ANATOMY.detectExerciseMuscles([ex]);
            (det.primary || []).forEach(function (z) { touched.add(z); });
          }
        });
      });
      touched.forEach(function (z) {
        const cur = parseFloat(map[z]) || 1.0;
        let next = cur;
        if (fb.joints <= 1 || fb.fatigue >= 3) next = Math.min(1.40, +(cur + 0.08).toFixed(2));
        else if (fb.joints >= 3 && fb.fatigue <= 1) next = Math.max(0.75, +(cur - 0.05).toFixed(2));
        map[z] = next;
      });
      localStorage.setItem(scopedKey(LEARNED_REC_KEY), JSON.stringify(map));
    } catch (e) {}
  }

  function openScienceExplainSheet(topicKey, customTitle) {
    const cfg = getBrainConfig();
    const map = (cfg && cfg.explainers) || DEFAULT_BRAIN_CFG.explainers;
    const titles = {
      acwr: "⚡ ACWR Belastungs-Ampel",
      mev_mrv: "📊 MEV / MAV / MRV Volumen",
      sfr: "⭐ Stimulus-to-Fatigue-Ratio (SFR)",
      dots: "🏅 Relativkraft (DOTS)",
      bw_load: "🤸 Automatische Eigengewichts-Last",
      cycling: "🔄 Tagestyp-Carb-Cycling"
    };
    const body = map[topicKey] || "Sportwissenschaftlicher RE:MK Richtwert, kalibriert auf deine persönlichen Trainings- und Körperdaten.";
    const modal = ensureV362SheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:440px;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="font-size:0.68rem;font-weight:900;color:#10b981;text-transform:uppercase;margin-bottom:4px;">🧠 RE:MK Science-Core ${escHtml(cfg.version || '2026.11')}</div>
        <div style="font-size:1.02rem;font-weight:900;margin-bottom:8px;">${escHtml(customTitle || titles[topicKey] || "Wissenschafts-Info")}</div>
        <div style="font-size:0.84rem;color:var(--v34-muted,#94a3b8);line-height:1.5;margin-bottom:14px;">${escHtml(body)}</div>
        <button type="button" onclick="document.getElementById('remk-v362-sheet').style.display='none'" style="width:100%;padding:11px;border-radius:13px;border:none;background:#ff5e00;color:#fff;font-weight:900;font-size:0.84rem;cursor:pointer;">Verstanden ✓</button>
      </div>
    `;
    modal.style.display = "flex";
  }

  // =========================================================================
  // 3. AUTOMATIC BODYWEIGHT LOAD & GYM-TRANSFER ENGINE + CLEANUI STRENGTH SYNC
  // =========================================================================
  function getActiveAthleteBodyweightKg(slotOverride) {
    const slot = slotOverride || getSlot();
    const elId = slot === "p2" ? "partner_weight" : "athlete_weight";
    const fallbackId = slot === "p2" ? "partner_weight" : "weight";
    const fromDom = parseFloat(document.getElementById(elId)?.value || document.getElementById(fallbackId)?.value || "0") || 0;
    if (fromDom >= 35 && fromDom <= 220) return fromDom;
    const saved = parseFloat(localStorage.getItem(slot === "p2" ? "remk_saved_partner_weight" : "remk_saved_weight") || "0") || 0;
    if (saved >= 35 && saved <= 220) return saved;
    return slot === "p2" ? 65 : 80;
  }

  function getBodyweightFactor(exName, mech) {
    const n = String(exName || "").toLowerCase();
    const m = String(mech || "").toLowerCase();
    const f = (getBrainConfig().bodyweightFactors) || DEFAULT_BRAIN_CFG.bodyweightFactors;

    if (/plank|crunch|sit-?up|dead bug|bird-?dog|hollow|l-?sit|dragon flag|bauch|core|ab wheel|rollout|wall sit|wandsitz|stretch|dehn|mobility|atmung|transversus/.test(n) || m === "core") {
      return f.core_iso || 0;
    }
    if (/klimmzug|klimmzüg|pull-?up|chin-?up|muscle-?up|\bdip\b|\bdips\b|barren/.test(n)) {
      return f.pullup_dip || 0.95;
    }
    if (/pistol|shrimp|skater squat|einbeinig.*kniebeug|single-?leg squat|bulgar.*bodyweight/.test(n)) {
      return f.pistol_single_leg || 0.85;
    }
    if (/liegestütz|push-?up|planche|pike/.test(n)) {
      return f.pushup_flat || 0.65;
    }
    if (/australian|tisch-?rudern|inverted row|ring-?rudern|bodyweight.*rudern/.test(n)) {
      return f.inverted_row || 0.60;
    }
    if (/air squat|jump squat|bodyweight.*squat|bodyweight.*kniebeug|burpee|sprawl|ausfallschritt.*bodyweight/.test(n)) {
      return f.bw_squat_lunge || 0.65;
    }
    return 0;
  }

  function getEffectiveLoadKg(exName, mech, loggedKg, isBw, slotOverride) {
    const extra = parseFloat(loggedKg) || 0;
    if (!isBw) return Math.max(0, extra);
    const factor = getBodyweightFactor(exName, mech);
    if (factor <= 0) return Math.max(0, extra);
    const bw = getActiveAthleteBodyweightKg(slotOverride);
    const eff = (bw * factor) + extra; // extra kann positiv (+10kg Gürtel) ODER negativ (-20kg Assist-Maschine) sein!
    return Math.max(5, Math.round(eff * 10) / 10);
  }

  function calc1RmUpTo25(loadKg, reps) {
    const w = parseFloat(loadKg) || 0;
    const r = Math.max(1, Math.min(25, parseInt(reps, 10) || 10));
    if (w <= 0) return 0;
    // Bis 15 Wdh. klassisches Epley, 16-25 Wdh. leicht gedämpfte Fortführung
    const factor = r <= 15 ? (1 + r / 30.0) : (1.5 + (r - 15) * 0.026);
    return Math.round(w * factor);
  }

  function calcWorkingWeightFrom1RmUpTo25(est1Rm, targetReps, minStep) {
    const rm = parseFloat(est1Rm) || 0;
    const r = Math.max(1, Math.min(25, parseInt(targetReps, 10) || 10));
    if (rm <= 0) return 0;
    const factor = r <= 15 ? (1 + r / 30.0) : (1.5 + (r - 15) * 0.026);
    const step = minStep || 1.25;
    return Math.max(step, Math.round((rm / factor) / step) * step);
  }

  // Brücken-Funktion: Jeder abgehakte CleanUI-Satz (inkl. BW mit echter Last!) aktualisiert remk_strength_memory_v194!
  function syncCleanSetToStrengthMemory(exObj, loggedKg, reps) {
    try {
      if (!exObj || !exObj.name) return;
      const slot = getSlot();
      const effLoad = getEffectiveLoadKg(exObj.name, exObj.mech, loggedKg, exObj.isBw, slot);
      if (effLoad <= 0) return;
      const cleanName = (typeof window.cleanCanonicalExName === "function")
        ? window.cleanCanonicalExName(exObj.name)
        : String(exObj.name).replace(/\[[^\]]+\]/g, "").trim().toLowerCase();
      if (!cleanName) return;

      const mem = (typeof window.loadProfileStrengthMemory === "function")
        ? window.loadProfileStrengthMemory(slot)
        : safeParse(localStorage.getItem("remk_strength_memory_v194_" + slot) || '{"byEx":{},"byFam":{}}', { byEx: {}, byFam: {} });

      const bio = (typeof window.getBiomechanicalTransferProfile === "function")
        ? window.getBiomechanicalTransferProfile(cleanName, exObj.mech || "")
        : { family: exObj.mech || "general", ratio: 1.0, minStep: 1.25, isBodyweight: Boolean(exObj.isBw) };

      const est1RM = calc1RmUpTo25(effLoad, reps);
      if (!mem.byEx) mem.byEx = {};
      if (!mem.byFam) mem.byFam = {};

      mem.byEx[cleanName] = {
        weight: parseFloat(loggedKg) || 0,
        effectiveWeight: effLoad,
        reps: parseInt(reps, 10) || 10,
        est1RM: est1RM,
        family: bio.family,
        ratio: bio.ratio,
        isBw: Boolean(exObj.isBw),
        updatedAt: Date.now()
      };

      // Echter Gym-Transfer auch AUS Eigengewichtsübungen (z. B. Klimmzug 95kg -> Latzug ~88kg, Liegestütz 65kg -> Bankdrücken ~65kg)
      let famRatio = bio.ratio || 1.0;
      if (exObj.isBw) {
        const nLow = cleanName;
        if (/klimmzug|klimmzüg|pull-?up|chin-?up/.test(nLow)) famRatio = 1.06; // Klimmzug etwas schwerer als Latzug
        else if (/\bdip|dips/.test(nLow)) famRatio = 1.02;
        else if (/liegestütz|push-?up/.test(nLow)) famRatio = 0.96;
        else if (/australian|inverted/.test(nLow)) famRatio = 0.92;
        else if (/pistol|squat/.test(nLow)) famRatio = 0.95;
      }

      const factorBw = exObj.isBw ? getBodyweightFactor(exObj.name, exObj.mech) : 1;
      if ((!exObj.isBw || factorBw > 0) && famRatio > 0 && est1RM > 0) {
        mem.byFam[bio.family] = {
          ref1RM: Math.round((est1RM / famRatio) * 100) / 100,
          sourceEx: cleanName,
          sourceWeight: effLoad,
          sourceReps: parseInt(reps, 10) || 10,
          fromBodyweight: Boolean(exObj.isBw),
          updatedAt: Date.now()
        };
      }

      if (typeof window.saveProfileStrengthMemory === "function") {
        window.saveProfileStrengthMemory(mem, slot);
      } else {
        localStorage.setItem("remk_strength_memory_v194_" + slot, JSON.stringify(mem));
      }
    } catch (e) {}
  }

  // =========================================================================
  // 4. TAGESTYP-CARB-/KALORIEN-CYCLING + URLAUBS-/KRANKHEITS-SCHUTZMODUS
  // =========================================================================
  function getProtectionMode() {
    const raw = safeParse(localStorage.getItem(scopedKey(PROTECTION_KEY)) || "null", null);
    if (!raw || !raw.mode || raw.mode === "none") return { mode: "none", since: "" };
    return raw;
  }

  function setProtectionMode(mode) {
    const m = (mode === "sick" || mode === "travel") ? mode : "none";
    if (m === "none") {
      localStorage.removeItem(scopedKey(PROTECTION_KEY));
      if (typeof window.showV351Toast === "function") window.showV351Toast("✅ Schutzmodus beendet – willkommen zurück!");
    } else {
      localStorage.setItem(scopedKey(PROTECTION_KEY), JSON.stringify({ mode: m, since: todayIso() }));
      if (window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.markDayConsistent === "function") {
        window.REMK_INTELLIGENCE.markDayConsistent();
      }
      if (typeof window.showV351Toast === "function") {
        window.showV351Toast(m === "sick"
          ? "🤒 Krankheits-Schutz aktiv: Serie eingefroren, Erhaltungs-kcal & +0,5 L Wasser!"
          : "✈️ Urlaubs-Schutz aktiv: Serie geschützt, flexible Erhaltungs-kcal!");
      }
    }
    refreshAllUi();
  }

  function isNutritionCyclingEnabled() {
    return localStorage.getItem(scopedKey(CYCLING_MODE_KEY)) === "true";
  }

  function toggleNutritionCycling() {
    const next = !isNutritionCyclingEnabled();
    localStorage.setItem(scopedKey(CYCLING_MODE_KEY), next ? "true" : "false");
    if (typeof window.showV351Toast === "function") {
      window.showV351Toast(next ? "🔄 Tagestyp-Carb-Cycling aktiviert!" : "⚖️ Gleichmäßige Tages-Kalorien aktiv");
    }
    if (typeof window.renderV345NutritionCleanPanel === "function") window.renderV345NutritionCleanPanel();
  }

  function getDayTypeForDayNum(dayNum) {
    const map = safeParse(localStorage.getItem(scopedKey(DAYTYPE_MAP_KEY)) || "{}", {});
    const key = "d" + String(dayNum || 1);
    if (map[key]) return map[key];
    // Automatische Ableitung aus Vereins-/Spieltag-Sync oder Standard-Split (Mo/Mi/Fr Kraft, So Spieltag optional)
    try {
      const teamSync = safeParse(localStorage.getItem("remk_team_schedule_sync_v280") || "null", null);
      const dowIdx = ((parseInt(dayNum, 10) || 1) - 1) % 7; // 0=Mo..6=So
      if (teamSync) {
        if (teamSync.matchDayIdx === dowIdx || teamSync.matchDayIdx === ((dowIdx + 1) % 7)) return "match";
        if (Array.isArray(teamSync.clubDays) && teamSync.clubDays.includes(dowIdx)) return "training";
        if (Array.isArray(teamSync.gymDays) && teamSync.gymDays.includes(dowIdx)) return "training";
      }
      if (dowIdx === 0 || dowIdx === 2 || dowIdx === 4) return "training";
    } catch (e) {}
    return "rest";
  }

  function cycleDayTypeForDayNum(dayNum) {
    const cur = getDayTypeForDayNum(dayNum);
    const order = ["training", "rest", "match"];
    const next = order[(order.indexOf(cur) + 1) % order.length];
    const map = safeParse(localStorage.getItem(scopedKey(DAYTYPE_MAP_KEY)) || "{}", {});
    map["d" + String(dayNum || 1)] = next;
    localStorage.setItem(scopedKey(DAYTYPE_MAP_KEY), JSON.stringify(map));
    if (!isNutritionCyclingEnabled()) localStorage.setItem(scopedKey(CYCLING_MODE_KEY), "true");
    if (typeof window.renderV345NutritionCleanPanel === "function") window.renderV345NutritionCleanPanel();
  }

  function getDayTypeNutritionProfile(baseKcal, dayNum) {
    const cfg = (getBrainConfig().nutritionCycling) || DEFAULT_BRAIN_CFG.nutritionCycling;
    const protMode = getProtectionMode();
    const base = Math.max(1200, Math.round(baseKcal || 2200));

    if (protMode.mode === "sick" || protMode.mode === "travel") {
      return {
        dayType: protMode.mode,
        label: protMode.mode === "sick" ? "🤒 Krankheits-Schutz (Erhaltung)" : "✈️ Urlaubs-Schutz (Flexibel)",
        kcal: base,
        deltaKcal: 0,
        carbHint: protMode.mode === "sick" ? "Leicht verdaulich, Fokus auf Protein, Mikronährstoffe & +0,5 L Wasser." : "Protein-Anker halten, flexibel genießen ohne Diät-Druck.",
        extraWaterL: protMode.mode === "sick" ? (cfg.sickExtraWaterL || 0.5) : 0.25,
        color: "#38bdf8"
      };
    }

    if (!isNutritionCyclingEnabled()) {
      return {
        dayType: "even",
        label: "⚖️ Gleichmäßiger Tag",
        kcal: base,
        deltaKcal: 0,
        carbHint: "Konstante Makros jeden Tag (tippe auf 🔄 Cycling für Trainings-/Spieltags-Anpassung).",
        extraWaterL: 0,
        color: "#94a3b8"
      };
    }

    const dt = getDayTypeForDayNum(dayNum);
    if (dt === "match") {
      const k = Math.round((base * (cfg.matchDayKcalMult || 1.16)) / 10) * 10;
      return {
        dayType: "match",
        label: "⚽ Spieltag / MD−1 (Carb-Load)",
        kcal: k,
        deltaKcal: k - base,
        carbHint: `+${k - base} kcal gezielt über leicht verdauliche Kohlenhydrate (Reis, Pasta, Banane) + Elektrolyte.`,
        extraWaterL: 0.75,
        color: "#ff5e00"
      };
    }
    if (dt === "training") {
      const k = Math.round((base * (cfg.trainingDayKcalMult || 1.10)) / 10) * 10;
      return {
        dayType: "training",
        label: "🏋️ Kraft-Trainingstag (+Carbs)",
        kcal: k,
        deltaKcal: k - base,
        carbHint: `+${k - base} kcal extra Kohlenhydrate rund ums Training · Protein bleibt konstant.`,
        extraWaterL: 0.5,
        color: "#10b981"
      };
    }
    const k = Math.round((base * (cfg.restDayKcalMult || 0.90)) / 10) * 10;
    return {
      dayType: "rest",
      label: "🛌 Ruhetag (Weniger KH)",
      kcal: k,
      deltaKcal: k - base,
      carbHint: `${k - base} kcal über reduzierte Kohlenhydrate · Protein hoch halten für maximale Regeneration.`,
      extraWaterL: 0,
      color: "#60a5fa"
    };
  }

  // =========================================================================
  // 5. 4-MODUL-KOPPLUNG (sRPE -> ACWR & HEATMAP, AUTO-COOLDOWN, GELENKSCHUTZ)
  // =========================================================================
  function recordClubOrCourseSessionSrpe(title, durationMin, rpe, focusAreas) {
    try {
      const mins = Math.max(15, parseInt(durationMin, 10) || 60);
      const rpeVal = Math.max(1, Math.min(10, parseInt(rpe, 10) || 7));
      const srpeLoad = mins * rpeVal; // Klassische Foster sRPE-Einheiten
      const equivVolKg = srpeLoad * 18; // Umrechnung in äquivalente ACWR-Last-Einheiten

      // 1. In Trainingshistorie einspeisen -> fließt automatisch in ACWR & Wochen-Recap ein!
      const hKey = scopedKey("remk_v34_workout_history_v1");
      const hist = safeParse(localStorage.getItem(hKey) || "[]", []);
      hist.push({
        date: todayIso(),
        title: "🏟️ " + String(title || "Vereins-/Kurseinheit"),
        doneSets: Math.round(mins / 5),
        volumeKg: equivVolKg,
        srpe: srpeLoad,
        source: "club_course"
      });
      localStorage.setItem(hKey, JSON.stringify(hist.slice(-90)));

      // 2. Ermüdung direkt in Muskel-Erholungs-Heatmap (KI-Comic) einspeisen!
      const zones = Array.isArray(focusAreas) && focusAreas.length
        ? focusAreas
        : ["quads", "hamstrings", "glutes", "calves", "abs"];
      const fKey = scopedKey("remk_v354_muscle_fatigue_v1");
      const fMap = safeParse(localStorage.getItem(fKey) || "{}", {});
      const now = Date.now();
      const loadAdd = +(rpeVal * 0.55).toFixed(2);
      zones.forEach(function (z) {
        const cur = fMap[z] || { ts: now, load: 0 };
        fMap[z] = { ts: now, load: Math.min(10, +((cur.load || 0) + loadAdd).toFixed(2)) };
      });
      localStorage.setItem(fKey, JSON.stringify(fMap));

      if (window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.markDayConsistent === "function") {
        window.REMK_INTELLIGENCE.markDayConsistent();
      }
      if (typeof window.showV351Toast === "function") {
        window.showV351Toast(`🏟️ sRPE ${srpeLoad} verbucht → ACWR & Muskel-Frische aktualisiert!`);
      }
    } catch (e) {}
  }

  function getJointProtectionFlags() {
    const arr = safeParse(localStorage.getItem(scopedKey(JOINT_FLAGS_KEY)) || "[]", []);
    return Array.isArray(arr) ? arr : [];
  }

  function addJointProtectionFlag(jointName) {
    const clean = String(jointName || "").trim();
    if (!clean) return;
    const arr = getJointProtectionFlags();
    if (!arr.includes(clean)) {
      arr.push(clean);
      localStorage.setItem(scopedKey(JOINT_FLAGS_KEY), JSON.stringify(arr.slice(-5)));
    }
  }

  function removeJointProtectionFlag(jointName) {
    const arr = getJointProtectionFlags().filter(function (j) { return j !== jointName; });
    localStorage.setItem(scopedKey(JOINT_FLAGS_KEY), JSON.stringify(arr));
    refreshAllUi();
  }

  const COOLDOWN_DRILLS_BY_ZONE = {
    chest:           { name: "Türrahmen Brust-Öffner", dur: "2×45s", cue: "Ellbogen auf Schulterhöhe, sanft nach vorne lehnen, tief ausatmen." },
    upper_back:      { name: "Thoracic Open Book (BWS-Rotation)", dur: "2×8/Seite", cue: "In Seitenlage Knie fixieren, oberen Arm langsam bis zum Boden öffnen." },
    lats:            { name: "Child's Pose mit Seit-Stretch (Lat)", dur: "2×45s", cue: "Hände weit nach vorne & leicht seitlich wandern, Achsel Richtung Boden." },
    shoulders_front: { name: "Schulter-Kapsel & Außenrotation", dur: "2×40s", cue: "Schultern tief lassen, Brustwirbelsäule aufrichten." },
    quads:           { name: "Couch-Stretch (Hüftbeuger & Quad)", dur: "2×45s/Seite", cue: "Gesäß fest anspannen, Becken aufrichten – kein Hohlkreuz." },
    hamstrings:      { name: "90/90 Beinrückseiten-Stretch", dur: "2×45s/Seite", cue: "Mit geradem Rücken aus der Hüfte beugen, Ferse sanft heranziehen." },
    glutes:          { name: "Taube / Figure-4 Glute-Stretch", dur: "2×45s/Seite", cue: "Tief in den Bauch atmen und Hüfte langsam sinken lassen." },
    lower_back:      { name: "Cat-Cow & Knie-zur-Brust Entlastung", dur: "2×60s", cue: "Langsam Wirbel für Wirbel mobilisieren, unterer Rücken entspannt." },
    calves:          { name: "Waden- & Achillessehnen-Dehnung an Wand", dur: "2×40s/Seite", cue: "Einmal mit gestrecktem, einmal mit leicht gebeugtem Knie." }
  };

  function openAutoCooldownFlowModal() {
    const recMap = (window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.getMuscleRecoveryMap === "function")
      ? window.REMK_INTELLIGENCE.getMuscleRecoveryMap()
      : {};
    const fatigued = Object.keys(recMap)
      .filter(function (z) { return recMap[z] < 65 && COOLDOWN_DRILLS_BY_ZONE[z]; })
      .sort(function (a, b) { return recMap[a] - recMap[b]; });

    const jointFlags = getJointProtectionFlags();
    const chosenKeys = fatigued.slice(0, 4);
    if (jointFlags.some(function (j) { return /schulter/i.test(j); }) && !chosenKeys.includes("shoulders_front")) chosenKeys.unshift("shoulders_front");
    if (jointFlags.some(function (j) { return /knie/i.test(j); }) && !chosenKeys.includes("quads")) chosenKeys.unshift("quads");
    if (jointFlags.some(function (j) { return /rücken|lws/i.test(j); }) && !chosenKeys.includes("lower_back")) chosenKeys.unshift("lower_back");
    if (chosenKeys.length < 3) {
      ["upper_back", "quads", "hamstrings", "lower_back"].forEach(function (k) {
        if (chosenKeys.length < 4 && !chosenKeys.includes(k)) chosenKeys.push(k);
      });
    }

    const drills = chosenKeys.slice(0, 5).map(function (k) { return { zone: k, pct: recMap[k] != null ? recMap[k] : 100, drill: COOLDOWN_DRILLS_BY_ZONE[k] }; });
    const modal = ensureV362SheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:480px;max-height:85vh;overflow-y:auto;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <div style="font-size:0.68rem;font-weight:900;color:#10b981;text-transform:uppercase;">360° Auto-Kopplung (Ermüdung &amp; Gelenke)</div>
            <strong style="font-size:1.05rem;">🧘 Dein Auto-Cool-Down (8 Min.)</strong>
          </div>
          <button type="button" onclick="document.getElementById('remk-v362-sheet').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>
        ${jointFlags.length ? `<div style="font-size:0.73rem;font-weight:800;color:#f59e0b;margin-bottom:8px;">🩹 Aktiver Gelenkschutz berücksichtigt: ${escHtml(jointFlags.join(", "))}</div>` : ''}
        ${drills.map(function (item, idx) {
          return `
            <div style="padding:10px 12px;border-radius:14px;background:var(--v34-card-soft,#181f2e);border:1px solid var(--v34-border,rgba(148,163,184,0.2));margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px;">
                <strong style="font-size:0.84rem;">${idx + 1}. ${escHtml(item.drill.name)}</strong>
                <span style="font-size:0.7rem;font-weight:900;color:#10b981;white-space:nowrap;">${escHtml(item.drill.dur)}</span>
              </div>
              <div style="font-size:0.74rem;color:var(--v34-muted,#94a3b8);line-height:1.4;">${escHtml(item.drill.cue)}</div>
              ${item.pct < 85 ? `<div style="font-size:0.66rem;color:#f59e0b;font-weight:800;margin-top:3px;">🔋 Muskel-Frische aktuell ${item.pct}% → gezielte Entlastung</div>` : ''}
            </div>
          `;
        }).join("")}
        <button type="button" onclick="if(typeof window.startRestTimer==='function')window.startRestTimer(45);if(typeof window.showV351Toast==='function')window.showV351Toast('⏱️ 45-Sek.-Dehn-Timer gestartet!');" style="width:100%;padding:11px;border-radius:13px;border:none;background:#10b981;color:#fff;font-weight:900;font-size:0.84rem;cursor:pointer;">⏱️ 45s Dehn-Timer starten</button>
      </div>
    `;
    modal.style.display = "flex";
  }

  // =========================================================================
  // 6. 30-SEKUNDEN MORGEN-READINESS-CHECK-IN -> AUTO-AMPEL
  // =========================================================================
  function getTodayMorningReadiness() {
    const all = safeParse(localStorage.getItem(scopedKey(MORNING_CHECK_KEY)) || "{}", {});
    return all[todayIso()] || null;
  }

  function openMorningReadinessModal() {
    const cur = getTodayMorningReadiness() || { sleep: 2, stress: 2, soreness: 2 };
    window._v362MorningDraft = { sleep: cur.sleep, stress: cur.stress, soreness: cur.soreness };
    renderMorningReadinessModal();
  }

  function setMorningDraftVal(k, v) {
    if (!window._v362MorningDraft) window._v362MorningDraft = { sleep: 2, stress: 2, soreness: 2 };
    window._v362MorningDraft[k] = Number(v);
    renderMorningReadinessModal();
  }

  function renderMorningReadinessModal() {
    const d = window._v362MorningDraft || { sleep: 2, stress: 2, soreness: 2 };
    const score = d.sleep + d.stress + d.soreness; // 3..9
    const recMode = score <= 4 ? "red" : (score <= 6 ? "yellow" : "green");
    const recLbl = recMode === "green" ? "🟢 Grün (100% Vollgas)" : (recMode === "yellow" ? "🟡 Gelb (−5% Schutz)" : "🔴 Rot (−15% Erholung)");

    function rowHtml(field, title, opts) {
      return `
        <div style="margin-bottom:10px;">
          <div style="font-size:0.78rem;font-weight:800;margin-bottom:5px;">${title}</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
            ${opts.map(function (o) {
              const act = d[field] === o.v;
              return `<button type="button" onclick="window.REMK_SCIENCE_BRAIN.setMorningDraftVal('${field}', ${o.v})" style="padding:8px 4px;border-radius:11px;border:1.5px solid ${act ? '#ff5e00' : 'var(--v34-border,rgba(148,163,184,0.24))'};background:${act ? 'rgba(255,94,0,0.16)' : 'var(--v34-card-soft,#181f2e)'};color:var(--v34-text,#f8fafc);font-size:0.72rem;font-weight:800;cursor:pointer;">${o.lbl}</button>`;
            }).join("")}
          </div>
        </div>
      `;
    }

    const modal = ensureV362SheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:450px;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <div>
            <div style="font-size:0.68rem;font-weight:900;color:#ff5e00;text-transform:uppercase;">30-Sekunden Auto-Ampel</div>
            <strong style="font-size:1.02rem;">☀️ Morgen-Readiness Check-in</strong>
          </div>
          <button type="button" onclick="document.getElementById('remk-v362-sheet').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>
        ${rowHtml("sleep", "😴 Schlaf letzte Nacht", [{ v: 1, lbl: "😵 <5,5 h" }, { v: 2, lbl: "🙂 6–7 h" }, { v: 3, lbl: "🔥 7,5+ h" }])}
        ${rowHtml("stress", "🧠 Alltags- / Arbeitsstress", [{ v: 1, lbl: "🤯 Hoch" }, { v: 2, lbl: "😐 Mittel" }, { v: 3, lbl: "😌 Locker" }])}
        ${rowHtml("soreness", "🦵 Muskelkater / Gelenke", [{ v: 1, lbl: "🩹 Stark" }, { v: 2, lbl: "⚡ Spürbar" }, { v: 3, lbl: "💪 Frisch" }])}
        <div style="padding:10px 12px;border-radius:13px;background:var(--v34-card-soft,#181f2e);border:1px solid var(--v34-border,rgba(148,163,184,0.22));font-size:0.8rem;font-weight:800;margin-bottom:12px;text-align:center;">
          Empfohlene Tages-Ampel: <strong>${recLbl}</strong>
        </div>
        <button type="button" onclick="window.REMK_SCIENCE_BRAIN.saveMorningReadiness('${recMode}')" style="width:100%;padding:12px;border-radius:14px;border:none;background:#ff5e00;color:#fff;font-size:0.86rem;font-weight:900;cursor:pointer;">✅ Übernehmen &amp; Ampel setzen</button>
      </div>
    `;
    modal.style.display = "flex";
  }

  function saveMorningReadiness(recMode) {
    const d = window._v362MorningDraft || { sleep: 2, stress: 2, soreness: 2 };
    const all = safeParse(localStorage.getItem(scopedKey(MORNING_CHECK_KEY)) || "{}", {});
    all[todayIso()] = { sleep: d.sleep, stress: d.stress, soreness: d.soreness, mode: recMode };
    localStorage.setItem(scopedKey(MORNING_CHECK_KEY), JSON.stringify(all));
    if (window.v34State) window.v34State.readinessMode = recMode;
    document.getElementById("remk-v362-sheet").style.display = "none";
    if (typeof window.showV351Toast === "function") {
      window.showV351Toast("☀️ Readiness gespeichert: " + (recMode === "green" ? "🟢 100%" : (recMode === "yellow" ? "🟡 −5%" : "🔴 −15%")));
    }
    refreshAllUi();
  }

  // =========================================================================
  // 7. ROLLEN-EINSTIEG + MULTI-GYM PROFILE + ZUTATEN-SPERRE + BLS-SUCHE + BACKUP
  // =========================================================================
  function getUserRoleMode() {
    return localStorage.getItem(ROLE_MODE_KEY) || "all"; // all | privat | familie | verein
  }

  function setUserRoleMode(role) {
    const clean = ["all", "privat", "familie", "verein"].includes(role) ? role : "all";
    localStorage.setItem(ROLE_MODE_KEY, clean);
    if (typeof window.renderV345StartHub === "function") window.renderV345StartHub();
  }

  function getActiveGymProfile() {
    return localStorage.getItem(scopedKey(GYM_PROFILE_KEY)) || "studio_a"; // studio_a | homegym | travel
  }

  function setActiveGymProfile(prof) {
    const clean = ["studio_a", "homegym", "travel"].includes(prof) ? prof : "studio_a";
    localStorage.setItem(scopedKey(GYM_PROFILE_KEY), clean);
    if (typeof window.showV351Toast === "function") {
      const lbls = { studio_a: "🏢 Studio A (2,5 kg Schritte)", homegym: "🏠 Home-Gym (2 kg Schritte)", travel: "✈️ Reise / Hotel" };
      window.showV351Toast("Geräte-Profil: " + lbls[clean]);
    }
    refreshAllUi();
  }

  function getGymStepIncrement() {
    const p = getActiveGymProfile();
    return p === "homegym" ? 2.0 : 2.5;
  }

  function getBlockedIngredients() {
    const arr = safeParse(localStorage.getItem(scopedKey(BLOCKED_ING_KEY)) || "[]", []);
    return Array.isArray(arr) ? arr : [];
  }

  function isRecipeBlockedByIngredients(rec) {
    const blocked = getBlockedIngredients();
    if (!blocked.length || !rec) return false;
    const blob = (String(rec.name || "") + " " + (rec.ingredients || []).map(function (i) { return i.name || ""; }).join(" ")).toLowerCase();
    return blocked.some(function (b) { return b && blob.includes(b.toLowerCase()); });
  }

  function toggleBlockedIngredient(term) {
    const clean = String(term || "").trim();
    if (!clean) return;
    let arr = getBlockedIngredients();
    if (arr.includes(clean)) arr = arr.filter(function (x) { return x !== clean; });
    else arr.push(clean);
    localStorage.setItem(scopedKey(BLOCKED_ING_KEY), JSON.stringify(arr));
    openBlockedIngredientsModal();
    if (document.body.classList.contains("remk-v34-in-nutrition") && typeof window.renderV345NutritionCleanPanel === "function") {
      window.renderV345NutritionCleanPanel();
    }
  }

  function openBlockedIngredientsModal() {
    const presets = ["Thunfisch", "Lachs", "Fisch", "Pilze", "Avocado", "Nüsse", "Erdnuss", "Tofu", "Kichererbsen", "Linsen", "Spinat", "Feta", "Oliven", "Koriander", "Zwiebel"];
    const cur = getBlockedIngredients();
    const allTags = Array.from(new Set(presets.concat(cur)));
    const modal = ensureV362SheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:460px;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <div style="font-size:0.68rem;font-weight:900;color:#ef4444;text-transform:uppercase;">Dauerhafter Ausschluss-Filter</div>
            <strong style="font-size:1.02rem;">🚫 Mag ich nicht / Allergien</strong>
          </div>
          <button type="button" onclick="document.getElementById('remk-v362-sheet').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>
        <div style="font-size:0.76rem;color:var(--v34-muted,#94a3b8);margin-bottom:10px;">Ausgewählte Zutaten werden dauerhaft in der Rezepte-Datenbank ausgeblendet:</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
          ${allTags.map(function (t) {
            const on = cur.includes(t);
            const safeT = escHtml(t).replace(/'/g, "\\'");
            return `<button type="button" onclick="window.REMK_SCIENCE_BRAIN.toggleBlockedIngredient('${safeT}')" style="padding:6px 10px;border-radius:99px;border:1px solid ${on ? '#ef4444' : 'var(--v34-border,rgba(148,163,184,0.24))'};background:${on ? 'rgba(239,68,68,0.18)' : 'var(--v34-card-soft,#181f2e)'};color:${on ? '#fca5a5' : 'var(--v34-text,#f8fafc)'};font-size:0.74rem;font-weight:800;cursor:pointer;">${on ? '🚫 ' : ''}${escHtml(t)}</button>`;
          }).join("")}
        </div>
        <div style="display:flex;gap:6px;">
          <input type="text" id="remk-v362-custom-block-inp" placeholder="Weitere Zutat (z. B. Sellerie)..." style="flex:1;padding:9px 11px;border-radius:11px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.82rem;"/>
          <button type="button" onclick="const v=document.getElementById('remk-v362-custom-block-inp')?.value||'';if(v.trim())window.REMK_SCIENCE_BRAIN.toggleBlockedIngredient(v.trim());" style="padding:9px 13px;border-radius:11px;border:none;background:#ff5e00;color:#fff;font-weight:900;font-size:0.8rem;cursor:pointer;">+ Sperren</button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
  }

  // Offline BLS-Lebensmittelsuche direkt für 1-Tap Schnell-Log!
  function openBlsQuickFoodSearchModal() {
    const modal = ensureV362SheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:480px;max-height:84vh;display:flex;flex-direction:column;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:16px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <div style="font-size:0.68rem;font-weight:900;color:#10b981;text-transform:uppercase;">100% Offline · BLS DACH-Datenbank</div>
            <strong style="font-size:1.02rem;">🔎 Lebensmittel schnell loggen</strong>
          </div>
          <button type="button" onclick="document.getElementById('remk-v362-sheet').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>
        <div style="display:flex;gap:6px;margin-bottom:8px;">
          <input type="search" id="remk-v362-bls-q" placeholder="z. B. Skyr, Banane, Haferflocken, Brötchen, Ei..." oninput="window.REMK_SCIENCE_BRAIN.renderBlsResults()" style="flex:1;padding:10px 12px;border-radius:12px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.84rem;"/>
          <input type="number" id="remk-v362-bls-g" value="100" min="10" max="1500" step="10" oninput="window.REMK_SCIENCE_BRAIN.renderBlsResults()" title="Menge in Gramm" style="width:74px;padding:10px 8px;border-radius:12px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.84rem;font-weight:900;text-align:center;"/>
        </div>
        <div style="font-size:0.7rem;color:var(--v34-muted,#94a3b8);margin-bottom:6px;">Menge rechts in Gramm (g) anpassen · 1-Tap addiert direkt zu Heute:</div>
        <div id="remk-v362-bls-results" style="overflow-y:auto;flex:1;"></div>
      </div>
    `;
    modal.style.display = "flex";
    renderBlsResults();
    setTimeout(function () { document.getElementById("remk-v362-bls-q")?.focus(); }, 60);
  }

  function renderBlsResults() {
    const host = document.getElementById("remk-v362-bls-results");
    if (!host) return;
    const db = Array.isArray(window.REMK_LOCAL_BLS_FOOD_DB) ? window.REMK_LOCAL_BLS_FOOD_DB : [];
    const q = String(document.getElementById("remk-v362-bls-q")?.value || "").trim().toLowerCase();
    const g = Math.max(10, parseFloat(document.getElementById("remk-v362-bls-g")?.value || "100") || 100);
    const hits = (q ? db.filter(function (x) { return x && String(x.name || "").toLowerCase().includes(q); }) : db).slice(0, 28);

    if (!hits.length) {
      host.innerHTML = `<div style="text-align:center;padding:18px;font-size:0.8rem;color:var(--v34-muted,#94a3b8);">Kein Treffer für „${escHtml(q)}“.</div>`;
      return;
    }
    host.innerHTML = hits.map(function (it) {
      const mult = g / 100;
      const kcal = Math.round((it.kcal || 0) * mult);
      const prot = Math.round((it.prot || 0) * mult);
      const carbs = Math.round((it.carbs || 0) * mult);
      const fat = Math.round((it.fat || 0) * mult);
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 10px;border-radius:12px;background:var(--v34-card-soft,#181f2e);border:1px solid var(--v34-border,rgba(148,163,184,0.2));margin-bottom:6px;">
          <div style="min-width:0;flex:1;">
            <div style="font-size:0.8rem;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(it.name)}</div>
            <div style="font-size:0.69rem;color:var(--v34-muted,#94a3b8);">${g} g &bull; <strong>${kcal} kcal</strong> &bull; ${prot}g EW &bull; ${carbs}g KH &bull; ${fat}g F</div>
          </div>
          <button type="button" onclick="if(window.REMK_INTELLIGENCE)window.REMK_INTELLIGENCE.addQuickNutrition(${kcal},${prot});document.getElementById('remk-v362-sheet').style.display='none';" style="border:none;background:#10b981;color:#fff;border-radius:10px;padding:7px 10px;font-size:0.74rem;font-weight:900;cursor:pointer;white-space:nowrap;">+ Log</button>
        </div>
      `;
    }).join("");
  }

  // 1-Tap Voll-Backup & Wiederherstellen (alle remk_* Keys!)
  function exportFullBackupJson() {
    try {
      const payload = { app: "RE:MK", version: "36.2", exportedAt: new Date().toISOString(), storage: {} };
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith("remk_")) payload.storage[k] = localStorage.getItem(k);
      }
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `REMK_Backup_${todayIso()}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 250);
      if (typeof window.showV351Toast === "function") window.showV351Toast("💾 RE:MK Voll-Backup heruntergeladen!");
    } catch (e) {
      if (typeof window.showV351Toast === "function") window.showV351Toast("⚠️ Backup fehlgeschlagen");
    }
  }

  function importFullBackupJson() {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "application/json,.json";
    inp.style.display = "none";
    document.body.appendChild(inp);
    inp.onchange = function () {
      const file = inp.files && inp.files[0];
      try { inp.remove(); } catch (e) {}
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const parsed = JSON.parse(String(reader.result || "{}"));
          if (!parsed || !parsed.storage || typeof parsed.storage !== "object") throw new Error("invalid");
          let cnt = 0;
          Object.keys(parsed.storage).forEach(function (k) {
            if (k.startsWith("remk_")) {
              localStorage.setItem(k, parsed.storage[k]);
              cnt++;
            }
          });
          if (typeof window.showV351Toast === "function") window.showV351Toast(`✅ Backup wiederhergestellt (${cnt} Datensätze)!`);
          setTimeout(function () { window.location.reload(); }, 650);
        } catch (e) {
          if (typeof window.showV351Toast === "function") window.showV351Toast("⚠️ Ungültige RE:MK Backup-Datei");
        }
      };
      reader.readAsText(file);
    };
    inp.click();
  }

  // =========================================================================
  // 8. PRIVATES VORHER-NACHHER-FOTO-STUDIO (100% LOKAL IN INDEXEDDB + SLIDER)
  // =========================================================================
  function openProgressDb() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) return reject(new Error("no idb"));
      const req = window.indexedDB.open(PROGRESS_IDB_NAME, 1);
      req.onupgradeneeded = function (ev) {
        const db = ev.target.result;
        if (!db.objectStoreNames.contains(PROGRESS_IDB_STORE)) {
          db.createObjectStore(PROGRESS_IDB_STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function loadAllProgressPhotos() {
    return openProgressDb().then(function (db) {
      return new Promise(function (resolve) {
        const tx = db.transaction(PROGRESS_IDB_STORE, "readonly");
        const req = tx.objectStore(PROGRESS_IDB_STORE).getAll();
        req.onsuccess = function () {
          const rows = (req.result || []).sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
          resolve(rows);
        };
        req.onerror = function () { resolve([]); };
      });
    }).catch(function () { return []; });
  }

  function addProgressPhotoFromPicker() {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.style.display = "none";
    document.body.appendChild(inp);
    inp.onchange = function () {
      const file = inp.files && inp.files[0];
      try { inp.remove(); } catch (e) {}
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.onload = function () {
          const maxW = 600, maxH = 800;
          const sc = Math.min(1, maxW / (img.width || 600), maxH / (img.height || 800));
          const cv = document.createElement("canvas");
          cv.width = Math.max(120, Math.round((img.width || 600) * sc));
          cv.height = Math.max(120, Math.round((img.height || 800) * sc));
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
          let out = "";
          try { out = cv.toDataURL("image/webp", 0.78); } catch (e) {}
          if (!out || !out.startsWith("data:image/webp")) out = cv.toDataURL("image/jpeg", 0.78);
          const rec = { id: "p_" + Date.now(), date: todayIso(), ts: Date.now(), kg: getActiveAthleteBodyweightKg(), dataUrl: out };
          openProgressDb().then(function (db) {
            const tx = db.transaction(PROGRESS_IDB_STORE, "readwrite");
            tx.objectStore(PROGRESS_IDB_STORE).put(rec);
            tx.oncomplete = function () {
              if (typeof window.showV351Toast === "function") window.showV351Toast("📸 Foto 100% privat auf deinem Gerät gespeichert!");
              openProgressPhotoStudioModal();
            };
          });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    };
    inp.click();
  }

  function deleteProgressPhoto(id) {
    openProgressDb().then(function (db) {
      const tx = db.transaction(PROGRESS_IDB_STORE, "readwrite");
      tx.objectStore(PROGRESS_IDB_STORE).delete(id);
      tx.oncomplete = function () { openProgressPhotoStudioModal(); };
    });
  }

  function openProgressPhotoStudioModal() {
    loadAllProgressPhotos().then(function (photos) {
      const modal = ensureV362SheetModal();
      const hasCompare = photos.length >= 2;
      const firstP = photos[0];
      const lastP = photos[photos.length - 1];

      const compareHtml = hasCompare ? `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:0.7rem;font-weight:800;color:var(--v34-muted,#94a3b8);margin-bottom:4px;">
            <span>◀ Vorher: ${escHtml(firstP.date)} (${firstP.kg} kg)</span>
            <span>Nachher: ${escHtml(lastP.date)} (${lastP.kg} kg) ▶</span>
          </div>
          <div style="position:relative;width:100%;height:260px;border-radius:16px;overflow:hidden;background:#0f172a;border:1px solid var(--v34-border,rgba(148,163,184,0.25));">
            <img src="${lastP.dataUrl}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>
            <div id="remk-v362-slider-clip" style="position:absolute;inset:0;width:50%;overflow:hidden;border-right:2px solid #ff5e00;">
              <img src="${firstP.dataUrl}" style="width:100%;height:100%;object-fit:cover;max-width:none;"/>
            </div>
          </div>
          <input type="range" min="5" max="95" value="50" oninput="const c=document.getElementById('remk-v362-slider-clip');if(c)c.style.width=this.value+'%';" style="width:100%;margin-top:8px;accent-color:#ff5e00;"/>
        </div>
      ` : `<div style="text-align:center;padding:18px 10px;border-radius:14px;background:var(--v34-card-soft,#181f2e);font-size:0.78rem;color:var(--v34-muted,#94a3b8);margin-bottom:12px;">🔒 Lade mindestens 2 Fotos hoch, um den interaktiven Vorher/Nachher-Schieberegler zu nutzen.<br><strong>Alle Fotos bleiben zu 100% lokal auf deinem Handy.</strong></div>`;

      const galleryHtml = photos.length ? `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px;">
          ${photos.map(function (p) {
            return `
              <div style="position:relative;border-radius:10px;overflow:hidden;aspect-ratio:3/4;background:#0f172a;border:1px solid var(--v34-border,rgba(148,163,184,0.22));">
                <img src="${p.dataUrl}" style="width:100%;height:100%;object-fit:cover;"/>
                <div style="position:absolute;left:0;right:0;bottom:0;padding:3px 5px;background:rgba(2,6,23,0.75);font-size:0.62rem;font-weight:800;color:#fff;">${escHtml(p.date)}</div>
                <button type="button" onclick="window.REMK_SCIENCE_BRAIN.deleteProgressPhoto('${p.id}')" style="position:absolute;top:4px;right:4px;border:none;border-radius:99px;width:22px;height:22px;background:rgba(239,68,68,0.85);color:#fff;font-size:0.65rem;cursor:pointer;">✕</button>
              </div>
            `;
          }).join("")}
        </div>
      ` : "";

      modal.innerHTML = `
        <div style="width:100%;max-width:470px;max-height:86vh;overflow-y:auto;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:16px;box-shadow:0 20px 50px rgba(0,0,0,0.45);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <div>
              <div style="font-size:0.68rem;font-weight:900;color:#10b981;text-transform:uppercase;">🔒 100% Lokal · Kein Cloud-Upload</div>
              <strong style="font-size:1.02rem;">📸 Vorher-Nachher Foto-Studio</strong>
            </div>
            <button type="button" onclick="document.getElementById('remk-v362-sheet').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
          </div>
          ${compareHtml}
          ${galleryHtml}
          <button type="button" onclick="window.REMK_SCIENCE_BRAIN.addProgressPhotoFromPicker()" style="width:100%;padding:12px;border-radius:14px;border:none;background:#ff5e00;color:#fff;font-size:0.85rem;font-weight:900;cursor:pointer;">📷 Neues Fortschritts-Foto hinzufügen</button>
        </div>
      `;
      modal.style.display = "flex";
    });
  }

  function ensureV362SheetModal() {
    let el = document.getElementById("remk-v362-sheet");
    if (!el) {
      el = document.createElement("div");
      el.id = "remk-v362-sheet";
      el.style.cssText = "position:fixed;inset:0;background:rgba(2,6,23,0.78);backdrop-filter:blur(6px);z-index:2000970;display:none;align-items:flex-end;justify-content:center;padding:12px;";
      el.addEventListener("click", function (ev) { if (ev.target === el) el.style.display = "none"; });
      document.body.appendChild(el);
    }
    return el;
  }

  function refreshAllUi() {
    try {
      if (document.body.classList.contains("remk-v34-in-workout") && typeof window.renderV345FitnessCleanPanel === "function") {
        window.renderV345FitnessCleanPanel(true);
      } else if (document.body.classList.contains("remk-v34-in-nutrition") && typeof window.renderV345NutritionCleanPanel === "function") {
        window.renderV345NutritionCleanPanel();
      } else if (typeof window.renderV345StartHub === "function") {
        window.renderV345StartHub();
      }
    } catch (e) {}
  }

  // Upgrade global calcEstimated1RM & calcWorkingWeightFrom1RM to support up to 25 reps!
  function installStrengthTransferHooks() {
    window.calcEstimated1RM = calc1RmUpTo25;
    window.calcWorkingWeightFrom1RM = calcWorkingWeightFrom1RmUpTo25;
  }

  window.REMK_SCIENCE_BRAIN = {
    version: "36.2",
    getBrainConfig: getBrainConfig,
    getLearnedRecoveryMultiplier: getLearnedRecoveryMultiplier,
    learnFromSessionFeedback: learnFromSessionFeedback,
    openScienceExplainSheet: openScienceExplainSheet,
    getActiveAthleteBodyweightKg: getActiveAthleteBodyweightKg,
    getBodyweightFactor: getBodyweightFactor,
    getEffectiveLoadKg: getEffectiveLoadKg,
    calc1RmUpTo25: calc1RmUpTo25,
    calcWorkingWeightFrom1RmUpTo25: calcWorkingWeightFrom1RmUpTo25,
    syncCleanSetToStrengthMemory: syncCleanSetToStrengthMemory,
    getProtectionMode: getProtectionMode,
    setProtectionMode: setProtectionMode,
    isNutritionCyclingEnabled: isNutritionCyclingEnabled,
    toggleNutritionCycling: toggleNutritionCycling,
    getDayTypeForDayNum: getDayTypeForDayNum,
    cycleDayTypeForDayNum: cycleDayTypeForDayNum,
    getDayTypeNutritionProfile: getDayTypeNutritionProfile,
    recordClubOrCourseSessionSrpe: recordClubOrCourseSessionSrpe,
    getJointProtectionFlags: getJointProtectionFlags,
    addJointProtectionFlag: addJointProtectionFlag,
    removeJointProtectionFlag: removeJointProtectionFlag,
    openAutoCooldownFlowModal: openAutoCooldownFlowModal,
    getTodayMorningReadiness: getTodayMorningReadiness,
    openMorningReadinessModal: openMorningReadinessModal,
    setMorningDraftVal: setMorningDraftVal,
    saveMorningReadiness: saveMorningReadiness,
    getUserRoleMode: getUserRoleMode,
    setUserRoleMode: setUserRoleMode,
    getActiveGymProfile: getActiveGymProfile,
    setActiveGymProfile: setActiveGymProfile,
    getGymStepIncrement: getGymStepIncrement,
    getBlockedIngredients: getBlockedIngredients,
    isRecipeBlockedByIngredients: isRecipeBlockedByIngredients,
    toggleBlockedIngredient: toggleBlockedIngredient,
    openBlockedIngredientsModal: openBlockedIngredientsModal,
    openBlsQuickFoodSearchModal: openBlsQuickFoodSearchModal,
    renderBlsResults: renderBlsResults,
    exportFullBackupJson: exportFullBackupJson,
    importFullBackupJson: importFullBackupJson,
    openProgressPhotoStudioModal: openProgressPhotoStudioModal,
    addProgressPhotoFromPicker: addProgressPhotoFromPicker,
    deleteProgressPhoto: deleteProgressPhoto
  };

  installStrengthTransferHooks();
  setTimeout(installStrengthTransferHooks, 300);
  setTimeout(syncRemoteBrainConfigSilent, 1200);
})();
