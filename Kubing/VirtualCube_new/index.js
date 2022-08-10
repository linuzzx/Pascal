const currentAlgset = localStorage.getItem("currentAlgset") || 0;
let nextAlg = 0;
let algList = [];
let keyBinds = [];
let possibleMoves = [];//["U", "U'", "F", "F'", "R", "R'", "L", "L'", "D", "D'", "B", "B'", "M", "M'", "x", "x'", "y", "y'", "z", "z'", "Rw", "Rw'", "Lw", "Lw'"];
let time = 0;
let moveCount = 0;
let tps = 0;
let interval;
let timing = false;
let ready = false;

$(function() {
    getBindings();

    updateBindings();

    getPossibleMoves();

    $(window).keypress(function(e) {
        getTurn(e.keyCode);
    });
});

function getBindings() {
        let i = 0;
    if (localStorage.getItem("keys")) {
        const keys = localStorage.getItem("keys").split("KEY");
        for (let inp of $("#keysDiv table tr td:nth-child(2) input")) {
            $(inp).val(keys[i]);
            i++;
        }
    }
}

function updateBindings() {
    keyBinds = [];
    let keysToStore = "";
    for (let v of $("#keysDiv table tr td:nth-child(2) input")) {
        keyBinds.push($(v).val());
        keysToStore += $(v).val()+"KEY";
    }
    localStorage.setItem("keys",keysToStore);
}

function getPossibleMoves() {
    possibleMoves = [];
    for (let m of $("#keysDiv table tr td:nth-child(1)")) {
        possibleMoves.push($(m).text());
    }
}

function getTurn(e) {
    if (!ready && !timing) {
        if (e === 32) {
            getReady();
        }
    }
    else {
        const key = keyBinds.indexOf(String.fromCharCode(e));
        const turn = possibleMoves[key];
        if (turn) {
            if (turn.includes("x") || turn.includes("y") || turn.includes("z")) {}
            else {
                if (ready) {
                // Start timer
                    ready = false;
                    timing = true;
                    startTimer();
                }
                // Count move
                moveCount++;
                $("#moves").html(moveCount + " moves");
            }

            makeTurn(turn);
            // Endre til å tegne state
            updateCube();
        }
    }
}

function getReady() {
    if (!timing) {
        ready = true;
        scrambleMaker();
        $("#time").html("0.00");
        moveCount = 0;
        $("#moves").html(moveCount + " moves");
        $("#tps").html("");
    }
}

// Ta tid
function startTimer() {
    if (timing) {
        const start = new Date().getTime();
        interval = setInterval(function() {
            time = new Date().getTime() - start;

            const ms = Math.floor((time % 1000) / 10);
            const s = Math.floor((time / 1000) % 60);
            const m = Math.floor((time / 60000) % 60);

            if (ms < 10) ms = "0" + ms;

            if (m === 0) {
                $("#time").html(s + "." + ms);
            }
            else {
                if (s < 10) s = "0" + s;
                $("#time").html(m + ":" + s + "." + ms);
            }

            const solved = checkState();
            if (solved) {
                stopTimer();
            }
        }, 10);
    }
}

function stopTimer() {
    if (timing) {
        timing = false;
        clearInterval(interval);

        tps = moveCount / (time / 1000);
        $("#tps").html(tps.toFixed(2) + " tps");
    }
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

function checkState() {
    let isSolved = false;

    if ((u1 === u2 && u1 === u3 && u1 === u4 && u1 === u5 && u1 === u6 && u1 === u7 && u1 === u8 && u1 === u9) &&
        (d1 === d2 && d1 === d3 && d1 === d4 && d1 === d5 && d1 === d6 && d1 === d7 && d1 === d8 && d1 === d9) &&
        (f1 === f2 && f1 === f3 && f1 === f4 && f1 === f5 && f1 === f6 && f1 === f7 && f1 === f8 && f1 === f9) &&
        (b1 === b2 && b1 === b3 && b1 === b4 && b1 === b5 && b1 === b6 && b1 === b7 && b1 === b8 && b1 === b9) &&
        (r1 === r2 && r1 === r3 && r1 === r4 && r1 === r5 && r1 === r6 && r1 === r7 && r1 === r8 && r1 === r9) &&
        (l1 === l2 && l1 === l3 && l1 === l4 && l1 === l5 && l1 === l6 && l1 === l7 && l1 === l8 && l1 === l9)) {
            isSolved = true;
    }

    return isSolved;
}