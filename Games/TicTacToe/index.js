let boardTiles = [2,2,2,2,2,2,2,2,2];
const moves = ["X","O",""];
let index = 0;
let players = 0;
let first = 0;
let finished = false;
let waiting = false;

$(function() {
    $("input[name=players][value='"+localStorage.getItem("selectedPlayers")+"']").prop("checked",true);
    $("input[name=first][value='"+localStorage.getItem("selectedFirst")+"']").prop("checked",true);
    adjustSize();
});

$(window).resize(function(){
    adjustSize();
});

function start() {
    reset();
    $("#btnStart").attr("disabled", true);
    $("input[type=radio]").attr("disabled", true);
    for (let b of $("#board button")) {
        $(b).attr("disabled", false);
    }
    selectPlayers();
    selectFirst();

    if (players === 1) {
        if (first === 1) {
            cpuMakeMove();
        }
        else if (first === 2) {
            first = Math.round(Math.random());
            if (first === 1) {
                cpuMakeMove();
            }
        }
    }
}

function chooseTile(tf, b) {
    if (!finished && !tf || !waiting) {
        if ($(b).text() === "") {
            $(b).text(moves[index % 2]);
    
            index++;
            checkIfWon();
        
            if (players === 1 && tf) {
                waiting = true;
                cpuMakeMove();
            }
        }
    }
}

function selectPlayers() {
    players = parseInt($("input[name=players]:checked", "#players").val());
    localStorage.setItem("selectedPlayers", parseInt($("input[name=players]:checked", "#players").val()));
}

function selectFirst() {
    first = parseInt($("input[name=first]:checked", "#first").val());
    localStorage.setItem("selectedFirst", parseInt($("input[name=first]:checked", "#first").val()));
}

function reset() {
    index = 0;
    finished = false;
    for (let b of $("#board button")) {
        $(b).text("");
    }
    $("#winner").text("");
}

function getBoardValues() {
    let i = 0;
    for (let b of $("#board button")) {
        boardTiles[i] = moves.indexOf($(b).text());
        i++;
    }
}

function cpuMakeMove() {
    // Minimax

    let possibleMoves = [];
    for (let b of $("#board button")) {
        if ($(b).text() === "") {
            possibleMoves.push(b);
        }
    }
    setTimeout(() => {
        chooseTile(false, $(possibleMoves[Math.floor(Math.random()*possibleMoves.length)]));
        waiting = false;
    }, 500);
}

function checkIfWon() {
    getBoardValues();
    
    let winner = "";

    if (boardTiles[0] === boardTiles[1] && boardTiles[0] === boardTiles[2] && boardTiles[0] !== 2) {
        winner = moves[boardTiles[0]] + " won!";
    }
    else if (boardTiles[3] === boardTiles[4] && boardTiles[3] === boardTiles[5] && boardTiles[3] !== 2) {
        winner = moves[boardTiles[3]] + " won!";
    }
    else if (boardTiles[6] === boardTiles[7] && boardTiles[6] === boardTiles[8] && boardTiles[6] !== 2) {
        winner = moves[boardTiles[6]] + " won!";
    }
    else if (boardTiles[0] === boardTiles[3] && boardTiles[0] === boardTiles[6] && boardTiles[0] !== 2) {
        winner = moves[boardTiles[0]] + " won!";
    }
    else if (boardTiles[1] === boardTiles[4] && boardTiles[1] === boardTiles[7] && boardTiles[1] !== 2) {
        winner = moves[boardTiles[1]] + " won!";
    }
    else if (boardTiles[2] === boardTiles[5] && boardTiles[2] === boardTiles[8] && boardTiles[2] !== 2) {
        winner = moves[boardTiles[2]] + " won!";
    }
    else if (boardTiles[0] === boardTiles[4] && boardTiles[0] === boardTiles[8] && boardTiles[0] !== 2) {
        winner = moves[boardTiles[0]] + " won!";
    }
    else if (boardTiles[2] === boardTiles[4] && boardTiles[2] === boardTiles[6] && boardTiles[2] !== 2) {
        winner = moves[boardTiles[2]] + " won!";
    }
    else if (index === 9) {
        winner = "Draw";
    }

    $("#winner").text(winner);

    if (winner !== "" || winner === "Draw") {
        finish();
    }
}

function finish() {
    $("#btnStart").attr("disabled", false);
    $("input[type=radio]").attr("disabled", false);

    for (let b of $("#board button")) {
        $(b).attr("disabled", true);
    }

    finished = true;
}

function adjustSize() {
    const size = $("#content").height() / 2;
    $("#board").css("width", size);
    $("#board").css("height", size);

    const fontSize = size / 6;
    $("#startDiv").css("width", size * 1.1);
    $("#btnStart").css("font-size", fontSize * 2 / 3);
    $("#board button").css("font-size", fontSize);
}

function printBoard() {
    getBoardValues();
    let str = boardTiles[0] + " " + boardTiles[1] + " " + boardTiles[2] + "\n" +
            boardTiles[3] + " " + boardTiles[4] + " " + boardTiles[5] + "\n" +
            boardTiles[6] + " " + boardTiles[7] + " " + boardTiles[8];
    
    console.log(str);
}