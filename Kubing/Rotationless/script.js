function getMovesWithoutRotations(mvs) {
    let mainMoves = ["U", "D", "R", "L", "F", "B"];
    
    function doRotation(m, rot) {
        switch (rot) {
            case "x":
                m = m
                .replaceAll(mainMoves[5], mainMoves[0].toLowerCase())
                .replaceAll(mainMoves[4], mainMoves[1].toLowerCase())
                .replaceAll(mainMoves[1], mainMoves[5].toLowerCase())
                .replaceAll(mainMoves[0], mainMoves[4].toLowerCase());
                break;
            case "x'":
                m = m
                .replaceAll(mainMoves[5], mainMoves[1].toLowerCase())
                .replaceAll(mainMoves[4], mainMoves[0].toLowerCase())
                .replaceAll(mainMoves[1], mainMoves[4].toLowerCase())
                .replaceAll(mainMoves[0], mainMoves[5].toLowerCase());
                break;
            case "x2":
                m = m
                .replaceAll(mainMoves[5], mainMoves[4].toLowerCase())
                .replaceAll(mainMoves[4], mainMoves[5].toLowerCase())
                .replaceAll(mainMoves[1], mainMoves[0].toLowerCase())
                .replaceAll(mainMoves[0], mainMoves[1].toLowerCase());
                break;
            case "y":
                m = m
                .replaceAll(mainMoves[5], mainMoves[3].toLowerCase())
                .replaceAll(mainMoves[4], mainMoves[2].toLowerCase())
                .replaceAll(mainMoves[3], mainMoves[4].toLowerCase())
                .replaceAll(mainMoves[2], mainMoves[5].toLowerCase());
                break;
            case "y'":
                m = m
                .replaceAll(mainMoves[5], mainMoves[2].toLowerCase())
                .replaceAll(mainMoves[4], mainMoves[3].toLowerCase())
                .replaceAll(mainMoves[3], mainMoves[5].toLowerCase())
                .replaceAll(mainMoves[2], mainMoves[4].toLowerCase());
                break;
            case "y2":
                m = m
                .replaceAll(mainMoves[5], mainMoves[4].toLowerCase())
                .replaceAll(mainMoves[4], mainMoves[5].toLowerCase())
                .replaceAll(mainMoves[3], mainMoves[2].toLowerCase())
                .replaceAll(mainMoves[2], mainMoves[3].toLowerCase());
                break;
            case "z":
                m = m
                .replaceAll(mainMoves[3], mainMoves[1].toLowerCase())
                .replaceAll(mainMoves[2], mainMoves[0].toLowerCase())
                .replaceAll(mainMoves[1], mainMoves[2].toLowerCase())
                .replaceAll(mainMoves[0], mainMoves[3].toLowerCase());
                break;
            case "z'":
                m = m
                .replaceAll(mainMoves[3], mainMoves[0].toLowerCase())
                .replaceAll(mainMoves[2], mainMoves[1].toLowerCase())
                .replaceAll(mainMoves[1], mainMoves[3].toLowerCase())
                .replaceAll(mainMoves[0], mainMoves[2].toLowerCase());
                break;
            case "z2":
                m = m
                .replaceAll(mainMoves[3], mainMoves[2].toLowerCase())
                .replaceAll(mainMoves[2], mainMoves[3].toLowerCase())
                .replaceAll(mainMoves[1], mainMoves[0].toLowerCase())
                .replaceAll(mainMoves[0], mainMoves[1].toLowerCase());
                break;
        }
    
        return m.toUpperCase();
    }

    mvs = mvs.replaceAll("x", "_x").replaceAll("y", "_y").replaceAll("z", "_z");
    let newMoves = [];
    if (mvs.split("_")[0].trim() !== "") {
        newMoves.push(mvs.split("_")[0].trim());
    }
    for (let r of mvs.split("_").slice(1)) {
        let rot = r.split(" ")[0];
        let rest = r.split(" ").slice(1).join(" ").trim();
        mainMoves = doRotation(mainMoves.slice().join(" "), rot).split(" ");
        newMoves.push((rest
            .replaceAll("U", mainMoves[0].toLowerCase())
            .replaceAll("D", mainMoves[1].toLowerCase())
            .replaceAll("R", mainMoves[2].toLowerCase())
            .replaceAll("L", mainMoves[3].toLowerCase())
            .replaceAll("F", mainMoves[4].toLowerCase())
            .replaceAll("B", mainMoves[5].toLowerCase())).toUpperCase());
    }
    
    return newMoves.join(" ").replaceAll("W", "w").trim();
}