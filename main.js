var playerName;
var playerRight;
var playerLeft;
var newGame;

$(document).ready(function () {
  $(".img-div").on('click', function () {
    playerName = this.getAttribute('id');
    // playerName = $(this).attr('id');
    // playerName = this.id;
    // $("body").fadeOut(1000);
    $(".animated-container").css("opacity", "0");
    playerRight = new Player(playerName);
    playerLeft = new Player("Trump");
    setTimeout(function () {
      $("#first-screen").toggle();
      $("#second-screen").toggle();
      newGame = new Game(playerLeft, playerRight);
      newGame.initialiseGifs();
    }, 1000);
    // $("body").css("display", "none");
    // $("body").fadeIn(1000);
  });


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
      $("#right-container-img").attr("src", "./Gifs/" + playerRight.name + "_0.gif"); //++
      $("#left-container-img").attr("src", "./Gifs/Trump_0.gif");   //++
      $(".game-board").css({
        "background-image": "url(./938635868-612x612.jpg)",
        "transition": "color 0s"
      });
      playerLeft.updateKeys();
      playerRight.updateKeys();
      playerLeft.hasWon = false;
      playerRight.hasWon = false;
    }
    else {
      window.location.href = './Start_ChoosePlayer.html';
    }
  });

  $(window).keydown(function (e) {
    if (e.which === parseInt(playerLeft.keytoPress)) {
      newGame.updateBoard(playerLeft);
    }
    else if (playerLeft.keysArraykeys.includes(e.which)) {    ///keysLeftKeys.includes(e.which)
      newGame.updateBoard(playerRight);
    }
    else if (e.which === parseInt(playerRight.keytoPress)) {
      newGame.updateBoard(playerRight);
    }
    else if (playerRight.keysArraykeys.includes(e.which)) {
      console.log("playerrightpressdwrongkey")
      newGame.updateBoard(playerLeft);
    }
  });
});
