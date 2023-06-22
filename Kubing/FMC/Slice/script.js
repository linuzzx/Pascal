let steps = {};

$(() => {
    $("#scramble").on("change", () => {
        $("einar-drawscramble").attr("scramble", $("#scramble").text());
    })
    $("#scramble").text(getScrambleSlice()).change();
});

function nextScramble() {
    $("#scramble").text(getScrambleSlice()).change();
}

function getScrambleSlice() {
    let rotations = ["", "x'", "x", "x2", "y'", "y", "y2", "z'", "z", "z2", "y' x'", "y x'", "y2 x'", "z' x'", "z x'", "z2 x'", "y' x", "y x", "z' x", "z x", "y' x2", "y x2", "z' x2", "z x2"];
    let rot = rotations[Math.floor(Math.random() * rotations.length)];
    let slices = ["R2 E R2 E'", "E2 R2 E2 R2", "R2 U2 R2 U2 R2 U2"];
    let slice = slices[Math.floor(Math.random() * slices.length)];
    let scr = [rot, slice].join(" ");
    let movesDR = ["U", "U'", "U2", "D", "D'", "D2", "R2", "L2", "F2", "B2"];
    let movesHTR = ["U2", "D2", "R2", "L2", "F2", "B2"];
    let dr = [];
    let htr = [];

    let rDR = 5 + Math.floor(Math.random() * 6);
    let rHTR = 5 + Math.floor(Math.random() * 6);

    getMoves(htr, movesHTR, rHTR);
    getMoves(dr, movesDR, rDR);
    
    scr = [scr, htr.join(" "), dr.join(" ")].join(" ");
    console.log(scr);
    console.log(rot);
    console.log(slice);

    scr = removeRedundantMoves(getMovesWithoutRotations(scr.trim()))

    $("#skeleton").text(inverseAlg(removeRedundantMoves(getMovesWithoutRotations([rot, htr.join(" "), dr.join(" ")].join(" ")))));

    return scr;
}

function getMoves(arr, moves, n) {
    for (let i = 0; i < n; i++) {
        let again = false;
        let move = moves[Math.floor(Math.random() * moves.length)];
        if (arr.length >= 1) {
            if (move === arr[i - 1]) {
                i--;
                again = true;
            }
        }
        if (arr.length >= 2) {
            if (getOpp(move.split("")[0]) === arr[i - 1].split("")[0] && move === arr[i - 2]) {
                i--;
                again = true;
            }
        }

        if (!again) {
            arr.push(move);
        }
    }
}

function getOpp(m) {
    switch (m) {
        case "U":
            return "D";
        case "D":
            return "U";
        case "R":
            return "L";
        case "L":
            return "R";
        case "F":
            return "B";
        case "B":
            return "F";
    }
}