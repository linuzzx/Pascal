const allMoves = ["U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2"];
let moves = allMoves.slice();

function getMovesWithoutRotations(mvs) {
    mvs.replaceAll("x", "_x").replaceAll("y", "_y").replaceAll("z", "_z");
    let rotations = mvs.split("_");
}

function numberify(mvs) {
    mvs.replaceAll("B2", 17).replaceAll("B'", 16).replaceAll("B", 15)
    .replaceAll("F2", 14).replaceAll("F'", 13).replaceAll("F", 12)
    .replaceAll("L2", 11).replaceAll("L'", 10).replaceAll("L", 9)
    .replaceAll("R2", 8).replaceAll("R'", 7).replaceAll("R", 6)
    .replaceAll("D2", 5).replaceAll("D'", 4).replaceAll("D", 3)
    .replaceAll("U2", 2).replaceAll("U'", 1).replaceAll("U", 0);
}

function rotate(rot) {
    switch (rot) {
        case "x":
            moves.join(" ")
            .replaceAll("B", "U")
            .replaceAll("F", "D")
            .replaceAll("D", "B")
            .replaceAll("U", "F")
            .split(" ");
            break;
        case "x'":
            moves.join(" ")
            .replaceAll("B", "D")
            .replaceAll("F", "U")
            .replaceAll("D", "F")
            .replaceAll("U", "B")
            .split(" ");
            break;
        case "x2":
            moves.join(" ")
            .replaceAll("B", "F")
            .replaceAll("F", "B")
            .replaceAll("D", "U")
            .replaceAll("U", "D")
            .split(" ");
            break;
        case "y":
            moves.join(" ")
            .replaceAll("B", "L")
            .replaceAll("F", "R")
            .replaceAll("L", "F")
            .replaceAll("R", "B")
            .split(" ");
            break;
        case "y'":
            moves.join(" ")
            .replaceAll("B", "R")
            .replaceAll("F", "L")
            .replaceAll("L", "B")
            .replaceAll("R", "F")
            .split(" ");
            break;
        case "y2":
            moves.join(" ")
            .replaceAll("B", "F")
            .replaceAll("F", "B")
            .replaceAll("L", "R")
            .replaceAll("R", "L")
            .split(" ");
            break;
        case "z":
            moves.join(" ")
            .replaceAll("L", "D")
            .replaceAll("R", "U")
            .replaceAll("D", "R")
            .replaceAll("U", "L")
            .split(" ");
            break;
        case "z'":
            moves.join(" ")
            .replaceAll("L", "U")
            .replaceAll("R", "D")
            .replaceAll("D", "L")
            .replaceAll("U", "R")
            .split(" ");
            break;
        case "z2":
            moves.join(" ")
            .replaceAll("L", "R")
            .replaceAll("R", "L")
            .replaceAll("D", "U")
            .replaceAll("U", "D")
            .split(" ");
            break;
    }
}