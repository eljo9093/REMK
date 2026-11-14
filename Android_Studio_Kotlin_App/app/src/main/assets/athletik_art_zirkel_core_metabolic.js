// ============================================================================
// RE:MK VEREINS-ATHLETIK - BAUSTEIN-ART: TEAM-ZIRKEL CORE & METABOLIC CONDITIONING
// Dateiname für zukünftige Stationen dieser Art: athletik_art_zirkel_core_metabolic.js
// ============================================================================
window.athletik_art_zirkel_core_metabolic = [
  // --- CORE-STATIONEN (slot: "core") ---
  {
    id: "st_cm_c1",
    slot: "core",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "miniband"],
    clusters: ["sprint_stopgo", "combat", "rotation_throw", "swim_water", "fitness"],
    name: "Bear-Crawl Vor-/Rückwärts (Knie 2 cm über dem Boden schwebend)",
    cues: "Rücken so flach wie eine Tischplatte – ein imaginäres Wasserglas auf der Lendenwirbelsäule darf nicht umkippen!"
  },
  {
    id: "st_cm_c2",
    slot: "core",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["miniband", "medball", "bodyweight"],
    clusters: ["rotation_throw", "combat", "sprint_stopgo", "swim_water", "fitness"],
    name: "Partner-Pallof-Press mit Miniband / Statischer Rotations-Widerstand",
    cues: "Arme vor der Brust ausstrecken, während der Partner seitlich am Band zieht – Rumpf bleibt kerzengerade!"
  },
  {
    id: "st_cm_c3",
    slot: "core",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "medball"],
    clusters: ["swim_water", "combat", "sprint_stopgo", "rotation_throw", "fitness"],
    name: "V-Ups / Alternating Toe-Touches & Side-Plank Hip-Dips",
    cues: "Kontrollierte Rumpfbeugung ohne Schwung aus dem Nacken, Lendenwirbelsäule beim Ablassen sauber abrollen."
  },
  {
    id: "st_cm_c4",
    slot: "core",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["kettlebell_kh", "medball", "bodyweight"],
    clusters: ["sprint_stopgo", "combat", "rotation_throw", "fitness"],
    name: "Overhead / Suitcase March am Platz (Einarmiges Tragen mit hohem Kniehub)",
    cues: "Rippenbogen herunterziehen, Standbein komplett strecken, kein seitliches Einknicken in der Taille!"
  },

  // --- METABOLIC / HIIT-STATIONEN (slot: "metabolic") ---
  {
    id: "st_cm_m1",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["cones_ladder", "bodyweight"],
    clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness"],
    name: "Koordinationsleiter / Hütchen Icky-Shuffle + 5m Shuttle-Touch",
    cues: "Blick weg von den Füßen nach vorn richten! Maximale Schrittfrequenz und tiefer Schwerpunkt bei der Wende."
  },
  {
    id: "st_cm_m2",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["medball", "bodyweight"],
    clusters: ["combat", "rotation_throw", "sprint_stopgo", "fitness"],
    name: "Rotational Medball Slams / Sprawls im Kampfsport-Rhythmus",
    cues: "Aus der vollen Überkopf-Streckung den Ball mit ganzer Rumpfkraft neben dem Fuß in den Boden hämmern!"
  },
  {
    id: "st_cm_m3",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum", "schwimmhalle"],
    equipTags: ["bodyweight", "miniband"],
    clusters: ["sprint_stopgo", "combat", "swim_water", "rotation_throw", "fitness"],
    name: "High-Knee Sprint am Platz + 180°-Reaktions-Jump auf Kommando",
    cues: "Knie auf Hüfthöhe ziehen, Arme aktiv im Sprintwinkel mitschwingen, butterweiche Beidbein-Landung!"
  },
  {
    id: "st_cm_m4",
    slot: "metabolic",
    env: ["platz", "halle", "kraftraum"],
    equipTags: ["kettlebell_kh", "bodyweight"],
    clusters: ["combat", "sprint_stopgo", "fitness"],
    name: "Kettlebell Swings oder Broad-Jump + Rückwärts-Shuffle",
    cues: "Kraftvolle Hüftstreckung im letzten Drittel der Bewegung, Pobacken am obersten Punkt fest anspannen!"
  }
];
