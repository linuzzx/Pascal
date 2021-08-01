let func;
let color;
let canvas;
let ctx;
let lastX, lastY;
let X, Y;
let pixelWidth, pixelHeight;
let isPressed = false;

$(function () {
    func = "draw";
    color = "black";
    const width = 25;
    const height = 25;
    makeBoard(width,height);
    if ($(window).width() / $(window).height() >= width / height) {
        const size = $(window).height() / height;
        $("#pixelBoard").css("height","100%");
        $("#pixelBoard").css("width","fit-content");
        $(".pixel").css("width",size);
    }
    else {
        const size = $(window).width() / width;
        $("#pixelBoard").css("width","100%");
        $("#pixelBoard").css("height","fit-content");
        $(".pixel").css("height",size);
    }
});

function newDrawing() {

}

function saveDrawing() {

}

function makeBoard(width, height) {
    let columns = "";
    let rows = "";
    for (let w=0; w<width; w++) {
        columns += " 1fr";
    }
    for (let h=0; h<height; h++) {
        rows += " 1fr";
    }
    let out = "<div id='pixelBoard' style='display: grid; grid-template-rows:" + rows + "'>";
    for (let i=0; i<height; i++) {
        out += "<div class='pixelRow' style='display: grid; grid-template-columns:" + columns + "'>";
        for (let j=0; j<width; j++) {
            out += "<div class='pixel' onmousemove='draw(this)' onmousedown='pressDraw(this)' onmouseup='releaseDraw()'></div>";
        }
        out += "</div>";
    }
    out += "</div>";

    $("#canvasBoard").html(out);
}

function draw(pixel) {
    if (isPressed) {
        if (func === "draw") {
            $(pixel).css("background", color);
        }
    }
}

function pressDraw(pixel) {
    isPressed = true;
    draw(pixel);
}

function releaseDraw() {
    isPressed = false;
}

function chooseColor() {
    color = $("#inputColor").val();
    $("#inputColor").val("");
}