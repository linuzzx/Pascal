let func;
let color;
let ctx;
let lastX, lastY;
let X, Y;
let isPressed = false;
let showingNewDrawingBox = false;
let drawingWidth, drawingHeight;

$(function () {
    func = "draw";
    color = "black";
    const width = 10;
    const height = 10;
    makeBoard(width,height);
});

function newDrawing() {
    showingNewDrawingBox = true;
    $("#newDrawingBox").css("display", "block");
}

function createNewDrawing() {
    const inputWidth = $("#inputWidth");
    const inputHeight = $("#inputHeight");
    makeBoard($(inputWidth).val(), $(inputHeight).val());
    $(inputWidth).val("");
    $(inputHeight).val("");
    $("#newDrawingBox").css("display", "none");
    showingNewDrawingBox = false;

    /*$("#canvasDrawing").attr("width", inputWidth);
    $("#canvasDrawing").attr("height", inputHeight);*/
}

function saveDrawing() {
    const canvasDrawing = $("#canvasDrawing");
    window.location.href=canvasDrawing.toDataURL("image/png").replace("image/png", "image/octet-stream");
}

function makeBoard(width, height) {
    drawingWidth = width;
    drawingHeight = height;
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
            out += "<div id='x"+ j + "y" + i + "' class='pixel' onmousemove='draw(this)' onmousedown='pressDraw(this)' onmouseup='releaseDraw()'></div>";
        }
        out += "</div>";
    }
    out += "</div>";

    $("#canvasBoard").html(out);

    stylePixels(width, height);
}

function stylePixels(width, height) {
    let size;
    if ($(window).width() / $(window).height() >= width / height) {
        size = $("#canvasBoard").height() / height;
        $("#pixelBoard").css("height","100%");
        $("#pixelBoard").css("width","fit-content");
    }
    else {
        size = $("#canvasBoard").width() / width;
        $("#pixelBoard").css("width","100%");
        $("#pixelBoard").css("height","fit-content");
    }
    $(".pixel").css("width",size);
    $(".pixel").css("height",size);
}

function draw(pixel) {
    if (isPressed) {
        if (func === "draw") {
            $(pixel).css("background", color);
        }
        else if (func === "erase") {

        }
        else if (func === "fill") {
            fill(pixel);
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

function chooseColor(col) {
    color = col;
}

function fill(pixel) {
    const x = pixel.id.split("x")[1].split("y")[0];
    const y = pixel.id.split("x")[1].split("y")[1];
    const col = $(pixel).css("background");
    let array = [];

    //Oppretter et int array utifra fargene
    for (let i=0; i<drawingHeight; i++) {
        let innerArray = [];
        for (let j=0; j<drawingWidth; j++) {
            const pixel = $("#x"+j+"y"+i);
            if ($(pixel).css("background") === col) {
                innerArray.push(1);
            }
            else {
                innerArray.push(0);
            }
        }
        array.push(innerArray);
    }

    floodFill(array);
}

function floodFill(array){
    let queue = {};
    const currentColor = 1;
}

function funcDraw() {
    func = "draw";
}

function funcErase() {
    func = "erase";
}

function funcFill() {
    func = "fill";
}