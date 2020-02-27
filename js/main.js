var playerName;
var playerRight;
var playerLeft;
var newGame;

$(document).ready(function () {
  $(".img-div").on('click', function () {
    playerName = this.getAttribute('id');
    $(".animated-container").css("opacity", "0");
    playerRight = new Player(playerName);
    playerLeft = new Player("trump");
    setTimeout(function () {
      $("#first-screen").toggle();
      $("#second-screen").toggle();
      newGame = new Game(playerLeft, playerRight);
      newGame.initialiseGifs();
    }, 1000);
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
      $("#right-container-img").attr("src", "./img/gifs/" + playerRight.name + "_0.gif"); //++
      $("#left-container-img").attr("src", "./img/gifs/trump_0.gif");   //++
      $(".game-board").css({
        "background-image": "url(./img/fight-ring.jpg)",
        "transition": "color 0s"
      });
      playerLeft.updateKeys();
      playerRight.updateKeys();
      playerLeft.hasWon = false;
      playerRight.hasWon = false;
    }
    else {
      window.location.href = './index.html';
    }
  });

  $(window).keydown(function (e) {
    if (e.which === parseInt(playerLeft.keytoPress)) {
      newGame.updateBoard(playerLeft);
    }
    else if (playerLeft.keysArraykeys.includes(e.which)) {
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
