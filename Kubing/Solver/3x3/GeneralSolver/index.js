let step = "0";
$(() => {
    drawScrambleNxN('#svgCube', 3, $("#inpScramble").val());

    adjustSize();
});

function solveCube(scramble) {
    solve(scramble, getSolution);
}

function getSolution(solution) {
    console.log(solution);
}

function solve(scramble, callback, endState = "111111111666666666333333333555555555444444444222222222") {
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
    $("#inpScramble").css("font-size", "3vh");
    $("button").css("font-size", "3vh");
}