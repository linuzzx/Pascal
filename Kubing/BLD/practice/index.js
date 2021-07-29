let showingSolution = false;
let currentPiece = "";

let uColor = "white";
let lColor = "orange";
let fColor = "green";
let rColor = "red";
let bColor = "blue";
let dColor = "yellow";

if (localStorage.getItem("uColor") !== null) {
    uColor = localStorage.getItem("uColor");
    lColor = localStorage.getItem("lColor");
    fColor = localStorage.getItem("fColor");
    rColor = localStorage.getItem("rColor");
    bColor = localStorage.getItem("bColor");
    dColor = localStorage.getItem("dColor");
}

let uArr = [];
let ufArr = [];
let ufrArr = [];
let fArr = [];
let fuArr = [];
let furArr = [];
let rArr = [];
let rufArr = [];
let lastPiece = "";

$(function () {
    makeArrays();
    $("#imgU").attr("src", "./resources/u_"+colorAsLetter(uColor)+".png");
    $("#imgF").attr("src", "./resources/f_"+colorAsLetter(fColor)+".png");
    $("#imgR").attr("src", "./resources/r_"+colorAsLetter(rColor)+".png");

    $(window).keypress(function(e) {
        if (e.keyCode === 32 || e.keyCode === 13) {
            showOrNext();
        }
    });

    nextPiece()
});

function makeArrays() {
    const colors = [colorAsLetter(uColor), colorAsLetter(lColor), colorAsLetter(fColor),
                    colorAsLetter(rColor), colorAsLetter(bColor), colorAsLetter(dColor)];
    for (let c of colors) {
        uArr.push("./resources/u_"+c+".png");
        ufArr.push("./resources/uf_"+c+".png");
        ufrArr.push("./resources/ufr_"+c+".png");
        fArr.push("./resources/f_"+c+".png");
        fuArr.push("./resources/fu_"+c+".png");
        furArr.push("./resources/fur_"+c+".png");
        rArr.push("./resources/r_"+c+".png");
        rufArr.push("./resources/ruf_"+c+".png");
    }
}

function nextPiece() {
    $("#solution").css("display", "none");
    showingSolution = false;
    resetCube();
    const piece = pieces[Math.floor(Math.random() * pieces.length)];
    if (piece === "" || piece === lastPiece || piece === "UF" || piece === "FU" ||
        piece === "UFR" || piece === "FUR" || piece === "RUF") {
        nextPiece();
    }
    else {
        currentPiece = piece;
        paintCube(piece);
        lastPiece = piece;
    }
}

function resetCube() {
    $("#imgUF").attr("src","");
    $("#imgFU").attr("src","");
    $("#imgUFR").attr("src","");
    $("#imgFUR").attr("src","");
    $("#imgRUF").attr("src","");

    $("#imgUF").css("display","none");
    $("#imgUFR").css("display","none");
    $("#imgFU").css("display","none");
    $("#imgFUR").css("display","none");
    $("#imgRUF").css("display","none");
}

function paintCube(piece) {
    if (piece.length === 2) {
        paintEdge(piece);
    }
    else {
        paintCorner(piece);
    }
}

function paintEdge(piece) {
    $("#imgUF").css("display", "block");
    $("#imgFU").css("display", "block");

    const w = 0;
    const o = 1;
    const g = 2;
    const r = 3;
    const b = 4;
    const y = 5;

    switch (piece) {
        case "UB":
            $("#imgUF").attr("src",ufArr[w]);
            $("#imgFU").attr("src",fuArr[b]);
            break;
        case "UR":
            $("#imgUF").attr("src",ufArr[w]);
            $("#imgFU").attr("src",fuArr[r]);
            break;
        case "UF":
            $("#imgUF").attr("src",ufArr[w]);
            $("#imgFU").attr("src",fuArr[g]);
            break;
        case "UL":
            $("#imgUF").attr("src",ufArr[w]);
            $("#imgFU").attr("src",fuArr[o]);
            break;
        case "LU":
            $("#imgUF").attr("src",ufArr[o]);
            $("#imgFU").attr("src",fuArr[w]);
            break;
        case "LF":
            $("#imgUF").attr("src",ufArr[o]);
            $("#imgFU").attr("src",fuArr[g]);
            break;
        case "LD":
            $("#imgUF").attr("src",ufArr[o]);
            $("#imgFU").attr("src",fuArr[y]);
            break;
        case "LB":
            $("#imgUF").attr("src",ufArr[o]);
            $("#imgFU").attr("src",fuArr[b]);
            break;
        case "FU":
            $("#imgUF").attr("src",ufArr[g]);
            $("#imgFU").attr("src",fuArr[w]);
            break;
        case "FR":
            $("#imgUF").attr("src",ufArr[g]);
            $("#imgFU").attr("src",fuArr[r]);
            break;
        case "FD":
            $("#imgUF").attr("src",ufArr[g]);
            $("#imgFU").attr("src",fuArr[y]);
            break;
        case "FL":
            $("#imgUF").attr("src",ufArr[g]);
            $("#imgFU").attr("src",fuArr[o]);
            break;
        case "RU":
            $("#imgUF").attr("src",ufArr[r]);
            $("#imgFU").attr("src",fuArr[w]);
            break;
        case "RB":
            $("#imgUF").attr("src",ufArr[r]);
            $("#imgFU").attr("src",fuArr[b]);
            break;
        case "RD":
            $("#imgUF").attr("src",ufArr[r]);
            $("#imgFU").attr("src",fuArr[y]);
            break;
        case "RF":
            $("#imgUF").attr("src",ufArr[r]);
            $("#imgFU").attr("src",fuArr[g]);
            break;
        case "BU":
            $("#imgUF").attr("src",ufArr[b]);
            $("#imgFU").attr("src",fuArr[w]);
            break;
        case "BL":
            $("#imgUF").attr("src",ufArr[b]);
            $("#imgFU").attr("src",fuArr[o]);
            break;
        case "BD":
            $("#imgUF").attr("src",ufArr[b]);
            $("#imgFU").attr("src",fuArr[y]);
            break;
        case "BR":
            $("#imgUF").attr("src",ufArr[b]);
            $("#imgFU").attr("src",fuArr[r]);
            break;
        case "DF":
            $("#imgUF").attr("src",ufArr[y]);
            $("#imgFU").attr("src",fuArr[g]);
            break;
        case "DR":
            $("#imgUF").attr("src",ufArr[y]);
            $("#imgFU").attr("src",fuArr[r]);
            break;
        case "DB":
            $("#imgUF").attr("src",ufArr[y]);
            $("#imgFU").attr("src",fuArr[b]);
            break;
        case "DL":
            $("#imgUF").attr("src",ufArr[y]);
            $("#imgFU").attr("src",fuArr[o]);
            break;
    }
}

function paintCorner(piece) {
    console.log(piece)
    $("#imgUFR").css("display", "block");
    $("#imgFUR").css("display", "block");
    $("#imgRUF").css("display", "block");

    const w = 0;
    const o = 1;
    const g = 2;
    const r = 3;
    const b = 4;
    const y = 5;

    switch (piece) {
        case "UBL":
            $("#imgUFR").attr("src",ufrArr[w]);
            $("#imgFUR").attr("src",furArr[b]);
            $("#imgRUF").attr("src",rufArr[o]);
            break;
        case "UBR":
            $("#imgUFR").attr("src",ufrArr[w]);
            $("#imgFUR").attr("src",furArr[r]);
            $("#imgRUF").attr("src",rufArr[b]);
            break;
        case "UFR":
            $("#imgUFR").attr("src",ufrArr[w]);
            $("#imgFUR").attr("src",furArr[g]);
            $("#imgRUF").attr("src",rufArr[r]);
            break;
        case "UFL":
            $("#imgUFR").attr("src",ufrArr[w]);
            $("#imgFUR").attr("src",furArr[o]);
            $("#imgRUF").attr("src",rufArr[g]);
            break;
        case "LUB":
            $("#imgUFR").attr("src",ufrArr[o]);
            $("#imgFUR").attr("src",furArr[w]);
            $("#imgRUF").attr("src",rufArr[b]);
            break;
        case "LUF":
            $("#imgUFR").attr("src",ufrArr[o]);
            $("#imgFUR").attr("src",furArr[g]);
            $("#imgRUF").attr("src",rufArr[w]);
            break;
        case "LDF":
            $("#imgUFR").attr("src",ufrArr[o]);
            $("#imgFUR").attr("src",furArr[y]);
            $("#imgRUF").attr("src",rufArr[g]);
            break;
        case "LDB":
            $("#imgUFR").attr("src",ufrArr[o]);
            $("#imgFUR").attr("src",furArr[b]);
            $("#imgRUF").attr("src",rufArr[y]);
            break;
        case "FUL":
            $("#imgUFR").attr("src",ufrArr[g]);
            $("#imgFUR").attr("src",furArr[w]);
            $("#imgRUF").attr("src",rufArr[o]);
            break;
        case "FUR":
            $("#imgUFR").attr("src",ufrArr[g]);
            $("#imgFUR").attr("src",furArr[r]);
            $("#imgRUF").attr("src",rufArr[w]);
            break;
        case "FDR":
            $("#imgUFR").attr("src",ufrArr[g]);
            $("#imgFUR").attr("src",furArr[y]);
            $("#imgRUF").attr("src",rufArr[r]);
            break;
        case "FDL":
            $("#imgUFR").attr("src",ufrArr[g]);
            $("#imgFUR").attr("src",furArr[o]);
            $("#imgRUF").attr("src",rufArr[y]);
            break;
        case "RUF":
            $("#imgUFR").attr("src",ufrArr[r]);
            $("#imgFUR").attr("src",furArr[w]);
            $("#imgRUF").attr("src",rufArr[g]);
            break;
        case "RUB":
            $("#imgUFR").attr("src",ufrArr[r]);
            $("#imgFUR").attr("src",furArr[b]);
            $("#imgRUF").attr("src",rufArr[w]);
            break;
        case "RDB":
            $("#imgUFR").attr("src",ufrArr[r]);
            $("#imgFUR").attr("src",furArr[y]);
            $("#imgRUF").attr("src",rufArr[b]);
            break;
        case "RDF":
            $("#imgUFR").attr("src",ufrArr[r]);
            $("#imgFUR").attr("src",furArr[g]);
            $("#imgRUF").attr("src",rufArr[y]);
            break;
        case "BUR":
            $("#imgUFR").attr("src",ufrArr[b]);
            $("#imgFUR").attr("src",furArr[w]);
            $("#imgRUF").attr("src",rufArr[r]);
            break;
        case "BUL":
            $("#imgUFR").attr("src",ufrArr[b]);
            $("#imgFUR").attr("src",furArr[o]);
            $("#imgRUF").attr("src",rufArr[w]);
            break;
        case "BDL":
            $("#imgUFR").attr("src",ufrArr[b]);
            $("#imgFUR").attr("src",furArr[y]);
            $("#imgRUF").attr("src",rufArr[o]);
            break;
        case "BDR":
            $("#imgUFR").attr("src",ufrArr[b]);
            $("#imgFUR").attr("src",furArr[r]);
            $("#imgRUF").attr("src",rufArr[y]);
            break;
        case "DFL":
            $("#imgUFR").attr("src",ufrArr[y]);
            $("#imgFUR").attr("src",furArr[g]);
            $("#imgRUF").attr("src",rufArr[o]);
            break;
        case "DFR":
            $("#imgUFR").attr("src",ufrArr[y]);
            $("#imgFUR").attr("src",furArr[r]);
            $("#imgRUF").attr("src",rufArr[g]);
            break;
        case "DBR":
            $("#imgUFR").attr("src",ufrArr[y]);
            $("#imgFUR").attr("src",furArr[b]);
            $("#imgRUF").attr("src",rufArr[r]);
            break;
        case "DBL":
            $("#imgUFR").attr("src",ufrArr[y]);
            $("#imgFUR").attr("src",furArr[o]);
            $("#imgRUF").attr("src",rufArr[b]);
            break;
    }
}

function showOrNext() {
    if (!showingSolution) {
        showSolution();
    }
    else {
        nextPiece();
    }
}

function showSolution() {
    showingSolution = true;
    $("#solution").css("display", "block");
    $("#solution").text(getLetter(currentPiece));
}

function colorAsLetter(color) {
    switch (color) {
        case "white":
            return "W";
        case "orange":
            return "O";
        case "green":
            return "G";
        case "red":
            return "R";
        case "blue":
            return "B";
        case "yellow":
            return "Y";
    }
}