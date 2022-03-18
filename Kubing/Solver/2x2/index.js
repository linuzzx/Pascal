let cube2x2 = "wwwwooooggggrrrrbbbbyyyy".split("");
let moves = ["R", "R2", "R'", "U", "U2", "U'", "F", "F2", "F'"];

function resetCubeState() {
    cube2x2 = "wwwwooooggggrrrrbbbbyyyy".split("");
}

function moveR() {
    let tempCube = cube2x2.slice();

    //Right slice
    tempCube[1] = cube2x2[9];
    tempCube[2] = cube2x2[10];
    tempCube[9] = cube2x2[21];
    tempCube[10] = cube2x2[22];
    tempCube[21] = cube2x2[19];
    tempCube[22] = cube2x2[16];
    tempCube[19] = cube2x2[1];
    tempCube[16] = cube2x2[2];
    //Right side
    tempCube[12] = cube2x2[15];
    tempCube[13] = cube2x2[12];
    tempCube[14] = cube2x2[13];
    tempCube[15] = cube2x2[14];

    cube2x2 = tempCube.slice();

    printNiceCube()
}

function moveU() {
    let tempCube = cube2x2.slice();

    //Up slice
    tempCube[4] = cube2x2[8];
    tempCube[5] = cube2x2[9];
    tempCube[8] = cube2x2[12];
    tempCube[9] = cube2x2[13];
    tempCube[12] = cube2x2[16];
    tempCube[13] = cube2x2[17];
    tempCube[16] = cube2x2[4];
    tempCube[17] = cube2x2[5];
    //Up side
    tempCube[0] = cube2x2[3];
    tempCube[1] = cube2x2[0];
    tempCube[2] = cube2x2[1];
    tempCube[3] = cube2x2[2];

    cube2x2 = tempCube.slice();

    printNiceCube()
}

function moveF() {
    let tempCube = cube2x2.slice();

    //Front slice
    tempCube[5] = cube2x2[20];
    tempCube[6] = cube2x2[21];
    tempCube[3] = cube2x2[5];
    tempCube[2] = cube2x2[6];
    tempCube[12] = cube2x2[3];
    tempCube[15] = cube2x2[2];
    tempCube[20] = cube2x2[12];
    tempCube[21] = cube2x2[15];
    //Front side
    tempCube[8] = cube2x2[11];
    tempCube[9] = cube2x2[8];
    tempCube[10] = cube2x2[9];
    tempCube[11] = cube2x2[10];

    cube2x2 = tempCube.slice();

    printNiceCube()
}

function doTurns(turns) {
    for (let t of turns.trim().split(" ")) {
        switch (t) {
            case "R":
                moveR();
                break;
            case "R2":
                moveR();
                moveR();
                break;
            case "R'":
                moveR();
                moveR();
                moveR();
                break;
            case "U":
                moveU();
                break;
            case "U2":
                moveU();
                moveU();
                break;
            case "U'":
                moveU();
                moveU();
                moveU();
                break;
            case "F":
                moveF();
                break;
            case "F2":
                moveF();
                moveF();
                break;
            case "F'":
                moveF();
                moveF();
                moveF();
                break;
        }
    }
}

function solve() {
    let scrambledState = cube2x2.slice();

    if (isSolved()) {
        $("#solution").text("Solved!");
        return;
    }
    for (let i = 0; i < permutationList.length; i++) {
        $("#solution").text("Solving at depth " + (i + 1));
        cube2x2 = scrambledState.slice();

        for (let p of permutationList[i]) {
            doTurns(p);
            if (isSolved()) {
                $("#solution").text(p);

                cube2x2 = scrambledState.slice();
                printNiceCube();
                return;
            }
        }
    }
}

function isSolved() {
    for (let i = 0; i < 24; i+=4) {
        if (!cube2x2.slice(i, i + 4).every((val, ind, arr) => val === arr[0])) {
            return false;
        }
    }

    return true;
}

function printNiceCube() {
    let niceCube = "&nbsp;&nbsp;" + cube2x2[0] + cube2x2[1] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[3] + cube2x2[2] + "<br/>" +
                    cube2x2[4] + cube2x2[5] + cube2x2[8] + cube2x2[9] + cube2x2[12] + cube2x2[13] + cube2x2[16] + cube2x2[17] + "<br/>" +
                    cube2x2[7] + cube2x2[6] + cube2x2[11] + cube2x2[10] + cube2x2[15] + cube2x2[14] + cube2x2[19] + cube2x2[18] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[20] + cube2x2[21] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[23] + cube2x2[22];

    $("#drawCube").html(niceCube);
}

printNiceCube()