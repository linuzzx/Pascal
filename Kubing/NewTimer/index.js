let timing, ready = false;
let stopped = true;
let scramble;
let curScrType;

let waitingInterval;
let interval;
let start;

let green = "#00FF00";
let yellow = "#F5E801";
let red = "#FF0000";

let wait055 = false;
let showTime = true;

let customMessage = "Timing";

let svgWidth, svgHeight;

let rawTime = -1;
let curSingle = -1;
let bestSingle = -1;

let sessions = [];
let solutions = [];

$(function () {
    initActions();
    adjustSize();
});

$(window).resize(function(){
    adjustSize();
});

function waitForTimer() {
    $("#cube").empty();
    $("#scramble").css("visibility","hidden");
    if (wait055) {
        //Fiks denne
        /*$("#display h1").css("color", red);
        const waitStart = new Date().getTime();
        let waitingTime = 0;

        waitingInterval = setInterval(function() {
            waitingTime = new Date().getTime() - waitStart;
            if (waitingTime >= 550) {
                readyTimer();
                clearInterval(waitingInterval);
            }
        }, 1);*/
        readyTimer();
    }
    else {
        readyTimer();
    }
}

function readyTimer() {
    if (!ready) {
        ready = true;
        $("#display h1").css("color", green);
    }
}

function startTimer() {
    timing = true;
    ready = false;
    stopped = false;
    $("#display h1").css("color", "white");

    start = new Date().getTime();
    interval = setInterval(function() {
        rawTime = new Date().getTime() - start;
        if (showTime) {
            $("#display h1").text(getHHmmsshh(rawTime));
        }
        else {
            $("#display h1").text(customMessage);
        }
    }, 10);
    
}

function stopTimer() {
    if (!stopped) {
        stopped = true;
        $("#display h1").text(getHHmmsshh(rawTime));
        clearInterval(interval);
        setTimeout(
            function() {
                timing = false;
            }, 100);

        // Save time and scramble
        saveSolution();

        getScramble();
    }
}

function resetTimer() {
    clearInterval(interval);
    timing = false;
    stopped = true;
    $("#scramble").css("visibility","visible");
    $("#display h1").css("color", "white");
    $("#display h1").text("0.00");
    drawScramble();
}

function getScramble() {
    switch (curScrType) {
        case "333":
            scramble = getScramble333();
            break;
        case "222":
            scramble = getScramble222();
            break;
        case "444":
            scramble = getScramble444();
            break;
        case "555":
            scramble = getScramble555();
            break;
        case "666":
            scramble = getScramble666();
            break;
        case "777":
            scramble = getScramble777();
            break;
        case "clock":
            scramble = getScrambleClock();
            break;
        case "mega":
            scramble = getScrambleMega();
            break;
        case "pyra":
            scramble = getScramblePyra();
            break;
        case "skewb":
            scramble = getScrambleSkewb();
            break;
        case "sq1":
            scramble = getScrambleSq1();
            break;
        default:
            break;
    }

    $("#scramble h1").html(scramble);
    $("#scramble").css("visibility","visible");

    drawScramble();
}

function drawScramble() {
    switch (curScrType) {
        case "333":
            draw333Svg($("#cube"),scramble);
            break;
        case "222":
            draw222Svg($("#cube"),scramble);
            break;
        case "444":
            draw444Svg($("#cube"),scramble);
            break;
        case "555":
            draw555Svg($("#cube"),scramble);
            break;
        case "666":
            draw666Svg($("#cube"),scramble);
            break;
        case "777":
            draw777Svg($("#cube"),scramble);
            break;
        case "clock":
            drawClockSvg($("#cube"),scramble);
            break;
        case "mega":
            drawMegaSvg($("#cube"),scramble);
            break;
        case "pyra":
            drawPyraSvg($("#cube"),scramble);
            break;
        case "skewb":
            drawSkewbSvg($("#cube"),scramble);
            break;
        case "sq1":
            drawSq1Svg($("#cube"),scramble);
            break;
        default:
            break;
    }
}

function saveSolution() {
    //Add solution to solutions
    const date = Date.now().toString().split("").slice(0, 10).join("");
    const newSolution = new Solution(0, rawTime, scramble,"",date);
    solutions.push(newSolution);

    updateStats();
}

function updateStats() {
    let arr = solutions.map(s => s.time);
    
    let rArr = arr.reverse();
    curSingle = rArr[0];

    let sArr = arr.sort(function(a, b){return a-b});
    bestSingle = sArr[0];

    $("#curSingle").text(getHHmmsshh(curSingle));
    $("#bestSingle").text(getHHmmsshh(bestSingle));
}

function renameSession() {
    
}

function newSession() {
    checkSessions();
}

function deleteSession() {
    checkSessions();
}

function showOptions() {
    $("#outerOptions").css("display", "block");
}

function closeOptions() {
    $("#outerOptions").css("display", "none");
}

function initActions() {
    connectToDB();
    checkSessions();
    keyActions();

    curScrType = $("#scrambleType").children(":selected").attr("id");

    getScramble();

    $("#innerOptions").on("click", function (e) {
        e.stopPropagation();
    });

    $("#scrambleType").on("change", function () {
        curScrType = $("#scrambleType").children(":selected").attr("id");
        getScramble();
    });
}

function connectToDB() {
    openDB(getAllFromDB);
}

function checkSessions() {
    if ($("#sessionList").length === 1) {
        $("#btnDelete").prop('disabled', true);
    }
    else {
        $("#btnDelete").prop('disabled', false);
    }
}

function keyActions() {
    $("html").on('keydown', function (e) {
        if (timing) {
            if (e.keyCode !== 27) {
                stopTimer();
            }
        }
        else {
            if (e.keyCode === 32) {
                if (!ready) {
                    waitForTimer();
                }
            }
        }
        if (e.keyCode === 27) {
            resetTimer();
        }
    })
    .on('keyup', function (e) {
        if (e.keyCode === 32) {
            if (ready && !timing) {
                startTimer();
            }
            else if (wait055 && !ready && !timing) {
                resetTimer();
            }
        }
    });
}

function adjustSize() {
    let svgWidth = $("#right").width() * 0.75;
    let svgHeight = svgWidth * 3/4;

    $(".svgScramble").attr("width", svgWidth);
    $(".svgScramble").attr("height", svgHeight);
    
    drawScramble();
}