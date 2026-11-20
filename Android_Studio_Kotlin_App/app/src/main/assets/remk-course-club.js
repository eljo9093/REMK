/* ============================================================================
   RE:MK v36.2 – GRUPPEN- & KURSGENERATOR + VEREINS-ALGORITHMEN +
   IN-APP TECHNIK-LOOP-MODAL + TEMPO-METRONOM + AUTO-AUFWÄRMSÄTZE
   ============================================================================ */
(function initRemkCourseClubV362() {
  "use strict";
  if (window.REMK_COURSE_CLUB && window.REMK_COURSE_CLUB.version === "36.2") return;

  const CUSTOM_VIDEO_MAP_KEY = "remk_v362_custom_ex_videos_v1";

  function safeParse(raw, fb) {
    try { return JSON.parse(raw); } catch (e) { return fb; }
  }

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function playWebAudioBeep(freq, durMs, gainVal) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!window._remkV362AudioCtx) window._remkV362AudioCtx = new AC();
      const ctx = window._remkV362AudioCtx;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq || 740;
      g.gain.value = gainVal || 0.14;
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (durMs || 90) / 1000);
    } catch (e) {}
  }

  // =========================================================================
  // 1. AKUSTISCHES TEMPO-METRONOM (WEB-AUDIO-TAKTGEBER AM SATZ)
  // =========================================================================
  let _metroTimer = null;
  let _metroRunning = false;

  function parseTempoTuple(tempoStr) {
    const m = String(tempoStr || "3-1-1-0").match(/(\d+)\D+(\d+)\D+(\d+)(?:\D+(\d+))?/);
    if (!m) return [3, 1, 1, 0];
    return [
      Math.max(1, Math.min(6, parseInt(m[1], 10) || 3)),
      Math.max(0, Math.min(4, parseInt(m[2], 10) || 1)),
      Math.max(1, Math.min(4, parseInt(m[3], 10) || 1)),
      Math.max(0, Math.min(3, parseInt(m[4], 10) || 0))
    ];
  }

  function stopTempoMetronome() {
    if (_metroTimer) clearInterval(_metroTimer);
    _metroTimer = null;
    _metroRunning = false;
    const btn = document.getElementById("remk-v362-metro-btn");
    if (btn) btn.textContent = "🎵 Tempo";
  }

  function toggleTempoMetronome(tempoStr) {
    if (_metroRunning) {
      stopTempoMetronome();
      if (typeof window.showV351Toast === "function") window.showV351Toast("🔇 Tempo-Metronom gestoppt");
      return;
    }
    const tuple = parseTempoTuple(tempoStr);
    const seq = [];
    for (let i = 0; i < tuple[0]; i++) seq.push({ freq: 520, lbl: "Ab" });
    for (let i = 0; i < tuple[1]; i++) seq.push({ freq: 410, lbl: "Hold" });
    for (let i = 0; i < tuple[2]; i++) seq.push({ freq: 880, lbl: "Hoch!" });
    for (let i = 0; i < tuple[3]; i++) seq.push({ freq: 640, lbl: "Oben" });

    let stepIdx = 0;
    _metroRunning = true;
    const btn = document.getElementById("remk-v362-metro-btn");
    if (btn) btn.textContent = "⏹ Takt läuft";
    if (typeof window.showV351Toast === "function") window.showV351Toast(`🎵 Tempo-Takt ${tuple.join("-")} aktiv (Ab · Hold · Hoch)`);

    playWebAudioBeep(seq[0].freq, 80, 0.14);
    stepIdx = 1 % seq.length;
    _metroTimer = setInterval(function () {
      if (!_metroRunning) return;
      const item = seq[stepIdx];
      playWebAudioBeep(item.freq, item.freq > 800 ? 110 : 75, 0.14);
      stepIdx = (stepIdx + 1) % seq.length;
    }, 1000);
  }

  // =========================================================================
  // 2. IN-APP 2-PHASEN-TECHNIK- & VIDEO-MODAL (100% OFFLINE + EIGENER LINK)
  // =========================================================================
  function getTechniqueCuesForExercise(ex) {
    const n = String((ex && ex.name) || "").toLowerCase();
    const m = String((ex && ex.mech) || "").toLowerCase();
    if (/face pull|reverse fly|hintere schulter/.test(n)) {
      return {
        setup: "Kabel auf Gesichtshöhe, stabiler Stand, Schulterblätter entspannt tief.",
        exec: "Seil Richtung Stirn/Ohren ziehen, Ellbogen hoch und Daumen nach hinten drehen.",
        mistake: "Mit dem unteren Rücken nach hinten lehnen oder Schwung holen."
      };
    }
    if (m.includes("pull_horiz") || /rudern|\brows?\b|t-?bar/.test(n)) {
      return {
        setup: "Brust stolz, Rücken gerade, Griff sicher und Schultern weg von den Ohren.",
        exec: "Ellbogen eng am Körper nach hinten ziehen, 1 Sek. im Rücken halten, langsam strecken.",
        mistake: "Schultern hochziehen oder nur aus dem Bizeps reißen."
      };
    }
    if (m.includes("pull_vert") || /klimmzug|klimmzüg|pull-?up|chin-?up|latzug/.test(n)) {
      return {
        setup: "Schulterbreit bis leicht breiter greifen, Rumpf fest, Brust Richtung Stange.",
        exec: "Zuerst Schultern tief ziehen, dann Ellbogen kontrolliert Richtung Hüfte führen.",
        mistake: "Schwung aus den Beinen oder verkürzter Bewegungsweg oben/unten."
      };
    }
    if (m.includes("hinge") || /kreuzheben|deadlift|rdl|rumänisch|hip thrust/.test(n)) {
      return {
        setup: "Stange nah am Körper/Schienbein, Rumpf maximal unter Spannung, neutraler Rücken.",
        exec: "Hüfte wie ein Scharnier nach hinten schieben und explosiv über Gesäß & Beinrückseite strecken.",
        mistake: "Einrunden der Lendenwirbelsäule oder zu weit vom Körper weg heben."
      };
    }
    if (m.includes("leg_squat") || m.includes("leg_press") || m.includes("leg_uni") || /kniebeug|squat|beinpress|split|lunge/.test(n)) {
      return {
        setup: "Fester Dreipunkt-Stand (Ferse, Großzehe, Kleinzehe), Rumpf stabil, Blick geradeaus.",
        exec: "Knie kontrolliert in Richtung Zehenspitzen führen, sauber tief und kraftvoll hochdrücken.",
        mistake: "Knie fallen nach innen (Valgus) oder Fersen heben ab."
      };
    }
    if (m.includes("push_vert") || /schulterdrück|schulterpress|military|overhead/.test(n)) {
      return {
        setup: "Gesäß & Bauch fest anspannen, Unterarme stehen senkrecht unter dem Gewicht.",
        exec: "Gerade nach oben drücken bis über die Ohren, kontrolliert bis Kinnhöhe absenken.",
        mistake: "Ins starke Hohlkreuz fallen oder Ellbogen zu weit nach hinten drehen."
      };
    }
    if (m.includes("push_horiz") || /bankdrück|schrägbank|liegestütz|push-?up|\bdip|dips|fly|butterfly/.test(n)) {
      return {
        setup: "Schulterblätter fest zusammen und tief, Füße stabil am Boden, Handgelenke gerade.",
        exec: "Ellbogen im ca. 45°-Winkel kontrolliert absenken und kraftvoll wieder nach oben drücken.",
        mistake: "Ellbogen im 90°-Winkel abspreizen oder Gewicht auf der Brust abfedern."
      };
    }
    return {
      setup: "Stabile Ausgangsposition einnehmen, Rumpf aktivieren und Schultern sauber fixieren.",
      exec: "Kontrollierte Exzentrik (2–3 Sek.), sauberer Umkehrpunkt und konzentrierte Kontraktion.",
      mistake: "Schwung nutzen oder die letzten Zentimeter der Bewegung abschneiden."
    };
  }

  function getCustomVideoUrlForEx(exName) {
    const key = String(exName || "").replace(/\[[^\]]+\]/g, "").trim().toLowerCase();
    const map = safeParse(localStorage.getItem(CUSTOM_VIDEO_MAP_KEY) || "{}", {});
    return map[key] || "";
  }

  function saveCustomVideoUrlForEx(exName, url) {
    const key = String(exName || "").replace(/\[[^\]]+\]/g, "").trim().toLowerCase();
    const map = safeParse(localStorage.getItem(CUSTOM_VIDEO_MAP_KEY) || "{}", {});
    if (url && url.trim()) map[key] = url.trim();
    else delete map[key];
    localStorage.setItem(CUSTOM_VIDEO_MAP_KEY, JSON.stringify(map));
    if (typeof window.showV351Toast === "function") window.showV351Toast("🎬 Eigener Video-Link für Übung gespeichert!");
  }

  function openTechniqueAndVideoModal(ex) {
    if (!ex) return;
    const cues = getTechniqueCuesForExercise(ex);
    const customUrl = getCustomVideoUrlForEx(ex.name);
    const ytFallback = ex.videoUrl || ("https://www.youtube.com/results?search_query=" + encodeURIComponent(ex.name + " Technik Ausführung"));
    const finalUrl = customUrl || ytFallback;
    const poseHtml = (window.REMK_ANATOMY && typeof window.REMK_ANATOMY.renderExerciseThumb === "function")
      ? window.REMK_ANATOMY.renderExerciseThumb(ex, 118)
      : "";
    const det = (window.REMK_ANATOMY && typeof window.REMK_ANATOMY.detectExerciseMuscles === "function")
      ? window.REMK_ANATOMY.detectExerciseMuscles([ex])
      : { primary: [], secondary: [] };
    const safeName = escHtml(ex.name).replace(/'/g, "\\'");

    const modal = ensureClubSheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:480px;max-height:88vh;overflow-y:auto;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid var(--v34-border,rgba(148,163,184,0.24));border-radius:22px;padding:18px;box-shadow:0 24px 60px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:12px;">
          <div>
            <div style="font-size:0.68rem;font-weight:900;color:#ff5e00;text-transform:uppercase;">🎬 In-App Technik-Guide (100% Offline)</div>
            <strong style="font-size:1.02rem;line-height:1.25;">${escHtml(ex.name)}</strong>
          </div>
          <button type="button" onclick="document.getElementById('remk-v362-club-modal').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>

        <div style="display:flex;align-items:center;justify-content:center;gap:14px;padding:12px;border-radius:16px;background:var(--v34-card-soft,#181f2e);border:1px solid var(--v34-border,rgba(148,163,184,0.22));margin-bottom:12px;">
          <div style="animation:remkPrimaryContractV360 2.0s ease-in-out infinite;">${poseHtml}</div>
          <div style="flex:1;min-width:0;font-size:0.74rem;line-height:1.45;">
            <div style="font-weight:900;color:#10b981;margin-bottom:3px;">⚡ 2-Phasen Fokus-Loop</div>
            <div style="color:var(--v34-muted,#94a3b8);">Tempo: <strong>${escHtml(ex.tempo || '2-0-1-1')}</strong></div>
            <div style="color:var(--v34-muted,#94a3b8);">Hauptmuskel: <strong style="color:#f87171;">${escHtml((det.primary || []).join(", ") || "Zielmuskel")}</strong></div>
            <div style="color:var(--v34-muted,#94a3b8);">Hilfsmuskeln: <strong style="color:#60a5fa;">${escHtml((det.secondary || []).join(", ") || "Stabilisation")}</strong></div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr;gap:7px;margin-bottom:12px;font-size:0.78rem;line-height:1.42;">
          <div style="padding:9px 11px;border-radius:12px;background:rgba(16,185,129,0.10);border:1px solid rgba(16,185,129,0.34);">
            <strong style="color:#10b981;">1. Setup:</strong> ${escHtml(cues.setup)}
          </div>
          <div style="padding:9px 11px;border-radius:12px;background:rgba(56,189,248,0.10);border:1px solid rgba(56,189,248,0.34);">
            <strong style="color:#38bdf8;">2. Ausführung:</strong> ${escHtml(cues.exec)}
          </div>
          <div style="padding:9px 11px;border-radius:12px;background:rgba(239,68,68,0.10);border:1px solid rgba(239,68,68,0.34);">
            <strong style="color:#f87171;">3. Häufiger Fehler:</strong> ${escHtml(cues.mistake)}
          </div>
        </div>

        <div style="display:flex;gap:6px;margin-bottom:10px;">
          <input type="url" id="remk-v362-custom-vid-inp" value="${escHtml(customUrl)}" placeholder="Eigener Video-/YouTube-Link für diese Übung..." style="flex:1;padding:8px 10px;border-radius:10px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.76rem;"/>
          <button type="button" onclick="window.REMK_COURSE_CLUB.saveCustomVideoUrlForEx('${safeName}', document.getElementById('remk-v362-custom-vid-inp')?.value||'')" style="border:none;background:#10b981;color:#fff;border-radius:10px;padding:8px 11px;font-size:0.74rem;font-weight:900;cursor:pointer;">💾</button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button type="button" onclick="window.REMK_COURSE_CLUB.toggleTempoMetronome('${escHtml(ex.tempo || '3-1-1-0')}')" style="padding:10px;border-radius:12px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.78rem;font-weight:800;cursor:pointer;">🎵 Tempo-Takt</button>
          <button type="button" onclick="window.open('${escHtml(finalUrl)}', '_blank')" style="padding:10px;border-radius:12px;border:none;background:#ff5e00;color:#fff;font-size:0.78rem;font-weight:900;cursor:pointer;">▶️ Externes Video</button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
  }

  // =========================================================================
  // 3. GRUPPEN- & KURSGENERATOR + ALLE 6 VEREINS-ALGORITHMEN
  // =========================================================================
  const COURSE_FORMATS = {
    ruecken_fit: {
      title: "🛡️ Rücken-Fit & Prävention",
      defaultWR: [40, 20],
      focusZones: ["upper_back", "lower_back", "abs", "glutes"],
      stations: [
        { slot: "leg",  name: "Glute Bridge / Hüftstreckung", equip: "matte", easy: "Beidbeinig langsam", std: "2s Halten oben", pro: "Einbeinig im Wechsel" },
        { slot: "push", name: "Wand-Engel / Schulter-Öffner", equip: "none",  easy: "Im Stehen locker", std: "Rücken flach an Wand", pro: "Mit Miniband-Zug" },
        { slot: "core", name: "Bird-Dog (Diagonal-Stütz)",    equip: "matte", easy: "Nur Arme heben", std: "Arm + Bein strecken", pro: "Mit Knie 2 cm über Matte" },
        { slot: "pull", name: "Band Pull-Aparts / Rudern",    equip: "band",  easy: "Leichtes Band", std: "Mittleres Band, 2s Stopp", pro: "Starkes Band / KH-Rudern" },
        { slot: "core", name: "Dead Bug (Anti-Extension)",    equip: "matte", easy: "Fersen tippen", std: "Bein gestreckt tief", pro: "Mit Gegendruck-Ball" },
        { slot: "leg",  name: "Kniebeuge an Bank (Rückenlang)",equip: "none",  easy: "Mit Stuhl/Bank-Kontakt", std: "Frei 3s tief", pro: "Mit Kurzhantel (Goblet)" }
      ]
    },
    functional_zirkel: {
      title: "🔥 Functional Zirkel / Bootcamp",
      defaultWR: [45, 20],
      focusZones: ["quads", "chest", "upper_back", "abs", "glutes"],
      stations: [
        { slot: "leg",  name: "Goblet Squats / Kniebeugen",    equip: "kh",    easy: "Ohne Gewicht", std: "Kurzhantel vor Brust", pro: "Kettlebell + 2s Pause" },
        { slot: "push", name: "Liegestütze (Push-Ups)",        equip: "matte", easy: "Erhöht an Bank", std: "Klassisch sauber", pro: "Tempo 3-1-1 / Hand-Release" },
        { slot: "core", name: "Plank mit Shoulder-Taps",       equip: "matte", easy: "Auf den Knien", std: "Hoher Stütz stabil", pro: "Body-Saw Plank" },
        { slot: "pull", name: "Kurzhantel- oder Band-Rudern",  equip: "kh",    easy: "Leichtes Band", std: "Vorgebeugt beidarmig", pro: "Renegade Rows" },
        { slot: "cardio",name: "Kettlebell Swings / Skater",   equip: "kb",    easy: "Step-Skater ohne Sprung", std: "2-Hand KB Swings", pro: "Explosive Swings / Burpees" },
        { slot: "leg",  name: "Ausfallschritte rückwärts",     equip: "none",  easy: "Kurzer Schritt", std: "Kontrolliert tief", pro: "Mit KH über Kopf / Sprung" }
      ]
    },
    hiit_tabata: {
      title: "⚡ HIIT & Tabata Express",
      defaultWR: [30, 15],
      focusZones: ["quads", "glutes", "abs", "chest"],
      stations: [
        { slot: "leg",    name: "Squat-Pulses / Jump Squats",   equip: "none",  easy: "Zügige Air Squats", std: "Tiefe Squats + Fersenheben", pro: "Explosive Jump Squats" },
        { slot: "push",   name: "Mountain Climbers / Push-Ups", equip: "matte", easy: "Hände auf Bank", std: "Zügig im hohen Stütz", pro: "Cross-Body Sprint Climbers" },
        { slot: "core",   name: "Hollow-Hold / Flutter Kicks",  equip: "matte", easy: "Knie angewinkelt", std: "Beine 45° gestreckt", pro: "Tiefes Hollow-Rocking" },
        { slot: "pull",   name: "Band-Rudern High-Speed",       equip: "band",  easy: "Ruhiges Tempo", std: "Schneller Zug, kontrolliert", pro: "Doppelband-Powerzug" },
        { slot: "cardio", name: "Shadow-Boxing / High Knees",   equip: "none",  easy: "Schnelles Marschieren", std: "Knie hoch + Armeinsatz", pro: "All-Out Sprint-Intervall" },
        { slot: "leg",    name: "Skater-Sprünge (Lateral)",     equip: "none",  easy: "Großer Seit-Schritt", std: "Dynamischer Skater", pro: "Mit Boden-Touch tief" }
      ]
    },
    kraftausdauer: {
      title: "💪 Kraftausdauer Ganzkörper",
      defaultWR: [45, 25],
      focusZones: ["quads", "chest", "lats", "shoulders_front", "abs"],
      stations: [
        { slot: "leg",  name: "Rumänisches Kreuzheben (KH/KB)", equip: "kh",    easy: "Hüftbeuge ohne Gewicht", std: "2 Kurzhanteln", pro: "Einbeiniges RDL" },
        { slot: "push", name: "Schulterdrücken stehend",        equip: "kh",    easy: "Leichte KH / Band", std: "Kurzhanteln sauber", pro: "Arnold Press" },
        { slot: "core", name: "Side-Plank (Seitstütz)",         equip: "matte", easy: "Unteres Knie gebeugt", std: "Beine gestreckt", pro: "Mit Hüft-Dip" },
        { slot: "pull", name: "Vorgebeugtes Rudern",            equip: "kh",    easy: "Miniband", std: "Kurzhanteln eng", pro: "1,5-Reps Rudern" },
        { slot: "leg",  name: "Step-Ups an Bank / Kasten",      equip: "bank",  easy: "Niedrige Stufe", std: "Bank zügig im Wechsel", pro: "Mit 2 Kurzhanteln" },
        { slot: "push", name: "Bank-Dips / Trizeps-Stütz",      equip: "bank",  easy: "Füße nah herangezogen", std: "Beine gestreckt", pro: "Ein Bein angehoben" }
      ]
    },
    hyrox_prep: {
      title: "🏆 HYROX & Hybrid Conditioning",
      defaultWR: [50, 20],
      focusZones: ["quads", "hamstrings", "glutes", "shoulders_front", "abs"],
      stations: [
        { slot: "cardio",name: "Hallensprint / Shuttle-Run",     equip: "none",  easy: "Zügiger Dauerlauf", std: "20m Wendeläufe", pro: "Hohe Pace + Antritt" },
        { slot: "leg",   name: "Wall Balls / Thrusters (KH)",    equip: "medball",easy: "Leichter Ball", std: "Medizinball / KH-Thruster", pro: "Hohe Frequenz tief" },
        { slot: "pull",  name: "Sled-Pull Sim (Band-Zug)",       equip: "band",  easy: "Rückwärtsgehen locker", std: "Hand-über-Hand Zug", pro: "Tiefes Power-Rückwärts" },
        { slot: "leg",   name: "Sandbag / KH Walking Lunges",    equip: "kh",    easy: "Ohne Gewicht", std: "2 Kurzhanteln seitlich", pro: "Gewicht auf Schulter" },
        { slot: "core",  name: "Burpee Broad Jumps (Mod.)",      equip: "matte", easy: "Step-Back + großer Schritt", std: "Sprawl + Standweitsprung", pro: "Voller Burpee Broad Jump" },
        { slot: "pull",  name: "Heavy Farmer's Carry",           equip: "kb",    easy: "Leichte Gewichte", std: "2 schwere KB/KH zügig", pro: "Max-Last + aufrechter Rumpf" }
      ]
    },
    senioren_fit: {
      title: "🌿 Senioren-Fit & Sturzprophylaxe",
      defaultWR: [35, 25],
      focusZones: ["quads", "glutes", "upper_back", "calves"],
      stations: [
        { slot: "leg",  name: "Sit-to-Stand (Bank-Aufstehen)",  equip: "bank",  easy: "Mit Arm-Unterstützung", std: "Ohne Hände aufstehen", pro: "3s langsam hinsetzen" },
        { slot: "pull", name: "Rudern im Stand (Band)",         equip: "band",  easy: "Sehr leichtes Band", std: "Schulterblätter fest ziehen", pro: "2s Endspannung halten" },
        { slot: "core", name: "Einbeinstand & Balance-Übung",   equip: "none",  easy: "Hand nah an Wand/Bank", std: "Frei 20s je Bein", pro: "Mit Kopf-Drehung links/rechts" },
        { slot: "push", name: "Wand-Liegestütze",               equip: "none",  easy: "Nah an der Wand", std: "Weiter Abstand zur Wand", pro: "An stabiler Bank" },
        { slot: "leg",  name: "Fersen- & Zehenheben (Waden)",   equip: "none",  easy: "An Wand festhalten", std: "Frei im Wechsel", pro: "Langsam 2s oben halten" },
        { slot: "core", name: "Aufrichtung & BWS-Rotation",     equip: "bank",  easy: "Im Sitzen locker", std: "Im Stand kontrolliert", pro: "Mit leichtem Band" }
      ]
    },
    mobility_flow: {
      title: "🧘 Athletic Mobility & Recovery Flow",
      defaultWR: [45, 15],
      focusZones: ["upper_back", "glutes", "hamstrings", "lower_back"],
      stations: [
        { slot: "leg",  name: "World's Greatest Stretch",       equip: "matte", easy: "Knie abgesetzt", std: "Hinterbein gestreckt", pro: "Mit tiefer Ellbogen-Rotation" },
        { slot: "core", name: "Cat-Cow & Segmentale BWS",       equip: "matte", easy: "Sanftes Tempo", std: "Tiefe Atmung synchron", pro: "Mit Scapula-Push-Ups" },
        { slot: "leg",  name: "90/90 Hüft-Wechsel",             equip: "matte", easy: "Hände hinten abgestützt", std: "Ohne Hände wechseln", pro: "Mit Hüft-Abheben oben" },
        { slot: "pull", name: "Band Dislocates & Schulterkreisen",equip: "band", easy: "Sehr weiter Griff", std: "Schulterbreit fließend", pro: "Mit Außenrotations-Hold" },
        { slot: "leg",  name: "Tiefe Hocke + Knie-Shift",       equip: "none",  easy: "Fersen erhöht", std: "Volle tiefe Hocke", pro: "Mit Überkopf-Armheben" },
        { slot: "core", name: "Atem-Reset (4-4-6 Box-Atmung)",  equip: "matte", easy: "Rückenlage entspannt", std: "Beine im 90°-Winkel", pro: "Volle 360°-Zwerchfellatmung" }
      ]
    }
  };

  const SPORT_PREVENTION_MATRIX = {
    fussball:   ["🛡️ FIFA 11+ Nordic Hamstring (Exzentrik)", "🛡️ Copenhagen Adductor Plank (Leistenschutz)", "🛡️ Einbeinige Landestabilisation (VKB-Schutz)"],
    handball:   ["🛡️ Außenrotatoren-Kräftigung (Wurfschulter)", "🛡️ Einbein-Sprung & Landekontrolle (Knie)", "🛡️ Anti-Rotations-Core (Wurfkraft)"],
    tennis:     ["🛡️ Rotatorenmanschette & BWS-Rotation", "🛡️ Lateral-Stopp & Sprunggelenks-Stabi", "🛡️ Unterarm-Exzentrik (Tennisarm-Schutz)"],
    schwimmen:  ["🛡️ Scapula Push-Ups & Y-T-W (Schwimmerschulter)", "🛡️ Streamline-BWS-Öffner", "🛡️ Hollow-Body Rumpfspannung"],
    laufen:     ["🛡️ Waden- & Soleus-Kraft (Achillessehne)", "🛡️ Einbeinige Hüftstabilität (Läuferknie)", "🛡️ Tibialis Raises (Schienbeinschutz)"],
    allgemein:  ["🛡️ Rumpf-Anti-Rotation (Wirbelsäulenschutz)", "🛡️ Schulterblatt-Kontrolle (Haltung)", "🛡️ Einbein-Balance (Gelenkschutz)"]
  };

  let _courseCfg = {
    format: "functional_zirkel",
    durationMin: 60,
    ageGroup: "aktive",
    matchday: "MD-3",
    sportPrev: "fussball",
    participants: 16,
    equip: ["matte", "band", "kh"]
  };
  let _generatedCourse = null;
  let _courseTimerId = null;
  let _courseTimerState = null;

  function buildCoursePlan(cfg) {
    const fmt = COURSE_FORMATS[cfg.format] || COURSE_FORMATS.functional_zirkel;
    const dur = parseInt(cfg.durationMin, 10) || 60;
    const brain = (window.REMK_SCIENCE_BRAIN && window.REMK_SCIENCE_BRAIN.getBrainConfig()) || {};
    const mdInfo = (brain.matchdayPeriodization && brain.matchdayPeriodization[cfg.matchday]) || {
      label: "Standard-Belastung", volMult: 1.0, intMult: 1.0, focus: "Ausgewogene Belastung"
    };

    // Alters- & Gelenkschutz-Anpassung
    const isProtected = (cfg.ageGroup === "u10_u14" || cfg.ageGroup === "ah_senioren");
    let workSec = fmt.defaultWR[0];
    let restSec = fmt.defaultWR[1];
    if (isProtected) {
      workSec = Math.min(35, workSec);
      restSec = Math.max(25, restSec);
    }
    if (cfg.matchday === "MD-1" || cfg.matchday === "MD+1") {
      workSec = Math.round(workSec * 0.75);
      restSec = Math.max(25, restSec + 5);
    }

    // Interferenz-freie Stations-Sortierung (leg -> push -> core -> pull -> cardio)
    const slotOrder = ["leg", "push", "core", "pull", "cardio"];
    const pool = fmt.stations.slice();
    const sorted = [];
    let safety = 0;
    while (pool.length && safety < 30) {
      safety++;
      slotOrder.forEach(function (sl) {
        const idx = pool.findIndex(function (s) { return s.slot === sl; });
        if (idx >= 0) sorted.push(pool.splice(idx, 1)[0]);
      });
    }
    sorted.push.apply(sorted, pool);

    // Exakte Minuten-Timeline berechnen
    const warmupMin = dur <= 30 ? 5 : (dur <= 45 ? 8 : 10);
    const cooldownMin = dur <= 30 ? 5 : (dur <= 45 ? 7 : 8);
    const finisherMin = (dur >= 60 && !isProtected && cfg.matchday !== "MD-1" && cfg.matchday !== "MD+1") ? 5 : 0;
    const mainMin = Math.max(12, dur - warmupMin - cooldownMin - finisherMin);
    const cycleSec = (workSec + restSec) * sorted.length + 90; // inkl. 90s Rundenpause
    const rounds = Math.max(2, Math.min(5, Math.floor((mainMin * 60) / Math.max(120, cycleSec))));

    const prevList = SPORT_PREVENTION_MATRIX[cfg.sportPrev] || SPORT_PREVENTION_MATRIX.allgemein;

    return {
      title: fmt.title,
      durationMin: dur,
      ageGroup: cfg.ageGroup,
      matchday: cfg.matchday,
      mdInfo: mdInfo,
      participants: cfg.participants,
      warmupMin: warmupMin,
      mainMin: mainMin,
      finisherMin: finisherMin,
      cooldownMin: cooldownMin,
      workSec: workSec,
      restSec: restSec,
      rounds: rounds,
      stations: sorted,
      prevention: prevList,
      focusZones: fmt.focusZones,
      protectedNote: isProtected
        ? "🛡️ Alters-/Gelenkschutz aktiv: High-Impact-Sprünge automatisch durch gelenkschonende Varianten ersetzt."
        : "🔥 Volle Belastbarkeit: 3-Stufen-Skalierung (Leicht / Standard / Profi) je Station bereit."
    };
  }

  function ensureClubSheetModal() {
    let el = document.getElementById("remk-v362-club-modal");
    if (!el) {
      el = document.createElement("div");
      el.id = "remk-v362-club-modal";
      el.style.cssText = "position:fixed;inset:0;background:rgba(2,6,23,0.82);backdrop-filter:blur(6px);z-index:2000975;display:none;align-items:flex-end;justify-content:center;padding:10px;";
      el.addEventListener("click", function (ev) { if (ev.target === el) el.style.display = "none"; });
      document.body.appendChild(el);
    }
    return el;
  }

  function openCourseGeneratorModal() {
    if (typeof window.requireRemkPro === "function" && !window.requireRemkPro("🔥 Vereins- & Gruppen-Kursgenerator")) return;
    _generatedCourse = buildCoursePlan(_courseCfg);
    renderCourseModal();
  }

  function updateCourseCfg(field, value) {
    _courseCfg[field] = value;
    _generatedCourse = buildCoursePlan(_courseCfg);
    renderCourseModal();
  }

  function startCourseLiveTimer() {
    if (!_generatedCourse) return;
    stopCourseLiveTimer();
    _courseTimerState = {
      round: 1,
      stationIdx: 0,
      phase: "work", // work | rest
      secLeft: _generatedCourse.workSec
    };
    playWebAudioBeep(880, 140, 0.18);
    renderCourseModal();
    _courseTimerId = setInterval(function () {
      if (!_courseTimerState || !_generatedCourse) return;
      _courseTimerState.secLeft--;
      if (_courseTimerState.secLeft <= 3 && _courseTimerState.secLeft > 0) playWebAudioBeep(560, 70, 0.12);
      if (_courseTimerState.secLeft <= 0) {
        if (_courseTimerState.phase === "work") {
          _courseTimerState.phase = "rest";
          _courseTimerState.secLeft = _generatedCourse.restSec;
          playWebAudioBeep(440, 220, 0.18);
        } else {
          _courseTimerState.stationIdx++;
          if (_courseTimerState.stationIdx >= _generatedCourse.stations.length) {
            _courseTimerState.stationIdx = 0;
            _courseTimerState.round++;
            if (_courseTimerState.round > _generatedCourse.rounds) {
              stopCourseLiveTimer();
              playWebAudioBeep(980, 350, 0.22);
              if (typeof window.showV351Toast === "function") window.showV351Toast("🏆 Alle Kurs-Runden geschafft!");
              renderCourseModal();
              return;
            }
          }
          _courseTimerState.phase = "work";
          _courseTimerState.secLeft = _generatedCourse.workSec;
          playWebAudioBeep(880, 180, 0.2);
        }
      }
      renderCourseTimerBannerOnly();
    }, 1000);
  }

  function stopCourseLiveTimer() {
    if (_courseTimerId) clearInterval(_courseTimerId);
    _courseTimerId = null;
    _courseTimerState = null;
    renderCourseTimerBannerOnly();
  }

  function renderCourseTimerBannerOnly() {
    const el = document.getElementById("remk-v362-course-timer-banner");
    if (!el || !_generatedCourse) return;
    if (!_courseTimerState) {
      el.innerHTML = `<button type="button" onclick="window.REMK_COURSE_CLUB.startCourseLiveTimer()" style="width:100%;padding:11px;border-radius:13px;border:none;background:#10b981;color:#fff;font-size:0.84rem;font-weight:900;cursor:pointer;">⏱️ Live-Stations-Timer starten (${_generatedCourse.workSec}s / ${_generatedCourse.restSec}s)</button>`;
      return;
    }
    const st = _courseTimerState;
    const curSt = _generatedCourse.stations[st.stationIdx];
    const isWork = st.phase === "work";
    el.innerHTML = `
      <div style="padding:12px;border-radius:14px;background:${isWork ? 'rgba(16,185,129,0.18)' : 'rgba(245,158,11,0.18)'};border:1.5px solid ${isWork ? '#10b981' : '#f59e0b'};display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div>
          <div style="font-size:0.7rem;font-weight:900;color:${isWork ? '#10b981' : '#f59e0b'};">RUNDE ${st.round}/${_generatedCourse.rounds} &bull; ${isWork ? '🔥 BELASTUNG' : '🔄 WECHSEL / PAUSE'}</div>
          <div style="font-size:0.86rem;font-weight:900;">Station ${st.stationIdx + 1}: ${escHtml(curSt ? curSt.name : '')}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.5rem;font-weight:900;font-variant-numeric:tabular-nums;">${st.secLeft}s</span>
          <button type="button" onclick="window.REMK_COURSE_CLUB.stopCourseLiveTimer()" style="border:none;background:#ef4444;color:#fff;border-radius:9px;padding:6px 10px;font-size:0.74rem;font-weight:900;cursor:pointer;">⏹</button>
        </div>
      </div>
    `;
  }

  function logGeneratedCourseSrpe() {
    if (!_generatedCourse || !window.REMK_SCIENCE_BRAIN) return;
    const rpe = _courseCfg.ageGroup === "ah_senioren" ? 6 : (_courseCfg.format === "hiit_tabata" ? 8 : 7);
    window.REMK_SCIENCE_BRAIN.recordClubOrCourseSessionSrpe(
      _generatedCourse.title,
      _generatedCourse.durationMin,
      rpe,
      _generatedCourse.focusZones
    );
  }

  function printGeneratedCourseSheet() {
    if (!_generatedCourse) return;
    const c = _generatedCourse;
    const w = window.open("", "_blank");
    if (!w) { window.print(); return; }
    w.document.write(`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${escHtml(c.title)}</title><style>body{font-family:system-ui,sans-serif;padding:24px;color:#0f172a;}h1{margin:0 0 6px 0;}table{width:100%;border-collapse:collapse;margin-top:14px;}th,td{border:1px solid #cbd5e1;padding:8px;text-align:left;font-size:13px;}th{background:#f1f5f9;}</style></head><body>
      <h1>${escHtml(c.title)} (${c.durationMin} Min.)</h1>
      <p><strong>Periodisierung:</strong> ${escHtml(c.mdInfo.label)} &bull; <strong>Intervall:</strong> ${c.workSec}s Arbeit / ${c.restSec}s Wechsel &bull; <strong>${c.rounds} Runden</strong></p>
      <p><strong>Timeline:</strong> Warm-Up ${c.warmupMin} Min. → Hauptteil ${c.mainMin} Min. ${c.finisherMin ? '→ Finisher ' + c.finisherMin + ' Min. ' : ''}→ Cool-Down ${c.cooldownMin} Min.</p>
      <table><thead><tr><th>#</th><th>Station</th><th>🌱 Leicht</th><th>⚡ Standard</th><th>🔥 Profi</th></tr></thead><tbody>
      ${c.stations.map(function (s, i) { return `<tr><td>${i+1}</td><td><strong>${escHtml(s.name)}</strong></td><td>${escHtml(s.easy)}</td><td>${escHtml(s.std)}</td><td>${escHtml(s.pro)}</td></tr>`; }).join("")}
      </tbody></table>
      <p style="margin-top:14px;"><strong>Präventions-Bausteine:</strong> ${escHtml(c.prevention.join(" • "))}</p>
      <script>window.print();<\/script></body></html>`);
    w.document.close();
  }

  function renderCourseModal() {
    const c = _generatedCourse || buildCoursePlan(_courseCfg);
    const modal = ensureClubSheetModal();
    modal.innerHTML = `
      <div style="width:100%;max-width:540px;max-height:90vh;overflow-y:auto;background:var(--v34-card,#121722);color:var(--v34-text,#f8fafc);border:1px solid rgba(16,185,129,0.45);border-radius:22px;padding:16px;box-shadow:0 24px 60px rgba(0,0,0,0.55);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <div>
            <div style="font-size:0.68rem;font-weight:900;color:#10b981;text-transform:uppercase;">TSV / Trainer-Pro &bull; 6 Vereins-Algorithmen</div>
            <strong style="font-size:1.06rem;">🔥 Gruppen- &amp; Kursgenerator</strong>
          </div>
          <button type="button" onclick="window.REMK_COURSE_CLUB.stopCourseLiveTimer();document.getElementById('remk-v362-club-modal').style.display='none'" style="border:none;background:var(--v34-card-soft,#1b2232);color:var(--v34-text,#f8fafc);border-radius:10px;padding:6px 11px;font-weight:900;cursor:pointer;">✕</button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:10px;">
          <select onchange="window.REMK_COURSE_CLUB.updateCourseCfg('format', this.value)" style="padding:8px;border-radius:10px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.76rem;font-weight:800;">
            ${Object.keys(COURSE_FORMATS).map(function (k) { return `<option value="${k}" ${_courseCfg.format === k ? 'selected' : ''}>${COURSE_FORMATS[k].title}</option>`; }).join("")}
          </select>
          <select onchange="window.REMK_COURSE_CLUB.updateCourseCfg('durationMin', parseInt(this.value,10))" style="padding:8px;border-radius:10px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.76rem;font-weight:800;">
            ${[30, 45, 60, 75].map(function (m) { return `<option value="${m}" ${_courseCfg.durationMin === m ? 'selected' : ''}>⏱️ ${m} Minuten</option>`; }).join("")}
          </select>
          <select onchange="window.REMK_COURSE_CLUB.updateCourseCfg('ageGroup', this.value)" style="padding:8px;border-radius:10px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.76rem;font-weight:800;">
            <option value="aktive" ${_courseCfg.ageGroup === 'aktive' ? 'selected' : ''}>🔥 Aktive / Erwachsene</option>
            <option value="u15_u19" ${_courseCfg.ageGroup === 'u15_u19' ? 'selected' : ''}>⚡ Jugend U15–U19</option>
            <option value="u10_u14" ${_courseCfg.ageGroup === 'u10_u14' ? 'selected' : ''}>🧒 Kinder U10–U14</option>
            <option value="ah_senioren" ${_courseCfg.ageGroup === 'ah_senioren' ? 'selected' : ''}>🛡️ Ü35 / Senioren / Reha</option>
          </select>
          <select onchange="window.REMK_COURSE_CLUB.updateCourseCfg('matchday', this.value)" style="padding:8px;border-radius:10px;border:1px solid var(--v34-border,rgba(148,163,184,0.25));background:var(--v34-card-soft,#181f2e);color:var(--v34-text,#f8fafc);font-size:0.76rem;font-weight:800;">
            ${["MD-4", "MD-3", "MD-2", "MD-1", "MD", "MD+1", "MD+2"].map(function (md) { return `<option value="${md}" ${_courseCfg.matchday === md ? 'selected' : ''}>📅 ${md}</option>`; }).join("")}
          </select>
        </div>

        <div style="padding:10px 12px;border-radius:14px;background:rgba(16,185,129,0.10);border:1px solid rgba(16,185,129,0.34);margin-bottom:10px;font-size:0.74rem;line-height:1.45;">
          <div><strong>📅 ${escHtml(c.mdInfo.label)}</strong> &bull; ${escHtml(c.mdInfo.focus)}</div>
          <div>⏱️ <strong>Timeline (${c.durationMin} Min.):</strong> Warm-Up ${c.warmupMin}' → Zirkel ${c.mainMin}' (${c.rounds}× ${c.workSec}s/${c.restSec}s) ${c.finisherMin ? '→ Finisher ' + c.finisherMin + "' " : ''}→ Cool-Down ${c.cooldownMin}'</div>
          <div style="color:var(--v34-muted,#94a3b8);margin-top:2px;">${escHtml(c.protectedNote)}</div>
        </div>

        <div id="remk-v362-course-timer-banner" style="margin-bottom:10px;"></div>

        <div style="font-size:0.72rem;font-weight:900;color:var(--v34-muted,#94a3b8);margin-bottom:6px;">🔄 INTERFERENZ-FREIE STATIONEN (3-STUFEN-SKALIERUNG)</div>
        ${c.stations.map(function (s, i) {
          return `
            <div style="padding:9px 11px;border-radius:13px;background:var(--v34-card-soft,#181f2e);border:1px solid var(--v34-border,rgba(148,163,184,0.2));margin-bottom:6px;">
              <div style="font-size:0.82rem;font-weight:900;margin-bottom:3px;">Station ${i + 1}: ${escHtml(s.name)}</div>
              <div style="font-size:0.7rem;color:var(--v34-muted,#94a3b8);line-height:1.4;">
                🌱 <strong>Leicht:</strong> ${escHtml(s.easy)} &nbsp;|&nbsp; ⚡ <strong>Std:</strong> ${escHtml(s.std)} &nbsp;|&nbsp; 🔥 <strong>Profi:</strong> ${escHtml(s.pro)}
              </div>
            </div>
          `;
        }).join("")}

        <div style="padding:9px 11px;border-radius:13px;background:rgba(56,189,248,0.10);border:1px solid rgba(56,189,248,0.34);margin:8px 0 10px 0;font-size:0.72rem;line-height:1.45;">
          <strong style="color:#38bdf8;">🩺 Präventions-Matrix (FIFA 11+ / Gelenkschutz):</strong><br>
          ${c.prevention.map(function (p) { return escHtml(p); }).join("<br>")}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button type="button" onclick="window.REMK_COURSE_CLUB.logGeneratedCourseSrpe()" style="padding:10px;border-radius:12px;border:1px solid rgba(16,185,129,0.45);background:rgba(16,185,129,0.16);color:#34d399;font-size:0.76rem;font-weight:900;cursor:pointer;">✅ Als sRPE in ACWR loggen</button>
          <button type="button" onclick="window.REMK_COURSE_CLUB.printGeneratedCourseSheet()" style="padding:10px;border-radius:12px;border:none;background:#ff5e00;color:#fff;font-size:0.76rem;font-weight:900;cursor:pointer;">🖨️ Stations-Plan drucken</button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
    renderCourseTimerBannerOnly();
  }

  // Inject Kursgenerator-Switch directly at the top of #step-athletik!
  function injectCourseTabIntoStepAthletik() {
    try {
      const step = document.getElementById("step-athletik");
      if (!step || document.getElementById("remk-v362-course-switch-bar")) return;
      const hdr = step.querySelector("h2.step-header");
      if (!hdr) return;
      const bar = document.createElement("div");
      bar.id = "remk-v362-course-switch-bar";
      bar.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;";
      bar.innerHTML = `
        <button type="button" style="padding:10px;border-radius:12px;border:1.5px solid #10b981;background:rgba(16,185,129,0.18);color:#34d399;font-weight:900;font-size:0.82rem;cursor:pointer;">⚽ Mannschafts-Athletik</button>
        <button type="button" onclick="window.REMK_COURSE_CLUB.openCourseGeneratorModal()" style="padding:10px;border-radius:12px;border:1.5px solid #ff5e00;background:rgba(255,94,0,0.16);color:#ff5e00;font-weight:900;font-size:0.82rem;cursor:pointer;">🔥 Gruppen- &amp; Kursgenerator</button>
      `;
      hdr.insertAdjacentElement("afterend", bar);
    } catch (e) {}
  }

  window.REMK_COURSE_CLUB = {
    version: "36.2",
    toggleTempoMetronome: toggleTempoMetronome,
    stopTempoMetronome: stopTempoMetronome,
    openTechniqueAndVideoModal: openTechniqueAndVideoModal,
    saveCustomVideoUrlForEx: saveCustomVideoUrlForEx,
    openCourseGeneratorModal: openCourseGeneratorModal,
    updateCourseCfg: updateCourseCfg,
    startCourseLiveTimer: startCourseLiveTimer,
    stopCourseLiveTimer: stopCourseLiveTimer,
    logGeneratedCourseSrpe: logGeneratedCourseSrpe,
    printGeneratedCourseSheet: printGeneratedCourseSheet,
    injectCourseTabIntoStepAthletik: injectCourseTabIntoStepAthletik
  };

  setTimeout(injectCourseTabIntoStepAthletik, 350);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectCourseTabIntoStepAthletik);
})();
