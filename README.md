# Pacific Command — Fleet Builder

Fleet builder for [Pacific Command](https://ospreypublishing.com/uk/pacific-command-9781472854896/), the WWII naval wargame written by Mike Hutchinson and published by Osprey Games.

Built by [WarLore](https://jetwong.neocities.org).

**Live:** https://jetwong.neocities.org/wargaming/historicals/pacific-command-builder-2

## Features

- Fleet construction for IJN and USN at multiple scale levels (S1–S10)
- Task force management with unit roster, cost tracking, and validation
- Fleet modifications (historical presets for Kido Butai, USN Pacific Fleet, etc.)
- Historical ship/squadron name pools with English translation toggle
- Random task force generator
- Print-ready fleet sheet output
- Sci-fi mode (renames units for generic naval sci-fi use)

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

## No build step

Runs directly in the browser via Babel standalone + React 18 UMD. Drop the files anywhere and open `index.html`.
