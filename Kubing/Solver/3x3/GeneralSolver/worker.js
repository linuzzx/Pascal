let scramble;
let startState;
let endState;
let solvedCubeState = "wwwwwwwwwooooooooogggggggggrrrrrrrrrbbbbbbbbbyyyyyyyyy";
let centers = [1, 2, 3, 4, 5, 6];
let corners = [1, 2, 3, 4, 5, 6, 7, 8];
let edges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// ubl ubr ufl ufr dfl dfr dbl dbr
// ub ul ur uf df dl dr db fl fr br bl

onmessage = e => {
    scramble = e.data[0];
    endState = e.data[1];

    // startState = getState(scramble);
    
    solve();
}

function solve() {
    let solution = "";
    getState(scramble);

    if (endState !== solvedCubeState) {
        convertState();
    }

    if (validateState(endState)) {

        postMessage(solution);
    }
    else {
        postMessage(-1);
    }
}

function validateState(state) {
    let arr = state.split("");
    let valid = true;

    return valid;
}

function resetState() {
    centers = [1, 2, 3, 4, 5, 6];
    corners = [1, 2, 3, 4, 5, 6, 7, 8];
    edges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (endState !== solvedCubeState) {
        convertState();
    }
}

function getState(moves) {
    resetState();
    for (let m of moves.split(" ")) {
        move(m);
    }
    
    printState();
}

function convertState() {
    let endStateArr = endState.split("");
    let uFace = endStateArr.substring(0, 9);
    let lFace = endStateArr.substring(9, 18);
    let fFace = endStateArr.substring(18, 27);
    let rFace = endStateArr.substring(27, 36);
    let bFace = endStateArr.substring(36, 45);
    let dFace = endStateArr.substring(45, 54);

    let convCenters = [uFace[4], lFace[4], fFace[4], rFace[4], bFace[4], dFace[4]];
    let convCorners = [
        identifyCorner([uFace[0], lFace[0], bFace[2]]), [uFace[2], bFace[0], rFace[2]], [uFace[6], fFace[0], lFace[2]], [uFace[8], rFace[0], fFace[2]],
        [dFace[0], lFace[8], fFace[6]], [dFace[2], fFace[8], rFace[6]], [dFace[6], bFace[8], lFace[6]], [dFace[8], rFace[8], bFace[6]]
    ];
    let convEdges = [];
}

function identifyCenter(ce) {
    switch(ce) {
        case "w":
            return 1;
        case "o":
            return 2;
        case "g":
            return 3;
        case "r":
            return 4;
        case "b":
            return 5;
        case "y":
            return 6;
    }
}

function identifyCorner(c) {console.log(c);
    let cp, co;
    if (c.includes("w") && c.includes("o") && c.includes("b")) {
        cp = 1;
        co = 100 * c.indexOf("w");
    }
    else if (c.includes("w") && c.includes("b") && c.includes("r")) {
        cp = 2;
        co = 100 * c.indexOf("w");
    }
    else if (c.includes("w") && c.includes("g") && c.includes("o")) {
        cp = 3;
        co = 100 * c.indexOf("w");
    }
    else if (c.includes("w") && c.includes("r") && c.includes("g")) {
        cp = 4;
        co = 100 * c.indexOf("w");
    }
    else if (c.includes("y") && c.includes("o") && c.includes("g")) {
        cp = 5;
        co = 100 * c.indexOf("y");
    }
    else if (c.includes("y") && c.includes("g") && c.includes("r")) {
        cp = 6;
        co = 100 * c.indexOf("y");
    }
    else if (c.includes("y") && c.includes("b") && c.includes("o")) {
        cp = 7;
        co = 100 * c.indexOf("y");
    }
    else if (c.includes("y") && c.includes("r") && c.includes("b")) {
        cp = 8;
        co = 100 * c.indexOf("y");
    }
    return cp + co;
}

function identifyEdge(e) {

}

function printState() {
    let cube = 
                                                            "    " + c(corners[0]) + e(edges[0]) + c(corners[1]) + "\n" + 
                                                            "    " + e(edges[1]) + ce(centers[0]) + e(edges[2]) + "\n" + 
                                                            "    " + c(corners[2]) + e(edges[3]) + c(corners[3]) + "\n" +
    c(corners[0], 1) + e(edges[1], 1) + c(corners[2], 2) + " "      + c(corners[2], 1) + e(edges[3], 1) + c(corners[3], 2) + " "        + c(corners[3], 1) + e(edges[2], 1) + c(corners[1], 2) + " "        + c(corners[1], 1) + e(edges[0], 1) + c(corners[0], 2) + "\n" +
    e(edges[11], 1) + ce(centers[1]) + e(edges[8], 1) + " "         + e(edges[8]) + ce(centers[2]) + e(edges[9]) + " "                  + e(edges[9], 1) + ce(centers[3]) + e(edges[10], 1) + " "           + e(edges[10]) + ce(centers[4]) + e(edges[11]) + "\n" +
    c(corners[6], 2) + e(edges[5], 1) + c(corners[4], 1) + " "      + c(corners[4], 2) + e(edges[4], 1) + c(corners[5], 1) + " "        + c(corners[5], 2) + e(edges[6], 1) + c(corners[7], 1) + " "        + c(corners[7], 2) + e(edges[7], 1) + c(corners[6], 1) + "\n" +
                                                            "    " + c(corners[4]) + e(edges[4]) + c(corners[5]) + "\n" + 
                                                            "    " + e(edges[5]) + ce(centers[5]) + e(edges[6]) + "\n" + 
                                                            "    " + c(corners[6]) + e(edges[7]) + c(corners[7]);

    function ce(n) {
        switch(n) {
            case 1:
                return "w";
            case 2:
                return "o";
            case 3:
                return "g";
            case 4:
                return "r";
            case 5:
                return "b";
            case 6:
                return "y";
        }
    }

    function c(n, r = 0) {
        let arr = [];
        switch(n % 100) {
            case 1:
                arr = ["w", "o", "b"];
                break;
            case 2:
                arr = ["w", "b", "r"];
                break;
            case 3:
                arr = ["w", "g", "o"];
                break;
            case 4:
                arr = ["w", "r", "g"];
                break;
            case 5:
                arr = ["y", "o", "g"];
                break;
            case 6:
                arr = ["y", "g", "r"];
                break;
            case 7:
                arr = ["y", "b", "o"];
                break;
            case 8:
                arr = ["y", "r", "b"];
                break;
        }
        
        return arr[(r + Math.floor(n / 100)) % 3];
    }

    function e(n, r = 0) {
        let arr = [];
        switch(n % 100) {
            case 1:
                arr = ["w", "b"];
                break;
            case 2:
                arr = ["w", "o"];
                break;
            case 3:
                arr = ["w", "r"];
                break;
            case 4:
                arr = ["w", "g"];
                break;
            case 5:
                arr = ["y", "g"];
                break;
            case 6:
                arr = ["y", "o"];
                break;
            case 7:
                arr = ["y", "r"];
                break;
            case 8:
                arr = ["y", "b"];
                break;
            case 9:
                arr = ["g", "o"];
                break;
            case 10:
                arr = ["g", "r"];
                break;
            case 11:
                arr = ["b", "r"];
                break;
            case 12:
                arr = ["b", "o"];
                break;
        }
        
        return arr[(r + Math.floor(n / 100)) % 2];
    }
    console.log(cube);
}

function move(m) {
    switch(m) {
        case "R":
            _r();
        break;
        case "R2":
        case "R2'":
            _r2();
            break;
        case "R'":
            _ri();
            break;
        case "L":
            _l();
            break;
        case "L2":
        case "L2'":
            _l2();
            break;
        case "L'":
            _li();
            break;
        case "F":
            _f();
            break;
        case "F2":
        case "F2'":
            _f2();
            break;
        case "F'":
            _fi();
            break;
        case "B":
            _b();
            break;
        case "B2":
        case "B2'":
            _b2();
            break;
        case "B'":
            _bi();
            break;
        case "U":
            _u();
            break;
        case "U2":
        case "U2'":
            _u2();
            break;
        case "U'":
            _ui();
            break;
        case "D":
            _d();
            break;
        case "D2":
        case "D2'":
            _d2();
            break;
        case "D'":
            _di();
            break;
        case "x":
            _x();
            break;
        case "x2":
        case "x2'":
            _x2();
            break;
        case "x'":
            _xi();
            break;
        case "y":
            _y();
            break;
        case "y2":
        case "y2'":
            _y2();
            break;
        case "y'":
            _yi();
            break;
        case "z":
            _z();
            break;
        case "z2":
        case "z2'":
            _z2();
            break;
        case "z'":
            _zi();
            break;
        case "M":
            _m();
            break;
        case "M2":
        case "M2'":
            _m2();
            break;
        case "M'":
            _mi();
            break;
        case "S":
            _s();
            break;
        case "S2":
        case "S2'":
            _s2();
            break;
        case "S'":
            _si();
            break;
        case "E":
            _e();
            break;
        case "E2":
        case "E2'":
            _e2();
            break;
        case "E'":
            _ei();
            break;
        case "Uw":
            _uw();
            break;
        case "Uw2":
        case "Uw2'":
            _uw2();
            break;
        case "Uw'":
            _uwi();
            break;
        case "Dw":
            _dw();
            break;
        case "Dw2":
        case "Dw2'":
            _dw2();
            break;
        case "Dw'":
            _dwi();
            break;
        case "Fw":
            _fw();
            break;
        case "Fw2":
        case "Fw2'":
            _fw2();
            break;
        case "Fw'":
            _fwi();
            break;
        case "Bw":
            _bw();
            break;
        case "Bw2":
        case "Bw2'":
            _bw2();
            break;
        case "Bw'":
            _bwi();
            break;
        case "Rw":
            _rw();
            break;
        case "Rw2":
        case "Rw2'":
            _rw2();
            break;
        case "Rw'":
            _rwi();
            break;
        case "Lw":
            _lw();
            break;
        case "Lw2":
        case "Lw2'":
            _lw2();
            break;
        case "Lw'":
            _lwi();
            break;
    }
}

function _r() {
    let tempC = corners.slice();
    let tempE = edges.slice();

    corners[1] = tempC[3] % 100 + ((200 + tempC[3] - tempC[3] % 100) % 300);
    corners[3] = tempC[5] % 100 + ((100 + tempC[5] - tempC[5] % 100) % 300);
    corners[5] = tempC[7] % 100 + ((200 + tempC[7] - tempC[7] % 100) % 300);
    corners[7] = tempC[1] % 100 + ((100 + tempC[1] - tempC[1] % 100) % 300);

    edges[2] = tempE[9];
    edges[9] = tempE[6];
    edges[6] = tempE[10];
    edges[10] = tempE[2];
}
function _r2() {
    _r();
    _r();
}
function _ri() {
    _r();
    _r();
    _r();
}
function _l() {
    let tempC = corners.slice();
    let tempE = edges.slice();

    corners[0] = tempC[6] % 100 + ((100 + tempC[6] - tempC[6] % 100) % 300);
    corners[2] = tempC[0] % 100 + ((200 + tempC[0] - tempC[0] % 100) % 300);
    corners[4] = tempC[2] % 100 + ((100 + tempC[2] - tempC[2] % 100) % 300);
    corners[6] = tempC[4] % 100 + ((200 + tempC[4] - tempC[4] % 100) % 300);

    edges[1] = tempE[11];
    edges[8] = tempE[1];
    edges[5] = tempE[8];
    edges[11] = tempE[5];
}
function _l2() {
    _l();
    _l();
}
function _li() {
    _l();
    _l();
    _l();
}
function _f() {
    let tempC = corners.slice();
    let tempE = edges.slice();

    corners[2] = tempC[4] % 100 + ((100 + tempC[4] - tempC[4] % 100) % 300);
    corners[3] = tempC[2] % 100 + ((200 + tempC[2] - tempC[2] % 100) % 300);
    corners[5] = tempC[3] % 100 + ((100 + tempC[3] - tempC[3] % 100) % 300);
    corners[4] = tempC[5] % 100 + ((200 + tempC[5] - tempC[5] % 100) % 300);

    edges[3] = tempE[8] % 100 + ((100 + tempE[8] - tempE[8] % 100) % 200);
    edges[9] = tempE[3] % 100 + ((100 + tempE[3] - tempE[3] % 100) % 200);
    edges[4] = tempE[9] % 100 + ((100 + tempE[9] - tempE[9] % 100) % 200);
    edges[8] = tempE[4] % 100 + ((100 + tempE[4] - tempE[4] % 100) % 200);
}
function _f2() {
    _f();
    _f();
}
function _fi() {
    _f();
    _f();
    _f();
}
function _b() {
    let tempC = corners.slice();
    let tempE = edges.slice();

    corners[0] = tempC[1] % 100 + ((200 + tempC[1] - tempC[1] % 100) % 300);
    corners[1] = tempC[7] % 100 + ((100 + tempC[7] - tempC[7] % 100) % 300);
    corners[7] = tempC[6] % 100 + ((200 + tempC[6] - tempC[6] % 100) % 300);
    corners[6] = tempC[0] % 100 + ((100 + tempC[0] - tempC[0] % 100) % 300);

    edges[0] = tempE[10] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[10] = tempE[7] % 100 + ((100 + tempE[7] - tempE[7] % 100) % 200);
    edges[7] = tempE[11] % 100 + ((100 + tempE[11] - tempE[11] % 100) % 200);
    edges[11] = tempE[0] % 100 + ((100 + tempE[0] - tempE[0] % 100) % 200);
}
function _b2() {
    _b();
    _b();
}
function _bi() {
    _b();
    _b();
    _b();
}
function _u() {
    let tempC = corners.slice();
    let tempE = edges.slice();

    corners[0] = tempC[2];
    corners[1] = tempC[0];
    corners[3] = tempC[1];
    corners[2] = tempC[3];

    edges[0] = tempE[1];
    edges[2] = tempE[0];
    edges[3] = tempE[2];
    edges[1] = tempE[3];
}
function _u2() {
    _u();
    _u();
}
function _ui() {
    _u();
    _u();
    _u();
}
function _d() {
    let tempC = corners.slice();
    let tempE = edges.slice();

    corners[4] = tempC[6];
    corners[5] = tempC[4];
    corners[7] = tempC[5];
    corners[6] = tempC[7];

    edges[4] = tempE[5];
    edges[6] = tempE[4];
    edges[7] = tempE[6];
    edges[5] = tempE[7];
}
function _d2() {
    _d();
    _d();
}
function _di() {
    _d();
    _d();
    _d();
}
function _x() {
    let tempCe = centers.slice();
    let tempC = corners.slice();
    let tempE = edges.slice();

    centers[0] = tempCe[2];
    centers[2] = tempCe[5];
    centers[5] = tempCe[4];
    centers[4] = tempCe[0];

    corners[1] = tempC[3] % 100 + ((200 + tempC[3] - tempC[3] % 100) % 300);
    corners[3] = tempC[5] % 100 + ((100 + tempC[5] - tempC[5] % 100) % 300);
    corners[5] = tempC[7] % 100 + ((200 + tempC[7] - tempC[7] % 100) % 300);
    corners[7] = tempC[1] % 100 + ((100 + tempC[1] - tempC[1] % 100) % 300);

    corners[0] = tempC[2] % 100 + ((100 + tempC[2] - tempC[2] % 100) % 300);
    corners[2] = tempC[4] % 100 + ((200 + tempC[4] - tempC[4] % 100) % 300);
    corners[4] = tempC[6] % 100 + ((100 + tempC[6] - tempC[6] % 100) % 300);
    corners[6] = tempC[0] % 100 + ((200 + tempC[0] - tempC[0] % 100) % 300);

    edges[2] = tempE[9];
    edges[9] = tempE[6];
    edges[6] = tempE[10];
    edges[10] = tempE[2];

    edges[1] = tempE[8];
    edges[8] = tempE[5];
    edges[5] = tempE[11];
    edges[11] = tempE[1];

    edges[0] = tempE[3] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[3] = tempE[4] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[4] = tempE[7] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[7] = tempE[0] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
}
function _x2() {
    _x();
    _x();
}
function _xi() {
    _x();
    _x();
    _x();
}
function _y() {
    let tempCe = centers.slice();
    let tempC = corners.slice();
    let tempE = edges.slice();

    centers[1] = tempCe[2];
    centers[2] = tempCe[3];
    centers[3] = tempCe[4];
    centers[4] = tempCe[1];

    corners[0] = tempC[2];
    corners[1] = tempC[0];
    corners[3] = tempC[1];
    corners[2] = tempC[3];

    corners[4] = tempC[5];
    corners[5] = tempC[7];
    corners[7] = tempC[6];
    corners[6] = tempC[4];

    edges[0] = tempE[1];
    edges[2] = tempE[0];
    edges[3] = tempE[2];
    edges[1] = tempE[3];

    edges[4] = tempE[6];
    edges[6] = tempE[7];
    edges[7] = tempE[5];
    edges[5] = tempE[4];

    edges[8] = tempE[9] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[9] = tempE[10] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[10] = tempE[11] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[11] = tempE[8] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
}
function _y2() {
    _y();
    _y();
}
function _yi() {
    _y();
    _y();
    _y();
}
function _z() {
    let tempCe = centers.slice();
    let tempC = corners.slice();
    let tempE = edges.slice();

    centers[0] = tempCe[1];
    centers[1] = tempCe[5];
    centers[5] = tempCe[3];
    centers[3] = tempCe[0];

    corners[2] = tempC[4] % 100 + ((100 + tempC[4] - tempC[4] % 100) % 300);
    corners[3] = tempC[2] % 100 + ((200 + tempC[2] - tempC[2] % 100) % 300);
    corners[5] = tempC[3] % 100 + ((100 + tempC[3] - tempC[3] % 100) % 300);
    corners[4] = tempC[5] % 100 + ((200 + tempC[5] - tempC[5] % 100) % 300);

    corners[0] = tempC[6] % 100 + ((200 + tempC[6] - tempC[6] % 100) % 300);
    corners[1] = tempC[0] % 100 + ((100 + tempC[0] - tempC[0] % 100) % 300);
    corners[7] = tempC[1] % 100 + ((200 + tempC[1] - tempC[1] % 100) % 300);
    corners[6] = tempC[7] % 100 + ((100 + tempC[7] - tempC[7] % 100) % 300);

    edges[3] = tempE[8] % 100 + ((100 + tempE[8] - tempE[8] % 100) % 200);
    edges[9] = tempE[3] % 100 + ((100 + tempE[3] - tempE[3] % 100) % 200);
    edges[4] = tempE[9] % 100 + ((100 + tempE[9] - tempE[9] % 100) % 200);
    edges[8] = tempE[4] % 100 + ((100 + tempE[4] - tempE[4] % 100) % 200);

    edges[0] = tempE[11] % 100 + ((100 + tempE[11] - tempE[11] % 100) % 200);
    edges[10] = tempE[0] % 100 + ((100 + tempE[0] - tempE[0] % 100) % 200);
    edges[7] = tempE[10] % 100 + ((100 + tempE[10] - tempE[10] % 100) % 200);
    edges[11] = tempE[7] % 100 + ((100 + tempE[7] - tempE[7] % 100) % 200);

    edges[1] = tempE[5] % 100 + ((100 + tempE[5] - tempE[5] % 100) % 200);
    edges[2] = tempE[1] % 100 + ((100 + tempE[1] - tempE[1] % 100) % 200);
    edges[6] = tempE[2] % 100 + ((100 + tempE[2] - tempE[2] % 100) % 200);
    edges[5] = tempE[6] % 100 + ((100 + tempE[6] - tempE[6] % 100) % 200);
}
function _z2() {
    _z();
    _z();
}
function _zi() {
    _z();
    _z();
    _z();
}
function _m() {
    _xi();
    _r();
    _li();
}
function _m2() {
    _m();
    _m();
}
function _mi() {
    _m();
    _m();
    _m();
}
function _s() {
    _z();
    _fi();
    _b();
}
function _s2() {
    _s();
    _s();
}
function _si() {
    _s();
    _s();
    _s();
}
function _e() {
    _yi();
    _u();
    _di();
}
function _e2() {
    _e();
    _e();
}
function _ei() {
    _e();
    _e();
    _e();
}
function _uw() {
    _u();
    _ei();
}
function _uw2() {
    _u2();
    _e2();
}
function _uwi() {
    _ui();
    _e();
}
function _dw() {
    _d();
    _e();
}
function _dw2() {
    _d2();
    _e2();
}
function _dwi() {
    _di();
    _ei();
}
function _fw() {
    _f();
    _s();
}
function _fw2() {
    _f2();
    _s2();
}
function _fwi() {
    _fi();
    _si();
}
function _bw() {
    _b();
    _si();
}
function _bw2() {
    _b2();
    _s2();
}
function _bwi() {
    _bi();
    _s();
}
function _rw() {
    _r();
    _mi();
}
function _rw2() {
    _r2();
    _m2();
}
function _rwi() {
    _ri();
    _m();
}
function _lw() {
    _l();
    _m();
}
function _lw2() {
    _l2();
    _m2();
}
function _lwi() {
    _li();
    _mi();
}