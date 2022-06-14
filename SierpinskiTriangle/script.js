let svg;
let points;
let interval;

$(() => {
    if ($(window).height() > $(window).width()) {
        $("#triangle").css("height", "90vw");
        $("#triangle").css("width", "90vw");
    }
    else {
        $("#triangle").css("height", "90vh");
        $("#triangle").css("width", "90vh");
    }
    svg = $("#triangle").height();
    points = [
        [svg*0.1, svg*0.9],
        [svg*0.9, svg*0.9],
        [svg*0.5, svg*0.9 - Math.sqrt((0.8*svg)*(0.8*svg)-(0.4*svg)*(0.4*svg))],
    ];

    //drawCorners();
    drawEdges();
});

function drawPoint(p) {
    let c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    $(c).attr('cx', p[0]);
    $(c).attr('cy', p[1]);
    $(c).attr('r', 1);
    $(c).attr('fill', "black");
    $("#triangle").append(c);
}

function drawCorners() {
    for (let p of points) {
        drawPoint(p);
    }
}

function drawEdges() {
    let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
    $(poly).attr("points", points[0].join(",")+" "+points[1].join(",")+" "+points[2].join(","));
    $(poly).attr("style", "fill:transparent;stroke:black;stroke-width:1");

    $("#triangle").append(poly);
}

function drawTriangle(k) {
    let prevPoint;

    for (let i = 0; i < k; i++) {
        if (i === 0) {
            let p = [Math.random()* svg*0.8 + svg*0.1, Math.random()* svg*0.8 + svg*0.1];
            if (insideTriangle(p)) {
                prevPoint = p;
            }
            else {
                i--;
            }
        }
        else {
            let cp = points[Math.floor(Math.random() * 3)];
            let p = [(cp[0] + prevPoint[0]) / 2.0, (cp[1] + prevPoint[1]) / 2.0];

            drawPoint(p);
            prevPoint = p;
        }
    }
}

function clearTriangle() {
    $("#triangle").empty();
    drawEdges();
}

function insideTriangle(p) {
    let p1 = points[0];
    let p2 = points[1];
    let p3 = points[2];

    let A = getArea(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    let A1 = getArea(p[0], p[1], p2[0], p2[1], p3[0], p3[1]);
    let A2 = getArea(p1[0], p1[1], p[0], p[1], p3[0], p3[1]);
    let A3 = getArea(p1[0], p1[1], p2[0], p2[1], p[0], p[1]);

    return (A === A1 + A2 + A3);
}

function getArea(x1, y1, x2, y2, x3, y3) {
    return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2)) / 2.0);
}

function generateFast() {
    clearInterval(interval);
    clearTriangle();
    let k = $("#inpK").val();

    drawTriangle(k);
}

function generateSlow() {
    clearInterval(interval);
    clearTriangle();
    const k = parseInt($("#inpK").val());
    const ms = 5000;
    let i = 0;
    let prevPoint = [svg*0.5, svg*0.5];
    
    while (i === 0) {
        let p = [Math.random()* svg*0.8 + svg*0.1, Math.random()* svg*0.8 + svg*0.1];
        if (insideTriangle(p)) {
            prevPoint = p;
            i++;
        }
        else {
            i--;
        }
    }
    interval = setInterval(() => {
        if (i <= k) {
            let cp = points[Math.floor(Math.random() * 3)];
            let p = [(cp[0] + prevPoint[0]) / 2.0, (cp[1] + prevPoint[1]) / 2.0];

            drawPoint(p);
            prevPoint = p;
            i++;
        }
        else {
            clearInterval(interval);
        }
    }, 1);
}