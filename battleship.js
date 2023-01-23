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
    ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] }],
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
    },

    generateShipLocation: function() {
        // Generates ships in the ships array until the number of ships equal's the numShips in the game.
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while(this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    // The generateShip method creates a array with random location for one ship without checking if it colides with an existing ship's location.
    generateShip: function() {
        // first it will randomly assign to the direction variable the direction(verticaly || horizontally) 1 being horizontal and 0 being vertical.
        var direction = Math.floor(Math.random() * 2);
        var row;
        var col;
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    // The collision Method takes a ship and checks if any of the ships locations overlap or collide with any of the existing ships on the board.
    collision: function(locations) {
        for (var i = 0; i < this.numShips; i++){
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};

var controller = {
    guesses: 0,

    procesGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses.");
            }
        }
    }
};

// The parseGuess function is responsible to validate and transform the players guess into valid and processable data for the model object.
function parseGuess(guess) {

    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === 0 || guess.length !== 2) {
        alert("OOops, please enter a letter and a number on the board.");
    } else {
        var firstCharacter = guess.charAt(0).toUpperCase();
        var row = alphabet.indexOf(firstCharacter);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("OOops, that isn't on the Board!");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("OOops that is of the Board!");
        } else {
            return row + column;
        }
    }
    return null;
};

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeydown = handleKeyDown;

    model.generateShipLocation();
};

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.procesGuess(guess);
    guessInput.value = "";
};

function handleKeyDown(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
};
window.onload = init;

