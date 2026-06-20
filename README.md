# Pacific Command - Fleet Builder

Fleet builder for **[Pacific Command](https://planetsmashergames.com/pacific-command/)**, the WWII naval wargame written by Mike Hutchinson and published by Osprey Games.

**Live:** https://jetwong.neocities.org/wargaming/historicals/pacific-command-builder-2

**Quick reference sheets (PDF):** [Pacific Command](https://jetwong.neocities.org/wargaming/historicals/assets/pacific-command-quickref.pdf) / [Stellar Command](https://jetwong.neocities.org/wargaming/historicals/assets/stellar-command-quickref.pdf) (also linked from the builder's footer).

---

## The Game

Pacific Command is a naval miniatures wargame about carrier combat in the Pacific during the Second World War. Fleets of battleships, cruisers, carriers, and destroyers trade blows under skies filled with aircraft. The game features a fog-of-war mechanic that simulates the uncertainty admirals actually faced — you deploy your fleet as radar blips first, concealing your true configuration until it's too late for your opponent to respond.

- **Written by** Mike Hutchinson ([Planet Smasher Games](https://planetsmashergames.com/))
- **Published by** [Osprey Games](https://www.ospreypublishing.com/us/pacific-command-9781472859976/)
- **Game page at Planet Smasher Games:** https://planetsmashergames.com/pacific-command/
- **Buy from Osprey:** https://www.ospreypublishing.com/us/pacific-command-9781472859976/
- **Buy on Amazon:** https://www.amazon.com/Pacific-Command-Wargame-Osprey-Wargames/dp/1472859979

---

## Fleet Builder Features

- Fleet construction for IJN and USN at multiple scale levels (S1–S10)
- Task force management with unit roster, cost tracking, and rule validation
- Fleet modifications with historical presets (Kido Butai, USN Pacific Fleet, etc.)
- Historical ship and squadron name pools with English translation toggle
- Random task force generator
- Print-ready fleet sheet output
- Sci-fi mode (renames units for generic naval sci-fi play)

Built by [WarLore](https://jetwong.neocities.org).

---

## Structure

```
index.html          — Entry point
app/
  data.js           — Ship classes, modifications, special rules, historical name data
  print.css         — Print stylesheet
app2/
  builder.jsx       — React app (Babel standalone, no build step)
  style.css         — App styles
assets/
  roundel-ijn.svg   — IJN roundel
  roundel-usn.svg   — USN roundel
```

No build step. Runs directly in the browser via Babel standalone + React 18 UMD.
