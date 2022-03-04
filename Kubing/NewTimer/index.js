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

const scrTypes = ["333", "222", "444", "555", "666", "777", "clock", "mega", "pyra", "skewb", "sq1"];

let wait055 = false;
let showTime = true;

let customMessage = "Timing";

let svgWidth, svgHeight;

let rawTime = -1;
let curSingle = -1;
let bestSingle = -1;

let sessionList = [];
let solutionList = [];

let curSession = 0;

$(function () {
    initActions();
    adjustSize();
});

$(window).resize(function(){
    adjustSize();
});

function waitForTimer() {
    $("#scramble").css("visibility","hidden");
    $("#left").css("visibility","hidden");
    $("#right").css("visibility","hidden");
    $("#scramble h1").text("");

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
        $("#scramble").css("visibility","visible");
        $("#left").css("visibility","visible");
        $("#right").css("visibility","visible");
        $("#display h1").text(getHHmmsshh(rawTime));
        clearInterval(interval);
        setTimeout(
            function() {
                timing = false;
            }, 100);

        // Save time and scramble
        saveSolution();
    }
}

function resetTimer() {
    clearInterval(interval);
    timing = false;
    stopped = true;
    $("#scramble").css("visibility","visible");
    $("#left").css("visibility","visible");
    $("#right").css("visibility","visible");
    $("#display h1").css("color", "white");
    $("#display h1").text("0.00");
    $("#scramble h1").text(scramble);
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
    const newSolution = new Solution(rawTime, 0, scramble, "", date);
    sessionList[curSession].solutions.push(newSolution);
    
    openDB(editDB, sessionList[curSession].id, sessionList[curSession]);
}

function showOptions() {
    $("#outerOptions").css("display", "block");
}

function closeOptions() {
    $("#outerOptions").css("display", "none");
}

function connectAndGetDataFromDB() {
    openDB(getAllFromDB);
}

function getData(data) {
    let arr = data;
    if (arr.length !== 0) {
        sessionList = arr.slice();

        checkSessions();
    }
    else {
        createSession();
    }
}

function createSession() {
    $("#btnNew").blur();
    let num = sessionList.length + 1;
    let sessionId = formatSessionID(num);
    let sessionName = "Session "+num;
    let sessionRank = sessionList.length;
    let sessionScrType = scrTypes[0];
    let sessionSolutions = [];
    curSession = sessionList.length;
    curScrType = sessionScrType;
    
    const nSession = new Session(sessionId, sessionName,sessionRank,sessionScrType, sessionSolutions);

    openDB(editDB, sessionId, nSession);
    resetTimer();
}

function renameSession() {
    
}

function deleteSession() {
    checkSessions();
}

function formatSessionID(id) {
    let f = "session_";
    if (id < 10) {
        f += "0"+id;
    }
    else {
        f += id;
    }
    return f;
}

function checkSessions() {
    // Clear sessionList
    $("#sessionList").empty();
    // List sessions
    for (let s of sessionList) {
        if (s.rank === curSession) {
            $("#sessionList").append("<option id='"+s.id+"' value='"+s.rank+"' data-rank='"+s.rank+"' selected>"+s.name+"</option>");
        }
        else {
            $("#sessionList").append("<option id='"+s.id+"' value='"+s.rank+"' data-rank='"+s.rank+"'>"+s.name+"</option>");
        }
    }

    // Session buttons
    if ($("#sessionList").length === 1) {
        $("#btnDelete").prop('disabled', true);
    }
    else {
        $("#btnDelete").prop('disabled', false);
    }

    if ($("#sessionList").length === 99) {
        $("#btnNew").prop('disabled', true);
    }
    else {
        $("#btnNew").prop('disabled', false);
    }

    updateSession();
}

function changeSession() {
    curSession = $("#sessionList").children(":selected").attr("data-rank");
    console.log("curSession",curSession);
    //$("#sessionList option[id='1']")
    resetTimer();
    
    checkSessions();
    $("#sessionList").blur();
}

function updateSession() {
    updateScrType();
    updateStats();
}

function changeScrType() {
    curScrType = $("#scrambleType").children(":selected").attr("id");
    $("#scrambleType").blur();
    getScramble();

    sessionList[curSession].scrType = curScrType;

    openDB(editDB, sessionList[curSession].id, sessionList[curSession]);
}

function updateScrType() {
    curScrType = sessionList[curSession].scrType;
    $("#scrambleType").val(curScrType);
    getScramble();
}

function updateStats() {
    let arr = sessionList[curSession].solutions.map(s => s.time);
    
        // pbList
    $("#curSingle").text("-");
    $("#bestSingle").text("-");

    // timeList
    $("#timeList").empty();
    $("#timeList").append("<tr><th>#</th><th>Time</th><th>Ao5</th><th>Ao12</th></tr>");

    if (arr.length !== 0) {
        // pbList
        let rArr = arr.reverse();
        curSingle = rArr[0];

        let sArr = arr.sort(function(a, b){return a-b});
        bestSingle = sArr[0];

        $("#curSingle").text(getHHmmsshh(curSingle));
        $("#bestSingle").text(getHHmmsshh(bestSingle));

        // timeList
        for (let s of sessionList[curSession].solutions) {
            let i = sessionList[curSession].solutions.indexOf(s) + 1;
            $("#timeList").append("<tr><td>"+i+"</td><td>"+getHHmmsshh(s.time)+"</td><td>"+getAo5(sessionList[curSession], i)+"</td><td>"+getAo12(sessionList[curSession], i)+"</td></tr>");
        }
    }
}

function getMo3(s, i) {
    const num = 3;
    if (i >= num) {
        let avg = 0;
        let arr = s.solutions.map(s => s).slice(i-(num-1),i+1).sort(function(a, b) {
            let pA = a.penalty === -1 ? -Infinity : a.penalty;
            let pB = b.penalty === -1 ? -Infinity : b.penalty;
            return (a.time+pA)-(b.time+pB);});

        for (let a of arr) {
            avg += Math.floor(a.time/10);
        }
        
        avg /= arr.length;

        if (avg === -Infinity) {
            return ("DNF");
        }
        else {
            return getHHmmsshh(avg*10);
        }
    }
    else {
        return "-";
    }
}

function getAo5(s, i) {
    const num = 5;
    if (i >= num) {
        let avg = 0;
        let arr = s.solutions.map(s => s).slice(i-(num-1),i+1).sort(function(a, b) {
            let pA = a.penalty === -1 ? -Infinity : a.penalty;
            let pB = b.penalty === -1 ? -Infinity : b.penalty;
            return (a.time+pA)-(b.time+pB);});
        let nArr = arr.slice(1,(num-1));

        for (let a of nArr) {
            avg += Math.floor(a.time/10);
        }
        
        avg /= nArr.length;

        if (avg === -Infinity) {
            return ("DNF");
        }
        else {
            return getHHmmsshh(avg*10);
        }
    }
    else {
        return "-";
    }
}

function getAo12(s, i) {
    const num = 12;
    if (i >= num) {
        let avg = 0;
        let arr = s.solutions.map(s => s).slice(i-(num-1),i+1).sort(function(a, b) {
            let pA = a.penalty === -1 ? -Infinity : a.penalty;
            let pB = b.penalty === -1 ? -Infinity : b.penalty;
            return (a.time+pA)-(b.time+pB);});
        let nArr = arr.slice(1,(num-1));

        for (let a of nArr) {
            avg += Math.floor(a.time/10);
        }
        
        avg /= nArr.length;

        if (avg === -Infinity) {
            return ("DNF");
        }
        else {
            return getHHmmsshh(avg*10);
        }
    }
    else {
        return "-";
    }
}

function getAo25(s, i) {
    
}

function getAo50(s, i) {
    
}

function getAo100(s, i) {
    
}

function getAo200(s, i) {
    
}

function getAo500(s, i) {
    
}

function getAo1000(s, i) {
    
}

function getAo2000(s, i) {
    
}

function getAo5000(s, i) {
    
}

function getAo10000(s, i) {
    
}

function initActions() {
    connectAndGetDataFromDB();
    keyActions();

    curScrType = $("#scrambleType").children(":selected").attr("id");

    getScramble();

    $("#innerOptions").on("click", function (e) {
        e.stopPropagation();
    });
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