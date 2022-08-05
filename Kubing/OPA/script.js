let scramble = "";
let timing, showingParity, ready;
let start;
let interval;
let scrambling;
let locked;
let guessing;
let guess;
let curTime;
let timeList;

$(() => {
    restart();

    initActions();
});

function initActions() {
    adjustSize();

    // Hent fra DB her
    timeList = localStorage.getItem("timeListOPA") ? localStorage.getItem("timeListOPA").split(";") : [];

    if (timeList.length !== 0) {
        for (let t of timeList) {
            addToList(t.split("*")[0], t.split("*")[1]);
        }
    }

    $(window).on("keyup", e => {
        if (e.which === 32 && !timing && !showingParity && ready && !scrambling) {
            startTimer();
        }
        else if (e.which === 32 && timing) {
            readyTimer();
        }
        else if (scrambling) {
            scrambling = false;
        }
    });
    $(window).on("keydown", e => {
        if (guessing) {
            if (e.which === 32) {
                guess = "Even";
                checkParity();
            }
            else if (e.which === 8) {
                guess = "Odd";
                checkParity();
            }
        }
        else if (e.which !== 27 && timing && !locked) {
            stopTimer();
        }
        else if (e.which === 32 && !timing && showingParity) {
            scr();
        }
        else if (e.which === 27 && !guessing && showingParity) {
            restart();
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
    scrambling = false;
    guessing = false;
    locked = false;

    guess = "";
    curTime = 0;
}

function scr() {
    let scr = getScramble4x4(15 + Math.round(Math.random() * 5));
    scramble += " " + scr;
    $("#scramble").text(scr);
    $("#answer").text("");
    $("#timer").text("0.00");
    $("#btnScramble").blur();
    showingParity = false;
    scrambling = true;
}

function guessParity() {
    guessing = true;
    $("#answer").text("Press [spacebar] if even targets, [backspace] if odd targets.");
}

function checkParity() {
    guessing = false;
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

    timeList.push(curTime + "*" + (answer === guess));
    localStorage.setItem("timeListOPA", timeList.join(";"));

    $("#scramble").text("[spacebar] to scramble on top of previous scramble, [escape] for new scramble")

    addToList(curTime, answer === guess);
}

function addToList(t, g) {
    let i = $("#tblTimes tr").length;
    $("#tblTimes").append("<tr data-time='"+t+"' data-guess='"+g+"' onclick='deleteTime("+i+")'><th>"+(i + 1)+"</th><td>"+getHHmmsshh(t)+"</td><td>"+g+"</td></tr>");
    let d = $("#tblTimes").parent();
    d.scrollTop(d.prop("scrollHeight"));

    updateStats();
}

function clearList() {
    if (confirm("Do you really want to clear time list? There is no way back...")) {
        $("#tblTimes").html("");
        timeList = [];

        // Fjern fra localStorage
        localStorage.removeItem("timeListOPA");
        updateStats();
    }
    $("#btnClear").blur();
}

function deleteTime(i) {
    if (confirm("Are you sure you want do delete the time?")) {
        timeList[i] = "null";
        timeList = timeList.filter(t => t !== "null");
        $("#tblTimes").html("");
        for (let t of timeList) {
            addToList(t.split("*")[0], t.split("*")[1]);
        }
        localStorage.setItem("timeListOPA", timeList.join(";"));
        updateStats();
    }
}

function updateStats() {
    if (timeList.length === 0) {
        $("#tdBest").html("-");
        $("#tdRate").html("-");
        $("#tdMean").html("-");
    }
    else {
        let totalTime = 0;
        for (let t of timeList.map(t => t.split("*")[0])) {
            totalTime += parseInt(t);
        }
        let bestTime = timeList.filter(t => t.split("*")[1] === "true").map(t => parseInt(t.split("*")[0])).sort((a, b) => a - b)[0];
        let best = bestTime ? getHHmmsshh(bestTime) : "-";
        let attempts = timeList.length;
        let successes = timeList.map(t => t.split("*")[1]).filter(g => g === "true").length;
        let percentage = " (" + ((successes / attempts) * 100).toFixed(1) + "%)";
        $("#tdBest").html(best);
        $("#tdRate").html(successes + "/" + attempts + percentage);
        $("#tdMean").html(getHHmmsshh(Math.round(totalTime / attempts)));
    }
}

function startTimer() {
    timing = true;
    ready = false;
    start = Date.now();
    $("#timer").text("Timing");
    $("#scramble").html("<br>");
}

function stopTimer() {
    locked = true;
    let time = Date.now() - start;
    $("#timer").text(getHHmmsshh(time));
    curTime = time;
    guessParity();
}

function readyTimer() {
    ready = true;
    timing = false;
    locked = false;
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

function adjustSize() {
    $("#svgGraph").width("25%");
    $("#svgGraph").height($("#svgGraph").width() * 2 / 4);
    $("#svgGraph").css("right", "0.5%");
    $("#svgGraph").css("bottom", $("#svgGraph").css("right"));

    $("#tblHeader th, #tblHeader td, #tblTimes th, #tblTimes td").width($("#tblTimes").width() / 3);
    $("#tblTimes").parent().css("overflow-y", "scroll");
}