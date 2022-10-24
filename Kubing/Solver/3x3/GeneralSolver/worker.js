let scramble;
let endState;
/* let centers = ["a", "b", "c", "d", "e", "f"];
let corners = ["a", "b", "c", "d", "e", "f", "g", "h"];
let cornersO = [0, 0, 0, 0, 0, 0, 0, 0];
let edges = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
let edgesO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; */
let centers = [1, 2, 3, 4, 5, 6];
let corners = [1, 2, 3, 4, 5, 6, 7, 8];
let edges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// ubl ubr ufl ufr dfl dfr dbl dbr
// ub ul ur uf df dl dr db fl fr br bl

let startState;
onmessage = e => {
    scramble = e.data[0];
    endState = e.data[1];

    // startState = getState(scramble);

    solve(scramble, endState);
}

function solve(scramble, endState) {
    let solution = "";
    getState(scramble);

    /* if (validateState(endState)) {

        postMessage(solution);
    }
    else {
        postMessage(-1);
    } */
}

function validateState(state) {
    let arr = state.split("");
    let valid = false;

    return valid;
}

function resetState() {
    /* centers = ["a", "b", "c", "d", "e", "f"];
    corners = ["a", "b", "c", "d", "e", "f", "g", "h"];
    cornersO = [0, 0, 0, 0, 0, 0, 0, 0];
    edges = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    edgesO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; */
    centers = [1, 2, 3, 4, 5, 6];
    corners = [1, 2, 3, 4, 5, 6, 7, 8];
    edges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}

function getState(moves) {
    resetState();
    for (let m of moves.split(" ")) {
        move(m);
    }
console.log(corners);
console.log(edges);
    
    printState();
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
    nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf5 = f5; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
    nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb5 = b5; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
    nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr5 = r5; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
    nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl5 = l5; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
    nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu5 = u5; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
    nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd5 = d5; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

    u1 = nf1; u2 = nf2; u3 = nf3; u4 = nf4; u5 = nf5; u6 = nf6; u7 = nf7; u8 = nf8; u9 = nf9;
    d1 = nb9; d2 = nb8; d3 = nb7; d4 = nb6; d5 = nb5; d6 = nb4; d7 = nb3; d8 = nb2; d9 = nb1;
    f1 = nd1; f2 = nd2; f3 = nd3; f4 = nd4; f5 = nd5; f6 = nd6; f7 = nd7; f8 = nd8; f9 = nd9;
    b1 = nu9; b2 = nu8; b3 = nu7; b4 = nu6; b5 = nu5; b6 = nu4; b7 = nu3; b8 = nu2; b9 = nu1;
    r1 = nr7; r2 = nr4; r3 = nr1; r4 = nr8; r6 = nr2; r7 = nr9; r8 = nr6; r9 = nr3;
    l1 = nl3; l2 = nl6; l3 = nl9; l4 = nl2; l6 = nl8; l7 = nl1; l8 = nl4; l9 = nl7;
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
    nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf5 = f5; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
    nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb5 = b5; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
    nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr5 = r5; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
    nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl5 = l5; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
    nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu5 = u5; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
    nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd5 = d5; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

    u1 = nu7; u2 = nu4; u3 = nu1; u4 = nu8; u6 = nu2; u7 = nu9; u8 = nu6; u9 = nu3;
    d1 = nd3; d2 = nd6; d3 = nd9; d4 = nd2; d6 = nd8; d7 = nd1; d8 = nd4; d9 = nd7;
    l1 = nf1; l2 = nf2; l3 = nf3; l4 = nf4; l5 = nf5; l6 = nf6; l7 = nf7; l8 = nf8; l9 = nf9;
    f1 = nr1; f2 = nr2; f3 = nr3; f4 = nr4; f5 = nr5; f6 = nr6; f7 = nr7; f8 = nr8; f9 = nr9;
    r1 = nb1; r2 = nb2; r3 = nb3; r4 = nb4; r5 = nb5; r6 = nb6; r7 = nb7; r8 = nb8; r9 = nb9;
    b1 = nl1; b2 = nl2; b3 = nl3; b4 = nl4; b5 = nl5; b6 = nl6; b7 = nl7; b8 = nl8; b9 = nl9;
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
    nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf5 = f5; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
    nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb5 = b5; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
    nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr5 = r5; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
    nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl5 = l5; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
    nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu5 = u5; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
    nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd5 = d5; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

    u1 = nl7; u2 = nl4; u3 = nl1; u4 = nl8; u5 = nl5; u6 = nl2; u7 = nl9; u8 = nl6; u9 = nl3;
    d1 = nr7; d2 = nr4; d3 = nr1; d4 = nr8; d5 = nr5; d6 = nr2; d7 = nr9; d8 = nr6; d9 = nr3;
    r1 = nu7; r2 = nu4; r3 = nu1; r4 = nu8; r5 = nu5; r6 = nu2; r7 = nu9; r8 = nu6; r9 = nu3;
    l1 = nd7; l2 = nd4; l3 = nd1; l4 = nd8; l5 = nd5; l6 = nd2; l7 = nd9; l8 = nd6; l9 = nd3;
    f1 = nf7; f2 = nf4; f3 = nf1; f4 = nf8; f6 = nf2; f7 = nf9; f8 = nf6; f9 = nf3;
    b1 = nb3; b2 = nb6; b3 = nb9; b4 = nb2; b6 = nb8; b7 = nb1; b8 = nb4; b9 = nb7;
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