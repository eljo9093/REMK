// ============================================================================
// RE:MK MASTER-DATENBANK: CALISTHENICS, STREET-WORKOUT & FREELETICS (v23.2)
// 88 spezialisierte Übungen – strikt getrennt nach Trainings-Umgebung (calSpot):
// - "park": Calisthenics-Park / Street-Workout Anlage (Klimmzugstange, Parallelbarren,
//           niedrige Stange, Monkey-Bars, Park-Stufen – OHNE Wohnzimmer-Begriffe!)
// - "freeletics_mat": Freeletics 2x2m Matte / Sportplatz (100% OHNE Stange & OHNE Geräte!)
// - "home_bars_rings": Zuhause mit Klimmzugstange, Dip-Barren oder Turnringen
// - "home_improvised": Zuhause ohne Sportgeräte (Tischkante, Stühle, Handtuch, Tür)
// ============================================================================

var uebungen_calisthenics_freeletics = [
  // ==========================================================================
  // 1. HORIZONTAL PUSH (push_horiz) – Brust, vordere Schulter, Planche & Dips
  // ==========================================================================
  { id: "ex_cf_ph1", name: "Parallel-Bar Dips (Tiefe Calisthenics-Dips am Parallelbarren mit Vorneige)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Calisthenics Parallel Bar Dips" },
  { id: "ex_cf_ph2", name: "Straight-Bar Dips (Dips auf der geraden Stange – Muscle-Up Übergangskraft)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Straight Bar Dips Calisthenics" },
  { id: "ex_cf_ph3", name: "Archer Push-Ups (Bogenschieß-Liegestütze – Unilaterale Brust- & Stützkraft)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Archer Push Ups Calisthenics" },
  { id: "ex_cf_ph4", name: "Pseudo-Planche Push-Ups mit 2s Vorneige-Hold (Extremer Brust- & Schulter-Hebel)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Pseudo Planche Push Up" },
  { id: "ex_cf_ph5", name: "Explosive Clap Push-Ups / Plyo-Liegestütze (Schnellkraft & Fast-Twitch-Fasern)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["athletik", "kraft", "muskelaufbau"], link: "Clap Push Ups Explosive" },
  { id: "ex_cf_ph6", name: "Typewriter Push-Ups (Seitliches Gleiten tief über dem Boden – Volle Brustdehnung)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Typewriter Push Up Calisthenics" },
  { id: "ex_cf_ph7", name: "Freeletics Burpees & Sprawl-Push-Ups (High-Output Ganzkörper-Kraftausdauer)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau"], link: "Freeletics Burpee Technique" },
  { id: "ex_cf_ph8", name: "Freeletics Hand-Release Push-Ups (Brust komplett ablegen & explosiv abdrücken)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Hand Release Push Ups Freeletics" },
  { id: "ex_cf_ph9", name: "One-Arm Push-Up Progression (Einarmige Liegestütze am niedrigen Barren oder Boden)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "athletik", "muskelaufbau"], link: "One Arm Push Up Progression" },
  { id: "ex_cf_ph10", name: "Deep Deficit Push-Ups an niedrigen Park-Barren / Parallettes (Maximale Dehnung)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft"], link: "Deficit Push Ups Parallettes" },
  { id: "ex_cf_ph11", name: "Chair / Bench Dips mit Vorneige (Tiefe Stütz-Dips an zwei Stühlen/Bänken)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised"], goal: ["muskelaufbau", "kraft"], link: "Chair Dips Chest Bodyweight" },
  { id: "ex_t4_cf_ph12", name: "Incline Scapula-Plus Push-Ups im 3-2-1 Tempo (Einsteiger & Schulterschonend)", mechanic: "push_horiz", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Incline Scapula Push Up" },

  // ==========================================================================
  // 2. VERTIKAL PUSH (push_vert) – Überkopf-Kraft, Handstand-Skills & Schulter
  // ==========================================================================
  { id: "ex_cf_pv1", name: "Wall / Pole Handstand Push-Ups (HSPU – Königsklasse für Überkopf-Schulterkraft)", mechanic: "push_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings", "home_improvised"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Wall Handstand Push Up" },
  { id: "ex_cf_pv2", name: "Elevated Strict Pike Push-Ups (Füße auf niedriger Stange/Bank – 3-1-1 Tempo)", mechanic: "push_vert", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Elevated Pike Push Up" },
  { id: "ex_cf_pv3", name: "Freeletics Strict Pike Push-Ups vom Boden (Strikte Überkopf-Drückkette ohne Geräte)", mechanic: "push_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Pike Push Up Freeletics" },
  { id: "ex_cf_pv4", name: "Hindu- / Dive-Bomber Push-Ups (Dynamische Schulter-, Brust- & Trizeps-Welle)", mechanic: "push_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Dive Bomber Push Up" },
  { id: "ex_cf_pv5", name: "Crow-Pose (Krähe / Frog-Stand) zu Pike-Press Transition (Balance & vordere Schulter)", mechanic: "push_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Frog Stand Calisthenics" },
  { id: "ex_cf_pv6", name: "Handstand Hold & Shoulder-Shrugs (Frei, an Park-Säule oder Wand – 30-45s)", mechanic: "push_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings", "home_improvised"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Handstand Shoulder Shrugs" },
  { id: "ex_cf_pv7", name: "Freeletics Bear-Crawl Shoulder-Press & Sprawls (Dynamische Überkopf-Ausdauer)", mechanic: "push_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park"], goal: ["athletik", "muskelaufbau"], link: "Bear Crawl Push Up" },

  // ==========================================================================
  // 3A. PUSH ISOLATION – BRUST-ISOLATION (push_iso -> chest_iso)
  // ==========================================================================
  { id: "ex_cf_ci1", name: "Wide-Grip Deep Stretch Push-Ups + 5s Isometric Chest Squeeze (Äußere & innere Brust)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Wide Push Up Chest Stretch" },
  { id: "ex_cf_ci2", name: "Crossover Squeeze Push-Ups / Prayer Chest Press (Maximale Brust-Innenkontraktion)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Squeeze Push Up Chest" },
  { id: "ex_cf_ci3", name: "Deep Bar / Ring Chest Fly-Dips (Unten 3s Dehnungs-Pause am Parallelbarren/Ringen)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft"], link: "Deep Chest Dips Stretch" },
  { id: "ex_cf_ci4", name: "Sliding Floor Chest Flys auf Handtüchern (Exzentrische Bodyweight-Brust-Flys)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised", "home_bars_rings"], goal: ["muskelaufbau", "kraft"], link: "Sliding Floor Chest Flys Towel" },

  // ==========================================================================
  // 3B. PUSH ISOLATION – SEITLICHE SCHULTER (push_iso -> side_delt_iso)
  // ==========================================================================
  { id: "ex_cf_sd1", name: "Pike Lateral Shoulder-Taps & Slow Hip-Shift (Calisthenics Fokus seitliche Schulter)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Pike Shoulder Taps Lateral Delts" },
  { id: "ex_cf_sd2", name: "Side-Plank Lateral Raise Dip & Delt-Drive (Eigengewichts-Belastung mittlerer Delta)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Side Plank Shoulder Exercise" },
  { id: "ex_cf_sd3", name: "Prone Y-Raises & Swimmer Lateral Sweeps in Bauchlage (3D-Schulter & Skapula)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Prone Y Raise Bodyweight" },
  { id: "ex_cf_sd4", name: "Isometrisches Lateral-Drücken gegen Park-Stange / Rahmen (5s Maximal-Kontraktion)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft"], link: "Isometric Wall Lateral Raise" },

  // ==========================================================================
  // 3C. PUSH ISOLATION – TRIZEPS-ISOLATION (push_iso -> triceps_iso)
  // ==========================================================================
  { id: "ex_cf_ti1", name: "Calisthenics Bar Skullcrushers (Bodyweight Trizeps-Strecken an niedriger Stange)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Bodyweight Tricep Extension Bar" },
  { id: "ex_cf_ti2", name: "Sphinx- / Tiger-Bend Push-Ups am Boden (Unterarm-Liegestütz-Strecken für den Trizeps)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Tiger Bend Push Up Triceps" },
  { id: "ex_cf_ti3", name: "Diamond Push-Ups (Diamant-Liegestütze im 3-1-1 Tempo für Trizeps-Masse)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Diamond Push Ups Triceps" },
  { id: "ex_cf_ti4", name: "Korean Dips / Upright Trizeps-Bar-Dips (Aufrechter Oberkörper für vollen Trizeps-Peak)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Tricep Bar Dips Calisthenics" },
  { id: "ex_cf_ti5", name: "Bodyweight Trizeps-Extensions an Tischkante / Stuhl (Heim-Trizepsstrecker)", mechanic: "push_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised"], goal: ["muskelaufbau", "athletik"], link: "Bodyweight Tricep Extension Table" },

  // ==========================================================================
  // 4. VERTIKAL PULL (pull_vert) – Latissimus, Muscle-Up-Skills & Boden-Pulls
  // ==========================================================================
  { id: "ex_cf_plv1", name: "Explosive Chest-to-Bar Pull-Ups / Muscle-Up Transition an der Klimmzugstange", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Chest to Bar Pull Up Calisthenics" },
  { id: "ex_cf_plv2", name: "Archer Pull-Ups / Typewriter Klimmzüge an der Stange (Unilaterale Zugkraft)", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Archer Pull Up Calisthenics" },
  { id: "ex_cf_plv3", name: "L-Sit Pull-Ups / Strikte Obergriff-Klimmzüge (Volle Range of Motion an der Stange)", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft", "athletik"], link: "L Sit Pull Up Calisthenics" },
  { id: "ex_cf_plv4", name: "Close-Grip Neutral / Commando Pull-Ups am Parallelbarren oder Klimmzugstange", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Commando Pull Ups Calisthenics" },
  { id: "ex_t4_cf_plv5", name: "5s Exzentrische Negativ-Klimmzüge & Active Scapula Hangs an der Stange", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Eccentric Pull Ups Tutorial" },
  // Spezielle Freeletics-Matte (Ohne Stange!) & Home-Improvised Vertikal-Zug-Alternativen:
  { id: "ex_cf_plv6", name: "Prone Lat Pull-Downs mit Boden-Traktion (Bauchlage Lat-Zug über Unterarm-Druck)", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Prone Lat Pulldown Bodyweight No Equipment" },
  { id: "ex_cf_plv7", name: "Prone Swimmer Pull-Throughs & 2s Lat-Squeeze (Vertikale Rücken-Kette ohne Stange)", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Prone Swimmers Back Exercise" },
  { id: "ex_cf_plv8", name: "Sliding Floor Lat-Pulldowns auf Handtuch / Tür-Zug (Heim-Überzüge ohne Stange)", mechanic: "pull_vert", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Sliding Floor Pulldown Bodyweight" },

  // ==========================================================================
  // 5. HORIZONTAL PULL (pull_horiz) – Oberer Rücken, Front-Lever & Ruder-Kette
  // ==========================================================================
  { id: "ex_cf_plh1", name: "Front-Lever Tuck Rows an niedriger Stange / Barren (Horizontale Calisthenics-Zugkraft)", mechanic: "pull_horiz", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Tuck Front Lever Row" },
  { id: "ex_cf_plh2", name: "Australian Pull-Ups / Bodyweight Rows an niedriger Park-Stange (2s Peak-Hold)", mechanic: "pull_horiz", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Australian Pull Ups Inverted Row" },
  { id: "ex_cf_plh3", name: "Archer Inverted Rows (Einarmiges Australian Rudern an niedriger Stange / Ringen)", mechanic: "pull_horiz", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Archer Bodyweight Row" },
  // Spezielle Freeletics-Matte (Ohne Stange!) & Home-Improvised Horizontal-Ruder-Übungen:
  { id: "ex_cf_plh4", name: "Supine Elbow Press Rows (Rücken-Drück-Rudern über die Ellbogen in Rückenlage – 0 Geräte!)", mechanic: "pull_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "home_improvised"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Supine Bodyweight Row Elbows" },
  { id: "ex_cf_plh5", name: "Reverse Snow Angels & Prone Cobra Rhomboid-Rows (Oberer Rücken auf der Matte)", mechanic: "pull_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Reverse Snow Angels Back Exercise" },
  { id: "ex_cf_plh6", name: "Inverted Tischkanten- / Türrahmen-Rudern im 3-2-1 Tempo (Heim-Rücken-Zug)", mechanic: "pull_horiz", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Table Inverted Row Bodyweight" },

  // ==========================================================================
  // 6A. PULL ISOLATION – HINTERE SCHULTER (pull_iso -> rear_delt_iso)
  // ==========================================================================
  { id: "ex_cf_rd1", name: "Wide-Elbow Rear-Delt Face-Pulls an niedriger Stange / Ringen (Hintere Schulter im Park)", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Bodyweight Face Pulls Bar" },
  { id: "ex_cf_rd2", name: "Prone Rear-Delt T-Raises & Y-T-W Schulter-Prehab mit 2s Hold (Ohne Geräte)", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Prone Rear Delt Fly Bodyweight" },
  { id: "ex_cf_rd3", name: "Supine Floor Rear-Delt Press (Hintere Schulter-Brücke über die hinteren Oberarme)", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "home_improvised"], goal: ["muskelaufbau", "kraft"], link: "Supine Rear Delt Floor Press" },
  { id: "ex_cf_rd4", name: "Reverse Tisch-/Türrahmen Face-Pulls (Heim-Isolation für die hintere Schulter)", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised"], goal: ["muskelaufbau", "athletik"], link: "Doorway Towel Face Pull" },

  // ==========================================================================
  // 6B. PULL ISOLATION – BIZEPS & UNTERARME (pull_iso -> biceps_iso)
  // ==========================================================================
  { id: "ex_cf_bi1", name: "Headbanger Chin-Up Bizeps-Curls & 90°-Isometric Hold an der Klimmzugstange", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Headbanger Pull Ups Biceps" },
  { id: "ex_cf_bi2", name: "Bodyweight Bizeps-Curls im engen Untergriff an niedriger Stange / Parallelbarren", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Bodyweight Bicep Curl Bar" },
  { id: "ex_cf_bi3", name: "Self-Resistance Isometric Bizeps-Curls gegen eigenen Bein-/Hand-Widerstand (0 Geräte!)", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "home_improvised", "park"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Self Resistance Bicep Curl Bodyweight" },
  { id: "ex_cf_bi4", name: "Untergriff-Bizeps-Curls an Tischkante / Handtuch im Türrahmen", mechanic: "pull_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised"], goal: ["muskelaufbau", "kraft"], link: "Bodyweight Bicep Curl Table" },

  // ==========================================================================
  // 7. BEINE: SQUAT-MUSTER (leg_squat) – Pistol Squat, Explosivkraft & Quads
  // ==========================================================================
  { id: "ex_cf_sq1", name: "Pistol Squats (Einbeinige Calisthenics-Kniebeuge frei oder an Park-Stange gestützt)", mechanic: "leg_squat", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Pistol Squat Progression" },
  { id: "ex_cf_sq2", name: "Freeletics Jump Squats & 180°-Tuck-Jumps (Explosive Bein-Power & Laktattoleranz)", mechanic: "leg_squat", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Freeletics Squat Jumps" },
  { id: "ex_cf_sq3", name: "Tempo Hindu-Squats / Deep Bodyweight Squats (4-1-1-0 Tempo bis zur vollen Tiefe)", mechanic: "leg_squat", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Hindu Squat Bodyweight" },
  { id: "ex_cf_sq4", name: "1,5-Rep Pause-Squats (Unten halb hoch, wieder tief & explosiv ganz strecken)", mechanic: "leg_squat", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "1.5 Rep Bodyweight Squat" },

  // ==========================================================================
  // 8. BEINE: KNIE-STRECKUNG & PRESS-ERSATZ (leg_press) – Sissy Squat & Reverse Nordics
  // ==========================================================================
  { id: "ex_cf_lp1", name: "Reverse Nordics (Exzentrisches Zurücklehnen im Kniestand – Extremer Quadrizeps-Stretch)", mechanic: "leg_press", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Reverse Nordic Curl Bodyweight" },
  { id: "ex_cf_lp2", name: "Bodyweight Sissy Squats (Frei oder mit 2 Fingern an Stange – Volle Quad-Isolation)", mechanic: "leg_press", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Bodyweight Sissy Squat" },
  { id: "ex_cf_lp3", name: "Explosive Park-Box-Jumps / High-Step-Drives (Schnellkraft für Oberschenkel & Hüfte)", mechanic: "leg_press", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "home_bars_rings"], goal: ["athletik", "kraft", "muskelaufbau"], link: "Box Jumps Calisthenics Park" },
  { id: "ex_cf_lp4", name: "Single-Leg Isometric Squat-Hold (45s tiefer Einbein-Hold in 90°-Beugung)", mechanic: "leg_press", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Single Leg Squat Hold" },

  // ==========================================================================
  // 9. BEINE: UNILATERAL (leg_uni) – Shrimp Squat, Skater Squat & Split Jumps
  // ==========================================================================
  { id: "ex_cf_uni1", name: "Shrimp Squats (Hinterer Fuß gegriffen – Einbeinige Calisthenics-Kraftübung)", mechanic: "leg_uni", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Shrimp Squat Calisthenics" },
  { id: "ex_cf_uni2", name: "Bulgarian Split Squats (Hinterer Fuß auf niedriger Stange/Stufe erhöht – 3-2-1 Tempo)", mechanic: "leg_uni", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Bodyweight Bulgarian Split Squat" },
  { id: "ex_cf_uni3", name: "Freeletics Split-Lunges / Explosive Ausfallschritt-Wechselsprünge", mechanic: "leg_uni", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Jumping Lunges Freeletics" },
  { id: "ex_cf_uni4", name: "Skater Squats & Tiefe ATG Split Squats (Volle Knie- & Hüftkontrolle ohne Geräte)", mechanic: "leg_uni", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Skater Squat Progression" },
  { id: "ex_cf_uni5", name: "Cossack Squats (Tiefe seitliche Ausfallschritte für Adduktoren, Mobilität & Beinkraft)", mechanic: "leg_uni", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Cossack Squat Calisthenics" },

  // ==========================================================================
  // 10. HINTERE KETTE: HINGE & GLUTEUS (pull_hinge)
  // ==========================================================================
  { id: "ex_cf_hg1", name: "Single-Leg Romanian Deadlift (Einbeinige Standwaage + explosiver Knie-Drive)", mechanic: "pull_hinge", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Single Leg Bodyweight RDL" },
  { id: "ex_cf_hg2", name: "Freeletics Broad Jumps (Maximale Standweitsprünge für explosive Hüftstreckung)", mechanic: "pull_hinge", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings"], goal: ["athletik", "kraft", "muskelaufbau"], link: "Broad Jumps Exercise" },
  { id: "ex_cf_hg3", name: "Single-Leg Hip Thrusts / Glute Bridges mit 2s Spitzenkontraktion", mechanic: "pull_hinge", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Single Leg Glute Bridge" },
  { id: "ex_cf_hg4", name: "Reverse Hyperextensions am Parallelbarren / hoher Bank (Unterer Rücken & Gluteus)", mechanic: "pull_hinge", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Reverse Hyperextension Parallel Bars" },

  // ==========================================================================
  // 11. HINTERE KETTE: BEINBEUGER / HAMSTRINGS (leg_curl)
  // ==========================================================================
  { id: "ex_cf_lc1", name: "Natural Glute-Ham Raise / Nordic Hamstring Curls (Fersen unter niedriger Park-Stange)", mechanic: "leg_curl", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Natural Glute Ham Raise Park Bar" },
  { id: "ex_cf_lc2", name: "Glute-Ham-Walkouts (Fersen-Walkouts in der Brücke – Extremer Hamstring-Reiz ohne Geräte)", mechanic: "leg_curl", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Hamstring Walkouts Exercise" },
  { id: "ex_cf_lc3", name: "Single-Leg Isometric Hamstring Bridge (Fersendruck bei 30° Kniewinkel – 0 Geräte)", mechanic: "leg_curl", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Isometric Hamstring Bridge Single Leg" },
  { id: "ex_cf_lc4", name: "Single-Leg Sliding Hamstring Curls auf Handtuch (Wohnzimmer-Beinbeuger)", mechanic: "leg_curl", equip: ["calisthenics", "bodyweight"], calSpot: ["home_improvised"], goal: ["kraft", "muskelaufbau"], link: "Single Leg Sliding Hamstring Curl" },

  // ==========================================================================
  // 12. WADEN & SPRUNGGELENK (leg_calf)
  // ==========================================================================
  { id: "ex_cf_cf1", name: "Einbeiniges Tempo-Wadenheben an Park-Stufe / Sockel (3s ablassen, 2s Dehnung)", mechanic: "leg_calf", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings", "home_improvised"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Single Leg Calf Raise Step" },
  { id: "ex_cf_cf2", name: "Plyo Pogo-Jumps + Gebeugtes Soleus-Wadenheben am Platz (Sprungkraft & Achillessehne)", mechanic: "leg_calf", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Pogo Jumps Calf Exercise" },
  { id: "ex_cf_cf3", name: "Tibialis Raises + Einbeiniger Calf-Hold (Unterschenkel-Komplettschutz)", mechanic: "leg_calf", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Tibialis Raise Bodyweight" },

  // ==========================================================================
  // 13. CORE: ISOMETRISCH, FLEXION & ROTATION (core_iso, core_flex, core_rot)
  // ==========================================================================
  { id: "ex_cf_co1", name: "L-Sit Hold am Parallelbarren / Boden & Hollow-Body Rocks (Turn-Core-Kraft)", mechanic: "core_iso", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "athletik", "muskelaufbau"], link: "L Sit Progression Calisthenics" },
  { id: "ex_cf_co2", name: "Planche Lean Hold & Body-Saw Plank (Statische Calisthenics-Rumpfspannung)", mechanic: "core_iso", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Planche Lean Tutorial" },
  { id: "ex_cf_co3", name: "Hanging Leg Raises / Toes-to-Bar an der Klimmzugstange (Volle Bauchmuskel-Kette)", mechanic: "core_flex", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Toes to Bar Calisthenics" },
  { id: "ex_cf_co4", name: "Dragon-Flag Progression an niedriger Park-Stange / Säule (Königsklasse Core)", mechanic: "core_flex", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "muskelaufbau", "athletik"], link: "Dragon Flag Progression" },
  { id: "ex_cf_co5", name: "Freeletics Jackknives (Klappmesser) & Mountain Climber Sprint (High-Intensity Core)", mechanic: "core_flex", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "park", "home_bars_rings", "home_improvised"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Freeletics Jackknives" },
  { id: "ex_cf_co6", name: "Hanging Windshield Wipers an der Klimmzugstange (Scheibenwischer für Obliques)", mechanic: "core_rot", equip: ["calisthenics", "bodyweight", "homegym"], calSpot: ["park", "home_bars_rings"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Hanging Windshield Wipers" },
  { id: "ex_cf_co7", name: "Lying Floor Windshield Wipers & Russian Twists (Rotations-Core ohne Stange)", mechanic: "core_rot", equip: ["calisthenics", "bodyweight"], calSpot: ["freeletics_mat", "home_improvised", "park"], goal: ["athletik", "muskelaufbau", "kraft"], link: "Floor Windshield Wipers Abs" },
  { id: "ex_cf_co8", name: "Human-Flag Prep / Side-Plank Hip-Dips & Copenhagen Plank (Seitliche Rumpfkette)", mechanic: "core_rot", equip: ["calisthenics", "bodyweight"], calSpot: ["park", "freeletics_mat", "home_bars_rings", "home_improvised"], goal: ["athletik", "kraft", "muskelaufbau"], link: "Side Plank Hip Dips Calisthenics" }
];

if (typeof window !== "undefined") {
  window.uebungen_calisthenics_freeletics = uebungen_calisthenics_freeletics;
}
