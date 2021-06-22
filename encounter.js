var attackerLightNumber = 0;
var attackerMediumNumber = 0;
var attackerHeavyNumber = 0;

var defenderLightNumber = 0;
var defenderMediumNumber = 0;
var defenderHeavyNumber = 0;


function addAttackerLightDice() {
    if (attackerLightNumber < 5) {
        attackerLightNumber++;
    }
    document.getElementById("attackerLight").innerHTML = attackerLightNumber;
}

function substractAttackerLightDice() {
    if (attackerLightNumber > 0) {
        attackerLightNumber--;
    }
    document.getElementById("attackerLight").innerHTML = attackerLightNumber;
}

function addAttackerMediumDice() {
    if (attackerMediumNumber < 4) {
        attackerMediumNumber++;
    }
    document.getElementById("attackerMedium").innerHTML = attackerMediumNumber;
}

function substractAttackerMediumDice() {
    if (attackerMediumNumber > 0) {
        attackerMediumNumber--;
    }
    document.getElementById("attackerMedium").innerHTML = attackerMediumNumber;
}

function addAttackerHeavyDice() {
    if (attackerHeavyNumber < 3) {
        attackerHeavyNumber++;
    }
    document.getElementById("attackerHeavy").innerHTML = attackerHeavyNumber;
}

function substractAttackerHeavyDice() {
    if (attackerHeavyNumber > 0) {
        attackerHeavyNumber--;
    }
    document.getElementById("attackerHeavy").innerHTML = attackerHeavyNumber;
}

function addDefenderLightDice() {
    if (defenderLightNumber < 5) {
        defenderLightNumber++;
    }
    document.getElementById("defenderLight").innerHTML = defenderLightNumber;
}

function substractDefenderLightDice() {
    if (defenderLightNumber > 0) {
        defenderLightNumber--;
    }
    document.getElementById("defenderLight").innerHTML = defenderLightNumber;
}

function addDefenderMediumDice() {
    if (defenderMediumNumber < 4) {
        defenderMediumNumber++;
    }
    document.getElementById("defenderMedium").innerHTML = defenderMediumNumber;
}

function substractDefenderMediumDice() {
    if (defenderMediumNumber > 0) {
        defenderMediumNumber--;
    }
    document.getElementById("defenderMedium").innerHTML = defenderMediumNumber;
}

function addDefenderHeavyDice() {
    if (defenderHeavyNumber < 3) {
        defenderHeavyNumber++;
    }
    document.getElementById("defenderHeavy").innerHTML = defenderHeavyNumber;
}

function substractDefenderHeavyDice() {
    if (defenderHeavyNumber > 0) {
        defenderHeavyNumber--;
    }
    document.getElementById("defenderHeavy").innerHTML = defenderHeavyNumber;
}

function rollEncounterDice() { 
    var src = document.getElementById("encounterDice");

    while (src.firstChild) {
        src.removeChild(src.firstChild);
    }
    
    numberOfAttackerDice = 0;
    numberOfDefenderDice = 0;

    for(var i=0; i < attackerLightNumber; i++) {
        rnd = getRndInteger(1,6);
        var img = document.createElement("img");
        img.src = "images/dice/Black-Light-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
        numberOfAttackerDice++;
        if (numberOfAttackerDice == 6) {
            linebreak = document.createElement("br");
            src.appendChild(linebreak);
        }
    }
    
    for(var i=0; i < attackerMediumNumber; i++) {
        rnd = getRndInteger(1,8);
        var img = document.createElement("img");
        img.src = "images/dice/Black-Medium-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
        numberOfAttackerDice++;
        if (numberOfAttackerDice == 6) {
            linebreak = document.createElement("br");
            src.appendChild(linebreak);
        }
    }

    for(var i=0; i < attackerHeavyNumber; i++) {
        rnd = getRndInteger(1,12);
        var img = document.createElement("img");
        img.src = "images/dice/Black-Heavy-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
        numberOfAttackerDice++;
        if (numberOfAttackerDice == 6) {
            linebreak = document.createElement("br");
            src.appendChild(linebreak);
        }
    }
    
    linebreak = document.createElement("br");
    src.appendChild(linebreak);

    for(var i=0; i < defenderLightNumber; i++) {
        rnd = getRndInteger(1,6);
        var img = document.createElement("img");
        img.src = "images/dice/White-Light-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
        numberOfDefenderDice++;
        if (numberOfDefenderDice == 6) {
            linebreak = document.createElement("br");
            src.appendChild(linebreak);
        }
    }

    for(var i=0; i < defenderMediumNumber; i++) {
        rnd = getRndInteger(1,8);
        var img = document.createElement("img");
        img.src = "images/dice/White-Medium-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
        numberOfDefenderDice++;
        if (numberOfDefenderDice == 6) {
            linebreak = document.createElement("br");
            src.appendChild(linebreak);
        }
    }

    for(var i=0; i < defenderHeavyNumber; i++) {
        rnd = getRndInteger(1,12);
        var img = document.createElement("img");
        img.src = "images/dice/White-Heavy-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
        numberOfDefenderDice++;
        if (numberOfDefenderDice == 6) {
            linebreak = document.createElement("br");
            src.appendChild(linebreak);
        }
    }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function changToPopulationPage() {
    window.location.href = 'population.html';
}

function changToDisplayPage() {
    window.location.href = 'index.html';
}
