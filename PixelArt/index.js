let func;
let color;
let ctx;
let lastX, lastY;
let X, Y;
let isPressed = false;
let showingNewDrawingBox = false;
let showingSaveBox = false;
let drawingWidth, drawingHeight;
let cells;
const activeButtonColor = "#939DA3";

$(function () {
    func = "draw";
    color = "black";
    $("#btnDraw").css("background", activeButtonColor);
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
}

function saveDrawing() {
    const canvasDrawing = document.createElement("canvas");
    canvasDrawing.setAttribute("width", drawingWidth);
    canvasDrawing.setAttribute("height", drawingHeight);
    const ctx = canvasDrawing.getContext("2d");
    cells = makeCellArray();

    for (let y=0; y<drawingHeight; y++) {
        for (let x=0; x<drawingWidth; x++) {
            ctx.fillStyle = $(cells[y][x]).css("background-color");
            console.log($(cells[y][x]).css("background-color"))
            ctx.fillRect(x, y, 1, 1);
        }
    }
    let filename = "";
    if ($("#inputFileName").val().length > 0) {
        filename = $("#inputFileName").val();
    }
    else {
        filename = "image";
    }

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvasDrawing.toDataURL();
    a.download = filename + ".png";
    a.click();
    document.body.removeChild(a);

    showingSaveBox = false;
    $("#saveBox").css("display", "none");
}

function openSaveBox() {
    showingSaveBox = true;
    $("#saveBox").css("display", "block");
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
            $(pixel).css("background", "transparent");
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
    let array = makeCellArray();

    floodFill(array);
}

function floodFill(array){
    let queue = {};
    const currentColor = 1;
}

function funcDraw() {
    func = "draw";
    $(".funcButtons").css("background", "#EFEFEF");
    $("#btnDraw").css("background", activeButtonColor);
}

function funcErase() {
    func = "erase";
    $(".funcButtons").css("background", "#EFEFEF");
    $("#btnErase").css("background", activeButtonColor);
}

function funcFill() {
    func = "fill";
    $(".funcButtons").css("background", "#EFEFEF");
    $("#btnFill").css("background", activeButtonColor);
}

function makeCellArray() {
    let array = [];
    for (let i=0; i<drawingHeight; i++) {
        let innerArray = [];
        for (let j=0; j<drawingWidth; j++) {
            const pixel = $("#x"+j+"y"+i);
            innerArray.push(pixel);
        }
        array.push(innerArray);
    }
    return array;
}