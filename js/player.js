

function Player(name) {
    this.name = name;
    this.keytoPress = "";
    this.hasWon = false;
}


Player.prototype.setLevel = function (keysArray) {
    var onlyKeys = keysArray.map(function (el) {
        return parseInt(Object.keys(el));
    })
    this.keys = keysArray;
    this.keysArraykeys = onlyKeys;
}

//make random key combination
Player.prototype.pickRandomKey = function () {
    var index = Math.floor(Math.random() * this.keys.length);
    return this.keys[index];
};

Player.prototype.updateKeys = function () {
    var nextKey = this.pickRandomKey();
    this.keytoPress = Object.keys(nextKey);
    if (this.name === "Trump") {
        $(".instructions-left").text("Press " + Object.values(nextKey));
    } else {
        $(".instructions-right").text("Press " + Object.values(nextKey));
    }
};
