const currentAlgset = localStorage.getItem("currentAlgset") || 0;
let nextAlg = 0;
let algList = [];
let keyBinds = [];
let possibleMoves = [];//["U", "U'", "F", "F'", "R", "R'", "L", "L'", "D", "D'", "B", "B'", "M", "M'", "x", "x'", "y", "y'", "z", "z'", "Rw", "Rw'", "Lw", "Lw'"];

$(function() {
    updateBindings();

    getPossibleMoves();

    $(window).keypress(function(e) {
        getTurn(e.keyCode);
    });
});

function updateBindings() {
    keyBinds = [];
    for (let v of $("#keysDiv table tr td:nth-child(2) input")) {
        keyBinds.push($(v).val());
    }
}

function getPossibleMoves() {
    possibleMoves = [];
    for (let m of $("#keysDiv table tr td:nth-child(1)")) {
        possibleMoves.push($(m).text());
    }
}

function getTurn(e) {
    const key = keyBinds.indexOf(String.fromCharCode(e));
    const turn = possibleMoves[key];
    console.log(turn);
    makeTurn(turn);
    // Endre til å tegne state
    updateCube();
}

function makeTurn(e) {
    switch (e) {
        case "R":
            _r();
            break;
        case "R2":
        case "R2'":
            _r2();
            break;
        case "R'":
            _ri();
            break;
        case "L":
            _l();
            break;
        case "L2":
        case "L2'":
            _l2();
            break;
        case "L'":
            _li();
            break;
        case "F":
            _f();
            break;
        case "F2":
        case "F2'":
            _f2();
            break;
        case "F'":
            _fi();
            break;
        case "B":
            _b();
            break;
        case "B2":
        case "B2'":
            _b2();
            break;
        case "B'":
            _bi();
            break;
        case "U":
            _u();
            break;
        case "U2":
        case "U2'":
            _u2();
            break;
        case "U'":
            _ui();
            break;
        case "D":
            _d();
            break;
        case "D2":
        case "D2'":
            _d2();
            break;
        case "D'":
            _di();
            break;
        case "x":
            _x();
            break;
        case "x2":
        case "x2'":
            _x2();
            break;
        case "x'":
            _xi();
            break;
        case "y":
            _y();
            break;
        case "y2":
        case "y2'":
            _y2();
            break;
        case "y'":
            _yi();
            break;
        case "z":
            _z();
            break;
        case "z2":
        case "z2'":
            _z2();
            break;
        case "z'":
            _zi();
            break;
        case "M":
            _m();
            break;
        case "M2":
        case "M2'":
            _m2();
            break;
        case "M'":
            _mi();
            break;
        case "S":
            _s();
            break;
        case "S2":
        case "S2'":
            _s2();
            break;
        case "S'":
            _si();
            break;
        case "E":
            _e();
            break;
        case "E2":
        case "E2'":
            _e2();
            break;
        case "E'":
            _ei();
            break;
        case "Uw":
            _uw();
            break;
        case "Uw2":
        case "Uw2'":
            _uw2();
            break;
        case "Uw'":
            _uwi();
            break;
        case "Dw":
            _dw();
            break;
        case "Dw2":
        case "Dw2'":
            _dw2();
            break;
        case "Dw'":
            _dwi();
            break;
        case "Fw":
            _fw();
            break;
        case "Fw2":
        case "Fw2'":
            _fw2();
            break;
        case "Fw'":
            _fwi();
            break;
        case "Bw":
            _bw();
            break;
        case "Bw2":
        case "Bw2'":
            _bw2();
            break;
        case "Bw'":
            _bwi();
            break;
        case "Rw":
            _rw();
            break;
        case "Rw2":
        case "Rw2'":
            _rw2();
            break;
        case "Rw'":
            _rwi();
            break;
        case "Lw":
            _lw();
            break;
        case "Lw2":
        case "Lw2'":
            _lw2();
            break;
        case "Lw'":
            _lwi();
            break;
    }
}