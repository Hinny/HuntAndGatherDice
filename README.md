# HuntAndGatherDice

https://hinny.github.io/HuntAndGatherDice/

A dice roller companion for the Hunt & Gather board game. Static HTML/CSS/JS, no build step,
no dependencies — open `index.html` or serve the folder.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Dice face reference for every die in the box |
| `growth.html` | Growth dice roller (fertility + maturity) |
| `tribe.html` | Tribe dice roller |
| `action.html` | Action dice roller (formerly "encounter") |

`encounter.html` is a redirect kept for old bookmarks.

## Dice in the box

| Die | Faces | Available |
| --- | --- | --- |
| Fertility (Green) | 6 | 8 |
| Maturity (Blue) | 6 | 8 |
| Tribe | 8 | 10 |
| White light | 6 | 6 |
| White medium | 8 | 5 |
| White heavy | 12 | 4 |
| Black light | 6 | 6 |
| Black medium | 8 | 5 |
| Black heavy | 12 | 4 |

Steppers are clamped to the "Available" column, so you can never build a pool the box can't fill.

Some faces repeat on the physical die (fertility 2–3 and 4–5; tribe 2–3, 4–5 and the two empty 7–8),
so the face reference shows the same art more than once — that is the die, not a duplicate image.

## Dice art

`images/dice/` holds one PNG per face, named `<Prefix>-<face number>.png`, plus a
`<Prefix>-Empty.png` per die: the die with none of its symbols on it. The empty art is what every
label icon uses, so a die is recognised by its colour and silhouette instead of by whichever face
happens to sit last in the list.

## Growth pool minimums

Fertility and maturity both start at 1. Turning either down to 0 shows the rule that puts it back:
with at least one healthy female (fertility) or healthy child (maturity) in the settlement, the
minimum for that die is 1. The stepper still allows 0 — the note is a reminder, not a lock.

## Re-rolling

After a roll, tap any number of dice to select them, then press **Re-roll**. There is exactly one
re-roll per roll: the selected dice get new faces and are marked with `↻`, and the re-roll is then
spent — no further selecting until you press **Roll** again.

Dice pool sizes are remembered per page in `localStorage`.
