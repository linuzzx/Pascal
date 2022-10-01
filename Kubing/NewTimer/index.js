let timing, waiting, ready = false;
let stopped = true;
let scramble;
let curScrType;
let curSession;

let interval;
let waitingInterval;
let start;

let green = "#00FF00";
let yellow = "#F5E801";
let red = "#FF0000";

const scrTypes = ["333", "222", "444", "555", "666", "777", "clock", "minx", "pyram", "skewb", "sq1"];

let wait055;
let showTime;
let listLatestFirst;
let customPlaceholder;

let svgWidth, svgHeight;

let rawTime = -1;
let curSingle = -1;
let bestSingle = -1;

let sessionList = [];
let solutionsList = [];

let preventGetAll = false;
let doNotScramble = false;
let doNotCreateNew = false;

let settings;

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

let bestAverages = {};

let showingOuterInner = false;

class Solution {
    constructor(time, penalty, scramble, comment, date, totalTime, sessionId) {
        this.time = time;
        this.penalty = penalty;
        this.scramble = scramble;
        this.comment = comment;
        this.date = date;
        this.totalTime = totalTime;
        this.sessionId = sessionId;
    }
}

class Solutions {
    constructor(solutions) {
        this.solutions = solutions;
    }
}

class Session {
    constructor(id, name, rank, scrType, solutionsId) {
        this.id = id;
        this.name = name;
        this.rank = rank;
        this.scrType = scrType;
        this.solutionsId = solutionsId;
    }
}

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
}

function getScramble() {
    if (!doNotScramble) {
        switch (curScrType) {
            case "333":
                scramble = getScrambleNxN(3);
                break;
            case "222":
                scramble = getScrambleNxN(2);
                break;
            case "444":
                scramble = getScrambleNxN(4);
                break;
            case "555":
                scramble = getScrambleNxN(5);
                break;
            case "666":
                scramble = getScrambleNxN(6);
                break;
            case "777":
                scramble = getScrambleNxN(7);
                break;
            case "clock":
                scramble = getScrambleClock();
                break;
            case "minx":
                scramble = getScrambleMega();
                break;
            case "pyram":
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
    $("#cube").empty();
    resetDrawSvg("#cube");

    switch (curScrType) {
        case "333":
            drawScrambleNxN("#cube", 3, scramble);
            break;
        case "222":
            drawScrambleNxN("#cube", 2, scramble);
            break;
        case "444":
            drawScrambleNxN("#cube", 4, scramble);
            break;
        case "555":
            drawScrambleNxN("#cube", 5, scramble);
            break;
        case "666":
            drawScrambleNxN("#cube", 6, scramble);
            break;
        case "777":
            drawScrambleNxN("#cube", 7, scramble);
            break;
        /* case "clock":
            drawScrambleClock("#cube", scramble);
            break;
        case "minx":
            drawScrambleMega("#cube", scramble);
            break;
        case "pyram":
            drawScramblePyra("#cube", scramble);
            break; */
        case "skewb":
            drawScrambleSkewb("#cube", scramble);
            break;
        case "sq1":
            drawScrambleSq1("#cube", scramble);
            break;
        default:
            drawMissingSvg("#cube");
            /* $("#drawScramble").html("<svg class='svgScramble' id='cube' preserveAspectRatio='xMaxYMax meet'></svg><scramble-display event='"+curScrType+"' scramble=\""+
                scramble.replaceAll("<span>","").replaceAll("</span>","").replaceAll("</br>"," ")+
                "\"></scramble-display>"); */
            break;
    }
}

function saveSolution() {
    //Add solution to solutions
    const date = Date.now().toString().split("").slice(0, 10).join("");
    const newSolution = new Solution(rawTime, 0, scramble, "", date, rawTime, sessionList[curSession].id);
    console.log(solutionsList);
    console.log(solutionsList[curSession]);
    solutionsList[curSession].push(newSolution);
    console.log(solutionsList)
    openDB(saveToDB, sessionList[curSession].solutionsId, newSolution);
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
    let arrSes = data.sessions.slice().sort(function(a,b){return a.rank-b.rank});
    let arrSol = data.solutions.slice();
    
    if (arrSes.length !== 0) {
        sessionList = arrSes.slice();
        solutionsList = arrSol.slice();

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
    let sessionId = "session"+num;
    let solutionsId = "solutions"+num;
    let sessionName = "Session "+num;
    let sessionRank = sessionList.length + 1;
    let sessionScrType = scrTypes[0];
    let sessionSolutions = [];

    solutionsList.push([]);

    if (sessionList[curSession] && sessionScrType === sessionList[curSession].scrType) {
        doNotScramble = true;
    }
    
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
    
    const nSession = new Session(sessionId, sessionName, sessionRank, sessionScrType, solutionsId);

    preventGetAll = true;
    openDB(editDB, "sessions", sessionId, nSession, true);
    openDB(createSolDB, solutionsId);
    resetTimer();
}

function renameSession() {
    let sName = prompt("Enter session name:", sessionList[curSession].name);
    if (sName) {
        sessionList[curSession].name = sName;
        doNotScramble = true;
        openDB(editDB, "sessions", sessionList[curSession].id, sessionList[curSession]);
    }
}

function resetSession() {
    if (confirm("Are you sure you want do reset the session?")) {
        solutionsList[curSession] = [];
        doNotScramble = true;
        openDB(editDB, "solutions", sessionList[curSession].solutionsId, solutionsList[curSession]);
    }
}

function deleteSession() {
    if (confirm("Are you sure you want do delete the session?")) {
        let lastSession = curSession === sessionList.length - 1;
        let scr = sessionList[curSession].scrType;

        for (let i = curSession; i < sessionList.length; i++) {
            if (sessionList[i + 1]) {
                sessionList[i].name = sessionList[i + 1].name;
                sessionList[i].scrType = sessionList[i + 1].scrType;
                solutionsList[i] = solutionsList[i + 1];
            }
        }
        let lastSolID = sessionList[sessionList.length - 1].solutionsId;
        let lastID = sessionList.pop().id;
        
        for (let i = curSession; i < sessionList.length; i++) {
            doNotScramble = true;
            openDB(editDB, "sessions", sessionList[i].id, sessionList[i]);
            openDB(editDB, "solutions", sessionList[i].solutionsId, solutionsList[i]);
        }

        openDB(removeFromDB, "sessions", lastID);
        openDB(removeFromDB, "solutions", lastSolID);

        if (lastSession) {
            let id = sessionList[sessionList.length - 1].id;
            //$("#sessionList").val(name).change();
            $("#sessionList option[id="+id+"]").attr("selected","selected");

            curSession = sessionList.length - 1;
        }

        if (scr === sessionList[curSession].scrType) {
            doNotScramble = true;
        }

        checkSessions();
        resetTimer();
    }
}

function checkSessions() {
    // Clear sessionList
    $("#sessionList").empty();
    // List sessions
    for (let s of sessionList) {
        if (s.rank - 1 === curSession) {
            $("#sessionList").append("<option id='"+s.id+"' value='"+(s.rank - 1)+"' data-rank='"+s.rank+"' selected>"+s.name+"</option>");
        }
        else {
            $("#sessionList").append("<option id='"+s.id+"' value='"+(s.rank - 1)+"' data-rank='"+s.rank+"'>"+s.name+"</option>");
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
    let scr = sessionList[curSession].scrType;
    curSession = parseInt($("#sessionList").val());
    changeSettings();
    
    if (scr === sessionList[curSession].scrType) {
        doNotScramble = true;
    }
    
    resetTimer();
    
    checkSessions();
    $("#sessionList").blur();
}

function updateSession() {
    updateScrType();
    /*getStats2(curSession, 3)
    .then(getStats2(curSession, 5))
    .then(getStats2(curSession, 12))
    .then(getStats2(curSession, 25))
    .then(getStats2(curSession, 50))
    .then(getStats2(curSession, 100))
    .then(getStats2(curSession, 200))
    .then(getStats2(curSession, 500))
    .then(getStats2(curSession, 1000))
    .then(getStats2(curSession, 2000))
    .then(getStats2(curSession, 5000))
    .then(getStats2(curSession, 10000));*/
    //getStats();
    updateStats();
}

function changeScrType() {
    curScrType = $("#scrambleType").children(":selected").attr("id");
    $("#scrambleType").blur();

    if (curScrType === "minx") {
        $("#scramble").css("text-align", "left");
    }
    else {
        $("#scramble").css("text-align", "center");
    }

    sessionList[curSession].scrType = curScrType;

    openDB(editDB, "sessions", sessionList[curSession].id, sessionList[curSession]);
}

function updateScrType() {
    console.log(sessionList);
    console.log(curSession);
    curScrType = sessionList[curSession].scrType;
    $("#scrambleType").val(curScrType);

    if (curScrType === "minx") {
        $("#scramble").css("text-align", "left");
    }
    else {
        $("#scramble").css("text-align", "center");
    }

    getScramble();
}

function updateStats() {
    console.log(solutionsList);
    console.log(solutionsList[curSession]);
    let solArr = solutionsList[curSession].map(s => s.time);
    let arr = solArr.slice();
    
    // pbListsolutionsList
    $("#pbList").empty();
    $("#pbList").append("<tr><th>Single</th><td id='curSingle' class='cellToClick'>-</td><td id='bestSingle' class='cellToClick'>-</td></tr>");

    // timeList
    $("#timeList").empty();

    emptyAvgArrays();

    if (arr.length !== 0) {
        // timeList
        for (let s of solutionsList[curSession]) {
            let i = solutionsList[curSession].indexOf(s);
            let i5 = i - 4;
            let i12 = i - 11;
            let c = s.comment !== "" ? "*" : "&nbsp;";
            
            let single = "<td class='cellToClick' onclick='showInfo("+i+", 1)'>"+getHHmmsshh(s.time, s.penalty)+"</td>";
            let ao5 = "<td class='cellToClick' onclick='showInfo("+i+", 5)'>"+getHHmmsshh(getAvg(solutionsList[curSession], i, 5))+"</td>";
            let ao12 = "<td class='cellToClick' onclick='showInfo("+i+", 12)'>"+getHHmmsshh(getAvg(solutionsList[curSession], i, 12))+"</td>";
            $("#timeList").append("<tr><td>"+(i + 1) + c +"</td>"+single+ao5+ao12+"</tr>");
            getAvg(solutionsList[curSession], i, 3);
            getAvg(solutionsList[curSession], i, 25);
            getAvg(solutionsList[curSession], i, 50);
            getAvg(solutionsList[curSession], i, 100);
            /*getAvg(solutionsList[curSession], i, 200);
            getAvg(solutionsList[curSession], i, 500);
            getAvg(solutionsList[curSession], i, 1000);
            getAvg(solutionsList[curSession], i, 2000);
            getAvg(solutionsList[curSession], i, 5000);
            getAvg(solutionsList[curSession], i, 10000);*/
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
        /*if (arr.length >= 200) {
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
        }*/
    }
    adjustSize();
}

function addToPBList(num, arr) {
    //let curAvg = arr[arr.length-1];
    let curAvg = getAvg(solutionsList[curSession], solutionsList[curSession].length - 1, num);
    //let bestAvg = getBestAvg(num);
    let bestAvg = bestAverages[num].bestAvg;

    let avgName = num === 3 ? "Mo3" : "Ao" + num;
    let curAvgID = num === 3 ? "curMo3" : "curAo" + num;
    let bestAvgID = num === 3 ? "bestMo3" : "bestAo" + num;

    $("#pbList").append("<tr><th>"+avgName+"</th><td id='"+curAvgID+"' class='cellToClick'>"+getHHmmsshh(curAvg)+"</td><td id='"+bestAvgID+"' class='cellToClick'>"+getHHmmsshh(bestAvg)+"</td></tr>");

    $("#"+curAvgID).on("click", function() {
        let i = solutionsList[curSession].length-1;
        showInfo(i, num, true);
    });
    
    if (bestAvg === Infinity) {
        bestAvg = "DNF";
    }

    $("#"+bestAvgID).on("click", function() {
        let i = bestAverages[num].lastIndex;
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
    if (i < 0 || i < num - 1) {
        return;
    }
    let info = "Date: " + getDDMMYYYY(solutionsList[curSession][i].date) + "<br/><br/>";
    if (num === 1) {
        let s = solutionsList[curSession][i];
        let c = s.comment !== "" ? " [" + s.comment + "]" : s.comment;
        info += getHHmmsshh(s.time, s.penalty, true) + stripHTML(c) + "&nbsp;&nbsp;&nbsp;" + s.scramble;
    }
    else {
        let avg = getAvg(solutionsList[curSession], i, num);
        if (num === 3) {
            //info += "Mo3: " + getHHmmsshh(mo3s[i]) + "<br/><br/>"
            info += "Mo3: " + getHHmmsshh(avg) + "<br/><br/>"
        }
        else {
            /*let ao;
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
            }*/
            info += "Ao" + num + ": " + getHHmmsshh(avg) + "<br/><br/>";
        }

        let arr = [];
        let sArr = [];
        let iArr = [];
        let nRemove = num === 1 || num === 3 ? 0 : Math.ceil(0.05 * num);

        for (let j = 0; j < num; j++) {
            let s = solutionsList[curSession][i-j];
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
            let s = solutionsList[curSession][i+n-num+1];
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

        let p = solutionsList[curSession][i].penalty;
        $("input:radio[name=penalty]").filter("[value="+p+"]").prop('checked', true);
    }
    showTimeStats();
}

function changePenalty(i) {
    solutionsList[curSession][i].penalty = parseInt($('input[name="penalty"]:checked').val());

    doNotScramble = true;
    openDB(editDB, "solutions", sessionList[curSession].solutionsId, solutionsList[curSession]);
    showInfo(i, 1);
}

function editComment(i) {
    let c = prompt("Comment", solutionsList[curSession][i].comment);
    if (c || c === "") {
        solutionsList[curSession][i].comment = c;
        doNotScramble = true;
        openDB(editDB, "solutions", sessionList[curSession].solutionsId, solutionsList[curSession]);
    }
    showInfo(i, 1);
}

function stripHTML(html){
    return html.replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function deleteSolve(i) {
    if (confirm("Are you sure you want do delete the time?")) {
        solutionsList[curSession].splice(i, 1);

        doNotScramble = true;
        openDB(editDB, "solutions", sessionList[curSession].solutionsId, solutionsList[curSession]);
        closeTimeStats();
    }
}

function getDDMMYYYY(ms) {
    if (ms.toString().length === 10) {
        ms *= 1000;
    }

    const d = new Date(ms);
    const day = d.getDate().toString().length < 2 ? "0" + d.getDate() : d.getDate();
    const month = (d.getMonth() + 1).toString().length < 2 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    const year = d.getFullYear();
    const hours = d.getHours().toString().length < 2 ? "0" + d.getHours() : d.getHours();
    const minutes = d.getMinutes().toString().length < 2 ? "0" + d.getMinutes() : d.getMinutes();
    const seconds = d.getSeconds().toString().length < 2 ? "0" + d.getSeconds() : d.getSeconds();

    return day + "." + month + "." + year + " " + hours + ":" + minutes + "." + seconds;
}

/*function getMo3(s, i) {
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
}*/

function getAvg(s, i, num) {
    let avgArr;
    let toRemove = Math.ceil(0.05 * num);
    
    /*if (num === 3) {
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
    }*/

    if (i >= (num-1)) {
        let avg = 0;
        let arr = s.map(s => s.time + (s.penalty === -1 ? Infinity : s.penalty)).slice(i-(num-1),i+1).sort(function(a, b) {return a-b;});

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
            //avgArr.push("DNF");
            return ("DNF");
        }
        else {
            //avgArr.push(avg*10);
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
    else if (num === 50) {
        arr = ao50s.slice();
    }
    else if (num === 100) {
        arr = ao100s.slice();
    }
    else if (num === 200) {
        arr = ao200s.slice();
    }
    else if (num === 500) {
        arr = ao500s.slice();
    }
    else if (num === 1000) {
        arr = ao1000s.slice();
    }
    else if (num === 2000) {
        arr = ao2000s.slice();
    }
    else if (num === 5000) {
        arr = ao5000s.slice();
    }
    else if (num === 10000) {
        arr = ao10000s.slice();
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
    changeSettings();
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
    changeSettings();
}

function toggleWaitingTime(val) {
    if (val === "1") {
        wait055 = true;
    }
    else {
        wait055 = false;
    }
    changeSettings();
}

function changeCustomPlaceholder(val) {
    if (val.trim() !== "") {
        customPlaceholder = val.trim();
        $("#inpCustomPlaceholder").val(customPlaceholder);
    }
    else {
        $("#inpCustomPlaceholder").val(settings.customPlaceholder);
    }
    changeSettings();
}
let startTime;
async function importFromCSTimer() {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    let file = await fileHandle.getFile();
    let content = await file.text();
    
    if (content) {
        let json = $.parseJSON(content);

        if (json) {
            if (confirm("Importing will override current data. Do you still want to import?")) {
                startTime = Date.now();
                sessionList = [];
                solutionsList = [];
                
                let numOfSessions = json.properties.sessionN || 15 || Object.keys(json).map(k => k).filter(function(k){if (k.includes("session")) {return k};}).length;
                let sessionData = Object.values($.parseJSON(json.properties.sessionData)).splice(0, numOfSessions);
                
                let i = 0;
                $.each(json, function(key, sessions) {
                    if (key.includes("session")) {
                        // Add to current data
                        let num = sessionList.length + 1;
                        let sessionId = "session"+num;
                        let solutionsId = "solutions"+num;
                        let sessionName = sessionData[i].name || "Session " + num;
                        let sessionRank = sessionData[i].rank;
                        let sessionScrType = getScrType(sessionData[i].opt);
                        let sessionSolutions = [];
                        curSession = sessionList.length;
                        curScrType = sessionScrType;

                        $.each(sessions, function(k, solve){
                            const newSolution = new Solution(solve[0][1], solve[0][0], solve[1], solve[2], solve[3], solve[0][1], sessionId);
                            sessionSolutions.push(newSolution);
                        });
                        
                        const nSession = new Session(sessionId, sessionName, sessionRank, sessionScrType, solutionsId);
                        sessionList.push(nSession);
                        solutionsList.push(sessionSolutions);

                        resetTimer();
                        i++;
                    }
                });

                doNotScramble = true; 
                dontGetAll = true; 
                openDB(removeAllFromDB, "sessions");
                openDB(removeAllFromDB, "solutions");
                for (let s of sessionList) {
                    doNotScramble = true;
                    dontGetAll = (sessionList.indexOf(s) !== sessionList.length - 1);
                    openDB(editDB, "sessions", s.id, s, dontGetAll);
                }
                i = 0;
                for (let s of solutionsList) {
                    doNotScramble = true;
                    dontGetAll = (solutionsList.indexOf(s) !== solutionsList.length - 1);
                    openDB(editDB, "solutions", sessionList[i].solutionsId, s, dontGetAll);
                    i++;
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
        return "minx";
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
    else {
        return "333";
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
    let solvesN = 0;
    let penalties = 0;
    let mean = 0;
    let sData = {};
    let sessionsData = data.sessions;
    let solutionsData = data.solutions;
    $.each(solutionsData, function(index, keys) {
        sessionN++;
        json[keys.id] = [];
        let solves = Object.values(keys)[4];
        for (let s of solves) {
            json[keys.id].push([[s.penalty, s.time], s.scramble, s.comment, s.date]);
            if (s.penalty !== 0) {
                penalties++;
            }
            solvesN++;
            mean += s;
        }

        let name = sessionsData[index].name;
        let sType = sessionsData[index].scrType;
        let rank = sessionsData[index].rank;
        let stat = [solvesN,penalties,Math.round(mean/10)*10];
        let fDate = null;
        let lDate = null;

        if (json[keys.id]) {
            if (json[keys.id][0]) {
                fDate = json[keys.id][0][3];
            }
            if (json[keys.id][json[keys.id].length - 1]) {
                lDate = json[keys.id][json[keys.id].length-1][3];
            }
        }
        
        sData[keys.id.split("session")[1]] = {
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
    const month = (d.getMonth() + 1).toString().length < 2 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    const day = d.getDate().toString().length < 2 ? "0" + d.getDate() : d.getDate();
    const hours = d.getHours().toString().length < 2 ? "0" + d.getHours() : d.getHours();
    const minutes = d.getMinutes().toString().length < 2 ? "0" + d.getMinutes() : d.getMinutes();
    const seconds = d.getSeconds().toString().length < 2 ? "0" + d.getSeconds() : d.getSeconds();

    return year + month + day + "_" + hours + minutes + seconds;
}

function changeSettings() {
    settings = {
        "curSession":curSession,
        "wait055":wait055,
        "showTime":showTime,
        "listLatestFirst":listLatestFirst,
        "customPlaceholder":customPlaceholder
    };

    localStorage.setItem("einarkl_timer_settings", JSON.stringify(settings));
}

function getSettings() {
    if (localStorage.getItem("einarkl_timer_settings")) {
        settings = $.parseJSON(localStorage.getItem("einarkl_timer_settings"));
    }
    else {
        settings = {
            "curSession":0,
            "wait055":false,
            "showTime":true,
            "listLatestFirst":true,
            "customPlaceholder":"Timing"
        };
    }

    curSession = settings.curSession;
    wait055 = settings.wait055;
    showTime = settings.showTime;
    listLatestFirst = settings.listLatestFirst;
    customPlaceholder = settings.customPlaceholder;

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
}

function initActions() {
    getSettings();

    connectAndGetDataFromDB();
    keyActions();
    touchActions();

    curScrType = $("#scrambleType").val();

    getScramble();

    $("#timeList").parent().css("overflow-y", "scroll");

    $(".inner").on("mousedown", function (e) {
        e.stopPropagation();
    });

    $("#display").bind("contextmenu", function(e){
        return false;
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
            if (!waiting && !ready && stopped) {
                if (e.altKey && e.keyCode === 90) {
                    deleteSolve(solutionsList[curSession].length - 1);
                }
                else if (e.altKey && e.keyCode === 39) {
                    getScramble();
                }
            }
        }
    })
    .on('keyup', function (e) {
        if (!showingOuterInner) {
            if (timing && e.keyCode !== 27) {
                setTimeout(
                    function() {
                        timing = false;
                    }, 100);
            }
            else if (e.keyCode === 32) {
                if (ready && !timing) {
                    startTimer();
                }
                else if (wait055 && !ready && !timing) {
                    waiting = false;
                    clearInterval(waitingInterval);
                    resetTimer();
                }
            }
        }
    });
}

function touchActions() {
    $("html").on({'touchstart' : function() {
        if (!showingOuterInner && timing) {
            stopTimer();
        }
    }});
    
    $("#display").on({'touchstart' : function(e) {
        if (!showingOuterInner && !ready && !timing) {
            e.stopPropagation();
            waitForTimer();
        }
        else if (!showingOuterInner && timing) {
            stopTimer();
        }
    }})
    .on({'touchend' : function() {
        if (!showingOuterInner) {
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
    }});
}

function adjustSize() {
    //Fix size for phone screen
    /*if ($("#content").width() >= $("#content").height()) {
        $("#left").css("display", "block");
        $("#content").css("grid-template-columns", "1fr 2fr 1fr");
        $("#content").css("grid-template-rows", "");
    }
    else {
        $("#left").css("display", "none");
        $("#content").css("grid-template-rows", "0fr 4fr 1fr");
        $("#content").css("grid-template-columns", "");
    }*/

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