// RE:MK Ernährungs-Datenbank (BUISNESS Modul 2: Kampfsport & Vegane Extremsportler)
if (typeof recipeDB !== 'undefined') {
    recipeDB.push(
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Quinoa (Tricolor) & Rote Bete mit Kürbiskerne", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 720, prot: 44, carbs: 111, fat: 20, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Quinoa (Tricolor)", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "K\u00fcrbiskerne", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Quinoa (Tricolor) zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit K\u00fcrbiskerne toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Tempeh (Mariniert) & Pak Choi mit Walnüsse", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 639, prot: 50, carbs: 75, fat: 23, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh (Mariniert)", "amount": 200, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Pak Choi", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Waln\u00fcsse", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Tempeh (Mariniert) zubereiten.", "Pak Choi schonend d\u00fcnsten oder anbraten.", "Mit Waln\u00fcsse toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Tempeh (Mariniert) & Brokkoliröschen mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 690, prot: 36, carbs: 102, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh (Mariniert)", "amount": 200, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Tempeh (Mariniert) zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Lupinenschrot & Brokkoliröschen mit Walnüsse", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 668, prot: 38, carbs: 95, fat: 23, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschrot", "amount": 150, "unit": "g", "department": "Vorrat"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Waln\u00fcsse", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Lupinenschrot zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Waln\u00fcsse toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Lupinenschrot & Rote Bete mit Walnüsse", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 721, prot: 41, carbs: 117, fat: 32, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschrot", "amount": 150, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Waln\u00fcsse", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Lupinenschrot zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Waln\u00fcsse toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Quinoa (Tricolor) & Rote Bete mit Mandelmus", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 713, prot: 43, carbs: 98, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Quinoa (Tricolor)", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Mandelmus", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Quinoa (Tricolor) zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Mandelmus toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Quinoa (Tricolor) & Rote Bete mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 878, prot: 44, carbs: 98, fat: 30, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Quinoa (Tricolor)", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Quinoa (Tricolor) zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Tempeh (Mariniert) & Süßkartoffel-Würfel mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 679, prot: 44, carbs: 118, fat: 35, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh (Mariniert)", "amount": 200, "unit": "g", "department": "K\u00fchlregal"}, {"name": "S\u00fc\u00dfkartoffel-W\u00fcrfel", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Tempeh (Mariniert) zubereiten.", "S\u00fc\u00dfkartoffel-W\u00fcrfel schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Lupinenschrot & Pak Choi mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 703, prot: 34, carbs: 100, fat: 26, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschrot", "amount": 150, "unit": "g", "department": "Vorrat"}, {"name": "Pak Choi", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Lupinenschrot zubereiten.", "Pak Choi schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Kichererbsen-Nudeln & Süßkartoffel-Würfel mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 836, prot: 36, carbs: 90, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "S\u00fc\u00dfkartoffel-W\u00fcrfel", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Kichererbsen-Nudeln zubereiten.", "S\u00fc\u00dfkartoffel-W\u00fcrfel schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Quinoa (Tricolor) & Brokkoliröschen mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 736, prot: 42, carbs: 119, fat: 29, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Quinoa (Tricolor)", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Quinoa (Tricolor) zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Brokkoliröschen mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 787, prot: 49, carbs: 70, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Tempeh (Mariniert) & Grünkohl mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 847, prot: 39, carbs: 73, fat: 35, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh (Mariniert)", "amount": 200, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Tempeh (Mariniert) zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Rote Bete mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 817, prot: 45, carbs: 101, fat: 35, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Pak Choi mit Mandelmus", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 612, prot: 32, carbs: 120, fat: 23, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Pak Choi", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Mandelmus", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "Pak Choi schonend d\u00fcnsten oder anbraten.", "Mit Mandelmus toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Edamame-Nudeln & Grünkohl mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 750, prot: 46, carbs: 91, fat: 28, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Edamame-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Edamame-Nudeln zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Lupinenschrot & Rote Bete mit Mandelmus", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 757, prot: 40, carbs: 118, fat: 21, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschrot", "amount": 150, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Mandelmus", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Lupinenschrot zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Mandelmus toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Süßkartoffel-Würfel mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 813, prot: 39, carbs: 74, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "S\u00fc\u00dfkartoffel-W\u00fcrfel", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "S\u00fc\u00dfkartoffel-W\u00fcrfel schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Kichererbsen-Nudeln & Brokkoliröschen mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 891, prot: 32, carbs: 115, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Kichererbsen-Nudeln zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Kichererbsen-Nudeln & Süßkartoffel-Würfel mit Kürbiskerne", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 892, prot: 39, carbs: 72, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "S\u00fc\u00dfkartoffel-W\u00fcrfel", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "K\u00fcrbiskerne", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Kichererbsen-Nudeln zubereiten.", "S\u00fc\u00dfkartoffel-W\u00fcrfel schonend d\u00fcnsten oder anbraten.", "Mit K\u00fcrbiskerne toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Lupinenschrot & Grünkohl mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 824, prot: 34, carbs: 114, fat: 31, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschrot", "amount": 150, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Lupinenschrot zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Kichererbsen-Nudeln & Süßkartoffel-Würfel mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 800, prot: 38, carbs: 96, fat: 25, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "S\u00fc\u00dfkartoffel-W\u00fcrfel", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Kichererbsen-Nudeln zubereiten.", "S\u00fc\u00dfkartoffel-W\u00fcrfel schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Tempeh (Mariniert) & Rote Bete mit Mandelmus", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 789, prot: 41, carbs: 109, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh (Mariniert)", "amount": 200, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Mandelmus", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Tempeh (Mariniert) zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Mandelmus toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Lupinenschrot & Süßkartoffel-Würfel mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 871, prot: 41, carbs: 113, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Lupinenschrot", "amount": 150, "unit": "g", "department": "Vorrat"}, {"name": "S\u00fc\u00dfkartoffel-W\u00fcrfel", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Lupinenschrot zubereiten.", "S\u00fc\u00dfkartoffel-W\u00fcrfel schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Edamame-Nudeln & Rote Bete mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 674, prot: 41, carbs: 87, fat: 28, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Edamame-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Edamame-Nudeln zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Edamame-Nudeln & Grünkohl mit Mandelmus", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 680, prot: 32, carbs: 116, fat: 33, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Edamame-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Mandelmus", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Edamame-Nudeln zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Mandelmus toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Grünkohl mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 685, prot: 40, carbs: 96, fat: 29, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Edamame-Nudeln & Grünkohl mit Walnüsse", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 894, prot: 41, carbs: 92, fat: 27, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Edamame-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Waln\u00fcsse", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Edamame-Nudeln zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Waln\u00fcsse toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Süßkartoffel-Würfel mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 650, prot: 44, carbs: 83, fat: 27, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "S\u00fc\u00dfkartoffel-W\u00fcrfel", "amount": 300, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "S\u00fc\u00dfkartoffel-W\u00fcrfel schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Kichererbsen-Nudeln & Brokkoliröschen mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 713, prot: 50, carbs: 112, fat: 28, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Kichererbsen-Nudeln zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Brokkoliröschen mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 653, prot: 34, carbs: 95, fat: 24, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Quinoa (Tricolor) & Brokkoliröschen mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 764, prot: 44, carbs: 94, fat: 30, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Quinoa (Tricolor)", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Quinoa (Tricolor) zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Rote Bete mit Mandelmus", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 851, prot: 37, carbs: 115, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Mandelmus", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Mandelmus toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Buchweizen & Rote Bete mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 641, prot: 48, carbs: 119, fat: 22, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Buchweizen", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Buchweizen zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Edamame-Nudeln & Rote Bete mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 678, prot: 33, carbs: 114, fat: 29, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Edamame-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Edamame-Nudeln zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Kichererbsen-Nudeln & Grünkohl mit Mandelmus", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 867, prot: 32, carbs: 104, fat: 32, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Mandelmus", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Kichererbsen-Nudeln zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Mandelmus toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Abendessen", prep: "pfanne", type: "veggie",
            name: "BUISNESS Extreme: Quinoa (Tricolor) & Grünkohl mit Walnüsse", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 740, prot: 35, carbs: 81, fat: 31, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Quinoa (Tricolor)", "amount": 100, "unit": "g", "department": "Vorrat"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "Waln\u00fcsse", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Quinoa (Tricolor) zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit Waln\u00fcsse toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "kampfsport", mealCategory: "Mittagessen", prep: "ofen", type: "veggie",
            name: "BUISNESS Extreme: Kichererbsen-Nudeln & Rote Bete mit Avocado", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 808, prot: 39, carbs: 77, fat: 32, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Kichererbsen-Nudeln", "amount": 120, "unit": "g", "department": "Vorrat"}, {"name": "Rote Bete", "amount": 200, "unit": "g", "department": "Frische"}, {"name": "Avocado", "amount": 100, "unit": "g", "department": "Frische"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Kichererbsen-Nudeln zubereiten.", "Rote Bete schonend d\u00fcnsten oder anbraten.", "Mit Avocado toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Mittagessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Tempeh (Mariniert) & Grünkohl mit Kürbiskerne", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 811, prot: 41, carbs: 94, fat: 31, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh (Mariniert)", "amount": 200, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Gr\u00fcnkohl", "amount": 150, "unit": "g", "department": "Frische"}, {"name": "K\u00fcrbiskerne", "amount": 30, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Tempeh (Mariniert) zubereiten.", "Gr\u00fcnkohl schonend d\u00fcnsten oder anbraten.", "Mit K\u00fcrbiskerne toppen f\u00fcr gesunde Fette."]
        },
        {
            category: "athletik", mealCategory: "Abendessen", prep: "topf", type: "veggie",
            name: "BUISNESS Extreme: Tempeh (Mariniert) & Brokkoliröschen mit Hanfsamen", desc: "Pflanzliche Maximalenergie für Kampfsport und Ausdauer.", gluten: false, lactose: false,
            cals: 647, prot: 44, carbs: 73, fat: 26, tools: "Pfanne / Topf / Ofen",
            ingredients: [{"name": "Tempeh (Mariniert)", "amount": 200, "unit": "g", "department": "K\u00fchlregal"}, {"name": "Brokkolir\u00f6schen", "amount": 250, "unit": "g", "department": "Frische"}, {"name": "Hanfsamen", "amount": 20, "unit": "g", "department": "Vorrat"}, {"name": "Lein\u00f6l / Oliven\u00f6l", "amount": 15, "unit": "ml", "department": "Vorrat"}],
            steps: ["Tempeh (Mariniert) zubereiten.", "Brokkolir\u00f6schen schonend d\u00fcnsten oder anbraten.", "Mit Hanfsamen toppen f\u00fcr gesunde Fette."]
        }
    );
}
