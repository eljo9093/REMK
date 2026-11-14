// ============================================================================
// RE:MK VEREINS- & TRAINER-MODUL: ATHLETIK & TEAM-ZIRKELTRAINING (athletik_verein.js)
// Exklusiv freigeschaltet für TSV- / Vereins- & Trainer-Lizenzen
// Sportwissenschaftlich & umgebungsspezifisch (Sportplatz, Sporthalle, Schwimmhalle, Kraftraum)
// ============================================================================

window.athletikDrillsDB = {
  // 1. UMGEBUNGS- & SPORTART-SPEZIFISCHES RAMP & MOVEMENT PREP (10 MIN.)
  movementPrepByEnv: {
    schwimmhalle: [
      "<strong>1. Dryland Raise am Beckenrand (3 Min. – Kein Laufen auf nassen Fliesen!):</strong> 60 Sek. beidarmiges Armkreisen (vorwärts/rückwärts/gegenläufig), 15x tiefe Kniebeugen am Platz & 30 Sek. lockeres Fußgelenks-Federn auf der Matte.",
      "<strong>2. Brustwirbelsäulen-, Schulter- & Fußgelenks-Mobilität (4 Min.):</strong> 15x <i>Miniband Pull-Aparts & Dislocates</i> (für schmerzfreie Überkopf-Streckung), 10x <i>Streamline-Hocke an der Wand</i> (Rücken, Hinterkopf & Handrücken flach an die Wand pressen) und 60 Sek. <i>Plantarflexions-Stretch im Fersensitz</i> (maximale Beweglichkeit für den Delfin- und Kraul-Beinschlag!).",
      "<strong>3. Scapula- & Core-Aktivierung vor dem Wassereinstieg (3 Min.):</strong> 12x <i>Scapula Push-Ups</i> (Serratus-Kontrolle gegen Schwimmer-Schulter) + 2x 20 Sek. <i>Streamline Hollow-Body Hold</i> in Rückenlage (maximale Wasserlage-Spannung)."
    ],
    kraftraum: [
      "<strong>1. Ergometer / Seil / Jumping Jacks (3 Min.):</strong> Körperkerntemperatur steigern am Ruderergometer, AirBike oder durch Seilspringen.",
      "<strong>2. Dynamische Gelenk-Kontrolle (4 Min.):</strong> 8x <i>World's Greatest Stretch</i> pro Seite, 12x <i>Cossack Squats</i> (Hüftöffnung), 15x <i>Band Pull-Aparts</i> & 10x <i>Glute Bridges</i> mit 2 Sek. Spitzenkontraktion.",
      "<strong>3. ZNS-Potenzierung am Platz (3 Min.):</strong> 2x 5 <i>Countermovement Squat Jumps</i> mit Fokus auf steife Fußgelenke und butterweiche, achsenstabile Landung."
    ]
  },

  movementPrep: {
    sprint_stopgo: [
      "<strong>1. Raise & Lauf-ABC (3 Min.):</strong> Lockeres Einlaufen über 20m (Vorwärts, Seitgalopp, Carioca-Überkreuzlauf, Rückwärtslaufen zum Öffnen der Hüfte).",
      "<strong>2. Activate & Mobilize (4 Min.):</strong> 8x <i>World's Greatest Stretch</i> im Gehen, 10x <i>Walking Lunges mit Rumpfrotation</i>, 10x <i>Frankenstein-Walks</i> (dynamischer Hamstring-Stretch) & 15x <i>Monster-Walks mit Miniband</i> (Gluteus Medius Aktivierung für Knie-Achsenstabilität).",
      "<strong>3. Neurales Priming & Potentiate (3 Min.):</strong> 2x 15m <i>Pogo-Jumps</i> (steifes Sprunggelenk), 2x 10m <i>A-Skips</i> und 2 submaximale Steigerungsläufe über 20m (70% -> 90% Tempo) mit Fokus auf aktives Abbremsen."
    ],
    rotation_throw: [
      "<strong>1. Raise & Fußarbeit (3 Min.):</strong> 2 Min. Sidesteps, Split-Steps auf akustisches Trainer-Signal & lockeres Armkreisen.",
      "<strong>2. Schulter- & BWS-Mobilität (4 Min.):</strong> 15x <i>Miniband Pull-Aparts</i>, 12x <i>Y-T-W-A Schulterblatt-Kontrolle</i>, 10x <i>Thorakale Windmühle</i> im Ausfallschritt & 15x <i>Wurfschulter-Außenrotation</i>.",
      "<strong>3. Potentiate (3 Min.):</strong> 5x <i>Plyometrische Liegestütze (oder Wand-Abdrücke)</i> + 3x 5m Explosiv-Antritte aus dem Split-Step."
    ],
    combat: [
      "<strong>1. Raise & Footwork (3 Min.):</strong> Lockeres Schattenboxen / Beinarbeit, Seilspringen oder Sprawls im lockeren Rhythmus.",
      "<strong>2. Gelenk- & Nacken-Aktivierung (4 Min.):</strong> 60 Sek. <i>4-Wege Nacken-Isometrie</i>, 10x <i>Cossack Squats</i> (tiefe Seitwärtsbeuge für Hüftmobilität), 10x <i>Hindu Push-Ups</i>.",
      "<strong>3. Potentiate (3 Min.):</strong> 5x <i>Explosive Medizinball-Brustpässe</i> oder 3x 5 Sekunden maximale Schlag-/Tritt-Schnelligkeits-Salven."
    ],
    endurance: [
      "<strong>1. Raise (3 Min.):</strong> Lockeres Einlaufen mit steigender Schrittfrequenz (Cadence-Fokus).",
      "<strong>2. Hüft- & Fußgelenk-Mobilisation (4 Min.):</strong> 10x <i>Beinpendel vor/zurück & seitlich</i>, 12x <i>Waden-Pumps im Stütz</i>, 10x <i>Ausfallschritt mit Hüftbeuger-Stretch</i>.",
      "<strong>3. Lauf-Ökonomie Priming (3 Min.):</strong> 3x 30m <i>Technik-Steigerungsläufe</i> mit Fokus auf aufrechte Beckenposition."
    ],
    swim_water: [
      "<strong>1. Dryland Raise am Beckenrand (3 Min. – Kein Laufen auf nassen Fliesen!):</strong> 60 Sek. beidarmiges Armkreisen (vorwärts/rückwärts/gegenläufig), 15x tiefe Kniebeugen am Platz & 30 Sek. Fußgelenks-Federn.",
      "<strong>2. Streamline-, Schulter- & Sprunggelenks-Mobilität (4 Min.):</strong> 15x <i>Miniband Pull-Aparts & Schulter-Außenrotation</i>, 10x <i>Streamline Wall-Slides</i> (Überkopf-Streckung ohne Hohlkreuz) & 60 Sek. <i>Sprunggelenks-Plantarflexion im Fersensitz</i>.",
      "<strong>3. Neuromuskuläres Wasser-Priming (3 Min.):</strong> 10x <i>Scapula Push-Ups</i> + 2x 20 Sek. <i>Streamline Hollow-Body Hold</i> + 3 explosive <i>Startblock-Streckjumps am Ort</i>."
    ]
  },

  // 2. SPEED, AGILITY, DECELERATION & PLYOMETRIE (ZNS FRISCH - 15 MIN.)
  speedAgility: [
    // --- PLATZ & SPORTHALLE DRILLS ---
    {
      id: "sa_01",
      name: "10m Antritt + Hartes Deceleration-Stopp-Signal (Kreuzband-Prävention)",
      clusters: ["sprint_stopgo", "rotation_throw", "fitness"],
      env: ["platz", "halle"],
      season: ["pre", "in", "off"],
      prescription: "4–5 Durchgänge | 90 Sek. volle ZNS-Pause",
      coachingCue: "Maximaler Vorwärtstrieb auf den ersten 3 Schritten – beim Hütchen oder Pfiff in 2–3 kurzen Bremsschritten mit tiefem Körperschwerpunkt (Knie über Fußspitze, kein X-Bein!) einfrieren."
    },
    {
      id: "sa_02",
      name: "5-10-5 Pro-Agility Shuttle (Richtungswechsel & Fußkanten-Druck)",
      clusters: ["sprint_stopgo", "rotation_throw"],
      env: ["platz", "halle"],
      season: ["pre", "in"],
      prescription: "4 Durchgänge (2x Start links, 2x Start rechts) | 90 Sek. Pause",
      coachingCue: "Vor dem Hütchen Körperschwerpunkt absenken, über das äußere Bein kraftvoll abdrücken und sofort wieder beschleunigen."
    },
    {
      id: "sa_03",
      name: "Curved Sprint / Bogenläufe auf Kommando (Spielnahe Beschleunigung)",
      clusters: ["sprint_stopgo"],
      env: ["platz"],
      season: ["pre", "in"],
      prescription: "4–6 Sprints à 20m (links/rechts gebogen) | 90 Sek. Gehpause",
      coachingCue: "Schult die asymmetrische Knöchel- und Hüftbelastung wie beim Überlaufen eines Gegenspielers im vollen Tempo."
    },
    {
      id: "sa_04",
      name: "Einbeinige Skater-Jumps (Lateral Bounds) mit 2-Sekunden-Stick-Landing",
      clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness", "endurance"],
      env: ["platz", "halle", "kraftraum"],
      season: ["pre", "in", "off"],
      prescription: "3 Sätze × 5 Sprünge pro Seite | 60 Sek. Pause",
      coachingCue: "Kraftvoller seitlicher Abdruck, butterweiche Landung auf einem Bein – Knie, Hüfte und Fußspitze zeigen exakt in eine Linie! 2 Sekunden stabil einfrieren."
    },
    {
      id: "sa_05",
      name: "Koordinationsleiter: High-Frequency Icky-Shuffle + 10m Explosiv-Antritt",
      clusters: ["sprint_stopgo", "rotation_throw", "combat"],
      env: ["platz", "halle"],
      season: ["pre", "in"],
      prescription: "4 Durchgänge | 60 Sek. Pause",
      coachingCue: "Minimaler Bodenkontakt in der Leiter (Fußballen!), Oberkörper ruhig, nach der letzten Sprosse sofortiger Übergang in den 10m Maximalsprint."
    },
    {
      id: "sa_06",
      name: "Medizinball Rotational Scoop Toss (Explosive Hüft-Rumpf-Schleuder)",
      clusters: ["rotation_throw", "combat", "sprint_stopgo", "fitness"],
      env: ["platz", "halle", "kraftraum"],
      season: ["pre", "in"],
      prescription: "3 Sätze × 5 Würfe pro Seite (Partner oder Wand) | 75 Sek. Pause",
      coachingCue: "Die Kraft kommt aus der hinteren Hüfte (Eindrehen wie beim Schlag/Wurf/Schuss) und wird über den gespannten Rumpf in die Arme übertragen."
    },
    {
      id: "sa_07",
      name: "Box Jumps / Kasten-Aufsprünge mit Fokus auf leise Landung",
      clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness", "endurance"],
      env: ["halle", "kraftraum"],
      season: ["pre", "in", "off"],
      prescription: "4 Sätze × 4–5 Wiederholungen | 90 Sek. Pause",
      coachingCue: "Explosiver Armschwung nach oben, leise wie eine Katze auf dem Kasten landen, komplett aufrichten und kontrolliert absteigen (nicht herunterspringen!)."
    },
    {
      id: "sa_08",
      name: "Reaktive Linien-Sprints auf visuelles/akustisches Trainer-Kommando",
      clusters: ["rotation_throw", "combat", "sprint_stopgo"],
      env: ["platz", "halle"],
      season: ["in", "pre"],
      prescription: "4 Durchgänge à 8–10 Sekunden Maximal-Reaktion | 75 Sek. Pause",
      coachingCue: "Aus der tiefen Athletik-Position (Ready-Stance) sofortige Wahrnehmung + explosiver erster Schritt."
    },
    {
      id: "sa_09",
      name: "Standweitsprung-Serie (Broad Jumps) mit aktivem Rückschwung",
      clusters: ["sprint_stopgo", "combat", "fitness", "endurance"],
      env: ["platz", "halle", "kraftraum"],
      season: ["pre", "in", "off"],
      prescription: "4 Sätze × 4 Einzel-Sprünge | 75 Sek. Pause",
      coachingCue: "Maximale horizontale Hüftstreckung (Triple Extension aus Hüfte, Knie und Sprunggelenk) und sichere Landung im tiefen Athletik-Stand."
    },

    // --- SCHWIMMHALLE / BECKENRAND & WASSER SPEZIAL-DRILLS (STARTBLOCK, WENDE & BREAKOUT) ---
    {
      id: "sa_sw_01",
      name: "Startblock-Reaktions-Starts + 15m Maximaler Unterwasser-Breakout",
      clusters: ["swim_water", "endurance"],
      env: ["schwimmhalle"],
      season: ["pre", "in"],
      prescription: "5–6 Starts auf Pfiff | 90 Sek. volle ZNS-Erholung",
      coachingCue: "Maximale Explosivität beim Abdrücken vom Startblock (Hüftstreckung!), strömungsgünstiges Eintauchen durch ein kleines Loch, 6–8 kraftvolle Unterwasser-Delfinkicks in perfekter Streamline-Spannung und explosiver Übergang in die ersten 4 Schwimmzüge."
    },
    {
      id: "sa_sw_02",
      name: "Dryland Streamline Squat Jumps auf der Matte (Startsprung-& Wende-Kraft)",
      clusters: ["swim_water", "endurance", "fitness"],
      env: ["schwimmhalle", "halle", "kraftraum"],
      season: ["pre", "in", "off"],
      prescription: "4 Sätze × 5 explosive Strecksprünge am Ort | 60 Sek. Pause",
      coachingCue: "Auf einer rutschfesten Matte: Tiefe Hocke (wie bei der Kipp-/Rollwende an der Beckenwand), Arme bereits vor dem Absprung in Streamline-Position hinter den Ohren verriegeln und vertikal nach oben explodieren."
    },
    {
      id: "sa_sw_03",
      name: "High-Speed Rollwenden- & Wandabstoß-Drill (Turn & Push-Off Power)",
      clusters: ["swim_water", "endurance"],
      env: ["schwimmhalle"],
      season: ["pre", "in", "off"],
      prescription: "6 Durchgänge (Anschwimmen aus 10m -> Wende -> Gleiten bis 10m-Marke) | 60 Sek. Pause",
      coachingCue: "Spätes Einleiten der Drehung ohne Tempo-Verlust, Vorfüße auf Hüfthöhe an der Wand platzieren, explosiver Abstoß in Rücken-/Seitenlage mit Rotation auf den Bauch und engster Streamline-Haltung."
    },
    {
      id: "sa_sw_04",
      name: "Medizinball / Miniband Pullover-Explosivzug (Unterwasser-Zugphasen-Power)",
      clusters: ["swim_water", "rotation_throw"],
      env: ["schwimmhalle", "halle", "kraftraum"],
      season: ["pre", "in"],
      prescription: "3 Sätze × 6 explosive Züge | 60 Sek. Pause",
      coachingCue: "Aus der gestreckten Überkopf-Position mit hohem Ellbogen (Early Vertical Forearm) explosiv aus dem Latissimus und Trizeps bis zur Hüfte durchziehen."
    },
    {
      id: "sa_10",
      name: "Flying 20m Sprints (15m Anlauf + 20m Maximalgeschwindigkeit)",
      clusters: ["sprint_stopgo", "endurance"],
      env: ["platz"],
      season: ["pre", "in"],
      prescription: "4 Durchgänge | 2 Min. volle Gehpause",
      coachingCue: "In den ersten 15m flüssig beschleunigen, dann für 20m maximale Top-Speed-Mechanik (hoher Kniehub, aktiver Fußaufsatz unter dem Körperschwerpunkt, lockere Gesichtszüge)."
    },
    {
      id: "sa_11",
      name: "T-Drill Agility Test & Richtungswechsel (Vorwärts, Sidestep, Rückwärts)",
      clusters: ["sprint_stopgo", "rotation_throw", "combat"],
      env: ["platz", "halle"],
      season: ["pre", "in"],
      prescription: "4 Durchgänge (2x links zuerst, 2x rechts zuerst) | 90 Sek. Pause",
      coachingCue: "Beim Sidestep Füße niemals überkreuzen, Hüfte bleibt tief, am letzten Hütchen kraftvoller Rückwärts-Sprint."
    },
    {
      id: "sa_12",
      name: "Depth Drops / Niedersprünge vom Kasten mit 2-Sekunden-Landestabilität",
      clusters: ["sprint_stopgo", "rotation_throw", "fitness"],
      env: ["halle", "kraftraum"],
      season: ["pre", "off"],
      prescription: "3 Sätze × 5 Landungen | 75 Sek. Pause",
      coachingCue: "Vom Kasten treten (nicht hochspringen) und beim Bodenkontakt sofort lautlos wie ein Stoßdämpfer in der Viertel-Kniebeuge einfrieren (perfekte Knie-Achse!)."
    },
    {
      id: "sa_13",
      name: "Kampfsport / Taktik: Akustischer Sprawl-to-Sprint Reaktions-Drill",
      clusters: ["combat", "sprint_stopgo"],
      env: ["platz", "halle", "kraftraum"],
      season: ["pre", "in"],
      prescription: "5 Durchgänge à 10m | 75 Sek. Pause",
      coachingCue: "Aus dem lockeren Footwork auf Trainer-Klatsch sofortiger Sprawl zum Boden, blitzschnelles Aufstehen und 10m Explosiv-Antritt."
    },
    {
      id: "sa_sw_05",
      name: "Rückenstart-Abstoß & Unterwasser-Kick-Breakout (Backstroke Ledge Power)",
      clusters: ["swim_water"],
      env: ["schwimmhalle"],
      season: ["pre", "in"],
      prescription: "5 Starts auf Signal | 75 Sek. Pause",
      coachingCue: "Hüfte beim Startsignal explosiv über die Wasseroberfläche abdrücken, sauberes Eintauchen und 10m maximale Unterwasser-Delfinkicks in Rückenlage."
    },
    {
      id: "sa_sw_06",
      name: "Partner-Zugwiderstand-Sprint im Becken (Resisted Swim Sprint mit Tube/Partner)",
      clusters: ["swim_water"],
      env: ["schwimmhalle"],
      season: ["pre", "in"],
      prescription: "4× 12m Maximal-Zug gegen Widerstand | 90 Sek. Pause",
      coachingCue: "Maximale Wasserfassung und Zugfrequenz gegen den Zugseil-Widerstand für spezifische Kraft-Übertragung ins Wasser."
    },
    {
      id: "sa_kr_01",
      name: "Kurzhantel / Kettlebell Jump Squats (Kontrollierte Explosivkraft)",
      clusters: ["sprint_stopgo", "combat", "rotation_throw", "fitness"],
      env: ["kraftraum", "halle"],
      season: ["pre", "in"],
      prescription: "4 Sätze × 5 Sprünge (leichtes Zusatzgewicht) | 90 Sek. Pause",
      coachingCue: "Mit leichten Hanteln (ca. 10–15% Körpergewicht) explosiv abspringen und weich über den Fußballen abfedern."
    }
  ],

  // 3. TEAM-ZIRKELTRAINING STATIONEN (MIT STRIKTEN UMGEBUNGS-TAGS `env`)
  // Umgebungen: "platz", "halle", "schwimmhalle", "kraftraum"
  circuitStations: [
    // --- KATEGORIE A: BEINE, HÜFTE & HAMSTRING-PREHAB (slot: "lower") ---
    {
      id: "cs_low_01",
      slot: "lower",
      name: "Nordic Hamstring Curls (Partner hält Knöchel auf Matte/Rasen)",
      equipTags: ["bodyweight"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["sprint_stopgo", "fitness", "endurance"],
      cues: "Körper von den Knien bis zum Kopf brettgerade halten, so langsam wie möglich nach vorne ablassen (Exzentrik schützt vor Muskelfaserrissen!), unten mit den Händen abfangen."
    },
    {
      id: "cs_low_02",
      slot: "lower",
      name: "Copenhagen Adductor Plank (Partner hält oberes Bein oder auf Bank/Kasten)",
      equipTags: ["bodyweight", "kasten_bank"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "rotation_throw", "combat", "swim_water"],
      cues: "Seitstütz auf der Matte, das obere Bein wird vom Partner gehalten (ideal für Brustschwimmer-Knie & Fußballer-Leiste!). Hüfte hochdrücken und stabil halten."
    },
    {
      id: "cs_low_03",
      slot: "lower",
      name: "Miniband Lateral Monster Walks + Squat Pulses",
      equipTags: ["miniband"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "rotation_throw", "endurance", "fitness", "swim_water"],
      cues: "Miniband knapp über den Knien. Tiefe Athletik-Hocke halten, kontrollierte Seitwärtsschritte auf der Matte + 5 Kniebeuge-Impulse – Knie bleiben stabil außen!"
    },
    {
      id: "cs_low_04",
      slot: "lower",
      name: "Bulgarian Split Squats (Hinterer Fuß auf Kasten, Bank oder Startblock-Stufe)",
      equipTags: ["bodyweight", "kasten_bank", "kettlebell_kh"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "rotation_throw", "endurance", "fitness", "swim_water"],
      cues: "Einbeinige Kniebeuge für maximale Beinkraft-Symmetrie und Startsprung-/Antrittsstärke. Vorderes Knie bleibt stabil über dem Fuß."
    },
    {
      id: "cs_low_05",
      slot: "lower",
      name: "Kettlebell / Kurzhantel Goblet Squats (Explosiver Aufstand)",
      equipTags: ["kettlebell_kh"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["sprint_stopgo", "combat", "fitness"],
      cues: "Gewicht eng vor der Brust halten, tief zwischen die Hüften setzen (Ellbogen innen an den Knien) und explosiv nach oben beschleunigen."
    },
    {
      id: "cs_low_06",
      slot: "lower",
      name: "Einbeinige Glute Bridges / Hip Thrusts auf der Matte (Hüftstreckung)",
      equipTags: ["bodyweight", "kasten_bank", "miniband"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "endurance", "fitness", "swim_water"],
      cues: "Ferse fest in die Matte drücken, Hüfte pro Wiederholung 1 Sekunde voll durchstrecken – aktiviert Gesäß und hintere Kette für Kicks und Sprints."
    },
    {
      id: "cs_low_07",
      slot: "lower",
      name: "Streamline-Ausfallschritte am Ort (Overhead Streamline Reverse Lunges)",
      equipTags: ["bodyweight", "miniband", "medball"],
      env: ["schwimmhalle", "halle", "kraftraum"],
      clusters: ["swim_water", "endurance", "fitness"],
      cues: "Arme in engster Streamline-Position gestreckt hinter den Ohren halten, kontrollierter Ausfallschritt nach hinten auf der Matte – Rumpf bleibt kerzengerade ohne Hohlkreuz!"
    },

    // --- KATEGORIE B: OBERKÖRPER, SCHULTER-STABILITÄT & ZUGKRAFT (slot: "upper") ---
    {
      id: "cs_up_01",
      slot: "upper",
      name: "Hand-Release Push-Ups mit Schulter-Tap (Stütz- & Rumpf-Stabilität)",
      equipTags: ["bodyweight"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "combat", "fitness", "swim_water"],
      cues: "Unten Brust kurz ablegen, Hände 1 cm anheben, explosiv hochdrücken und oben im Stütz abwechselnd die gegenüberliegende Schulter antippen (Hüfte wackelt nicht!)."
    },
    {
      id: "cs_up_02",
      slot: "upper",
      name: "Miniband Face-Pulls & Außenrotation (Wurf- & Schwimmer-Schulter-Schutz)",
      equipTags: ["miniband"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["rotation_throw", "combat", "fitness", "swim_water"],
      cues: "Miniband auf Augenhöhe mit beiden Händen auseinanderziehen, Daumen zeigen nach hinten. Stärkt Rotatorenmanschette und verhindert Schulter-Impingement."
    },
    {
      id: "cs_up_03",
      slot: "upper",
      name: "Partner-Widerstands-Rudern (Towel Row mit Handtuch im festen Stand)",
      equipTags: ["bodyweight"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "combat", "rotation_throw", "swim_water"],
      cues: "Zwei Athleten stehen sich im tiefen Ausfallschritt auf der Matte gegenüber, halten ein Handtuch und rudern im kräftigen Wechsel gegeneinander."
    },
    {
      id: "cs_up_04",
      slot: "upper",
      name: "Medizinball Overhead Slams / Chest-Pass",
      equipTags: ["medball"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["combat", "rotation_throw", "sprint_stopgo", "fitness"],
      cues: "Ball komplett über Kopf strecken (volle Rumpfspannung) und mit maximaler Geschwindigkeit vor den Füßen in den Boden hämmern."
    },
    {
      id: "cs_up_05",
      slot: "upper",
      name: "Sling-Trainer / TRX Inverted Rows & Y-Flys (Obere Rückenkette)",
      equipTags: ["sling_trx"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "rotation_throw", "combat", "fitness", "swim_water"],
      cues: "Körper steif wie ein Brett, Schulterblätter nach hinten-unten ziehen und Brust kontrolliert bis zu den Griffen hochziehen."
    },
    {
      id: "cs_up_06",
      slot: "upper",
      name: "Einarmiges Kettlebell / Kurzhantel-Drücken + Renegade Row",
      equipTags: ["kettlebell_kh"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["combat", "sprint_stopgo", "fitness"],
      cues: "Kräftigt die gesamte Druck- und Zugkette bei gleichzeitiger Anti-Rotations-Spannung im Rumpf."
    },
    {
      id: "cs_up_07",
      slot: "upper",
      name: "Miniband / Tube Swimmer's Pull-Down (Hoher Ellbogen / Zugphasen-Simulation)",
      equipTags: ["miniband", "bodyweight"],
      env: ["schwimmhalle", "halle", "kraftraum"],
      clusters: ["swim_water", "endurance"],
      cues: "Oberkörper 90° vorgebeugt, Miniband oder Zugseil mit hohem Ellbogen (Early Vertical Forearm) kraftvoll aus dem Latissimus bis zur Hüfte durchziehen."
    },
    {
      id: "cs_up_08",
      slot: "upper",
      name: "Beckenrand-Ausstiegs-Stütz (Pool-Deck Press-Outs) / Trizeps-Dips an der Kante",
      equipTags: ["bodyweight", "kasten_bank"],
      env: ["schwimmhalle"],
      clusters: ["swim_water"],
      cues: "Aus dem schulterbreiten Wasser-Stütz am Beckenrand explosiv in den gestreckten Stütz hochdrücken (Endphase des Kraul-/Schmetterling-Drucks) und kontrolliert ablassen."
    },

    // --- KATEGORIE C: CORE, ANTI-ROTATION & WASSERLAGE / WIRBELSÄULE (slot: "core") ---
    {
      id: "cs_cr_01",
      slot: "core",
      name: "Partner-Plank mit Störimpulsen (Zweikampf- & Wasserlage-Rumpfspannung)",
      equipTags: ["bodyweight"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "combat", "rotation_throw", "swim_water"],
      cues: "Spieler A hält den Unterarmstütz auf der Matte, Partner B gibt leichte, unvorhersehbare Druckimpulse an Schultern und Hüfte – Spieler A hält dagegen wie Beton!"
    },
    {
      id: "cs_cr_02",
      slot: "core",
      name: "Dead Bugs / Käfer-Strecken mit gepresstem Ball oder Miniband",
      equipTags: ["bodyweight", "miniband", "medball"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "endurance", "rotation_throw", "fitness", "swim_water"],
      cues: "Unterer Rücken klebt fest auf der Matte! Diagonal Arm und Bein lang ausstrecken, ohne ins Hohlkreuz zu fallen."
    },
    {
      id: "cs_cr_03",
      slot: "core",
      name: "Bear Crawl (Bärengang vorwärts/rückwärts – Knie 2 cm über dem Boden)",
      equipTags: ["bodyweight", "cones_ladder"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["combat", "sprint_stopgo", "rotation_throw", "fitness"],
      cues: "Auf Händen und Fußballen krabbeln, Knie schweben knapp über dem Boden, der Rücken bleibt absolut flach."
    },
    {
      id: "cs_cr_04",
      slot: "core",
      name: "Russian Twists / Sitzende Rumpf-Rotation (Freischwebend oder mit Ball)",
      equipTags: ["bodyweight", "medball"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["combat", "rotation_throw", "sprint_stopgo", "swim_water"],
      cues: "Brustbein stolz aufrichten, Fersen leicht anheben und den Oberkörper kontrolliert von links nach rechts rotieren (wichtig für Kraul-/Rücken-Rollbewegung)."
    },
    {
      id: "cs_cr_05",
      slot: "core",
      name: "Einarmiger Farmer's Walk (Suitcase Carry mit Kettlebell / Kurzhantel)",
      equipTags: ["kettlebell_kh"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["combat", "sprint_stopgo", "endurance", "fitness"],
      cues: "Schweres Gewicht nur in EINER Hand tragen, aufrecht gehen, ohne zur Seite abzuknicken – extremes Training für die schräge Rumpfmuskulatur."
    },
    {
      id: "cs_cr_06",
      slot: "core",
      name: "Streamline Hollow-Body Flutter-Kicks auf der Matte (Torpedo-Wasserlage)",
      equipTags: ["bodyweight", "miniband"],
      env: ["schwimmhalle", "halle", "kraftraum"],
      clusters: ["swim_water", "endurance"],
      cues: "Rückenlage auf der Matte, Lendenwirbelsäule fest in den Boden pressen, Arme in Streamline über Kopf verriegeln und schnelle, enge Beinschläge aus der Hüfte (nicht aus den Knien!) ausführen."
    },

    // --- KATEGORIE D: METABOLIC CONDITIONING, AGILITY & FINISHER (slot: "metabolic") ---
    {
      id: "cs_mt_01",
      slot: "metabolic",
      name: "Shuttle-Run Pendelsprints (5m - 10m - 15m mit Bodenberührung)",
      equipTags: ["bodyweight", "cones_ladder"],
      env: ["platz", "halle"],
      clusters: ["sprint_stopgo", "rotation_throw", "combat"],
      cues: "Jede Linie/jedes Hütchen wird tief aus den Beinen (nicht aus dem krummen Rücken!) mit der Hand berührt. Schult Laktattoleranz und Wende-Technik."
    },
    {
      id: "cs_mt_02",
      slot: "metabolic",
      name: "Sprawl to Tuck-Jump / Broad Jump (Schnelles Aufstehen + Sprung)",
      equipTags: ["bodyweight"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["combat", "sprint_stopgo", "fitness"],
      cues: "Hüfte kontrolliert in den Stütz bringen, sofort wieder auf die Füße schnellen und direkt in einen explosiven Sprung übergehen."
    },
    {
      id: "cs_mt_03",
      slot: "metabolic",
      name: "Koordinationsleiter Quick-Feet + Seitlicher Hütchen-Touch",
      equipTags: ["cones_ladder"],
      env: ["platz", "halle"],
      clusters: ["sprint_stopgo", "rotation_throw"],
      cues: "Höchste Schrittfrequenz durch die Leiter, am Ende tiefer Sidestep links/rechts zum Hütchen."
    },
    {
      id: "cs_mt_04",
      slot: "metabolic",
      name: "Kettlebell Swings (Explosive Hüftstreckung)",
      equipTags: ["kettlebell_kh"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["combat", "sprint_stopgo", "fitness"],
      cues: "Kein Kniebeugen, sondern ein schnelles Hüftscharnier (Hip-Hinge)! Die Kugel schwingt durch den explosiven Impuls der Gesäßmuskulatur bis auf Brusthöhe."
    },
    {
      id: "cs_mt_05",
      slot: "metabolic",
      name: "Kasten-Step-Overs / Lateral Box Hops im hohen Rhythmus",
      equipTags: ["kasten_bank"],
      env: ["halle", "kraftraum"],
      clusters: ["sprint_stopgo", "rotation_throw", "endurance", "fitness"],
      cues: "Ein Fuß bleibt auf dem niedrigen Kasten/der Bank, dynamischer Wechsel über den Kasten von links nach rechts mit aktivem Armeinsatz."
    },
    {
      id: "cs_mt_06",
      slot: "metabolic",
      name: "Wasser- & Beckenrand-Kombi: 15m Sprint-Breakout + Ausstieg (Deck-Ups)",
      equipTags: ["bodyweight"],
      env: ["schwimmhalle"],
      clusters: ["swim_water", "endurance"],
      cues: "Im tiefen Wasser: Explosiver Abstoß, 15m Sprint, zurück zum Beckenrand, kraftvoller Stütz-Ausstieg auf die Matte, 5x Streamline Air-Squats und wieder ins Wasser gleiten!"
    },
    {
      id: "cs_mt_07",
      slot: "metabolic",
      name: "Dryland Superman-Swimmers & Mountain Climbers auf der Matte (Kein Rutschen!)",
      equipTags: ["bodyweight", "miniband"],
      env: ["schwimmhalle", "halle", "kraftraum"],
      clusters: ["swim_water", "endurance", "fitness"],
      cues: "Halbzeit-Kombi auf der Matte: 20 Sek. diagonale Rückenstrecker-Paddelbewegung in Bauchlage + 20 Sek. kontrollierte Mountain Climbers im Stütz."
    },
    {
      id: "cs_low_08",
      slot: "lower",
      name: "Isometrischer Wandsitz (Wall-Sit) mit einbeinigem Wechsel / Fersenheben",
      equipTags: ["bodyweight", "medball"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "endurance", "swim_water", "fitness"],
      cues: "90° Kniewinkel an einer Wand oder am Startblock halten, abwechselnd die Fersen vom Boden abheben (Patellasehnen- & Quadrizeps-Ausdauer ohne Gelenkstoß)."
    },
    {
      id: "cs_low_09",
      slot: "lower",
      name: "Cossack Squats (Tiefe athletische Seitwärts-Kniebeuge für Adduktoren & Hüfte)",
      equipTags: ["bodyweight", "kettlebell_kh"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["combat", "sprint_stopgo", "rotation_throw", "swim_water"],
      cues: "Breiter Stand, tief auf eine Seite absenken, während das andere Bein lang gestreckt bleibt (Fußspitze zeigt nach oben). Schützt vor Leistenzerrungen!"
    },
    {
      id: "cs_low_10",
      slot: "lower",
      name: "Einbeinige Standwaage (Single-Leg RDL) mit Kniehub-Drive",
      equipTags: ["bodyweight", "kettlebell_kh", "miniband"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "endurance", "rotation_throw", "swim_water"],
      cues: "Kontrolliert auf einem Bein in die Standwaage kippen (Becken bleibt parallel zum Boden!) und beim Aufrichten das hintere Knie explosiv in die Sprint-Position hochziehen."
    },
    {
      id: "cs_low_11",
      slot: "lower",
      name: "Sitzender Beckenrand-Flutter-Kick im Wasser (Maximale Beinschlag-Frequenz)",
      equipTags: ["bodyweight"],
      env: ["schwimmhalle"],
      clusters: ["swim_water", "endurance"],
      cues: "An der Beckenkante sitzen oder im Wasser am Überlauf festhalten und maximale Kraul-/Delfin-Beinschlag-Frequenz aus der Hüfte erzeugen (Wasser muss kochen!)."
    },
    {
      id: "cs_up_09",
      slot: "upper",
      name: "Y-T-W-A Schulterblatt-Kontrolle in Bauchlage auf der Matte (Prehab)",
      equipTags: ["bodyweight", "miniband"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["swim_water", "rotation_throw", "endurance", "fitness"],
      cues: "Bauchlage auf der Matte, Stirn leicht angehoben, Arme formen nacheinander die Buchstaben Y, T, W und A mit zusammengezogenen Schulterblättern."
    },
    {
      id: "cs_up_10",
      slot: "upper",
      name: "Diamond / Enge Trizeps-Liegestütze (Auf Matte oder erhöht an Bank/Block)",
      equipTags: ["bodyweight", "kasten_bank"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["combat", "swim_water", "rotation_throw", "fitness"],
      cues: "Ellbogen gleiten eng am Brustkorb entlang nach hinten – stärkt gezielt die Endstreckung für Wurf, Stoß und Kraul-Druckphase."
    },
    {
      id: "cs_up_11",
      slot: "upper",
      name: "Pike Push-Ups / Schulter-Stützdrücken (Überkopf-Stabilität ohne Gerät)",
      equipTags: ["bodyweight", "kasten_bank"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["combat", "rotation_throw", "swim_water", "fitness"],
      cues: "Hüfte hoch in die umgekehrte V-Position schieben und den Kopf kontrolliert vor den Händen Richtung Matte absenken und kraftvoll wegdrücken."
    },
    {
      id: "cs_cr_07",
      slot: "core",
      name: "Pallof Press / Anti-Rotations-Halten mit Miniband oder Partner-Zug",
      equipTags: ["miniband", "bodyweight"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["rotation_throw", "sprint_stopgo", "combat", "swim_water"],
      cues: "Im Athletik-Stand das Band (oder Partner-Hände) vor der Brust nach vorne strecken, während seitlicher Zug wirkt – Rumpf verdreht sich keinen Millimeter!"
    },
    {
      id: "cs_cr_08",
      slot: "core",
      name: "Side-Plank mit Hüft-Dip & oberem Beinheben (Gluteus Medius & Flanke)",
      equipTags: ["bodyweight", "miniband"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "endurance", "swim_water", "rotation_throw"],
      cues: "Seitstütz auf dem Unterarm, Hüfte aktiv weit nach oben schieben und das obere Bein gestreckt abspreizen – verhindert das Einknicken der Hüfte beim Laufen & Schwimmen."
    },
    {
      id: "cs_cr_09",
      slot: "core",
      name: "Plank-to-Push-Up (Commando-Stützwechsel ohne Hüftschaukeln)",
      equipTags: ["bodyweight"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["combat", "sprint_stopgo", "swim_water", "fitness"],
      cues: "Vom Unterarmstütz kontrolliert in den Handstütz hochdrücken und wieder ablassen. Füße stehen breit, das Becken bleibt völlig parallel zum Boden."
    },
    {
      id: "cs_cr_10",
      slot: "core",
      name: "Hollow-to-Arch Rolls (Schildkröten-Schiffchen-Rollen ohne Bodenkontakt)",
      equipTags: ["bodyweight"],
      env: ["halle", "kraftraum", "schwimmhalle"],
      clusters: ["swim_water", "combat", "fitness"],
      cues: "Mit gestreckten Armen und Beinen (Hände und Füße berühren nie den Boden!) kontrolliert aus der Hollow-Rückenlage in die Superman-Bauchlage und zurück rollen."
    },
    {
      id: "cs_mt_08",
      slot: "metabolic",
      name: "Wassertreten (Eggbeater-Kick) mit Händen über dem Kopf im tiefen Becken",
      equipTags: ["bodyweight", "medball"],
      env: ["schwimmhalle"],
      clusters: ["swim_water", "endurance"],
      cues: "Im tiefen Wasser: Hände (oder Medizinball) komplett trocken über der Wasseroberfläche halten, kräftiger Wechsel-Grätsch- oder Kraulbeinschlag für volle Intervalldauer!"
    },
    {
      id: "cs_mt_09",
      slot: "metabolic",
      name: "High-Knee Sprint-Running am Platz mit Miniband um die Vorfüße",
      equipTags: ["miniband", "bodyweight"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["sprint_stopgo", "combat", "endurance", "fitness"],
      cues: "Schneller Kniehebelauf am Ort gegen den Widerstand des Minibands – kräftigt den Hüftbeuger (Iliopsoas) für maximale Schrittlänge im Sprint."
    },
    {
      id: "cs_mt_10",
      slot: "metabolic",
      name: "Medizinball Burpee-to-Chest-Pass (Partner-Kombi)",
      equipTags: ["medball"],
      env: ["platz", "halle", "kraftraum"],
      clusters: ["combat", "sprint_stopgo", "rotation_throw", "fitness"],
      cues: "Ball fangen, ablegen, schneller Sprawl/Burpee, aufstehen und den Medizinball explosiv aus der Brust zum Partner zurückpassen."
    },
    {
      id: "cs_mt_11",
      slot: "metabolic",
      name: "Skater-Hops links/rechts mit tiefem Boden-Touch (Rutschfeste Matte)",
      equipTags: ["bodyweight", "miniband"],
      env: ["platz", "halle", "kraftraum", "schwimmhalle"],
      clusters: ["sprint_stopgo", "rotation_throw", "combat", "endurance"],
      cues: "Dynamische Seitwärtssprünge von Bein zu Bein auf der Matte, die freie Hand tippt jeweils außen neben dem Standfuß auf den Boden."
    }
  ],

  // 4. SAISON-PARAMETER FÜR DEN ZIRKEL (INKL. SPEZIFISCHER WASSER-FINISHER FÜR DIE SCHWIMMHALLE)
  seasonConfigs: {
    pre: {
      label: "❄️ Pre-Season (Vorbereitungsphase – Fokus: Gewebetoleranz, Kraftausdauer & Laktatpuffer)",
      workRest: "45 Sek. Belastung / 20 Sek. Stationswechsel",
      rounds: "3–4 komplette Runden (je 90 Sek. Serienpause zwischen den Runden)",
      finisher: "<strong>Pre-Season Finisher (Eurofit / 15-15 Intervalle):</strong> 8–10 Wiederholungen: 15 Sek. zügiger Tempolauf (ca. 85% max. Speed) / 15 Sek. aktive Gehpause. Baut maximale aerobe Kapazität auf.",
      finisherSwim: "<strong>🏊 Pre-Season Wasser-Finisher (Laktat-Toleranz im Becken):</strong> 8× 50m im Hauptschwimmstil mit Abgangszeit alle 60–75 Sek. (Hohes, gleichmäßiges Tempo mit Fokus auf saubere Wenden auch unter Ermüdung!)."
    },
    in: {
      label: "🏆 In-Season (Laufender Spiel-/Wettkampfbetrieb – Fokus: Spritzigkeit, ZNS-Frische & Verletzungsschutz)",
      workRest: "25–30 Sek. hochqualitative Ausführung / 35 Sek. volle Erholung",
      rounds: "2–3 knackige Runden (Kein Muskelversagen! Qualität & Explosivität vor Ermüdung)",
      finisher: "<strong>In-Season Micro-Booster (RSA - Repeated Sprint Ability):</strong> 4× 20m Antritt mit Richtungswechsel bei 45 Sek. voller Pause. Hält die Schnellkraft auf Top-Niveau, ohne schwere Beine am Wochenende zu verursachen!",
      finisherSwim: "<strong>🏊 In-Season Race-Pace Booster (Wettkampf-Spritzigkeit):</strong> 6× 25m (15m Maximal-Breakout in Rennfrequenz + 10m lockeres Ausschwimmen) bei 60 Sek. Pause. Maximale Wassergefühl-Aktivierung ohne Übersäuerung vor dem Wettkampf!"
    },
    off: {
      label: "🏖️ Off-Season (Sommer-/Winterpause – Fokus: Dysbalancen ausgleichen, Mobilität & Rumpf-Aufbau)",
      workRest: "40 Sek. kontrolliertes Tempo (Time Under Tension) / 25 Sek. Wechsel",
      rounds: "3 Runden mit Fokus auf saubere Bewegungsamplitude (Full Range of Motion)",
      finisher: "<strong>Off-Season Aerobic Flow:</strong> 10–12 Minuten lockeres Auslaufen oder Mobility-Flow in Zone 2 (Nasenatmung) + gemeinsames Stretching.",
      finisherSwim: "<strong>🏊 Off-Season Technik- & Sculling-Flow:</strong> 300–400m lockeres Lagen-/Technikschwimmen (Wrasen/Sculling für Wassergefühl, beidseitige Atmung) + Schulter-Dehnung."
    }
  }
};
