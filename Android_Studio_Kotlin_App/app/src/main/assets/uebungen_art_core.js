// ============================================================================
// RE:MK ÜBUNGS-DATENBANK - ÜBUNGSART: CORE (RUMPFSTABILITÄT, ROTATION & REHA)
// Dateiname für zukünftige Übungen dieser Art: uebungen_art_core.js
// ============================================================================
if (typeof exerciseDB === 'undefined') { window.exerciseDB = []; }

const uebungen_art_core = [
  // --- ANTI-EXTENSION & ISOMETRISCHE STABILITÄT (core_iso) ---
  { id: "ex_ac_ci1", name: "Body-Saw Plank / Plank mit Vor- & Rückschub", mechanic: "core_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Body Saw Plank" },
  { id: "ex_ac_ci2", name: "Plank Pull-Through (Unterarmstütz mit Gewicht-Durchzug)", mechanic: "core_iso", equip: ["gym", "homegym"], goal: ["athletik", "muskelaufbau"], link: "Plank Pull Through" },
  { id: "ex_ac_ci3", name: "Bear Crawl Hold & Shoulder Taps (Bärenstütz-Stabilisation)", mechanic: "core_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "muskelaufbau"], link: "Bear Plank Shoulder Taps" },
  { id: "ex_ac_ci4", name: "Hollow-Body Hold (Turn-Rumpfspannung für maximale Kraftübertragung)", mechanic: "core_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["kraft", "athletik"], link: "Hollow Body Hold" },
  { id: "ex_t4_ac_ci5", name: "360°-Zwerchfell-Atmung & Transversus-Aktivierung im Vierfüßlerstand (Postpartum)", mechanic: "core_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Postpartum Core Breathing" },

  // --- FLEXION & ANTERIORE BAUCHKETTE (core_flex) ---
  { id: "ex_ac_cf1", name: "Cable Crunch (Kniendes Bauchpressen am Kabelzug)", mechanic: "core_flex", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Kneeling Cable Crunch" },
  { id: "ex_ac_cf2", name: "Ab-Wheel Rollouts (Bauchroller – Extreme exzentrische Rumpfkraft)", mechanic: "core_flex", equip: ["gym", "homegym"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Ab Wheel Rollout" },
  { id: "ex_ac_cf3", name: "Reverse Crunches auf Bank/Boden (Fokus unterer Bauch ohne Hüftbeuger-Zug)", mechanic: "core_flex", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau"], link: "Reverse Crunch Ausführung" },
  { id: "ex_ac_cf4", name: "McGill Curl-Up (Wirbelsäulen-neutrales Bauchtraining bei empfindlichem Rücken)", mechanic: "core_flex", equip: ["gym", "homegym", "bodyweight"], goal: ["kraft", "muskelaufbau", "athletik"], link: "McGill Curl Up" },
  { id: "ex_t4_ac_cf5", name: "Heel Slides & Toe-Taps in Rückenlage (Rektusdiastase- & Beckenboden-sicher)", mechanic: "core_flex", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Postpartum Heel Slides" },

  // --- ANTI-ROTATION, ROTATION & LATERALE KETTE (core_rot) ---
  { id: "ex_ac_cr1", name: "Suitcase Carry (Einarmiges Tragen für schräge Bauchmuskeln & Quadratus Lumborum)", mechanic: "core_rot", equip: ["gym", "homegym"], goal: ["kraft", "athletik"], link: "Suitcase Carry" },
  { id: "ex_ac_cr2", name: "Kabelzug Woodchoppers (Holzhacker von oben/unten für Rotationskraft)", mechanic: "core_rot", equip: ["gym"], goal: ["athletik", "muskelaufbau"], link: "Cable Woodchopper" },
  { id: "ex_ac_cr3", name: "Landmine Rotations (Full-Contact Twist für Kampfsport & Wurfkraft)", mechanic: "core_rot", equip: ["gym", "homegym"], goal: ["athletik", "kraft"], link: "Landmine Rotation" },
  { id: "ex_ac_cr4", name: "Copenhagen Side Plank (Seitstütz + Adduktoren-Schutz für Spielsportler)", mechanic: "core_rot", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "kraft", "muskelaufbau"], link: "Copenhagen Plank" },
  { id: "ex_t4_ac_cr5", name: "Stehender Band-/Wand-Pallof-Press (Sanfte Anti-Rotation für Senioren/Rückbildung)", mechanic: "core_rot", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Pallof Press Band" }
];

exerciseDB.push(...uebungen_art_core);
