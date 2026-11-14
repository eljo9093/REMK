// RE:MK Trainings-Datenbank
const exerciseDB = [
    // --- PUSH (Brust/Schulter/Trizeps) ---
    { id: "p1", name: "Bankdrücken (Langhantel)", mechanic: "push_horiz", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Bankdrücken Langhantel" },
    { id: "p2", name: "Kurzhantel Bankdrücken", mechanic: "push_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Kurzhantel Bankdrücken" },
    { id: "p3", name: "Liegestütze", mechanic: "push_horiz", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Liegestütze Ausführung" },
    { id: "p4", name: "Military Press (LH)", mechanic: "push_vert", equip: ["gym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Military Press" },
    { id: "p5", name: "Schulterdrücken (KH)", mechanic: "push_vert", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Schulterdrücken Kurzhantel" },
    { id: "p6", name: "Pike Pushups", mechanic: "push_vert", equip: ["bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Pike Pushups" },
    { id: "p7", name: "Dips", mechanic: "push_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Dips Ausführung" },
    { id: "p8", name: "Trizepsdrücken (Kabel)", mechanic: "push_iso", equip: ["gym"], goal: ["muskelaufbau"], link: "Trizepsdrücken Kabelzug" },
    
    // --- PULL (Rücken/Bizeps) ---
    { id: "pu1", name: "Klimmzüge (Proniert / Obergriff)", mechanic: "pull_vert", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "kraft", "athletik"], link: "Klimmzüge Ausführung" },
    { id: "pu2", name: "Latzug (Breit)", mechanic: "pull_vert", equip: ["gym"], goal: ["muskelaufbau"], link: "Latzug Ausführung" },
    { id: "pu3", name: "Langhantelrudern", mechanic: "pull_horiz", equip: ["gym"], goal: ["muskelaufbau", "kraft"], link: "Langhantelrudern" },
    { id: "pu4", name: "Kurzhantelrudern (Einarmig)", mechanic: "pull_horiz", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Kurzhantelrudern" },
    { id: "pu5", name: "Inverted Rows (Tisch/Stange)", mechanic: "pull_horiz", equip: ["bodyweight", "homegym"], goal: ["athletik", "muskelaufbau"], link: "Inverted Rows" },
    { id: "pu6", name: "Kreuzheben (Klassisch)", mechanic: "pull_hinge", equip: ["gym"], goal: ["kraft", "athletik"], link: "Kreuzheben Klassisch" },
    { id: "pu7", name: "Rumänisches Kreuzheben (RDL)", mechanic: "pull_hinge", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "RDL Ausführung" },
    { id: "pu8", name: "Bizepscurls (KH)", mechanic: "pull_iso", equip: ["gym", "homegym"], goal: ["muskelaufbau"], link: "Bizepscurls KH" },

    // --- LEGS (Quads/Hams/Waden) ---
    { id: "l1", name: "Kniebeugen (High Bar)", mechanic: "leg_squat", equip: ["gym"], goal: ["muskelaufbau", "kraft", "athletik"], link: "High Bar Kniebeuge" },
    { id: "l2", name: "Goblet Squats (KH/KB)", mechanic: "leg_squat", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Goblet Squat" },
    { id: "l3", name: "Air Squats / Jump Squats", mechanic: "leg_squat", equip: ["bodyweight"], goal: ["athletik"], link: "Air Squats" },
    { id: "l4", name: "Beinpresse (45 Grad)", mechanic: "leg_press", equip: ["gym"], goal: ["muskelaufbau"], link: "Beinpresse 45" },
    { id: "l5", name: "Ausfallschritte (Lunges)", mechanic: "leg_uni", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau", "athletik"], link: "Ausfallschritte" },
    { id: "l6", name: "Bulgarian Split Squats", mechanic: "leg_uni", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Bulgarian Split Squats" },
    { id: "l7", name: "Beinbeuger (Maschine)", mechanic: "leg_curl", equip: ["gym"], goal: ["muskelaufbau"], link: "Beinbeuger Maschine" },
    { id: "l8", name: "Wadenheben (Stehend)", mechanic: "leg_calf", equip: ["gym", "homegym", "bodyweight"], goal: ["muskelaufbau"], link: "Wadenheben" },

    // --- CORE ---
    { id: "c1", name: "Plank Hold", mechanic: "core_iso", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik", "kraft"], link: "Plank Ausführung" },
    { id: "c2", name: "Hanging Leg Raises", mechanic: "core_flex", equip: ["gym", "homegym"], goal: ["muskelaufbau", "athletik"], link: "Hanging Leg Raises" },
    { id: "c3", name: "Russian Twists", mechanic: "core_rot", equip: ["gym", "homegym", "bodyweight"], goal: ["athletik"], link: "Russian Twists" }
];
