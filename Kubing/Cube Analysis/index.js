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
    getSetup();
    getMoves();
}

function getSetup() {
    let strSetup = "";
    const lines = $("#taSetup").val().split("\n");
    for (let line of lines) {
        strSetup += line.split("//")[0];
    }

    const arr = strSetup.split(" ").filter(checkEmpty);
    console.log("Setup: "+arr);

    return arr;
}

function getMoves() {
    let strSetup = "";
    const lines = $("#taMoves").val().split("\n");
    for (let line of lines) {
        strSetup += line.split("//")[0];
    }

    const arr = strSetup.split(" ").filter(checkEmpty);
    console.log("Moves: "+arr);

    return arr;
}

function checkEmpty(move) {
    return move !== "";
}