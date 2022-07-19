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
    let g1, g2;
    
    if (isValidScramble(scr)) {
        $("#inpScramble").prop('disabled', true);
        $("#btnSolve").prop('disabled', true);
        $("#btnScramble").prop('disabled', true);
        w.postMessage(scr);
        w.onmessage = e => {
            if (e.data[0] === "G1") {
                g1 = e.data[1];
                g1 !== "" ? $("#solution").append("<h1><b>G1:</b> " + g1 + "</h1><div><svg class='svgStep' id='svg_eo'></svg></div>") : "";
                g1 !== "" ? draw333Svg("#svg_eo", [scr, g1].filter(s => {return s !== ""}).join(" ")) : "";
                scrollDown();
                adjustSize();
                step++;
            }
            else if (e.data[0] === "G2") {
                g2 = e.data[1];
                g2 !== "" ? $("#solution").append("<h1><b>G2:</b> " + g2 + "</h1><div><svg class='svgStep' id='svg_dr'></svg></div>") : "";
                g2 !== "" ? draw333Svg("#svg_dr", [scr, g1, g2].filter(s => {return s !== ""}).join(" ")) : "";
                scrollDown();
                adjustSize();
                step++;
                $("#searchDepth").html("<h1>" + (Date.now() - start) + " ms</h1>");
                $("#inpScramble").prop('disabled', false);
                $("#btnSolve").prop('disabled', false);
                $("#btnScramble").prop('disabled', false);
            }
            else if (e.data[0] === "Depth") {
                $("#searchDepth").html("<h1>Searching at depth " + e.data[1] + "</h1>");
            }
            else if (e.data[0] === 0) {
                $("#searchDepth").html("<h1><b>Time interuption</b></h1>");
                $("#inpScramble").prop('disabled', false);
                $("#btnSolve").prop('disabled', false);
                $("#btnScramble").prop('disabled', false);
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