$(() => {
    draw333Svg('#svgCube', $("#inpScramble").val());

    adjustSize();
});

function solveCube(scr) {
    let start = Date.now();
    let w = new Worker("worker.js");
    $("#solution").html("");
    $("#searchDepth").html("");
    let step = 0;
    
    if (isValidScramble(scr)) {
        $("#inpScramble").prop('disabled', true);
        $("#btnSolve").prop('disabled', true);
        $("#btnScramble").prop('disabled', true);
        w.postMessage(scr);
        w.onmessage = e => {
            if (e.data.length === 3) {
                $("#solution").append("<h1>" + e.data[0] + "</h1>");
                draw333Svg("#svg_" + step, e.data[2]);
                scrollDown();
                adjustSize();
                step++;
            }
            else if (e.data[0] === 0) {
                $("#searchDepth").html("<h1><b>Time interuption</b></h1>");
                $("#inpScramble").prop('disabled', false);
                $("#btnSolve").prop('disabled', false);
                $("#btnScramble").prop('disabled', false);
            }
            else if (e.data[0] !== "Solved") {
                $("#searchDepth").html("<h1>Searching at depth " + e.data[0] + "</h1>");
            }
            else {
                $("#searchDepth").html("<h1>" + (Date.now() - start) + " ms</h1>");
                $("#inpScramble").prop('disabled', false);
                $("#btnSolve").prop('disabled', false);
                $("#btnScramble").prop('disabled', false);
            }
        }
    }
}

function isValidScramble(scr) {
    return scr.trim() !== "";
}

function scrollDown() {
    const element = document.getElementsByTagName("body")[0].parentElement;
    element.scrollTop = element.scrollHeight;
}

function adjustSize() {
    $("svg").height(3 * $("#svgCube").width() / 4);
    $("#inpScramble").css("font-size", "3vh");
    $("button").css("font-size", "3vh");
}