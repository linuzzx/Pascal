let timing, waiting, ready = false;
let stopped = true;
let scramble;
let curScrType;

let interval;
let waitingInterval;
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

let doNotScramble = false;
let doNotCreateNew = false;

//Average arrays
let mo3s = [];
let ao5s = [];
let ao12s = [];
let ao25s = [];
let ao50s = [];
let ao100s = [];
let ao200s = [];
let ao500s = [];
let ao1000s = [];
let ao2000s = [];
let ao5000s = [];
let ao10000s = [];

let curSession = 0;

let showingOuterInner = false;

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

    if (wait055 && !waiting && stopped) {
        waiting = true;
        //Fiks denne
        $("#display h1").css("color", red);
        const waitStart = new Date().getTime();
        let waitingTime = 0;

        waitingInterval = setInterval(function() {
            waitingTime = new Date().getTime() - waitStart;
            if (waitingTime >= 550) {
                clearInterval(waitingInterval);
                readyTimer();
            }            
        }, 10);
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
    waiting = false;
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
        $("#scramble").css("visibility","visible");
        $("#left").css("visibility","visible");
        $("#right").css("visibility","visible");
        $("#display h1").text(getHHmmsshh(rawTime));
        clearInterval(interval);
        stopped = true;

        // Save time and scramble
        saveSolution();
    }
}

function resetTimer() {
    clearInterval(interval);
    clearInterval(waitingInterval);
    timing = false;
    ready = false;
    waiting = false;
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
    if (!doNotScramble) {
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

    doNotScramble = false;
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
    showingOuterInner = true;
    $("#outerOptions").css("display", "block");
}

function closeOptions() {
    showingOuterInner = false;
    $("#outerOptions").css("display", "none");
}

function showTimeStats() {
    showingOuterInner = true;
    $("#outerTimeStats").css("display", "block");
}

function closeTimeStats() {
    showingOuterInner = false;
    $("#outerTimeStats").css("display", "none");
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
        if (!doNotCreateNew) {
            createSession();
        }
        doNotCreateNew = false;
    }
}

function createSession() {
    $("#btnNew").blur();
    let num = sessionList.length + 1;
    let sessionId = formatSessionID(num);
    let sessionName = "Session "+num;
    let sessionRank = sessionList.length + 1;
    let sessionScrType = scrTypes[0];
    let sessionSolutions = [];
    curSession = sessionList.length;
    curScrType = sessionScrType;

    if (sessionList.some(e => e.name === sessionName)) {
        let sNum = 1;

        for (let s of sessionList) {
            if (s.name.includes("_")) {
                sNum++;
            }
        }

        if (sNum < 10) {
            sessionName += "_0" + sNum;
        }
        else {
            sessionName += "_" + sNum;
        }
    }
    
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
    if (confirm("Are you sure you want do delete the session?")) {
        let lastSession = curSession === sessionList.length - 1;
        for (let i = curSession; i < sessionList.length; i++) {
            if (sessionList[i + 1]) {
                sessionList[i].name = sessionList[i + 1].name;
                sessionList[i].scrType = sessionList[i + 1].scrType;
                sessionList[i].solutions = sessionList[i + 1].solutions;
            }
        }
        let lastID = sessionList.pop().id;
        
        for (let i = curSession; i < sessionList.length; i++) {
            doNotScramble = true;
            openDB(editDB, sessionList[i].id, sessionList[i]);
        }

        openDB(removeFromDB(lastID));

        if (lastSession) {
            let id = sessionList[sessionList.length - 1].id;
            //$("#sessionList").val(name).change();
            $("#sessionList option[id="+id+"]").attr("selected","selected");

            curSession = sessionList.length - 1;
        }

        checkSessions();
        resetTimer();
    }
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
        if (s.rank - 1 === curSession) {
            $("#sessionList").append("<option id='"+s.id+"' value='"+s.rank+"' data-rank='"+s.rank+"' selected>"+s.name+"</option>");
        }
        else {
            $("#sessionList").append("<option id='"+s.id+"' value='"+s.rank+"' data-rank='"+s.rank+"'>"+s.name+"</option>");
        }
    }

    // Session buttons
    if (sessionList.length === 1) {
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

    if (curScrType === "mega") {
        $("#scramble").css("text-align", "left");
    }
    else {
        $("#scramble").css("text-align", "center");
    }

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
        for (let s of sessionList[curSession].solutions) {
            let i = sessionList[curSession].solutions.indexOf(s);
            let i5 = i - 4;
            let i12 = i - 11;
            let c = s.comment !== "" ? "*" : "&nbsp;";
            
            let single = "<td class='cellToClick' onclick='showInfo("+i+", 1)'>"+getHHmmsshh(s.time, s.penalty)+"</td>";
            let ao5 = "<td class='cellToClick' onclick='showInfo("+i5+", 5)'>"+getHHmmsshh(getAo5(sessionList[curSession], i))+"</td>";
            let ao12 = "<td class='cellToClick' onclick='showInfo("+i12+", 12)'>"+getHHmmsshh(getAo12(sessionList[curSession], i))+"</td>";
            $("#timeList").append("<tr><td>"+(i + 1) + c +"</td>"+single+ao5+ao12+"</tr>");
            getMo3(sessionList[curSession], i);
            getAo25(sessionList[curSession], i);
            getAo50(sessionList[curSession], i);
            getAo100(sessionList[curSession], i);
            getAo200(sessionList[curSession], i);
            getAo500(sessionList[curSession], i);
            getAo1000(sessionList[curSession], i);
            /*getAo2000(sessionList[curSession], i);
            getAo5000(sessionList[curSession], i);
            getAo10000(sessionList[curSession], i);*/
        }

        if (listLatestFirst) {
            reverseTable("#timeList");
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
            showInfo(i, 1, true);
        });
        
        $("#bestSingle").on("click", function() {
            let i = solArr.indexOf(bestSingle);
            showInfo(i, 1, true);
        });
        
        if (arr.length >= 3) {
            addToPBList(3, mo3s);
        }
        if (arr.length >= 5) {
            addToPBList(5, ao5s);
        }
        if (arr.length >= 12) {
            addToPBList(12, ao12s);
        }
        if (arr.length >= 25) {
            addToPBList(25, ao25s);
        }
        if (arr.length >= 50) {
            addToPBList(50, ao50s);
        }
        if (arr.length >= 100) {
            addToPBList(100, ao100s);
        }
        /*
        if (arr.length >= 200) {
            addToPBList(200, ao200s);
        }
        if (arr.length >= 500) {
            addToPBList(500, ao500s);
        }
        if (arr.length >= 1000) {
            addToPBList(1000, ao1000s);
        }
        if (arr.length >= 2000) {
            addToPBList(2000, ao2000s);
        }
        if (arr.length >= 5000) {
            addToPBList(5000, ao5000s);
        }
        if (arr.length >= 10000) {
            addToPBList(10000, ao10000s);
        }
        */
    }
    adjustSize();
}

function addToPBList(num, arr) {
    let curAvg = arr[arr.length-1];
    let bestAvg = getBestAvg(num);

    let avgName = num === 3 ? "Mo3" : "Ao" + num;
    let curAvgID = num === 3 ? "curMo3" : "curAo" + num;
    let bestAvgID = num === 3 ? "bestMo3" : "bestAo" + num;

    $("#pbList").append("<tr><th>"+avgName+"</th><td id='"+curAvgID+"' class='cellToClick'>"+getHHmmsshh(curAvg)+"</td><td id='"+bestAvgID+"' class='cellToClick'>"+getHHmmsshh(bestAvg)+"</td></tr>");

    $("#"+curAvgID).on("click", function() {
        let i = arr.length-1;
        showInfo(i, num, true);
    });
    
    if (bestAvg === Infinity) {
        bestAvg = "DNF";
    }

    $("#"+bestAvgID).on("click", function() {
        let i = arr.indexOf(bestAvg);
        showInfo(i, num, true);
    });
}

function reverseTable(table) {
    $(table).each(function(){
        let list = $(this).children('tr');
        $(this).html(list.get().reverse());
    });
}

function showInfo(i, num, pb = null) {
    let info = "Date: " + getDDMMYYYY(sessionList[curSession].solutions[i].date) + "<br/><br/>";
    if (num === 1) {
        let s = sessionList[curSession].solutions[i];
        let c = s.comment !== "" ? " [" + s.comment + "]" : s.comment;
        info += getHHmmsshh(s.time, s.penalty, true) + stripHTML(c) + "&nbsp;&nbsp;&nbsp;" + s.scramble;
    }
    else {
        if (num === 3) {
            info += "Mo3: " + getHHmmsshh(mo3s[i]) + "<br/><br/>"
        }
        else {
            let ao;
            if (num === 5) {
                ao = ao5s[i];
            }
            else if (num === 12) {
                ao = ao12s[i];
            }
            else if (num === 25) {
                ao = ao25s[i];
            }
            else if (num === 50) {
                ao = ao50s[i];
            }
            else if (num === 100) {
                ao = ao100s[i];
            }
            else if (num === 200) {
                ao = ao200s[i];
            }
            else if (num === 500) {
                ao = ao500s[i];
            }
            else if (num === 1000) {
                ao = ao1000s[i];
            }
            else if (num === 2000) {
                ao = ao2000s[i];
            }
            else if (num === 5000) {
                ao = ao25s[i];
            }
            else if (num === 10000) {
                ao = ao10000s[i];
            }
            info += "Ao" + num + ": " + getHHmmsshh(ao) + "<br/><br/>";
        }

        let arr = [];
        let sArr = [];
        let iArr = [];
        let nRemove = num === 1 || num === 3 ? 0 : Math.ceil(0.05 * num);

        for (let j = 0; j < num; j++) {
            let s = sessionList[curSession].solutions[i+j];
            let p = s.penalty === -1 ? Infinity : s.penalty;
            arr.push(s.time + p);
        }
        arr.sort(function (a, b) {
            return a-b;
        });
        for (let j = 0; j < nRemove; j++) {
            sArr.push(arr[j]);
            iArr.push(j);
        }
        for (let j = arr.length-nRemove; j < arr.length; j++) {
            sArr.push(arr[j]);
            iArr.push(j);
        }
        
        for (let n = 0; n < num; n++) {
            let s = sessionList[curSession].solutions[i+n];
            let p = s.penalty === -1 ? Infinity : s.penalty;
            let c = s.comment !== "" ? "[" + s.comment + "]" : s.comment;

            if (sArr.indexOf(s.time + p) !== -1) {
                info += (n + 1) + ". (" + getHHmmsshh(s.time, s.penalty, true) + c + ")&nbsp;&nbsp;&nbsp;" + s.scramble + "<br/>";
                sArr.splice(sArr.indexOf(s.time), 1);
            }
            else {
                info += (n + 1) + ". " + getHHmmsshh(s.time, s.penalty, true) + c + "&nbsp;&nbsp;&nbsp;" + s.scramble + "<br/>";
            }
        }
    }

    $("#innerTimeStats div").html(info);

    let buttons;
    if (num === 1 && !pb) {
        buttons = "<br/><br/><div id='penaltyOptions'>Penalty:<br/>"
                +"<label>OK <input id='radioPenaltyOK' type='radio' name='penalty' value='0' onclick='changePenalty("+i+")'></label>&nbsp;&nbsp;"
                +"<label>+2 <input id='radioPenalty2' type='radio' name='penalty' value='2000' onclick='changePenalty("+i+")'></label>&nbsp;&nbsp;"
                +"<label>DNF <input id='radioPenaltyDNF' type='radio' name='penalty' value='-1' onclick='changePenalty("+i+")'></label>&nbsp;&nbsp;"
                +"<button onclick='editComment("+i+")'>Comment</button><br/><br/>"
                +"<button onclick='deleteSolve("+i+")'>Delete</button>"
                +"</div>";
        $("#innerTimeStats div").append(buttons);

        let p = sessionList[curSession].solutions[i].penalty;
        $("input:radio[name=penalty]").filter("[value="+p+"]").prop('checked', true);
    }
    showTimeStats();
}

function changePenalty(i) {
    sessionList[curSession].solutions[i].penalty = parseInt($('input[name="penalty"]:checked').val());

    doNotScramble = true;

    openDB(editDB, sessionList[curSession].id, sessionList[curSession]);
    showInfo(i, 1);
}

function editComment(i) {
    let c = prompt("Comment", sessionList[curSession].solutions[i].comment);
    if (c || c === "") {
        sessionList[curSession].solutions[i].comment = c;
        openDB(editDB, sessionList[curSession].id, sessionList[curSession])
    }
    showInfo(i, 1);
}

function stripHTML(html){
    return html.replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function deleteSolve(i) {
    if (confirm("Are you sure you want do delete the time?")) {
        sessionList[curSession].solutions.splice(i, 1);

        openDB(editDB, sessionList[curSession].id, sessionList[curSession]);
        closeTimeStats();
    }
}

function getDDMMYYYY(ms) {
    if (ms.toString().length === 10) {
        ms *= 1000;
    }

    const d = new Date(ms);
    const day = d.getDay().toString().length < 2 ? "0" + d.getDay() : d.getDay();
    const month = d.getMonth().toString().length < 2 ? "0" + d.getMonth() : d.getMonth();
    const year = d.getFullYear();
    const hours = d.getHours().toString().length < 2 ? "0" + d.getHours() : d.getHours();
    const minutes = d.getMinutes().toString().length < 2 ? "0" + d.getMinutes() : d.getMinutes();
    const seconds = d.getSeconds().toString().length < 2 ? "0" + d.getSeconds() : d.getSeconds();

    return day + "." + month + "." + year + " " + hours + ":" + minutes + "." + seconds;
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
    const num = 25;
    return getAvg(s, i, num);
}

function getAo50(s, i) {
    const num = 50;
    return getAvg(s, i, num);
}

function getAo100(s, i) {
    const num = 100;
    return getAvg(s, i, num);
}

function getAo200(s, i) {
    const num = 200;
    return getAvg(s, i, num);
}

function getAo500(s, i) {
    const num = 500;
    return getAvg(s, i, num);
}

function getAo1000(s, i) {
    const num = 1000;
    return getAvg(s, i, num);
}

function getAo2000(s, i) {
    const num = 2000;
    return getAvg(s, i, num);
}

function getAo5000(s, i) {
    const num = 5000;
    return getAvg(s, i, num);
}

function getAo10000(s, i) {
    const num = 10000;
    return getAvg(s, i, num);
}

function getAvg(s, i, num) {
    let avgArr;
    let toRemove = Math.ceil(0.05 * num);
    
    if (num === 3) {
        avgArr = mo3s;
    }
    else if (num === 5) {
        avgArr = ao5s;
    }
    else if (num === 12) {
        avgArr = ao12s;
    }
    else if (num === 25) {
        avgArr = ao25s;
    }
    else if (num === 50) {
        avgArr = ao50s;
    }
    else if (num === 100) {
        avgArr = ao100s;
    }
    else if (num === 200) {
        avgArr = ao200s;
    }
    else if (num === 500) {
        avgArr = ao500s;
    }
    else if (num === 1000) {
        avgArr = ao1000s;
    }
    else if (num === 2000) {
        avgArr = ao2000s;
    }
    else if (num === 5000) {
        avgArr = ao5000s;
    }
    else if (num === 10000) {
        avgArr = ao10000s;
    }

    if (i >= (num-1)) {
        let avg = 0;
        let arr = s.solutions.map(s => s.time + (s.penalty === -1 ? Infinity : s.penalty)).slice(i-(num-1),i+1).sort(function(a, b) {return a-b;});

        let nArr;
        if (num === 3) {
            nArr = arr.slice();
        }
        else {
            nArr = arr.slice(toRemove,(num-toRemove));
        }

        for (let a of nArr) {
            avg += Math.floor(a/10);
        }
        
        avg /= nArr.length;
        
        if (avg === Infinity) {
            avgArr.push("DNF");
            return ("DNF");
        }
        else {
            avgArr.push(avg*10);
            return avg*10;
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
    else if (num === 25) {
        arr = ao25s.slice();
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

    return bAvg;
}

function emptyAvgArrays() {
    mo3s = [];
    ao5s = [];
    ao12s = [];
    ao25s = [];
    ao50s = [];
    ao100s = [];
    ao200s = [];
    ao500s = [];
    ao1000s = [];
    ao2000s = [];
    ao5000s = [];
    ao10000s = [];
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

function toggleWaitingTime(val) {
    if (val === "1") {
        wait055 = true;
    }
    else {
        wait055 = false;
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

async function importFromCSTimer() {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    let file = await fileHandle.getFile();
    let content = await file.text();
    
    if (content) {
        let json = $.parseJSON(content);
        console.log(json);

        if (json) {
            if (confirm("Importing will override current data. Do you still want to import?")) {
                sessionList = [];

                let numOfSessions = json.properties.session || json.properties.sessionN;
                let sessionData = Object.values($.parseJSON(json.properties.sessionData)).splice(0, numOfSessions);
                console.log(sessionData);
                let i = 0;
                $.each(json, function(key, sessions) {
                    if (key.includes("session")) {
                        // Add to current data
                        let num = sessionList.length + 1;
                        let sessionId = formatSessionID(num);console.log(sessionData[i],sessionData[i].name);
                        let sessionName = sessionData[i].name || "Session " + num;
                        let sessionRank = sessionData[i].rank;
                        let sessionScrType = getScrType(Object.values(sessionData[i])[1]);
                        let sessionSolutions = [];
                        curSession = sessionList.length;
                        curScrType = sessionScrType;

                        $.each(sessions, function(k, solve){
                            const newSolution = new Solution(solve[0][1], solve[0][0], solve[1], solve[2], solve[3]);
                            sessionSolutions.push(newSolution);
                        });
                        
                        const nSession = new Session(sessionId, sessionName,sessionRank,sessionScrType, sessionSolutions);
                        sessionList.push(nSession);

                        resetTimer();
                        i++;
                    }
                });

                doNotScramble = true; 
                openDB(removeAllFromDB);
                for (let s of sessionList) {
                    doNotScramble = true;
                    openDB(editDB, s.id, s);
                }
                curSession = 0;
                closeOptions();
            }
        }
    }
}

function getScrType(opt) {
    let st = opt.scrType;
    
    if (Object.keys(opt).length === 0) {
        return "333";
    }
    else if (st.includes("333")) {
        return "333";
    }
    else if (st.includes("222")) {
        return "222";
    }
    else if (st.includes("444")) {
        return "444";
    }
    else if (st.includes("555")) {
        return "555";
    }
    else if (st.includes("666")) {
        return "666";
    }
    else if (st.includes("777")) {
        return "777";
    }
    else if (st.includes("clk")) {
        return "clock";
    }
    else if (st.includes("mg")) {
        return "mega";
    }
    else if (st.includes("pyr")) {
        return "pyra";
    }
    else if (st.includes("skb")) {
        return "skewb";
    }
    else if (st.includes("sq")) {
        return "sq1";
    }
}

function exportToCSTimer() {
    openDB(getAllFromDB, true);
}

function getExportData(data) {
    const date = getYYYYMMDD_HHmmss();

    let json = {};
    json["properties"] = {
        "sessionN" : 0,
        "sessionData": {}
    };
    let sessionN = 0;
    let solves = 0;
    let penalties = 0;
    let mean = 0;
    let sData = {};
    $.each(data, function(index, keys) {
        sessionN++;
        json[keys.id] = [];
        let solves = Object.values(keys)[4];
        for (let s of solves) {
            json[keys.id].push([[s.penalty, s.time], s.scramble, s.comment, s.date]);
            if (s.penalty !== 0) {
                penalties++;
            }
            solves++;
            mean += s;
        }

        let name = keys.name;
        let sType = keys.scrType;
        let rank = keys.rank;
        let stat = [solves,penalties,Math.round(mean/10)*10];
        let fDate = json[keys.id][0][3];
        let lDate = json[keys.id][json[keys.id].length-1][3];
        
        sData[keys.id.split("session_0")[1]] = {
            "name":name,
            "opt":{
                "scrType":sType
            },
            "rank":rank,
            "stat":stat,
            "date":[fDate,lDate]
        };
    });

    json["properties"].sessionN = sessionN;
    json["properties"].sessionData = JSON.stringify(sData);
    
    let blob = new Blob([JSON.stringify(json)],{type:"application/json; utf-8"});
    let a = document.createElement("a");
    a.download = "einarkl_timer_"+date+".txt";
    a.href = window.URL.createObjectURL(blob);
    a.click();
}

function getYYYYMMDD_HHmmss() {
    const d = new Date;
    const year = d.getFullYear();
    const month = d.getMonth().toString().length < 2 ? "0" + d.getMonth() : d.getMonth();
    const day = d.getDay().toString().length < 2 ? "0" + d.getDay() : d.getDay();
    const hours = d.getHours().toString().length < 2 ? "0" + d.getHours() : d.getHours();
    const minutes = d.getMinutes().toString().length < 2 ? "0" + d.getMinutes() : d.getMinutes();
    const seconds = d.getSeconds().toString().length < 2 ? "0" + d.getSeconds() : d.getSeconds();

    return year + month + day + "_" + hours + minutes + seconds;
}

function initActions() {
    connectAndGetDataFromDB();
    keyActions();

    curScrType = $("#scrambleType").children(":selected").attr("id");

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

    if (wait055) {
        $("input:radio[name=wait055]").filter("[value=1]").prop('checked', true);
    }
    else {
        $("input:radio[name=wait055]").filter("[value=0]").prop('checked', true);
    }

    $(".inner").on("mousedown", function (e) {
        e.stopPropagation();
    });
}

function keyActions() {
    $("html").on('keydown', function (e) {
        if (!showingOuterInner) {
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
        if (!showingOuterInner) {
            if (e.keyCode === 32) {
                if (ready && !timing) {
                    startTimer();
                }
                else if (wait055 && !ready && !timing) {
                    waiting = false;
                    clearInterval(waitingInterval);
                    resetTimer();
                }
                else if (timing) {
                    setTimeout(
                        function() {
                            timing = false;
                        }, 100);
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
    $("#innerTimeStats div").height("100%");
    $("#innerTimeStats div").css("overflow-y", "scroll");
    
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