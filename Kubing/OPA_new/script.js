let scramble = "";
let timing, showingParity, ready;
let start;
let interval;

$(() => {
    restart();

    initActions();
});

function initActions() {
    $(window).on("keyup", e => {
        if (e.keyCode === 32 && !timing && !showingParity && ready) {
            startTimer();
        }
        else if (e.keyCode === 32 && timing) {
            readyTimer();
        }
    });
    $(window).on("keydown", e => {
        if (e.keyCode === 32 && timing) {
            stopTimer();
        }
        else if (e.keyCode === 32 && !timing && showingParity) {
            scr();
        }
    });
}

function restart() {
    scramble = getScramble4x4(30);
    $("#scramble").text(scramble);
    $("#answer").text("");
    $("#timer").text("0.00");
    $("#btnRestart").blur();

    timing = false;
    ready = true;
    showingParity = false;
}

function scr() {
    let scr = getScramble4x4(15 + Math.round(Math.random() * 5));
    scramble += " " + scr;
    $("#scramble").text(scr);
    $("#answer").text("");
    $("#btnScramble").blur();
    setTimeout(() => {
        showingParity = false
    }, 100);
}

function checkParity() {
    showingParity = true;
    let qwt = 0;
    for (let m of scramble.split(" ")) {
        if (m.includes("w") && !m.includes("2")) {
            qwt++;
        }
    }

    let answer = qwt % 2 === 0 ? "Even" : "Odd";

    $("#answer").text(answer);
    $("#btnCheck").blur();
}

function startTimer() {
    timing = true;
    ready = false;
    start = Date.now();
    $("#timer").text("Timing");
}

function stopTimer() {
    $("#timer").text(getHHmmsshh(Date.now() - start));
    checkParity();
}

function readyTimer() {
    ready = true;
    timing = false;
}

function toggleTimer(val) {
    console.log(val);
}

function getScramble4x4(num) {
    let n = 4;
    let scr = "";
    let movesExtra = ["", "'", "2"];
    let axises = [["U","D"], ["F","B"], ["R","L"]];
    let movesAxis = [["",""]];

    for (let i = 4; i <= n; i++) {
        let nW = Math.floor(i/2) === 2 ? "" : Math.floor(i/2);
        let nA = [nW,"w"];
        
        if (!JSON.stringify(movesAxis).includes(JSON.stringify(nA))) {
            movesAxis.push(nA);
        }
    }
    
    let curAxis = -1;
    let moves = [];
    for (let i = 0; i < num; i++) {
        let axis = Math.floor(Math.random() * axises.length);

        if (axis !== curAxis) {
            curAxis = axis;
            moves = movesAxis.map(m => [m[0] + axises[curAxis][0] + m[1]])
                    .concat(movesAxis.map(m => [m[0] + axises[curAxis][1] + m[1]]));
            if (n % 2 === 0) {
                moves.pop();
            }
        }
        else if (moves.length === 0) {
            i--;
            continue;
        }

        let move = moves[Math.floor(Math.random() * moves.length)];
        let moveE = movesExtra[Math.floor(Math.random() * movesExtra.length)];
        
        moves.splice(moves.indexOf(move), 1);

        scr += move + moveE + " ";
    }
    return scr.trim();
}

function getHHmmsshh(ms, penalty = 0, stats = false) {
    /* if (ms === "DNF" || ms === "-") {
        return ms;
    }
    else if (ms === undefined) {
        return "-";
    }
    else if (penalty === -1 && !stats) {
        return "DNF";
    }
    else if (penalty === 2000) {
        ms += 2000;
    }
    else if (ms === Infinity) {
        return "DNF";
    } */

    let timeStr = "";
    let cs = Math.floor((ms % 1000) / 10);
    let s = Math.floor((ms / 1000) % 60);
    let m = Math.floor((ms / 60000) % 60);
    let h = Math.floor((ms / 3600000) % 24);

    if (h !== 0) {
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (cs < 10) {
            cs = "0" + cs;
        }
        timeStr = h + ":" + m + ":" + s + "." + cs;
    }
    else {
        if (m !==0) {
            if (s < 10) {
                s = "0" + s;
            }
            if (cs < 10) {
                cs = "0" + cs;
            }
            timeStr = m + ":" + s + "." + cs;
        }
        else {
            if (cs < 10) {
                cs = "0" + cs;
            }
            timeStr = s + "." + cs;
        }
    }
    
    /* if (penalty === 2000) {
        timeStr += "+";
    }
    else if (penalty === -1 && stats) {
        timeStr = "DNF (" + timeStr + ")";
    } */
    
    return timeStr;
}