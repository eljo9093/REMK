// RE:MK Ernährungs-Datenbank (BUISNESS Modul 1: Coaching Meals)
if (typeof recipeDB !== 'undefined') {
    recipeDB.push(
        {
            category: "schicht", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Seitan mit Süßkartoffel-Püree und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 629, prot: 62, carbs: 51, fat: 17, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Seitan", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Seitan scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "topf", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Couscous und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 677, prot: 57, carbs: 55, fat: 16, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Wildlachs mit Süßkartoffel-Püree und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 707, prot: 49, carbs: 85, fat: 21, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Wildlachs", "amount": 150, "unit": "g", "department": "Fischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Wildlachs scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Beluga-Linsen mit Dinkel-Pasta und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 652, prot: 47, carbs: 52, fat: 21, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Beluga-Linsen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Beluga-Linsen scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Rumpsteak mit Süßkartoffel-Püree und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 590, prot: 65, carbs: 82, fat: 17, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Rumpsteak", "amount": 250, "unit": "g", "department": "Fleischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Rumpsteak scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Lupinenschnetzel mit Rosmarinkartoffeln und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 759, prot: 64, carbs: 77, fat: 23, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschnetzel", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Lupinenschnetzel scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Lupinenschnetzel mit Dinkel-Pasta und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 769, prot: 50, carbs: 58, fat: 15, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschnetzel", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Lupinenschnetzel scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Kichererbsen mit Couscous und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 692, prot: 62, carbs: 69, fat: 16, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen", "amount": 200, "unit": "g", "department": "Vorrat"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "Kichererbsen scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Kichererbsen mit Couscous und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 678, prot: 56, carbs: 81, fat: 19, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen", "amount": 200, "unit": "g", "department": "Vorrat"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "Kichererbsen scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Seitan mit Süßkartoffel-Püree und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 749, prot: 62, carbs: 53, fat: 20, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Seitan", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Seitan scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Beluga-Linsen mit Rosmarinkartoffeln und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 776, prot: 55, carbs: 86, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Beluga-Linsen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Beluga-Linsen scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Kichererbsen mit Dinkel-Pasta und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 570, prot: 57, carbs: 56, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen", "amount": 200, "unit": "g", "department": "Vorrat"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Kichererbsen scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Kichererbsen mit Rosmarinkartoffeln und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 826, prot: 50, carbs: 66, fat: 15, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen", "amount": 200, "unit": "g", "department": "Vorrat"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Kichererbsen scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Putenbrust mit Couscous und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 838, prot: 58, carbs: 83, fat: 17, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Putenbrust", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "Putenbrust scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Tempeh mit Rosmarinkartoffeln und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 592, prot: 49, carbs: 59, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Tempeh scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Wildlachs mit Süßkartoffel-Püree und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 628, prot: 60, carbs: 59, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Wildlachs", "amount": 150, "unit": "g", "department": "Fischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Wildlachs scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Mittagessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Putenbrust mit Süßkartoffel-Püree und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 709, prot: 48, carbs: 83, fat: 16, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Putenbrust", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Putenbrust scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Kichererbsen mit Dinkel-Pasta und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 566, prot: 55, carbs: 56, fat: 19, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen", "amount": 200, "unit": "g", "department": "Vorrat"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Kichererbsen scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Lupinenschnetzel mit Vollkornreis und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 804, prot: 50, carbs: 87, fat: 20, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschnetzel", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Vollkornreis", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Vollkornreis zubereiten.", "Lupinenschnetzel scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Süßkartoffel-Püree und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 798, prot: 61, carbs: 61, fat: 23, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Couscous und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 784, prot: 42, carbs: 57, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Lupinenschnetzel mit Vollkornreis und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 735, prot: 63, carbs: 58, fat: 18, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschnetzel", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Vollkornreis", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Vollkornreis zubereiten.", "Lupinenschnetzel scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Dinkel-Pasta und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 685, prot: 44, carbs: 78, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Seitan mit Rosmarinkartoffeln und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 591, prot: 47, carbs: 86, fat: 17, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Seitan", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Seitan scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Wildlachs mit Vollkornreis und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 815, prot: 63, carbs: 60, fat: 16, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Wildlachs", "amount": 150, "unit": "g", "department": "Fischtheke"}, {"name": "Vollkornreis", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Vollkornreis zubereiten.", "Wildlachs scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Kichererbsen mit Couscous und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 671, prot: 51, carbs: 82, fat: 15, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen", "amount": 200, "unit": "g", "department": "Vorrat"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "Kichererbsen scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "topf", type: "classic",
            name: "BUISNESS: Rindertatar mit Dinkel-Pasta und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 737, prot: 60, carbs: 73, fat: 15, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Rindertatar", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Rindertatar scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Seitan mit Rosmarinkartoffeln und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 556, prot: 53, carbs: 61, fat: 18, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Seitan", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Seitan scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Dinkel-Pasta und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 799, prot: 63, carbs: 76, fat: 23, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Beluga-Linsen mit Vollkornreis und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 756, prot: 58, carbs: 59, fat: 20, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Beluga-Linsen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Vollkornreis", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Vollkornreis zubereiten.", "Beluga-Linsen scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Mittagessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Putenbrust mit Couscous und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 753, prot: 52, carbs: 86, fat: 18, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Putenbrust", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "Putenbrust scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Beluga-Linsen mit Couscous und Blattspinat", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 683, prot: 46, carbs: 87, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Beluga-Linsen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Couscous", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Blattspinat", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Couscous zubereiten.", "Beluga-Linsen scharf anbraten/backen.", "Blattspinat hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Wildlachs mit Süßkartoffel-Püree und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 638, prot: 55, carbs: 73, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Wildlachs", "amount": 150, "unit": "g", "department": "Fischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Wildlachs scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Beluga-Linsen mit Vollkornreis und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 800, prot: 54, carbs: 68, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Beluga-Linsen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Vollkornreis", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Vollkornreis zubereiten.", "Beluga-Linsen scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Lupinenschnetzel mit Dinkel-Pasta und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 680, prot: 48, carbs: 69, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschnetzel", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Lupinenschnetzel scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Mittagessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Rosmarinkartoffeln und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 775, prot: 58, carbs: 88, fat: 16, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Tempeh mit Süßkartoffel-Püree und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 712, prot: 48, carbs: 76, fat: 19, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Tempeh scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Rosmarinkartoffeln und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 820, prot: 57, carbs: 77, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Rindertatar mit Vollkornreis und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 843, prot: 45, carbs: 77, fat: 18, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Rindertatar", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Vollkornreis", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Vollkornreis zubereiten.", "Rindertatar scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Seitan mit Vollkornreis und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 633, prot: 65, carbs: 76, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Seitan", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Vollkornreis", "amount": 80, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Vollkornreis zubereiten.", "Seitan scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Lupinenschnetzel mit Rosmarinkartoffeln und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 846, prot: 43, carbs: 76, fat: 19, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschnetzel", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Lupinenschnetzel scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Dinkel-Pasta und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 736, prot: 48, carbs: 66, fat: 23, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS: Tempeh mit Süßkartoffel-Püree und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 715, prot: 58, carbs: 55, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Tempeh scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Mittagessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Rindertatar mit Süßkartoffel-Püree und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 589, prot: 54, carbs: 61, fat: 20, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Rindertatar", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Rindertatar scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "rustikal", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS: Seitan mit Dinkel-Pasta und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 602, prot: 56, carbs: 70, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Seitan", "amount": 150, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Seitan scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Rumpsteak mit Süßkartoffel-Püree und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 600, prot: 40, carbs: 67, fat: 21, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Rumpsteak", "amount": 250, "unit": "g", "department": "Fleischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Rumpsteak scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Mittagessen", prep: "ofen", type: "classic",
            name: "BUISNESS: Hähnchengeschnetzeltes mit Süßkartoffel-Püree und Paprika-Mix", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 699, prot: 64, carbs: 75, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "H\u00e4hnchengeschnetzeltes", "amount": 200, "unit": "g", "department": "Fleischtheke"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Paprika-Mix", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "H\u00e4hnchengeschnetzeltes scharf anbraten/backen.", "Paprika-Mix hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Abendessen", prep: "pfanne", type: "classic",
            name: "BUISNESS: Rumpsteak mit Dinkel-Pasta und Brokkoli", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: true, lactose: false,
            cals: 650, prot: 57, carbs: 55, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Rumpsteak", "amount": 250, "unit": "g", "department": "Fleischtheke"}, {"name": "Dinkel-Pasta", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Brokkoli", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Dinkel-Pasta zubereiten.", "Rumpsteak scharf anbraten/backen.", "Brokkoli hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "athlet", mealCategory: "Mittagessen", prep: "topf", type: "classic",
            name: "BUISNESS: Wildlachs mit Rosmarinkartoffeln und Kaisergemüse", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 693, prot: 63, carbs: 75, fat: 18, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Wildlachs", "amount": 150, "unit": "g", "department": "Fischtheke"}, {"name": "Rosmarinkartoffeln", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Kaisergem\u00fcse", "amount": 250, "unit": "g", "department": "TK"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["Rosmarinkartoffeln zubereiten.", "Wildlachs scharf anbraten/backen.", "Kaisergem\u00fcse hinzuf\u00fcgen und w\u00fcrzen."]
        },
        {
            category: "schicht", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS: Lupinenschnetzel mit Süßkartoffel-Püree und Grüne Bohnen", desc: "Hochwertiges Coaching-Gericht, extrem mikronährstoffreich.", gluten: false, lactose: false,
            cals: 687, prot: 40, carbs: 64, fat: 18, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschnetzel", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "S\u00fc\u00dfkartoffel-P\u00fcree", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Gr\u00fcne Bohnen", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Oliven\u00f6l", "amount": 10, "unit": "ml", "department": "Vorrat"}],
            steps: ["S\u00fc\u00dfkartoffel-P\u00fcree zubereiten.", "Lupinenschnetzel scharf anbraten/backen.", "Gr\u00fcne Bohnen hinzuf\u00fcgen und w\u00fcrzen."]
        }
    );
}
