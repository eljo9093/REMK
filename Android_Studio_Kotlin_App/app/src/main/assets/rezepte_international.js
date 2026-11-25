// ============================================================================
// RE:MK v36.1 – OPTIONALE INTERNATIONALE HIGH-PROTEIN REZEPTE (60 GERICHTE)
// Küchen: Indisch (12), Türkisch/Orientalisch (12), Mediterran (12), Asiatisch (12), Tex-Mex (12)
// Alle 60 Gerichte sind schweinefleischfrei (Halal-freundlich) & alltagstauglich.
// ============================================================================
if (typeof recipeDB === 'undefined') { window.recipeDB = []; }

const rezepteInternationalV361 = [
  {
    "id": "intl_in_1",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "High-Protein Chicken Tikka Masala mit Basmatireis",
    "desc": "Würzig mariniertes Hähnchen in cremiger Tomaten-Joghurt-Masala-Sauce mit lockerem Basmatireis.",
    "gluten": false,
    "lactose": true,
    "cals": 640,
    "prot": 52,
    "carbs": 68,
    "fat": 14,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Passierte Tomaten",
        "amount": 150,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Griechischer Joghurt 2%",
        "amount": 80,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Garam Masala & Ingwer",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Basmatireis nach Packung garen.",
      "Hähnchen mit Garam Masala, Kurkuma und Ingwer scharf anbraten.",
      "Tomaten und Joghurt einrühren, 6 Min. köcheln lassen und mit Reis servieren."
    ]
  },
  {
    "id": "intl_in_2",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "topf",
    "type": "veggie",
    "name": "Indisches Rote-Linsen-Dal mit Spinat & Skyr-Klecks",
    "desc": "Cremiges Protein-Dal aus roten Linsen mit Kreuzkümmel, Kurkuma und frischem Blattspinat.",
    "gluten": false,
    "lactose": true,
    "cals": 560,
    "prot": 34,
    "carbs": 74,
    "fat": 10,
    "tools": "Topf",
    "ingredients": [
      {
        "name": "Rote Linsen (roh)",
        "amount": 110,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Blattspinat",
        "amount": 100,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Passierte Tomaten",
        "amount": 150,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Skyr natur",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Zwiebel, Knoblauch & Curry",
        "amount": 40,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Zwiebel, Knoblauch und Gewürze kurz andünsten.",
      "Rote Linsen mit 350 ml Wasser und Tomaten 15 Min. weich kochen.",
      "Spinat unterheben und mit Skyr toppen."
    ]
  },
  {
    "id": "intl_in_3",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Palak Paneer Fitness-Pfanne (Light-Feta & Spinat)",
    "desc": "Indischer Spinat-Klassiker mit proteinreichem Paneer/Hirtenkäse light und Kichererbsen.",
    "gluten": false,
    "lactose": true,
    "cals": 550,
    "prot": 38,
    "carbs": 42,
    "fat": 22,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Hirtenkäse light / Paneer",
        "amount": 150,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Blattspinat (TK)",
        "amount": 250,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Kichererbsen (abgetropft)",
        "amount": 100,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Tomaten gewürfelt",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Garam Masala & Knoblauch",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Käsewürfel goldbraun anbraten und kurz beiseitelegen.",
      "Spinat, Tomaten, Kichererbsen und Gewürze 8 Min. einköcheln.",
      "Käse unterheben und heiß servieren."
    ]
  },
  {
    "id": "intl_in_4",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Chana Masala High-Protein Kichererbsen-Curry mit Reis",
    "desc": "Würziges nordindisches Kichererbsen-Curry – ideal zum Aufwärmen in der Schichtbox.",
    "gluten": false,
    "lactose": false,
    "cals": 590,
    "prot": 26,
    "carbs": 86,
    "fat": 13,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Kichererbsen (abgetropft)",
        "amount": 200,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 70,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Gehackte Tomaten",
        "amount": 200,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kokosmilch light",
        "amount": 60,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Curry, Kreuzkümmel & Koriander",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Reis garen.",
      "Kichererbsen mit Tomaten, Kokosmilch light und Gewürzen 12 Min. schmoren.",
      "Mit frischem Koriander über dem Reis anrichten."
    ]
  },
  {
    "id": "intl_in_5",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "ofen",
    "type": "classic",
    "name": "Tandoori-Hähnchenspieße mit Minz-Raita & Vollkorn-Naan",
    "desc": "Saftige Joghurt-Tandoori-Hähnchenbrust aus dem Ofen mit erfrischendem Gurken-Minz-Joghurt.",
    "gluten": true,
    "lactose": true,
    "cals": 610,
    "prot": 54,
    "carbs": 58,
    "fat": 14,
    "tools": "Backofen",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 200,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkorn-Fladenbrot / Naan",
        "amount": 80,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Griechischer Joghurt 2%",
        "amount": 120,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Salatgurke",
        "amount": 100,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Tandoori-Gewürz & Zitrone",
        "amount": 12,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Hähnchen mit 40 g Joghurt und Tandoori-Gewürz marinieren, 18 Min. bei 200 °C backen.",
      "Restlichen Joghurt mit geraspelter Gurke und Minze als Raita anrühren.",
      "Mit warmem Naan servieren."
    ]
  },
  {
    "id": "intl_in_6",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Butter-Chicken Light (Hohes Protein, Cremige Tomatensauce)",
    "desc": "Familienliebling mit 60 % weniger Fett dank Skyr & Tomate statt schwerer Sahne.",
    "gluten": false,
    "lactose": true,
    "cals": 630,
    "prot": 50,
    "carbs": 66,
    "fat": 16,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Passierte Tomaten",
        "amount": 180,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Skyr natur",
        "amount": 70,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Butter (kleiner Stich)",
        "amount": 10,
        "unit": "g",
        "department": "Kühlregal"
      }
    ],
    "steps": [
      "Hähnchen in Butter mit Paprika und Garam Masala anbraten.",
      "Tomaten zugeben, 8 Min. einköcheln, Hitze reduzieren und Skyr einrühren.",
      "Mit Basmatireis servieren."
    ]
  },
  {
    "id": "intl_in_7",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "kampfsport",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Indische Garnelen-Kokos-Curry-Pfanne mit Jasminreis",
    "desc": "Schnelles, leicht verdauliches Eiweiß-Curry mit Garnelen und knackigen Zuckerschoten.",
    "gluten": false,
    "lactose": false,
    "cals": 570,
    "prot": 44,
    "carbs": 68,
    "fat": 12,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Garnelen (geschält)",
        "amount": 180,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Jasminreis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kokosmilch light",
        "amount": 100,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Zuckerschoten & Paprika",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Gelbe Currypaste & Limette",
        "amount": 12,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Reis kochen.",
      "Gemüse und Currypaste 4 Min. anbraten, Kokosmilch zugeben.",
      "Garnelen 3 Min. gar ziehen lassen, mit Limette abschmecken."
    ]
  },
  {
    "id": "intl_in_8",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Frühstück",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Masala-Rührei (Anda Bhurji) mit Vollkorntoast",
    "desc": "Würziges indisches Rührei mit Tomate, Zwiebel, Kurkuma und Koriander.",
    "gluten": true,
    "lactose": false,
    "cals": 490,
    "prot": 32,
    "carbs": 42,
    "fat": 20,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Eier (Größe M)",
        "amount": 3,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Eiklar (optional / extra)",
        "amount": 100,
        "unit": "ml",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkorntoast",
        "amount": 80,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Tomate & rote Zwiebel",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Kurkuma, Kreuzkümmel & Chili",
        "amount": 6,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Zwiebel und Tomate fein würfeln und mit Gewürzen anbraten.",
      "Eier und Eiklar verquirlen, stocken lassen und mit geröstetem Toast servieren."
    ]
  },
  {
    "id": "intl_in_9",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Snack",
    "prep": "nocook",
    "type": "veggie",
    "name": "Mango-Lassi High-Protein Skyr-Bowl",
    "desc": "Cremiger Kardamom-Skyr mit süßer Mango und gehackten Pistazien – in 2 Minuten fertig.",
    "gluten": false,
    "lactose": true,
    "cals": 390,
    "prot": 32,
    "carbs": 44,
    "fat": 8,
    "tools": "Schüssel",
    "ingredients": [
      {
        "name": "Skyr natur",
        "amount": 250,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Mango (frisch oder TK)",
        "amount": 120,
        "unit": "g",
        "department": "Obst"
      },
      {
        "name": "Pistazien gehackt",
        "amount": 15,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kardamom & Honig",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Skyr mit einer Prise Kardamom und etwas Wasser cremig rühren.",
      "Mit Mangowürfeln und Pistazien toppen."
    ]
  },
  {
    "id": "intl_in_10",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Abendessen",
    "prep": "topf",
    "type": "classic",
    "name": "Indisches Puten-Biryani (Ein-Topf-Reisgericht)",
    "desc": "Aromatischer Gewürzreis mit magerer Pute, Erbsen und gerösteten Cashews.",
    "gluten": false,
    "lactose": false,
    "cals": 650,
    "prot": 50,
    "carbs": 74,
    "fat": 15,
    "tools": "Topf",
    "ingredients": [
      {
        "name": "Putenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 80,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Erbsen (TK)",
        "amount": 80,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Cashewkerne",
        "amount": 15,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Biryani-Gewürz & Brühe",
        "amount": 300,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Putenwürfel mit Gewürzen anbraten, Reis und Brühe zugeben.",
      "15 Min. zugedeckt quellen lassen, Erbsen die letzten 4 Min. mitgaren.",
      "Mit gerösteten Cashews bestreuen."
    ]
  },
  {
    "id": "intl_in_11",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Tofu-Tikka-Pfanne mit Blumenkohlreis & Basmati-Mix",
    "desc": "Pflanzliche Proteinbombe mit kross gebratenem Räuchertofu in würziger Tikka-Sauce.",
    "gluten": false,
    "lactose": false,
    "cals": 540,
    "prot": 32,
    "carbs": 54,
    "fat": 19,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Tofu natur/geräuchert",
        "amount": 200,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 55,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Blumenkohl",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Passierte Tomaten",
        "amount": 150,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Tikka-Gewürz & Rapsöl",
        "amount": 12,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Tofuwürfel kross anbraten.",
      "Blumenkohl klein schneiden, mit Tomaten und Tikka-Gewürz 8 Min. schmoren.",
      "Mit Basmatireis mischen."
    ]
  },
  {
    "id": "intl_in_12",
    "cuisine": "indisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Rinderhack-Keema-Pfanne mit Erbsen & Kartoffeln",
    "desc": "Herzhaftes indisches Hackfleisch-Curry (mageres Rind) – extrem sättigend nach dem Training.",
    "gluten": false,
    "lactose": false,
    "cals": 620,
    "prot": 46,
    "carbs": 56,
    "fat": 21,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Rinderhackfleisch mager (5%)",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Kartoffeln gewürfelt",
        "amount": 250,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Erbsen (TK)",
        "amount": 80,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Passierte Tomaten",
        "amount": 150,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Garam Masala, Ingwer & Knoblauch",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Hackfleisch krümelig anbraten, Gewürze zugeben.",
      "Kartoffelwürfel und Tomaten mit etwas Wasser 15 Min. garen.",
      "Erbsen kurz mitköcheln."
    ]
  },
  {
    "id": "intl_tr_1",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Frühstück",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Türkisches High-Protein Menemen mit Feta & Vollkornbrot",
    "desc": "Traditionelles Pfannen-Rührei mit saftigen Tomaten, grüner Spitzpaprika und mildem Hirtenkäse.",
    "gluten": true,
    "lactose": true,
    "cals": 530,
    "prot": 35,
    "carbs": 42,
    "fat": 22,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Eier (Größe M)",
        "amount": 3,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Hirtenkäse light",
        "amount": 60,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Tomaten & grüne Spitzpaprika",
        "amount": 200,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Vollkornbrot",
        "amount": 80,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Pul Biber & Olivenöl",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Paprika und Tomaten in wenig Olivenöl weich dünsten.",
      "Eier direkt in die Pfanne schlagen, cremig stocken lassen und Feta darüberbröseln.",
      "Mit Vollkornbrot genießen."
    ]
  },
  {
    "id": "intl_tr_2",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Saftige Rinder-Köfte mit Bulgur-Pilav & Knoblauch-Joghurt",
    "desc": "Hausgemachte türkische Hackbällchen aus magerem Rind mit lockerem Tomaten-Bulgur.",
    "gluten": true,
    "lactose": true,
    "cals": 650,
    "prot": 48,
    "carbs": 66,
    "fat": 19,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Rinderhackfleisch mager",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Bulgur (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Griechischer Joghurt 2%",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Tomatenmark, Zwiebel & Petersilie",
        "amount": 45,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Kreuzkümmel & Minze",
        "amount": 6,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Hack mit Zwiebel, Petersilie und Kreuzkümmel zu Köfte formen und braten.",
      "Bulgur mit Tomatenmark und Brühe 12 Min. quellen lassen.",
      "Mit Knoblauch-Joghurt servieren."
    ]
  },
  {
    "id": "intl_tr_3",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Fitness Hähnchen-Döner-Bowl mit Reis & Joghurt-Knoblauch-Sauce",
    "desc": "Voller Döner-Geschmack bei nur 12 g Fett – top vorbereitet für Büro und Schicht.",
    "gluten": false,
    "lactose": true,
    "cals": 620,
    "prot": 52,
    "carbs": 68,
    "fat": 12,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Hähnchenbrust in Streifen",
        "amount": 190,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Rotkohl, Eisberg & Tomate",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Skyr / Joghurt 2%",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Döner-Gewürz (Paprika, Cumin, Oregano)",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Hähnchenstreifen würzig und kross anbraten.",
      "Skyr mit Knoblauch, Zitrone und Dill zur Döner-Sauce verrühren.",
      "Mit Reis und frischem Salat als Bowl anrichten."
    ]
  },
  {
    "id": "intl_tr_4",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Abendessen",
    "prep": "topf",
    "type": "veggie",
    "name": "Mercimek Çorbası – Türkische Rote-Linsen-Suppe mit Skyr & Brot",
    "desc": "Samtige rote Linsensuppe mit Zitrone und getrockneter Minze, proteinoptimiert.",
    "gluten": true,
    "lactose": true,
    "cals": 520,
    "prot": 31,
    "carbs": 74,
    "fat": 8,
    "tools": "Topf",
    "ingredients": [
      {
        "name": "Rote Linsen (roh)",
        "amount": 110,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kartoffel & Karotte",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Vollkorn-Fladenbrot",
        "amount": 60,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Skyr natur (Topper)",
        "amount": 80,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Zitrone, Minze & Pul Biber",
        "amount": 15,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Linsen und Gemüse in Brühe 15 Min. weich kochen und fein pürieren.",
      "Mit Zitronensaft, Minze und Skyr toppen, dazu Fladenbrot."
    ]
  },
  {
    "id": "intl_tr_5",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Orientalische Shakshuka mit Kichererbsen & Hirtenkäse",
    "desc": "Pochierte Eier in rauchiger Paprika-Tomaten-Sauce mit Kichererbsen für extra Ballaststoffe.",
    "gluten": false,
    "lactose": true,
    "cals": 540,
    "prot": 34,
    "carbs": 46,
    "fat": 22,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Eier (Größe M)",
        "amount": 3,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Kichererbsen (abgetropft)",
        "amount": 100,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Gehackte Tomaten",
        "amount": 250,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Hirtenkäse light",
        "amount": 60,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Paprika, Cumin & Petersilie",
        "amount": 80,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Paprika, Kichererbsen und Tomaten mit Kreuzkümmel 8 Min. einköcheln.",
      "Mulden drücken, Eier hineingeben, zugedeckt 5 Min. stocken lassen.",
      "Mit Feta und Petersilie bestreuen."
    ]
  },
  {
    "id": "intl_tr_6",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Mittagessen",
    "prep": "nocook",
    "type": "classic",
    "name": "High-Protein Hähnchen-Hummus-Dürüm (5-Minuten-Wrap)",
    "desc": "Cremiger Hummus, zarte Hähnchenstreifen und knackiges Gemüse gerollt im Vollkorn-Lavash.",
    "gluten": true,
    "lactose": false,
    "cals": 580,
    "prot": 46,
    "carbs": 58,
    "fat": 16,
    "tools": "Schneidebrett",
    "ingredients": [
      {
        "name": "Vollkorn-Tortilla / Dürüm",
        "amount": 85,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Gegarte Hähnchenbruststreifen",
        "amount": 160,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Hummus natur",
        "amount": 60,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Gurke, Tomate & Rucola",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Sumach & Zitronensaft",
        "amount": 6,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Dürüm mit Hummus bestreichen.",
      "Hähnchen, Gemüse und Sumach darauf verteilen und fest einrollen."
    ]
  },
  {
    "id": "intl_tr_7",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Abendessen",
    "prep": "ofen",
    "type": "classic",
    "name": "High-Protein Lahmacun (Türkische Knusper-Fladen auf Tortilla)",
    "desc": "Schnelle Fitness-Variante mit magerem Rinderhack, frischer Petersilie und Zitrone.",
    "gluten": true,
    "lactose": false,
    "cals": 590,
    "prot": 44,
    "carbs": 54,
    "fat": 19,
    "tools": "Backofen",
    "ingredients": [
      {
        "name": "Vollkorn-Wraps (2 Stück)",
        "amount": 120,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Rinderhackfleisch mager",
        "amount": 160,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Tomate, Paprika & Petersilie",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Tomatenmark & Knoblauch",
        "amount": 25,
        "unit": "g",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Hack mit fein gehacktem Gemüse und Tomatenmark mischen und dünn auf die Wraps streichen.",
      "Bei 200 °C ca. 9 Min. knusprig backen, mit Salat und Zitrone aufrollen."
    ]
  },
  {
    "id": "intl_tr_8",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Tavuk Şiş – Marinierte Hähnchen-Spieße mit Kısır (Bulgur-Salat)",
    "desc": "Zarte Paprika-Joghurt-Hähnchenspieße mit würzigem türkischem Bulgursalat.",
    "gluten": true,
    "lactose": true,
    "cals": 610,
    "prot": 50,
    "carbs": 68,
    "fat": 12,
    "tools": "Pfanne & Schüssel",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 190,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Feiner Bulgur",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Paprikamark, Petersilie & Frühlingszwiebel",
        "amount": 60,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Tomate & Gurke",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Granatapfelsirup & Zitrone",
        "amount": 15,
        "unit": "ml",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Bulgur mit heißem Wasser quellen lassen, mit Paprikamark, Kräutern und Gemüse mischen.",
      "Gewürzte Hähnchenwürfel scharf anbraten und dazu servieren."
    ]
  },
  {
    "id": "intl_tr_9",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "kampfsport",
    "mealCategory": "Mittagessen",
    "prep": "ofen",
    "type": "veggie",
    "name": "Knusprige Ofen-Falafel-Bowl mit Couscous & Tahin-Skyr",
    "desc": "Nicht frittierte Ofen-Falafel mit cremigem Sesam-Skyr und buntem Orient-Salat.",
    "gluten": true,
    "lactose": true,
    "cals": 590,
    "prot": 32,
    "carbs": 76,
    "fat": 15,
    "tools": "Backofen",
    "ingredients": [
      {
        "name": "Kichererbsen (abgetropft)",
        "amount": 180,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Vollkorn-Couscous",
        "amount": 65,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Skyr natur",
        "amount": 120,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Tahin (Sesammus)",
        "amount": 15,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Petersilie, Cumin & Salat",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Kichererbsen mit Kräutern und Cumin pürieren, Bällchen formen und 18 Min. bei 200 °C backen.",
      "Couscous aufgießen, Skyr mit Tahin und Zitrone verrühren und anrichten."
    ]
  },
  {
    "id": "intl_tr_10",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Snack",
    "prep": "nocook",
    "type": "veggie",
    "name": "Çılbır-Style Skyr-Ei-Teller mit Paprika-Öl & Gurke",
    "desc": "Türkisch inspirierter Protein-Snack: gekochte Eier auf Knoblauch-Skyr mit Pul Biber.",
    "gluten": false,
    "lactose": true,
    "cals": 380,
    "prot": 34,
    "carbs": 16,
    "fat": 18,
    "tools": "Topf & Teller",
    "ingredients": [
      {
        "name": "Skyr natur",
        "amount": 200,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Eier (wachsweich)",
        "amount": 2,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Salatgurke & Dill",
        "amount": 100,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Olivenöl & Pul Biber",
        "amount": 8,
        "unit": "ml",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Skyr mit etwas Knoblauch und Dill auf einem Teller verstreichen.",
      "Wachsweiche Eier halbieren, darauflegen und mit Pul-Biber-Öl beträufeln."
    ]
  },
  {
    "id": "intl_tr_11",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Abendessen",
    "prep": "ofen",
    "type": "classic",
    "name": "Karnıyarık Fitness – Gefüllte Auberginen mit Rinderhack & Reis",
    "desc": "Im Ofen gebackene Auberginenhälften gefüllt mit würzigem magerem Rinderhack.",
    "gluten": false,
    "lactose": false,
    "cals": 590,
    "prot": 44,
    "carbs": 58,
    "fat": 18,
    "tools": "Backofen & Pfanne",
    "ingredients": [
      {
        "name": "Aubergine",
        "amount": 250,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Rinderhackfleisch mager",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 60,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Tomaten & Paprika",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Knoblauch & Petersilie",
        "amount": 15,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Aubergine halbieren, einschneiden und 20 Min. bei 200 °C vorgaren.",
      "Hack mit Tomaten und Paprika braten, Auberginen füllen und 10 Min. überbacken.",
      "Mit Reis servieren."
    ]
  },
  {
    "id": "intl_tr_12",
    "cuisine": "tuerkisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Frühstück",
    "prep": "nocook",
    "type": "veggie",
    "name": "Türkischer Protein-Frühstücksteller (Feta, Ei, Oliven & Simit-Vollkorn)",
    "desc": "Ausgewogener herzhafter Kahvaltı-Teller mit viel Eiweiß und gesunden Fetten.",
    "gluten": true,
    "lactose": true,
    "cals": 520,
    "prot": 32,
    "carbs": 46,
    "fat": 21,
    "tools": "Teller",
    "ingredients": [
      {
        "name": "Hirtenkäse light",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Eier (hartgekocht)",
        "amount": 2,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkornbrötchen / Sesamring",
        "amount": 75,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Tomate, Gurke & 5 Oliven",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Alle Zutaten frisch aufschneiden und mit etwas Oregano und Oliven anrichten."
    ]
  },
  {
    "id": "intl_med_1",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Griechische Hähnchen-Gyros-Pfanne mit Tzatziki & Ofenkartoffeln",
    "desc": "Würziges Hähnchen-Gyros aus der Pfanne mit frischem Skyr-Tzatziki und krossen Kartoffelecken.",
    "gluten": false,
    "lactose": true,
    "cals": 640,
    "prot": 54,
    "carbs": 68,
    "fat": 14,
    "tools": "Pfanne & Backofen",
    "ingredients": [
      {
        "name": "Hähnchenbrust in Streifen",
        "amount": 190,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Kartoffeln",
        "amount": 300,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Skyr natur",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Salatgurke & rote Zwiebel",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Gyros-Gewürz & Knoblauch",
        "amount": 12,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Kartoffelspalten 25 Min. bei 200 °C backen.",
      "Hähnchen mit Gyros-Gewürz und Zwiebel scharf braten.",
      "Skyr mit Gurke und Knoblauch zum Tzatziki rühren."
    ]
  },
  {
    "id": "intl_med_2",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Italienische High-Protein Puten-Bolognese mit Vollkorn-Penne",
    "desc": "Klassische Pasta mit magerem Putenhack, Kräutern und Parmesan-Finish.",
    "gluten": true,
    "lactose": true,
    "cals": 660,
    "prot": 50,
    "carbs": 76,
    "fat": 14,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Putenhackfleisch mager",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkorn-Penne (roh)",
        "amount": 90,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Passierte Tomaten",
        "amount": 220,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Parmesan gerieben",
        "amount": 15,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Karotte, Zwiebel & Basilikum",
        "amount": 80,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Penne al dente kochen.",
      "Hack mit fein gewürfelter Karotte und Zwiebel braten, mit Tomaten 10 Min. köcheln.",
      "Mit Basilikum und Parmesan servieren."
    ]
  },
  {
    "id": "intl_med_3",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Abendessen",
    "prep": "ofen",
    "type": "classic",
    "name": "Mediterranes Lachs-Gemüse-Blech mit Zitrone & Rosmarin",
    "desc": "Omega-3-reicher Ofen-Lachs auf Zucchini, Kirschtomaten und Drillingen.",
    "gluten": false,
    "lactose": false,
    "cals": 620,
    "prot": 42,
    "carbs": 48,
    "fat": 26,
    "tools": "Backofen",
    "ingredients": [
      {
        "name": "Lachsfilet",
        "amount": 170,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Drillinge (kleine Kartoffeln)",
        "amount": 220,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Zucchini & Kirschtomaten",
        "amount": 220,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Olivenöl, Zitrone & Rosmarin",
        "amount": 15,
        "unit": "ml",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Kartoffeln und Gemüse mit Rosmarin 15 Min. bei 200 °C vorbacken.",
      "Lachsfilet auflegen und weitere 12 Min. fertig garen."
    ]
  },
  {
    "id": "intl_med_4",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Abendessen",
    "prep": "ofen",
    "type": "veggie",
    "name": "Griechischer Ofen-Feta mit Kichererbsen, Tomaten & Vollkorn-Ciabatta",
    "desc": "Cremiger gebackener Hirtenkäse light auf warmem Tomaten-Kichererbsen-Bett.",
    "gluten": true,
    "lactose": true,
    "cals": 560,
    "prot": 36,
    "carbs": 56,
    "fat": 19,
    "tools": "Backofen",
    "ingredients": [
      {
        "name": "Hirtenkäse light",
        "amount": 150,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Kichererbsen (abgetropft)",
        "amount": 140,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kirschtomaten & Paprika",
        "amount": 200,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Vollkorn-Ciabatta",
        "amount": 60,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Oregano & Olivenöl",
        "amount": 12,
        "unit": "ml",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Gemüse und Kichererbsen in eine Auflaufform geben, Feta darauflegen.",
      "Bei 200 °C 20 Min. backen und mit warmem Ciabatta essen."
    ]
  },
  {
    "id": "intl_med_5",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Toskanische Hähnchen-Spinat-Pfanne mit Gnocchi",
    "desc": "Saftige Hähnchenbrust in leichter Frischkäse-Tomaten-Sauce mit goldbraunen Gnocchi.",
    "gluten": true,
    "lactose": true,
    "cals": 650,
    "prot": 49,
    "carbs": 74,
    "fat": 15,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Gnocchi (Kühlregal)",
        "amount": 220,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Blattspinat & getrocknete Tomaten",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Frischkäse light (0,2–5%)",
        "amount": 60,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Knoblauch & italienische Kräuter",
        "amount": 8,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Hähnchen und Gnocchi nacheinander goldbraun anbraten.",
      "Mit 100 ml Wasser, Frischkäse, Spinat und getrockneten Tomaten cremig einkochen."
    ]
  },
  {
    "id": "intl_med_6",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "kampfsport",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Pasta con Tonno Fitness – Vollkorn-Spaghetti mit Thunfisch & Kapern",
    "desc": "Blitzschnelle italienische Athleten-Pasta in unter 12 Minuten.",
    "gluten": true,
    "lactose": false,
    "cals": 610,
    "prot": 46,
    "carbs": 78,
    "fat": 11,
    "tools": "Topf & Pfanne",
    "ingredients": [
      {
        "name": "Thunfisch im eigenen Saft",
        "amount": 150,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Vollkorn-Spaghetti (roh)",
        "amount": 95,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Gehackte Tomaten",
        "amount": 200,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kapern, Knoblauch & Olivenöl",
        "amount": 18,
        "unit": "g",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Spaghetti kochen.",
      "Knoblauch in Olivenöl anschwitzen, Tomaten, Kapern und Thunfisch 5 Min. erwärmen.",
      "Mit der Pasta mischen."
    ]
  },
  {
    "id": "intl_med_7",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Snack",
    "prep": "nocook",
    "type": "veggie",
    "name": "Caprese High-Protein Teller (Light-Mozzarella, Hüttenkäse & Pesto)",
    "desc": "Italienischer Klassiker mit doppelter Eiweißdichte und frischem Basilikum.",
    "gluten": false,
    "lactose": true,
    "cals": 410,
    "prot": 38,
    "carbs": 14,
    "fat": 21,
    "tools": "Teller",
    "ingredients": [
      {
        "name": "Mozzarella light",
        "amount": 125,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Körniger Frischkäse",
        "amount": 150,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Tomaten",
        "amount": 200,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Grünes Pesto & Balsamico",
        "amount": 15,
        "unit": "g",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Tomaten und Mozzarella in Scheiben legen, Hüttenkäse daneben anrichten und mit Pesto toppen."
    ]
  },
  {
    "id": "intl_med_8",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Griechische Bifteki (Gefüllte Rinder-Frikadellen) mit Reis & Salat",
    "desc": "Saftige mit Light-Feta gefüllte Rinder-Bifteki und knackiger Bauernsalat.",
    "gluten": false,
    "lactose": true,
    "cals": 630,
    "prot": 50,
    "carbs": 58,
    "fat": 20,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Rinderhackfleisch mager",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Hirtenkäse light",
        "amount": 50,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Langkornreis (roh)",
        "amount": 70,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Tomate, Gurke & Oregano",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Hack würzen, um je ein Stück Feta formen und 10 Min. braten.",
      "Mit Reis und frischem Bauernsalat servieren."
    ]
  },
  {
    "id": "intl_med_9",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Garnelen-Knoblauch-Pfanne (Gambas al Ajillo) mit Vollkorn-Baguette",
    "desc": "Spanisch-mediterrane Protein-Pfanne mit Kirschtomaten und Petersilie.",
    "gluten": true,
    "lactose": false,
    "cals": 520,
    "prot": 42,
    "carbs": 48,
    "fat": 16,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Garnelen (geschält)",
        "amount": 200,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Vollkorn-Baguette",
        "amount": 90,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Kirschtomaten",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Olivenöl, Knoblauch & Chili",
        "amount": 15,
        "unit": "ml",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Knoblauch und Chili in Olivenöl kurz anrösten.",
      "Garnelen und halbierte Tomaten 4 Min. scharf braten, mit Baguette auftunken."
    ]
  },
  {
    "id": "intl_med_10",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Mittagessen",
    "prep": "nocook",
    "type": "veggie",
    "name": "Italienischer Linsen-Mozzarella-Pesto-Salat (Meal-Prep-Box)",
    "desc": "Kalt genießbarer Protein-Salat für unterwegs – 0 Minuten Kochzeit.",
    "gluten": false,
    "lactose": true,
    "cals": 560,
    "prot": 36,
    "carbs": 52,
    "fat": 20,
    "tools": "Schüssel",
    "ingredients": [
      {
        "name": "Braune Linsen (Dose, abgetropft)",
        "amount": 200,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Mozzarella light",
        "amount": 125,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Kirschtomaten & Rucola",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Basilikum-Pesto",
        "amount": 18,
        "unit": "g",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Alle Zutaten in einer Box mischen und mit Pesto sowie Zitrone abschmecken."
    ]
  },
  {
    "id": "intl_med_11",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Spanische Fitness-Paella mit Hähnchen, Garnelen & Erbsen",
    "desc": "Goldgelber Safran-Kurkuma-Reis voller Eiweiß aus einer großen Familienpfanne.",
    "gluten": false,
    "lactose": false,
    "cals": 650,
    "prot": 52,
    "carbs": 78,
    "fat": 12,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 140,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Garnelen",
        "amount": 90,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Reis (roh)",
        "amount": 85,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Paprika & Erbsen",
        "amount": 140,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Brühe, Kurkuma & Paprikapulver",
        "amount": 300,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Hähnchen und Paprika anbraten, Reis mit Gewürzen und Brühe 16 Min. garen.",
      "Garnelen und Erbsen die letzten 4 Min. mitgaren."
    ]
  },
  {
    "id": "intl_med_12",
    "cuisine": "mediterran",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Frühstück",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Mediterrane Frittata mit Zucchini, Tomate & Hüttenkäse",
    "desc": "Fluffiges italienisches Gemüse-Omelett für einen stabilen Blutzucker am Morgen.",
    "gluten": false,
    "lactose": true,
    "cals": 450,
    "prot": 36,
    "carbs": 18,
    "fat": 24,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Eier (Größe M)",
        "amount": 3,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Körniger Frischkäse",
        "amount": 120,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Zucchini & Kirschtomaten",
        "amount": 180,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Italienische Kräuter & Olivenöl",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Zucchini und Tomaten anbraten.",
      "Eier mit Hüttenkäse verquirlen, darübergießen und zugedeckt 7 Min. stocken lassen."
    ]
  },
  {
    "id": "intl_as_1",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Teriyaki-Hähnchen-Wok mit Brokkoli, Sesam & Jasminreis",
    "desc": "Glänzende Teriyaki-Glasur, zartes Hähnchen und knackiger Wok-Brokkoli.",
    "gluten": true,
    "lactose": false,
    "cals": 630,
    "prot": 50,
    "carbs": 74,
    "fat": 12,
    "tools": "Wok / Pfanne",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Jasminreis (roh)",
        "amount": 80,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Brokkoli & Karotte",
        "amount": 200,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Sojasauce & Honig",
        "amount": 30,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Sesam & Ingwer",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Reis garen.",
      "Hähnchen und Gemüse im Wok heiß anbraten, mit Sojasauce, Ingwer und Honig glasieren.",
      "Mit Sesam über Reis servieren."
    ]
  },
  {
    "id": "intl_as_2",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "kampfsport",
    "mealCategory": "Mittagessen",
    "prep": "nocook",
    "type": "classic",
    "name": "Lachs-Edamame-Poke-Bowl mit Avocado & Sesam-Reis",
    "desc": "Japanisch-hawaiianische Power-Bowl mit hochwertigen Omega-3-Fettsäuren.",
    "gluten": false,
    "lactose": false,
    "cals": 650,
    "prot": 42,
    "carbs": 68,
    "fat": 22,
    "tools": "Topf & Schüssel",
    "ingredients": [
      {
        "name": "Räucherlachs / Gebratener Lachs",
        "amount": 140,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Sushi- oder Jasminreis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Edamame (geschält, TK)",
        "amount": 90,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Avocado & Gurke",
        "amount": 140,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Sojasauce & Reisessig",
        "amount": 20,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Reis kochen und mit Reisessig würzen.",
      "Edamame kurz überbrühen, alles mit Lachs, Gurke und Avocado in einer Bowl anrichten."
    ]
  },
  {
    "id": "intl_as_3",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Koreanische Beef-Bulgogi-Bowl mit Kimchi & Spiegelei",
    "desc": "Würzig-süßes mageres Rindfleisch nach koreanischer Art – reich an Eisen, Zink & Probiotika.",
    "gluten": true,
    "lactose": false,
    "cals": 640,
    "prot": 48,
    "carbs": 66,
    "fat": 18,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Rinderhack mager oder Rinderstreifen",
        "amount": 170,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Jasminreis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Ei (Spiegelei)",
        "amount": 1,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Kimchi & Frühlingszwiebel",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Sojasauce, Knoblauch & Sesamöl",
        "amount": 25,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Rindfleisch mit Sojasauce, Knoblauch und etwas Honig scharf anbraten.",
      "Spiegelei braten und alles mit Reis und Kimchi toppen."
    ]
  },
  {
    "id": "intl_as_4",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Knusprige Erdnuss-Tofu-Reisnudeln mit Pak Choi",
    "desc": "Cremige asiatische Erdnuss-Limetten-Sauce auf kross gebratenem Tofu und Reisnudeln.",
    "gluten": false,
    "lactose": false,
    "cals": 610,
    "prot": 32,
    "carbs": 72,
    "fat": 20,
    "tools": "Wok / Pfanne",
    "ingredients": [
      {
        "name": "Tofu fest",
        "amount": 200,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Reisnudeln (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Pak Choi & Paprika",
        "amount": 180,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Erdnussmus (100%)",
        "amount": 20,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Sojasauce & Limettensaft",
        "amount": 25,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Reisnudeln einweichen.",
      "Tofu knusprig braten, Gemüse kurz mitbraten.",
      "Erdnussmus mit Sojasauce, Limette und warmem Wasser glatt rühren und alles schwenken."
    ]
  },
  {
    "id": "intl_as_5",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Thai-Rotes-Curry mit Pute, Bambus & Jasminreis",
    "desc": "Aromatisches rotes Thai-Curry – schmeckt aufgewärmt am zweiten Tag noch besser.",
    "gluten": false,
    "lactose": false,
    "cals": 620,
    "prot": 48,
    "carbs": 70,
    "fat": 14,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Putenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Jasminreis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kokosmilch light",
        "amount": 120,
        "unit": "ml",
        "department": "Trockenvorrat"
      },
      {
        "name": "Paprika, Bambussprossen & Zucchini",
        "amount": 180,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Rote Thai-Currypaste",
        "amount": 15,
        "unit": "g",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Currypaste kurz anrösten, Pute und Gemüse zugeben.",
      "Mit Kokosmilch light 8 Min. köcheln lassen und mit Reis servieren."
    ]
  },
  {
    "id": "intl_as_6",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "topf",
    "type": "classic",
    "name": "High-Protein Ramen-Bowl mit Hähnchen, Ei & Pak Choi",
    "desc": "Wärmende japanische Nudelsuppe mit 48 g Eiweiß in 15 Minuten.",
    "gluten": true,
    "lactose": false,
    "cals": 590,
    "prot": 48,
    "carbs": 66,
    "fat": 13,
    "tools": "Topf",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 160,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkorn-Ramen oder Mie-Nudeln",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Ei (wachsweich)",
        "amount": 1,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Pak Choi & Champignons",
        "amount": 150,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Miso-Paste, Sojasauce & Brühe",
        "amount": 450,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Brühe mit Miso, Ingwer und Sojasauce aufkochen.",
      "Nudeln, Gemüse und gebratene Hähnchenstreifen hineingeben, mit halbiertem Ei toppen."
    ]
  },
  {
    "id": "intl_as_7",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "kampfsport",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Gebratener Eier-Reis (Egg Fried Rice) mit Garnelen & Erbsen",
    "desc": "Der schnelle Wok-Klassiker mit hohem Protein-Anteil für harte Trainingsphasen.",
    "gluten": true,
    "lactose": false,
    "cals": 610,
    "prot": 44,
    "carbs": 76,
    "fat": 13,
    "tools": "Wok / Pfanne",
    "ingredients": [
      {
        "name": "Garnelen (geschält)",
        "amount": 160,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Eier (Größe M)",
        "amount": 2,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Gekochter Reis (vom Vortag)",
        "amount": 220,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Erbsen, Karotte & Frühlingszwiebel",
        "amount": 130,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Sojasauce & Sesamöl",
        "amount": 20,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Garnelen und Gemüse anbraten, Reis zugeben und heiß schwenken.",
      "Eier am Rand stocken lassen, alles mit Sojasauce mischen."
    ]
  },
  {
    "id": "intl_as_8",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Vietnamesische Glasnudel-Salat-Bowl (Bún) mit Rinderstreifen",
    "desc": "Frische Kräuter, Limette, knackige Gurke und zartes Rindfleisch – leicht & belebend.",
    "gluten": false,
    "lactose": false,
    "cals": 570,
    "prot": 42,
    "carbs": 66,
    "fat": 14,
    "tools": "Topf & Pfanne",
    "ingredients": [
      {
        "name": "Rinderhüftsteak in Streifen",
        "amount": 160,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Glasnudeln (roh)",
        "amount": 70,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Gurke, Karotte & Koriander",
        "amount": 160,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Erdnüsse gehackt",
        "amount": 12,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Limettensaft & Fisch-/Sojasauce",
        "amount": 20,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Glasnudeln mit kochendem Wasser 4 Min. ziehen lassen.",
      "Rinderstreifen kurz scharf braten, mit Gemüse, Dressing und Erdnüssen anrichten."
    ]
  },
  {
    "id": "intl_as_9",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Süß-Sauer Hähnchen Fitness-Pfanne mit Ananas & Paprika",
    "desc": "Beliebtes Familien-Asia-Gericht ohne Frittierfett und Zuckerbomben.",
    "gluten": false,
    "lactose": false,
    "cals": 610,
    "prot": 48,
    "carbs": 76,
    "fat": 11,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Basmatireis (roh)",
        "amount": 75,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Paprika & Ananasstücke",
        "amount": 180,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Tomatenmark, Reisessig & Sojasauce",
        "amount": 35,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Hähnchen und Paprika anbraten, Ananas zugeben.",
      "Mit Tomatenmark, Essig, Sojasauce und etwas Wasser kurz eindicken und mit Reis servieren."
    ]
  },
  {
    "id": "intl_as_10",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Snack",
    "prep": "nocook",
    "type": "veggie",
    "name": "Edamame-Sesam-Becher mit Räuchertofu-Würfeln",
    "desc": "Salzig-nussiger pflanzlicher Eiweiß-Snack für die Tasche (0 Min. Kochen).",
    "gluten": false,
    "lactose": false,
    "cals": 390,
    "prot": 32,
    "carbs": 22,
    "fat": 18,
    "tools": "Box",
    "ingredients": [
      {
        "name": "Edamame (geschält, gegart)",
        "amount": 150,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Räuchertofu gewürfelt",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Sesam & Sojasauce",
        "amount": 15,
        "unit": "g",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Edamame auftauen, mit Räuchertofu, Sojasauce und Sesam mischen."
    ]
  },
  {
    "id": "intl_as_11",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Pfeffer-Rindfleisch mit Brokkoli (Beef & Broccoli Wok)",
    "desc": "Klassischer China-Fitness-Wok mit schwarzem Pfeffer, Knoblauch und Ingwer.",
    "gluten": true,
    "lactose": false,
    "cals": 590,
    "prot": 48,
    "carbs": 60,
    "fat": 16,
    "tools": "Wok / Pfanne",
    "ingredients": [
      {
        "name": "Mageres Rindersteak in Streifen",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Brokkoli",
        "amount": 250,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Jasminreis (roh)",
        "amount": 65,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Sojasauce, Pfeffer & Stärke",
        "amount": 25,
        "unit": "ml",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Brokkoli 3 Min. dämpfen.",
      "Rinderstreifen extrem heiß 2 Min. anbraten, mit Sauce und Brokkoli schwenken."
    ]
  },
  {
    "id": "intl_as_12",
    "cuisine": "asiatisch",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Frühstück",
    "prep": "topf",
    "type": "veggie",
    "name": "Matcha-Vanille Protein-Porridge mit Beeren",
    "desc": "Sanfter Koffein-Kick aus japanischem Matcha kombiniert mit 34 g Protein.",
    "gluten": false,
    "lactose": true,
    "cals": 470,
    "prot": 34,
    "carbs": 56,
    "fat": 10,
    "tools": "Topf",
    "ingredients": [
      {
        "name": "Haferflocken",
        "amount": 60,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Skyr oder Magerquark",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Whey Vanille (oder Soja-Isolat)",
        "amount": 20,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Beeren & 1 TL Matcha",
        "amount": 85,
        "unit": "g",
        "department": "Obst"
      }
    ],
    "steps": [
      "Haferflocken mit Wasser/Milch aufkochen, Matcha und Protein einrühren, mit Skyr und Beeren toppen."
    ]
  },
  {
    "id": "intl_mx_1",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "High-Protein Chicken Burrito-Bowl mit schwarzen Bohnen & Limetten-Reis",
    "desc": "Farbenfrohe mexikanische Bowl mit gegrilltem Hähnchen, Mais, Bohnen und frischem Koriander.",
    "gluten": false,
    "lactose": true,
    "cals": 650,
    "prot": 52,
    "carbs": 76,
    "fat": 13,
    "tools": "Pfanne & Topf",
    "ingredients": [
      {
        "name": "Hähnchenbrustfilet",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Reis (roh)",
        "amount": 70,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Schwarze Bohnen & Mais",
        "amount": 120,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Tomatensalsa & Skyr",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Kreuzkümmel, Paprika & Limette",
        "amount": 12,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Reis kochen und mit Limettensaft verfeinern.",
      "Hähnchen mit Tex-Mex-Gewürz braten.",
      "Alles mit Bohnen, Mais, Salsa und Skyr als Bowl anrichten."
    ]
  },
  {
    "id": "intl_mx_2",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Brutzelnde Hähnchen-Fajita-Pfanne mit bunter Paprika & Vollkorn-Tortillas",
    "desc": "Schnelle Pfannen-Fajitas – jeder am Familientisch füllt sich seine Wraps selbst.",
    "gluten": true,
    "lactose": true,
    "cals": 620,
    "prot": 50,
    "carbs": 62,
    "fat": 16,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Hähnchenbruststreifen",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkorn-Tortillas (2 Stück)",
        "amount": 110,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Bunte Paprika & rote Zwiebel",
        "amount": 220,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Skyr natur (Sour-Cream-Ersatz)",
        "amount": 80,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Fajita-Gewürz & Limette",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Hähnchen, Paprika und Zwiebel heiß anbraten und mit Fajita-Gewürz abschmecken.",
      "In warme Tortillas mit Skyr füllen."
    ]
  },
  {
    "id": "intl_mx_3",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Abendessen",
    "prep": "topf",
    "type": "classic",
    "name": "Chili con Carne Athleten-Topf (Mageres Rind & Kidneybohnen)",
    "desc": "Das ultimative Meal-Prep- & Familien-Chili mit 49 g Protein pro Teller.",
    "gluten": false,
    "lactose": false,
    "cals": 610,
    "prot": 49,
    "carbs": 64,
    "fat": 15,
    "tools": "Topf",
    "ingredients": [
      {
        "name": "Rinderhackfleisch mager (5%)",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Kidneybohnen & Mais",
        "amount": 160,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Gehackte Tomaten",
        "amount": 220,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Reis oder Vollkornbrot",
        "amount": 60,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Chili, Cumin & Kakao (Prise)",
        "amount": 10,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Hack krümelig anbraten, Tomaten, Bohnen, Mais und Gewürze zugeben.",
      "15 Min. köcheln lassen und mit Reis oder Brot servieren."
    ]
  },
  {
    "id": "intl_mx_4",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Chili sin Carne mit roten Linsen, schwarzen Bohnen & Skyr",
    "desc": "Pflanzlicher Tex-Mex-Eintopf voller Eiweiß und Ballaststoffe.",
    "gluten": false,
    "lactose": true,
    "cals": 560,
    "prot": 34,
    "carbs": 78,
    "fat": 9,
    "tools": "Topf",
    "ingredients": [
      {
        "name": "Rote Linsen (roh)",
        "amount": 80,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Schwarze Bohnen (abgetropft)",
        "amount": 130,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Gehackte Tomaten & Paprika",
        "amount": 250,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Skyr natur",
        "amount": 100,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Cumin, Paprika geräuchert & Chili",
        "amount": 8,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Paprika andünsten, Linsen, Bohnen und Tomaten 15 Min. köcheln.",
      "Mit einem großen Klecks Skyr servieren."
    ]
  },
  {
    "id": "intl_mx_5",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Knusprige High-Protein Hähnchen-Quesadilla mit Light-Käse",
    "desc": "Goldbraun gerösteter Doppel-Wrap aus der Pfanne mit geschmolzenem Käse und Salsa.",
    "gluten": true,
    "lactose": true,
    "cals": 590,
    "prot": 48,
    "carbs": 52,
    "fat": 19,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Vollkorn-Tortillas (2 Stück)",
        "amount": 110,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Hähnchenbrust gegart",
        "amount": 150,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Reibekäse light (16%)",
        "amount": 60,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Tomatensalsa & Jalapeños",
        "amount": 80,
        "unit": "g",
        "department": "Trockenvorrat"
      }
    ],
    "steps": [
      "Einen Wrap mit Hähnchen, Käse und Salsa belegen, zweiten Wrap auflegen.",
      "In der Pfanne je Seite 3 Min. knusprig braten und vierteln."
    ]
  },
  {
    "id": "intl_mx_6",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "kampfsport",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Mexikanische Fisch-Tacos (Kabeljau/Seelachs) mit Mango-Salsa",
    "desc": "Leichte, proteinreiche Fisch-Tacos mit fruchtiger Mango-Limetten-Salsa.",
    "gluten": true,
    "lactose": true,
    "cals": 560,
    "prot": 44,
    "carbs": 66,
    "fat": 11,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Kabeljau- oder Seelachsfilet",
        "amount": 200,
        "unit": "g",
        "department": "Tiefkühl"
      },
      {
        "name": "Mais- oder Vollkorn-Tacos (3 Stück)",
        "amount": 90,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Mango, Rotkohl & Koriander",
        "amount": 150,
        "unit": "g",
        "department": "Obst"
      },
      {
        "name": "Skyr-Limetten-Dip",
        "amount": 80,
        "unit": "g",
        "department": "Kühlregal"
      }
    ],
    "steps": [
      "Fisch mit Paprika und Cumin braten.",
      "Tacos mit Rotkohl, Fisch, Mangowürfeln und Skyr-Dip füllen."
    ]
  },
  {
    "id": "intl_mx_7",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Frühstück",
    "prep": "pfanne",
    "type": "veggie",
    "name": "Huevos Rancheros Fitness – Mexikanisches Frühstücks-Ei auf Bohnen-Wrap",
    "desc": "Kräftiges Frühstück mit Spiegeleiern, warmen schwarzen Bohnen und Tomatensalsa.",
    "gluten": true,
    "lactose": false,
    "cals": 520,
    "prot": 30,
    "carbs": 54,
    "fat": 19,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Eier (Größe M)",
        "amount": 3,
        "unit": "Stück",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkorn-Tortilla",
        "amount": 60,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Schwarze Bohnen (abgetropft)",
        "amount": 100,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Tomatensalsa & Avocado",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Tortilla kurz anrösten, gewürzte Bohnen erwärmen und darauf verteilen.",
      "Spiegeleier obenauf legen, mit Salsa und Avocadoscheiben toppen."
    ]
  },
  {
    "id": "intl_mx_8",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Mittagessen",
    "prep": "nocook",
    "type": "classic",
    "name": "Mexikanischer Thunfisch-Bohnen-Mais-Salat mit Limette (0 Min. Kochen)",
    "desc": "Sofort essbare Schicht-Box mit 45 g Eiweiß direkt aus dem Vorratsschrank.",
    "gluten": false,
    "lactose": false,
    "cals": 530,
    "prot": 45,
    "carbs": 50,
    "fat": 14,
    "tools": "Schüssel",
    "ingredients": [
      {
        "name": "Thunfisch im eigenen Saft",
        "amount": 150,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Kidneybohnen & Mais",
        "amount": 160,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Paprika & rote Zwiebel",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Olivenöl, Limettensaft & Cumin",
        "amount": 15,
        "unit": "ml",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Alle Zutaten abgießen, kleinschneiden und mit Limette und Gewürzen mischen."
    ]
  },
  {
    "id": "intl_mx_9",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Abendessen",
    "prep": "ofen",
    "type": "classic",
    "name": "High-Protein Enchilada-Auflauf mit Pute & Tomaten-Chili-Sauce",
    "desc": "Überbackene gefüllte Vollkorn-Wraps aus dem Ofen für die ganze Familie.",
    "gluten": true,
    "lactose": true,
    "cals": 630,
    "prot": 50,
    "carbs": 62,
    "fat": 18,
    "tools": "Backofen",
    "ingredients": [
      {
        "name": "Putenbrust / Putenhack",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Vollkorn-Tortillas (2 Stück)",
        "amount": 110,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Passierte Tomaten & Mais",
        "amount": 200,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Reibekäse light",
        "amount": 50,
        "unit": "g",
        "department": "Kühlregal"
      }
    ],
    "steps": [
      "Pute mit Gewürzen braten, in Tortillas rollen und in eine Auflaufform legen.",
      "Mit gewürzten Tomaten übergießen, mit Käse bestreuen und 15 Min. bei 190 °C backen."
    ]
  },
  {
    "id": "intl_mx_10",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "schicht",
    "mealCategory": "Snack",
    "prep": "nocook",
    "type": "veggie",
    "name": "Guacamole-Hüttenkäse-Dip mit Vollkorn-Knäckebrot & Paprika-Sticks",
    "desc": "Cremiger Tex-Mex-Protein-Dip in 3 Minuten fertig.",
    "gluten": true,
    "lactose": true,
    "cals": 380,
    "prot": 28,
    "carbs": 30,
    "fat": 15,
    "tools": "Schüssel",
    "ingredients": [
      {
        "name": "Körniger Frischkäse",
        "amount": 200,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Avocado (halbe)",
        "amount": 60,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Vollkorn-Knäckebrot",
        "amount": 45,
        "unit": "g",
        "department": "Bäckerei"
      },
      {
        "name": "Paprika & Limettensaft",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      }
    ],
    "steps": [
      "Avocado mit Limette, Salz und Knoblauch zerdrücken und unter den Hüttenkäse heben.",
      "Mit Knäckebrot und Paprikastreifen dippen."
    ]
  },
  {
    "id": "intl_mx_11",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "athlet",
    "mealCategory": "Abendessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Rindersteak-Tacos (Carne Asada) mit Koriander-Zwiebel-Topping",
    "desc": "Saftig gebratene Rinderstreifen mit Limetten-Marinade in warmen Tacos.",
    "gluten": true,
    "lactose": false,
    "cals": 600,
    "prot": 48,
    "carbs": 56,
    "fat": 18,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Rinderhüftsteak",
        "amount": 180,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Taco-Fladen (3 Stück)",
        "amount": 95,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Rote Zwiebel, Tomate & Koriander",
        "amount": 120,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Limette & Kreuzkümmel",
        "amount": 12,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Steak scharf anbraten, ruhen lassen und in dünne Streifen schneiden.",
      "Mit frischer Tomaten-Zwiebel-Salsa in warme Tacos legen."
    ]
  },
  {
    "id": "intl_mx_12",
    "cuisine": "texmex",
    "porkFree": true,
    "category": "familie",
    "mealCategory": "Mittagessen",
    "prep": "pfanne",
    "type": "classic",
    "name": "Mexikanische Süßkartoffel-Rinderhack-Pfanne mit Avocado",
    "desc": "Glutenfreie One-Pot-Power-Pfanne voller komplexer Kohlenhydrate und Eiweiß.",
    "gluten": false,
    "lactose": false,
    "cals": 640,
    "prot": 44,
    "carbs": 66,
    "fat": 20,
    "tools": "Pfanne",
    "ingredients": [
      {
        "name": "Rinderhackfleisch mager",
        "amount": 170,
        "unit": "g",
        "department": "Kühlregal"
      },
      {
        "name": "Süßkartoffel gewürfelt",
        "amount": 260,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Schwarze Bohnen",
        "amount": 90,
        "unit": "g",
        "department": "Trockenvorrat"
      },
      {
        "name": "Avocado",
        "amount": 50,
        "unit": "g",
        "department": "Gemüse"
      },
      {
        "name": "Paprika, Cumin & Limette",
        "amount": 12,
        "unit": "g",
        "department": "Gewürze"
      }
    ],
    "steps": [
      "Süßkartoffelwürfel mit wenig Wasser und Deckel 10 Min. vorgaren.",
      "Hack und Bohnen kräftig anbraten, vermengen und mit Avocado toppen."
    ]
  }
];

if (typeof recipeDB !== 'undefined' && Array.isArray(recipeDB)) {
  recipeDB.push(...rezepteInternationalV361);
} else if (typeof window !== 'undefined' && Array.isArray(window.recipeDB)) {
  window.recipeDB.push(...rezepteInternationalV361);
}
