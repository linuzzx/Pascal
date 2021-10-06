let canvasSize = 0;
let auf = "";
let tabContents = [];
let currentTab = 0;

const frurufState1 = [
    "#505050","#505050","white","white","white","white","#505050","#505050","white",
    "white","#505050","white",
    "#505050","white","#505050",
    "#505050","#505050","#505050",
    "#505050","white","#505050"
];
const frurufState2 = [
    "#505050","white","#505050","#505050","white","#505050","white","white","white",
    "#505050","white","#505050",
    "#505050","#505050","#505050",
    "#505050","white","#505050",
    "white","#505050","white"
];
const frurufState3 = [
    "white","#505050","#505050","white","white","white","white","#505050","#505050",
    "#505050","#505050","#505050",
    "#505050","white","#505050",
    "white","#505050","white",
    "#505050","white","#505050"
];
const frurufState4 = [
    "white","white","white","#505050","white","#505050","#505050","white","#505050",
    "#505050","white","#505050",
    "white","#505050","white",
    "#505050","white","#505050",
    "#505050","#505050","#505050"
];

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
let f2lsInversed = [];
let f2lInversed = [];

let triggers = [
    "R U R'",
    "R U2 R'",
    "R U R' U'",
    "R' F R F'",
    "F R' F' R"
];

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

let f2ls = [];

let solutions = [];
let solutionsF2l = [];
let myAlgs = [];
let myF2lAlgs = [];

$(function() {
    tabContents = $(".tabContent");
    makeUnderline();
    showFLL();
    adjustSize();

    getAlgs();
});
        
$(window).resize(function(){
    adjustSize();
    updateUnderline(currentTab);
});

function adjustSize() {
    if ($("#content").width() > $("#content").height()) {
        canvasSize = $("#content").height() / 5;
        $("th, td").css("font-size", $("#content").height() / 25);
    }
    else {
        canvasSize = $("#content").width() / 5;
        $("th, td").css("font-size", $("#content").width() / 15);
    }
}

function getAlgs() {
    
    for (let i=0; i<olls.length; i++) {
        ollsInversed.push(inverse(olls[i]));
    }
    
    let i = 0;
    for (let raw of rawF2l) {
        for (let oll of olls) {
            f2ls.push(oll+" "+raw.split("/")[0].trim());

            /*if (f2ls[i].includes("y2")) {
                f2ls[i] = f2ls[i] + " y2";
            }
            else if (f2ls[i].includes("y'")) {
                f2ls[i] = f2ls[i] + " y";
            }
            else if (f2ls[i].includes("y")) {
                f2ls[i] = f2ls[i] + " y'";
            }
            if (f2ls[i].includes("Dw2")) {
                f2ls[i] = f2ls[i] + " y2";
            }
            else if (f2ls[i].includes("Dw'")) {
                f2ls[i] = f2ls[i] + " y'";
            }
            else if (f2ls[i].includes("Dw")) {
                f2ls[i] = f2ls[i] + " y";
            }*/
            i++;
        }
    }
    
    for (let i=0; i<f2ls.length; i++) {
        f2lsInversed.push(inverse(f2ls[i]));
    }
    
    for (let i=0; i<f2l.length; i++) {
        f2l[i] = f2l[i].trim();
    }
    
    for (let i=0; i<f2l.length; i++) {
        f2lInversed.push(inverse(f2l[i]));
    }
    console.log(f2lsInversed);
    myAlgs = olls.concat(algs, other, ollsInversed, plls).sort().sort(function(a, b){return a.split(" ").length - b.split(" ").length});
    myF2lAlgs = triggers.concat(f2ls, f2lsInversed, f2l, f2lInversed).sort().sort(function(a, b){return a.split(" ").length - b.split(" ").length});

    getFLL();
    getFLS();

    adjustSize();
}

function getFLL() {
    let arrIndex = 0;

    //Kode for å generere algs
    /*for (let alg1 of ollsInversed) {
        outerLoop:
        for (let alg2 of myAlgs) {
            for (let u of [[""], ["U "], ["U' "], ["U2 "]]) {
                scrambleCube(alg1);
                auf = "";
                if (checkFrurufState(applyMoves(u+alg2))) {
                    solutions[arrIndex] = u+alg2+auf;
                    break outerLoop;
                }
            }
        }
        arrIndex++;
    }*/

    let out = "<tr><th>#</th><th>Setup</th><th>Alg</th></tr>";
    for (let i = 0; i < fll.length; i++) {
        out += "<tr><th>"+(i+1)+"</th><td><canvas class='canvasCase' id='case"+i+"' width='"+canvasSize+"' height='"+canvasSize+"' style='margin: auto;'></canvas><br>"+ollsInversed[i]+"</td><td>"+fll[i]+"</td></tr>";
    }
    
    /*for (let i = 0; i < ollsInversed.length; i++) {
        out += "<tr><th>"+(i+1)+"</th><td><canvas class='canvasCase' id='case"+i+"' width='"+canvasSize+"' height='"+canvasSize+"' style='margin: auto;'></canvas><br>"+ollsInversed[i]+"</td><td>"+solutions[i]+"</td></tr>";
    }*/
    $("#algTable").html(out);

    for (let i = 0; i < ollsInversed.length; i++) {
        drawCube("#case"+i, ollsInversed[i]);
    }
}

function getFLS() {
    let arrIndex = 0;

    //Kode for å generere algs
    /*for (let alg1 of f2lsInversed) {
        outerLoop:
        for (let alg2 of myF2lAlgs) {
            for (let u of [[""], ["U "], ["U' "], ["U2 "]]) {
                scrambleCube(alg1);
                auf = "";
                if (checkFrurufState(applyMoves(u+alg2))) {
                    solutionsF2l[arrIndex] = u+alg2+auf;
                    break outerLoop;
                }
            }
        }
        arrIndex++;
    }
    for (let alg1 of f2lsInversed) {
        outerLoop:
        for (let alg2 of triggers) {
            for (let u1 of [[""], ["U "], ["U' "], ["U2 "]]) {
                for (let alg3 of triggers) {
                    for (let u2 of [[" "], [" U "], [" U' "], [" U2 "]]) {
                        scrambleCube(alg1);
                        auf = "";
                        if (checkFrurufState(applyMoves(u1+alg2+u2+alg3))) {
                            solutionsF2l[arrIndex] = u1+alg2+u2+alg3+auf;
                            break outerLoop;
                        }
                    }
                }
            }
        }
        arrIndex++;
    }*/
    let out = "<tr><th>#</th><th>Setup</th><th>Alg</th></tr>";
    for (let i = 0; i < fls.length; i++) {
        out += "<tr><th>"+(i+1)+"</th><td><canvas class='canvasCase' id='caseF2l"+i+"' width='"+canvasSize+"' height='"+((canvasSize / 5) * 7)+"' style='margin: auto;'></canvas><br>"+f2lsInversed[i]+"</td><td>"+fls[i]+"</td></tr>";
    }
    
    /*for (let i = 0; i < f2lsInversed.length; i++) {
        out += "<tr><th>"+(i+1)+"</th><td><canvas class='canvasCase' id='caseF2l"+i+"' width='"+canvasSize+"' height='"+((canvasSize / 5) * 7)+"' style='margin: auto;'></canvas><br>"+f2lsInversed[i]+"</td><td>"+solutionsF2l[i]+"</td></tr>";
    }*/
    $("#algFlsTable").html(out);

    for (let i = 0; i < f2lsInversed.length; i++) {
        drawCubeF2l("#caseF2l"+i, f2lsInversed[i]);
    }
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

    if (state.join(",") === frurufState1.join(",")) {
        isFrurufState = true;
    }
    else if (state.join(",") === frurufState2.join(",")) {
        auf = " U'";
        isFrurufState = true;
    }
    else if (state.join(",") === frurufState3.join(",")) {
        auf = " U2";
        isFrurufState = true;
    }
    else if (state.join(",") === frurufState4.join(",")) {
        auf = " U";
        isFrurufState = true;
    }

    return isFrurufState;
}

function hideAll() {
    for (let c of tabContents) {
        $(c).css("display", "none");
    }
}

function showFLL() {
    currentTab = 0;
    hideAll();
    $("#tabFLL").css("display", "block");
    $("#underline").css("margin-left", ($(window).width() / 6));
    $("#underline").css("transition", "margin-left 0.1s linear");
    $("#underline").css("-webkit-transition", "margin-left 0.1s linear");
}

function showFLS() {
    currentTab = 1;
    hideAll();
    $("#tabFLS").css("display", "block");
    $("#underline").css("margin-left", ($(window).width() / 6)*4);
    $("#underline").css("transition", "margin-left 0.1s linear");
    $("#underline").css("-webkit-transition", "margin-left 0.1s linear");
}

function makeUnderline() {
    $("#underline").css("height", "5px");
    $("#underline").css("width", $(window).width() / 6);
    $("#underline").css("margin-left", $(window).width() / 6);
}

function updateUnderline(tab) {
    $("#underline").css("width", $(window).width() / 6);
    
    if (tab === 0) {
        $("#underline").css("margin-left", $(window).width() / 6);
    }
    else if (tab === 1) {
        $("#underline").css("margin-left", ($(window).width() / 6)*4);
    }
}