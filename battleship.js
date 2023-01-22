// This is the view object which will allow me to change the page dynamicly.
var view = {
    // This Method will display the Message if the player has Hit, Miss, or sunk a Ship.
    displayMessage: function(msg) {
        var messageArea= document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    // This Method will place Misses in the grid.
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
    // This Method will place a Ship in the grid in case the Player quest right.
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    }
};

// This is the Model object which will keep track of the state of the game. 
var model = {
    numShips: 3,
    boardSize: 7,
    shipLength: 3,
    shipSunk: 0,
// The ships property is actually holding three objects which are representing the ships.(array of objects).
    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
            { locations: ["24", "34", "44"], hits: ["", "", ""] },
            { locations: ["10", "11", "12"], hits: ["", "", ""] }],
// The fire method will be responsible for checking if the players guess is a hit or a miss by checking each ships locations array on the guess.
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    this.shipSunk++;
                    view.displayMessage("You sunk my Battleship!");
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },
// The isSunk method will take as a argument a ship and check the values of the hit array if they are all hit.
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }
};

var controller = {
    guesses: 0,

    procesGuess: function(guess) {

    }
};

// The parseGuess function is responsible to validate and transform the players guess into valid and processable data for the model object.
function parseGuess(guess) {

    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === 0 || guess.length !== 2) {
        alert("OOops, please enter a letter and a number on the board.");
    } else {
        var firstCharacter = guess.charAt(0);
        var row = alphabet.indexOf(firstCharacter);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("OOops, that isn't on the Board!");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("OOops that is of the Board!");
        } 
    }
}

model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");
model.fire("22");
model.fire("05");
model.fire("66");