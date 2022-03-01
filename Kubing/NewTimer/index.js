let timing, ready = false;
let wait055 = false;
let showTime = true;
let scramble, time;

let waitingInterval;
let interval;
let start;

let green = "#00FF00";
let yellow = "#F5E801";

let customMessage = "Timing";

$(function () {
    initKeyActions();
    getScramble();
});

function waitForTimer() {
    $("#scramble h1").text("");
    if (wait055) {
        //Fiks denne
        /*$("#scramble h1").css("color", yellow);
        $("#display h1").css("color", yellow);
        const waitStart = new Date().getTime();
        let waitingTime = 0;

        waitingInterval = setInterval(function() {
            waitingTime = new Date().getTime() - waitStart;
        }, 10);

        while (!ready) {
            if (waitingTime >= 550) {
                readyTimer();
            }
        }*/
    }
    else {
        readyTimer();
    }
}

function readyTimer() {
    if (!ready) {
        ready = true;
        $("#display h1").css("color", green);
        clearInterval(waitingInterval);
    }
}

function startTimer() {
    timing = true;
    ready = false;
    $("#display h1").css("color", "white");

    start = new Date().getTime();
    interval = setInterval(function() {
        time = new Date().getTime() - start;
        if (showTime) {
            $("#display h1").text(getHHmmsshh(time));
        }
        else {
            $("#display h1").text(customMessage);
        }
    }, 10);
    
}

function stopTimer() {
    $("#display h1").text(getHHmmsshh(time));
    clearInterval(interval);
    timing = false;
    $("#display h1").css("color", "white");
    // Save time and scramble
    saveStats();

    getScramble();
}

function resetTimer() {
    $("#scramble h1").text(scramble);
    $("#display h1").css("color", "white");
    $("#display h1").text("0.00");
}

function getScramble() {
    scramble = getScramble333();
    $("#scramble h1").text(scramble);
}

function saveStats() {

}

function initKeyActions() {
    $("html").on('keydown', function (e) {
        if (e.key === 'Space' || e.keyCode === 32) {
            if (!ready && !timing) {
                waitForTimer();
            }
            else if (timing) {
                stopTimer();
            }
        }
    })
    .on('keyup', function (e) {
        if (e.key === 'Space' || e.keyCode === 32) {
            if (ready && !timing) {
                startTimer();
            }
            else if (wait055 && !ready && !timing) {
                resetTimer();
            }
        }
    })
    .on('keypress', function (e) {
        if (e.key === 'Space' || e.keyCode === 32) {
            if (timing) {
                stopTimer();
            }
        }
        else if (e.key === 'Escape' || e.keyCode === 27) {
            if (timing) {
                resetTimer();
            }
        }
    });
}