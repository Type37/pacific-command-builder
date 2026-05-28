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
    text: 'In Gun Battles, rolls of 5 must be assigned to Submarines.',
  },
  'High Value': {
    name: 'High Value',
    text: 'These ships are of high value to the fleet and may be treated differently in scenario victory conditions.',
  },
  'Submarine': {
    name: 'Submarine',
    text: 'At the start of the Command Phase, any TF that contains only Submarines automatically becomes hidden. During Gun Battles, roll this unit\u2019s attack dice separately: rolls of 5 count as Confirmed Hits.',
  },
  'Weak AA Defences': {
    name: 'Weak AA Defences',
    text: 'A ship with this rule contributes no AA dice during the AA Step of an Air Action.',
  },
  'Squadron': {
    name: 'Squadron',
    text: 'An embarked aircraft unit. The total number of squadrons in a Task Force may not exceed the Task Force\u2019s Aircraft value.',
  },
  PR: {
    'Standard': {
      'fleet-carrier':   ["Alexander's Ambition",'Socrates','Fireheart','Salamis','Mount Olympus','Valhalla','Majesty'],
      'light-carrier':   ['Red Cliffs','Plato','Tower of Knowledge','Dark Prince'],
      'seaplane-tender': ['Young Mother','Columbus','Wright Flyer','Shoal Princess'],
      'battleship':      ['Enlightenment','Renaissance','Queen Boudicca','Code Eternal','Progress','Revelations','Great Axiom',"Truth's Instrument",'Triumvir','Four Suns','Shining Path','Dawnglaive',"Destiny's Fist",'Triumph of Shangri-La','Godslayer','Queen of Its Will','Silencer','Expeditious Judgement','Code Enforcer','Lightning Tree','Wrath of Zeus','Thunderbolt','Elemental','Godhammer',"Sphere's Benevolence",'The Vizier','Might of Pearlescent','Imperator','Victorius','Julius Caesar','Dictator','Supreme','Actium',"Cleopatra's Bane",'Long Reign','Starheart','Hammer of Purpose','Deus Ex Machina','Forgefire',"Atom's Mistress",'Purity of Power','Deliverance',"Heaven's Judgement",'Queen of Ends','Apocalypse'],
      'heavy-cruiser':   ['Searing Truth','Archimedes','Fatal',"Turing's Cipher",'Knowing Virtue','Nikola Tesla',"Hoplite's Helm",'Trident of Neptune','Mind of Asimov','Aristotle','Marathon','Journeyman','Gailileo','Iliad','Unheeled',"Titan's Ire","Einstein's Equation",'Odyssey','Am Become Death','Cicero','Old Boulder','Ruined King',"Ephyra's Fist",'Hubris','A Thousand Fathoms','Marie Curie','Newton's Apple','Argo','Great Library','Copernicus','Judgement of Zeus'],
      'light-cruiser':   ['Hypatia','Phaeton','Voltaire','Bright Mind','Cyclopean Gaze','Brightflame','Lance of Athena','Illuminator','Foe Confounded','Deep Blue','Waves of Lamarr','Inviolate'],
      'destroyer':       ['Steadfast','Countenance of Janus','Open Future','Cold Warrior','Trident of Poseidon','Harpe','Sword of Damocles','Strikehome','Myrmidon','Known Purpose','Conferred Divinity','Halo Nine','Aegis'],
      'submarine':       ['Silence','Isolator','Cloudhunter','Mist Cleaver','The Veil','Labyrinth 1','Labyrinth 2','Labyrinth 3','Retiaritus','Ghost Warrior','Longship','Carl Sagan','Neil Armstrong','Yuri Gagarin','Pathfinder','Pegasus','Righteous Blade','Huntress','Mercury'],
      'auxiliary':       ['Castor','Homeshell','Hellbringer','Alesia','Cogent Reason','Bedrock','Moonshield','Eye of the Sphere','Ornithes Areioi','Nightsun','Fargaze'],
      'fighter-sqn':     ['Thrust Wing 1','Thrust Wing 2','Thrust Wing 3','Forward Lance','Strike Lance','Intercept Flight'],
      'bomber-sqn':      ['Bomb Wing 1','Bomb Wing 2','Attack Lance 1','Attack Lance 2','Assault Flight'],
    },
  },
  KK: {
    'Standard': {
      'fleet-carrier':   ['First Dominion','Inheritance Clause','Conquistador',"Kabal's Heart",'Magellan','Vespucci','Eminent Domain','Terra Nullius','Right of Discovery','Cortes','Requisition','Lebensraum','Inevitability','Manifest','Corrective','Absorption','Settlement','Protectorate','Charter of Conquest','Charter','Freehold','Annexation'],
      'light-carrier':   ['Collins','Wasp','Gemini','Eagle','Known Associates','Incident Report',"People's Beneficence","Kabal's Wisdom",'As One','Gladiator','Lord Regent','Junta','Common Cause','Mutual Benefit','Solidarity','Progress Report','Harmonious','Exemplary'],
      'seaplane-tender': ['Outrider','Early Warning','Vlad Carmichael',"Insurrection's End",'Sender of Will','Spear of Will','Lightbringer','Searcher','Seedling','Nostrum','Sulla','Pathbreaker','Far Hand','Precursor','Leading Edge','Advance Notice'],
      'battleship':      ['Final Argument','Absolute Majority','Loki','Proud Empress','Black Prince','Scharnhorst','Iowa','Great Founder','Nikola Tesla','Hyperion','Might of Kalium','Steel Fist','Killforge','Our Grace','Our Gaze','Illuminator','Hammer of Reason','Subjugator','Soul Reaver','Executioner','Volcanic','Your Fate','Spear of Onyx','Decapitator','Tirpitz','Terminus','Sovereign','Immovable','Warrant','Thunderous'],
      'heavy-cruiser':   ['Iron Prefect','Collective Punishment','Proudcore','Industry','Fist of Iron','Incinerator',"Hell's Fury",'Vengefire',"Kabal's Judgement",'Ultimate Certainty','Streetsweeper','Hammer of Might','Decimator','Overseer','Final Notice','Magistrate','Punitive','Adjudicator','Merciless'],
      'light-cruiser':   ['Interregnum','Dead Reckoning','Hardrada','Necromancer','Purgatory','Limbo','Penumbra','Styx','Charnel','Gallows','Cannae','Crassus','Pyrrhus','Teutoburg','Ney','Adrianople','Isandlwana','Vercingetorix','Jugurtha','Wallenstein','Foolhardy'],
      'destroyer':       ['Press Gang','Willing Volunteer','Switchblade','Noble Conscript','Guardsman','Pressed Man','Indentured','Impressment','Defaulter','Seconded','Sentinel','Stalwart','Vigilant','Resolute','Warden','Picket','Bulwark','Trenchant','Indefatigable','Intrepid'],
      'submarine':       ['Bloodwork','Due Diligence','Hellhunter','Poison Dagger',"Kabal's Knife",'First Message','Wrathful','Stiletto','Garotte','Wet Work','Cutthroat','Lancet','Untraceable'],
      'auxiliary':       ['All-Seeing','Lens of Truth','Nightpiercer','BVK-1','BVK-2','BVK-3','TZhS-4','TZhS-5','OVR-7','OVR-12','VB-19','VB-22','Transport No. 3','Transport No. 8','Tender 441','Tender 883','Project 112','Type II Base Ship','Welfare Check','Oversight','Point of Contact','Duly Noted','Under Review'],
      'fighter-sqn':     ['Alpha Wing','Beta Wing','Gamma Wing','Delta Wing','Intercept-1','Intercept-2','Intercept-3','Screen Flight','Patrol Wing','Forward Screen'],
      'bomber-sqn':      ['Strike Wing Alpha','Strike Wing Beta','Strike Wing Gamma','Strike Flight 1','Strike Flight 2','Attack Wing','Assault Wing','Bombard Flight'],
    },
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
    stats: { guns: 0, aircraft: 1, aa: 1, strike: 0, cap: 0 }, sprite: 'AV' },

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
];

// ─── Historical ship/squadron names ────────────────────
window.HISTORICAL_NAMES = {
  IJN: {
    'Early War': {
      'fleet-carrier':   ['Akagi', 'Kaga', 'Soryu', 'Hiryu', 'Shokaku', 'Zuikaku', 'Junyo'],
      'light-carrier':   ['Hosho', 'Ryujo', 'Shoho', 'Zuiho'],
      'seaplane-tender': ['Chiyoda', 'Chitose', 'Mizuho', 'Notoro'],
      'battleship':      ['Yamato', 'Nagato', 'Mutsu', 'Hiei', 'Kongo', 'Haruna', 'Kirishima', 'Fuso', 'Yamashiro', 'Ise', 'Hyuga'],
      'heavy-cruiser':   ['Atago', 'Takao', 'Maya', 'Chokai', 'Tone', 'Chikuma', 'Mogami', 'Mikuma', 'Suzuya', 'Kumano', 'Myoko', 'Nachi', 'Haguro', 'Ashigara'],
      'light-cruiser':   ['Sendai', 'Jintsu', 'Naka', 'Nagara', 'Isuzu', 'Natori', 'Yura', 'Kinu', 'Abukuma', 'Tatsuta', 'Tenryu'],
      'destroyer':       ['DesRon 1, Kagero class', 'DesDiv 6, Akatsuki class', 'DesDiv 19, Fubuki class', 'DesDiv 11, Hatsuharu class', 'DesDiv 24, Mutsuki class'],
      'submarine':       ['SubRon 3, I-class', 'SubDiv 8, I-15 class'],
      'auxiliary':       ['Patrol Boat', 'Oiler', 'Repair Tender'],
      'fighter-sqn':     ['A6M2 Reisen (Zero)'],
      'bomber-sqn':      ['D3A1 Val and B5N2 Kate'],
    },
    'Late War': {
      'fleet-carrier':   ['Taiho', 'Unryu', 'Amagi', 'Katsuragi', 'Shokaku', 'Zuikaku', 'Junyo', 'Hiyo'],
      'light-carrier':   ['Chiyoda', 'Chitose', 'Zuiho', 'Ryuho'],
      'seaplane-tender': ['Akitsushima', 'Mizuho'],
      'battleship':      ['Yamato', 'Musashi', 'Nagato', 'Kongo', 'Haruna', 'Ise (hybrid)', 'Hyuga (hybrid)'],
      'heavy-cruiser':   ['Atago', 'Maya', 'Takao', 'Chokai', 'Myoko', 'Nachi', 'Haguro', 'Mogami (hybrid)', 'Tone', 'Chikuma'],
      'light-cruiser':   ['Oyodo', 'Agano', 'Noshiro', 'Yahagi', 'Sakawa'],
      'destroyer':       ['DesDiv 31, Shimakaze class', 'DesDiv 41, Yugumo class', 'DesDiv 61, Akizuki class', 'DesDiv 21, Asashio class'],
      'submarine':       ['SubRon 7, I-400 class'],
      'auxiliary':       ['Convoy escort', 'Fleet oiler'],
      'fighter-sqn':     ['A6M5 Zero and N1K Shiden'],
      'bomber-sqn':      ['D4Y Suisei and B6N Tenzan'],
    },
  },
  USN: {
    'Early War': {
      'fleet-carrier':   ['Lexington', 'Yorktown', 'Enterprise', 'Hornet', 'Saratoga', 'Wasp'],
      'light-carrier':   ['Long Island', 'Bogue'],
      'seaplane-tender': ['Curtiss', 'Tangier', 'Albemarle'],
      'battleship':      ['North Carolina', 'Washington', 'South Dakota', 'Indiana', 'Massachusetts', 'Alabama', 'Maryland', 'Colorado', 'West Virginia'],
      'heavy-cruiser':   ['Astoria', 'Vincennes', 'Quincy', 'San Francisco', 'Pensacola', 'Northampton', 'New Orleans', 'Minneapolis', 'Salt Lake City'],
      'light-cruiser':   ['Atlanta', 'Juneau', 'Brooklyn', 'Helena', 'St. Louis', 'Honolulu', 'Phoenix', 'Boise'],
      'destroyer':       ['DesRon 4, Fletcher class', 'DesDiv 15, Mahan class', 'DesDiv 22, Benson class', 'DesDiv 11, Sims class'],
      'submarine':       ['SubDiv 51, Gato class', 'SubDiv 43, Tambor class'],
      'auxiliary':       ['Fleet tanker', 'Repair ship'],
      'fighter-sqn':     ['F4F-3 Wildcat'],
      'bomber-sqn':      ['SBD Dauntless and TBD Devastator'],
    },
    'Late War': {
      'fleet-carrier':   ['Essex', 'Intrepid', 'Lexington (CV-16)', 'Yorktown (CV-10)', 'Bunker Hill', 'Hancock', 'Hornet (CV-12)', 'Wasp (CV-18)', 'Franklin', 'Ticonderoga', 'Randolph', 'Shangri-La'],
      'light-carrier':   ['Independence', 'Princeton', 'Belleau Wood', 'Cowpens', 'Cabot', 'Langley (CVL-27)', 'Bataan', 'San Jacinto'],
      'seaplane-tender': ['Currituck', 'Hamlin'],
      'battleship':      ['Iowa', 'New Jersey', 'Missouri', 'Wisconsin', 'North Carolina', 'Washington', 'South Dakota', 'Indiana', 'Massachusetts', 'Alabama'],
      'heavy-cruiser':   ['Baltimore', 'Boston', 'Canberra', 'Quincy (CA-71)', 'Pittsburgh', 'St. Paul', 'Wichita', 'Chicago (CA-136)'],
      'light-cruiser':   ['Cleveland', 'Columbia', 'Montpelier', 'Denver', 'Birmingham', 'Mobile', 'Vincennes (CL-64)', 'Pasadena'],
      'destroyer':       ['DesRon 23, Fletcher class', 'DesRon 60, Sumner class', 'DesDiv 121, Gearing class'],
      'submarine':       ['SubDiv 161, Balao class', 'SubDiv 201, Tench class'],
      'auxiliary':       ['Fleet oiler', 'Ammunition ship'],
      'fighter-sqn':     ['F6F Hellcat and F4U Corsair'],
      'bomber-sqn':      ['SB2C Helldiver and TBM Avenger'],
    },
  },
};

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
