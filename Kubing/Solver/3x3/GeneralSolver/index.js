let step = "0";
$(() => {
    drawScrambleNxN('#svgCube', 3, $("#inpScramble").val());

    adjustSize();
});

function solveCube(scramble) {
    solve(scramble, getSolution, $("#inpEndState").val());
}

function getSolution(solution) {
    console.log(solution);
    if (solution === -1) {
        $("#solution").html("<h1>Illegal end state</h1>");
    }
}

function solve(scramble, callback, endState = "wwwwwwwwwooooooooogggggggggrrrrrrrrrbbbbbbbbbyyyyyyyyy") {
    let worker = new Worker("./worker.js");
    worker.postMessage([scramble, endState]);
    worker.onmessage = e => {
        callback(e.data);
    }
}

function logSolution(solution) {
    console.log(solution);
}

function adjustSize() {
    $("#inpScramble, #inpEndState").css("font-size", "3vh");
    $("button").css("font-size", "3vh");
}