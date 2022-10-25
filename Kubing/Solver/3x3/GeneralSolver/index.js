let step = "0";
let start;
$(() => {
    drawScrambleNxN('#svgCube', 3, $("#inpScramble").val());

    adjustSize();
});

function solveCube(scramble) {
    start = Date.now();
    solve(scramble, getSolution, $("#inpEndState").val());
}

function getSolution(solution) {
    if (solution[0] === 1) {
        let sol = removeRedundantMoves(solution[1]);
        $("#solution").html("<h1><b>Solution:</b> " + sol + "</h1><h1><b>Moves:</b> " + sol.split(" ").length + "</h1><br>");
        $("#searchDepth").html("<h1>" + (Date.now() - start) + " ms</h1>");
    }
    else if (solution[0] === 0) {
        $("#solution").html("<h1>" + solution[1] + "</h1>");
        $("#searchDepth").html("");
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