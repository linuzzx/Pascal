let boardTiles = [2,2,2,2,2,2,2,2,2];
const moves = ["X","O",""];
let index = 0;
let players = 0;
let first = 0;
let difficulty = 0;
let finished = false;
let waiting = false;
let startEnd = (4,4);

$(function() {
    $("input[name=players][value='"+localStorage.getItem("selectedPlayers")+"']").prop("checked",true);
    $("input[name=first][value='"+localStorage.getItem("selectedFirst")+"']").prop("checked",true);
    $("input[name=difficulty][value='"+localStorage.getItem("selectedDifficulty")+"']").prop("checked",true);
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
    $("#line").css("width","0");
    $("#line").css("height","0");

    selectPlayers();
    selectFirst();
    selectDifficulty();

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
    localStorage.setItem("selectedPlayers", players);
}

function selectFirst() {
    first = parseInt($("input[name=first]:checked", "#first").val());
    localStorage.setItem("selectedFirst", first);
}

function selectDifficulty() {
    difficulty = parseInt($("input[name=difficulty]:checked", "#difficulty").val());
    localStorage.setItem("selectedDifficulty", difficulty);
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
    if (difficulty === 0) {
        cpuRandom();
    }
    else {
        cpuMiniMax();
    }
}

function cpuRandom() {
    let possibleMoves = [];
    for (let b of $("#board button")) {
        if ($(b).text() === "") {
            possibleMoves.push(b);
        }
    }
    setTimeout(() => {
        chooseTile(false, $(possibleMoves[Math.floor(Math.random()*possibleMoves.length)]));
        waiting = false;
    }, 250);
}

function cpuMiniMax() {
    //Fjern denne
    cpuRandom();
}

function checkIfWon() {
    getBoardValues();
    
    let winner = "";

    if (boardTiles[0] === boardTiles[1] && boardTiles[0] === boardTiles[2] && boardTiles[0] !== 2) {
        winner = moves[boardTiles[0]] + " won!";
        startEnd = [0,2];
    }
    else if (boardTiles[3] === boardTiles[4] && boardTiles[3] === boardTiles[5] && boardTiles[3] !== 2) {
        winner = moves[boardTiles[3]] + " won!";
        startEnd = [3,5];
    }
    else if (boardTiles[6] === boardTiles[7] && boardTiles[6] === boardTiles[8] && boardTiles[6] !== 2) {
        winner = moves[boardTiles[6]] + " won!";
        startEnd = [6,8];
    }
    else if (boardTiles[0] === boardTiles[3] && boardTiles[0] === boardTiles[6] && boardTiles[0] !== 2) {
        winner = moves[boardTiles[0]] + " won!";
        startEnd = [0,6];
    }
    else if (boardTiles[1] === boardTiles[4] && boardTiles[1] === boardTiles[7] && boardTiles[1] !== 2) {
        winner = moves[boardTiles[1]] + " won!";
        startEnd = [1,7];
    }
    else if (boardTiles[2] === boardTiles[5] && boardTiles[2] === boardTiles[8] && boardTiles[2] !== 2) {
        winner = moves[boardTiles[2]] + " won!";
        startEnd = [2,8];
    }
    else if (boardTiles[0] === boardTiles[4] && boardTiles[0] === boardTiles[8] && boardTiles[0] !== 2) {
        winner = moves[boardTiles[0]] + " won!";
        startEnd = [0,8];
    }
    else if (boardTiles[2] === boardTiles[4] && boardTiles[2] === boardTiles[6] && boardTiles[2] !== 2) {
        winner = moves[boardTiles[2]] + " won!";
        startEnd = [2,6];
    }
    else if (index === 9) {
        winner = "Draw";
    }

    $("#winner").text(winner);

    if (winner !== "" || winner === "Draw") {
        if (winner !== "Draw") {
            drawLine(startEnd);
        }
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

    if (finished) {
        drawLine(startEnd);
    }
}

function printBoard() {
    getBoardValues();
    let str = boardTiles[0] + " " + boardTiles[1] + " " + boardTiles[2] + "\n" +
            boardTiles[3] + " " + boardTiles[4] + " " + boardTiles[5] + "\n" +
            boardTiles[6] + " " + boardTiles[7] + " " + boardTiles[8];
    
    console.log(str);
}

function drawLine(stend) {
    const start = stend[0];
    const end = stend[1];
    
    const startButton = $("#btn"+start);
    const endButton = $("#btn"+end);
    const buttonSize = $("#btn"+start).height();
    const line = $("#line");
    const sTop = startButton.position().top;
    const eTop = endButton.position().top;
    const sLeft = startButton.position().left;
    const eLeft = endButton.position().left;

    let rotation = 0;//sTop < eTop && sLeft < eLeft ? 45 : (sTop < eTop && sLeft > eLeft ? 315 : (sTop < eTop && sLeft === eLeft ? 90 : 0));
    let top = 0;//(sTop < eTop ? sTop : eTop) + 0.5*buttonSize - 0.5*$(line).height();
    let left = 0;//(sLeft < eLeft ? sLeft : (sLeft > eLeft ? eLeft : (sLeft+eLeft)/2)) + 0.5*buttonSize - 0.5*$(line).height();
    let width = 0;//sTop === eTop || sLeft === eLeft ? 2*buttonSize : 4*Math.sqrt(buttonSize*buttonSize*0.5);
    let height = buttonSize / 10;
    const borderRadius = buttonSize / 4;

    if (start === 0 && end === 2 || start === 3 && end === 5 || start === 6 && end === 8) {
        top = sTop + 0.5*buttonSize;
        left = sLeft + 0.5*buttonSize;
        width = 2*buttonSize;
    }
    else if (start === 0 && end === 6 || start === 1 && end === 7 || start === 2 && end === 8) {
        top = sTop + 0.5*buttonSize;
        left = sLeft + 0.5*buttonSize;
        width = height;
        height = 2*buttonSize;
    }
    else if (start === 0 && end === 8) {
        top = $("#btn4").position().top + 0.5*buttonSize;
        left = sLeft + 0.5*buttonSize;
        width = 4*Math.sqrt(buttonSize*buttonSize*0.5);
        rotation = 45;
    }
    else if (start === 2 && end === 6) {
        top = $("#btn4").position().top + 0.5*buttonSize;
        left = eLeft + 0.5*buttonSize;
        width = 4*Math.sqrt(buttonSize*buttonSize*0.5);
        rotation = 315;
    }

    $(line).css("top",top);
    $(line).css("left",left);
    $(line).css("width",width);
    $(line).css("height",height);
    $(line).css("border-radius",borderRadius);
    $(line).css("transform","rotate("+rotation+"deg)");
    $(line).css("-webkit-transform","rotate("+rotation+"deg)");
}