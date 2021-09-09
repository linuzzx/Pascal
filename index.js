let tabContents = [];

$(function() {
    tabContents = $(".tabContent");

    adjustImg();
    showHome();
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