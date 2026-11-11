// ============================================================================
// RE:MK ERNÄHRUNGS-DATENBANK - FILTER: RUSTIKAL ("BROT & EISEN" / HAUSMANNSKOST)
// Dateiname für zukünftige Gerichte dieses Filters: rezepte_filter_rustikal.js
// ============================================================================
if (typeof recipeDB === 'undefined') { window.recipeDB = []; }

const rezepte_filter_rustikal = [
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
  }
];
recipeDB.push(...rezepte_filter_rustikal);

