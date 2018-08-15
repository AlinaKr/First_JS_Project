function Player(name, direction, keys) {
  this.name = name;
  this.direction = direction;
  this.keys = keys;
  this.keytoPress = "";
  this.distanceTowardsWin = 6;
  this.hasWon = false;
}

function Game(playerFirst, playerSecond) {
  this.positionHand = 0; ///max is 4 or -4!
  this.playerFirst = playerFirst;
  this.playerSecond = playerSecond;
  this.isWon = false;
}

choosePlayer = function () {
  console.log("I work");
  console.log($(".img-div"));

}

Game.prototype.initialiseGifs = function () {
  var imgLeft = $(".left-container-img");
  imgLeft.attr("src", "./Trump_0.gif");
  if (this.playerSecond.name === "Jong-un") {
    console.log("PLAYERSECOND", this.playerSecond.name);
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./Jong-un_0.gif");
  }
  else if (this.playerSecond.name === "Merkel") {
    console.log("here at angela");
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./Merkel_0.gif");
  }
  else if (this.playerSecond.name === "Putin") {
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./Putin_0.gif");
  }
  else if (this.playerSecond.name === "Macron") {
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./Macron_0.gif");
  }
}

Game.prototype.moveRight = function () {
  //secondPlayer.distanceTowardsWin -= 1;
  //firstPlayer.distanceTowardsWin += 1;
  var leftValue = $(".hand-img").css("left");
  leftValue = leftValue.substring(0, leftValue.length - 2);
  leftValue = parseInt(leftValue);
  leftValue += 65;
  //console.log("leftvalue", leftValue);
  $(".hand-img").css("left", leftValue + "px");
  this.positionHand += 1;
};

//move hand left
Game.prototype.moveLeft = function () {
  //secondPlayer.distanceTowardsWin -= 1;
  //firstPlayer.distanceTowardsWin += 1;
  var leftValue = $(".hand-img").css("left");
  leftValue = leftValue.substring(0, leftValue.length - 2);
  leftValue = parseInt(leftValue);
  leftValue -= 65;
  console.log("leftvalue", leftValue);
  $(".hand-img").css("left", leftValue + "px");
  this.positionHand -= 1;
  //   or Trump instance firstPlayer.distanceTowardsWin -= 1;
  //secondPlayer.distanceTowardsWin += 1;
};

Game.prototype.isGameWon = function () {
  if (this.positionHand === 4 || this.positionHand === -4) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.updateGifs = function () {
  if (this.positionHand === 2) {
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_2.gif");
    var imgLeft = $(".left-container-img");
    imgLeft.attr("src", "./Trump_2.gif");
  } else if (this.positionHand === 4) {
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_4.gif");
    var imgLeft = $(".left-container-img");
    imgLeft.attr("src", "./Trump_4.gif");
  } else if (this.positionHand === -4) {
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_-4.gif");
    var imgLeft = $(".left-container-img");
    imgLeft.attr("src", "./Trump_-4.gif");
  } else if (this.positionHand === -2) {
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_-2.gif");
    var imgLeft = $(".left-container-img");
    imgLeft.attr("src", "./Trump_-2.gif");
  } else if (this.positionHand === 0) {
    var imgLeft = $(".left-container-img");
    imgLeft.attr("src", "./Trump_0.gif");
    var imgRight = $(".right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_0.gif");
  }
};

Game.prototype.updateBoardWin = function () {
  console.log("is in update board function");
  $(".instructions-right").text("");
  $(".instructions-left").text("");
  this.playerFirst.keytoPress = -1;
  this.playerSecond.keytoPress = -1;
  if (this.playerFirst.hasWon) {
    console.log("is in player left has won condition");
    ///add container mit you won und den links display: yes
    $(".game-board").css({
      "background-image": "none",
      "transition": "background-image 2s"
    });
    $(".instructions-left").text("YOU WON");
    $(".hand-img").css("display", "none");
    //addClass( ".awkward-videos-container" );
  } else if (this.playerSecond.hasWon) {
    ///add container mit you won und den links display: yes
    $(".game-board").css({
      "background-image": "transparent",
      "transition": "background-image 2s"
    });
    $(".instructions-right").text("YOU WON");
    $(".hand-img").css("display", "none");
    //.addClass( ".sad-videos-container" );
  }
};

var keysRight = [
  { 79: "o" },
  { 80: "p" },
  { 75: "k" },
  { 76: "l" },
  { 192: "ö" }
];
var keysLeft = [
  { 83: "s" },
  { 68: "d" },
  { 89: "y" },
  { 88: "x" },
  { 67: "c" }
];

//make random key combination
Player.prototype.pickRandomKey = function () {
  var index = Math.floor(Math.random() * this.keys.length);
  return this.keys[index];
};

Player.prototype.updateKeys = function () {
  var nextKey = this.pickRandomKey();
  this.keytoPress = Object.keys(nextKey);
  console.log("nextKey", nextKey);
  console.log("nexktkeyvalue", Object.keys(nextKey));
  if (this.name === "Trump") {
    $(".instructions-left").text("Press " + Object.values(nextKey));
  } else {
    $(".instructions-right").text("Press " + Object.values(nextKey));
  }
};

$(document).ready(function () {
  var playerLeft = new Player("Trump", "left", keysLeft);
  var playerName = "";
  var playerName = $(".img-div").on('click', function () {
    playerName = this.getAttribute('id');
    localStorage.setItem('playerRight', playerName)

    console.log($(this).attr('id'));
    // playerName = $(this).attr('id');
    console.log("PLAYERNAMEINSIDEFUNCTION", playerName);
    // playerName = this.id;
    // console.log("PLAYERNAME IN CHOOSE PLAYER", playerName);
    // $("body").fadeOut(1000);
    window.location.href = './Gameboard.html';
    // $("body").css("display", "none");
    // $("body").fadeIn(1000);

    //var playerName = choosePlayer();
  });

  var playerRightFromLocalStorage = localStorage.getItem('playerRight')

  console.log("PLAYERNAME", playerName);
  var playerRight = new Player(playerRightFromLocalStorage, "right", keysRight);
  var newGame = new Game(playerLeft, playerRight);
  //var playerRight = new Player("Kim Jong-Un", "right", keysRight);
  newGame.initialiseGifs();
  playerLeft.updateKeys();
  playerRight.updateKeys();

  $(window).keydown(function (e) {
    console.log("event", e.which);
    console.log("playerleftkeytopress", playerLeft.keytoPress);
    if (e.which === parseInt(playerLeft.keytoPress)) {
      console.log("leftplayerpressed");
      newGame.moveLeft();
      newGame.updateGifs();
      if (newGame.isGameWon()) {
        playerLeft.hasWon = true;
        newGame.updateBoardWin();
        //return;
      } else {
        playerLeft.updateKeys();
        playerRight.updateKeys();
      }
    } else if (e.which === parseInt(playerRight.keytoPress)) {
      newGame.moveRight();
      newGame.updateGifs();
      if (newGame.isGameWon()) {
        playerRight.hasWon = true;
        newGame.updateBoardWin();
        //return;
      } else {
        playerLeft.updateKeys();
        playerRight.updateKeys();
      }
    }
  });
});
