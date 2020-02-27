function Game(playerFirst, playerSecond) {
    this.positionHand = 0; ///max is 4 or -4!
    this.playerFirst = playerFirst;
    this.playerSecond = playerSecond;
    this.isWon = false;
}

Game.prototype.initialiseGifs = function () {
    var imgLeft = $("#left-container-img");
    imgLeft.attr("src", "./img/gifs/trump_0.gif");
    var imgRight = $("#right-container-img");
    imgRight.attr("src", "./img/gifs/" + this.playerSecond.name + "_0.gif");  //++
}

Game.prototype.moveRight = function () {
    var leftValue = $(".hand-img").css("left");
    leftValue = leftValue.substring(0, leftValue.length - 2);
    leftValue = parseInt(leftValue);
    leftValue += 65;
    $(".hand-img").css("left", leftValue + "px");
    this.positionHand += 1;
};

//move hand left
Game.prototype.moveLeft = function () {
    var leftValue = $(".hand-img").css("left");
    leftValue = leftValue.substring(0, leftValue.length - 2);
    leftValue = parseInt(leftValue);
    leftValue -= 65;
    $(".hand-img").css("left", leftValue + "px");
    this.positionHand -= 1;
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
        imgRight.attr("src", "./img/gifs/" + this.playerSecond.name + "_2.gif");   //++
        var imgLeft = $("#left-container-img");
        imgLeft.attr("src", "./img/gifs/trump_2.gif");   //++
    } else if (this.positionHand === 4) {
        var imgRight = $("#right-container-img");
        imgRight.attr("src", "./img/gifs/" + this.playerSecond.name + "_4.gif");  //++
        var imgLeft = $("#left-container-img");
        imgLeft.attr("src", "./img/gifs/trump_4.gif");   //++
    } else if (this.positionHand === -4) {
        var imgRight = $("#right-container-img");
        imgRight.attr("src", "./img/gifs/" + this.playerSecond.name + "_-4.gif");   //++
        var imgLeft = $("#left-container-img");
        imgLeft.attr("src", "./img/gifs/trump_-4.gif");   //++
    } else if (this.positionHand === -2) {
        var imgRight = $("#right-container-img");
        imgRight.attr("src", "./img/gifs/" + this.playerSecond.name + "_-2.gif");    //++
        var imgLeft = $("#left-container-img");
        imgLeft.attr("src", "./img/gifs/trump_-2.gif");   //++
    } else if (this.positionHand === 0) {
        var imgLeft = $("#left-container-img");
        imgLeft.attr("src", "./img/gifs/trump_0.gif");    //++
        var imgRight = $("#right-container-img");
        imgRight.attr("src", "./img/gifs/" + this.playerSecond.name + "_0.gif");  //++
    }
};

Game.prototype.updateBoardWin = function () {
    $(".instructions-right").text("");
    $(".instructions-left").text("");
    this.playerFirst.keytoPress = -1;
    this.playerSecond.keytoPress = -1;
    if (this.playerFirst.hasWon) {
        $(".game-board").css({
            "background-image": "none",
            "transition": "background-image 1s"
        });
        $('.awkward-gifs').css("display", "-webkit-box");
        $(".instructions-left").text("YOU WON");
        $(".hand-img").css("display", "none");
    } else if (this.playerSecond.hasWon) {
        ///add container mit you won und den links display: yes
        $(".game-board").css({
            "background-image": "url(./img/flags/" + this.playerSecond.name + ".png)",
            "transition": "background-image 2s"
        });
        $(".instructions-right").text("YOU WON");
        $(".hand-img").css("display", "none");
    }
};

Game.prototype.updateKeys = function () {
    this.playerFirst.updateKeys();
    this.playerSecond.updateKeys();
}

Game.prototype.updateBoard = function (player) {
    if (this.playerFirst.hasWon || this.playerSecond.hasWon) {
        return;
    }
    if (player === this.playerFirst) {
        this.moveLeft();
    }
    else {
        this.moveRight();
    }
    this.updateGifs();
    if (this.isGameWon()) {
        if (player === this.playerFirst) {
            this.playerFirst.hasWon = true;
        }
        else {
            this.playerSecond.hasWon = true;
        }
        this.updateBoardWin();
        $("button").css("display", "-webkit-box");
    }
    else {
        this.updateKeys();
    }
}



