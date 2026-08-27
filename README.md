# HuntAndGatherDice

https://hinny.github.io/HuntAndGatherDice/

A dice roller companion for the Hunt & Gather board game. Static HTML/CSS/JS, no build step,
no dependencies — open `index.html` or serve the folder.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Dice face reference for every die in the box |
| `action.html` | Action dice roller |

`encounter.html`, `growth.html` and `tribe.html` are stubs kept for old bookmarks.

## Dice in the box

Action dice are the only dice the game uses — 30 of them, 15 of each colour.

| Die | Faces | Available |
| --- | --- | --- |
| White light | 6 | 6 |
| White medium | 8 | 5 |
| White heavy | 12 | 4 |
| Black light | 6 | 6 |
| Black medium | 8 | 5 |
| Black heavy | 12 | 4 |

Steppers are clamped to the "Available" column, so you can never build a pool the box can't fill.

The attacker rolls black, the defender white; one die per labor spent on a weapon, or one per
model for animals. Both sides roll at once and each selects up to two results. The same dice are
rolled for hazards, and for the Animal Activity step at the start of a season.

## The growth and tribe dice are gone

Fertility, maturity and the tribe die have left the box. Growth is no longer a roll: it is a
decision taken at the *End of the Year* and read off the population board, whose two tracks hold
every member not yet in play. Their pages and art were removed with them, and `growth.html` and
`tribe.html` now just say so.

## Dice art

`images/dice/` holds one PNG per face, named `<Prefix>-<face number>.png`, plus a
`<Prefix>-Empty.png` per die: the die with none of its symbols on it. The empty art is what every
label icon uses, so a die is recognised by its colour and silhouette instead of by whichever face
happens to sit last in the list.

The faces match the rulebook's distributions exactly — a wound is an arrowhead, a special is a
spiral, and a blank face is a miss:

| Die | Faces |
| --- | --- |
| Black light (D6) | special · 2 wounds · 1 wound ×2 · blank ×2 |
| Black medium (D8) | special ×2 · 3 wounds · 2 wounds ×2 · 1 wound · blank ×2 |
| Black heavy (D12) | special ×3 · 4 wounds · 3 wounds ×2 · 2 wounds ×2 · 1 wound ×2 · blank ×2 |
| White light (D6) | special · 1 wound · blank ×4 |
| White medium (D8) | special ×2 · 2 wounds · 1 wound · blank ×4 |
| White heavy (D12) | special ×3 · 3 wounds · 2 wounds ×2 · 1 wound ×2 · blank ×4 |

The black dice are the aggressive ones: more and heavier wound faces, where the white die of the
same size misses more often. Attacking is favoured — but the defender wins ties.

## Re-rolling

After a roll, tap any number of dice to select them, then press **Re-roll**. There is exactly one
re-roll per roll: the selected dice get new faces and are marked with `↻`, and the re-roll is then
spent — no further selecting until you press **Roll** again.

Dice pool sizes are remembered per page in `localStorage`.
