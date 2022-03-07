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
let listLatestFirst = true;

let customPlaceholder = "Timing";

let svgWidth, svgHeight;

let rawTime = -1;
let curSingle = -1;
let bestSingle = -1;

let sessionList = [];
let solutionList = [];

//Average arrays
let mo3s = [];
let ao5s = [];
let ao12s = [];

let curSession = 0;

let changingOptions = false;

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
            $("#display h1").text(customPlaceholder);
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
    changingOptions = true;
    $("#outerOptions").css("display", "block");
}

function closeOptions() {
    changingOptions = false;
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
    let sName = prompt("Enter session name:", sessionList[curSession].name);
    if (sName) {
        sessionList[curSession].name = sName;
        openDB(editDB, sessionList[curSession].id, sessionList[curSession])
    }
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
    curSession = parseInt($("#sessionList").val());
    
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

    if (curScrType === "mega") {
        $("#scramble").css("text-align", "left");
    }
    else {
        $("#scramble").css("text-align", "center");
    }

    sessionList[curSession].scrType = curScrType;

    openDB(editDB, sessionList[curSession].id, sessionList[curSession]);
}

function updateScrType() {
    curScrType = sessionList[curSession].scrType;
    $("#scrambleType").val(curScrType);
    getScramble();
}

function updateStats() {
    let solArr = sessionList[curSession].solutions.map(s => s.time);
    let arr = solArr.slice();
    
    // pbList
    $("#pbList").empty();
    $("#pbList").append("<tr><th>Single</th><td id='curSingle' class='cellToClick'>-</td><td id='bestSingle' class='cellToClick'>-</td></tr>");

    // timeList
    $("#timeList").empty();

    emptyAvgArrays();

    if (arr.length !== 0) {
        // timeList
        if (listLatestFirst) {
            for (let i = sessionList[curSession].solutions.length -1; i >= 0; i--) {
                let s = sessionList[curSession].solutions[i];
                let single = "<td class='cellToClick' onclick='showInfo("+i+", 1)'>"+getHHmmsshh(s.time)+"</td>";
                let ao5 = "<td class='cellToClick' onclick='showInfo("+i+", 5)'>"+getAo5(sessionList[curSession], i)+"</td>";
                let ao12 = "<td class='cellToClick' onclick='showInfo("+i+", 12)'>"+getAo12(sessionList[curSession], i)+"</td>";
                $("#timeList").append("<tr><td>"+(i + 1)+"</td>"+single+ao5+ao12+"</tr>");
                getMo3(sessionList[curSession], i);
            }
        }
        else {
            for (let s of sessionList[curSession].solutions) {
                let i = sessionList[curSession].solutions.indexOf(s);
                let single = "<td class='cellToClick' onclick='showInfo("+i+", 1)'>"+getHHmmsshh(s.time)+"</td>";
                let ao5 = "<td class='cellToClick' onclick='showInfo("+i+", 5)'>"+getAo5(sessionList[curSession], i)+"</td>";
                let ao12 = "<td class='cellToClick' onclick='showInfo("+i+", 12)'>"+getAo12(sessionList[curSession], i)+"</td>";
                $("#timeList").append("<tr><td>"+(i + 1)+"</td>"+single+ao5+ao12+"</tr>");
                getMo3(sessionList[curSession], i);
            }
        }

        // pbList
        let rArr = arr.reverse();
        curSingle = rArr[0];

        let sArr = arr.sort(function(a, b){return a-b});
        bestSingle = sArr[0];

        $("#curSingle").text(getHHmmsshh(curSingle));
        $("#bestSingle").text(getHHmmsshh(bestSingle));
        
        $("#curSingle").on("click", function() {
            let i = solArr.indexOf(curSingle);
            showInfo(i, 1);
        });
        
        $("#bestSingle").on("click", function() {
            let i = solArr.indexOf(bestSingle);
            showInfo(i, 1);
        });

        if (arr.length >= 3) {
            let curMo3 = getMo3(sessionList[curSession], sessionList[curSession].solutions.length-1);
            let bestMo3 = getBestAvg(3);
            $("#pbList").append("<tr><th>Mo3</th><td id='curMo3' class='cellToClick'>"+curMo3+"</td><td id='bestMo3' class='cellToClick'>"+bestMo3+"</td></tr>");
        
            $("#curMo3").on("click", function() {
                console.log(mo3s);
                let i = mo3s.indexOf(curMo3) + 2;
                showInfo(i, 3);
            });
            
            $("#bestMo3").on("click", function() {
                let i = mo3s.indexOf(bestMo3) + 2;
                showInfo(i, 3);
            });
        }
        if (arr.length >= 5) {
            let curAo5 = getAo5(sessionList[curSession], sessionList[curSession].solutions.length-1);
            let bestAo5 = getBestAvg(5);
            $("#pbList").append("<tr><th>Ao5</th><td id='curAo5' class='cellToClick'>"+curAo5+"</td><td id='bestAo5' class='cellToClick'>"+bestAo5+"</td></tr>");
        
            $("#curAo5").on("click", function() {
                let i = ao5s.indexOf(curAo5) + 4;
                showInfo(i, 5);
            });
            
            $("#bestAo5").on("click", function() {
                let i = ao5s.indexOf(bestAo5) + 4;
                showInfo(i, 5);
            });
        }
        if (arr.length >= 12) {
            let curAo12 = getAo12(sessionList[curSession], sessionList[curSession].solutions.length-1);
            let bestAo12 = getBestAvg(12);
            $("#pbList").append("<tr><th>Ao12</th><td id='curAo12' class='cellToClick'>"+curAo12+"</td><td id='bestAo12' class='cellToClick'>"+bestAo12+"</td></tr>");
        
            $("#curAo12").on("click", function() {
                let i = ao12s.indexOf(curAo12) + 11;
                showInfo(i, 12);
            });
            
            $("#bestAo12").on("click", function() {
                let i = ao12s.indexOf(bestAo12) + 11;
                showInfo(i, 12);
            });
        }
    }
    adjustSize();
}

function showInfo(i, num) {
    let info = "";
    if (num === 1) {
        let s = sessionList[curSession].solutions[i];
        info = getHHmmsshh(s.time) + "   " + s.scramble;
    }
    else {
        if (num === 3) {
            info = "Mo3: \n\n"
        }
        info = "Ao" + num + ": \n\n";
        for (let n = 0; n < num; n++) {
            let s = sessionList[curSession].solutions[i-(num-n)];
            info += (n + 1) + ". " + getHHmmsshh(s.time) + "   " + s.scramble + "\n";
        }
    }
    alert(info);
}

function getMo3(s, i) {
    const num = 3;
    return getAvg(s, i, num);
}

function getAo5(s, i) {
    const num = 5;
    return getAvg(s, i, num);
}

function getAo12(s, i) {
    const num = 12;
    return getAvg(s, i, num);
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

function getAvg(s, i, num) {
    let avgArr;

    if (num === 3) {
        avgArr = mo3s;
    }
    else if (num === 5) {
        avgArr = ao5s;
    }
    else if (num === 12) {
        avgArr = ao12s;
    }

    if (i >= (num-1)) {
        let avg = 0;
        let arr = s.solutions.map(s => s).slice(i-(num-1),i+1).sort(function(a, b) {
            let pA = a.penalty === -1 ? -Infinity : a.penalty;
            let pB = b.penalty === -1 ? -Infinity : b.penalty;
            return (a.time+pA)-(b.time+pB);});
        let nArr;
        if (num === 3) {
            nArr = arr.slice();
        }
        else {
            nArr = arr.slice(1,(num-1));
        }

        for (let a of nArr) {
            avg += Math.floor(a.time/10);
        }
        
        avg /= nArr.length;

        if (avg === -Infinity) {
            avgArr.push("DNF");
            return ("DNF");
        }
        else {
            avgArr.push(avg*10);
            return getHHmmsshh(avg*10);
        }
    }
    else {
        return "-";
    }
}

function getBestAvg(num) {
    let arr;

    if (num === 3) {
        arr = mo3s.slice();
    }
    else if (num === 5) {
        arr = ao5s.slice();
    }
    else if (num === 12) {
        arr = ao12s.slice();
    }

    let bAvg = Infinity;
    
    if (listLatestFirst) {
        for (let i = arr.length -1; i >= 0; i--) {
            let a = arr[i];
            if (a < bAvg) {
                bAvg = a;
            }
        }
    }
    else {
        for (let a of arr) {
            if (a < bAvg) {
                bAvg = a;
            }
        }
    }

    return getHHmmsshh(bAvg);
}

function emptyAvgArrays() {
    mo3s = [];
    ao5s = [];
    ao12s = [];
}

function changeListingOrder() {
    listLatestFirst = !listLatestFirst;
    updateStats();
}

function toggleShowTime(val) {
    if (val === "1") {
        showTime = true;
        $("#inpCustomPlaceholder").prop("disabled",true);
    }
    else {
        showTime = false;
        $("#inpCustomPlaceholder").prop("disabled",false);
    }
}

function changeCustomPlaceholder(val) {
    if (val.trim() !== "") {
        customPlaceholder = val.trim();
    }
    else {
        $("#inpCustomPlaceholder").val(customPlaceholder);
    }
}

function importFromCSTimer() {
    
}

function exportToCSTimer() {
    
}

function initActions() {
    connectAndGetDataFromDB();
    keyActions();

    curScrType = $("#scrambleType").children(":selected").attr("id");

    if (curScrType === "mega") {
        $("#scramble").css("text-align", "left");
    }
    else {
        $("#scramble").css("text-align", "center");
    }

    getScramble();

    $("#timeList").parent().css("overflow-y", "scroll");

    if (showTime) {
        $("input:radio[name=showTime]").filter("[value=1]").prop('checked', true);
        $("#inpCustomPlaceholder").prop("disabled",true);
    }
    else {
        $("input:radio[name=showTime]").filter("[value=0]").prop('checked', true);
        $("#inpCustomPlaceholder").prop("disabled",false);
    }
    $("#inpCustomPlaceholder").val(customPlaceholder);

    $("#innerOptions").on("mousedown", function (e) {
        e.stopPropagation();
    });
}

function keyActions() {
    $("html").on('keydown', function (e) {
        if (!changingOptions) {
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
        }
    })
    .on('keyup', function (e) {
        if (!changingOptions) {
            if (e.keyCode === 32) {
                if (ready && !timing) {
                    startTimer();
                }
                else if (wait055 && !ready && !timing) {
                    resetTimer();
                }
            }
        }
    });
}

function adjustSize() {
    let svgWidth = $("#right").width() * 0.75;
    let svgHeight = svgWidth * 3/4;

    $(".svgScramble").attr("width", svgWidth);
    $(".svgScramble").attr("height", svgHeight);


    let h = $("#content").height() - $("#notTimeList").height();
    $("#timeList").parent().css("max-height", h);
    
    if (!listLatestFirst) {
        let d = $('#timeList').parent();
        d.scrollTop(d.prop("scrollHeight"));
    }
    else {
        let d = $('#timeList').parent();
        d.scrollTop(0);
    }

    drawScramble();
}