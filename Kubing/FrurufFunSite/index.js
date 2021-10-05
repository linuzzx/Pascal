const frurufState = [
    "","","white","white","white","white","","","white",
    "white","","white",
    "","white","",
    "","","",
    "","white",""];

    let myAlgs = [
        "",
        "R U2 R2 F R F' U2 R' F R F'",
        "R' U2 Rw U' Rw' U2 Rw U Rw' U2 R",
        "y' Fw R U R' U' Fw' U' F R U R' U' F'",
        "y' Fw R U R' U' Fw' U F R U R' U' F'",
        "y2 Lw' U2 L U L' U Lw",
        "Rw U2 R' U' R U' Rw'",
        "Rw U R' U R U2 Rw'",
        "Lw' U' L U' L' U2 Lw",
        "y' L' U' L U' L F' L' F L' U2 L",
        "R U R' U R' F R F' R U2 R'",
        "y F' L' U' L U F U F R U R' U' F'",
        "F R U R' U' F' U F R U R' U' F'",
        "L F' L' U' L F L' F' U F",
        "R' F R U R' F' R F U' F'",
        "y2 Lw' U' Lw L' U' L U Lw' U Lw",
        "Rw U Rw' R U R' U' Rw U' Rw'",
        "R U R' U R' F R F' U2 R' F R F'",
        "y2 F R U R' U y' R' U2 R' F R F'",
        "M U R U R' U' M' R' F R F'",
        "M U R U R' U' M2 U R U' Rw'",
        "y F R U R' U' R U R' U' R U R' U' F'",
        "Fw R U R' U' Fw' F R U R' U' F'",
        "y2 R2 D' R U2 R' D R U2 R",
        "Rw U R' U' Rw' F R F'",
        "F R' F' Rw U R U' Rw'",
        "y2 L' U' L U' L' U2 L",
        "R U R' U R U2 R'",
        "Rw U R' U' M U R U' R'",
        "Rw2 D' Rw U Rw' D Rw2 U' Rw' U' Rw",
        "y2 Rw2 D Rw' U' Rw D' Rw2 U Rw U Rw'",
        "y2 S' L' U' L U L F' L' Fw",
        "R U B' U' R' U R B R'",
        "R U R' U' R' F R F'",
        "y2 R U R' U' B' R' F R F' B",
        "R U2 R2 F R F' R U2 R'",
        "y2 L' U' L U' L' U L U L F' L' F",
        "F R' F' R U R U' R'",
        "R U R' U R U' R' U' R' F R F'",
        "y L F' L' U' L U F U' L'",
        "y R' F R U R' U' F' U R",
        "y2 R U R' U R U2 R' F R U R' U' F'",
        "R' U' R U' R' U2 R F R U R' U' F'",
        "y R' U' F' U F R",
        "Fw R U R' U' Fw'",
        "F R U R' U' F'",
        "R' U' R' F R F' U R",
        "F' L' U' L U L' U' L U F",
        "F R U R' U' R U R' U' F'",
        "y2 Rw U' Rw2 U Rw2 U Rw2 U' Rw",
        "y2 R' F R2 B' R2 F' R2 B R'",
        "Fw R U R' U' R U R' U' Fw'",
        "R' U' R U' R' U F' U F R",
        "y2 Lw' U' L U' L' U L U' L' U2 Lw",
        "Rw U R' U R U' R' U R U2 Rw'",
        "y F U' R2 D R' U2 R D' R2 U F'",
        "F R U R' U' R F' Rw U R' U' Rw'",
        "R U R' U' M' U R U' Rw'",
        "x R' U R' D2 R U' R' D2 R2",
        "x R2 D2 R U R' D2 R U' R x'",
        "y x' R U' R' D R U R' D' R U R' D R U' R' D' x",
        "y R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
        "D' R2 U R' U R' U' R U' R2 U' D R' U R",
        "R' U' R U D' R2 U R' U R U' R U' R2 D",
        "y2 R2 F2 R U2 R U2 R' F R U R' U' R' F R2",
        "R U R' U' D R2 U' R U' R' U R' U R2 D'",
        "M2 U M2 U2 M2 U M2",
        "L' U' L F L' U' L U L F' L2 U L",
        "R U R' F' R U R' U' R' F R2 U' R'",
        "F' R U R' U' R' F R2 F U' R' U' R U F' R'",
        "Rw' D' F Rw U' Rw' F' D Rw2 U Rw' U' Rw' F Rw F'",
        "y R U R' F' R U2 R' U2 R' F R U R U2 R'",
        "R' U2 R U2 R' F R U R' U' R' F' R2",
        "R U R' U' R' F R2 U' R' U' R U R' F'",
        "y2 M2 U M U2 M' U M2",
        "y2 M2 U' M U2 M' U' M2",
        "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2",
        "F R U' R' U' R U R' F' R U R' U' R' F R F'",
        "M' U' M2 U' M2 U' M' U2 M2"
    ];

    let solutions = [];

$(function() {
    const len = myAlgs.length;
    for (let a=0; a<len; a++) {
        myAlgs.push(inverse(myAlgs[a]));
    }
    getFLL();
});
        
$(window).resize(function(){
    
});

function getFLL() {
    let arrIndex = 0;
    for (let alg1 of myAlgs) {
        for (let alg2 of myAlgs) {
            console.log("checking: "+alg2);
            if (checkFrurufState(applyMoves(alg1,alg2))) {
                solutions[arrIndex] = alg2;
            }
        }
        arrIndex++;
    }
    console.log(solutions);
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