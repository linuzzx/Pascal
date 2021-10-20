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
    const fontSize = ($("#memo").css("font-size").split("px")[0] * 0.75)

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

    $("#result").html(memo);
}

function getOptions() {
    const options = "<label for='selectEdgeBuffer'>Edge buffer&nbsp<select id='selectEdgeBuffer' onchange='setEdgeBuffer(this.value)'><option value='UF'>UF</option><option value='DF'>DF</option></select>&nbsp</label>"+
                    "<label for='selectCornerBuffer'>Corner buffer&nbsp<select id='selectCornerBuffer' onchange='setCornerBuffer(this.value)'><option value='UFR'>UFR</option><option value='UBL'>UBL</option></select>&nbsp</label>"+
                    "<label for='selectLetterScheme'>Letter scheme&nbsp<select id='selectLetterScheme' onchange='setLetterScheme(this.value)'><option value='Speffz'>Speffz</option><option value='Einar'>Einar's scheme</option></select>&nbsp</label>"+
                    "<label for='selectCubeType'>Event&nbsp<select id='selectCubeType' onchange='setCubeType(this.value)'><option value='3BLD'>3BLD</option><option value='4BLD'>4BLD (Not finished)</option><option value='5BLD'>5BLD (Not finished)</option></select>&nbsp</label>"+
                    "<label for='selectGrouping'>Grouping&nbsp</label><select id='selectGrouping' onchange='setGrouping(this.value)'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select>&nbsp</label>";
    
    $("#memo").html(options);

    $("#selectEdgeBuffer").val(edgeBuffer);
    $("#selectCornerBuffer").val(cornerBuffer);
    $("#selectLetterScheme").val(letterSchemeOption);
    $("#selectCubeType").val(cubeType);
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

function setCubeType(ct) {
    cubeType = ct;
    localStorage.setItem("cubeType", cubeType);
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