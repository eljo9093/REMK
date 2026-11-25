// ============================================================================
// RE:MK ÜBUNGS-DATENBANK - ÜBUNGSART: HINTERE KETTE (HAMSTRINGS, GLUTEUS & WADEN)
// Dateiname für zukünftige Übungen dieser Art: uebungen_art_hintere_kette.js
// ============================================================================
if (typeof exerciseDB === 'undefined') { window.exerciseDB = []; }

const uebungen_art_hintere_kette = [
  // --- HINGE / HÜFTSTRECKUNG (pull_hinge) ---
  { id: "ex_ahk_hg1", name: "Trap-Bar / Hex-Bar Kreuzheben (Rückenfreundliche Kraft-Basis)", mechanic: "pull_hinge", equip: ["gym", "homegym"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Trap Bar Deadlift" },
  { id: "ex_ahk_hg2", name: "Sumo-Kreuzheben (Breiter Stand – Fokus Adduktoren & Gluteus)", mechanic: "pull_hinge", equip: ["gym", "homegym"], goal: ["kraft", "muskelaufbau"], link: "Sumo Kreuzheben Technik" },
  { id: "ex_ahk_hg3", name: "B-Stance Rumänisches Kreuzheben (Versatz-Stand mit Kurzhanteln)", mechanic: "pull_hinge", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "B Stance RDL" },
  { id: "ex_ahk_hg4", name: "Einbeiniges Rumänisches Kreuzheben (Single-Leg RDL – Balance & Hamstrings)", mechanic: "pull_hinge", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "muskelaufbau"], link: "Single Leg RDL" },
  { id: "ex_t4_ahk_hg5", name: "Kabelzug Pull-Throughs (Hüftstreckung ohne axiale Rückenbelastung)", mechanic: "pull_hinge", equip: ["gym"], goal: ["muskelaufbau", "athletik"], link: "Cable Pull Through" },
  { id: "ex_ahk_hg6", name: "45° Hyperextensions / Back Extensions (Fokus Gluteus & Beinbeuger)", mechanic: "pull_hinge", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "45 Degree Back Extension Glutes" },
  { id: "ex_ahk_hg7", name: "Kettlebell Swings (Explosive Hüftstreckung & hintere Kette)", mechanic: "pull_hinge", equip: ["gym", "homegym"], goal: ["athletik", "kraft"], link: "Russian Kettlebell Swing" },
  { id: "ex_t4_ahk_hg8", name: "Frog Pumps & Glute Bridge March (Beckenboden- & rückenschonend)", mechanic: "pull_hinge", equip: ["bodyweight", "homegym", "gym"], goal: ["muskelaufbau", "athletik"], link: "Glute Bridge March" },

  // --- BEINBEUGER / KNIEBEUGUNG (leg_curl) ---
  { id: "ex_ahk_lc1", name: "Liegende Beinbeuger-Maschine (Lying Leg Curl)", mechanic: "leg_curl", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Lying Leg Curl Maschine" },
  { id: "ex_ahk_lc2", name: "Sitzende Beinbeuger-Maschine (Seated Leg Curl – Maximale Dehnung)", mechanic: "leg_curl", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Seated Leg Curl" },
  { id: "ex_ahk_lc3", name: "Swiss-Ball / Pezziball Hamstring Curls (Hüfte gestreckt)", mechanic: "leg_curl", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Stability Ball Hamstring Curl" },
  { id: "ex_ahk_lc4", name: "Kurzhantel-Beinbeugen zwischen den Füßen (Liegend auf Bank)", mechanic: "leg_curl", equip: ["homegym", "gym"], goal: ["muskelaufbau"], link: "Dumbbell Leg Curl" },
  { id: "ex_t4_ahk_lc5", name: "Isometrische Hamstring-Brücke (Fersen-Druck in 30° & 90° Kniewinkel)", mechanic: "leg_curl", equip: ["bodyweight", "homegym", "gym"], goal: ["kraft", "athletik"], link: "Isometric Hamstring Bridge" },

  // --- WADEN & SPRUNGGELENK (leg_calf) ---
  { id: "ex_ahk_cf1", name: "Sitzendes Wadenheben (Seated Calf Raise – Fokus Schollenmuskel/Soleus)", mechanic: "leg_calf", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Sitzendes Wadenheben" },
  { id: "ex_ahk_cf2", name: "Wadenheben an der 45°-Beinpresse (Große Dehnung)", mechanic: "leg_calf", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Calf Press Leg Press" },
  { id: "ex_t4_ahk_cf3", name: "Tibialis Raises an der Wand (Schienbein-Stärkung gegen Schienbeinkantensyndrom)", mechanic: "leg_calf", equip: ["bodyweight", "homegym", "gym"], goal: ["athletik", "muskelaufbau"], link: "Tibialis Raise Wall" },
  { id: "ex_ahk_cf4", name: "Pogo-Hops & gebeugtes Soleus-Wadenheben an der Stufe (Achillessehnen-Stabi)", mechanic: "leg_calf", equip: ["bodyweight", "homegym", "gym"], goal: ["athletik", "muskelaufbau"], link: "Bent Knee Calf Raise" }
];

exerciseDB.push(...uebungen_art_hintere_kette);
