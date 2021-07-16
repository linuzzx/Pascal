let showing = "corners";
let showingLetters = false;
let selectedButton = null;
let selectedTopBtn = localStorage.getItem("selectedTopBtn") || $("#btnTopW");
let selectedTopColor = localStorage.getItem("selectedTopColor") || "white";
let selectedFrontBtn = localStorage.getItem("selectedFrontBtn") || $("#btnFrontG");
let selectedFrontColor = localStorage.getItem("selectedFrontColor") || "green";

const speffzArr = ['A','A','B','D',' ','B','D','C','C',
                    'E','E','F','H',' ','F','H','G','G',
                    'I','I','J','L',' ','J','L','K','K',
                    'M','M','N','P',' ','N','P','O','O',
                    'Q','Q','R','T',' ','R','T','S','S',
                    'U','U','V','X',' ','V','X','W','W'];

let customArr = speffzArr;
if (localStorage.getItem("customArr") !== null) {
    customArr = localStorage.getItem("customArr").split(";");
}

$(function () {
    $("#cornerContent0").css("display", "block");

    $("#innerLetterSchemeEdit").on("click", function (e) {
        e.stopPropagation();
    });

    let size = 0;

    if ($(window).width() >= $(window).height()) {
        size = $(window).width() / 60;
    }
    else {
        size = $(window).height() / 60;
    }

    $("#btnGrid").width(size * 12);
    $("#btnGrid :button").width(size);
    $("#btnGrid :button").height(size);

    $("#btnColors :button").width(size);
    $("#btnColors :button").height(size);

    $(window).keypress(function(e) {
        if (selectedButton !== null) {
            $(selectedButton).html(String.fromCharCode(e.keyCode).toUpperCase());
            $("#btnGrid :button").css("font-weight", "normal");

            saveLetters();
        }
    });
    updateLetters();

    selectTopColor(selectedTopBtn, selectedTopColor);
    selectFrontColor(selectedFrontBtn, selectedFrontColor);
});

function showLetterScheme() {
    showingLetters = true;
    $("#letterSchemeEdit").css("display", "block");
}

function closeLetterScheme() {
    showingLetters = false;
    selectedButton = null;
    $("#btnGrid :button").css("font-weight", "normal");
    $("#letterSchemeEdit").css("display", "none");
}

function showCorners() {
    if (showing === "edges") {
        showing = "corners";

        $("#cornerMenu").css("display", "grid");
        $("#cornerContent").css("display", "block");
        $("#edgeMenu").css("display", "none");
        $("#edgeContent").css("display", "none");

        $(".cornerContentClass").css("display", "none");
        $(".edgeContentClass").css("display", "none");
        $("#cornerContent0").css("display", "block");
    }
}

function showEdges() {
    if (showing === "corners") {
        showing = "edges";

        $("#cornerMenu").css("display", "none");
        $("#cornerContent").css("display", "none");
        $("#edgeMenu").css("display", "grid");
        $("#edgeContent").css("display", "block");

        $(".cornerContentClass").css("display", "none");
        $(".edgeContentClass").css("display", "none");
        $("#edgeContent0").css("display", "block");
    }
}

function chooseCorner(val) {
    $(".cornerContentClass").css("display", "none");

    $("#cornerContent" + val).css("display", "block");
}

function chooseEdge(val) {
    $(".edgeContentClass").css("display", "none");

    $("#edgeContent" + val).css("display", "block");
}

function changeLetter(button) {
    $("#btnGrid :button").css("font-weight", "normal");
    $(button).css("font-weight", "bold");
    selectedButton = button;
}

function speffz() {
    let i = 0;
    for (let b of $("#btnGrid :button")) {
        $(b).html(speffzArr[i]);
        i++;
    }
    saveLetters();
}

function saveLetters() {
    let custom = "";
    let i = 0;
    for (let b of $("#btnGrid :button")) {
        if (i === 53) {
            custom += $(b).html();
        }
        else {
            custom += $(b).html() + ";";
        }
        i++;
    }
    localStorage.setItem("customArr", custom);
}

function updateLetters() {
    let i = 0;
    for (let b of $("#btnGrid :button")) {
        $(b).html(customArr[i]);
        i++;
    }
}

function oppositeColor(color) {
    switch (color) {
        case 'white':
            return 'yellow';
        case 'yellow':
            return 'white';
        case 'green':
            return 'blue';
        case 'blue':
            return 'green';
        case 'red':
            return 'orange';
        case 'orange':
            return 'red';
    }
}

function cleanColor() {
    selectedTopColor = "white";
    selectedFrontColor = "green";
    localStorage.setItem("selectedTopBtn", "btnTopW");
    localStorage.setItem("selectedTopColor", selectedTopColor);
    localStorage.setItem("selectedFrontBtn", "btnFrontG");
    localStorage.setItem("selectedFrontColor", selectedFrontColor);

    $(".topBtn").css("box-shadow", "none");
    $("#btnTopW").css("box-shadow", "0 0 5px 1px white");

    $(".frontBtn").css("box-shadow", "none");
    $("#btnFrontG").css("box-shadow", "0 0 5px 1px green");

    updateColor();
}

function selectTopColor(button, color) {
    if (selectedFrontColor !== color && selectedFrontColor !== oppositeColor(color)) {
        selectedTopBtn = button;
        selectedTopColor = color;

        localStorage.setItem("selectedTopBtn", selectedTopBtn);
        localStorage.setItem("selectedTopColor", selectedTopColor);

        $(".topBtn").css("box-shadow", "none");
        $("#"+button).css("box-shadow", "0 0 5px 1px "+color);

        updateColor();
    }
    else {
        cleanColor();
    }
}

function selectFrontColor(button, color) {
    if (selectedTopColor !== color && selectedTopColor !== oppositeColor(color)) {
        selectedFrontBtn = button;
        selectedFrontColor = color;

        localStorage.setItem("selectedFrontBtn", selectedFrontBtn);
        localStorage.setItem("selectedFrontColor", selectedFrontColor);

        $(".frontBtn").css("box-shadow", "none");
        $("#" + button).css("box-shadow", "0 0 5px 1px " + color);

        updateColor();
    }
    else {
        cleanColor();
    }
}

function updateColor() {

    let colorArr = [];

    let w = 'white';
    let o = 'orange';
    let g = 'green';
    let r = 'red';
    let b = 'blue';
    let y = 'yellow';

    switch (selectedTopColor) {
        case "white":
            colorArr = [w,o,g,r,b,y];
            break;
        case "yellow":
            colorArr = [y,r,g,o,b,w];
            break;
        case "orange":
            colorArr = [o,y,g,w,b,r];
            break;
        case "green":
            colorArr = [g,o,y,r,w,b];
            break;
        case "red":
            colorArr = [r,w,g,y,b,o];
            break;
        case "blue":
            colorArr = [b,o,w,r,y,g];
            break;
    }

    let cU = colorArr[0];
    let cL = colorArr[1];
    let cF = colorArr[2];
    let cR = colorArr[3];
    let cB = colorArr[4];
    let cD = colorArr[5];

    let nU = cU;
    let nL = cL;
    let nF = cF;
    let nR = cR;
    let nB = cB;
    let nD = cD;

    while (colorArr[2] !== selectedFrontColor) {
        nL = colorArr[2];
        nF = colorArr[3];
        nR = colorArr[4];
        nB = colorArr[1];

        colorArr = [nU,nL,nF,nR,nB,nD];
    }

    $("#buttonsU :button").css("background", colorArr[0]);
    $("#buttonsL :button").css("background", colorArr[1]);
    $("#buttonsF :button").css("background", colorArr[2]);
    $("#buttonsR :button").css("background", colorArr[3]);
    $("#buttonsB :button").css("background", colorArr[4]);
    $("#buttonsD :button").css("background", colorArr[5]);
}