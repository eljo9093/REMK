// ============================================================================
// RE:MK ERNÄHRUNGS-DATENBANK - MODUL TEIL 4 (SNACKS, OFENGERICHTE, PESCETARISCH, PLANT-PROTEIN & FAMILIE)
// ============================================================================

if (typeof recipeDB === 'undefined') {
  window.recipeDB = [];
}

const rezepteTeil4 = [
  // --- 1. PRE-/POST-WORKOUT SNACKS (MPS-TRIGGER & SCHNELLE ENERGIE) ---
  {
    id: "r_t4_sn1",
    name: "Reiswaffel-Tower mit Erdnussmus, Banane & Whey-Dip",
    type: "classic",
    category: "athlet",
    prep: "nocook",
    tools: ["Schüssel", "Löffel"],
    mealCategory: "Snack",
    cals: 420,
    prot: 32,
    carbs: 48,
    fat: 10,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Reiswaffeln (ungesalzen)", amount: 35, unit: "g", department: "Getreide" },
      { name: "Whey Isolat (Vanille oder Schoko)", amount: 35, unit: "g", department: "Supplemente" },
      { name: "Banane (reif)", amount: 100, unit: "g", department: "Obst & Gemüse" },
      { name: "Erdnussmus (100% Natur)", amount: 15, unit: "g", department: "Aufstriche" }
    ],
    steps: [
      "Whey-Protein mit ganz wenig Wasser (ca. 40 ml) zu einer cremigen Glasur/Dip verrühren.",
      "Reiswaffeln mit dem Protein-Dip bestreichen.",
      "Banane in Scheiben schneiden, darauf verteilen und das Erdnussmus darüberträufeln."
    ]
  },
  {
    id: "r_t4_sn2",
    name: "Herzhafter Hüttenkäse-Puten-Wrap (5-Minuten-Rolle)",
    type: "classic",
    category: "schicht",
    prep: "nocook",
    tools: ["Brett", "Messer"],
    mealCategory: "Snack",
    cals: 410,
    prot: 38,
    carbs: 36,
    fat: 11,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Vollkorn-Tortilla Wrap", amount: 65, unit: "g", department: "Brot & Backwaren" },
      { name: "Körniger Frischkäse (Hüttenkäse light)", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Putenbrust-Aufschnitt", amount: 80, unit: "g", department: "Fleisch & Wurst" },
      { name: "Rucola oder Babyspinat", amount: 40, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "Tortilla-Wrap flach auslegen und mit dem körnigen Frischkäse bestreichen.",
      "Mit Pfeffer, Paprikapulver und Schnittlauch würzen.",
      "Putenbrust und Rucola darauflegen, fest einrollen und schräg halbieren."
    ]
  },
  {
    id: "r_t4_sn3",
    name: "Skyr-Beeren-Bowl mit Zartbitterschokolade & Mandeln",
    type: "classic",
    category: "familie",
    prep: "nocook",
    tools: ["Schüssel"],
    mealCategory: "Snack",
    cals: 390,
    prot: 36,
    carbs: 32,
    fat: 12,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Skyr Natur (oder laktosefreier Quark)", amount: 250, unit: "g", department: "Milchprodukte" },
      { name: "Beeren-Mix (frisch oder TK aufgetaut)", amount: 120, unit: "g", department: "Obst & Gemüse" },
      { name: "Gehackte Mandeln", amount: 15, unit: "g", department: "Nüsse & Samen" },
      { name: "Zartbitterschokolade (mind. 80%)", amount: 12, unit: "g", department: "Snacks" }
    ],
    steps: [
      "Skyr mit einem Schuss Mineralwasser cremig rühren.",
      "Beeren unterheben und mit gehackten Mandeln sowie geraspelter Zartbitterschokolade toppen."
    ]
  },
  {
    id: "r_t4_sn4",
    name: "Veganer Edamame-Kichererbsen-Power-Cup",
    type: "veggie",
    category: "schicht",
    prep: "nocook",
    tools: ["Schüssel"],
    mealCategory: "Snack",
    cals: 380,
    prot: 26,
    carbs: 38,
    fat: 12,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Edamame Bohnen (geschält, gegart)", amount: 130, unit: "g", department: "Hülsenfrüchte" },
      { name: "Kichererbsen (aus dem Glas, abgespült)", amount: 100, unit: "g", department: "Hülsenfrüchte" },
      { name: "Kürbiskerne (geröstet)", amount: 15, unit: "g", department: "Nüsse & Samen" },
      { name: "Sojasauce & Limettensaft", amount: 15, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "Edamame und Kichererbsen in einer Dose oder Schüssel mischen.",
      "Mit Sojasauce, Limettensaft und einer Prise Chiliflocken marinieren.",
      "Geröstete Kürbiskerne für den Crunch darüberstreuen."
    ]
  },
  {
    id: "r_t4_sn5",
    name: "High-Protein Milchreis mit heißen Zimt-Kirschen",
    type: "classic",
    category: "kampfsport",
    prep: "nocook",
    tools: ["Schüssel"],
    mealCategory: "Snack",
    cals: 430,
    prot: 30,
    carbs: 62,
    fat: 5,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "High-Protein Milchreis (Becher) oder Milchreis + Skyr", amount: 250, unit: "g", department: "Milchprodukte" },
      { name: "Sauerkirschen (ungesüßt oder TK)", amount: 120, unit: "g", department: "Obst & Gemüse" },
      { name: "Whey Protein Vanille", amount: 15, unit: "g", department: "Supplemente" },
      { name: "Ceylon-Zimt", amount: 2, unit: "g", department: "Gewürze & Öle" }
    ],
    steps: [
      "Den Milchreis mit dem Whey-Protein verrühren.",
      "Kirschen kurz erwärmen (oder kalt dazugeben) und kräftig mit Ceylon-Zimt abschmecken. Ideale Glykogen-Ladung vor dem Training!"
    ]
  },
  {
    id: "r_t4_sn6",
    name: "Pescetarische Thunfisch-Reiswaffel-Happen mit Avocado",
    type: "classic",
    category: "rustikal",
    prep: "nocook",
    tools: ["Schüssel", "Gabel"],
    mealCategory: "Snack",
    cals: 400,
    prot: 36,
    carbs: 30,
    fat: 14,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Thunfisch im eigenen Saft (abgetropft)", amount: 130, unit: "g", department: "Fisch" },
      { name: "Avocado (reif)", amount: 60, unit: "g", department: "Obst & Gemüse" },
      { name: "Mais- oder Reiswaffeln", amount: 35, unit: "g", department: "Getreide" },
      { name: "Zitronensaft, Salz & Pfeffer", amount: 5, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "Avocado mit einer Gabel zerdrücken und mit dem abgetropften Thunfisch sowie Zitronensaft vermengen.",
      "Mit Salz und Pfeffer abschmecken und dick auf die Reiswaffeln streichen."
    ]
  },
  {
    id: "r_t4_sn7",
    name: "Veganer Schoko-Bananen-Hafer-Smoothie (Flüssige Mahlzeit)",
    type: "veggie",
    category: "kampfsport",
    prep: "nocook",
    tools: ["Mixer / Shaker"],
    mealCategory: "Snack",
    cals: 440,
    prot: 32,
    carbs: 54,
    fat: 9,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Zarte Haferflocken (glutenfrei bei Bedarf)", amount: 45, unit: "g", department: "Getreide" },
      { name: "Veganes Proteinpulver (Schoko)", amount: 35, unit: "g", department: "Supplemente" },
      { name: "Banane", amount: 100, unit: "g", department: "Obst & Gemüse" },
      { name: "Mandel- oder Haferdrink (ungesüßt)", amount: 300, unit: "ml", department: "Milchprodukte" }
    ],
    steps: [
      "Alle Zutaten in den Standmixer geben und 30 Sekunden cremig mixen.",
      "Sofort trinkbar – ideal 60 Minuten vor dem Training oder direkt danach."
    ]
  },
  {
    id: "r_t4_sn8",
    name: "Rustikale Harzer-Quark-Stulle mit Schnittlauch",
    type: "classic",
    category: "rustikal",
    prep: "nocook",
    tools: ["Brett", "Messer"],
    mealCategory: "Snack",
    cals: 390,
    prot: 42,
    carbs: 38,
    fat: 6,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Roggen-Vollkornbrot", amount: 100, unit: "g", department: "Brot & Backwaren" },
      { name: "Magerquark", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Harzer Roller / Handkäse (mild)", amount: 60, unit: "g", department: "Milchprodukte" },
      { name: "Frischer Schnittlauch & Kümmel", amount: 10, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "Vollkornbrot dick mit gewürztem Magerquark bestreichen.",
      "Harzer Käse in dünne Scheiben schneiden, darauflegen und mit viel frischem Schnittlauch bestreuen."
    ]
  },

  // --- 2. OFENGERICHTE & AUFLÄUFE (PASSIVES KOCHEN & FAMILIEN-LIEBLINGE) ---
  {
    id: "r_t4_of1",
    name: "High-Protein Gnocchi-Hähnchen-Tomaten-Auflauf (One-Bake)",
    type: "classic",
    category: "familie",
    prep: "ofen",
    tools: ["Backofen", "Auflaufform"],
    mealCategory: "Mittagessen",
    cals: 740,
    prot: 56,
    carbs: 82,
    fat: 18,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Frische Gnocchi (aus dem Kühlregal)", amount: 220, unit: "g", department: "Getreide" },
      { name: "Hähnchenbrust-Geschnetzeltes", amount: 180, unit: "g", department: "Fleisch & Wurst" },
      { name: "Passierte Tomaten", amount: 200, unit: "ml", department: "Konserven" },
      { name: "Mozzarella light (gerieben)", amount: 70, unit: "g", department: "Milchprodukte" },
      { name: "Kirschtomaten & Basilikum", amount: 100, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "Backofen auf 200 °C Umluft vorheizen.",
      "Gnocchi (ungekocht!), Hähnchenwürfel, halbierte Kirschtomaten und passierte Tomaten direkt in einer Auflaufform vermengen, mit Salz, Pfeffer und Oregano würzen.",
      "Mit Mozzarella light bestreuen und ca. 22–25 Minuten goldbraun backen."
    ]
  },
  {
    id: "r_t4_of2",
    name: "Mediterranes Ofen-Kabeljau-Blech mit Süßkartoffel & Zucchini",
    type: "classic",
    category: "athlet",
    prep: "ofen",
    tools: ["Backofen", "Backblech"],
    mealCategory: "Abendessen",
    cals: 660,
    prot: 52,
    carbs: 74,
    fat: 14,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Kabeljau-Rückenfilet (frisch oder TK aufgetaut)", amount: 220, unit: "g", department: "Fisch" },
      { name: "Süßkartoffeln", amount: 280, unit: "g", department: "Obst & Gemüse" },
      { name: "Zucchini & rote Paprika", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Zitronensaft", amount: 12, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "Süßkartoffeln und Gemüse würfeln, auf einem Backblech mit Olivenöl, Rosmarin und Salz mischen und bei 200 °C 15 Minuten vorbacken.",
      "Kabeljaufilet mit Zitronensaft beträufeln, auf das Gemüse legen und weitere 12 Minuten saftig garen."
    ]
  },
  {
    id: "r_t4_of3",
    name: "Deftiger Kartoffel-Hackfleisch-Brokkoli-Gratin (Brot & Eisen)",
    type: "classic",
    category: "rustikal",
    prep: "ofen",
    tools: ["Backofen", "Auflaufform"],
    mealCategory: "Mittagessen",
    cals: 780,
    prot: 58,
    carbs: 68,
    fat: 28,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Rinderhackfleisch (mager / Tatar)", amount: 180, unit: "g", department: "Fleisch & Wurst" },
      { name: "Kartoffeln (festkochend, in dünnen Scheiben)", amount: 300, unit: "g", department: "Obst & Gemüse" },
      { name: "Brokkoli-Röschen", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Kochsahne light (7% Fett) oder Milch-Ei-Guss", amount: 100, unit: "ml", department: "Milchprodukte" },
      { name: "Reibekäse light", amount: 50, unit: "g", department: "Milchprodukte" }
    ],
    steps: [
      "Kartoffelscheiben, Brokkoliröschen und gewürztes Rinderhack in eine Auflaufform schichten.",
      "Mit der leichten Kochsahne (gewürzt mit Muskatnuss, Salz und Pfeffer) übergießen und Käse darüberstreuen.",
      "Bei 190 °C Umluft ca. 30–35 Minuten im Ofen überbacken."
    ]
  },
  {
    id: "r_t4_of4",
    name: "Veganer Ofen-Süßkartoffel-Kichererbsen-Traybake mit Tahini",
    type: "veggie",
    category: "familie",
    prep: "ofen",
    tools: ["Backofen", "Backblech"],
    mealCategory: "Abendessen",
    cals: 690,
    prot: 30,
    carbs: 92,
    fat: 20,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Kichererbsen (gegart)", amount: 180, unit: "g", department: "Hülsenfrüchte" },
      { name: "Süßkartoffeln", amount: 250, unit: "g", department: "Obst & Gemüse" },
      { name: "Räuchertofu (gewürfelt)", amount: 100, unit: "g", department: "Milchprodukte / Veggie" },
      { name: "Blumenkohl-Röschen", amount: 180, unit: "g", department: "Obst & Gemüse" },
      { name: "Tahini (Sesammus) & Zitronensaft", amount: 20, unit: "g", department: "Aufstriche" }
    ],
    steps: [
      "Süßkartoffelwürfel, Blumenkohl, Kichererbsen und Räuchertofu auf einem Blech verteilen, mit Paprikapulver, Kreuzkümmel und Salz würzen.",
      "Im Ofen bei 200 °C ca. 25 Minuten knusprig rösten.",
      "Tahini mit Zitronensaft und 2 EL Wasser glattrühren und über das heiße Blechgemüse geben."
    ]
  },
  {
    id: "r_t4_of5",
    name: "Griechisches Ofen-Hähnchen mit Feta, Oliven & Drillingen",
    type: "classic",
    category: "familie",
    prep: "ofen",
    tools: ["Backofen", "Backblech"],
    mealCategory: "Abendessen",
    cals: 720,
    prot: 60,
    carbs: 62,
    fat: 24,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet", amount: 200, unit: "g", department: "Fleisch & Wurst" },
      { name: "Drillings-Kartoffeln (halbiert)", amount: 280, unit: "g", department: "Obst & Gemüse" },
      { name: "Feta / Hirtenkäse light", amount: 70, unit: "g", department: "Milchprodukte" },
      { name: "Paprika, rote Zwiebel & Kirschtomaten", amount: 180, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Oregano", amount: 10, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "Halbierte Drillinge, Gemüse und Hähnchenbrust auf ein Backblech geben, mit Öl und Oregano marinieren.",
      "Feta darüberbröseln und bei 200 °C ca. 25–28 Minuten im Ofen garen."
    ]
  },
  {
    id: "r_t4_of6",
    name: "Baked Oats (Gebackener Apfel-Zimt-Haferkuchen aus dem Ofen)",
    type: "classic",
    category: "familie",
    prep: "ofen",
    tools: ["Backofen", "Auflaufform"],
    mealCategory: "Frühstück",
    cals: 580,
    prot: 42,
    carbs: 72,
    fat: 12,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Haferflocken", amount: 85, unit: "g", department: "Getreide" },
      { name: "Magerquark oder Skyr", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Ei (Größe M)", amount: 1, unit: "Stück", department: "Milchprodukte" },
      { name: "Apfel (gewürfelt)", amount: 120, unit: "g", department: "Obst & Gemüse" },
      { name: "Whey Protein Vanille & Zimt", amount: 20, unit: "g", department: "Supplemente" }
    ],
    steps: [
      "Haferflocken, Quark, Ei, Whey, Zimt und 50 ml Wasser oder Milch verrühren.",
      "Apfelwürfel unterheben, in eine kleine ofenfeste Form füllen und bei 190 °C ca. 20 Minuten wie einen warmen Kuchen backen."
    ]
  },

  // --- 3. PESCETARISCHE & LEICHTE ATHLETEN-HAUPTGERICHTE ---
  {
    id: "r_t4_ps1",
    name: "Asiatische Garnelen-Reisnudel-Pfanne mit Pak Choi & Limette",
    type: "classic",
    category: "kampfsport",
    prep: "schnell",
    tools: ["Pfanne / Wok", "Topf"],
    mealCategory: "Mittagessen",
    cals: 650,
    prot: 48,
    carbs: 86,
    fat: 11,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Riesengarnelen / Shrimps (geschält)", amount: 200, unit: "g", department: "Fisch" },
      { name: "Reisnudeln (Mie- oder Bandnudeln)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Pak Choi, Karotte & Frühlingszwiebel", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Sesamöl & Sojasauce", amount: 15, unit: "ml", department: "Asiatisch" }
    ],
    steps: [
      "Reisnudeln mit kochendem Wasser übergießen und 4 Minuten ziehen lassen.",
      "Garnelen und geschnittenes Gemüse im heißen Wok mit Sesamöl 4 Minuten scharf anbraten.",
      "Abgetropfte Reisnudeln und Sojasauce dazugeben und kurz durchschwenken."
    ]
  },
  {
    id: "r_t4_ps2",
    name: "Seelachsfilet auf cremigem Senf-Kartoffelstampf & Rahmspinat",
    type: "classic",
    category: "familie",
    prep: "schnell",
    tools: ["Pfanne", "Topf"],
    mealCategory: "Mittagessen",
    cals: 670,
    prot: 50,
    carbs: 76,
    fat: 16,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Alaska-Seelachsfilet", amount: 220, unit: "g", department: "Fisch" },
      { name: "Kartoffeln (mehligkochend)", amount: 320, unit: "g", department: "Obst & Gemüse" },
      { name: "Blattspinat (TK oder frisch)", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Körniger Senf & ein Schuss Milch", amount: 30, unit: "g", department: "Gewürze & Öle" }
    ],
    steps: [
      "Kartoffeln weich kochen, abgießen und mit Milch sowie körnigem Senf zerstampfen.",
      "Spinat im kleinen Topf dünsten, Seelachsfilet in der Pfanne von beiden Seiten 4 Minuten braten."
    ]
  },
  {
    id: "r_t4_ps3",
    name: "Lachs-Teriyaki-Poke-Bowl mit Jasminreis, Edamame & Gurke",
    type: "classic",
    category: "schicht",
    prep: "schnell",
    tools: ["Topf", "Pfanne"],
    mealCategory: "Abendessen",
    cals: 730,
    prot: 52,
    carbs: 78,
    fat: 22,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Lachsfilet (in Würfeln)", amount: 170, unit: "g", department: "Fisch" },
      { name: "Jasminreis", amount: 100, unit: "g", department: "Getreide" },
      { name: "Edamame Bohnen (geschält)", amount: 70, unit: "g", department: "Hülsenfrüchte" },
      { name: "Salatgurke & Karottenstreifen", amount: 150, unit: "g", department: "Obst & Gemüse" },
      { name: "Teriyaki-Sauce & Sesam", amount: 20, unit: "ml", department: "Asiatisch" }
    ],
    steps: [
      "Jasminreis kochen und in eine tiefe Bowl geben.",
      "Lachswürfel in der Pfanne kurz anbraten und mit Teriyaki-Sauce glasieren.",
      "Mit Edamame, Gurke und Karotte auf dem Reis anrichten – schmeckt warm und kalt im Büro!"
    ]
  },

  // --- 4. PFLANZLICHE HIGH-PROTEIN & VEGGIE-GERICHTE ---
  {
    id: "r_t4_vg1",
    name: "Knusprige Tofu-Erdnuss-Reis-Bowl mit Brokkoli",
    type: "veggie",
    category: "athlet",
    prep: "schnell",
    tools: ["Pfanne", "Topf"],
    mealCategory: "Mittagessen",
    cals: 710,
    prot: 40,
    carbs: 84,
    fat: 22,
    gluten: false,
    lactose: true,
    ingredients: [
      { name: "Fester Natur- oder Räuchertofu", amount: 200, unit: "g", department: "Milchprodukte / Veggie" },
      { name: "Basmatireis", amount: 100, unit: "g", department: "Getreide" },
      { name: "Brokkoli", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Erdnussmus & Sojasauce", amount: 25, unit: "g", department: "Aufstriche" }
    ],
    steps: [
      "Reis und Brokkoli garen.",
      "Tofu würfeln und in der beschichteten Pfanne rundherum knusprig anbraten.",
      "Erdnussmus mit Sojasauce und etwas warmem Wasser zu einer Sauce rühren und über Tofu und Reis geben."
    ]
  },
  {
    id: "r_t4_vg2",
    name: "Deftige Rote-Linsen-Bolognese auf Vollkorn-Spaghetti",
    type: "veggie",
    category: "familie",
    prep: "schnell",
    tools: ["Topf"],
    mealCategory: "Mittagessen",
    cals: 690,
    prot: 36,
    carbs: 108,
    fat: 10,
    gluten: true,
    lactose: true,
    ingredients: [
      { name: "Vollkorn-Spaghetti (oder Linsen-Pasta)", amount: 110, unit: "g", department: "Getreide" },
      { name: "Rote Linsen (getrocknet)", amount: 85, unit: "g", department: "Hülsenfrüchte" },
      { name: "Gehackte Tomaten (Dose)", amount: 250, unit: "g", department: "Konserven" },
      { name: "Karotte, Zwiebel & Knoblauch", amount: 120, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "Zwiebel, Knoblauch und fein gewürfelte Karotte im Topf anschwitzen.",
      "Rote Linsen und gehackte Tomaten sowie 150 ml Brühe zugeben und 15 Minuten weich köcheln.",
      "Parallel die Pasta al dente kochen und mit der Linsen-Bolognese servieren."
    ]
  },
  {
    id: "r_t4_vg3",
    name: "Mexikanische Black-Bean-Quinoa-Bowl mit Mais & Guacamole",
    type: "veggie",
    category: "schicht",
    prep: "schnell",
    tools: ["Topf", "Schüssel"],
    mealCategory: "Abendessen",
    cals: 660,
    prot: 30,
    carbs: 92,
    fat: 18,
    gluten: false,
    lactose: true,
    ingredients: [
      { name: "Quinoa (ungekocht)", amount: 85, unit: "g", department: "Getreide" },
      { name: "Schwarze Bohnen (Dose, abgespült)", amount: 150, unit: "g", department: "Hülsenfrüchte" },
      { name: "Mais & rote Paprika", amount: 140, unit: "g", department: "Obst & Gemüse" },
      { name: "Avocado", amount: 70, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "Quinoa in der doppelten Menge Salzwasser 15 Minuten quellen lassen.",
      "Schwarze Bohnen, Mais, gewürfelte Paprika und zerdrückte Avocado unterheben, mit Kreuzkümmel und Limette abschmecken."
    ]
  },
  {
    id: "r_t4_vg4",
    name: "Herzhaftes Tofu-Scramble (Veganes Rührei) mit Vollkornbrot",
    type: "veggie",
    category: "rustikal",
    prep: "schnell",
    tools: ["Pfanne"],
    mealCategory: "Frühstück",
    cals: 540,
    prot: 34,
    carbs: 52,
    fat: 20,
    gluten: true,
    lactose: true,
    ingredients: [
      { name: "Naturtofu", amount: 180, unit: "g", department: "Milchprodukte / Veggie" },
      { name: "Vollkornbrot", amount: 110, unit: "g", department: "Brot & Backwaren" },
      { name: "Kirschtomaten & Schnittlauch", amount: 100, unit: "g", department: "Obst & Gemüse" },
      { name: "Kurkuma, Kala Namak (Schwefelsalz) & Olivenöl", amount: 8, unit: "g", department: "Gewürze & Öle" }
    ],
    steps: [
      "Tofu mit den Händen oder einer Gabel in eine heiße Pfanne krümeln.",
      "Mit Kurkuma (für die gelbe Farbe), Pfeffer und geviertelten Kirschtomaten 5 Minuten anbraten und auf dem Vollkornbrot anrichten."
    ]
  },

  // --- 5. BLITZ-KÜCHE OHNE KOCHEN & SCHICHTARBEIT ---
  {
    id: "r_t4_nc1",
    name: "Overnight Oats „Schwarzwälder Kirsch“ mit Chiasamen & Skyr",
    type: "classic",
    category: "schicht",
    prep: "nocook",
    tools: ["Schraubglas / Dose"],
    mealCategory: "Frühstück",
    cals: 560,
    prot: 42,
    carbs: 68,
    fat: 11,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Zarte Haferflocken", amount: 80, unit: "g", department: "Getreide" },
      { name: "Skyr oder Magerquark", amount: 150, unit: "g", department: "Milchprodukte" },
      { name: "Whey Protein Schoko", amount: 25, unit: "g", department: "Supplemente" },
      { name: "Sauerkirschen", amount: 100, unit: "g", department: "Obst & Gemüse" },
      { name: "Chiasamen", amount: 10, unit: "g", department: "Nüsse & Samen" }
    ],
    steps: [
      "Haferflocken, Chiasamen, Schoko-Whey und Skyr mit 100 ml Wasser oder Milch im Glas verrühren.",
      "Kirschen daraufgeben und über Nacht (oder mind. 2 Stunden) im Kühlschrank ziehen lassen."
    ]
  },
  {
    id: "r_t4_nc2",
    name: "Brot & Eisen Vesper-Platte: Roastbeef, Ei, Hüttenkäse & Bauernbrot",
    type: "classic",
    category: "rustikal",
    prep: "nocook",
    tools: ["Brett", "Messer"],
    mealCategory: "Abendessen",
    cals: 640,
    prot: 56,
    carbs: 54,
    fat: 20,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Sauerteig-Bauernbrot", amount: 130, unit: "g", department: "Brot & Backwaren" },
      { name: "Roastbeef-Aufschnitt oder Rinderschinken", amount: 100, unit: "g", department: "Fleisch & Wurst" },
      { name: "Eier (hartgekocht, verzehrfertig)", amount: 2, unit: "Stück", department: "Milchprodukte" },
      { name: "Körniger Frischkäse", amount: 100, unit: "g", department: "Milchprodukte" },
      { name: "Gewürzgurken & Radieschen", amount: 100, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "Bauernbrot in kräftige Scheiben schneiden und mit körnigem Frischkäse bestreichen.",
      "Mit Roastbeef und halbierten Eiern belegen, Gurken und Radieschen dazu essen – 0 Minuten Kochzeit!"
    ]
  },
  {
    id: "r_t4_nc3",
    name: "Mediterraner Couscous-Feta-Hähnchen-Salat (5-Minuten-Quellmethode)",
    type: "classic",
    category: "schicht",
    prep: "nocook",
    tools: ["Schüssel", "Wasserkocher"],
    mealCategory: "Mittagessen",
    cals: 680,
    prot: 52,
    carbs: 72,
    fat: 18,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Couscous (Instant)", amount: 100, unit: "g", department: "Getreide" },
      { name: "Hähnchenbrust-Streifen (fertig gegart)", amount: 150, unit: "g", department: "Fleisch & Wurst" },
      { name: "Feta light", amount: 60, unit: "g", department: "Milchprodukte" },
      { name: "Gurke, Tomate & Minze", amount: 180, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Zitronensaft", amount: 10, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "Couscous in einer Schüssel mit 150 ml kochendem Salzwasser aus dem Wasserkocher übergießen und 5 Minuten abgedeckt quellen lassen.",
      "Mit einer Gabel auflockern, gewürfeltes Gemüse, Hähnchenstreifen und zerbröselten Feta unterheben."
    ]
  }
,
  // --- 6. SMART FAST-FOOD & RESTAURANT-STYLE DAHEIM (HIGH-PROTEIN, OHNE KALORIENFALLE!) ---
  {
    id: "r_t4_ff1",
    name: "Fitness-Döner-Teller Daheim: Knusprige Hähnchen-Kebab-Streifen, Reis, Rotkohl & Skyr-Knoblauchsauce",
    type: "classic",
    category: "familie",
    prep: "schnell",
    tools: ["Pfanne", "Topf"],
    mealCategory: "Mittagessen",
    cals: 685,
    prot: 58,
    carbs: 78,
    fat: 14,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Hähnchenbrustfilet oder Putenbrust (dünn geschnitten)", amount: 210, unit: "g", department: "Fleisch & Wurst" },
      { name: "Basmatireis (Trockengewicht)", amount: 95, unit: "g", department: "Getreide" },
      { name: "Skyr Natur (für Döner-Knoblauch-Kräutersauce)", amount: 120, unit: "g", department: "Milchprodukte" },
      { name: "Rotkohl, Eisbergsalat, Gurke & Tomate", amount: 220, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Gyros-/Kebab-Gewürz", amount: 8, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "🍚 Basmatireis in Salzwasser garen.",
      "🥙 Hähnchenstreifen mit Kebab-/Gyrosgewürz im heißen Öl 6 Min. knusprig braten.",
      "🥣 Aus Skyr, etwas Wasser, Knoblauch, Dill, Zitronensaft, Salz und Pfeffer eine kalorienarme Döner-Weiße-Sauce rühren (spart 350 kcal gegenüber Imbiss-Mayosauce!)."
    ]
  },
  {
    id: "r_t4_ff2",
    name: "High-Protein Dürüm Kebab-Rolle mit Rindertatar/Hähnchen, Rotkohl & Kräuter-Skyr",
    type: "classic",
    category: "schicht",
    prep: "schnell",
    tools: ["Pfanne"],
    mealCategory: "Abendessen",
    cals: 650,
    prot: 54,
    carbs: 68,
    fat: 16,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Vollkorn-Tortilla Wraps (2 Stück)", amount: 120, unit: "g", department: "Brot & Backwaren" },
      { name: "Hähnchenbrust-Streifen oder Rindertatar", amount: 190, unit: "g", department: "Fleisch & Wurst" },
      { name: "Skyr Natur & Knoblauch", amount: 100, unit: "g", department: "Milchprodukte" },
      { name: "Eisbergsalat, Tomate, Gurke & Zwiebelringe", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl", amount: 6, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "🥙 Fleisch kräftig mit Kreuzkümmel, Paprika, Oregano und Knoblauch in der Pfanne anbraten.",
      "🌯 Wraps kurz erwärmen, mit Knoblauch-Skyr bestreichen, Salat und heißes Fleisch einrollen – schmeckt wie beim Lieblings-Döner!"
    ]
  },
  {
    id: "r_t4_ff3",
    name: "Double Smash-Cheeseburger (Protein-Style) mit Ofen-Wedges & Big-Mac-Skyr-Sauce",
    type: "classic",
    category: "rustikal",
    prep: "ofen",
    tools: ["Backofen", "Pfanne"],
    mealCategory: "Abendessen",
    cals: 710,
    prot: 58,
    carbs: 66,
    fat: 20,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Rindertatar / mageres Rinderhack (2 Patties)", amount: 200, unit: "g", department: "Fleisch & Wurst" },
      { name: "Vollkorn-Burger-Bun oder Roggenbrötchen", amount: 85, unit: "g", department: "Brot & Backwaren" },
      { name: "Kartoffeln (für Ofen-Wedges)", amount: 220, unit: "g", department: "Obst & Gemüse" },
      { name: "Cheddar Light / Schmelzkäse Light (2 Scheiben)", amount: 40, unit: "g", department: "Milchprodukte" },
      { name: "Skyr, Senf, Light-Ketchup & Gewürzgurken (Burger-Sauce)", amount: 70, unit: "g", department: "Milchprodukte" },
      { name: "Rapsöl", amount: 6, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "🍟 Kartoffelspalten bei 200 °C Umluft 22 Min. im Ofen knusprig backen.",
      "🍔 Rinderhack zu 2 flachen Smash-Patties drücken, in der heißen Pfanne je Seite 2 Min. scharf braten, Käse light darauf schmelzen und im gerösteten Bun mit der selbstgemachten Big-Mac-Skyr-Sauce servieren."
    ]
  },
  {
    id: "r_t4_ff4",
    name: "Asia-Imbiss Daheim: Gebratene Hähnchen-Nudel-Box mit Wok-Gemüse & Soja-Ingwer-Glaze",
    type: "classic",
    category: "kampfsport",
    prep: "schnell",
    tools: ["Pfanne / Wok", "Topf"],
    mealCategory: "Mittagessen",
    cals: 690,
    prot: 54,
    carbs: 84,
    fat: 14,
    gluten: true,
    lactose: true,
    ingredients: [
      { name: "Hähnchenbrustfilet (in Streifen)", amount: 200, unit: "g", department: "Fleisch & Wurst" },
      { name: "Mie-Nudeln oder Vollkornnudeln (Trockengewicht)", amount: 105, unit: "g", department: "Getreide" },
      { name: "Karotten, Lauch, Spitzkohl & Sojasprossen", amount: 240, unit: "g", department: "Obst & Gemüse" },
      { name: "Sojasauce & Sesamöl", amount: 20, unit: "ml", department: "Asiatisch" }
    ],
    steps: [
      "🍜 Nudeln kurz garen und abtropfen lassen.",
      "🥢 Hähnchenstreifen im heißen Wok 4 Min. scharf anbraten, fein geschnittenes Wok-Gemüse und Nudeln zugeben, mit Sojasauce Pfannenrühren – 60 % weniger Fett als vom Imbiss!"
    ]
  },
  {
    id: "r_t4_ff5",
    name: "Griechischer Gyros-Teller (Hähnchen/Pute) mit Ofen-Pommes, Krautsalat & Tzatziki Light",
    type: "classic",
    category: "rustikal",
    prep: "ofen",
    tools: ["Backofen", "Pfanne"],
    mealCategory: "Abendessen",
    cals: 675,
    prot: 56,
    carbs: 72,
    fat: 15,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Hähnchen- oder Putenbrust (in Gyros-Streifen)", amount: 210, unit: "g", department: "Fleisch & Wurst" },
      { name: "Kartoffeln (in Pommes-Stiften, Rohgewicht)", amount: 320, unit: "g", department: "Obst & Gemüse" },
      { name: "Skyr Natur & geraspelte Salatgurke (Tzatziki Light)", amount: 180, unit: "g", department: "Milchprodukte" },
      { name: "Spitzkohl / Weißkohl & rote Zwiebel", amount: 160, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Gyrosgewürz", amount: 8, unit: "ml", department: "Gewürze & Öle" }
    ],
    steps: [
      "🍟 Kartoffelstifte im Ofen bei 200 °C Umluft 25 Min. knusprig backen.",
      "🇬🇷 Fleisch mit Gyrosgewürz und Zwiebelringen in der Pfanne kross braten und mit frischem Skyr-Tzatziki servieren."
    ]
  },
  {
    id: "r_t4_ff6",
    name: "High-Protein Quark-Öl-Teig Steinofen-Pizza (Margherita / Tonno / Pute) vom Blech",
    type: "classic",
    category: "familie",
    prep: "ofen",
    tools: ["Backofen", "Backblech"],
    mealCategory: "Abendessen",
    cals: 680,
    prot: 56,
    carbs: 72,
    fat: 16,
    gluten: true,
    lactose: false,
    ingredients: [
      { name: "Dinkelmehl (für den schnellen Protein-Teig)", amount: 90, unit: "g", department: "Getreide" },
      { name: "Magerquark / Skyr (im Teig)", amount: 140, unit: "g", department: "Milchprodukte" },
      { name: "Putenbrust-Schinken oder Thunfisch", amount: 90, unit: "g", department: "Fleisch & Wurst" },
      { name: "Mozzarella Light (gerieben)", amount: 80, unit: "g", department: "Milchprodukte" },
      { name: "Passierte Tomaten, Champignons & Paprika", amount: 200, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "🍕 Mehl, Magerquark, 1 TL Backpulver und 1 Prise Salz ohne Gehzeit zu einem geschmeidigen Pizzateig verkneten und dünn ausrollen.",
      "🧀 Mit gewürzten Tomaten, Gemüse, Putenbrust/Thunfisch und Mozzarella Light belegen und bei 210 °C Umluft 14–16 Min. knusprig backen."
    ]
  },

  // --- 7. SPEZIAL-NISCHEN FÜR STRENGE ALLERGIE- & FILTER-KOMBINATIONEN ---
  // (Rein Vegan + Nussfrei + Sojafrei + Glutenfrei + No-Cook / Kaltküche)
  {
    id: "r_t4_sp1",
    name: "Rein Veganes No-Cook Beeren-Kokos-Reisflocken-Bowl mit Hanf-/Kürbiskernen (Gluten-, Soja- & Nussfrei!)",
    type: "veggie",
    category: "athlet",
    prep: "nocook",
    tools: ["Schüssel", "Wasserkocher"],
    mealCategory: "Frühstück",
    cals: 560,
    prot: 32,
    carbs: 74,
    fat: 14,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Reisflocken oder glutenfreie Haferflocken", amount: 85, unit: "g", department: "Getreide" },
      { name: "Veganes Erbsen-/Reis-Protein (oder Kürbiskerne)", amount: 35, unit: "g", department: "Supplemente" },
      { name: "Beeren-Mix & Banane", amount: 150, unit: "g", department: "Obst & Gemüse" },
      { name: "Kürbiskerne oder Chiasamen (nussfrei)", amount: 20, unit: "g", department: "Nüsse & Samen" },
      { name: "Hafer- oder Kokosdrink ungesüßt", amount: 220, unit: "ml", department: "Pflanzendrinks" }
    ],
    steps: [
      "🥣 Flocken mit warmem oder kaltem Pflanzendrink verrühren, 3 Min. ziehen lassen und mit Beeren sowie Kürbiskernen toppen – 100 % vegan, glutenfrei, laktosefrei, sojafrei und nussfrei!"
    ]
  },
  {
    id: "r_t4_sp2",
    name: "Rein Vegane Mediterrane Kichererbsen-Quinoa-Bowl mit Avocado & Zitrone (Soja-, Gluten- & Nussfrei)",
    type: "veggie",
    category: "schicht",
    prep: "nocook",
    tools: ["Schüssel"],
    mealCategory: "Mittagessen",
    cals: 650,
    prot: 28,
    carbs: 84,
    fat: 20,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Kichererbsen (aus dem Glas, abgespült)", amount: 220, unit: "g", department: "Hülsenfrüchte" },
      { name: "Reiswaffeln oder vorgegarter Quinoa/Reis", amount: 75, unit: "g", department: "Getreide" },
      { name: "Avocado (Fruchtfleisch)", amount: 70, unit: "g", department: "Obst & Gemüse" },
      { name: "Kirschtomaten, Salatgurke & rote Paprika", amount: 220, unit: "g", department: "Obst & Gemüse" },
      { name: "Kürbiskerne, Olivenöl & Zitronensaft", amount: 20, unit: "g", department: "Gewürze & Öle" }
    ],
    steps: [
      "🥗 Kichererbsen, gewürfeltes Gemüse, Avocado und Kürbiskerne mit Zitronensaft, Kräutern und Olivenöl vermengen – komplett ohne Kochen, ohne Soja, ohne Gluten und ohne Nüsse!"
    ]
  },
  {
    id: "r_t4_sp3",
    name: "Rein Veganes Süßkartoffel-Rote-Linsen-Ofenblech mit Spinat & Tahini (Gluten-, Soja- & Nussfrei)",
    type: "veggie",
    category: "familie",
    prep: "ofen",
    tools: ["Backofen", "Auflaufform"],
    mealCategory: "Abendessen",
    cals: 670,
    prot: 34,
    carbs: 94,
    fat: 16,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Rote Linsen (Trockengewicht)", amount: 100, unit: "g", department: "Hülsenfrüchte" },
      { name: "Süßkartoffeln (gewürfelt, Rohgewicht)", amount: 280, unit: "g", department: "Obst & Gemüse" },
      { name: "Passierte Tomaten & Gemüsebrühe", amount: 220, unit: "g", department: "Konserven" },
      { name: "Blattspinat & Zucchini", amount: 200, unit: "g", department: "Obst & Gemüse" },
      { name: "Tahini (Sesammus) oder Olivenöl", amount: 18, unit: "g", department: "Gewürze & Öle" }
    ],
    steps: [
      "🔥 Süßkartoffelwürfel, Zucchini, rote Linsen, passierte Tomaten und 200 ml Gemüsebrühe in einer Auflaufform mischen und bei 200 °C Umluft 25 Min. im Ofen backen, bis Linsen und Süßkartoffeln weich sind."
    ]
  },
  {
    id: "r_t4_sp4",
    name: "No-Cook Pescetarisches Lachs-Avocado-Reiswaffel-Board mit Gurkensalat (Gluten-, Laktose- & Nussfrei)",
    type: "classic",
    category: "kampfsport",
    prep: "nocook",
    tools: ["Teller", "Messer"],
    mealCategory: "Mittagessen",
    cals: 630,
    prot: 46,
    carbs: 62,
    fat: 20,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Stremellachs oder Räucherlachs (verzehrfertig)", amount: 160, unit: "g", department: "Fisch" },
      { name: "Reiswaffeln", amount: 75, unit: "g", department: "Getreide" },
      { name: "Avocado", amount: 65, unit: "g", department: "Obst & Gemüse" },
      { name: "Salatgurke, Kirschtomaten & Dill", amount: 220, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "🐟 Reiswaffeln mit zerdrückter Avocado bestreichen, Stremellachs darauf verteilen und mit frischem Dill sowie Gurken-Tomaten-Salat ohne Kochen genießen."
    ]
  },
  {
    id: "r_t4_sp5",
    name: "Gluten- & Laktosefreier No-Cook Puten-Avocado-Maiswaffel-Snack mit Tomaten",
    type: "classic",
    category: "schicht",
    prep: "nocook",
    tools: ["Messer"],
    mealCategory: "Snack",
    cals: 410,
    prot: 36,
    carbs: 40,
    fat: 11,
    gluten: false,
    lactose: false,
    ingredients: [
      { name: "Putenbrust-Aufschnitt (natur, gluten- & laktosefrei)", amount: 130, unit: "g", department: "Fleisch & Wurst" },
      { name: "Mais- oder Reiswaffeln", amount: 45, unit: "g", department: "Getreide" },
      { name: "Avocado (als Aufstrich statt Butter/Frischkäse)", amount: 55, unit: "g", department: "Obst & Gemüse" },
      { name: "Kirschtomaten & Gurke", amount: 140, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: [
      "⚡ Avocado mit Salz und Pfeffer auf die Mais-/Reiswaffeln streichen und dick mit Putenbrust belegen."
    ]
  }
,
  // --- v37.10 VIELFALTS-UPGRADE: +15 ABWECHSLUNGSREICHE FRÜHSTÜCKE ---
  {
    id: "r_v3710_bf1", name: "Herzhaftes Vollkorn-Avocado-Ei-Brot mit Kresse",
    type: "veggie", category: "all", prep: "schnell", tools: ["Pfanne", "Toaster"], mealCategory: "Frühstück",
    cals: 520, prot: 26, carbs: 42, fat: 26, gluten: true, lactose: false,
    ingredients: [
      { name: "Vollkornbrot", amount: 100, unit: "g", department: "Getreide" },
      { name: "Eier (Größe M)", amount: 3, unit: "Stück", department: "Kühlregal" },
      { name: "Avocado", amount: 70, unit: "g", department: "Obst & Gemüse" },
      { name: "Kirschtomaten & Kresse", amount: 100, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Brot toasten, Avocado zerdrücken und mit Salz/Pfeffer aufstreichen.", "Eier als Spiegelei oder weich gekocht darauflegen und mit Tomaten toppen."]
  },
  {
    id: "r_v3710_bf2", name: "Schoko-Bananen-Overnight-Oats mit Chiasamen",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Schraubglas"], mealCategory: "Frühstück",
    cals: 540, prot: 34, carbs: 64, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Zarte Haferflocken", amount: 70, unit: "g", department: "Getreide" },
      { name: "Sojadrink (ungesüßt)", amount: 220, unit: "ml", department: "Kühlregal" },
      { name: "Proteinpulver Schoko (vegan/Whey)", amount: 30, unit: "g", department: "Sonstiges" },
      { name: "Banane & 10g Chiasamen", amount: 110, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Alle Zutaten abends im Glas verrühren und über Nacht kaltstellen."]
  },
  {
    id: "r_v3710_bf3", name: "Lachstoast mit körnigem Frischkäse & Dill",
    type: "classic", category: "athlet", prep: "nocook", tools: ["Toaster"], mealCategory: "Frühstück",
    cals: 510, prot: 40, carbs: 44, fat: 18, gluten: true, lactose: true,
    ingredients: [
      { name: "Vollkorntoast / Sauerteigbrot", amount: 100, unit: "g", department: "Getreide" },
      { name: "Räucherlachs", amount: 100, unit: "g", department: "Fisch" },
      { name: "Körniger Frischkäse (light)", amount: 150, unit: "g", department: "Kühlregal" },
      { name: "Gurke & frischer Dill", amount: 100, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Brot toasten, Frischkäse aufstreichen, mit Lachs, Gurke und Dill belegen."]
  },
  {
    id: "r_v3710_bf4", name: "Apfel-Zimt-Quarkauflauf aus der Mikrowelle/Ofen",
    type: "veggie", category: "familie", prep: "ofen", tools: ["Auflaufform"], mealCategory: "Frühstück",
    cals: 530, prot: 42, carbs: 58, fat: 12, gluten: false, lactose: true,
    ingredients: [
      { name: "Magerquark", amount: 250, unit: "g", department: "Kühlregal" },
      { name: "Haferflocken", amount: 55, unit: "g", department: "Getreide" },
      { name: "Apfel (gewürfelt) & Zimt", amount: 150, unit: "g", department: "Obst & Gemüse" },
      { name: "Ei & 10g Walnüsse", amount: 70, unit: "g", department: "Kühlregal" }
    ],
    steps: ["Alles verrühren und 18 Min. bei 180 °C backen (oder 5 Min. Mikrowelle)."]
  },
  {
    id: "r_v3710_bf5", name: "Puten-Spinat-Omelett mit Süßkartoffel-Scheiben",
    type: "classic", category: "athlet", prep: "pfanne", tools: ["Pfanne"], mealCategory: "Frühstück",
    cals: 540, prot: 46, carbs: 42, fat: 19, gluten: false, lactose: false,
    ingredients: [
      { name: "Eier (Größe M)", amount: 3, unit: "Stück", department: "Kühlregal" },
      { name: "Putenbrust-Streifen", amount: 100, unit: "g", department: "Fleisch & Wurst" },
      { name: "Babyspinat & Paprika", amount: 120, unit: "g", department: "Obst & Gemüse" },
      { name: "Süßkartoffel (vorgegart/gewürfelt)", amount: 180, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Pute, Spinat und Süßkartoffel anbraten, verquirlte Eier darüber stocken lassen."]
  },
  {
    id: "r_v3710_bf6", name: "Warmer Buchweizen-Porridge mit Beeren & Mandelmus",
    type: "veggie", category: "all", prep: "topf", tools: ["Topf"], mealCategory: "Frühstück",
    cals: 510, prot: 28, carbs: 64, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Buchweizenflocken (glutenfrei)", amount: 75, unit: "g", department: "Getreide" },
      { name: "Sojadrink (ungesüßt)", amount: 250, unit: "ml", department: "Kühlregal" },
      { name: "TK-Beerenmix", amount: 140, unit: "g", department: "Obst & Gemüse" },
      { name: "Proteinpulver Vanille & 12g Mandelmus", amount: 35, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Buchweizenflocken in Sojadrink 4 Min. köcheln, Protein einrühren, mit Beeren & Mandelmus toppen."]
  },
  {
    id: "r_v3710_bf7", name: "Türkisches Menemen (Rührei in Tomaten-Paprika-Pfanne)",
    type: "veggie", category: "all", prep: "pfanne", tools: ["Pfanne"], mealCategory: "Frühstück",
    cals: 520, prot: 28, carbs: 46, fat: 24, gluten: true, lactose: false,
    ingredients: [
      { name: "Eier (Größe M)", amount: 3, unit: "Stück", department: "Kühlregal" },
      { name: "Tomaten & Spitzpaprika", amount: 240, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Paprikapulver", amount: 10, unit: "ml", department: "Sonstiges" },
      { name: "Vollkorn-Fladenbrot / Brot", amount: 90, unit: "g", department: "Getreide" }
    ],
    steps: ["Paprika und Tomaten in Öl weich schmoren, Eier unterrühren und cremig stocken lassen, mit Brot essen."]
  },
  {
    id: "r_v3710_bf8", name: "High-Protein Skyr-Waffeln mit heißen Kirschen",
    type: "veggie", category: "familie", prep: "schnell", tools: ["Waffeleisen/Pfanne"], mealCategory: "Frühstück",
    cals: 540, prot: 40, carbs: 64, fat: 12, gluten: false, lactose: true,
    ingredients: [
      { name: "Skyr Natur", amount: 200, unit: "g", department: "Kühlregal" },
      { name: "Hafermehl / gemahlene Haferflocken", amount: 65, unit: "g", department: "Getreide" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Kühlregal" },
      { name: "Sauerkirschen (ungesüßt)", amount: 150, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Skyr, Hafermehl, Eier und Backpulver glattrühren, goldbraun backen und mit warmen Kirschen servieren."]
  },
  {
    id: "r_v3710_bf9", name: "Tofu-Scramble (Veganes Rührei) mit Kurkuma & Bauernbrot",
    type: "veggie", category: "all", prep: "pfanne", tools: ["Pfanne"], mealCategory: "Frühstück",
    cals: 500, prot: 34, carbs: 48, fat: 18, gluten: true, lactose: false,
    ingredients: [
      { name: "Naturtofu (zerbröselt)", amount: 200, unit: "g", department: "Kühlregal" },
      { name: "Vollkorn-Bauernbrot", amount: 100, unit: "g", department: "Getreide" },
      { name: "Champignons & Schnittlauch", amount: 140, unit: "g", department: "Obst & Gemüse" },
      { name: "Rapsöl, Kurkuma & Kala Namak", amount: 10, unit: "ml", department: "Sonstiges" }
    ],
    steps: ["Tofu mit Pilzen scharf anbraten, mit Kurkuma und Salz würzen, zum Brot servieren."]
  },
  {
    id: "r_v3710_bf10", name: "Hähnchen-Frischkäse-Wrap (Kaltes Schicht-Frühstück)",
    type: "classic", category: "schicht", prep: "nocook", tools: ["Messer"], mealCategory: "Frühstück",
    cals: 530, prot: 42, carbs: 54, fat: 15, gluten: true, lactose: true,
    ingredients: [
      { name: "Vollkorn-Tortilla Wrap", amount: 120, unit: "g", department: "Getreide" },
      { name: "Hähnchenbrust-Aufschnitt", amount: 130, unit: "g", department: "Fleisch & Wurst" },
      { name: "Frischkäse (light)", amount: 50, unit: "g", department: "Kühlregal" },
      { name: "Rucola, Gurke & Paprika", amount: 120, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Wraps mit Frischkäse bestreichen, Hähnchen und Gemüse einrollen – ideal zum Mitnehmen."]
  },
  {
    id: "r_v3710_bf11", name: "Mango-Kokos-Chia-Bowl mit Soja-Skyr",
    type: "veggie", category: "all", prep: "nocook", tools: ["Schüssel"], mealCategory: "Frühstück",
    cals: 500, prot: 30, carbs: 58, fat: 15, gluten: false, lactose: false,
    ingredients: [
      { name: "Soja-Skyr (ungesüßt, laktosefrei)", amount: 250, unit: "g", department: "Kühlregal" },
      { name: "Mango (frisch oder TK)", amount: 160, unit: "g", department: "Obst & Gemüse" },
      { name: "Glutenfreie Haferflocken / Crunch", amount: 50, unit: "g", department: "Getreide" },
      { name: "Chiasamen & Kokosraspeln", amount: 20, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Soja-Skyr mit Chiasamen mischen, mit Mango, Flocken und Kokos toppen."]
  },
  {
    id: "r_v3710_bf12", name: "Herzhafter Hüttenkäse-Teller mit Schinken, Ei & Knäckebrot",
    type: "classic", category: "schicht", prep: "nocook", tools: ["Teller"], mealCategory: "Frühstück",
    cals: 490, prot: 44, carbs: 40, fat: 16, gluten: true, lactose: true,
    ingredients: [
      { name: "Körniger Frischkäse / Hüttenkäse", amount: 200, unit: "g", department: "Kühlregal" },
      { name: "Puten- oder Kochschinken (mager)", amount: 80, unit: "g", department: "Fleisch & Wurst" },
      { name: "Hartgekochtes Ei", amount: 1, unit: "Stück", department: "Kühlregal" },
      { name: "Vollkorn-Knäckebrot & Radieschen", amount: 70, unit: "g", department: "Getreide" }
    ],
    steps: ["Hüttenkäse mit Schnittlauch würzen, mit Schinken, Ei, Radieschen und Knäckebrot servieren."]
  },
  {
    id: "r_v3710_bf13", name: "Bananen-Hafer-Pancakes mit Beeren-Kompott (Ohne Zucker)",
    type: "veggie", category: "familie", prep: "pfanne", tools: ["Mixer", "Pfanne"], mealCategory: "Frühstück",
    cals: 540, prot: 34, carbs: 68, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Haferflocken", amount: 70, unit: "g", department: "Getreide" },
      { name: "Reife Banane", amount: 120, unit: "g", department: "Obst & Gemüse" },
      { name: "Eier (Größe M)", amount: 2, unit: "Stück", department: "Kühlregal" },
      { name: "Beeren & 20g Proteinpulver", amount: 150, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Haferflocken, Banane, Eier und Protein pürieren und als kleine Pancakes ausbacken."]
  },
  {
    id: "r_v3710_bf14", name: "Warmer Milchreis-Protein-Brei mit Apfelmus & Zimt",
    type: "veggie", category: "athlet", prep: "topf", tools: ["Topf"], mealCategory: "Frühstück",
    cals: 560, prot: 36, carbs: 84, fat: 8, gluten: false, lactose: true,
    ingredients: [
      { name: "Milchreis / Reisflocken", amount: 75, unit: "g", department: "Getreide" },
      { name: "Fettarme Milch (oder laktosefrei)", amount: 250, unit: "ml", department: "Kühlregal" },
      { name: "Whey Vanille / Magerquark", amount: 30, unit: "g", department: "Sonstiges" },
      { name: "Apfelmark (ungesüßt) & Zimt", amount: 120, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Reisflocken in Milch 3 Min. aufkochen, Protein einrühren und mit Apfelmark & Zimt servieren."]
  },
  {
    id: "r_v3710_bf15", name: "Mediterranes Feta-Tomaten-Brot mit Oliven & Rucola",
    type: "veggie", category: "all", prep: "nocook", tools: ["Messer"], mealCategory: "Frühstück",
    cals: 510, prot: 27, carbs: 50, fat: 22, gluten: true, lactose: true,
    ingredients: [
      { name: "Sauerteig- oder Dinkelbrot", amount: 110, unit: "g", department: "Getreide" },
      { name: "Feta light (zerbröselt)", amount: 110, unit: "g", department: "Kühlregal" },
      { name: "Tomaten, Rucola & 20g Oliven", amount: 160, unit: "g", department: "Obst & Gemüse" },
      { name: "Olivenöl & Oregano", amount: 8, unit: "ml", department: "Sonstiges" }
    ],
    steps: ["Brot belegen, mit Oregano und etwas Olivenöl verfeinern."]
  },

  // --- v37.10 VIELFALTS-UPGRADE: +15 ABWECHSLUNGSREICHE SNACKS ---
  {
    id: "r_v3710_sn1", name: "Apfelspalten mit Erdnussmus & Skyr-Zimt-Dip",
    type: "veggie", category: "all", prep: "nocook", tools: ["Messer", "Schüssel"], mealCategory: "Snack",
    cals: 350, prot: 26, carbs: 36, fat: 11, gluten: false, lactose: true,
    ingredients: [
      { name: "Apfel", amount: 160, unit: "g", department: "Obst & Gemüse" },
      { name: "Skyr Natur", amount: 200, unit: "g", department: "Kühlregal" },
      { name: "Erdnussmus (100%)", amount: 18, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Skyr mit Zimt verrühren, Erdnussmus toppen und Apfelspalten dippen."]
  },
  {
    id: "r_v3710_sn2", name: "Edamame-Meersalz-Box mit Sesam (Vegan & Proteinreich)",
    type: "veggie", category: "schicht", prep: "schnell", tools: ["Box"], mealCategory: "Snack",
    cals: 340, prot: 28, carbs: 24, fat: 14, gluten: false, lactose: false,
    ingredients: [
      { name: "Edamame (geschält, TK)", amount: 220, unit: "g", department: "Obst & Gemüse" },
      { name: "Sesamöl & grobes Meersalz", amount: 6, unit: "ml", department: "Sonstiges" }
    ],
    steps: ["Edamame 3 Min. in kochendem Wasser garen, abgießen und mit Meersalz & Sesamöl mischen."]
  },
  {
    id: "r_v3710_sn3", name: "Harzer-Käse-Chips oder Scheiben mit Brezel & Senf",
    type: "veggie", category: "rustikal", prep: "nocook", tools: ["Teller"], mealCategory: "Snack",
    cals: 360, prot: 38, carbs: 42, fat: 4, gluten: true, lactose: false,
    ingredients: [
      { name: "Harzer Käse (von Natur aus laktosefrei)", amount: 100, unit: "g", department: "Kühlregal" },
      { name: "Laugenbrezel / Laugenstange", amount: 85, unit: "g", department: "Getreide" },
      { name: "Senf & Gewürzgurken", amount: 60, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Harzer Käse mit Senf und Gurken zur Brezel essen – extrem proteinreich!"]
  },
  {
    id: "r_v3710_sn4", name: "Thunfisch-Gurken-Röllchen mit Maiswaffeln",
    type: "classic", category: "athlet", prep: "nocook", tools: ["Schüssel"], mealCategory: "Snack",
    cals: 350, prot: 38, carbs: 34, fat: 6, gluten: false, lactose: false,
    ingredients: [
      { name: "Thunfisch im eigenen Saft", amount: 140, unit: "g", department: "Fisch" },
      { name: "Maiswaffeln", amount: 40, unit: "g", department: "Getreide" },
      { name: "Salatgurke, Zitrone & 1 TL Olivenöl", amount: 150, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Thunfisch abtropfen, mit Zitrone & Öl anmachen und mit Gurke auf Maiswaffeln essen."]
  },
  {
    id: "r_v3710_sn5", name: "Geröstete Kichererbsen-Crunch-Box mit Paprika",
    type: "veggie", category: "schicht", prep: "ofen", tools: ["Backblech"], mealCategory: "Snack",
    cals: 370, prot: 18, carbs: 50, fat: 10, gluten: false, lactose: false,
    ingredients: [
      { name: "Kichererbsen (abgetropft, Dose)", amount: 240, unit: "g", department: "Sonstiges" },
      { name: "Olivenöl, Paprika edelsüß & Kreuzkümmel", amount: 8, unit: "ml", department: "Sonstiges" }
    ],
    steps: ["Kichererbsen trocken tupfen, würzen und 20 Min. bei 200 °C knusprig rösten."]
  },
  {
    id: "r_v3710_sn6", name: "Hüttenkäse-Beeren-Becher mit Kürbiskernen",
    type: "veggie", category: "all", prep: "nocook", tools: ["Löffel"], mealCategory: "Snack",
    cals: 340, prot: 30, carbs: 26, fat: 12, gluten: false, lactose: true,
    ingredients: [
      { name: "Körniger Frischkäse (light)", amount: 200, unit: "g", department: "Kühlregal" },
      { name: "Blaubeeren / Himbeeren", amount: 120, unit: "g", department: "Obst & Gemüse" },
      { name: "Kürbiskerne & 1 TL Honig", amount: 20, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Alles direkt im Becher mischen – in 30 Sekunden fertig."]
  },
  {
    id: "r_v3710_sn7", name: "Beef Jerky / Puten-Sticks mit Banane & Cashews",
    type: "classic", category: "schicht", prep: "nocook", tools: ["Keine"], mealCategory: "Snack",
    cals: 370, prot: 30, carbs: 34, fat: 12, gluten: false, lactose: false,
    ingredients: [
      { name: "Beef Jerky oder magere Puten-Sticks", amount: 50, unit: "g", department: "Fleisch & Wurst" },
      { name: "Banane", amount: 120, unit: "g", department: "Obst & Gemüse" },
      { name: "Cashewkerne (ungeröstet)", amount: 20, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Perfekter Rucksack- & Büro-Snack ohne Kühlung."]
  },
  {
    id: "r_v3710_sn8", name: "Mozzarella-Light-Tomaten-Spieße mit Vollkorn-Grissini",
    type: "veggie", category: "familie", prep: "nocook", tools: ["Teller"], mealCategory: "Snack",
    cals: 350, prot: 28, carbs: 30, fat: 13, gluten: true, lactose: true,
    ingredients: [
      { name: "Mozzarella light (Mini-Kugeln)", amount: 125, unit: "g", department: "Kühlregal" },
      { name: "Kirschtomaten & Basilikum", amount: 150, unit: "g", department: "Obst & Gemüse" },
      { name: "Vollkorn-Grissini oder Knäckebrot", amount: 40, unit: "g", department: "Getreide" }
    ],
    steps: ["Tomaten und Mozzarella mit Balsamico beträufeln und mit Grissini genießen."]
  },
  {
    id: "r_v3710_sn9", name: "Hummus-Gemüse-Sticks mit gekochten Eiern",
    type: "veggie", category: "all", prep: "nocook", tools: ["Messer"], mealCategory: "Snack",
    cals: 360, prot: 20, carbs: 26, fat: 19, gluten: false, lactose: false,
    ingredients: [
      { name: "Hummus (natur)", amount: 90, unit: "g", department: "Kühlregal" },
      { name: "Hartgekochte Eier", amount: 2, unit: "Stück", department: "Kühlregal" },
      { name: "Karotten, Paprika & Gurken-Sticks", amount: 200, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Gemüse in Sticks schneiden und mit Hummus sowie Eiern snacken."]
  },
  {
    id: "r_v3710_sn10", name: "Protein-Eiskaffee (Iced Coffee Shake) mit Haferkeks",
    type: "veggie", category: "athlet", prep: "nocook", tools: ["Shaker"], mealCategory: "Snack",
    cals: 330, prot: 30, carbs: 36, fat: 7, gluten: false, lactose: false,
    ingredients: [
      { name: "Kalter Espresso / Filterkaffee", amount: 150, unit: "ml", department: "Sonstiges" },
      { name: "Sojadrink oder fettarme Milch", amount: 200, unit: "ml", department: "Kühlregal" },
      { name: "Proteinpulver Vanille/Karamell", amount: 30, unit: "g", department: "Sonstiges" },
      { name: "Reiswaffel mit Zartbitter / Haferkeks", amount: 35, unit: "g", department: "Getreide" }
    ],
    steps: ["Kaffee, Milch, Eiswürfel und Protein kräftig shaken."]
  },
  {
    id: "r_v3710_sn11", name: "Räuchertofu-Würfel mit Weintrauben & Walnüssen",
    type: "veggie", category: "schicht", prep: "nocook", tools: ["Box"], mealCategory: "Snack",
    cals: 360, prot: 24, carbs: 28, fat: 17, gluten: false, lactose: false,
    ingredients: [
      { name: "Räuchertofu (gewürfelt)", amount: 120, unit: "g", department: "Kühlregal" },
      { name: "Weintrauben (kernlos)", amount: 150, unit: "g", department: "Obst & Gemüse" },
      { name: "Walnüsse", amount: 18, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Tofu würfeln, mit gewaschenen Trauben und Walnüssen in eine Snackbox füllen."]
  },
  {
    id: "r_v3710_sn12", name: "Magerquark-Stracciatella-Creme mit Kakaonibs",
    type: "veggie", category: "athlet", prep: "nocook", tools: ["Schüssel"], mealCategory: "Snack",
    cals: 340, prot: 34, carbs: 28, fat: 9, gluten: false, lactose: true,
    ingredients: [
      { name: "Magerquark", amount: 250, unit: "g", department: "Kühlregal" },
      { name: "Zartbitterschokolade (85%, gehackt) / Kakaonibs", amount: 18, unit: "g", department: "Sonstiges" },
      { name: "Birne oder Banane (klein)", amount: 100, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Quark mit etwas Wasser cremig rühren, Schokostückchen und Obst unterheben."]
  },
  {
    id: "r_v3710_sn13", name: "Putenbrust-Dattel-Nuss-Mix (Pre-Workout Turbo)",
    type: "classic", category: "athlet", prep: "nocook", tools: ["Keine"], mealCategory: "Snack",
    cals: 370, prot: 32, carbs: 42, fat: 8, gluten: false, lactose: false,
    ingredients: [
      { name: "Putenbrust-Aufschnitt", amount: 120, unit: "g", department: "Fleisch & Wurst" },
      { name: "Medjool-Datteln (entsteint)", amount: 50, unit: "g", department: "Obst & Gemüse" },
      { name: "Mandeln", amount: 15, unit: "g", department: "Sonstiges" }
    ],
    steps: ["Schnelle Kohlenhydrate + mageres Protein – perfekt 60 Min. vor dem Training."]
  },
  {
    id: "r_v3710_sn14", name: "Mango-Lassi High-Protein (Skyr-Smoothie to go)",
    type: "veggie", category: "familie", prep: "nocook", tools: ["Mixer"], mealCategory: "Snack",
    cals: 350, prot: 28, carbs: 48, fat: 4, gluten: false, lactose: true,
    ingredients: [
      { name: "Skyr Natur (oder laktosefrei)", amount: 220, unit: "g", department: "Kühlregal" },
      { name: "Mango (TK oder frisch)", amount: 180, unit: "g", department: "Obst & Gemüse" },
      { name: "Wasser & Prise Kardamom", amount: 150, unit: "ml", department: "Sonstiges" }
    ],
    steps: ["Alle Zutaten fein mixen und kalt genießen."]
  },
  {
    id: "r_v3710_sn15", name: "Lachs-Avocado-Reiswaffel-Duo (Omega-3 Booster)",
    type: "classic", category: "all", prep: "nocook", tools: ["Messer"], mealCategory: "Snack",
    cals: 370, prot: 24, carbs: 32, fat: 16, gluten: false, lactose: false,
    ingredients: [
      { name: "Räucherlachs", amount: 80, unit: "g", department: "Fisch" },
      { name: "Reiswaffeln", amount: 35, unit: "g", department: "Getreide" },
      { name: "Avocado & Zitronensaft", amount: 60, unit: "g", department: "Obst & Gemüse" }
    ],
    steps: ["Reiswaffeln mit zerdrückter Avocado bestreichen und mit Räucherlachs belegen."]
  }
];

recipeDB.push(...rezepteTeil4);
