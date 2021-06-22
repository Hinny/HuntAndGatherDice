var childNumber = 3;
var femaleNumber = 3;
var maleNumber = 3;
var elderNumber = 3;

//$(document).ready(new function (){
//    childElement = document.getElementById("child");
//    femaleElement = document.getElementById("female");
//    maleElement = document.getElementById("male");
//    elderElement = document.getElementById("elder");
//});

function addChildDice() {
    if (childNumber < 8) {
        childNumber++;
    }
    document.getElementById("child").innerHTML = childNumber;
}

function substractChildDice() {
    if (childNumber > 0) {
        childNumber--;
    }
    document.getElementById("child").innerHTML = childNumber;
}

function addFemaleDice() {
    if (femaleNumber < 8) {
        femaleNumber++;
    }
    document.getElementById("female").innerHTML = femaleNumber;
}

function substractFemaleDice() {
    if (femaleNumber > 0) {
        femaleNumber--;
    }
    document.getElementById("female").innerHTML = femaleNumber;
}

function addMaleDice() {
    if (maleNumber < 8) {
        maleNumber++;
    }
    document.getElementById("male").innerHTML = maleNumber;
}

function substractMaleDice() {
    if (maleNumber > 0) {
        maleNumber--;
    }
    document.getElementById("male").innerHTML = maleNumber;
}

function addElderDice() {
    if (elderNumber < 8) {
        elderNumber++;
    }
    document.getElementById("elder").innerHTML = elderNumber;
}

function substractElderDice() {
    if (elderNumber > 0) {
        elderNumber--;
    }
    document.getElementById("elder").innerHTML = elderNumber;
}

function rollPopulationDice() {
    var src = document.getElementById("populationDice");

    while (src.firstChild) {
        src.removeChild(src.firstChild);
    }

    for(var i=0; i < childNumber; i++) {
        rnd = getRndInteger(1,6);
        var img = document.createElement("img");
        img.src = "images/dice/Child-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
    }
    if (childNumber > 0) {
        linebreak = document.createElement("br");
        src.appendChild(linebreak);
    }
    for(var i=0; i < femaleNumber; i++) {
        rnd = getRndInteger(1,6);
        var img = document.createElement("img");
        img.src = "images/dice/Female-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
    }
    if (femaleNumber > 0) {
        linebreak = document.createElement("br");
        src.appendChild(linebreak);
    }

    for(var i=0; i < maleNumber; i++) {
        rnd = getRndInteger(1,6);
        var img = document.createElement("img");
        img.src = "images/dice/Male-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
    }
    if (maleNumber > 0) {
        linebreak = document.createElement("br");
        src.appendChild(linebreak);
    }

    for(var i=0; i < elderNumber; i++) {
        rnd = getRndInteger(1,6);
        var img = document.createElement("img");
        img.src = "images/dice/Elder-" + rnd + ".png";
        img.height="50";
        src.appendChild(img);
    }
    if (elderNumber > 0) {
        linebreak = document.createElement("br");
        src.appendChild(linebreak);
    }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function changToEncounterPage() {
    
    window.location.href = 'encounter.html';
}

function changToDisplayPage() {
    window.location.href = 'index.html';
}
