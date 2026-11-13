// ============================================================================
// RE:MK ÜBUNGS-DATENBANK - ÜBUNGSART: PUSH (BRUST, SCHULTERN & TRIZEPS)
// Dateiname für zukünftige Übungen dieser Art: uebungen_art_push.js
// ============================================================================
if (typeof exerciseDB === 'undefined') { window.exerciseDB = []; }

const uebungen_art_push = [
  // --- HORIZONTAL DRÜCKEN (push_horiz) ---
  { id: "ex_ap_ph1", name: "Kurzhantel-Flachbankdrücken (Volle Dehnung & symmetrische Kraft)", mechanic: "push_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Kurzhantel Bankdrücken" },
  { id: "ex_ap_ph2", name: "Langhantel-Schrägbankdrücken (Fokus obere Brust & Schlüsselbeinanteil)", mechanic: "push_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Langhantel Schrägbankdrücken" },
  { id: "ex_ap_ph3", name: "Dips am Holm (Leicht vorgebeugt – Brust- & Trizeps-Kraft)", mechanic: "push_horiz", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Chest Dips Ausführung" },
  { id: "ex_ap_ph4", name: "Konvergierende Schräg-Brustpresse (Plate-Loaded / Maschine)", mechanic: "push_horiz", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Incline Chest Press Machine" },
  { id: "ex_t4_ap_ph5", name: "Spoto-Press / Neutralgriff-Kurzhanteldrücken (15° Schrägbank – Schulterschonend)", mechanic: "push_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Neutral Grip Dumbbell Press" },
  { id: "ex_ap_ph6", name: "Deficit Push-Ups auf Griffen / Hanteln + 2s Pause unten", mechanic: "push_horiz", equip: ["bodyweight", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Deficit Push Ups" },
  { id: "ex_ap_ph7", name: "Archer Push-Ups (Bogenschieß-Liegestütze – Einarmige Progression)", mechanic: "push_horiz", equip: ["bodyweight"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Archer Push Ups" },
  { id: "ex_t4_ap_ph8", name: "Erhöhte Liegestütze an Bank/Wand mit Schulterblatt-Plus (Einsteiger/Reha)", mechanic: "push_horiz", equip: ["bodyweight", "homegym", "gym"], goal: ["muskelaufbau", "athletik"], link: "Incline Push Up Scapula" },

  // --- VERTIKAL / ÜBERKOPF DRÜCKEN (push_vert) ---
  { id: "ex_ap_pv1", name: "Arnold Press (Kurzhantel-Schulterdrücken mit Rotation)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Arnold Press Ausführung" },
  { id: "ex_ap_pv2", name: "Schulterpresse Maschine (Neutral- oder Obergriff)", mechanic: "push_vert", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Shoulder Press Machine" },
  { id: "ex_ap_pv3", name: "Push Press (Explosives Überkopfdrücken aus den Beinen)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["kraft", "athletik"], link: "Push Press Langhantel" },
  { id: "ex_t4_ap_pv4", name: "Halb-kniendes Einarm-Kurzhanteldrücken im Neutralgriff (Core & Schulter-Stabi)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Half Kneeling Dumbbell Press" },
  { id: "ex_ap_pv5", name: "Z-Press (Sitzendes Überkopfdrücken am Boden – 100% Rumpfkraft)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["kraft", "athletik"], link: "Z Press Ausführung" },
  { id: "ex_ap_pv6", name: "Füße-erhöhte Pike Push-Ups / Wall Handstand Push-Up Progression", mechanic: "push_vert", equip: ["bodyweight", "homegym"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Elevated Pike Push Up" },

  // --- PUSH ISOLATION: BRUST, SEITLICHE SCHULTER & TRIZEPS (push_iso) ---
  { id: "ex_ap_pi1", name: "Kabelzug-Seitenheben hinter dem Körper (Konstante Spannung)", mechanic: "push_iso", equip: ["gym"], goal: ["muskelaufbau"], link: "Cable Lateral Raise" },
  { id: "ex_ap_pi2", name: "Überkopf-Trizepsstrecken am Kabelzug (Seil / Katana-Extensions)", mechanic: "push_iso", equip: ["gym"], goal: ["muskelaufbau"], link: "Overhead Cable Tricep Extension" },
  { id: "ex_ap_pi3", name: "Butterfly / Cable Cross-Over (Brust-Isolation in voller Dehnung)", mechanic: "push_iso", equip: ["gym"], goal: ["muskelaufbau"], link: "Cable Crossover Brust" },
  { id: "ex_ap_pi4", name: "Enges Bankdrücken (Close-Grip Bench Press für Trizeps-Masse & Kraft)", mechanic: "push_iso", equip: ["gym", "homegym"], goal: ["kraft", "muskelaufbau"], link: "Close Grip Bench Press" },
  { id: "ex_ap_pi5", name: "Schrägbank-Seitenheben (Incline Lateral Raises mit Kurzhanteln)", mechanic: "push_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Incline Lateral Raise" },
  { id: "ex_ap_pi6", name: "Bodyweight Trizeps-Extensions an Stange / Tischkante", mechanic: "push_iso", equip: ["bodyweight", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Bodyweight Tricep Extension" }
];

exerciseDB.push(...uebungen_art_push);
