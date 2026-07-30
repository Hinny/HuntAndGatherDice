/* Shared dice definitions and roller engine for the Hunt & Gather Dice App. */

/*
 * prefix -> image file name stem in images/dice/
 * faces  -> number of distinct faces on the physical die
 * max    -> how many of that die exist in the box
 * blank  -> the empty face; its art shows the die's real silhouette (cube /
 *           octahedron / dodecahedron), so it doubles as the die's icon
 */
var DICE = {
    green: { label: "Child", sub: "Green", prefix: "Child", faces: 6, max: 6, blank: 6 },
    blue: { label: "Male", sub: "Blue", prefix: "Male", faces: 6, max: 6, blank: 6 },
    red: { label: "Female", sub: "Red", prefix: "Female", faces: 6, max: 6, blank: 6 },
    yellow: { label: "Elder", sub: "Yellow", prefix: "Elder", faces: 6, max: 6, blank: 6 },

    whiteLight: { label: "White Light", prefix: "White-Light", faces: 6, max: 6, blank: 6 },
    whiteMedium: { label: "White Medium", prefix: "White-Medium", faces: 8, max: 5, blank: 8 },
    whiteHeavy: { label: "White Heavy", prefix: "White-Heavy", faces: 12, max: 4, blank: 12 },

    blackLight: { label: "Black Light", prefix: "Black-Light", faces: 6, max: 6, blank: 6 },
    blackMedium: { label: "Black Medium", prefix: "Black-Medium", faces: 8, max: 5, blank: 8 },
    blackHeavy: { label: "Black Heavy", prefix: "Black-Heavy", faces: 12, max: 4, blank: 12 }
};

function faceImage(key, face) {
    return "images/dice/" + DICE[key].prefix + "-" + face + ".png";
}

/* Blank face of the die, used as its label icon so the shape gives visual context. */
function dieIcon(key) {
    return '<img class="swatch" src="' + faceImage(key, DICE[key].blank) + '" alt="">';
}

function rollFace(key) {
    return Math.floor(Math.random() * DICE[key].faces) + 1;
}

function readStoredCounts(storageKey) {
    try {
        return JSON.parse(window.localStorage.getItem(storageKey)) || {};
    } catch (err) {
        return {};
    }
}

function writeStoredCounts(storageKey, counts) {
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(counts));
    } catch (err) {
        /* private browsing / storage disabled - counts just won't persist */
    }
}

/*
 * Builds a dice roller into the page.
 *
 * config = {
 *     storageKey: string,
 *     sections: [ { title: string, keys: [diceKey], defaultCount: number } ]
 * }
 *
 * Expects #setup, #results and #reroll to exist in the document.
 */
function createRoller(config) {
    var setupEl = document.getElementById("setup");
    var resultsEl = document.getElementById("results");
    var rollBtn = document.getElementById("roll");
    var rerollBtn = document.getElementById("reroll");

    var keys = [];
    config.sections.forEach(function (section) {
        keys = keys.concat(section.keys);
    });

    var stored = readStoredCounts(config.storageKey);
    var counts = {};
    keys.forEach(function (key) {
        var section = sectionFor(key);
        var fallback = section.defaultCount || 0;
        var value = typeof stored[key] === "number" ? stored[key] : fallback;
        counts[key] = Math.max(0, Math.min(DICE[key].max, Math.round(value)));
    });

    /* One entry per rolled die: { key, face, selected, rerolled, el, img, badge } */
    var rolled = [];

    /* A roll allows exactly one re-roll, covering any number of selected dice. */
    var rerollUsed = false;

    var preloaded = {};

    function sectionFor(key) {
        for (var i = 0; i < config.sections.length; i++) {
            if (config.sections[i].keys.indexOf(key) !== -1) {
                return config.sections[i];
            }
        }
        return config.sections[0];
    }

    function totalDice() {
        return keys.reduce(function (sum, key) {
            return sum + counts[key];
        }, 0);
    }

    function selectedCount() {
        return rolled.filter(function (die) {
            return die.selected;
        }).length;
    }

    /* ----- setup panel ----- */

    function buildSetup() {
        setupEl.innerHTML = "";

        config.sections.forEach(function (section) {
            var group = document.createElement("div");
            group.className = "stepper-group";

            if (config.sections.length > 1 && section.title) {
                var heading = document.createElement("h3");
                heading.textContent = section.title;
                group.appendChild(heading);
            }

            var list = document.createElement("div");
            list.className = "stepper-list";

            section.keys.forEach(function (key) {
                list.appendChild(buildStepper(key));
            });

            group.appendChild(list);
            setupEl.appendChild(group);
        });
    }

    function buildStepper(key) {
        var die = DICE[key];

        var row = document.createElement("div");
        row.className = "stepper";

        var label = document.createElement("span");
        label.className = "stepper-label";
        label.innerHTML =
            dieIcon(key) +
            '<span>' + die.label + (die.sub ? ' <span class="sub">(' + die.sub + ')</span>' : "") + "</span>";
        row.appendChild(label);

        var ctl = document.createElement("div");
        ctl.className = "stepper-ctl";

        var minus = stepButton("−", -1, key, "Remove one " + die.label + " die");
        var count = document.createElement("output");
        count.className = "count";
        count.id = "count-" + key;
        var plus = stepButton("+", 1, key, "Add one " + die.label + " die");

        ctl.appendChild(minus);
        ctl.appendChild(count);
        ctl.appendChild(plus);
        row.appendChild(ctl);

        return row;
    }

    function stepButton(text, delta, key, aria) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "step";
        btn.textContent = text;
        btn.setAttribute("aria-label", aria);
        btn.dataset.key = key;
        btn.dataset.delta = String(delta);
        btn.addEventListener("click", function () {
            changeCount(key, delta);
        });
        return btn;
    }

    function changeCount(key, delta) {
        var next = counts[key] + delta;
        counts[key] = Math.max(0, Math.min(DICE[key].max, next));
        writeStoredCounts(config.storageKey, counts);
        syncSetup();
    }

    function syncSetup() {
        keys.forEach(function (key) {
            var die = DICE[key];
            var value = counts[key];
            var out = document.getElementById("count-" + key);

            out.innerHTML = value + ' <span class="of">/ ' + die.max + "</span>";
            out.classList.toggle("is-max", value === die.max);

            var row = out.closest(".stepper");
            row.querySelector('[data-delta="-1"]').disabled = value === 0;
            row.querySelector('[data-delta="1"]').disabled = value === die.max;
        });

        rollBtn.disabled = totalDice() === 0;
    }

    /* ----- rolling ----- */

    function roll() {
        rolled = [];
        rerollUsed = false;
        keys.forEach(function (key) {
            for (var i = 0; i < counts[key]; i++) {
                rolled.push({ key: key, face: rollFace(key), selected: false, rerolled: false });
            }
        });
        renderResults();
        preloadFaces();
    }

    function rerollSelected() {
        if (rerollUsed || selectedCount() === 0) {
            return;
        }
        rerollUsed = true;

        /* Touch only the dice that changed - re-rendering the grid makes every die flicker. */
        rolled.forEach(function (die) {
            if (die.selected) {
                die.face = rollFace(die.key);
                die.selected = false;
                die.rerolled = true;
                die.img.src = faceImage(die.key, die.face);
                die.img.alt = DICE[die.key].label + " face " + die.face;
                replayRerollPop(die.el);
            }
            syncDie(die);
        });

        syncRerollButton();
    }

    function toggleDie(die) {
        if (rerollUsed) {
            return;
        }
        die.selected = !die.selected;
        syncDie(die);
        syncRerollButton();
    }

    function replayRerollPop(el) {
        el.classList.remove("just-rerolled");
        void el.offsetWidth;
        el.classList.add("just-rerolled");
    }

    /* Warm the image cache so the one allowed re-roll swaps faces without a blank frame. */
    function preloadFaces() {
        keys.forEach(function (key) {
            if (preloaded[key] || counts[key] === 0) {
                return;
            }
            preloaded[key] = true;
            for (var face = 1; face <= DICE[key].faces; face++) {
                new Image().src = faceImage(key, face);
            }
        });
    }

    function renderResults() {
        resultsEl.innerHTML = "";

        if (rolled.length === 0) {
            var empty = document.createElement("p");
            empty.className = "empty";
            empty.textContent = "Pick your dice and hit Roll.";
            resultsEl.appendChild(empty);
            syncRerollButton();
            return;
        }

        config.sections.forEach(function (section) {
            var dice = rolled.filter(function (die) {
                return section.keys.indexOf(die.key) !== -1;
            });
            if (dice.length === 0) {
                return;
            }

            var group = document.createElement("div");
            group.className = "result-group";

            if (section.title) {
                var heading = document.createElement("h3");
                heading.textContent = section.title + " · " + dice.length + (dice.length === 1 ? " die" : " dice");
                group.appendChild(heading);
            }

            var grid = document.createElement("div");
            grid.className = "dice-grid";
            dice.forEach(function (die) {
                grid.appendChild(buildDie(die));
            });

            group.appendChild(grid);
            resultsEl.appendChild(group);
        });

        syncRerollButton();
    }

    function buildDie(die) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "die";

        var img = document.createElement("img");
        img.src = faceImage(die.key, die.face);
        img.alt = DICE[die.key].label + " face " + die.face;
        btn.appendChild(img);

        var badge = document.createElement("span");
        badge.className = "badge";
        badge.setAttribute("aria-hidden", "true");
        btn.appendChild(badge);

        btn.addEventListener("click", function () {
            toggleDie(die);
        });

        die.el = btn;
        die.img = img;
        die.badge = badge;
        syncDie(die);

        return btn;
    }

    /* Updates one die in place - no DOM rebuild, so untouched dice never repaint. */
    function syncDie(die) {
        var meta = DICE[die.key];

        die.el.classList.toggle("is-rerolled", die.rerolled);
        die.el.setAttribute("aria-pressed", die.selected ? "true" : "false");
        die.el.disabled = rerollUsed;
        die.badge.textContent = die.rerolled ? "↻" : "✓";

        var title = meta.label + " " + die.face;
        if (die.rerolled) {
            title += " · re-rolled";
        } else if (!rerollUsed) {
            title += " · tap to select for re-roll";
        }
        die.el.title = title;
    }

    function syncRerollButton() {
        var count = selectedCount();

        if (rerollUsed) {
            rerollBtn.disabled = true;
            rerollBtn.textContent = "Re-roll used";
        } else if (count === 0) {
            rerollBtn.disabled = true;
            rerollBtn.textContent = "Re-roll selected";
        } else {
            rerollBtn.disabled = false;
            rerollBtn.textContent = "Re-roll " + count + (count === 1 ? " die" : " dice");
        }
    }

    rollBtn.addEventListener("click", roll);
    rerollBtn.addEventListener("click", rerollSelected);

    buildSetup();
    syncSetup();
    renderResults();
}

/* Renders the collapsible dice-face reference used on the home page. */
function renderFaceReference(mountId, keys) {
    var mount = document.getElementById(mountId);

    keys.forEach(function (key) {
        var die = DICE[key];

        /* Every die starts collapsed - the page is a lookup table, not a reading list. */
        var details = document.createElement("details");
        details.className = "faces";

        var summary = document.createElement("summary");
        summary.innerHTML =
            dieIcon(key) +
            "<span>" + die.label + (die.sub ? ' <span class="sub">(' + die.sub + ")</span>" : "") + "</span>" +
            '<span class="sub">' + die.faces + " faces</span>";
        details.appendChild(summary);

        var grid = document.createElement("div");
        grid.className = "dice-grid";
        for (var face = 1; face <= die.faces; face++) {
            var img = document.createElement("img");
            img.src = faceImage(key, face);
            img.alt = die.label + " face " + face;
            img.loading = "lazy";
            grid.appendChild(img);
        }

        details.appendChild(grid);
        mount.appendChild(details);
    });
}
