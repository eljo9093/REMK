// ============================================================================
// RE:MK ERNÄHRUNGS-DATENBANK - FILTER: FAMILIE ("FAMILIEN-LIEBLINGE & KINDERFREUNDLICH")
// Dateiname für zukünftige Gerichte dieses Filters: rezepte_filter_familie.js
// ============================================================================
if (typeof recipeDB === 'undefined') { window.recipeDB = []; }

const rezepte_filter_familie = [
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
    id: "rf_fam_a1", name: "Ofen-Geflügelbällchen (Köttbullar Light) mit Kartoffelstampf & Rahmsauce Light",
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
recipeDB.push(...rezepte_filter_familie);

