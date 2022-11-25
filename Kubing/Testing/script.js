let curEvent = "3x3";

$(() => {
    
});

let cW = "1";
let cO = "2";
let cG = "3";
let cR = "4";
let cB = "5";
let cY = "6";

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

let cleanSkewbCo2 = [co1, co2, co3, co4, co5, co6, co7, co8];
let skewbCo2 = [co1, co2, co3, co4, co5, co6, co7, co8];
let cleanSkewbCe2 = [ce1, ce2, ce3, ce4, ce5, ce6];
let skewbCe2 = [ce1, ce2, ce3, ce4, ce5, ce6];

let cube2 = getSkewbState2("");

function run() {
    $("#scrambles").html("");
    let scrambles = $("#taScrambles").val().split("\n").filter(s => s.trim() !== "");

    let i = 0;
    let up = "6";
    let down = "1";
    for (let j = 0; j < scrambles.length / 5; j++) {
        let nScrambles = scrambles.slice(j * 5, j * 5 + 5);
        $("#scrambles").append("<div class='scrSubDiv' id='scrSubDiv" + j + "' style='width: 21cm; height: 29.5cm; margin: 0.1cm; display: grid; grid-template-rows: 1fr 1fr 1fr 1fr 1fr;'></div>");

        for (let s of nScrambles) {
            let ns = [];
            for (let m of s.split(" ")) {
                if (m.includes("R")) {
                    ns.push("z " + m + " z'");
                }
                else if (m.includes("r")) {
                    ns.push(m.toUpperCase());
                }
                else {
                    ns.push(m);
                }
            }
            let scram = "x' " + inverseAlg(ns.join(" ")) + " z' x'";
            cube2 = getSkewbState2(scram);
            let skewbCorners = Object.values(skewbCo2).map(co => Object.values(co));
            let skewbCenters = Object.values(skewbCe2).map(ce => Object.values(ce));
            // let up = skewbCenters[0][0];
            // let down = skewbCenters[5][0];
            
            let skewbCornerOrientations = [];
            for (let co of skewbCorners.slice(0, 2).concat(skewbCorners.slice(4, 6))) {
                co.includes(up) ? skewbCornerOrientations.push(co.indexOf(up)) : skewbCornerOrientations.push(co.indexOf(down));
            }
            
            let centerCase = getCenterCase(skewbCenters);
            let el = "<div style='width: 100%; height: 100%; margin: 0; padding: 0; display: grid; grid-template-columns: 2fr 3fr; border: 1px solid black;'><div style='width: 80%; height: 80%; margin: auto;'><svg width='100%' id='svgCube" + i + "'></svg></div><h1 style='margin: auto; text-align: left;'>" + "x z " + s + " x" + "<br>Orientations: " + skewbCornerOrientations.join(" ") + "<br>Sum of orientations: " + skewbCornerOrientations.reduce((a, b) => a + b)  + "<br>Center case: " + centerCase + /* "<br>Centers: " + skewbCenters.join(" ") + */ "</h1></div>";
            if ($("#svgCube" + i).parent().height() >= $("#svgCube" + i).parent().width() * 3 / 4) {
                $("#svgCube" + i).attr("width", $("#svgCube" + i).parent().width() * 0.8);
            }
            else {
                $("#svgCube" + i).attr("width", $("#svgCube" + i).attr("height") * 4 / 3);
            }
            $("#svgCube" + i).css("width", $("#svgCube" + i).attr("width"));
            $("#svgCube" + i).css("height", $("#svgCube" + i).attr("height"));
            $("#svgCube" + i).css("margin", "auto");
            $("#scrSubDiv" + j).append(el);
            drawScrambleSkewb("#svgCube" + i, scram);
            i++;
        }
    }

    $("#btnDownload").css("display", "block");
}

function getSymSkewbState(skewbCenters, skewbCorners) {
    const ces = [
        "123456",
        "326415",
        "521463",
        "625431",
        "134526",
        "152346",
        "145236",
        "263154",
        "413652", 
        "643251",
        "364125",
        "312645",
        "341265",
        "256314",
        "436512",
        "546213",
        "514623",
        "562143",
        "231564",
        "451362",
        "654321",
        "632541",
        "215634",
        "465132"
    ];

    let ce = ces[ces.map(c => c.substring(4)).indexOf(skewbCenters.slice(4).join(""))];
    let cent = skewbCenters.slice().join("").replace(ce[0], "a").replace(ce[1], "b").replace(ce[2], "c").replace(ce[3], "d").replace(ce[4], "e").replace(ce[5], "f");

    return cent + corn;
}

function getCenterCase(skewbCenters) {
    const ces = [
        "123456",
        "326415",
        "521463",
        "625431",
        "134526",
        "152346",
        "145236",
        "263154",
        "413652", 
        "643251",
        "364125",
        "312645",
        "341265",
        "256314",
        "436512",
        "546213",
        "514623",
        "562143",
        "231564",
        "451362",
        "654321",
        "632541",
        "215634",
        "465132"
    ];

    let ce = ces[ces.map(c => c.substring(4)).indexOf(skewbCenters.slice(4).join(""))];
    let cent = skewbCenters.slice(0, 4).join("").replace(ce[0], "a").replace(ce[1], "b").replace(ce[2], "c").replace(ce[3], "d").replace(ce[4], "e").replace(ce[5], "f");
    
    switch (cent) {
        case "abcd":
            return "solved";
        case "dbac":
            return "cwR";
        case "cbda":
            return "ccwR";
        case "cabd":
            return "cwL";
        case "bcad":
            return "ccwL";
        case "dacb":
            return "uR";
        case "bdca":
            return "uL";
        case "acdb":
            return "uFR";
        case "adbc":
            return "uFL";
        case "dcba":
            return "zR";
        case "badc":
            return "zL";
        case "cdab":
            return "+";
        default:
            return "other";
    }
}

function getSkewbState2(sol) {
    resetCubeState2();
    sol = cleanMoves2(sol);
    let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
    for (let a of arr) {
        switch (a.replaceAll("*","")) {
            case "R":
                __r();
                break;
            case "R'":
                __ri();
                break;
            case "L":
                __l();
                break;
            case "L'":
                __li();
                break;
            case "B":
                __b();
                break;
            case "B'":
                __bi();
                break;
            case "U":
                __u();
                break;
            case "U'":
                __ui();
                break;
            case "x":
                __x();
                break;
            case "x2":
                __x2();
                break;
            case "x'":
                __xi();
                break;
            case "y":
                __y2();
                break;
            case "y2":
                __y2();
                break;
            case "y'":
                __yi();
                break;
            case "z":
                __z();
                break;
            case "z2":
                __z2();
                break;
            case "z'":
                __zi();
                break;
        }
    }

    return skewbCo2.map(s => s.c1 + s.c2 + s.c3).join("") + skewbCe2.map(s => s.c).join("");

    function cleanMoves2(m) {
        while (m.includes("&nbsp;&nbsp;")) {
            m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
        }
    
        return m.trim();
    }

    function resetCubeState2() {
        skewbCo2 = cleanSkewbCo2.slice();
        skewbCe2 = cleanSkewbCe2.slice();
    }
    
    function __r() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[6] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo2[1] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo2[7] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo2[5] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[3] = new Center(tempCe[5].c);
        skewbCe2[4] = new Center(tempCe[3].c);
        skewbCe2[5] = new Center(tempCe[4].c);
    }
    function __ri() {
        __r();
        __r();
    }
    function __l() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[4] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo2[3] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo2[5] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo2[7] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[1] = new Center(tempCe[5].c);
        skewbCe2[2] = new Center(tempCe[1].c);
        skewbCe2[5] = new Center(tempCe[2].c);
    }
    function __li() {
        __l();
        __l();
    }
    function __b() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[7] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo2[0] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);
        skewbCo2[4] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo2[6] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[1] = new Center(tempCe[4].c);
        skewbCe2[4] = new Center(tempCe[5].c);
        skewbCe2[5] = new Center(tempCe[1].c);
    }
    function __bi() {
        __b();
        __b();
    }
    function __u() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);
        skewbCo2[1] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo2[3] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo2[7] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[0] = new Center(tempCe[4].c);
        skewbCe2[1] = new Center(tempCe[0].c);
        skewbCe2[4] = new Center(tempCe[1].c);
    }
    function __ui() {
        __u();
        __u();
    }
    function __x() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo2[1] = new Corner(tempCo[2].c3, tempCo[2].c1, tempCo[2].c2);
        skewbCo2[2] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo2[3] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo2[4] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo2[5] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo2[6] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo2[7] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[0] = new Center(tempCe[2].c);
        skewbCe2[2] = new Center(tempCe[5].c);
        skewbCe2[5] = new Center(tempCe[4].c);
        skewbCe2[4] = new Center(tempCe[0].c);
    }
    function __x2() {
        __x();
        __x();
    }
    function __xi() {
        __x();
        __x();
        __x();
    }
    function __y() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[3].c1, tempCo[3].c2, tempCo[3].c3);
        skewbCo2[1] = new Corner(tempCo[0].c1, tempCo[0].c2, tempCo[0].c3);
        skewbCo2[2] = new Corner(tempCo[1].c1, tempCo[1].c2, tempCo[1].c3);
        skewbCo2[3] = new Corner(tempCo[2].c1, tempCo[2].c2, tempCo[2].c3);
        skewbCo2[4] = new Corner(tempCo[5].c1, tempCo[5].c2, tempCo[5].c3);
        skewbCo2[5] = new Corner(tempCo[6].c1, tempCo[6].c2, tempCo[6].c3);
        skewbCo2[6] = new Corner(tempCo[7].c1, tempCo[7].c2, tempCo[7].c3);
        skewbCo2[7] = new Corner(tempCo[4].c1, tempCo[4].c2, tempCo[4].c3);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[1] = new Center(tempCe[2].c);
        skewbCe2[2] = new Center(tempCe[3].c);
        skewbCe2[3] = new Center(tempCe[4].c);
        skewbCe2[4] = new Center(tempCe[1].c);
    }
    function __y2() {
        __y();
        __y();
    }
    function __yi() {
        __y();
        __y();
        __y();
    }
    function __z() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo2[1] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo2[2] = new Corner(tempCo[3].c3, tempCo[3].c1, tempCo[3].c2);
        skewbCo2[3] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);
        skewbCo2[4] = new Corner(tempCo[5].c3, tempCo[5].c1, tempCo[5].c2);
        skewbCo2[5] = new Corner(tempCo[2].c2, tempCo[2].c3, tempCo[2].c1);
        skewbCo2[6] = new Corner(tempCo[1].c3, tempCo[1].c1, tempCo[1].c2);
        skewbCo2[7] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[0] = new Center(tempCe[1].c);
        skewbCe2[1] = new Center(tempCe[5].c);
        skewbCe2[5] = new Center(tempCe[3].c);
        skewbCe2[3] = new Center(tempCe[0].c);
    }
    function __z2() {
        __z();
        __z();
    }
    function __zi() {
        __z();
        __z();
        __z();
    }
}

function makePDF() {
    // downloadPDF($("#content").html());

    let mywindow = window.open("", 'PRINT', 'left=0,top=0,height='+$(window).height()+'",width='+$(window).width());
    mywindow.document.write($("#scrambles").html());
    mywindow.document.write("<link rel='stylesheet' href='style.css'>");
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    // mywindow.close();
}