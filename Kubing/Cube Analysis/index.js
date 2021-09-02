$(function() {
    listCubeTypes();
})

const cubeTypes = ["3x3", "2x2", "4x4", "Square-1"]; //["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx","Pyraminx", "Skewb", "Square-1"];
let setupArray = [];
let movesArray = [];

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
    $("#allMoves").html(getMoves("#taSetup") + " " + getMoves("#taMoves"));
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