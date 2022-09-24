$(() => {
    drawSkewb('#svgSkewb', $("#inpScramble").val());

    adjustSize();
});

function solveCube(scr) {
    let start = Date.now();
    let w = new Worker("worker.js");
    $("#solution").html("");
    $("#searchDepth").html("");
    let step = 0;
    
    if (isValidScramble(scr)) {
        $("#inpScramble").prop('disabled', true);
        $("#btnSolve").prop('disabled', true);
        $("#btnScramble").prop('disabled', true);
        w.postMessage([scr]);
        w.onmessage = e => {
            if (e.data.length === 2 && e.data[0] === "Step") {
                $("#searchDepth").html("<h1>" + e.data[1] + "</h1>");
            }
            else if (e.data.length === 3) {
                let solInfo = e.data[0];
                let sol = e.data[2];
                solInfo !== "" ? $("#solution").append(solInfo) : "";
                sol !== "" ? drawSkewb("#svg_sol", [scr, sol].filter(s => {return s !== ""}).join(" ")) : "";
                scrollDown();
                adjustSize();
                step++;
            }
            else if (e.data[0] === 0) {
                $("#searchDepth").html("<h1><b>Time interuption</b></h1>");
                $("#inpScramble").prop('disabled', false);
                $("#btnSolve").prop('disabled', false);
                $("#btnScramble").prop('disabled', false);
            }
            else if (e.data[0] !== "Solved") {
                $("#searchDepth").html("<h1>Searching at depth " + e.data[0] + "</h1>");
            }
            else {
                $("#searchDepth").html("<h1>" + (Date.now() - start) + " ms</h1>");
                $("#inpScramble").prop('disabled', false);
                $("#btnSolve").prop('disabled', false);
                $("#btnScramble").prop('disabled', false);
            }
        }
    }
}

function drawSkewb(svgID, scr) {
    $(svgID).empty();
    let n = 3;

    let moves = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"];

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
    let colors = [cWhite, cYellow, cGreen, cBlue, cRed, cOrange];

    for (let i = 0; i < 6; i++) {
        let j = 0;
        let x1 = coordinates[i].x1;
        let x2 = coordinates[i].x2;
        let y1 = coordinates[i].y1;
        let y2 = coordinates[i].y2;

        let points = x1+","+y1+" "+(x2-x1)+","+y1+" "+x1+","+(y2-y1)+" "+x1+","+y1;

        let yCount = 0;
        for (let y = y1; y < y2; y += size) {
            let k = 0;
            let xCount = 0;
            for (let x = x1; x < x2; x += size) {
                fill = getColor(colors[i].shift());
                
                let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
                $(poly).attr("points", points);
                $(poly).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
                
                $(svgID).append(poly);
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

    function getColor(n) {
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
            }
        }
    
        return skewbCo.map(s => s.c1 + s.c2 + s.c3).join("") + skewbCe.map(s => s.c).join("");
    }
    
    function resetCubeState() {
        skewbCo = cleanSkewbCo.slice();
        skewbCe = cleanSkewbCe.slice();
    }
    
    {
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
    }
}

function isValidScramble(scr) {
    return scr.trim() !== "";
}

function scrollDown() {
    const element = document.getElementsByTagName("body")[0].parentElement;
    element.scrollTop = element.scrollHeight;
}

function adjustSize() {
    $("svg").height(3 * $("#svgCube").width() / 4);
    $("#inpScramble").css("font-size", "3vh");
    $("button").css("font-size", "3vh");
}