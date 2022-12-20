export class EinarDrawScramble extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.initialized = true;

        this.puzzle = this.getAttribute("puzzle") ? getPuzzle(this.getAttribute("puzzle")) : "3x3";
        this.scramble = this.getAttribute("scramble") ? this.getAttribute("scramble") : "";

        let svg = document.createElement("svg");
        svg.setAttribute("id", "svgEinarDrawScramble");
        svg.setAttribute("width", "80%");
        svg.setAttribute("height", "80%");
        svg.removeAttribute("style");
        this.appendChild(svg);
        this.setAttribute("width", "80%");
        this.setAttribute("height", "80%");

        drawScramble(this.puzzle, this.scramble);
    }
    
    static get observedAttributes() {
        return ["puzzle", "scramble"];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        clearInterval(this.interval);
        drawScramble(getPuzzle(this.puzzle), this.scramble);
    }
}

const colors = ["white", "#FFAA00", "#00FF00", "red", "blue", "yellow"];

function getPuzzle(puzzle) {
    if (["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle) !== -1) {
        return puzzle;
    }
    else {
        return "3x3";
    }
}

function drawScramble(puzzle, scramble) {
    let functions = [drawScrambleSkewb, drawScramblePyraminx, drawScrambleMegaminx, drawScrambleClock, drawScrambleSq1, drawScrambleSq1];
    const id = "#svgEinarDrawScramble";
    let n = puzzle.split("x").length === 2 && puzzle.split("x")[0] === puzzle.split("x")[1] ? parseInt(puzzle.split("x")[0]) : -1;console.log(n);
    n !== -1 ? drawScrambleNxN(id, n, scramble) : functions[["skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle)](id, scramble);
    n === -1 && functions[["skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle)] === -1 ? drawMissingSvg(id) : "";
}

let stroke = "#1E1E1E";

function drawScrambleNxN(svgID, n, scr) {
    $(svgID).empty();

    let cube = getState(n, scr);

    let width = $(svgID).width();
    let height = 3 * width / 4;
    $(svgID).height(height);
    let space = width / 20;
    let size = ((width - 3 * space) / 4) / n;
    let fill = "";
    let strokeWidth = ((size / n) > 1) ? 1 : 0;

    let coordinates = [
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: 0,
            y2: n * size,
        },
        {
            x1: 0,
            x2: n * size,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: 2 * n * size + 2 * space,
            x2: 3 * n * size + 2 * space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: 3 * n * size + 3 * space,
            x2: 4 * n * size + 3 * space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: 2 * n * size + 2 * space,
            y2: 3 * n * size + 2 * space,
        }
    ];
    
    for (let i = 0; i < 6; i++) {
        let j = 0;
        let x1 = coordinates[i].x1;
        let x2 = coordinates[i].x2;
        let y1 = coordinates[i].y1;
        let y2 = coordinates[i].y2;

        let yCount = 0;
        for (let y = y1; y < y2; y += size) {
            let k = 0;
            let xCount = 0;
            for (let x = x1; x < x2; x += size) {
                fill = cube[i][j][k];
                
                let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
                $(rect).attr("x", x);
                $(rect).attr("y", y);
                $(rect).attr("width", size);
                $(rect).attr("height", size);
                $(rect).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
                
                $(svgID).append(rect);
                k++;
                xCount++;
                if (xCount === n) {
                    break;
                }
            }
            j++;
            yCount++;
            if (yCount === n) {
                break;
            }
        }
    }
}

// Sq1
function drawScrambleSq1(svgID, scr) {
    resetDrawSvg(svgID);

    let sq1 = ["a2","b","c1","c2","d","e1","e2","f","g1","g2","h","a1","i2","j","k1","k2","l","m1","m2","n","o1","o2","p","i1"];
    let sq1T = [];
    let sq1B = [];
    let eFlipped = false;
    let impossible = false;
    let colorT = "yellow";
    let colorB = "white";
    let colorE = "red";
    let colorEF = "#FFAA00";
    let colorBorder = "black";

    let sSq1 = "";

    let colorsSq1 = [
        "#FFAA00","#FFAA00","#FFAA00","#00FF00","#00FF00","#00FF00","red","red","red","blue","blue","blue",
        "red","red","red","#00FF00","#00FF00","#00FF00","#FFAA00","#FFAA00","#FFAA00","blue","blue","blue"
    ];
    
    let iColorsSq1 = [
        colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,colorT,
        colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB,colorB
    ];

    let svgW = $(svgID).width() / 2;
    let svgH = svgW;
    $(svgID).height(svgH);

    if ($("#drawScrambleSq1").length) {
        $("#drawScrambleSq1").remove();
    }

    let svgs = "<div id='drawScrambleSq1' class='svgScramble'><svg id='sq1T'></svg><svg id='sq1B'></svg><div style='display: grid;place-items: center'><svg id='sq1E'></svg></div></div>";

    $(svgID).parent().append(svgs)
    $("#sq1T").attr("width", svgW);
    $("#sq1T").attr("height", svgH);
    $("#sq1B").attr("width", svgW);
    $("#sq1B").attr("height", svgH);
    $("#sq1E").attr("width", svgW*0.7);
    $("#sq1E").attr("height", svgH*0.7 / 3);

    sSq1 = scr;
    turnSq1();

    let svgWidth = $(svgID).width() / 2;

    let cx = svgWidth/2;
    let cy = svgWidth/2;

    let w = svgWidth;

    let cp0 = [0.2*w,0.2*w];
    let cp1 = rotateSq1(cx, cy, cp0[0], cp0[1], 330);
    let cp2 = rotateSq1(cx, cy, cp1[0], cp1[1], 330);
    let cp3 = rotateSq1(cx, cy, cp2[0], cp2[1], 330);
    let cp4 = rotateSq1(cx, cy, cp3[0], cp3[1], 330);
    let cp5 = rotateSq1(cx, cy, cp4[0], cp4[1], 330);
    let cp6 = rotateSq1(cx, cy, cp5[0], cp5[1], 330);
    let cp7 = rotateSq1(cx, cy, cp6[0], cp6[1], 330);
    let cp8 = rotateSq1(cx, cy, cp7[0], cp7[1], 330);
    let cp9 = rotateSq1(cx, cy, cp8[0], cp8[1], 330);
    let cp10 = rotateSq1(cx, cy, cp9[0], cp9[1], 330);
    let cp11 = rotateSq1(cx, cy, cp10[0], cp10[1], 330);

    let cps = [
        cp0,cp1,cp2,cp3,cp4,cp5,cp6,cp7,cp8,cp9,cp10,cp11
    ];
    
    let ep1 = intersectLines(cx,cy,cp1[0],cp1[1],cp0[0],cp0[1],cp3[0],cp3[1]);
    let ep2 = rotateSq1(cx, cy, ep1[0], ep1[1], 330);
    let ep3 = rotateSq1(cx, cy, ep2[0], ep2[1], 330);
    let ep4 = rotateSq1(cx, cy, ep3[0], ep3[1], 330);
    let ep5 = rotateSq1(cx, cy, ep4[0], ep4[1], 330);
    let ep6 = rotateSq1(cx, cy, ep5[0], ep5[1], 330);
    let ep7 = rotateSq1(cx, cy, ep6[0], ep6[1], 330);
    let ep8 = rotateSq1(cx, cy, ep7[0], ep7[1], 330);
    let ep9 = rotateSq1(cx, cy, ep8[0], ep8[1], 330);
    let ep10 = rotateSq1(cx, cy, ep9[0], ep9[1], 330);
    let ep11 = rotateSq1(cx, cy, ep10[0], ep10[1], 330);
    let ep0 = rotateSq1(cx, cy, ep11[0], ep11[1], 330);

    let eps = [
        ep0,ep1,ep2,ep3,ep4,ep5,ep6,ep7,ep8,ep9,ep10,ep11
    ];

    let icp0 = [0.25*w,0.25*w];
    let icp1 = rotateSq1(cx, cy, icp0[0], icp0[1], 330);
    let icp2 = rotateSq1(cx, cy, icp1[0], icp1[1], 330);
    let icp3 = rotateSq1(cx, cy, icp2[0], icp2[1], 330);
    let icp4 = rotateSq1(cx, cy, icp3[0], icp3[1], 330);
    let icp5 = rotateSq1(cx, cy, icp4[0], icp4[1], 330);
    let icp6 = rotateSq1(cx, cy, icp5[0], icp5[1], 330);
    let icp7 = rotateSq1(cx, cy, icp6[0], icp6[1], 330);
    let icp8 = rotateSq1(cx, cy, icp7[0], icp7[1], 330);
    let icp9 = rotateSq1(cx, cy, icp8[0], icp8[1], 330);
    let icp10 = rotateSq1(cx, cy, icp9[0], icp9[1], 330);
    let icp11 = rotateSq1(cx, cy, icp10[0], icp10[1], 330);

    let icps = [
        icp0,icp1,icp2,icp3,icp4,icp5,icp6,icp7,icp8,icp9,icp10,icp11
    ];
    
    let iep1 = intersectLines(cx,cy,icp1[0],icp1[1],icp0[0],icp0[1],icp3[0],icp3[1]);
    let iep2 = rotateSq1(cx, cy, iep1[0], iep1[1], 330);
    let iep3 = rotateSq1(cx, cy, iep2[0], iep2[1], 330);
    let iep4 = rotateSq1(cx, cy, iep3[0], iep3[1], 330);
    let iep5 = rotateSq1(cx, cy, iep4[0], iep4[1], 330);
    let iep6 = rotateSq1(cx, cy, iep5[0], iep5[1], 330);
    let iep7 = rotateSq1(cx, cy, iep6[0], iep6[1], 330);
    let iep8 = rotateSq1(cx, cy, iep7[0], iep7[1], 330);
    let iep9 = rotateSq1(cx, cy, iep8[0], iep8[1], 330);
    let iep10 = rotateSq1(cx, cy, iep9[0], iep9[1], 330);
    let iep11 = rotateSq1(cx, cy, iep10[0], iep10[1], 330);
    let iep0 = rotateSq1(cx, cy, iep11[0], iep11[1], 330);

    let ieps = [
        iep0,iep1,iep2,iep3,iep4,iep5,iep6,iep7,iep8,iep9,iep10,iep11
    ];

    $("#sq1T").empty();
    $("#sq1B").empty();
    $("#sq1E").empty();

    //OuterColors
    for (let i=0; i<cps.length; i++) {
        let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let polyT = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let color = colorsSq1[sq1.indexOf(sq1T[i])];
        let iColor = iColorsSq1[sq1.indexOf(sq1T[i])];
        if (sq1T[i].split("").length === 2) {
            if (sq1T[i].split("")[1] === "1") {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[0][0]+","+cps[0][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                }
                else {
                    $(poly).attr("points", cps[i+1][0]+","+cps[i+1][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                }
            }
            else {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[0][0]+","+eps[0][1]);
                }
                else {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[i+1][0]+","+eps[i+1][1]);
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

        $(poly).attr("style", "fill:"+color+";stroke:"+stroke+";stroke-width:1");
        $(polyT).attr("style", "fill:"+iColor+";stroke:"+stroke+";stroke-width:1");

        $("#sq1T").append(poly);
        $("#sq1T").append(polyT);
    }

    //InnerColors
    for (let i=0; i<icps.length; i++) {
        let polyT = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let iColor = iColorsSq1[sq1.indexOf(sq1T[i])];

        if (sq1T[i].split("").length === 2) {
            if (sq1T[i].split("")[1] === "1") {
                if (i === cps.length-1) {
                    $(polyT).attr("points", cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]+" "+icps[0][0]+","+icps[0][1]+" "+ieps[1][0]+","+ieps[1][1]);
                }
                else if (i === cps.length-2) {
                    $(polyT).attr("points", cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]+" "+icps[i+1][0]+","+icps[i+1][1]+" "+ieps[0][0]+","+ieps[0][1]);
                }
                else {
                    $(polyT).attr("points", cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]+" "+icps[i+1][0]+","+icps[i+1][1]+" "+ieps[i+2][0]+","+ieps[i+2][1]);
                }
            }
        }

        $(polyT).attr("style", "fill:"+iColor+";stroke:"+stroke+";stroke-width:1");

        $("#sq1T").append(polyT);
    }

    //OuterColors
    for (let i=0; i<cps.length; i++) {
        let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let polyB = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let color = colorsSq1[sq1.indexOf(sq1B[i])];
        let iColor = iColorsSq1[sq1.indexOf(sq1B[i])];
        if (sq1B[i].split("").length === 2) {
            if (sq1B[i].split("")[1] === "1") {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[0][0]+","+cps[0][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                }
                else {
                    $(poly).attr("points", cps[i+1][0]+","+cps[i+1][1]+" "+cx+","+cy+" "+eps[i][0]+","+eps[i][1]);
                }
            }
            else {
                if (i === cps.length-1) {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[0][0]+","+eps[0][1]);
                }
                else {
                    $(poly).attr("points", cps[i][0]+","+cps[i][1]+" "+cx+","+cy+" "+eps[i+1][0]+","+eps[i+1][1]);
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

        $(poly).attr("style", "fill:"+color+";stroke:"+stroke+";stroke-width:1");
        $(polyB).attr("style", "fill:"+iColor+";stroke:"+stroke+";stroke-width:1");

        $("#sq1B").append(poly);
        $("#sq1B").append(polyB);
    }

    //InnerColors
    for (let i=0; i<icps.length; i++) {
        let polyB = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        let iColor = iColorsSq1[sq1.indexOf(sq1B[i])];

        if (sq1B[i].split("").length === 2) {
            if (sq1B[i].split("")[1] === "1") {
                if (i === icps.length-1) {
                    $(polyB).attr("points", cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]+" "+icps[0][0]+","+icps[0][1]+" "+ieps[1][0]+","+ieps[1][1]);
                }
                else if (i === icps.length-2) {
                    $(polyB).attr("points", cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]+" "+icps[i+1][0]+","+icps[i+1][1]+" "+ieps[0][0]+","+ieps[0][1]);
                }
                else {
                    $(polyB).attr("points", cx+","+cy+" "+ieps[i][0]+","+ieps[i][1]+" "+icps[i+1][0]+","+icps[i+1][1]+" "+ieps[i+2][0]+","+ieps[i+2][1]);
                }
            }
        }

        $(polyB).attr("style", "fill:"+iColor+";stroke:"+stroke+";stroke-width:1");

        $("#sq1B").append(polyB);
    }

    let sq1EW = $("#sq1E").width();
    let sq1EH = sq1EW/3;

    let rectE1 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE1).attr("x", 0);
    $(rectE1).attr("y", 0);
    $(rectE1).attr("width", sq1EW/3);
    $(rectE1).attr("height", sq1EH);
    $(rectE1).attr("style", "fill:"+colorE+";stroke:"+stroke+";stroke-width:1");
    $("#sq1E").append(rectE1);

    let eW = eFlipped? sq1EW/3: 2*sq1EW/3;
    let eC = eFlipped? colorEF: colorE;
    let rectE2 = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    $(rectE2).attr("x", sq1EW/3);
    $(rectE2).attr("y", 0);
    $(rectE2).attr("width", eW);
    $(rectE2).attr("height", sq1EH);
    $(rectE2).attr("style", "fill:"+eC+";stroke:"+stroke+";stroke-width:1");
    $("#sq1E").append(rectE2);

    function rotateSq1(cx, cy, x, y, angle) {
        let radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
    }

    function turnSq1() {
        impossible = false;
        resetSq1();
        try {
            let us = [];
            let ds = [];
            let slices = 0;
            let commas = 0;
            let scr = sSq1.replaceAll(" ","");
    
            for (let s of scr.split("")) {
                if (s === "/") {
                    slices++;
                }
                else if (s === ",") {
                    commas++;
                }
            }
    
            scr = scr.replaceAll("(","");
            scr = scr.replaceAll(")","");
    
            if (scr.split("")[0] === "/") {
                sliceSq1();
                slices--;
            }
    
            for (let t of scr.split("/")) {
                if (t.split(",").length === 2) {
                    us.push(parseInt(t.split(",")[0]));
                    ds.push(parseInt(t.split(",")[1]));
                }
            }
    
            let scrambleOk = (
                sSq1.replaceAll(" ","").replaceAll("(","").replaceAll(")","").replaceAll("-","").replaceAll("/","").replaceAll(",","")
                .replaceAll("0","").replaceAll("1","").replaceAll("2","").replaceAll("3","").replaceAll("4","").replaceAll("5","").replaceAll("6","")) === "" 
                && us.length === ds.length && !us.includes(NaN) && !ds.includes(NaN) && commas === us.length && (slices === us.length || slices === us.length + 1 || slices === us.length - 1);
    
            if (scrambleOk) {
                for (let i=0; i<us.length; i++) {
                    uSq1(us[i]);
                    dSq1(ds[i]);
                    if (slices !== 0) {
                        sliceSq1();
                        slices--;
                    }
                }
            }
            else {
                resetSq1()
            }
    
            if (impossible) {
                $("#inpScramble").css("color","red");
                resetSq1();
                drawSq1();
            }
        } catch (error) {
            resetSq1();
        }
    }
    
    function uSq1(number) {
        let arr = [];
        let temp = sq1T;
    
        arr = turnFaceSq1(arr, temp, number);
    
        sq1T = arr;
    }
    
    function dSq1(number) {
        let arr = [];
        let temp = sq1B;
    
        arr = turnFaceSq1(arr, temp, number);
    
        sq1B = arr;
    }
    
    function turnFaceSq1(arr, temp, number) {
        for (let i=0; i<temp.length; i++) {
            if (number === 0) {
                arr = temp;
            }
            else if (number > 0) {
                if (i-number < 0) {
                    arr[i] = temp[i-number+temp.length];
                }
                else {
                    arr[i] = temp[i-number];
                }
            }
            else if (number < 0) {
                if (i-number >= temp.length) {
                    arr[i] = temp[i-number-temp.length];
                }
                else {
                    arr[i] = temp[i-number];
                }
            }
        }
    
        return arr;
    }
    
    function sliceSq1() {
        if (canSliceSq1()) {
            eFlipped = !eFlipped;
            let arrT = sq1T;
            let arrB = sq1B;
            let temp = arrT.concat();
    
            for (let i=2; i<8; i++) {
                arrT[i] = arrB[i-1];
            }
            for (let i=1; i<7; i++) {
                arrB[i] = temp[i+1];
            }
    
            sq1T = arrT;
            sq1B = arrB;
        }
        else {
            impossible = true;
        }
    }
    
    function canSliceSq1() {
        return (sq1T[1].split("")[0] !== sq1T[2].split("")[0] && sq1T[7].split("")[0] !== sq1T[8].split("")[0] && 
                sq1B[0].split("")[0] !== sq1B[1].split("")[0] && sq1B[6].split("")[0] !== sq1B[7].split("")[0]);
    }
    
    function resetSq1() {
        sq1T = sq1.slice(0,12);
        sq1B = sq1.slice(12,24);
        eFlipped = false;
    }
}

// Skewb
function drawScrambleSkewb(svgID, scr, advanced = false) {
    $(svgID).empty();
    let n = 3;

    let moves = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"];
    let movesA = ["F", "F'", "R", "R'", "L", "L'", "B", "B'", "f", "f'", "r", "r'", "l", "l'", "b", "b'"];
    let movesAC = ["z y' R y z'", "z y' R' y z'", "z R z'", "z R' z'", "z' L z", "z' L' z", "x B x'", "x B' x'", "y' R y", "y' R' y", "R", "R'", "L", "L'", "B", "B'"];

    if (advanced) {
        scr = scr.split(" ").map(s => movesAC[movesA.indexOf(s)]).join(" ");
    }

    let cW = "1";
    let cY = "2";
    let cG = "3";
    let cB = "4";
    let cR = "5";
    let cO = "6";

    class Corner {
        constructor(c1, c2, c3) {
            this.c1 = c1;
            this.c2 = c2;
            this.c3 = c3;
        }
    }

    class Center {
        constructor(c) {
            this.c = c;
        }
    }

    let ce1 = new Center(cW);
    let ce2 = new Center(cO);
    let ce3 = new Center(cG);
    let ce4 = new Center(cR);
    let ce5 = new Center(cB);
    let ce6 = new Center(cY);

    let co1 = new Corner(cW, cO, cB);
    let co2 = new Corner(cW, cB, cR);
    let co3 = new Corner(cW, cR, cG);
    let co4 = new Corner(cW, cG, cO);
    let co5 = new Corner(cY, cO, cG);
    let co6 = new Corner(cY, cG, cR);
    let co7 = new Corner(cY, cR, cB);
    let co8 = new Corner(cY, cB, cO);

    let cleanSkewbCo = [co1, co2, co3, co4, co5, co6, co7, co8];
    let skewbCo = [co1, co2, co3, co4, co5, co6, co7, co8];
    let cleanSkewbCe = [ce1, ce2, ce3, ce4, ce5, ce6];
    let skewbCe = [ce1, ce2, ce3, ce4, ce5, ce6];
    
    let cube = getSkewbState(scr);

    let width = $(svgID).width();
    let height = 3 * width / 4;
    $(svgID).height(height);
    let space = width / 20;
    let size = ((width - 3 * space) / 4) / n;
    let fill = "";
    let stroke = "#1E1E1E";
    let strokeWidth = ((size / n) > 1) ? 1 : 0;

    let coordinates = [
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: 0,
            y2: n * size,
        },
        {
            x1: 0,
            x2: n * size,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: 2 * n * size + 2 * space,
            x2: 3 * n * size + 2 * space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: 3 * n * size + 3 * space,
            x2: 4 * n * size + 3 * space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: 2 * n * size + 2 * space,
            y2: 3 * n * size + 2 * space,
        }
    ];
    

    let cWhite = [cube[0], cube[3], cube[6], cube[9], cube[24]];
    let cYellow = [cube[12], cube[15], cube[18], cube[21], cube[29]];
    let cGreen = [cube[10], cube[8], cube[16], cube[14], cube[26]];
    let cBlue = [cube[4], cube[2], cube[22], cube[20], cube[28]];
    let cRed = [cube[7], cube[5], cube[19], cube[17], cube[27]];
    let cOrange = [cube[1], cube[11], cube[13], cube[23], cube[25]];
    let colors = [cWhite, cOrange, cGreen, cRed, cBlue, cYellow];

    for (let i = 0; i < 6; i++) {
        let j = 0;
        let x1 = coordinates[i].x1;
        let x2 = coordinates[i].x2;
        let y1 = coordinates[i].y1;
        let y2 = coordinates[i].y2;

        let points = [
            x1+","+y1+" "+(x1+(x2-x1)/2)+","+y1+" "+x1+","+(y1+(y2-y1)/2)+" "+x1+","+y1,
            x2+","+y1+" "+x2+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y1+" "+x2+","+y1,
            x2+","+y2+" "+(x1+(x2-x1)/2)+","+y2+" "+x2+","+(y1+(y2-y1)/2)+" "+x2+","+y2,
            x1+","+y2+" "+x1+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y2+" "+x1+","+y2,
            (x1+(x2-x1)/2)+","+y1+" "+x2+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y2+" "+x1+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y1
        ];

        for (let p of points) {
            fill = getSkewbColor(colors[i].shift());
                
            let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
            $(poly).attr("points", p);
            $(poly).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(poly);
        }
    }

    function getSkewbColor(n) {
        switch (n) {
            case "1":
                return "white";
            case "2":
                return "yellow";
            case "3":
                return "#00FF00";
            case "4":
                return "blue";
            case "5":
                return "red";
            case "6":
                return "#FFAA00";
        }
    }

    function cleanMoves(m) {
        while (m.includes("&nbsp;&nbsp;")) {
            m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
        }
    
        return m.trim();
    }

    function getSkewbState(sol) {
        resetCubeState();
        sol = cleanMoves(sol);
        let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
        for (let a of arr) {
            switch (a.replaceAll("*","")) {
                case "R":
                    _r();
                    break;
                case "R'":
                    _ri();
                    break;
                case "L":
                    _l();
                    break;
                case "L'":
                    _li();
                    break;
                case "B":
                    _b();
                    break;
                case "B'":
                    _bi();
                    break;
                case "U":
                    _u();
                    break;
                case "U'":
                    _ui();
                    break;
                case "x":
                    _x();
                    break;
                case "x2":
                    _x2();
                    break;
                case "x'":
                    _xi();
                    break;
                case "y":
                    _y();
                    break;
                case "y2":
                    _y2();
                    break;
                case "y'":
                    _yi();
                    break;
                case "z":
                    _z();
                    break;
                case "z2":
                    _z2();
                    break;
                case "z'":
                    _zi();
                    break;
            }
        }
    
        return skewbCo.map(s => s.c1 + s.c2 + s.c3).join("") + skewbCe.map(s => s.c).join("");
    }
    
    function resetCubeState() {
        skewbCo = cleanSkewbCo.slice();
        skewbCe = cleanSkewbCe.slice();
    }
    
    function _r() {
        let tempCo = skewbCo.slice();

        skewbCo[6] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo[1] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo[7] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo[5] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);

        let tempCe = skewbCe.slice();

        skewbCe[3] = new Center(tempCe[5].c);
        skewbCe[4] = new Center(tempCe[3].c);
        skewbCe[5] = new Center(tempCe[4].c);
    }
    function _ri() {
        _r();
        _r();
    }
    function _l() {
        let tempCo = skewbCo.slice();

        skewbCo[4] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo[3] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo[5] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo[7] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);

        let tempCe = skewbCe.slice();

        skewbCe[1] = new Center(tempCe[5].c);
        skewbCe[2] = new Center(tempCe[1].c);
        skewbCe[5] = new Center(tempCe[2].c);
    }
    function _li() {
        _l();
        _l();
    }
    function _b() {
        let tempCo = skewbCo.slice();

        skewbCo[7] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo[0] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);
        skewbCo[4] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo[6] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);

        let tempCe = skewbCe.slice();

        skewbCe[1] = new Center(tempCe[4].c);
        skewbCe[4] = new Center(tempCe[5].c);
        skewbCe[5] = new Center(tempCe[1].c);
    }
    function _bi() {
        _b();
        _b();
    }
    function _u() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);
        skewbCo[1] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo[3] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo[7] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);

        let tempCe = skewbCe.slice();

        skewbCe[0] = new Center(tempCe[4].c);
        skewbCe[1] = new Center(tempCe[0].c);
        skewbCe[4] = new Center(tempCe[1].c);
    }
    function _ui() {
        _u();
        _u();
    }
    function _x() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo[1] = new Corner(tempCo[2].c3, tempCo[2].c1, tempCo[2].c2);
        skewbCo[2] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo[3] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo[4] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo[5] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo[6] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo[7] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);

        let tempCe = skewbCe.slice();

        skewbCe[0] = new Center(tempCe[2].c);
        skewbCe[2] = new Center(tempCe[5].c);
        skewbCe[5] = new Center(tempCe[4].c);
        skewbCe[4] = new Center(tempCe[0].c);
    }
    function _x2() {
        _x();
        _x();
    }
    function _xi() {
        _x();
        _x();
        _x();
    }
    function _y() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[3].c1, tempCo[3].c2, tempCo[3].c3);
        skewbCo[1] = new Corner(tempCo[0].c1, tempCo[0].c2, tempCo[0].c3);
        skewbCo[2] = new Corner(tempCo[1].c1, tempCo[1].c2, tempCo[1].c3);
        skewbCo[3] = new Corner(tempCo[2].c1, tempCo[2].c2, tempCo[2].c3);
        skewbCo[4] = new Corner(tempCo[5].c1, tempCo[5].c2, tempCo[5].c3);
        skewbCo[5] = new Corner(tempCo[6].c1, tempCo[6].c2, tempCo[6].c3);
        skewbCo[6] = new Corner(tempCo[7].c1, tempCo[7].c2, tempCo[7].c3);
        skewbCo[7] = new Corner(tempCo[4].c1, tempCo[4].c2, tempCo[4].c3);

        let tempCe = skewbCe.slice();

        skewbCe[1] = new Center(tempCe[2].c);
        skewbCe[2] = new Center(tempCe[3].c);
        skewbCe[3] = new Center(tempCe[4].c);
        skewbCe[4] = new Center(tempCe[1].c);
    }
    function _y2() {
        _y();
        _y();
    }
    function _yi() {
        _y();
        _y();
        _y();
    }
    function _z() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo[1] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo[2] = new Corner(tempCo[3].c3, tempCo[3].c1, tempCo[3].c2);
        skewbCo[3] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);
        skewbCo[4] = new Corner(tempCo[5].c3, tempCo[5].c1, tempCo[5].c2);
        skewbCo[5] = new Corner(tempCo[2].c2, tempCo[2].c3, tempCo[2].c1);
        skewbCo[6] = new Corner(tempCo[1].c3, tempCo[1].c1, tempCo[1].c2);
        skewbCo[7] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);

        let tempCe = skewbCe.slice();

        skewbCe[0] = new Center(tempCe[1].c);
        skewbCe[1] = new Center(tempCe[5].c);
        skewbCe[5] = new Center(tempCe[3].c);
        skewbCe[3] = new Center(tempCe[0].c);
    }
    function _z2() {
        _z();
        _z();
    }
    function _zi() {
        _z();
        _z();
        _z();
    }
}

// Pyraminx
function drawScramblePyraminx(svgID, scr) {
    $(svgID).empty();

    let moves = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"];
    let tipsMoves = ["u", "u'", "r", "r'", "l", "l'", "b", "b'"];

    let cR = "1";
    let cG = "2";
    let cB = "3";
    let cY = "4";

    let pyraL = [cR, cR, cR, cR, cR, cR, cR, cR, cR];
    let pyraF = [cG, cG, cG, cG, cG, cG, cG, cG, cG];
    let pyraR = [cB, cB, cB, cB, cB, cB, cB, cB, cB];
    let pyraD = [cY, cY, cY, cY, cY, cY, cY, cY, cY];

    let cleanPyraminx = [pyraL, pyraF, pyraR, pyraD];
    let pyraminx = [pyraL, pyraF, pyraR, pyraD];
    
    let pyra = getPyraminxState(scr);

    let width = $(svgID).width() * 0.8;
    let height = Math.sqrt(3) * width / 2;
    $(svgID).height(height);
    let space = width / 20;
    let size = (height - space) / 2;
    let t = size / 3;
    let fill = "";
    let stroke = "#1E1E1E";
    let strokeWidth = 1;

    let coordinates = [
        {
            x1: 0,
            y1: 0
        },
        {
            x1: size + space,
            y1: 0
        },
        {
            x1: size + 2 * space,
            y1: 0
        },
        {
            x1: 0.5 * size + space,
            y1: space + size * Math.sqrt(3) / 2
        }
    ];
    
    let cRed = [pyra[0][0], pyra[0][1], pyra[0][2], pyra[0][3], pyra[0][4], pyra[0][5], pyra[0][6], pyra[0][7], pyra[0][8]];
    let cGreen = [pyra[1][0], pyra[1][1], pyra[1][2], pyra[1][3], pyra[1][4], pyra[1][5], pyra[1][6], pyra[1][7], pyra[1][8]];
    let cBlue = [pyra[2][0], pyra[2][1], pyra[2][2], pyra[2][3], pyra[2][4], pyra[2][5], pyra[2][6], pyra[2][7], pyra[2][8]];
    let cYellow = [pyra[3][0], pyra[3][1], pyra[3][2], pyra[3][3], pyra[3][4], pyra[3][5], pyra[3][6], pyra[3][7], pyra[3][8]];

    for (let i = 0; i < 4; i++) {
        let j = 0;
        let x1 = coordinates[i].x1;
        let y1 = coordinates[i].y1;

        let points = [
            x1+","+y1+" "+(x1+t)+","+y1+" "+(x1+0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+x1+","+y1,
            (x1+t)+","+y1+" "+(x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+t)+","+y1,
            (x1+t)+","+y1+" "+(x1+2*t)+","+y1+" "+(x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+t)+","+y1,
            (x1+2*t)+","+y1+" "+(x1+2.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+2*t)+","+y1,
            (x1+2*t)+","+y1+" "+(x1+3*t)+","+y1+" "+(x1+2.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+2*t)+","+y1,
            (x1+0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+t/2)+","+(y1+t*Math.sqrt(3)/2),
            (x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+2*t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2),
            (x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+2.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+2*t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+1.5*t)+","+(y1+t*Math.sqrt(3)/2),
            (x1+t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+2*t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+1.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+(x1+t)+","+(y1+2*t*Math.sqrt(3)/2)
        ];

        let pointsF = [
            x1+","+y1+" "+(x1+0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1-0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+x1+","+y1,
            (x1-0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+x1+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1-1*t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1-0.5*t)+","+(y1+t*Math.sqrt(3)/2),
            (x1-0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+x1+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1-0.5*t)+","+(y1+t*Math.sqrt(3)/2),
            (x1+0.5*t)+","+(y1+t*Math.sqrt(3)/2)+" "+(x1+t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+x1+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+0.5*t)+","+(y1+t*Math.sqrt(3)/2),
            (x1-1*t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1-0.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+(x1-1.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+(x1-1*t)+","+(y1+2*t*Math.sqrt(3)/2),
            (x1-1*t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+x1+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1-0.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+(x1-1*t)+","+(y1+2*t*Math.sqrt(3)/2),
            x1+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+0.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+(x1-0.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+x1+","+(y1+2*t*Math.sqrt(3)/2),
            x1+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+0.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+x1+","+(y1+2*t*Math.sqrt(3)/2),
            (x1+t)+","+(y1+2*t*Math.sqrt(3)/2)+" "+(x1+1.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+(x1+0.5*t)+","+(y1+3*t*Math.sqrt(3)/2)+" "+(x1+t)+","+(y1+2*t*Math.sqrt(3)/2),
        ];

        let pts = i === 1 ? pointsF : points;

        for (let p of pts) {
            fill = getPyraminxColor(pyra[i][j]);
                
            let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
            $(poly).attr("points", p);
            $(poly).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(poly);
            j++;
        }
    }

    function getPyraminxColor(n) {
        switch (n) {
            case "1":
                return "#FF0000";
            case "2":
                return "#00FF00";
            case "3":
                return "blue";
            case "4":
                return "yellow";
        }
    }

    function cleanMoves(m) {
        while (m.includes("&nbsp;&nbsp;")) {
            m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
        }
    
        return m.trim();
    }

    function getPyraminxState(sol) {
        resetCubeState();
        sol = cleanMoves(sol);
        let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
        for (let a of arr) {
            switch (a.replaceAll("*","")) {
                case "R":
                    _R();
                    break;
                case "R'":
                    _Ri();
                    break;
                case "L":
                    _L();
                    break;
                case "L'":
                    _Li();
                    break;
                case "B":
                    _B();
                    break;
                case "B'":
                    _Bi();
                    break;
                case "U":
                    _U();
                    break;
                case "U'":
                    _Ui();
                    break;
                case "r":
                    _r();
                    break;
                case "r'":
                    _ri();
                    break;
                case "l":
                    _l();
                    break;
                case "l'":
                    _li();
                    break;
                case "b":
                    _b();
                    break;
                case "b'":
                    _bi();
                    break;
                case "u":
                    _u();
                    break;
                case "u'":
                    _ui();
                    break;
            }
        }
    
        return pyraminx;
    }
    
    function resetCubeState() {
        pyraminx = cleanPyraminx.slice();
    }
    
    function _R() {
        let p = pyraminx;
        let tempTip = p[1][8];
        let tempCe = p[1][7];
        let tempE1 = p[1][6];
        let tempE2 = p[1][3];

        p[1][8] = p[3][4];
        p[3][4] = p[2][8];
        p[2][8] = tempTip;

        p[1][7] = p[3][3];
        p[3][3] = p[2][6];
        p[2][6] = tempCe;

        p[1][6] = p[3][7];
        p[3][7] = p[2][5];
        p[2][5] = tempE1;

        p[1][3] = p[3][2];
        p[3][2] = p[2][7];
        p[2][7] = tempE2;
    }
    function _Ri() {
        _R();
        _R();
    }
    function _L() {
        let p = pyraminx;
        let tempTip = p[1][4];
        let tempCe = p[1][5];
        let tempE1 = p[1][6];
        let tempE2 = p[1][1];

        p[1][4] = p[0][8];
        p[0][8] = p[3][0];
        p[3][0] = tempTip;

        p[1][5] = p[0][6];
        p[0][6] = p[3][1];
        p[3][1] = tempCe;

        p[1][6] = p[0][7];
        p[0][7] = p[3][5];
        p[3][5] = tempE1;

        p[1][1] = p[0][5];
        p[0][5] = p[3][2];
        p[3][2] = tempE2;
    }
    function _Li() {
        _L();
        _L();
    }
    function _B() {
        let p = pyraminx;
        let tempTip = p[3][8];
        let tempCe = p[3][6];
        let tempE1 = p[3][7];
        let tempE2 = p[3][5];

        p[3][8] = p[0][0];
        p[0][0] = p[2][4];
        p[2][4] = tempTip;

        p[3][6] = p[0][1];
        p[0][1] = p[2][3];
        p[2][3] = tempCe;

        p[3][7] = p[0][5];
        p[0][5] = p[2][2];
        p[2][2] = tempE1;

        p[3][5] = p[0][2];
        p[0][2] = p[2][7];
        p[2][7] = tempE2;
    }
    function _Bi() {
        _B();
        _B();
    }
    function _U() {
        let p = pyraminx;
        let tempTip = p[1][0];
        let tempCe = p[1][2];
        let tempE1 = p[1][1];
        let tempE2 = p[1][3];

        p[1][0] = p[2][0];
        p[2][0] = p[0][4];
        p[0][4] = tempTip;

        p[1][2] = p[2][1];
        p[2][1] = p[0][3];
        p[0][3] = tempCe;

        p[1][1] = p[2][5];
        p[2][5] = p[0][2];
        p[0][2] = tempE1;

        p[1][3] = p[2][2];
        p[2][2] = p[0][7];
        p[0][7] = tempE2;
    }
    function _Ui() {
        _U();
        _U();
    }
    function _r() {
        let p = pyraminx;
        let tempTip = p[1][8];

        p[1][8] = p[3][4];
        p[3][4] = p[2][8];
        p[2][8] = tempTip;
    }
    function _ri() {
        _r();
        _r();
    }
    function _l() {
        let p = pyraminx;
        let tempTip = p[1][4];

        p[1][4] = p[0][8];
        p[0][8] = p[3][0];
        p[3][0] = tempTip;
    }
    function _li() {
        _l();
        _l();
    }
    function _b() {
        let p = pyraminx;
        let tempTip = p[3][8];

        p[3][8] = p[0][0];
        p[0][0] = p[2][4];
        p[2][4] = tempTip;
    }
    function _bi() {
        _b();
        _b();
    }
    function _u() {
        let p = pyraminx;
        let tempTip = p[1][0];

        p[1][0] = p[2][0];
        p[2][0] = p[0][4];
        p[0][4] = tempTip;
    }
    function _ui() {
        _u();
        _u();
    }
}

// Megaminx
function drawScrambleMegaminx(svgID, scr) {
    $(svgID).empty();

    let cleanMega = [
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2"],
        ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3"],
        ["4", "4", "4", "4", "4", "4", "4", "4", "4", "4"],
        ["5", "5", "5", "5", "5", "5", "5", "5", "5", "5"],
        ["6", "6", "6", "6", "6", "6", "6", "6", "6", "6"],
        ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
        ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["c", "c", "c", "c", "c", "c", "c", "c", "c", "c"],
        ["d", "d", "d", "d", "d", "d", "d", "d", "d", "d"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["f", "f", "f", "f", "f", "f", "f", "f", "f", "f"]
    ];
    let mega = cleanMega.slice();

    let cleanMegaCenters = ["1", "2", "3", "4", "5", "6", "a", "b", "c", "d", "e", "f"];
    let megaCenters = cleanMegaCenters.slice();
    
    getMegaState(scr);
    
    let width = $(svgID).width();
    let height = width * 0.6;
    $(svgID).height(height);
    let space = width / 30;
    let a = width / 10;
    let diag = a * (1 + Math.sqrt(5)) / 2;
    let megaH = a * Math.sqrt(5 + 2*Math.sqrt(5)) / 2;
    let megaHs = megaH - (Math.sqrt(a*a-(diag/2)*(diag/2)));
    let size = width / 6;
    let ang = 360 / 5;
    let fill = "";
    let stroke = "#000000";
    let strokeWidth = 1;
    let megaColors = ["#FFFFFF", "#006600", "#DD0000", "#0000B3", "#FFCC00", "#8A1AFF", "#999999", "#71E600", "#FF99FF", "#FFFFB3", "#88DDFF", "#FF8433"];

    let points = [];
    let pntM;
    let pnt;
    let cxM;
    let cyM;
    let cx5;
    let cx2;
    let cy2;

    for (let i = 0; i < 12; i++) {
        let c = [0, 4, 3, 2, 1, 5, 0, 4, 3, 2, 1, 5][i];
        if (i === 0) {
            cxM = size*1.5;
            cyM = height / 2;
            pntM = [
                {x: cxM, y: cyM},
                {x: rotatePoint(cxM, cyM-a, cxM, cyM, 0, false).x, y: rotatePoint(cxM, cyM-a, cxM, cyM, 0, false).y},
                {x: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 1, false).x, y: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 1, false).y},
                {x: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 2, false).x, y: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 2, false).y},
                {x: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 3, false).x, y: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 3, false).y},
                {x: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 4, false).x, y: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 4, false).y},
                {x: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 5, false).x, y: rotatePoint(cxM, cyM-a, cxM, cyM, ang * 5, false).y}
            ];

            pnt = pntM.slice();
    
            points.push(pnt);
        }
        else if (i === 6) {
            cxM = 2 * cx2 - cx5;
            cyM = cy2;
            pntM = [
                {x: cxM, y: cyM},
                {x: rotatePoint(cxM, cyM+a, cxM, cyM, 0, false).x, y: rotatePoint(cxM, cyM+a, cxM, cyM, 0, false).y},
                {x: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 1, false).x, y: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 1, false).y},
                {x: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 2, false).x, y: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 2, false).y},
                {x: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 3, false).x, y: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 3, false).y},
                {x: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 4, false).x, y: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 4, false).y},
                {x: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 5, false).x, y: rotatePoint(cxM, cyM+a, cxM, cyM, ang * 5, false).y}
            ];

            pnt = pntM.slice();

            points.push(pnt);
        }
        else if (i === 1 || i === 7) {
            let cx = rotatePoint(cxM, cyM, (pntM[3].x+pntM[4].x)/2, pntM[3].y, 180, false).x;
            let cy = rotatePoint(cxM, cyM, (pntM[3].x+pntM[4].x)/2, pntM[3].y, 180, false).y;
            let point = [
                {x: cx, y: cy},
                {x: pntM[c].x, y: pntM[c].y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 1, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 1, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 2, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 2, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 3, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 3, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 4, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 4, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 5, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 5, false).y}
            ];

            pnt = point.slice();

            points.push(pnt);
        }
        else {
            let cx = rotatePoint(pnt[0].x, pnt[0].y, cxM, cyM, -ang, false).x;
            let cy = rotatePoint(pnt[0].x, pnt[0].y, cxM, cyM, -ang, false).y;
            let point = [
                {x: cx, y: cy},
                {x: pntM[c].x, y: pntM[c].y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 1, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 1, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 2, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 2, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 3, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 3, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 4, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 4, false).y},
                {x: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 5, false).x, y: rotatePoint(pntM[c].x, pntM[c].y, cx, cy, ang * 5, false).y}
            ];

            if (i === 2) {
                cx2 = cx;
                cy2 = cy;
            }
            else if (i === 5) {
                cx5 = cx;
            }

            pnt = point.slice();

            points.push(pnt);
        }
    }
    
    let eL = ((points[0][3].x + points[0][4].x) / 2) / 5;
    let cL = 2 * eL;
    for (let i = 0; i < mega.length; i++) {
        let mCe = megaCenters[i];
        let polyCe = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
        fill = getMegaColor(mCe);
        
        let facePoints = points[i].slice();
        let pointsCe = [];
        for (let i = 1; i < facePoints.length; i++) {
            let px = (facePoints[0].x + facePoints[i].x) / 2;
            let py = (facePoints[0].y + facePoints[i].y) / 2;
            pointsCe.push({x: px, y: py});
        }
        $(polyCe).attr("points", pointsCe.map(p => p.x + "," + p.y).join(" "));
        $(polyCe).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+1);
        
        $(svgID).append(polyCe);
        
        // Defining corner coordinates
        let pointsCo = [];
        let tempPoints = facePoints.slice(1);
        let lp = tempPoints.pop();
        let nlp = tempPoints.pop();
        tempPoints.unshift(nlp);
        tempPoints.push(lp);

        for (let j = 0; j < 1; j++) {
            let px0;
            let py0;
            let px1;
            let py1;
            let px2;
            let py2;
            let px3;
            let py3;

            px0 = tempPoints[j].x;
            py0 = tempPoints[j].y;

            let ep1 = rotatePoint(pointsCe[3].x, pointsCe[3].y, pointsCe[4].x, pointsCe[4].y, 180, false);
            px1 = intersectLines(px0, py0, tempPoints[1].x, tempPoints[1].y, pointsCe[3].x, pointsCe[3].y, ep1.x, ep1.y)[0];
            py1 = intersectLines(px0, py0, tempPoints[1].x, tempPoints[1].y, pointsCe[3].x, pointsCe[3].y, ep1.x, ep1.y)[1];

            px2 = pointsCe[4].x;
            py2 = pointsCe[4].y;
            
            let ep3 = rotatePoint(pointsCe[0].x, pointsCe[0].y, pointsCe[4].x, pointsCe[4].y, 180, false);
            px3 = intersectLines(px0, py0, tempPoints[4].x, tempPoints[4].y, pointsCe[0].x, pointsCe[0].y, ep3.x, ep3.y)[0];
            py3 = intersectLines(px0, py0, tempPoints[4].x, tempPoints[4].y, pointsCe[0].x, pointsCe[0].y, ep3.x, ep3.y)[1];

            pointsCo.push({
                x0: px0, y0: py0,
                x1: px1, y1: py1,
                x2: px2, y2: py2,
                x3: px3, y3: py3,
                x4: px0, y4: py0,
            });
        }

        for (let j = 1; j < 5; j++) {
            let xy0 = rotatePoint(pointsCo[0].x0, pointsCo[0].y0, facePoints[0].x, facePoints[0].y, ang * j, false);
            let xy1 = rotatePoint(pointsCo[0].x1, pointsCo[0].y1, facePoints[0].x, facePoints[0].y, ang * j, false);
            let xy2 = rotatePoint(pointsCo[0].x2, pointsCo[0].y2, facePoints[0].x, facePoints[0].y, ang * j, false);
            let xy3 = rotatePoint(pointsCo[0].x3, pointsCo[0].y3, facePoints[0].x, facePoints[0].y, ang * j, false);
            pointsCo.push({
                x0: xy0.x, y0: xy0.y,
                x1: xy1.x, y1: xy1.y,
                x2: xy2.x, y2: xy2.y,
                x3: xy3.x, y3: xy3.y,
                x4: xy0.x, y4: xy0.y,
            });
        }

        // Defining edge coordinates
        let pointsE = [];
        for (let j = 0; j < 1; j++) {
            let px0;
            let py0;
            let px1;
            let py1;
            let px2;
            let py2;
            let px3;
            let py3;

            px0 = pointsCo[0].x1;
            py0 = pointsCo[0].y1;

            px1 = pointsCo[1].x3;
            py1 = pointsCo[1].y3;

            px2 = pointsCe[0].x;
            py2 = pointsCe[0].y;

            px3 = pointsCe[4].x;
            py3 = pointsCe[4].y;

            pointsE.push({
                x0: px0, y0: py0,
                x1: px1, y1: py1,
                x2: px2, y2: py2,
                x3: px3, y3: py3,
                x4: px0, y4: py0
            });
        }

        for (let j = 1; j < 5; j++) {
            let xy0 = rotatePoint(pointsE[0].x0, pointsE[0].y0, facePoints[0].x, facePoints[0].y, ang * j, false);
            let xy1 = rotatePoint(pointsE[0].x1, pointsE[0].y1, facePoints[0].x, facePoints[0].y, ang * j, false);
            let xy2 = rotatePoint(pointsE[0].x2, pointsE[0].y2, facePoints[0].x, facePoints[0].y, ang * j, false);
            let xy3 = rotatePoint(pointsE[0].x3, pointsE[0].y3, facePoints[0].x, facePoints[0].y, ang * j, false);
            pointsE.push({
                x0: xy0.x, y0: xy0.y,
                x1: xy1.x, y1: xy1.y,
                x2: xy2.x, y2: xy2.y,
                x3: xy3.x, y3: xy3.y,
                x4: xy0.x, y4: xy0.y,
            });
        }

        // Combining points
        let pointsPieces = [];
        for (let j = 0; j < pointsCo.length; j++) {
            pointsPieces.push(pointsCo[j]);
            pointsPieces.push(pointsE[j]);
        }
        
        for (let j = 0; j < pointsPieces.length; j++) {
            let m = mega[i][j];
            let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
            fill = getMegaColor(m);
            
            let pnts = 
                pointsPieces[j].x0+","+pointsPieces[j].y0+" "+
                pointsPieces[j].x1+","+pointsPieces[j].y1+" "+
                pointsPieces[j].x2+","+pointsPieces[j].y2+" "+
                pointsPieces[j].x3+","+pointsPieces[j].y3+" "+
                pointsPieces[j].x4+","+pointsPieces[j].y4;
                
            $(poly).attr("points", pnts);
            $(poly).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+1);
            
            $(svgID).append(poly);
        }
    }

    // Bokstaver for U og F
    for (let i = 0; i < 2; i++) {
        let text = document.createElementNS('http://www.w3.org/2000/svg', "text");
        $(text).attr("x", points[i][0].x);
        $(text).attr("y", points[i][0].y);
        $(text).attr("style", "font-size:"+(a*0.5)+";font-family:monospace;font-weight:bold;fill:black;text-anchor:middle;dominant-baseline:middle;");
        let textNode = document.createTextNode(["U", "F"][i]);
        text.appendChild(textNode);

        $(svgID).append(text);
    }

    function cleanMoves(m) {
        while (m.includes("&nbsp;&nbsp;")) {
            m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
        }
    
        return m.trim();
    }

    function getMegaState(sol) {
        resetMegaState();
        sol = cleanMoves(sol);
        let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
        for (let a of arr) {
            switch (a) {
                case "U":
                    _U();
                    break;
                case "U'":
                    _U();
                    _U();
                    _U();
                    _U();
                    break;
                case "R++":
                    _R();
                    break;
                case "R--":
                    _R();
                    _R();
                    _R();
                    _R();
                    break;
                case "D++":
                    _D();
                    break;
                case "D--":
                    _D();
                    _D();
                    _D();
                    _D();
                    break;
            }
        }
    }
    
    function resetMegaState() {
        mega = cleanMega.slice();
        megaCenters = cleanMegaCenters.slice();
    }

    function _U() {
        let temp = mega.slice();

        for (let i = 0; i < mega.length; i++) {
            temp[i] = mega[i].slice();
        }

        mega[0][2] = temp[0][0];
        mega[0][3] = temp[0][1];
        mega[0][4] = temp[0][2];
        mega[0][5] = temp[0][3];
        mega[0][6] = temp[0][4];
        mega[0][7] = temp[0][5];
        mega[0][8] = temp[0][6];
        mega[0][9] = temp[0][7];
        mega[0][0] = temp[0][8];
        mega[0][1] = temp[0][9];

        mega[1][2] = temp[2][2];
        mega[1][3] = temp[2][3];
        mega[1][4] = temp[2][4];

        mega[2][2] = temp[3][2];
        mega[2][3] = temp[3][3];
        mega[2][4] = temp[3][4];

        mega[3][2] = temp[4][2];
        mega[3][3] = temp[4][3];
        mega[3][4] = temp[4][4];

        mega[4][2] = temp[5][2];
        mega[4][3] = temp[5][3];
        mega[4][4] = temp[5][4];

        mega[5][2] = temp[1][2];
        mega[5][3] = temp[1][3];
        mega[5][4] = temp[1][4];
    }

    function _R() {
        let temp = mega.slice();
        let tempCe = megaCenters.slice();

        for (let i = 0; i < mega.length; i++) {
            temp[i] = mega[i].slice();
        }

        megaCenters[0] = tempCe[10];
        megaCenters[1] = tempCe[11];
        megaCenters[2] = tempCe[6];
        megaCenters[3] = tempCe[9];
        megaCenters[4] = tempCe[1];
        megaCenters[6] = tempCe[3];
        megaCenters[7] = tempCe[2];
        megaCenters[9] = tempCe[7];
        megaCenters[10] = tempCe[4];
        megaCenters[11] = tempCe[0];

        mega[8][0] = temp[8][6];
        mega[8][1] = temp[8][7];
        mega[8][2] = temp[8][8];
        mega[8][3] = temp[8][9];
        mega[8][4] = temp[8][0];
        mega[8][5] = temp[8][1];
        mega[8][6] = temp[8][2];
        mega[8][7] = temp[8][3];
        mega[8][8] = temp[8][4];
        mega[8][9] = temp[8][5];

        mega[0][1] = temp[10][9];
        mega[0][2] = temp[10][0];
        mega[0][3] = temp[10][1];
        mega[0][4] = temp[10][2];
        mega[0][5] = temp[10][3];
        mega[0][6] = temp[10][4];
        mega[0][7] = temp[10][5];

        mega[1][3] = temp[11][1];
        mega[1][4] = temp[11][2];
        mega[1][5] = temp[11][3];
        mega[1][6] = temp[11][4];
        mega[1][7] = temp[11][5];
        mega[1][8] = temp[11][6];
        mega[1][9] = temp[11][7];

        mega[10][9] = temp[4][7];
        mega[10][0] = temp[4][8];
        mega[10][1] = temp[4][9];
        mega[10][2] = temp[4][0];
        mega[10][3] = temp[4][1];
        mega[10][4] = temp[4][2];
        mega[10][5] = temp[4][3];

        mega[11][1] = temp[0][1];
        mega[11][2] = temp[0][2];
        mega[11][3] = temp[0][3];
        mega[11][4] = temp[0][4];
        mega[11][5] = temp[0][5];
        mega[11][6] = temp[0][6];
        mega[11][7] = temp[0][7];

        mega[4][7] = temp[1][3];
        mega[4][8] = temp[1][4];
        mega[4][9] = temp[1][5];
        mega[4][0] = temp[1][6];
        mega[4][1] = temp[1][7];
        mega[4][2] = temp[1][8];
        mega[4][3] = temp[1][9];
        
        mega[2][0] = temp[6][8];
        mega[2][1] = temp[6][9];
        mega[2][2] = temp[6][0];
        mega[2][3] = temp[6][1];
        mega[2][4] = temp[6][2];
        mega[2][5] = temp[6][3];
        mega[2][6] = temp[6][4];
        mega[2][7] = temp[6][5];
        mega[2][8] = temp[6][6];
        mega[2][9] = temp[6][7];
        
        mega[3][0] = temp[9][2];
        mega[3][1] = temp[9][3];
        mega[3][2] = temp[9][4];
        mega[3][3] = temp[9][5];
        mega[3][4] = temp[9][6];
        mega[3][5] = temp[9][7];
        mega[3][6] = temp[9][8];
        mega[3][7] = temp[9][9];
        mega[3][8] = temp[9][0];
        mega[3][9] = temp[9][1];
        
        mega[6][0] = temp[3][4];
        mega[6][1] = temp[3][5];
        mega[6][2] = temp[3][6];
        mega[6][3] = temp[3][7];
        mega[6][4] = temp[3][8];
        mega[6][5] = temp[3][9];
        mega[6][6] = temp[3][0];
        mega[6][7] = temp[3][1];
        mega[6][8] = temp[3][2];
        mega[6][9] = temp[3][3];
        
        mega[7][0] = temp[2][2];
        mega[7][1] = temp[2][3];
        mega[7][2] = temp[2][4];
        mega[7][3] = temp[2][5];
        mega[7][4] = temp[2][6];
        mega[7][5] = temp[2][7];
        mega[7][6] = temp[2][8];
        mega[7][7] = temp[2][9];
        mega[7][8] = temp[2][0];
        mega[7][9] = temp[2][1];
        
        mega[9][0] = temp[7][4];
        mega[9][1] = temp[7][5];
        mega[9][2] = temp[7][6];
        mega[9][3] = temp[7][7];
        mega[9][4] = temp[7][8];
        mega[9][5] = temp[7][9];
        mega[9][6] = temp[7][0];
        mega[9][7] = temp[7][1];
        mega[9][8] = temp[7][2];
        mega[9][9] = temp[7][3];
    }

    function _D() {
        let temp = mega.slice();
        let tempCe = megaCenters.slice();

        for (let i = 0; i < mega.length; i++) {
            temp[i] = mega[i].slice();
        }

        megaCenters[1] = tempCe[4];
        megaCenters[2] = tempCe[5];
        megaCenters[3] = tempCe[1];
        megaCenters[4] = tempCe[2];
        megaCenters[5] = tempCe[3];
        megaCenters[7] = tempCe[9];
        megaCenters[8] = tempCe[10];
        megaCenters[9] = tempCe[11];
        megaCenters[10] = tempCe[7];
        megaCenters[11] = tempCe[8];

        mega[6][0] = temp[6][6];
        mega[6][1] = temp[6][7];
        mega[6][2] = temp[6][8];
        mega[6][3] = temp[6][9];
        mega[6][4] = temp[6][0];
        mega[6][5] = temp[6][1];
        mega[6][6] = temp[6][2];
        mega[6][7] = temp[6][3];
        mega[6][8] = temp[6][4];
        mega[6][9] = temp[6][5];

        // for (let i = 3; i < 10; i++) {
        for (let i of [0, 1, 5, 6, 7, 8, 9]) {
            mega[1][i] = temp[4][i];
            mega[2][i] = temp[5][i];
            mega[3][i] = temp[1][i];
            mega[4][i] = temp[2][i];
            mega[5][i] = temp[3][i];
        }

        for (let i = 0; i < 10; i++) {
            mega[7][i] = temp[9][i];
            mega[8][i] = temp[10][i];
            mega[9][i] = temp[11][i];
            mega[10][i] = temp[7][i];
            mega[11][i] = temp[8][i];
        }
    }

    function getMegaColor(c) {
        return megaColors[["1", "2", "3", "4", "5", "6", "a", "b", "c", "d", "e", "f"].indexOf(c)];
    }
}

// Clock
function drawScrambleClock(svgID, scr) {
    $(svgID).empty();

    let cleanClock = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    let clock = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    let pins = [[0, 0, 0, 0], [1, 1, 1, 1]];
    let clockFace = 1;
    
    getClockState(scr);
    
    let width = $(svgID).width();
    let height = 3 * width / 4;
    $(svgID).height(height);
    let space = width / 30;
    let size = ((width - space) / 2) / 3;
    let fill = "";
    let stroke = "#000000";
    let strokeWidth = 2;
    let light = "#55CCFF";
    let dark = "#3375B2";
    let pinUp = "#ffff00";
    let pinDown = "#885500";
    let hand = "#ffff00";
    let handStroke = "#FF0000";

    for (let i = 0; i < 2; i++) {
        // Background
        let colors = [light, dark];
        let colors2 = [dark, light];
        let cx = strokeWidth + i * ((width + space) / 2 - strokeWidth) + (width - space) / 4;
        let cy = height / 2;
        let r = (width - space - 4 * strokeWidth) / 4;
        let circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(circ).attr("cx", cx);
        $(circ).attr("cy", cy);
        $(circ).attr("r", r);
        $(circ).attr("style", "fill:"+colors[i]+";stroke:"+stroke+";stroke-width:"+strokeWidth);
        $(svgID).append(circ);

        let square = Math.sqrt(2 * Math.pow(r, 2)) + 2 * space;
        let squareStartX = cx - square / 2;
        let squareStartY = cy - square / 2;

        // Corners
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                let r2 = square / 5;
                let cx2 = squareStartX + (square / 6 + (square / 3) * k);
                let cy2 = squareStartY + (square / 6 + (square / 3) * j);
                
                if ((j === 0 || j === 2) && (k === 0 || k === 2)) {
                    let c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    $(c).attr("cx", cx2);
                    $(c).attr("cy", cy2);
                    $(c).attr("r", r2);
                    $(c).attr("style", "fill:"+colors[i]+";stroke:"+stroke+";stroke-width:"+strokeWidth);
                    $(svgID).append(c);
                }
            }
        }

        // Background again to remove corner strokes
        let cx1 = strokeWidth + i * ((width + space) / 2 - strokeWidth) + (width - space) / 4;
        let cy1 = height / 2;
        let r1 = (width - space - 4 * strokeWidth) / 4 - strokeWidth / 2;
        let circ1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(circ1).attr("cx", cx1);
        $(circ1).attr("cy", cy1);
        $(circ1).attr("r", r1);
        $(circ1).attr("style", "fill:"+colors[i]);
        $(svgID).append(circ1);
        
        // Inner clocks
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                let r2 = square / 9;
                let cx2 = squareStartX + (square / 6 + (square / 3) * k);
                let cy2 = squareStartY + (square / 6 + (square / 3) * j);
                let circ2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                $(circ2).attr("cx", cx2);
                $(circ2).attr("cy", cy2);
                $(circ2).attr("r", r2);
                $(circ2).attr("style", "fill:"+colors2[i]+";stroke:"+stroke+";stroke-width:"+strokeWidth);
                $(svgID).append(circ2);

                // Dots
                for (let l = 0; l < 12; l++) {
                    let r3 = 1;
                    let a = (30 * Math.PI/180) * (1 + l);
                    let cx3 = cx2 + (r2 + 3 * r3) * Math.sin(a);
                    let cy3 = cy2 + (r2 + 3 * r3) * Math.cos(a);
                    let circ3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    $(circ3).attr("cx", cx3);
                    $(circ3).attr("cy", cy3);
                    $(circ3).attr("r", r3);
                    $(circ3).attr("style", "fill:"+colors2[i]+";stroke:"+stroke+";stroke-width:"+0);
                    $(svgID).append(circ3);
                }

                // Clock hand circles
                let circ4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                $(circ4).attr("cx", cx2);
                $(circ4).attr("cy", cy2);
                $(circ4).attr("r", 3);
                $(circ4).attr("style", "fill:"+hand+";stroke:"+handStroke+";stroke-width:"+2);
                $(svgID).append(circ4);
            }
        }

        // Pins
        let colorPins = [pinDown, pinUp];
        let pinPos = [
            [squareStartX + square / 3, squareStartY + square / 3],
            [squareStartX + 2 * square / 3, squareStartY + square / 3],
            [squareStartX + square / 3, squareStartY + 2 * square / 3],
            [squareStartX + 2 * square / 3, squareStartY + 2 * square / 3]
        ];
        let r5 = 4;
        for (let j = 0; j < pins[i].length; j++) {
            let cx5 = pinPos[j][0];
            let cy5 = pinPos[j][1];
            let circ5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            $(circ5).attr("cx", cx5);
            $(circ5).attr("cy", cy5);
            $(circ5).attr("r", r5);
            $(circ5).attr("style", "fill:"+colorPins[pins[i][j]]+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            $(svgID).append(circ5);

            if (pins[i][j] === 1) {
                let cx6 = cx5;
                let cy6 = cy5 - r5;
                let circ6 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                $(circ6).attr("cx", cx6);
                $(circ6).attr("cy", cy6);
                $(circ6).attr("r", r5);
                $(circ6).attr("style", "fill:"+colorPins[pins[i][j]]+";stroke:"+stroke+";stroke-width:"+strokeWidth);
                $(svgID).append(circ6);
            }
        }
        
        let m = 0;
        // Clock hands
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
                
                let points = [];
                for (let l = 0; l < 12; l++) {
                    let cx8 = squareStartX + (square / 6 + (square / 3) * k);
                    let cy8 = squareStartY + (square / 6 + (square / 3) * j);
                    let r9 = 3;
                    let sq = Math.sqrt(2 * Math.pow(r9, 2));
                    let sqX1 = cx8 - sq / 2;
                    let sqY1 = cy8 - sq / 2;
                    let sqX2 = cx8 + sq / 2;
                    let sqY2 = cy8 - sq / 2;

                    let px1 = rotatePoint(sqX1, sqY1, cx8, cy8, 30 * l, false).x;
                    let py1 = rotatePoint(sqX1, sqY1, cx8, cy8, 30 * l, false).y;

                    let px2 = rotatePoint(cx8, cy8-2.5*sq, cx8, cy8, 30 * l, false).x;
                    let py2 = rotatePoint(cx8, cy8-2.5*sq, cx8, cy8, 30 * l, false).y;

                    let px3 = rotatePoint(sqX2, sqY2, cx8, cy8, 30 * l, false).x;
                    let py3 = rotatePoint(sqX2, sqY2, cx8, cy8, 30 * l, false).y;
                    
                    points.push([
                        {
                            x: px1,
                            y: py1
                        },
                        {
                            x: px2,
                            y: py2
                        },
                        {
                            x: px3,
                            y: py3
                        },
                        {
                            x: px1,
                            y: py1
                        }
                    ]);
                }
                
                $(poly).attr("points", points[clock[i][m]].map(p => p.x + "," + p.y).join(" "));
                $(poly).attr("style", "fill:"+hand+";stroke:"+handStroke+";stroke-width:"+1);
                
                $(svgID).append(poly);
                m++;
            }
        }

        // Clock hand circles again to remove stroke
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                let cx7 = squareStartX + (square / 6 + (square / 3) * k);
                let cy7 = squareStartY + (square / 6 + (square / 3) * j);
                let circ7 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                $(circ7).attr("cx", cx7);
                $(circ7).attr("cy", cy7);
                $(circ7).attr("r", 3);
                $(circ7).attr("style", "fill:"+hand);
                $(svgID).append(circ7);
            }
        }
    }

    function cleanMoves(m) {
        while (m.includes("&nbsp;&nbsp;")) {
            m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
        }
    
        return m.trim();
    }

    function getClockState(sol) {
        // Dark side first when scrambling
        resetClockState();
        sol = cleanMoves(sol);
        let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
        for (let a of arr) {
            let n = a.split("").slice(a.split("").length - 2).join("");
            if (a.length === 4) {
                switch (a.substring(0, 2)) {
                    case "UR":
                        addToClock(1, n);
                        addToClock(2, n);
                        addToClock(4, n);
                        addToClock(5, n);
                        break;
                    case "DR":
                        addToClock(4, n);
                        addToClock(5, n);
                        addToClock(7, n);
                        addToClock(8, n);
                        break;
                    case "DL":
                        addToClock(3, n);
                        addToClock(4, n);
                        addToClock(6, n);
                        addToClock(7, n);
                        break;
                    case "UL":
                        addToClock(0, n);
                        addToClock(1, n);
                        addToClock(3, n);
                        addToClock(4, n);
                        break;
                }
            }
            else if (a.length === 3) {
                switch (a.substring(0, 1)) {
                    case "U":
                        addToClock(0, n);
                        addToClock(1, n);
                        addToClock(2, n);
                        addToClock(3, n);
                        addToClock(4, n);
                        addToClock(5, n);
                        break;
                    case "R":
                        addToClock(1, n);
                        addToClock(2, n);
                        addToClock(4, n);
                        addToClock(5, n);
                        addToClock(7, n);
                        addToClock(8, n);
                        break;
                    case "D":
                        addToClock(3, n);
                        addToClock(4, n);
                        addToClock(5, n);
                        addToClock(6, n);
                        addToClock(7, n);
                        addToClock(8, n);
                        break;
                    case "L":
                        addToClock(0, n);
                        addToClock(1, n);
                        addToClock(3, n);
                        addToClock(4, n);
                        addToClock(6, n);
                        addToClock(7, n);
                        break;
                }
            }
            else if (a === "y2") {
                clockFace = 0;
            }
            else if (a.includes("ALL")) {
                addToClock(0, n);
                addToClock(1, n);
                addToClock(2, n);
                addToClock(3, n);
                addToClock(4, n);
                addToClock(5, n);
                addToClock(6, n);
                addToClock(7, n);
                addToClock(8, n);
            }
            else {
                switch (a) {
                    case "UR":
                        pins[0][1] = 1;
                        pins[1][0] = 0;
                        break;
                    case "DR":
                        pins[0][3] = 1;
                        pins[1][2] = 0;
                        break;
                    case "DL":
                        pins[0][2] = 1;
                        pins[1][3] = 0;
                        break;
                    case "UL":
                        pins[0][0] = 1;
                        pins[1][1] = 0;
                        break;
                }
            }
        }
    }

    function addToClock(i, n)  {
        if (n.includes("+")) {
            n = parseInt(n.replace("+", ""));
        }
        else if (n.includes("-")) {
            n = parseInt("-" + n.replace("-", ""));
        }
        
        clock[clockFace][i] = clock[clockFace][i] + n;
        if (clock[clockFace][i] < 0) {
            clock[clockFace][i] = clock[clockFace][i] + 12;
        }
        else if (clock[clockFace][i] > 11) {
            clock[clockFace][i] = clock[clockFace][i] - 12;
        }
        if (i === 0 || i === 2 || i === 6 || i === 8) {
            let face = clockFace === 0 ? 1 : 0;
            let j = i === 0 ? 2 : i === 2 ? 0 : i === 6 ? 8 : 6;
            clock[face][j] = clock[face][j] - n;
            if (clock[face][j] < 0) {
                clock[face][j] = clock[face][j] + 12;
            }
            else if (clock[face][j] > 11) {
                clock[face][j] = clock[face][j] - 12;
            }
        }
    }
    
    function resetClockState() {
        clockFace = 1;
        clock = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        pins = pins = [[0, 0, 0, 0], [1, 1, 1, 1]];
    }
}

function drawMissingSvg(svgID) {
    resetDrawSvg(svgID);
    let x = "50%";
    let y = "90%";
    
    let text = document.createElementNS('http://www.w3.org/2000/svg', "text");
    $(text).attr("x", x);
    $(text).attr("y", y);
    $(text).attr("font-size", "2vh");
    $(text).attr("fill", "white");
    $(text).attr("text-anchor", "middle");
    $(text).attr("dominant-baseline", "middle");
    let textNode = document.createTextNode("Unavailable for this scramble type");
    text.appendChild(textNode);

    $(svgID).append(text);
}

function resetDrawSvg(svgID) {
    $(svgID).empty();

    const svg = $(svgID);

    $(svgID).parent().html(svg);
}

function getState(n, scr) {
    let cube = [];

    let nScr = [];
    for (let s of scr.split(" ")) {
        if (s.includes("M2")) {
            nScr.push("R2 L2 x2");
        }
        else if (s.includes("M'")) {
            nScr.push("R' L x");
        }
        else if (s.includes("M")) {
            nScr.push("R L' x'");
        }
        else if (s.includes("S2")) {
            nScr.push("F2 B2 z2");
        }
        else if (s.includes("S'")) {
            nScr.push("F B' z'");
        }
        else if (s.includes("S")) {
            nScr.push("F' B Z");
        }
        else if (s.includes("E2")) {
            nScr.push("U2 D2 y2");
        }
        else if (s.includes("E'")) {
            nScr.push("U' D y");
        }
        else if (s.includes("E")) {
            nScr.push("U D' y'");
        }
        else {
            nScr.push(s);
        }
    }
    scr = nScr.join(" ");

    for (let s = 0; s < 6; s++) {
        let side = [];
        for (let i = 0; i < n; i++) {
            let line = [];
            for (let j = 0; j < n; j++) {
                line.push(colors[s]);
            }
            side.push(line);
        }
        cube.push(side);
    }
    
    for (let s of scr.split(" ")) {
        if (!s.includes("w")) {
            s = "1" + s;
        }
        else if (s.split("")[1] === "w") {
            s = "2" + s;
        }
        s = s.replace("w", "").replace("'", "3");
        
        if (s.includes("R")) {
            let r = parseInt(s.split("R")[1]) || 1;
            move(cube, "R", parseInt(s.split("R")[0]), r);
        }
        else if (s.includes("L")) {
            let r = parseInt(s.split("L")[1]) || 1;
            move(cube, "L", parseInt(s.split("L")[0]), r);
        }
        else if (s.includes("U")) {
            let r = parseInt(s.split("U")[1]) || 1;
            move(cube, "U", parseInt(s.split("U")[0]), r);
        }
        else if (s.includes("D")) {
            let r = parseInt(s.split("D")[1]) || 1;
            move(cube, "D", parseInt(s.split("D")[0]), r);
        }
        else if (s.includes("F")) {
            let r = parseInt(s.split("F")[1]) || 1;
            move(cube, "F", parseInt(s.split("F")[0]), r);
        }
        else if (s.includes("B")) {
            let r = parseInt(s.split("B")[1]) || 1;
            move(cube, "B", parseInt(s.split("B")[0]), r);
        }
        else {
            let r = parseInt(s.split("")[2]) || 1;
            move(cube, s.split("")[1], 0, r);
        }
    }
    
    return cube;
}

function move(cube, xyz, w, r) {
    let r1 = r;
    let r2 = 4 - r;

    if (xyz === "R") {
        /*  */
        rotateFace(cube, 4, 2);
        /*  */
        rotateFace(cube, 3, r1);
        if (w === cube[0].length) {
            rotateFace(cube, 1, r2);
        }
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < cube[0].length; k++) {
                for (let j = cube[0].length - 1; j >= cube[0].length - w; j--) {
                    let temp = cube[0][k][j];
                    cube[0][k][j] = cube[2][k][j];
                    cube[2][k][j] = cube[5][k][j];
                    cube[5][k][j] = cube[4][k][j];
                    cube[4][k][j] = temp;
                }
            }
        }
        /*  */
        rotateFace(cube, 4, 2);
        /*  */
    }
    else if (xyz === "L") {
        /*  */
        rotateFace(cube, 4, 2);
        /*  */
        rotateFace(cube, 1, r1);
        if (w === cube[0].length) {
            rotateFace(cube, 3, r2);
        }
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < cube[0].length; k++) {
                for (let j = 0; j < w; j++) {
                    let temp = cube[0][k][j];
                    cube[0][k][j] = cube[4][k][j];
                    cube[4][k][j] = cube[5][k][j];
                    cube[5][k][j] = cube[2][k][j];
                    cube[2][k][j] = temp;
                }
            }
        }
        /*  */
        rotateFace(cube, 4, 2);
        /*  */
    }
    else if (xyz === "U") {
        rotateFace(cube, 0, r1);
        if (w === cube[0].length) {
            rotateFace(cube, 5, r2);
        }
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < w; k++) {
                for (let j = 0; j < cube[0].length; j++) {
                    let temp = cube[2][k][j];
                    cube[2][k][j] = cube[3][k][j];
                    cube[3][k][j] = cube[4][k][j];
                    cube[4][k][j] = cube[1][k][j];
                    cube[1][k][j] = temp;
                }
            }
        }
    }
    else if (xyz === "D") {
        rotateFace(cube, 5, r1);
        if (w === cube[0].length) {
            rotateFace(cube, 0, r2);
        }
        for (let i = 0; i < r; i++) {
            for (let k = cube[0].length - 1; k > cube[0].length - 1 - w; k--) {
                for (let j = 0; j < cube[0].length; j++) {
                    let temp = cube[2][k][j];
                    cube[2][k][j] = cube[1][k][j];
                    cube[1][k][j] = cube[4][k][j];
                    cube[4][k][j] = cube[3][k][j];
                    cube[3][k][j] = temp;
                }
            }
        }
    }
    else if (xyz === "F") {
        /*  */
        rotateFace(cube, 0, 3);
        rotateFace(cube, 5, 1);
        rotateFace(cube, 3, 2);
        /*  */
        rotateFace(cube, 2, r1);
        if (w === cube[0].length) {
            rotateFace(cube, 4, r2);
        }
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < cube[0].length; k++) {
                for (let j = cube[0].length - 1; j >= cube[0].length - w; j--) {
                    let temp = cube[0][k][j];
                    cube[0][k][j] = cube[1][k][j];
                    cube[1][k][j] = cube[5][k][j];
                    cube[5][k][j] = cube[3][k][j];
                    cube[3][k][j] = temp;
                }
            }
        }
        /*  */
        rotateFace(cube, 0, 1);
        rotateFace(cube, 5, 3);
        rotateFace(cube, 3, 2);
        /*  */
    }
    else if (xyz === "B") {
        /*  */
        rotateFace(cube, 0, 3);
        rotateFace(cube, 5, 1);
        rotateFace(cube, 3, 2);
        /*  */
        rotateFace(cube, 4, r1);
        if (w === cube[0].length) {
            rotateFace(cube, 2, r2);
        }
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < cube[0].length; k++) {
                for (let j = 0; j < w; j++) {
                    let temp = cube[0][k][j];
                    cube[0][k][j] = cube[3][k][j];
                    cube[3][k][j] = cube[5][k][j];
                    cube[5][k][j] = cube[1][k][j];
                    cube[1][k][j] = temp;
                }
            }
        }
        /*  */
        rotateFace(cube, 0, 1);
        rotateFace(cube, 5, 3);
        rotateFace(cube, 3, 2);
        /*  */
    }
    else if (xyz === "x") {
        /*  */
        rotateFace(cube, 4, 2);
        /*  */
        rotateFace(cube, 1, r2);
        rotateFace(cube, 3, r1);
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < cube[0].length; k++) {
                for (let j = 0; j < cube[0].length; j++) {
                    let temp = cube[0][k][j];
                    cube[0][k][j] = cube[2][k][j];
                    cube[2][k][j] = cube[5][k][j];
                    cube[5][k][j] = cube[4][k][j];
                    cube[4][k][j] = temp;
                }
            }
        }
        /*  */
        rotateFace(cube, 4, 2);
        /*  */
    }
    else if (xyz === "y") {
        rotateFace(cube, 0, r1);
        rotateFace(cube, 5, r2);
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < cube[0].length; k++) {
                for (let j = 0; j < cube[0].length; j++) {
                    let temp = cube[2][k][j];
                    cube[2][k][j] = cube[3][k][j];
                    cube[3][k][j] = cube[4][k][j];
                    cube[4][k][j] = cube[1][k][j];
                    cube[1][k][j] = temp;
                }
            }
        }
    }
    else if (xyz === "z") {
        /*  */
        rotateFace(cube, 0, 3);
        rotateFace(cube, 5, 1);
        rotateFace(cube, 3, 2);
        /*  */
        rotateFace(cube, 2, r1);
        rotateFace(cube, 4, r2);
        if (w === cube[0].length) {
            rotateFace(cube, 4, r2);
        }
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < cube[0].length; k++) {
                for (let j = 0; j < cube[0].length; j++) {
                    let temp = cube[0][k][j];
                    cube[0][k][j] = cube[1][k][j];
                    cube[1][k][j] = cube[5][k][j];
                    cube[5][k][j] = cube[3][k][j];
                    cube[3][k][j] = temp;
                }
            }
        }
        /*  */
        rotateFace(cube, 0, 1);
        rotateFace(cube, 5, 3);
        rotateFace(cube, 3, 2);
        /*  */
    }

    return cube;
}

function rotateFace(cube, face, r) {
    for (let i = 0; i < r; i++) {
        rotate(cube[face]);
    }
    return cube;
}

function rotate(matrix) {
    const n = matrix.length;
    const x = Math.floor(n/ 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
            let k = matrix[i][j];
            matrix[i][j] = matrix[y - j][i];
            matrix[y - j][i] = matrix[y - i][y - j];
            matrix[y - i][y - j] = matrix[j][y - i];
            matrix[j][y - i] = k;
        }
    }
    return matrix;
}

customElements.define("einar-drawscramble", EinarDrawScramble);