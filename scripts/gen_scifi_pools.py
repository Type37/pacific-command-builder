#!/usr/bin/env python
"""Generate sci-fi faction name pools for Pacific Command from the DFC roster Excel.

Builds HISTORICAL_NAMES[faction]['Standard'][classId] arrays where each pool
combines, per ship class of that PC unit type:
  - a class designation, e.g. "Nephilim-class Battleship"
  - the famous / other-famous ship names listed for that class
"""
import openpyxl, json, re, collections, sys, io

XLSX = 'DFC_PacificCommand_FullRoster (2).xlsx'

# Excel faction value -> our faction code
FAC_CODE = {
    'UCM': 'UCM', 'PHR': 'PHR', 'Scourge': 'SCRG',
    'Shaltari': 'SHLT', 'Resistance': 'RES', 'Bioficer': 'BFCR',
}
# PC Unit Type -> classId used in SHIP_CLASSES
TYPE_ID = {
    'Fleet Carrier': 'fleet-carrier',
    'Light Carrier': 'light-carrier',
    'Seaplane Tender': 'seaplane-tender',
    'Battleship': 'battleship',
    'Heavy Cruiser': 'heavy-cruiser',
    'Light Cruiser': 'light-cruiser',
    'Destroyer': 'destroyer',
    'Submarine': 'submarine',
    'Auxiliary': 'auxiliary',
}

def clean(s):
    if s is None:
        return ''
    s = str(s)
    # normalise smart punctuation to plain ASCII
    s = (s.replace('’', "'").replace('‘', "'")
           .replace('“', '"').replace('”', '"')
           .replace('–', '-').replace('—', '-')
           .replace('…', '...').replace('\xa0', ' '))
    s = s.replace('�', "'")  # stray replacement char seen in source -> apostrophe
    return re.sub(r'\s+', ' ', s).strip()

def split_names(cell):
    s = clean(cell)
    if not s:
        return []
    # split on commas / semicolons / slashes
    parts = re.split(r'\s*[,;/|]\s*', s)
    out = []
    for p in parts:
        p = p.strip().strip('"').strip()
        if p and p.lower() not in ('none', 'n/a', '-'):
            out.append(p)
    return out

def main():
    wb = openpyxl.load_workbook(XLSX, data_only=True)
    ws = wb['Pacific Command Roster']
    rows = list(ws.iter_rows(values_only=True))[1:]  # drop header

    # faction -> classId -> list of names (ordered, deduped case-insensitively)
    pools = collections.defaultdict(lambda: collections.defaultdict(list))
    seen = collections.defaultdict(lambda: collections.defaultdict(set))

    def add(fac, cid, name):
        name = clean(name)
        if not name:
            return
        key = name.lower()
        if key in seen[fac][cid]:
            return
        seen[fac][cid].add(key)
        pools[fac][cid].append(name)

    for r in rows:
        if not any(c is not None for c in r):
            continue
        fac_raw, ship_class, dfc_type, tonnage, pc_type = r[0], r[1], r[2], r[3], r[4]
        famous, other = r[7], r[8]
        fac = FAC_CODE.get(clean(fac_raw))
        cid = TYPE_ID.get(clean(pc_type))
        ship_class = clean(ship_class)
        if not fac or not cid or not ship_class:
            continue
        # class designation first, then the named ships of that class
        add(fac, cid, f'{ship_class}-class {clean(pc_type)}')
        for n in split_names(famous):
            add(fac, cid, n)
        for n in split_names(other):
            add(fac, cid, n)

    # Squadron pools (not in the roster sheet). Craft names supplied by the
    # user; phonetic suffixes give each squadron a unique, randomisable name.
    # (fighter, bomber) per faction:
    SQUADRON_NAMES = {
        'UCM':  ('Voidblade', 'Voidhammer'),
        'PHR':  ('Arion', 'Aethon'),
        'SCRG': ('Hellscream', 'Hellmaw'),
        'SHLT': ('Starblade', 'Starglaive'),
        'RES':  ('Mustang', 'V-44 Superfortress'),
        'BFCR': ('Interceptor', 'Bombard'),  # placeholder: no canon names given
    }
    SUFFIX = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Gamma', 'Hydra', 'Ion']
    for fac, (fname, bname) in SQUADRON_NAMES.items():
        pools[fac]['fighter-sqn'] = [f'{fname} {s}' for s in SUFFIX]
        pools[fac]['bomber-sqn'] = [f'{bname} {s}' for s in SUFFIX[:8]]

    # Emit in a stable faction / classId order
    fac_order = ['UCM', 'PHR', 'SCRG', 'SHLT', 'RES', 'BFCR']
    cid_order = ['fleet-carrier', 'light-carrier', 'seaplane-tender', 'battleship',
                 'heavy-cruiser', 'light-cruiser', 'destroyer', 'submarine',
                 'auxiliary', 'fighter-sqn', 'bomber-sqn']
    out = {}
    for fac in fac_order:
        era = collections.OrderedDict()
        for cid in cid_order:
            if pools[fac].get(cid):
                era[cid] = pools[fac][cid]
        out[fac] = {'Standard': era}

    # stats
    sys.stderr.write('== pool sizes (faction / classId : count) ==\n')
    for fac in fac_order:
        sizes = {cid: len(v) for cid, v in out[fac]['Standard'].items()}
        sys.stderr.write(f'{fac}: {sizes}\n')

    # write JSON for inspection
    with io.open('scripts/_scifi_pools.json', 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    # sample
    sys.stderr.write('\n== sample SCRG battleship ==\n')
    sys.stderr.write(json.dumps(out['SCRG']['Standard']['battleship'][:12], ensure_ascii=False, indent=1))
    sys.stderr.write('\n')

if __name__ == '__main__':
    main()
