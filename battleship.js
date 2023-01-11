//Generating a random number from 0-4.99 and rounding it down to an intenger.
var randomLoc = Math.floor(Math.random() * 5);
var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;
var guess;
var stats;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (!isSunk) {
    // Get the users guess
    guess = prompt("Ready, aim, fire! (enter a number from 0-6):");
    // Check if the number is in the range of the provided grid
    if (guess > 0 && guess <= 6) {
        guesses = guesses + 1;
        // Check if the guess is a hit!
        if (guess == location1 || guess == location2 || guess == location3) {
            hits = hits + 1;
            alert("Hit!")
            if (hits == 3) {
                isSunk = true;
                alert("You've sank my Battleship!");
            }
        }else {
            alert("Miss!");
        }
    }else {
        alert("Please enter a valid cell number!");
    }
}
stats = "You took " + guesses + " guesses too sink my Battleship, " + "which means your shooting accuracy was " + (3/guesses);
alert(stats);