$(function () {

});

function showLetterScheme() {

}

function showCorners() {
    $("#cornerMenu").css("display", "grid");
    $("#cornerContent").css("display", "block");
    $("#edgeMenu").css("display", "none");
    $("#edgeContent").css("display", "none");
}

function showEdges() {
    $("#cornerMenu").css("display", "none");
    $("#cornerContent").css("display", "none");
    $("#edgeMenu").css("display", "grid");
    $("#edgeContent").css("display", "block");
}