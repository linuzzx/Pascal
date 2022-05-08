$(() => {
    draw333Svg('#svgCube', $("#inpScramble").val());

    adjustSize();
});

function solveCube(scr) {
    let w = new Worker("worker.js");
    
    if (isValidScramble(scr)) {
        w.postMessage(scr);
        w.onmessage = e => {
            if (e.data.length === 2) {
                $("#solution").html("<h1>" + e.data[0] + "</h1>");
            }
            else if (e.data[0] === 0) {
                $("#searchDepth").html("<h1><b>Time interuption</b></h1>");
            }
            else if (e.data[0] !== "Solved") {
                $("#searchDepth").html("<h1>Searching at depth " + e.data[0] + "</h1>");
            }
            else {
                $("#searchDepth").html("");
            }
        }
    }
}

function isValidScramble(scr) {
    return scr.trim() !== "";
}

function adjustSize() {
    $("#svgCube").height(3 * $("#svgCube").width() / 4);
    $("#inpScramble").css("font-size", "3vh");
    $("#btnSolve").css("font-size", "3vh");
}