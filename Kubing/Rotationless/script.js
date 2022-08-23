let allMoves = ["u", "d", "r", "l", "f", "b"];

function getMovesWithoutRotations(mvs) {
    /* for (let i = 0; i < mvs.split(" ").length; i++) {
        let rot = mvs.split(" ")[i];
        if (rot.includes("x") || rot.includes("y") || rot.includes("z")) {
            let old = mvs.split(" ").slice(0, i).join(" ").trim();
            let rest = mvs.split(" ").slice(i + 1).join(" ").trim();console.log(rot);
            allMoves = rotate(allMoves.join(" "), rot, true).split(" ");
            mvs = old + " " + rotate(rest, rot);
            console.log(mvs);
        }
    } */
    mvs = mvs.replaceAll("x", "_x").replaceAll("y", "_y").replaceAll("z", "_z");
    let newMoves = [];
    for (let r of mvs.split("_").slice(1)) {
        let rot = r.split(" ")[0];
        let rest = r.split(" ").slice(1).join(" ").trim();
        allMoves = rotate(allMoves.slice().join(" ").toUpperCase(), rot, true).split(" ");
        newMoves.push(rotate(rest, rot));
    }

    return newMoves.join(" ");
}

function rotate(m, rot, arr = false) {
    switch (rot) {
        case "x":
            m = m
            .replaceAll("B", allMoves[0])
            .replaceAll("F", allMoves[1])
            .replaceAll("D", allMoves[5])
            .replaceAll("U", allMoves[4]);
            break;
        case "x'":
            m = m
            .replaceAll("B", allMoves[1])
            .replaceAll("F", allMoves[0])
            .replaceAll("D", allMoves[4])
            .replaceAll("U", allMoves[5]);
            break;
        case "x2":
            m = m
            .replaceAll("B", allMoves[4])
            .replaceAll("F", allMoves[5])
            .replaceAll("D", allMoves[0])
            .replaceAll("U", allMoves[1]);
            break;
        case "y":
            m = m
            .replaceAll("B", allMoves[3])
            .replaceAll("F", allMoves[2])
            .replaceAll("L", allMoves[4])
            .replaceAll("R", allMoves[5]);
            break;
        case "y'":
            m = m
            .replaceAll("B", allMoves[2])
            .replaceAll("F", allMoves[3])
            .replaceAll("L", allMoves[5])
            .replaceAll("R", allMoves[4]);
            break;
        case "y2":
            m = m
            .replaceAll("B", allMoves[4])
            .replaceAll("F", allMoves[5])
            .replaceAll("L", allMoves[2])
            .replaceAll("R", allMoves[3]);
            break;
        case "z":
            m = m
            .replaceAll("L", allMoves[1])
            .replaceAll("R", allMoves[0])
            .replaceAll("D", allMoves[2])
            .replaceAll("U", allMoves[3]);
            break;
        case "z'":
            m = m
            .replaceAll("L", allMoves[0])
            .replaceAll("R", allMoves[1])
            .replaceAll("D", allMoves[3])
            .replaceAll("U", allMoves[2]);
            break;
        case "z2":
            m = m
            .replaceAll("L", allMoves[2])
            .replaceAll("R", allMoves[3])
            .replaceAll("D", allMoves[0])
            .replaceAll("U", allMoves[1]);
            break;
    }

    return arr ? m.toLowerCase() : m
        .replaceAll("u", "U")
        .replaceAll("d", "D")
        .replaceAll("r", "R")
        .replaceAll("l", "L")
        .replaceAll("f", "F")
        .replaceAll("b", "B");
}