//let moves = [[["U", "U'", "U2"], ["D", "D'", "D2"]], [["R", "R'", "R2"], ["L", "L'", "L2"]], [["F", "F'", "F2"], ["B", "B'", "B2"]]];
let moves = ["U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2"];
let movesEO = ["U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F2", "B2"];
let triggers = ["R U R'", "R U' R'", "R U2 R'", "R' U R", "R' U' R", "R' U2 R", "L U L'", "L U' L'", "L U2 L'", "L' U L", "L' U' L", "L' U2 L"];
let movesF2L = ["U", "U'", "U2"].concat(triggers);
let movesDR = ["U", "U'", "U2", "D", "D'", "D2", "R2", "L2", "F2", "B2"];
let movesHTR = ["U2", "D2", "R2", "L2", "F2", "B2"];

let moveAxis = [["U", "D"], ["R", "L"], ["F", "B"]];

let u1 = "w", u2 = "w", u3 = "w", u4 = "w", u5 = "w", u6 = "w", u7 = "w", u8 = "w", u9 = "w", nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8, nu9;
let l1 = "o", l2 = "o", l3 = "o", l4 = "o", l5 = "o", l6 = "o", l7 = "o", l8 = "o", l9 = "o", nl1, nl2, nl3, nl4, nl5, nl6, nl7, nl8, nl9;
let f1 = "g", f2 = "g", f3 = "g", f4 = "g", f5 = "g", f6 = "g", f7 = "g", f8 = "g", f9 = "g", nf1, nf2, nf3, nf4, nf5, nf6, nf7, nf8, nf9;
let r1 = "r", r2 = "r", r3 = "r", r4 = "r", r5 = "r", r6 = "r", r7 = "r", r8 = "r", r9 = "r", nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8, nr9;
let b1 = "b", b2 = "b", b3 = "b", b4 = "b", b5 = "b", b6 = "b", b7 = "b", b8 = "b", b9 = "b", nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9;
let d1 = "y", d2 = "y", d3 = "y", d4 = "y", d5 = "y", d6 = "y", d7 = "y", d8 = "y", d9 = "y", nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9;

let cubeState = [
    u1,u2,u3,u4,u5,u6,u7,u8,u9,
    l1,l2,l3,l4,l5,l6,l7,l8,l9,
    f1,f2,f3,f4,f5,f6,f7,f8,f9,
    r1,r2,r3,r4,r5,r6,r7,r8,r9,
    b1,b2,b3,b4,b5,b6,b7,b8,b9,
    d1,d2,d3,d4,d5,d6,d7,d8,d9
];

let cubeScramble ="";
let solutionEO ="";
let solutionCross ="";
let solutionF2L ="";
let solutionLL ="";
let solution ="";

let solutionInfo = "";

let timeInteruption = false;

onmessage = e => {
    cubeScramble = e.data;
    getCubeState(cubeScramble);

    solveEO();
}

function checkTime(start) {
    const n = 10;
    const timeLimit = n * 60 * 1000;
    return Date.now() - start >= timeLimit;
}

function solveEO() {
    let solLength = 1;
    let start = Date.now();
    let arr = moves.slice();
    solutionEO = "";
    
    solveLoop : while (!isEO(solutionEO)) {
        if (checkTime(start)) {
            timeInteruption = true;
            break solveLoop;
        }
        if (solLength === 1) {
            for (let m of arr) {
                if (checkTime(start)) {
                    timeInteruption = true;
                    break solveLoop;
                }
                if (isEO(m)) {
                    solutionEO = m;
                    break solveLoop;
                }
            }
        }
        else {
            let tArr = arr.slice();
            for (let m1 of arr) {
                let prevMove = m1.split(" ")[m1.split(" ").length - 1][0];
                //let prevPrevMove = m1.split(" ")[m1.split(" ").length - 2] ? m1.split(" ")[m1.split(" ").length - 2][0] : "";
                for (let m2 of moves.filter(m => {return m[0] !== prevMove})) {
                    if (checkTime(start)) {
                        timeInteruption = true;
                        break solveLoop;
                    }
                    tArr.push(m1 + " " + m2);
                    if (isEO(m1 + " " + m2)) {
                        solutionEO = m1 + " " + m2;
                        break solveLoop;
                    }
                }
            }
            arr = tArr.slice();
        }
        solLength++;
        postMessage([solLength]);
    }
    if (!timeInteruption) {
        solutionInfo += "<h1><b>EO:</b> " + solutionEO + "</h1>";
        postMessage([solutionInfo, true]);
        solveCross();
    }
    else {
        postMessage([0]);
    }
}

function solveCross() {
    let solLength = 1;
    let start = Date.now();
    let arr = movesEO.slice();
    solutionCross = "";
    
    solveLoop : while (!isCross(solutionCross)) {
        if (checkTime(start)) {
            timeInteruption = true;
            break solveLoop;
        }
        if (solLength === 1) {
            for (let m of arr) {
                if (checkTime(start)) {
                    timeInteruption = true;
                    break solveLoop;
                }
                if (isCross(m)) {
                    solutionCross = m;
                    break solveLoop;
                }
            }
        }
        else {
            let tArr = arr.slice();
            for (let m1 of arr) {
                let prevMove = m1.split(" ")[m1.split(" ").length - 1][0];
                //let prevPrevMove = m1.split(" ")[m1.split(" ").length - 2] ? m1.split(" ")[m1.split(" ").length - 2][0] : "";
                for (let m2 of moves.filter(m => {return m[0] !== prevMove})) {
                    if (checkTime(start)) {
                        timeInteruption = true;
                        break solveLoop;
                    }
                    tArr.push(m1 + " " + m2);
                    if (isCross(m1 + " " + m2)) {
                        solutionCross = m1 + " " + m2;
                        break solveLoop;
                    }
                }
            }
            arr = tArr.slice();
        }
        solLength++;
        postMessage([solLength]);
    }
    if (!timeInteruption) {
        solutionInfo += "<h1><b>Cross:</b> " + solutionCross + "</h1>";
        postMessage([solutionInfo, true]);
        solveF2L();
    }
    else {
        postMessage([0]);
    }
}

function solveF2L() {
    solutionF2L = "";
    
    for (let f2lIndex = 0; f2lIndex < 4; f2lIndex++) {
        let solLength = 1;
        let start = Date.now();
        let arr = movesF2L.slice();
        let solF2L = "";

        solveLoop : while (!isF2L(solF2L, f2lIndex)) {
            if (checkTime(start)) {
                timeInteruption = true;
                break solveLoop;
            }
            if (solLength === 1) {
                for (let m of arr) {
                    if (checkTime(start)) {
                        timeInteruption = true;
                        break solveLoop;
                    }
                    if (isF2L(m, f2lIndex)) {
                        solF2L = m;
                        solutionInfo += "<h1><b>"+(f2lIndex + 1)+". pair:</b> " + solF2L + "</h1>";
                        postMessage([solutionInfo, true]);
                        break solveLoop;
                    }
                }
            }
            else {
                let tArr = arr.slice();
                for (let m1 of arr) {
                    for (let m2 of movesF2L) {
                        if (checkTime(start)) {
                            timeInteruption = true;
                            break solveLoop;
                        }
                        tArr.push(m1 + " " + m2);
                        if (isF2L(m1 + " " + m2, f2lIndex)) {
                            solF2L = m1 + " " + m2;
                            solutionInfo += "<h1><b>"+(f2lIndex + 1)+". pair:</b> " + solF2L + "</h1>";
                            postMessage([solutionInfo, true]);
                            break solveLoop;
                        }
                    }
                }
                arr = tArr.slice();
            }
            solLength++;
            postMessage([solLength]);
        }
        solutionF2L += solF2L + " ";
    }

    if (!timeInteruption) {
        //solutionInfo += "<h1><b>DR:</b> " + solutionF2L + "</h1>";
        //postMessage([solutionInfo, true]);
        //solveLL();
    }
    else {
        postMessage([0]);
    }
}

function solveLL() {
    let solLength = 1;
    let start = Date.now();
    let arr = movesLL.slice();
    let aufs = ["", "U", "U'", "U2"];
    solutionLL = "";
    
    solveLoop : while (!isSolved(solutionFinal)) {
        if (checkTime(start)) {
            timeInteruption = true;
            break solveLoop;
        }
        if (solLength === 1) {
            for (let m of arr) {
                if (checkTime(start)) {
                    timeInteruption = true;
                    break solveLoop;
                }
                if (isSolved(m)) {
                    solutionFinal = m;
                    break solveLoop;
                }
            }
        }
        else {
            let tArr = arr.slice();
            for (let m1 of arr) {
                let prevMove = m1.split(" ")[m1.split(" ").length - 1][0];
                //let prevPrevMove = m1.split(" ")[m1.split(" ").length - 2] ? m1.split(" ")[m1.split(" ").length - 2][0] : "";
                for (let m2 of movesHTR.filter(m => {return m[0] !== prevMove})) {
                    if (checkTime(start)) {
                        timeInteruption = true;
                        break solveLoop;
                    }
                    tArr.push(m1 + " " + m2);
                    if (isSolved(m1 + " " + m2)) {
                        solutionFinal = m1 + " " + m2;
                        break solveLoop;
                    }
                }
            }
            arr = tArr.slice();
        }
        solLength++;
        postMessage([solLength]);
    }
    if (!timeInteruption) {
        solution = [solutionEO, solutionDR, solutionHTR, solutionFinal].join(" ");
        solutionInfo += "<h1><b>Final moves:</b> " + solutionFinal + "</h1><br><h1><b>Solution:</b> " + solution + "</h1>";
        postMessage([solutionInfo, false]);
        postMessage(["Solved"]);
    }
    else {
        postMessage([0]);
    }
}

function isEO(sol) {
    let solvedEO = true;
    resetCubeState();
    getCubeState([cubeScramble, sol].join(" "));

    let cU = cubeState[4];
    let cL = cubeState[13];
    let cF = cubeState[22];
    let cR = cubeState[31];
    let cB = cubeState[40];
    let cD = cubeState[49];

    let ub = cubeState[1];
    let bu = cubeState[37];
    let ur = cubeState[5];
    let ru = cubeState[28];
    let uf = cubeState[7];
    let fu = cubeState[19];
    let ul = cubeState[3];
    let lu = cubeState[10];
    let df = cubeState[46];
    let fd = cubeState[25];
    let dr = cubeState[50];
    let rd = cubeState[34];
    let db = cubeState[52];
    let bd = cubeState[43];
    let dl = cubeState[48];
    let ld = cubeState[16];
    let fl = cubeState[21];
    let lf = cubeState[14];
    let fr = cubeState[23];
    let rf = cubeState[30];
    let bl = cubeState[41];
    let lb = cubeState[12];
    let br = cubeState[39];
    let rb = cubeState[32];
    
    if (
        ub === cL || ub === cR || ur === cL || ur === cR || uf === cL || uf === cR || ul === cL || ul === cR ||
        db === cL || db === cR || dr === cL || dr === cR || df === cL || df === cR || dl === cL || dl === cR ||
        lf === cU || lf === cD || lb === cU || lb === cD || rf === cU || rf === cD || rb === cU || rb === cD ||

        fu === cU || fu === cD || fd === cU || fd === cD || bu === cU || bu === cD || bd === cU || bd === cD ||
        lu === cU || lu === cD || ld === cU || ld === cD || ru === cU || ru === cD || rd === cU || rd === cD ||

        lf === cF && fl === cL || lf === cF && fl === cR || lf === cB && fl === cL || lf === cB && fl === cR ||
        lb === cF && bl === cL || lb === cF && bl === cR || lb === cB && bl === cL || lb === cB && bl === cR ||
        rf === cF && fr === cL || rf === cF && fr === cR || rf === cB && fr === cL || rf === cB && fr === cR ||
        rb === cF && br === cL || rb === cF && br === cR || rb === cB && br === cL || rb === cB && br === cR
    ) {
        solvedEO = false;
    }

    return solvedEO;
}

function isCross(sol) {
    resetCubeState();
    getCubeState([cubeScramble, solutionEO, sol].join(" "));

    let cL = cubeState[13];
    let cF = cubeState[22];
    let cR = cubeState[31];
    let cB = cubeState[40];
    let cD = cubeState[49];

    let df = cubeState[46];
    let fd = cubeState[25];
    let dr = cubeState[50];
    let rd = cubeState[34];
    let db = cubeState[52];
    let bd = cubeState[43];
    let dl = cubeState[48];
    let ld = cubeState[16];

    return (
        df === cD && dr === cD && db === cD && dl === cD &&
        fd === cF && rd === cR && bd === cB && ld === cL
    );
}

function isF2L(sol, i) {
    resetCubeState();
    getCubeState([cubeScramble, solutionEO, solutionCross, solutionF2L, sol].join(" "));
    
    let cL = cubeState[13];
    let cF = cubeState[22];
    let cR = cubeState[31];
    let cB = cubeState[40];
    let cD = cubeState[49];

    let fl = cubeState[21];
    let lf = cubeState[14];
    let fr = cubeState[23];
    let rf = cubeState[30];
    let bl = cubeState[41];
    let lb = cubeState[12];
    let br = cubeState[39];
    let rb = cubeState[32];
    
    let dfl = cubeState[45];
    let fdl = cubeState[24];
    let ldf = cubeState[17];
    let dfr = cubeState[47];
    let fdr = cubeState[26];
    let rdf = cubeState[33];
    let dbr = cubeState[53];
    let rdb = cubeState[35];
    let bdr = cubeState[42];
    let dbl = cubeState[51];
    let ldb = cubeState[15];
    let bdl = cubeState[44];
    
    let pairs = [
        (dbl === cD && bdl === cB && ldb === cL && bl === cB && lb === cL),
        (dbr === cD && bdr === cB && rdb === cR && br === cB && rb === cR),
        (dfl === cD && fdl === cF && ldf === cL && fl === cF && lf === cL),
        (dfr === cD && fdr === cF && rdf === cR && fr === cF && rf === cR)
    ];

    switch (i) {
        case 0:
            return isCross([solutionCross, sol].join(" ")) && pairs[0];
        case 1:
            return isCross([solutionCross, solutionF2L, sol].join(" ")) && pairs[0] && pairs[1];
        case 2:
            return isCross([solutionCross, solutionF2L, sol].join(" ")) && pairs[0] && pairs[1] && pairs[2];
        case 3:
            return isCross([solutionCross, solutionF2L, sol].join(" ")) && pairs[0] && pairs[1] && pairs[2] && pairs[3];
    }
}

function isLL(sol) {
    let cU = cubeState[4];
    let cL = cubeState[13];
    let cF = cubeState[22];
    let cR = cubeState[31];
    let cB = cubeState[40];
    let cD = cubeState[49];

    return 
}

function isSolved(sol) {
    resetCubeState()
    getCubeState([cubeScramble, solutionEO, solutionDR, solutionHTR, sol].join(" "));
    
    let cU = cubeState[4];
    let cL = cubeState[13];
    let cF = cubeState[22];
    let cR = cubeState[31];
    let cB = cubeState[40];
    let cD = cubeState[49];
    
    return cubeState.join("") === 
        cU + cU + cU + cU + cU + cU + cU + cU + cU +
        cL + cL + cL + cL + cL + cL + cL + cL + cL +
        cF + cF + cF + cF + cF + cF + cF + cF + cF +
        cR + cR + cR + cR + cR + cR + cR + cR + cR +
        cB + cB + cB + cB + cB + cB + cB + cB + cB +
        cD + cD + cD + cD + cD + cD + cD + cD + cD;
}

function getCubeState(sol) {
    let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
    for (let a of arr) {
        switch (a) {
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

    cubeState = [
        u1,u2,u3,u4,u5,u6,u7,u8,u9,
        l1,l2,l3,l4,l5,l6,l7,l8,l9,
        f1,f2,f3,f4,f5,f6,f7,f8,f9,
        r1,r2,r3,r4,r5,r6,r7,r8,r9,
        b1,b2,b3,b4,b5,b6,b7,b8,b9,
        d1,d2,d3,d4,d5,d6,d7,d8,d9
    ];
}

function resetCubeState() {
    u1 = "w", u2 = "w", u3 = "w", u4 = "w", u5 = "w", u6 = "w", u7 = "w", u8 = "w", u9 = "w",
    l1 = "o", l2 = "o", l3 = "o", l4 = "o", l5 = "o", l6 = "o", l7 = "o", l8 = "o", l9 = "o",
    f1 = "g", f2 = "g", f3 = "g", f4 = "g", f5 = "g", f6 = "g", f7 = "g", f8 = "g", f9 = "g",
    r1 = "r", r2 = "r", r3 = "r", r4 = "r", r5 = "r", r6 = "r", r7 = "r", r8 = "r", r9 = "r",
    b1 = "b", b2 = "b", b3 = "b", b4 = "b", b5 = "b", b6 = "b", b7 = "b", b8 = "b", b9 = "b",
    d1 = "y", d2 = "y", d3 = "y", d4 = "y", d5 = "y", d6 = "y", d7 = "y", d8 = "y", d9 = "y";
}

{
    function _r() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u3 = nf3; u6 = nf6; u9 = nf9;
        f3 = nd3; f6 = nd6; f9 = nd9;
        d3 = nb7; d6 = nb4; d9 = nb1;
        b7 = nu3; b4 = nu6; b1= nu9;
        r1 = nr7; r2 = nr4; r3 = nr1; r4 = nr8; r6 = nr2; r7 = nr9; r8 = nr6; r9 = nr3;
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
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u1 = nb9; u4 = nb6; u7 = nb3;
        f1 = nu1; f4 = nu4; f7 = nu7;
        d1 = nf1; d4 = nf4; d7 = nf7;
        b9 = nd1; b6 = nd4; b3= nd7;
        l1 = nl7; l2 = nl4; l3 = nl1; l4 = nl8; l6 = nl2; l7 = nl9; l8 = nl6; l9 = nl3;
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
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u7 = nl9; u8 = nl6; u9 = nl3;
        r1 = nu7; r4 = nu8; r7 = nu9;
        d3 = nr1; d2 = nr4; d1 = nr7;
        l9 = nd3; l6 = nd2; l3 = nd1;
        f1 = nf7; f2 = nf4; f3 = nf1; f4 = nf8; f6 = nf2; f7 = nf9; f8 = nf6; f9 = nf3;
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
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u1 = nr3; u2 = nr6; u3 = nr9;
        r3 = nd9; r6 = nd8; r9 = nd7;
        d9 = nl7; d8 = nl4; d7 = nl1;
        l1 = nu3; l4 = nu2; l7 = nu1;
        b1 = nb7; b2 = nb4; b3 = nb1; b4 = nb8; b6 = nb2; b7 = nb9; b8 = nb6; b9 = nb3;
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
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        l1 = nf1; l2 = nf2; l3 = f3;
        f1 = nr1; f2 = nr2; f3 = nr3;
        r1 = nb1; r2 = nb2; r3 = nb3;
        b1 = nl1; b2 = nl2; b3= nl3;
        u1 = nu7; u2 = nu4; u3 = nu1; u4 = nu8; u6 = nu2; u7 = nu9; u8 = nu6; u9 = nu3;
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
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        l7 = nb7; l8 = nb8; l9 = nb9;
        f7 = nl7; f8 = nl8; f9 = nl9;
        r7 = nf7; r8 = nf8; r9 = nf9;
        b7 = nr7; b8 = nr8; b9 = nr9;
        d1 = nd7; d2 = nd4; d3 = nd1; d4 = nd8; d6 = nd2; d7 = nd9; d8 = nd6; d9 = nd3;
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
}

const algs = {
    pll : {
        "name": "Pll",
        "1": ["R U' R U R U R U' R' U' R2", "R2 U R U R' U' R' U' R' U R'", "M2 U M2 U M' U2 M2 U2 M'", "M2 U M2 U2 M2 U M2"],
        "2": ["x' R U' R' D R U R' D' R U R' D R U' R' D' x", "R' U R' U' y R' F' R2 U' R' U R' F R F", "F R U' R' U' R U R' F' R U R' U' R' F R F'", "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", "R' U R U' R' F' U' F R U R' F R' F' R U' R"],
        "3": ["U' x R' U R' D2 R U' R' D2 R2 x'", "x R2 D2 R U R' D2 R U' R x'", "U L U2 L' U2 L F' L' U' L U L F L2", "U R' U2 R U2 R' F R U R' U' R' F' R2", "L' U' L F L' U' L U L F' L2 U L", "U2 R U R' F' R U R' U' R' F R2 U' R'", "U2 R U R' U' R' F R2 U' R' U' R U R' F'", "U2 R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", "U2 R2 Uw R' U R' U' R Uw' R2 y' R' U R", "U2 R' U' R y R2 Uw R' U R U' R Uw' R2", "U2 R2 Uw' R U' R U R' Uw R2 y R U' R'", "U2 R U R' y' R2 Uw' R U' R' U R' Uw R2"],
    },
    oll1 : {
        "name": "Oll1",
        "1": ["U2 R' U' F' U F R U' R' U' R U' R' U F' U F R", "U2 R' F' U' F U' R U R' U R F R U R' U' F'", "R U2 R2 F R U R' U' F' U R U R' F R F'", "U2 R' F' U' F U' R U R' U R U R' F' U' F U R", "Rw' U' R U' R' U2 Rw U Rw U2 R' U' R U' Rw'", "Rw U R' U R U2 Rw' U' Rw' U2 R U R' U Rw", "F R U' R2 F2 Rw U Rw' F R2 U R' U R U' R' F'", "Rw' R2 U R' U R U' R' U Rw U2 Rw' U' M'"],
        "2": ["U F R U R' U R U' R' F' U F U R U' R' U F'", "F U' R U R' U' F' U' F R U R' U' R U' R' F'", "U F R U R' U' F' Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "R' F' U' F U R U' Rw U' Rw2 U Rw2 U Rw2 U' Rw", "U F R U R' U' R U R' U' F' R U2 R' U' F' U2 F R U' R'", "U R' U R U2 R' U' R U R' U' R' F R F2 U2 F R", "U R U2 R2 F R F' R U2 R' U' Rw U R' U R U2 Rw'", "R U2 R2 F R F' R U2 R2 F' Rw U' Rw' F2 R"],
        "3": ["F R U R' U' F' R U2 R' U' F' U F R U' R'", "U' R' F' U' F U R U' R' U' F U R U' R' F' R", "R U2 R2 F R F' U2 R' F R F'", "U' F R' F' R U2 R U2 R' U R' U' F' U F R", "U2 Rw U2 R' U' R U' Rw' U2 F R U' R' U' R U R' F'", "U' F R U' R' U' Rw' F2 Rw U2 Rw U' Rw' F R U R' F'", "R' U2 R U R' F' U F R2 U R' U' R' F R F'", "R U2 R' U' F' U F U R' F R F Rw U Rw' F", "U' Rw U Rw' U2 F R U R' U' F' R U' M' U' Rw'", "F U R U2 R' U' R U2 R2 F R F' U' F'", "F R U' R' U R U R' F' Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "U R' F' Rw U2 Rw' F2 R U' R' U' R' F R U R"],
        "4": ["U2 R' F R F U2 R' F' R U2 F2 R U2 R'", "U R U R' U R U y R U R' F' U' F U' R U' R' F'", "U' R' F' U' F R' F R2 U' R' U2 R U R' F' R", "U2 Rw U2 R' U' R U' Rw' F R U R' F' U' F' Rw U Rw'", "U2 R U2 R2 F R F' U F' U F R U' R' U2 R U2 R'", "U2 R2 F R F' U2 R' U' F' U F R2 U' R' U R", "F R' F' R U2 R U' R' U R' F R F' R U2 R'", "U R U R' U R U' R' U R' F R F' U2 R' F R F'", "U2 F R U R2 U' R U' R' U2 F R F' R U R' F'", "U R U' R2 D' Rw U' Rw' D R2 U R'", "U' R' U R2 D Rw' U Rw D' R2 U' R", "U2 Rw' U' Rw U2 R' U Rw' F R F' Rw U' Rw' U Rw"],
    },
    oll2 : {
        "name": "Oll2",
        "1": ["U' R U2 R' U2 R' F R2 U R' U2 R' F R F' R U R' F'", "F R U R' U' F' U' F R U' R' U2 R U R' F'", "Rw U Rw' R U R' U R U' R' U2 Rw U' Rw'", "U R U R' F' U' F R U R' U2 R' F R F'", "U Rw U Rw' U2 R U R' U' R U' R' Rw U' Rw'", "R' U2 R U R' F' U F R F R U R' U' F'", "F R U R' U' R U2 R' U' M' U R U' Rw' U' F'", "U' F R U' R' U2 R U R' F' U F U R U' R' F'", "F R U R' U' F' Fw R U R' U' Fw'", "U' Rw' U' R U2 R' U2 Rw U2 Rw' U Rw", "U2 R' U' R' F R F' U R U R' U' F' U F R", "Rw U Rw' R U R' U R U2 R' U' R U' R' Rw U' Rw'"],
        "2": ["U' Rw U2 R' U' R U' Rw' Fw R U R' U' Fw'", "U2 R U R' y Rw' U' F' R U' R' U2 Rw", "U' R' U' R' F R F' U R Rw' U' R U' R' U2 Rw", "U' F R U R' U' F' U2 Rw U R' U R U2 Rw'", "U F R U R' U' F' U' Rw U2 R' U' R U' Rw'", "R' F' U' F U R Rw' U2 R U R' U Rw", "U2 Rw' U' R U' R' U2 Rw R' U' F' U F R", "U2 Rw U R' U R U2 Rw' U F U R U' R' F'", "U' F R U R' U' R U' R' F' U' F' Rw U Rw2 F2 Rw", "R' U' F' U F R Rw U Rw' R U R' U' Rw U' Rw'", "Rw D' R2 U' R U2 R' U R2 D Rw'", "Rw' D R2 U R' U2 R U' R2 D' Rw"],
        "3": ["U2 R U R' U R U' R2 F' U' F U R U2 R' F R F'", "U2 F U R U2 R' U' R U R' U R' F R F' U' F'", "U2 F' U' Rw U' Rw' F2 R U2 R' Rw U' Rw' U Rw U Rw'", "U F' U' F U Rw U Rw' U2 R' F R F' Rw U Rw'", "U2 Rw' U' R' F R F' R U' R' U' Rw U Rw' F' U' F Rw", "U2 F R U' R' U' F R' F' R U R' F' R U2 R U2 R'", "F R F' Rw U Rw' U R' U R U' R' U2 Rw U' Rw'", "F' U' F R U' R' U' F' U2 Rw' F Rw U' F R U' R'", "U F R U' R' U R U R' F' U' R U2 R' U2 R' F R F'", "U2 R U R' F' U' R U R' U' R' F R U' R' F R F'", "F' Rw U Rw' U' Rw U Rw' U' Rw' F Rw U R U R' F'", "U Rw U R' U R U2 Rw' U Rw' F2 Rw U2 Rw U' Rw' F"],
        "4": ["F R U' R' U F R U R' U' F' R U2 R' U' F'", "U' R U2 R' U' F' U F U R' U' F' U F R2 U' R'", "F U R' U' F' U F R U R U2 R' U' R U R' F'", "R' U' F U R U' R' F Rw U Rw' U Rw' F' Rw F R", "U2 Rw U' Rw' F R' F' R U2 Rw U' Rw' U' F' U F", "R U R' U' R' F R F' Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "U' R U2 R' U2 R' F R F' U2 F R U' R' U' R U R' F'", "R U2 R2 D' F' R U' R' F Rw U Rw' D R", "U2 F R' F' R U2 R U2 R' U F R U' R' U' R U R' F'", "Rw' U' F2 R U' R' U2 Rw U' F U' F'", "R U2 R' U2 R' F R F' U2 F U R U' R' F'", "U F R U R' U2 R' F R F' R U2 R' U' F'"],
        "5": ["U R2 U' R' U' R U R U R' D Rw' U' Rw D' R2 U' R", "U' R2 U R U R' U' R' U' R D' Rw U Rw' D R2 U R'", "U R' F R U' R' U2 R U R2 F' R F' U F R", "F R U R' U' R U2 R' F' U2 F R' F R F2", "U2 F U2 R U' R2 F R2 U' R' U' R U2 R' U' F' U2 F'", "U' R U2 R' F R' F' R U' R U R' U2 R' F R F'", "U2 R' F' U' R U R' U' R' F R2 U' R2 F R F' U R", "F R' F' R U R U' R2 F' U' F U' R U R' U R", "U R' F R F' U2 R' F R F' U y' R' U' R U R' U R", "U' R U' R2 D' Rw U Rw' D R2 U R'", "U R' U R2 D Rw' U' Rw D' R2 U' R", "U2 F R' F' R U' F' Rw U' Rw' F2 U2 R U' R'"],
        "6": ["U R' F R U R' U' F' U R U R' U' F' U F R", "U' R U R' F' U' F U R U2 R' F U R U' R' F'", "U' R' F R F' U' F2 Rw U Rw' U F", "U' F R U' R' U' Rw U R' U R U2 Rw' R U R' F'", "U2 R' F' U' F U R U' R U2 R' U2 R' F R F'", "U R U R' U' R' F R F' U Rw' U' R U' R' U2 Rw", "U2 M' U R U' Rw' U2 R' F R F' U F' U F", "U2 F' U' F R U R' U' F' U2 Rw' F Rw F R U' R'", "U' R' U' F' U2 Rw' F Rw U Rw' F' Rw U' F R", "F R U R2 U' F' U F R U R' F R F' U' F'", "Rw' U2 R U R' y' R U R' U' R2 U R F z'", "U2 Rw' U' R U2 R' U2 F R F' Rw U R' U Rw' U Rw"],
    },
    oll3 : {
        "name": "Oll3",
        "1": ["U Fw R U R' U' Fw' U' F R U R' U' F'", "U R U R' U' M' U R U' Rw2 U2 R U R' U Rw", "U2 Rw U R' U R U2 Rw2 U' R U M' U' R' U R", "R' U' F' U F R U R' F' U' F U R", "F R U' R' U2 R U R' F' U R' U' F' U F R", "U F' U' F R U R' F' U' F U R U R' U' F' U2 F", "Rw' U' R U' R' U2 Rw F R U R' U' R U R' U' F'", "U F R U R' U' F' R U R' F' U2 F R U' R'", "U Fw R U R' U' Fw' R' F' U' F U R", "U2 Rw U R' U R U2 R' U' M U2 M' U' M", "U2 Rw' R2 U R' U Rw U2 Rw' U M'", "U F R U R' U' F' U2 R' U' F' U F R"],
        "2": ["U' F R U R' U' R U R' U' F' U' F R U R' U' F'", "U' F R U R' U' F' Rw' U2 R U R' U Rw", "U2 M' U M U R U R' U R' F R F' Rw U2 Rw'", "U' Rw U R' U R U2 Rw2 U' R' F R F' U Rw", "F U R U' R' F' U' F U R U' R' U R U' R' F'", "U' F R U R' U' F' Rw' U Rw' F' Rw2 U' F U' F'", "U' Bw' R' U' R U R' U' R U y R U' R' F' U' F U R", "U' F R U R' U' R U' R' F' U' Rw' F U' F U Rw", "U2 R' U' R U' M' U' Rw' U' Rw U Rw' U F' U F R", "U' F R U R' U' R U R' U' F' R' F' U' F U R", "R' U' R' F R F' U R U F R U R' U' R U R' U' F'", "U' Rw' U2 R U R' U Rw U R U2 R2 F R F' R U2 R'"],
        "3": ["F R U R' U' F' U2 F R U' R' U' R U R' F'", "U F U R U2 R' U' R U R' U R' U' F' U F R F'", "U2 F R U' R' Rw U R' U R U2 Rw' U' R U R' F'", "U' R U2 R' U R U R' F R' F' R2 U2 R2 F R F'", "U' F R U R' U' R' U R U2 Rw' U Rw U F' Rw' U' Rw", "R' U' F U R U' R' F' R U F R U R' U' F'", "U Rw U R' U' Rw' R U2 R' U' F' U F R2 U' R'", "R U' R2 D' Rw U Rw' D R2 U' R' U' R U' R'", "R' U F' U2 R U R' U' R' F R2 U R' F' U2 F R", "U' F R U' R' U' R U R' U' R' F R F' R U R' F'", "R' F R U' R' U2 R U R' F2 U F R", "R' U' F U R U' R' F' R U2 R' F' U' F U R"],
        "4": ["R U R' U F R U R' U' F2 U2 F U2 R U2 R'", "U R2 U' R' F R F' U R' D Rw' U Rw D' R'", "U Rw U Rw' U2 Rw U' Rw' F R U2 R' U2 Rw U2 Rw' F", "U2 R U2 R' U' R U R2 F R F' U2 R' F R F'", "U2 R' U' R U' R' U' F' U' F R U2 R2 F R F' U R", "R U2 R2 F R F' U' F' U' F R U R' U' R U' R'", "R' U F' U' F R U2 R2 F R F' R U' R' U2 R", "U Rw U R' U R U2 Rw' U' R U2 R' U' F' U F R U' R'", "R' F R U R' U' F' U R U' Rw' U2 R U R' U Rw", "U F U R U' R' F' U' F U R U2 R' U' R U R' F'", "U' Rw U2 Rw' U' F' U F U Rw U Rw' F R' F' R", "U' F R U' R' U' R U R' F' U' R U R' U' R' F R F'"],
        "5": ["U' F R U R' U' Rw' F' U' F Rw F' Rw' U Rw", "F R U R' U' R U R' U2 R' F R F' R U R' F'", "U F U R U' R' F' U' Rw U' Rw' U' Rw U Rw' F' U F", "U' M' U R U' Rw' U' Rw U' Rw' U y' R U R U' R'", "R U' R' U2 Rw U' Rw' R U R' U Rw U' Rw' F' U F", "U' F R' F' R U R U R' U2 R' U' F R F' R' U R", "R2 F R F' R U R' F' U2 F R U R' U2 R", "F R U' R2 F R F' U2 F' U2 F R U2 R' U' F'", "U2 Rw U' Rw' U M' U2 R U Rw' F' U F", "U' R' U' F U F' R U' R' F' R U2 M' U' M", "R2 F R F' U2 R' U' F' U F R2 U2 R' U2 R", "R' F R F' U2 F' U2 F R U2 R' U2 R' F R F'"],
        "6": ["U R U R' U' R' F R F' U2 R' U' F' U F R", "U' F' U' F U2 R U R' U2 F' U F R U R' F' U' F", "U R U2 R' U2 R' F R F' U Rw' U' R U' R' U2 Rw", "R' U' R U F R U R' U' F' U M U' R' U Rw", "U2 F U R U R' F' U F R U R' U F'", "F U R U' R2 U' R2 U' R2 U F' U F R F'", "U2 F' U' F U2 R U R' U2 F R' F2 U' F U R", "U F R U R' U' Rw U' Rw' U R U R' U Rw U' Rw' F'", "U R' U' R U' R' U' R2 D Rw' U Rw D' R2 U' R", "F R U R' U' R U R' F' U' F' Rw U Rw'", "U F R' F' R U R U' R' U' R U R' U' R' F R F'", "F R U R' U' F' U R U R' F' U F R U' R'"],
    },
    oll4 : {
        "name": "Oll4",
        "1": ["R U R' F' U2 F R U' R' F U R U' R' F'", "R' F' U' F U R U' F R U' R' U2 R U R' F'", "R U R' U R U2 R2 U2 Rw U' Rw' U2 Rw U Rw' U2 R", "R U R' F' U' F R U R' U' F' U' F U R U2 R'", "U2 R' U' F' U F R U' R' F' U' F U R", "U' Fw R U R' U' Fw' U F R U R' U' F'", "U2 Rw' U' R U' R' U2 Rw2 U R' U' Rw' R U R U' R'", "U2 F' U2 F R U' R2 D' Rw U' Rw' D R", "U Rw' U2 R U R' U Rw2 U' Rw2 U Rw2 U Rw2 U' Rw", "U2 R' U' F' U F R U2 F R U R' U' F'", "M U' Rw U2 Rw' U' R U' R2 Rw", "U F U R U' R' F' R' F' U' F U R"],
        "2": ["U Rw' U' R U' R' U2 Rw F U R U' R' F'", "U Rw' U' R U' R' U2 Rw U F R U' R' U2 R U R' F'", "U' R' U' R' F R F' U R U2 Rw U2 R' U' R U' Rw'", "U2 Rw U2 Rw' F R' F' R U' R U' R' U' M' U' M", "U' R' F Rw U Rw' F' R U2 F U R U' R' U F'", "U F R U R' U' R U R' U' F' U F R U R' U' F'", "U2 R' F' U' F U R U R U R2 F R F' y' R' U R", "U2 R U R' U' R' F2 R U2 Rw U' Rw' U2 F Rw U Rw'", "U' R' F' U' F U' Rw U' Rw' U Rw U M U R' U R", "U' F U R U' R' U R U' R' F' U2 R' U' F' U F R", "U F R U R' U' R U R' U' F' U2 R' F' U' F U R", "F R U R' U2 F' U' F R' F R F' R U' R' U' F'"],
        "3": ["U' Bw' U' R' U2 R U R' U' R F U R U' R' F' U' Fw z'", "U R' F' U' F U R U R U R' F' U F R U' R'", "Rw' U2 R U R' U Rw U' F R' F' R U2 R U2 R'", "R U' R' U' M' U R U' Rw' U2 R' F R F'", "U' Rw' U' R U M' U' F U R U' R' F' U' R' U R", "U R' U2 R U' R' U' R U R2 F R F' U2 F R' F' R2", "Rw' U' R U Rw U2 R' U' R' U R U2 R' F R F'", "U2 F Rw U Rw' U' R U' R' U' Rw U Rw' U R U' R' F'", "R' U R2 D Rw' U' Rw D' R2 U R U R' U R", "U2 Rw U' Rw' F U F R U' R' U R U' R' F'", "U2 F R' F' R U R U' R' U R U R' U' R' F R F'", "R U R' U' R' F R F' Fw R U R' U' Fw'"],
        "4": ["U2 F R U' R' U R U2 R' U' F' Rw' U' F' U F Rw", "U' Rw U2 R2 F2 Rw F' R U2 Rw2 F2 R", "U' R' F R U R' U' F2 U2 F U' R U R2 F R F' R", "Rw' U2 R U R' F U F' R U' R' F' R U M'", "F R U R' U' R U' R' U R U2 R2 F R F' U' F'", "U' R' U R U' R' U R U2 R2 F R F' U F' U F R", "R' U' R U' R' U2 F' U2 F2 U R U' R' F' U2 R", "U' R U R' U R U2 R' U R U2 R2 F R F' U2 R' F R F'", "U' Rw' U' R U' R' U2 Rw U R' U' F U R U' R' F' R", "U2 F R U' R' U R U2 R' U' F' U F R U R' U' F'", "U2 R' F R F' Rw U' Rw' U' F' U' F U Rw U2 Rw'", "U2 F R' F' R U R U' R' U F R U' R' U R U R' F'"],
        "5": ["U2 R U R' U2 F' U' F U2 R U' R' F' U' F R U R'", "U2 R' U' R' F R F' U F' U2 F U R U2 R' U' R", "U' R U2 R' U2 R' F R F' R U2 R2 F R F' R U2 R'", "U F U R U2 R' F R U R' U' F' U' R U2 R' U' F'", "U' R U R' U2 F' U' F U2 R' F R2 U R' U' F'", "R U R2 F' U' F U R U2 M' U R U' Rw'", "Fw R U R' U' Fw' U R' F R U R' U' F' U R", "U' R U R' U R U R2 D' Rw U' Rw' D R2 U R'", "U2 Rw D' Rw2 U' Rw U Rw' U Rw U Rw' U2 Rw U' Rw D Rw'", "R U' R' U R' F R F Rw U Rw' U' Rw U' Rw' F2", "U' Rw' U' F' U2 Rw U' Rw' F2 Rw U Rw' U' Rw", "U R' F' U' F U R U2 F R U' R' U' R U R' F'"],
        "6": ["U F R U' R' F R' F' R U2 R U' R' U R U' R' F'", "U2 R' F R F' U' R' D' Rw U Rw' D R", "U2 R' F R F' Rw U' Rw' U F U R' F R U' F'", "U2 R U R' U2 R U' R' F R U R' U' F' U2 R' F R F'", "U R U2 R2 U' F' U F R2 U R' U' F' U F R U' R'", "F R U R' U' R U R' U' F' U R U R' U' R' F R F'", "U2 F R U' R' U' R U R2 F' U' F U R U' F'", "U' R' U2 R U R' U R2 U' R2 D' Rw U Rw' D R2 U R'", "U F' U' F Rw U Rw' R U2 R' U Rw U Rw'", "U2 R' F R F' U' Rw U2 Rw' U' F' U F U Rw U Rw'", "M' U M U R' F R U R' F R F U' F'", "U' R' F R F2 U F R' F R F' R U R2 F R F'"],
    },
    oll5 : {
        "name": "Oll5",
        "1": ["U R U R' U R U2 R' U2 Rw U R' U' Rw' R U R U' R'", "Rw' U2 R U R' U Rw", "Rw' U2 R2 U R2 U Rw U' R U' R'", "U R' F' U' F U R U R' U' F' U F R", "U' R' U' R' F R F' R' F R F' R U' R' U2 R", "U R' F' U2 R U R' U R U2 R' F R", "U' M' U R' U2 R U R' U R M", "F R U R' U' F' R' F' U' F U R", "F R U R' U' F' U' F R U R' U' F'", "R' U2 R U R' F' U F R U2 R' U' F' U F R", "U' R' U' F' U F U2 R U R' F' U F R", "U2 R' U' R U' y x' R2 U' R' U R' x"],
        "2": ["F U R U' R' U R U' R' F' Rw' U' F' U F Rw", "U Lw U' R' U R U R' F' R U R' U' R' F R2 U' R' U' x", "R U' L' U R' U' L U' F R U' R' U' R U R' F'", "U R U2 R2 F R F' R U2 R' Rw' U2 R U R' U Rw", "U' Rw U Rw' R U R' U2 F R U R' F Rw U Rw2 F Rw", "U R' U2 R U R' U R U' R' U2 R U R' F' U F R", "U2 R U R' U R U2 R' U' R' F' U' F U R", "U R' U2 R U R' U R U2 R' U' F' U F R", "U2 R U R' U R U2 R' U2 F R U R' U' F'", "U Rw' U2 R U R' U Rw U2 R' U' F' U F R", "U Rw' U2 R U R' U Rw U' R' U2 R U R' F' U F R", "U R' U' R2 U R U R' U' R U F R F' R U2 R'"],
        "3": ["R U R' F' R U R' U R U2 R' U' F R U' R'", "U2 R' U' R U' R' U2 R2 U2 R' U2 R' F R F'", "U' Rw U R' U R U2 Rw' F R' F' R U R U' R'", "Rw' U' R' D' R U' R' D R2 U R' U Rw", "M U R2 F R U R U' R' F' R U' R' U Rw", "R U R' F' R' U2 R F U' R' U' R U R U' R'", "U' R' U' F R' F2 R U R U' R' F R", "U Rw' D R2 U R' U R U' R2 D' Rw", "R' U2 R' U' F' U F R2 U' R' U' R U' R' U R", "U R' F' R U R' U' R' F R F' U F R", "R U2 R' U2 R' F R F' U2 Rw U2 R' U' R U' Rw'", "R U R' U' R' F R F' U' F R U R' U' F'"],
        "4": ["U Rw' R2 U' R' U' F' U2 F U2 Rw U2 R'", "R' U2 R U R2 F' U' F U R2 U2 R' U' R", "U2 F R F' U R U R' U' R' U' F R U R U' R2 F'", "U' R U' R' U' R U2 R' F' Rw' U' F' U F Rw F", "Rw' U2 F' R U R' U' R' F R U2 Rw", "U Rw' R U R' U' F U F' R U' R' F' Rw", "U2 R U' R' U R U R' U' R U' R' F' U F R U R'", "U Rw U' Rw' F R' F' R U2 M' U' M", "U' R U' R' U' F' U R U R' U' R' F R", "R' U2 R U R' U2 R U' R' F U R' F R F' U' R' F' R2", "U2 R' D' Rw U Rw' R U2 R' D R U x U R' U' R x'", "U' R U' R' U' R U R2 U' F' U F R2 U R'"],
        "5": ["U' F R U' R' U R U R' U R' U' F' U R U R U' R'", "U2 R' U' R U' R' U2 R F' Rw U Rw' U2 Rw' F2 Rw", "R U R' U R U2 R' U' F R U' R' U R U R' F'", "U' F R U' R' U' R U R2 F2 R U2 R U2 R' F", "U2 R U R' U' R U R' F' U' F U2 R U' R'", "U2 Rw U2 R D R' U' R D' R2 U R U2 Rw'", "U' F U R U2 R' U' R U R' U R U' R' F'", "U2 F R2 D R' U' R D' R2 U' R U R' F'", "Rw D' R2 U' R U R' U R2 D Rw'", "U R U R2 F' R U2 R U2 R' F U' M' U R U' Rw'", "F U R U2 R' U' R U R' U F' U' F' Rw U Rw'", "U2 R U R' U' R F R U R' U' F' U R' U R U' R'"],
        "6": ["U2 F U' R2 D R' U R D' R2 U F'", "U' R U2 R' U' F' U' F R U R' U' R U R' U' R U' R'", "U R U2 R2 F2 Rw U Rw' F2 R U R U' R' F'", "U2 R' D' R U R' D R2 U' R' U' F' U F R U R'", "U' R U R' U R U2 R' F R U' R' U' R U R' F'", "R U R' U R U2 R' U' R U R' U' R' F R F'", "U' R' U2 R U R' U' R2 U R' U' R' U2 F R F'", "U' R U2 R' U R U' R' U' R U2 R2 F R F' R U R'", "U2 R' U2 R U R' U R U' R' F R U R' U' F' U R", "U2 M' U M R U R' U R U2 R2 F R U F U' F'", "U2 F R U' R' U' R U R' F' U' Rw U R' U' Rw' F R F'", "U2 R' U R' U R2 U R2 F R F' R' U2 R U' R"],
    },
    oll6 : {
        "name": "Oll6",
        "1": ["U2 M' U R U2 R' U' R U' R' U2 M", "U' F R U R' U' R U' R' U2 R U R' F'", "U2 Rw U2 R2 U' R U' Rw' U2 R U2 R U2 R'", "Rw' U2 R U R' U Rw U' R U R' U R U2 R'", "U' Rw U2 R2 U' R2 U' Rw' U R' U R", "U' Rw U2 R' U' R U' Rw'", "U' F' U' F U' R U R' U' F' U2 F R U R'", "U' F R U R' U' F' U' F U R U' R' F'", "U' R U R' U' M' U R U R' U' R U' Rw'", "U F U R U' R' F' U F U R U' R' F'", "U F U R U' R' U R' F R F' U' F'", "U R U R' U F2 Rw U Rw' F"],
        "2": ["U' R U2 R2 F R F' R U2 R' U Rw U2 R' U' R U' Rw'", "U R U R' U R' F R F' R U' R' U R U' R' U R U2 R'", "U' Rw R U2 R D Rw' U2 Rw D' R2 U Rw'", "R U' Rw' F2 R U2 R' U R U R' F2 Rw U R'", "U' R' D R2 U' F U R U' R' F' R2 D' R", "U' R U R' U Rw' U' R2 U' R2 U R' F R F' U Rw", "U2 R U2 R' U' R U' R' U' F U R U' R' F'", "U R' U' R U' R' U2 R U2 F R U R' U' F'", "U R' U' R U' R' U2 R U' R' F' U' F U R", "U2 Rw U2 R' U' R U' Rw' U' F U R U' R' F'", "U' F U2 R U R' U R U R' U' R U' R' U F'", "R U R' F R F' Rw U R' U2 Rw' U' Rw U Rw'"],
        "3": ["R' U R U2 R2 U' F' U F R2 U' R' U2 R", "U' F R U2 R' U2 R U R' U2 R U R' U F'", "U' F U R U' R' F2 U' F Rw U' Rw' U Rw U Rw'", "U2 R' F R F' U' Rw' D' Rw U Rw' D Rw", "U R' U R U' R' U' R U R' U R y R U' R' F' U' F", "U' R' U R U R' U F' U F R' U' R2 U' R2 U2 R2", "U Rw' U' R U2 R' U2 R' F R F' Rw U' Rw' U Rw", "U2 Rw' F R F' Rw U R' U' F U R U' R' F'", "R' F R F' Rw U Rw' U2 M' U M", "R U' R2 U R U2 R2 F R F' R' U R' U' R2", "U2 R' F R U F U' R U R' U' R' F' R U2 Rw U2 Rw'", "U F' R U R' U' R' F R U' F' U' F U R U R'"],
        "4": ["U R U R' U R U2 R2 U2 R U' R' F' U F U' R", "U' F R U2 R' U' R' U2 R U R' U R F'", "U F R U' R' U' F R U R' U' F' R U2 R' U' F'", "U Rw' U Rw' F2 R F' U' R U' R' U2 R' F2 Rw2", "U F U R' F R F' R' U' R F' R' U R", "F' Rw U R' U' Rw' F R U' Rw U2 R' U' R U' Rw'", "U' M' U' R U R' F' R U2 R' U2 R' F R2 U' Rw'", "U R' U2 R' D' R U2 R' D R2 U R' U' F' U F R", "U2 Rw D' R2 U' R U' R' U R2 D Rw'", "U F U R U2 R' U R U R' F' R' U' R' F R F' U R", "U' F R U' R' U R U2 R' U' F'", "U' F R U' R' U' F U R U' R' F' R U R' F'"],
        "5": ["U2 R U2 R' U2 R' F R F' U' F U R U' R' F'", "R U R' U' R' F R F' U2 R' U' R' F R F' U R", "U' R' U' R U' R' U2 R U R U R' U' R' F R F'", "U2 Rw U R' U' Rw' F R F' U' Rw' U' R U' R' U2 Rw", "U2 R U2 R' U' R U R' U' F' U' F U R U2 R'", "F' R U R' U' R' F R U' F' U F R' F R F'", "U2 R U2 R' U2 R' F R2 U' R' U2 R U R' F'", "U' Rw' D R2 U R' U' R U' R2 D' Rw", "Rw U R' U' Rw' F R F' U2 F U R U' R' F'", "U' R U R' U R U R2 U' F' U F R U R' F R F'", "U' Rw U2 R' U' F' Rw U R' U' Rw' F R2 U' Rw'", "U R U' R2 U' R F R2 U' R' U R U R F' R U R'"],
        "6": ["U2 R U R' U R' F R F' U2 R' F R2 U R' U' F'", "U' F U' R2 D R' U' R D' R2 U F'", "U' F R U R' U2 R' F' Rw U2 R U2 Rw2 F Rw", "U R D Rw' U' Rw D' R' U x' U' R U R' x", "U' R2 F R F' U2 R U2 R' F R' F' R U2 R", "U' F R U' R' U R2 D R' U R D' R' U R' U' F'", "R' U' R U' R' U2 R U F R' F' R U R U' R'", "U2 F R U R' F' R' F R U' R' F Rw U Rw' F R", "U R2 U R2 U R U2 R' U2 F U R U' F' R'", "U2 F R' F' R U R U' R2 U' R' D' R U R' D R2", "U' F R U R2 U' R2 U' R' F' Rw' F Rw U R' U R", "U2 F R U' R' U R U2 R' U' F' U' F U R U' R' F'"],
    },
    oll7 : {
        "name": "Oll7",
        "1": ["U2 Rw U Rw' U R U' M' U' Rw'", "U F R U R' U' F' U F U R U' R' F'", "R' U' R U' Rw U R' U R U2 Rw' U' R' U R", "U2 Rw U R' U R U2 Rw'", "U M U R U R' U R U2 R' M'", "U' R' U' R' F R F' U R U F R U R' U' F'", "U2 F R U R' U' R U R' U y' R' U' R U' R'", "U2 Rw U' Rw' U R U R' U R U2 R' U Rw U Rw'", "U' R U R' U' R U R' U Rw' R2 U' R' U Rw U' R'", "U2 R U R' U R U' R' U' M' U R U' Rw'", "U2 F U R' F R F' R U' R' F'", "U' F U R U' R' F' U' F U R U' R' F'"],
        "2": ["U' R U R' U R U2 R' F U R U' R' F'", "U2 R' U2 R U R' U R U' F R U R' U' F'", "U R U2 R' F R' F' R2 U' R' U R U2 R'", "U2 R U' R' F' U F R U R' U R2 D R' U' R D' R2", "U' R U2 R2 U' R2 U' R2 U2 R U' R' U' R' F R F' U R", "U2 R U2 R' U' F' U' F R U R' U' R U R' U2 R' F R F'", "U' R' U2 R U R' F' U F R U R U R' U R U2 R'", "R U2 R2 F R F' R U' R' U R U' R' U R U2 R'", "U2 R' U2 R U R' U F' U' F U R", "U2 R' U' F' U F R U R' U2 R U R' U R", "U' F U' R U R' U R U' R' U' R U' R' U2 F'", "U' Rw U R' U R U2 Rw' F U R U' R' F'"],
        "3": ["U2 F R U' R' U' R' U2 R U R' U R2 U R' F'", "U2 R U' R' U' R U' R' U2 F R' F' R U2 R U' R'", "U R' U' R F U' R' U2 F R F' R U R' F'", "F R U' R' U R U R' U R' F R F' U' F'", "U2 L' U2 L U2 L F' L' F", "U2 F R' F' R U R U2 L' U R' U' L", "U R U R' U R U2 R' U' R' U' F U R U' R' F' R", "U F R U' R' U' R U' R' U' F U R U' R' F' U' F'", "U2 R U R' U R U R' F' U F R U R2 F R F'", "R' U F' U2 F R U R' U' F' U' F U' R", "U' F U R U2 R' U' R U R2 F' R U R U' R'", "F R U' R' F R U R' U' F' U R U R' F'"],
        "4": ["U' F R' F' R U2 R U2 R2 U' F' U F R", "U2 F R U' R' U' R U R' F' R U R' U R U2 R'", "F R U' R' U' R U2 R' U' F' U2 Rw U R' U R U2 Rw'", "R' U2 R' F R F' R U2 R' U2 F R' F' R2", "U2 F R U' R' U' R U R' F' U' R' U2 R U R' U R", "R' F' U' F U R F U R U2 R' U' R U R' F'", "F R U R2 F R U R' U' F' U R y' R' U' R U' R'", "U' R' U2 R U R' U Rw U' Rw' F R U F R U' R' F'", "U2 R2 U' R U F R U R' U' R' F2 U F R U' R", "U2 F' Rw' F Rw F U R2 D R' U2 R D' R2", "U2 Rw U R' U' Rw' F R F' Rw U R' U R U2 Rw'", "U2 R2 F R F' R U R' U R U2 R' U R U' R' U R"],
        "5": ["U2 R U' R' U' F' U2 F U2 R U2 R'", "U' R' U' F U R U' R' F' U2 R U R' U' R U R' U R", "U' M' U R U' Rw' U' R U' R' F' U F", "U' R U2 R' U' R U R' U2 R' F R2 U R' U' F'", "R U' L' U R' U' L U' F U R U' R' F'", "U M' U Rw U' Rw' F U' M U R' F' R", "U F U' R' U' F R F' R' U R2 U R' F'", "U2 F' U' Rw' F Rw2 U R' U2 Rw' F Rw U' Rw' F2 R", "U' F R' F' U' F U R2 U' F' Rw U R' U' Rw'", "R U R' U' R' F R2 U' R' U' R U2 R2 F R F' U' F'", "U2 R U R' U' R' F R U R U2 R' U' R U R' F'", "U' F R' F' R U R U' R' U' F R U' R' U' R U R' F'"],
        "6": ["R' U2 R U R' F' U F R U2 F R' F' R U R U' R'", "U R U2 R' U' F' U F R U' R' F U R U' R' F'", "U2 F R' F' R U R' U' R U' R' U2 R U R U R'", "U Rw U R' U' Rw' F R F' U F U R U' R' F'", "U2 F R' F' R U2 R' U' R U R U2 R' U' R' U R", "U2 F R' F' R U2 R U2 R'", "U R U R' U' R' F R F' U F U R U' R' F'", "F R U R' U' R' F' U' F U R U' F'", "Rw' D R2 U' R' U' R U' R' U R U' R2 D' Rw", "U2 F R' F' R U R' U' R2 U' R2 U2 R2 U2 R'", "U2 Rw' F2 Rw F R U R' F' U Rw' F Rw", "U' R' F R F' U2 R U' R' U R U' R' U F' U2 F"],
    },
    oll8 : {
        "name": "Oll8",
        "1": ["Rw' R U R' U' R U' R' U2 R U2 M'", "U Rw' U Rw U' R' U' R U' R' U2 R U' Rw' U' Rw", "U2 R' U2 R U R' U R U' F U R U' R' U R U' R' F'", "U2 R U2 R' U' F' U' F U R U' R' U' R' F R F'", "U Rw' U' Rw U' R' U M U Rw", "U Rw' U' R U' R' U2 Rw", "U' R U R' U Rw' U' R U' R' U2 Rw U R U' R'", "U' R' F' U' F U R U' R' U' F' U F R", "U2 Rw U R' U' M U R U R' U' R U' R'", "U2 Rw' R2 U R' U Rw U Rw' U' Rw U Rw' U Rw U R'", "U2 F R U R' F R' F' R U' F'", "U Rw' F2 Rw U Rw' F U2 R U R' U Rw"],
        "2": ["Fw R U R' U' Fw' U' R' U' R U' R' U2 R", "R' U' R U' R' U2 R U R' U' F' U F R", "U Rw U' Rw' F2 Rw U Rw' U2 F Rw U2 R' U R U' Rw'", "R' U' R U' R' U2 R U2 R' U2 R U R' F' U F R", "U F R U R' U2 R U R' U' F' U' F R U R' U2 F'", "U F R U R' U' F' U F R U R' U' R U R' U' F'", "U R' U R U R' U2 R U2 R2 F R F' R U R' U' R", "U F R U R' y' x' R U' R' U R U' R' U x U' R'", "Rw' U' R U' R' U R' F R F' U Rw", "Fw R U R' U' Fw' R U2 R' U' R U' R'", "Rw' U' R U' R' U2 Rw U R' U' F' U F R", "R' F' R U' R' U' F' U2 F R' F R F' U' F R"],
        "3": ["U2 F R' F' U' F U R2 U' R' U R U' R' F'", "U R U R' F' U R U2 R' U' R U' R' F R U' R'", "U' R U R' U' M' U R U R' U2 Rw' F R F'", "U' Rw U R' U' M U R U R' U2 R' F R F'", "U2 R' U' R U' R' U2 R U R U2 R' U' F' U F R U' R'", "U' F U R U2 R' U' R U2 R' U' R U R' U' F'", "U' R U2 R' U2 R' F R F'", "F U' R U' F U R U' R' F' R' U F'", "U Rw' U' R U R' F R' F' Rw U R U R' U2 R", "U R' U R y R U' R2 F R F' R U R' U R U' R'", "F U' R U2 R' F' U' F U R U R' U F'", "U F U R U' R' F' R U R' F' U F R U' R'"],
        "4": ["U' R U2 R' U' R U' R' F R U' R' U R U R' F'", "Rw U' Rw' U R U R' U Rw U' Rw' F' U F", "U2 F U' R U' R' U' R U' R' U2 F' U2 F U' F'", "R' U2 R U R' U' R U2 F R U R' U' F' R' U R", "U' R U2 R D R' U2 R D' R2 U' R' U' F' U F R", "U2 F R' F' U2 R U R' U R2 U' R' U R U2 R'", "U2 F R' F' R U R U' R' U R U2 R' U' R U' R'", "R D R' U' R D' R2 U' R' U' F' U F R U R", "U' Rw U Rw' R U R' U' Rw U' Rw' R' U' F U R U' R' F' R", "U F' Rw U' Rw' F U2 F R U' R2 F R F'", "U2 R' F R2 U R' U' R U R' F' R' F R U' F'", "U' F U R U2 R' U R U R' F' U2 Rw U Rw' R U R' U' Rw U' Rw'"],
        "5": ["U F U R U' R' F' U F R U' R' U' R U R' F'", "U F R U' R' U' R U2 R' U2 R' F R F' R U R' F'", "U2 F R U' R' U' R U R' F' U R U2 R' U' R U' R'", "U2 R2 F R F' U' R U2 R' U2 R", "U2 F R U' R' U R U R' F' U' R' U' F' U F R", "U' F' U' Rw' F Rw2 U R' U' Rw' F R", "U' R U2 R' U F' U F R U' R' U2 R U2 R'", "U' R U2 R' U2 R F U R U' R' F' U' R' U' R U R'", "R' F' U' F U F R U R' U' F' U R", "U' R U2 R' F' U2 F R U' R' U R U' R'", "R' U R U2 R' F R' F' R2 U R' U R U' R' U R", "U' R U R' U' R' U' F R' F' R U R2 U' R'"],
        "6": ["R U2 R' U' F' U F R U R' U' R U R' U' R U' R'", "R U2 R' U2 F' U2 F U R U R'", "F' U' F R U R' U Rw U R' U' M", "U' R' D R' U' R D' U R U' F R F'", "U F R U' R' U' R U2 R' F' U' F' Rw U Rw'", "U2 F U R' D' R U' R' D R2 U R' U' R U R' U' F'", "R U2 R2 U' F' U F R U' R' F R F'", "M' U M U2 R' F R F' Rw U Rw'", "U' R' F R F' M U R U' R' Rw U Rw' U' Rw U R'", "U' F R U' R' U R U2 R' U' R' F' Rw U R U' Rw'", "U' F R U' R' U' R U R2 F' R U R U R' U' R U' R'", "U F R U' R' U' R U R' F' U2 F R' F' R U R U' R'"],
    },
    oll9 : {
        "name": "Oll9",
        "1": ["R U R' U R U' y R U' R' U R U' R' F'", "U' R' U' R' F R F' U R U' F R U R' U' F'", "U Rw' R2 U2 R' U' R U' R' U' M'", "U' R' U2 R U R' U R F R U R' U' R U R' U' F'", "Rw U Rw' U R U' R' U2 R U2 R' U2 Rw U' Rw'", "U F U' R' U R U F' R' U R' F R F' U R", "U R' U R U R' U Rw U' R' U R U Rw' U R", "U2 M' U' R U2 R' U' R U' R' U' M", "Rw' U' R U' R' U R U M' U' R' U R", "U R U2 R' U' R U' R' U' R U R' U' M' U R U' Rw'", "U' R' U' R' F R F' U F' U' F U R", "U' Rw' U2 R U R' U Rw F R U R' U' R U R' U' F'"],
        "2": ["U' R' U' R U R' U' R' F R F' R U' R' F' U' F R", "R U R' U F' U F U' R U' R' U R U2 R'", "U' F R U R' U' R U R' U' R U' R' F' Rw' F Rw", "U' Rw U Rw' U' F R U R' F Rw U Rw2 F Rw", "U F U R U' R' F' U2 Rw U2 R' U' R U' Rw'", "U2 R' U' F' U F R U R U2 R' U' R U' R'", "U' Rw U R' U R U' R' U R' F R F' R U2 Rw'", "U' R' U2 R2 U2 F R F' U2 R' U2 R' U2 R", "U' F R U R' U' R U R' U' F' U' F U R U' R' F'", "U' R' U' R U' R' U R' F R F' U R", "F R U R' U' F' U' F U R U' R' U R U' R' F'", "U' F R U R' U' F' Rw U2 R' U' R U' Rw'"],
        "3": ["U R' U2 R U2 R' U' R U2 R' U' F' U' F U' R", "U2 F U R U2 R' U2 Rw' F R F' Rw U' R' U' F'", "U R' U F' U2 F R U R' U' R U' R' F R' F' R2", "U2 F R' F' R U2 R U' R' U R U' R' U R U2 R'", "U2 R' U' R y Rw U' Rw' U Rw U Rw'", "U' R U R2 F' U' F U R2 U' R' U' R' F R F'", "U2 R' F R U' M' U F' Rw U Rw' U' M", "U2 F R U R2 U2 R2 U R2 U F' R U R U' R'", "U R U2 R' U R' U' F U R U' R' F' R U' R U' R'", "U2 Rw' F R F' R U M' U2 M U M' U R'", "U Rw' U' R' F R F' U Rw U' Rw' F R F' Rw U R'", "U R U' R2 F' U' F U R2 U' R' U R U R'"],
        "4": ["U2 R U R2 F' U' F R2 U' R' U R' U R", "U R U R' U R U' R' F' U F R' F R F2 U F", "U F R U' R' U2 R' F' U' F U R U R U R' F'", "U2 R U' R' U' F' U2 F U R U R' U' R U' R'", "U Rw' U' F' U2 F R U2 R' U' Rw U2 R' U' R", "U' F R U R' U' R U' R' U R U2 R' U' F'", "U' Rw U2 R' U' R2 D R' U R D' R' U2 Rw'", "U2 R U R2 F' U' F U R U' R U' R'", "U' Rw U R' U R U' R' U R2 D R' U2 R D' Rw' R'", "U' R U2 R' U' R U' R' U2 R' F R U R' U' F' U R", "F R U' R' U' R U2 R' U' F' U' R' U' F U R U' R' F' R", "R' U' R U' R2 F R F' R U2 R' U R U2 R' U2 R"],
        "5": ["U2 R U R' U' R' F R F' U R' F' U' F U R", "R U' R' U M U R U' R2 D' R U' R' D Rw", "R U2 R' U' F' R U2 R' U' R U' R' U' F R U' R'", "U F' U2 F U R U' R' U' R U' R' U F' U2 F", "U Rw' U' R U' R' U2 Rw U Rw U R' U' Rw' F R F'", "U' F R U R' U' R' D' R U' R' D R2 U' R' U F'", "U Rw' U' Rw U' R' U R F' Rw' U Rw F", "U F R' F' R U R U R' F R' F' R U' R U' R'", "U2 F U R U' R' U R U' R' U R U2 R' U' R U R' F'", "U2 R U R' U' R' F R2 U R' U' F'", "R U2 R' U' F' U F R U' R' U2 R' U' R U' R' U2 R", "U2 R U' R U R U R' U' R' U' R2 U2 R' F R F'"],
        "6": ["R U R' U R U' R' U R U' R' F' U F U R U2 R'", "U2 Rw U2 R' U' R U' Rw' R' U' F U R U' R' F' R", "U2 R2 F R F' R U R U R' U R U2 R' U R' U2 R", "U2 F' R U2 R' U2 R' Rw' F Rw U' F R2 U' R'", "U' R' F R F' Rw U' Rw' R' F R F' Rw U2 Rw'", "U2 R U2 R' U' R U' R2 U' F U R U' R' F' R", "R' F' U' F U R Rw U R' U' Rw' F R2 U R' U' F'", "U2 R' U' F' U F U' R U R' F R U R' U' R' F' R2", "U2 F R U' R2 F' U2 R U R' U R2 U2 R' F U' F'", "U Rw' U' Rw U' R' U Rw' D' R U R' D Rw R", "U Rw' U' R U' R' U R' D' R U R' D Rw R", "U' R2 F R F' R U2 R' F' U2 F U' R U' R' U2 R"],
    },
    oll10 : {
        "name": "Oll10",
        "1": ["U M U R' U2 R U R' U R U M'", "U2 F R U R' U' F' U R' U' R' F R F' U R", "R U R' U R' F R F' R U2 R2 F' U' F U R", "U2 R U2 R' U' R U' R' U' F R U R' U' R U R' U' F'", "U R' U F' R U R' U R U2 R' U2 F U' R", "U2 Rw R2 U2 R U R' U R U M", "U' R U R' U R U2 R' Rw U R' U' Rw' R U R U' R'", "U' R' U' R U' R' U y' R' U R U' R' U R Bw", "U' Rw U R' U R U' R' U' M U R U' R'", "U2 F U' R U2 R' U R U R' U' R U2 R' U2 F'", "U2 Rw U R' U' Rw' U2 R U R' U R U' R U' R'", "U2 F R U R' U' R U R' U' F' U2 R U2 R' U' R U' R'"],
        "2": ["R U R' U R U2 R2 U' R' F R F' U R", "U2 F R2 U' R2 U' R2 U R' F' R U R' U' R'", "U2 F R U' R' U2 R U R' U R U' R' U R U' R' F'", "U' R' U' R U' R' U R' F R F' R U' R' U2 R", "U' F R U' R' U R U R' U R U2 R' U' R U R' F'", "Fw R U R' U' Fw' R' U2 R U R' U R", "U' R' U' F' U F R U Rw' U2 R U R' U Rw", "F R U' R' F' Rw' F' Rw U Rw' F U' R U' R' U2 Rw", "U R U R' U R' F R F' R U2 R'", "U F U R' F R F' U' F' R U R' U R U2 R'", "U R' F' U' F U R U' Rw' U2 R U R' U Rw", "U F U R U' R' F' U F R U R' U' R U R' U' F'"],
        "3": ["U R' F R U R' U' F' U R Rw U R' U R U2 Rw'", "U' R' U' R U' R' U R U' R' U' F' U' F R U R' U2 R", "U2 R U R' U' R U' R' U2 R U R' F R' F' R2 U R'", "U' F R U' R' U' R U R' F' Rw U R' U R U2 Rw'", "U' R U' R2 U' F' U F R U' R' F R F' R U2 R'", "U' F R U' R' U' R U R' U R' F R F' R U' R' F'", "F U R U R' F' U F R U R' U R U R' U' F'", "Rw' U Rw U2 Rw' R U R' U' Rw U' R' U' F' U' F R", "U2 R U2 R' U' R U R' U F' U F R U' R' U R U' R'", "U2 Rw U R' U R U2 Rw' U' Rw U R' U' Rw' F R F'", "U' R' U' R F U R U2 R' U2 R' U2 R2 U2 R' U' F'", "F R U R' U' F' U F U R U2 R' U' R U R' F'"],
        "4": ["U' R' U R U' M' U' R' U R2 D R' U R D' Rw'", "U F R U' R' U R U R' F' U' F R U R' U' F'", "U' R U R' U R2 U R' U' R' U F R F' U R'", "U2 R U' R' F' U F R U R' U2 R U2 R'", "U2 R U R2 F' U' F R2 U' R2 U2 R", "U' F U R' U' R U R U2 R' U' R' U R U' R U R' F'", "U2 Rw U R' U R2 D R' U' R D' R' U' Rw'", "R U R' U R U' R' U R U2 R' U F R U' R' U' R U R' F'", "U' R2 U' F R F' R U' R' U F' R' U R F R", "U' R' U' F U R U' R' F' R U2 R U R' U R U2 R'", "U R' U' R U R U R' U' R' F R F' R' U R", "U2 R U R2 U' R' F R F' U R U R U' R'"],
        "5": ["U R' F R U R' U' F' U R F R' F' R U2 R U2 R'", "U2 Rw U R' U R' F R F' R U' R' U' Rw' F R F'", "U2 R U R' U' R' F R U R' U' F' U R U R U' R'", "R U2 R' U' F' U F U R U' R' U R U2 R'", "Rw' U2 R U R2 D' R U' R' D R U2 Rw", "U2 R U R' U' R' F R F' U R' U' R' F R F' U R", "U F R' F' R U2 R' F R F' R U' R' U R U2 R'", "U2 R U R' U R' F R F' R U' R' U' R' F R F'", "U R' U' R U F R U R' U' F' R' U R", "U' F R U' R' U R U R' U R U' R2 F' R U R U' R'", "Rw' D' R U R' D R2 U R' U2 R U Rw R2", "U R U2 R2 U' R2 U' R2 U2 R U R U R' U' R' F R F'"],
        "6": ["U2 F U' R U' R' U2 R U' R' U2 R U2 R' F'", "U2 F R U R2 U' F' U F R2 U' R' U' R U R' F'", "Rw' R U2 R' F' U F U' Rw U' Rw' U' Rw", "U2 R U R' U R U' R' U F' U F U R' F R F'", "U' Rw U' Rw' U M' U' F R' F' R U M", "R U R' U R U' R' U R U' R' F' U F R U' R'", "U R U R' y R' F R U' R' F' R", "U R U2 R2 U' F' U F R U R U' R' U R U2 R'", "U' R U R' U2 F U R U' R' F' R U R' U2 R U2 R'", "U2 F R' F' R2 U' R' U' F R U R' U' R' F' R", "U' R U' F R2 U R' U' R2 F' U2 R' U R U' R'", "U' F R U' R' U2 R U R' F' R U' L' U R' U' L"],
    },
    oll11 : {
        "name": "Oll11",
        "1": ["R' U' R U' R' U2 R U F R U R' U' R U R' U' F'", "U M U' R U R' U R U2 R' U' M'", "U Rw' U' R U' R' U2 Rw U' R U2 R' U' R U' R'", "F' U2 F U' R U R U R' F' U F R U' R' U' R'", "U R U' R' U2 R' U2 R U R' F U R2 U' R' F'", "U2 F R U' R' U2 R U R' F' U' R' F' U' F U R", "Rw' R2 U R' U R U2 R' U M'", "R' F' U' F U R U2 F R U R' U' F'", "U R' U' R' F R F' U R U' R' U' R' F R F' U R", "U' F U' R' U R U F' R' U2 R F R U R' U' F'", "U2 Rw U R' U' Rw' R U R U' R' U R' U2 R U R' U R", "U Rw' U' R U' R' U2 F' Rw U' Rw' F2 Rw"],
        "2": ["U R' U2 R2 U R2 U R2 U2 R2 U' F' U F R", "U F R U R' U' F' U Rw U Rw' U R U' R' Rw U' Rw'", "U' R U2 R' U' R U' R' F R U R' U F' U' F U' F'", "U' R' F R F' Rw U R' U' R U2 R' U2 Rw' F R F'", "U' F U R U' R' U R U' R' F' U' F U R U' R' F'", "U' F U R U' R' U R U2 R' U2 R U R' F'", "U2 F U R' F R F' R' F R F' R U' R' F'", "U R U2 R' F R' F' R U' R U R' U' R U' R'", "U F R U R' U' F' U Rw U R' U R U2 Rw'", "R' U2 R U R' U R U R' U' R' F R F' U R", "U F R U R' U' R U R' U' F' U F U R U' R' F'", "R U2 R2 F R F' R U2 R2 U2 R U R' U R"],
        "3": ["U' R' F R U Rw' F R F' Rw U' R2 F' R U' R U' R'", "U Rw' U' R U' R' U2 R F' Rw U R' U2 Rw' F2 Rw", "R U R' U' R U' R' U' y F R U R' U F'", "U' R U2 R' U2 R' F R F' U' Rw' F R F' Rw U R'", "U2 R' U R U2 R' U' R U' R' F' U2 F R U R' U2 R", "R' U' F U R U' R' F' R U' R' F2 Rw U Rw' F R", "U2 F R U R' U' F' R' F R U R' U' F' U R", "U' R U' R' U R U F R U R' U' F' R' U2 R U2 R'", "U L' U R U' L U R' F R U R' U' R U R' U' F'", "U2 F U R U2 R' U' R U R' F' U' R' F' U' F U R", "U2 Rw U R' U R2 D R' U2 R D' R' Rw'", "U2 R' U2 R U F R2 U' R' U R U R F'"],
        "4": ["F' U' F Rw U Rw' U' R U' R' U' Rw U Rw'", "U2 R U R' U R U2 R' U2 R' F R U R' U' F' U R", "U' R U' R2 U2 R2 U R2 F R F' R' U R2 U R'", "U R' U' R U' R' U2 F R U R' F' R F U' F'", "U2 R U2 R2 F R F' R' F R F' U2 R' F R F'", "U' R2 D' R U2 R' D R2 U R' F' U F R", "F' U' F R U R' U' R U' R' U' Rw U R' U' Rw' R", "U2 Rw U R' U R U2 Rw' U F' Rw U R' U' Rw' F R", "U' F R U2 R2 F R F' U R U R' U' R U' R' U' F'", "U2 Rw U Rw' U R U' Rw D R' U R D' R' U2 Rw'", "R' U' F U R U' R' F Rw U Rw' F U' F' U F R", "U' Rw' F R U R' F U' F' R U' R' U2 R U2 M'"],
        "5": ["U' R' F R F' U' F R' F' R2 U R' U' R U' R'", "U Rw' U Rw' F2 R F' U2 R U R' U R' F2 Rw2", "U R U' R' U' R U' R' U2 F' U F U' R U R'", "U2 Rw U R' U' Rw' F R U R U' F' Rw U R' U' Rw'", "U2 R' U' R' F' U F U R' U' R2 U' F' U2 F R'", "U2 Rw U Rw' F' Rw U R' U' Rw' F Rw U R U2 Rw'", "U2 R U R U F R F' U2 R' U' Rw U R' U' Rw'", "U' F R' F' U' R' U' R U F R U R U' F'", "U2 R U R' U R' F R U R' U' F' U R U' R U2 R'", "U' R' U2 R U2 F R U R' U' R' U R2 U' R' F'", "U2 F R2 D R' U R D' R2 U' R U R' U' F'", "U2 R U R' U' R' F R F' U2 F R U' R' U R U R' F'"],
        "6": ["U Rw' D' R U R' D R2 U R' U' M' U' R U R'", "U' R U2 R' U2 R' F R F' U2 R U2 R' U' R U' R'", "U Rw' F R F' Rw U' R' U' R U R' U2 R' F R F'", "U' R U2 R' U2 R' F R F' U R' U' R U' R' U2 R", "U2 F R U R' U' R U R' F' R' F U' F' U R", "U R' F R F' Rw U' R' U' R U Rw' U2 R' F R F'", "U2 Rw U R' U R U2 Rw' F R' F' Rw U R U' Rw'", "U2 F R' F' R U2 Rw' F R F' Rw U' R' U R U2 R'", "R' U2 R U' R' U' Rw' F R F' R U' R' U Rw", "R' U R U2 R2 U' F' U F R U' R U R' U R", "U2 R U R' U' R' F R F' U2 R U R' U' R' F R F'", "U F U R U2 R' U' R U R' F' R U2 R2 F R F' R U2 R'"],
    },
    oll12 : {
        "name": "Oll12",
        "1": ["U R U R' F' U2 F R U' R' U2 F R U R' U' F'", "R U2 R2 F2 Rw U' R U' R' U2 Rw' F2 R", "F R U R' U' F' U2 R' F' U' F U R", "U' M' R' U' R U' R' U2 R U' M", "U2 M' U R' U' R U' R' U2 R U M", "Rw' U Rw2 U' Rw2 U' Rw2 U Rw' U R U R' U R U2 R'", "R U2 R' U F' U' F' Rw U Rw' U' Rw' F Rw F", "U2 Rw U R' U R U2 Rw' U R' U2 R U R' U R", "U' R' U' R U' R' U2 R U R U R' U' M' U R U' Rw'", "U R U' R' U' R U R' U' Rw R U R' U R U2 R' Rw'", "U R U R' U R U2 R' Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "F R U R' U' F' U F R U R' U' F'"],
        "2": ["U2 F R U R' U' F' Rw U Rw' R U R' U' Rw U' Rw'", "U' Rw U Rw' R U R' U' Rw U' Rw' U' F U R U' R' F'", "U2 R U2 R2 U' R2 U' R2 U2 R U F U R U' R' F'", "U' R' F' R U' F U2 R U R' U F' U R' F R", "U' R U2 R' U' R U' R' U' R' U' R' F R F' U R", "U2 R' U2 R U R' U F' U' F U' R U R' U R", "Rw' U' R' F R F' R' F R F' U F' U' F U Rw", "R U' R' U2 R U y R U R' U R U R' F'", "U' R U2 R' U' F' R' U' R F R' U R2 U2 R'", "U Rw' U' F' U F U' R U' R' U2 Rw", "R U2 R2 F R F' R U2 R' U R U2 R' U' R U' R'", "F U R U' R' U R U' R' F' U' F R U R' U' F'"],
        "3": ["R' U' R U' R' U R U' R' U R y R U R' U' F' U2 F", "U R U R' U R U' R2 F R F' R U R' F' U F", "U' F' R U R' U R U2 R' U2 F' Rw U Rw' U2 F", "U Rw' U2 R' F' R U R U' R' F U2 Rw", "U R U2 R' U' R U R' U2 R' U' F R F' U' R' U2 R", "U' R2 D' Rw U Rw' D R F' U' F R", "U R' F' U2 F R U R' U' R U2 R' U2 R U2 R' U2 R", "U2 R' U2 R2 U R2 F' U F R F' U F R U' R'", "U2 Rw U R' U2 Rw' F R U R U' R' F' Rw U Rw'", "U' F' U' Rw U Rw' U' Rw' F Rw U Rw U' R' U R U Rw'", "U Rw' F R F' Rw U Rw' U M' U2 M U M'", "U F R U' R' U R U R' F' U R U R' U' R' F R F'"],
        "4": ["U' R' F' U' F U R F' Rw U Rw' U2 Rw' F2 Rw", "F R U' R' U R U2 R' U' F' U Rw U R' U' Rw' R U R U' R'", "U' R U R' U R U' R2 F' U' F U R U' R U R' U' R U' R'", "U' R2 D' Rw U Rw' F Rw U Rw' F2 D R2", "U R' F2 R U2 R U2 R' F2 U2 R' F R F'", "U' Rw U R' U' Rw' F R2 U' R' U R U2 R' U' F'", "U2 R' F' U' F U Rw' D' Rw U' Rw' D Rw U R", "U' F U F R U R' U' F' U R U R' U R U R' F'", "U2 F U R U2 R' U R U R' U R U' R' F'", "U' Rw' F' Rw U Rw U' Rw' F2 R U' R' U R U R' F'", "U' R U R' U' R' F R2 U' R' U R U2 R' U' F'", "U2 R U R' U R U2 R' U2 F U R U2 R' U' R U R' F'"],
        "5": ["U' F' U' F U Rw U R' U' R U2 R' U' R U' Rw'", "R U R2 F R F' R U R' F' U' y' R U R' U R", "U' R U R' U' R' F R F' Rw U2 R' U' R U' Rw'", "U2 F R' F' R U2 R U2 R' U R U R' U R U2 R'", "R2 D R' U R D' R' U R' U' F' U F R U' R'", "U' Rw U R' U' Rw' F R F' Rw U2 R' U' R U' Rw'", "F R' F R U2 Rw U' Rw' U2 F Rw U Rw'", "R U R' U' R U' F U F' R2 F R U' F'", "R' U' R U2 F R U R F R F' R U' F'", "R U2 R2 U2 R2 U R2 U R U' R' F R F'", "U' F R U R' U' R U' R' U' R U R' U R U' R' F'", "U R U2 R' U' Bw' R2 U R U' R' U' R' Fw z'"],
        "6": ["U R' F U' F' U R U F U R U' R' U' F'", "U' R' F' U' F U R2 U2 R' U2 R' F R F'", "U2 Rw U' Rw' U' Rw U Rw' F' U F Rw U R' U R U2 Rw'", "R U R' U' F' U' F R' U' R2 U' R2 U2 R2 U R'", "U' F R U' R' U' R U R' F' U2 R U2 R2 F R F' R U2 R'", "F U R U' R' U' R U' R' U' R' F R F' U2 F'", "U F R U R' F R' F' R U' R U' R' U R U R' F'", "U R' U' F' U F R U2 R U2 R' U2 R' F R F'", "U2 Rw U R' U R U2 R U R' U' Rw' F R F' R'", "U M U Rw U' Rw' U' Rw U R' F' U' y' R U R' U R", "U2 R U' R' U' F' U2 F U2 R U' R' U R U2 R'", "R' U' R' F R F' U R U' R U2 R' U2 R' F R F'"],
    },
    oll13 : {
        "name": "Oll13",
        "1": ["U R' U' Rw U' R' U' R U Rw' U' R U' R' U' R", "U2 Rw U' Rw' U R U R' U Rw U2 Rw' U Rw U Rw'", "R' U' R U' Rw U R2 U R2 U2 Rw'", "U2 R' U' R U M U' R' U Rw R U R' U R U2 R'", "R' U' F' U F R U2 F U R U' R' F'", "U2 F U' R U R' U2 R U R' U R U R' U F'", "U2 Rw U Rw' U R U' R2 Rw U' M U R U' R'", "U Rw U Rw' R U R' U R U2 R' U2 Rw U' Rw'", "U2 R U R' U R U2 R' U' Rw U R' U' Rw' R U R U' R'", "U' R U R' U R' F R F' R U' R' F' U2 F R U' R'", "M' U2 R U' Rw' U R U R' U2 Rw U Rw'", "U2 R U R' U' M' U R U' Rw' R U R' U R U2 R'"],
        "2": ["U2 Rw' U2 R U R' U Rw U R' U' R' F R F' U R", "U2 R U R' U' R' F R F' R U' L' U R' U' L", "U' R' U2 R U R' F R' F' R2 U' R' U2 R", "U Rw U2 R' F R' F' R2 U' R' U R U2 Rw'", "U' R U R' U R U2 R' U' R U R' F' U2 F R U' R'", "U R' U' F' U F R F R U R' U' R U R' U' F'", "R' U F2 U' F R U R' U' F' U2 F2 U' R", "U' F R U R' U' R U R' U' F' U' R' U2 R U R' F' U F R", "U' R U2 R2 U' R2 U' R2 U F' U F R", "U R' U' R' F R F' U R U' R U R' U R U2 R'", "U' R U R' U R U2 R' U R' U' F' U F R", "U2 F R U' R' U2 R U R' U R' F R F' R U' R' F'"],
        "3": ["U' R' U2 R U R' U' R U y Rw U' Rw' U Rw U Rw'", "U2 F U R U2 R' U R U R' F' U' F U R U' R' F'", "F R U' R' U' R' U' R U' R' U2 R2 U2 R' U' F'", "U2 R' U2 R U R' U' R U F R U' R2 U2 R2 U R' F'", "F R U R' U Rw U' Rw' U' Rw F R U' R' F' Rw'", "F' U F R U R' F2 Rw U Rw' U Rw' F Rw F", "U' Rw' U' F' U F Rw F' Rw U R' U' Rw' F R", "U R U R' U R' U' F' U F R2 U' R'", "F R U R' U' R U' R' U' R U2 R' U' F'", "U R U R' U' R U R' F' U2 F R U2 R'", "U2 F U R U2 R' U' R U R' F'", "U2 F R U' R' U R U R' F' R U R' U R U2 R'"],
        "4": ["U Rw U R' U R U2 Rw' U' R U R' U' R' F R F'", "U2 R U R' U' R' F R F' R U R' U R U2 R'", "U2 R U R' F' R U R' U R U2 R' U F R U' R'", "U2 Rw U' Rw' F R U R' U' R F' Rw U R2 U R U' Rw'", "U' R' U' R F U R U' R' F' U2 R' U R U' R' U2 R", "U2 R U R' U' R' F R F' U' R' U2 R U R' U R", "Rw' U2 R U R' U Rw R U R' U' R' F R F'", "Rw U Rw' R U R' U' Rw U' Rw' U' L' U R U' L U R'", "U2 R F U R' U' F' U2 R U2 R' U' R2 U' R2", "U' R' U' R U' R' U' Rw U R' U' F' U' F M R", "U R' U2 F U R U2 R' U' Rw U2 Rw' U' F' U R", "U F R U R' U' R U R' U F' U F R U' R' U F'"],
        "5": ["U F' Rw U R' U F' Rw U Rw2 F2 R U' R' F R", "U F' U F U' R U' R' U' R U R' F R' F' R", "U' F R U R2 U' F' U F R2 U' R' U R U R' F'", "U2 Rw U' Rw' U' Rw U Rw' y' R' U R", "U' Rw' D' Rw U' Rw' D Rw U x U R' U' R x'", "U' R' U2 R U2 R' U2 R U2 R' U R U' R' F' U2 F R", "U2 F U R U' R' U R U' R2 D' R U R' D R U' F'", "U F R U R' U' R' F' R2 U R' F' U2 F R U2 R'", "U2 Rw U' Rw' F R U R' U' R' F' Rw U2 R U' Rw'", "R U R' y' R2 Rw U R U' Rw' U' R", "Rw U2 Rw' U2 R' F R U R U' R' U F' U' R' F' R", "U R' F' U' F U' R' D' Rw U2 Rw' D R2"],
        "6": ["U R U R' F' U F R U' R' Rw U R' U R U2 Rw'", "U2 R' U' R' F' R U R U' R' U' F U' R U R' U R", "Rw' F' U' F U Rw F R' F' R U2 R U2 R'", "U R U2 R' U' F' U F R U' R' U R' U' F' U F R", "U Rw U R' U' Rw' F R F' R' F' U' F U R", "U2 R' U' R U R' U F U R U' R' F' R U' R' U R", "U F' U' F U R U' R' F' U F R U R' U2 R U' R'", "Rw' U' M' U R' D' R U2 R' D R2 U Rw' U Rw", "U Rw U R' U' Rw' F R F' U' F R U R' U' F'", "U2 F U R U' R2 F' R U R U' R'", "U2 F U' R U' R' U' F' U F R U2 R' U F'", "U' R U R' U2 R' U' F U R U' R' F' R2 U2 R'"],
    },
    oll14 : {
        "name": "Oll14",
        "1": ["U F U R U' R' F' U2 R' U' F' U F R", "U R' F' R U2 R' U' R U' R' U2 F R", "U F U R U' R' F' U' R' U2 R U R' F' U F R", "U' R' U F' U2 R U2 R' U' R U' R' F U' R", "U' R U Rw' U R U R' U' Rw U R' U R U R'", "U' R' U2 R U R' U R U Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "R U R' U Rw' U' R2 U' R2 U2 Rw", "Rw U R' U R U2 Rw' Fw R U R' U' R U R' U' Fw'", "U2 R U R' U R U2 R' U' F R U R' U' R U R' U' F'", "U R' F' U' F R U R' F' R U R' U' R' F R2", "R U R' U' M' U R U' Rw' U' R U2 R' U' R U' R'", "U' R' U' F' U F U2 R U R2 F R F' U R"],
        "2": ["U2 F R U' R' U R U R' F' U L' U R U' L U R'", "U' R' F' U' F U R2 U2 R2 U' R2 U' R2 U2 R", "U Rw' U' R U' R' U2 Rw R' U' R' F R F' U R", "U R U2 R' U' R U R2 F R F' R U2 R'", "U' R U R' U R' U' R2 U' R2 U R' F R F' U R", "U' R' U' R' F R F' U R U R' U' R U' R' U2 R", "U R U R' U R U' R' U R' F R F' R U2 R'", "F R U' R' U R U2 R' U' R U' R' U' R U R' F'", "U' R' U' R' F R F' U R U2 R U2 R' U' R U' R'", "U2 R U2 R' U' R U' R' U R' U2 R U R' F' U F R", "U R U2 R2 U' R2 U R2 U' R2 U' R2 F' U F R", "U2 R U2 R' U' R U' R2 U' F' U F R"],
        "3": ["U' R' U' R U' R' U F' U R U R' U' R' F R U R", "Rw U2 R' U' R U' Rw' R U R' U' R' F R F'", "U R' F' U F R U R' U R U2 R' U F' U2 F U R", "U' R' U' F U F' R F R U' R' U R U' R' F'", "Rw U R' U' Rw' F R2 U R' U' F'", "U2 R U2 R' U' R U R' F R' F' R U2 R' F R F'", "R U R' U' R' U R U R U' R' U R' F' U2 F R", "U2 R U2 R' U2 F R U' R' U R U R' F' R U2 R'", "U' R' U' R F U R U' R' F' U' R' U R", "F' U' Rw' F2 Rw U' F R U' R'", "U' R' U' R U R' U' R y R U2 R' F' U2 F", "U2 R U R' U' R' F R F' U' R' U' R U' R' U2 R"],
        "4": ["U2 F R U' R' U R U R' F' U' R' U' R U' R' U2 R", "U' Rw' U' R U' R' U Rw' D' Rw U Rw' D Rw2", "U2 R U R' U2 F' U' F U2 R' F R F'", "U2 F R U' R' U R U R' F' R U2 R' U' R U' R'", "Rw U2 R' U' R U' Rw' F R U' R' U R U R' F'", "U' F' U2 R' F' R U' R U R' U2 F U R' F R", "U2 F R U' R' U R U2 R' U' F' R' U' F' U F R", "U2 Rw U' Rw' F' R U R' U' R' F Rw U Rw' F R F'", "U' F' Rw U Rw' U2 Rw' F2 Rw U F R U R' U' F'", "U2 R U R' F' U' Rw U2 R' U' R U' Rw' F R U' R'", "Rw R D R' U R D' Rw' U R' U' Rw U' Rw'", "U' F U' R U R' F' U' F U' R U' R' U R U' R' F'"],
        "5": ["F R U R' U' F' U F R U' R' U' R U2 R' U' F'", "U' F R U' R' U' R U R' F' Rw' U' R U' R' U2 Rw", "U' F U R U' R' F' U' F' Rw U Rw' U2 Rw' F2 Rw", "U2 R U R' U2 F' U F R U' R' U R U' R'", "R U2 R' U2 R U' R' F' U' F R U R'", "U' R' U' F U R U' R' F' R F U R U' R' F'", "U' L' U R U' L U2 R' U' R' F R F'", "U R' F' U' F U R U' F' Rw U R' U' Rw' F R", "U R' U2 R' D' R U2 R' D R U' R' F R F' U R", "U' R' U F' U F U R U' R' F' U2 F U' R", "F' U' Rw' F Rw2 U Rw' U' Rw' F Rw", "U R' U' R U2 R U2 R' U' F' U F R U' R2 U2 R"],
        "6": ["U2 R' U' R U' R' U' R U2 R2 U' F' U F R U R", "U F U' R U R' F' U' F U' R U2 R' U' R U R' F'", "U F R' F' R U2 R U' R' U R' U' F' U F R2 U' R'", "U2 Rw U2 R' U' R U R' U' R2 U' Rw' F U R' U' F'", "F U R U' R2 F' R U2 R U' R' U R U2 R'", "R' F R U R' F' R F U' F'", "L' U2 R U R' U2 L U R' F R F'", "U2 R' F R U R U2 R2 F' R2 U2 R' F U' F'", "U2 F U R U' R' U R2 D R' U2 R D' R' U R' F'", "U2 R' F2 R U2 Rw U' Rw' U' Rw' F Rw U' F U Rw U Rw'", "R' U' R y Rw' R2 U' R' U Rw U R'", "R2 D' Rw U2 Rw' D R U F' U F R"],
    },
    oll15 : {
        "name": "Oll15",
        "1": ["Rw' U' M' U' R U Rw' U Rw", "U2 R U' R' F' U2 F U R U' R' U F' U F", "U2 R' U' R U' R' U2 R U' Rw U2 R' U' R U' Rw'", "U2 Rw U Rw' U2 R U2 R' U2 R U R' U' Rw U' Rw'", "F R U' R' F' U' Rw' F Rw F R U R' F'", "F R U' R2 U2 R U R' U R U2 R U R' F'", "U' R U2 R' U' R U' R' U Rw' U' R U' R' U2 Rw", "Fw R U R' U' Fw' R U R' F' U2 F R U' R'", "R' U2 R U R' U R U Rw U R' U' Rw' R U R U' R'", "U' R' U' R U' R' U2 R F R U R' U' R U R' U' F'", "U R U R' U R U2 R' U Rw U R' U' Rw' R U R U' R'", "U2 R U2 R' U' R U' R' F R U R' U' R U R' U' F'"],
        "2": ["Rw U2 R' U' R U' Rw' U R' U' R U' R' U F' U F R", "U' R' F' U' F U R U' R' U2 R U R' U R", "U' R U2 R' U' R U R' U F' U' F U' R U' R'", "U Rw' U' R U' R' U R' F R F' R U' R' U2 Rw", "U Rw' U2 R U R' U Rw R' F' U' F U R", "U2 F R U R' U' F' U R U R' U R U2 R'", "U' R' F' U2 F U' R U R2 F R F' R U R' U R", "U2 Rw U R' U R U2 Rw' U2 F R U R' U' F'", "U2 Rw U R' U R U2 Rw' U' R' F' U' F U R", "R' U R U2 R' U' R U2 R' U' R U' R' F' U F R", "U' R' F' U' F R2 U R2 U R2 U' R2 U R2 U2 R'", "U2 F R U R' U' F' R' U2 R U R' U R"],
        "3": ["R U R' F' R U R' U' R' U' F R2 U' R2 U2 R", "U2 R U R' F' U' F U R U' R' U R U2 R'", "U2 R U2 R2 F R F' R' F R F' R U' R' U' R' F R F'", "U2 R U R' F' U' F U R U2 R' U' R' U2 R U R' U R", "U' R U2 R' U' R U' R' U' R U2 R' U2 R' F R F'", "U' R' U2 F' U F U' R U2 R' U R U R' U' R", "U' R U2 R2 U' R F' R' U R U F R U' R'", "Rw U R' U' Rw' F R F' U R' U' R' F R F' U R", "U2 F R U' R' U R U2 R' U' R U R' U' R U R' U' F'", "R' U' R U' Rw U R D' R U R' D R' U2 Rw'", "U' R' Rw U R' U' Rw' D' Rw U' Rw' D R2 U R' U R", "U2 R' U2 R U R' U R2 U R' F' U F R U' R'"],
        "4": ["U' F R U' R' U R U2 R' U F' U F R U' R' U F'", "U R U2 R' U2 y R U R' F R U' R' F2 U2 F", "U2 R' U' R U R' U2 R U' R' U2 F' U2 F U' R", "U2 R' U R U R U2 F R F' U' R' U R' U' R2 U' R'", "U2 R U2 R' U' R U R' U' R U R' U2 R' F R F'", "U' R' F' U' F U R2 U' L' U R' U' L", "U2 R' F' U F R' D' Rw U' Rw' D R2", "U2 F R U R' U' F' U R U' L' U R' U' L", "U2 Rw U2 R' U' R U R' U2 Rw' F R2 U R' U' F'", "R' U2 R F R U R' F' R' F U' F' R U' R' U' R", "U2 F R U' R' F' Rw U Rw' U' Rw' F Rw R U R' F'", "U2 R' F' U F R' D' Rw U Rw' R U2 R' D R2"],
        "5": ["U2 R' U' R U' R' U2 R U' F R U' R' U R U2 R' U' F'", "U' R' U2 R U R' F U R U' R' F' R", "U' R' F2 Rw U2 R U' Rw' F U F R U R' U' F'", "U' R' U' R F R' U R F R' F' R U' F'", "U' R U R' U R U' R' U' F' U2 F U R U R'", "R U2 R' F' Rw' F Rw U F U' R U2 R'", "U R' U2 R U R' U2 R U2 R' U' F' U F U R", "F R U R' U' F' R2 D' Rw U2 Rw' D R U2 R", "U' R' U' F U R U' R' F' U' F' U F R", "F R U' R' U' R U R' F' U' F R U' R' U' R U R' F'", "U' R' U2 R U F R2 U' R2 U R U R U F'", "U R' U' R' F R F' U R U2 F R U' R' U' R U2 R' U' F'"],
        "6": ["U F R U' R' U' R U R' F' U' Rw' U2 R U R' U Rw", "U2 R' U2 R U R' U R U F R U' R' U' R U R' F'", "U' R U R' U' R U R' U R' F R U2 y' R2 U' R2 U' R'", "U R' F' R U R' D R U2 R' D' R U R' U' F U R", "R' F R U R' U Rw U' Rw' U' R U' R' F' U' R", "U' R U2 R2 F R F' R' U' R U' R' U2 F R F'", "F U R U' R D R' U' R D' R2 U' R U R' F'", "R' F' Rw' F' Rw U F R2 D R' U R D' R'", "F R F' U2 R' U R U R' U' R U2 x U R' U' x'", "U' F' Rw U R' U' Rw' F R U R U R' U' R' F R F'", "Rw' U2 R' D' R U R' D Rw U' R U Rw' U Rw", "U F' U' F Rw U R' U' R U' Rw' U' Rw U Rw'"],
    },
    oll16 : {
        "name": "Oll16",
        "1": ["U R' U' F' U F R F U R U' R' F'", "Rw U' Rw' U' R U2 R' U' R U' R' U' Rw U Rw'", "U R' U' R F U R U' R' U' R' U R U F'", "U R' U' F' U F R U F R U' R' U2 R U R' F'", "R U R' U R U2 R' U Rw' U2 R U R' U Rw", "U Rw' U' R U' R' U2 Rw U' R U R' U' M' U R U' Rw'", "U2 Rw U Rw' R U R' U' Rw U' Rw'", "U R U R' U R U2 R' U' Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "U2 R' U2 R U R' U R U F R U R' U' R U R' U' F'", "U2 R U' R' U R Rw' U Rw U' Rw' U' Rw U R'", "U2 Rw U' Rw' U2 R U' R' U' Rw U R' U2 M", "U' R U2 R2 F R F' R U2 R' U F R U R' U' F'"],
        "2": ["Rw' U' Rw U' R' U M U Rw U R' U' F' U F R", "F R U R' U' R U R' U' F' R' U' F' U F R", "F R U R' U' F' R U2 R' U' R U' R'", "R' U' F' U F R U2 F R U R' U' R U R' U' F'", "U R' F' U' F U R U2 R' U' R U' R' U2 R", "U Rw U2 R' U' R U' Rw' U F R U R' U' F'", "Rw' U' R U' R' U2 Rw U' R' F' U' F U R", "U' F R U' R' F' Rw' F Rw U Rw U2 R' U' R U' Rw'", "Rw' U' R U' R' U2 Rw U2 F R U R' U' F'", "Rw U Rw' R U R' U F' U' F U' Rw U' Rw'", "F R U R' U' F' U' R' U' R U' R' U2 R", "U F R U R' F R' F' R U' R U' R' U2 R U R' F'"],
        "3": ["U2 R' F R F' R U' R' U R U R' U F' U' F", "R U R' U' R' F R F' U R' U2 R U R' U' R U R' U R", "U2 R U2 R' U R U R' U2 R U' R2 F R F' R U R'", "U' Rw' F R F' Rw U2 R' U' M' U R U' Rw'", "U2 F' U' F R U2 R D Rw' U Rw D' R2", "R U' R' F' U' F R U R' U R U' R' U' R U R'", "R U R' F' U' F R U R' U' R U R' U' R U' R'", "U F R' F' R U2 R U' R' U R' F R F Rw U Rw' F", "U R' F' R U R U' R' U' F U R U R'", "U R' U' R F R' F' U F R U R U' R' F'", "F R U' R' U' R U R' F' U' F R U R' U' R U R' U' F'", "R U R' U2 R U' R' U' R U2 R2 F R F' R U R'"],
        "4": ["R' F R U R' U' F' R U' R' U2 R", "F U R U2 R' U' R U R' F' U R' U2 R U R' U R", "U2 R U2 R' U F' Rw U' Rw' F2 U R' F R F'", "U' R' U2 R2 U R2 F' U F R2 U' R'", "U R' U' R' D' R U R' D R U' R' F R F' U R", "R' F R U R' U' F' U R U R U2 R' U' R U' R'", "U' Rw' U' R U' R' U2 Rw U' R' F R U R' U' F' U R", "U2 F U R U' R' U R U2 R' U R U R' U R U' R' F'", "F U R U2 R' U' R U R' F' U2 R U R' U R U2 R'", "U' R D Rw' U Rw D' R2 F' U' F R", "U2 R U R' U Rw' U' R' D R' U' R D' R U2 Rw", "R U2 R' U' R U' R' F R U' R' U' R U R' F'"],
        "5": ["U' R U2 R' U' R U R' U' F' U F R U' R'", "R U R' U R U' R' U R U2 R' F R' F' R U R U' R'", "U R U2 R' U2 R' F R F' Rw' U' F' U F Rw", "U' R' U' R U R U2 R' U' R' U R U2 R' F R F'", "U R U2 R' U2 R' F R F' U F R U R' U' F'", "U' Rw U R' U' Rw' F R F' U2 R' U' R' F R F' U R", "U2 R2 D R' U R D' R2 U' R' F R F'", "F U R' U' F' U F R U R U' R' F'", "U2 F R U R' U' F' R2 D R' U2 R D' R' U2 R'", "U R' F' U' F U' F' R U R' U' R' F R2 U R' U R", "U' R U' R' F' Rw U' Rw' F' R' F' R U' R U2 R'", "U2 R U2 R2 F R U R' U' F' U R U2 R U' R'"],
        "6": ["R U2 R' U2 R' F R F' R U R' U' R' F R F'", "R U R' U R U R' U' F' U R U R' U' R' F R", "U R2 F2 R U' F R' F R F' R U R' F U' F U R", "R U2 R' U' R U R U y R U' R' F' R U R' U F'", "U2 R U' R' F' U' F U R U R2 D' R U' R' D R", "U2 R2 D R' U2 R D' R' U2 R' F R U R' U' F'", "U R' U' R' F R F' U' R' D' R U2 R' D R2", "U' R' U' R U' R' U2 R2 U R' U R U' R' U' R' F R F'", "Rw U Rw' R U R' U' Rw U' Rw' F R' F' Rw U R U' Rw'", "U2 Rw U2 R D R' U' R D' Rw' U R' U' Rw U' Rw'", "U R U R2 D' R U R' D F R F Rw U Rw' F", "Rw U' Rw' U Rw U R' U R U' Rw' F' U F"],
    },
    oll17 : {
        "name": "Oll17",
        "1": ["U' R2 F R F' U2 R U' R' F' U F U R U R' U2 R", "U F U' R U R' U2 F' U F U R U2 R' U F'", "U2 R' U F' U2 F U R U R' U2 F' U F U' R", "R U2 R' U R U' R' F' U F U R U' R2 F R F'", "U' R' F R F' R U2 R' U' F' U' F2 R U R' U' F'", "U2 R U R' U R U2 R' F U R U' R' F' R' F' U' F U R", "U Rw U' Rw' F2 R U' R' U R U R' U' F' U2 Rw' F Rw", "F' Rw U' Rw' F2 U' R U R' U2 M' U R U' Rw'", "U Rw' U' R U' R' U2 Rw U2 Rw' U2 R U R' U Rw", "U2 Rw U2 R' U' R U' Rw' U2 Rw U R' U R U2 Rw'", "R U R' U R' F R U R' U' F' U R U R' F R F'", "Rw' U' Rw U2 Rw' U R U2 R2 U' R U' R' U2 R U' Rw"],
        "2": ["Rw' F U' R U' R' U2 Rw F U R U' R' U' F'", "U R U2 R2 F R F' R U2 R' U' F R U R' U' R U R' U' F'", "U' F U R U' R' F' U' Rw U Rw' R U R' U' Rw U' Rw'", "U Rw U2 R2 F R F' R U' R' U2 R U2 Rw' U2 Rw U' Rw'", "R' U2 R' D' Rw U' Rw' D R F' U2 F U R", "R U' R' U R U' R' U' F' U2 Rw' F Rw2 U' Rw' F2", "U R' U' F' U2 F R' D' Rw U Rw' D R U2 R", "U2 Rw U' Rw' F2 R U' R' U R U' R' U' F' U2 Rw' F Rw", "U Rw U2 Rw' F R' F' R2 U2 R' M' U' M", "R' F R F U' R U' R' F' R U R' U F2 R U2 R'", "U' R' U R U' R' U R U' R2 F R F2 U' F U2 R", "R' U' F' U F R U2 Rw U Rw' R U R' U' Rw U' Rw'"],
        "3": ["U2 R' U' F U R U' R' F2 U' F U R", "F R U R' F' U' F R U2 R' U F' U' Rw U' Rw' F", "Rw' U' R' F2 R F' U Rw F U2 F'", "R2 F Rw U Rw' R U2 F' R U' Rw' F Rw", "U2 F R U' R' F U R U' R' F' U R U R' F'", "U F' R U2 R' U' F' U F R U' R' U' L' U' L U F", "R' F R U' M' U2 Rw' U' F' U R", "R' F R F' U2 R' F R U y' R2 U R2 U2 R'", "U2 R' U' F U R U' R' F' R U' F R U R' U' F'", "U' F R U2 R2 U' F' U F R U2 F'", "U2 R' U' F' U F R U2 F R U' R' U R U R' F'", "U Rw' U2 R U R' U Rw F' Rw U Rw' U2 Rw' F2 Rw"],
        "4": ["U F R U R' U' F' U' F' U' F Rw U' Rw' U Rw U Rw'", "U' R U2 R' U F' U' F2 R U R' U' F' U R U R'", "x' U' R U' R' U R U' R' U F2 R U' R' U2 x", "U R' U F' U R' F R U R' F' R U F U R", "U2 R' U' R' F R F' R U' R' U2 F R U R' U' F' U R", "R U R' U R' F R F' U2 R' F R F'", "U' R U R D Rw' U Rw R' U R D' R2 U R U R'", "U2 Rw U' Rw' F U2 F U' R U' R' F'", "U F U R U' R2 U' R' U' R U R F' U F R F'", "U Rw' U' R' U Rw U Rw' F' U' F R2 U' R' U2 Rw", "R U2 R' U F2 Rw U Rw' F U R' F R F'", "U2 R' U' F' U F R U2 R U R' U' R' F R F'"],
        "5": ["U F U R U' R' U R U' R' F' U2 F R U' R' U' R U R' F'", "U' R' U' F' U F R2 U R' U' R' F R F'", "U2 R U2 R' U' F' U F R U' R' U' R U R' U' R' F R F'", "F R U R' U2 R U' R' F R U R' U' F' U2 F'", "U R U2 R' U2 R' F R F' U2 F R U R' U' R U R' U' F'", "U2 M' U' M U2 Rw U' Rw' U' F' U F", "U2 F R' F' R U R U' R' U' R U R' U' M' U R U' Rw'", "U R U2 R' U' F' U F R U' R' U2 R' F' U' F U R", "F R' F' R U R U' R' U2 R' U' R' F R F' U R", "Fw R U R' U' Fw' U' R U R' U' R' F R F'", "U R' F' U2 F2 U R U' R' F' U2 R", "R' U2 R U2 F R F' U2 y M' U M"],
        "6": ["U R' U' R' F' U' F U R2 U2 R' U2 F' U F R", "U' R' U2 R U R' U2 R2 D Rw' U Rw D' R2 U' R", "U Rw' U2 R U R' U Rw R U2 R' U2 R' F R F'", "U' R' U' F' U F R F R U' R' U R U R' F'", "U' F U' R U' R' F' U' F R U R' U R U R' F'", "U R' U R2 D Rw' U Rw D' R2 U R U R' U R", "U' F R U' R' U R U2 R' U' F' U' F R U R' U' F'", "R U R' U' R U R' F' L' U' L U' F U' R U' R'", "U Rw' U Rw U' Rw' F' U' F R U' R' U' R U R' U Rw", "U R U2 R2 F R F' U F' U' F U2 R' F R F'", "U' F R' F' R2 U R' F' U' F U' R' F R F' R U2 R'", "Fw R U R' U' Fw' U' F R U' R' U R U R' F'"],
    },
    oll18 : {
        "name": "Oll18",
        "1": ["U R' U' F' U F R U R' U' R U' R' U F' U F R", "Rw U R' U R U2 Rw' U F R U R' U' R U R' U' F'", "U' R' U2 R U R2 F R F' U R U R' U' F' U F R", "U2 F U' R U R' U F' U2 F U R U R' U2 F'", "U Rw U2 R' U' R U' Rw' U2 F R U R' U' R U R' U' F'", "U' Rw U R' U R U2 Rw2 U' Rw U' R' U R Rw' U Rw", "U2 R' U2 R U R2 F R F' U R U F U R U' R' F'", "R U2 R' U2 R' F R F' U' R' U' F U R U' R' F' R", "U' Rw U R' U R U2 Rw2 U' R U' R' U2 Rw", "U Rw' U' R U' R' U2 Rw2 U R' U R U2 Rw'", "U2 Rw2 F2 R2 U2 Rw' U Rw U2 R2 F' Rw U' Rw", "R U R' U' R' F R2 U R' U2 R' F R F' R U R' F'"],
        "2": ["Fw R U R' U' Fw' U' R U R' U' M' U R U' Rw'", "U Rw U R' U' Rw' R U R U' R' U' F R U R' U' F'", "Rw U2 Rw' U2 R' F R F' U' F' U' F U Rw U Rw'", "U2 Rw' U' R' F R F' R' F R U Rw F U' F'", "Rw' U2 R U R' U Rw U' F U R U' R' F'", "U R U R' U R' F R F' U2 M' U R U' Rw'", "R' F' U' F U R U2 Rw U R' U R U2 Rw'", "Rw U2 R' U' R U' Rw' U2 R' U' F' U F R", "U' F R U' R' F U R U' R' F' R U2 R' U' F'", "R U2 R' F U' F' Rw U' Rw' U R' F2 R U F", "U2 Rw' U' R U M' U' R2 F R F' U R", "R U2 R2 F R F' U2 M' U R U' Rw'"],
        "3": ["U' R U2 R' U' F' U F R U' R' U2 R' U' R' F R F' U R", "U' Rw U' Rw' U M' U R U' R' U2 M F' U F", "U Rw' U' R U' R' U2 F2 Rw U2 Rw U' Rw' F", "R' F' U' F U R U R U R' F' U F U R U2 R'", "U R' U' R' F R F' U R U F R' F' R U2 R U2 R'", "U' F U R U2 R' U' R U R' F' Rw' U' R U' R' U2 Rw", "U F' Rw U' Rw' F2 U' R U R' U2 R' F R F'", "U2 R U R' F' U2 F R' F' U' F U R U' R U' R'", "U' Rw U Rw' U' Rw' F R2 U' R' U M' U R U R' F'", "U2 Rw' U' R U' R' U2 Rw F R' F' R U R U' R'", "U2 Rw U R' U R U2 Rw' U F R U' R' U' R U R' F'", "F R U' R' U R U2 R' U2 R' F R F' R U R' F'"],
        "4": ["R U R' U' R' F R F' U2 F R U' R' U' R U R' F'", "F R U' R' U R U R' F' U R U R' F' U F R U' R'", "R' F R U R' F' R F U' F' U2 F U R U' R' F'", "U R U R2 F' U' F U R U2 R' F R F'", "U F R' F' R U2 R' U' F' U F R2 U' R'", "U' R' F' U' F R U R' U' R U2 R' U' F' U' F U' R", "F R U' R2 U' F U R U' R' F' R U' R U R' F'", "U2 R U' R' U' F' U2 F U2 R U2 R' F U R U' R' F'", "R2 F R F' U F U R U' R' F' U R U' R' F' U F R", "R' F R F' U' R' F R F' R U2 R' F' U' F", "F R U' R' U R U2 R' F' U' F' Rw U Rw'", "U R U R' U' F' U2 F U R U' R' F2 Rw U Rw' F"],
        "5": ["R' U' F' U F R Rw U R' U' Rw' F R2 U R' U' F'", "U F R U R' U2 R U2 R' F' U' F U R U R' U F'", "U2 R2 F R F' U2 R' F R F' R' F R F' R", "U F R U R' U2 R U F R U R' U' F' U2 R' U F'", "R U R' U R U R2 D' Rw U Rw' D R2 U R'", "U' F U R U2 R' U R' F R F' U' F' Rw' F2 Rw", "U' F R' F' R U R U' R' U F R U R' U' F'", "U F R U R' U y' R' U2 R' F R F'", "F' U2 F U' R U R' U F' U F2 R U' R' U' R U R' F'", "U' R' F2 Rw U Rw' U F M U F' U' F Rw", "U F R' F' R U' F' U' F2 R' F' R2 U2 R'", "U' F R' F' R U R U' R' U2 R' F' U' F U R"],
        "6": ["U R' F R U R' F' R F U' F' U2 R' U' F' U F R", "U R' F' U' F U2 R U2 R2 U' F' U F R U R", "U' F R' F' R U2 R U2 R' Rw' U' R U' R' U2 Rw", "U' R' U R U R2 D' R U R' Rw U Rw' D R U R", "U2 Rw' U' R U' R' U2 Rw F R U' R' U' R U R' F'", "U F U R U' R' F' U F U R U2 R' U' R U R' F'", "R U2 R' U' R' F' U' F U R U2 R' F R F'", "R U R2 U' R' F R2 U' R' U2 F R F' R U R' F'", "R' F' U' F U' R U' R' F' U F U' R", "R' F R F' U R U R2 F R F2 U2 F", "R U2 R' U' R U R' F' U2 F R U' R2 F R F'", "U2 F R U' R' U' R U R' F' U' F R U R' U' F'"],
    },
    oll19 : {
        "name": "Oll19",
        "1": ["U R' U' R U' R' U F' U F R F R U R' U' F'", "R' F R U2 y' R' U' R' U R U2 R' F R F'", "F R U R' U' F' R U2 R2 F R F' R U2 R'", "U R' F R U2 R' F' R U Rw U R' U R U2 Rw2 F Rw", "R' U' R' F R F' U R U' R U2 R2 F R F' R U2 R'", "F U R U' R' U R' F R F' R U2 R' F' Rw' F Rw", "U' R' F' U' F U R2 U2 R2 F R F' R U2 R'", "U2 F U2 R U' R' U' F' U2 F U' R U' R' U F'", "Rw' U2 R U R' U Rw2 U2 R' U' R U' Rw'", "U2 Rw U2 R' U' R U' Rw2 U2 R U R' U Rw", "U2 R' U' R F R' F' U F R F' R U R' U' R' F R F'", "U2 Rw' U' Rw U' R' U Rw' F R F' R' F R F' U Rw"],
        "2": ["U' F R U' R' U' R U R2 F' U' F R F' R' U R", "U2 R' U' R F R' F' U F R2 U' R' U R U R' F'", "U F U R U2 R' U2 F R U R' U' F' R U2 R' U' F'", "U2 Rw' U' Rw U' R' U R2 Rw' U' R' U F' U F Rw", "U' F U' R' F' U' F R' F R U R2 U' R' F Rw U Rw'", "U R' F R U' R' U' R' F2 R2 U' R' U2 Rw U2 Rw' F R", "U2 R' F R U R U2 R' U Rw U2 Rw' U' F' R U2 R'", "U' R U2 R' F U Rw U2 Rw' U' R U2 R' U' R' F' R", "U R2 F2 Rw U Rw' F R2 U' R D Rw' U' Rw D' R'", "U' Rw U Rw' U' R2 D Rw' U2 Rw D' R2 U Rw U' Rw'", "Rw' U' R U' R' U2 Rw U2 R U2 R2 F R F' R U2 R'", "U2 Rw U R' U R U2 Rw' U' R U2 R2 F R F' R U2 R'"],
        "3": ["U' R' U R U2 R2 U' F' U F R U F' U' F U R", "U2 R U R' U' R' F R2 U R' U' F' R' F' U' F U R", "U F R' F' R U2 R U2 R' U2 Rw U2 R' U' R U' Rw'", "U2 R' F R F' U2 F' U F2 R' F' R2 U' R'", "U2 R U2 R' U2 R' F R F' U2 R' U' F' U F R", "U F R' F' R U2 R U' R' U F2 Rw U Rw' F", "Rw' U2 R U R' U Rw F R U' R' U R U2 R' U' F'", "U2 Rw' D' Rw U Rw' D Rw U' Rw U Rw' U2 M' U M", "U2 R U2 R' U2 R' F R F' R U R' F' U2 F R U' R'", "U2 R U R' U' R' F R F' Rw' U2 R U R' U Rw", "U2 F R U2 R' F R U R' U' R U R' U' F' U F'", "U' F R' F' R U2 R U' R' U2 F' U' F U' R U' R'"],
        "4": ["U' Rw R2 U' R U' Rw' U2 Rw U' R U R' U' Rw' F R F'", "R U2 R' U' F' U2 R' F' U' F U R U' F R U' R'", "M' U R U R' U Rw' R2 U2 R2 F R F' Rw U Rw'", "R' D' Rw U Rw' D R U2 Rw U' Rw' U Rw U Rw'", "U' Rw U' Rw' U' Rw U Rw' U2 R' D' Rw U' Rw' D R", "U2 R D Rw' U' Rw D' R' U2 Rw' U Rw U' Rw' U' Rw", "U' Rw' U Rw U Rw' U' Rw U2 R D Rw' U Rw D' R'", "U' R' U' R F U R2 U' R' F' U2 R' U' R U F R F'", "F U R' U2 R2 U R2 U R U R' F R F' U' F'", "U F Rw U Rw' U2 Rw U R' U2 R U' Rw' F' U' Rw' F Rw", "Rw' R' F2 R U' R' F2 R2 U R' F Rw U' Rw' F2 Rw", "F R U' R' U' R U R' F' U' Rw U Rw' R U R' U' Rw U' Rw'"],
        "5": ["U' R U R' U' R' F R F' U' F' L' U' L U L' U' L U F", "U R' U' F' U F2 R U R' U' F' U R", "U2 F R U' R' U' R U R' F' U' R' F R U R' U' F' U R", "U' F R U' R' U' F R U R' U' F' R U R' F'", "F R U' R' U R U2 R' U' F' U R' F R U R' U' F' U R", "U R' U' F U Rw U2 Rw' R U R' F' R", "R' U' F' U Rw' F Rw U F U R U2 R' U' R", "U' R U2 R' U' F' U' F U R U2 R' F U R U' R' F'", "F U R U' R' F' U R' F R U R' U' F' U R", "U' F U2 R' F' U' F U R2 U2 R' F'", "U F R U' R' U' R U R' F' U2 R' F' U' F U R", "U' R' U2 R U R' U2 R2 D Rw' U' Rw D' R2 U' R"],
        "6": ["M U R U R' U' M' R' F R F'", "U' F R U' R' U R U R' F' U2 F R U R' U' R U R' U' F'", "M' U R U R' U' R U' Rw' R U R2 F R F'", "R' U2 R F U R' U' F' U F U R2 U' R' F'", "M U Rw U2 Rw' R U' R' U' R' F R F' M'", "R2 F R F' R U2 R2 F R F' R U' R' U' R", "U F' U' F U Rw U Rw' U2 M' U M", "U' Rw U' Rw' F U' Rw' F' U' R' F2 R U Rw", "U' Rw' U' R' F R F' U Rw R U R' U' R' F R F'", "U2 F R' F' R U R U' R' U' F R U R' U' F'", "R' U2 F R U R' U' F2 U2 F R", "U' R U2 R' U2 R' F R F' U2 Rw U R' U R U2 Rw'"],
    },
    oll20 : {
        "name": "Oll20",
        "1": ["R' U2 R U R' F' U F R U2 F R U R' U' F'", "Fw R U R' U' Fw' R' U' R' F R F' U R", "R U R' U' M' U R U' Rw' U2 Rw U R' U' Rw' R U R U' R'", "M U R U R' U' M2 U R U' Rw'", "M' U2 M U2 M' U M U2 M' U2 M"],
        "2": ["U' R' U R U R2 F R F' U y' R' U' R U R' U R Fw z'", "U' F R U R' U' R U R' U' F' R' U' R U' R' U F' U F R", "U Rw' U2 R U' R' U Rw U2 Rw2 F R F' Rw U' R' U2 Rw", "R U R2 U R2 U2 R F R F' U2 F' U F U' R", "Rw D' F2 R2 U' R U2 R' U R2 F2 D Rw'"],
        "3": ["U2 R U' R2 D' Rw U Rw' D R2 U' R' U' R U R' U' R U' R'", "U R U2 R' U' F' U F R U' R' U R' F R U R' U' F' U R", "U2 F R U2 R2 F2 R U2 R U2 R' F Rw2 F Rw U' Rw", "R' D' Rw U' Rw' D R2 U R' U' F' U2 F", "U2 F' U2 F U R U' R2 D' Rw U Rw' D R", "U' R' F' U2 F U' R U' R' U' R U R' U2 F' U F R", "R U R' U' R' F R F' R U2 R2 F R F' R U2 R'", "U' F U R' U2 R2 U R2 U R U R' U' F' U F R F'", "R D' F2 R2 U' Rw U Rw' U R2 F2 D R'", "U' F Bw' U R' U R' U2 R U2 R U2 R y L' U R", "R U' R2 F2 U' R F R' U F2 R2 U R'", "U F R' F R2 U R' U' F2 U' Rw U' Rw' F"],
    },
    oll21 : {
        "name": "Oll21",
        "1": ["R U2 R' U' R U' R' U' R' U' R U' R' U2 R", "R' U2 R U R' U R U R U R' U R U2 R'", "U R' U' R U' R' U R U' R' U2 R", "U' R U R' U R U' R' U R U2 R'", "R' U2 R U R' U' R U R' U R", "R U2 R' U' R U R' U' R U' R'", "U R U R' U R U' R' U R U' R' U R' U' R2 U' R' U R' U R", "U R U R' U R U2 R' U' R' U2 R U R' U R"],
        "2": ["U x' U' R U' R' U R' F2 R U' R U R' U x", "F R U R' U' R U R' U' R U R' U' F'", "R U R' y' U R' U R U' R2 F R F' R", "R' U' R y U' R U' R' U R Lw U' R' U Lw'", "F R U R' U' R U R' U' F' U R' F' U' F U R", "R' U' R U' R' U2 R U R' U' R U R' F' R U R' U' R' F R2", "U Rw U2 R2 F R F' R U2 Rw2 F' Rw U' Rw' F2 Rw", "U R U R' U Rw' F R F' Rw U2 R2 U2 R U R' U R"],
        "3": ["U2 R U R' U R U2 R' F R U' R' U' R U2 R' U' F'", "R U R2 F R F' Rw U' Rw' U Rw U Rw'", "U2 R' F R' F' R2 U' Rw' U Rw U' Rw' U' Rw", "U R' U' R U' R' U' L U' R U L'", "U R U R' U R U L' U R' U' L", "U' R' U' R U' R' U F' R U R' U' R' F R2 U' R' U R", "U F R' F' R U2 R U2 R' U Rw' U2 R U R' U Rw", "U2 R' U2 R U R2 D' R U' R' D R2 U R' U R", "R U2 R' U' R2 D R' U R D' R2 U' R U' R'", "F R U' R' U' R U2 R' U' F' U R U R' U R U2 R'", "U' F U R' F R F' R U' R2 F' R U2 R U2 R'", "R' U2 R U R' U' F' R U R' U' R' F R U2 R"],
        "4": ["U2 R U R' U R U2 R' U2 F R' F' Rw U R U' Rw'", "R' U' F' U F R U R U R' U' R' F R F'", "U2 Rw U2 R' U' R U' Rw' U R U2 R' U2 R' F R F'", "R U2 R' U L' U2 R U2 R' U2 L R U' R'", "U' F U' R U2 R' U2 R U' R' U' R U R' U F'", "U' R' F R U R' U' F' R U' R' U R' F R F' U R", "U' R U2 R' U' R U' R D' R U' R' D R U R", "U2 R U2 R2 F U' R2 U' R2 U F' U R", "U2 R' U2 R U2 R2 F' R U R U' R' F U R", "F' R U2 R' U2 R' F R U R U R' U' R U' R'", "U R' U' R U' R' U R U R' F R U R' U' R' F' R2", "U F R U' R' U R U2 R' U' R U R' U' F'"],
    },
    oll22 : {
        "name": "Oll22",
        "1": ["R U R' U R U2 R' U' R U R' U R U2 R'", "R U R' U' R' U2 R U R' U R2 U2 R'", "U' R' U2 R U R' U R2 U R' U R U2 R'", "U R U2 R' U' R U' R2 U' R U' R' U2 R", "U' R U2 R' U2 R U' R' U2 R U' R' U2 R U R'", "U R' U2 R U2 R' U R U2 R' U R U2 R' U' R", "U2 R U' R' U2 R U R' U2 R U R' U2 R U2 R'", "U2 R' U R U2 R' U' R U2 R' U' R U2 R' U2 R", "R' U2 R2 U R2 U R2 U2 R'", "R U2 R2 U' R2 U' R2 U2 R", "R U R' U' R' U' R U R U R' U' R' U R U' R U' R'", "U R U R' U R U2 R' U R U R' U R U2 R'"],
        "2": ["F R2 U' R U' R U' R' U2 R' U R2 F'", "U2 F R2 U' R U2 R U R' U R' U R2 F'", "F U R' U' R2 U' R2 U2 R U2 R U R' F'", "Rw' U' R U' R' U R U' R' U R' F R F' U Rw", "U R U2 R' U' F' R U2 R' U' R U' R' F R U' R'", "U' R U R' U Rw' F R F' Rw U' R' U R U2 R'", "U' Rw U R' U R' F R F' R U' R' U R U2 Rw'", "R' U R U F R' U R U' F' U' R' U' R", "U2 R U2 R' U R' D' R U R' D R2 U' R' U R U' R'", "U2 R' U2 R U' R D R' U' R D' R2 U R U' R' U R", "U2 R U R' U R U R' U' R U R D R' U R D' R2", "U2 R' U' R U' R' U' R U R' U' R' D' R U' R' D R2"],
        "3": ["U' F U R U2 R' U R U R' F' R U2 R' U' R U' R'", "Rw U' Rw' U' Rw U Rw' U' Lw R U' R' U Lw'", "Rw' U Rw U Rw' U' Rw U R2 F R F' R", "Rw' U' R U' R' U2 Rw U' R U2 R' U2 R' F R F'", "R' U' R U R2 F' R U R U' R' F U' R U R' U R", "R U2 R D' R U' R' D R' U' R2 U2 R", "R' U' R U' R2 D' R U R' D R2 U' R' U2 R", "U2 L' U R U' L U' R' U' R U' R'", "U' R U R' U F' R U2 R' U2 R' F R", "U2 R' U R U' R' U R U R' U2 Rw' F R F' Rw", "U' R2 D R' U2 R D' R2 U' R2 D R' U' R D' R2", "U' R U2 R2 F R U R U2 R' U' R U2 R' U' F' R U R'"],
        "4": ["U' R U R' U R U2 R' F U R U2 R' U R U R' F'", "U' R U R' U R U2 R2 F' Rw U R U' Rw' F", "U' F R U' R' U' R U R' F' U2 F R U R' U' F'", "F R U R' U' R' F' R U2 R' U' R2 U' R2 U2 R", "R U R' U R' F R F' R' U' F' U F R2 U' R'", "U' F U' R U' R' U R U R' U2 R U2 R' U F'", "U2 R U2 R2 F R F' R' U' F' U F R U R U2 R'", "R' U' F' R U R' U' R' F R2 U2 R' U2 R", "U' R U R' U R U' R' U' R' F' R U2 R U2 R' F", "U2 R' U' R' D' R U R' D R' U R' U R U2 R'", "U' R' U' F U' R2 U R2 U F' R2 U2 R'", "U F U R U' R' U R U2 R' U' R U R' F'"],
        "5": ["U2 R' U' F' U F R U' Rw U' Rw' U' Rw U Rw' F' U F", "R' F R U R' F' U' F' U F R F' Rw U Rw'", "R' F R U R' U' R' F' R2 U' R' U R U' R' U2 R", "U F U R U' R' F' Rw U' Rw' U' Rw U Rw' F' U F", "R U R' U R U2 R' U' R U' L' U R' U' L", "U' R U R' U F2 R U2 R' U2 R' F2 R", "U' R' U2 R U R' U R2 U' L' U R' U' L", "U R U R' U R U' R' U R U' R D R' U' R D' R2", "R U R' U' R' F R2 U R' U' R U R' U' F'", "U' Rw U' Rw' F R' F Rw U R U2 Rw' F Rw U Rw' F", "R U2 R' U' R U R' U2 L' U R U' M' x'", "U Rw U R' U' Rw' F R U R' U' R F' U' R' U2 R"],
        "6": ["U' R U R' U R U' R2 F R F' R U' R' F' U F", "U F U R U2 R' U2 R U R2 F' R U2 R U2 R'", "F' U' F Rw U' Rw' U Rw U Rw' F R U R' U' F'", "U2 R' U2 R U R' U' R U R2 F R U R U' R' F' R", "R' F2 R U2 R U2 R' F2 U' R U' R'", "U R' F R F' Rw U R' U R U2 Rw' U' R U' R'", "U R U2 R' U' R U' R' U2 Rw' F R F' Rw U R'", "U' R' U' R U' R' U R U' R' U R' D' R U R' D R2", "U F U R U' R' U R U' R2 F' R U R U' R'", "U Rw U' Rw U' R U' R' F R U R' U Rw2 F", "U2 R U2 R' U' R U R' U2 R' F' R U2 R U2 R' F", "U R L' U R' U' L U2 R U' R' U R U2 R'"],
    },
    oll23 : {
        "name": "Oll23",
        "1": ["U R U2 R' U' R U' R' U2 R' U2 R U R' U R", "R U R' U' R U' R U2 R2 U' R U R' U' R2 U' R2", "R' U' R U' R' U2 R2 U R' U R U2 R'", "U2 R U R' U R U2 R2 U' R U' R' U2 R", "U' R U R' U' R U' R' U2 R U' R' U2 R U R'", "U' R' U' R U R' U R U2 R' U R U2 R' U' R", "U R U2 R2 U' R2 U' R' U R' U' R U R' U R", "U R' U2 R2 U R2 U R U' R U R' U' R U' R'", "U R' U2 R U R' U R U R' U' R U' R' U2 R", "U R U2 R' U' R U' R' U' R U R' U R U2 R'", "R' U' R U' R U R' U R U2 R' U2 R' U2 R", "U2 R U R' U R' U' R U' R' U2 R U2 R U2 R'"],
        "2": ["U2 R' U' R U' F U' R' U R U R' U R U' F'", "R U R' U L' U R U' M' x' U' R U' R'", "U' F R U R' U' R U R' U' F' U2 F R U R' U' F'", "U' R' U2 R F U' R' U R U R' U R U' F'", "U2 R2 D R' U' R D' R' U' R' U R U R'", "R' U2 R F U' R' U' R U F'", "R U' R' U' R U R D R' U R D' R2", "U' F U' R' U R U F' R' U2 R", "M' U R' U' F' U F R2 U R' U R U2 Rw'", "U' F R U R' U' R U R' U' F' U' R' F' U' F U R", "F R U' R' U' R U2 R' U' R U' R' U' R U2 R' U' F'", "U Rw' U' R' F R U Rw F R U' R' F'"],
        "3": ["R' F R U' R' U' R U R' F' R U R' U' R' F R F' R", "U' F2 R U' R' U' R U R' F' R U R' U' R' F R F2", "R U' R' U R U' L U Rw' F U2 R U2 R2 x", "U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R' U2 R", "U R U' L U L' U R' U' Lw U2 R U2 R2 x", "U R' U L' U' L U' R U Lw' U2 R' U2 R2 x'", "F R U R U2 R' U' R U' R' U2 R' U2 R U' R' U' F'", "U' Rw U R' U' Rw' F R2 U' R' U' R U2 R' U' F'", "U' R U R' U R U' R2 F R F' R U' R' U' F' U2 F", "U' R U2 R' U2 R' F R U R U2 R' U' R U2 R' U' F'", "U' R' U' R F R2 D' R U R' D R2 U' F'", "U' Rw U R' U' Rw' F R U R' U' R F' R' U R"],
        "4": ["x R2 U2 R' D2 R U2 R' D2 R' x'", "U F' R U2 R' U2 R' F R U2 R U2 R'", "R U R' U R U' R' U2 R' D' R U2 R' D R2 U' R'", "U' R' U2 R U R' U R' D R' U2 R D' R' U2 R'", "U' R U' R' U' R U' R' U R' D' R U R' D R2 U R'", "U' R' U R U R' U R U' R D R' U' R D' R2 U' R", "R' U2 R U R' U R' D' R U' R' D R U R", "R U' R' U' R U2 R' U2 R' D' R U' R' D R", "R' U' R U2 R' F' R U R' U' R' F R2 U2 R' U R", "U2 R U R' U R U R' U2 R U' R2 D' R U' R' D R", "F R U' R' U R U R' U R U' R' F'", "U F' R U R' U' R' F R2 U R' U2 R U R' U2 R U' R'"],
        "5": ["R2 D' Rw U2 Rw' D R U2 R", "R2 D' R U2 R' D R U2 R", "R U' R' D R' U' R D' R2 U R' U' R' U2 R'", "U2 R U R' U R U2 R' U2 Rw' F R F' Rw U R'", "U R2 D' R U' R' D R2 U' R' U2 R", "U' R' U R U R' U2 R U2 y R U' R' U2 R U' R'", "R' U2 R U' R' U' R2 D Rw' U2 Rw D' R2 U R", "U F' Rw U2 R' U' R U' Rw' F R U R' U R U' R'", "U F U R U2 R' U R U2 R2 F R F' R U' R' F'", "U R' U' R U' R' U R U' R' U R F R' U R U' F'", "U2 L' U R U' L U R' U2 R U R' U R U2 R'", "U' R' U R U' R' U' R U2 R D R' U' R D' R2 U' R"],
        "6": ["U2 R2 D Rw' U2 Rw D' R' U2 R'", "U2 R2 D R' U2 R D' R' U2 R'", "R' U' R U R U R' U' R' U F R U R U' R' F'", "R U' R' U' R U2 R' U' R' D' R U2 R' D R", "U R U R2 D' R U R' D R2 U2 R'", "U' R U' R' U' R U2 R' U2 y' R' U R U2 R' U R", "U R' U R' U' D' R U' R' U2 R U' R' D R U' R", "U' R U R' U R U' R' U F' R U2 R' U2 R' F R", "U' R U2 R2 D' R U2 R' D R2 U' R' U2 R U2 R'", "U R U R' U R U' R' U R U' R' U' L' U R U' R' L", "U' R U2 R D R' U2 R D' R' U2 R' U' R U' R'", "U' R U' R' U R U R' U2 R' D' R U R' D R2 U R'"],
    },
    oll24 : {
        "name": "Oll24",
        "1": ["U' R U R' U R U2 R' U2 R' U' R U' R' U2 R", "U2 R U2 R2 U' R2 U' R2 U2 R U2 R U R' U R U2 R'", "U2 R' U2 R U R' U R2 U2 R' U' R U' R'", "R U2 R' U' R U' R2 U2 R U R' U R", "R' U R U2 R' U' R U2 R' U' R U' R' U R", "U' R' U' R U' R' U2 R U R' U2 R U R' U R", "R' U R2 U R' U R' U' R U' R' U' R U R U' R'", "U' R U R' U R U' R' U R' U' R2 U' R2 U2 R", "U2 R' U2 R U R' U R U' R' U' R U' R' U2 R", "R U2 R' U' R U' R' U R U R' U R U2 R'", "U' R' U' R2 U R2 U R2 U2 R' U R' U R", "U' R U R2 U' R2 U' R2 U2 R U' R U' R'"],
        "2": ["U R U R' U R U R2 D' Rw U2 Rw' D R2 U R'", "U R' U' R U' R' U' R2 D Rw' U2 Rw D' R2 U' R", "U2 R U' R2 D' Rw U2 Rw' D R2 U R'", "R' U R2 D Rw' U2 Rw D' R2 U' R", "R' U' R U2 R D R' U' R D' R2 U R U' R' U R", "U2 R U R' U2 R' D' R U R' D R2 U' R' U R U' R'", "R' U' R U R2 D' R U2 R' D R2 U2 R' U2 R", "U' R2 U' R U F' U2 R' U2 R F U' R", "U2 R U' R' U2 R D' R U R' U2 R U R' D R'", "F U' R2 U R' U R U2 R2 U' R U2 R' F'", "U R U R D R' U R D' R' U L' U R' U' L", "U Rw U Rw' R U R' U' R U R' U' Rw U' Rw' F R U R' U' F'"],
        "3": ["R' U R U2 L' R' U R U' L", "U2 R U' R' U2 L R U' R' U L'", "U2 R' U' R2 U R' F' R U R' U' R' F R2 U' R' U' R' U R", "U2 Rw U' Rw U2 R' F R U2 Rw2 F", "U' R' F' U F U R U R2 F R F' R", "U R U R2 F R F' R U' R' F' U F", "U L' U2 R U2 R' U2 L U R U R' U' R U' R'", "U2 F U R U2 R' U R U R' F' R' U2 R U R' U R", "U2 R' U' R U' R' U R F U' R' U2 R U F'", "R U R' U R U' R' U' L' U2 R U2 R' U2 L", "R' U2 R U R' U R F U R U2 R' U R U R' F'", "Rw' U' Lw' U2 R U' R' U2 Lw R U' R' U2 Rw"],
        "4": ["U' Lw' U2 R' D2 R U2 R' D2 R2 x'", "R' U2 R U' R' F R U R' U' R' F' R U' R", "R' U2 R' D' R U2 R' D R' U R' U R U2 R'", "U2 R U2 R D R' U2 R D' R U' R U' R' U2 R", "U R U R' U R U2 R' U Rw U R' U' Rw' F R F'", "U R' U' F' U F R U' R' F R U R' U' F' U R", "Rw U R' U' Rw' F R F' R' U2 R U R' U R", "U2 R U' R2 D' R U' R' D R U' R U R' U R U R'", "U R' U' R U' F U' R' U R U F' R' U R", "R' D' R U R' D R2 U R' U2 R U' R' U' R U' R'", "U2 F R U R' U' R U' R' U' R U R' F'", "Rw U2 R2 F R F' U2 Rw' F R U R U' R' F'"],
        "5": ["U' Rw U R' U' Rw' F R F'", "U' R U2 R' U2 R' F R U R U' R' F'", "R U R D R' U R Rw' U2 Rw D' R2", "U' R' D' R U R' D R2 U' R' U R U R' U' R U R'", "U' F' U' Rw' F2 Rw U' Rw' F' Rw F", "U' R U R' U' R U' R' L U' R U R' L'", "U R U R' U R U R' U2 L R U' R' U L'", "R' U' R U' R2 F' R U R U' R' F U R U' R' U2 R", "U' R U' R' U R' D' Rw U2 Rw' D R U R U R'", "U' Rw U' Rw' U' Rw F R U' R' F' Rw' U F", "U2 F R U R' U' R' F' U2 R U R U' R2 U2 R", "U' R U' R' U2 M' F' U2 F M"],
        "6": ["U Lw' U' L U Lw F' L' F", "U R U R' U' R' F' R U2 R U2 R' F", "R2 F2 R U2 R U2 R' F2 R U' R' U R", "U' R D R' U' R D' R2 U R U' R' U' R U R' U' R", "U F U R U2 R' U R U R' F'", "R U R' U' R U' R' U' F R U R' U' R' F' R", "U R' U' R U' R' U' R U2 L' R' U R U' L", "U F R U R' U' R U R' U' F' R U R' U' R' F R F'", "U' F U R' U' R F' R' U' R U R' U R", "R' U2 R F U' R' U R U F' R' U R", "U R' U2 R2 U R' U' R' U2 F' R U2 R U2 R' F", "U' R' U R U R' U' R' D' R U2 R' D R U R"],
    },
    oll25 : {
        "name": "Oll25",
        "1": ["R U2 R' U2 R' U' R U R U' R' U2 R' U2 R", "R U R' U R U' R' U R U' R' U R U2 R'", "U2 R U2 R' U' R U' R' U2 R U R' U R U2 R'", "U2 R U R' U R U2 R' U2 R U2 R' U' R U' R'", "R U R' U R U2 R' U R' U2 R U R' U' R U R' U R", "U' R U R' U R U' R' U R U2 R' R' U' R U' R' U2 R", "U R' U2 R U R' U R U' R U2 R' U' R U' R'", "U2 R U2 R' U' R U' R' U R' U2 R U R' U R", "U R2 U R' U' R' U R U R' U R U' R U' R2", "U2 R2 U' R U R U' R' U' R U' R' U R' U R2", "U2 R U R' U R U2 R' U R' U' R U' R' U2 R", "U R' U' R U' R' U2 R U' R U R' U R U2 R'"],
        "2": ["U' Rw U R' U R U2 Rw' U R U2 R2 F R F' U' R U' R'", "U2 F R U R2 F R F' R U' R' F'", "L' U2 R U' R' U2 L R U' R'", "R' U' R U R' F' R U R' U' R' F R2", "F R U R' U' R' F R2 U' R' U' R U R' F2", "R' U' R U R' U' R' F R2 U' R' U' R U R' F' U R", "U Rw U2 R Rw2 F R' F' Rw2 U2 Rw'", "U2 Rw U2 Rw2 F R F' Rw2 R' U2 Rw'", "U2 F R U R' U' F' Rw U Rw' U R U' R' Rw U' Rw'", "U Rw U Rw' R U R' U' Rw U' Rw' F U R U' R' F'", "U' R U R' U R U' R' F2 R U2 R' U2 R' F2 R2 U' R'", "R U R2 F2 R U2 R U2 R' F2 R U R' U' R U' R'"],
        "3": ["U' F' Rw U R' U' Rw' F R", "R' U' R U R' F2 R U2 R' U2 R' F2 R2", "U' F' R U2 R' U2 R' F R U R U' R'", "U R' U R U' R' U R U R' U' R2 D R' U R D' R'", "F R U' R' U' R U2 R' U' F'", "U2 R' U' R U2 R' F' R U R' U' R' F R2 U R' U2 R", "R' F R U R U' R' F' U R U R' U R U' R'", "R' U R U2 Rw' R' F R F Rw U Rw' F Rw", "U F R' F' R U R U' R' F U R U' R' U R U' R' F'", "U' F' R U2 R' U2 R' F U2 R U R U' R2 U2 R", "U2 R' U' R U' R' U R F R' U R U' F'", "U' R U2 R' U Rw' F R F' M' U' R U R'"],
        "4": ["U2 F R' F' Rw U R U' Rw'", "U D' R2 U R' U' R' U R' D U' R' U R", "U2 F R U R' U' R' F' R U2 R U2 R'", "U2 R D' R U' R' D R U' R2 U R2 U R2", "R' F' R U R' U' R' F R U' R U R' U R", "Rw' F' Rw U R' U2 R U R' U Rw' F Rw U' R", "U L R U' R' U R L' U R' U R U' R'", "U' R' U' R' F R F' U R2 U2 R' U2 R' F R F'", "U R' U2 R U R' U' F' R U R' U' R' F R2 U R' U R", "U R' U2 R2 U R' U' R' U2 F R U R U' R' F'", "U R U R' U R U2 R' Rw U R' U' Rw' F R F'", "U M' F' U2 F M U2 R U R'"],
        "5": ["U R' U2 R' D' R U2 R' D R2", "U R' U2 R' D' Rw U2 Rw' D R2", "U2 R D R' U2 R D' R' U' R' U2 R U' R' U' R", "R' U' R U2 R' U' R2 D Rw' U2 Rw D' R2 U R", "U R U R' U2 R U R' U2 y' R' U2 R U' R' U' R", "R' U2 R U R2 D' R U R' D R2", "U R U R' U' R U' R' F' Rw U R' U R U2 Rw' F", "R' U' R2 D Rw' U2 Rw D' R2 U R U R' U2 R", "U R' U2 R U2 R' U' R2 D R' U2 R D' R2 U2 R", "U2 F' R U R' U' R' F R2 U' R' U' R U' R' U R U R'", "F R U' R' U' R2 D R' U R D' R' U R' U' F'", "U R' U R2 D R' U R D' R' U2 R' U R U R' U' R"],
        "6": ["U2 R U2 R D R' U2 R D' R2", "U R' F' R U R' U' R' F R2 U' R' U2 R", "U' L' U R U' L U R2 U2 R U R' U R", "U' F R U R' U' R' F' U' R U R U' R' U' R' U R", "U2 R' U' R U2 R' U' R y U2 R U2 R' U R U R'", "U' R U2 R' U' R2 D R' U' R D' R2", "U' R' F' R U2 R U2 R' F U' R U R' U' R U' R'", "U2 R' U R' D' R U R' U2 R U R' D U R U' R", "U2 R U2 R' U2 R U R2 D' R U2 R' D R2 U2 R'", "U R' U2 R U R' U R L' U R U' L U R'", "U R U2 R' U R' F2 R F2 R U R' U Rw' F Rw", "U2 R U' R2 D' R U' R' D R U2 R U' R' U' R U R'"],
    },
    oll26 : {
        "name": "Oll26",
        "1": ["U' R U' R2 U' R U' R' U2 R' U2 R' U' R U' R2", "U' R U2 R2 U' R' U R U' R' U' R2 U R", "U2 R' U' R U' R' U2 R", "U' R U2 R' U' R U' R'", "U2 R' U' R2 U R2 U R2 U2 R2 U2 R", "R U R' U R' U' R2 U' R2 U2 R", "U' R' U' R U R U2 R' U' R' U R U' R U' R'", "U' R U R' U' R' U' R U R U' R' U' R' U R", "U2 R' U' R U' R2 U' R' U' R' U R U R U' R", "R U R' U R' U' R U' R' U2 R U R U' R'", "U2 R U R' U R U2 R' U' R U2 R2 U' R2 U' R2 U2 R", "U' R' U' R U R U2 R' U' R U' R' U R' U R"],
        "2": ["U R U2 R2 U' R2 U' R' F U' R' U' R U F'", "R' U' R U' L U' R' U L' U2 R", "U' R' F' U' F U R F R U R' U' R U R' U' F'", "U2 R U' R' U2 R U' R' U2 R' D' R U R' D R", "U R U R' U R U' R' U Rw' F R F' Rw U2 R'", "F U R U' R' U R' F R2 U' R' F' U Rw U' Rw'", "U2 R U R' F' R U2 R' U' R U' R' F R U' R'", "U2 R U R' U' R' U' F U R2 U' R' U R U' R' F'", "U' R' U R2 U2 D R' U' R U' D' R2 U' R", "U F R U R' U' R U R' F R' F' R U' F'", "F R' F' R U R U' R2 F R U R' U' F' U R", "R' U' R' F R F' U R U' F R U R' U' R U R' U' F'"],
        "3": ["L' U R U' L U R'", "U R U2 R' U' R U R D R' U2 R D' R2", "R' U2 F U R U2 R' U R U R' F' U R", "U R2 F R' U R U' F' R2 U2 R' U' R U R", "U2 R2 D' R U2 R' D R U R U' R' U2 R", "U' R' U' R U' R' U R U' R' U R F U' R' U2 R U F'", "R' U' R D' R U' R' U R2 U R' U' R2 D", "R' F R U R' U Rw U Rw' U2 F' U' R", "F U R U' R' U R U' R2 F' R U2 R U2 R'", "U2 R2 D' Rw U2 Rw' D R U R U' R' U2 R", "R' U2 R' F' R U R U' R' F U2 R", "U R U2 R' U' R U R D Rw' U2 Rw D' R2"],
        "4": ["R' F U2 F' R F R' U2 R F'", "U' R' U' R U' R' U R' D' R U R' D R2", "U2 R U R' U' R' F R U2 F' U' F U' R U R' U' F'", "U R' D' R U2 R' D R2 U' R' U2 R U R' U R U R'", "R2 D R' U R D' R' U R' U' R U' R'", "U' R U2 R' L' U2 R U' R' U2 L R U2 R'", "U' R' U' R U' R' U R' D' R U' R' Rw U2 Rw' D R2", "R' U' R U' R U R' U' R' U2 F R U R U' R' F'", "U' R U2 R' U R' D' R U' R' D R U' R U' R'", "U R U R' U R' D R2 U' R' U R2 D' R' U2 R'", "R' U' R U' R' U R' D' R U' R' D R U2 R", "R' U2 F' R U R' U' R' F R2 U R' U R"],
        "5": ["U R U2 R2 D' R U2 R' D R2 U' R' U R U' R'", "U2 R' U' F' R U R' U' R' F R2 U' R' U R", "F R U' R' U R U R' F' U R' U' F U R U' R' F' R", "U2 R U R' F' R U R' U' R' F R2 U R' U' R U' R'", "R2 D Rw' U2 Rw D' R2 U' R U' R'", "U F R U' R' U' R U2 R' U y' R' U' R U' R'", "U F U R' U' R F' U' R' U2 R", "R2 D R' U2 R D' R2 U' R U' R'", "U2 R U R' F' R U2 R' U2 R' F R2 U' R'", "U R' U' R U' R U R D R' U' R D' R U2 R", "R2 D R' U2 R D' R U' R2 U' R' U R' U R", "U' L' U R U' L U R' Rw U R' U' Rw' F R F'"],
        "6": ["U' R U2 R' U' F' R U R' U' R' F R2 U' R'", "U R' U2 R' D' R U R' D R2 U' R' U2 R", "R' U' R U' R2 D' Rw U2 Rw' D R2", "U' R' U' R U' R2 D' R U R' D R U R", "U' R U R' U' R2 U R U R' U' D R' U' R D' R", "R' U' R U' R2 D' R U2 R' D R2", "R U2 R' U2 Rw' F R F' M'", "U' R' U' R U' R' U y' R' U2 R U' R' U' R Fw z'", "U2 R' U' R U R' F R U R' U' R' F' R2", "R U2 R' U' R U R' U2 R' F R U R U' R' F'", "U' R U R' U R' F U' R2 U' R2 U F' U R", "F' Rw U R' U' Rw' F R L' U R U' L U R'"],
    },
    oll27 : {
        "name": "Oll27",
        "1": ["R' U R2 U R' U R U2 R U2 R U R' U R2", "R' U2 R2 U R U' R' U R U R2 U' R'", "U R U R' U R U2 R'", "R' U2 R U R' U R", "U R U R2 U' R2 U' R2 U2 R2 U2 R'", "U' R' U' R U' R U R2 U R2 U2 R'", "R U R' U' R' U2 R U R U' R' U R' U R", "R' U' R U R U R' U' R' U R U R U' R'", "U R U R' U R U' R' U R' U' R2 U' R' U R' U R", "U' R' U' R U' R U R' U R U2 R' U' R' U R", "U2 R U R' U R' U' R2 U' R' U R' U' R U R' U R", "R U R' U' R' U2 R U R' U R U' R U' R'"],
        "2": ["U F U' R' U R U F' R U R2 U R2 U2 R'", "U' R U R' U L' U R U' L U2 R'", "U R' U2 R U R' U' R F U' R' U' R U F'", "U R' U R U2 R' U R U2 R D R' U' R D' R'", "F U R U' R' U R U' R' F' R' U' F' U F R", "U2 F R U R' U' R U R2 U' F' U R U R U' R'", "U' R U R' F' R U R' U R U2 R' F R U' R'", "U2 R U2 L' R' U2 R U2 R' U2 L U' R U' R'", "R U' R2 U2 D' R U R' U D R2 U R'", "U2 F U R' F R F' R U' R' U R U' R' F'", "U Rw U R' U' Rw' F R F' R U' L' U R' U' L", "U2 R U R D' R U' R' D R2 U' R' U2 R2 U2 R'"],
        "3": ["U R U' L' U R' U' L", "U2 R' U2 R U R' U' R' D' R U2 R' D R2", "R' D U' R' U R U2 D' R2 U R' U' R'", "U2 R' U' R' U R2 D' U2 R U R' U' D R'", "U R2 D R' U2 R D' R' U' R' U R U2 R'", "U2 Rw U2 R' U' R U R' U' R U R' U2 Rw' F R F'", "U' R U R' F' R U R' U R U' R' U' R' F R2 U' R'", "U R U' R' U R U' R' F R' F' R U' F' U F", "R' U2 F' R U R' U' R' F R U2 R", "U R2 D Rw' U2 Rw D' R' U' R' U R U2 R'", "U2 R U2 R' U2 R' F R2 U R' U' R U R' U' F'", "U2 R' U2 R U R' U' R' D' Rw U2 Rw' D R2"],
        "4": ["F R' U2 R F' R' F U2 F' R", "R U R' U R U' R D R' U' R D' R2", "U' R U' R' U' R U' R' U2 R U R2 D' R U2 R' D R", "U2 F U R U' R' U R U' Lw U' R2 D' R U R' x", "U' R2 D' R U' R' D R U' R U R' U R", "R' U2 R U2 R' U R U2 R' U Rw' F R F' Rw", "U R' D' R U R' D R2 U' R' U R U R' U' R U2 R' U R U2 R'", "U R U' R' U' R U R D R' U2 R D' R2 U R U2 R'", "R' U2 R' D' R U R' D R U' R U R' U R", "U2 R' U' R U' R2 F' R U R U' R' F U2 R", "U' R U R' U R' D' R U R' D R U' R U2 R'", "U2 R U2 R2 F R F' R' U' F' U F R2 U' R'"],
        "5": ["Rw U R' F' U F U R U2 R' U M", "U2 R' D' R U R' D R2 U R' U2 R U R'", "U' R U' R' U' F U R U' R' F' R U' R' U' R' F R F'", "U2 R' U2 R U R2 D' R U' R' D R U2 R", "U' R2 D' Rw U2 Rw' D R2 U R' U R", "U R' U2 R U R' U R' D' R U2 R' D R U2 R", "U R L' U R' U' L U2 R U2 R'", "U' R2 D' R U2 R' D R2 U R' U R", "U R2 F R U R U' R' F' R U' R' U R", "U2 R U R' U R' U' R' D' R U R' D R' U2 R'", "R' U' F U' R2 U R2 U F' R U' R U' R'", "U R' U2 R U R' U R' D' Rw U2 Rw' D R U2 R"],
        "6": ["U2 R' U' F' U F R U R' F R U R' U' F' U R", "U R U R' U R F U' R' U R U F' U R'", "U' R U R' U R2 D Rw' U2 Rw D' R2", "U R' U R U2 R' U R2 D R' U R D' R'", "R' U' R U R2 U' R' U' R U D' R U R' D R'", "U' R U R' U R2 D R' U2 R D' R2", "U' R' U2 R U F R' U R U' F'", "U R U2 R D R' U2 R D' R' U R' U R U2 R'", "U F R' U' R2 U' R2 U2 R2 U' R' F'", "U2 R U R' U' R U R2 D' R U R' D R U R U2 R'", "R' U2 R' D R' U R D' R U R U' R U' R'", "U2 R' F R U R' U' R' F' D' R U R' D R2"],
    },
    oll28 : {
        "name": "Oll28",
        "1": ["U' R U R' U' R' U' F R2 U' R2 U2 R2 U2 R' U' F'", "U' R' U' R U2 Rw' U R U R' U' M' U' R", "U Rw' U' R U M' U' R' U R", "U M' U' M U2 M' U' M", "R U R' U2 Rw U' R' U' R U M U R'", "R' U' R' F R F' U R U' F R U' R' U2 R U R' F'", "M' U M U2 M' U M", "U2 Rw U R' U' Rw' R U R U' R'", "U R' U' F' U F R U' Fw R U R' U' Fw'", "U' R U R' U R U2 R' U' Rw' U' R U' R' U2 Rw", "U' M' U M U M' U M U M' U M", "U2 Rw U R' U' Rw' U2 R U R U' R2 U2 R"],
        "2": ["U2 F' U F U' R U' R' U' R U R' U2 F' U2 F", "U' R U2 R' U2 R' F R F' R U' L' U R' U' L", "U R' U' R U Rw' F Rw U2 R' F U R U R' F' R", "U F' U2 F U R U R' U R' F R F' R U R' U' R U R'", "U R U R' U R' F R F' R' U2 R2 U R2 U R2 U' R'", "U' Rw2 D Rw' U Rw D' Rw2 y' Rw U R' U' Rw'", "U R' U2 R U R' U R U' R' U' R U' R' U R' F R F' U R", "U2 F R U' R' U' R U R' F' Rw U R' U' Rw' F R F'", "R' F R U R' U' F' U R2 U R' U' R' F R F'", "U F R U' R' F R' F' R U2 R' U' F' U F R F'", "R2 D Rw' U Rw D' R2 U' F' U' F", "U' R2 D' Rw U' Rw' D R2 U y R U R'"],
        "3": ["U2 R' U' R U F R U R' U' R' U R2 U' R' F'", "U F' R' F R2 U R2 F R y' R U R2", "R' U' R U' R' U2 R U F R' F' R U2 R U2 R'", "U' R' U' R U' R U2 R2 U' R' U R U' R' U' x' U' R' U x", "U' Rw U R' F' R U R' U' R' F R2 U' Rw'", "R U2 R' U R' U' F U R U' F' R U2 R'", "U2 R U R' U2 F' Rw U' Rw' F2 U R' F R F'", "U2 F U R' F R F' R' U2 R2 U R2 U R F'", "U' R U' R' U2 R U F U R U' R' F' U2 R'", "F R U R' U' R U' R' F R' F' R U2 R U' R' F'", "U2 R' D' Rw U' Rw' D R U' Rw' D' Rw U2 Rw' D Rw", "U' R U R' U R U2 R' U R U2 R' U2 R' F R F'"],
        "4": ["Rw' D' Rw U Rw' D Rw U2 R' D' Rw U Rw' D R", "U R U R' U R' U2 R2 U R2 U R U' R' F R F'", "U2 F R F' U R U R' U2 F U R2 U' F' U R", "Lw U' R U2 Rw' F Rw U2 Lw' R'", "U2 R' F R U y' R U R' U' R U R2 U2 R' U R' U R", "F' U2 F R U R' U R U R' F' Rw U' Rw' F2", "U R' U F' U F R U' R' U' R U2 R' U2 R", "U Lw R U R' F' R U R' U' R' F R2 U' R' U' Lw'", "U2 R2 F R F' R U R' U R U2 R' U R U2 R' U2 R", "U2 R' F R U' y' R' U2 R' U2 R U' R U2 R'", "U2 R U2 R2 U' R2 U' R' U R' U' R U' R' F' U F U' R", "U' F' Rw U Rw' U2 Rw' F2 Rw U' R' U2 R U R' U R"],
        "5": ["R' U R' F' U2 F U' R U' R' U' R U R' U' R2", "U2 R' D' Rw U' Rw' D R U2 Rw' D' Rw U' Rw' D Rw", "U' R U2 R' U2 R' F R F' U' R' U2 R U R' U R", "U2 R2 F R U F' R U R' U F U F' U R", "U F R U R' F R' F' R2 U2 R' U' R U R' F'", "R' U' R U' R2 F R F' R U2 R' U R U' R' U R", "U2 R2 F2 Rw U Rw' F2 R F' R", "R' U R U2 R2 U' F' U F R U R", "Rw U Rw' U2 Rw' F Rw2 U' Rw' F U' F' Rw U Rw' F'", "R U' R' F R F' R U R2 U Rw' U' R U Rw", "U' R U2 R' U2 R' F R F' R U R' U R U2 R'", "R' U' R U' R' U2 R U Rw' F2 Rw U2 Rw U' Rw' F"],
        "6": ["U2 R U' R' U2 R' U' F R F' R' U R2 U' R'", "U2 F R U R2 U' R U R U' R' F' U' R' U R", "U2 Rw U R' U' M U F' R U R' U' R' F R2 U' R'", "U2 R' F R F' R' F R2 U R' U' R' F' R2 U R'", "U2 Rw U R' U' Rw' F R2 U' R' U' R U R' F'", "U' R' F R' F2 Rw U' Rw' F2 R2", "U2 R' U' R U R' U' R U2 R' F R' F' R2 U R' U R", "U2 R' U' F' U F R' D' R U2 R' D R U2 R", "U2 x R2 U2 R U R' U2 L U' R U M", "U2 F R' F' R U2 R U' R' U R' U' R2 U' R2 U2 R", "U2 F U R U' R' U2 R' D' R U2 R' D R F'", "U2 F R' F' R U2 R U2 R' U' R U2 R' U' R U' R'"],
    },
    oll29 : {
        "name": "Oll29",
        "1": ["U R' U R U R2 F R F' U F' U' F U2 R", "U R U R' U y' R' U R U' R' U R U' y R U2 R'", "R' F' U' F U' R U R' U R U R' U' F' U F R", "R U R' U2 F' U' F R' F R F' R U2 R'", "U' Rw U2 R' U' R U' Rw' R' U2 R U R' U R", "U2 R' U' R U R' U R U' R' F2 Rw U Rw' F U R", "R U2 R' U' R U' y R U R' U' R U R' U' F'", "U2 Rw' U' R U' R' U2 Rw U Rw' U2 R U R' U Rw", "U2 Rw U R' U R U2 Rw' U' R U2 R' U' R U' R'", "U' F R U' R' U2 R U2 R' U' R U R' U' R U R' U' F'", "U2 R' U' R U' R' U2 R U Rw' U2 R U R' U Rw", "U Rw U R' U R U2 Rw' U2 F R U R' U' R U R' U' F'"],
        "2": ["U R U R' U R U' R' U R U2 R2 F' U' F U R", "U' R U' R' U y' R2 U2 R U R' U R2 U' y R U R'", "U2 Rw U2 R' U' R U' Rw' U R U2 R2 F R F' R U2 R'", "U Rw2 D' Rw U Rw' D Rw2 U' Rw' U' Rw", "R U2 R2 F R F' R U2 R' U' R' U2 R U R' U R", "U R U2 R2 F R F' R U2 R' U Rw' U' R U' R' U2 Rw", "U' R' U' R U' R' U R U' R' U F' U F R", "U' R' U' Rw D' R2 U' R U' R' U R2 D Rw' U' R", "Fw R U R' U' Fw' R U R' U R U' R' U R U2 R'", "R U2 R2 F R F' R U' R' U R U2 R'", "U R U R' U R U' R' F' U2 F R U R' U' R U' R'", "U2 R U2 R' U' R U' R' U R U2 R2 F R F' R U2 R'"],
        "3": ["M U' F U R U2 R' U' R U2 R' U' F' M'", "U Fw U' R' U2 R' U2 R2 U R' Fw'", "U' F U2 R U2 R2 F R2 U R' U' R U R' U' F2", "U R U2 R2 U' R2 U' R' U R' F U R U' R' F' R", "U2 F R' F' R U2 R U2 R' U2 R U2 R' U' R U' R'", "U' F R U' R' U R U2 R' U' F' R' U2 R U R' U R", "U2 R U R' U' R U' R' F' U' F R U R'", "U R' U2 R2 U R' U R U' R' U' R' F R F' R' U R", "U2 R' U' R U R' F U R U' R' F' U R U R' U' R", "R U R' U R U2 R' U R U R' U' R' F R F'", "U' R' U2 R U' R' U R U R' F' U' F U2 R", "U2 R' F' U' F U R U R' F R U R' U' F' U R"],
        "4": ["U2 R' F R F' U R' U R U F' U F R' U R", "U R U R' U' R' F R F' Rw' U' R U' R' U2 Rw", "U' R' U' F U R U' R' F' R U R U R' U R U2 R'", "U R U' R' U' F U R U' R2 F' R2 U2 R'", "U F R U' R' U' R U R' F' U' Rw U2 R' U' R U' Rw'", "U' F U R U R' U y' R' U R U R' U' R U R'", "U2 x R' U' R D' R' U2 R' U' R2 D x'", "U' R' F R F' U R U R' U F' U F", "U R U R' U' R' F R F' Rw' U' Rw U' R' U M U Rw", "U R' U' R U' R' U2 F R U R' U' F' U R", "U Rw' U Rw U' R' U' R U' R' U Rw' F R F' U' Rw", "U2 R U R' U R U2 R2 F R U R' F' R F U' F'"],
        "5": ["R' U' R' F R2 U' R' F' Rw' F Rw R U R' U R", "Rw' F Rw U2 R' F Rw U2 Rw' U' F' U R", "U2 R' U2 R U F R' F' U R U R U' R'", "U' R U R' U R U' R2 F' U' F U R2 U2 R'", "R' F' U2 R U R' U' R' F R U' F' U' F U' R", "U2 R' U' R U R U' R' U' F' R' U R F R U R'", "R' F' U' F U R U2 R' F R U R' U' F' U R", "U R' U' F' U' F U R U2 R' U R U R' U R", "Fw R U R' U' R U R' U' Fw' R U R' U' R' F R F'", "U2 F R F' Rw U R2 U' M U R U' R'", "U R' U' F' U' F U2 R U2 R' U2 R U' R' U' R", "U2 F R U R' U' F' U2 F R U' R' U R U R' F'"],
        "6": ["U R U R' U' R' F R F' U2 R U2 R' U2 R' F R F'", "U2 R' U2 R2 U R' U' R' U2 F R F'", "U2 R U R2 U' R' U' R' U R U F R F'", "U2 R2 F R F' U2 R U' R' U2 R' U2 R U R' U R2", "U F R U R' U R' U' F U R U' R' F' R U' F'", "U2 R' U2 R U' R' U' R U2 R' U' F' U' F U2 R", "U2 R U R' U' R U2 R' F R U R' U' F' R U R'", "U2 R' U R U' R2 U2 R U R' U R U F R' F' R2", "Rw' U Rw' F R F' U F R U R' U' R' F' Rw U' Rw", "U M U R U R' U' R' F R F' M'", "U2 R' U2 R Rw U R' U' Rw' U2 F R F'", "R' U' F' U' F2 U R U' R' F' U2 R"],
    },
    oll30 : {
        "name": "Oll30",
        "1": ["U2 F R' F R2 U' R' U' R U R' F2", "U Rw U R' U R U2 Rw' U' Rw U2 R' U' R U' Rw'", "U' R' U2 R U R' U y' R' U' R U R' U' R U Bw", "U R U R' U' R U' R' U' F' Rw U' Rw' F2 R U R'", "U R U R' U R U2 R' U R U R2 F R F2 U F", "U' R' U' F' U F R U R U2 R2 F R F' R U2 R'", "U R' F' U F R U R' U R U' R2 F R F' R", "U2 R' U' R U' R' U R' F R F' R' F R F' U R", "F R U R' U F' U' F U' R U' R' U2 R U R' F'", "Rw' U2 R U R' U Rw U' R' U' R U' R' U2 R", "U R U R' U R U2 R' U' Rw U2 R' U' R U' Rw'", "U2 F R U R' U' R U R' U' F' R' U' R U' R' U2 R"],
        "2": ["U2 F U R U' R' F' R U2 R' U' R U R' U' R U R' U' R U' R'", "U2 R' U' R U' R' U R U' R' U2 R2 y R U R' U' F'", "U2 Rw2 D Rw' U' Rw D' Rw2 U Rw U Rw'", "U Rw' U2 R U R' U Rw R U2 R2 F R F' R U2 R'", "R U Rw' D R2 U R' U R U' R2 D' Rw U R'", "R U R' U R U' R' U R U' y R U' R' F'", "U' R U2 R2 F R F' R U2 R' Rw U R' U R U2 Rw'", "U R U' R' U' R U' R' F' U' F U2 R U R'", "R U R' U R U' R' U R' F R F Rw U Rw' F", "U' Rw U2 R2 F R F' R U' R' U R U2 Rw'", "U R' U2 R U R' U R2 U2 R2 F R F' R U2 R'", "U' Rw U' Rw' U' Rw U Rw' R' D' Rw U Rw' D R"],
        "3": ["U2 F U R U2 R' U' R U2 R' U' F'", "U2 R2 U R' U R U2 R' U2 R' U R U y R U R' U F'", "U2 R' U2 R2 U R U' R' U R U R U' R' F R F'", "U F R' F' R U2 R U2 R' U Rw' U' R U' R' U2 Rw", "U R' U' R U R' U R U2 R' F' U F U R", "U R U R' F D R' U R' U' R D' F'", "U2 F U R U' R' U R' U' R F' R' U R", "R U2 R' U R U' R' U' Rw' U' F' U F Rw R U' R'", "U2 R U2 R2 U' R U' R' U2 F R2 U R' U' F'", "R U2 R' U R U' R' U' R y R U R' U2 F'", "U' R' U' R U' R' U2 R U' F R U' R' U R U R' F'", "U' R' U' R U R' U' Rw' F R F' U Rw U Rw' U' Rw"],
        "4": ["U' R' U' R U' R' U2 R U' R U R' U' R' F R F'", "U F R U R' U' R' F' R U2 R' F R F' R U2 R'", "U R U2 R' U' R U' R' U' R' F R U R' U' F' U R", "U R' U' F' U' F U' R U' R' U' R U R' U' R", "Rw' U2 R U R' U Rw U Rw' F R F' Rw U R'", "U2 R' U R U2 R' U' F' U F R' F R F' U R", "U' F R' F' R U R U' R' U Rw' U2 R U R' U Rw", "U2 F R U R2 U' R F' U' R' U F' U F R", "R U R' F' R U2 R' U' R U' R' U F R U' R'", "U R' U' F' U' F U R U2 R' U R U R' U' R U R' U R", "R U2 R' U' F' U F R U R' U' R U' R'", "F R U' R' U' R' F' U' F U R2 U2 R' U' F'"],
        "5": ["U R U2 R2 U' R U R U2 x' U' R' U x", "U' F U R U' R' F' R' U' F U R U' R' F' R", "U2 R U R2 F' R U R U' R' U' F R U' R'", "U R U2 R' U R U R' U2 R U y R U R' U2 F'", "U' R' F' Rw U Rw' R2 U' Rw' F M'", "U2 R2 D' R U' R' D R2 y R U' R' U' F' U2 F", "U' F R U' R' U R U2 R' U' F' R U2 R' U' R U R' U' R U' R'", "U F R U R' F' U' R U R' U' R' F' Rw U2 R U' Rw'", "U F R U R' U' F' U2 R' U' F U R U' R' F' R", "R U2 R' F2 Rw U2 R' U' Rw' F R", "U2 F2 U' R' F2 R F R U' R' U' F R U R'", "F U R U R2 U' F' U F R U2 F'"],
        "6": ["U' R U2 R' U2 R' F R F' U R' U2 R U R' U R", "U R U R' U2 F2 U' Rw U' Rw' F U F2", "U R U2 R F R F' U' R2 U' R' U' R' U R", "U R U R' U' R' U2 F U R U' F' R' U2 R", "U2 F U R U2 R' U' Rw' F R F' Rw U2 R' F'", "U2 R2 U2 R2 U' R2 U' R2 U2 R U' y R U R' U F'", "R' F R F' U' Rw U Rw' R U2 R' U Rw U Rw'", "U' F R U' R' U R U R' U R U' R' U R U' R' F'", "U' F U R U R' U' y' R' U2 R U' R' U' R U' R'", "U2 F U R2 U' R2 F' R' U R U' F R F'", "U' M' U M U Rw U Rw' F' U' F Rw U' Rw'", "U2 R' F' U' F U R U R U R' U' R' F R F'"],
    },
    oll31 : {
        "name": "Oll31",
        "1": ["U R U2 R' U' R U' R2 U' y' R' U R U' R' U Lw U x", "R U2 R' U' R U' R' U Rw U Rw' U R U' R' Rw U' Rw'", "U2 F R U R' U' R U R' U' F' R U R' U R U2 R'", "U' F R U' R' U2 R U2 R2 F R F' R U' R' F'", "U2 Rw U R' U R U2 Rw' U2 R U2 R2 U' R2 U' R2 U2 R", "Rw U2 R' U' R U' Rw' U Rw U R' U R U2 Rw'", "U' R U2 R' U R' F R F2 U F U' R U R'", "U' F R U' R' U2 R U R' U' R' U R U F' U R' U R", "U2 R U R' U R U2 R' F U R U' R' U R U' R' F'", "R U2 R' U2 R' U2 Rw U R U' Rw' U R' U R", "R U2 R' U' R U' R' U Rw U R' U R U2 Rw'", "U F U R U' R' U y' R' U R U' R' U R U' y R U' R' F'"],
        "2": ["U' R U2 R' U R' D' R U' R' D R U2 R' F R F'", "U R U2 R' U' R U R' U' F' U2 F U R U2 R'", "U R U2 R2 F R F' Rw U' R' U R U2 R' U' M", "U' R U' R' U2 R' U2 R U R' U R U y F R U' R' F'", "U2 F R' F' R U R U' R' U Rw' F R F' Rw U R'", "U' R U R' U R U2 R2 U' F' U F U' R U' R' U2 R", "U' R U2 R' U' R U R' U' R U' R' F U R U' R' F'", "U' R U2 R' U' R' D' R U2 R' D R U R' F R F'", "U' R' U2 R U R' U' R U R2 F R F' U R", "Rw' F R F' Rw U' R2 U' F' U F R2 U' R'", "F R' F' R U R' F' U' F U R U2 R' F R F'", "U2 F R U' R' U R U2 R' U' R U2 R' U' F' U2 F U F'"],
        "3": ["U' F R2 U2 R' U2 R' U' F R F' R' U F'", "R U2 R' U' R U' R' U R' F2 Rw U2 R U' Rw' F", "M U Rw' U' R' F R U Rw U' R' F' Rw", "U2 R' U' Rw' D' Rw U Rw' D Rw R", "U2 F R U R' U' R U R' U' F' R U' L' U R' U' L", "U R U' R' U2 R U y R U' R' U' R U R' U' F'", "U2 R U R2 F' U' F U R2 U' R' U R U2 R'", "U' R' U' F U R U' R' F' R", "U R' F R U R' U' F2 U F R", "U' R' U' F' U2 F U' R' D' Rw U' Rw' D R2", "U' R' U2 R U F R' U R U' F' U F U R U' R' F'", "U Rw' U Rw U' Rw' U' R' F R F' Rw"],
        "4": ["U R' U' R' F R F' U R2 U R' U' R' F R F'", "U2 R' U2 R U F U R U' R' F' U' R' U R", "Rw' U' R' F R U Rw U' F' Rw U Rw'", "U Rw U' Rw' U' Rw U Rw' R U R' U' F' U2 F", "U2 R U2 R' U2 R' F R2 U' R' U' R U R' U R U' R' F'", "U' R2 F2 Rw U Rw' F' Rw U' R U2 Rw' F R", "U2 F R' F' R U R U' R' U' R' U' R U' R' U2 R", "U2 R' U' F' U R U R' U' R' F R U R", "U2 R' U' R U R' U R U R U R' U' R' U' F R F'", "U R' U' R U' R U R2 U R U2 R' F R F'", "U R' U2 R U F U' R' U2 R U2 R U' R' F'", "U2 F R' F' R U R U R' U' R U' R'"],
        "5": ["U2 F R U' R' U' R U R' F' U' R U2 R' U' R U' R'", "U R U R2 F R F' R U R' U2 R U R' F' U2 F", "R U' R' U' R' U' F' U F U2 R2 U R2 U R", "U2 Rw U R' U' Rw' F R F' U Rw U2 R' U' R U' Rw'", "U' R' U R U' R' U R U R' U F' U F U R", "U' R' U2 R U R' U R F R' F' R U R U' R'", "U' R' U2 R U R' U Rw U R U' Rw' U' F' U F", "U2 F R U' R' U' R U R' F' U2 R' U' R U' R' U2 R", "U' M' U R U' Rw' U R U R' U y' R' U R", "U2 R' U R2 D Rw' U' Rw D' R2 U2 F' U F R", "U' R U R' U R U2 R2 U Rw U R' U' F' U' F R2 Rw'", "U R' U' F' U2 F2 U R U' R' F' U' F' U' F R"],
        "6": ["U R' U' F' U' F U R U2 R' U' R", "R U2 R' U' F' U F U R U2 R'", "R U2 R' U2 R' F R F' U F U R U' R' F'", "U2 F R U' R' U' R' U' R U' R' U2 R2 U R' F'", "U' R2 D R' U R D' R' U R' U2 R' F R F'", "U R' F' U2 R U R' U R U' R' U' R' F R U R", "R' U' R' F R2 U' R' U2 R U R' F' R", "Rw U R' U' Rw' F R F' Rw' U2 R U R' U Rw", "U' R U R' U R U' R2 F' U' F U R U' R U' R'", "U R' U' R U' F R U R' U' F' U' R' U' R", "U' R' F' U' F U R U' F R U' R' U' R U R' F'", "R' U2 R U R' U R U2 R U R' U' R' F R F'"],
    },
    oll32 : {
        "name": "Oll32",
        "1": ["U' R U' R' F2 Rw U Rw' F U' R U' R' U2 R U R'", "U' Rw' U2 R U R' U Rw U' Rw' U' R U' R' U2 Rw", "U R U2 R' U F' Rw U' Rw' F2 U' R U2 R'", "R U R' U R U2 R' U' Rw U Rw' R U R' U' Rw U' Rw'", "U' Rw U R' U R U2 Rw' U2 Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "U' R' F R U R U2 R2 F Rw U' R U' Rw2 F Rw", "U2 R' U2 R U R' U R U F U R U' R' U R U' R' F'", "R U R' U R' F R F2 U F U2 R U' R'", "U R U2 R2 F2 Rw U Rw' F R U R U' R'", "U Rw' U' R U' R' U2 Rw U2 R U2 R2 U' R2 U' R2 U2 R", "U' R' U2 R U R' U R U' Rw' U' R U' R' U2 Rw", "U' F R U' R' U' R U R' F' R U R' U' R' F R2 U R' U' F'"],
        "2": ["U2 R' U2 R U R' U' R U R' U R U' R' U' F' U F R", "U2 F U R U' R' U' F' U2 F R' U2 R U R' U R F'", "Rw' U' R' F R F' R U' R' U R U' R' U2 Rw", "U2 F R' F' R U2 R' D' R U R' D R U' R U2 R'", "R' U' R U' R' U2 R2 U R' U R' F R F' R U2 R'", "U2 R U' Rw' U' R U R2 D' Rw U Rw' D Rw", "U R U R' U R U' R' U R U2 R' U2 R' F' U' F U R", "R' U2 R U R' U' R U R' U R U R' U' F' U F R", "U R U R' U R U' R' U R U2 R' U F R U R' U' F'", "U2 F' U' F2 R U R' U' F2 U' y R U' L U R'", "U R2 D Rw' U' Rw D' R2 U Rw U R' U' M", "U2 R U2 R' U' R U R' U' R U' R' F R U R' U' F'"],
        "3": ["U R U2 R2 U' F' U F R2 U' R'", "U' F R U R' F' U F U R' F R F' R U R' F'", "U2 F U R' F R F' U' R U' R' U' R U R' F'", "U2 Rw U' Rw' F Rw U' Rw' F2 R U' R2 F R F' U F'", "U2 F R U' R' U' R U R' F' U R U R' U R U2 R'", "U2 R' F R U R' U' F' U R U F R U R' U' F'", "U2 F R U R' U' R U R' U' F' Rw U R' U' Rw' F R F'", "U R U R2 F' U' F U R U' F' U2 F R U' R'", "U2 F U R U' F' Rw U R' U' Rw'", "U2 F R' U' R2 U R U R' U' R U R U F'", "U F R U R' U' F' U F R U' R' U' R U R' F'", "U2 F R U' R' U' R U R' F' R' U2 R U R' U R"],
        "4": ["U' R' U2 R U R' U R U R U2 R' U2 R' F R F'", "U2 F U' R U R2 D' R U' R' D R U2 F'", "U2 F' U R U R' U' R' U' F2 U R2 U' R' F'", "U F R' F' R U R U' R' U2 F R U' R' U2 R U R' F'", "U' R' U2 R U2 R' U R U2 R' F' U2 F R", "U' R' U' F U F' R F R U' R' F'", "U' R' U2 R U R' U' F' U' R' F' U' F U R F U2 R", "U2 x' R U' R' D R U R U' R' U R' D' x", "R U2 R' U' F' U F R U' R'", "U2 F R U R' U' R U R' U' R F' Rw U R' U' Rw'", "U' R U R U R U R' F' U F R U R2 U' R' U' R", "U' R' F R F' U' Rw U' Rw' U Rw U Rw'"],
        "5": ["Rw' U Rw' F' Rw2 U' Rw' F' Rw F R U' R' F'", "Rw U2 R' U' R U' Rw' U F R U' R' U' R U R' F'", "U2 R' U' R2 U' R2 U2 F' U' F U R U R U R'", "R U2 R' U' R U' R' U F R U' R' U' R U R' F'", "R U2 R' F R' F' U' F' U F R2 U' R'", "U' Rw U2 R' U' R U' Rw' U2 Rw U R' U' Rw' F R F'", "R U' R' U R U' R' U' R U' y R U' R' U' F'", "M U' R' U Rw U' R' U' R U' y R U' R'", "U' R U2 R' U' R U' R' U2 R U R' U' R' F R F'", "U R' U2 R2 U2 R2 U2 R' F R F' R U R U' R2 U R", "U2 R2 D R' U2 R D' R' U2 R' F U R U' R' F'", "U' F U R U2 R2 U' F' U F R U R U R' F'"],
        "6": ["U R U' Rw D Rw' U Rw D' Rw' U R'", "U' F U R U R' U' F' U2 F U F'", "R U2 R2 F R F Rw U2 Rw' U' Rw' F Rw", "U' F R U R' U' R U' R' U R U2 R' F' U F U2 F'", "F' U' Rw U' Rw' F U Rw U R' U' Rw' F R", "U R U R' U' R' U2 R U R' U R U2 R' F R F'", "R2 D' R U' R' D R U' R U' R' F' U F U' R", "R' U' R U' R' U R U F R U R' U' F' R' U R", "U2 Lw U R' D R U' R U' R' U R' D' x", "U F R U R' U' F' R U R' F' U F R U' R'", "U2 R U R' U2 R' F' U' F U R2 U R'", "U' R U2 R' U' R U' R' U2 F R U' R' U R U R' F'"],
    },
    oll33 : {
        "name": "Oll33",
        "1": ["R U R' F' U2 F R U R' F R' F' R2 U2 R'", "U R U2 R' U' R U' R' Rw' U2 R U R' U Rw", "U Rw' U' R U' R' U R' F R F' R' F R F' U Rw", "R U R' U R U2 R' U2 Rw' U' R U' R' U2 Rw", "U' Rw U R' U y' R' U R U' R' U R U' y R U2 Rw'", "U' R' U2 R U R' U R Rw U2 R' U' R U' Rw'", "U R' U' R U' R' U2 R U2 Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "R' U' R U' R' U2 R U2 Rw U R' U R U2 Rw'", "R U R' F Rw2 F Rw U' Rw2 U2 Rw' U' F", "U R U' R' U' R' U y R U' R' F' U F2 R' F R", "U' R U2 R' U F' U' F R' F R F' R U2 R'", "U' R U2 R' U' R U R' U' R U' y R U R' U' R U R' U' F'"],
        "2": ["U R U R' U R U2 R' U' R U2 R2 F R F' R U2 R'", "U2 Rw' U Rw U Rw2 D' Rw U' Rw' D Rw2", "R U' R' U' F' U2 F R' F R F'", "U' R2 U' F R F' U R U R' U' R' U R2", "U Rw U R' U' Rw' F R F' U F U R U2 R' U' R U R' F'", "U' Rw2 F2 R U' R' F R F' U R' F2 Rw2", "U Rw' U' R U' R' U R U' R' U F' U F Rw", "U2 F R U R' U y' R' U' R U R' U' R U' R'", "U' R U R' U R U' R' U R U2 R' U2 R' U' F' U F R", "U' R U' R2 F R F Rw U2 Rw' R U R' U' Rw U' Rw' F", "U2 F R U R' U' F' R' U' R U' R' U R U' R' U2 R", "U2 F R U R' U' F' U' R' U2 R U R' U' R U R' U R"],
        "3": ["F U R U2 R' U' R U R' F' U2 R U2 R' U' R U' R'", "U2 Rw' F R U F R U2 R' U2 R U R' F' M'", "R' U F' U F R U R' F' U2 F R", "R' U' F' U F R U2 F R U' R' U' R U R' F'", "F R U' R' U' R U R' F' U' F U R U' R' F'", "F U R' F R F' U F' U' R' F R U' R' F' R", "R U2 R' U F' Rw' U2 R U R' F U Rw F", "U2 F R U R' U' R U' R' U R U2 R' U' R U R' U' F'", "U' M U R' U' F U R U' R' F' R U' M'", "F R U' R' U R U R' F'", "U R2 U' R2 F R' F' U' R' U R' U R2", "Rw' F2 Rw U Rw U' Rw' F2 R U2 R' U' R U R' F'"],
        "4": ["U R' U' R' F R F' U y' R' U R U R' U2 R U Fw z'", "U R' U2 R' D' R U R' D R2 U' R' U F' U F R", "U F U' R U' R' F' U' F R U2 R' F'", "U' Rw' U' R' F R F' R' F R F' U F R F' Rw U R'", "U2 F Rw U' Rw' U R U R' U Rw U' Rw' U R U' R' F'", "Rw U R' U R U' R' U' Rw' F R2 U R' U' F'", "U R' F' U' F U R U Rw U R' U' Rw' F R F'", "U' M U R U2 R' U' F' U F R U' R' U' M'", "R' U' R U' R2 F R F' R U2 R' U2 x U R' U' R2 x'", "F' U' F Rw U Rw' R U R' U Rw U R' U M", "R U R' U' R' F R F'", "R U R' F' U' F U' R' U2 R U R U' R2 U2 R"],
        "5": ["R' U R U' R' U' R U2 R' F R' F' R2 U' R' U' R", "R U' R' U R U R' U2 R U R2 F R F' R U R'", "U2 Rw U' Rw' U' Rw U Rw' U2 Rw' D' Rw U' Rw' D Rw", "U2 R U R2 F' U' F U F R F' R U2 R'", "R U2 R2 F R2 U R' U' F' U R U R'", "U' F U R U2 R' U R U2 R2 F R F' U' F'", "Rw U Rw' R U R' U' R Rw U' Rw' F R' F'", "U2 R U R' U y' R' U R U Rw' U' R U M'", "U2 R' U' R U' y R U' R' U' Rw U R' U' M", "U' R' U' R U' R' U R U' R' U' R U2 R' U' F' U F U R", "Rw' U2 R U R2 F R U F' Rw F R U' R' F'", "R U2 R' U' R2 U' R' F U R2 U' F' U' R' U2 R"],
        "6": ["U R U2 R' U2 R' F R F' R' F' U' F U R", "R U R' F' U' R U R' U' R' F R2 U' R'", "U L F' R' F R2 U R' U F U R U R' F L'", "U' Fw R U R' U' Fw' F R U' R' U' R U R' F'", "F R U' R' U2 R U R2 F' R U R U' R'", "R' U' F' U F R U R U R' F' U F R U' R'", "R U R' F' Rw' F' Rw2 U Rw' U' Rw' F Rw", "U R U R' U2 R U' R' F R U R' U' F Rw U Rw' F", "U' Rw U2 R2 U' R2 U' Rw' U R' F U R U' R' F' R", "R U R' U R U2 R' F' Rw U Rw' U2 Rw' F2 Rw", "U R U2 R' U2 R' F R F' U' F R U R' U' F'", "R U R' U2 F' U F R U' R' U2 R U2 R'"],
    },
    oll34 : {
        "name": "Oll34",
        "1": ["U2 F R U R' U' R U R2 F R F' R U' R' F'", "Rw' F R F' Rw U R' U' R U R' U' R' F R F'", "U2 Rw U R' U R U2 Rw' F U R U' R' U R U' R' F'", "R' F R U R' U' F' R U' R2 D' Rw U2 Rw' D R2", "R U' R' U' R U2 R' U2 F' U F U' x U R' U' R x'", "F R U R' U' R U R' F2 Rw U Rw2 F Rw", "U2 F U R U' R' U R' F R F Rw U Rw' U' Rw' F2 Rw", "R U2 R2 U' R2 U' R2 U2 R U' Rw U2 R' U' R U' Rw'", "U' Rw U Rw' U R U' R' U2 R U' R' U2 Rw U' Rw'", "U' Rw' U' Rw U' R' U R U2 R' U R U2 Rw' U Rw", "F R U R' U' R U R' F R' F' R2 U' R' F'", "U2 F R U R' U' R U R' U' F' Rw U R' U R U2 Rw'"],
        "2": ["U R' U' R U' R' U F' U F U2 R U R' U' R U R' U R", "U F' R U2 R2 F R U Rw U' Rw' F' U' R U2 R' F", "U' R' U' R' F R F' R U' R' U R U' R' U2 R", "U2 F U R' U' F' U R U2 R U' R' U R U2 R'", "U2 R U R' U' R' F R F' U2 Rw' F R F' Rw U R'", "U2 F' U' F R' D' Rw U' Rw' D R U2 R U R'", "Rw U' Rw' U' F' U' F U Rw U Rw' U Rw U Rw'", "U Rw' D' Rw U' Rw' D R2 U' R' U Rw U R'", "U' R' U' R' F R F' U R U' R U2 R' U' R U R' U' R U' R'", "R' F R U Rw U2 Rw' U Rw U2 Rw' U' F' R U2 R'", "R U R' U R U' R' U R U2 R2 U' F' U F R", "U' R U2 R' U' R U R' U' R U' R' U R' U' F' U F R"],
        "3": ["U2 F R' F' R U R U' R' U R U2 R' U2 R' F R F'", "U' R' U2 R2 U y R U' R2 F' R2 U' R'", "R U R' U' R' F R F' R' U2 R U R' U R", "F R U R' U' F' U F R' F' Rw U R U' Rw'", "R' U2 R2 U R2 U R U2 R' F R F'", "R U R' U' R' F R F' U R U R' U R U2 R'", "U2 F R U R' U' F' U2 F R U' R' U' R U2 R' U' F'", "U2 F R F' Rw U Rw' U R' U' Rw U' Rw'", "Rw' U2 R U R' U Rw U2 R U R' U' R' F R F'", "U2 Rw U2 Rw' U' R U' R' F U F' U' R' F' R", "U R U R' U Rw U2 Rw' U F' U' F U Rw U Rw'", "U2 R' F' U' F U R2 U' R2 D' Rw U' Rw' D R2 U R'"],
        "4": ["U' R U' R' F R' F' R2 U' R' U2 R U' R' U' R U R'", "U' R U2 R2 F R F' R U2 R' U R U R' U' R' F R F'", "R U2 R' U' R U R' U F' U F R U' R2 F R F'", "U Rw U R' U R U2 Rw' U F R U' R' U R U R' F'", "F R U' R' U R U R' F' U' R U R' U R U2 R'", "U Rw' U' R U' R' U2 Rw U' R U R' U' R' F R F'", "U2 R U R' U' R' F R F' R' U' R U' R' U2 R", "U' F' U' F U' R U' R' U' x U R' U' R x'", "R U R' F' U' R U R' U R U2 R' F R U' R'", "U R' F' U' F U R U' R' U2 R' D' R U2 R' D R2", "U2 F R U R' U' F' R U2 R D R' U2 R D' R2", "U' F R' F' R U R U R2 F R F' R U2 R'"],
        "5": ["U F R U' R' U' R U2 R2 F R F' U' F'", "R U R' U R U2 R' U' F R U' R' U' R U R' F'", "R' U2 R F R U R' U' F' U' R' U' R", "U2 R' U2 R F R U R2 U' R F' U' R' U' R", "U F R U R' U' F' R U2 R2 F R F' U2 R' F R F'", "R U R2 U' R' F R U R U' F'", "U2 R' U' R' D' R U R' D R' U R' U' M' U R U' Rw'", "R' U2 R U R' F' U' F U R U2 R' U' R", "U2 F R U R' U' F' U' R' U2 R' D' R U2 R' D R2", "U2 R2 F R F' U2 F R U' R' U R U2 R' U' R' F' R2", "U' R' U' R F R2 U' R' U R U R F'", "U2 Rw' R U R' U2 R U R' U2 Rw U R' F' U' F R"],
        "6": ["U2 F R U R' U' R U R' U' R' F' R U2 R U2 R'", "U2 F R' F' R U R U' R' U' Rw' U' R U' R' U2 Rw", "U2 R U2 R' U R' F' U' F U R2 U R'", "U2 R' U' R U y Rw U R' U' M", "U F U R U' R' F' R U2 R' U' F' U F R U' R'", "U R U R' U R' F R F' R' U' F' U F R U' R' F R F'", "U R' U' F U R U' R' F' R F R U R' U' R U R' U' F'", "U R' U' R2 U R U R' U' R U R U2 R' F R F'", "U2 R U2 R' F R U R' U' F' U R U R'", "U2 F R U R' U' R' F' Rw U R U' Rw'", "U2 R' F R U R' F' R y' R U R' U' R U R' U' R U' R'", "R' F' U' F U' F R U R' U' F2 U2 F R"],
    },
    oll35 : {
        "name": "Oll35",
        "1": ["U2 R' F R U Rw' F Rw F2 U' F' Rw U' Rw'", "U2 R2 F2 Rw U' Rw' R F2 R U2 R' U2 F R", "U2 Rw U R' U R U2 Rw' R U R' U R U' R' U R U2 R'", "F R U R U R' U' R' U2 F R F' U R' U F'", "U R' U2 R U R' U' Rw U R' U' Rw' R2 U R' U R", "U' Rw U' Rw' U' R U' R' F2 U F R' F R", "U' Rw U2 Rw' U F' Rw U' Rw' F2 Rw U' Rw' U' Rw U2 Rw'", "U R' U2 Rw U R' U' R U R' U' Rw' R2 U R' U R", "U Rw' U' R U' R' U2 Rw U' R U2 R' U' R U R' U' R U' R'", "U' R U2 R' U' R U R' U' R U' R2 F2 Rw U Rw' F R", "U R' U' F' U' F Rw' F R F' Rw U' R' U' R", "U2 F' U' Rw' F2 Rw F R U R' U' R U R' U' R U' R'"],
        "2": ["U2 R' U' R U' Rw' U2 R U' F R U R' U' F' M'", "U' R U2 R' U' R U' R' U2 F R U R' U' F'", "U R U R' U R U2 Rw2 U' F' U F Rw U' M'", "R U R' U R U' R' U R U' R' U R' F R F' R U2 R'", "U R U R' U F' U F Rw U' R' U' R U Rw' R U R'", "R U R' F' U2 F R U' R' U R' U' R U' R' U2 R", "R U2 R2 F R F' R U2 R'", "U' F R U' R' F' Rw' F Rw U R U R' U R U2 R'", "U2 R' U' F' U F R U2 R U2 R' U' R U' R'", "Fw R U R' U' Fw' U' R' U2 R U R' U R", "R' U2 R U R' U R U2 F R U R' U' F'", "U' R U2 R' U' R U' R' U' R' F' U' F U R"],
        "3": ["U' R U R' U R U' R' U' R U' R' F' U' F R U R'", "U' R' U' F2 U' R U R' U' R' F' R F U2 F2 R", "U R U2 R' U' R U' R' U' R U R' U' R' F R F'", "U Rw' U Rw' F R F' Rw U2 R' U' R U R' U Rw", "U2 R2 F2 R U' F R' F R F' R U R' F2 R", "U2 R' U2 R U R' U' R U F R' U R2 U' R' F'", "U Rw' U' R' F R F' U F R F' Rw U R'", "U R U2 R2 U2 y R' F' R U2 Rw U Rw'", "U' R' U' R' F R F' U R U' R U R' U' R' F R F'", "U2 R' U' F' U F Rw U' Rw' F R F' Rw U Rw'", "R U R' U' R U' R' F R U R' U' F' U2 R U' R'", "U2 R2 F R F' R U2 R' U R U2 R' U' R"],
        "4": ["R' F R U R' U' F' U R F R U R' U' F'", "U' R' U' R' F R F' U R U' F R U' R' U R U R' F'", "Rw' U' Rw U' R' U R' U' F' U F R2 U Rw' U Rw", "U R U2 R' U' R U' R' U' F R U' R' U R U R' F'", "R U2 R2 U2 R2 U R F R U R U' F'", "R' F R U R' U' F' U R U' Rw' U' F' U F Rw", "U R' F R U R' F' R U F U' F R' F' R U' F'", "U2 R' U' R U' R' U' R U2 R' U' F' U F U R", "U M U R' F R U R' U' F' U R U' M'", "U' R' U' R U' R' U R U' R' U R F R' F' U F R F'", "R' U R U R' U2 R U2 R' U2 F' U F U R", "U2 F U2 R' F' U' F U R2 U' R' U' F'"],
        "5": ["F U R U' R' U R U' R' F' U R' F R U R' U' F' U R", "U2 R' U' Rw U R' U' R2 D Rw' U' Rw D' Rw' R' U R", "U2 R' U2 R U R' U R U F R U' R' U R U R' F'", "U2 F R U R' U' F' R U R2 U' R' F R U R U' F'", "R U2 R' U' y' Rw' U Rw U' Rw' U' Rw", "L' U R U' L U R' U' R U2 R2 F R F' R U2 R'", "R U R2 F R F' R U' R' U' R U' R' U F' U2 F", "U2 L F U' R U R' U' y' R' U R U R' F'", "U2 R' U2 R2 U2 y Rw U Rw' U2 R' F' R", "U' F R' U R U2 R' U2 R U F' R2 F R F' U2 R", "Fw R U R' U' Fw' R U' L' U R' U' L", "U2 F R' F' R2 U' R' U2 R U' R' U2 R U R'"],
        "6": ["U' F U2 R' D' R U R' D R2 U' R' U F'", "U' M' U M U' Rw U Rw' F' U F Rw U' Rw'", "U R' U' R U' F' Rw U R' U' Rw2 F Rw U F U R", "U R U' Rw' U R U R' U' R' D' Rw U' Rw' D Rw", "Rw U' Rw' U' Rw U Rw' U' R U' R' U F' U2 F", "U2 R' U2 R U R' U R U R U R' U' R' F R F'", "U2 R U' R2 F R F' U y' x' R U' R' U R U' R' U x", "M U R U R' F' U' F U R U2 R' U' M'", "U R U R' U R U R' U2 R U y R U' R' U' F'", "U' R' F R U R' U' F' U R U2 F R U R' U' R U R' U' F'", "R U R' U R U' R' U R U' R' y R' F R U' R' F' R", "U2 R' U2 F R U R' U' F2 U F U R"],
    },
    oll36 : {
        "name": "Oll36",
        "1": ["U' R U R' F' R U R' U' R' F R U' R' F R F'", "U' F' Rw U' Rw' F2 U' R U R' U' R U' R'", "U' F R U R' U' F' R' F R F' R U2 R' U' F' U' F", "Rw' U2 R U R' U Rw U2 R' U' R U' R' U2 R", "U R U R' U R U2 R' U Rw' U' Rw U' R' U M U Rw", "U' Rw U' R' U2 Rw U' R' U2 Rw U' Rw' U Rw U M' R'", "U' Rw U2 R' U' R U' Rw' R U2 R' U' R U R' U' R U' R'", "U' R U R' U Rw' R2 U' R' U Rw U' R' U R U2 R'", "U Rw U R' U R U2 Rw' U Rw' U' Rw U' R' U M U Rw", "U2 F U' R2 U R' U R U2 R2 U' R U' R' U' F'", "U R U R' U R U2 R' U Rw' U' R U' R' U2 Rw", "U' R' U2 F R U R' U' F' R U2 R' F R' F' R2"],
        "2": ["R U2 R' U' R U' R' U' R U R' F' U2 F R U' R'", "U' F R U' R' U2 R U R' F' R U2 R' U' R U' R'", "U R U R' U2 F' U' F U' R U' R'", "U2 F U R' F R F Rw U Rw' U' Rw' F2 Rw", "U' F U R U' R' F' U Rw' U2 R U R' U Rw", "U R U R' U2 R' U' F R F' R' U R U2 R U' R'", "R U2 R' U' R U' R' U R' U' F' U F R", "U' R' F R U' R' U R U2 R' U' F' R U R' U R", "U' R' U' R U' R' U2 R U' F R U R' U' F'", "U F R U R' U' F' U' Rw' U2 R U R' U Rw", "Fw R U R' U' Fw' R' U' R U' R' U2 R", "Rw U2 R' U' R U' Rw2 U' R' F R F' U Rw"],
        "3": ["Rw U' Rw' U R U2 R2 F R F' Rw U' Rw' F' U' F", "U R U' R' F' U F R U R' U F' U F R U' R'", "R' F' U F U' F' U' Rw U' Rw' F2 R", "U R U R' U R' U' F' U F R U' R' F R F'", "U F R U R' U' R U R' F2 Rw U Rw' U Rw U' Rw' F", "U R U R' U' F' U2 F U R U R'", "F R U' R' U R U R' U R' U' F' U F R F'", "U' R U R' F' R U R' F' U' F U' R' F R2 U' R'", "U R' U' R U' R' U2 R2 U R' U' R' F R F'", "U2 F R' F' R U R U R' U' R U R' U' R U' R'", "U2 F R U R' U' R U R' U' R' F' Rw U R U' Rw'", "U F' U' F R U2 R' U' F' U F Rw U' Rw' U Rw U Rw'"],
        "4": ["U R U R' U R U2 R' U' F' Rw U Rw' U2 Rw' F2 Rw", "U2 R U R2 F' U' F U R2 U2 R'", "R U R' U' R' U' F R F' U' R' U2 R", "U2 R' U2 R F U' R' U R U F' R' F' U F R", "U' F U F R U R' U' F' U R U' R' U' F'", "U' M' F R U' R' U' R U2 R' U' F' M", "U' R2 U R' U R U2 R' U2 R' U' R U' R2 F R F'", "U' F U R U' R' U R U2 R' U' R U R' U R U' R' F'", "U' R' F' U' F2 U R U' R' F' R", "R' U' R' F R F' U R U' R' U' F U R U' R' F' R", "U' Lw' U' L U Lw F' L' U' L' U L F", "U R' U' R U' R' U R U x' R U' R' U x"],
        "5": ["R' F' U' F U R U2 F R U' R' U R U R' F'", "U' R' U' R' D' R F U' R U R' U F' R' D R2", "U2 R' U' F' U F R U2 F U R U2 R' U R U R' F'", "R U2 R' U' F' R U2 R' U' R U' R' U' F U R U2 R'", "U R U' L' U R' U' L U Rw' U' R U' R' U2 Rw", "U2 F R2 D R' U R' U' R U R2 D' R U' F'", "U' R' U2 R U R' U R U R' U' F U R U' R' F' R", "U Rw U R' U R U2 Rw' U' R U2 R' U2 R' F R F'", "U2 R' U' F' U F U' R F R' U R U' F'", "U2 F R U' R' U2 R U R' F' U2 F R U' R' U R U R' F'", "Rw' U2 R' D' Rw U2 Rw' D R2 U' M'", "U' Rw' U' Rw R' U' R U Rw2 D' Rw U Rw' D Rw2"],
        "6": ["U R' U F U2 F' U' R F U' R U R' U' F'", "U M U' Rw U Rw' F' U F Rw U' Rw' U M'", "R U R' U' R' F R F' R' U' R' F R F' U R", "U R' F' U2 F R U2 R' U' R U2 R' U2 R", "U2 F R U' R' F' Rw' F Rw R U R' U' R' F R F'", "R' F' U' F U R U2 R U R' U' R' F R F'", "U' R U' L' U R' U' L F R U R' U' R U R' U' F'", "U R U' R' U' R U R D R' U2 R D' R2 U' R' F R F'", "R U' R' U' F U R U' R' F' R U2 R'", "U' R' U2 R U R' D' U Rw U' Rw' D R F' U F", "U2 Rw U R' U' Rw' F R F' U2 Rw' U2 R U R' U Rw", "U' R U R' U' R' F R F' R U2 R' U2 R' F R F'"],
    },
    oll37 : {
        "name": "Oll37",
        "1": ["U' Rw U' Rw' U' R U R' U Rw U' Rw' F2 Rw U Rw' F", "U2 R U' R' U' F' U2 F R' F R F' R' U' F' U F R", "U2 Rw U R' U R U2 Rw' U2 R U2 R' U' R U' R'", "U2 Rw U2 R' U' R U' Rw' U Rw' U2 R U R' U Rw", "U R' U2 R U R' U R U R U R2 F R F2 U F", "U2 R' F R F' U2 R U' R' U' R U2 R' U' F' U' F", "U Rw' U2 R U R' U Rw U' Rw U2 R' U' R U' Rw'", "U Rw' U' R U' R' U2 Rw U2 R' U2 R U R' U R", "U2 R U R' U R U' R' U R U2 R' U Rw' U2 R U R' U Rw", "U R' U2 R U R' U R U' Rw U2 R' U' R U' Rw'", "U2 R U R' U R U2 R' U2 Rw U Rw' R U R' U' Rw U' Rw'", "R U R' U R U' R' U R U' R' F' Rw' F2 Rw U F"],
        "2": ["U Fw R U R' U' Fw' Rw' U' R U' R' U2 Rw", "U R U2 R2 U' F D' F D F U F R", "U R' U' F' U F R U Rw U R' U R U2 Rw'", "U2 Lw' U R U R' F' R U R' U' R' F R2 U' R' U2 Lw", "U2 R' U2 R U R2 F R F' U R", "U' R U R' U R U2 R2 U' F' U F R", "U R U' R' Rw U' R' U R U Rw' F' U' F U' R U' R'", "R' U' R U' R' U2 R U F U R U' R' F'", "Rw' U' R U' R' U2 Rw U F U R U' R' F'", "U F R U R' U' F' Rw' U' R U' R' U2 Rw", "U R U2 R' U' R U' R2 U' R' F R F' U R", "R' U' R' F R F' U R U2 Rw U R' U R U2 Rw'"],
        "3": ["R U R' U R' U' R U' R' U2 F R F'", "U F R U' R' U R U R' F' U' R U R' U' R' F R F'", "U F R' F' R U2 R U2 R' U2 R' U' F' U F R", "U' R U R' U R U R' F' U F R U R' U R U R' U' R U' R'", "U' Rw U2 R' U' R U' Rw' U' Rw U R' U' Rw' F R F'", "U' F' U F R' F R F' R U R' U' F' U' F", "U2 R' U' F' U F R U2 Rw U R' U' Rw' F R F'", "U' Rw U R' U' Rw' F R F' U' F R' F' R U2 R U2 R'", "U R' F' U F U R' U' R U' R' U2 R F' U' F R", "R' F' U' F U R2 U R' U' R' F R F'", "U R U R' U R' F R F Rw U2 Rw' U' Rw' F Rw", "U' R U R' U R U R' U' F' U2 F U R U' R'"],
        "4": ["U2 R' U' F' U F R F U R U2 R' U R U R' F'", "U2 R' F R U2 y' R' U' R' U R2 U2 R'", "U2 R' F R U y' R U R' U' R' U' R2 U R", "U2 R' U R' U' F R F' R' U R2 U R' U2 R", "U R U2 R2 U' F' U F R2 U R' U' R U' R'", "U2 R' U2 R F U' R' U' F R F' R U2 R' U' F'", "U2 F U R' U' R' F' R U R2 U' R'", "U2 F R U' R' U R U R' F' U R U2 R2 F R F' U' R U' R'", "F U R U2 R' U R U R' F' U2 R' U' F' U F R", "U2 F R U' R' U' R U R' F'", "U' R U2 R' U2 y Lw' U' L U M", "R' F U' R' F R F' U R U R' F' R"],
        "5": ["U2 R U R' U' R' F R2 U' R' U R U R' F'", "U' R' U' F' U F U' F U R U' R' F' R", "U' R U2 R' U2 R' F R F' U R U R' U R U2 R'", "U R U' R' F R' F' R F' U' F U R U R'", "U' R U2 R' U2 R' F R F' R' U2 R U R' U R", "U2 R' U' R' F R F' U R U R' U' F U R U' R' F' R", "Rw' U2 R2 D R' U R D' R2 U Rw", "R U2 R2 U' R2 U' R2 U2 R U' F R U' R' U' R U R' F'", "R' F R F' U' F R' F' R2 U R' U2 R' F R F'", "R U R' U' R' U' F R F' R' U' R U R' U R", "F R U R' U' F' U' F R U' R' U R U R' F'", "R' U' R U' R' U' R U y R U2 R' U' F' U F"],
        "6": ["U2 F R' F' U2 R U R U' R2 U2 R", "U F R U R' U' F' U2 R U2 R' U2 R' F R F'", "Rw' U F R U R' F' U' R' F' Rw U' R", "U' F R U R' U' Rw U Rw' U' R U' R' U' Rw U Rw' F'", "U2 M' U R U' Rw' U' F' U F", "F R U R' U2 R U' R' F' U' F R U2 R' F'", "U2 Rw' D R U R U R' U R U R' U R' D' Rw", "U2 R2 D R' U2 R D' R' U2 R2 U' F' U F R", "U R U R' U' R' F R F' U2 R' U2 R U R' F' U F R", "U R U R' U' R' F R F' U R' U' F' U F R", "U2 F R' F' R U R U' R'", "F R U R' F' U' F' Rw U Rw'"],
    },
    oll38 : {
        "name": "Oll38",
        "1": ["R' U2 Rw U R' U' Rw' R2 U R' U' R U R' U R", "U' R U R' F' U2 F U R U' R' U R' F R F' R U2 R'", "U R U' R' U2 R' U' F R F' R' U R U' R' F R F'", "U2 R' U2 F' U2 R U2 R' U' R U' R' F R U R' U R", "U R U R2 F R F' y' R' U R U R U R' U R U2 R'", "U R U R2 F R F' y' R' U' R U R' U R", "U2 Rw' U' R U' R' U2 Rw U' Rw U R' U R U2 Rw'", "U' F' Rw U' Rw' F2 R U' R' U R U2 R'", "R' U' R U R' U' R U' R2 F R F' Rw' F R F' Rw", "U' R2 D Rw' U' Rw D' R D' Rw U Rw' D R", "U2 R' U' R U' R' U2 R U' Rw U R' U R U2 Rw'", "U R2 F R F' R U2 R' F U R U' R' F' U2 R"],
        "2": ["Rw' U' R' F R F' U Rw U' Rw U2 R' U' R U' Rw'", "U2 R' U' F' U F U2 R U R' U R", "R U R' F' U2 F R U' R2 U2 R U R' U R", "R U R' F' U2 F R U' R' U R U R' U R U2 R'", "U2 R' U2 R U R' U' R U R' U' R U' y R U R' U F' U F", "U R' U' F' U F R U2 Rw U2 R' U' R U' Rw'", "U R' U' R U' R' U2 R U R' U' R' F R F' U R", "U' R' U2 R U R' U R F U R U' R' F'", "R U R' U R U2 R' U2 R' F' U' F U R", "U' Rw' U2 R U R' U Rw F U R U' R' F'", "U' R' U2 R U R' F' U F R2 U R' U R U2 R'", "U2 R' U' F' U F R U R U R' U R U2 R'"],
        "3": ["U R' U' R U F R U R' U' F' U' R' U2 R", "F' U2 R' F R U R' F' R U F R U2 R'", "U2 R2 F2 Rw U Rw' F R2 U' R' U' F' U' F R", "U2 F U R' F R U R' U' F' U R U' R U' R' F'", "U' R U2 R' U' F' U' F R2 D R' U' R D' R2", "U2 F U R U' R' U R U2 R' U' F' U' Rw' F2 Rw", "U2 R U R' U' R' F R F' U2 F R U R' U' F'", "U2 Rw U R' U R U' R' U' Rw' F R F'", "U2 F R U' R' U' R U2 R' U' R U R' U' R U R' U' F'", "U2 Rw U R' U' Rw' F R U R U' R' F'", "U2 R U R U F R F' U2 R' U' F R' F'", "U2 R U R' U R U' R' U' R' F R F'"],
        "4": ["F R U' R' U R U2 R' U' F' U F U R U' R' F'", "U2 R' U' R U F R2 U R2 U' R U R U' F'", "U' R U' R2 F R F' U R U R' U' R U R'", "U2 R' U2 Rw' D' Rw U2 Rw' D R Rw", "U' R U R' U' R' F R F' R' U' F U R U' R' F' R", "U' Rw U Rw' U' Rw' F R2 U' R' U Rw U R' F'", "U' R U' R' F R U R' U' R U R' U' F' R' F R F'", "U2 R U R' U R U2 R' F R U' R' U R U R' F'", "U R U2 R2 U' F' U F R U R U2 R'", "U F R U R' U' F' R U2 R2 U' F' U F R2 U' R'", "U2 R' F R U R' U' F' R U' R' U F' U F R", "F U R' U' R U' R' U R U F' x' R U' R' U x"],
        "5": ["U2 R' U2 R U2 R' U R U2 R2 F R F' R U' R' U' R", "F R U R' U' F' U R U R' U' R' F R F'", "U2 R U' R' U' F' U2 F U R U' R2 U2 R U R' U R", "U Rw U Rw' U R' F R F' U' M' U' Rw' F R F'", "R U2 R' U' R U' R' U' R U2 R' U' F' U F R U' R'", "U F R U R' U F' U' F U' R U' R' U' R U R' F'", "Rw' F R F' Rw U R' U Rw U R' U R U2 Rw'", "Fw R U R' U' Fw' U Rw U R' U' Rw' F R F'", "U2 Rw' U' R U' R' U2 Rw U' R' F2 Rw U2 R U' Rw' F", "U' L' U2 R U' R' U2 L U R U' R' U' R' F R F'", "U R U R' F' Rw' F' Rw F R U R' U' R' F R F'", "Rw U Rw' R U R' U' Rw U' Rw' U' R U R' U' R' F R F'"],
        "6": ["U R' U R U R' U2 R U2 R' U2 F' U2 F R", "U F U R U2 R' U R U R' F' R' F' U' F U R", "U' F R U' R' U R U2 R' F' U F U2 F'", "F R U R' U' F' U F R U' R' U R U R' F'", "U R' F R U2 Rw U2 Rw' U2 F' U' R U R'", "U F U R U2 R' U R U R' F' U' F R U R' U' F'", "U2 R U R' U R' F R2 U R' U' F' U R U R'", "U' R' U R U2 R' U' F' U F R U' R' U2 R", "U' R' U' R F U R2 U' F' R U R' U' R'", "U' F R' F' Rw U F' R U R' U' R' F R2 U' Rw'", "U2 R2 U' R U' R U F R F' R2 U R2", "U F R U' R' U' R U R' F' U2 F U R U' R' F'"],
    },
    oll39 : {
        "name": "Oll39",
        "1": ["R U2 R' U' R U R' U' R U' R' U' Rw U R' U R U2 Rw'", "U2 F R' F' R U2 R U2 R' R' F R U R' U' F' U R", "U R U2 R' U' R U R' F2 Rw U Rw' F", "U R U2 R' U' R U R' U' Lw R U' R' U2 F' U' R' x", "U' Rw U Rw' F U F2 Rw' F' Rw U' R' F' R", "U R U R' U R U' R2 F R F' y' R' U R", "U R U R' U R U2 R' U2 Rw U2 R' U' R U' Rw'", "U2 R' U' R U' R' U R U' R' U y' R' U2 R U2 R' U' R Fw z'", "U2 R' F R F' U R U R' U2 R U2 R' U' F' U' F", "R U R' U' F2 Rw U Rw' F U' R U R'", "U2 F' U' F R U R' F R U R' U' F' U2 x U R' U' R x'", "U' Rw' F Rw F R U R' U' R U' R' F' Rw' F' Rw"],
        "2": ["R U2 R2 U' R2 U' R' U R' U R F R U R' U' F'", "R U2 R' U' R' F R F Rw U Rw' U F", "Rw U2 R' U' R U' Rw' U' R' F' U' F U R", "U2 R U R' U R U2 R' F R U' R' U2 R U R' F'", "U' Rw' U' R U' R' U2 Rw U' F R U R' U' F'", "R U R2 D' R U2 R' D R U R' F R F'", "F R U R' U' F' R' U' R U' R' U2 R", "U R' F' U' F U R2 U2 R' U' R U' R'", "U' R' U' R' F R F' U R U R' U2 R U R' U R", "R U2 R' U' R U' R' F U R U' R' F'", "U2 R U R' U R U2 R' U' F U R U' R' F'", "U' R' U' R U' R U2 R2 U' R2 U' R2 F' U F R"],
        "3": ["U' F U R U2 R' U R U R' U R' F R F' U' F'", "U R U R' U R U2 R' U2 F R U' R' U R U2 R' U' F'", "U R' U R U F U R U' R' F' R' U2 R", "U' R' F R U R U' R' F' U R U R' M' U R U' Rw'", "U' Rw' R' D' Rw U' Rw' D Rw U R", "R2 U2 R' U R U' R U2 R F' U2 F R", "U' F U R U2 R' U' R' U' F' U F R F' Rw' F Rw", "U2 R U2 R' U' R2 U' R' F U R2 U' F' R' U R", "U2 Rw U R U' Rw' F U R' U' F'", "F' U' F U' R' D' R U R' Rw U Rw' D R", "U2 R U2 R2 U' F' U F R2 U' R' U' R' U' F' U F R", "U' R' U' R F R F' R U R' U' M' U R' U' Rw'"],
        "4": ["U2 F U R' U' R U R U' R' F' U2 R' U2 R", "F U R U R' F' U F R U R' U2 R U' R' F'", "R2 F R U R U' R' F' R U' R' F' U F R", "U' L' U R U' L U R' U2 F R U' R' U R U R' F'", "U' Rw' U' F' U F Rw U' Rw' F R F' Rw U R'", "U2 F R U R' U' F' U Rw U R' U' Rw' F R F'", "U2 F U R' U2 R2 U R2 U F' R U R U' R'", "U R' U' R U' R U R' U' R' U2 F R F'", "F R U R' U' F' U2 Rw' F R F' Rw U R'", "U' R' U2 R U R' F U R U' R' F' U' R U' R' U2 R", "U' R' F' U' F U R Rw U R' U' Rw' F R F'", "U' F U R U' R2 F R F' U F R' F' R2 U R' F'"],
        "5": ["U' Rw' U2 R U R' U Rw U R U R' U' R' F R F'", "U2 R U R' U' R' F R F' U2 R' U2 R U R' U R", "U F R U2 R' F' U F R U R' U F'", "Rw U R' U' Rw' F R F' U2 F R U R' U' F'", "U R2 U' R' F R F' U R U' R' F R F' R", "U2 F R U R' U' R F' U2 R' U' R U' Rw U R' U' Rw'", "U' R' U2 F' U F U R U2 R' U R U R' U2 R", "U2 F R U R' U' R U R' U' R U' R' U' R U R' F'", "U2 R U R' F' U' F U R U2 R'", "F U R U' R' U R U2 R' U' R U2 R' U' F'", "U2 F R U R' U2 R' U2 R U F' U' R' U2 R", "R U R' F' U' R' U2 R F U' R' U' F R F'"],
        "6": ["F U R U' F' Rw U R2 U R U2 Rw'", "U2 R' U' R U2 R' F' U F U R U R' U R", "U' R U' R' U R2 U2 R U' R2 U2 F' U F R U' R", "R' U' R U' R' Rw U R' U' Rw' D' Rw U2 Rw' D R2", "U2 R' U R' F' U' F R U R U' R' U' R' U R2", "U' F' Rw U Rw' U2 Rw' F2 Rw U' F R U R' U' F'", "U' R U2 R2 F R F' U2 R' U' F R F' R' U R", "U' R' U2 R U' R' U R U R2 F' U' F U R U R", "U R' U' R U' R2 U2 R U R' U R U F' U F U R", "R U R' U R U2 R2 F R U' R' F' Rw' F Rw U' R", "U R' U' R' F R F' R' D' R U R' D R2", "R U R' U R U2 R2 U' F U R U' R' F' R"],
    },
    oll40 : {
        "name": "Oll40",
        "1": ["U R' U' R U' R' U2 R U2 Rw' U2 R U R' U Rw", "U2 F' Rw U' Rw' F2 Rw U Rw' U R U R' U2 Rw U Rw'", "U2 R U' R' F2 R U2 R' U2 R' F2 R U R' F R F'", "R U R' U R U' R' U R U2 R' Rw U R' U R U2 Rw'", "U R' U2 R U R' U R U2 Rw' U' R U' R' U2 Rw", "F' Rw U' Rw' F2 Rw U Rw' U' R U' R' U Rw U Rw'", "U2 Rw U Rw' R U R' U' Rw U' Rw' U R' U2 R U R' U R", "R U R' U Rw' R2 U' R' U R U' R' U Rw U2 R'", "U R U' R' U F' Rw U' Rw' F2 U R U' R'", "U2 R U R' F' R U2 R' U' R U' R' U2 F U R U2 R'", "U2 F R U R' U' R U' R2 U2 R U R' U R2 U R' F'", "R' F R U R' U' F' U2 L' U2 R U' R' U2 R L"],
        "2": ["R' U' R U' R' U2 R2 U R' F' U2 F R U' R'", "U2 Rw' U2 R U R' U Rw U2 F R U R' U' F'", "U2 R U2 R2 F R U R' F' R F U' F' U R U R'", "U2 R' U2 R2 U R U R U' R' U' R F R F' U R", "U2 R' U2 R U R' F' U' R U R' U R U2 R' F R", "U' Rw U R' U R U2 Rw2 U' F' U F Rw", "U2 F R U R' U' F' U' R' U2 R U R' U R", "U' R' F' U' F U R U' R U R' U R U2 R'", "R' U' R U' R' U2 R U' R' U2 R U R' F' U F R", "U2 F R U R' U' F' R U R' U R U2 R'", "U' F R U R' U' R U R' U' F' R U2 R2 F R F' R U2 R'", "U' Rw U R' U R U2 Rw' U F R U R' U' F'"],
        "3": ["U' R' U' F U R U' R' F Rw U Rw' F R", "U Rw' R2 U R' U R U2 R' U M' U' F R U' R' U R U R' F'", "U' R' F' U2 R' U2 R U R' F U F' R F U' R", "U R' U2 R U R' U R2 U2 R' U2 R' F R F'", "R' U2 R F R U R' U' F' U' R' U R U R' U R", "U R' F' U' F U R F U R U2 R' U R U R' F'", "U2 R U R' U' R' F R2 F' Rw U R' U' Rw'", "U2 Rw U R' U' Rw' F R2 U' R' U R U R' F'", "U2 R U' R' U R U R' U' F' U F U' R U R'", "F R U R' U2 Rw' F R F' Rw U R' F'", "U' R U2 R' U' R U R' U' F' U F U R U2 R'", "U F R2 U R' U R2 F R F' R2 U2 R2 F'"],
        "4": ["U M' U M U R U R' F' U' F U Rw U2 Rw'", "U' R' U' R' F R F' R U' R2 D' R U2 R' D R2", "U2 R U2 R' U2 R' F R F' U2 R U R' U' R' F R F'", "U2 R2 U2 R U' R' U R' U2 R' y R U2 R' F'", "U2 R' U2 R F U R' U' F' U2 R U R U' R'", "U2 R U R' U' R' F R F' Rw U R' U' Rw' F R F'", "F R U R' U' F' U' Rw U R' U' Rw' F R F'", "R' U' R U R U R' U' R' U F R F'", "F' U2 F R U R' U2 R U2 R' U R U' R' F' U' F", "U Rw' R2 U R' U R U2 R' U M' U' R U R' U' R' F R F'", "U Rw U' R' U' F U R U' R' F' R U2 R' U' M", "U' R' U' R' U2 R2 U R2 F R F' R' U R U R"],
        "5": ["F R U' R' U R U R' F' U R U2 R' U' R U' R'", "U' R U2 R' U2 R' U' F R F' R' U R", "U2 R' F' U2 F R U' R' F' U' F U' R", "U Rw' F R F' Rw U R' F U R U' R' U R U' R' F'", "U R2 D' R U2 R' D R U2 R U' F R U R' U' F'", "U' F U R U' R' U' R' F R F' R U2 R' U' F'", "U F U R U' R' F' U' R' U' F U R U' R' F' R", "R' F R U R' U' F' U R", "U2 F R U R' U' R' U' R2 U' R2 U2 R2 U' R' F'", "U R2 D' R U2 R' D R U2 F' U' F U R", "U M' U R' F R F' U' F' U F M", "U2 R U' R' F' Rw' U2 R U R' U Rw U F"],
        "6": ["R U R' F' U' F R U R' U' R U' R'", "U' Rw U Rw' U' R2 D Rw' U Rw D' R2 U Rw U' Rw'", "F R U R' U2 R' U2 R U F' R' U' R U R' U R", "U F R' F' R U2 R U2 R2 F' U' F U R", "U' R' U2 R2 U R' U R U' R' U' R' U F R F'", "R2 U2 R U' R' U' R' F R F' R U2 R' U2 R2", "U F U' R' U' R U R U R' U' R' F' U F R F'", "U2 Rw' U' R U R' F' Rw U2 R' U' Rw U' Rw' F R", "R' F R F' U2 F' U2 F2 U R U' R' U R U' R' F'", "R U R' U' R' F R F' U2 R' U' R U' R' U2 R", "U2 R' U' R U' R' U2 R' U R' F' U2 F R U' R' U' R'", "U2 Rw' U' R U' R' U2 Rw R U R' U' R' F R F'"],
    },
    oll41 : {
        "name": "Oll41",
        "1": ["U' Rw U2 R' U' R U' Rw' U2 R' U2 R U R' U R", "U2 R U2 R2 D' R U2 R' D R2 U' R2 F R F'", "Rw' U2 R U R' U Rw U2 R U2 R2 U' R2 U' R2 U2 R", "U2 F R U R' U' R U R' U' F' U' R' U' R U' R' U2 R", "R U R' U R U2 R' U Rw U Rw' R U R' U' Rw U' Rw'", "U Rw' U' R U' R' U2 Rw U' R U2 R2 U' R2 U' R2 U2 R", "U R U R' U R' F R F' Rw' F R F' Rw U2 R'", "R' D' Rw U Rw' D R U R' F R F' U F' U F", "Rw' R2 U R' U R U2 R' U Rw U2 R' U' R U' R'", "U2 F R U R' U' R U R' U' F' R U2 R' U' R U' R'", "U' Rw U2 R' U' R U' Rw' U' R U R' U R U2 R'", "R' U2 R U R' U R F U R U' R' U R U' R' F'"],
        "2": ["U2 M' R' F' U' F U R U' R Rw'", "U2 F U R U' R' F' R' U2 R U R' U R", "U2 R U R U' R' F U R2 U2 R' U2 R U F'", "U2 F U R' U' R2 U' R2 U2 R2 U2 R' U' F'", "U R U2 R' U' R U' R2 F' U' F U R", "U' Rw R2 U' R' F R F' U R U M", "U Rw U Rw' R U R2 F R F' U' Rw U' Rw'", "U' F R U' R' F' Rw' F Rw U' R' U2 R U R' U R", "R U R' U' M' U R U' Rw' U F R U R' U' F'", "U2 R' F' U' F U R U' R U R' U' M' U R U' Rw'", "U2 R U R' U R U2 R' F R U R' U' F'", "U R U2 R' U' R U' R' U' F R U R' U' F'"],
        "3": ["R U' R' U2 R U y R U' R' U' F'", "U F U R U R' U2 R U R' U R' F R F' U2 F'", "R U R' U' Rw' F R2 U' R' F' Rw' F Rw U M'", "U2 F R' F' R U2 R U' R D R' U' R D' R2", "U2 F R U' R2 U2 R U R' U R U R U R' F'", "U' F' Rw U Rw' R U R' U2 Rw' F Rw U2 R U2 R'", "R U R' U' R' F R F' U2 R' F' U' F U R", "F' U2 F R' F R F' U R' D' Rw U Rw' D R", "Rw' F2 Rw U' F R U R' U' F' U2 F R U' R' U' F'", "U2 R U R2 F R F' Rw U2 Rw' U' F' U F U Rw U Rw'", "U2 F R U' R' U' R U R' F' U R' U2 R U R' U R", "U2 F R U' R' U' R U R' F' U2 R U R' U R U2 R'"],
        "4": ["U2 R U2 R' U R U' R U R' U F R2 F' R' U2 R2", "U' Rw U' Rw' U' Rw U Rw' F' U F U2 F R U R' U' F'", "U2 F U' R U R' F' U' F U' R U2 R' U R U R' F'", "U Rw' U' F R' F R U' R U R' F U F Rw", "U2 R2 F2 Rw U2 R U' Rw' F R' F R F' R", "U2 F U R2 D R' U' R D' R2 F'", "U F R U' R' U R U R2 F' U' F U R U' F'", "U' R' U' R U' R' U R U' R' U y' R' U2 R U R' U2 R U Fw z'", "U' Rw U' Rw' U' Rw U Rw' U' R' F R F' U F' U F", "U2 R U R' U' R F U R' U' R U R U' R' F' R'", "Rw' R' F R F' U F' Rw U' Rw' F2 R U' R' U' Rw", "U2 F' U' F R U R2 D' Rw U Rw' D R"],
        "5": ["U' R' U' R U' R' U R U' Rw U R' U' Rw' U2 F R F'", "U2 F R' F' U2 R U R' U R U' R U' R'", "U2 F R' F' R U R U' R' U R U R' U R U2 R'", "U2 F R U R' F' R' F U' F' R' F R F' U R", "U' R' F' U' F R U R' U R U R' F' U' F U' R", "U' F R F' R U2 R' U' F' U' F R' U R U2 R'", "U' F R U' R' U R U R' U F' U F U' R U' R' F'", "U2 F R' F' U2 R U R U' R' U R' U R", "U2 F R' F' R U R U' R2 U2 R U R' U R", "U' R U R' U R U' R' U R U' R' U' R' F R F'", "F R U R' F' Rw2 F Rw U' F Rw U Rw' F Rw", "U R U R' U' F' U2 F U R U' R' U' R U' R'"],
        "6": ["U' R U R' U' R' F R2 U' R' F' Rw' F' Rw U Rw' F Rw", "R' U R U' R' U R U R' U F' U2 F R", "U F R U' R' U' R U2 R' U' F' U2 R' F' U' F U R", "U' R' U' R U' R' U' R U F U R U' R' F' R' U2 R", "U2 R U R U' R' F R' U R' U' R2 U R U' F'", "F' U2 F U' R U R' U R U R' F R' F' R2 U' R'", "U R U R U R2 U' R U R F R2 F' R' U2 R'", "U' R' U' R' U' F' U F R2 U' R' U' R U R' U2 R", "U F R' F' R U2 R U' R2 F R F' U F R' F' R", "U F R U' R' U' R U2 R' U' F' U F R U R' U' F'", "U' R U2 R' U' F' U' F U R U' R' U R U2 R'", "U2 R2 F2 U' R U' R' U2 R U' F R' F R F R"],
    },
    oll42 : {
        "name": "Oll42",
        "1": ["U' R U2 R' U2 R' F R F' Rw U R U' Rw' F R' F'", "U R' F2 R2 U' F U' F' U2 R2 F2 R", "F R U R' U' F' R' U' R U' R' U F' U F R", "U2 F R U' R' U' R U R' F' U L' U R U' L U R'", "U2 R' F R F' R' F R F' R U R' U' R U R'", "Rw' U' R U2 R' U R' U2 R U R' U R2 U R' U2 Rw", "U' F R U R' U' R U R' U' F' Rw U2 R' U' R U' Rw'", "R2 F2 Rw U' Rw' F2 R2 U' R' U' R' F R U R", "U Rw' U2 R U R' U Rw U2 F R U R' U' R U R' U' F'", "R' U2 R U R' U R U2 Rw U Rw' R U R' U' Rw U' Rw'", "Rw' U2 R U R' U Rw U R' U' R U' R' U2 R", "U R U R' U R U' R' U R U' y R U' R' U R U' R' F'"],
        "2": ["U R' U' R U' R' U2 R F R U R' U' F'", "U M U F R U R' U' F' M'", "U R' F' U' F U R U F R U R' U' R U R' U' F'", "U2 F R U' R2 U2 R2 U R2 F' U R U R U' R'", "U' R U2 R' F' U' F R U2 R' U F' U2 F", "U' Rw D' R2 U2 R U' R' U' R2 D Rw'", "U2 F R U R' U' F' R U R' U' M' U R U' Rw'", "U2 R' U2 R U R' U R U F R U R' U' F'", "U' R' U2 R U R' U R U2 R U2 R2 F R F' R U2 R'", "U' R' U' F' U F R U' F R U R' U' R U R' U' F'", "U2 R' U2 R U R' U R U2 R' F' U' F U R", "U R' U' R U' R' U2 R U R' F' U' F U R"],
        "3": ["U R U2 R2 U' F' U R U2 R U2 R' F U R U2 R'", "U' R' U R U2 R' U' F' U F U R", "U' Rw' F R U F U' F' R U R' U R U2 R' U M'", "U2 F R' F' R U2 R' U' R2 U' R2 U2 R", "U' F R U' R' U R U R' F' U2 F R U R' U' F'", "U2 R' U F' U' F R U R' U R' D' R U R' D R2", "R U R' U R U2 R' U' R' F R U R' U' F' U R", "R' U R U' R2 F' U' F U R U' R U' R' U R", "R' U R U' R' U' F R U R' U' F' R U' R' U R", "U2 F R' F' R U R U' R' U' R U2 R' U' R U' R'", "U F R U' R' U' R U R' F' R U2 R2 F R F' R U2 R'", "U R U R' F' U F R U' R' U2 R' U' R U' R' U2 R"],
        "4": ["U' R U2 R' U F' U F R U' R2 F R U R U' R' F'", "U R U R' U R' F R F2 R U2 R' U2 R' F R", "F R U' R' U' R U2 R' U' F' U' R U2 R' U2 R' F R F'", "U2 R' U' F' U F R L' U R U' L U R'", "U2 R U R' U' R' F R F' R' F R U R' U' F' U R", "U' F U' R U' R' U2 R U' R' U2 R U' R' U' F'", "U2 R' U F' U' F R U R2 D' R U R' D R U R", "U2 R' F R U R' F' R F U' R U R' U' F'", "U2 R U' R' U' F' U2 F U2 R' U' R2 U' R2 U2 R", "U2 R U R' U R U' R2 F R F' R U' y R U2 R' U' F'", "U R' U' R U F R U R' U' R' U R U' F'", "U' R' F' U F U R2 D Rw' U' Rw D' R'"],
        "5": ["U' R U' R' U R U' R' U' R U' y R U2 R' F'", "R U R' U F' R' U' R U F U' R' U R2 U2 R'", "R' U' R U' R' U2 R2 U R' U' F' U2 F U R U R'", "U' R' U2 R U R' U' F R U R' U' F2 U F U R", "U2 Rw U R' U' Rw' F R F' U2 R U2 R2 F R F' R U2 R'", "R U R' U R U R2 U' F' U F R U' R U2 R'", "U2 F R U R U2 R2 U' R2 U R' F' R U2 R' U2 R'", "U' R' F R F' U2 F' U F2 R' F' R U' R' F R F'", "U' R U R' Rw U' Rw' R U' R' U' Rw U' Rw' U' F' U2 F", "R' U2 R U R' U F R U R' U' F' R U' R' U2 R", "U' F R U R' F' U2 F R U' R' U R U R' U' F'", "U' R' U2 R U R' U' R U R' U R U R U R' U' R' F R F'"],
        "6": ["U R U2 R' U' R U' R' U R' F R U R' U' F' U R", "R' F R U R' U' F' U R Rw U Rw' R U R' U' Rw U' Rw'", "U2 F R U' R' U' R U R' F' U' R' U' R U' R' U2 R", "Rw' U2 R U R' U Rw U' Rw' F R F' Rw U R'", "R U R' U' R' F R F' R' U' R U' R' U F' U F R", "U2 R' F R U2 R' Rw U Rw' F' R U' F R U' R' F'", "U2 F R U' R' U' R U2 R' U' F' R' U' F' U F R", "U2 F R U' R' U' R U R' F' R U2 R' U' R U' R'", "U' R U' R' U F' U' F U R U' R' U' R U R'", "U' F' U' F U R U2 R' U' F' U' F R U R' U R U2 R'", "U2 R' F' U' F U' R U R' F U R U' R' F' R", "U2 R' U2 Rw' D' Rw U2 Rw' D Rw U2 R U R' U R"],
    },
    oll43 : {
        "name": "Oll43",
        "1": ["Rw' U' R U' R' U2 Rw U' Rw' U2 R U R' U Rw", "U' R' F' U2 R U R' U F2 Rw U2 Rw' F R", "R' U' F' Rw U' Rw' F2 R U R' U' R U' R' U R", "U2 Rw U R' U R U2 Rw' R' U' R U' R' U2 R", "R' U' R D Rw' U Rw D' R2 U R2 D Rw' U' Rw D'", "U2 F R U R' U' R U R' U' F' R' U2 R U R' U R", "U R U2 R2 F R F' R U' R' F' U2 F R U' R'", "U Rw' U2 R U R' U Rw U Rw' U' R U' R' U2 Rw", "U R' U2 R U R' U R U Rw' U' R U' R' U2 Rw", "U2 F R U R' U' R U R' U' F' U R U R' U R U2 R'", "U2 Rw U R' U R U2 Rw' U R U2 R' U' R U' R'", "U R U2 R2 F R F' R U2 R' U2 R' U' F' U F R"],
        "2": ["Rw U Rw' F' U2 F Rw U' R' U M", "U' R' U2 R U R' U R U R' U2 R U R' F' U F R", "U' F' R U R' U2 Rw' F Rw U R U' R' F", "U' R' U2 R U R' F' U F R", "U2 R' U' F' U F R", "U Rw' U' Rw R2 F R F' M U Rw", "U2 R' U' R U' R' U2 R U' R' U' F' U F R", "Fw R U R' U' Fw' U R' U' R U' R' U2 R", "U Rw2 U' Rw R' F R F' R U' R' U Rw' U Rw2", "U2 F R U R' F' U Rw' U' R' F2 R U Rw", "U2 F U R U' R' F' R U2 R' U' R U' R'", "R U R' F' U2 F R U' R'"],
        "3": ["M' U R' U' R U' Rw' U' Rw U Rw' F' U' F R", "U F R U' R' U' R U R' F' U2 R' U' F' U F R", "R U' R' U R U' R' U' F R' F' R2 U R'", "U2 R2 U' R U R U R' U' R' F' U F R U' R", "U2 F' Rw U R' U' Rw' F U' F' U F R", "U2 Rw U R' U R U2 Rw' U2 Rw' F R F' Rw U R'", "Rw' U2 R U' R' U' R2 D Rw' U2 Rw D' R2 U Rw", "R U R2 F R F' R U R' U' F' U2 F", "U R' F R U2 Rw U' Rw' y' U2 R2 U2 R", "U F' U2 F R U' F R U R' U' F' U' R' U' F' U F", "U' F R U' R' U' R U R' F' U' Rw' U' R U' R' U2 Rw", "U Rw2 D' Rw U' Rw' D Rw2 U' R' U M U Rw"],
        "4": ["U F R' F' R U R U' R' U F R U' R' U' R U R' F'", "U2 R U' R' F' U F R U R' U R U R' U' R U' R'", "U R' F' U' F U R U2 R U2 R' U2 R' F R F'", "R U' L' U R' U' L U' R' U' F' U F R", "U' R' U' F' U F R2 U2 R' U2 R' F R F'", "U F R' F' R U F' U R U R' U' R' F R2 U' R'", "U2 Rw R D Rw' U2 Rw D' Rw' U2 R'", "U2 R U' R' U' F' U2 F R' U2 R U R U' R2 U2 R", "U2 R U R2 F' U' F R2 U' R' U R' U' R U R' U R", "U' M' U' R2 D Rw' U2 Rw D' R' U2 Rw'", "U2 F R' F' Rw U R U' Rw' R' U' F' U F R", "R' U R U2 R' U' R U2 R' F R' F' R2"],
        "5": ["U2 F U R' U2 R2 U R2 U R F'", "U F' U2 F U R U R' U' F' U2 F", "U R' F' U' F U R U R' F R F' U2 F' U2 F", "U R' U' F' U' F R U2 R' U' R U' R' U R", "U Rw' U2 R U R' U Rw U' R U2 R' U2 R' F R F'", "R' U R U2 R2 U' F' U R U R U' R' F R", "U2 R U2 R' U' R U' R' U' F R' F' R U R U' R'", "U2 R U2 R' U2 R' F R F' U' Rw U R' U R U2 Rw'", "U2 R U R' U' R' F R F' U' R' U' R' F R F' U R", "U2 F' U F R U R' U2 R' F R F' M' U R U' Rw'", "F R U' R' U R U R' F' U R' U' F' U F R", "U R' U2 R U R' U R U' R U2 R' U2 R' F R F'"],
        "6": ["U' R' F' R U2 R U2 R' F2 R' F' R U' R U' R'", "U2 F R U R' F U R U' R' F' R U R' U2 F'", "R U R' U' F' U' R' F R U R' F' R F", "U' R U2 R2 D' R U R' D R U R' F R F'", "U2 R U' R' U' F' U2 F R' F R2 U' R' U' R U R' F'", "U' Rw' F R F' Rw U R' U2 R' U' F' U F R", "U' R2 F R U R U' R' F' R U2 R' U F' U F R", "U2 R' U R U R' F R' F' R2 U' R' F' U' F U' R", "U' R' U' R F R' U R U' R' F' R U R U' R'", "U' R U R' y' R2 D' Rw U' Rw' D R2", "U' R2 F R F' R U2 R' F' U2 F R", "R D Rw' U Rw D' R2 U' F' U' F R"],
    },
    oll44 : {
        "name": "Oll44",
        "1": ["U R' F U R' U' F' R U' R' U2 F R F' U2 R", "U2 Rw U2 R' U' R U' Rw' U' Rw U R' U R U2 Rw'", "U2 R' U F' U2 F R U R' F R' F' R2 U R' U R", "U Rw' U' Rw U' R' U M U Rw U' R' U2 R U R' U R", "U' Rw U R' U R U2 Rw' U Rw U2 R' U' R U' Rw'", "U Rw' U' R U' R' U2 Rw R U R' U R U2 R'", "R U R' U R U2 R' U' F U R U' R' U R U' R' F'", "U2 Rw U R' U2 F' Rw U' Rw' F2 U2 R U' Rw'", "U' R U R' U Rw' U' R U' R' U2 Rw U2 R U2 R'", "U' R U R' U R U2 R' U Rw U2 R' U' R U' Rw'", "U Rw' U' R U' R' U2 Rw U' R' U2 R U R' U R", "U' R U2 R2 F R F' R U2 R' F U R U' R' F'"],
        "2": ["R U2 R2 U' R2 U' R2 U2 R U' R' U' F' U F R", "U R U R' U' M' U R U' Rw' U F U R U' R' F'", "R U2 R2 F R F' U' R U' R'", "U R U2 R2 F R F Rw U Rw' F", "U2 R' U' F' U F R2 U R' U R U2 R'", "U R U R' U R U2 R' Fw R U R' U' Fw'", "F' U' F R' U' R' F R F' U R2 U2 R'", "U2 F U R U' R' F'", "U' R' U' F' U F R U' Rw U R' U' Rw' R U R U' R'", "U F R U R' U' F' U2 Rw U2 R' U' R U' Rw'", "U' F R U' R' U2 R U R' F'", "U2 R' U' F' U F R U' R' U2 R U R' U R"],
        "3": ["U' F R' F' R U R U' R' U' F U R U' R' F'", "U R' U2 F' U2 F R' F R F' U R U' R' U R", "U' R' U R U' R' U R U2 R2 F R F' U2 R", "Rw U Rw' U2 Rw' D' Rw U2 Rw' D Rw2 U' Rw'", "R U R' U R U' R' U R U' R' F' U F R U R' U' R U' R'", "U R2 U R' U' R' U' R U' F' U' F R U2 R' U R'", "U2 R U R' U' R' F R U R U' R' U R U' R' F'", "Rw U' Rw' U2 R' F R y' U2 R2 U2 R'", "U' R U R' U' R' F R U R U2 R' U R U2 R' U' F'", "R2 U F' U F R U' R' F R' F' R'", "U' R U R' U2 F U R U' R' F' R U R' U R U' R'", "U2 Rw2 D Rw' U Rw D' Rw2 U R U' M' U' Rw'"],
        "4": ["U F R U' R' U' R U2 R' U' R' F' U' F U R U' F'", "U' F R U' R' U' R U R2 F' R U R U' R'", "U' F R U R' U' F' U' R' F2 Rw U2 R U' Rw' F", "U R' F R U R' U' F' U R F R' F' R U R U' R'", "U2 F' U F U R U2 R' U' F' U F", "U Rw' F R F' Rw U R' F U R U' R' F'", "U Rw U R U' Rw' F R' U R' F R F' U' F'", "U2 R U2 R2 F R F2 U2 F R U' R2 F R F'", "R2 U R' U F' U F U2 R U R' U' R U' R' U R'", "U' F' Rw U R' U' Rw' F R U' F U R U' R' F'", "Rw' R U R2 D' Rw U2 Rw' D R U2 Rw", "U' R U' R' U2 R U R' U2 R U R2 F R F'"],
        "5": ["U2 F U2 R U' R' F R U R' U' F' R U' R' F'", "U2 F' U' F R U R' U2 R U R2 F R F' U F' U F", "U2 R U' L' U R' U2 Rw U Lw U R' F'", "U2 R U' L' U R' U' L U F U R U' R' F'", "U R' U2 R U' R' U' F' R U R' U R U2 R' U F R", "R' U' R' D' R U' R' D R2 U' R' F' U F U' R", "U' F U R U R' U2 R U R' U2 R U R' U F'", "U2 F U R U2 R' U R U R2 F' R U R U' R'", "U' F R F' U R U R' U' R' U' R U F' U' F U' R'", "F R U2 R' F' U2 F R' F R F2", "U F' U' F R2 D Rw' U Rw D' R2", "U' R' D' Rw U' Rw' D R2 U' R' F' U F"],
        "6": ["U' R U2 R' U' F' U' F U R U2 R'", "U' F U R U2 R' U R U2 R' U' F'", "U' Rw U R' U' Rw' F R2 U' R' U2 R U R' F'", "U' R U R' U' R' F R2 U' R' U2 R U R' F'", "U R' U2 R U R' U R U2 F R U' R' U' R U R' F'", "U2 R U' R' F' U F R U R' U R U' R'", "U R' U' R U' R' U2 R F U R U2 R' U' R U R' F'", "U F R U' R' U' R U R' F' U2 Rw U R' U R U2 Rw'", "U2 Rw U R' U R U' R U' Rw' F R' F'", "U' R U R' U' R' F R F' U' F U R U' R' F'", "U' R U' R' F' U2 Rw' F Rw U y' R U' R' U R", "U' R' F R U R' U' F' U R U2 Rw U R' U R U2 Rw'"],
    },
    oll45 : {
        "name": "Oll45",
        "1": ["U2 R U2 R2 F R F' R U2 R' U R' U' R' F R F' U R", "U R' F' R U R' U R U2 R' F U2 F' U' F U' R", "F' U2 F U' R U R' U' R U R' U F' U F", "U R' U' R U' R' U2 R Rw U R' U R U2 Rw'", "R' U' R U' R' F' U F R U' R' U' F' U F U' R", "U2 Rw U Rw' R U R' U' Rw U' Rw' U' R U R' U R U2 R'", "U' R U2 R2 F R F2 U F U' R U2 R'", "U' R U R' U R U2 R' Rw' U' R U' R' U2 Rw", "U' F R U R' U' R U R' U' F' Rw' U2 R U R' U Rw", "U' Rw U Rw' U2 R U R' U2 R U R' U' Rw U' Rw'", "F' U2 F R' F R F' R U' R' U F' U2 F", "F U R U' R' U R U' R' U y' R' U R U' R' U R U2 R'"],
        "2": ["U' R' U' R' F R F' U R U' R' U' R U' R' U2 R", "U' M U M' U2 M U R' U' F' U F Rw", "F U' R' U2 R U2 R2 U' F' R U R' U' R'", "U Rw' R2 U R' U R U2 R' U M' U' F R U R' U' F'", "F R U R' U' F'", "U R' F' U' F U R", "U2 R U R' U R U2 R' U R U2 R2 F R F' R U2 R'", "U M' U' F R U' R' F' U' Rw' F2 R", "U' R2 U R U R' U' R' U' R' U R2 U' F' U F R", "R U2 R2 U' R2 U' R2 U2 R Fw R U R' U' Fw'", "U F U R U' R' F' Rw' U2 R U R' U Rw", "R' U' F' U F R U' Rw U2 R' U' R U' Rw'"],
        "3": ["R U' R' U' F U R U' R' F Rw U Rw' F", "R' U2 R U2 F R U R' U' R' U R U' F'", "U2 R' F U' R' F R U' R U R' U F' R U R' F' R", "U' R U R' U F' Rw' F Rw F U' R U R' U' R U' R'", "F R' F' R U R' F' U' F U R U' R U' R'", "U' F R' F' Rw U R U' Rw' U2 R' F' U' F U R", "U Rw' U2 R U R' U' R U R' y' R U R' U' R' U F z'", "R2 D R' U R D' R' U' R' F R U R' U' F'", "Rw U' Rw U2 R' F R U2 Rw2 F2 R U R' U' F'", "F R' F' R U R' F' U' F R2 U' R' U R' U R", "U2 Rw U R' U' Rw' F R U R U' R' U R U' R' F'", "U F R' F' R U R U' R' Rw' U2 R U R' U Rw"],
        "4": ["U' R' U' R' F R F' R U' R' U R' D' R U R' D R2", "U2 Rw' U' R U' R' U' Rw U Rw' F' U' F Rw", "U' R U2 R2 F2 R U F U' Rw U2 Rw' F U' F'", "F R2 D R' U' R D' R' U2 R' U' F'", "U' Rw U2 R' U' R U R' U2 Rw' U' F R F' R' U R", "U2 R' F R U R' U' F' U R U' R' U' R U' R' U2 R", "U R' F R F' U' F R U R' U' F' U F' U F", "F R U' R' U' R U2 R' U' R U' R' F' Rw' F Rw", "U' F' Rw U R' U' Rw' F R U2 R' F' U' F U R", "F U2 Rw U2 Rw' U' F' U F Rw U Rw' U2 F'", "U Rw' F R F' Rw U R' U2 F R U R' U' F'", "F R U' R' U' R U R' F' Rw U2 R' U' R U' Rw'"],
        "5": ["U' R' F2 R U R U2 R2 F R U' Rw U' Rw' R U' R' F", "U F' U F U2 R U2 R' U2 R U' R' U' F' U F", "U' R' U R U' x' U Rw' F Rw U2 Rw U' R' U M x", "R U' R' U' F' U R U R' U' R' F U' F' U F R", "U2 R U' L' U R' U' L R' F' U' F U R", "U' R' U' R' F R F' U R U Rw' F R F' Rw U R'", "F R2 D R' U R D' R2 U' F'", "R U R' U' R' F R2 U' R' U' R U2 R' U' F'", "R U R' U' R' F R U R' U' R F' R' U R", "F' U R U R' U R' F2 Rw U2 Rw' F R2 U' R'", "U2 F U R' U' R U R U' R' F' U' R' U R", "F R F' U' R U' R U R F' U' F R U' R"],
        "6": ["U R U R2 F R2 U R' U' F2 U2 F", "F' U' F2 R' F2 U' F U R2 U2 R'", "U2 R U R U' R' F U R2 U' F' R2 F R F' U R", "U' R U R' U R U2 R' U2 R U2 R' U2 R' F R F'", "F R U R D Rw' U2 Rw D' R' U2 R' U' F'", "U F R U' R' F R U R' U' F' U' R U2 R' U' F'", "U2 R' U' R' F' R U R U R' U' R U' R' U2 F R", "R U' R2 F R F' U' F U R' U' F' U R2 U R'", "F U R U' R2 F' U2 R U R' U R2 U2 R'", "U' Rw U R' U' Rw' F R F' U F R U R' U' F'", "U' R U' R2 U' F' U F R U2 R U' R'", "F R U R' U2 R' F R2 U' R' U' R U R' F' R U R' F'"],
    },
    oll46 : {
        "name": "Oll46",
        "1": ["R' U R U2 R' U' R U R' F2 Rw U Rw' F U R", "U2 R U2 R2 F R F' R U2 R' U2 F R U R' U' F'", "R U R' U' R' F Rw U' Rw' F R F' Rw U Rw' F'", "U' R U R' U R' F R F' R' F R F' R U2 R'", "R U2 R2 U' R2 U' R2 U2 R U Rw' U' R U' R' U2 Rw", "U R U2 R2 F R F' R U2 R2 F' U' F U R", "U' R2 D Rw' U2 Rw D' R2 U2 R' F R F'", "U2 Bw' U' R' U R U' R' U R U' y R U' R' U2 R", "U R U2 R2 F R F' R U2 R' U' F R U R' U' F'", "U2 R U2 R2 F R F' R U2 R' U' R' F' U' F U R", "U' R U R' U R U2 R' U F R U R' U' R U R' U' F'", "Rw U2 R' U' R U' Rw' F U R U' R' U R U' R' F'"],
        "2": ["U R' U' R' F R F' U R", "U M F U R U' R' F' U' M'", "U' M U' R' U' F' U F R U2 M'", "U2 F R U R' y' R' U R U2 R'", "F R U R' U' F' U2 R U2 R' U' R U' R'", "U' R' F' U' F U R U R' U2 R U R' U R", "R U R' U R U2 R' U R U R' F' U2 F R U' R'", "U2 R' U' R U' R' U2 R U' F R U' R' F' Rw' F Rw", "U' R' U2 R U R' U R U' F U R U' R' F'", "U2 R' U' R U' R' U2 R Fw R U R' U' Fw'", "U2 Rw' U' R U' R' U2 Rw F R U R' U' F'", "R U R' U R U2 R2 U2 R U R' F' U F R"],
        "3": ["U R' U' R U' R' U2 R F R U' R' U' R U R' F'", "U F R U' R' U2 F R U R' U' F' U R U R' F'", "U R' F' U R U2 R D Rw' U2 Rw D' R2 F R", "U2 R' F R U R' F' R U F U2 F'", "R U' R' U' F' U F R' F R F' R U R'", "U2 Rw U Rw' R U R' U' Rw U' Rw' F' Rw U R' U' Rw' F R", "U2 F' Rw U R' U' Rw' F R U' R' U' R' F R F' U R", "U F R U' R' F U R U' R' F' U' R U R' F'", "U2 R U2 R' U' R' F' U' F U R2 U2 R'", "F' U R U R' U R Rw' F Rw U2 R' U F", "U F R U' R' U' R U R' F' U F U R U' R' F'", "F R2 U2 R2 F R' F' R2 U' R U' R2 F'"],
        "4": ["U2 Rw U Rw' U' R2 D Rw' U' Rw D' R2 U Rw U' Rw'", "U R U R' U R U' R' F' U F R U' R'", "U R' F' U' F R U R' F R U R' U' R' F' R2", "U' R' U' F' U F R2 U R' U' R' F R2 U R' U' F'", "U Rw R D Rw' U Rw D' Rw' R' U R U2 R'", "U2 Rw U' Rw' U' Rw U Rw' U' F' U2 F", "U F' U F R U' R' U R U2 R2 F R F' R U' R'", "U2 R U' R' U' F' U2 F M' U R U' Rw'", "U2 R2 U' R' U R U R' U' F' U F U' R U R2", "U2 F R' F' R U R U' R2 U' F' U F R", "U2 R' U R U' R2 U' F' U F R U R U R' U' R", "U2 R U R' U2 F U R U' R' F' R U R' M' U R U' Rw'"],
        "5": ["F R U R2 U' R F' U' R' U2 R", "U R' F' U' R U R' U' R' F R2 U' R' U R", "U R U R' U R U2 R' U F R U' R' U' R U R' F'", "U2 R U R' F' R U R' U' R' U' F U R2 U2 R'", "U R' D' y' R U' R' U R' D y R F' U F", "R' F R U' R' U2 R U R2 F' R U R", "U2 F D R' U R U' R D' F' R U' R'", "U2 R U2 R' U' F' U F R U' R' U' R' U' F' U F R", "U R U R' U R' U' F' U F R2 U R' U' R U' R'", "F' Rw U' Rw' F2 U2 R' F R2 U R' U' F'", "U R' U2 R' D' R U R' D F R F' U R", "U2 Rw U Rw' F R U R' U' F2 U F U' Rw U' Rw'"],
        "6": ["U' F' U' F U R U R' U2 R U2 R' U2 F' U' F", "U2 F U R U' R2 F R F Rw U' R' U' R U2 Rw' F", "U' R' D R' U' R U D' R U' F R2 U R' U' F'", "U' R' U' F U R U' R' F' R F R' F' R U R U' R'", "F R U R' U' F' U' Rw' F R F' Rw U R'", "F U R' U' F' U F R2 U' R' U' R U R' F'", "U' R U R' F' R U R' U' R' F R F' Rw' F' Rw F", "F U R U' R' U F' R' F R U' R' F' R", "F' U' Rw' F Rw U' F Rw U' Rw' U Rw U Rw'", "U R2 D' Rw U Rw' D R2 y R U' R'", "U R2 D Rw' U' Rw D' R2 y' R' U R", "U2 R' F U R U R2 F' R2 U' R' U' R U' F U F'"],
    },
    oll47 : {
        "name": "Oll47",
        "1": ["U2 Rw U Rw' U R U' M' U' Rw' R' U2 R U R' U R", "U' F' L' U' L U L' U' L U F", "U Rw' U2 R U R' U Rw U2 Rw U R' U R U2 Rw'", "U2 Rw U R' U R U2 Rw' U R U R' U R U2 R'", "Rw' U2 R U R' U Rw U' R' U2 R U R' U R", "R U2 R' U2 R U' R' U2 Rw U' R' U2 R U Rw'", "U' R' U' R' F R F' R' F R F' U R", "F R U' R' U2 R U R' F' R' F' U' F U R", "U R U2 R' U' R U' R' U' Rw U Rw' R U R' U' Rw U' Rw'", "U R' U2 R U R' U R U2 Rw U R' U R U2 Rw'", "R' U' R U' R' U2 Rw' R' U2 R' U' R U' R' U' M'", "Rw' U2 R U R' U Rw R U R' U R U2 R'"],
        "2": ["U' R U R' U R U' R' U R U2 R' F R U R' U' F'", "U2 Rw U R U' Rw' F R' U R U' F' Rw U R' U' Rw'", "R U R' F' U2 F U R U' R' U R U2 R'", "R' U2 R U R' U' R U R' U R U F U R U' R' F'", "U' R' U' F' U F R U' Rw U R' U R U2 Rw'", "U' R' U' R U' R' U2 R U2 R' F' U' F U R", "U' F R U' R' F' Rw' F Rw U' R U R' U R U2 R'", "U2 F U R U' R' F' R U R' U R U2 R'", "U2 R' U' R' F R F' U R Rw U R' U R U2 Rw'", "U2 R' U' F' U F R U' R U2 R' U' R U R' U' R U' R'", "U R' F' U' F U R U Rw U R' U R U2 Rw'", "U' R' U' R U' R' U2 R U F R U R' U' F'"],
        "3": ["U2 R U2 R' U2 R' F R2 U' R' U R U2 R' U' F'", "U' R U2 R' U2 R' F R F' R' U' R U' R' U2 R", "F U R U' R' U R U' R' F' U' R' F R U R' U' F' U R", "U R' U' R U' R' U2 F R U R' U' F' R U' R' U2 R", "U2 R U2 R2 U' R2 U' R2 U2 R U F R U' R' U' R U R' F'", "R' U2 R U R' U R Rw U' Rw' U' Rw U Rw' F' U F", "U2 F' Rw U R' U2 Rw' F Rw U' Rw' F2 R", "U' R U2 R' U2 R' F R F' U R U2 R' U' R U' R'", "U2 R U R2 F' U' F U R U' R U R' U' R U' R'", "R U2 R2 F R U2 F' U' R F U' F' U2 R'", "U' Bw' U' R' U2 R U R' U' R y R U R' F' U' F U R", "U' R U R' U' R' F R F' U R U2 R2 F R F' R U2 R'"],
        "4": ["U2 R U R' U' R U R' F' U' F U' R U2 R'", "U2 F U R U2 R' U R U R2 F' R U2 R U2 R'", "U2 F R' F' R U2 R U' R' U R U2 R'", "U2 F R' F' R U2 R U2 R' U' R' U2 R U R' U R", "F R U' R' U R U2 R' U' R U R2 U' F' U F R F'", "U' R' F2 Rw U Rw' F' Rw U2 R U' Rw' F", "U F' U' F R U R' F R U R' U' F' U F' U F", "U M U F R U R' U' F' R' F R F' Rw U R'", "U' R U2 R D Rw' U2 Rw D' R F' U' F U R", "U Rw' U' R U' R' U2 Rw U' Rw' F R F' Rw U R'", "U Rw' U Rw U' F' Rw U Rw' U' Rw' F U' Rw U R' U2 R", "U2 F R U R2 U' R' F' U' R' U R U F R F'"],
        "5": ["Bw' R' U R U R' U2 R U R' U' R U Fw z'", "U2 F U R U2 R' U R U R' F' Rw U R' U R U2 Rw'", "U' R2 U' R2 U R U R' U' R U R' U2 F R F' U2 R'", "U' Rw U2 R' U' R U' Rw' U Rw U R' U' Rw' F R F'", "U2 F R U' R' U' R U R' F' R U2 R2 U' R2 U' R2 U2 R", "U F' U2 F U' R U R' U R U R' F' U F", "U2 R' F R U R' U' F' R' F R F' U R", "U' R U2 R' U' R U R' F R U R' U' F' U R U R'", "U2 F R U R' U' F' Rw U R' U' Rw' F R2 U R' U' F'", "U F R U R' F' U' F' Rw U Rw' F R U R' U' F'", "U F R U2 R2 U' F' U F R U2 R U R' U' F'", "U' R2 D Rw' U2 Rw D' R2 F2 Rw U Rw' F"],
        "6": ["U R U R' U R' F R F' R U' R D R' U' R D' R2", "U F U2 R U' R' F R U R' U' F' U y' R' U' R U' R'", "U2 R U R' U' R' F R2 U R' U' F' R U2 R' U' R U' R'", "R' U' R U R' U' R U2 R' U' F' U' F U' R", "U2 R U2 R' U2 R' F R F' Rw U2 R' U' R U' Rw'", "U' F R U' R' U R U2 R' U' F' U Rw U R' U' Rw' F R F'", "U' R' F R F' U M U R U' R' U' Rw U R'", "Rw U R' U' Rw' F R F' U2 Rw U R' U R U2 Rw'", "U F R' F' R U2 R U' R' U F' U F U' R U2 R'", "U R U R' U' R U F U2 F' U' R2 F R U' F'", "R U2 R' U R' U2 R U R' U F R F' U2 R U' R'", "R' U2 R U R' U R F U R U2 R' U' R U R' F'"],
    },
    oll48 : {
        "name": "Oll48",
        "1": ["U' Rw U2 R' U' R U' Rw' U R U2 R' U' R U' R'", "U2 Rw' U' F U Rw F U' R U R' U' F'", "U2 Rw U R' U' Rw' U2 R U R' U R2 U2 R'", "U R U2 R2 F R F' R' F R F' R U2 R'", "U R' U' R U' R' U2 R Rw U Rw' R U R' U' Rw U' Rw'", "U2 Rw U R' U R U2 Rw' U' R U R' U R U2 R'", "U2 Rw U2 R' U' R U' Rw' U2 Rw' U' R U' R' U2 Rw", "U2 F R U R' U' R U R' U' F'", "U2 Rw U R' U R U2 Rw' U2 R' U2 R U R' U R", "U M U R U R' U R U2 R2 F2 Rw U Rw' F Rw", "U R U' R' U R U R' U2 R' F R F2 U F R U R'", "U' Rw U2 R' U' R U' Rw' R' U' R U' R' U2 R"],
        "2": ["U F R U R' F R' F' R U' R U R' U' F'", "U2 F U R U' R' F' R U2 R' U' R U R' U' R U' R'", "U' R U2 R' U' R U R' U' R U' R2 U' F' U F R", "U R U2 R' U' R U R' U' F' U2 F R U' R'", "U R U R' U R' F R F' R U' R' U R U2 R'", "U' Rw' U' M' U' R U Rw' U' R U R' F' U F Rw", "R U R' U R U2 R' U' F R U R' U' F'", "U F U R U' R' F' Rw' U' R U' R' U2 Rw", "U R U2 R' U' R U' R' U2 R' U' R' F R F' U R", "R' U' R U' R' U R U' R' U2 R F R U R' U' F'", "R U R' U R U2 R2 F' U' F U R", "U' F R U R' U' F' U2 Rw' U' R U' R' U2 Rw"],
        "3": ["U R U R' F R' F' R U R U' R' U F' U F", "U F U R U' R' U2 R U' R' F R U R' U' F' U' F'", "U2 R' U' F U R U' R' F' R U F R U R' U' R U R' U' F'", "R U R' U R' U' F' U F R F' U F R U' R'", "U' F R' F' R U2 R U2 R' Rw U R' U R U2 Rw'", "U' F R U' R' F' U' F R' F2 Rw U Rw' F R F'", "U2 R' U2 R U R' U' R U R' F U R U' R' F' R", "U' R2 U R' U R' U2 R' F R F' R U R U' R2", "U2 R' U' F' U F R U Rw' F R F' Rw U R'", "F U R U2 R' U' R U R' F' U' F R U R' U' F'", "U2 R U2 R2 U' F' U' F U R U2 R' U' R U R U' R'", "R' F R2 U R' U' F' U' R U' R2 F R F' R U2 R'"],
        "4": ["U2 F U R' F R F2 R' F R U' R' F' R", "U' R U2 R' U' F' U' R U2 R' U2 R' F R2 U' R'", "U2 R U2 R' U' R U R' U2 R' F R F'", "U2 Rw U2 R' U' R U R' U2 Rw' F R F'", "U2 F R U' R' U R U2 R2 U' R2 U' R2 U2 R2 U R' F'", "U2 R' F R F' U2 F' U2 F R U2 R' U' R U' R'", "U2 Rw U R' U' Rw' F R2 U R' U' R U R' U' F'", "U Rw R' U R U2 R' U' R U Rw' U' F' U' F R U' R'", "R' U' F' U2 F U' R2 D Rw' U' Rw D' R'", "U2 R U R' U' R' F R F' Fw R U R' U' R U R' U' Fw'", "R U2 R' U2 R' F R F' Rw' U' R U' R' U2 Rw", "U' R U R' U2 R' D' R U R' D R2 U' R' R' F R F'"],
        "5": ["U' F U R U2 R' U' R U R' F' Rw U R' U R U2 Rw'", "U2 R' F R' F' R2 U' Rw' U F' U' F Rw", "U' Rw U R' U R U2 Rw' F U F' R' F R U' R' F' R", "U R U R' F' R U2 R' U2 R' U' F U R U' R U' R'", "U2 F R U R' U' R2 D R' U R D' R2 U' F'", "U' R' U' F U R U' R' F' R U' R' U' R U' R' U2 R", "U' R U R' U' R U2 R' F' U' F U R U R2 F R F'", "U' R U R' U2 F' U F R U' R2 F R F'", "Rw' U2 R U R' U Rw U' Rw U R' U' Rw' F R F'", "R U R' U' F' U' F U' R2 U R' U R' U' R2 U' R2", "U' F R U' R' U R U R' F' U2 Rw U Rw' R U R' U' Rw U' Rw'", "U' R U2 R' U2 R' F R F' R U2 R' U' R U' R'"],
        "6": ["U' F R U' R' U R U2 R' U' F' R U2 R' U' R U' R'", "U' F R U' R' U' R U2 R' U' R U R' U' F'", "U' F R U R' U' F' R U2 R' U2 R' F R F'", "U' R U2 R' U F' U' F U2 R' F R F'", "U2 F R' F' U2 R U R' U R2 U2 R'", "R U2 R' U2 R' F R F' U2 R U2 R' U2 R' F R F'", "U R' F R U R' U' F' U R F R U R' U' R U R' U' F'", "U' Fw R U R' U' Fw' R U2 R' U2 R' F R F'", "R U R' U R' U2 R' U R' U' R U2 F R F'", "U' F R U' R' U' R U2 R' U' F' U' Rw' U' F' U F Rw", "U' R' F' U' F U2 R U2 R' U' F' U F U R", "U2 R U2 R' U R' U' F' U R U2 R U' R' U' R' F R"],
    },
    oll49 : {
        "name": "Oll49",
        "1": ["U' Rw U' Rw2 U Rw2 U Rw2 U' Rw", "Rw' R2 U R' U R U2 R' U M' R U R' U R U2 R'", "U' F R U R' U' R U' R' F' U' Rw' F2 Rw", "U R' U' R' F R F' U R U' R' F' U' F U R", "R' F' U' F U R U R' U' R' F R F' U R", "U F U R U' R2 F' R U F' U F R U' R'", "U' Rw U2 R' U' R U' Rw' U' R U2 R' U' R U' R'", "R U2 R' F R' F' R F R' F' R2 U2 R'", "U R' U' R' F R F' U R U2 F R U R' U' F'", "U' R U R' U R U2 R2 F2 Rw U Rw' F R", "U' R' U' R F U' R U R2 U R2 U' R' U F'", "R U2 R' U' R U' R' Rw' U' R U' R' U2 Rw"],
        "2": ["U2 Rw' F2 Rw R U2 R' U' R U' R' U' F R U R' F'", "U R U R' U R U2 R' U' R' U2 R U R' F' U F R", "U R' U' R U' R' U2 R U' R' U' R' F R F' U R", "U R U R' U R U2 R' U2 R' U' F' U F R", "R U2 R2 F R F' R' U' R2 U' R2 U2 R", "R' U2 R U R' U R U R' F' U' F U R", "U2 Rw U2 R' U' R U' Rw' U R U R' F' U2 F R U' R'", "Fw R U R' U' Fw' U' R U2 R' U' R U' R'", "U Rw U Rw' U R U' R' U R' F R F' U' Rw U' Rw'", "R' U2 R U R' U R F R U R' U' F'", "U2 Rw U2 R' U' R U' Rw' U' R' U' F' U F R", "U Rw U R' U R U2 Rw2 F' U' F U Rw"],
        "3": ["U' F R U' R' U R U2 R' U' F' U2 R' U' R U' R' U2 R", "U' R' U' F' U F R F R U' R' U R U2 R' U' F'", "U' F R U R' U2 F' U' Rw' F2 Rw U F U' F'", "U' R' U' R' F R2 U' R' U2 R U R' F Rw U Rw' F R", "U2 R U' L' U R' U' L U R' U' F' U F R", "U R' F' U' F U R U2 F R U' R' U R U2 R' U' F'", "U' R' U R U2 R' U' F' U F U' R U R' U R", "U' F Rw U' Rw' U R U2 R' U Rw U2 Rw' U' Rw U' Rw' F'", "U' F R U' R' F' Rw U Rw' U' Rw' F Rw F' U' Rw' F2 Rw", "U2 Rw U R2 F R F' R U' Rw' U' F' U2 F", "U2 R U' Rw' F R' F Rw U Rw' U' F U Rw", "U' Rw U Rw' R U R' U' Rw U R' U2 Rw' F R F'"],
        "4": ["U' R U' R' F' U Rw' F2 Rw U' y' R U' R' U R", "U2 R' F R U R' F' R F2 R' F' R U' F'", "U' F R U' R' U2 R U R' F' U' Rw' F R F' Rw U R'", "U2 F R F' U' R' F' U F R2 U2 R' U2 R'", "Fw R U R' U' Fw' L' U R U' L U R'", "R U R' U R U' y R U2 R' U' R U R' F'", "U F U R U2 R' U' R U R' F' U2 R' U' F' U F R", "U' R U2 R' U R U R' F R' F' R2 U2 R' U R U' R'", "R U R' U R U' R' U R' U' F' U F R2 U' R'", "U' R' U2 R U R' U' R U F R2 U' R' U R U R F'", "U2 R' F R F' Rw U R' U' Rw' U' F' U F R", "U R' F2 Rw U Rw' U F R2 D Rw' U' Rw D' R'"],
        "5": ["U R U2 R' U' R U' R' U R U R' U' R' F R F'", "U' R U2 R' U' R U R' U2 R U' R' F' U' F R U R'", "U' R' F2 Rw U Rw' F R U R' U' F U R U' R' F' R", "U R' U R U2 R' U' R U' R' F' U' F U' R", "U' F U F' R U2 R' U2 R' F R2 U R' F'", "U' F' Rw U R' U' Rw2 F Rw U' F R", "R' U' R F U' R' U2 R U2 R U' R' F'", "U2 F U2 R2 U2 R' U2 R' F R F' R' U2 F'", "R' F R U R' U' F' U R U' R' F' U' F U R", "U Rw' U Rw' F R F' Rw U R' U R' F R F' U Rw", "U R U R' U' R' F R F' U F R' F' R U R U' R'", "R' F R U R' U' F' U R U2 F R U R' U' F'"],
        "6": ["U2 F R' F' R U R' F R F' R U' R' F' U F", "U2 R U R' U R U2 R' U2 R U R' U' R' F R F'", "U2 R U' Rw' U R U R' U' Rw U Lw U' R' U Lw'", "U' Rw U R' U R2 D R' U' R D' R2 U R U2 Rw'", "R Rw' U' R U2 R' U' R U' R2 F R F' Rw U R'", "R' U' R U' R' U2 R U2 R' U' F U R U' R' F' R", "Bw' U' R U2 R2 U' R2 U' R' U' y R' F R F' U R", "U' R' F2 R F' Rw U' Rw' F Rw U Rw' F Rw' F2 Rw", "U R U R' U R U' R2 F R F' R U R' U' F' U2 F", "U Rw' U2 R U R2 F R U Rw U' F' Rw U Rw'", "U Rw' F' Rw2 U' Rw' F U' F' Rw U Rw'", "F R U' R' U R U R' F' U2 Rw U2 R' U' R U' Rw'"],
    },
    oll50 : {
        "name": "Oll50",
        "1": ["F R U R' U2 F R U' R' U R U R' F' U' F'", "U' R' U2 R U R' U F' U' F R' F R F' U R", "Rw' U2 R U R' U Rw U R' U2 R U R' U R", "U2 R' Rw U R' U2 R U R' U R2 U R' U R U2 Rw'", "Rw' U Rw2 U' Rw2 U' Rw2 U Rw'", "Rw U2 R2 F R F' U' R U' Rw' F R U R' U' F'", "U2 R' U' R' F R F' U R F U R U' R' F'", "U R Uw R' U R' U' R Uw' R2 U2 R", "R' U' R U' R' U2 R U2 Rw U2 R' U' R U' Rw'", "U2 F R F' R U R' U' R' F R' F' U' R' U R", "F R U R' U' F' U2 R' U' R' F R F' U R", "U' R' U2 R U R' U R Rw U R' U R U2 Rw'"],
        "2": ["U2 R2 U R U' R' F R' U R2 U' F' R'", "U' F R U' R' F' U R U R' U R U2 R' Rw' F2 Rw", "U R' U2 R U R' U R U2 F U R U' R' F'", "U' R' U2 R U R' F' U F R U R' U2 R U R' U R", "U2 R' U' F' U F R U2 R' U2 R U R' U R", "U Rw' U2 R U R' U Rw U' F R U' R' U2 R U R' F'", "U' R U2 R' U' R U' R' F R U R' U' F'", "U' F' Rw U R' U' Rw' F U' F U R U' R' F' R", "U Rw' U' R' F R F' U Rw R U R' U R U2 R'", "U2 R' U' F' U F R U' R U R' U R U2 R'", "U' F R U R' U' F' U Rw' U2 R U R' U Rw", "U2 R U R' U R U2 R' U R' U' R' F R F' U R"],
        "3": ["R U R' U F' R U2 R' U2 R' U' F U R", "R' U2 R U R' U R U2 F U R U2 R' U' R U R' F'", "U2 R U R2 U' R' F R F' U F R U R U' R' F'", "U' R' U' R F R' U R U' R' F' R U2 R U2 R'", "R U R' F' U Rw' F2 Rw U' y' R U R' U R", "U' R' F R U R' F' R F U' R U' R' U2 R U R' F'", "U' Rw' F R F' Rw U R' U2 F U R U' R' F'", "U F R' F' R U2 Rw U' R' U R U2 R' U' M", "U2 Rw' U' R U2 R' U' Rw U Rw' F' U' F Rw U Rw' U Rw", "U2 F' U2 F U R2 D Rw' U Rw D' R2", "U Rw' F R F' Rw U R' U Rw U2 R' U' R U' Rw'", "U' Rw' F R F' Rw U R' U' F R U' R' U2 R U R' F'"],
        "4": ["U' R U2 R' U2 R' F R2 U' R' U' R U2 R' U' F'", "U' R' U' R U R' U y Rw' F2 Rw U' F R U R'", "U2 F U R' F R F' R U2 R' U R U R' U R U' R' F'", "U' R' U' R U' R' U F' U2 F R' F R F' U' R", "U' R U2 R' U2 R' F R U R' U' R F' R' U R", "U' R U R' U R U' R' U2 R' F' U' F U R2 U R'", "U2 R' U' F' U F R U' R U' L' U R' U' L", "U R U' L' U R' U' L U2 Rw U R' U R U2 Rw'", "U2 F U R U2 R2 U2 R U R' U R U' R U2 R' U' F'", "U R' U' F' U2 F U' R U R2 F R F' R", "U R U R' U' R' F R F' U2 F R U' R' U R U2 R' U' F'", "U R U R' U R U' R' U R U2 R' U' R U R' U' R' F R F'"],
        "5": ["U' R' U2 R U R' U F2 Rw U2 R U' Rw' F", "F U2 R U R' F R' F' R2 U2 R' U F'", "U R' U Rw U' R' U' R U Rw' U' R' F R F' R", "U' R U R' U F' U F U' R U' R' U' R' F R F'", "U' R U2 R' U2 R' y Rw U' R' F R' F' R2 U2 Rw'", "Rw' U' R U' R2 D' R U R' D R2 U' R' U2 Rw", "U2 R' F R F' Rw U' R' U' R U' R' U2 M", "U' Rw U R' U R U Rw' F U F R U' R' F'", "U2 R' U' R U' R' U R' F R F' y' R' U2 R U R' U' R Fw z'", "R U R2 F R F' U F R' F' R", "U2 R' U R U' R2 F R2 U R' U' F' R", "U' R U R' U' R' F R F' U Rw' U2 R U R' U Rw"],
        "6": ["U' Rw' U Rw' U Rw2 U Rw2 U' Rw F' U' F Rw", "U' F R U' R' U' R U R' U R U' R' F'", "U' R' U' F U R U' R' F' R U' R' U2 R U R' U R", "U2 F R' F' Rw U2 F R' F' R2 U2 Rw'", "F' Rw U R' U' Rw' F R U2 F U R U' R' F'", "U R' F R U R' U' F' U R F U R U' R' F'", "U R' U' R U' R' U2 R U2 R U R' U' R' F R F'", "U2 F R' F' Rw U R U' Rw' F U R U' R' F'", "U' Rw U R' U R U' R' U' Rw' F' R U2 R U2 R' F", "U2 F R U' R' U R U R' F2 Rw U Rw' U' Rw' F Rw", "R U R2 F R y' R2 U R2 U R' U' R' F R F'", "U' R U R' F' U' F U R U2 R' U' R' F' U' F U R"],
    },
    oll51 : {
        "name": "Oll51",
        "1": ["R' U' R U' R' U2 R U Rw' U' R U' R' U2 Rw", "U2 F U R U' R' U R U' R' F'", "U R U R' U R U2 R' U Rw U R' U R U2 Rw'", "U' R' U' R F R' U R2 U2 R' U' R U R' F'", "U2 R U R' U' F' U' F R' F R F' R U R'", "U2 Fw' L' U' L U L' U' L U Fw", "R U R' U R U2 R' U' Rw U R' U R U2 Rw'", "F R U R' U2 R' U R U F' R' U2 R", "U' R' U' R F R2 U' R' U R' U' R2 U2 R2 U' R' F'", "U2 R U R' U' R' F R F' U' F R U' R' U' R U2 R' U' F'", "U' R' U' F U R U' R' F Rw U2 R U' Rw' F", "U R U R' U R U2 R' U Rw U Rw' U R U' M' U' Rw'"],
        "2": ["U R' U' R' F R F' U R2 U R' U R U2 R'", "U' R' F' U' F U R2 U R' U R U' R' U R U2 R'", "U' Rw U2 R' U' R U' Rw' U2 R' U' R' F R F' U R", "U2 R F U R2 U' R F' R U R' U' R2", "R' F R U R' U' F' U F' Rw U R U' Rw' F", "U2 Rw U R' U R U2 Rw' U R' U' R' F R F' U R", "U R' U2 R U R' U R U R U R' F' U2 F R U' R'", "U' R U2 R' U' R U' R' U' F R U' R' U2 R U R' F'", "U' R' U' R' F R F' R U' R' U2 R", "U2 F R U R' U' F' R U2 R' U' R U R' U' R U' R'", "U R' U2 R U R' U R U' R' U' F' U F R", "U' R U2 R' U' R U' R' U2 F U R U' R' F'"],
        "3": ["U R U R' U R U' R' U R' U' F' U F R U' M' U R U' Rw'", "U F' U2 F U2 F R' F2 U' F U R", "U2 F R U R' U R2 U R' U R U2 R' U R' U2 F'", "U' R' U2 F' U F U' R U R' U' R U' R' U' R", "U' Rw' U' R U' R' U R U' R' U Rw' D' Rw U Rw' D Rw2", "U' L' U R U' L U R' U R' F' U' F U R", "U R U R' U R U2 R' U Rw' F2 Rw U2 Rw U' Rw' F", "U' L' U R U' L U R' F R U R' U' F'", "U2 R U R' U2 F' U F R U' R2 F R U R U' R' F'", "U2 F' R U2 R' U' R U R' U2 R' F R2 U' R2 F R F'", "U R2 D' Rw U Rw' D R2 U y R U2 R'", "Rw' U Rw U' Rw' R' F R F' R U' R2 F R F' Rw"],
        "4": ["R U2 R' U2 R' F R2 U R' U' F'", "U R' F' U' F U' R U2 F U' R' U R U F'", "U2 R' F R U R' U' F' U R2 U R' U R U' R' U R U2 R'", "U' R U' L' U R' U' L U2 F R U R' U' F'", "U' R' U' R U' R' U2 R U R U2 R' U2 R' F R F'", "U2 R' F R U R' U' F' R U' R' U R U' R' U2 R", "U2 F R U' R' U2 R U R' U F' R' F R U' R' F' R", "U R U R' U' R U2 R2 F R F' R U' R' U' R U2 R'", "U' R U' L' U R' U' L U' R' F' U' F U R", "U' R2 D Rw' U' Rw D' R2 U' F' U2 F", "U' R U R' U R U2 R2 U' F' U' F U R U2 R' U' R", "U R' U' R U R2 D' R U' R' D R2 U' R' F' U F R"],
        "5": ["U2 R U2 R' U' R U' R' U R' U' F U R U' R' F' R", "U2 R' U2 R U R' U R U' R U2 R' U' F' U F R U' R'", "U2 F R U2 R' F U F' R U' R' U2 y' R U2 R' U R'", "U2 F R2 F' R U R' U2 R' U R U' F' U2 F R2", "U2 R' F R F' U R U R' U Rw U' Rw' U Rw U Rw'", "U' Rw U2 R' F R' F' R U' R U R' U2 Rw' F R F'", "U' R U2 R2 F' U' F R F' U F U' R' U R", "R' U' R U' R' U2 R U' R U2 R' U2 R' F R F'", "R U R' U R U2 R' U' R' F2 Rw U2 R U' Rw' F", "U' R U R' U R U' R' F' U F R U R' U' R U' R'", "U' R' U2 R2 U R2 U F2 Rw U' R U2 Rw' F", "R U R2 F R F' R U' R' F' Rw' F Rw F"],
        "6": ["R U2 R' U Rw' U' F' U F Rw U R U' R'", "R' U2 R U2 F R U R' U' F' R' U R", "U' Rw' R2 U R' U R U2 R' U M' U F R U' R' U R U R' F'", "F' Rw U R' U' Rw' F R U R' F' U' F U R", "U R U R' U R U' R' F' U F U R U2 R'", "F R U R' U R' D' R U2 R' D R F'", "U R U R' F' U F R U' R' F U R U' R' F'", "U R' U' R F R U' R2 U2 R2 U R' U R U' R' F'", "U2 R' U' R U R' U2 R U2 R' U R U R' F R' F' R2", "F' Rw U R' U' Rw' F R F R U R' U' F'", "U2 F R' F' Rw U R U' Rw' U' R' F' U' F U R", "U' F R' F' R U2 R U2 R' U R U R' U' R' F R F'"],
    },
    oll52 : {
        "name": "Oll52",
        "1": ["U' R' U' y' x' R U' R' U R U' R' U F U x", "U' R' U2 R U R' U R U Rw' U2 R U R' U Rw", "U' R' U2 R U R' F' U F R U' R' U' F' U F R", "U' R' U2 R2 Uw R' U R U' R Uw' R'", "F U F R U' R' U' R U R' F' U2 R U' R' F'", "U' R U2 R' U' R U' R' U' Rw U2 R' U' R U' Rw'", "U' R U2 R2 U' R U' R' U2 Rw U R U' Rw'", "U' R U2 R2 Uw' R U' R' U R' Uw R", "Rw U R' U R U2 Rw2 U' Rw R' U' R U Rw' U Rw", "U2 R' U2 R U R' U F' U2 R U R' U R U2 R' F R", "Rw U Rw' U2 Rw U2 Rw' R U' R' U' R U R' Rw U Rw'", "U' R U R' U' R' U' F R2 U' R' U R' U R2 U R' F'"],
        "2": ["U' R' F' U' F U R U R U R' U R U2 R'", "F U R U' R' U R' F R F' R U' R' F'", "U Rw' U' Rw U' R' U R Rw' U Rw U' F U R U' R' F'", "U2 F R U R' U' F' U R' U2 R U R' U R", "U' F R U' R' F' Rw' F Rw U' Rw' U' R U' R' U2 Rw", "U' R U R' F' U2 F R U' R' U' Rw U R' U R U2 Rw'", "U R U R' U R' F R F Rw U Rw' F", "U2 Rw U2 R' U' R U' Rw' U R' F' U' F U R", "U R U R' U R U' y R U' R' F'", "U2 Rw U2 R' U' R U' Rw' F R U R' U' F'", "U R' F' U' F U R U R' U' R U' R' U2 R", "U2 F R U R' U' F' U2 R U R' U R U2 R'"],
        "3": ["U' R' U' F' U F2 R F' U2 F' U2 F", "U2 R U2 R' U2 R' F R2 U' R' U' F' U' Rw' F2 Rw", "R' F' R U R' F' U' R' F R U F' Rw U2 Rw' F R", "F' U' Rw' F Rw U' Rw' F Rw2 U R' U' Rw' F R", "U R U2 R U2 R2 F' U' F R U x U R' U' x'", "U2 F R U R' U' F' U2 R U' L' U R' U' L", "U2 R U' L' U R' U' L R' U' R' F R F' U R", "U' R U2 R' U2 R' F R F' U2 R' U' R' F R F' U R", "R' F' R U' R' U' F U R U' R' F Rw U2 Rw' F R", "Fw R U R' U' Fw' U' F R U' R' U R U2 R' U' F'", "U' R' F' U' F U R U R U' L' U R' U' L", "R' F R F' U' F R' F' R U' R' F R F'"],
        "4": ["R' F' R U R' U' R' F R2 U' R' U F' U F R", "F U R U' R2 F' R U2 R U2 R'", "Rw U2 Rw' U2 R U' R' U' F' U' Rw U' Rw' F2 Rw U Rw'", "U R' F' U' F U R U' Rw' F R F' Rw U R'", "U2 Rw' F R F' Rw U' R' U' F' U2 F R U' R'", "F U R U' R' U R U' R2 F' Rw U R U' Rw'", "U' R U' R2 U' F' U F R U2 R U R' U' R U' R'", "U' F Rw U Rw' U Rw U2 Rw' U' R U2 R' U' Rw U Rw' F'", "U' R D Rw' U Rw D' R2 U F' U2 F U R", "F R U R' U' F' L' U R U' L U R'", "U' R' U2 Rw U R' U' Rw' R2 U R' F U R U' R' F' R", "U' F R' F' R U R' F R F' R U R' F' U F"],
        "5": ["R U R' U' R' F R F' U R' U' R U' R' U2 R", "U2 F R U' R' U R U R' F' U2 R U R' U R U2 R'", "F R U' R' U' R U2 R' U' F' U' R' U' F' U F R", "R U R' F' U' F U R' U' R2 U' R2 U2 R", "R U2 R2 F R F' U2 R' F R2 U R' U' F'", "U Rw U2 R' U' R U' Rw' U R U R' U' R' F R F'", "R U R' U' R' F R F' U2 R U2 R' U' R U' R'", "R' U' R U' R' U F' U' F2 U R U' R' F' U2 R", "F U R U2 R' U' R' U2 R U R' U R2 U R' F'", "U2 F' R U2 R' U2 R' F R2 U' R' F' U' F R U R'", "U2 F R' F' R F R' F' R U2 R U' R' F' U' F", "R F R U R' U' F' U R' U R U' R' U2 R U' R'"],
        "6": ["U2 F' U' F Rw U' Rw' U Rw U' R' U' R U' Rw'", "U2 F U F' R' F R U' R' F Rw U Rw' F R", "U2 R U R' U' R' F R F' U2 R U R' U R U2 R'", "U' R' U' F' U2 F R' F R F' U2 R U' R' U2 R", "Rw' U' R U' R' U2 F' Rw U Rw U' Rw' F", "F U R U2 R' U' R U R' F' R U R' U R U2 R'", "U2 Rw U R' U R U2 Rw' U2 R U R' U' R' F R F'", "F R U' R' U R U R' F' U2 R U2 R' U' R U' R'", "U2 R U R' U' R' F R F' U R' U2 R U R' U R", "U' R U' Rw' F2 R U' R' U' R U2 R' F' R' F' Rw", "U2 R U' R' F' U' F U2 R U R' U' R U R'", "R' F R2 U R' U Rw U Rw' U2 F2 U2 F"],
    },
    oll53 : {
        "name": "Oll53",
        "1": ["U Rw' U' Rw R' U' R U R' U' R U Rw' U Rw", "U Rw' U2 R U R' U' R U R' U Rw", "U2 Rw U R' U R U2 Rw' U' R' U2 R U R' U R", "U' Rw U' R' U R U' R' U' R U2 R' U2 R U Rw'", "Rw' U' R U' R' U R U' R' U2 Rw", "R' U' R U' R' U2 R Rw' U' Rw U' R' U M U Rw", "U2 M' U' R' U2 R U R' U' R U R' U R M", "U' R U' R' U' F' U R U R2 U' R' F R U R", "U2 Rw U R' U R U2 Rw' R U R' U R U2 R'", "U2 R' Rw U Rw' U Rw U Rw' U' Rw U' Rw' U' R", "Rw' R2 U R' U R U2 R' U M' U' R U R' U R U2 R'", "U' F U R U' R2 F R F Rw U Rw' U Rw' F Rw"],
        "2": ["R' U2 F R U R' U' F' R U' R' F' U' F U' R", "U2 R U R U' R' F U R U' R F' R' U R U' R' U R", "U2 R2 D' R U' R' D R2 y Rw U' Rw' U Rw U Rw'", "U' Rw U R' U R U2 Rw' U2 R U2 R2 F R F' R U2 R'", "R U R' F' U' F R U R' U2 R' F R2 U R' U' F'", "U R' U2 R2 U R2 U R2 U2 R' F U R U' R' F'", "U' R U R' U' R' F R F' U' F R U' R' U' R U R' F'", "U2 R' U2 R U R' U F' U F R U R2 F R F' R", "U' F R U R' U' R U R' U' R U' R' F' U' Rw' F2 Rw", "U R U2 R2 U' R2 U' R2 U R' F R F' U R", "U' R U R' U R U2 R' U2 R U2 R2 F R F' R U2 R'", "Rw' F R U F R U' R' F' U' R' F R F' Rw U R'"],
        "3": ["U2 F R U R' U' R U' R' U R U R' F'", "U2 R U R' U R U2 R' F U R U2 R' U' R U R' F'", "R' U' R U R U2 R' U2 R' U2 F R F'", "U2 F R U' R2 F' R U2 R U2 R' F U' F'", "U R' U F' U F R U R' U R U2 R' U' R", "U R U R' U R U2 R' U R U R' F' U F R U' R'", "Fw R U R' U' Fw' Rw U R' U' Rw' F R F'", "R U' R' U' F U R U' R' F' R U' R' U R U2 R'", "U2 R2 F R F' R U' R' U' R U2 R' U2 R U' R' U R", "U2 R' U2 R U R' F U R U' R' F Rw U Rw' F R", "U' R' F R F' U' F R' F2 Rw U R U' Rw' F R U' R'", "U' R' U' F' U F R U R U2 R' U' F' U F R U' R'"],
        "4": ["U2 F U R U' R' U R U2 R' U R U R' F'", "Rw' F' U F Rw' U Rw2 U' Rw2 U' Rw U' Rw", "U' R' U' R U' R' U2 R U R' F R U R' U' F' U R", "U' Rw D' R U2 R' U2 R U' R' U' R U R' D Rw'", "U2 Rw' F R F' Rw U' R' U2 R' F R F'", "U2 F R U R' U' F' R U R' U' R' F R F'", "U' F R' F' R U R U' R' U' Rw U R' U R U2 Rw'", "U2 R U R' U' R' F R2 U R' U F' U' F U' F'", "U2 F R U2 R' U' R' U2 R U R' U R2 U R' U' F'", "U2 F U R U' R' F' R' F' Rw U R U' Rw' F", "U' R U R' U' R' F R F' U' F R' F' R U R U' R'", "U2 R' F2 Rw U2 R U' Rw' F R U R' U R U2 R'"],
        "5": ["U R U R' F' U' F R U R2 F R F' R U2 R'", "Rw' R U' R' F R' F' R2 U' R' U' Rw U' Rw' U' Rw", "U2 R' F2 Rw U Rw' R U R' U' R' F R2 U' R' U2 R", "F' Rw U Rw' U' Rw2 F Rw U2 F U Rw", "U2 F' Rw U R' U2 Rw' F Rw U' Rw U' Rw' F Rw' F2 R", "U2 R U2 R' U2 R' F R F' R U2 R' U2 R' F R F'", "U2 R' U2 R U R' U R U R' F R U R' U' F' U R", "U2 F R' F' R U2 R U2 R' U R' U2 R U R' U R", "R U2 R' F R F' Rw U R2 U R U R' U' R U Rw'", "U' R' F R F' U2 x' R2 U' R' U Lw'", "U R U' R' U R U' R' U2 F' U F R U R'", "U' F R U' R' U R U2 R' U' F' R' U' R U' R' U2 R"],
        "6": ["R U2 R' U' R U' R' F R U R2 U' F' U F R F'", "U' F' U' F R U R' F R' F' R U' R' F R F'", "U2 Rw U' Rw' U' Rw U Rw' F' U F R' F2 Rw U Rw' F R", "U Rw U' Rw' U' Rw U Rw' U' R U' R' U' F R' F' R", "U R' U2 R U R' U2 F R' F' R F' U2 F U R", "U2 Rw U2 Rw' F2 Rw U Rw' F Rw U' Rw' F R' F' R", "U2 R' U R U2 R U2 R' U' R U R' U2 R' U2 F R F'", "U R U R' U R U2 R' U2 F R U' R' U' R U R' F'", "U2 R U' L' U R' U' L U' Rw' U2 R U R' U Rw", "U' Rw U Rw' R U R' U' Rw U' Rw' F R U' R' U R U2 R' U' F'", "U2 R' U2 R U R' F U F' R U F U' R U' R' F'", "U Rw U R' U R U2 Rw' U2 F R U' R' U' R U R' F'"],
    },
    oll54 : {
        "name": "Oll54",
        "1": ["U M U R U2 R' U' R U R' U' R U' R' M'", "U' R U R' U R U2 R' Rw U Rw' U R U' R' Rw U' Rw'", "U' Rw U R' U R U' R' U R U2 Rw'", "U' F R2 D R' U R D' R' U2 R' U R U2 R' U' F'", "Rw' U2 R U R' U Rw U R U R' U R U2 R'", "U2 Rw U2 R' U' R U R' U' R U' Rw'", "U2 Rw U Rw' R U R' U' R U R' U' Rw U' Rw'", "Rw' U R U' R' U R U R' U2 R U2 R' U' Rw", "U' M' U' R U' Rw' U' R U R' U Rw U Rw'", "U' R U R' U R U2 R' Rw U R' U R U2 Rw'", "U2 Rw' F Rw R U R' U R U2 R2 F Rw U Rw' F' R", "U2 R' U2 R U F R' U R U' R U' R' U R U R' F'"],
        "2": ["Rw' U' R U' R' U2 Rw U' R U2 R2 F R F' R U2 R'", "R U2 R2 F R F' R U2 R' U' R U R' U R U2 R'", "U' R' U' R U R' U' R F R' U R' U' F' R U R' U' R'", "Fw R U R' U' R U R' U' Fw' F R U R' U' F'", "U2 R U2 R2 U' R2 U' R2 U2 R U R' U' F' U F R", "U R U R' U R' F R F' R U2 R2 U2 R U R' U R", "U2 R' F R U R U2 R' U' R U R' F Rw U Rw' F", "U' R' F' U' F U R U' F R U R' U' R U R' U' F'", "Fw R U R' U' Fw' R U2 R2 U' R2 U' R2 U2 R", "R U2 R2 F R F' R U2 R' U2 R' U2 R U R' U R", "U2 R' U2 R U R' F' U F R F R U R' U' R U R' U' F'", "R' U' R U' R' U2 R U' R U2 R2 F R F' R U2 R'"],
        "3": ["U' R U2 R2 F R F' R U' R' U' R' F R2 U R' U' F'", "U2 R' U' R U' R U R' F' U' R' U2 R U' F R U' R'", "U R' U' R' F R F' U R U2 R U R' U' R' F R F'", "U' R U2 R' U' F' U' F R U R' U' R U' R'", "U F R U' R' U' R U R' F' U Rw' U' R U' R' U2 Rw", "U' R U2 R2 U' R2 U' R2 U2 R2 U R' U' R' F R F'", "U Rw U' Rw' U' Rw U Rw' U2 R U R' U2 F R' F' R", "U' R' U' R' F R F' R' F R F' R F R' U R U' F'", "U2 F' R U2 R' U2 R' F Rw U R U R' U' R U' Rw'", "F R U' R' U R U R' F' U F R U' R' U' R U R' F'", "U2 R' U' F' U F R U Rw U R' U' Rw' F R F'", "U' R U2 R' U2 R' F R F' U2 R' U' R U' R' U2 R"],
        "4": ["Rw' U' R U' R' U R' F R F' U F R F' Rw U R'", "U2 R' F' U' F U R U' R U R' U' R' F R F'", "U' R U R' U R U2 R2 F2 Rw U2 R U' Rw' F", "U2 R' U' R U' R' U2 R U' F R U' R' U' R U R' F'", "F R U' R' U2 R U R' U F' U' F' Rw U Rw'", "U2 F R' F' R U R U' R' U2 R' U2 R U R' U R", "U' F R U R' U' F' R' U' F U R U' R' F' R", "U' F R U R' U' R U' R' U F' Rw' U' F U Rw", "U' R U R' U' R' F R F' U' F R U R' U' R U R' U' F'", "U2 R' U' F' U F R U' F U R U2 R' U R U R' F'", "U2 F' U F R U R' U2 R' F R F' R' F R F'", "U F U R U' R' F' U2 R' U' F U R U' R' F' R"],
        "5": ["U' M' U R U R2 F R F' R U Rw' U Rw U Rw'", "U2 F R U' R' U' R U R' F' U2 R' U2 R U R' U R", "U' R' F R U R' U' F' U R U' R U2 R' U2 R' F R F'", "U R2 F R F' U F U R U' R' F' U R U' R' U R", "U R U2 R' U' R U' R' U' R U R' F' U' F U R U2 R'", "U F R' F' R U R U' R' U2 Rw U2 R' U' R U' Rw'", "U' F R' F' Rw U2 R U' R' U R' F R F' R U2 Rw'", "F R U' R' U R U2 R2 F R F' U y' R' U' R U' R'", "U F R U' R' U' R U R' F' U' R U2 R' U2 R' F R F'", "U2 R' U R U' R' U R y U2 R U' R' F' U' F", "U R' F' U F U' R U R2 F R F' R", "U2 R U R' U R U2 R2 F R U R' U' F' U R"],
        "6": ["U2 F U' R U2 R2 F R F' R U' R' U2 F'", "U2 Rw U2 R' U' R U' Rw' F R U' R' U R U2 R' U' F'", "U2 R U2 R' U' R2 D R' U R D' R2 U2 M' U R U' Rw'", "U M' U R U' Rw' U' R2 D Rw' U' Rw D' R' U2 R'", "U2 F R U R' U' F' R U2 R' U2 R' F R2 U R' U' F'", "U' F R U' R' Rw' F R F' Rw U' R' U' F'", "U2 R U2 R' U' R U' R' F R U' R' U R U2 R' U' F'", "U' R' F R F' Rw U R' U' R U2 R' U' R U' Rw'", "U2 R' U' R U' R' U2 R U2 R U R' F' U F R U' R'", "U R' F R U' R' U' R U R' F Rw U Rw' U2 F R", "U' R U R' U R U R' U' F' U2 F U2 R U2 R'", "U2 Rw' U' R U' R' U2 Rw U' F R' F' R U R U' R'"],
    },
    oll55 : {
        "name": "Oll55",
        "1": ["U' F R U' R' U2 F R U R' U' F' R U2 R' U' F'", "U' R U R' U R U2 R' U' Rw' U2 R U R' U Rw", "U2 Rw U Rw' R U R' U' Rw U' Rw' R U2 R' U' R U' R'", "R' U2 R U R' U R U Rw U R' U R U2 Rw'", "R' U2 R U R' U R U Rw U Rw' U R U' M' U' Rw'", "Rw U Rw' R U R' U' Rw U' Rw' U' R' U' R U' R' U2 R", "Rw U2 R' U' Rw' R2 U R' U' Rw U' Rw'", "Rw' U' R' F R U Rw y' U R U' R' U R U2 R'"],
        "2": ["Rw' F R F' Rw U R' U R U R' U' R' F R F'", "Rw U' Rw' U' Rw U Rw' y' R2 D' R U R' D R2", "F R U R' U' F' R U2 R2 U' R2 U' R2 U2 R", "R U' R' U R y R U R' U2 R U2 R2 F R F' U F'", "R U2 R2 D' R U' R' D R U' R' F R2 U R' U' F'", "F U' R2 D R' U2 R D' R2 U F'", "U F U' R U' R' F' U' R' F R U2 R' F' R", "U F' U Rw' F Rw F U Rw U' Rw' U2 Rw U Rw'"],
        "3": ["F R' F' R U R U' R2 F2 Rw U Rw' F R", "U F R U' R' U' R U R' F' U2 Rw U2 R' U' R U' Rw'", "U2 R U R' U' R U' R' F' U' F R U R' F R U R' U' F'", "U' R U2 R2 U' R U' R' U2 F R F'", "U' Rw U2 R2 F R F' U2 Rw' F R F'", "U R' U2 R2 U R' U R U2 x' U' R' U x", "U' R' F2 Rw2 U' Rw' F U2 R U' Rw' F", "R U2 R' U' R U' R' U R U2 R' U2 R' F R F'", "R' U2 R U R' U R U Rw' F2 Rw U2 Rw U' Rw' F", "U R' U' R' F R F' U R U2 Rw U R' U' Rw' F R F'", "U2 Rw' F Rw F Rw U' Rw' U2 Rw U Rw' U' R U R' F'", "U F R' F' R U R U' R' U' R U2 R' U2 R' F R F'"],
        "4": ["U Rw' U2 R U R' U Rw U R' F R U R' U' F' U R", "R' F R U R' U' F' U R U' R U R' U R U2 R'", "U R' U2 R U R' U R U' F R U' R' U' R U R' F'", "U2 F U R2 D R' U' R D' R2 U R U' R' F'", "U' F R' F' R U R U R' U F' U' F U' R U' R'", "U R U2 R' U' R U' R' F R U R' F' U' F' Rw U Rw'", "R' F R U R' U' F' U R U2 R' U2 R U R' U R", "U2 R' U2 R U R' U R2 U R' F' U F U R U2 R'", "U R2 F R F' U' F R U R' U' F' U' R U' R' U R", "U2 Rw U R' U R U2 Rw' R' F R U R' U' F' U R", "U2 R' F U R U' R2 F' R2 U R' U' R", "R U' R' U R U' R' U' R U' F U R U' R' F' U2 R'"],
    },
    oll56 : {
        "name": "Oll56",
        "1": ["U2 R' U' R' F' R U R2 U' R' U' F U R U R'", "U2 Rw U Rw' U R U' R' U R U' R' Rw U' Rw'", "U R U' R2 Rw U' R U' R' U Rw' R2 U R'", "U2 Rw' U' Rw U' R' U R U' R' U R Rw' U Rw", "R U R' U' M' U R U' Rw' U' R' U2 R U R' U' R U R' U R", "U R U R' U R U' R2 F R F' y' R' U' R U R' U R", "Rw U Rw' U R U' R' M' U R U2 Rw'", "U R U2 R' U' R U R' U' y Rw' U' R' F' R U Rw"],
        "2": ["U F R U R' U' R U R' U' F' Fw R U R' U' Fw'", "R U R' F' U2 F R U' R' U F R U R' U' R U R' U' F'", "U2 R' U2 R U R' U R U' R U2 R2 F R F' R U2 R'", "R U2 Rw' F R' F' Rw F2 Rw U Rw' F", "R2 D R' U2 R D' R2 U2 R' F R2 U R' U' F'", "U R' U' R' F R F' U R U2 R U2 R2 U' R2 U' R2 U2 R", "U R' F R U2 R' F' R U F R U R' U F'", "U R U2 R' U2 R' F R F' U F R U' R' U R U R' F'"],
        "3": ["U' R' U' R F U R U' R' F' U2 R' U2 R", "U' R U R' U R' U' F' U F R U R U2 R'", "F U R U2 R' U' R U R' F' U R U R' U R U2 R'", "U2 F R U R' U' R F' Rw U R' U' Rw'", "U' F R' F' R U2 F' U F U' R U2 R'", "U2 F R U R' U2 R' U2 R U F' R' U R", "R' F R F' U2 R U' R' U F' U2 F", "F R U R' U' F' Rw U R' U' Rw' F R F'", "U2 F R U R2 U' R F' R' U' R U R' U R", "U' R' U' R U R' U' R U2 R' U' R U R' F' U2 F R", "U' R U R' U' R U R' F' U2 F R U' R' U R U2 R'", "U R U R' U2 R U R' U' R U' F U R U' R' F' R'"],
        "4": ["U2 Rw' U' R U' R' U' Rw U Rw' U' Rw y R U' R'", "U Rw U R' U R U' R' U R' F R F' U2 Rw' F R F'", "R' U R U' R' U' R U R' U R' F R F' R U R' U R", "R' U' R U' R' U' R y U R U R' U R U R' U F' U' F", "U2 R' F R U R' F' R F U' F' R U2 R' U' R U' R'", "Rw' U' R' U Rw U' R' U' R' F R F' R2 U' R' U2 R", "U R' U' R F U R U2 R' U2 R' U2 R2 U R' F'", "F R U R' F' U' F' Rw U' R' U' R U' Rw'", "U2 R U R' U2 F' U F R U' R' U R U R' U' R U' R'", "U2 L' U R U' L U R' U' Rw U Rw' R U R' U' Rw U' Rw'", "Rw2 F2 Rw U F R U R' F' Rw U' R2 F R F' R", "M U Rw U' Rw' U' Rw2 D Rw' U' Rw D' Rw' U2 R'"],
    },
    oll57 : {
        "name": "Oll57",
        "1": ["U2 Rw U Rw' R U R' U' Rw U' Rw' U' R' U2 R U R' U R", "U2 R U R' U' M' U R U' Rw'", "R U2 R' U' R U' R2 F' U' F R' F R F' U R", "U2 R' U' R U M U' R' U Rw", "F R U R' U' R' U' R F' R' U R U2 F U2 F'", "F Rw U Rw' R U' R' U' M' U M F'", "Rw U Rw' R U R' U' Rw U' Rw' R U R' U R U2 R'", "U Rw' U2 R U R' U Rw U Rw U Rw' R U R' U' Rw U' Rw'"],
        "2": ["U2 F' U2 F U2 R U' R' U R U R' U F' U' F", "U2 Rw' U Rw U' Rw' F' U' Rw U2 R' U' R U' Rw' F Rw", "Rw U R U' Rw' y Rw2 D Rw' U' Rw D' Rw2", "U F' R' F R F' U' F R U R' y' R2 U R2", "R U' R' U' F U R U' R' F Rw U2 R' U' Rw' F R", "U F R' F R F' U' F U Rw U2 Rw' U' R U R' F2", "U R' F' U2 F U' R U R2 F R F' U2 R", "R U' R2 F R F' R U' y R U2 R' F'"],
        "3": ["U F R' F' R U2 R U2 R' U' Rw U Rw' R U R' U' Rw U' Rw'", "M' U Rw' F R F' U R U R' U2 Rw U Rw'", "U2 F R U' R' U2 R U R' U R' U2 R2 U R2 U R F'", "U2 F R U' R' U R U2 R2 F R F' R U' R' F'", "R U2 R' U R U2 y R U R' U R U R' U F'", "R U R' U' R' F R2 U R2 F R F' R U' R' F'", "F U R U2 R' U' R U R' F' U' R' U' R U' R' U2 R", "R' U' R' F' U' F U R2 U2 R' U' R", "U2 R U2 F R U R' U' F' U' R' U2 R U R'", "U2 R U2 R' U' R U' R2 F2 Rw U2 R U' Rw' F", "R' U2 R U R' U R U2 R U2 R' U2 R' F R F'", "U2 R U' R' F' U F R U R2 F R F'"],
        "4": ["U2 R' U' R U' F U' R' U' R U R U' R' U' R U R' F'", "U2 R2 U R' U R' U' R U' R' F U R U' F' R'", "U2 R' F' U2 R' F R U' R' F' R U' F U' R", "U2 F R U' R' U R U R2 F' Rw U R U' Rw'", "U2 R' U2 R U' R' U' R' F R F' R U2 R' U2 R", "U2 Rw U Rw' F' R U R' U' R' F R Rw U' Rw'", "U2 R U2 R' F U R' U' F' U R U' R U2 R'", "U2 R U R' U' R' F R F' U2 F R U' R' U' R U2 R' U' F'", "U2 R U2 Rw' U' R U R' F' Rw U2 R' U' Rw U' Rw' F", "F R U R' U2 R' F R F' R U R' U R U' R' F'", "R U2 R' U' R U' R' F R' F' R U2 R U2 R'", "U' R U R' U' F' U' R' U' F' U F R F U2 R U' R'"],
    },
}