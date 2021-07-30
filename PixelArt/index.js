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
    canvas = $("#canvasBoard");
    ctx = canvas[0].getContext("2d");
    canvas.mousemove(function(event){
        X = event.pageX - $(this).offset().left;
        Y = event.pageY - $(this).offset().top;
    });

    canvas.attr("width", canvas.width());
    canvas.attr("height", canvas.height());
    ctx.fillStyle = color;

    /*pixelWidth = canvas.width() / 10;
    pixelHeight = canvas.height() / 10;

    for (let x=0; x<canvas.width(); x+= pixelWidth) {
        ctx.fillRect(x,0, 1,canvas.height());
    }
    for (let y=0; y<canvas.height(); y+= pixelHeight) {
        ctx.fillRect(0, y, canvas.width(),1);
    }*/
});

function newDrawing() {

}

function saveDrawing() {

}

function draw() {
    if (isPressed) {
        let w = 5;
        let h = 5;
        if (func === "draw") {
            ctx.fillStyle = color;
            ctx.fillRect(X-w/2, Y-h/2, w, h);
            lastX = X;
            lastY = Y;
        }
    }
}

function pressDraw() {
    isPressed = true;
    draw();
}

function releaseDraw() {
    isPressed = false;
}