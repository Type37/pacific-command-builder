#!/usr/bin/env python
"""Patch app/data.js: inject the 6 sci-fi factions into HISTORICAL_NAMES and
add their HISTORICAL_MOD_SETS entries. Idempotent: refuses if already patched."""
import json, io, sys

DATA = 'app/data.js'
POOLS = 'scripts/_scifi_pools.json'

LABELS = {
    'UCM': 'United Colonies', 'PHR': 'Posthuman Republic', 'SCRG': 'Scourge',
    'SHLT': 'Shaltari', 'RES': 'Resistance', 'BFCR': 'Bioficer',
}
SET_ID = {'UCM': 'ucm-std', 'PHR': 'phr-std', 'SCRG': 'scrg-std',
          'SHLT': 'shlt-std', 'RES': 'res-std', 'BFCR': 'bfcr-std'}
ORDER = ['UCM', 'PHR', 'SCRG', 'SHLT', 'RES', 'BFCR']

src = io.open(DATA, encoding='utf-8').read()
if "'ucm-std'" in src or '"UCM":' in src:
    sys.exit('ALREADY PATCHED — aborting to avoid duplicates.')

pools = json.load(io.open(POOLS, encoding='utf-8'))
six = {f: pools[f] for f in ORDER}

# --- inject into HISTORICAL_NAMES ---------------------------------------
dump = json.dumps(six, ensure_ascii=False, indent=2)
inner = '\n'.join(dump.split('\n')[1:-1])  # drop outer { } ; keep 2-space indent
anchor = 'window.HISTORICAL_NAMES = {\n'
assert src.count(anchor) == 1, 'HISTORICAL_NAMES anchor not unique'
src = src.replace(anchor, anchor + inner + ',\n', 1)

# --- add mod-set entries ------------------------------------------------
ms_anchor = "  { id: 'pr-std', faction: 'PR', era: 'Standard', label: 'Postman Republic', mods: [] },\n"
assert src.count(ms_anchor) == 1, 'mod-set anchor not unique'
new_sets = ''.join(
    f"  {{ id: '{SET_ID[f]}', faction: '{f}', era: 'Standard', label: '{LABELS[f]}', mods: [] }},\n"
    for f in ORDER
)
src = src.replace(ms_anchor, ms_anchor + new_sets, 1)

io.open(DATA, 'w', encoding='utf-8', newline='\n').write(src)
print('Patched', DATA)
print('Added factions:', ', '.join(ORDER))
