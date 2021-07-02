var p1;
var p2;
var p1icon;
var p2icon;
var playersNames = 0;

function result1() {
  p1 = document.getElementById("p1").value;
  p1icon = document.getElementById("p1-icon").value;
  playersNames++;
  console.log(p1icon);
}

function result2() {
  p2 = document.getElementById("p2").value;
  p2icon = document.getElementById("p2-icon").value;
  playersNames++;
  console.log(p2 + " " + playersNames);
}

var mode = 1;
var turnCounter = -1;
var board = [
  ["1","4","7"],
  ["2","5","8"],
  ["3","6","9"]
];

//night-mode

$(".mode-btn").click(function() {
  mode++;
  if (mode%2 == 0) {
    document.body.style.backgroundColor = "#222831";
    $(".box").removeClass("box-light");
    $(".box").addClass("box-dark");
    $(".mode-btn").removeClass("btn-outline-dark");
    $(".mode-btn").addClass("btn-outline-light");
    $(".mode-btn").html("<i class='fas fa-sun'></i>");
    $(".reload-btn").removeClass("btn-outline-dark");
    $(".reload-btn").addClass("btn-outline-light");

  } else {
    document.body.style.backgroundColor = "#dcd6f7";
    $(".box").removeClass("box-dark");
    $(".box").addClass("box-light");
    $(".mode-btn").addClass("btn-outline-dark");
    $(".mode-btn").removeClass("btn-outline-light");
    $(".mode-btn").html("<i class='fas fa-moon'></i>");
    $(".reload-btn").addClass("btn-outline-dark");
    $(".reload-btn").removeClass("btn-outline-light");
  }

})

// turnos
function turn() {
  if (turnCounter%2 == 0) {
    $(".title").html("It's "+ p1 +"'s turn");
  } else {
    $(".title").html("It's "+ p2 +"'s turn");
  }
}

//reset Game
function reset() {
  mode = 1;
  board = [
    ["1","4","7"],
    ["2","5","8"],
    ["3","6","9"]
  ];
  $(".game-over").animate({top: '-40%'});
  $(".box-content").html("");
  $(".game-board").removeClass("transparent");
  $(".game-over").addClass("hidden");
}

//check if someone won
function check(board,num) {
  if (turnCounter>=4) {
    if ((board[0][0] == board[0][1] && board[0][2] == board[0][0])
    || (board[1][0] == board[1][1] && board[1][2] == board[1][0])
    || (board[2][0] == board[2][1] && board[2][2] == board[2][0])
    || (board[0][0] == board[1][0] && board[1][0] == board[2][0])
    || (board[0][1] == board[1][1] && board[1][1] == board[2][1])
    || (board[0][2] == board[1][2] && board[1][2] == board[2][2])
    || (board[0][0] == board[1][1] && board[1][1] == board[2][2])
    || (board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
      if (num == 1) {
        $(".title").html(p1 + " won! <br> Press any key to play again.");
      } else {
        $(".title").html(p2 + " won! <br> Press any key to play again.");
      }

      turnCounter = -1;
      $(".game-board").addClass("transparent");
      $(".game-over").removeClass("hidden");
      $(".game-over").animate({
        top: '40%'
      },"slow")
    }
    else if (turnCounter == 9) {
      $(".title").html("It's a draw! <br>Press any key to play again.");
      turnCounter = -1;
      $(".game-board").addClass("transparent");
      $(".game-over").removeClass("hidden");
      $(".game-over").animate({
        top: '40%'
      },"slow")
    }
  }
}

//register move on board
function makeMove(pos,player) {
  for(var i=0;i<board.length;i++) {
    for(var j =0;j<board[i].length;j++) {
      if (board[i][j] === pos) {
        board[i][j] = player;
        return 1;
      }
    }
  }
}

//start the game
$(document).on("keypress",function() {
  if (turnCounter == -1 && playersNames == 2) {
    reset();
    $(".player-1").addClass("hidden");
    $(".player-2").addClass("hidden");
    $(".title").html("It's "+p1 + "'s turn");
    turnCounter++;
  }
})


$(".box").click(function() {
  if (turnCounter > -1) {
    var userMove = String(this.id);
    var selectedBox = "box-content-" + userMove;
    turnCounter++;
    turn();
    if (turnCounter%2 != 0) {
      makeMove(userMove,"X");
      $("." + selectedBox).html(p1icon);
      check(board,"1");
    }
    else {
      makeMove(userMove,"O");
      $("." + selectedBox).html(p2icon);
      check(board,"2");
    }
  }
})
