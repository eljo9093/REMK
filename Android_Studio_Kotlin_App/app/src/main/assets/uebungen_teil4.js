// ============================================================================
// RE:MK TRAININGS-DATENBANK - MODUL TEIL 4 (GELENKSCHUTZ, RÜCKBILDUNG, SENIOREN, KINDER & ATHLETIK)
// ============================================================================

if (typeof exerciseDB === 'undefined') {
  window.exerciseDB = [];
}

const uebungenTeil4 = [
  // --- 1. SCHULTER-SCHONENDE DRUCK- & PREHAB-ÜBUNGEN ---
  {
    id: "ex_t4_sh1",
    name: "Landmine Press (Schräges einarmiges Drücken – Schulterschonend)",
    mechanic: "push_vert",
    equip: ["gym", "homegym"],
    goal: ["muskelaufbau", "kraft", "athletik"],
    link: "Landmine Press Ausführung"
  },
  {
    id: "ex_t4_sh2",
    name: "Kurzhantel Floor Press im Neutralgriff (Schulter- & Gelenkschonend)",
    mechanic: "push_horiz",
    equip: ["gym", "homegym"],
    goal: ["muskelaufbau", "kraft"],
    link: "Dumbbell Floor Press Neutral Grip"
  },
  {
    id: "ex_t4_sh3",
    name: " Liegestütze erhöht an Bank / Wand (Gelenkschonend & Rückbildung)",
    mechanic: "push_horiz",
    equip: ["gym", "homegym", "bodyweight"],
    goal: ["muskelaufbau", "athletik"],
    link: "Incline Push Up Ausführung"
  },
  {
    id: "ex_t4_sh4",
    name: "Schulter-Außenrotation am Kabelzug / Miniband (Rotatorenmanschette)",
    mechanic: "push_iso",
    equip: ["gym", "homegym", "bodyweight"],
    goal: ["muskelaufbau", "athletik"],
    link: "External Shoulder Rotation Cable Band"
  },
  {
    id: "ex_t4_sh5",
    name: "Scapula Push-Ups (Serratus-Aktivierung & Schulterblatt-Stabilität)",
    mechanic: "push_vert",
    equip: ["bodyweight", "homegym"],
    goal: ["athletik", "muskelaufbau"],
    link: "Scapular Push Up Ausführung"
  },

  // --- 2. KNIE-SCHONENDE & HÜFTDOMINANTE BEIN-ÜBUNGEN ---
  {
    id: "ex_t4_kn1",
    name: "Box Squats auf Bank/Box (Vertikales Schienbein – Knieschonend)",
    mechanic: "leg_squat",
    equip: ["gym", "homegym", "bodyweight"],
    goal: ["muskelaufbau", "kraft", "athletik"],
    link: "Box Squat richtige Ausführung"
  },
  {
    id: "ex_t4_kn2",
    name: "Chair Squats / Kontrolliertes Aufstehen vom Stuhl (Senioren & Reha)",
    mechanic: "leg_squat",
    equip: ["bodyweight", "homegym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Sit to Stand Chair Squat Exercise"
  },
  {
    id: "ex_t4_kn3",
    name: "Spanish Squats mit Widerstandsband (Patellasehnen-Schutz & Quadrizeps)",
    mechanic: "leg_press",
    equip: ["gym", "homegym", "bodyweight"],
    goal: ["muskelaufbau", "athletik"],
    link: "Spanish Squat Patellar Tendon"
  },
  {
    id: "ex_t4_kn4",
    name: "Rückwärts-Ausfallschritte mit Stütze (Reverse Lunge – Knieschonend)",
    mechanic: "leg_uni",
    equip: ["gym", "homegym", "bodyweight"],
    goal: ["muskelaufbau", "athletik"],
    link: "Reverse Lunge Knee Friendly"
  },
  {
    id: "ex_t4_kn5",
    name: "Step-Ups auf niedrige Box / Stufe (Gleichgewicht & Sturzprophylaxe)",
    mechanic: "leg_uni",
    equip: ["gym", "homegym", "bodyweight"],
    goal: ["muskelaufbau", "athletik"],
    link: "Low Box Step Up Balance"
  },
  {
    id: "ex_t4_kn6",
    name: "Glute Bridge March (Wechselseitiges Beinheben in Brücke – Beckenbodenschonend)",
    mechanic: "pull_hinge",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Glute Bridge March Postpartum"
  },
  {
    id: "ex_t4_kn7",
    name: "Sliding Leg Curls auf dem Boden (Handtuch-Beinbeuger für Hamstrings)",
    mechanic: "leg_curl",
    equip: ["bodyweight", "homegym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Sliding Hamstring Curl Towel"
  },

  // --- 3. RÜCKEN-SCHONENDE ZUG- & HINGE-ÜBUNGEN (0 AXIALE STAUCHUNG) ---
  {
    id: "ex_t4_bk1",
    name: "Brustgestütztes Kurzhantel-Rudern auf Schrägbank (Rücken-schonend)",
    mechanic: "pull_horiz",
    equip: ["gym", "homegym"],
    goal: ["muskelaufbau", "kraft"],
    link: "Chest Supported Dumbbell Row"
  },
  {
    id: "ex_t4_bk2",
    name: "Hip Thrusts (Langhantel oder Kurzhantel – Maximale Gesäßkraft ohne Rückenlast)",
    mechanic: "pull_hinge",
    equip: ["gym", "homegym"],
    goal: ["muskelaufbau", "kraft", "athletik"],
    link: "Barbell Dumbbell Hip Thrust Ausführung"
  },
  {
    id: "ex_t4_bk3",
    name: "Einarmiges Rudern mit Handstütze auf Bank (Wirbelsäulen-entlastend)",
    mechanic: "pull_horiz",
    equip: ["gym", "homegym"],
    goal: ["muskelaufbau", "kraft"],
    link: "One Arm Dumbbell Row Bench Support"
  },
  {
    id: "ex_t4_bk4",
    name: "Y-T-W Heben in Bauchlage (Oberer Rücken & Haltung ohne Zusatzlast)",
    mechanic: "pull_vert",
    equip: ["bodyweight", "homegym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Prone YTW Exercise Posture"
  },
  {
    id: "ex_t4_bk5",
    name: "Bizeps-Curls mit dem Handtuch / Rucksack (Zuhause & Gelenkschonend)",
    mechanic: "pull_iso",
    equip: ["bodyweight", "homegym"],
    goal: ["muskelaufbau"],
    link: "Backpack Bicep Curl Home Workout"
  },

  // --- 4. POSTPARTUM / RÜCKBILDUNG, CORE-REHA & SENIOREN-STABILITÄT ---
  {
    id: "ex_t4_pp1",
    name: "Dead Bugs (Kontrolliertes Käfer-Strecken – Diastase- & Beckenbodensicher)",
    mechanic: "core_flex",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Dead Bug Core Exercise Postpartum"
  },
  {
    id: "ex_t4_pp2",
    name: "Bird-Dog (Vierfüßler-Diagonalstrecken für tiefe Rücken- & Rumpfmuskulatur)",
    mechanic: "core_iso",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Bird Dog Exercise McGill Big 3"
  },
  {
    id: "ex_t4_pp3",
    name: "Pallof Press am Kabel oder Band (Anti-Rotation für Rumpf & Wirbelsäule)",
    mechanic: "core_rot",
    equip: ["gym", "homegym", "bodyweight"],
    goal: ["muskelaufbau", "kraft", "athletik"],
    link: "Pallof Press Anti Rotation Core"
  },
  {
    id: "ex_t4_pp4",
    name: "Side-Plank auf den Knien (Sanfte seitliche Rumpfstabilität & Rückbildung)",
    mechanic: "core_iso",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Modified Side Plank Knees"
  },
  {
    id: "ex_t4_pp5",
    name: "Farmer's Walk (Aufrechtes Tragen für Griffkraft, Core & Sturzprophylaxe)",
    mechanic: "core_iso",
    equip: ["gym", "homegym"],
    goal: ["kraft", "athletik", "muskelaufbau"],
    link: "Farmers Walk Carry Technique"
  },

  // --- 5. KINDER-, JUGEND- & VEREINSSPORT-ATHLETIK (MOTORIK & EXPLOSIVITÄT) ---
  {
    id: "ex_t4_kd1",
    name: "Bear Crawl (Bärengang für Ganzkörper-Koordination & Schulterstabilität)",
    mechanic: "core_iso",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["athletik", "muskelaufbau"],
    link: "Bear Crawl Exercise Technique"
  },
  {
    id: "ex_t4_kd2",
    name: "Copenhagen Adductor Hold (Kurzer Hebel – Kreuzband- & Leistenschutz Fußball)",
    mechanic: "leg_uni",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["athletik", "kraft"],
    link: "Copenhagen Plank Short Lever Adductor"
  },
  {
    id: "ex_t4_kd3",
    name: "Einbeiniges Wadenheben an der Stufe (Achillessehnen-Kraft & Sprungfeder)",
    mechanic: "leg_calf",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["muskelaufbau", "athletik"],
    link: "Single Leg Calf Raise Step"
  },
  {
    id: "ex_t4_kd4",
    name: "Rotations-Ausfallschritt mit gestreckten Armen (Thorakale Mobilität & Core)",
    mechanic: "core_rot",
    equip: ["bodyweight", "homegym", "gym"],
    goal: ["athletik", "muskelaufbau"],
    link: "Lunge with Thoracic Rotation"
  }
];

exerciseDB.push(...uebungenTeil4);
