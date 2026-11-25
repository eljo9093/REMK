// ============================================================================
// RE:MK ERNÄHRUNGS-DATENBANK - FILTER: KAMPFSPORT ("TATAMI & PERFORMANCE")
// Dateiname für zukünftige Gerichte dieses Filters: rezepte_filter_kampfsport.js
// ============================================================================
if (typeof recipeDB === 'undefined') { window.recipeDB = []; }

const rezepte_filter_kampfsport = [
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
  }
];
recipeDB.push(...rezepte_filter_kampfsport);

