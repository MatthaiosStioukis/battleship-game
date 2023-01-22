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
}

view.displayMessage("Tap tap.. is this thing on?");
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");