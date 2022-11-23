let step = "0";
let start;
let scrambles;
let solutions;
$(() => {
    solutions = [];
    adjustSize();
});

function invertAll(scr) {
    scrambles = scr.split("\n").filter(s => s.trim() !== "");
    let invertedScrambles = [];
    
    for (let s of scrambles) {
        invertedScrambles.push(cleanMoves(inverseAlg(s)));
    }

    $("#taSolutions").val(invertedScrambles.join("\n"));
}

function cleanMoves(moves) {
    moves = moves.trim();
    moves = moves.replaceAll(" ", ";");

    while (moves.includes(";;")) {
        moves = moves.replaceAll(";;", ";");
    }

    return moves.replaceAll(";", " ");
}

function adjustSize() {
    $("button").css("font-size", "3vh");
}