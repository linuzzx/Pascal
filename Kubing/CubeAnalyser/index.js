$(function() {
    getParams();
    drawCube("");
    updateTPS();
    //listCubeTypes();
})

let url = "Kubing/CubeAnalyser/?";

const cubeTypes = ["3x3", "2x2", "4x4", "Square-1"]; //["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx","Pyraminx", "Skewb", "Square-1"];
let setupArray = [];
let movesArray = [];

function getParams() {
    if (window.location.search !== "") {
        const params = (window.location.search).split("?")[1].split("&");

        for (let p of params) {
            switch (p.split("=")[0]) {
                case "setup":
                    $("#taSetup").val(encodeURL(p.split("=")[1]));
                    break;
                case "moves":
                    $("#taMoves").val(encodeURL(p.split("=")[1]));
                    break;
                case "time":
                    $("#inputTime").val(encodeURL(p.split("=")[1]));
                    break;
            }
        }
        console.log(params);
    }
}

function encodeURL(param) {
    return param.replaceAll("%20", " ").replaceAll("%27", "'").replaceAll("%2F", "/").replaceAll("%0A", "\n").replaceAll("%26", "&").replaceAll("%3D", "=");
}

function listCubeTypes() {
    for (let cube of cubeTypes) {
        if (cube === "3x3") {
            $('#selectCube').append($("<option></option>")
                    .attr("value", cube)
                    .text(cube));
        }
        else {
            $('#selectCube').append($("<option disabled></option>")
                    .attr("value", cube)
                    .text(cube));
        }
    }
}

function updateArrays() {
    const setup = getMoves("#taSetup");
    const moves = getMoves("#taMoves");

    drawCube(setup+" "+moves);

    //$("#allMoves").html(setup + " " + moves);
}

function getMoves(moves) {
    let strSetup = "";
    let arrSetup = [];
    const lines = $(moves).val().split("\n");
    for (let line of lines) {
        arrSetup.push(line.split("//")[0]);
    }

    strSetup = arrSetup.join(" ");

    const arr = strSetup.split(" ").filter(checkEmpty);

    return arr.join(" ");
}

function checkEmpty(move) {
    return move !== "";
}

function updateTPS() {
    let moveCount = 0;

    for (let s of getMoves("#taMoves").split(" ")) {
        if (s.includes("R") || s.includes("L") || s.includes("F") || s.includes("B") || s.includes("U") || s.includes("D")) {
            moveCount++;
        }
        else if (s.includes("M") || s.includes("S") || s.includes("E")) {
            moveCount += 2;
        }
    }

    const tps = (moveCount / $("#inputTime").val()).toFixed(2);

    $("#tps").html(tps + " TPS (HTM)");
}

function updateURL() {
    const rawSetup = $("#taSetup").val();
    const rawMoves = $("#taMoves").val();
    const rawTime = $("#inputTime").val();
    let urlExtra = "?";

    // Må definere mellomrom, ', //, og ny linje
    const space = "%20";
    const inverse = "%27";
    const slash = "%2F";
    const newLine = "%0A";
    const and = "%26";

    rawSetup.replaceAll(" ", "%20").replaceAll("'", "%27").replaceAll("/", "%2F").replaceAll("\n", "%0A").replaceAll("&", "%26").replaceAll("=", "%3D");
    rawMoves.replaceAll(" ", "%20").replaceAll("'", "%27").replaceAll("/", "%2F").replaceAll("\n", "%0A").replaceAll("&", "%26").replaceAll("=", "%3D");

    if (rawSetup !== "") {
        urlExtra += "setup="+rawSetup;
        if (rawMoves !== "") {
            urlExtra += "&moves="+rawMoves;
        }
        if (rawTime !== "") {
            urlExtra += "&time="+rawTime;
        }
    }
    else if (rawMoves !== "") {
        urlExtra += "moves="+rawMoves;
        if (rawTime !== "") {
            urlExtra += "&time="+rawTime;
        }
    }
    else if (rawTime !== "") {
        urlExtra += "time="+rawTime;
    }

    const state = {};
    const title = "";

    history.pushState(state, title, urlExtra);
}