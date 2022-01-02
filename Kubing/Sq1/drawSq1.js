let svgHeight;
let svgWidth;
let colors = [
    "orange","orange","orange","green","green","green","red","red","red","blue","blue","blue",
    "red","red","red","green","green","green","orange","orange","orange","blue","blue","blue"
];
let colorT = "yellow";
let colorB = "white";
let colorE = "red";
let colorEF = "orange";
let colorBorder = "black";

$(function() {
    adjustSize();
    drawSq1("");
});

$(window).resize(function() {
    adjustSize();
});

function draw() {
    
}

function drawTest() {
    $("#sq1T").empty();
    $("#sq1E").empty();
    $("#sq1B").empty();
    
    let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rect).attr("x", 0);
    $(rect).attr("y", 0);
    $(rect).attr("width", svgWidth);
    $(rect).attr("height", svgHeight);
    $(rect).attr("style", "fill:"+colorT+";stroke:"+colorBorder+";stroke-width:1");
    $("#sq1T").append(rect);

    let rectE1 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE1).attr("x", 0);
    $(rectE1).attr("y", 0);
    $(rectE1).attr("width", svgWidth/3);
    $(rectE1).attr("height", svgHeight/3);
    $(rectE1).attr("style", "fill:"+colorE+";stroke:"+colorBorder+";stroke-width:1");

    $("#sq1E").append(rectE1);
    let eW = eFlipped? svgWidth/3: (svgWidth/3)*2;
    let eC = eFlipped? colorEF: colorE;
    let rectE2 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE2).attr("x", svgWidth/3);
    $(rectE2).attr("y", 0);
    $(rectE2).attr("width", eW);
    $(rectE2).attr("height", svgHeight/3);
    $(rectE2).attr("style", "fill:"+eC+";stroke:"+colorBorder+";stroke-width:1");
    $("#sq1E").append(rectE2);

    let rect2 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rect2).attr("x", 0);
    $(rect2).attr("y", 0);
    $(rect2).attr("width", svgWidth);
    $(rect2).attr("height", svgHeight);
    $(rect2).attr("style", "fill:"+colorB+";stroke:"+colorBorder+";stroke-width:1");
    $("#sq1B").append(rect2);

    let circ = document.createElementNS('http://www.w3.org/2000/svg', "circle");
    $(circ).attr("cx", svgWidth/2);
    $(circ).attr("cy", svgHeight/2);
    $(circ).attr("r", svgWidth/50);
    $(circ).attr("fill", "black");
    $("#sq1T").append(circ);

    let circ2 = document.createElementNS('http://www.w3.org/2000/svg', "circle");
    $(circ2).attr("cx", svgWidth/2);
    $(circ2).attr("cy", svgHeight/2);
    $(circ2).attr("r", svgWidth/50);
    $(circ2).attr("fill", "black");
    $("#sq1B").append(circ2);
}

function drawSq1() {
    let cx = svgWidth/2;
    let cy = svgWidth/2;

    let w = svgWidth;

    let p0 = 0.1830127*w;
    let p1 = p0+0.1339746*w;
    let p2 = p0+0.3660254*w;
    let p3 = w-p2;
    let p4 = w-p1;
    let p5 = w-p0;

    let c0 = 0;
    let c1 = 0.1830127*w;
    let c2 = c1+0.3169873*w;
    let c3 = w-c2;
    let c4 = w-c1;
    let c5 = w;

    /*
    let p0 = 0;
    let p1 = 0.1339746*w;
    let p2 = 0.3660254*w;
    let p3 = 0.6339746*w;
    let p4 = w-0.1339746*w;
    let p5 = w;
    */

    let cp = 0.3169873*w;
    let feil = cp;

    let xs = [p1,p2,p3,p4,p5,p5,p4,p3,p2,p1,p0,p0];
    let ys = [p1,p0,p0,p1,p2,p3,p4,p5,p5,p4,p3,p2];
    let cxs = [c1,c2,c3,c4,c5,c5,c4,c3,c2,c1,c0,c0];
    let cys = [c1,c0,c0,c1,c2,c3,c4,c5,c5,c4,c3,c2];
    /*let cxs = [0, cp, w-cp, w, w+feil, w+feil, w, w-cp, cp, 0, -feil, -feil];
    let cys = [0, -feil, -feil, 0, cp, w-cp, w, w+feil, w+feil, w, w-cp, cp];*/

    $("#sq1T").empty();
    $("#sq1B").empty();
    $("#sq1E").empty();

    for (let i=0; i<xs.length; i++) {
        let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let color = colors[sq1.indexOf(sq1T[i])];
        if (sq1T[i].split("").length === 2) {
            if (sq1T[i].split("")[1] === "1") {
                if (i === xs.length-1) {
                    let nX = cxs[i];
                    let nY = cys[i];
                    $(poly).attr("points", nX+","+nY+" "+cx+","+cy+" "+xs[i]+","+ys[i]);
                }
                else {
                    let nX = cxs[i];
                    let nY = cys[i];
                    $(poly).attr("points", nX+","+nY+" "+cx+","+cy+" "+xs[i]+","+ys[i]);
                }
            }
            else {
                if (i === xs.length-1) {
                    
                }
                else {
                    
                }
            }
        }
        else {
            if (i === xs.length-1) {
                $(poly).attr("points", xs[i]+","+ys[i]+" "+cx+","+cy+" "+xs[0]+","+ys[0]);
            }
            else {
                $(poly).attr("points", xs[i]+","+ys[i]+" "+cx+","+cy+" "+xs[i+1]+","+ys[i+1]);
            }
        }
        
        $(poly).attr("style", "fill:"+color+";stroke:black;stroke-width:1");

        $("#sq1T").append(poly);
    }

    for (let i=0; i<xs.length; i++) {
        let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let color = colors[sq1.indexOf(sq1B[i])];
        if (sq1B[i].split("").length === 2) {

        }
        else {
            if (i === xs.length-1) {
                $(poly).attr("points", xs[i]+","+ys[i]+" "+cx+","+cy+" "+xs[0]+","+ys[0]);
            }
            else {
                $(poly).attr("points", xs[i]+","+ys[i]+" "+cx+","+cy+" "+xs[i+1]+","+ys[i+1]);
            }
        }

        $(poly).attr("style", "fill:"+color+";stroke:black;stroke-width:1");

        $("#sq1B").append(poly);
    }

    let rectE1 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE1).attr("x", 0);
    $(rectE1).attr("y", (svgHeight/3 - svgHeight/5)/2);
    $(rectE1).attr("width", svgWidth/3);
    $(rectE1).attr("height", svgHeight/5);
    $(rectE1).attr("style", "fill:"+colorE+";stroke:"+colorBorder+";stroke-width:1");
    $("#sq1E").append(rectE1);

    let eW = eFlipped? svgWidth/3: (svgWidth/3)*2;
    let eC = eFlipped? colorEF: colorE;
    let rectE2 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE2).attr("x", svgWidth/3);
    $(rectE2).attr("y", (svgHeight/3 - svgHeight/5)/2);
    $(rectE2).attr("width", eW);
    $(rectE2).attr("height", svgHeight/5);
    $(rectE2).attr("style", "fill:"+eC+";stroke:"+colorBorder+";stroke-width:1");
    $("#sq1E").append(rectE2);

    // FJERN DENNE
    for (let i=0; i<cxs.length; i++) {
        let circ = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        $(circ).attr("cx", cxs[i]);
        $(circ).attr("cy", cys[i]);
        $(circ).attr("r", svgWidth/50);
        $(circ).attr("fill", "black");
        $("#sq1T").append(circ);
    }
}

function adjustSize() {
    svgHeight = ($("body").height() / 7) * 2;
    svgWidth = svgHeight;

    $("#sq1T").attr("width", svgWidth*1.5);
    $("#sq1T").attr("height", svgHeight*1.5);

    $("#sq1E").attr("width", svgWidth*1.5);
    $("#sq1E").attr("height", svgHeight / 3);

    $("#sq1B").attr("width", svgWidth*1.5);
    $("#sq1B").attr("height", svgHeight*1.5);
}