// ============================================================================
// RE:MK ERNÄHRUNGS-DATENBANK - FILTER: SCHICHT ("SCHICHTARBEIT, BÜRO & BLITZKÜCHE")
// Dateiname für zukünftige Gerichte dieses Filters: rezepte_filter_schicht.js
// ============================================================================
if (typeof recipeDB === 'undefined') { window.recipeDB = []; }

const rezepte_filter_schicht = [
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
  }
];
recipeDB.push(...rezepte_filter_schicht);

