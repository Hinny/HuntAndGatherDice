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

Some faces repeat on the physical die (fertility 2–3; tribe 2–3, 4–5 and the two empty 7–8), so the
face reference shows the same art more than once — that is the die, not a duplicate image.

## Re-rolling

After a roll, tap any number of dice to select them, then press **Re-roll**. There is exactly one
re-roll per roll: the selected dice get new faces and are marked with `↻`, and the re-roll is then
spent — no further selecting until you press **Roll** again.

Dice pool sizes are remembered per page in `localStorage`.
