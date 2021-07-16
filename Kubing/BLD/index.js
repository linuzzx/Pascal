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

function selectTopColor(button, color) {
    selectedTopBtn = button;
    selectedTopColor = color;

    localStorage.setItem("selectedTopBtn", selectedTopBtn);
    localStorage.setItem("selectedTopColor", selectedTopColor);

    $(".topBtn").css("box-shadow", "none");
    $(button).css("box-shadow", "0 0 5px 1px "+color);
}

function selectFrontColor(button, color) {
    selectedFrontBtn = button;
    selectedFrontColor = color;

    localStorage.setItem("selectedFrontBtn", selectedFrontBtn);
    localStorage.setItem("selectedFrontColor", selectedFrontColor);

    $(".frontBtn").css("box-shadow", "none");
    $(button).css("box-shadow", "0 0 5px 1px "+color);
}