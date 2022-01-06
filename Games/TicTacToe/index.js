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
            checkIfWon(boardTiles);
        
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
    //cpuRandom();
    let possibleMoves = [];
    let tempBoard = $("#board button");
    let ai = first === 0? "X": "O";
    let i = 0;
    let score = 0;
    let bestScore = 0;
    let nextMove;

    for (let b of tempBoard) {
        if ($(b).text() === "") {
            $(b).text() = ai;
            //minimax
            score = minimax(tempBoard, 0, false);
            $(b).text() = "";
        }
        i++;
    }
    console.log(possibleMoves);
    for (let p of possibleMoves) {

    }
}

function minimax(board, depth, isMaximizing) {
    let score = 0;

    return score;
}

function isGameOver(b) {
    let winner = "";

    if (b[0] === b[1] && b[0] === b[2] && b[0] !== 2) {
        winner = moves[b[0]];
        startEnd = [0,2];
    }
    else if (b[3] === b[4] && b[3] === b[5] && b[3] !== 2) {
        winner = moves[b[3]];
        startEnd = [3,5];
    }
    else if (b[6] === b[7] && b[6] === b[8] && b[6] !== 2) {
        winner = moves[b[6]];
        startEnd = [6,8];
    }
    else if (b[0] === b[3] && b[0] === b[6] && b[0] !== 2) {
        winner = moves[b[0]];
        startEnd = [0,6];
    }
    else if (b[1] === b[4] && b[1] === b[7] && b[1] !== 2) {
        winner = moves[b[1]];
        startEnd = [1,7];
    }
    else if (b[2] === b[5] && b[2] === b[8] && b[2] !== 2) {
        winner = moves[b[2]];
        startEnd = [2,8];
    }
    else if (b[0] === b[4] && b[0] === b[8] && b[0] !== 2) {
        winner = moves[b[0]];
        startEnd = [0,8];
    }
    else if (b[2] === b[4] && b[2] === b[6] && b[2] !== 2) {
        winner = moves[b[2]];
        startEnd = [2,6];
    }
    else if (!b.includes("")) {
        winner = "Draw";
    }

    return winner !== "";
}

function checkIfWon(b) {
    getBoardValues();
    
    let winner = "";

    if (b[0] === b[1] && b[0] === b[2] && b[0] !== 2) {
        winner = moves[b[0]];
        startEnd = [0,2];
    }
    else if (b[3] === b[4] && b[3] === b[5] && b[3] !== 2) {
        winner = moves[b[3]];
        startEnd = [3,5];
    }
    else if (b[6] === b[7] && b[6] === b[8] && b[6] !== 2) {
        winner = moves[b[6]];
        startEnd = [6,8];
    }
    else if (b[0] === b[3] && b[0] === b[6] && b[0] !== 2) {
        winner = moves[b[0]];
        startEnd = [0,6];
    }
    else if (b[1] === b[4] && b[1] === b[7] && b[1] !== 2) {
        winner = moves[b[1]];
        startEnd = [1,7];
    }
    else if (b[2] === b[5] && b[2] === b[8] && b[2] !== 2) {
        winner = moves[b[2]];
        startEnd = [2,8];
    }
    else if (b[0] === b[4] && b[0] === b[8] && b[0] !== 2) {
        winner = moves[b[0]];
        startEnd = [0,8];
    }
    else if (b[2] === b[4] && b[2] === b[6] && b[2] !== 2) {
        winner = moves[b[2]];
        startEnd = [2,6];
    }
    else if (index === 9) {
        winner = "Draw";
        $("#winner").text(winner);
    }

    if (winner !== "" || winner === "Draw") {
        if (winner !== "Draw") {
            $("#winner").text(winner + " won!");
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