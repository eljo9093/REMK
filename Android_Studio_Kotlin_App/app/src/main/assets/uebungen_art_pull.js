// ============================================================================
// RE:MK ÜBUNGS-DATENBANK - ÜBUNGSART: PULL (RÜCKEN, LATISSIMUS, BIZEPS & PREHAB)
// Dateiname für zukünftige Übungen dieser Art: uebungen_art_pull.js
// ============================================================================
if (typeof exerciseDB === 'undefined') { window.exerciseDB = []; }

const uebungen_art_pull = [
  // --- VERTIKAL ZIEHEN (pull_vert) ---
  { id: "ex_apl_pv1", name: "Latzug im engen Neutral-/Parallelgriff", mechanic: "pull_vert", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Neutral Grip Lat Pulldown" },
  { id: "ex_apl_pv2", name: "Untergriff-Klimmzüge (Chin-Ups – Maximaler Lat- & Bizeps-Reiz)", mechanic: "pull_vert", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Chin Ups Ausführung" },
  { id: "ex_apl_pv3", name: "Einarmiger Latzug am Kabel (Iliac-Lat-Fokus)", mechanic: "pull_vert", equip: ["gym"], goal: ["muskelaufbau"], link: "Single Arm Lat Pulldown" },
  { id: "ex_apl_pv4", name: "Gestrickte Überzüge am Kabelzug (Straight-Arm Lat Pulldowns)", mechanic: "pull_vert", equip: ["gym"], goal: ["muskelaufbau", "athletik"], link: "Straight Arm Pulldown" },
  { id: "ex_t4_apl_pv5", name: "Exzentrische Klimmzüge (5 Sek. Ablassen) oder Band-gestützte Klimmzüge", mechanic: "pull_vert", equip: ["gym", "homegym", "bodyweight"], goal: ["kraft", "muskelaufbau"], link: "Eccentric Pull Ups" },

  // --- HORIZONTAL RUDERN (pull_horiz) ---
  { id: "ex_apl_ph1", name: "T-Bar Rudern / Brustgestütztes Maschinen-Rudern (Oberer Rücken)", mechanic: "pull_horiz", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Chest Supported T Bar Row" },
  { id: "ex_t4_apl_ph2", name: "Helms Row / Beidarmiges Kurzhantel-Rudern bäuchlings auf Schrägbank (100% Rückenschonend)", mechanic: "pull_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Chest Supported Dumbbell Row" },
  { id: "ex_apl_ph3", name: "Pendlay Rows (Explosives Langhantel-Rudern vom Boden)", mechanic: "pull_horiz", equip: ["gym", "homegym"], goal: ["kraft", "athletik"], link: "Pendlay Row Technik" },
  { id: "ex_apl_ph4", name: "Meadows Rows / Einarmiges Landmine-Rudern", mechanic: "pull_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Meadows Row" },
  { id: "ex_apl_ph5", name: "Gorilla Rows (Wechselseitiges Kettlebell-/Kurzhantel-Rudern aus stabilem Stand)", mechanic: "pull_horiz", equip: ["gym", "homegym"], goal: ["athletik", "muskelaufbau"], link: "Gorilla Row" },
  { id: "ex_apl_ph6", name: "Einarmiges Tisch-/Sling-Rudern mit Rumpf-Anti-Rotation", mechanic: "pull_horiz", equip: ["bodyweight", "homegym"], goal: ["athletik", "kraft"], link: "Single Arm Inverted Row" },

  // --- PULL ISOLATION: BIZEPS, HINTERE SCHULTER & ROTATORENMANSCHETTE (pull_iso) ---
  { id: "ex_apl_pi1", name: "Incline Dumbbell Curls (Schrägbank-Bizepscurls in voller Dehnung)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Incline Dumbbell Curl" },
  { id: "ex_apl_pi2", name: "Preacher Curls (Scottbank-Curls mit SZ-Stange / Kurzhantel / Maschine)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Preacher Curl" },
  { id: "ex_apl_pi3", name: "Reverse Flys (Maschine / Kabelzug / Vorgebeugt für hintere Schulter)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Reverse Flys Ausführung" },
  { id: "ex_apl_pi4", name: "Bayesian Cable Curls (Bizepscurls am Kabelzug hinter dem Körper)", mechanic: "pull_iso", equip: ["gym"], goal: ["muskelaufbau"], link: "Bayesian Cable Curl" },
  { id: "ex_t4_apl_pi5", name: "Cuban Rotations / Externe Schulter-Außenrotation (Impingement-Schutz)", mechanic: "pull_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "muskelaufbau"], link: "External Shoulder Rotation Exercise" },
  { id: "ex_apl_pi6", name: "Zottman Curls (Bizeps + brachioradialis & Unterarm-Griffkraft)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Zottman Curl" }
];

exerciseDB.push(...uebungen_art_pull);
