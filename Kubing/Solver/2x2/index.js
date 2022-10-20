let cube2x2 = "164145153136263235254246".split("");
let cleanCube2x2 = "164145153136263235254246".split("");
let moves = ["R", "R2", "R'", "U", "U2", "U'", "F", "F2", "F'"];
let scramble = "";

$(() => {
    drawScrambleNxN("#svgCube", 2, "");
});

function scrambleCube(scr) {
    scramble = scr;
    doTurns(scr);
    drawScrambleNxN("#svgCube", 2, scr);
}

function resetCubeState() {
    cube2x2 = "164145153136263235254246".split("");
}

function solveCube() {
    let solution = "";
    outerloop : while (!isSolved()) {
        let state = getState2x2(scramble);
        let ind = solutions2x2.findIndex(s => s.state === state);
        if (ind !== -1) {
            solution = cleanMoves(scramble + " " + solutions2x2[ind].solution);
            break outerloop;
        }
        let solLength = 1;
        let arr = moves.slice();
        while (ind === -1) {
            if (solLength === 1) {
                for (let m of arr) {
                    state = getState2x2(scramble + " " + m);
                    ind = solutions2x2.findIndex(s => s.state === state);
                    if (ind !== -1) {
                        solution = cleanMoves(scramble + " " + m + " " + solutions2x2[ind].solution);
                        break outerloop;
                    }
                }
            }
            else {
                let tArr = arr.slice();
                for (let m1 of arr) {
                    let prevMove = m1.split(" ")[m1.split(" ").length - 1][0];
                    for (let m2 of moves.filter(m => {return m[0] !== prevMove})) {
                        tArr.push(m1 + " " + m2);
                        state = getState2x2(scramble + " " + m1 + " " + m2);
                        ind = solutions2x2.findIndex(s => s.state === state);
                        if (ind !== -1) {
                            solution = cleanMoves(scramble + " " + m1 + " " + m2 + " " + solutions2x2[ind].solution);
                            break outerloop;
                        }
                    }
                }
                arr = tArr.slice();
            }
            solLength++;
        }
    }
    console.log("Solution:", solution)
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

function isSolved() {
    return ((
        cube2x2[0] + cube2x2[3] + cube2x2[9] + cube2x2[6] +
        cube2x2[1] + cube2x2[11] + cube2x2[10] + cube2x2[8] +
        cube2x2[7] + cube2x2[5] + cube2x2[4] + cube2x2[2] +
        cube2x2[23] + cube2x2[13] + cube2x2[14] + cube2x2[16] +
        cube2x2[17] + cube2x2[19] + cube2x2[20] + cube2x2[22] +
        cube2x2[12] + cube2x2[15] + cube2x2[21] + cube2x2[18]
    ) === cleanCube2x2);
}

function getState2x2(mvs) {
    resetCubeState();
    doTurns(mvs);

    return (
        cube2x2[0] + cube2x2[3] + cube2x2[9] + cube2x2[6] +
        cube2x2[1] + cube2x2[11] + cube2x2[10] + cube2x2[8] +
        cube2x2[7] + cube2x2[5] + cube2x2[4] + cube2x2[2] +
        cube2x2[23] + cube2x2[13] + cube2x2[14] + cube2x2[16] +
        cube2x2[17] + cube2x2[19] + cube2x2[20] + cube2x2[22] +
        cube2x2[12] + cube2x2[15] + cube2x2[21] + cube2x2[18]
    );
}

function printNiceCube() {
    let niceCube = "&nbsp;&nbsp;" + cube2x2[0] + cube2x2[3] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[9] + cube2x2[6] + "<br/>" +
                    cube2x2[1] + cube2x2[11] + cube2x2[10] + cube2x2[8] + cube2x2[7] + cube2x2[5] + cube2x2[4] + cube2x2[2] + "<br/>" +
                    cube2x2[23] + cube2x2[13] + cube2x2[14] + cube2x2[16] + cube2x2[17] + cube2x2[19] + cube2x2[20] + cube2x2[22] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[12] + cube2x2[15] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[21] + cube2x2[18];

    $("#drawCube").html(niceCube);
}