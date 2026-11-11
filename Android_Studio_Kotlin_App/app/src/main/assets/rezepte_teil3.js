// RE:MK Zusatz-Rezepte Teil 3 (Alltags-, Schnell- & High-Protein-Gerichte ohne Kalorienfallen)
var rezepte_teil3 = [
  {
    id: "rec_t3_1", name: "High-Protein Kaiserschmarrn aus der Pfanne mit Skyr & heißen Kirschen",
    type: "veggie", category: "familie", prep: "schnell", tools: ["Pfanne", "Schüssel"], mealCategory: "Frühstück",
    cals: 580, prot: 46, carbs: 66, fat: 13, gluten: true, lactose: false,
    ingredients: [
      { name: "Magerquark / Skyr Natur", amount: 200, unit: "g", department: "Milchprodukte" },
      { name: "Dinkelmehl oder zarte Haferflocken", amount: 70, unit: "g", department: "Getreide" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Eier & Milch" },
      { name: "Sauerkirschen oder Beeren-Mix (TK/ungesüßt)", amount: 140, unit: "g", department: "Obst" }
    ],
    steps: [
      "🥞 Quark, Mehl/Haferflocken, Eigelb und 40 ml Mineralwasser glattrühren; Eiweiß kurz steif schlagen und unterheben.",
      "🍳 In einer beschichteten Pfanne goldbraun backen, mit zwei Gabeln in mundgerechte Stücke zerrupfen und mit heißen Kirschen servieren."
    ]
  },
  {
    id: "rec_t3_2", name: "Knusprige Hähnchen-Schupfnudel-Pfanne mit Spitzkohl & Kräuter-Skyr",
    type: "classic", category: "rustikal", prep: "schnell", tools: ["Pfanne"], mealCategory: "Mittagessen",
    cals: 690, prot: 56, carbs: 76, fat: 16, gluten: true, lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet (Rohgewicht)", amount: 200, unit: "g", department: "Fleisch" },
      { name: "Schupfnudeln oder Gnocchi (Kühlregal)", amount: 250, unit: "g", department: "Kühlregal" },
      { name: "Spitzkohl (fein geschnitten)", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur & Schnittlauch", amount: 80, unit: "g", department: "Milchprodukte" },
      { name: "Raps- oder Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🍳 Schupfnudeln und Hähnchenwürfel zusammen in einer großen beschichteten Pfanne im abgemessenen Öl 6 Min. goldbraun anbraten.",
      "🥬 Geschnittenen Spitzkohl und 4 EL Wasser zugeben, 5 Min. bissfest dünsten, mit Muskat, Salz und Pfeffer würzen und Skyr unterheben."
    ]
  },
  {
    id: "rec_t3_3", name: "Saftige Rinder-Cevapcici vom Blech mit Djuvec-Reis & Tzatziki Light",
    type: "classic", category: "familie", prep: "ofen", tools: ["Backofen", "Topf"], mealCategory: "Mittagessen",
    cals: 710, prot: 58, carbs: 80, fat: 16, gluten: false, lactose: false,
    ingredients: [
      { name: "Rindertatar / mageres Rinderhack (Rohgewicht)", amount: 210, unit: "g", department: "Fleisch" },
      { name: "Basmatireis (Trockengewicht)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Passierte Tomaten, Erbsen & Paprika", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Skyr Natur, Salatgurke & Knoblauch (für Tzatziki Light)", amount: 180, unit: "g", department: "Milchprodukte" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥩 Rinderhack mit Knoblauch, Paprikapulver, Salz und Pfeffer zu Cevapcici-Rollen formen und im Ofen bei 200 °C Umluft 16 Min. saftig backen.",
      "🍚 Reis mit passierten Tomaten, Paprikawürfeln und Erbsen in Gemüsebrühe zu aromatischem Djuvec-Reis garen und mit frischem Skyr-Gurken-Tzatziki servieren."
    ]
  },
  {
    id: "rec_t3_4", name: "High-Protein Thunfisch-Flammkuchen auf Vollkorn-Wrap mit roten Zwiebeln",
    type: "classic", category: "schicht", prep: "ofen", tools: ["Backofen"], mealCategory: "Abendessen",
    cals: 620, prot: 54, carbs: 60, fat: 16, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkorn-Tortilla Wraps (2 Stück)", amount: 120, unit: "g", department: "Brot" },
      { name: "Thunfisch im eigenen Saft (abgetropft)", amount: 150, unit: "g", department: "Fisch" },
      { name: "Skyr Natur & Frischkäse light (als Creme)", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Mozzarella light (gerieben)", amount: 50, unit: "g", department: "Milchprodukte" },
      { name: "Rote Zwiebelringe & Paprika", amount: 140, unit: "g", department: "Gemüse" }
    ],
    steps: [
      "🔥 Wraps mit gewürztem Skyr bestreichen, Thunfisch, Zwiebelringe, Paprika und Mozzarella light darauf verteilen und bei 200 °C Umluft 10 Min. knusprig backen."
    ]
  },
  {
    id: "rec_t3_5", name: "Knusprige Halloumi-/Grillkäse-Light & Kichererbsen-Bowl mit Ofenkartoffeln (Veggie)",
    type: "veggie", category: "athlet", prep: "ofen", tools: ["Backofen"], mealCategory: "Abendessen",
    cals: 660, prot: 42, carbs: 74, fat: 20, gluten: false, lactose: false,
    ingredients: [
      { name: "Kartoffeln / Drillinge (Rohgewicht)", amount: 300, unit: "g", department: "Gemüse" },
      { name: "Kichererbsen (Abtropfgewicht)", amount: 150, unit: "g", department: "Hülsenfrüchte" },
      { name: "Feta light / Grillkäse light", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Zucchini, Kirschtomaten & Spinat", amount: 220, unit: "g", department: "Gemüse" },
      { name: "Olivenöl", amount: 8, unit: "ml", department: "Öle" }
    ],
    steps: [
      "🥔 Kartoffeln, Kichererbsen und Zucchini mit den 8 ml Öl und Rosmarin bei 200 °C 22 Min. im Ofen rösten, Käse die letzten 8 Min. mitbacken."
    ]
  }
];
window.rezepte_teil3 = rezepte_teil3;
