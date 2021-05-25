var farge = localStorage.getItem("farge") || "gul";

function byttFarge() {

    if (farge === "gul") {
        document.getElementById("adjB").src = "bilder/adjB_black.png";
        document.getElementById("adjF").src = "bilder/adjF_black.png";
        document.getElementById("adjL").src = "bilder/adjL_black.png";
        document.getElementById("adjR").src = "bilder/adjR_black.png";
        document.getElementById("diag").src = "bilder/diag_black.png";
        document.getElementById("pure").src = "bilder/pure_black.png";

        farge = "svart";
        document.getElementById("fargeKnapp").src = "bilder/gulHvit.png"
    }
    else {
        document.getElementById("adjB").src = "bilder/adjB.png";
        document.getElementById("adjF").src = "bilder/adjF.png";
        document.getElementById("adjL").src = "bilder/adjL.png";
        document.getElementById("adjR").src = "bilder/adjR.png";
        document.getElementById("diag").src = "bilder/diag.png";
        document.getElementById("pure").src = "bilder/pure.png";

        farge = "gul";
        document.getElementById("fargeKnapp").src = "bilder/svartHvit.png"
    }

    localStorage.setItem("farge",farge);
}

window.onload = function () {
    byttFarge();
    byttFarge();
}