// ============================================================================
// RE:MK ÜBUNGS-DATENBANK - ÜBUNGSART: BEINE (QUADRIZEPS, GLUTEUS & UNILATERAL)
// Dateiname für zukünftige Übungen dieser Art: uebungen_art_beine.js
// ============================================================================
if (typeof exerciseDB === 'undefined') { window.exerciseDB = []; }

const uebungen_art_beine = [
  // --- KNIEBEUGE-MUSTER (leg_squat) ---
  { id: "ex_ab_sq1", name: "Safety-Bar / High-Bar Langhantel-Kniebeuge", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "High Bar Kniebeuge Ausführung" },
  { id: "ex_ab_sq2", name: "Pause-Squats (2 Sek. Stopp in der tiefen Position)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["kraft", "athletik"], link: "Pause Squat Ausführung" },
  { id: "ex_ab_sq3", name: "Doppel-Kettlebell / Kurzhantel Front Squat", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Double Kettlebell Front Squat" },
  { id: "ex_ab_sq4", name: "Zercher Squats (Rumpf- & Beinkraft für Kampfsport/Athletik)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["kraft", "athletik"], link: "Zercher Squat Technik" },
  { id: "ex_ab_sq5", name: "Fersen-erhöhte Cyclist Goblet Squats (Maximaler Quadrizeps-Fokus)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Heel Elevated Goblet Squat" },
  { id: "ex_ab_sq6", name: "Sumo-Squats mit Kurzhantel / Kettlebell (Adduktoren & Gluteus)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Sumo Goblet Squat" },
  { id: "ex_t4_ab_sq7", name: "Spanische Kniebeuge (Spanish Squat mit Band – Extrem knieschonend!)", mechanic: "leg_squat", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Spanish Squat Patellasehne" },
  { id: "ex_ab_sq8", name: "Prisoner Jump Squats / Explosiv-Kniebeugen (Eigengewicht)", mechanic: "leg_squat", equip: ["bodyweight"], goal: ["athletik", "muskelaufbau"], link: "Bodyweight Jump Squats" },
  { id: "ex_t4_ab_sq9", name: "Stuhl-/Bank-Aufstehen kontrolliert (Sit-to-Stand für Einsteiger/Senioren)", mechanic: "leg_squat", equip: ["bodyweight", "homegym", "gym"], goal: ["muskelaufbau", "kraft"], link: "Sit to Stand Squat" },

  // --- BEINPRESSE- & STRECK-MUSTER (leg_press) ---
  { id: "ex_ab_lp1", name: "Einbeinige Beinpresse (Single-Leg Press – Dysbalancen-Ausgleich)", mechanic: "leg_press", equip: ["gym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Einbeinige Beinpresse" },
  { id: "ex_ab_lp2", name: "Pendulum Squat / V-Squat Maschine", mechanic: "leg_press", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Pendulum Squat Maschine" },
  { id: "ex_ab_lp3", name: "Belt Squat (Hüftgürtel-Kniebeuge – 100% Wirbelsäulen-Entlastung!)", mechanic: "leg_press", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Belt Squat Ausführung" },
  { id: "ex_ab_lp4", name: "Beinstrecker-Maschine (Leg Extension mit 1s Spitzenkontraktion)", mechanic: "leg_press", equip: ["gym"], goal: ["muskelaufbau"], link: "Beinstrecker Maschine" },
  { id: "ex_ab_lp5", name: "Reverse Nordics (Exzentrische Quadrizeps-Dehnung & Knieschutz)", mechanic: "leg_press", equip: ["bodyweight", "homegym", "gym"], goal: ["muskelaufbau", "athletik"], link: "Reverse Nordic Curl" },
  { id: "ex_t4_ab_lp6", name: "Isometrischer Einbein-Wandsitz (Single-Leg Wall Sit – Patella-Reha)", mechanic: "leg_press", equip: ["bodyweight", "homegym", "gym"], goal: ["kraft", "athletik"], link: "Single Leg Wall Sit" },

  // --- UNILATERALE BEINÜBUNGEN (leg_uni) ---
  { id: "ex_ab_uni1", name: "Walking Lunges (Gehende Ausfallschritte mit Kurzhanteln)", mechanic: "leg_uni", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Walking Lunges Kurzhanteln" },
  { id: "ex_ab_uni2", name: "Vorderfuß-erhöhte Split Squats (ATG Split Squat – Knie- & Hüftmobilität)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "ATG Split Squat" },
  { id: "ex_ab_uni3", name: "Deficit Reverse Lunges (Ausfallschritt von Erhöhung)", mechanic: "leg_uni", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Deficit Reverse Lunge" },
  { id: "ex_ab_uni4", name: "Skater Squats (Freie einbeinige Kniebeuge nach hinten)", mechanic: "leg_uni", equip: ["bodyweight", "homegym"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Skater Squat Ausführung" },
  { id: "ex_t4_ab_uni5", name: "Poliquin Step-Downs (Exzentrische Knie-Stabilisation auf Stufe)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Poliquin Step Down" },
  { id: "ex_ab_uni6", name: "Curtsy Lunges (Überkreuz-Ausfallschritt für Gluteus Medius)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Curtsy Lunges" }
];

exerciseDB.push(...uebungen_art_beine);
