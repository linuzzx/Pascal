let canvasSize = 0;

const frurufState = [
    "","","white","white","white","white","","","white",
    "white","","white",
    "","white","",
    "","","",
    "","white",""];

let olls = [
    "R U2 R2 F R F' U2 R' F R F'",
    "R' U2 Rw U' Rw' U2 Rw U Rw' U2 R",
    "Fw R U R' U' Fw' U' F R U R' U' F'",
    "Fw R U R' U' Fw' U F R U R' U' F'",
    "Lw' U2 L U L' U Lw",
    "Rw U2 R' U' R U' Rw'",
    "Rw U R' U R U2 Rw'",
    "Lw' U' L U' L' U2 Lw",
    "L' U' L U' L F' L' F L' U2 L",
    "R U R' U R' F R F' R U2 R'",
    "F' L' U' L U F U F R U R' U' F'",
    "F R U R' U' F' U F R U R' U' F'",
    "L F' L' U' L F L' F' U F",
    "R' F R U R' F' R F U' F'",
    "Lw' U' Lw L' U' L U Lw' U Lw",
    "Rw U Rw' R U R' U' Rw U' Rw'",
    "R U R' U R' F R F' U2 R' F R F'",
    "F R U R' U y' R' U2 R' F R F'",
    "M U R U R' U' M' R' F R F'",
    "M U R U R' U' M2 U R U' Rw'",
    "F R U R' U' R U R' U' R U R' U' F'",
    "R U2 R2 U' R2 U' R2 U2 R",
    "R2 D' R U2 R' D R U2 R",
    "Rw U R' U' Rw' F R F'",
    "F R' F' Rw U R U' Rw'",
    "L' U' L U' L' U2 L",
    "R U R' U R U2 R'",
    "Rw U R' U' M U R U' R'",
    "Rw2 D' Rw U Rw' D Rw2 U' Rw' U' Rw",
    "Rw2 D Rw' U' Rw D' Rw2 U Rw U Rw'",
    "S' L' U' L U L F' L' Fw",
    "R U B' U' R' U R B R'",
    "R U R' U' R' F R F'",
    "R U R' U' B' R' F R F' B",
    "R U2 R2 F R F' R U2 R'",
    "L' U' L U' L' U L U L F' L' F",
    "F R' F' R U R U' R'",
    "R U R' U R U' R' U' R' F R F'",
    "L F' L' U' L U F U' L'",
    "R' F R U R' U' F' U R",
    "R U R' U R U2 R' F R U R' U' F'",
    "R' U' R U' R' U2 R F R U R' U' F'",
    "R' U' F' U F R",
    "Fw R U R' U' Fw'",
    "F R U R' U' F'",
    "R' U' R' F R F' U R",
    "F' L' U' L U L' U' L U F",
    "F R U R' U' R U R' U' F'",
    "Rw U' Rw2 U Rw2 U Rw2 U' Rw",
    "R' F R2 B' R2 F' R2 B R'",
    "Fw R U R' U' R U R' U' Fw'",
    "R' U' R U' R' U F' U F R",
    "Lw' U' L U' L' U L U' L' U2 Lw",
    "Rw U R' U R U' R' U R U2 Rw'",
    "F U' R2 D R' U2 R D' R2 U F'",
    "F R U R' U' R F' Rw U R' U' Rw'",
    "R U R' U' M' U R U' Rw'"
];

let ollsInversed = [];

let other = [
    "",
    "F R U R' U' R U R' U' F'",
    "F R U R' U' R U R' U' R U R' U' F'",
    "F U R U' R' U R U' R' F'",
    "F U R U' R' U R U' R' U R U' R' F'",
    "Fw R U R' U' R U R' U' Fw'",
    "Fw R U R' U' R U R' U' R U R' U' Fw'",
    "Fw U R U' R' U R U' R' Fw'",
    "Fw U R U' R' U R U' R' U R U' R' Fw'",
];

let plls = [
    "x R' U R' D2 R U' R' D2 R2",
    "x R2 D2 R U R' D2 R U' R x'",
    "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
    "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    "D' R2 U R' U R' U' R U' R2 U' D R' U R",
    "R' U' R U D' R2 U R' U R U' R U' R2 D",
    "R2 F2 R U2 R U2 R' F R U R' U' R' F R2",
    "R U R' U' D R2 U' R U' R' U R' U R2 D'",
    "M2 U M2 U2 M2 U M2",
    "L' U' L F L' U' L U L F' L2 U L",
    "R U R' F' R U R' U' R' F R2 U' R'",
    "F' R U R' U' R' F R2 F U' R' U' R U F' R'",
    "Rw' D' F Rw U' Rw' F' D Rw2 U Rw' U' Rw' F Rw F'",
    "R U R' F' R U2 R' U2 R' F R U R U2 R'",
    "R' U2 R U2 R' F R U R' U' R' F' R2",
    "R U R' U' R' F R2 U' R' U' R U R' F'",
    "M2 U M U2 M' U M2",
    "M2 U' M U2 M' U' M2",
    "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2",
    "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    "M' U' M2 U' M2 U' M' U2 M2",
];

let solutions = [];
let myAlgs = [];

$(function() {
    adjustSize();
    
    for (let i=0; i<olls.length; i++) {
        ollsInversed.push(inverse(olls[i]));
    }
    getFLL();
});
        
$(window).resize(function(){
    adjustSize();
});

function adjustSize() {
    if ($("#content").width() > $("#content").height()) {
        canvasSize = $("#content").height() / 10;
    }
    else {
        canvasSize = $("#content").width() / 10;
    }
    
}

function getFLL() {
    let arrIndex = 0;
    myAlgs = olls.concat(other, ollsInversed, plls).sort(function(a, b){return a.length - b.length});
    for (let alg1 of olls) {
        outerLoop:
        for (let alg2 of myAlgs) {
            scrambleCube(inverse(alg1));
            for (let u of [[""], ["U "], ["U' "], ["U2 "]]) {
                if (checkFrurufState(applyMoves(u+alg2))) {
                    solutions[arrIndex] = u+alg2;
                    break outerLoop;
                }
            }
        }
        arrIndex++;
    }
    console.log(olls);
    console.log(solutions);
    console.log(solutions.filter(function (el) {return el != null;}).length);

    let out = "";
    for (let i = 0; i < olls.length; i++) {
        out += "<tr><td>"+ollsInversed[i]+"</td><td><canvas id='case"+i+"' width='"+canvasSize+"' height='"+canvasSize+"' style='margin: auto;'></canvas></td><td>"+solutions[i]+"</td></tr>";
    }
    $("#algTable").html(out)
}

function inverse(alg) {
    let newAlg = "";

    for (let m of alg.split(" ").slice().reverse()) {
        if (m.includes("'")) {
            newAlg += m.replace("'"," ");
        }
        else if (m.includes("2")) {
            newAlg += m.replace("2","2 ");
        }
        else {
            newAlg += m + "' ";
        }
    }

    return newAlg.trim();
}

function checkFrurufState(state) {
    let isFrurufState = false;

    if (state.join(",") === frurufState.join(",")) {
        isFrurufState = true;
    }
    else {
        _u();
        if (state.join(",") === frurufState.join(",")) {
            isFrurufState = true;
        }
        else {
            _u();
            if (state.join(",") === frurufState.join(",")) {
                isFrurufState = true;
            }
            else {
                _u();
                if (state.join(",") === frurufState.join(",")) {
                    isFrurufState = true;
                }
            }
        }
    }

    return isFrurufState;
}