// RE:MK Ausgelagerte Basis-Datenbanken (Entschlackt index.html um ~240 KB)
window.BUILTIN_EXERCISE_FALLBACK = [
      // BEINE: SQUAT & PRESS
      { id: "ex_sq1", name: "Langhantel Kniebeuge (Back Squat)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Langhantel Kniebeuge" },
      { id: "ex_sq2", name: "Goblet Squat (Kurzhantel / Kettlebell)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Goblet Squat" },
      { id: "ex_sq3", name: "Frontkniebeuge (Front Squat)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["kraft", "athletik"], link: "Frontkniebeuge" },
      { id: "ex_sq4", name: "Tempo Bodyweight Squats (3-1-1)", mechanic: "leg_squat", equip: ["bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Bodyweight Squat" },
      { id: "ex_t4_sq5", name: "Box Squats (Gelenk- & Knieschonend)", mechanic: "leg_squat", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft"], link: "Box Squats" },
      { id: "ex_lp1", name: "Beinpresse 45°", mechanic: "leg_press", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Beinpresse 45 Grad" },
      { id: "ex_lp2", name: "Hackenschmidt-Kniebeuge (Maschine)", mechanic: "leg_press", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Hack Squat Maschine" },
      { id: "ex_lp3", name: "Kurzhantel Thrusters / Kniebeuge", mechanic: "leg_press", equip: ["homegym"], goal: ["muskelaufbau", "athletik"], link: "Dumbbell Squat" },
      { id: "ex_lp4", name: "Sissy Squats / Wand-Sitz (Wall Sit)", mechanic: "leg_press", equip: ["bodyweight"], goal: ["muskelaufbau", "kraft"], link: "Wall Sit Übung" },
      // BEINE: UNILATERAL
      { id: "ex_uni1", name: "Bulgarian Split Squats", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Bulgarian Split Squats" },
      { id: "ex_uni2", name: "Reverse Lunges (Ausfallschritte rückwärts)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Reverse Lunges" },
      { id: "ex_t4_uni3", name: "Step-Ups auf Bank / Box (Knieschonend)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Step Ups Übung" },
      { id: "ex_uni4", name: "Cossack Squats (Seitliche Ausfallschritte)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "muskelaufbau"], link: "Cossack Squat" },
      // HINTERE KETTE: HINGE & CURL
      { id: "ex_phing1", name: "Rumänisches Kreuzheben (RDL)", mechanic: "pull_hinge", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Rumänisches Kreuzheben" },
      { id: "ex_phing2", name: "Klassisches Kreuzheben (Deadlift)", mechanic: "pull_hinge", equip: ["gym", "homegym"], goal: ["kraft", "muskelaufbau"], link: "Kreuzheben Technik" },
      { id: "ex_t4_phing3", name: "Hip Thrusts / Glute Bridge (Rücken-schonend)", mechanic: "pull_hinge", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Hip Thrusts" },
      { id: "ex_phing4", name: "Einbeinige Glute Bridge (Single-Leg)", mechanic: "pull_hinge", equip: ["bodyweight", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Single Leg Glute Bridge" },
      { id: "ex_curl1", name: "Beinbeuger Maschine (Sitzend / Liegend)", mechanic: "leg_curl", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Leg Curl Maschine" },
      { id: "ex_curl2", name: "Nordic Hamstring Curls / Sliding Leg Curls", mechanic: "leg_curl", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Sliding Leg Curl" },
      { id: "ex_calf1", name: "Wadenheben stehend (Langhantel / Maschine)", mechanic: "leg_calf", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Wadenheben stehend" },
      { id: "ex_calf2", name: "Einbeiniges Wadenheben an Stufe", mechanic: "leg_calf", equip: ["bodyweight", "homegym", "gym"], goal: ["muskelaufbau", "athletik"], link: "Einbeiniges Wadenheben" },
      // PUSH HORIZONTAL
      { id: "ex_ph1", name: "Bankdrücken (Langhantel)", mechanic: "push_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Bankdrücken Langhantel" },
      { id: "ex_ph2", name: "Kurzhantel-Schrägbankdrücken", mechanic: "push_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Kurzhantel Schrägbankdrücken" },
      { id: "ex_t4_ph3", name: "Floor Press / Kurzhantel-Bankdrücken neutral (Schulterschonend)", mechanic: "push_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Dumbbell Floor Press" },
      { id: "ex_ph4", name: "Liegestütze (Push-Ups / erhöht / beschwert)", mechanic: "push_horiz", equip: ["bodyweight", "homegym", "gym"], goal: ["muskelaufbau", "athletik", "kraft"], link: "Saubere Liegestütze" },
      { id: "ex_ph5", name: "Brustpresse (Maschine)", mechanic: "push_horiz", equip: ["gym"], goal: ["muskelaufbau"], link: "Brustpresse Maschine" },
      // PUSH VERTIKAL
      { id: "ex_pv1", name: "Schulterdrücken (Kurzhantel sitzend/stehend)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Kurzhantel Schulterdrücken" },
      { id: "ex_pv2", name: "Military Press (Langhantel Überkopfdrücken)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["kraft", "muskelaufbau"], link: "Military Press" },
      { id: "ex_t4_pv3", name: "Landmine Press / Schräg-Drücken (Schulterschonend)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Landmine Press" },
      { id: "ex_pv4", name: "Pike Push-Ups (Schulter-Liegestütze)", mechanic: "push_vert", equip: ["bodyweight", "homegym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Pike Push Ups" },
      // PUSH ISOLATION
      { id: "ex_pi1", name: "Seitenheben (Kurzhantel / Kabelzug)", mechanic: "push_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Seitenheben Kurzhantel" },
      { id: "ex_pi2", name: "Trizeps-Pushdowns am Kabelzug / Band", mechanic: "push_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Trizeps Pushdown" },
      { id: "ex_pi3", name: "French Press / Kurzhantel-Trizepsstrecken", mechanic: "push_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "French Press Kurzhantel" },
      { id: "ex_pi4", name: "Diamond Push-Ups / Bench Dips", mechanic: "push_iso", equip: ["bodyweight", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Diamond Push Ups" },
      // PULL VERTIKAL
      { id: "ex_pullv1", name: "Klimmzüge (Obergriff / Untergriff)", mechanic: "pull_vert", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Klimmzüge Ausführung" },
      { id: "ex_pullv2", name: "Latzug breit zur Brust", mechanic: "pull_vert", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Latzug zur Brust" },
      { id: "ex_pullv3", name: "Kurzhantel-Überzüge (Pullovers)", mechanic: "pull_vert", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Kurzhantel Überzüge" },
      { id: "ex_pullv4", name: "Sliding Floor Pulldowns / Tür-Zug", mechanic: "pull_vert", equip: ["bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Sliding Floor Pulldown" },
      // PULL HORIZONTAL
      { id: "ex_pullh1", name: "Langhantel-Rudern vorgebeugt", mechanic: "pull_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Langhantel Rudern" },
      { id: "ex_t4_pullh2", name: "Einarmiges Kurzhantel-Rudern aufgestützt (Rücken-schonend)", mechanic: "pull_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Einarmiges Kurzhantelrudern" },
      { id: "ex_pullh3", name: "Kabelrudern eng / Brustgestütztes Rudern", mechanic: "pull_horiz", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Kabelrudern eng" },
      { id: "ex_pullh4", name: "Australian Pull-Ups (Tisch-/Stangen-Rudern)", mechanic: "pull_horiz", equip: ["bodyweight", "homegym", "gym"], goal: ["muskelaufbau", "athletik"], link: "Inverted Row" },
      // PULL ISOLATION
      { id: "ex_pulli1", name: "Bizepscurls (Kurzhantel / SZ-Stange)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Bizepscurls Kurzhantel" },
      { id: "ex_pulli2", name: "Hammercurls (Neutralgriff)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Hammercurls" },
      { id: "ex_t4_pulli3", name: "Face Pulls / Y-T-W Schulter-Prehab", mechanic: "pull_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Face Pulls Ausführung" },
      // CORE
      { id: "ex_core1", name: "Unterarmstütz (RKC Plank)", mechanic: "core_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "RKC Plank" },
      { id: "ex_t4_core2", name: "Bird-Dog & Beckenboden-Aktivierung", mechanic: "core_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Bird Dog Übung" },
      { id: "ex_core3", name: "Dead Bugs / Beinheben kontrolliert", mechanic: "core_flex", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Dead Bug Übung" },
      { id: "ex_core4", name: "Hanging Leg Raises / Ab-Rollouts", mechanic: "core_flex", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Hanging Leg Raises" },
      { id: "ex_core5", name: "Pallof Press / Russian Twists", mechanic: "core_rot", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "muskelaufbau"], link: "Pallof Press" },
      { id: "ex_core6", name: "Seitstütz (Side Plank) mit Hüftheben", mechanic: "core_rot", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "muskelaufbau"], link: "Side Plank" },
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
  { id: "ex_ab_uni6", name: "Curtsy Lunges (Überkreuz-Ausfallschritt für Gluteus Medius)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Curtsy Lunges" },
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
  { id: "ex_ahk_lc3", name: "Gymnastikball (Swiss-Ball) Hamstring Curls (Hüfte gestreckt)", mechanic: "leg_curl", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Stability Ball Hamstring Curl" },
  { id: "ex_ahk_lc4", name: "Kurzhantel-Beinbeugen zwischen den Füßen (Liegend auf Bank)", mechanic: "leg_curl", equip: ["homegym", "gym"], goal: ["muskelaufbau"], link: "Dumbbell Leg Curl" },
  { id: "ex_t4_ahk_lc5", name: "Isometrische Hamstring-Brücke (Fersen-Druck in 30° & 90° Kniewinkel)", mechanic: "leg_curl", equip: ["bodyweight", "homegym", "gym"], goal: ["kraft", "athletik"], link: "Isometric Hamstring Bridge" },

  // --- WADEN & SPRUNGGELENK (leg_calf) ---
  { id: "ex_ahk_cf1", name: "Sitzendes Wadenheben (Seated Calf Raise – Fokus Schollenmuskel/Soleus)", mechanic: "leg_calf", equip: ["gym", "homegym"], goal: ["muskelaufbau", "kraft"], link: "Sitzendes Wadenheben" },
  { id: "ex_ahk_cf2", name: "Wadenheben an der 45°-Beinpresse (Große Dehnung)", mechanic: "leg_calf", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Calf Press Leg Press" },
  { id: "ex_t4_ahk_cf3", name: "Tibialis Raises an der Wand (Schienbein-Stärkung gegen Schienbeinkantensyndrom)", mechanic: "leg_calf", equip: ["bodyweight", "homegym", "gym"], goal: ["athletik", "muskelaufbau"], link: "Tibialis Raise Wall" },
  { id: "ex_ahk_cf4", name: "Pogo-Hops & gebeugtes Soleus-Wadenheben an der Stufe (Achillessehnen-Stabi)", mechanic: "leg_calf", equip: ["bodyweight", "homegym", "gym"], goal: ["athletik", "muskelaufbau"], link: "Bent Knee Calf Raise" },
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
  { id: "ex_ap_pi6", name: "Bodyweight Trizeps-Extensions an Stange / Tischkante", mechanic: "push_iso", equip: ["bodyweight", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Bodyweight Tricep Extension" },
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
  { id: "ex_apl_pi6", name: "Zottman Curls (Bizeps + brachioradialis & Unterarm-Griffkraft)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["kraft", "athletik", "muskelaufbau"], link: "Zottman Curl" },
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

    window.BUILTIN_RECIPE_FALLBACK = [
      // FRÜHSTÜCK
      { name: "High-Protein Haferflocken-Bowl mit Beeren", type: "classic", category: "athlet", prep: "schnell", tools: ["Topf", "Schüssel"], mealCategory: "Frühstück", cals: 600, prot: 45, carbs: 72, fat: 12, gluten: false, lactose: false, ingredients: [{name: "Haferflocken", amount: 100, unit: "g", department: "Getreide"}, {name: "Whey Protein / Isolat", amount: 35, unit: "g", department: "Supplemente"}, {name: "Beerenmix (TK oder frisch)", amount: 100, unit: "g", department: "Obst"}, {name: "Mandelmilch / Milch", amount: 250, unit: "ml", department: "Milchprodukte"}], steps: ["Haferflocken mit Flüssigkeit kurz aufkochen oder quellen lassen.", "Proteinpulver und Beeren unterrühren."] },
      { name: "Herzhaftes Sportler-Rührei mit Vollkornbrot", type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne"], mealCategory: "Frühstück", cals: 580, prot: 38, carbs: 46, fat: 24, gluten: true, lactose: false, ingredients: [{name: "Eier", amount: 3, unit: "Stück", department: "Eier & Milch"}, {name: "Putenbrust-Schinken", amount: 60, unit: "g", department: "Fleisch & Wurst"}, {name: "Vollkornbrot", amount: 100, unit: "g", department: "Brot"}, {name: "Tomaten", amount: 100, unit: "g", department: "Gemüse"}], steps: ["Putenbrust und Eier in der Pfanne zu saftigem Rührei braten.", "Auf getoastetem Vollkornbrot mit Tomaten servieren."] },
      { name: "Skyr-Knusper-Bowl mit Banane & Walnüssen", type: "veggie", category: "schicht", prep: "nocook", tools: ["Schüssel"], mealCategory: "Frühstück", cals: 540, prot: 42, carbs: 58, fat: 14, gluten: false, lactose: false, ingredients: [{name: "Skyr natur", amount: 300, unit: "g", department: "Milchprodukte"}, {name: "Haferflocken", amount: 50, unit: "g", department: "Getreide"}, {name: "Banane", amount: 120, unit: "g", department: "Obst"}, {name: "Walnüsse", amount: 20, unit: "g", department: "Nüsse"}], steps: ["Skyr glattrühren.", "Banane in Scheiben schneiden und mit Haferflocken und Walnüssen toppen."] },
      { name: "Vegane Overnight-Oats mit Soja-Skyr & Chia", type: "veggie", category: "schicht", prep: "nocook", tools: ["Glas / Dose"], mealCategory: "Frühstück", cals: 550, prot: 34, carbs: 68, fat: 14, gluten: false, lactose: false, ingredients: [{name: "Haferflocken", amount: 90, unit: "g", department: "Getreide"}, {name: "Vegan Protein", amount: 30, unit: "g", department: "Supplemente"}, {name: "Haferdrink", amount: 250, unit: "ml", department: "Pflanzendrinks"}, {name: "Chiasamen", amount: 15, unit: "g", department: "Saaten"}], steps: ["Alle Zutaten in einer Dose verrühren.", "Über Nacht (oder 20 Min.) quellen lassen."] },
      // MITTAGESSEN
      { name: "Hähnchenbrust mit Basmatireis & Brokkoli", type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen", cals: 750, prot: 56, carbs: 88, fat: 14, gluten: false, lactose: false, ingredients: [{name: "Hähnchenbrustfilet", amount: 200, unit: "g", department: "Fleisch"}, {name: "Basmatireis", amount: 120, unit: "g", department: "Getreide"}, {name: "Brokkoli", amount: 200, unit: "g", department: "Gemüse"}, {name: "Olivenöl", amount: 10, unit: "ml", department: "Öle"}], steps: ["Reis nach Packungsanweisung kochen.", "Hähnchen in Streifen schneiden und in Olivenöl goldbraun anbraten.", "Brokkoli dünsten und alles anrichten."] },
      { name: "Mageres Rinderhack-Reispfanne (Monster Mash)", type: "classic", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen", cals: 780, prot: 52, carbs: 84, fat: 22, gluten: false, lactose: false, ingredients: [{name: "Rinderhackfleisch (mager)", amount: 180, unit: "g", department: "Fleisch"}, {name: "Jasminreis", amount: 120, unit: "g", department: "Getreide"}, {name: "Paprika & Zucchini", amount: 200, unit: "g", department: "Gemüse"}, {name: "Rinderbrühe", amount: 150, unit: "ml", department: "Vorrat"}], steps: ["Reis kochen.", "Rinderhack und gewürfeltes Gemüse scharf anbraten.", "Mit etwas Brühe ablöschen und Reis unterheben."] },
      { name: "Familien-Bolognese mit Vollkorn-Pasta & Pute", type: "classic", category: "familie", prep: "schnell", tools: ["Topf", "Pfanne"], mealCategory: "Mittagessen", cals: 740, prot: 50, carbs: 90, fat: 16, gluten: true, lactose: false, ingredients: [{name: "Putenhackfleisch", amount: 180, unit: "g", department: "Fleisch"}, {name: "Vollkornnudeln", amount: 120, unit: "g", department: "Getreide"}, {name: "Passierte Tomaten", amount: 250, unit: "g", department: "Konserven"}, {name: "Karotten", amount: 100, unit: "g", department: "Gemüse"}], steps: ["Nudeln al dente kochen.", "Putenhack mit fein gewürfelten Karotten anbraten, Tomaten zugeben und 10 Min. köcheln."] },
      { name: "Veganes Rote-Linsen-Curry mit Basmatireis", type: "veggie", category: "schicht", prep: "schnell", tools: ["Topf"], mealCategory: "Mittagessen", cals: 700, prot: 38, carbs: 94, fat: 16, gluten: false, lactose: false, ingredients: [{name: "Rote Linsen", amount: 120, unit: "g", department: "Hülsenfrüchte"}, {name: "Kokosmilch light", amount: 150, unit: "ml", department: "Asiatisch"}, {name: "Basmatireis", amount: 100, unit: "g", department: "Getreide"}, {name: "Blattspinat", amount: 150, unit: "g", department: "Gemüse"}], steps: ["Reis und Linsen garen.", "Kokosmilch, Currypaste und Spinat zu den Linsen geben und 5 Min. ziehen lassen."] },
      { name: "Knusprige Tofu-Teriyaki-Bowl mit Edamame & Reis", type: "veggie", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen", cals: 690, prot: 42, carbs: 82, fat: 18, gluten: false, lactose: false, ingredients: [{name: "Räuchertofu", amount: 180, unit: "g", department: "Kühlregal"}, {name: "Edamame (geschält)", amount: 80, unit: "g", department: "Hülsenfrüchte"}, {name: "Basmatireis", amount: 110, unit: "g", department: "Getreide"}, {name: "Brokkoli", amount: 150, unit: "g", department: "Gemüse"}], steps: ["Tofu würfeln und knusprig anbraten.", "Mit Reis, Edamame und gedämpftem Brokkoli in einer Bowl anrichten."] },
      // SNACK
      { name: "Vollkornbrot mit Magerquark & Putenbrust", type: "classic", category: "rustikal", prep: "nocook", tools: ["Messer"], mealCategory: "Snack", cals: 450, prot: 36, carbs: 48, fat: 8, gluten: true, lactose: false, ingredients: [{name: "Vollkornbrot", amount: 120, unit: "g", department: "Brot"}, {name: "Magerquark", amount: 150, unit: "g", department: "Milchprodukte"}, {name: "Putenbrust Aufschnitt", amount: 80, unit: "g", department: "Fleisch & Wurst"}], steps: ["Brot dick mit gewürztem Magerquark bestreichen.", "Mit Putenbrust belegen."] },
      { name: "Pre-/Post-Workout Reiswaffel-Shake-Kombi", type: "classic", category: "kampfsport", prep: "nocook", tools: ["Shaker"], mealCategory: "Snack", cals: 420, prot: 38, carbs: 52, fat: 6, gluten: false, lactose: false, ingredients: [{name: "Reiswaffeln", amount: 50, unit: "g", department: "Getreide"}, {name: "Whey Isolat / Protein", amount: 40, unit: "g", department: "Supplemente"}, {name: "Banane", amount: 120, unit: "g", department: "Obst"}], steps: ["Proteinpulver mit Wasser im Shaker mixen.", "Dazu Reiswaffeln und Banane essen."] },
      { name: "Hüttenkäse-Kräuter-Dip mit Gemüsesticks & Knäckebrot", type: "veggie", category: "schicht", prep: "nocook", tools: ["Schüssel"], mealCategory: "Snack", cals: 380, prot: 32, carbs: 36, fat: 10, gluten: true, lactose: false, ingredients: [{name: "Körniger Frischkäse (Hüttenkäse)", amount: 200, unit: "g", department: "Milchprodukte"}, {name: "Vollkorn-Knäckebrot", amount: 50, unit: "g", department: "Brot"}, {name: "Gurke & Paprika", amount: 150, unit: "g", department: "Gemüse"}], steps: ["Hüttenkäse mit Pfeffer und Schnittlauch würzen.", "Mit Gemüsesticks und Knäckebrot genießen."] },
      { name: "Veganer Protein-Smoothie mit Hafer & Beeren", type: "veggie", category: "athlet", prep: "nocook", tools: ["Shaker / Mixer"], mealCategory: "Snack", cals: 410, prot: 34, carbs: 48, fat: 8, gluten: false, lactose: false, ingredients: [{name: "Vegan Protein", amount: 35, unit: "g", department: "Supplemente"}, {name: "Zarte Haferflocken", amount: 50, unit: "g", department: "Getreide"}, {name: "Beerenmix", amount: 100, unit: "g", department: "Obst"}, {name: "Mandeldrink", amount: 250, unit: "ml", department: "Pflanzendrinks"}], steps: ["Alle Zutaten kräftig mixen oder shaken."] },
      // ABENDESSEN
      { name: "Ofen-Lachsfilet mit Rosmarinkartoffeln & grünen Bohnen", type: "classic", category: "familie", prep: "ofen", tools: ["Backofen"], mealCategory: "Abendessen", cals: 700, prot: 48, carbs: 58, fat: 26, gluten: false, lactose: false, ingredients: [{name: "Lachsfilet", amount: 180, unit: "g", department: "Fisch"}, {name: "Kartoffeln", amount: 300, unit: "g", department: "Gemüse"}, {name: "Grüne Bohnen", amount: 180, unit: "g", department: "Gemüse"}], steps: ["Kartoffeln halbieren und mit dem Lachs und den Bohnen bei 200 °C im Ofen ca. 25 Min. backen."] },
      { name: "Hähnchen-Kartoffel-Ofenblech mit mediterranem Gemüse", type: "classic", category: "familie", prep: "ofen", tools: ["Backofen"], mealCategory: "Abendessen", cals: 660, prot: 52, carbs: 64, fat: 18, gluten: false, lactose: false, ingredients: [{name: "Hähnchenbrust", amount: 200, unit: "g", department: "Fleisch"}, {name: "Kartoffeln (Drillinge)", amount: 280, unit: "g", department: "Gemüse"}, {name: "Zucchini & Paprika", amount: 200, unit: "g", department: "Gemüse"}, {name: "Olivenöl", amount: 10, unit: "ml", department: "Öle"}], steps: ["Alles mundgerecht schneiden, auf einem Backblech verteilen, würzen und 25 Min. bei 200 °C backen."] },
      { name: "Thunfisch-Salat-Bowl mit Ei & Ofenkartoffeln", type: "classic", category: "schicht", prep: "schnell", tools: ["Schüssel", "Topf"], mealCategory: "Abendessen", cals: 620, prot: 50, carbs: 54, fat: 18, gluten: false, lactose: false, ingredients: [{name: "Thunfisch im eigenen Saft", amount: 150, unit: "g", department: "Fisch"}, {name: "Eier (gekocht)", amount: 2, unit: "Stück", department: "Eier & Milch"}, {name: "Kartoffeln", amount: 250, unit: "g", department: "Gemüse"}, {name: "Blattsalat & Gurke", amount: 150, unit: "g", department: "Gemüse"}], steps: ["Kartoffeln und Eier kochen.", "Mit Thunfisch und knackigem Salat anrichten."] },
      { name: "Vegetarische Süßkartoffel-Kichererbsen-Ofenpfanne mit Feta", type: "veggie", category: "familie", prep: "ofen", tools: ["Backofen"], mealCategory: "Abendessen", cals: 670, prot: 36, carbs: 74, fat: 22, gluten: false, lactose: false, ingredients: [{name: "Süßkartoffel", amount: 250, unit: "g", department: "Gemüse"}, {name: "Kichererbsen (Abtropfgewicht)", amount: 150, unit: "g", department: "Hülsenfrüchte"}, {name: "Feta light / Hirtenkäse", amount: 100, unit: "g", department: "Milchprodukte"}, {name: "Spinat", amount: 120, unit: "g", department: "Gemüse"}], steps: ["Süßkartoffelwürfel und Kichererbsen 20 Min. im Ofen rösten.", "Mit Feta zerbröselt und Spinat servieren."] },
      { name: "Vegane Kichererbsen-Kartoffel-Pfanne mit Tahini", type: "veggie", category: "rustikal", prep: "schnell", tools: ["Pfanne"], mealCategory: "Abendessen", cals: 640, prot: 32, carbs: 78, fat: 20, gluten: false, lactose: false, ingredients: [{name: "Kartoffeln", amount: 280, unit: "g", department: "Gemüse"}, {name: "Kichererbsen", amount: 160, unit: "g", department: "Hülsenfrüchte"}, {name: "Räuchertofu", amount: 120, unit: "g", department: "Kühlregal"}, {name: "Brokkoli", amount: 180, unit: "g", department: "Gemüse"}], steps: ["Kartoffeln, Tofu und Kichererbsen in der Pfanne goldbraun anbraten.", "Brokkoli zugeben und kurz mitdünsten."] },
      // --- ZUSÄTZLICHE FILTER-SPEZIFISCHE GERICHTE (RUSTIKAL, ATHLET, SCHICHT, KAMPFSPORT, FAMILIE) ---
      // --- MITTAGESSEN (CLASSIC, FISCH, QUARK/EI, VEGGIE & VEGAN | SCHNELL, OFEN, NOCOOK) ---
  {
    id: "rf_rus_m1", name: "Deftige Rinder-Minutensteaks mit Senf-Zwiebel-Kruste & Salzkartoffeln",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 680, prot: 54, carbs: 68, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Rinder-Minutensteaks (mager, Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln (festkochend, Rohgewicht)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Grüne Bohnen (frisch oder TK)", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Zwiebel & mittelscharfer Senf", amount: 50, unit: "g", department: "Vorrat" },
      { name: "Raps- oder Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Salzkartoffeln (Ohne Butter-Falle): Kartoffeln schälen, halbieren und in Salzwasser 18 Min. garen. Abgießen und mit frischer Petersilie schwenken (keine Butter zugeben!).",
      "🥩 Minutensteaks dünn mit Senf bestreichen, in einer beschichteten Pfanne mit dem abgemessenen Öl je Seite 2 Min. scharf anbraten, herausnehmen und Zwiebelringe im Bratensatz mit 3 EL Wasser glasig schmoren.",
      "🥦 Grüne Bohnen in Salzwasser 8 Min. bissfest garen, mit Bohnenkraut würzen und zusammen anrichten."
    ]
  },
  {
    id: "rf_rus_m2", name: "Rustikale Hähnchen-Bratkartoffel-Pfanne mit Spiegelei & Gewürzgurke",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 690, prot: 56, carbs: 64, fat: 20, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 180, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Ei (Größe M)", amount: 1, unit: "Stück", department: "Eier & Milch" },
      { name: "Gewürzgurken & Zwiebelwürfel", amount: 100, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Fitness-Bratkartoffeln: Kartoffeln in Scheiben schneiden, 10 Min. vorkochen, abkühlen lassen und in der beschichteten Pfanne mit exakt dem abgewogenen Öl knusprig braten.",
      "🍗 Hähnchenwürfel und Zwiebeln direkt mitbraten, mit Majoran, Paprikapulver, Salz und Pfeffer würzen.",
      "🍳 Zum Schluss das Spiegelei in der Pfannenmitte stocken lassen und mit knackigen Gewürzgurken servieren."
    ]
  },
  {
    id: "rf_rus_m3", name: "Ofen-Kassler vom Putenrücken auf Sauerkraut & Kartoffelstampf (Light)",
    type: "classic", category: "rustikal", prep: "ofen", tools: ["Backofen", "Topf"], mealCategory: "Mittagessen",
    cals: 640, prot: 52, carbs: 70, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Magerer Puten-Kassler oder Hähnchenbrustfilet", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln (mehligkochend, Rohgewicht für Stampf)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Weinsauerkraut (mild, Abtropfgewicht)", amount: 220, unit: "g", department: "Konserven" },
      { name: "Fettarme Milch 1,5% oder Kochwasser (für Stampf)", amount: 60, unit: "ml", department: "Milchprodukte" }
    ],
    steps: [
      "🔥 Sauerkraut mit 50 ml Wasser, Lorbeerblatt und Wacholderbeeren in eine Auflaufform geben, das magere Fleisch darauflegen und bei 190 °C Umluft 20 Min. im Ofen saftig garen.",
      "🥔 Fitness-Kartoffelstampf (Ohne Butter-Falle!): Kartoffeln schälen, würfeln und 18 Min. in Salzwasser weich kochen. Abgießen und NUR mit der abgemessenen Milch (oder Kochwasser), Salz & Muskatnuss cremig stampfen – keine zusätzliche Butter unterrühren!"
    ]
  },
  {
    id: "rf_rus_m4", name: "Norddeutsche Seelachs-Senf-Pfanne mit Dill-Kartoffeln & Gurkensalat",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 620, prot: 48, carbs: 68, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Alaska-Seelachsfilet oder Kabeljau (Rohgewicht)", amount: 220, unit: "g", department: "Fisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Salatgurke & frischer Dill", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur & körniger Senf (für leichte Senfsauce)", amount: 80, unit: "g", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Kartoffeln in Salzwasser 18 Min. garen und mit frischem Dill bestreuen.",
      "🐟 Seelachsfilet trocken tupfen, mit Zitronensaft und Salz würzen und im abgewogenen Öl je Seite 3–4 Min. braten.",
      "🥄 Für die kalorienarme Senfsauce 50 ml Gemüsebrühe mit Skyr und Senf kurz in der Resthitze verrühren (nicht stark kochen). Gurke hobeln und als frischen Salat dazu reichen."
    ]
  },
  {
    id: "rf_rus_m5", name: "Brot & Eisen Kraft-Vesper: Doppeldecker mit Putenbrust, Ei & Hüttenkäse",
    type: "classic", category: "rustikal", prep: "nocook", tools: ["Brett", "Messer"], mealCategory: "Mittagessen",
    cals: 650, prot: 52, carbs: 66, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Roggen-Sauerteigbrot oder Vollkornbrot", amount: 150, unit: "g", department: "Brot" },
      { name: "Putenbrust-Aufschnitt", amount: 100, unit: "g", department: "Fleisch & Wurst" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Ei (hartgekocht)", amount: 1, unit: "Stück", department: "Eier & Milch" },
      { name: "Tomaten, Gurke & Radieschen", amount: 180, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🥖 Brotscheiben dick mit körnigem Frischkäse bestreichen und mit Pfeffer sowie Schnittlauch würzen.",
      "🍗 Mit Putenbrust und Ei-Scheiben belegen, das knackige Rohkost-Gemüse dazu essen – 0 Minuten Kochzeit!"
    ]
  },
  {
    id: "rf_rus_m6", name: "Hausmannskost: Pellkartoffeln mit Kräuterquark-Berg & 2 Wachsweichen Eiern",
    type: "veggie", category: "rustikal", prep: "schnell", tools: ["Topf", "Schüssel"], mealCategory: "Mittagessen",
    cals: 630, prot: 46, carbs: 68, fat: 16, gluten: false, lactose: false,
    ingredients: [
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 340, unit: "g", department: "Gemüse" },
      { name: "Magerquark / Skyr", amount: 250, unit: "g", department: "Milchprodukte" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Leinöl", amount: 8, unit: "ml", department: "Öle" },
      { name: "Gartenkräuter, Zwiebelwürfel & Gurke", amount: 120, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🥔 Kartoffeln in der Schale ca. 18–20 Min. garen. Eier in den letzten 7 Min. mitkochen.",
      "🥣 Magerquark mit einem Schuss Mineralwasser, feinen Zwiebelwürfeln, Kräutern, Salz und Pfeffer cremig rühren.",
      "🥑 Zum Schluss das kaltgepresste Leinöl über den Quark träufeln und mit den heißen Kartoffeln und halbierten Eiern servieren."
    ]
  },
  {
    id: "rf_rus_m7", name: "Deftiger Schwäbischer Linsen-Kartoffel-Topf mit Räuchertofu",
    type: "veggie", category: "rustikal", prep: "schnell", tools: ["Topf", "Pfanne"], mealCategory: "Mittagessen",
    cals: 660, prot: 40, carbs: 82, fat: 16, gluten: false, lactose: false,
    ingredients: [
      { name: "Braune oder Beluga-Linsen (Trockengewicht)", amount: 90, unit: "g", department: "Hülsenfrüchte" },
      { name: "Kartoffeln (Rohgewicht)", amount: 240, unit: "g", department: "Gemüse" },
      { name: "Räuchertofu", amount: 150, unit: "g", department: "Kühlregal" },
      { name: "Karotten, Lauch & Sellerie (Suppengemüse)", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & 1 EL Apfelessig", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌱 Linsen, gewürfelte Kartoffeln und Suppengemüse in Gemüsebrühe ca. 20 Min. sämig köcheln.",
      "🔥 Räuchertofu in Scheiben oder Würfel schneiden und im abgewogenen Öl in der Pfanne kräftig anrösten.",
      "🍽️ Linseneintopf klassisch mit einem Schuss Essig, Senf, Salz und Pfeffer abschmecken und den knusprigen Räuchertofu darauf anrichten."
    ]
  },
  {
    id: "rf_rus_m8", name: "Ofen-Wurzelgemüse & Kartoffel-Gratin mit herzhafter Linsen-Kruste (Vegan)",
    type: "veggie", category: "rustikal", prep: "ofen", tools: ["Backofen", "Auflaufform"], mealCategory: "Mittagessen",
    cals: 640, prot: 34, carbs: 88, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Kartoffeln (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Rote Linsen (Trockengewicht)", amount: 90, unit: "g", department: "Hülsenfrüchte" },
      { name: "Passierte Tomaten", amount: 200, unit: "g", department: "Konserven" },
      { name: "Karotten & Brokkoli", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Kürbiskerne & Olivenöl", amount: 20, unit: "g", department: "Nüsse" }
    ],
    steps: [
      "🔥 Kartoffeln und Karotten in dünne Scheiben schneiden, mit den ungekochten roten Linsen, Brokkoliröschen, passierten Tomaten und 180 ml Gemüsebrühe in einer Auflaufform mischen.",
      "🌱 Mit Majoran, Knoblauch, Salz und Pfeffer würzen, Kürbiskerne darüberstreuen und bei 200 °C Umluft ca. 30 Min. im Ofen backen."
    ]
  },

  // --- ABENDESSEN (RUSTIKAL) ---
  {
    id: "rf_rus_a1", name: "Zwiebel-Rumpsteak aus der Pfanne mit Ofen-Drillingen & Buschbohnen",
    type: "classic", category: "rustikal", prep: "ofen", tools: ["Pfanne", "Backofen"], mealCategory: "Abendessen",
    cals: 690, prot: 58, carbs: 62, fat: 20, gluten: false, lactose: false,
    ingredients: [
      { name: "Rumpsteak (mager, Rohgewicht)", amount: 220, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Grüne Bohnen", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Zwiebelringe", amount: 80, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 10, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Drillinge halbieren, mit 5 ml Öl, Rosmarin und Salz mischen und bei 200 °C Umluft 25 Min. im Ofen rösten.",
      "🥩 Rumpsteak in den restlichen 5 ml Öl je Seite 2–3 Min. scharf anbraten, herausnehmen und Zwiebelringe im Bratensatz schmoren (keine Kräuterbutter verwenden!).",
      "🥦 Bohnen gedünstet dazu servieren."
    ]
  },
  {
    id: "rf_rus_a2", name: "Bayerischer Wurst-/Käsesalat Light mit Putenbrust, Hirtenkäse & Bauernbrot",
    type: "classic", category: "rustikal", prep: "nocook", tools: ["Schüssel", "Messer"], mealCategory: "Abendessen",
    cals: 610, prot: 50, carbs: 56, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet-Aufschnitt (dick geschnitten)", amount: 140, unit: "g", department: "Fleisch & Wurst" },
      { name: "Feta light / Hirtenkäse", amount: 80, unit: "g", department: "Milchprodukte" },
      { name: "Vollkornbrot", amount: 120, unit: "g", department: "Brot" },
      { name: "Gewürzgurken, rote Zwiebel & Radieschen", amount: 150, unit: "g", department: "Gemüse" },
      { name: "Olivenöl, Gurkenwasser & Senf", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥗 Putenbrust, Hirtenkäse light und Gewürzgurken in feine Streifen schneiden.",
      "🥄 Aus Gurkenwasser, 1 TL Senf, dem abgemessenen Öl, Salz, Pfeffer und Schnittlauch ein leichtes Dressing rühren und mit dem frischen Bauernbrot genießen."
    ]
  },
  {
    id: "rf_rus_a3", name: "Gebackenes Forellen-/Lachsfilet aus dem Ofen mit Petersilienkartoffeln",
    type: "classic", category: "rustikal", prep: "ofen", tools: ["Backofen", "Topf"], mealCategory: "Abendessen",
    cals: 640, prot: 48, carbs: 58, fat: 22, gluten: false, lactose: false,
    ingredients: [
      { name: "Lachsfilet oder Forellenfilet", amount: 180, unit: "g", department: "Fisch" },
      { name: "Kartoffeln (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Brokkoli", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Zitrone & frische Petersilie", amount: 30, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🐟 Fischfilet mit Zitronensaft, Salz und Pfeffer im Ofen bei 190 °C ca. 15–18 Min. saftig backen.",
      "🥔 Kartoffeln und Brokkoli in Salzwasser garen und mit frischer Petersilie anrichten."
    ]
  },
  {
    id: "rf_rus_a4", name: "Rustikale Kichererbsen-Kraut-Pfanne mit Kümmel & Bauernbrot (Vegan)",
    type: "veggie", category: "rustikal", prep: "schnell", tools: ["Pfanne"], mealCategory: "Abendessen",
    cals: 590, prot: 32, carbs: 76, fat: 15, gluten: true, lactose: false,
    ingredients: [
      { name: "Kichererbsen", amount: 180, unit: "g", department: "Hülsenfrüchte" },
      { name: "Räuchertofu", amount: 120, unit: "g", department: "Kühlregal" },
      { name: "Spitzkohl oder Weißkohl (fein geschnitten)", amount: 250, unit: "g", department: "Gemüse" },
      { name: "Vollkornbrot", amount: 100, unit: "g", department: "Brot" },
      { name: "Olivenöl & Kümmel", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌱 Räuchertofu und Kichererbsen im abgewogenen Öl in der Pfanne 4 Min. scharf anbraten.",
      "🥬 Geschnittenen Spitzkohl, Kümmel und 50 ml Gemüsebrühe zugeben, 8 Min. bissfest schmoren und mit dem kräftigen Vollkornbrot servieren."
    ]
  }
  ,
  // --- WEITERE FRÜHSTÜCKE, MITTAGESSEN, ABENDESSEN & SNACKS (FILTER: RUSTIKAL) ---
  {
    id: "rf_rus_f1", name: "Holzfäller-Bauernfrühstück: Kartoffel-Rührei-Pfanne mit Putenbrust & Schnittlauch",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne"], mealCategory: "Frühstück",
    cals: 590, prot: 44, carbs: 48, fat: 22, gluten: false, lactose: false,
    ingredients: [
      { name: "Eier (Größe M)", amount: 3, unit: "Stück", department: "Eier & Milch" },
      { name: "Kartoffeln (vorgegart oder Rohgewicht gewürfelt)", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Putenbrust-Schinken (mager)", amount: 80, unit: "g", department: "Fleisch & Wurst" },
      { name: "Gewürzgurke & frischer Schnittlauch", amount: 80, unit: "g", department: "Gemüse" },
      { name: "Rapsöl", amount: 6, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Kartoffelwürfel und Putenbrust-Streifen im abgemessenen Öl in einer beschichteten Pfanne 5 Min. goldbraun anrösten.",
      "🍳 Verquirlte Eier mit Salz, Pfeffer und Muskatnuss darübergeben, stocken lassen und mit Schnittlauch sowie Gewürzgurke servieren."
    ]
  },
  {
    id: "rf_rus_f2", name: "Rustikale Sauerteig-Stulle mit Harzer/Hüttenkäse, Rührei & Radieschen (Veggie)",
    type: "veggie", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Messer"], mealCategory: "Frühstück",
    cals: 560, prot: 42, carbs: 54, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Roggen-Sauerteigbrot", amount: 120, unit: "g", department: "Brot" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Radieschen & Schnittlauch", amount: 100, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🥖 Sauerteigbrot toasten und dick mit körnigem Frischkäse bestreichen.",
      "🍳 Eier in der beschichteten Pfanne ohne Zusatzfett zu saftigem Rührei braten, auf das Brot geben und mit Radieschenscheiben toppen."
    ]
  },
  {
    id: "rf_rus_m9", name: "Jäger-Hähnchenpfanne mit braunen Champignons, Zwiebeln & Salzkartoffeln",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 670, prot: 56, carbs: 70, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln (festkochend, Rohgewicht)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Braune Champignons & Zwiebel", amount: 240, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur & Gemüsebrühe (für leichte Jägersauce)", amount: 70, unit: "g", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Kartoffeln schälen und 18 Min. in Salzwasser garen (keine Butter zugeben!).",
      "🍄 Hähnchenfilet im abgewogenen Öl je Seite 4 Min. braten, herausnehmen. Champignons und Zwiebeln im Bratensatz kräftig rösten, mit 80 ml Brühe ablöschen und Skyr abseits der Hitze für eine cremige Light-Jägersauce einrühren."
    ]
  },
  {
    id: "rf_rus_m10", name: "Deftige Rinder-Gulasch-Pfanne (Schnell-Schmormethode) mit Spätzle & Rotkohl",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 710, prot: 54, carbs: 80, fat: 17, gluten: true, lactose: false,
    ingredients: [
      { name: "Mageres Rinderhüftsteak (in Gulaschwürfeln, Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Dinkel-Spätzle oder Vollkornnudeln (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Apfel-Rotkohl (vorgegart)", amount: 200, unit: "g", department: "Konserven" },
      { name: "Zwiebel, Tomatenmark & edelsüßer Paprika", amount: 70, unit: "g", department: "Vorrat" },
      { name: "Rapsöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥩 Zarte Rinderhüft-Würfel und Zwiebeln im heißen Öl 3 Min. scharf anbraten, Tomatenmark und viel Paprikapulver kurz mitrösten und mit 120 ml Rinder-/Gemüsebrühe 8 Min. sämig einköcheln.",
      "🍝 Spätzle in Salzwasser garen, Rotkohl erwärmen und zusammen servieren."
    ]
  },
  {
    id: "rf_rus_m11", name: "Ofen-Hackbraten (Meatloaf Light vom Rind/Pute) mit Ofenkartoffeln & Karotten",
    type: "classic", category: "rustikal", prep: "ofen", tools: ["Backofen", "Backblech"], mealCategory: "Mittagessen",
    cals: 680, prot: 58, carbs: 66, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Rindertatar oder mageres Putenhack (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Karotten", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Zarte Haferflocken & Senf (als Bindung im Hack)", amount: 25, unit: "g", department: "Getreide" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🔥 Hackfleisch mit Haferflocken, 1 TL Senf, Zwiebelwürfeln, Salz, Pfeffer und Majoran verkneten und zu einem kompakten Laib formen.",
      "🥔 Mit halbierten Kartoffeln und Karottenstiften (mit den 8 ml Öl beträufelt) auf ein Blech legen und bei 200 °C Umluft 25 Min. im Ofen backen."
    ]
  },
  {
    id: "rf_rus_m12", name: "Pescetarisches Matjes-/Räucherforellen-Hausfrauen-Teller mit Pellkartoffeln & Apfel-Joghurt",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Topf", "Schüssel"], mealCategory: "Mittagessen",
    cals: 630, prot: 46, carbs: 68, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Geräuchertes Forellenfilet oder milder Matjes", amount: 180, unit: "g", department: "Fisch" },
      { name: "Kartoffeln (festkochend, Rohgewicht)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur / Joghurt 1,5% (statt fetter Sahnesauce)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Apfel, Gewürzgurke & Zwiebelringe", amount: 150, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "🥔 Pellkartoffeln 18 Min. in Salzwasser kochen.",
      "🐟 Skyr mit fein gewürfeltem Apfel, Gewürzgurke, Zwiebelringen, Dill, Zitronensaft und Pfeffer verrühren (spart über 400 kcal gegenüber klassischer Becher-Sahne!) und mit dem Fisch zu den heißen Kartoffeln servieren."
    ]
  },
  {
    id: "rf_rus_m13", name: "Deftige Weiße-Bohnen-Kartoffel-Pfanne mit Räuchertofu & Majoran (Rein Vegan)",
    type: "veggie", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 650, prot: 38, carbs: 84, fat: 16, gluten: false, lactose: false,
    ingredients: [
      { name: "Weiße Riesenbohnen (Abtropfgewicht)", amount: 200, unit: "g", department: "Hülsenfrüchte" },
      { name: "Räuchertofu", amount: 150, unit: "g", department: "Kühlregal" },
      { name: "Kartoffeln (Rohgewicht)", amount: 260, unit: "g", department: "Gemüse" },
      { name: "Passierte Tomaten & Zwiebel", amount: 180, unit: "g", department: "Konserven" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Kartoffeln würfeln und 12 Min. vorkochen.",
      "🌱 Räuchertofu und Zwiebeln im abgewogenen Öl scharf anbraten, weiße Bohnen, Kartoffeln, passierte Tomaten und kräftig Majoran sowie Bohnenkraut zugeben und 6 Min. deftig schmoren."
    ]
  },
  {
    id: "rf_rus_s1", name: "Handwerker-Vesper: Harzer-Kräuterquark-Brot mit Gurke & Kirschtomaten",
    type: "veggie", category: "rustikal", prep: "nocook", tools: ["Messer"], mealCategory: "Snack",
    cals: 410, prot: 40, carbs: 44, fat: 7, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkornbrot", amount: 100, unit: "g", department: "Brot" },
      { name: "Magerquark", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Harzer Käse oder Hüttenkäse light", amount: 80, unit: "g", department: "Milchprodukte" },
      { name: "Gurke & Kirschtomaten", amount: 150, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🥖 Brot mit gewürztem Kräuter-Magerquark bestreichen, Käse in Scheiben darauflegen und das Gemüse dazu snacken."
    ]
  },
  {
    id: "rf_rus_a5", name: "Rustikale Puten-Schaschlik-Pfanne mit Paprika, Zwiebeln & Salzkartoffeln",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Abendessen",
    cals: 660, prot: 54, carbs: 72, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet (gewürfelt, Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Paprika (rot/gelb) & große Gemüsezwiebel", amount: 240, unit: "g", department: "Gemüse" },
      { name: "Passierte Tomaten & 1 TL Paprikapulver geräuchert", amount: 180, unit: "g", department: "Konserven" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍗 Putenwürfel, grobe Paprika- und Zwiebelstücke im abgemessenen Öl 6 Min. kräftig anrösten.",
      "🍅 Mit passierten Tomaten, geräuchertem Paprikapulver und einem Schuss Essig ablöschen, 8 Min. schmoren (keinen gezuckerten Schaschlik-Ketchup nutzen!) und mit Salzkartoffeln servieren."
    ]
  },
  {
    id: "rf_rus_a6", name: "Allgäuer Bergkäse-Ei-Kartoffel-Pfanne mit Lauchzwiebeln & Salat (Veggie)",
    type: "veggie", category: "rustikal", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Abendessen",
    cals: 640, prot: 44, carbs: 62, fat: 22, gluten: false, lactose: false,
    ingredients: [
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Körniger Frischkäse & Reibekäse light", amount: 140, unit: "g", department: "Milchprodukte" },
      { name: "Lauchzwiebeln & grüner Blattsalat", amount: 160, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 6, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Vorgekochte Kartoffelscheiben im abgemessenen Öl mit Lauchzwiebeln goldbraun braten.",
      "🧀 Eier und körnigen Frischkäse unterheben, mit leichtem Reibekäse schmelzen lassen und den Salat dazu reichen."
    ]
  },
      // --- MITTAGESSEN (ATHLET: GEFLÜGEL, RIND, FISCH, QUARK/EI, VEGGIE & VEGAN | SCHNELL, OFEN, NOCOOK) ---
  {
    id: "rf_ath_m1", name: "Gym-Classic: Zartes Putenbrustfilet mit Jasminreis & Zitronen-Brokkoli",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 710, prot: 58, carbs: 84, fat: 12, gluten: false, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet (Rohgewicht)", amount: 220, unit: "g", department: "Fleisch" },
      { name: "Jasminreis (Trockengewicht)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Brokkoli", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Jasminreis kalt abspülen und in der doppelten Menge Salzwasser 12–15 Min. locker garen.",
      "🍗 Putenbrust in Streifen schneiden, mit Paprika, Knoblauch, Salz und Pfeffer würzen und in einer beschichteten Pfanne NUR mit dem abgemessenen Öl 6–7 Min. saftig braten.",
      "🥦 Brokkoli 5 Min. bissfest dünsten, mit Zitronensaft beträufeln und anrichten."
    ]
  },
  {
    id: "rf_ath_m2", name: "Lean Beef Teriyaki-Bowl mit Basmatireis, Pak Choi & Sesam",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 730, prot: 56, carbs: 86, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Rindertatar oder mageres Rinderhüftsteak", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Pak Choi & Karottenstreifen", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Sojasauce & Ingwer", amount: 15, unit: "ml", department: "Asiatisch" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Basmatireis nach Packungsangabe im Salzwasser garen.",
      "🥩 Rindfleisch im heißen Öl 4–5 Min. scharf anbraten, Pak Choi und Karotten kurz mitschwenken und mit Sojasauce sowie frischem Ingwer ablöschen."
    ]
  },
  {
    id: "rf_ath_m3", name: "Ofen-Hähnchenbrust auf Süßkartoffel-Spalten & grünen Bohnen (Traybake)",
    type: "classic", category: "athlet", prep: "ofen", tools: ["Backofen", "Backblech"], mealCategory: "Mittagessen",
    cals: 690, prot: 56, carbs: 78, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Süßkartoffeln (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Grüne Bohnen", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 10, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🔥 Süßkartoffeln in Spalten schneiden, mit 5 ml Öl, Paprikapulver und Salz auf einem Backblech mischen und bei 200 °C Umluft 10 Min. vorbacken.",
      "🍗 Gewürzte Hähnchenbrust und grüne Bohnen mit den restlichen 5 ml Öl dazulegen und weitere 18 Min. saftig zu Ende garen."
    ]
  },
  {
    id: "rf_ath_m4", name: "Pescetarische Wildlachs-Quinoa-Powerbowl mit Edamame & Spinat",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 700, prot: 52, carbs: 68, fat: 22, gluten: false, lactose: false,
    ingredients: [
      { name: "Wildlachs oder Lachsfilet", amount: 180, unit: "g", department: "Fisch" },
      { name: "Quinoa (Trockengewicht)", amount: 95, unit: "g", department: "Getreide" },
      { name: "Edamame Bohnen (geschält)", amount: 80, unit: "g", department: "Hülsenfrüchte" },
      { name: "Blattspinat", amount: 160, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Zitronensaft", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌾 Quinoa heiß abspülen und in der doppelten Menge Salzwasser 14 Min. garen.",
      "🐟 Lachsfilet in der beschichteten Pfanne mit dem abgemessenen Öl je Seite 3–4 Min. braten, Spinat und Edamame kurz in der Resthitze erwärmen."
    ]
  },
  {
    id: "rf_ath_m5", name: "No-Cook Athleten-Lunch: Thunfisch-Hüttenkäse-Reiswaffel-Platte & Tomaten",
    type: "classic", category: "athlet", prep: "nocook", tools: ["Schüssel", "Gabel"], mealCategory: "Mittagessen",
    cals: 620, prot: 56, carbs: 64, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Thunfisch im eigenen Saft (abgetropft)", amount: 150, unit: "g", department: "Fisch" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Reiswaffeln", amount: 75, unit: "g", department: "Getreide" },
      { name: "Tomaten & Salatgurke", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Oregano", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥣 Thunfisch und Hüttenkäse mit Pfeffer, Zitronensaft und Oregano zu einer proteinreichen Creme verrühren.",
      "🍽️ Zu den Reiswaffeln und dem geschnittenen Gemüse mit dem abgemessenen Olivenöl genießen – in 3 Minuten ohne Herd servierfertig!"
    ]
  },
  {
    id: "rf_ath_m6", name: "Vegetarische High-Protein Eier-Kartoffel-Spinat-Pfanne mit Hüttenkäse",
    type: "veggie", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 650, prot: 46, carbs: 64, fat: 20, gluten: false, lactose: false,
    ingredients: [
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Blattspinat", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Kartoffeln würfeln und 15 Min. garen.",
      "🍳 Blattspinat in der Pfanne zusammenfallen lassen, Kartoffeln und Eier dazugeben, stocken lassen und mit dem kalten Hüttenkäse toppen."
    ]
  },
  {
    id: "rf_ath_m7", name: "Vegane Kichererbsen-Pasta mit Tempeh-Bolognese & Brokkoli",
    type: "veggie", category: "athlet", prep: "schnell", tools: ["Topf", "Pfanne"], mealCategory: "Mittagessen",
    cals: 690, prot: 48, carbs: 82, fat: 16, gluten: false, lactose: false,
    ingredients: [
      { name: "Kichererbsen-Nudeln (Trockengewicht)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Tempeh oder Räuchertofu", amount: 150, unit: "g", department: "Kühlregal" },
      { name: "Passierte Tomaten", amount: 220, unit: "g", department: "Konserven" },
      { name: "Brokkoli", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍝 Kichererbsen-Pasta und Brokkoliröschen zusammen 6 Min. in Salzwasser garen.",
      "🌱 Tempeh fein zerkrümeln, im abgewogenen Öl 5 Min. knusprig braten, passierte Tomaten sowie italienische Kräuter zugeben und mit der Pasta mischen."
    ]
  },

  // --- ABENDESSEN (ATHLET) ---
  {
    id: "rf_ath_a1", name: "Saftiges Hähnchenbrustfilet auf cremigem Süßkartoffel-Stampf & Spinat",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Abendessen",
    cals: 670, prot: 56, carbs: 72, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Süßkartoffeln (mehlig, Rohgewicht für Stampf)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Blattspinat", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Ungesüßter Mandeldrink oder fettarme Milch 1,5% (für Stampf)", amount: 50, unit: "ml", department: "Kühlregal" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Fitness-Süßkartoffel-Stampf (Ohne Butter-Falle!): Süßkartoffeln schälen, würfeln und 15 Min. weich kochen. Abgießen und NUR mit der abgemessenen Milch/Mandeldrink, Salz & Muskatnuss cremig stampfen – keine Butter zugeben!",
      "🍗 Hähnchenfilet im abgewogenen Öl 6–7 Min. goldbraun braten, Blattspinat mit 2 EL Wasser und Knoblauch dünsten."
    ]
  },
  {
    id: "rf_ath_a2", name: "Ofen-Kabeljau auf mediterranem Zucchini-Paprika-Kartoffel-Blech",
    type: "classic", category: "athlet", prep: "ofen", tools: ["Backofen", "Backblech"], mealCategory: "Abendessen",
    cals: 620, prot: 50, carbs: 68, fat: 13, gluten: false, lactose: false,
    ingredients: [
      { name: "Kabeljau-Filet (Rohgewicht)", amount: 220, unit: "g", department: "Fisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Zucchini & Paprika", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Zitronensaft", amount: 10, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🔥 Kartoffeln und Gemüse würfeln, mit Olivenöl und Kräutern auf dem Blech bei 200 °C 15 Min. vorbacken.",
      "🐟 Kabeljau auf das Gemüse legen und weitere 12 Min. im Ofen saftig garen."
    ]
  },
  {
    id: "rf_ath_a3", name: "Veganer High-Protein Tofu-Quinoa-Ofenauflauf mit Brokkoli & Kürbiskernen",
    type: "veggie", category: "athlet", prep: "ofen", tools: ["Backofen", "Auflaufform"], mealCategory: "Abendessen",
    cals: 650, prot: 42, carbs: 70, fat: 20, gluten: false, lactose: false,
    ingredients: [
      { name: "Räuchertofu", amount: 180, unit: "g", department: "Kühlregal" },
      { name: "Quinoa (Trockengewicht)", amount: 85, unit: "g", department: "Getreide" },
      { name: "Brokkoli", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Passierte Tomaten", amount: 200, unit: "g", department: "Konserven" },
      { name: "Kürbiskerne", amount: 20, unit: "g", department: "Nüsse" }
    ],
    steps: [
      "🌾 Quinoa 12 Min. vorkochen, dann mit gewürfeltem Räuchertofu, Brokkoliröschen und passierten Tomaten in eine Auflaufform geben.",
      "🔥 Mit Kürbiskernen bestreuen und bei 200 °C Umluft 18 Min. im Ofen überbacken."
    ]
  }
  ,
  // --- WEITERE FRÜHSTÜCKE, MITTAGESSEN, ABENDESSEN & SNACKS (FILTER: ATHLET) ---
  {
    id: "rf_ath_f1", name: "Bodybuilding Cream-of-Rice Bowl mit Whey-Isolat, heißen Himbeeren & Mandelmus",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Topf", "Schüssel"], mealCategory: "Frühstück",
    cals: 580, prot: 46, carbs: 74, fat: 10, gluten: false, lactose: false,
    ingredients: [
      { name: "Reisflocken / Reismehl (Trockengewicht)", amount: 90, unit: "g", department: "Getreide" },
      { name: "Whey Isolat / Proteinpulver", amount: 40, unit: "g", department: "Supplemente" },
      { name: "Himbeeren (TK oder frisch)", amount: 120, unit: "g", department: "Obst" },
      { name: "Mandelmus", amount: 12, unit: "g", department: "Aufstriche" }
    ],
    steps: [
      "🍚 Reisflocken mit 280 ml kochendem Wasser 2 Min. cremig rühren.",
      "💪 Whey Isolat unterziehen, heiße Himbeeren und exakt 12 g Mandelmus als Topping darübergeben."
    ]
  },
  {
    id: "rf_ath_f2", name: "Anaboles Egg-White & Vollei-Omelett mit Haferflocken-Brot & Blattspinat",
    type: "veggie", category: "athlet", prep: "schnell", tools: ["Pfanne"], mealCategory: "Frühstück",
    cals: 560, prot: 44, carbs: 50, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Eier (Größe M)", amount: 3, unit: "Stück", department: "Eier & Milch" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 100, unit: "g", department: "Milchprodukte" },
      { name: "Vollkornbrot", amount: 100, unit: "g", department: "Brot" },
      { name: "Blattspinat & Tomaten", amount: 150, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🍳 Spinat und Tomaten in der beschichteten Pfanne anwärmen, Eier mit Hüttenkäse verquirlen und als fluffiges Omelett stocken lassen.",
      "🥖 Mit geröstetem Vollkornbrot servieren."
    ]
  },
  {
    id: "rf_ath_m8", name: "Shredded Chicken Burrito-Bowl mit Basmatireis, schwarzen Bohnen, Mais & Limette",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 720, prot: 58, carbs: 88, fat: 13, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Schwarze Bohnen & Gemüsemais (abgespült)", amount: 120, unit: "g", department: "Konserven" },
      { name: "Paprika, Tomaten & Limettensaft", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Basmatireis in Salzwasser locker kochen und mit Limettensaft sowie Koriander/Petersilie verfeinern.",
      "🍗 Hähnchenstreifen mit Kreuzkümmel, Paprika und Chili im abgemessenen Öl scharf anbraten, Bohnen und Mais kurz mitwärmen und als Bowl anrichten."
    ]
  },
  {
    id: "rf_ath_m9", name: "Mageres Rinderhüft-Steak mit Ofen-Drillingen, grünem Spargel/Bohnen & Kräuter-Skyr",
    type: "classic", category: "athlet", prep: "ofen", tools: ["Backofen", "Pfanne"], mealCategory: "Mittagessen",
    cals: 690, prot: 58, carbs: 70, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Rinderhüftsteak (mager, Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Grüne Bohnen oder grüner Spargel", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur (für Kräuterdip statt Kräuterbutter!)", amount: 80, unit: "g", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Drillinge halbieren und mit grünem Gemüse bei 200 °C Umluft 22 Min. im Ofen rösten.",
      "🥩 Rinderhüftsteak im abgewogenen Öl je Seite 2–3 Min. medium braten und mit gewürztem Kräuter-Skyr servieren."
    ]
  },
  {
    id: "rf_ath_m10", name: "Mediterrane Garnelen- & Kabeljau-Reispfanne mit Zucchini & Kirschtomaten",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 650, prot: 54, carbs: 78, fat: 12, gluten: false, lactose: false,
    ingredients: [
      { name: "Garnelen / Shrimps & Kabeljaufilet (Rohgewicht)", amount: 220, unit: "g", department: "Fisch" },
      { name: "Jasminreis (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Zucchini & Kirschtomaten", amount: 240, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Knoblauch", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Jasminreis kochen.",
      "🦐 Meeresfrüchte/Fisch mit Knoblauch, Zucchiniwürfeln und halbierten Kirschtomaten im abgewogenen Olivenöl 5–6 Min. braten, mit Zitronensaft ablöschen und mit dem Reis schwenken."
    ]
  },
  {
    id: "rf_ath_m11", name: "Vegetarische High-Protein Gnocchi-Pfanne mit Hüttenkäse-Tomatensauce & Spinat",
    type: "veggie", category: "athlet", prep: "schnell", tools: ["Pfanne"], mealCategory: "Mittagessen",
    cals: 660, prot: 42, carbs: 84, fat: 15, gluten: true, lactose: false,
    ingredients: [
      { name: "Kartoffel-Gnocchi (Frischeregion)", amount: 280, unit: "g", department: "Kühlregal" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 180, unit: "g", department: "Milchprodukte" },
      { name: "Mozzarella light (gewürfelt)", amount: 50, unit: "g", department: "Milchprodukte" },
      { name: "Passierte Tomaten & Blattspinat", amount: 250, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 6, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Gnocchi im abgemessenen Öl in der beschichteten Pfanne 4 Min. goldbraun anbraten.",
      "🍅 Passierte Tomaten, Spinat und Hüttenkäse zugeben, 3 Min. cremig einköcheln und Mozzarella light darin ziehen lassen."
    ]
  },
  {
    id: "rf_ath_m12", name: "Veganer Muscle-Builder: Lupinen-/Soja-Geschnetzeltes mit Basmatireis & Brokkoli",
    type: "veggie", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 680, prot: 48, carbs: 86, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Räuchertofu oder Lupinenschnetzel", amount: 180, unit: "g", department: "Kühlregal" },
      { name: "Basmatireis (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Edamame Bohnen (geschält)", amount: 70, unit: "g", department: "Hülsenfrüchte" },
      { name: "Brokkoli", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Sojasauce", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Reis und Brokkoli garen.",
      "🌱 Tofu/Lupinen im abgewogenen Öl knusprig braten, Edamame und Sojasauce dazugeben und mit dem Reis anrichten."
    ]
  },
  {
    id: "rf_ath_s1", name: "Gym-Post-Workout: Skyr-Protein-Pudding mit Reiswaffeln & Beeren",
    type: "veggie", category: "athlet", prep: "nocook", tools: ["Schüssel"], mealCategory: "Snack",
    cals: 420, prot: 42, carbs: 48, fat: 5, gluten: false, lactose: false,
    ingredients: [
      { name: "Skyr Natur / Magerquark", amount: 250, unit: "g", department: "Milchprodukte" },
      { name: "Whey Protein / Vegan Protein", amount: 20, unit: "g", department: "Supplemente" },
      { name: "Reiswaffeln", amount: 40, unit: "g", department: "Getreide" },
      { name: "Beerenmix", amount: 100, unit: "g", department: "Obst" }
    ],
    steps: [
      "🥣 Skyr mit Proteinpulver und einem Schuss Wasser cremig rühren, Beeren daraufgeben und Reiswaffeln dazu dippen."
    ]
  },
  {
    id: "rf_ath_a4", name: "Puten-Medaillons aus der Pfanne mit Quinoa-Taboulé & gegrillter Zucchini",
    type: "classic", category: "athlet", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Abendessen",
    cals: 660, prot: 56, carbs: 70, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet (Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Quinoa (Trockengewicht)", amount: 95, unit: "g", department: "Getreide" },
      { name: "Zucchini, Tomaten & Petersilie", amount: 250, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Zitronensaft", amount: 10, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌾 Quinoa in Salzwasser 14 Min. garen und mit gehackter Petersilie, Tomatenwürfeln und Zitronensaft mischen.",
      "🍗 Puten-Medaillons und Zucchinischeiben im abgewogenen Öl goldbraun braten."
    ]
  },
  {
    id: "rf_ath_a5", name: "No-Cook Lean Dinner: Räucherlachs-Hüttenkäse-Vollkorn-Bagel mit Gurkensalat",
    type: "classic", category: "athlet", prep: "nocook", tools: ["Messer"], mealCategory: "Abendessen",
    cals: 610, prot: 48, carbs: 60, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Räucherlachs oder Stremellachs", amount: 110, unit: "g", department: "Fisch" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Vollkornbrot oder Vollkorn-Bagel", amount: 120, unit: "g", department: "Brot" },
      { name: "Salatgurke & Dill", amount: 200, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🥯 Vollkornbrot/-Bagel mit Hüttenkäse bestreichen, mit Lachs und frischem Dill belegen und den Gurkensalat dazu essen."
    ]
  },
      // --- MITTAGESSEN (SCHICHT: PERFEKT FÜR TUPPERDOSE, KALT & WARM ESSBAR, NOCOOK & SCHNELL) ---
  {
    id: "rf_sch_m1", name: "Schichtarbeiter-Hit: Hähnchen-Couscous-Feta-Bowl (5-Min. Wasserkocher-Methode)",
    type: "classic", category: "schicht", prep: "nocook", tools: ["Schüssel", "Wasserkocher"], mealCategory: "Mittagessen",
    cals: 670, prot: 54, carbs: 74, fat: 16, gluten: true, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (gegart / Streifen)", amount: 180, unit: "g", department: "Fleisch & Wurst" },
      { name: "Couscous (Trockengewicht)", amount: 95, unit: "g", department: "Getreide" },
      { name: "Feta light / Hirtenkäse", amount: 60, unit: "g", department: "Milchprodukte" },
      { name: "Salatgurke & Kirschtomaten", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Zitronensaft", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌾 Couscous mit 150 ml kochendem Salzwasser aus dem Wasserkocher übergießen und 5 Min. abgedeckt quellen lassen (ohne Butter!).",
      "🥗 Mit einer Gabel auflockern, gewürfelte Gurke, Tomaten, Hähnchenstreifen, Feta light und das abgemessene Olivenöl unterheben – schmeckt warm und kalt in der Schicht!"
    ]
  },
  {
    id: "rf_sch_m2", name: "Doppel-Protein Puten-Hüttenkäse-Wraps mit Paprika (0 Min. Kochzeit)",
    type: "classic", category: "schicht", prep: "nocook", tools: ["Brett", "Messer"], mealCategory: "Mittagessen",
    cals: 640, prot: 52, carbs: 66, fat: 16, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkorn-Tortilla Wraps (2 Stück)", amount: 120, unit: "g", department: "Brot" },
      { name: "Putenbrust-Aufschnitt", amount: 120, unit: "g", department: "Fleisch & Wurst" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Paprika & Rucola", amount: 150, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🌯 Wraps mit dem körnigen Frischkäse bestreichen, mit Pfeffer und Paprikapulver würzen.",
      "🍗 Mit Putenbrust, Paprikastreifen und Rucola belegen, fest aufrollen und für die Schichtbox halbieren."
    ]
  },
  {
    id: "rf_sch_m3", name: "Meal-Prep Rinderhack-Nudel-Pfanne mit Paprika & Tomatenmark",
    type: "classic", category: "schicht", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 710, prot: 54, carbs: 82, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Rinderhackfleisch (mager) / Tatar", amount: 190, unit: "g", department: "Fleisch" },
      { name: "Vollkornnudeln (Trockengewicht)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Paprika & Zucchini", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Passierte Tomaten", amount: 200, unit: "g", department: "Konserven" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍝 Vollkornnudeln in Salzwasser bissfest kochen.",
      "🥩 Mageres Rinderhack im abgewogenen Öl krümelig braten, gewürfeltes Gemüse und passierte Tomaten zugeben, 8 Min. schmoren und mit den Nudeln mischen – lässt sich perfekt in der Mikrowelle aufwärmen!"
    ]
  },
  {
    id: "rf_sch_m4", name: "Thunfisch-Reis-Mais-Salatbowl mit Ei & Joghurt-Senf-Dressing (Kalt & Warm)",
    type: "classic", category: "schicht", prep: "schnell", tools: ["Topf", "Schüssel"], mealCategory: "Mittagessen",
    cals: 660, prot: 52, carbs: 72, fat: 16, gluten: false, lactose: false,
    ingredients: [
      { name: "Thunfisch im eigenen Saft (abgetropft)", amount: 150, unit: "g", department: "Fisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Ei (hartgekocht)", amount: 1, unit: "Stück", department: "Eier & Milch" },
      { name: "Mais, Paprika & Salatgurke", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur & 1 TL Senf (für leichtes Dressing)", amount: 80, unit: "g", department: "Milchprodukte" }
    ],
    steps: [
      "🍚 Reis vorkochen und abkühlen lassen.",
      "🐟 Mit Thunfisch, gewürfeltem Ei, Mais, Paprika und Gurke mischen. Aus Skyr, Senf, Zitronensaft, Salz und Pfeffer ein kalorienarmes Dressing unterheben (kein Mayo-Salat!)."
    ]
  },
  {
    id: "rf_sch_m5", name: "Vegetarischer Griechischer Kichererbsen-Hirtenkäse-Schichtsalat mit Vollkornbrot",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Dose / Schüssel"], mealCategory: "Mittagessen",
    cals: 630, prot: 38, carbs: 70, fat: 20, gluten: true, lactose: false,
    ingredients: [
      { name: "Kichererbsen (abgespült)", amount: 180, unit: "g", department: "Hülsenfrüchte" },
      { name: "Feta light / Hirtenkäse", amount: 100, unit: "g", department: "Milchprodukte" },
      { name: "Vollkornbrot", amount: 100, unit: "g", department: "Brot" },
      { name: "Tomaten, Gurke & Paprika", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Oregano", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥗 Kichererbsen, gewürfeltes Gemüse und zerbröselten Hirtenkäse light in einer Frischhaltedose mit Olivenöl, Zitronensaft und Oregano mischen.",
      "🥖 Mit dem Vollkornbrot ohne Erhitzen direkt am Arbeitsplatz genießen."
    ]
  },
  {
    id: "rf_sch_m6", name: "Vegane Erdnuss-Edamame-Reisnudel-Box mit Räuchertofu (Kalt & Warm)",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Wasserkocher", "Schüssel"], mealCategory: "Mittagessen",
    cals: 670, prot: 42, carbs: 78, fat: 20, gluten: false, lactose: false,
    ingredients: [
      { name: "Räuchertofu (verzehrfertig gewürfelt)", amount: 160, unit: "g", department: "Kühlregal" },
      { name: "Reisnudeln (Trockengewicht)", amount: 95, unit: "g", department: "Getreide" },
      { name: "Edamame Bohnen (geschält)", amount: 90, unit: "g", department: "Hülsenfrüchte" },
      { name: "Karottenstreifen & rote Paprika", amount: 160, unit: "g", department: "Gemüse" },
      { name: "Erdnussmus & Sojasauce", amount: 20, unit: "g", department: "Aufstriche" }
    ],
    steps: [
      "🍜 Reisnudeln in einer Schüssel mit kochendem Wasser aus dem Wasserkocher übergießen, 4 Min. ziehen lassen und abgießen.",
      "🌱 Mit Räuchertofu-Würfeln, Edamame und knackigem Gemüse mischen. Erdnussmus mit Sojasauce und 2 EL warmem Wasser glattrühren und unterheben."
    ]
  },

  // --- ABENDESSEN (SCHICHT) ---
  {
    id: "rf_sch_a1", name: "Ofen-Putenbrust-Auflauf mit Brokkoli, Kartoffeln & leichtem Käseguss",
    type: "classic", category: "schicht", prep: "ofen", tools: ["Backofen", "Auflaufform"], mealCategory: "Abendessen",
    cals: 660, prot: 56, carbs: 64, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln (Rohgewicht)", amount: 280, unit: "g", department: "Gemüse" },
      { name: "Brokkoli", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Mozzarella light (gerieben)", amount: 60, unit: "g", department: "Milchprodukte" },
      { name: "Fettarme Milch 1,5% & 1 Ei (für Guss)", amount: 100, unit: "ml", department: "Milchprodukte" }
    ],
    steps: [
      "🔥 Kartoffelwürfel 10 Min. vorkochen, dann mit Putenwürfeln und Brokkoli in eine Auflaufform geben.",
      "🧀 Milch-Ei-Gewürzmischung darübergeben, mit Mozzarella light bestreuen und bei 200 °C Umluft 22 Min. backen."
    ]
  },
  {
    id: "rf_sch_a2", name: "Schnelles Feierabend-Omelett mit Räucherlachs, Spinat & Vollkornbrot",
    type: "classic", category: "schicht", prep: "schnell", tools: ["Pfanne"], mealCategory: "Abendessen",
    cals: 610, prot: 48, carbs: 50, fat: 22, gluten: true, lactose: false,
    ingredients: [
      { name: "Eier (Größe M)", amount: 3, unit: "Stück", department: "Eier & Milch" },
      { name: "Räucherlachs oder Stremellachs", amount: 90, unit: "g", department: "Fisch" },
      { name: "Vollkornbrot", amount: 110, unit: "g", department: "Brot" },
      { name: "Blattspinat", amount: 150, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🍳 Blattspinat in der beschichteten Pfanne kurz dünsten, verquirlte Eier darübergeben und stocken lassen.",
      "🐟 Mit Lachsstreifen belegen und zum getoasteten Vollkornbrot servieren."
    ]
  }
  ,
  // --- WEITERE FRÜHSTÜCKE, MITTAGESSEN, ABENDESSEN & SNACKS (FILTER: SCHICHT) ---
  {
    id: "rf_sch_f1", name: "Nachtschicht-Retter: Schoko-Banane Protein-Overnight-Oats im Schraubglas",
    type: "classic", category: "schicht", prep: "nocook", tools: ["Schraubglas / Dose"], mealCategory: "Frühstück",
    cals: 570, prot: 44, carbs: 68, fat: 12, gluten: false, lactose: false,
    ingredients: [
      { name: "Zarte Haferflocken", amount: 85, unit: "g", department: "Getreide" },
      { name: "Whey Protein Schoko (oder Vegan Protein)", amount: 35, unit: "g", department: "Supplemente" },
      { name: "Skyr Natur", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Banane & 1 TL Backkakao", amount: 110, unit: "g", department: "Obst" }
    ],
    steps: [
      "🥣 Haferflocken, Proteinpulver, Backkakao, Skyr und 120 ml Wasser/Milch im Glas verrühren, Bananenscheiben darauflegen – sofort mitnehmbar!"
    ]
  },
  {
    id: "rf_sch_f2", name: "Herzhafte Büro-Box: Gekochte Eier, Hüttenkäse-Dip, Vollkorn-Knäcke & Paprika",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Brotdose"], mealCategory: "Frühstück",
    cals: 530, prot: 40, carbs: 46, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Eier (hartgekocht)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 180, unit: "g", department: "Milchprodukte" },
      { name: "Vollkorn-Knäckebrot oder Vollkornbrot", amount: 85, unit: "g", department: "Brot" },
      { name: "Paprika & Gurkensticks", amount: 180, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🍱 Alles fertig in die Brotdose packen – kein Besteck oder Aufwärmen in der Frühschicht nötig."
    ]
  },
  {
    id: "rf_sch_m7", name: "Mikrowellen-Hit: Hähnchen-Curry-Reis-Box mit Erbsen & Karotten (Meal-Prep)",
    type: "classic", category: "schicht", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 690, prot: 56, carbs: 80, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Erbsen & Karotten (TK)", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Kokosmilch light & Currypulver", amount: 100, unit: "ml", department: "Asiatisch" },
      { name: "Olivenöl", amount: 6, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Reis mit den TK-Erbsen/Karotten zusammen in einem Topf 12 Min. garen.",
      "🍗 Hähnchenwürfel im Öl anbraten, Currypulver und Kokosmilch light zugeben, 4 Min. köcheln und mit dem Reis in die Meal-Prep-Dose füllen."
    ]
  },
  {
    id: "rf_sch_m8", name: "Kalt & Warm Genuss: Mediterraner Puten-Tortellini/Pasta-Salat mit Rucola & Tomaten",
    type: "classic", category: "schicht", prep: "schnell", tools: ["Topf", "Schüssel"], mealCategory: "Mittagessen",
    cals: 670, prot: 52, carbs: 78, fat: 16, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkornnudeln (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Putenbrust-Streifen (gegart)", amount: 180, unit: "g", department: "Fleisch & Wurst" },
      { name: "Mozzarella light (Mini-Kugeln)", amount: 60, unit: "g", department: "Milchprodukte" },
      { name: "Kirschtomaten & Rucola", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Balsamico-Essig", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍝 Nudeln kochen, kalt abspülen und mit Putenstreifen, Mozzarella light, halbierten Kirschtomaten, Rucola, Balsamico und exakt 8 ml Olivenöl mischen."
    ]
  },
  {
    id: "rf_sch_m9", name: "No-Cook Schicht-Box: Stremellachs mit Couscous, Gurke & Kräuter-Skyr",
    type: "classic", category: "schicht", prep: "nocook", tools: ["Wasserkocher", "Dose"], mealCategory: "Mittagessen",
    cals: 650, prot: 50, carbs: 68, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Stremellachs natur (verzehrfertig)", amount: 150, unit: "g", department: "Fisch" },
      { name: "Couscous (Trockengewicht)", amount: 95, unit: "g", department: "Getreide" },
      { name: "Skyr Natur & Dill", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Salatgurke & Kirschtomaten", amount: 180, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🌾 Couscous mit heißem Salzwasser aus dem Wasserkocher 5 Min. quellen lassen.",
      "🐟 Stremellachs zerzupfen, mit Gurken, Tomaten und einem großen Klecks Dill-Skyr in die Dose geben."
    ]
  },
  {
    id: "rf_sch_m10", name: "Ofen-Meal-Prep: Griechisches Hähnchen-Kartoffel-Feta-Blech (Für 2 Schichttage)",
    type: "classic", category: "schicht", prep: "ofen", tools: ["Backofen", "Backblech"], mealCategory: "Mittagessen",
    cals: 680, prot: 56, carbs: 68, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Feta light / Hirtenkäse", amount: 60, unit: "g", department: "Milchprodukte" },
      { name: "Paprika, Zucchini & rote Zwiebel", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Oregano", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🔥 Alles mundgerecht gewürfelt mit Oregano, Knoblauch und den 8 ml Öl auf dem Blech verteilen, Feta light darüberbröseln und 25 Min. bei 200 °C backen."
    ]
  },
  {
    id: "rf_sch_m11", name: "Vegetarischer High-Protein Linsen-Bulgur-Salat mit Hüttenkäse & Minze (No-Cook)",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Wasserkocher", "Dose"], mealCategory: "Mittagessen",
    cals: 640, prot: 42, carbs: 82, fat: 14, gluten: true, lactose: false,
    ingredients: [
      { name: "Feiner Bulgur oder Couscous (Trockengewicht)", amount: 90, unit: "g", department: "Getreide" },
      { name: "Braune Linsen (vorgegart aus der Dose, abgespült)", amount: 150, unit: "g", department: "Hülsenfrüchte" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Tomaten, Gurke & Petersilie", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Zitronensaft", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌾 Feinen Bulgur/Couscous mit kochendem Wasser 6 Min. quellen lassen, dann Linsen, Gemüse, Zitronensaft und Hüttenkäse unterheben."
    ]
  },
  {
    id: "rf_sch_m12", name: "Vegane Mexiko-Quinoa-Bohnen-Wraps mit Avocado & Salsa (Kalt in der Schicht)",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Brett"], mealCategory: "Mittagessen",
    cals: 660, prot: 34, carbs: 86, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkorn-Tortilla Wraps (2 Stück)", amount: 120, unit: "g", department: "Brot" },
      { name: "Kidneybohnen & Kichererbsen (abgespült)", amount: 180, unit: "g", department: "Hülsenfrüchte" },
      { name: "Räuchertofu (fein gewürfelt)", amount: 100, unit: "g", department: "Kühlregal" },
      { name: "Avocado (fruchtfleisch)", amount: 50, unit: "g", department: "Gemüse" },
      { name: "Tomaten-Salsa, Mais & Salatblätter", amount: 150, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🌯 Avocado mit Limettensaft auf die Wraps streichen, Bohnen, Räuchertofu, Mais und Salsa darauf verteilen und fest einrollen."
    ]
  },
  {
    id: "rf_sch_a3", name: "Feierabend 10-Minuten-Pfanne: Mageres Rinderhack mit Gnocchi & Spinat",
    type: "classic", category: "schicht", prep: "schnell", tools: ["Pfanne"], mealCategory: "Abendessen",
    cals: 680, prot: 52, carbs: 74, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Rindertatar / mageres Rinderhack", amount: 190, unit: "g", department: "Fleisch" },
      { name: "Kartoffel-Gnocchi", amount: 260, unit: "g", department: "Kühlregal" },
      { name: "Blattspinat & Kirschtomaten", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥩 Rinderhack und Gnocchi zusammen in einer großen Pfanne im abgemessenen Öl 6 Min. braten, Spinat und Tomaten unterheben – nur 1 Pfanne zum Abspülen nach der Schicht!"
    ]
  },
  {
    id: "rf_sch_a4", name: "Veganes Schicht-Abendbrot: Humus-Räuchertofu-Vollkornstullen mit Gurkensalat",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Messer"], mealCategory: "Abendessen",
    cals: 600, prot: 34, carbs: 70, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkornbrot", amount: 140, unit: "g", department: "Brot" },
      { name: "Räuchertofu (in Scheiben)", amount: 150, unit: "g", department: "Kühlregal" },
      { name: "Hummus (Kichererbsenaufstrich)", amount: 60, unit: "g", department: "Kühlregal" },
      { name: "Salatgurke, Tomaten & Sprossen", amount: 200, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🥖 Vollkornbrot mit Hummus bestreichen, dick mit Räuchertofu-Scheiben und Tomaten belegen."
    ]
  },
      // --- MITTAGESSEN (KAMPFSPORT: LEICHT VERDAULICHE ENERGIE, KEIN VÖLLEGEFÜHL VOR DEM TRAINING) ---
  {
    id: "rf_kmp_m1", name: "Tatami-Fuel: Hähnchenbrust-Streifen auf Jasminreis mit Zucchini & Karotte",
    type: "classic", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 700, prot: 54, carbs: 90, fat: 12, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Jasminreis (Trockengewicht)", amount: 115, unit: "g", department: "Getreide" },
      { name: "Zucchini & Karotte (fein gewürfelt)", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl & Sojasauce", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Jasminreis weich kochen – liefert extrem leicht verdauliche Kohlenhydrate ohne Magenbelastung vor dem Sparring.",
      "🍗 Hähnchenstreifen und fein gewürfeltes Gemüse im abgewogenen Öl 6 Min. braten, mit 1 EL Sojasauce ablöschen und auf dem Reis anrichten."
    ]
  },
  {
    id: "rf_kmp_m2", name: "Fighter's Pasta: Dinkel-Spaghetti mit magerem Rindertatar-Sugo",
    type: "classic", category: "kampfsport", prep: "schnell", tools: ["Topf", "Pfanne"], mealCategory: "Mittagessen",
    cals: 720, prot: 54, carbs: 92, fat: 14, gluten: true, lactose: false,
    ingredients: [
      { name: "Rindertatar (extrem mager)", amount: 190, unit: "g", department: "Fleisch" },
      { name: "Dinkel-Pasta (Trockengewicht)", amount: 115, unit: "g", department: "Getreide" },
      { name: "Passierte Tomaten", amount: 240, unit: "g", department: "Konserven" },
      { name: "Karotte & Basilikum", amount: 100, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍝 Dinkel-Pasta in Salzwasser al dente kochen.",
      "🥩 Rindertatar mit fein geraspelter Karotte im abgemessenen Öl anbraten, passierte Tomaten und Kräuter zugeben und 10 Min. leicht einköcheln."
    ]
  },
  {
    id: "rf_kmp_m3", name: "Ofen-Süßkartoffel-Stampf mit Kabeljaufilet & gedünstetem Spinat",
    type: "classic", category: "kampfsport", prep: "ofen", tools: ["Backofen", "Topf"], mealCategory: "Mittagessen",
    cals: 650, prot: 50, carbs: 82, fat: 12, gluten: false, lactose: false,
    ingredients: [
      { name: "Kabeljau-Filet (Rohgewicht)", amount: 220, unit: "g", department: "Fisch" },
      { name: "Süßkartoffeln (mehlig, Rohgewicht für Stampf)", amount: 340, unit: "g", department: "Gemüse" },
      { name: "Blattspinat", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Ungesüßter Mandeldrink oder Kochwasser (für Stampf)", amount: 50, unit: "ml", department: "Kühlregal" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🐟 Kabeljaufilet mit Zitrone, Salz und den 8 ml Olivenöl im Ofen bei 190 °C 14 Min. leicht und bekömmlich garen.",
      "🥔 Süßkartoffeln weich kochen und NUR mit Mandeldrink/Kochwasser, Salz und Muskatnuss stampfen (keine schwere Butter!). Spinat kurz dünsten."
    ]
  },
  {
    id: "rf_kmp_m4", name: "No-Cook Pre-Fight Bowl: Couscous, Thunfisch, Rote Bete & Kürbiskerne",
    type: "classic", category: "kampfsport", prep: "nocook", tools: ["Wasserkocher", "Schüssel"], mealCategory: "Mittagessen",
    cals: 660, prot: 50, carbs: 78, fat: 15, gluten: true, lactose: false,
    ingredients: [
      { name: "Thunfisch im eigenen Saft", amount: 150, unit: "g", department: "Fisch" },
      { name: "Couscous (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Rote Bete (vorgegart, gewürfelt)", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Kürbiskerne", amount: 20, unit: "g", department: "Nüsse" },
      { name: "Olivenöl & Zitronensaft", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌾 Couscous mit kochendem Salzwasser übergießen und 5 Min. quellen lassen.",
      "🥊 Rote Bete (fördert die Stickstoffmonoxid-Bildung & Ausdauer!), Thunfisch und Kürbiskerne unterheben."
    ]
  },
  {
    id: "rf_kmp_m5", name: "Vegane Asia-Tofu-Reisnudel-Pfanne mit Pak Choi, Ingwer & Hanfsamen",
    type: "veggie", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 680, prot: 40, carbs: 86, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Räuchertofu", amount: 180, unit: "g", department: "Kühlregal" },
      { name: "Reisnudeln (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Pak Choi & Karotte", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Hanfsamen", amount: 20, unit: "g", department: "Saaten" },
      { name: "Sesam-/Olivenöl & Sojasauce", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍜 Reisnudeln 4 Min. in heißem Wasser ziehen lassen und abgießen.",
      "🌱 Tofu und Pak Choi im abgewogenen Öl 5 Min. im Wok/Pfanne braten, Reisnudeln und Sojasauce durchschwenken und mit Hanfsamen toppen."
    ]
  },

  // --- ABENDESSEN (KAMPFSPORT: REGENERATION & ENTZÜNDUNGSHEMMUNG) ---
  {
    id: "rf_kmp_a1", name: "Recovery-Bowl: Wildlachsfilet mit Jasminreis, Brokkoli & Avocado",
    type: "classic", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Abendessen",
    cals: 720, prot: 50, carbs: 74, fat: 24, gluten: false, lactose: false,
    ingredients: [
      { name: "Wildlachs oder Lachsfilet", amount: 180, unit: "g", department: "Fisch" },
      { name: "Jasminreis (Trockengewicht)", amount: 95, unit: "g", department: "Getreide" },
      { name: "Brokkoli", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Avocado", amount: 60, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🍚 Reis und Brokkoli garen.",
      "🐟 Lachsfilet in einer beschichteten Pfanne im eigenen Fett 3–4 Min. pro Seite braten und mit frischen Avocadoscheiben zur optimalen Regeneration nach dem Training anrichten."
    ]
  }
  ,
  // --- WEITERE FRÜHSTÜCKE, MITTAGESSEN, ABENDESSEN & SNACKS (FILTER: KAMPFSPORT) ---
  {
    id: "rf_kmp_f1", name: "Fighter's Morning Porridge: Haferflocken, Whey, Banane, Datteln & Zimt",
    type: "classic", category: "kampfsport", prep: "schnell", tools: ["Topf"], mealCategory: "Frühstück",
    cals: 610, prot: 44, carbs: 84, fat: 10, gluten: false, lactose: false,
    ingredients: [
      { name: "Zarte Haferflocken", amount: 90, unit: "g", department: "Getreide" },
      { name: "Whey Isolat / Protein", amount: 35, unit: "g", department: "Supplemente" },
      { name: "Banane & 2 Datteln (gewürfelt)", amount: 130, unit: "g", department: "Obst" },
      { name: "Mandeldrink ungesüßt", amount: 250, unit: "ml", department: "Pflanzendrinks" }
    ],
    steps: [
      "🥊 Haferflocken im Mandeldrink mit Zimt 3 Min. cremig kochen, Proteinpulver, Banane und Datteln für maximale Glykogenspeicher unterheben."
    ]
  },
  {
    id: "rf_kmp_m6", name: "Weight-Cut Champion: Zartes Putenbrustfilet mit Ofen-Kürbis/Süßkartoffel & Spinat",
    type: "classic", category: "kampfsport", prep: "ofen", tools: ["Backofen"], mealCategory: "Mittagessen",
    cals: 640, prot: 58, carbs: 72, fat: 12, gluten: false, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet (Rohgewicht)", amount: 220, unit: "g", department: "Fleisch" },
      { name: "Hokkaido-Kürbis & Süßkartoffel (Rohgewicht)", amount: 340, unit: "g", department: "Gemüse" },
      { name: "Blattspinat", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🔥 Kürbis- und Süßkartoffelspalten mit Putenbrust und 8 ml Öl 22 Min. bei 200 °C im Ofen backen – maximales Sättigungsvolumen für die Gewichtsklasse!"
    ]
  },
  {
    id: "rf_kmp_m7", name: "Grappler's Beef & Rice: Mageres Rindersteak-Streifen mit Basmatireis & Ananas-Paprika",
    type: "classic", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 710, prot: 56, carbs: 86, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Rinderhüftsteak (in Streifen, Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Paprika & frische Ananaswürfel (Bromelain-Enzyme!)", amount: 180, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Sojasauce", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Basmatireis kochen.",
      "🥩 Rinderstreifen und Paprika im Öl 4 Min. scharf braten, Ananaswürfel (fördern die Verdauung und Regeneration) kurz mitschwenken."
    ]
  },
  {
    id: "rf_kmp_m8", name: "Samurai Lachs-Teriyaki-Reisbowl mit Edamame, Gurke & Sesam",
    type: "classic", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 710, prot: 52, carbs: 78, fat: 20, gluten: false, lactose: false,
    ingredients: [
      { name: "Lachsfilet (Rohgewicht)", amount: 180, unit: "g", department: "Fisch" },
      { name: "Jasminreis (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Edamame Bohnen (geschält)", amount: 70, unit: "g", department: "Hülsenfrüchte" },
      { name: "Salatgurke & Karottenstreifen", amount: 160, unit: "g", department: "Gemüse" },
      { name: "Sojasauce & 1 TL Sesam", amount: 15, unit: "ml", department: "Asiatisch" }
    ],
    steps: [
      "🍚 Jasminreis kochen.",
      "🐟 Lachsfilet in der beschichteten Pfanne braten, am Ende mit 1 EL Sojasauce glasieren und auf Reis mit Edamame und Gurke anrichten."
    ]
  },
  {
    id: "rf_kmp_m9", name: "Vegetarische Tatami-Bowl: Süßkartoffel-Quinoa-Pfanne mit Ei, Spinat & Hüttenkäse",
    type: "veggie", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 660, prot: 44, carbs: 78, fat: 18, gluten: false, lactose: false,
    ingredients: [
      { name: "Quinoa (Trockengewicht)", amount: 80, unit: "g", department: "Getreide" },
      { name: "Süßkartoffel (fein gewürfelt, Rohgewicht)", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 140, unit: "g", department: "Milchprodukte" },
      { name: "Blattspinat", amount: 160, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🌾 Quinoa und feine Süßkartoffelwürfel zusammen in einem Topf mit Salzwasser 14 Min. garen.",
      "🍳 Spinat und Eier in der Pfanne schwenken und mit Hüttenkäse auf der Quinoa-Basis anrichten."
    ]
  },
  {
    id: "rf_kmp_m10", name: "Veganes Muay-Thai-Curry mit Räuchertofu, Jasminreis, Bambussprossen & Pak Choi",
    type: "veggie", category: "kampfsport", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 680, prot: 40, carbs: 88, fat: 17, gluten: false, lactose: false,
    ingredients: [
      { name: "Räuchertofu", amount: 180, unit: "g", department: "Kühlregal" },
      { name: "Jasminreis (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Kokosmilch light & rote Currypaste", amount: 120, unit: "ml", department: "Asiatisch" },
      { name: "Pak Choi, Paprika & Bambussprossen", amount: 220, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🍚 Jasminreis kochen.",
      "🌱 Tofu und Gemüse mit 1 TL Currypaste anrösten, Kokosmilch light zugeben und 6 Min. köcheln."
    ]
  },
  {
    id: "rf_kmp_s1", name: "90-Min-Before-Sparring Snack: Reiswaffeln mit Honig/Banane & Whey-Isolat Shake",
    type: "classic", category: "kampfsport", prep: "nocook", tools: ["Shaker"], mealCategory: "Snack",
    cals: 410, prot: 36, carbs: 56, fat: 4, gluten: false, lactose: false,
    ingredients: [
      { name: "Reiswaffeln", amount: 45, unit: "g", department: "Getreide" },
      { name: "Banane", amount: 120, unit: "g", department: "Obst" },
      { name: "Whey Isolat (oder Vegan Isolat)", amount: 35, unit: "g", department: "Supplemente" }
    ],
    steps: [
      "⚡ Liefert sofort verfügbare Energie und Aminosäuren ohne jegliches Völlegefühl auf der Matte."
    ]
  },
  {
    id: "rf_kmp_a2", name: "Post-Fight Recovery: Hähnchenbrust mit Ofen-Süßkartoffeln, Rote Bete & Feta light",
    type: "classic", category: "kampfsport", prep: "ofen", tools: ["Backofen"], mealCategory: "Abendessen",
    cals: 670, prot: 58, carbs: 72, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Süßkartoffeln (Rohgewicht)", amount: 280, unit: "g", department: "Gemüse" },
      { name: "Rote Bete & Brokkoli", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Feta light", amount: 50, unit: "g", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🔥 Süßkartoffelspalten, Hähnchen und Gemüse mit 8 ml Öl 22 Min. bei 200 °C backen und mit Feta light bestreuen."
    ]
  },
  {
    id: "rf_kmp_a3", name: "Vegane Fighter's Recovery-Bowl: Rote-Linsen-Dal mit Kurkuma, Ingwer & Basmatireis",
    type: "veggie", category: "kampfsport", prep: "schnell", tools: ["Topf"], mealCategory: "Abendessen",
    cals: 650, prot: 38, carbs: 92, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Rote Linsen (Trockengewicht)", amount: 100, unit: "g", department: "Hülsenfrüchte" },
      { name: "Basmatireis (Trockengewicht)", amount: 80, unit: "g", department: "Getreide" },
      { name: "Passierte Tomaten & Kokosmilch light", amount: 220, unit: "g", department: "Konserven" },
      { name: "Blattspinat, frischer Ingwer & Kurkuma (entzündungshemmend!)", amount: 150, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🌱 Linsen mit Tomaten, Kokosmilch light, viel Kurkuma und Ingwer (hemmt Muskelkater & Gelenkentzündungen!) 14 Min. sämig kochen, Spinat unterheben und mit Reis servieren."
    ]
  },
      // --- MITTAGESSEN (FAMILIE: BELIEBT BEI GROß & KLEIN, OHNE KALORIENFALLEN) ---
  {
    id: "rf_fam_m1", name: "Knusprige Cornflakes-Hähnchen-Nuggets aus dem Ofen mit Kartoffel-Wedges",
    type: "classic", category: "familie", prep: "ofen", tools: ["Backofen", "Backblech"], mealCategory: "Mittagessen",
    cals: 690, prot: 56, carbs: 84, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Cornflakes (ungesüßt, zerbröselt)", amount: 35, unit: "g", department: "Getreide" },
      { name: "Skyr Natur (als fettarme Panier-Haftung)", amount: 50, unit: "g", department: "Milchprodukte" },
      { name: "Karotten & Gurken-Sticks", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Kartoffeln in Spalten (Wedges) schneiden, mit den 8 ml Öl und Paprikapulver mischen und bei 200 °C Umluft 25 Min. auf dem Backblech rösten.",
      "🍗 Hähnchen in Nuggets schneiden, erst in gewürztem Skyr und dann in zerbröselten Cornflakes wenden (spart das Frittierfett!) und die letzten 15 Min. mit auf das Blech geben."
    ]
  },
  {
    id: "rf_fam_m2", name: "Rahm-Geschnetzeltes „Zürcher Art“ Light mit Putenbrust, Champignons & Reis",
    type: "classic", category: "familie", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 670, prot: 54, carbs: 78, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet (in Streifen)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Champignons & Zucchini", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Kochsahne light (7% Fett) oder Frischkäse light", amount: 80, unit: "ml", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Basmatireis in Salzwasser garen.",
      "🍗 Putenstreifen und geschnittene Champignons im abgemessenen Öl scharf anbraten, mit 60 ml Brühe und der leichten Kochsahne ablöschen und mit Petersilie servieren."
    ]
  },
  {
    id: "rf_fam_m3", name: "Hausgemachte Ofen-Fischstäbchen vom Kabeljau mit Kartoffelstampf & Erbsen",
    type: "classic", category: "familie", prep: "ofen", tools: ["Backofen", "Topf"], mealCategory: "Mittagessen",
    cals: 660, prot: 50, carbs: 78, fat: 14, gluten: true, lactose: false,
    ingredients: [
      { name: "Kabeljau- oder Seelachsfilet (Rohgewicht)", amount: 210, unit: "g", department: "Fisch" },
      { name: "Kartoffeln (mehligkochend, Rohgewicht für Stampf)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Erbsen & junge Karotten (TK oder frisch)", amount: 180, unit: "g", department: "Gemüse" },
      { name: "Vollkorn-Paniermehl oder Cornflakes", amount: 30, unit: "g", department: "Getreide" },
      { name: "Fettarme Milch 1,5% (für Stampf)", amount: 60, unit: "ml", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🐟 Fischfilet in Streifen schneiden, mit Zitrone würzen, in Paniermehl wenden und mit den 8 ml Öl beträufelt bei 200 °C Umluft 15 Min. im Ofen knusprig backen (keine Fritteuse!).",
      "🥔 Kartoffeln und Erbsen/Karotten garen; Kartoffeln NUR mit der abgemessenen fettarmen Milch und Muskatnuss cremig stampfen (keine zusätzliche Butter!)."
    ]
  },
  {
    id: "rf_fam_m4", name: "Vegetarische Käse-Spätzle / Pasta-Pfanne Light mit Hüttenkäse, Röstzwiebeln & Salat",
    type: "veggie", category: "familie", prep: "schnell", tools: ["Topf", "Pfanne"], mealCategory: "Mittagessen",
    cals: 670, prot: 44, carbs: 80, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkornnudeln oder Dinkel-Spätzle (Trockengewicht)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Körniger Frischkäse (Hüttenkäse)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Reibekäse light", amount: 50, unit: "g", department: "Milchprodukte" },
      { name: "Zwiebelringe & bunter Beilagensalat (Gurke/Tomate)", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍝 Pasta oder Spätzle in Salzwasser bissfest kochen.",
      "🧀 Zwiebelringe im abgewogenen Öl goldbraun schmoren, die heiße Pasta mit dem Hüttenkäse (schmilzt cremig und liefert massig Protein!) und dem leichten Reibekäse durchschwenken. Salat dazu reichen."
    ]
  },
  {
    id: "rf_fam_m5", name: "Süße Quark-Grieß-Auflauf-Pfanne mit heißen Beeren (Kinder- & Sportler-Hit)",
    type: "veggie", category: "familie", prep: "ofen", tools: ["Backofen", "Auflaufform"], mealCategory: "Mittagessen",
    cals: 620, prot: 46, carbs: 76, fat: 12, gluten: true, lactose: false,
    ingredients: [
      { name: "Magerquark / Skyr", amount: 280, unit: "g", department: "Milchprodukte" },
      { name: "Dinkelgrieß oder zarte Haferflocken", amount: 75, unit: "g", department: "Getreide" },
      { name: "Ei (Größe M)", amount: 1, unit: "Stück", department: "Eier & Milch" },
      { name: "Beeren-Mix", amount: 160, unit: "g", department: "Obst" }
    ],
    steps: [
      "🔥 Magerquark, Grieß/Haferflocken, Ei, Zimt und 50 ml Wasser verrühren, Beeren unterheben und bei 190 °C Umluft ca. 22 Min. goldgelb im Ofen backen."
    ]
  },
  {
    id: "rf_fam_m6", name: "Veganer Familien-Hit: Cremige Tomaten-Kokos-Linsen-Pasta (One-Pot)",
    type: "veggie", category: "familie", prep: "schnell", tools: ["Topf"], mealCategory: "Mittagessen",
    cals: 680, prot: 36, carbs: 94, fat: 16, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkornnudeln (Trockengewicht)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Rote Linsen (Trockengewicht)", amount: 80, unit: "g", department: "Hülsenfrüchte" },
      { name: "Passierte Tomaten", amount: 240, unit: "g", department: "Konserven" },
      { name: "Kokosmilch light", amount: 100, unit: "ml", department: "Asiatisch" },
      { name: "Blattspinat", amount: 120, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🍲 Rote Linsen mit passierten Tomaten, Kokosmilch light und 150 ml Gemüsebrühe 12 Min. cremig köcheln, am Ende den Blattspinat unterheben und mit der gekochten Pasta mischen."
    ]
  }
  ,
  // --- WEITERE FRÜHSTÜCKE, MITTAGESSEN, ABENDESSEN & SNACKS (FILTER: FAMILIE) ---
  {
    id: "rf_fam_f1", name: "Fluffige Familien-Quark-Hafer-Pancakes mit Apfelspalten & Zimt",
    type: "veggie", category: "familie", prep: "schnell", tools: ["Pfanne", "Schüssel"], mealCategory: "Frühstück",
    cals: 570, prot: 42, carbs: 68, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Magerquark / Skyr", amount: 200, unit: "g", department: "Milchprodukte" },
      { name: "Zarte Haferflocken (oder Hafermehl)", amount: 80, unit: "g", department: "Getreide" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Apfel & Zimt", amount: 130, unit: "g", department: "Obst" }
    ],
    steps: [
      "🥞 Quark, Haferflocken, Eier und 1 Prise Backpulver glattrühren. In einer beschichteten Pfanne kleine Pancakes ausbacken und mit warmen Zimt-Apfelspalten servieren."
    ]
  },
  {
    id: "rf_fam_m7", name: "Familien-Liebling: Selbstgemachte Rinder-Cheeseburger-Bowl mit Ofen-Pommes",
    type: "classic", category: "familie", prep: "ofen", tools: ["Backofen", "Pfanne"], mealCategory: "Mittagessen",
    cals: 690, prot: 56, carbs: 70, fat: 19, gluten: false, lactose: false,
    ingredients: [
      { name: "Rindertatar / mageres Rinderhack (Rohgewicht)", amount: 190, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln (in Pommes-Stiften, Rohgewicht)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Reibekäse light / Cheddar light", amount: 40, unit: "g", department: "Milchprodukte" },
      { name: "Eisbergsalat, Tomaten & Gewürzgurken", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur, Tomatenmark & Senf (für Burger-Sauce Light)", amount: 70, unit: "g", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍟 Kartoffeln in Stifte schneiden und mit 8 ml Öl bei 200 °C Umluft 25 Min. im Ofen knusprig backen.",
      "🍔 Rinderhack in der Pfanne braten, Käse light darüber schmelzen und auf knackigem Salat mit Pommes und selbstgemachter Skyr-Senf-Tomaten-Burgersauce anrichten."
    ]
  },
  {
    id: "rf_fam_m8", name: "Milde Hähnchen-Mango-Kokos-Reispfanne (Kinder- & Eltern-Favorit)",
    type: "classic", category: "familie", prep: "schnell", tools: ["Pfanne", "Topf"], mealCategory: "Mittagessen",
    cals: 680, prot: 54, carbs: 82, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Kokosmilch light", amount: 100, unit: "ml", department: "Asiatisch" },
      { name: "Mango-Würfel & rote Paprika", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl", amount: 6, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍚 Basmatireis kochen.",
      "🍗 Hähnchen und Paprika im Öl anbraten, Kokosmilch light, mildes Curry und Mangowürfel zugeben und 5 Min. cremig köcheln."
    ]
  },
  {
    id: "rf_fam_m9", name: "Lachs-Sahne-Nudeln Light mit Erbsen & Zitrone (20-Minuten Familien-Pasta)",
    type: "classic", category: "familie", prep: "schnell", tools: ["Topf", "Pfanne"], mealCategory: "Mittagessen",
    cals: 700, prot: 50, carbs: 78, fat: 20, gluten: true, lactose: false,
    ingredients: [
      { name: "Lachsfilet (gewürfelt, Rohgewicht)", amount: 170, unit: "g", department: "Fisch" },
      { name: "Vollkornnudeln (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Junge Erbsen (TK)", amount: 140, unit: "g", department: "Gemüse" },
      { name: "Frischkäse light / Kochsahne light 7%", amount: 80, unit: "g", department: "Milchprodukte" }
    ],
    steps: [
      "🍝 Nudeln kochen, in den letzten 4 Min. die Erbsen direkt ins Nudelwasser geben.",
      "🐟 Lachswürfel in einer beschichteten Pfanne 4 Min. braten, Frischkäse light und 4 EL Nudelkochwasser einrühren und mit den Nudeln schwenken."
    ]
  },
  {
    id: "rf_fam_m10", name: "Schnelle Tortilla-Pizza vom Blech mit Putenbrust, Mais, Paprika & Mozzarella light",
    type: "classic", category: "familie", prep: "ofen", tools: ["Backofen", "Backblech"], mealCategory: "Mittagessen",
    cals: 640, prot: 52, carbs: 66, fat: 17, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkorn-Tortilla Wraps (2 Stück als Pizzaboden)", amount: 120, unit: "g", department: "Brot" },
      { name: "Putenbrust-Aufschnitt", amount: 110, unit: "g", department: "Fleisch & Wurst" },
      { name: "Mozzarella light (gerieben) & 2 EL Hüttenkäse", amount: 110, unit: "g", department: "Milchprodukte" },
      { name: "Passierte Tomaten, Mais & Paprika", amount: 200, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🍕 Tortilla-Wraps auf ein Backblech legen, mit gewürzten passierten Tomaten und Hüttenkäse bestreichen.",
      "🧀 Mit Putenbrust, Mais, Paprika und Mozzarella light belegen und bei 200 °C Umluft 10–12 Min. knusprig backen."
    ]
  },
  {
    id: "rf_fam_m11", name: "Vegetarischer Nudel-Brokkoli-Auflauf mit Schinken-Ersatz/Räuchertofu & Käsekruste",
    type: "veggie", category: "familie", prep: "ofen", tools: ["Backofen", "Auflaufform"], mealCategory: "Mittagessen",
    cals: 660, prot: 44, carbs: 78, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkornnudeln (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Räuchertofu (fein gewürfelt) oder Hüttenkäse", amount: 140, unit: "g", department: "Kühlregal" },
      { name: "Brokkoli", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Mozzarella light & 100 ml Milch 1,5%", amount: 140, unit: "g", department: "Milchprodukte" }
    ],
    steps: [
      "🔥 Vorgekochte Nudeln und Brokkoli mit gewürfeltem Räuchertofu/Hüttenkäse in eine Auflaufform geben, gewürzte Milch angießen, mit Mozzarella light bestreuen und 18 Min. bei 200 °C überbacken."
    ]
  },
  {
    id: "rf_fam_a1", name: "Ofen-Geflügelbällchen (Schwedische Geflügelbällchen Light) mit Kartoffelstampf & Rahmsauce Light",
    type: "classic", category: "familie", prep: "ofen", tools: ["Backofen", "Topf"], mealCategory: "Abendessen",
    cals: 670, prot: 54, carbs: 74, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Mageres Puten- oder Rinderhack (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Kartoffeln (mehlig, Rohgewicht für Stampf)", amount: 320, unit: "g", department: "Gemüse" },
      { name: "Brokkoli oder grüne Bohnen", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Fettarme Milch 1,5% & Frischkäse light", amount: 90, unit: "ml", department: "Milchprodukte" }
    ],
    steps: [
      "🔥 Aus dem gewürzten Hack kleine Bällchen rollen und im Ofen bei 200 °C 16 Min. fettarm backen.",
      "🥔 Kartoffeln kochen und NUR mit fettarmer Milch und Muskat stampfen (keine Butter!). Aus 60 ml Brühe und Frischkäse light eine schnelle Rahmsauce rühren."
    ]
  },
  {
    id: "rf_fam_a2", name: "Bunte Familien-Taco-Wraps mit Putenstreifen, Joghurt-Dip, Mais & Salat (Schnell)",
    type: "classic", category: "familie", prep: "schnell", tools: ["Pfanne"], mealCategory: "Abendessen",
    cals: 650, prot: 52, carbs: 72, fat: 15, gluten: true, lactose: false,
    ingredients: [
      { name: "Putenbrustfilet (Rohgewicht)", amount: 190, unit: "g", department: "Fleisch" },
      { name: "Vollkorn-Tortilla Wraps (2 Stück)", amount: 120, unit: "g", department: "Brot" },
      { name: "Skyr Natur / Joghurt (als Sauerrahm-Ersatz)", amount: 100, unit: "g", department: "Milchprodukte" },
      { name: "Mais, Paprika & Eisbergsalat", amount: 200, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 6, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🌮 Putenstreifen und Paprika im Öl 6 Min. braten und mit den Kindern zusammen am Tisch in die warmen Wraps mit Salat, Mais und Kräuter-Skyr füllen."
    ]
  }
    ];

// Athletik Fallback DB
if (typeof window.athletikDrillsDB === 'undefined') {
        window.athletikDrillsDB = {
          seasonConfigs: {
            pre: { label: "Pre-Season (Kraftausdauer & Laktatpuffer)", workRest: "45s Belastung / 15s Pause", rounds: "3–4 Runden", finisher: "4x 200m Tempo-Läufe oder 5 Min. Burpee-Shuttle-AMRAP.", finisherSwim: "6x 50m Sprint-Intervalle (Abgang alle 60s) + 200m lockeres Ausschwimmen." },
            in: { label: "In-Season (Spritzigkeit & Prehab)", workRest: "30s Belastung / 30s Pause", rounds: "2–3 Runden", finisher: "Reaktions-Sprints auf Trainer-Kommando (6x 15m mit vollem Erholungsfokus).", finisherSwim: "6x 15m Unterwasser-Delfinkicks in Streamline + Explosiv-Breakout mit voller Pause." },
            off: { label: "Off-Season (Mobility & Ausgleich)", workRest: "40s kontrolliert / 20s Pause", rounds: "2–3 Runden", finisher: "10 Min. geführtes Team-Mobility & Core-Downregulation.", finisherSwim: "300m lockeres Technik-Schwimmen im Wechsel + Schulter-Mobility." }
          },
          movementPrep: {
            sprint_stopgo: [
              "<strong>1. Raise (3 Min.):</strong> Lockeres Einlaufen + A-Skips, B-Skips, Fersenfeger & Seitgalopp.",
              "<strong>2. Mobilize (4 Min.):</strong> World's Greatest Stretch (5x/Seite), Hamstring Sweeps & tiefe Kosaken-Kniebeuge.",
              "<strong>3. Activate (3 Min.):</strong> Miniband Monster Walks, Einbein-Glute-Bridges & 3 kurze 5m-Reaktions-Antritte."
            ],
            combat: [
              "<strong>1. Raise (3 Min.):</strong> Seilspringen / Boxer-Step & lockeres Schattenboxen.",
              "<strong>2. Mobilize (4 Min.):</strong> Brustwirbelsäulen-Rotation, Hüftöffner (90/90 Stretch) & Nacken-Mobilisation.",
              "<strong>3. Activate (3 Min.):</strong> Explosive Liegestütz-Taps, Sprawls & Rotations-Medball-Drills."
            ],
            rotation_throw: [
              "<strong>1. Raise (3 Min.):</strong> Sidesteps, Kreuzschritte (Carioca) & dynamisches Armkreisen.",
              "<strong>2. Mobilize (4 Min.):</strong> Sleeper Stretch, Ausfallschritt mit Überkopf-Streckung & T-Spine Open Books.",
              "<strong>3. Activate (3 Min.):</strong> 15x Miniband Außenrotation (Rotatorenmanschette), Y-T-W Heben & Split-Step-Reaktion."
            ],
            swim_water: [
              "<strong>1. Raise (3 Min.):</strong> Am Beckenrand auf der Matte: Armkreisen, Seilschwünge & Kniehebelauf am Platz.",
              "<strong>2. Mobilize (4 Min.):</strong> Brustwirbelsäulen-Streckung in Streamline-Position & Schulter-Dislokationen mit Band.",
              "<strong>3. Activate (3 Min.):</strong> Scapula Push-Ups, Hollow-Body Streamline Hold (30s) & Miniband-Zugphase."
            ],
            fitness: [
              "<strong>1. Raise (3 Min.):</strong> Jumping Jacks, High Knees & Armkreisen.",
              "<strong>2. Mobilize (4 Min.):</strong> Ausfallschritt mit Rotation, Cat-Cow & Deep Squat Hold.",
              "<strong>3. Activate (3 Min.):</strong> Plank Shoulder Taps, Glute Bridges & 5 explosive Strecksprünge."
            ]
          },
          movementPrepByEnv: {
            schwimmhalle: [
              "<strong>1. Dryland-Activation auf der Matte (3 Min.):</strong> Kein Rennen auf nassen Fliesen! Armkreisen, Rumpf-Rotation & Kniebeugen am Platz.",
              "<strong>2. Streamline- & Schulter-Mobility (4 Min.):</strong> Band Pull-Aparts, Außenrotation für die Schwimmerschulter & Fußgelenk-Mobilisation.",
              "<strong>3. Core-Ignition (3 Min.):</strong> 2x 30s Hollow Body Streamline Hold & 5 explosive Strecksprünge aus der Startblock-Vorbeuge."
            ],
            kraftraum: [
              "<strong>1. Raise am Platz (3 Min.):</strong> Seilspringen, Ergometer oder Jumping Jacks.",
              "<strong>2. Mobilize (4 Min.):</strong> Deep Squat Hold mit Brustwirbelsäulen-Rotation & Glute Bridges.",
              "<strong>3. Activate (3 Min.):</strong> Band Pull-Aparts, Dead Bugs & Pogo-Jumps."
            ]
          },
          speedAgility: [
            { name: "10m Explosiv-Antritt aus 3 Startpositionen (Liegestütz / Sitz / Split-Stance)", env: ["platz", "halle"], clusters: ["sprint_stopgo", "combat", "rotation_throw", "fitness"], prescription: "5 Durchgänge | 60s Pause", coachingCue: "Maximaler erster Schritt, tiefer Körperschwerpunkt in den ersten 5 Metern!" },
            { name: "5-10-5 Pro-Agility Shuttle (Richtungswechsel & Bremskraft)", env: ["platz", "halle", "kraftraum"], clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness"], prescription: "4 Durchgänge | 75s Pause", coachingCue: "Schwerpunkt beim Abbremsen tief absenken, Außenfuß kraftvoll in den Boden stemmen!" },
            { name: "Deceleration & Stick-Landing Drill (Sprint + Sofort-Stopp auf Pfiff)", env: ["platz", "halle"], clusters: ["sprint_stopgo", "rotation_throw", "fitness"], prescription: "5 Durchgänge | 60s Pause", coachingCue: "Aus vollem Lauf in 2-3 kurzen Bremsschritten tief einfrieren – Knie stabil über Fußspitze!" },
            { name: "Streamline-Startsprung-Explosion & Unterwasser-Breakout", env: ["schwimmhalle", "halle", "kraftraum"], clusters: ["swim_water", "fitness"], prescription: "5x Start-Explosion | 60s Pause", coachingCue: "Arme fest hinter den Ohren verriegeln (Streamline), maximale Hüftstreckung beim Absprung!" },
            { name: "Broad Jumps (Standweitsprung) in den sofortigen 5m-Antritt", env: ["platz", "halle", "kraftraum"], clusters: ["sprint_stopgo", "combat", "fitness"], prescription: "4x 3 Sprünge | 75s Pause", coachingCue: "Komplette Hüftstreckung im Sprung, weiche Landung und sofortige Beschleunigung!" },
            {
    name: "Falling-Start 10m Beschleunigung + Abbremsen im Zielkorridor",
    env: ["platz", "halle"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness"],
    prescription: "5 Durchgänge | 60s Pause",
    coachingCue: "Körper fällt gestreckt nach vorn bis kurz vor den Kipppunkt, dann explosiver erster Vorfuß-Bodenkontakt!"
  },
  {
    name: "T-Drill (Vorwärtssprint – Seitgalopp links/rechts – Rückwärtslauf)",
    env: ["platz", "halle"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness"],
    prescription: "4 Durchgänge (2x links / 2x rechts) | 75s Pause",
    coachingCue: "Beim Seitgalopp Füße niemals überkreuzen! Hüfte tief halten und Hütchen mit der Außenhand berühren."
  },
  {
    name: "Hürden-/Hütchen Lateral Skater Bounds mit 2s Stick-Landing (Kreuzband-Prehab)",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness"],
    prescription: "4x 6 Sprünge (3/Seite) | 60s Pause",
    coachingCue: "Weite seitliche Einbeinsprünge, Landung lautlos abfedern und 2 Sekunden absolut stabil einfrieren!"
  },
  {
    name: "Sprawl-to-Sprint / Akustischer Reaktions-Antritt (Kampfsport & Ballgewinn)",
    env: ["platz", "halle", "kraftraum"],
    clusters: ["combat", "sprint_stopgo", "rotation_throw", "fitness"],
    prescription: "6 Durchgänge | 60s Pause",
    coachingCue: "Auf Pfiff blitzschneller Sprawl (Hüfte zum Boden), sofortiges Aufspringen und 5–10m Maximal-Antritt!"
  },
  {
    name: "Curved Sprint (Bogenlauf-Beschleunigung im 45°-Winkel um Hütchenbogen)",
    env: ["platz", "halle"],
    clusters: ["sprint_stopgo", "fitness"],
    prescription: "4x je Seite (15m) | 75s Pause",
    coachingCue: "Körper leicht in die Kurve neigen, Innenbein drückt über den Großzehballen kraftvoll ab!"
  },
  {
    name: "Drop-Squat in den sofortigen Vertikalsprung (Tuck Jump / Header-Jump)",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "swim_water", "fitness"],
    prescription: "4x 4 Wiederholungen | 75s Pause",
    coachingCue: "Aus dem Stand blitzschnell in die Viertel-Kniebeuge fallen lassen und ohne Zeitverlust maximal hoch katapultieren!"
  },
  {
    name: "Wende-Rotation (Tumble-Turn Core Snap) & Explosiver Wand-Abstoß",
    env: ["schwimmhalle", "halle"],
    clusters: ["swim_water"],
    prescription: "5x 3 Explosiv-Abstöße | 60s Pause",
    coachingCue: "Knie eng zur Brust ziehen, Füße auf halber Beckenhöhe platzieren und in perfekter Streamline-Spannung abstoßen!"
  },
  {
    name: "Reaktions-Farb-Cut (Trainer ruft Farbe/Richtung kurz vor dem Richtungswechsel)",
    env: ["platz", "halle", "kraftraum"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness"],
    prescription: "6 Durchgänge | 60s Pause",
    coachingCue: "Kopf oben lassen (Scanning!), Vororientierung halten und beim Cut den Körperschwerpunkt sofort absenken."
  }
          ],
          circuitStations: [
            { id: "st_1", slot: "lower", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "miniband"], clusters: ["sprint_stopgo", "fitness", "swim_water"], name: "Nordic Hamstring Curls / Einbein-Hip-Thrusts", cues: "Hüfte gestreckt lassen, kontrolliert 3 Sekunden ablassen (Kreuzband- & Hamstring-Schutz)." },
            { id: "st_2", slot: "upper", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "medball", "sling_trx"], clusters: ["sprint_stopgo", "combat", "fitness", "swim_water"], name: "Explosive Liegestütze / Partner-Schulter-Taps", cues: "Rumpf bretthart spannen, kein Durchhängen im unteren Rücken." },
            { id: "st_3", slot: "core", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "miniband", "medball"], clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness", "swim_water"], name: "Copenhagen Plank / Unterarmstütz mit Durchzug", cues: "Becken stabil und hoch halten, schräge Bauchmuskeln und Adduktoren aktivieren." },
            { id: "st_4", slot: "metabolic", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "cones_ladder"], clusters: ["sprint_stopgo", "combat", "fitness", "swim_water"], name: "Schnelle Fußarbeit (Fast Feet) + Burpee-Reaktion", cues: "Maximale Frequenz auf dem Vorfuß, sofortige Reaktion auf Trainer-Pfiff!" },
            { id: "st_5", slot: "lower", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "kasten_bank", "kettlebell_kh"], clusters: ["sprint_stopgo", "fitness", "swim_water"], name: "Bulgarian Split Squats / Skater-Jumps mit 2s Stabilisation", cues: "Saubere Einbein-Landung, Knie zeigt exakt in Richtung Fußspitze." },
            { id: "st_6", slot: "upper", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "miniband", "sling_trx"], clusters: ["rotation_throw", "swim_water", "fitness"], name: "Y-T-W Schulter-Stabi / Band Pull-Aparts", cues: "Schulterblätter aktiv nach hinten-unten ziehen (Prävention Werfer-/Schwimmerschulter)." },
            { id: "st_7", slot: "core", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "medball"], clusters: ["combat", "rotation_throw", "fitness", "swim_water"], name: "Dead Bugs / Hollow Body Streamline Hold", cues: "Lendenwirbelsäule fest in den Boden drücken, ruhig weiteratmen." },
            { id: "st_8", slot: "metabolic", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "medball", "kettlebell_kh"], clusters: ["combat", "sprint_stopgo", "fitness"], name: "Mountain Climbers Sprint / Medball Slams", cues: "Volle Explosivität aus der Hüfte und dem Rumpf bei jeder Wiederholung." },
            { id: "st_9", slot: "lower", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["miniband", "bodyweight"], clusters: ["sprint_stopgo", "rotation_throw", "fitness"], name: "Miniband Lateral Monster Walks + Squat Jumps", cues: "Dauerhafte Spannung auf dem Band halten, Knie aktiv nach außen drücken." },
            { id: "st_10", slot: "upper", env: ["halle", "kraftraum", "platz"], equipTags: ["sling_trx", "kettlebell_kh", "bodyweight"], clusters: ["combat", "sprint_stopgo", "fitness"], name: "Schlingentrainer- / Ring-Rudern oder Einarmiges Kurzhantel-Rudern", cues: "Brust stolz herausstrecken, Schulterblätter am oberen Punkt 1 Sekunde zusammenkneifen." },
            { id: "st_11", slot: "core", env: ["platz", "halle", "kraftraum", "schwimmhalle"], equipTags: ["bodyweight", "medball"], clusters: ["sprint_stopgo", "combat", "rotation_throw", "swim_water"], name: "Bird-Dog (3s Hold) / Russian Twists mit Medizinball", cues: "Hüfte bleibt vollkommen parallel zum Boden, Rotation kommt aus der Brustwirbelsäule." },
            { id: "st_12", slot: "metabolic", env: ["schwimmhalle", "halle", "kraftraum"], equipTags: ["bodyweight", "miniband"], clusters: ["swim_water", "fitness"], name: "Flutter-Kicks in Rücken-/Bauchlage + Streamline Squat Jumps", cues: "Beinschlag aus der Hüfte mit gestreckten Fußspitzen, maximale Körperspannung!" },
            {
    id: "st_uk_1",
    slot: "lower",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "miniband"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "swim_water", "fitness"],
    name: "Exzentrische Ausfallschritt-Wechselsprünge (Split Squat Jumps / Step-Back Lunges)",
    cues: "Aufrechte Haltung, vorderes Knie stabil über dem Mittelfuß halten, weiche Landung aus dem Vorfuß!"
  },
  {
    id: "st_uk_2",
    slot: "lower",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["miniband", "bodyweight"],
    clusters: ["sprint_stopgo", "rotation_throw", "swim_water", "fitness"],
    name: "Single-Leg Glute Bridge Hold + Dynamischer Beinwechsel (Hamstring- & Gesäß-Kette)",
    cues: "Becken bleibt waagerecht wie ein Brett – kein Absinken der Hüfte beim Beinwechsel!"
  },
  {
    id: "st_uk_3",
    slot: "lower",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["kettlebell_kh", "medball", "bodyweight"],
    clusters: ["sprint_stopgo", "combat", "rotation_throw", "fitness"],
    name: "Goblet Cossack Squats (Tiefe seitliche Ausfallschritte für Leisten- & Adduktoren-Schutz)",
    cues: "Ferse des Standbeins bleibt fest am Boden, gestrecktes Bein auf die Ferse drehen – schützt vor Leistenzerrungen!"
  },
  {
    id: "st_uk_4",
    slot: "lower",
    env: ["halle", "kraftraum", "platz", "schwimmhalle"],
    equipTags: ["kasten_bank", "bodyweight"],
    clusters: ["sprint_stopgo", "rotation_throw", "swim_water", "fitness"],
    name: "Explosive Step-Ups auf Bank/Kasten mit Kniehub (Sprinter-Hüftbeuger-Drive)",
    cues: "Kraft kommt zu 100 % aus dem oberen Standbein – Schwungbein zieht explosiv bis auf 90° Hüfthöhe!"
  },
  {
    id: "st_uk_5",
    slot: "lower",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "miniband"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "swim_water", "fitness"],
    name: "Isometrischer Spanish-/Wall-Squat + Wadenheben (Patellasehnen- & Achillessehnen-Schild)",
    cues: "Oberschenkel parallel zum Boden halten und dabei kontrolliert die Fersen maximal anheben und senken."
  },
  {
    id: "st_uk_6",
    slot: "lower",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["kettlebell_kh", "medball", "bodyweight"],
    clusters: ["sprint_stopgo", "combat", "rotation_throw", "fitness"],
    name: "Single-Leg Romanian Deadlift (Einbein-Kreuzheben) + Knie-Drive",
    cues: "Hintere Ferse schiebt weit nach hinten, Standbein leicht gebeugt – maximale Sprunggelenks- und Hüftkontrolle!"
  },
            {
    id: "st_ok_1",
    slot: "upper",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["miniband", "bodyweight"],
    clusters: ["rotation_throw", "swim_water", "combat", "sprint_stopgo", "fitness"],
    name: "Miniband Wall-Slides + Scapula Push-Ups (Rotatorenmanschette & Sägemuskel)",
    cues: "Unterarme drücken gegen das Band nach außen, während die Arme nach oben gleiten – Goldstandard für Werfer & Schwimmer!"
  },
  {
    id: "st_ok_2",
    slot: "upper",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["medball", "bodyweight"],
    clusters: ["combat", "rotation_throw", "sprint_stopgo", "fitness"],
    name: "Medball Chest-Pass / Uneven Push-Ups (Wechselnde Liegestütze auf Medizinball)",
    cues: "Rumpf stabil halten, explosiv aus Brust und Schulter abdrücken bzw. Ball unter den Händen durchrollen."
  },
  {
    id: "st_ok_3",
    slot: "upper",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["kettlebell_kh", "miniband", "bodyweight"],
    clusters: ["combat", "sprint_stopgo", "rotation_throw", "fitness"],
    name: "Renegade Rows / Gorillastand-Rudern (Zugkraft + Anti-Rotations-Rumpf)",
    cues: "Füße breit aufstellen, Becken darf sich beim einarmigen Zug keinen Millimeter mitdrehen!"
  },
  {
    id: "st_ok_4",
    slot: "upper",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "kasten_bank"],
    clusters: ["combat", "swim_water", "sprint_stopgo", "fitness"],
    name: "Hindu-/Dive-Bomber Push-Ups oder Trizeps-Dips an der Bank",
    cues: "Volle Schulterblatt-Kontrolle über den gesamten Bewegungsradius, Ellbogen eng am Körper führen."
  },
  {
    id: "st_ok_5",
    slot: "upper",
    env: ["halle", "kraftraum", "schwimmhalle", "platz"],
    equipTags: ["miniband", "sling_trx", "bodyweight"],
    clusters: ["swim_water", "rotation_throw", "combat", "fitness"],
    name: "Bauchlage Schwimmer-Zugphase (Prone Swimmers / Band Pull-Downs)",
    cues: "Stirn entlastet, Daumen zeigen zur Decke, großer Kreisbogen von Streamline bis zu den Hüften."
  },
            // --- CORE-STATIONEN (slot: "core") ---
  {
    id: "st_cm_c1",
    slot: "core",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "miniband"],
    clusters: ["sprint_stopgo", "combat", "rotation_throw", "swim_water", "fitness"],
    name: "Bear-Crawl Vor-/Rückwärts (Knie 2 cm über dem Boden schwebend)",
    cues: "Rücken so flach wie eine Tischplatte – ein imaginäres Wasserglas auf der Lendenwirbelsäule darf nicht umkippen!"
  },
  {
    id: "st_cm_c2",
    slot: "core",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["miniband", "medball", "bodyweight"],
    clusters: ["rotation_throw", "combat", "sprint_stopgo", "swim_water", "fitness"],
    name: "Partner-Pallof-Press mit Miniband / Statischer Rotations-Widerstand",
    cues: "Arme vor der Brust ausstrecken, während der Partner seitlich am Band zieht – Rumpf bleibt kerzengerade!"
  },
  {
    id: "st_cm_c3",
    slot: "core",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "medball"],
    clusters: ["swim_water", "combat", "sprint_stopgo", "rotation_throw", "fitness"],
    name: "V-Ups / Alternating Toe-Touches & Side-Plank Hip-Dips",
    cues: "Kontrollierte Rumpfbeugung ohne Schwung aus dem Nacken, Lendenwirbelsäule beim Ablassen sauber abrollen."
  },
  {
    id: "st_cm_c4",
    slot: "core",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["kettlebell_kh", "medball", "bodyweight"],
    clusters: ["sprint_stopgo", "combat", "rotation_throw", "fitness"],
    name: "Overhead / Suitcase March am Platz (Einarmiges Tragen mit hohem Kniehub)",
    cues: "Rippenbogen herunterziehen, Standbein komplett strecken, kein seitliches Einknicken in der Taille!"
  },

  // --- METABOLIC / HIIT-STATIONEN (slot: "metabolic") ---
  {
    id: "st_cm_m1",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["cones_ladder", "bodyweight"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness"],
    name: "Koordinationsleiter / Hütchen Icky-Shuffle + 5m Shuttle-Touch",
    cues: "Blick weg von den Füßen nach vorn richten! Maximale Schrittfrequenz und tiefer Schwerpunkt bei der Wende."
  },
  {
    id: "st_cm_m2",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["medball", "bodyweight"],
    clusters: ["combat", "rotation_throw", "sprint_stopgo", "fitness"],
    name: "Rotational Medball Slams / Sprawls im Kampfsport-Rhythmus",
    cues: "Aus der vollen Überkopf-Streckung den Ball mit ganzer Rumpfkraft neben dem Fuß in den Boden hämmern!"
  },
  {
    id: "st_cm_m3",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "miniband"],
    clusters: ["sprint_stopgo", "combat", "swim_water", "rotation_throw", "fitness"],
    name: "High-Knee Sprint am Platz + 180°-Reaktions-Jump auf Kommando",
    cues: "Knie auf Hüfthöhe ziehen, Arme aktiv im Sprintwinkel mitschwingen, butterweiche Beidbein-Landung!"
  },
  {
    id: "st_cm_m4",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["kettlebell_kh", "bodyweight"],
    clusters: ["combat", "sprint_stopgo", "fitness"],
    name: "Kettlebell Swings oder Broad-Jump + Rückwärts-Shuffle",
    cues: "Kraftvolle Hüftstreckung im letzten Drittel der Bewegung, Pobacken am obersten Punkt fest anspannen!"
  }
          ]
        };
      }
      
