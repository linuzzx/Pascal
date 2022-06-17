let w, h;
let interval;
const angle = 30;
let length;
let depth;
let points, nPoints;

$(() => {
    $("#tree").css("width", "100vw");
    $("#tree").css("height", "90vh");

    w = $("#tree").width();
    h = $("#tree").height();

    length = h / 3;

    points = [];
    nPoints = [];
});

function drawBranch(p0, dir) {
    let p;
    let al = angle * depth + 90;
    let ar = al - 2 * angle;

    let pl = p0[2] === 2 ? [p0[0]+(Math.cos(ar*Math.PI/180) * length), p0[1]-(Math.sin(ar*Math.PI/180) * length), 1]
                        : [p0[0]+(Math.cos(al*Math.PI/180) * length), p0[1]-(Math.sin(al*Math.PI/180) * length), 1];
    let pr = p0[2] === 2 ? [p0[0]+(Math.cos((ar-2*angle)*Math.PI/180) * length), p0[1]-(Math.sin((ar-2*angle)*Math.PI/180) * length), 2]
                        : [p0[0]+(Math.cos(ar*Math.PI/180) * length), p0[1]-(Math.sin(ar*Math.PI/180) * length), 2];

    if (dir === 0) {
        p = [p0[0], p0[1] - length, 0];
    }
    else if (dir === 1) {
        p = pl;
    }
    else if (dir === 2) {
        p = pr;
    }

    nPoints.push(p);

    let line = document.createElementNS('http://www.w3.org/2000/svg', "line");
    $(line).attr("x1", p0[0]);
    $(line).attr("y1", p0[1]);
    $(line).attr("x2", p[0]);
    $(line).attr("y2", p[1]);
    $(line).attr("style", "stroke:black;stroke-width:1");

    $("#tree").append(line);
}

function drawTree(k) {
    for (let i = 0; i < k; i++) {
        depth = i;
        if (i === 0) {
            let p = [0.5*w, h, 0];
            drawBranch(p, 0);
        }
        else {
            points = nPoints.slice();
            nPoints = [];

            length *= 0.8;

            for (let p of points) {
                drawBranch(p, 1);
                drawBranch(p, 2);
            }
        }
    }
}

function clearTree() {
    $("#tree").empty();
    length = h / 3;

    points = [];
    nPoints = [];
}

function generateFast() {
    clearInterval(interval);
    let k  = $("#inpK").val();

    clearTree();
    drawTree(k);
}

function generateSlow() {
    clearInterval(interval);
    clearTree();

    const k = parseInt($("#inpK").val());
    const ms = 5000;
    let i = 0;
    let prevPoint = [w*0.5, w*0.5];
    
    while (i === 0) {
        let p = [Math.random()*w, Math.random()*w];
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
    }, ms/k);
}