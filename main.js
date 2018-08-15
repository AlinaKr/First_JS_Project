function Player(name, direction, keys) {
  this.name = name;
  this.direction = direction;
  this.keys = keys;
  this.keytoPress = "";
  this.distanceTowardsWin = 6;
  this.hasWon = false;
  this.blocked = false;
}

function Game(playerFirst, playerSecond) {
  this.positionHand = 0; ///max is 4 or -4!
  this.playerFirst = playerFirst;
  this.playerSecond = playerSecond;
  this.isWon = false;
}

Game.prototype.initialiseGifs = function () {
  var imgLeft = $("#left-container-img");
  imgLeft.attr("src", "./Trump_0.gif");
  if (this.playerSecond.name === "Jong-un") {
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./Jong-un_0.gif");
  }
  else if (this.playerSecond.name === "Merkel") {
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./Merkel_0.gif");
  }
  else if (this.playerSecond.name === "Putin") {
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./Putin_0.gif");
  }
  else if (this.playerSecond.name === "Macron") {
    var imgRight = $("#right-container-img");
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
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_2.gif");
    var imgLeft = $("#left-container-img");
    imgLeft.attr("src", "./Trump_2.gif");
  } else if (this.positionHand === 4) {
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_4.gif");
    var imgLeft = $("#left-container-img");
    imgLeft.attr("src", "./Trump_4.gif");
  } else if (this.positionHand === -4) {
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_-4.gif");
    var imgLeft = $("#left-container-img");
    imgLeft.attr("src", "./Trump_-4.gif");
  } else if (this.positionHand === -2) {
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_-2.gif");
    var imgLeft = $("#left-container-img");
    imgLeft.attr("src", "./Trump_-2.gif");
  } else if (this.positionHand === 0) {
    var imgLeft = $("#left-container-img");
    imgLeft.attr("src", "./Trump_0.gif");
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./" + this.playerSecond.name + "_0.gif");
  }
};

Game.prototype.updateBoardWin = function () {
  $(".instructions-right").text("");
  $(".instructions-left").text("");
  this.playerFirst.keytoPress = -1;
  this.playerSecond.keytoPress = -1;
  if (this.playerFirst.hasWon) {
    ///add container mit you won und den links display: yes
    $(".game-board").css({
      "background-image": "none",
      "transition": "background-image 1s"
    });
    $('.awkward-gifs').css("display", "-webkit-box");
    $(".instructions-left").text("YOU WON");
    $(".hand-img").css("display", "none");
    //addClass( ".awkward-videos-container" );
  } else if (this.playerSecond.hasWon) {
    ///add container mit you won und den links display: yes
    $(".game-board").css({
      "background-image": "url(./Flags/" + this.playerSecond.name + ".png)",
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
  { 192: "ö" },
  { 186: "ü" },
  { 222: "ä" },
  { 73: "letter in alphabet before j" },
  { 57: "result of 198/22" }
];

var keysRightKeys = keysRight.map(function (el) {
  return Object.keys(el);
});

var keysLeft = [
  { 83: "s" },
  { 68: "d" },
  { 89: "y" },
  { 88: "x" },
  { 67: "c" },
  { 65: "a" },
  { 70: "f" },
  { 87: "letter in alphabet at POS 23" },
  { 52: "result of 68/17" }
];

var keysLeftKeys = keysLeft.map(function (el) {
  return Object.keys(el);
});

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

$(document).ready(function () {
  var playerLeft = new Player("Trump", "left", keysLeft);
  var playerName = "";
  $(".img-div").on('click', function () {
    playerName = this.getAttribute('id');
    localStorage.setItem('playerRight', playerName)
    // playerName = $(this).attr('id');
    // playerName = this.id;
    // $("body").fadeOut(1000);
    $(".animated-container").css("opacity", "0");
    setTimeout(function () {
      //$(".animated-container2").css("opacity", "1")
      window.location.href = './Gameboard.html';
    }, 1000);

    // $("body").css("display", "none");
    // $("body").fadeIn(1000);
  });

  var playerRightFromLocalStorage = localStorage.getItem('playerRight')

  var playerRight = new Player(playerRightFromLocalStorage, "right", keysRight);
  var newGame = new Game(playerLeft, playerRight);
  newGame.initialiseGifs();
  console.log("GIFs initiallized")
  playerLeft.updateKeys();
  playerRight.updateKeys();

  $(window).keydown(function (e) {
    if (e.which === parseInt(playerLeft.keytoPress)) {
      console.log("KEYSRIGHTKEYS", keysRightKeys);
      console.log("KEYLEFTEKYS", keysLeftKeys);
      console.log("OBJECTKEYS", Object.values(playerLeft.keys));
      //if (!(playerLeft.blocked)) {
      newGame.moveLeft();
      setTimeout(function () {
        newGame.updateGifs();
      }, 1000);
      if (newGame.isGameWon()) {
        playerLeft.hasWon = true;
        newGame.updateBoardWin();
        $("button").css("display", "-webkit-box");
        //return;
      } else {
        playerLeft.updateKeys();
        playerRight.updateKeys();
      }
      //}
      // else {
      //   playerLeft.blocked = false;
      // }
    }
    // else if (keysLeftKeys.includes(e.which).toString()) {
    //   console.log("I am here");
    //   //playerLeft.blocked = true;
    // }
    else if (e.which === parseInt(playerRight.keytoPress)) {
      //if (!(playerRight.blocked)) {
      newGame.moveRight();
      newGame.updateGifs();
      if (newGame.isGameWon()) {
        playerRight.hasWon = true;
        newGame.updateBoardWin();
        $("button").css("display", "-webkit-box");
        //return;
      } else {
        playerLeft.updateKeys();
        playerRight.updateKeys();
      }
      //}
      // else {
      //   playerRight.blocked = false;
      // }
    }
    // else if (keysRightKeys.includes(e.which).toString()) {
    //   console.log("I am here too");
    //   //playerRight.blocked = true;
    // }
  });


  $("button").on('click', function () {
    if ($(this).attr('class') === "button-try") {
      location.reload();
    }
    else {
      window.location.href = './Start_ChoosePlayer.html';
    }
  });
});
