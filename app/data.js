// Pacific Command — Reference data
// All rule text is verbatim from the project's Quick Reference doc. No paraphrasing.

// ─── Special rules (verbatim) ──────────────────────────
window.SPECIAL_RULES = {
  'Armoured': {
    name: 'Armoured (X)',
    text: 'When the Attacker assigns Confirmed Hits to a ship with the Armoured (X) rule, it must be assigned X hits or ignores all assigned hits. A single Unconfirmed Hit sinks this ship.',
  },
  'Catapult': {
    name: 'Catapult',
    text: 'May launch Recon Air Actions without an Air Group card (unless in an area of Poor Visibility).',
  },
  'Depth Charges': {
    name: 'Depth Charges',
    text: 'When involved in a Gun Battle against a Task Force containing Submarines, rolls of 5 are Confirmed Hits that must be assigned to Submarines (unless all the Submarines have been sunk, in which case they revert to Unconfirmed Hits).',
  },
  'High Value': {
    name: 'High Value',
    text: 'These ships are of high value to the fleet and may be treated differently in scenario victory conditions.',
  },
  'Submarine': {
    name: 'Submarine',
    text: 'At the start of the Command Phase, any TF that contains only Submarines automatically becomes hidden. During Gun Battles, roll Submarine attack dice separately: rolls of 4 count as Unconfirmed Hits, rolls of 5 or 6 count as Confirmed Hits.',
  },
  'Weak AA Defences': {
    name: 'Weak AA Defences',
    text: 'A ship with this rule contributes no AA dice during the AA Step of an Air Action.',
  },
  'Squadron': {
    name: 'Squadron',
    text: 'An embarked aircraft unit. The total number of squadrons in a Task Force may not exceed the Task Force\u2019s Aircraft value.',
  },
};

// Parse "Armoured (2)" → "Armoured"
window.ruleKey = (s) => (s || '').replace(/\s*\([^)]*\)\s*/g, '').trim();

window.SHIP_CLASSES = [
  // Capital — air arm
  { id: 'fleet-carrier', name: 'Fleet Carrier', category: 'capital', cost: 25,
    role: 'Aircraft 15', special: 'High Value, Armoured (2)',
    stats: { guns: 0, aircraft: 15, aa: 1, strike: 0, cap: 0 },
    isCarrier: true, sprite: 'CV' },
  { id: 'light-carrier', name: 'Light Carrier', category: 'capital', cost: 10,
    role: 'Aircraft 6', special: 'High Value',
    stats: { guns: 0, aircraft: 6, aa: 1, strike: 0, cap: 0 },
    isCarrier: true, sprite: 'CVL' },
  { id: 'seaplane-tender', name: 'Seaplane Tender', category: 'capital', cost: 3,
    role: '', special: 'Catapult',
    stats: { guns: 0, aircraft: 0, aa: 1, strike: 0, cap: 0 }, sprite: 'AV' },

  // Capital — surface
  { id: 'battleship', name: 'Battleship', category: 'surface', cost: 15,
    role: 'Guns 8', special: 'High Value, Armoured (3)',
    stats: { guns: 8, aircraft: 0, aa: 1, strike: 0, cap: 0 }, sprite: 'BB' },
  { id: 'heavy-cruiser', name: 'Heavy Cruiser', category: 'surface', cost: 10,
    role: 'Guns 4', special: 'Catapult, Armoured (2)',
    stats: { guns: 4, aircraft: 0, aa: 1, strike: 0, cap: 0 }, sprite: 'CA' },
  { id: 'light-cruiser', name: 'Light Cruiser', category: 'surface', cost: 6,
    role: 'Guns 2', special: 'Catapult',
    stats: { guns: 2, aircraft: 0, aa: 1, strike: 0, cap: 0 }, sprite: 'CL' },

  // Screen / sub
  { id: 'destroyer', name: 'Destroyer', category: 'screen', cost: 3,
    role: 'Guns 1', special: 'Depth Charges',
    stats: { guns: 1, aircraft: 0, aa: 1, strike: 0, cap: 0 }, sprite: 'DD' },
  { id: 'submarine', name: 'Submarine', category: 'screen', cost: 6,
    role: 'Guns 1', special: 'Submarine, Weak AA Defences',
    stats: { guns: 1, aircraft: 0, aa: 0, strike: 0, cap: 0 }, sprite: 'SS' },
  { id: 'auxiliary', name: 'Auxiliary', category: 'screen', cost: 2,
    role: '', special: 'Weak AA Defences',
    stats: { guns: 0, aircraft: 0, aa: 0, strike: 0, cap: 0 }, sprite: 'AUX' },

  // Squadrons
  { id: 'fighter-sqn', name: 'Fighter Squadron', category: 'squadron', cost: 1,
    role: 'CAP 1', special: 'Squadron',
    stats: { guns: 0, aircraft: 0, aa: 0, strike: 0, cap: 1 },
    kind: 'squadron', sprite: 'F' },
  { id: 'bomber-sqn', name: 'Bomber Squadron', category: 'squadron', cost: 1,
    role: 'Strike 1', special: 'Squadron',
    stats: { guns: 0, aircraft: 0, aa: 0, strike: 1, cap: 0 },
    kind: 'squadron', sprite: 'B' },
];

window.CATEGORIES = [
  { id: 'capital',  label: 'Carriers and tenders',  printLabel: 'Carriers' },
  { id: 'surface',  label: 'Battle line',           printLabel: 'Battle line' },
  { id: 'screen',   label: 'Screen and submarines', printLabel: 'Screen' },
  { id: 'squadron', label: 'Air squadrons',         printLabel: 'Air squadrons' },
];

// Modifications (verbatim text from rulebook)
window.MODIFICATIONS = [
  { id: 'improved-armour', name: 'Improved Armour',
    text: 'Ships of the noted class increase the value of their Armoured (X) value by +1 during Gun battles.',
    effect: { kind: 'armourClass' }, needsClass: true },
  { id: 'torpedo-belts', name: 'Torpedo Belts',
    text: 'Ships of the noted class increase the value of their Armoured (X) value by +1 during Strikes.',
    effect: { kind: 'armourClass' }, needsClass: true },
  { id: 'coordinated-strikes', name: 'Coordinated Strikes',
    text: 'In the Declare Strike Step of an Air Action, this fleet can reveal and discard a black Air Group card from another friendly Task Force in the same Stack to add that Task Force Strike value to the active Task Force when amassing Strike dice.',
    effect: { kind: 'flavour' } },
  { id: 'daring-commander', name: 'Daring Commander',
    text: 'This fleet receives one additional Gambit while building their Fleet.',
    effect: { kind: 'flavour' } },
  { id: 'enemy-codes', name: 'Enemy Codes',
    text: 'This Fleet receives one additional Command Chip each round.',
    effect: { kind: 'flavour' } },
  { id: 'enemy-plans', name: 'Enemy Plans',
    text: 'This Fleet increases the target number for Recon Rolls by +2 (ordinarily succeeding on a 10 or less).',
    effect: { kind: 'flavour' } },
  { id: 'escort-carriers', name: 'Escort Carriers',
    text: "During Fleet Building, this Fleet's Light Carriers do not count towards its limit of High Value ships.",
    effect: { kind: 'flavour' } },
  { id: 'extended-craft-range', name: 'Extended Aircraft Range',
    text: 'This Fleet has a Strike Range of 24" and a Recon Range of 48".',
    effect: { kind: 'flavour' } },
  { id: 'false-codes', name: 'False Codes',
    text: "This Fleet's Stacks move 12 inches.",
    effect: { kind: 'flavour' } },
  { id: 'increased-aircraft', name: 'Increased Aircraft Capacity',
    text: 'Carriers in this fleet increase their Aircraft value by +3.',
    effect: { kind: 'aircraftCarrierBonus', amount: 3 } },
  { id: 'long-range-radar', name: 'Long-Range Radar',
    text: 'This Fleet adds +1 to its Recon Roll target numbers, if the target is within Strike Range (18").',
    effect: { kind: 'flavour' } },
  { id: 'mobile-force-doctrine', name: 'Mobile Force Doctrine',
    text: 'During Fleet Building, this Fleet has no limit on the number of Fleet Carriers it can put in any single Task Force. The High Value limit still applies.',
    effect: { kind: 'flavour' } },
  { id: 'near-range-radar', name: 'Near-Range Radar',
    text: "If the opponent rolls a double when making a Recon Roll against one of this Fleet's Stacks, the Recon Roll fails.",
    effect: { kind: 'flavour' } },
  { id: 'overwhelming-air-patrols', name: 'Overwhelming Air Patrols',
    text: 'When a Task Force in this fleet is attacked by enemy Air Action, the task force may declare an intercept without revealing a red Air Group card, rolling half its CAP value in Intercept dice (rounded down).',
    effect: { kind: 'flavour' } },
  { id: 'seasoned-pilots', name: 'Seasoned Pilots',
    text: 'When this fleet rolls Strike dice, rolls of 3-5 count as Unconfirmed Hits. When this fleet rolls Interception dice, rolls of 4+ count as hits.',
    effect: { kind: 'flavour' } },
  { id: 'superior-fighters', name: 'Superior Fighters',
    text: 'When this fleet rolls Interception dice, they may re-roll any misses once.',
    effect: { kind: 'flavour' } },
  { id: 'wily-commander', name: 'Wily Commander',
    text: 'At the start of each game, this Fleet receives an additional Ⓜ blank chips to build its stacks.',
    effect: { kind: 'flavour' } },
  { id: 'aircraft-shortage', name: 'Aircraft Shortage', disadv: true,
    text: 'Disadvantageous. All ships in this Fleet halve their Aircraft values, rounding up.',
    effect: { kind: 'aircraftHalveCeil' } },
  { id: 'ineffective-aa', name: 'Ineffective AA', disadv: true,
    text: 'Disadvantageous. After rolling AA dice for this Fleet, discard half of the hits (keeping an odd hit).',
    effect: { kind: 'flavour' } },
  { id: 'overconfident-commander', name: 'Overconfident Commander', disadv: true,
    text: 'Disadvantageous. This Fleet receives one fewer Gambit during game setup.',
    effect: { kind: 'flavour' } },
  { id: 'overcomplicated-plans', name: 'Overcomplicated Plans', disadv: true,
    text: "Disadvantageous. After deployment, this Fleet's opponent may select three of this Fleet's Stacks and redistribute the chips among those three Stacks as they wish.",
    effect: { kind: 'flavour' } },
  { id: 'rookie-pilots', name: 'Rookie Pilots', disadv: true,
    text: 'Disadvantageous. When this fleet rolls Strike dice, only rolls of 5 count as Unconfirmed Hits. When this fleet rolls Interception dice, only rolls of 6 count as hits.',
    effect: { kind: 'flavour' } },
  { id: 'unrefined-fuel', name: 'Unrefined Fuel', disadv: true,
    text: 'Disadvantageous. When the enemy rolls Strike dice against this fleet, rolls of 5 and 6 count as Confirmed Hits.',
    effect: { kind: 'flavour' } },
  { id: 'unreliable-torpedoes', name: 'Unreliable Torpedoes', disadv: true,
    text: 'Disadvantageous. When rolling Strike dice, the attacker must re-roll all its Confirmed Hits once.',
    effect: { kind: 'flavour' } },
];

// ─── Historical Modification Sets ─────────────────────
// Verbatim from the four boxes in the Quick Reference doc.
// One set is applied to the whole fleet at a time.
window.HISTORICAL_MOD_SETS = [
  { id: 'ew-usn', faction: 'USN', era: 'Early War', label: 'Early War USN',
    mods: ['enemy-codes', 'increased-aircraft', 'unreliable-torpedoes'] },
  { id: 'ew-ijn', faction: 'IJN', era: 'Early War', label: 'Early War IJN',
    mods: ['coordinated-strikes', 'extended-craft-range', 'ineffective-aa', 'mobile-force-doctrine', 'seasoned-pilots', 'superior-fighters'] },
  { id: 'lw-usn', faction: 'USN', era: 'Late War', label: 'Late War USN',
    mods: ['coordinated-strikes', 'enemy-codes', 'increased-aircraft', 'mobile-force-doctrine'] },
  { id: 'lw-ijn', faction: 'IJN', era: 'Late War', label: 'Late War IJN',
    mods: ['aircraft-shortage', 'coordinated-strikes', 'extended-craft-range', 'ineffective-aa', 'rookie-pilots'] },
  { id: 'kk-std', faction: 'KK', era: 'Standard', label: 'Kalium Kabal', mods: [] },
  { id: 'pr-std', faction: 'PR', era: 'Standard', label: 'Postman Republic', mods: [] },
  { id: 'ucm-std', faction: 'UCM', era: 'Standard', label: 'United Colonies', mods: [] },
  { id: 'phr-std', faction: 'PHR', era: 'Standard', label: 'Posthuman Republic', mods: [] },
  { id: 'scrg-std', faction: 'SCRG', era: 'Standard', label: 'Scourge', mods: [] },
  { id: 'shlt-std', faction: 'SHLT', era: 'Standard', label: 'Shaltari', mods: [] },
  { id: 'res-std', faction: 'RES', era: 'Standard', label: 'Resistance', mods: [] },
  { id: 'bfcr-std', faction: 'BFCR', era: 'Standard', label: 'Bioficer', mods: [] },
];

// ─── Historical ship/squadron names ────────────────────
window.HISTORICAL_NAMES = {
  "UCM": {
    "Standard": {
      "fleet-carrier": [
        "Edmonton-class Fleet Carrier",
        "Las Vegas-class Fleet Carrier",
        "Seattle-class Fleet Carrier",
        "Ark Royal",
        "Midway",
        "Enterprise",
        "Waning Tide",
        "Washington-class Fleet Carrier",
        "Washington",
        "Eisenhower",
        "Nimitz",
        "Our Will",
        "Shield of Aurum"
      ],
      "light-carrier": [
        "New Mombasa-class Light Carrier",
        "Vienna-class Light Carrier",
        "Musketeer",
        "Arquebus",
        "Count Nicholas"
      ],
      "seaplane-tender": [
        "Vancouver-class Seaplane Tender",
        "Hornet",
        "Commandment",
        "Atoll"
      ],
      "battleship": [
        "Babylon-class Battleship",
        "Babylon",
        "Alexander the Great",
        "Gaugamela",
        "Nebuchadnezzar",
        "Beijing-class Battleship",
        "Byzantium-class Battleship",
        "Byzantium",
        "Constantine",
        "Saladin",
        "Basilic",
        "Carthage-class Battleship",
        "Hannibal",
        "War Elephant",
        "Phoenician",
        "Delhi-class Battleship",
        "Hanoi-class Battleship",
        "Hong Kong-class Battleship",
        "London-class Battleship",
        "London",
        "Robert A Bernard",
        "Destiny",
        "Sceptered Empress",
        "Triumph",
        "Milwaukee-class Battleship",
        "New Dubai-class Battleship",
        "New York-class Battleship",
        "Rotterdam-class Battleship",
        "Thebes-class Battleship",
        "Thebes",
        "Cadmus",
        "Cassander",
        "Ark Majesty",
        "Tokyo-class Battleship"
      ],
      "heavy-cruiser": [
        "Busan-class Heavy Cruiser",
        "Centurion-class Heavy Cruiser",
        "Johannesburg-class Heavy Cruiser",
        "Perth-class Heavy Cruiser",
        "Rome-class Heavy Cruiser",
        "Siam-class Heavy Cruiser",
        "Venice-class Heavy Cruiser",
        "Vilnius-class Heavy Cruiser",
        "Warsaw-class Heavy Cruiser",
        "Yokohama-class Heavy Cruiser"
      ],
      "light-cruiser": [
        "Berlin-class Light Cruiser",
        "Aurora",
        "Spear of Destiny",
        "Surefire",
        "Ardent",
        "Boston-class Light Cruiser",
        "Bruges-class Light Cruiser",
        "Bucharest-class Light Cruiser",
        "Geneva-class Light Cruiser",
        "Glasgow-class Light Cruiser",
        "Madrid-class Light Cruiser",
        "Punisher",
        "Righteous Revenge",
        "Death's Shadow",
        "Hammer of Justice",
        "New Cairo-class Light Cruiser",
        "Sunstar",
        "Excalibur",
        "True Arrow",
        "Firebrand",
        "Osaka-class Light Cruiser",
        "Paladin",
        "Dire Wolf",
        "Belfast II",
        "Wakizashi",
        "Rio-class Light Cruiser",
        "Gaius Duilius",
        "Constitution",
        "Soldier of Fortune",
        "Song of Hope",
        "Ulaanbaatar-class Light Cruiser"
      ],
      "destroyer": [
        "Caracas-class Destroyer",
        "Detroit-class Destroyer",
        "Havana-class Destroyer",
        "Mjolnir",
        "Black Prince",
        "Vengeance",
        "Istanbul-class Destroyer",
        "Fist of Osman",
        "Suliman",
        "Loyal Janissary",
        "Jakarta-class Destroyer",
        "Aegis",
        "Shield of Ferrum",
        "Congress",
        "Noble Squire",
        "Kyiv-class Destroyer",
        "Aleksy the Great",
        "Green Square",
        "Wrathful",
        "Nuuk-class Destroyer",
        "Blizzard",
        "Shard of Ice",
        "Frostblade",
        "Harpoon",
        "Nuuk",
        "Oslo-class Destroyer",
        "Reykjavik-class Destroyer",
        "Arrow",
        "Lancelot",
        "Sheffield-class Destroyer",
        "Taipei-class Destroyer",
        "Surprise",
        "Undaunted",
        "Assasin's Blade",
        "Blackjack",
        "Toulon-class Destroyer",
        "Drake",
        "Levant",
        "Constellation",
        "Titania Sunrise"
      ],
      "submarine": [
        "Lysander-class Submarine",
        "Hope's Spark",
        "Blue Shade",
        "Eternal Darkness",
        "Azure Night",
        "Leprechaun",
        "Silent",
        "Santiago-class Submarine",
        "Jolly Roger",
        "Queen Anne's Revenge",
        "Flying Dragon",
        "Golden Hind"
      ],
      "auxiliary": [
        "Lima-class Auxiliary",
        "Pharos",
        "Guiding Light",
        "Nostradamus",
        "Virgil",
        "New Orleans-class Auxiliary",
        "Avenger",
        "Aurum's Grace",
        "Ocean",
        "Everblade",
        "San Francisco-class Auxiliary",
        "Warbringer",
        "Ark of Ferrum",
        "Sanctuary",
        "Conqueror"
      ],
      "fighter-sqn": [
        "Voidblade Alpha",
        "Voidblade Bravo",
        "Voidblade Charlie",
        "Voidblade Delta",
        "Voidblade Echo",
        "Voidblade Foxtrot",
        "Voidblade Gamma",
        "Voidblade Hydra",
        "Voidblade Ion"
      ],
      "bomber-sqn": [
        "Voidhammer Alpha",
        "Voidhammer Bravo",
        "Voidhammer Charlie",
        "Voidhammer Delta",
        "Voidhammer Echo",
        "Voidhammer Foxtrot",
        "Voidhammer Gamma",
        "Voidhammer Hydra"
      ]
    }
  },
  "PHR": {
    "Standard": {
      "fleet-carrier": [
        "Bellerophon-class Fleet Carrier",
        "Alexander's Ambition",
        "Socrates",
        "Fireheart",
        "Salamis",
        "Memnon-class Fleet Carrier",
        "Mount Olympus",
        "Valhalla",
        "Majesty"
      ],
      "light-carrier": [
        "Ikarus-class Light Carrier",
        "Red Cliffs",
        "Plato",
        "Tower of Knowledge",
        "Dark Prince",
        "Pollux-class Light Carrier",
        "Conferred Divinity",
        "Halo Nine"
      ],
      "seaplane-tender": [
        "Andromeda-class Seaplane Tender",
        "Young Mother",
        "Columbus",
        "Wright Flyer",
        "Shoal Princess"
      ],
      "battleship": [
        "Amphion-class Battleship",
        "Wrath of Zeus",
        "Thunderbolt",
        "Elemental",
        "Antony-class Battleship",
        "Augustus-class Battleship",
        "Might of Pearlescent",
        "Imperator",
        "Victorius",
        "Brutus-class Battleship",
        "Caesar-class Battleship",
        "Julius Ceasar",
        "Dictator",
        "Supreme",
        "Cato-class Battleship",
        "Heracles-class Battleship",
        "Enlightenment",
        "Renaissance",
        "Queen Boudicca",
        "Code Eternal",
        "Kairos-class Battleship",
        "Destiny's Fist",
        "Triumph of Shangri-La",
        "Godslayer",
        "Queen of Its Will",
        "Minos-class Battleship",
        "Progress",
        "Revelations",
        "Great Axiom",
        "Truth's Instrument",
        "Octavius-class Battleship",
        "Actium",
        "Cleopatra's Bane",
        "Long Reign",
        "Remus-class Battleship",
        "Purity of Power",
        "Deliverance",
        "Heaven's Judgement",
        "Queen of Ends",
        "Rhadamanthus-class Battleship",
        "Silencer",
        "Expeditious Judgement",
        "Code Enforcer",
        "Lightning Tree",
        "Romulus-class Battleship",
        "Starheart",
        "Hammer of Purpose",
        "Deus Ex Machina",
        "Forgefire",
        "Sarpedon-class Battleship",
        "Triumvir",
        "Four Suns",
        "Shining Path",
        "Dawnglaive",
        "Trajan-class Battleship",
        "Godhammer",
        "Sphere's Benevolence"
      ],
      "heavy-cruiser": [
        "Achilles-class Heavy Cruiser",
        "Gailileo",
        "Iliad",
        "Unheeled",
        "Titan's Ire",
        "Agamemnon-class Heavy Cruiser",
        "Agrippa-class Heavy Cruiser",
        "Antigonus-class Heavy Cruiser",
        "Centurion-class Heavy Cruiser",
        "Hector-class Heavy Cruiser",
        "Einstein's Equation",
        "Odyssey",
        "Am Become Death",
        "Cicero",
        "Leonnatus-class Heavy Cruiser",
        "Pompeius-class Heavy Cruiser",
        "Priam-class Heavy Cruiser",
        "Ptolemy-class Heavy Cruiser",
        "Seleucus-class Heavy Cruiser",
        "Sysyphus-class Heavy Cruiser",
        "Old Boulder",
        "Ruined King",
        "Ephyra's Fist",
        "Hubris"
      ],
      "light-cruiser": [
        "Ajax-class Light Cruiser",
        "Searing Truth",
        "Archimedes",
        "Fatal",
        "Turing's Cipher",
        "Ganymede-class Light Cruiser",
        "Argo",
        "Great Library",
        "Copernicus",
        "Judgement of Zeus",
        "Orion-class Light Cruiser",
        "Mind of Asimov",
        "Aristotle",
        "Marathon",
        "Journeyman",
        "Orpheus-class Light Cruiser",
        "A Thousand Fathoms",
        "Marie Curie",
        "Actium",
        "Newton's Apple",
        "Otera-class Light Cruiser",
        "Perseus-class Light Cruiser",
        "Knowing Virtue",
        "Nikola Tesla",
        "Hoplite's Helm",
        "Trident of Neptune",
        "Teucer-class Light Cruiser",
        "Theseus-class Light Cruiser",
        "Hypatia",
        "Phaeton",
        "Voltaire",
        "Bright Mind"
      ],
      "destroyer": [
        "Ariadne-class Destroyer",
        "Strikehome",
        "Myrmidon",
        "Known Purpose",
        "Cadmus-class Destroyer",
        "Calypso-class Destroyer",
        "Foe Confounded",
        "Deep Blue",
        "Waves of Lamarr",
        "Inviolate",
        "Castor-class Destroyer",
        "Cogent Reason",
        "Bedrock",
        "Chrysaor-class Destroyer",
        "Electra-class Destroyer",
        "Trident of Poseidon",
        "Harpe",
        "Sword",
        "Europa-class Destroyer",
        "Steadfast",
        "Countenance of Janus",
        "Open Future",
        "Cold Warrior",
        "Ourania-class Destroyer",
        "Eye of the Sphere",
        "Ornithes Areioi",
        "Nightsun",
        "Fargaze",
        "Pandora-class Destroyer",
        "Cyclopean Gaze",
        "Brightflame",
        "Lance of Athena",
        "Illuminator",
        "Philonoe Torpedo-class Destroyer"
      ],
      "submarine": [
        "Echo-class Submarine",
        "Silence",
        "Isolator",
        "Cloudhunter",
        "Mist Cleaver",
        "Pegasus-class Submarine",
        "Pegasus",
        "Righteous Blade",
        "Huntress",
        "Mercury"
      ],
      "auxiliary": [
        "Harpocrates Guerrilla-class Auxiliary",
        "The Veil",
        "Labyrinth 1",
        "2 and 3",
        "Retiaritus",
        "Jason-class Auxiliary",
        "Ghost Warrior",
        "Longship",
        "Medea-class Auxiliary",
        "Castor",
        "Homeshell",
        "Hellbringer",
        "Alesia",
        "Meleager-class Auxiliary",
        "Odysseus-class Auxiliary",
        "Neil Armstrong",
        "Yuri Gagarin",
        "Pathfinder"
      ],
      "fighter-sqn": [
        "Arion Alpha",
        "Arion Bravo",
        "Arion Charlie",
        "Arion Delta",
        "Arion Echo",
        "Arion Foxtrot",
        "Arion Gamma",
        "Arion Hydra",
        "Arion Ion"
      ],
      "bomber-sqn": [
        "Aethon Alpha",
        "Aethon Bravo",
        "Aethon Charlie",
        "Aethon Delta",
        "Aethon Echo",
        "Aethon Foxtrot",
        "Aethon Gamma",
        "Aethon Hydra"
      ]
    }
  },
  "SCRG": {
    "Standard": {
      "fleet-carrier": [
        "Hydra-class Fleet Carrier",
        "Sable Chalice",
        "Angelslayer"
      ],
      "light-carrier": [
        "Apsasu-class Light Carrier",
        "Kulshedra-class Light Carrier",
        "Foe Eater",
        "Cthonia's Serpent",
        "Bollar",
        "Neptune's Bane"
      ],
      "seaplane-tender": [
        "Lamassu-class Seaplane Tender",
        "Viper's Nest",
        "Stormcloud",
        "Thunderhead"
      ],
      "battleship": [
        "Bael-class Battleship",
        "Reaper's Scythe",
        "Eden Prowler",
        "Facets of Death",
        "Stygia",
        "Beelzebub-class Battleship",
        "Cthulhu-class Battleship",
        "Mort",
        "Scythe of the Enemy",
        "Admiral Kimiko's Doom",
        "Voidflare",
        "Daemon-class Battleship",
        "Devil-class Battleship",
        "Dragon-class Battleship",
        "Faust-class Battleship",
        "Dark Pact",
        "Mephistopheles",
        "Descent",
        "Cloud over Shangri-la",
        "Lucifer-class Battleship",
        "Nephilim-class Battleship",
        "Void Giant",
        "Elysium's Hammer",
        "Nosferatu-class Battleship",
        "Eden's Bane",
        "Sable Fiend",
        "Dread Warrior",
        "Lord of the Damned",
        "Raum-class Battleship",
        "Deathcrow",
        "Samael-class Battleship",
        "Our Plague",
        "Primeval Serpent",
        "Severity",
        "Destroying"
      ],
      "heavy-cruiser": [
        "Akuma-class Heavy Cruiser",
        "Earthbane",
        "Banshee-class Heavy Cruiser",
        "Shadow of Mercury",
        "Flowing Oil (Manticore class)",
        "Wrathchild",
        "Dark Scion",
        "Nosferatu (Banshee class)",
        "Raiju-class Heavy Cruiser",
        "Corrupting Sun",
        "Light of Darkness",
        "Cursed Revenant",
        "Fiery Spectre",
        "Shadow-class Heavy Cruiser",
        "Last Rites",
        "Thunderhead",
        "Lasher",
        "Irwin's Nemesis",
        "Shenlong-class Heavy Cruiser",
        "Creeping Death",
        "Fletcher's Phantom",
        "Untouchable",
        "Vitae Blade",
        "Umbra-class Heavy Cruiser",
        "Lidless Eye",
        "Presage of Doom",
        "Hate Filled",
        "Enemy's Ire"
      ],
      "light-cruiser": [
        "Gremlin-class Light Cruiser",
        "Piskie",
        "Little Sod",
        "Firefang",
        "Ifrit-class Light Cruiser",
        "Incandescence",
        "Vlad Tepes",
        "Scourge of Ikarus",
        "Lone Warrior",
        "Sphinx-class Light Cruiser",
        "Torturer",
        "Predator's Eye",
        "Old Serpent",
        "Roche's Nightmare",
        "Strix-class Light Cruiser",
        "Bloody Rapier",
        "Immolator",
        "Chang's Doom",
        "Haymaker",
        "Wyvern-class Light Cruiser",
        "Slaughterer",
        "Scarlet Path",
        "Firebreather",
        "Kronstein's Lament",
        "Yokai-class Light Cruiser",
        "Shangri-La Nemesis",
        "Glass Dagger",
        "Bloodhound"
      ],
      "destroyer": [
        "Charybdis-class Destroyer",
        "Shadow of Death",
        "Cruel Judgement",
        "Andreas",
        "Iconoclast",
        "Djinn-class Destroyer",
        "Poltergeist",
        "Little Satan",
        "Belligerent",
        "Switchblade",
        "Ebisu Tackling-class Destroyer",
        "Harpy-class Destroyer",
        "Patient Spider",
        "Scorpion's Tail",
        "Grant's Killer",
        "Eden's Harpy",
        "Nickar-class Destroyer",
        "Eden's Bane",
        "Wardog",
        "Halsey's Folly",
        "Jack the Ripper",
        "Parasite-class Destroyer",
        "Vampiric",
        "Darkshield",
        "Swift Death",
        "Scylla-class Destroyer",
        "Red October",
        "Funnelweb",
        "Chthonic Chorus",
        "Nautilus",
        "Shedu-class Destroyer",
        "Silent Guardian",
        "Xi's Sentinel",
        "Wraith-class Destroyer",
        "Galen's Wraith",
        "Crow Nebula 1",
        "Crow Nebula 2",
        "Sable Vulture"
      ],
      "submarine": [
        "Incubus-class Submarine",
        "Night's Eye",
        "Pompeii",
        "Darkstone",
        "Little Chaos-class Submarine",
        "Revenant-class Submarine",
        "The Four Horsemen (group of four vessels)",
        "Greywolf",
        "Succubus-class Submarine",
        "Fool's Doom",
        "Chang's End",
        "Bloodtide"
      ],
      "auxiliary": [
        "Chimera-class Auxiliary",
        "Hellpit",
        "Hordebringer",
        "Plague Carrier",
        "Satan's Ark",
        "Gargoyle-class Auxiliary",
        "Belcher",
        "Miasma",
        "Demeter",
        "Rainbringer",
        "Hiruko-class Auxiliary",
        "None - all destroyed"
      ],
      "fighter-sqn": [
        "Hellscream Alpha",
        "Hellscream Bravo",
        "Hellscream Charlie",
        "Hellscream Delta",
        "Hellscream Echo",
        "Hellscream Foxtrot",
        "Hellscream Gamma",
        "Hellscream Hydra",
        "Hellscream Ion"
      ],
      "bomber-sqn": [
        "Hellmaw Alpha",
        "Hellmaw Bravo",
        "Hellmaw Charlie",
        "Hellmaw Delta",
        "Hellmaw Echo",
        "Hellmaw Foxtrot",
        "Hellmaw Gamma",
        "Hellmaw Hydra"
      ]
    }
  },
  "SHLT": {
    "Standard": {
      "fleet-carrier": [
        "Gold-class Fleet Carrier",
        "Iron-class Fleet Carrier",
        "Inspiration",
        "Forgeheart",
        "Dreadcloud",
        "Platinum-class Fleet Carrier"
      ],
      "light-carrier": [
        "Basalt-class Light Carrier",
        "Limitless",
        "Sanctity of Sekhmet",
        "Verdant",
        "Fatebringer",
        "Scoria-class Light Carrier"
      ],
      "seaplane-tender": [
        "Voidgate-class Seaplane Tender"
      ],
      "battleship": [
        "Actinium-class Battleship",
        "Diplomat",
        "Aaru-born",
        "Our Distain",
        "Boracite-class Battleship",
        "Starlance",
        "Journeyman",
        "New Death",
        "Portent's",
        "Bronze-class Battleship",
        "Cerium-class Battleship",
        "Starbringer",
        "She Immolates",
        "Copper-class Battleship",
        "Diamond-class Battleship",
        "Euclase-class Battleship",
        "Bestride the Universe",
        "Fate's Hand",
        "Sublime Orbit",
        "Sky Kraken",
        "Lanthanum-class Battleship",
        "Spear of Ra",
        "Sunbringer",
        "Kinslayer",
        "Painite-class Battleship",
        "I Cast Shadow",
        "Enflamed Cloud",
        "Your Night",
        "Heaven's Spear",
        "Plutonium-class Battleship",
        "Aztec King",
        "Mongol Heart",
        "Cheyenne Supreme",
        "Blade of Infinity",
        "Silver-class Battleship",
        "Spinel-class Battleship",
        "Lance of Ra",
        "Eons to Dust",
        "Reducer",
        "Thorium-class Battleship",
        "Void Chariot",
        "Blade of Anubis",
        "Dark Scarab",
        "Uranium-class Battleship",
        "Jade Pyramid",
        "Mayan Fury",
        "Mighty Amazon",
        "Trophy Hunter"
      ],
      "heavy-cruiser": [
        "Goethite-class Heavy Cruiser",
        "Starheart",
        "Wrath of Osiris",
        "Closed Fist",
        "Immolator",
        "Hematite-class Heavy Cruiser",
        "Pharaoh's Spear",
        "Core of Thebes",
        "Temple Blade",
        "Bloodletter",
        "Jet-class Heavy Cruiser",
        "Cobalt Shadow",
        "Inviolate Centuries",
        "Starpride",
        "Pure Knowing",
        "Mesolite-class Heavy Cruiser",
        "Black Pyramid",
        "Aten's Chariot",
        "Invader",
        "Sun",
        "Natrolite-class Heavy Cruiser",
        "Barque Solar",
        "Doombringer",
        "Ark Majestic",
        "Blue Scarab",
        "Obsidian-class Heavy Cruiser",
        "Honour Above Death",
        "Black Immortal",
        "Future Path",
        "Woemaker",
        "Onyx-class Heavy Cruiser",
        "Unending",
        "Folly of Death",
        "Doomsayer",
        "Scythe of Ages",
        "Ruby-class Heavy Cruiser",
        "Perpetual",
        "Bringer of Final Death",
        "Ages Scarlet",
        "Sapphire-class Heavy Cruiser",
        "Ra's Orb",
        "Forever in Wisdom",
        "Supreme"
      ],
      "light-cruiser": [
        "Amber-class Light Cruiser",
        "Sands of Time",
        "Cerulean",
        "Sobek's Memory",
        "Elder Warrior",
        "Aquamarine-class Light Cruiser",
        "Aeons Asunder",
        "Mirrored Gaze",
        "Infinity Circle",
        "Waxing Moon",
        "Azurite-class Light Cruiser",
        "Revenant",
        "Azure Phantom",
        "Twisted Fate",
        "Twilit Eternity",
        "Citrine-class Light Cruiser",
        "Cobalt-class Light Cruiser",
        "Guardian Will",
        "Deathbringer",
        "She Triumphant",
        "Emerald-class Light Cruiser",
        "Infinite Dreams",
        "Warhold",
        "Kingdom of Osiris",
        "Granite-class Light Cruiser",
        "Sorrow",
        "Aeon's Light",
        "Mind's Eye",
        "One True Ending",
        "Turquoise-class Light Cruiser",
        "Stormcrow",
        "Sundered Sky",
        "Nomad",
        "Tsunami"
      ],
      "destroyer": [
        "Amethyst-class Destroyer",
        "Valley of Embers",
        "Blood's Flow",
        "Shade of Horus",
        "Significant Fire",
        "Caesium-class Destroyer",
        "Raa's Wings",
        "Raa's Claw",
        "Featherblade",
        "Chromium-class Destroyer",
        "Novaqueen",
        "Black Pulse",
        "Long Certainty",
        "Gallium-class Destroyer",
        "Bringer of Decay",
        "Cleansing Flame",
        "Inevitability",
        "Fate's Instrument",
        "Glass-class Destroyer",
        "Aetherwind",
        "Rainmaker",
        "Sharp Spear",
        "Dreamscape",
        "Iridium-class Destroyer",
        "Mercury-class Destroyer",
        "Cyan Seas",
        "One Knowledge",
        "Dread Soldier",
        "Opal-class Destroyer",
        "Stark Lantern",
        "Talisman",
        "Immortaliser",
        "Endless Dominion",
        "Silicon-class Destroyer",
        "Euthaniser",
        "Benevolent Mercy",
        "Rio's",
        "Strontium-class Destroyer",
        "Topaz-class Destroyer",
        "Sunrise",
        "Cacophony",
        "Green Depths",
        "First of Bastet"
      ],
      "submarine": [
        "Helium-class Submarine",
        "Mist Warrior",
        "Auru's Ghost",
        "Sudden Lash",
        "Ether Rider",
        "Jade-class Submarine",
        "Corona",
        "Years Behind",
        "Lamenter",
        "Emancipator"
      ],
      "auxiliary": [
        "Selenium-class Auxiliary",
        "Warchariot",
        "Deadly Conjurer"
      ],
      "fighter-sqn": [
        "Starblade Alpha",
        "Starblade Bravo",
        "Starblade Charlie",
        "Starblade Delta",
        "Starblade Echo",
        "Starblade Foxtrot",
        "Starblade Gamma",
        "Starblade Hydra",
        "Starblade Ion"
      ],
      "bomber-sqn": [
        "Starglaive Alpha",
        "Starglaive Bravo",
        "Starglaive Charlie",
        "Starglaive Delta",
        "Starglaive Echo",
        "Starglaive Foxtrot",
        "Starglaive Gamma",
        "Starglaive Hydra"
      ]
    }
  },
  "RES": {
    "Standard": {
      "fleet-carrier": [
        "Saratoga-class Fleet Carrier",
        "Saratoga",
        "Ex-capital hull stripped of main guns and rebuilt as a flight deck",
        "sister to the gun-armed Lexington"
      ],
      "light-carrier": [
        "Baleares-class Light Carrier",
        "Far Erie",
        "Windbringer",
        "Racing Steed (Independents)",
        "Vlad Carmichael",
        "Insurrection's End",
        "Sender of Will (Kalium)",
        "Collins-class Light Carrier"
      ],
      "seaplane-tender": [
        "Triumvir-class Seaplane Tender",
        "Brunel",
        "Eiffel",
        "Stephenson (Independents)",
        "People's Beneficence",
        "Kabal's Wisdom",
        "As One (Kalium)"
      ],
      "battleship": [
        "Barbarossa-class Battleship",
        "High Eagle",
        "Eye of God (Independents)",
        "Our Gaze",
        "Illuminator (Kalium)",
        "Coloniser-class Battleship",
        "Esperance",
        "Trinidad",
        "(Independents)",
        "Conquistador",
        "Drake-class Battleship",
        "Bonaventure",
        "Revenge (Independents)",
        "Soul Reaver",
        "Executioner (Kalium)",
        "Farragut-class Battleship",
        "Endeavour",
        "Tribe Bane (Independents)",
        "Hammer of Reason",
        "Subjugator",
        "Iowa-class Battleship",
        "Ardent",
        "Queen Bess (Independents)",
        "Iowa",
        "Great Founder (Kalium)",
        "Lexington-class Battleship",
        "Yorktown",
        "Missouri (Independents)",
        "Black Prince",
        "Scharnhorst (Kalium)",
        "Musashi-class Battleship",
        "Musashi",
        "Endurance II (Independents)",
        "Loki",
        "Proud Empress (Kalium)",
        "Nelson-class Battleship",
        "Victory II",
        "Trafalgar (Independents)",
        "Might of Kalium",
        "Nimitz-class Battleship",
        "Sunbeam",
        "Ragefire (Independents)",
        "Volcanic",
        "Your Fate (Kalium)",
        "Vanguard-class Battleship",
        "Fireheart",
        "Einstein (Independents)",
        "Nikola Tesla",
        "Hyperion (Kalium)",
        "Yamamoto-class Battleship",
        "Sol Requiem",
        "Sadness (Independents)",
        "Spear of Onyx",
        "Decapitator",
        "Yi Sun-sin-class Battleship",
        "My Masterpiece"
      ],
      "heavy-cruiser": [
        "Centurion-class Heavy Cruiser",
        "Pilum",
        "Fontaine's Miracle",
        "Myriad (Independents)",
        "Proudcore",
        "Industry",
        "Fist of Iron (Kalium)",
        "Gladiator-class Heavy Cruiser",
        "Atomheart",
        "Fusion Queen (Independents)",
        "Incinerator",
        "Hell's Fury",
        "Vengefire (Kalium)",
        "Phalanx-class Heavy Cruiser",
        "Last Bastion",
        "Reliance",
        "Senator-class Heavy Cruiser",
        "Project 26-02",
        "Dark Side of the Moon",
        "Tribune-class Heavy Cruiser",
        "Caesar's Eagle"
      ],
      "light-cruiser": [
        "Kalium KNC-12 Line-class Light Cruiser",
        "Kalium KNC-5 Line-class Light Cruiser"
      ],
      "destroyer": [
        "Armstrong-class Destroyer",
        "Apollo 11",
        "Tranquility",
        "Saturn",
        "Guy Fawkes - Parliament Fire Ship-class Destroyer",
        "Newton-class Destroyer",
        "His Apple",
        "Principia",
        "Sagitarii-class Destroyer",
        "Hammerfall",
        "Surging Spear",
        "Swiftstar",
        "Tentative V (Independents)",
        "Kabal's Knife",
        "First Message",
        "Wrathful (Kalium)"
      ],
      "submarine": [
        "Munifex-class Submarine",
        "Great Wall",
        "Marston's Run (Independents)",
        "Hellhunter",
        "Seneca-class Submarine",
        "Surprise",
        "Abra Kadabra",
        "Boombox (Independents)",
        "DS-1",
        "DS-2 etc (Kalium)"
      ],
      "auxiliary": [
        "Aldrin-class Auxiliary",
        "Endeavou",
        "Endurance",
        "Odyssey In many cases",
        "Explorer-class Auxiliary",
        "Sao Gabriel",
        "Santa Maria",
        "Gauss (Independents) Seedling",
        "Nostrum",
        "Sulla",
        "Galileo-class Auxiliary",
        "Amber Eye",
        "Hubble IX",
        "Magellan (Independents)",
        "All-Seeing",
        "Lens of Truth",
        "Nightpiercer (Kalium)",
        "Pathfinder-class Auxiliary",
        "Nina",
        "Pinta",
        "Vostok (Independents)",
        "Spear of Will",
        "Lightbringer",
        "Searcher"
      ],
      "fighter-sqn": [
        "Mustang Alpha",
        "Mustang Bravo",
        "Mustang Charlie",
        "Mustang Delta",
        "Mustang Echo",
        "Mustang Foxtrot",
        "Mustang Gamma",
        "Mustang Hydra",
        "Mustang Ion"
      ],
      "bomber-sqn": [
        "V-44 Superfortress Alpha",
        "V-44 Superfortress Bravo",
        "V-44 Superfortress Charlie",
        "V-44 Superfortress Delta",
        "V-44 Superfortress Echo",
        "V-44 Superfortress Foxtrot",
        "V-44 Superfortress Gamma",
        "V-44 Superfortress Hydra"
      ]
    }
  },
  "BFCR": {
    "Standard": {
      "fleet-carrier": [
        "Cavern-class Fleet Carrier"
      ],
      "light-carrier": [
        "Monarch-class Light Carrier",
        "Summoner-class Light Carrier"
      ],
      "seaplane-tender": [
        "Prism-class Seaplane Tender"
      ],
      "battleship": [
        "Bastion-class Battleship",
        "Binary-class Battleship",
        "Binder-class Battleship",
        "Bishop-class Battleship",
        "Blackbird-class Battleship",
        "Brutal-class Battleship",
        "Zenith-class Battleship",
        "Zodiac-class Battleship"
      ],
      "heavy-cruiser": [
        "Cacophony-class Heavy Cruiser",
        "Carronade-class Heavy Cruiser",
        "Cataphract-class Heavy Cruiser",
        "Catastrophe-class Heavy Cruiser",
        "Sanctum-class Heavy Cruiser",
        "Scion-class Heavy Cruiser",
        "Stature-class Heavy Cruiser"
      ],
      "light-cruiser": [
        "Cache-class Light Cruiser",
        "Callous-class Light Cruiser",
        "Charger-class Light Cruiser",
        "Choral-class Light Cruiser",
        "Cipher-class Light Cruiser",
        "Combine-class Light Cruiser",
        "Comet-class Light Cruiser",
        "Conqueror-class Light Cruiser",
        "Construct-class Light Cruiser",
        "Cosmic-class Light Cruiser"
      ],
      "destroyer": [
        "Diode-class Destroyer",
        "Disciple-class Destroyer",
        "Domain-class Destroyer",
        "Forestall-class Destroyer",
        "Fresco-class Destroyer",
        "Fugue-class Destroyer",
        "Fulcrum-class Destroyer",
        "Mantle-class Destroyer",
        "Matrix-class Destroyer",
        "Tally-class Destroyer",
        "The Melter-class Destroyer",
        "Tine-class Destroyer",
        "Torrent-class Destroyer",
        "Vertex-class Destroyer"
      ],
      "submarine": [
        "Foray-class Submarine",
        "Torpedo-class Submarine"
      ],
      "auxiliary": [
        "Invasion-class Auxiliary",
        "Lander-class Auxiliary",
        "Logic-class Auxiliary",
        "Supercells-class Auxiliary"
      ],
      "fighter-sqn": [
        "Interceptor Alpha",
        "Interceptor Bravo",
        "Interceptor Charlie",
        "Interceptor Delta",
        "Interceptor Echo",
        "Interceptor Foxtrot",
        "Interceptor Gamma",
        "Interceptor Hydra",
        "Interceptor Ion"
      ],
      "bomber-sqn": [
        "Bombard Alpha",
        "Bombard Bravo",
        "Bombard Charlie",
        "Bombard Delta",
        "Bombard Echo",
        "Bombard Foxtrot",
        "Bombard Gamma",
        "Bombard Hydra"
      ]
    }
  },
  "IJN": {
    "Early War": {
      "fleet-carrier": [
        "Akagi",
        "Kaga",
        "Soryu",
        "Hiryu",
        "Shokaku",
        "Zuikaku",
        "Junyo",
        "Soryu-class",
        "Shokaku-class",
        "Junyo-class"
      ],
      "light-carrier": [
        "Hosho",
        "Ryujo",
        "Shoho",
        "Zuiho",
        "Taiyo",
        "Zuiho-class",
        "Taiyo-class",
        "Chitose-class"
      ],
      "seaplane-tender": [
        "Chiyoda",
        "Chitose",
        "Mizuho",
        "Notoro",
        "Nisshin",
        "Kamoi",
        "Kamikawa Maru",
        "Sanuki Maru",
        "Akitsushima",
        "Chitose-class"
      ],
      "battleship": [
        "Yamato",
        "Nagato",
        "Mutsu",
        "Hiei",
        "Kongo",
        "Haruna",
        "Kirishima",
        "Fuso",
        "Yamashiro",
        "Ise",
        "Hyuga",
        "Yamato-class",
        "Nagato-class",
        "Kongo-class",
        "Fuso-class",
        "Ise-class"
      ],
      "heavy-cruiser": [
        "Atago",
        "Takao",
        "Maya",
        "Chokai",
        "Tone",
        "Chikuma",
        "Mogami",
        "Mikuma",
        "Suzuya",
        "Kumano",
        "Myoko",
        "Nachi",
        "Haguro",
        "Ashigara",
        "Furutaka",
        "Kako",
        "Aoba",
        "Kinugasa",
        "Takao-class",
        "Tone-class",
        "Mogami-class",
        "Myoko-class",
        "Furutaka-class",
        "Aoba-class"
      ],
      "light-cruiser": [
        "Sendai",
        "Jintsu",
        "Naka",
        "Nagara",
        "Isuzu",
        "Natori",
        "Yura",
        "Kinu",
        "Abukuma",
        "Tatsuta",
        "Tenryu",
        "Kuma",
        "Tama",
        "Kitakami",
        "Oi",
        "Kiso",
        "Yubari",
        "Katori",
        "Kashima",
        "Sendai-class",
        "Nagara-class",
        "Kuma-class",
        "Tenryu-class",
        "Katori-class"
      ],
      "destroyer": [
        "Fubuki",
        "Shirayuki",
        "Hatsuyuki",
        "Murakumo",
        "Isonami",
        "Uranami",
        "Ayanami",
        "Shikinami",
        "Amagiri",
        "Akebono",
        "Sazanami",
        "Ushio",
        "Akatsuki",
        "Hibiki",
        "Ikazuchi",
        "Inazuma",
        "Kagero",
        "Shiranui",
        "Kuroshio",
        "Oyashio",
        "Hatsukaze",
        "Yukikaze",
        "Amatsukaze",
        "Urakaze",
        "Isokaze",
        "Hamakaze",
        "Tanikaze",
        "Nowaki",
        "Arashi",
        "Akigumo",
        "Shiratsuyu",
        "Shigure",
        "Murasame",
        "Yudachi",
        "Harusame",
        "Samidare",
        "Kawakaze",
        "Suzukaze",
        "Asashio",
        "Oshio",
        "Michishio",
        "Arashio",
        "Asagumo",
        "Yamagumo",
        "Kasumi",
        "Arare",
        "Hatsuharu",
        "Nenohi",
        "Wakaba",
        "Hatsushimo",
        "Ariake",
        "Yugure",
        "Mutsuki",
        "Kisaragi",
        "Yayoi",
        "Uzuki",
        "Mochizuki",
        "Mikazuki",
        "Nagatsuki",
        "Satsuki",
        "Kamikaze",
        "Harukaze",
        "Matsukaze",
        "Yunagi",
        "Wakatake",
        "Kuretake",
        "Sanae",
        "Fuyo",
        "Fubuki-class",
        "Ayanami-class",
        "Akatsuki-class",
        "Kagero-class",
        "Shiratsuyu-class",
        "Asashio-class",
        "Hatsuharu-class",
        "Mutsuki-class",
        "Kamikaze-class",
        "Wakatake-class"
      ],
      "submarine": [
        "I-15",
        "I-19",
        "I-21",
        "I-25",
        "I-26",
        "I-168",
        "RO-33",
        "RO-34",
        "Kaidai-class",
        "I-15-class",
        "Junsen-class"
      ],
      "auxiliary": [
        "Patrol Boat",
        "Oiler",
        "Repair Tender",
        "Minelayer Okinoshima",
        "Fleet collier",
        "Hospital ship Hikawa Maru",
        "Submarine tender Taigei",
        "Ammunition ship",
        "Aircraft transport",
        "Survey ship Tsukushi"
      ],
      "fighter-sqn": [
        "A6M2 Reisen (Zero)",
        "A6M3 Reisen (Hamp)",
        "A5M4 Claude",
        "A6M2-N Rufe (floatplane)",
        "A6M2 Reisen, Tainan Kokutai",
      ],
      "bomber-sqn": [
        "D3A1 Val (dive bomber)",
        "B5N2 Kate (torpedo bomber)",
        "H6K Mavis (flying boat)",
        "E13A Jake (floatplane)"
      ]
    },
    "Late War": {
      "fleet-carrier": [
        "Taiho",
        "Unryu",
        "Amagi",
        "Katsuragi",
        "Shokaku",
        "Zuikaku",
        "Junyo",
        "Hiyo",
        "Shinano",
        "Kasagi",
        "Aso",
        "Ikoma",
        "Shokaku-class",
        "Unryu-class",
        "Junyo-class"
      ],
      "light-carrier": [
        "Chiyoda",
        "Chitose",
        "Zuiho",
        "Ryuho",
        "Taiyo",
        "Unyo",
        "Chuyo",
        "Kaiyo",
        "Shinyo",
        "Chitose-class",
        "Taiyo-class"
      ],
      "seaplane-tender": [
        "Akitsushima",
        "Mizuho",
        "Nisshin",
        "Kamoi",
        "Hayasui"
      ],
      "battleship": [
        "Yamato",
        "Musashi",
        "Nagato",
        "Kongo",
        "Haruna",
        "Ise (hybrid)",
        "Hyuga (hybrid)",
        "Fuso",
        "Yamashiro",
        "Yamato-class",
        "Nagato-class",
        "Kongo-class",
        "Ise-class",
        "Fuso-class"
      ],
      "heavy-cruiser": [
        "Atago",
        "Maya",
        "Takao",
        "Chokai",
        "Myoko",
        "Nachi",
        "Haguro",
        "Mogami (hybrid)",
        "Tone",
        "Chikuma",
        "Ashigara",
        "Aoba",
        "Suzuya",
        "Kumano",
        "Takao-class",
        "Myoko-class",
        "Mogami-class",
        "Tone-class",
        "Aoba-class"
      ],
      "light-cruiser": [
        "Oyodo",
        "Agano",
        "Noshiro",
        "Yahagi",
        "Sakawa",
        "Kitakami",
        "Oi",
        "Kiso",
        "Tama",
        "Isuzu",
        "Yubari",
        "Agano-class",
        "Kuma-class",
        "Oyodo-class"
      ],
      "destroyer": [
        "Yugumo",
        "Makinami",
        "Hayanami",
        "Hamanami",
        "Okinami",
        "Kazagumo",
        "Takanami",
        "Kiyonami",
        "Kishinami",
        "Kiyoshimo",
        "Makigumo",
        "Naganami",
        "Onami",
        "Fujinami",
        "Asashimo",
        "Akizuki",
        "Teruzuki",
        "Suzutsuki",
        "Fuyutsuki",
        "Harutsuki",
        "Shimakaze",
        "Yugumo-class",
        "Akizuki-class",
        "Shimakaze-class"
      ],
      "submarine": [
        "I-58",
        "I-47",
        "I-13",
        "I-400",
        "I-401",
        "RO-100",
        "I-400-class",
        "RO-100-class",
        "Kaidai-class"
      ],
      "auxiliary": [
        "Convoy escort",
        "Fleet oiler",
        "Escort Matsuwa (Kaibokan)",
        "Repair ship Akashi",
        "Fast transport No. 1",
        "Kaibokan escort Etorofu",
        "Kaibokan escort Mikura",
        "Transport submarine",
        "Fleet tug"
      ],
      "fighter-sqn": [
        "A6M5 Zero",
        "N1K1-J Shiden (George)",
        "N1K2-J Shiden-Kai (George)",
        "J2M Raiden (Jack)",
        "A7M Reppu (Sam)",
        "N1K1 Kyofu (Rex, floatplane)",
      ],
      "bomber-sqn": [
        "D4Y Suisei (Judy)",
        "B6N Tenzan (Jill)",
        "B7A Ryusei (Grace)",
        "P1Y Ginga (Frances)",
        "D3A2 Val",
        "E16A Zuiun (Paul, floatplane)",
      ]
    }
  },
  "USN": {
    "Early War": {
      "fleet-carrier": [
        "Lexington",
        "Yorktown",
        "Enterprise",
        "Hornet",
        "Saratoga",
        "Wasp",
        "Ranger",
        "Lexington-class",
        "Yorktown-class"
      ],
      "light-carrier": [
        "Long Island",
        "Bogue",
        "Sangamon",
        "Suwannee",
        "Santee",
        "Chenango",
        "Charger",
        "Long Island-class",
        "Bogue-class",
        "Sangamon-class"
      ],
      "seaplane-tender": [
        "Curtiss",
        "Tangier",
        "Albemarle",
        "Wright",
        "Pocomoke",
        "Childs",
        "Heron",
        "Curtiss-class"
      ],
      "battleship": [
        "North Carolina",
        "Washington",
        "South Dakota",
        "Indiana",
        "Massachusetts",
        "Alabama",
        "Maryland",
        "Colorado",
        "West Virginia",
        "Nevada",
        "Oklahoma",
        "Pennsylvania",
        "Arizona",
        "Tennessee",
        "California",
        "New Mexico",
        "Mississippi",
        "Idaho",
        "New York",
        "Texas",
        "Arkansas",
        "North Carolina-class",
        "South Dakota-class",
        "Colorado-class",
        "Tennessee-class",
        "New Mexico-class",
        "Nevada-class",
        "Pennsylvania-class",
        "New York-class"
      ],
      "heavy-cruiser": [
        "Astoria",
        "Vincennes",
        "Quincy",
        "San Francisco",
        "Pensacola",
        "Northampton",
        "New Orleans",
        "Minneapolis",
        "Salt Lake City",
        "Chester",
        "Louisville",
        "Chicago",
        "Houston",
        "Augusta",
        "Tuscaloosa",
        "Portland",
        "Indianapolis",
        "Wichita",
        "Pensacola-class",
        "Northampton-class",
        "Portland-class",
        "New Orleans-class"
      ],
      "light-cruiser": [
        "Atlanta",
        "Juneau",
        "Brooklyn",
        "Helena",
        "St. Louis",
        "Honolulu",
        "Phoenix",
        "Boise",
        "Nashville",
        "Savannah",
        "Philadelphia",
        "San Diego",
        "San Juan",
        "Marblehead",
        "Raleigh",
        "Detroit",
        "Concord",
        "Richmond",
        "Omaha",
        "Trenton",
        "Omaha-class",
        "Brooklyn-class",
        "Atlanta-class"
      ],
      "destroyer": [
        "Farragut",
        "Dewey",
        "Hull",
        "Worden",
        "Monaghan",
        "Aylwin",
        "Mahan",
        "Cummings",
        "Drayton",
        "Flusser",
        "Reid",
        "Cassin",
        "Shaw",
        "Downes",
        "Cushing",
        "Preston",
        "Gridley",
        "Craven",
        "McCall",
        "Maury",
        "Bagley",
        "Helm",
        "Mugford",
        "Ralph Talbot",
        "Henley",
        "Patterson",
        "Porter",
        "Selfridge",
        "Phelps",
        "Somers",
        "Warrington",
        "Sampson",
        "Benham",
        "Ellet",
        "Lang",
        "Stack",
        "Sterett",
        "Mayrant",
        "Sims",
        "Hughes",
        "Anderson",
        "Hammann",
        "Mustin",
        "O'Brien",
        "Benson",
        "Mayo",
        "Gleaves",
        "Niblack",
        "Plunkett",
        "Kearny",
        "Gwin",
        "Monssen",
        "Laffey",
        "Aaron Ward",
        "Farragut-class",
        "Mahan-class",
        "Gridley-class",
        "Bagley-class",
        "Porter-class",
        "Somers-class",
        "Benham-class",
        "Sims-class",
        "Benson-class",
        "Gleaves-class"
      ],
      "submarine": [
        "Tautog",
        "Gudgeon",
        "Trigger",
        "Wahoo",
        "Silversides",
        "Nautilus",
        "Argonaut",
        "Gato-class",
        "Tambor-class",
        "Salmon-class",
        "Sargo-class",
        "Porpoise-class"
      ],
      "auxiliary": [
        "Fleet tanker",
        "Repair ship",
        "Fleet tug",
        "Seaplane oiler",
        "Minelayer Oglala",
        "Destroyer tender",
        "Submarine tender",
        "Cargo ship",
        "Hospital ship Solace"
      ],
      "fighter-sqn": [
        "F4F-3 Wildcat",
        "F4F-4 Wildcat",
        "F2A Buffalo",
      ],
      "bomber-sqn": [
        "SBD Dauntless (dive bomber)",
        "TBD Devastator (torpedo bomber)",
        "TBF Avenger",
        "PBY Catalina",
      ]
    },
    "Late War": {
      "fleet-carrier": [
        "Essex",
        "Intrepid",
        "Lexington (CV-16)",
        "Yorktown (CV-10)",
        "Bunker Hill",
        "Hancock",
        "Hornet (CV-12)",
        "Wasp (CV-18)",
        "Franklin",
        "Ticonderoga",
        "Randolph",
        "Shangri-La",
        "Bennington",
        "Boxer",
        "Antietam",
        "Lake Champlain",
        "Bon Homme Richard",
        "Leyte",
        "Kearsarge",
        "Oriskany",
        "Princeton (CV-37)",
        "Midway",
        "Franklin D. Roosevelt",
        "Saratoga",
        "Enterprise (CV-6)",
        "Essex-class",
        "Midway-class"
      ],
      "light-carrier": [
        "Independence",
        "Princeton",
        "Belleau Wood",
        "Cowpens",
        "Cabot",
        "Langley (CVL-27)",
        "Bataan",
        "San Jacinto",
        "Gambier Bay",
        "St. Lo",
        "Kitkun Bay",
        "Fanshaw Bay",
        "White Plains",
        "Kalinin Bay",
        "Guadalcanal",
        "Block Island",
        "Card",
        "Independence-class",
        "Casablanca-class",
        "Commencement Bay-class"
      ],
      "seaplane-tender": [
        "Currituck",
        "Hamlin",
        "Norton Sound",
        "Pine Island",
        "Salisbury Sound",
        "Currituck-class"
      ],
      "battleship": [
        "Iowa",
        "New Jersey",
        "Missouri",
        "Wisconsin",
        "North Carolina",
        "Washington",
        "South Dakota",
        "Indiana",
        "Massachusetts",
        "Alabama",
        "Tennessee",
        "California",
        "West Virginia",
        "Maryland",
        "Colorado",
        "Pennsylvania",
        "New Mexico",
        "Mississippi",
        "Idaho",
        "Iowa-class",
        "North Carolina-class",
        "South Dakota-class",
        "Colorado-class",
        "Tennessee-class"
      ],
      "heavy-cruiser": [
        "Baltimore",
        "Boston",
        "Canberra",
        "Quincy (CA-71)",
        "Pittsburgh",
        "St. Paul",
        "Wichita",
        "Chicago (CA-136)",
        "Indianapolis",
        "Portland",
        "New Orleans",
        "San Francisco",
        "Minneapolis",
        "Tuscaloosa",
        "Augusta",
        "Bremerton",
        "Toledo",
        "Columbus",
        "Macon",
        "Fall River",
        "Alaska",
        "Guam",
        "Baltimore-class",
        "Alaska-class",
        "Oregon City-class"
      ],
      "light-cruiser": [
        "Cleveland",
        "Columbia",
        "Montpelier",
        "Denver",
        "Birmingham",
        "Mobile",
        "Vincennes (CL-64)",
        "Pasadena",
        "Santa Fe",
        "Biloxi",
        "Houston (CL-81)",
        "Miami",
        "Vicksburg",
        "Duluth",
        "Astoria (CL-90)",
        "Oklahoma City",
        "Springfield",
        "Topeka",
        "Oakland",
        "Reno",
        "Flint",
        "Tucson",
        "Cleveland-class",
        "Atlanta-class",
        "Fargo-class",
        "Brooklyn-class"
      ],
      "destroyer": [
        "Fletcher",
        "Radford",
        "Nicholas",
        "O'Bannon",
        "Chevalier",
        "Taylor",
        "De Haven",
        "Pringle",
        "Sigsbee",
        "Converse",
        "Foote",
        "Spence",
        "Thatcher",
        "Walker",
        "Abner Read",
        "Heermann",
        "Hoel",
        "Johnston",
        "The Sullivans",
        "Charles Ausburne",
        "Claxton",
        "Dyson",
        "Kidd",
        "Stevens",
        "Allen M. Sumner",
        "Moale",
        "Ingraham",
        "Cooper",
        "Charles S. Sperry",
        "Ault",
        "Waldron",
        "Haynsworth",
        "Hank",
        "Compton",
        "Gearing",
        "Eugene A. Greene",
        "William R. Rush",
        "Wiltsie",
        "Hugh Purvis",
        "Borie",
        "Samuel B. Roberts",
        "John C. Butler",
        "Raymond",
        "Dennis",
        "Buckley",
        "Tabberer",
        "Fletcher-class",
        "Allen M. Sumner-class",
        "Gearing-class",
        "Buckley-class",
        "John C. Butler-class"
      ],
      "submarine": [
        "Tang",
        "Barb",
        "Flasher",
        "Harder",
        "Archerfish",
        "Rasher",
        "Redfin",
        "Darter",
        "Sealion",
        "Scamp",
        "Torsk",
        "Balao-class",
        "Gato-class",
        "Tench-class"
      ],
      "auxiliary": [
        "Fleet oiler",
        "Ammunition ship",
        "Fast transport (APD)",
        "Ammunition ship Mount Hood",
        "Destroyer tender Cascade",
        "Fleet oiler Cimarron",
        "Repair ship Vestal",
        "Submarine tender Fulton",
        "Attack cargo ship"
      ],
      "fighter-sqn": [
        "F6F-3 Hellcat",
        "F6F-5 Hellcat",
        "F4U-1D Corsair",
        "F4U-4 Corsair",
        "FM-2 Wildcat",
        "F8F Bearcat",
      ],
      "bomber-sqn": [
        "SB2C-4 Helldiver",
        "SBD-5 Dauntless",
        "TBM-3 Avenger",
      ]
    }
  },
  "PR": {
    "Standard": {
      "fleet-carrier": [
        "Alexander's Ambition",
        "Socrates",
        "Fireheart",
        "Salamis",
        "Elysium",
        "Thermidor",
        "Pendragon",
        "Aether",
        "Gate of Heaven",
        "Culmination",
        "Acheron",
        "Sovereignty",
        "Iwo Jima",
        "Austerlitz",
        "Sinai",
        "Imperishable",
        "Meridian",
        "Hannibal's Crossing",
        "Zenith",
        "Mandate of Heaven",
        "Undying",
        "Crucible",
        "Mount Olympus",
        "Valhalla",
        "Majesty"
      ],
      "light-carrier": [
        "Red Cliffs",
        "Plato",
        "Tower of Knowledge",
        "Dark Prince",
        "Thermopylae",
        "Prometheus",
        "Dangerous Idea",
        "Turing",
        "Archimedes' Lever",
        "Faraday",
        "Oppenheimer",
        "Broken Cipher",
        "Giordano Bruno",
        "Calculated Risk",
        "Second Guess",
        "Faust's Bargain",
        "Weight of Proof"
      ],
      "seaplane-tender": [
        "Young Mother",
        "Columbus",
        "Wright Flyer",
        "Shoal Princess",
        "Kitty Hawk",
        "First Light",
        "Vanguard",
        "Sacagawea",
        "Threshold"
      ],
      "battleship": [
        "Enlightenment",
        "Renaissance",
        "Queen Boudicca",
        "Code Eternal",
        "Progress",
        "Revelations",
        "Great Axiom",
        "Truth's Instrument",
        "Triumvir",
        "Four Suns",
        "Shining Path",
        "Dawnglaive",
        "Destiny's Fist",
        "Triumph of Shangri-La",
        "Godslayer",
        "Queen of Its Will",
        "Silencer",
        "Expeditious Judgement",
        "Code Enforcer",
        "Lightning Tree",
        "Wrath of Zeus",
        "Thunderbolt",
        "Elemental",
        "Godhammer",
        "Sphere's Benevolence",
        "The Vizier",
        "Might of Pearlescent",
        "Imperator",
        "Victorius",
        "Julius Caesar",
        "Dictator",
        "Supreme",
        "Actium",
        "Cleopatra's Bane",
        "Long Reign",
        "Starheart",
        "Hammer of Purpose",
        "Deus Ex Machina",
        "Forgefire",
        "Atom's Mistress",
        "Purity of Power",
        "Deliverance",
        "Heaven's Judgement",
        "Queen of Ends",
        "Apocalypse"
      ],
      "heavy-cruiser": [
        "Searing Truth",
        "Archimedes",
        "Fatal",
        "Turing's Cipher",
        "Knowing Virtue",
        "Nikola Tesla",
        "Hoplite's Helm",
        "Trident of Neptune",
        "Mind of Asimov",
        "Aristotle",
        "Marathon",
        "Journeyman",
        "Gailileo",
        "Iliad",
        "Unheeled",
        "Titan's Ire",
        "Einstein's Equation",
        "Odyssey",
        "Am Become Death",
        "Cicero",
        "Old Boulder",
        "Ruined King",
        "Ephyra's Fist",
        "Hubris",
        "A Thousand Fathoms",
        "Marie Curie",
        "Newton's Apple",
        "Argo",
        "Great Library",
        "Copernicus",
        "Judgement of Zeus"
      ],
      "light-cruiser": [
        "Hypatia",
        "Phaeton",
        "Voltaire",
        "Bright Mind",
        "Cyclopean Gaze",
        "Brightflame",
        "Lance of Athena",
        "Illuminator",
        "Foe Confounded",
        "Deep Blue",
        "Waves of Lamarr",
        "Inviolate"
      ],
      "destroyer": [
        "Steadfast",
        "Countenance of Janus",
        "Open Future",
        "Cold Warrior",
        "Trident of Poseidon",
        "Harpe",
        "Sword of Damocles",
        "Strikehome",
        "Myrmidon",
        "Known Purpose",
        "Conferred Divinity",
        "Halo Nine",
        "Aegis"
      ],
      "submarine": [
        "Silence",
        "Isolator",
        "Cloudhunter",
        "Mist Cleaver",
        "The Veil",
        "Labyrinth 1",
        "Labyrinth 2",
        "Labyrinth 3",
        "Retiaritus",
        "Ghost Warrior",
        "Longship",
        "Carl Sagan",
        "Neil Armstrong",
        "Yuri Gagarin",
        "Pathfinder",
        "Pegasus",
        "Righteous Blade",
        "Huntress",
        "Mercury"
      ],
      "auxiliary": [
        "Castor",
        "Homeshell",
        "Hellbringer",
        "Alesia",
        "Cogent Reason",
        "Bedrock",
        "Moonshield",
        "Eye of the Sphere",
        "Ornithes Areioi",
        "Nightsun",
        "Fargaze"
      ],
      "fighter-sqn": [
        "Thrust Wing 1",
        "Thrust Wing 2",
        "Thrust Wing 3",
        "Forward Lance",
        "Strike Lance",
        "Intercept Flight"
      ],
      "bomber-sqn": [
        "Bomb Wing 1",
        "Bomb Wing 2",
        "Attack Lance 1",
        "Attack Lance 2",
        "Assault Flight"
      ]
    }
  },
  "KK": {
    "Standard": {
      "fleet-carrier": [
        "First Dominion",
        "Inheritance Clause",
        "Conquistador",
        "Kabal's Heart",
        "Magellan",
        "Vespucci",
        "Eminent Domain",
        "Terra Nullius",
        "Right of Discovery",
        "Cortes",
        "Requisition",
        "Lebensraum",
        "Inevitability",
        "Manifest",
        "Corrective",
        "Absorption",
        "Settlement",
        "Protectorate",
        "Charter of Conquest",
        "Charter",
        "Freehold",
        "Annexation"
      ],
      "light-carrier": [
        "Collins",
        "Wasp",
        "Gemini",
        "Eagle",
        "Known Associates",
        "Incident Report",
        "People's Beneficence",
        "Kabal's Wisdom",
        "As One",
        "Gladiator",
        "Lord Regent",
        "Junta",
        "Common Cause",
        "Mutual Benefit",
        "Solidarity",
        "Progress Report",
        "Harmonious",
        "Exemplary"
      ],
      "seaplane-tender": [
        "Outrider",
        "Early Warning",
        "Vlad Carmichael",
        "Insurrection's End",
        "Sender of Will",
        "Spear of Will",
        "Lightbringer",
        "Searcher",
        "Seedling",
        "Nostrum",
        "Sulla",
        "Pathbreaker",
        "Far Hand",
        "Precursor",
        "Leading Edge",
        "Advance Notice"
      ],
      "battleship": [
        "Final Argument",
        "Absolute Majority",
        "Loki",
        "Proud Empress",
        "Black Prince",
        "Scharnhorst",
        "Iowa",
        "Great Founder",
        "Nikola Tesla",
        "Hyperion",
        "Might of Kalium",
        "Steel Fist",
        "Killforge",
        "Our Grace",
        "Our Gaze",
        "Illuminator",
        "Hammer of Reason",
        "Subjugator",
        "Soul Reaver",
        "Executioner",
        "Volcanic",
        "Your Fate",
        "Spear of Onyx",
        "Decapitator",
        "Tirpitz",
        "Terminus",
        "Sovereign",
        "Immovable",
        "Warrant",
        "Thunderous"
      ],
      "heavy-cruiser": [
        "Iron Prefect",
        "Collective Punishment",
        "Proudcore",
        "Industry",
        "Fist of Iron",
        "Incinerator",
        "Hell's Fury",
        "Vengefire",
        "Kabal's Judgement",
        "Ultimate Certainty",
        "Streetsweeper",
        "Hammer of Might",
        "Decimator",
        "Overseer",
        "Final Notice",
        "Magistrate",
        "Punitive",
        "Adjudicator",
        "Merciless"
      ],
      "light-cruiser": [
        "Interregnum",
        "Dead Reckoning",
        "Hardrada",
        "Necromancer",
        "Purgatory",
        "Limbo",
        "Penumbra",
        "Styx",
        "Charnel",
        "Gallows",
        "Cannae",
        "Crassus",
        "Pyrrhus",
        "Teutoburg",
        "Ney",
        "Adrianople",
        "Isandlwana",
        "Vercingetorix",
        "Jugurtha",
        "Wallenstein",
        "Foolhardy"
      ],
      "destroyer": [
        "Press Gang",
        "Willing Volunteer",
        "Switchblade",
        "Noble Conscript",
        "Guardsman",
        "Pressed Man",
        "Indentured",
        "Impressment",
        "Defaulter",
        "Seconded",
        "Sentinel",
        "Stalwart",
        "Vigilant",
        "Resolute",
        "Warden",
        "Picket",
        "Bulwark",
        "Trenchant",
        "Indefatigable",
        "Intrepid"
      ],
      "submarine": [
        "Bloodwork",
        "Due Diligence",
        "Hellhunter",
        "Poison Dagger",
        "Kabal's Knife",
        "First Message",
        "Wrathful",
        "Stiletto",
        "Garotte",
        "Wet Work",
        "Cutthroat",
        "Lancet",
        "Untraceable"
      ],
      "auxiliary": [
        "All-Seeing",
        "Lens of Truth",
        "Nightpiercer",
        "BVK-1",
        "BVK-2",
        "BVK-3",
        "TZhS-4",
        "TZhS-5",
        "OVR-7",
        "OVR-12",
        "VB-19",
        "VB-22",
        "Transport No. 3",
        "Transport No. 8",
        "Tender 441",
        "Tender 883",
        "Project 112",
        "Type II Base Ship",
        "Welfare Check",
        "Oversight",
        "Point of Contact",
        "Duly Noted",
        "Under Review"
      ],
      "fighter-sqn": [
        "Wing-01",
        "Wing-02",
        "Wing-03",
        "Wing-04",
        "Wing-05",
        "Wing-06",
        "Wing-07",
        "Wing-08",
        "Wing-09",
        "Wing-10",
        "Wing-11",
        "Wing-12"
      ],
      "bomber-sqn": [
        "Strike-01",
        "Strike-02",
        "Strike-03",
        "Strike-04",
        "Strike-05",
        "Strike-06",
        "Strike-07",
        "Strike-08"
      ]
    }
  }
};

// ─── Never-built / unfinished hulls (shown unless "Historical Ships Only") ──
window.PAPER_NAMES = {
  "IJN": {
    "Early War": {
      "battleship": [
        "Kii",
        "Owari",
        "Tosa",
        "Super Yamato (A-150)",
        "Kii-class"
      ]
    },
    "Late War": {
      "battleship": [
        "Kii",
        "Owari",
        "Tosa",
        "Super Yamato (A-150)",
        "Kii-class",
        "A-150 class"
      ],
      "heavy-cruiser": [
        "Ibuki",
        "Kurama",
        "B-65 super cruiser",
        "Ibuki-class"
      ]
    }
  },
  "USN": {
    "Late War": {
      "battleship": [
        "Montana",
        "Ohio",
        "Maine",
        "New Hampshire",
        "Louisiana",
        "Illinois",
        "Kentucky",
        "Constellation",
        "Constitution",
        "United States",
        "Montana-class",
        "Lexington-class battlecruiser"
      ],
      "heavy-cruiser": [
        "Hawaii",
        "Philippines",
        "Puerto Rico",
        "Samoa",
        "Alaska-class"
      ],
      "fleet-carrier": [
        "Reprisal",
        "Iwo Jima",
        "Essex-class"
      ]
    }
  }
};


// Historical orders of battle (from Historical Fleets.docx). Loadable presets.
window.HISTORICAL_FLEETS = [
  {
    "id": "coral-sea-ijn",
    "scenario": "Coral Sea",
    "faction": "IJN",
    "era": "Early War",
    "scale": 3,
    "label": "Coral Sea — IJN",
    "fleet": {
      "name": "Coral Sea — IJN",
      "faction": "IJN",
      "era": "Early War",
      "scale": 3,
      "budget": 248,
      "freePlay": true,
      "setId": null,
      "mods": [
        "coordinated-strikes",
        "extended-craft-range",
        "mobile-force-doctrine",
        "seasoned-pilots",
        "superior-fighters",
        "ineffective-aa"
      ],
      "taskForces": [
        {
          "callSign": "Task Force \"MO\"",
          "commander": "Vice Admiral Takagi Takeo",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Shokaku"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Zuikaku"
            },
            {
              "classId": "fighter-sqn",
              "qty": 8,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 16,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Myoko"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Haguro"
            },
            {
              "classId": "destroyer",
              "qty": 6,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "MO Main Force",
          "commander": "Rear Admiral Goto Aritomo",
          "units": [
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Shoho"
            },
            {
              "classId": "fighter-sqn",
              "qty": 2,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 2,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Aoba"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Kako"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Kinugasa"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Furutaka"
            },
            {
              "classId": "destroyer",
              "qty": 1,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "MO Invasion Force",
          "commander": "Rear Admiral Kajioka Sadamichi",
          "units": [
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Yubari"
            },
            {
              "classId": "destroyer",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "auxiliary",
              "qty": 2,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Covering Force",
          "commander": "Rear Admiral Marumo Kuninori",
          "units": [
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Tatsuta"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Tenryu"
            },
            {
              "classId": "seaplane-tender",
              "qty": 1,
              "pennant": "Kamikawa Maru"
            },
            {
              "classId": "auxiliary",
              "qty": 2,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Tulagi Invasion Force",
          "commander": "Rear Admiral Shima Kiyohide",
          "units": [
            {
              "classId": "destroyer",
              "qty": 2,
              "pennant": ""
            },
            {
              "classId": "auxiliary",
              "qty": 10,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Rabaul Airfield",
          "commander": "",
          "units": [
            {
              "classId": "bomber-sqn",
              "qty": 6,
              "pennant": ""
            }
          ]
        }
      ]
    }
  },
  {
    "id": "coral-sea-usn",
    "scenario": "Coral Sea",
    "faction": "USN",
    "era": "Early War",
    "scale": 3,
    "label": "Coral Sea — USN",
    "fleet": {
      "name": "Coral Sea — USN",
      "faction": "USN",
      "era": "Early War",
      "scale": 3,
      "budget": 191,
      "freePlay": true,
      "setId": null,
      "mods": [
        "enemy-codes",
        "increased-aircraft",
        "unreliable-torpedoes"
      ],
      "taskForces": [
        {
          "callSign": "Task Force \"17\"",
          "commander": "Rear Admiral Frank Fletcher",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Lexington"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Yorktown"
            },
            {
              "classId": "fighter-sqn",
              "qty": 8,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 24,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Minneapolis"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "New Orleans"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Astoria"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chester"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Portland"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chicago"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "HMAS Australia"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "HMAS Hobart"
            },
            {
              "classId": "destroyer",
              "qty": 11,
              "pennant": ""
            }
          ]
        }
      ]
    }
  },
  {
    "id": "midway-ijn",
    "scenario": "Midway",
    "faction": "IJN",
    "era": "Early War",
    "scale": 6,
    "label": "Midway — IJN",
    "fleet": {
      "name": "Midway — IJN",
      "faction": "IJN",
      "era": "Early War",
      "scale": 6,
      "budget": 768,
      "freePlay": true,
      "setId": null,
      "mods": [
        "coordinated-strikes",
        "extended-craft-range",
        "mobile-force-doctrine",
        "seasoned-pilots",
        "superior-fighters",
        "ineffective-aa"
      ],
      "taskForces": [
        {
          "callSign": "First Carrier Striking Force",
          "commander": "Admiral Chūichi Nagumo",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Akagi"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Kaga"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Hiryu"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Soryu"
            },
            {
              "classId": "fighter-sqn",
              "qty": 16,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 34,
              "pennant": ""
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Haruna"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Kirishima"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Tone"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chikuma"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Nagara"
            },
            {
              "classId": "destroyer",
              "qty": 12,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Main Force",
          "commander": "Admiral Isoroku Yamamoto",
          "units": [
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Yamato"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Nagato"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Mutsu"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Hosho"
            },
            {
              "classId": "bomber-sqn",
              "qty": 2,
              "pennant": ""
            },
            {
              "classId": "seaplane-tender",
              "qty": 1,
              "pennant": "Chiyoda"
            },
            {
              "classId": "seaplane-tender",
              "qty": 1,
              "pennant": "Nisshin"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Sendai"
            },
            {
              "classId": "destroyer",
              "qty": 8,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Guard Force",
          "commander": "Vice Admiral Takasu Shiro",
          "units": [
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Ise"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Hyuga"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Fuso"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Yamashiro"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Oi"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Kitakami"
            },
            {
              "classId": "destroyer",
              "qty": 12,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Midway Invasion Force",
          "commander": "Vice Admiral Kondo Nobutake",
          "units": [
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Zuiho"
            },
            {
              "classId": "fighter-sqn",
              "qty": 2,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 2,
              "pennant": ""
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Kongo"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Hiei"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Atago"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chokai"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Myoko"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Haguro"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Yura"
            },
            {
              "classId": "destroyer",
              "qty": 8,
              "pennant": ""
            },
            {
              "classId": "auxiliary",
              "qty": 1,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Close Support Group",
          "commander": "Vice Admiral Kurita Takeo",
          "units": [
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Kumano"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Suzuya"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Mogami"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Mikuma"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Jintsu"
            },
            {
              "classId": "seaplane-tender",
              "qty": 1,
              "pennant": "Chitose"
            },
            {
              "classId": "seaplane-tender",
              "qty": 1,
              "pennant": "Kamikawa"
            },
            {
              "classId": "destroyer",
              "qty": 13,
              "pennant": ""
            },
            {
              "classId": "auxiliary",
              "qty": 14,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Advance Force",
          "commander": "Vice Admiral Komatsu Teruhishi",
          "units": [
            {
              "classId": "submarine",
              "qty": 15,
              "pennant": ""
            }
          ]
        }
      ]
    }
  },
  {
    "id": "midway-usn",
    "scenario": "Midway",
    "faction": "USN",
    "era": "Early War",
    "scale": 6,
    "label": "Midway — USN",
    "fleet": {
      "name": "Midway — USN",
      "faction": "USN",
      "era": "Early War",
      "scale": 6,
      "budget": 358,
      "freePlay": true,
      "setId": null,
      "mods": [
        "enemy-codes",
        "increased-aircraft",
        "unreliable-torpedoes"
      ],
      "taskForces": [
        {
          "callSign": "Task Force \"17\"",
          "commander": "Rear Admiral Frank Fletcher",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Yorktown"
            },
            {
              "classId": "fighter-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 10,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Astoria"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Portland"
            },
            {
              "classId": "destroyer",
              "qty": 6,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"16\"",
          "commander": "Rear Admiral Raymond Spruance",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Enterprise"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Hornet"
            },
            {
              "classId": "fighter-sqn",
              "qty": 12,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 20,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Minneapolis"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "New Orleans"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Vincennes"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Northampton"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Pensacola"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Atlanta"
            },
            {
              "classId": "destroyer",
              "qty": 9,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"7\"",
          "commander": "Rear Admiral Robert English",
          "units": [
            {
              "classId": "submarine",
              "qty": 19,
              "pennant": ""
            }
          ]
        }
      ]
    }
  },
  {
    "id": "eastern-solomons-ijn",
    "scenario": "Eastern Solomons",
    "faction": "IJN",
    "era": "Early War",
    "scale": 3,
    "label": "Eastern Solomons — IJN",
    "fleet": {
      "name": "Eastern Solomons — IJN",
      "faction": "IJN",
      "era": "Early War",
      "scale": 3,
      "budget": 280,
      "freePlay": true,
      "setId": null,
      "mods": [
        "coordinated-strikes",
        "extended-craft-range",
        "mobile-force-doctrine",
        "seasoned-pilots",
        "superior-fighters",
        "ineffective-aa"
      ],
      "taskForces": [
        {
          "callSign": "Third Fleet, Main Body",
          "commander": "Vice Admiral Chūichi Nagumo",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Shokaku"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Zuikaku"
            },
            {
              "classId": "fighter-sqn",
              "qty": 8,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 20,
              "pennant": ""
            },
            {
              "classId": "destroyer",
              "qty": 6,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Vanguard Force",
          "commander": "Rear Admiral Abe Hiroaki",
          "units": [
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Hiei"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Kirishima"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Kumano"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Suzuya"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chikuma"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Nagara"
            },
            {
              "classId": "destroyer",
              "qty": 3,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Detached Carrier Strike Force",
          "commander": "Rear Admiral Chūichi Hara",
          "units": [
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Ryujo"
            },
            {
              "classId": "fighter-sqn",
              "qty": 4,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 2,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Tone"
            },
            {
              "classId": "destroyer",
              "qty": 2,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Advance Force",
          "commander": "Vice Admiral Kondo Nobutake",
          "units": [
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Atago"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Maya"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Takao"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Haguro"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Myoko"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Yura"
            },
            {
              "classId": "destroyer",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "seaplane-tender",
              "qty": 1,
              "pennant": "Chitose"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "eastern-solomons-usn",
    "scenario": "Eastern Solomons",
    "faction": "USN",
    "era": "Early War",
    "scale": 3,
    "label": "Eastern Solomons — USN",
    "fleet": {
      "name": "Eastern Solomons — USN",
      "faction": "USN",
      "era": "Early War",
      "scale": 3,
      "budget": 168,
      "freePlay": true,
      "setId": null,
      "mods": [
        "enemy-codes",
        "increased-aircraft",
        "unreliable-torpedoes"
      ],
      "taskForces": [
        {
          "callSign": "Task Force \"11\"",
          "commander": "Vice Admiral Frank Fletcher",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Saratoga"
            },
            {
              "classId": "fighter-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 8,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Minneapolis"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "New Orleans"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "HMAS Australia"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "HMAS Hobart"
            },
            {
              "classId": "destroyer",
              "qty": 7,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"16\"",
          "commander": "Rear Admiral Thomas Kinkaid",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Enterprise"
            },
            {
              "classId": "fighter-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 10,
              "pennant": ""
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "North Carolina"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Portland"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Atlanta"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "santa-cruz-ijn",
    "scenario": "Santa Cruz",
    "faction": "IJN",
    "era": "Early War",
    "scale": 3,
    "label": "Santa Cruz — IJN",
    "fleet": {
      "name": "Santa Cruz — IJN",
      "faction": "IJN",
      "era": "Early War",
      "scale": 3,
      "budget": 353,
      "freePlay": true,
      "setId": null,
      "mods": [
        "coordinated-strikes",
        "extended-craft-range",
        "mobile-force-doctrine",
        "seasoned-pilots",
        "superior-fighters",
        "ineffective-aa"
      ],
      "taskForces": [
        {
          "callSign": "Support Force",
          "commander": "Vice Admiral Kondo Nobutake",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Junyo"
            },
            {
              "classId": "fighter-sqn",
              "qty": 4,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Kongo"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Haruna"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Atago"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Takao"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Maya"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Myoko"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Isuzu"
            },
            {
              "classId": "destroyer",
              "qty": 9,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Third Fleet, Main Body",
          "commander": "Vice Admiral Chūichi Nagumo",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Shokaku"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Zuikaku"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Zuiho"
            },
            {
              "classId": "fighter-sqn",
              "qty": 16,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 18,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Kumano"
            },
            {
              "classId": "destroyer",
              "qty": 8,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Vanguard Force",
          "commander": "Rear Admiral Abe Hiroaki",
          "units": [
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Hiei"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Kirishima"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Suzuya"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chikuma"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Tone"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Nagara"
            },
            {
              "classId": "destroyer",
              "qty": 7,
              "pennant": ""
            }
          ]
        }
      ]
    }
  },
  {
    "id": "santa-cruz-usn",
    "scenario": "Santa Cruz",
    "faction": "USN",
    "era": "Early War",
    "scale": 3,
    "label": "Santa Cruz — USN",
    "fleet": {
      "name": "Santa Cruz — USN",
      "faction": "USN",
      "era": "Early War",
      "scale": 3,
      "budget": 236,
      "freePlay": true,
      "setId": null,
      "mods": [
        "enemy-codes",
        "increased-aircraft",
        "unreliable-torpedoes"
      ],
      "taskForces": [
        {
          "callSign": "Task Force \"16\"",
          "commander": "Rear Admiral Thomas Kinkaid",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Enterprise"
            },
            {
              "classId": "fighter-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 8,
              "pennant": ""
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "South Dakota"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Portland"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "San Juan"
            },
            {
              "classId": "destroyer",
              "qty": 8,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"17\"",
          "commander": "Rear Admiral George D. Murray",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Hornet"
            },
            {
              "classId": "fighter-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Northampton"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Pensacola"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "San Diego"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Juneau"
            },
            {
              "classId": "destroyer",
              "qty": 6,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"64\"",
          "commander": "Rear Admiral Willis A. Lee",
          "units": [
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Washington"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "San Francisco"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Helena"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Atlanta"
            },
            {
              "classId": "destroyer",
              "qty": 6,
              "pennant": ""
            }
          ]
        }
      ]
    }
  },
  {
    "id": "philippine-sea-ijn",
    "scenario": "Philippine Sea",
    "faction": "IJN",
    "era": "Late War",
    "scale": 7,
    "label": "Philippine Sea — IJN",
    "fleet": {
      "name": "Philippine Sea — IJN",
      "faction": "IJN",
      "era": "Late War",
      "scale": 7,
      "budget": 669,
      "freePlay": true,
      "setId": null,
      "mods": [
        "coordinated-strikes",
        "extended-craft-range",
        "aircraft-shortage",
        "rookie-pilots",
        "ineffective-aa"
      ],
      "taskForces": [
        {
          "callSign": "Task Force \"A\"",
          "commander": "Vice Admiral Jisaburō Ozawa",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Shokaku"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Taiho"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Zuikaku"
            },
            {
              "classId": "fighter-sqn",
              "qty": 16,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 24,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Myoko"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Haguro"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Yahagi"
            },
            {
              "classId": "destroyer",
              "qty": 7,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"B\"",
          "commander": "Vice Admiral Kakuji Kakuta",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Junyo"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Hiyo"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Ryuho"
            },
            {
              "classId": "fighter-sqn",
              "qty": 12,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 18,
              "pennant": ""
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Nagato"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Mogami"
            },
            {
              "classId": "destroyer",
              "qty": 7,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"C\"",
          "commander": "Vice Admiral Takeo Kurita",
          "units": [
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Chitose"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Chiyoda"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Zuiho"
            },
            {
              "classId": "fighter-sqn",
              "qty": 6,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 12,
              "pennant": ""
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Yamato"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Musashi"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Kongo"
            },
            {
              "classId": "battleship",
              "qty": 1,
              "pennant": "Haruna"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Atago"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Takao"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Maya"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chokai"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Kumano"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Suzuya"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Tone"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Chikuma"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Noshiro"
            },
            {
              "classId": "destroyer",
              "qty": 7,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Sixth Submarine Fleet",
          "commander": "Vice Admiral Takeo Takagi",
          "units": [
            {
              "classId": "submarine",
              "qty": 26,
              "pennant": ""
            }
          ]
        }
      ]
    }
  },
  {
    "id": "philippine-sea-usn",
    "scenario": "Philippine Sea",
    "faction": "USN",
    "era": "Late War",
    "scale": 7,
    "label": "Philippine Sea — USN",
    "fleet": {
      "name": "Philippine Sea — USN",
      "faction": "USN",
      "era": "Late War",
      "scale": 7,
      "budget": 642,
      "freePlay": true,
      "setId": null,
      "mods": [
        "coordinated-strikes",
        "enemy-codes",
        "increased-aircraft",
        "mobile-force-doctrine"
      ],
      "taskForces": [
        {
          "callSign": "Task Force \"58.1\"",
          "commander": "Rear Admiral Joseph J. Clark",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Hornet"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Yorktown"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Belleau Wood"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Bataan"
            },
            {
              "classId": "fighter-sqn",
              "qty": 22,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 28,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Baltimore"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Boston"
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Canberra"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "San Juan"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Oakland"
            },
            {
              "classId": "destroyer",
              "qty": 14,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"58.2\"",
          "commander": "Rear Admiral Alfred E. Montgomery",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Bunker Hill"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Wasp"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Monterey"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Cabot"
            },
            {
              "classId": "fighter-sqn",
              "qty": 22,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 26,
              "pennant": ""
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Santa Fe"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Mobile"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Biloxi"
            },
            {
              "classId": "destroyer",
              "qty": 12,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"58.3\"",
          "commander": "Rear Admiral John W. Reeves",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Enterprise"
            },
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Lexington"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "San Jacinto"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Princeton"
            },
            {
              "classId": "fighter-sqn",
              "qty": 20,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 26,
              "pennant": ""
            },
            {
              "classId": "heavy-cruiser",
              "qty": 1,
              "pennant": "Indianapolis"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Cleveland"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Montpelier"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Birmingham"
            },
            {
              "classId": "light-cruiser",
              "qty": 1,
              "pennant": "Reno"
            },
            {
              "classId": "destroyer",
              "qty": 13,
              "pennant": ""
            }
          ]
        },
        {
          "callSign": "Task Force \"58.4\"",
          "commander": "Rear Admiral William K. Harrill",
          "units": [
            {
              "classId": "fleet-carrier",
              "qty": 1,
              "pennant": "Essex"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Langley"
            },
            {
              "classId": "light-carrier",
              "qty": 1,
              "pennant": "Cowpens"
            },
            {
              "classId": "fighter-sqn",
              "qty": 16,
              "pennant": ""
            },
            {
              "classId": "bomber-sqn",
              "qty": 16,
              "pennant": ""
            }
          ]
        }
      ]
    }
  }
];

// ─── Java Sea example fleet (verbatim from user spec) ──
window.EXAMPLE_FLEET = {
  name: 'Java Sea Force',
  taskForces: [
    {
      callSign: 'TF01', commander: '', faction: 'IJN', era: 'Early War',
      mods: [],
      units: [
        { classId: 'fleet-carrier', qty: 2,  pennant: '' },
        { classId: 'battleship',    qty: 1,  pennant: '' },
        { classId: 'heavy-cruiser', qty: 3,  pennant: '' },
        { classId: 'destroyer',     qty: 9,  pennant: '' },
        { classId: 'fighter-sqn',   qty: 12, pennant: '' },
        { classId: 'bomber-sqn',    qty: 16, pennant: '' },
      ],
    },
    {
      callSign: 'TF02', commander: '', faction: 'IJN', era: 'Early War',
      mods: [],
      units: [
        { classId: 'fleet-carrier', qty: 1,  pennant: '' },
        { classId: 'light-carrier', qty: 1,  pennant: '' },
        { classId: 'heavy-cruiser', qty: 3,  pennant: '' },
        { classId: 'destroyer',     qty: 5,  pennant: '' },
        { classId: 'fighter-sqn',   qty: 10, pennant: '' },
        { classId: 'bomber-sqn',    qty: 10, pennant: '' },
      ],
    },
    {
      callSign: 'TF03', commander: '', faction: 'IJN', era: 'Early War',
      mods: [],
      units: [
        { classId: 'battleship',    qty: 1, pennant: '' },
        { classId: 'heavy-cruiser', qty: 2, pennant: '' },
        { classId: 'destroyer',     qty: 5, pennant: '' },
      ],
    },
  ],
};

// Single starter TF
window.STARTER_TF = {
  callSign: 'TF01', commander: '',
  faction: null, era: null, mods: [],
  units: [],
};
