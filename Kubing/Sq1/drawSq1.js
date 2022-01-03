let svgHeight;
let svgWidth;
let colorT = "yellow";
let colorB = "white";
let colorE = "red";
let colorEF = "orange";
let colorBorder = "black";

let colors = [
    "orange","orange","orange","green","green","green","red","red","red","blue","blue","blue",
    "red","red","red","green","green","green","orange","orange","orange","blue","blue","blue"
];
let iColors = [
    colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,
    colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB
];

$(function() {
    adjustSize();
    drawSq1();
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

    let cp0 = [0.2*w,0.2*w];
    let cp1 = rotate(cx, cy, cp0[0], cp0[1], 330);
    let cp2 = rotate(cx, cy, cp1[0], cp1[1], 330);
    let cp3 = rotate(cx, cy, cp2[0], cp2[1], 330);
    let cp4 = rotate(cx, cy, cp3[0], cp3[1], 330);
    let cp5 = rotate(cx, cy, cp4[0], cp4[1], 330);
    let cp6 = rotate(cx, cy, cp5[0], cp5[1], 330);
    let cp7 = rotate(cx, cy, cp6[0], cp6[1], 330);
    let cp8 = rotate(cx, cy, cp7[0], cp7[1], 330);
    let cp9 = rotate(cx, cy, cp8[0], cp8[1], 330);
    let cp10 = rotate(cx, cy, cp9[0], cp9[1], 330);
    let cp11 = rotate(cx, cy, cp10[0], cp10[1], 330);

    let cps = [
        cp0,cp1,cp2,cp3,cp4,cp5,cp6,cp7,cp8,cp9,cp10,cp11
    ];
    
    let ep1 = intersect(cx,cy,cp1[0],cp1[1],cp0[0],cp0[1],cp3[0],cp3[1]);
    let ep2 = rotate(cx, cy, ep1[0], ep1[1], 330);
    let ep3 = rotate(cx, cy, ep2[0], ep2[1], 330);
    let ep4 = rotate(cx, cy, ep3[0], ep3[1], 330);
    let ep5 = rotate(cx, cy, ep4[0], ep4[1], 330);
    let ep6 = rotate(cx, cy, ep5[0], ep5[1], 330);
    let ep7 = rotate(cx, cy, ep6[0], ep6[1], 330);
    let ep8 = rotate(cx, cy, ep7[0], ep7[1], 330);
    let ep9 = rotate(cx, cy, ep8[0], ep8[1], 330);
    let ep10 = rotate(cx, cy, ep9[0], ep9[1], 330);
    let ep11 = rotate(cx, cy, ep10[0], ep10[1], 330);
    let ep0 = rotate(cx, cy, ep11[0], ep11[1], 330);

    let eps = [
        ep0,ep1,ep2,ep3,ep4,ep5,ep6,ep7,ep8,ep9,ep10,ep11
    ];

    let icp0 = [0.25*w,0.25*w];
    let icp1 = rotate(cx, cy, icp0[0], icp0[1], 330);
    let icp2 = rotate(cx, cy, icp1[0], icp1[1], 330);
    let icp3 = rotate(cx, cy, icp2[0], icp2[1], 330);
    let icp4 = rotate(cx, cy, icp3[0], icp3[1], 330);
    let icp5 = rotate(cx, cy, icp4[0], icp4[1], 330);
    let icp6 = rotate(cx, cy, icp5[0], icp5[1], 330);
    let icp7 = rotate(cx, cy, icp6[0], icp6[1], 330);
    let icp8 = rotate(cx, cy, icp7[0], icp7[1], 330);
    let icp9 = rotate(cx, cy, icp8[0], icp8[1], 330);
    let icp10 = rotate(cx, cy, icp9[0], icp9[1], 330);
    let icp11 = rotate(cx, cy, icp10[0], icp10[1], 330);

    let icps = [
        icp0,icp1,icp2,icp3,icp4,icp5,icp6,icp7,icp8,icp9,icp10,icp11
    ];
    
    let iep1 = intersect(cx,cy,icp1[0],icp1[1],icp0[0],icp0[1],icp3[0],icp3[1]);
    let iep2 = rotate(cx, cy, iep1[0], iep1[1], 330);
    let iep3 = rotate(cx, cy, iep2[0], iep2[1], 330);
    let iep4 = rotate(cx, cy, iep3[0], iep3[1], 330);
    let iep5 = rotate(cx, cy, iep4[0], iep4[1], 330);
    let iep6 = rotate(cx, cy, iep5[0], iep5[1], 330);
    let iep7 = rotate(cx, cy, iep6[0], iep6[1], 330);
    let iep8 = rotate(cx, cy, iep7[0], iep7[1], 330);
    let iep9 = rotate(cx, cy, iep8[0], iep8[1], 330);
    let iep10 = rotate(cx, cy, iep9[0], iep9[1], 330);
    let iep11 = rotate(cx, cy, iep10[0], iep10[1], 330);
    let iep0 = rotate(cx, cy, iep11[0], iep11[1], 330);

    let ieps = [
        iep0,iep1,iep2,iep3,iep4,iep5,iep6,iep7,iep8,iep9,iep10,iep11
    ];

    $("#sq1T").empty();
    $("#sq1B").empty();
    $("#sq1E").empty();

    for (let i=0; i<cps.length; i++) {
        let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let polyT = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let color = colors[sq1.indexOf(sq1T[i])];
        let iColor = iColors[sq1.indexOf(sq1T[i])];
        if (sq1T[i].split("").length === 2) {
            if (sq1T[i].split("")[1] === "1") {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[0][0]+","+cps[0][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                    $(polyT).attr("points", icps[0][0]+","+icps[0][1]+" "+cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]);
                }
                else {
                    $(poly).attr("points", cps[i+1][0]+","+cps[i+1][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                    $(polyT).attr("points", icps[i+1][0]+","+icps[i+1][1]+" "+cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]);
                }
            }
            else {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[0][0]+","+eps[0][1]);
                    $(polyT).attr("points", icps[i][0]+","+icps[i][1]+" "+cx+","+cy+" "+ieps[0][0]+","+ieps[0][1]);
                }
                else {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[i+1][0]+","+eps[i+1][1]);
                    $(polyT).attr("points", icps[i][0]+","+icps[i][1]+" "+cx+","+cy+" "+ieps[i+1][0]+","+ieps[i+1][1]);
                }
            }
        }
        else {
            if (i === cps.length-1) {
                $(poly).attr("points", eps[i][0]+","+eps[i][1]+" "+cx+","+cy+" "+eps[0][0]+","+eps[0][1]);
                $(polyT).attr("points", ieps[i][0]+","+ieps[i][1]+" "+cx+","+cy+" "+ieps[0][0]+","+ieps[0][1]);
            }
            else {
                $(poly).attr("points", eps[i][0]+","+eps[i][1]+" "+cx+","+cy+" "+eps[i+1][0]+","+eps[i+1][1]);
                $(polyT).attr("points", ieps[i][0]+","+ieps[i][1]+" "+cx+","+cy+" "+ieps[i+1][0]+","+ieps[i+1][1]);
            }
        }
        $(poly).attr("style", "fill:"+color+";stroke:black;stroke-width:1");
        $(polyT).attr("style", "fill:"+iColor+";stroke:black;stroke-width:1");

        $("#sq1T").append(poly);
        $("#sq1T").append(polyT);
    }

    for (let i=0; i<cps.length; i++) {
        let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let polyB = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let color = colors[sq1.indexOf(sq1B[i])];
        let iColor = iColors[sq1.indexOf(sq1B[i])];
        if (sq1B[i].split("").length === 2) {
            if (sq1B[i].split("")[1] === "1") {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[0][0]+","+cps[0][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                    $(polyB).attr("points", icps[0][0]+","+icps[0][1]+" "+cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]);
                }
                else {
                    $(poly).attr("points", cps[i+1][0]+","+cps[i+1][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                    $(polyB).attr("points", icps[i+1][0]+","+icps[i+1][1]+" "+cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]);
                }
            }
            else {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[0][0]+","+eps[0][1]);
                    $(polyB).attr("points", icps[i][0]+","+icps[i][1]+" "+cx+","+cy+" "+ieps[0][0]+","+ieps[0][1]);
                }
                else {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[i+1][0]+","+eps[i+1][1]);
                    $(polyB).attr("points", icps[i][0]+","+icps[i][1]+" "+cx+","+cy+" "+ieps[i+1][0]+","+ieps[i+1][1]);
                }
            }
        }
        else {
            if (i === cps.length-1) {
                $(poly).attr("points", eps[i][0]+","+eps[i][1]+" "+cx+","+cy+" "+eps[0][0]+","+eps[0][1]);
                $(polyB).attr("points", ieps[i][0]+","+ieps[i][1]+" "+cx+","+cy+" "+ieps[0][0]+","+ieps[0][1]);
            }
            else {
                $(poly).attr("points", eps[i][0]+","+eps[i][1]+" "+cx+","+cy+" "+eps[i+1][0]+","+eps[i+1][1]);
                $(polyB).attr("points", ieps[i][0]+","+ieps[i][1]+" "+cx+","+cy+" "+ieps[i+1][0]+","+ieps[i+1][1]);
            }
        }

        $(poly).attr("style", "fill:"+color+";stroke:black;stroke-width:1");
        $(polyB).attr("style", "fill:"+iColor+";stroke:black;stroke-width:1");

        $("#sq1B").append(poly);
        $("#sq1B").append(polyB);
    }

    let rectE1 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE1).attr("x", cp0[0]);
    $(rectE1).attr("y", (svgHeight/3 - svgHeight/5)/2);
    $(rectE1).attr("width", ep1[0]-cp0[0]);
    $(rectE1).attr("height", svgHeight/5);
    $(rectE1).attr("style", "fill:"+colorE+";stroke:"+colorBorder+";stroke-width:1");
    $("#sq1E").append(rectE1);

    let eW = eFlipped? ep1[0]-cp0[0]: cp3[0]-cp1[0];
    let eC = eFlipped? colorEF: colorE;
    let rectE2 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE2).attr("x", ep1[0]);
    $(rectE2).attr("y", (svgHeight/3 - svgHeight/5)/2);
    $(rectE2).attr("width", eW);
    $(rectE2).attr("height", svgHeight/5);
    $(rectE2).attr("style", "fill:"+eC+";stroke:"+colorBorder+";stroke-width:1");
    $("#sq1E").append(rectE2);
}

function rotate(cx, cy, x, y, angle) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
          return false
      }
  
      denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
  
    // Lines are parallel
      if (denominator === 0) {
          return false
      }
  
      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
  
    // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return false
      }
  
    // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1)
      let y = y1 + ua * (y2 - y1)
  
      return [x,y]
}

function adjustSize() {
    if (!$("inpScramble").is(":focus")) {
        if ($("#content").height() >= $("#content").width()) {
            
        }
        else {

        }

        svgHeight = ($("body").height() / 7) * 2;
        svgWidth = svgHeight;
        
        $("#sq1T").attr("width", svgWidth);
        $("#sq1T").attr("height", svgHeight);

        $("#sq1E").attr("width", svgWidth);
        $("#sq1E").attr("height", svgHeight / 5);

        $("#sq1B").attr("width", svgWidth);
        $("#sq1B").attr("height", svgHeight);
    }
}