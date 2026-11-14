// ============================================================================
// RE:MK ERNÄHRUNGS-DATENBANK - FILTER: ATHLET ("CLEAN EATING / GYM-FOKUS")
// Dateiname für zukünftige Gerichte dieses Filters: rezepte_filter_athlet.js
// ============================================================================
if (typeof recipeDB === 'undefined') { window.recipeDB = []; }

const rezepte_filter_athlet = [
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
  }
];
recipeDB.push(...rezepte_filter_athlet);

