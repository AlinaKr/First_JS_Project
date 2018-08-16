var playerName;
var playerRight;
var playerLeft;
var newGame;

$(document).ready(function () {
  //var playerLeft = new Player("Trump", "left", keysLeft);
  $(".img-div").on('click', function () {
    playerName = this.getAttribute('id');
    // playerName = $(this).attr('id');
    // playerName = this.id;
    // $("body").fadeOut(1000);
    $(".animated-container").css("opacity", "0");
    playerRight = new Player(playerName, "right");
    playerLeft = new Player("Trump", "left");
    setTimeout(function () {
      //$(".animated-container2").css("opacity", "1")
      $("#first-screen").toggle();
      $("#second-screen").toggle();
      //window.location.href = './Gameboard.html';
      newGame = new Game(playerLeft, playerRight);
      newGame.initialiseGifs();
    }, 1000);
    // $("body").css("display", "none");
    // $("body").fadeIn(1000);
  });

  //playerRight = new Player(playerRightFromLocalStorage, "right", keysRight);

  $("button").on('click', function () {
    if ($(this).attr('class') === "button-fair") {
      playerRight.setLevel(keysRight);
      playerLeft.setLevel(keysLeft);
      newGame.updateKeys();
      $(".level-container").css("display", "none");

    }
    else if ($(this).attr('class') === "button-trump") {
      playerRight.setLevel(keysRightLevelTrump);
      playerLeft.setLevel(keysLeftLevelTrump);
      newGame.updateKeys();
      // playerRight = new Player(playerRightFromLocalStorage, "right", keysRightLevelTrump, keysRightKeysTrump);
      //playerLeft = new Player("Trump", "left", keysLeftLevelTrump, keysLeftKeysTrump);
      //localStorage.setItem('playerRight', playerRight);
      //localStorage.setItem('playerLeft', playerLeft);
      $(".level-container").css("display", "none");
    }
    else if ($(this).attr('class') === "button-try") {
      $(".hand-img").css({
        "display": "block",
        "top": "200px",
        "left": "260px"
      });
      $('.awkward-gifs').css("display", "none");
      newGame.positionHand = 0;
      $("#right-container-img").attr("src", "./" + playerRight.name + "_0.gif");
      $("#left-container-img").attr("src", "./Trump_0.gif");
      $(".game-board").css({
        "background-image": "url(./938635868-612x612.jpg)",
        "transition": "color 0s"
      });
      playerLeft.updateKeys();
      playerRight.updateKeys();
      playerLeft.hasWon = false;
      playerRight.hasWon = false;
      //location.reload();

      //recenter the hands
      //remove flag
      //reset gifs
    }
    else {
      window.location.href = './Start_ChoosePlayer.html';
    }
  });

  // playerLeft.updateKeys();
  // playerRight.updateKeys();

  $(window).keydown(function (e) {
    if (e.which === parseInt(playerLeft.keytoPress)) {
      newGame.updateBoard(playerLeft);
      // console.log("e.which", e.which);
      // //pass leftplayerinfunction
      // newGame.moveLeft();
      // //setTimeout(function () {
      // newGame.updateGifs();
      // //}, 1000);
      // if (newGame.isGameWon()) {
      //   playerLeft.hasWon = true;
      //   newGame.updateBoardWin();
      //   $("button").css("display", "-webkit-box");
      //   //return;
      // } else {
      //   newGame.updateKeys();
      //   // playerLeft.updateKeys();
      //   // playerRight.updateKeys();
      // }
    }
    else if (playerLeft.keysArraykeys.includes(e.which)) {    ///keysLeftKeys.includes(e.which)
      newGame.updateBoard(playerRight);
      // console.log("playerleftpressedwrongkey");
      // //passrightplayerinfunction
      // newGame.moveRight();
      // newGame.updateGifs();
      // if (newGame.isGameWon()) {
      //   playerRight.hasWon = true;
      //   newGame.updateBoardWin();
      //   $("button").css("display", "-webkit-box");
      // } else {
      //   newGame.updateKeys();
      //   // playerLeft.updateKeys();
      //   // playerRight.updateKeys();
      // }
    }
    else if (e.which === parseInt(playerRight.keytoPress)) {
      newGame.updateBoard(playerRight);
      // console.log("second else if");
      // //passrightplayerinfunction
      // newGame.moveRight();
      // newGame.updateGifs();
      // if (newGame.isGameWon()) {
      //   playerRight.hasWon = true;
      //   newGame.updateBoardWin();
      //   $("button").css("display", "-webkit-box");
      // } else {
      //   newGame.updateKeys();
      //   // playerLeft.updateKeys();
      //   // playerRight.updateKeys();
      // }
    }
    else if (playerRight.keysArraykeys.includes(e.which)) {    ///war die variable bevor
      console.log("playerrightpressdwrongkey")
      newGame.updateBoard(playerLeft);
      // ///pass leftplayer in function
      // newGame.moveLeft();
      // //setTimeout(function () {
      // newGame.updateGifs();
      // //}, 1000);
      // if (newGame.isGameWon()) {
      //   playerLeft.hasWon = true;
      //   newGame.updateBoardWin();
      //   $("button").css("display", "-webkit-box");
      // } else {
      //   newGame.updateKeys();
      //   // playerLeft.updateKeys();
      //   // playerRight.updateKeys();
      // }
    }
  });


  // $("button").on('click', function () {
  //   if ($(this).attr('class') === "button-try") {
  //     location.reload();
  //   }
  //   else {
  //     window.location.href = './Start_ChoosePlayer.html';
  //   }
  // });
});
