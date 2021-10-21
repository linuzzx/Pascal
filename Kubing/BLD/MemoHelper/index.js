let letters = "abcdefghijklmnopqrstuvwx".toUpperCase().split("");
let numOfCubes = 1;
const numOfLetters3BLD = 20;
const numOfLetters4BLD = 46;
const numOfLetters5BLD = 86;
let first = false;
let start = 0;
let interval = null;
let time = "00.00";
let edgeBuffer = localStorage.getItem("edgeBuffer") || "UF";
let cornerBuffer = localStorage.getItem("cornerBuffer") || "UFR";
let letterSchemeOption = localStorage.getItem("letterSchemeOption") || "Speffz";
let cubeType = localStorage.getItem("cubeType") || "3BLD";
let grouping = localStorage.getItem("grouping") || "1";
let checkable = false;

let edgeSolution = [];
let edgesSol = [];
let edgesFlipped = [];
let cornerSolution = [];
let cornersSol = [];
let cornersTwisted = [];

$(function() {
    $("#inpScramble").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getMemo();
        }
    });
    const fontSize = ($("#options").css("font-size").split("px")[0] * 0.75)

    $("#inpScramble").css("font-size", fontSize);

    getOptions();
    adjustSize();
});
        
$(window).resize(function(){
    adjustSize();
});

function getMemo() {
    let memo = "";
        
    scrambleCube($("#inpScramble").val());
        
    edgeSolution = getEdgeSolution();
    cornerSolution = getCornerSolution();

    edgesSol = edgeSolution.slice(0);

    edgesFlipped = [];
    if (edgeSolution.join(" ").includes(";")) {
        edgesSol = edgeSolution.slice(0, edgeSolution.indexOf(";"));
        edgesFlipped = edgeSolution.slice(edgeSolution.indexOf(";")+1);
    }

    cornersSol = cornerSolution.slice(0);

    cornersTwisted = [];
    if (cornerSolution.join(" ").includes(";")) {
        cornersSol = cornerSolution.slice(0, cornerSolution.indexOf(";"));
        cornersTwisted = cornerSolution.slice(cornerSolution.indexOf(";")+1);
    }

    for (let i=0; i<edgesSol.length; i++) {
        memo += edgesSol[i] + ((i+1) % grouping === 0 ? " ":"");
    }
    memo = memo.trim() + " ";
    for (let e of edgesFlipped) {
        if (e !== "") {
            memo += "("+e+")";
        }
    }
    memo = memo.trim() + " ";
    for (let i=0; i<cornersSol.length; i++) {
        memo += cornersSol[i] + ((i+1) % grouping === 0 ? " ":"");
    }
    memo = memo.trim() + " ";
    for (let c of cornersTwisted) {
        if (c !== "") {
            memo += "("+c+")";
        }
    }
    memo = memo.trim();

    if (memo === "") {
        memo = "Illegal scramble";
    }
    else {
        memo = "Memo:<br>"+memo;
    }

    $("#memo").html(memo);

    if (memo !== "Illegal scramble") {
        if (edgeBuffer === "DF" && cornerBuffer === "UBL") {
            getM2OP();
        }
        else if (edgeBuffer === "UF" && cornerBuffer === "UFR") {
            get3style();
        }
    }
}

function getOptions() {
    const options = "<label for='selectEdgeBuffer'>Edge buffer&nbsp<select id='selectEdgeBuffer' onchange='setEdgeBuffer(this.value)'><option value='UF'>UF</option><option value='DF'>DF</option></select>&nbsp</label>"+
                    "<label for='selectCornerBuffer'>Corner buffer&nbsp<select id='selectCornerBuffer' onchange='setCornerBuffer(this.value)'><option value='UFR'>UFR</option><option value='UBL'>UBL</option></select>&nbsp</label>"+
                    "<label for='selectLetterScheme'>Letter scheme&nbsp<select id='selectLetterScheme' onchange='setLetterScheme(this.value)'><option value='Speffz'>Speffz</option><option value='Einar'>Einar's scheme</option></select>&nbsp</label>"+
                    "<label for='selectGrouping'>Grouping&nbsp</label><select id='selectGrouping' onchange='setGrouping(this.value)'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select>&nbsp</label>";
    
    $("#options").html(options);

    $("#selectEdgeBuffer").val(edgeBuffer);
    $("#selectCornerBuffer").val(cornerBuffer);
    $("#selectLetterScheme").val(letterSchemeOption);
    $("#selectGrouping").val(grouping);

    changeEdgeBuffer(edgeBuffer);
    changeCornerBuffer(cornerBuffer);
    changeLetterScheme(letterSchemeOption);
}

function setEdgeBuffer(eb) {
    edgeBuffer = eb;
    localStorage.setItem("edgeBuffer", edgeBuffer);

    changeEdgeBuffer(eb);
}

function setCornerBuffer(cb) {
    cornerBuffer = cb;
    localStorage.setItem("cornerBuffer", cornerBuffer);

    changeCornerBuffer(cb);
}

function setLetterScheme(ls) {
    letterSchemeOption = ls;
    localStorage.setItem("letterSchemeOption", letterSchemeOption);

    changeLetterScheme(ls);
}

function setGrouping(g) {
    grouping = g;
    localStorage.setItem("grouping", grouping);
}

function adjustSize() {
    const inpFontSize = $("#btnGetMemo").css("font-size").split("px")[0]*1.5;

    $("#inpScramble").css("width", "80%");
    $("#selectCubeType").css("font-size", inpFontSize);
    $("#selectGrouping").css("font-size", inpFontSize);
    $("label").css("font-size", inpFontSize);
}

function getM2OP() {
    let eSol = [];
    let fSol = [];
    let cSol = [];
    let tSol = [];
    let out = "<br>Solution:<br>";

    let eKeys = Object.keys(m2);
    let eValues = Object.values(m2);
    let fKeys = Object.keys(flippedCommsM2);
    let fValues = Object.values(flippedCommsM2);
    let cKeys = Object.keys(op);
    let cValues = Object.values(op);
    let tKeys = Object.keys(twistedCommsOP);
    let tValues = Object.values(twistedCommsOP);

    for (let e of edgesSol.join("").split("")) {
        eSol.push(edges[letterSchemeEdges.indexOf(e)]);
    }
    for (let s of eSol) {
        out += eValues[eKeys.indexOf(s.toUpperCase())]+"<br>";
    }
    for (let c of cornersSol.join("").split("")) {
        cSol.push(corners[letterSchemeCorners.indexOf(c.toUpperCase())]);
    }
    for (let s of cSol) {
        out += cValues[cKeys.indexOf(s.toUpperCase())]+"<br>";
    }
    //Parity
    if (edgesSol.length % 2 === 1) {
        out += eValues[eKeys.indexOf("Parity")]+"<br>";
    }
    
    for (let f of edgesFlipped) {
        fSol.push(edges[letterSchemeEdges.indexOf(f.split("")[0])]);
    }
    for (let s of fSol) {
        out += fValues[fKeys.indexOf(s.toUpperCase())]+"<br>";
    }
    for (let t of cornersTwisted) {
        tSol.push(corners[letterSchemeCorners.indexOf(t.toUpperCase().split("")[0])]);
    }
    for (let s of tSol) {
        out += tValues[tKeys.indexOf(s.toUpperCase())]+"<br>";
    }

    $("#solution").html(out);
}

function get3style() {
    let out = "";
}