let scramble;
let endState;
let solvedCubeState = "wwwwwwwwwooooooooogggggggggrrrrrrrrrbbbbbbbbbyyyyyyyyy";

let centers = [1, 2, 3, 4, 5, 6];
let corners = [1, 2, 3, 4, 5, 6, 7, 8];
let edges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let cornersO = [0, 0, 0, 0, 0, 0, 0, 0];
let edgesO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let convertedCenters = [1, 2, 3, 4, 5, 6];
let convertedCorners = [1, 2, 3, 4, 5, 6, 7, 8];
let convertedEdges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let convCornersO = [0, 0, 0, 0, 0, 0, 0, 0];
let convEdgesO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let centerSolution = "";
// ubl ubr ufl ufr dfl dfr dbl dbr
// ub ul ur uf df dl dr db fl fr br bl

onmessage = e => {
    scramble = e.data[0];
    endState = e.data[1];
    
    solve(scramble, endState);
}

function solve(scramble, endState) {
    let movesEO = ["U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2"];
    let movesDR = ["F2", "B2", "U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2"];
    let movesHTR = ["R2", "L2", "F2", "B2", "U", "U'", "U2", "D", "D'", "D2"];
    let movesFinal = ["U2", "D2", "R2", "L2", "F2", "B2"];

    if (validateState(endState)) {
        if (endState !== solvedCubeState) {
            convertState();
        }

        let solution = "";
        let steps = ["Center", "EO", "DR", "HTR", "Final"];
        let stepMoves = [[], movesEO, movesDR, movesHTR, movesFinal];
        let stepTables = [solutionsCenter, solutionsEO, solutionsDR, solutionsHTR, solutionsFinal];

        for (let i = 0; i < steps.length; i++) {
            let changed = false;
            let step = steps[i];
            let stepSolutions = stepTables[i];
            let moves = stepMoves[i].slice();
            
            postMessage([0, "Solving " + step]);

            let solLength = 1;
        
            let state = getState(scramble + " " + solution, step);
            let ind = stepSolutions.findIndex(s => s.state === state);
            if (ind !== -1 && (step !== "HTR" || isHTR(scramble + " " + solution + " " + stepSolutions[ind].solution))) {
                solution += stepSolutions[ind].solution + " ";
            }
            else {
                let arr = moves.slice();
                outerloop : while (!changed) {
                    if (solLength === 1) {
                        for (let m of arr) {
                            state = getState(scramble + " " + solution + " " + m, step);
                            ind = stepSolutions.findIndex(s => s.state === state);
                            if (ind !== -1 && (step !== "HTR" || isHTR(scramble + " " + solution + " " + m + " " + stepSolutions[ind].solution))) {
                                solution += m + " " + stepSolutions[ind].solution + " ";
                                changed = true;
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
                                state = getState(scramble + " " + solution + " " + m1 + " " + m2, step);
                                ind = stepSolutions.findIndex(s => s.state === state);
                                if (ind !== -1 && (step !== "HTR" || isHTR(scramble + " " + solution + " " + m1 + " " + m2 + " " + stepSolutions[ind].solution))) {
                                    solution += m1 + " " + m2 + " " + stepSolutions[ind].solution + " ";
                                    changed = true;
                                    break outerloop;
                                }
                            }
                        }
                        arr = tArr.slice();
                    }
                    solLength++;
                }
            }
        }
        // solution += " " + centerSolution;
        if (solution.trim() === "") {
            postMessage([2, "Solved"]);
        }
        else {
            postMessage([1, solution]);
        }
    }
    else {
        postMessage([-1, "Illegal end state"]);
    }
}

function cleanMoves(m) {
    m = m.replaceAll(" ", ";");
     while (m.includes(";")) {
         m = m.replaceAll(";;", ";");
     }
 
     m = m.replaceAll(";", " ");
     return m.trim();
 }

function validateState(state) {
    let allPiecesCe = getPieces().ce;
    let allPiecesC = getPieces().c;
    let allPiecesE = getPieces().e;

    let piecesCe = getPieces(state).ce;
    let piecesC = getPieces(state).c;
    let piecesE = getPieces(state).e;

    return (
        state.split("").length === 54 &&
        comparePieceArrays(allPiecesCe, piecesCe) &&
        comparePieceArrays(allPiecesC, piecesC) &&
        comparePieceArrays(allPiecesE, piecesE)
    );
}

function comparePieceArrays(a, b) {
    a = a.map(p => p % 100).sort();
    b = b.map(p => p % 100).sort();
    return (
        a.length === b.length &&
        a.every((val, i) => val === b[i])
    );
}

function getPieces(state = solvedCubeState) {
    let uFace = state.substring(0, 9);
    let lFace = state.substring(9, 18);
    let fFace = state.substring(18, 27);
    let rFace = state.substring(27, 36);
    let bFace = state.substring(36, 45);
    let dFace = state.substring(45, 54);

    let piecesCe = [identifyCenter(uFace[4]), identifyCenter(lFace[4]), identifyCenter(fFace[4]), identifyCenter(rFace[4]), identifyCenter(bFace[4]), identifyCenter(dFace[4])];
    let piecesC = [
        identifyCorner([uFace[0], lFace[0], bFace[2]]), identifyCorner([uFace[2], bFace[0], rFace[2]]), identifyCorner([uFace[6], fFace[0], lFace[2]]), identifyCorner([uFace[8], rFace[0], fFace[2]]),
        identifyCorner([dFace[0], lFace[8], fFace[6]]), identifyCorner([dFace[2], fFace[8], rFace[6]]), identifyCorner([dFace[6], bFace[8], lFace[6]]), identifyCorner([dFace[8], rFace[8], bFace[6]])
    ];
    let piecesE = [
        identifyEdge([uFace[1], bFace[1]]), identifyEdge([uFace[3], lFace[1]]), identifyEdge([uFace[5], rFace[1]]), identifyEdge([uFace[7], fFace[1]]),
        identifyEdge([dFace[1], fFace[7]]), identifyEdge([dFace[3], lFace[7]]), identifyEdge([dFace[5], rFace[7]]), identifyEdge([dFace[7], bFace[7]]),
        identifyEdge([fFace[3], lFace[5]]), identifyEdge([fFace[5], rFace[3]]), identifyEdge([bFace[3], rFace[5]]), identifyEdge([bFace[5], lFace[3]])
    ];

    return {
        ce: piecesCe,
        c: piecesC,
        e: piecesE
    };
}

function resetState() {
    centers = convertedCenters.slice();
    corners = convertedCorners.slice();
    edges = convertedEdges.slice();
}

/* 
Center  123456
EO      111111111111
DR      100100100100100100100100111111110000
HTR     132123123132132123123132121313121213131223232323
Final   125154132143623634652645151214136362646532345452
*/

function getState(moves, step = null) {
    step === "convert" ? "" : resetState();
    for (let m of moves.split(" ")) {
        move(m);
    }
    
    if (step !== null) {
        let state = "";
        if (step === "Center") {
            for (let ce of centers) {
                state += ce;
            }
        }
        else if (step === "EO") {
            for (let e of edges) {
                state += e < 100 ? "1" : "0";
            }
        }
        else if (step === "DR") {
            for (let c of corners) {
                state += getCornerColors(c).map(c1 => (c1 === "w" || c1 === "y") ? "1" : "0").join("");
            }
            for (let e of edges) {
                let e1 = getEdgeColors(e)[0];
                state += (e1 === "w" || e1 === "y") ? "1" : "0";
            }
        }
        else if (step === "HTR") {
            for (let c of corners) {
                state += getCornerColors(c).map(c1 => c1.replaceAll("w", "1").replaceAll("o", "3").replaceAll("g", "2").replaceAll("r", "3").replaceAll("b", "2").replaceAll("y", "1")).join("");
            }
            for (let e of edges) {
                state += getEdgeColors(e).map(e1 => e1.replaceAll("w", "1").replaceAll("o", "3").replaceAll("g", "2").replaceAll("r", "3").replaceAll("b", "2").replaceAll("y", "1")).join("");
            }
        }
        else if (step === "Final") {
            for (let c of corners) {
                state += getCornerColors(c).map(c1 => c1.replaceAll("w", "1").replaceAll("o", "2").replaceAll("g", "3").replaceAll("r", "4").replaceAll("b", "5").replaceAll("y", "6")).join("");
            }
            for (let e of edges) {
                state += getEdgeColors(e).map(e1 => e1.replaceAll("w", "1").replaceAll("o", "2").replaceAll("g", "3").replaceAll("r", "4").replaceAll("b", "5").replaceAll("y", "6")).join("");
            }
        }/* 
        else {
            for (let c of corners) {
                state += numberifyPiece(getCornerColors(c), step);
            }
            for (let e of edges) {
                state += numberifyPiece(getEdgeColors(e), step);
            }
        } */
        return state;
    }
}

function getCenterColor(n) {
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

function getCornerColors(n) {
    let arr;
    switch (n % 100) {
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
    let r = Math.floor(n / 100);
    return rotateArray(arr, r);
}

function getEdgeColors(n) {
    let arr;
    switch (n % 100) {
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
    let r = Math.floor(n / 100);
    return rotateArray(arr, r);
}

function numberifyPiece(piece, step) {
    piece = typeof piece === "object" ? piece.join("") : piece + "";
    switch(step) {
        case "EO":
            let e1 = piece < 100 ? "1" : "0";
            let e2 = e1 === 1 ? "0" : "1";
            return e1 + e2;
        case "DRc":
            let i = Math.floor(piece / 100);
            return i === 0 ? "100" : i === 1 ? "001" : "010";
        case "DRe":
            let e3 = (piece % 100 === 1 || piece % 100 === 2 || piece % 100 === 3 || piece % 100 === 4 || piece % 100 === 5 || piece % 100 === 6 || piece % 100 === 7 || piece % 100 === 8);
            return e3 ? (piece < 100 ? "10" : "01") : "00";
        case "HTR":
            piece = piece.replaceAll("w", "1").replaceAll("y", "1").replaceAll("g", "2").replaceAll("b", "2").replaceAll("r", "3").replaceAll("o", "3");
            return piece;
        case "Center":
        case "Final":
            piece = piece.replaceAll("w", "1").replaceAll("o", "2").replaceAll("g", "3").replaceAll("r", "4").replaceAll("b", "5").replaceAll("y", "6");
            return piece;
    }
}

function rotateArray(arr, r) {
    let nArr = arr.slice();
    arr = nArr.slice(r).concat(nArr.slice(0, r));
    return arr;
}

function convertState() {
    let convCenters = getPieces(endState).ce;
    let convCorners = getPieces(endState).c
    let convEdges = getPieces(endState).e;
    
    let tempCenters = centers.slice();
    for (let i = 0; i < centers.length; i++) {
        if (tempCenters[i] !== convCenters[i]) {
            centers[i] = tempCenters[convCenters.indexOf(tempCenters[i])];
        }
    }
    convertedCenters = centers.slice();
    
    let tempCorners = corners.slice();
    for (let i = 0; i < corners.length; i++) {
        if (tempCorners[i] !== convCorners[i]) {
            let r = Math.floor(convCorners[convCorners.map(c => c % 100).indexOf(tempCorners[i] % 100)] / 100) * 100;
            r = r === 100 ? 200 : r === 200 ? 100 : 0;
            corners[i] = tempCorners[convCorners.map(c => c % 100).indexOf(tempCorners[i] % 100)] + r;
        }
    }
    convertedCorners = corners.slice();
    
    let tempEdges = edges.slice();
    for (let i = 0; i < edges.length; i++) {
        if (tempEdges[i] !== convEdges[i]) {
            let r = Math.floor(convEdges[convEdges.map(c => c % 100).indexOf(tempEdges[i] % 100)] / 100) * 100;
            edges[i] = tempEdges[convEdges.map(c => c % 100).indexOf(tempEdges[i] % 100)] + r;
        }
    }
    convertedEdges = edges.slice();
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

function identifyCorner(c) {
    let cp, co;
    if (c.includes("w") && c.includes("o") && c.includes("b")) {
        cp = 1;
        co = c.indexOf("w") === 1 ? 200 : c.indexOf("w") === 2 ? 100 : 0;
    }
    else if (c.includes("w") && c.includes("b") && c.includes("r")) {
        cp = 2;
        co = c.indexOf("w") === 1 ? 200 : c.indexOf("w") === 2 ? 100 : 0;
    }
    else if (c.includes("w") && c.includes("g") && c.includes("o")) {
        cp = 3;
        co = c.indexOf("w") === 1 ? 200 : c.indexOf("w") === 2 ? 100 : 0;
    }
    else if (c.includes("w") && c.includes("r") && c.includes("g")) {
        cp = 4;
        co = c.indexOf("w") === 1 ? 200 : c.indexOf("w") === 2 ? 100 : 0;
    }
    else if (c.includes("y") && c.includes("o") && c.includes("g")) {
        cp = 5;
        co = c.indexOf("y") === 1 ? 200 : c.indexOf("y") === 2 ? 100 : 0;
    }
    else if (c.includes("y") && c.includes("g") && c.includes("r")) {
        cp = 6;
        co = c.indexOf("y") === 1 ? 200 : c.indexOf("y") === 2 ? 100 : 0;
    }
    else if (c.includes("y") && c.includes("b") && c.includes("o")) {
        cp = 7;
        co = c.indexOf("y") === 1 ? 200 : c.indexOf("y") === 2 ? 100 : 0;
    }
    else if (c.includes("y") && c.includes("r") && c.includes("b")) {
        cp = 8;
        co = c.indexOf("y") === 1 ? 200 : c.indexOf("y") === 2 ? 100 : 0;
    }
    return cp + co;
}

function identifyEdge(e) {
    let ep, eo;
    if (e.includes("w") && e.includes("b")) {
        ep = 1;
        eo = 100 * e.indexOf("w");
    }
    else if (e.includes("w") && e.includes("o")) {
        ep = 2;
        eo = 100 * e.indexOf("w");
    }
    else if (e.includes("w") && e.includes("r")) {
        ep = 3;
        eo = 100 * e.indexOf("w");
    }
    else if (e.includes("w") && e.includes("g")) {
        ep = 4;
        eo = 100 * e.indexOf("w");
    }
    else if (e.includes("y") && e.includes("g")) {
        ep = 5;
        eo = 100 * e.indexOf("y");
    }
    else if (e.includes("y") && e.includes("o")) {
        ep = 6;
        eo = 100 * e.indexOf("y");
    }
    else if (e.includes("y") && e.includes("r")) {
        ep = 7;
        eo = 100 * e.indexOf("y");
    }
    else if (e.includes("y") && e.includes("b")) {
        ep = 8;
        eo = 100 * e.indexOf("y");
    }
    else if (e.includes("g") && e.includes("o")) {
        ep = 9;
        eo = 100 * e.indexOf("g");
    }
    else if (e.includes("g") && e.includes("r")) {
        ep = 10;
        eo = 100 * e.indexOf("g");
    }
    else if (e.includes("b") && e.includes("r")) {
        ep = 11;
        eo = 100 * e.indexOf("b");
    }
    else if (e.includes("b") && e.includes("o")) {
        ep = 12;
        eo = 100 * e.indexOf("b");
    }
    return ep + eo;
}

function isHTR(mvs) {
    getState(mvs, "Final");
    let state = corners.map(c => c % 100).join("");
    let ind = solutionsRealHTR.findIndex(s => s.state === state);
    return ind !== -1;/* 

    let c = [
        getCornerColors(corners[0]), getCornerColors(corners[1]), getCornerColors(corners[2]), getCornerColors(corners[3]),
        getCornerColors(corners[4]), getCornerColors(corners[5]), getCornerColors(corners[6]), getCornerColors(corners[7])
    ];

    let e = [
        getEdgeColors(edges[0]), getEdgeColors(edges[1]), getEdgeColors(edges[2]), getEdgeColors(edges[3]),
        getEdgeColors(edges[4]), getEdgeColors(edges[5]), getEdgeColors(edges[6]), getEdgeColors(edges[7]),
        getEdgeColors(edges[8]), getEdgeColors(edges[9]), getEdgeColors(edges[10]), getEdgeColors(edges[11])
    ];

    let cU = [c[0][0], c[1][0], c[2][0], c[3][0]];
    let cL = [c[0][1], c[2][2], c[6][2], c[4][1]];
    let cF = [c[2][1], c[3][2], c[4][2], c[5][1]];
    let cR = [c[3][1], c[1][2], c[5][2], c[7][1]];
    let cB = [c[1][1], c[0][2], c[7][2], c[6][1]];
    let cD = [c[4][0], c[5][0], c[6][0], c[7][0]];

    let eU = [e[0][0], e[1][0], e[2][0], e[3][0]];
    let eL = [e[0][1], e[2][1], e[6][1], e[4][1]];
    let eF = [e[2][1], e[3][0], e[4][0], e[5][1]];
    let eR = [e[3][1], e[1][1], e[5][1], e[7][1]];
    let eB = [e[1][1], e[0][0], e[7][0], e[6][1]];
    let eD = [e[4][0], e[5][0], e[6][0], e[7][0]];

    return (
        cU.filter(c1 => {return c1 === "w" ||  c1 === "y"}).length === 4 &&
        cL.filter(c1 => {return c1 === "o" ||  c1 === "r"}).length === 4 &&
        cF.filter(c1 => {return c1 === "g" ||  c1 === "b"}).length === 4 &&
        cR.filter(c1 => {return c1 === "r" ||  c1 === "o"}).length === 4 &&
        cB.filter(c1 => {return c1 === "b" ||  c1 === "g"}).length === 4 &&
        cD.filter(c1 => {return c1 === "y" ||  c1 === "w"}).length === 4 &&

        eU.filter(e1 => {return e1 === "w" ||  e1 === "y"}).length === 4 &&
        eL.filter(e1 => {return e1 === "o" ||  e1 === "r"}).length === 4 &&
        eF.filter(e1 => {return e1 === "g" ||  e1 === "b"}).length === 4 &&
        eR.filter(e1 => {return e1 === "r" ||  e1 === "o"}).length === 4 &&
        eB.filter(e1 => {return e1 === "b" ||  e1 === "g"}).length === 4 &&
        eD.filter(e1 => {return e1 === "y" ||  e1 === "w"}).length === 4
    ); */
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

    corners[1] = tempC[3] % 100 + (200 + Math.floor(tempC[3] / 100) * 100) % 300;
    corners[3] = tempC[5] % 100 + (100 + Math.floor(tempC[5] / 100) * 100) % 300;
    corners[5] = tempC[7] % 100 + (200 + Math.floor(tempC[7] / 100) * 100) % 300;
    corners[7] = tempC[1] % 100 + (100 + Math.floor(tempC[1] / 100) * 100) % 300;

    corners[0] = tempC[2] % 100 + (100 + Math.floor(tempC[2] / 100) * 100) % 300;
    corners[2] = tempC[4] % 100 + (200 + Math.floor(tempC[4] / 100) * 100) % 300;
    corners[4] = tempC[6] % 100 + (100 + Math.floor(tempC[6] / 100) * 100) % 300;
    corners[6] = tempC[0] % 100 + (200 + Math.floor(tempC[0] / 100) * 100) % 300;

    edges[2] = tempE[9];
    edges[9] = tempE[6];
    edges[6] = tempE[10];
    edges[10] = tempE[2];

    edges[1] = tempE[8];
    edges[8] = tempE[5];
    edges[5] = tempE[11];
    edges[11] = tempE[1];

    edges[0] = tempE[3] % 100 + (100 + Math.floor(tempE[3] / 100) * 100) % 200;
    edges[3] = tempE[4] % 100 + (100 + Math.floor(tempE[4] / 100) * 100) % 200;
    edges[4] = tempE[7] % 100 + (100 + Math.floor(tempE[7] / 100) * 100) % 200;
    edges[7] = tempE[0] % 100 + (100 + Math.floor(tempE[0] / 100) * 100) % 200;
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
    
    edges[8] = tempE[9] % 100 + (100 + Math.floor(tempE[9] / 100) * 100) % 200;
    edges[9] = tempE[10] % 100 + (100 + Math.floor(tempE[10] / 100) * 100) % 200;
    edges[10] = tempE[11] % 100 + (100 + Math.floor(tempE[11] / 100) * 100) % 200;
    edges[11] = tempE[8] % 100 + (100 + Math.floor(tempE[8] / 100) * 100) % 200;
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

    corners[2] = tempC[4] % 100 + (100 + Math.floor(tempC[4] / 100) * 100) % 300
    corners[3] = tempC[2] % 100 + (200 + Math.floor(tempC[2] / 100) * 100) % 300
    corners[5] = tempC[3] % 100 + (100 + Math.floor(tempC[3] / 100) * 100) % 300
    corners[4] = tempC[5] % 100 + (200 + Math.floor(tempC[5] / 100) * 100) % 300

    corners[0] = tempC[6] % 100 + (200 + Math.floor(tempC[6] / 100) * 100) % 300
    corners[1] = tempC[0] % 100 + (100 + Math.floor(tempC[0] / 100) * 100) % 300
    corners[7] = tempC[1] % 100 + (200 + Math.floor(tempC[1] / 100) * 100) % 300
    corners[6] = tempC[7] % 100 + (100 + Math.floor(tempC[7] / 100) * 100) % 300

    edges[3] = tempE[8] % 100 + (100 + Math.floor(tempE[8] / 100) * 100) % 200;
    edges[9] = tempE[3] % 100 + (100 + Math.floor(tempE[3] / 100) * 100) % 200;
    edges[4] = tempE[9] % 100 + (100 + Math.floor(tempE[9] / 100) * 100) % 200;
    edges[8] = tempE[4] % 100 + (100 + Math.floor(tempE[4] / 100) * 100) % 200;

    edges[0] = tempE[11] % 100 + (100 + Math.floor(tempE[11] / 100) * 100) % 200;
    edges[10] = tempE[0] % 100 + (100 + Math.floor(tempE[0] / 100) * 100) % 200;
    edges[7] = tempE[10] % 100 + (100 + Math.floor(tempE[10] / 100) * 100) % 200;
    edges[11] = tempE[7] % 100 + (100 + Math.floor(tempE[7] / 100) * 100) % 200;

    edges[1] = tempE[5] % 100 + (100 + Math.floor(tempE[5] / 100) * 100) % 200;
    edges[2] = tempE[1] % 100 + (100 + Math.floor(tempE[1] / 100) * 100) % 200;
    edges[6] = tempE[2] % 100 + (100 + Math.floor(tempE[2] / 100) * 100) % 200;
    edges[5] = tempE[6] % 100 + (100 + Math.floor(tempE[6] / 100) * 100) % 200;
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

let moveTable = {
    "U" : [],
    "U2" : [],
    "U'" : [],
    "D" : [],
    "D2" : [],
    "D'" : [],
    "R" : [],
    "R2" : [],
    "R'" : [],
    "L" : [],
    "L2" : [],
    "L'" : [],
    "F" : [],
    "F2" : [],
    "F'" : [],
    "B" : [],
    "B2" : [],
    "B'" : []
};