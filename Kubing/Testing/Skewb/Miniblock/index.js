const solvedStateNumbers = "164145153136263235254246163542";
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

$(() => {
    drawScrambleSkewb('#svgSkewb', $("#inpScramble").val());

    adjustSize();
});

function isValidScramble(scr) {
    return scr.trim() !== "";
}

function checkMiniblock(scr) {
    let miniblock = "No miniblock";
    
    for (let r of rotations) {
        let state = getState(cleanMoves(inverseAlg(r) + " " + scr + " " + r));
        let ce = state.ce;
        let co = state.co;

        if (ce[0].c === co[0].c1 && ce[0].c === co[1].c1 && co[0].c3 === co[1].c2) {
            miniblock = "Miniblock found!";
        }
    }

    $("#solution").html("<h1>" + miniblock + "</h1>");
}

function cleanMoves(m) {
    while (m.includes("&nbsp;&nbsp;")) {
        m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
    }

    return m.trim();
}

function getState(sol) {
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
                _y2();
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

    return {
        ce: skewbCe,
        co: skewbCo
    };
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

function scrollDown() {
    const element = document.getElementsByTagName("body")[0].parentElement;
    element.scrollTop = element.scrollHeight;
}

function adjustSize() {
    $("svg").height(3 * $("#svgSkewb").width() / 4);
    $("#inpScramble").css("font-size", "3vh");
    $("button").css("font-size", "3vh");
}

const rotations = [
    "",
    "x'",
    "x",
    "x2",
    "y'",
    "y",
    "y2",
    "z'",
    "z",
    "z2",
    "y' x'",
    "y x'",
    "y2 x'",
    "z' x'",
    "z x'",
    "z2 x'",
    "y' x",
    "y x",
    "z' x",
    "z x",
    "y' x2",
    "y x2",
    "z' x2",
    "z x2"
];