# Pacific Command Builder — Persona Audit

Five tabletop wargamers, each on a lunch break, building a list they'll print or bring to a tournament. Each walks the real current build and reports friction. Audit conducted against commit 90324a8.

---

## Persona 1 — "Dave", 44, plays at his FLGS Thursdays. New to Pacific Command, came from X-Wing.

**Scenario:** First time on the site. Wants to understand what he's even looking at and throw together a 150-point list.

**Walkthrough notes:**
- Landed on the page. Top bar says "Pacific Command" with a flag, a thing in the middle that says "Ⓢ 3", and four buttons. *"What's Ⓢ3? Is that a fleet size? A scale? I genuinely don't know and there's no label. I hovered and nothing happened because I'm on a laptop trackpad and didn't sit still long enough."*
- Clicked "Load Ⓢ3 Starter Fleet" because it was the leftmost button and he wanted to see *something*. Good instinct, worked, fleet appeared. *"OK now I get it, three task forces. But I had to load an example to understand the number in the toolbar."*
- Saw the stat bar at the bottom of each task force. *"Six colored boxes. Air Capacity, Guns, Strike, CAP, AA, Cost. I don't know what CAP is. I don't know what Strike means here versus in other games. There's no way to find out without already owning the book."*
- **Top friction:** No glossary, no way to learn the rules terms in-app. He'd have to have the rulebook open. *"For a tool aimed at players, it assumes I already know everything."*
- Couldn't tell what a "High value ship" was or why the sidebar tracked it.

**Dave's asks, ranked:**
1. Explain the terms. Tooltip or a small "?" that works on click, not just hover. CAP, Strike, High Value, Armoured, the lot.
2. Label the Ⓢ3 thing as "Scale" with a one-line explanation.
3. The colored stat boxes are pretty but he can't read them as information yet.

---

## Persona 2 — "Mei", 29, tournament regular, sharp, builds optimized lists fast.

**Scenario:** Knows the game cold. Wants to crank out a 200-pt list in five minutes, check it's legal, print it.

**Walkthrough notes:**
- Fast. Set scale, added task forces, added units. Smooth.
- *"The quantity stepper being the first column is annoying when I'm scanning my list to check what I built. I read down the left and it's just '2, 1, 1, 3' — I have to jump to the second column for the actual ship. Every other list-builder I use leads with the unit."*
- Loved the live validation (carrier limit, high-value caps). *"The red banners are good. Caught me putting three battleships in at scale 2."*
- **Top friction:** legality at a glance. *"The sidebar shows high-value counts, good. But I want one clear 'this list is legal / this list has 2 problems' verdict at the top. Right now I scroll to find red banners. At a tournament check-in I want a single green light."*
- Printed. *"Print's clean. But the chosen modifications text is great — I actually want that, opponents always argue about what my mods do."*
- Wanted to duplicate a task force she'd tuned rather than rebuild it. No duplicate button.

**Mei's asks, ranked:**
1. A single fleet-level legality summary at the top — "Legal" or "2 issues" with jump links.
2. Lead unit rows with the ship, not the stepper.
3. Duplicate a task force.

---

## Persona 3 — "Tomás", 51, painter and collector, plays casually, deeply into the lore/ships.

**Scenario:** Building a historically flavored IJN fleet, cares about ship names, will print a nice sheet for his binder.

**Walkthrough notes:**
- Picked IJN faction. Loved that ships auto-named. Loved Literal Names toggle. *"Seeing 'Zuikaku' render and then the English meaning — that's the good stuff."*
- Reroll on names: *"Great. I rerolled until I got the ships I actually own."*
- **Top friction:** the print sheet's stat values are gray so he can pencil over them, which he understood and liked — but *"the gray cost in the corner I keep thinking is a mistake. Took me a second to realize it's intentional."*
- Wanted the faction roundel bigger on the printout. *"It's tiny. I'm printing this for a binder, let me have the IJN sun proud at the top."*
- Asked: can he save the fleet and come back to it? *"I built this on my lunch break. If I close the tab is it gone?"* — Could not find a save/load or share. This worried him most.

**Tomás's asks, ranked:**
1. Save / persistence. Even local. "Don't lose my work when I close the tab."
2. Bigger faction roundel on the print sheet.
3. Reassure that the gray cost is deliberate (or just make it less alarming).

---

## Persona 4 — "Priya", 36, runs the local tournament, prints 20 lists for an event.

**Scenario:** Needs every player's list on paper, legible, one task force never split across a page, fits Letter and A4.

**Walkthrough notes:**
- Print preview as a real sheet: *"Yes. This is what I need. I can see the page width."*
- Page breaks holding task forces together: *"Tested a big fleet, the task forces didn't get guillotined across pages. Good."*
- **Top friction:** *"I print 20 of these. I'd kill for the fleet name and a points total in a running header or footer on every page, so when I drop the stack I can re-sort. Right now page 2 of someone's fleet has no name on it."*
- Wanted the date or a small "built with" line so she can tell versions apart when someone edits and reprints.
- The modifications block is excellent for adjudication. *"When two players disagree, I point at the printed rule. Keep that."*

**Priya's asks, ranked:**
1. Fleet name + total on every printed page (running header/footer).
2. A tiny generated-on date stamp for version control.

---

## Persona 5 — "Greg", 60s, not a computer person, plays with his grandson.

**Scenario:** Wants to build the starter fleet his grandson showed him and print it. Big fingers, basic laptop, impatient.

**Walkthrough notes:**
- *"Buttons are nice and big, I'll give it that."*
- Clicked "Add Unit", the panel opened. Picked ships. Fine.
- **Top friction:** undo. *"I deleted a task force by accident — the Delete button is right there at the top of every box. Gone. No undo. I had to start over."*
- Found the Delete button too eager: *"It's a big red-ish button next to everything. I keep almost hitting it."*
- Didn't understand "Free Play" or "Literal Names" checkboxes. *"I left them alone, scared to touch them."*
- Eventually printed. Happy. *"My grandson can read it. That's what matters."*

**Greg's asks, ranked:**
1. Undo, or a confirm on deleting a task force.
2. Make Delete less prominent / less easy to hit by accident.
3. Plain-language hints on the checkboxes.

---

# SYNTHESIS — what the signals converge on

Counting how many personas independently hit each issue:

**Strong signal (3+ personas):**
- **Term/rules education in-app** (Dave, and implicitly Greg; Mei wants the legality verdict which is adjacent). No way to learn CAP/Strike/High Value/Armoured without the book.
- **Lead unit rows with the ship, not the qty stepper** (Mei explicit, Dave implied by scanning confusion). Matches F-pattern.
- **Delete is too dangerous** (Greg explicit, and a known prior concern). No undo, prominent placement.

**Medium signal (2 personas):**
- **Scale ("Ⓢ3") is unlabeled and unexplained** (Dave, Greg's general confusion).
- **Persistence / don't-lose-my-work** (Tomás explicit, Greg implied — he had to start over).
- **Legality at a glance** (Mei explicit, Priya implied — she's checking legality at the door).

**Print-specific (tournament-critical for Priya, nice for Tomás):**
- Running header/footer with fleet name + total on every page.
- Bigger faction roundel on the sheet.

**Single but cheap:**
- Duplicate a task force (Mei).
- Date stamp on print (Priya).

# WHAT TO BUILD FIRST (highest value / lowest regret)

1. **In-app glossary tooltips that work on click, not just hover.** Define the stat terms and special rules where they appear. Hits the biggest, most-repeated complaint and helps every new player.
2. **Label the scale control "Scale" and lead unit rows with the ship name.** Two small layout truths that fix scanning for everyone.
3. **Confirm-on-delete for task forces.** Cheap insurance against the most painful failure (Greg starting over).
4. **Print: running footer with fleet name + points + date on every page.** Unlocks the tournament-organizer use case Priya represents.

These four address every strong signal and most medium ones without a big rebuild.
