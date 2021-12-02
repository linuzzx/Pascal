let draw = false;
let x1 = 250;
let y1 = 250;
const colors = ["black","white","red","green","blue","yellow","orange","purple","pink","gray"];

let drawInterval = null;

$(function() {
    $("#btnDraw").html("<button class='btn btn-secondary' onclick='startDrawing()'>Start</button>");
});

function drawRandom() {
    if (draw) {
        let x2 = Math.floor(Math.random() * 500);
        let y2 = Math.floor(Math.random() * 500);
        let color = colors[Math.floor(Math.random() * colors.length)];

        let line = document.createElementNS('http://www.w3.org/2000/svg', "line");
        $(line).attr("x1", x1);
        $(line).attr("x2", x2);
        $(line).attr("y1", y1);
        $(line).attr("y2", y2);
        $(line).attr("stroke", color);
        $(line).attr("stroke-width", "3");
        $("#svgTest").append(line);

        x1 = x2;
        y1 = y2;
    }
    else {
        clearInterval(drawInterval);
    }
}

function resetDraw() {
    $("#svgTest").empty();
}

function startDrawing() {
    draw = true;

    drawInterval = setInterval(
        "drawRandom()",
        100);

    $("#btnDraw").html("<button class='btn btn-secondary' onclick='stopDrawing()'>Stop</button>");
}

function stopDrawing() {
    draw = false;

    $("#btnDraw").html("<button class='btn btn-secondary' onclick='startDrawing()'>Start</button>");
}