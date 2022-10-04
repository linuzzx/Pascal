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

    mvs = mvs
            .replaceAll("Uw2", "y2 D2").replaceAll("Uw'", "y' D'").replaceAll("Uw", "y D")
            .replaceAll("Dw2", "y2 U2").replaceAll("Dw'", "y U'").replaceAll("Dw", "y' U")
            .replaceAll("Rw2", "x2 L2").replaceAll("Rw'", "x' L'").replaceAll("Rw", "x L")
            .replaceAll("Lw2", "x2 R2").replaceAll("Lw'", "x R'").replaceAll("Lw", "x' R")
            .replaceAll("Fw2", "z2 B2").replaceAll("Fw'", "z' B'").replaceAll("Fw", "z B")
            .replaceAll("Bw2", "z2 F2").replaceAll("Bw'", "z F'").replaceAll("Bw", "z' F")

            .replaceAll("M2", "x2 R2 L2").replaceAll("M'", "x R' L").replaceAll("M", "x' R L'")
            .replaceAll("S2", "z2 F2 B2").replaceAll("S'", "z' F B'").replaceAll("S", "z F' B")
            .replaceAll("E2", "y2 U2 D2").replaceAll("E'", "y U' D").replaceAll("E", "y' U D'")
            .replaceAll("x", "_x").replaceAll("y", "_y").replaceAll("z", "_z");
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
            .replaceAll("B", mainMoves[5].toLowerCase())
        ).toUpperCase().replaceAll("W", "w"));
    }

    return newMoves.join(" ").trim();
}

function removeUnwanted(val) {
    let arr = [];
    for (let v of val.split("")) {
        if (
            v.includes("R") || v.includes("L") || 
            v.includes("U") || v.includes("D") || 
            v.includes("F") || v.includes("B") ||
            v.includes("M") || v.includes("S") || v.includes("E") ||
            v.includes("x") || v.includes("y") || v.includes("z") ||
            v.includes("w") || v.includes("'") || v.includes("2") || v.includes(" ")
        ) {
            arr.push(v);
        }
    }
    $("#inpMoves").val(arr.join(""));
}