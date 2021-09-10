let tabContents = [];

$(function() {
    tabContents = $(".tabContent");

    adjustImg();
    showHome();

    const tabHomeLetters = $("#tabHome h1").text().split("");
    let newTabHome = "";
    for (let e of tabHomeLetters) {
        newTabHome += "<einar>"+e+"</einar>"
    }
    $("#tabHome h1").html(newTabHome);
});

function hideAll() {
    for (let c of tabContents) {
        $(c).css("display", "none");
    }
}

function showHome() {
    hideAll();
    $("#tabHome").css("display", "block");
}

function showProjects() {
    hideAll();
    $("#tabProjects").css("display", "block");
}

function showApps() {
    hideAll();
    $("#tabApps").css("display", "block");
}

function adjustImg() {
    const size = $("h1").css("font-size");

    $(".tabAppsImg").css("height", size);
    $(".tabAppsImg").css("width", "auto");
    $(".tabAppsImg").css("margin-right", "0.25%");
}