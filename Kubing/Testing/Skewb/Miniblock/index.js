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
        let state = getState(cleanMoves(scr + " " + r));
        let ce = state.ce;
        let co = state.co;

        if (ce[0].c === co[0].c1 && ce[0].c === co[1].c1 && co[0].c3 === co[1].c2) {
            miniblock = "Miniblock found!\n";
        }
    }

    $("#solution").html("<h1>" + miniblock + "</h1>");
}

function checkMiniblock2(scr) {
    let miniblock = false;
    
    outerloop : for (let r of rotations) {
        let state = getState(cleanMoves(scr + " " + r));
        let ce = state.ce;
        let co = state.co;

        if (ce[0].c === co[0].c1 && ce[0].c === co[1].c1 && co[0].c3 === co[1].c2) {
            miniblock = true;
            break outerloop;
        }
    }

    return miniblock;
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

function test1000() {
    let results = {
        miniblock: 0,
        notMiniblock: 0,
        miniScrambles: [],
        nonMiniScrambles: []
    };

    for (let s of scr1000) {
        let r = checkMiniblock2(s);

        if (r) {
            results.miniblock++;
            results.miniScrambles.push(s);
        }
        else {
            results.notMiniblock++;
            results.nonMiniScrambles.push(s);
        }
    }

    console.log(results);
}

function testX(x) {
    let minis = 0;

    let scrX = [];

    for (let i = 0; i < x; i++) {
        scrX.push(getScrambleSkewb());
    }

    for (let s of scrX) {
        let r = checkMiniblock2(s);

        if (r) {
            minis++;
        }
    }

    console.log(minis);
}

const scr1000 = [
    "B' U' R L' U B' L' R' B'",
    "L' U' R' L B' U L R B",
    "U B' R' B' L' B' U' B' U",
    "R B' L U B R' L B U",
    "R U R' U B U' L' R",
    "B' L' B' L U L U L B'",
    "B' U' R B U' R B R'",
    "L R B R U R' L' B'",
    "R' L' B' U' L' U' B' U'",
    "R U' L' U L B U' R' L",
    "U L B U' L U' B' U",
    "U R' B' U' L' R' L U B L'",
    "B L U R B' L' B R L",
    "L R U B' R L R' B U",
    "B' R' B U B' R L' U'",
    "R' L' U' R B R' L R' L'",
    "B' R B U B' U' L R' U'",
    "R U R B' R U B U' B",
    "U' L' R' L U' L' U' B' U'",
    "R L' U' B R' L' R L'",
    "L B' L B R L U' R L'",
    "B' L' B' U' B' L' R B R'",
    "L R' U' B R' U R L'",
    "U R B U' B U R' L' B'",
    "U' L' B' L' U' R U' L'",
    "U' R B U' B U' B R' B",
    "R' U' B U L' U' B' U B",
    "B L B R' U B L' R",
    "L' R U R' U R B L R'",
    "R' L' R' U B' R U' L",
    "U B L R' B L' B U",
    "L U L R U' B' R U' L",
    "R B L U' B R' B' R'",
    "R U' B' L B L U R'",
    "L' R B' U L R L B",
    "L' B R' U' L' R' B' R'",
    "R' U' R B' L B L' B R'",
    "U L U' R U L' U B",
    "L R U R B R' L B R",
    "B R L' B U L' B' R",
    "B' L B' R' L U' B' L R'",
    "B' L B' U L U L' B",
    "L' R B' L' U B' U' B",
    "B R' U B' R L' B R'",
    "B R B' L' R B' U R'",
    "U' R' B R' B L' B' L'",
    "L' U R' B' L' R B' R U'",
    "U L U' L' U L R' B' R",
    "U L B U' L U' B' L",
    "R B R U' B U L B",
    "B R L' R' B' U' R' U",
    "R' B U' R' B R' U' L B'",
    "R L R' L B U' L' B",
    "U R' B L' R' L' R U'",
    "U' B' U L' U' B R' B L'",
    "L' B' R U R' U B' L U'",
    "L B' U' L U' L R L' U'",
    "B' U R U' R' B' R L R'",
    "B U L' U' R' L' U L'",
    "R' B' L' B' L U' B' L' B'",
    "R' B' U' R' L B U' R",
    "B U' R U B' U' B' R",
    "B' L' U' L B' R U' R",
    "R B' L R' U' R' B U",
    "L' U L R' B U' B' U'",
    "L U R B' R' U L B",
    "B' L U L' B U L B U'",
    "U B L R' L' U' R' U R'",
    "B' R' B' U L U' B U",
    "L' B L' B' U' R U L B",
    "L' B' R' L U' B R U'",
    "L' R' B L U' B U' R' B'",
    "L' U B' U L' B' U' R",
    "B' U L' U R' B' R' U",
    "R' U' L B U' R' L' R'",
    "R U L B' U' R' B' U L'",
    "R' U' L B' R' L R' B L",
    "U B R' B' R U L' B'",
    "B L' R L B R B' U",
    "L' U R' L B R' L' B'",
    "R' U' B' R' B' R B' R",
    "B R B U' R B' R' B' U'",
    "U' L' B' U L' B' L' R L'",
    "L R' U' R' L B R U' L'",
    "L U R' U' L' B R' L' B",
    "L B U' R' U R U' L'",
    "R U R L' R L' R U B",
    "B' U' R' B R L B U R",
    "B' L R' B' R' B' L' R",
    "U' L U R' L R B L' R'",
    "B' U R B' R L' U' B' U",
    "B U' B L' R L' U' L",
    "R B R' U R' U' B U'",
    "L B' U' R' U' R' B R' U'",
    "L' B L' B L' U L' B'",
    "R' B' L R' B R B' R' B'",
    "B U B' L B R' U R U'",
    "L R B' U B' R U' L' B",
    "R' B' U R' B' R' B' L'",
    "L' R L U L' R B U' L'",
    "R' B' U' B L R' B' U' B'",
    "B L' U' B' R L B U",
    "U R' L U' B R B' R",
    "R' B L' B' L R' B U R'",
    "R' L' B U R B L U L'",
    "L' B U R' L R' B L' R'",
    "L B' U B' R U R L B'",
    "R B' L R L B U B'",
    "B L' B' U' L' B' R L' U",
    "R' L B R L' U' L R' B'",
    "L R B R' U L R' U L",
    "R U' B' U R L B' U",
    "B' L R' U B R L' B L'",
    "R' B U B' L' U' R B' U",
    "L' B U L B U B U",
    "R B R B' L U R L' B'",
    "L' U' R' B' R L R' U'",
    "L' B R' L B' U L R' U",
    "U L U L' B' R' U' B' L",
    "L' B R' B' U' B' R U L'",
    "U L U L B R' U' R L",
    "B U' B' R' B' R' U B'",
    "B' R' B L' B U L R' L",
    "U R' B U L' B' R U",
    "B' U B' U' R L' B U'",
    "U B L B R B R B' R",
    "B L' U R' U L R B L'",
    "B U B' U R' B R' L",
    "U R U' R' L B U L U'",
    "B' R L' U' R' B U' R' U",
    "R' L' R' U' B' R U' L R'",
    "R B' R L R B U L' B'",
    "B' L' U' L' U' R B' R'",
    "B' R' U' R' L' R B L",
    "B U L B' U B U' L'",
    "B U R' U B L U' R'",
    "L R' L' B L' B' U L' R'",
    "L' U' B' L' R B U' R",
    "U' L B L' U' B R' B R'",
    "U' L' B L' B R L B U'",
    "B U B' L' R U L B",
    "R' L' U' B' U' R' B' L' U L'",
    "U R' L R' L B' U' R' L",
    "L U R U R' L' B' R'",
    "R U' B L R U B L' U'",
    "U' L' B L' U' B R U L'",
    "U' B' R' L' B' U R L'",
    "L' U L' R U' R B' R'",
    "B U' R L U L' U R' B'",
    "B L B' R' L R U' B",
    "L R' B L B U B' R'",
    "R U' R L B R L B'",
    "U' L' B' U' R B R B U",
    "B U L U' B R' B R' B'",
    "L' U L B' R L' R L'",
    "U' R' L B R B L U'",
    "U B' U L R' B' U L",
    "B U B' L' B U' R' L'",
    "R L R U B' U L' B'",
    "R' U' L B R' U' B' R' B'",
    "U' L R L' R' B R L",
    "R U' L' R' L R' B' U B",
    "B' U R' L' R' U B' R L'",
    "L' B' U' B R L' U R L'",
    "U' L R' L' U R' U' B",
    "U' B U' R' U L' R' U",
    "B L U' B R' L U' R",
    "R B' R U L' U B' L'",
    "R L R B R B' L' R'",
    "L' U' L' U' B L U' R' U'",
    "U' L B' L' B' U' R' B' R'",
    "L R' L B' U B' R B",
    "R B L' B' R' B L R'",
    "B L' B' R' L B R L B'",
    "R U B' L' B' U B L'",
    "B' L' R' B' R' U' R L'",
    "R' U B' R' B' R B L R L'",
    "B' R' L' U' R U L' B U'",
    "B R' U' R U B U' R",
    "B' U B' R B U B' R",
    "B U R L R L' B' L",
    "B L R L R' L B R' L'",
    "B' L' R' B' L' U' B L' U",
    "R' B' L' B L' B U' B L'",
    "L' B' R L' B U B R L'",
    "B L R U' R' L' U L'",
    "U' B L R' U' R' B' U R'",
    "U B U R L' U L' B' R' B'",
    "L R B R B U' R' B",
    "L U' R U L R' L B",
    "R' L' B R' B U' B' R'",
    "B R L U B' U' R' L' U",
    "B U' B L' R L' R U'",
    "B' U R B' L B R' L",
    "R' L' B L' R' L' B R U",
    "B R L' R' L' B U' R",
    "U B L B' U R' B U' L'",
    "U L' B' L U' B R' B",
    "B R' L' R L' B U' R U'",
    "U B R L R L B U'",
    "U L' B' R' L U R B' R",
    "L U' L R U R' B' U'",
    "B' L U' L R B' L R' L",
    "U' L' R' B' U' L R L",
    "R' U' L' R' U B' L' U' R",
    "R' B' U L U B' U' R' U",
    "B' L U' R' U' R' B' R'",
    "R B U B L R B L'",
    "L' U B L' U R U' R'",
    "B' R' U B L' U B' R'",
    "B' U B' L U L' U' R L",
    "R' L' R' L R' B R' B'",
    "R' B' R B' L' R L' U L",
    "R' U' R' B L' U L' U'",
    "L' U' B U' R' L B R' U",
    "L B' L' R L' R' L U'",
    "U B' R' B R' U R B' R'",
    "R' L U' B L U B U' B'",
    "U B U B' L' B L U'",
    "R' L' R L' U' B L' B L'",
    "R' B R L U R B' U R'",
    "U R L U' R' U' L R L'",
    "B U' R B R B' U R' B'",
    "U' R U L' U' B U R' L'",
    "R B L B' R' B' U B'",
    "U' R' L' R' L B L R B'",
    "L' R' B R' L' B L' B' L'",
    "B U' R B L' B' U' L R",
    "R' B U R' B' R B' U'",
    "B' L' R' L' B U' B' U' R",
    "U' L B R B' U' R' B'",
    "U' B L' U' L R' U L'",
    "L U' L R' U B R' B' L",
    "B U B R L' U' B R'",
    "L' B R U B' R' U R' U",
    "B R U' B L' R' B' L' U",
    "R B U' L R B U' R",
    "R L B' L R U' L R U",
    "R L U' R B R' U L'",
    "R' L' R L' R' B' R' U B'",
    "U' R' L B R B' U' L U'",
    "U B U R' L' B R' B U'",
    "B' U' L' R' U' L' U L'",
    "U B R B U L R U' B'",
    "R U R' U R' U' B' R' L",
    "L' R' B R B R' U' R B'",
    "L B U R' U' L U R' L'",
    "R' L' B' R L' R B U'",
    "L B' L R' B' R' L R",
    "U B' U' B' U L R B",
    "U L' U B U R' U' R",
    "U' R U' B U' L' U B R",
    "R' U' R U' R' L' B U",
    "L' B U' L B' R' U R",
    "U' L' U' R L' U' L U L'",
    "U' R' L U B' R' B' R",
    "U' L' U R B L R' L",
    "L' U' R L' U' R' U' B U'",
    "U R B' R L B R L",
    "R L' B' U' L U' L' B' L'",
    "B L R B' U' L' U' L' U'",
    "R B' U' L' R' B L' R'",
    "U L' R' U L B R U'",
    "L' R' L' B L' R' U' B",
    "L' R B L U R L U",
    "L' R L U B U' B U",
    "B U' B R' L' R B L",
    "L R U' L B' R' L R'",
    "R' U B L U L B R",
    "U' B U' R L R B R' B'",
    "L' B L' B' U R' B U R",
    "L' U L' B' R' U L R'",
    "B U' B R' U' B U L' U'",
    "B L' U' L' B U B U'",
    "B U' L' R L' U' L R' U",
    "L' U B R' B U R' U L",
    "B U' B' L B R' B' L U",
    "U' R L' R' B' R U' L'",
    "B' U B L U' B' R U' B",
    "B U' R U R B R' L' R'",
    "B' U' R' B' U' R B' L' R'",
    "U' R' B U L' B' R' U R'",
    "B R' L' B U L' U' L' U R'",
    "U B' R' L R' L R U",
    "L' B R U L' R' B U R'",
    "L B' L B' R B L' U",
    "R' B L' R' U' B R' L'",
    "R U L' B U' L' B R U",
    "L' R' U B' R' B' R' U'",
    "R' B' U' B L' B L R U'",
    "L U' B' U L' U L R U",
    "B' U B R' B L' R U'",
    "U' L B R U L' B' L B'",
    "B' L' R' L' U B U' R",
    "B' U L' U B U' B' R'",
    "L B L' R' L' U' R B",
    "R' L U L B' R' B L",
    "U R L B' L U L U B'",
    "B R' B' L' U' B' U L B",
    "B' L' U B U' L R' U",
    "R' U' L' U R' U' B R' U",
    "R' B L U' R U R U",
    "L' B' R B U L' B U",
    "L' R L' B U' L' U' R",
    "U' B' L' U B R B R U'",
    "R B L U' L' R' L' U",
    "B R' B' U' L B U L'",
    "R B' U R B' U B' U'",
    "L' U L' B' L' B R' L U",
    "U' R' L R' L U' R' U'",
    "L' U B U L' B U R L",
    "U' L B L' R' U L' B L'",
    "B L' R' B L R U' R",
    "L' U B U B L' B L' U'",
    "U R B' U' L R' L B' U'",
    "R L R B' L R' B' R L'",
    "B U L U L R B' L U",
    "L U R B' L B' U B R'",
    "L R' U L R L R U' L",
    "U L' U L' B' U R' L R",
    "L U' B' L' R L' R' B",
    "L R' U' R L' R L' U'",
    "B R B' R B L' R B",
    "R U' L' R U B' R' U",
    "L R' L B' R U B' R'",
    "B L' R' U' B' R B L'",
    "L' B' L' B U' L U' L'",
    "B' L' B' R B' L B U'",
    "B' L' U L' U' B L U",
    "L' R' B U B L' B' L",
    "U L' B' U' L' R' L' B'",
    "R' L B U B' R' B' L'",
    "B' U' R B' R' B U' L' U",
    "B' R' L' R L' U L' U L'",
    "R' U' B L R B L U",
    "L U L' B U' R U' R' L",
    "L B U' B R B U L U",
    "B' U B' L' B R' L' R U'",
    "L' B L' R' B' L U R' L'",
    "R L' B' U' R' L' U L' R'",
    "B' U B' R' U' L' R' B'",
    "R U R' L' R L' U R' U'",
    "U' R U R U R U B'",
    "L R' U' R' U R B' L' B",
    "L' U' L' B U' R' L' R U",
    "R' U B R' U' L R U",
    "B U' B' U L' U R' B' L",
    "L' B R B R' B' U' R B'",
    "B' L' U B U' R B' U' L",
    "U L R' U R' U' L U B'",
    "B' U' R' B' R' B' U L",
    "U B' L B' R' U B' U B'",
    "L R B R L' B R U",
    "U' R' U R' L U' R' U",
    "R B U' R L R' B U'",
    "R L U B U L' U L'",
    "U B' R U' R B' U' L U'",
    "R L' U B' U R U L",
    "U' R L' U L' B R B'",
    "U' R' U L' B U' L' B' R",
    "U' L' B' R L R U' L' U'",
    "R' L R B L B' L' B L'",
    "U B' R' L' R L' B' L B",
    "U' R' U B' U' B' R L'",
    "R U' B' R L U' B U' B",
    "B U' R L' B' L U' B'",
    "L' U B' U L' R B L",
    "R' L' B R' B' R' L' U",
    "U' L R B' U L' U' R' U",
    "U' B R L R' L' R' L' B",
    "U' B' U R L R U L",
    "U R U L' U' L' R' B",
    "L U' B U L' U' L' R",
    "B' U' L' R U' B' R U'",
    "L R' B' U B' L' U' R' U",
    "R' L B' R L R L' R' U'",
    "L R' B U' B L R' B",
    "L' R U B' U' L R U' R",
    "B R' B L' B R U R' B'",
    "U' B' R L' B R U' R'",
    "L' R' B' R' U' L B' R",
    "L' B' R' L U' L' R U",
    "L R' L U B' R' B' R B",
    "R' U L R' B R' U L R",
    "R' L' U' R B' R B L' U",
    "U' R' L R L' B' U R' U'",
    "U' B R' L B R' L R' U'",
    "B R U' B' U' R L' U' L'",
    "B U' R' L B' L' B' U",
    "L' B' L' U R' B' U' R'",
    "R' U' B L' B' L B L",
    "L' R U' L B L' B L",
    "R L B' L U L' B U",
    "L R U L U' B U L",
    "L U' R L' U B' U' B R'",
    "U L U B' U R U B'",
    "U L B L B R' B U",
    "B' U' R' U' L' U L' U",
    "R L R B' U' R' U R' B",
    "U' B' L' R' B U' B U'",
    "U R U B U L' R' U' R",
    "U R' L' R L R B U",
    "B U' R U' L R U B",
    "L U' B U' L' R B' L'",
    "B' U B L R' L B U",
    "U B R B' L' B U' R' L'",
    "L R' U R B' L' U' L B",
    "U R B' L U B L' B'",
    "R U R U' B R U' R'",
    "U R L R' B U' L' U'",
    "R U L' U B R' U' L",
    "U' R' U B U B L B' U",
    "B' R' B L' R B' L R'",
    "U' R L' R U R' U' B",
    "L' U' R' B L' B U L'",
    "L' U' R' L B R' B R' U'",
    "L' R U' L B U B U' B'",
    "B L B R U R' B L' R'",
    "B R' L R' B' R B R",
    "B R' B' U' B L' R' U",
    "U' L R' B R' L' R B",
    "U R' U' R' L' U' B' R L",
    "U' L B R L' U R B'",
    "U' B' R L' B U' R' L",
    "U L' R' B' R B L' B' L'",
    "B L B' L' B R' B U B'",
    "R' L' R' U L R L' U'",
    "R B U' B' R' L' B' U' L",
    "R' U B' U B U B U' R",
    "R B' R' L' B' U R' B L'",
    "U' R' L' R U' L U L'",
    "R U L B U' R U' R' L'",
    "R L U' R L' R L U",
    "R' U' L' B R U R B'",
    "L' U' B' R U B' R B L'",
    "U' L U' R U B' U B' R",
    "B' R U B' R' U' L' B'",
    "L' B' R B' U' L' R U' R",
    "L U' L' U' R' U' B L'",
    "B R B' L' B' L R' U' B'",
    "U L U' L R' U R B' R'",
    "L U' R B R' L R L' B'",
    "B' U' B L' U L B U",
    "B' L B' L' B R B' L'",
    "L' U R' L' B L' U' R L'",
    "U R B L' U' L' U B'",
    "B U' B' U R' U L B",
    "U L R' U' L B' U' L U'",
    "L' R' L' U' L U' R' L' U",
    "U' R U R' U R B U' R'",
    "U R U R U L U' R",
    "U R B' U' R L R' L R' B'",
    "L' U' B L U' L' U R",
    "L' U' B R U' B R' B' R'",
    "L B' L' U R L R' U R'",
    "B U' L R U' L' B' L' R'",
    "R' L U L' B' R B U' B'",
    "L B U' B' R U' L B' L'",
    "U B' L B U R' B' R'",
    "B' U B' L' R U R' U R'",
    "R L R' U B L R' B U R'",
    "R L B L' B L' R' U R'",
    "U B' R' B' R' U' B U",
    "B' R B U' B L B' U'",
    "B L R L' U R U R L'",
    "L B' U' R U' R' L R' L",
    "R' L' R B R' B U' L",
    "R B' U' R' B' R' L' U'",
    "R B' U R' B L' U L R' B",
    "U B L R' U L' R U R'",
    "B' L R' L' U B' U' R'",
    "U' L B' L' R B' U R'",
    "U R' U L' R L R L'",
    "L' B L B L' B' L' U'",
    "U L' U' L' R' B U L'",
    "U R' U B' U' B U R",
    "R L R L U' B U' L R",
    "L U' B' L U' L' U' L'",
    "U' B' U B' R B' R L' U",
    "B R' L B' L U L' B'",
    "R' B U' L U' R' U' R",
    "B U' L' R B' R' B' U'",
    "U R' L U L R' L R' U'",
    "U B' U' B R U L' U R",
    "L U' B' L U' R' L' U'",
    "U' B' R' B R L R U R",
    "R L R' L B' L B' R' U'",
    "R' B U R' U L' U' B'",
    "B' L U B' L B' L' B",
    "B' R U' B' R L' R U",
    "L R' U B R B' L U'",
    "L R' U' B R' U' B' L R'",
    "B U' B L' R' L' R L'",
    "R B U' R' U R L R",
    "B U' L B' R' U R' L' B",
    "R' U' B R U' R' U' R' B L'",
    "U' B R' B U' L' U L B",
    "R' U L' U L B R B U'",
    "R U L' R' L U R L U",
    "U B' R' L U L B L U",
    "B R' L' R L' U' R L B'",
    "R B' L U L R' U B'",
    "B U L' R' B U L U' L",
    "B' R' U' L U B' U' R' L'",
    "U B R' B' R L U R' B",
    "B R U L U' B' L B R'",
    "U L' U B' U B' L B",
    "L' R L R B' U R U",
    "R' B' R' L' R B U' R'",
    "B L' U' B' L R' B R'",
    "R B' U' R' B' L' B' R' U",
    "R B' R' L' U B' U B' L'",
    "B R L' U' L B U B'",
    "R' U' L' B' L B' L' U' L",
    "B' U' R U R' B R B U",
    "B R B' U' L' B' L B'",
    "B L' U' B R L B U",
    "B R' B L U' L' B L",
    "U' R' B U B R L' B U",
    "R L' B' U B' R' U L' R'",
    "B U' L R U R' L U'",
    "R' B L' R' B U' L' R",
    "B' R' L' R U' B L' B'",
    "R B U' B L R L' U B",
    "L' B L B' U L R' B",
    "R L' B L R U' L U",
    "L' U L B U L' R B' R",
    "L U B' L R' U' R U B",
    "R' U B' L' U' R B U' R",
    "R' U' L R B R B L' R'",
    "U L' U' B' R L B L",
    "U' L' U' L B' L' B L' U'",
    "L R' U' B' R' L U B U",
    "B' U B' U R U' R B' U",
    "U' B U R U B' L' U",
    "R' L' U' L' U B R' L",
    "B' U R L U' R L U'",
    "B L U L B U' L' R L",
    "B' R' L' B L B U B",
    "B U B' U B L R L",
    "U' R' U' B U L B' R U",
    "R B U L B L' B U'",
    "U R B' L R U' B R",
    "R' U' L' R' L' R L' U'",
    "U' L' B L' R U' L' U' R",
    "U' R B' L R' B' R' L B'",
    "B U B' R L' B' L B'",
    "B' L U L' U' R' B U R'",
    "U B U' R B' R' U' B",
    "B' L U L' R' L U' R' B'",
    "U' L' U B R' B L R'",
    "R' B R U' B' R' L U' R'",
    "R U' L' R L' U R' L U'",
    "R B U' L' U B R B",
    "L B' R' U L B U R",
    "R' B' R' U' B L' B' R' U' R'",
    "B L U R' L' U' B L'",
    "R B R' U L' B' U B' L'",
    "R' U R' B U' B R L R",
    "B' R' U R' L' U L B'",
    "B' R' U B' R B' U R L",
    "L' R L R' L U' L U L' R'",
    "U' L U B' U' L' B' L'",
    "R L R U' R U' B' U' B'",
    "U L' B R' B' R' L' R'",
    "R' U' R L R' B' U' B R'",
    "B R' U' B' L R L' R' U",
    "L R' U' L R' B' U' L U'",
    "U' L R L B' R B R' U'",
    "L B L U L' B' R' U' R'",
    "R' L U B' R' U L U' R",
    "R' U' B' U R' B U B R'",
    "R U' B' L' R L' U L R",
    "R L' U' B' U' R' B R' B'",
    "R' B' L' R' L' R' L R",
    "L' B' U B' L R' L' R U",
    "U L U' B L' B' L' B R'",
    "B' U L B L B U' L' B",
    "R U R U' B R' L R' U",
    "U L' U' R' L U L B",
    "L' B R' B L' U' R' U' B'",
    "U L U' R' U R L' R",
    "R U' R' L' B U' L' B'",
    "R L U' R' U L R' L'",
    "R B R' U' R U L' R' L'",
    "R L B U' R' L B R'",
    "B' L' B R' L B U L U",
    "B U R U L' R' L B'",
    "L B R' L B' R B' L B'",
    "B' U' B L R L B' U'",
    "B L B' R' B' L B' R' L' B'",
    "U' B L U' R' B' L B' U'",
    "R L' R' U R' B R U B'",
    "B' L' B R U' B U' B",
    "U L' R L U' L U B",
    "U B' U' R' L B' U B'",
    "R' U' B U' R U' L' U' L'",
    "B L U' R' U L U R' L'",
    "B R' L' U R' L' B' L'",
    "B L' R L' B' U B' U L",
    "B R B' U' R' L R U' R'",
    "U R' U' R B' R' B' R U'",
    "R L R B' U R' U R U'",
    "B U' R' B' R' L' U' B",
    "U B' L R B L' U' B L'",
    "B' L' B R U' B' L B",
    "B U R L B' L R' L' B",
    "B' R L' U L B L U L'",
    "R' L B R L U R' L R'",
    "R' L' R U' L R L R L",
    "B L B U' R' U' R U' R",
    "R B' R L U R L B R'",
    "R U' R' U' R L B U' L",
    "R B' R B' U' B L B'",
    "R L B R' L R L U'",
    "R' L' B' U R B R' B' U",
    "U' B L U' B R B' R U",
    "L B' U B R U' R' U'",
    "L B R' L' R' B' R B",
    "B' R' L' B' R' L' R' U'",
    "U R' B' L' U R' U' B'",
    "L U B' L' R B U' L R",
    "R B L R B U B' U B",
    "U R' L' B' L R U R'",
    "B' U L' U R' L R' U' L'",
    "B L' R L' U' L R' B'",
    "L U' R L' U' L R' B' R'",
    "L B R' B R L B' L U",
    "L U' R' U' B L' R L'",
    "U' L U' B' R L' B L R'",
    "B U' L' U' L U' L' B U'",
    "U' L R L' U L' R' L'",
    "B' R' B' L' B U L' U",
    "L B' R' U B' L U R",
    "L R U R B U B' R U",
    "R' B' R' L' R U' B' L'",
    "L' B' R' L R B' R B L'",
    "B U' R' B R' U' R' U' R'",
    "B' R' L U' R' B U' L B",
    "L B' L B' L B L' B' R'",
    "R L' U' R' B' U' R U' R'",
    "R' B' L' U B' U R L'",
    "R' U' L R B L R' B'",
    "B' U B' R' B L U' B",
    "L' R U' R' B R' U' R' L'",
    "L' B' U R L R L' U' L",
    "B R L' B' R' B R' U' L' R'",
    "R U L' R L' U R B'",
    "U' B' L' U B R' U' L R'",
    "U' B R' B L' U L' U B'",
    "R' U' L' R' L' B' L R' B' L'",
    "B R' L U' R U' R L' R",
    "R U' B U B R L' R",
    "R' U L' R' L B' R L",
    "R' U' L B' R B R' B U'",
    "L B L U' B' L' U' R'",
    "U' R' L R' L' R L R' U'",
    "R' L R' U R' U' R L R'",
    "R' U' R B' L B' R B R'",
    "U L R' L R' L' B U'",
    "U' R' U B L' B' L U B",
    "B' R' L' B R' B' U L'",
    "U' L U B L' U' R' U R'",
    "B' R L B' U L U L' U",
    "L B R U' R L' U' L' U'",
    "B' U R U R U L U' L'",
    "R L' U R' B' U' B U'",
    "R' U' R' B' R' U L B U",
    "B R' L U' L' B U R U",
    "B' L U' R B' L R' L'",
    "L' B' L' B L' R L' U L'",
    "B L U' B L' R' L' R",
    "R L U B' U B U' R",
    "B' R U' L R' B' U' B L'",
    "R L' U B' U' L' B R L'",
    "B L U' B' U' B U B' R'",
    "R' B' U' B' L R' B' R",
    "U L B U B' R L R",
    "R' L R U R B L' U",
    "L U' R' B' R L' B' U",
    "L B R' U' R L' U R B'",
    "R' U B' R' B' R' B' R' L' B",
    "R' L' R U' B R U' L",
    "B L U' B U B' L' R U",
    "B U R' B' U B' U B' R'",
    "R L' U B L' U' B' R",
    "R' U' B' R' U B' L' B'",
    "B' L' R U B' R U' R",
    "B' R' L R' L B R L U'",
    "L U R' L U B' R L'",
    "L R' L U' L' B' L' U",
    "R' L B U' R' B R' U' L'",
    "U B' L' B' U R' L' U'",
    "L B' U B' R' L U R'",
    "B L' R L' U' B' L R L'",
    "L' U' R' B R L' B U R'",
    "B L B' U R L' U B'",
    "R' U' B U R' B U R B'",
    "B' L U B' L' B R L U",
    "L' B' R' B L' R' U' R' L'",
    "R' L' U R' B U' B U' L'",
    "B U' R L' R B' U R' U'",
    "U' L U R U' B' R' B' R'",
    "R L B R U' R' L' B' R",
    "U' L' B' L' U' B U L'",
    "U B' U R L B U' L'",
    "L B U L U' L U B",
    "B' L U' B' U' L B R' L'",
    "L B' R B' R' L B' L' B",
    "B' U' B R B U' B' L",
    "L B' U R L B R B",
    "U R' L' U' L' B L' U'",
    "R' U' L' B R' B' R' L U",
    "B' L' R' B' R' B' R' L",
    "U B U R L R' B L' R",
    "L' R' L R L' R' U' L' B'",
    "U' L' U' R' L U' B' L'",
    "B' U R U B R U R",
    "L' U R U L' R L R U'",
    "B' L' U' B' L' U' L B",
    "L B' R U' R U' L' B",
    "U' L' U' B L' R' L' R",
    "L' R U R' U' B' L' B",
    "B R' L' B R B' L' B U",
    "L U' L B' U R' L' U B'",
    "L B' U' R B' U' B U",
    "L' U' R' B L' R U B'",
    "U B' L B' U R U L' B'",
    "B' L B U' R' B' L U' B'",
    "U' L' U' B' L B R' L",
    "L B' L' B U' R' U L B",
    "L' U' R U L' R' L U' R'",
    "U R B' R' B' R L U'",
    "U' B' R B L' U L' U'",
    "R B' L B U B' L R L'",
    "L' R L R' L' B' L' R' B'",
    "L' R' B R U' L' R' L B",
    "B U L U' R L' B U B",
    "R L' R' B L U B R B' R'",
    "R U R' U' B' U' B' L'",
    "R U' R U' B' U B' L' R'",
    "L' U' R' L U B' L' R'",
    "B' L' U' L U L' U R' U'",
    "U' B' U' B' R' L B' R' L R'",
    "L R L' R' B L' R B' U'",
    "U L B' R' B U' R U",
    "R L R' U L B' R' B'",
    "B' L' B U L B R' L",
    "U' L' B R U' R' L' U' B",
    "L U R U L B' R' U' L'",
    "R L' U B' U B R' U'",
    "U' L' B R B' U L R' B",
    "L' R' U' R L' U L U'",
    "B L' U' R L' R' U' B",
    "L' R' U B L' R' B' R",
    "R U L' B U' B' U' L' R'",
    "B' L U B U L U L B'",
    "L R U' R B U B' R L'",
    "B' L U L' B' U R L'",
    "L R U' L' U' B U' L' U",
    "L U' L' B U B' L' U'",
    "B' L U' B' U L' R B'",
    "L B U R' B L' R' U'",
    "U L R' B U' R' B L'",
    "R L' U L' B' U B R'",
    "U' L' B L' U' L' B' L' U",
    "U' B' U B L' R' U' B",
    "U R L U' B' R' B' U B",
    "R' B' U B' L B L U R",
    "R' U R' U R B' L' U' B' R'",
    "B U' L' R' U' R L B' R'",
    "U R' L' B' U B' U' L B",
    "B' L' U L B U' R' B'",
    "L R' B L R L B L U'",
    "U' B U L B' R' L U' L'",
    "B L B L' U' L B' R'",
    "L' R B' U B U' L U R",
    "L R B R B L R' U B'",
    "L U' R L R' B R B",
    "R' B' U R B' U' R' B' L'",
    "B' U B L U' L B R B'",
    "U' B' L U' R U' B' U' L'",
    "R' U B U' L R' L U' B' U'",
    "L' R' U' L B' R B U' B'",
    "R U' R' U' L B R' U'",
    "B' U' R' L' B' U L B'",
    "R L' B U L' R' L' R'",
    "L' U' B' U' B U L' B'",
    "R' L B' L R U' L R' L",
    "U L B' R' U B U' R",
    "R' U' L' U' L B L' B'",
    "B L' U B U L' R' U",
    "R' L' B L' B' R' B' U' L'",
    "U' L' U L' B' R U B'",
    "U' R' U B L' R' L U L'",
    "U' R L B' L B U B",
    "B R' B L' R U B' R'",
    "L B R B L' B' U B'",
    "L B' L' U L R' U B R",
    "R L' B L' R L R' L B'",
    "B L U B U' B L B' R",
    "U L' U B' R' L' B' R' L' B'",
    "L' B R L' U' L R L B'",
    "B' R' B U' B' R' B' L' B'",
    "R' U' B' R L B U' B'",
    "U' B' L' B' R' L B' R'",
    "B L B U' L U' B L' B'",
    "U' L' U B' U' B' R' U'",
    "B R' U' B U' L R' U' B'",
    "U B U' B R' U' B L' B'",
    "R' L' U' L R' U' L U",
    "B' R' B' U' L U L' R'",
    "U L U L R L' B R' B",
    "R' U B' L B L' B L B'",
    "L' R B' U' L R L B'",
    "B L B U R B' U' B' U'",
    "L R' B' L' U B' L' B'",
    "B L' U B R' B' L' R",
    "B' R' L B' U L U' L R",
    "B L R L B U' B' U' R",
    "L' R' B' R' B' L' B' R'",
    "R' U B U' L B R L'",
    "L R U' R' U B L' B' U",
    "B' L B' R L U' L' R",
    "U L U' R B' U' L' R U'",
    "R' B U R' B' L' B R L",
    "R L' B R' B' U R' L B",
    "R' U' R' L R' U' L' U'",
    "L B' R B' L' U B' R",
    "B L' B L' U' L U R L",
    "U R' B' U' B' L' B L'",
    "B L R' B' L' R B' L R'",
    "R' U R L B' L' R' L'",
    "U L' B L U' L U L'",
    "R B R U B' U' R' L'",
    "L' B' R L U' R' L B' R'",
    "B U' L U' R' B L U",
    "L R L R' L B' L' R' U'",
    "R B' R' U L' B' U L' U",
    "U B' L' B L' B L U'",
    "B' U' B R L U B L'",
    "U R L B U' B' U R' L",
    "B R B' L B' U' B' L",
    "L B' U B U B' L' U' R",
    "U' L U B' U' R' L' U' R' B'",
    "L R B L B' L B R",
    "R B U' R L U L B' R'",
    "B' U B U' B L' B L' B",
    "L R L' U' R U R' L' U",
    "U R B L R' B R' B' R",
    "B L U B U' R' L' R' U'",
    "L' R L R L' R' U' R U'",
    "L' B L' U' R' L R U",
    "L R B' R' B' L' B' U' R",
    "B L U' R L' B' U B U",
    "U' R L' R U' L' U' B'",
    "L' B' R' B' R B U' B' R",
    "R L' B U B R' L' R L",
    "B L' B' R' L U' R' U' B'",
    "R U B U B' R' L' U'",
    "B R' B' U B R' U L' R'",
    "L U' B' R U' B R U R",
    "L U L B R L B R U",
    "R' L' R U R B' U' L",
    "B' R B' U R' B L U",
    "R L' R' B U' R B' U R'",
    "R B L' B U B L R B'",
    "U L U' L' R' B L R L'",
    "U L B U L R' L U'",
    "U R' U B U R' L U'",
    "R' L' U' L' R' B U R' L'",
    "U R' L' U' B R U B' U",
    "U R U L' B L R' B' U'",
    "R' L' R U B' U' L U'",
    "L' B R L R B' U B' U",
    "U R B L' U B' R B'",
    "L' B' U R U' R' B R'",
    "B U L' R B U' B R' B'",
    "R' B U B' R U R' U",
    "B' R U' L B R U' B R'",
    "B' U R U B L U R'",
    "L' U' L U' R' U' L' U",
    "U R B R' U L U R",
    "L B' R U' L R' B' R",
    "U B U L R L' R' B'",
    "R' L' R' U L' U R' U",
    "L' R B L' U' L U B'",
    "U R B' U' L B' R' B' R",
    "L' R' L' B' L B' U' R",
    "U' R' L U' B U' R' B",
    "B' U L' B R U B L' R",
    "R' L R L' U B' U' R'",
    "U' R B' L B' L B' U L",
    "U B R B R' U L' R L' U'",
    "L' U L R' B' R U R' L'",
    "R' U R' U L' R' B' U' B'",
    "R L' B' U' B U R L'",
    "L' B U B' L B R' B U'",
    "B R B R' B R L R'",
    "R' U B U' L' U' R B L'",
    "U B' U' B U' R L' B' L'",
    "R L' B U' L B' R L B",
    "L' U L B' U L' R' B U'",
    "U B' R U' L R' B' U B'",
    "R' L' U B' R' B L' U' L",
    "U B' L R' U B R' U'",
    "R B' R' L' U R L B' R'",
    "R U B L U L R' B",
    "R B R U L' R B' L",
    "L' B L U' B R' B' U",
    "R' B L B L' R B R L",
    "R L U' B R U' R L'",
    "L' U L' B U R' L U",
    "R B R U L B L R'",
    "B L' U B' U R' L' U",
    "U L' R U R' B' U' R'",
    "L' B U' B L B L' R U'",
    "U' L' U L B' U' B U B",
    "B' R L' U' B L B' U L'",
    "B U' B' U' L' R U' B' L'",
    "U L' B' L R L B' L' B'",
    "B L' R U R B' R L",
    "R B' U' L R U' L B",
    "R' U' B L R' B U L B'",
    "R' L B R' B L U B'",
    "R L R B U' R U R",
    "U B R U' R' B' R' B L'",
    "B L R L U' R U' B",
    "R' B L U L' U L' B R",
    "R B' R' L' R U B' L B'",
    "U' B' L R B R L U R",
    "L' R U' R' L' B' L' R' B",
    "L' R B R U L U' L U",
    "R U R U B' L U L'",
    "L U R' L U R' B R",
    "L U' L' R' U' R' B' U",
    "B R' L' R' U L' U R' U'",
    "L' U L B' R B U' B'",
    "R U' R B' L' R' L' B R'",
    "B U' B U' B R' U' R'",
    "R' B L' B' R' L B U",
    "U' R' B' U B' R' U' B'",
    "L' B R' L U R' L U",
    "L B' U' B' U' L U' L'",
    "L' R L B U' L B L'",
    "L U' L U' B' R B L U'",
    "B L' U' B' L R L' R'",
    "L' R U L R U' B L' R'",
    "B' L U R' L B' U' L'",
    "U B U B' R L' B U' L'",
    "L B' R' U' B L B' L U'",
    "L U' L' B L R' B' L'",
    "L' B R L' U B U R' B'",
    "L' R' U' R U R' L' U B' L'",
    "B U B U' B U' B' L R'",
    "R' U R' L R U L' R' L",
    "L' U' B R' L' R' U L U'",
    "B' L' R' B L' B U' R' L'",
    "L' B' L B' R L' B L",
    "R' L B L U L' B' R'",
    "U' B' U L' B' R B' L R'",
    "R' B' U L U' R B' U' R'",
    "B R B L' R L U' B",
    "L B' R' L B L' R L'",
    "L B L R B R U R L",
    "R L' U L' R' L B R'",
    "U L R B U B' U L B U'",
    "B' L U' R B' L' B L'",
    "R' L' B U' B U R L'",
    "R U' R U B R U' L' U",
    "R' U L' B' R' B U' B U'",
    "R' L' R' B U B L R' B",
    "B' U B' L B' U' L B' R' L'",
    "B L' R B' L' U B U' B'",
    "U' R U' B R' L' U L'",
    "B L R' U L B L U' B",
    "B L R U L' B' L B' U'",
    "U' B R' B' L' U L U",
    "B' R U B' R L' B' R' L'",
    "L' B' L R' L R U R' L",
    "R U' B U B U' B' U'",
    "U L B R' B' L' B U L'",
    "U B L B R B U B' U'",
    "L' B' U L' B' R L B' L'",
    "L B R B' L U L R B'",
    "L R' U' B L U B U L'",
    "U L U R' B' L B L' R",
    "B' R' B L' U R' B' R'",
    "B' U' B' U B' R U' B' L' B'",
    "L R B U' B' L B' U",
    "U B L' B L' U L' R",
    "R' U' R' B R' L' B U' B'",
    "L' U B U L' U' B' L",
    "B' R L' U' L U L B",
    "R' L' U R' L U' R B'",
    "U' B' U' R' B' L' U' L",
    "R L R U R L U' R' U'",
    "R' B' U B R U B' U",
    "B' R L B L' U' R U B'",
    "L' R' L' U L' U L R"
];