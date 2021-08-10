function showMe() {
    $("#divMe").css("display", "block");
    $("#divMyProjects").css("display", "none");
    $("#divOther").css("display", "none");
}

function showMyProjects() {
    $("#divMe").css("display", "none");
    $("#divMyProjects").css("display", "block");
    $("#divOther").css("display", "none");
}

function showOther() {
    $("#divMe").css("display", "none");
    $("#divMyProjects").css("display", "none");
    $("#divOther").css("display", "block");
}