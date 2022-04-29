let cuberId, cuberRef;
let curRoom = null;
let cuberName;
let randomName = false;
let leader = null;
let averages = {};
let timerInterval;
let useTimer = false;
let timing = false;
let stopped = true;
let ready = true;
let waiting = false;
let waitForOthers = true;
let showingOuterInner = false;

const events = ["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx", "Pyraminx", "Skewb", "Square-1"];
const scrTypes = ["333", "222", "444", "555", "666", "777", "clock", "minx", "pyram", "skewb", "sq1"];

$(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //You're logged in
            cuberId = user.uid;
            cuberRef = firebase.database().ref("cubers/" + cuberId);
            
            initApp();

            cuberRef.set({
                id: cuberId,
                name: cuberName,
                room: "Lobby"
            });

            firebase.database().ref("cubers/").once("value", (snapshot) => {
                let roomUsers = Object.values(snapshot.val()).map(u => [u.id, u.room]);
                checkRooms(roomUsers);
            });

            cuberRef.onDisconnect().remove();

        }
        else {
            //You're logged out
        }
    });

    firebase.auth().signInAnonymously().catch((error) => {
        console.log(error.code, error.message);
    });
});

function getCuberAvg(solves) {
    let arr = solves.map(s => getTime(s));
    let sArr = arr.sort(function(a, b) {
        return a - b;
      });

    let avg = sArr.slice(1,4).reduce((a, b) => a + b, 0) / 3;
    return getmmsshh(avg);
}

function getmmsshh(ms) {
    if (ms === Infinity) {
        return "DNF";
    }
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
    return timeStr;
}

function getTime(solve) {
    let ms = 0;
    if (solve === "DNF") {
        return Infinity;
    }
    else if (solve.split("").includes(":")) {
        let m = parseInt(solve.split(":")[0]) * 60000;
        let s = parseInt(solve.split(":")[1].split(".")[0]) * 1000;
        let cs = parseInt(solve.split(":")[1].split(".")[1]) * 10;
        ms = m + s + cs;
    }
    else {
        let s = parseInt(solve.split(".")[0]) * 1000;
        let cs = parseInt(solve.split(".")[1]) * 10;
        ms = s + cs;
    }
    return ms;
}

function checkRooms(users) {
    firebase.database().ref("rooms/").once('value', (snapshot) => {
        let ind = 0;
        if (snapshot.val() === null) {
            $("#rooms").html("<tr><th>Currently no rooms...</th></tr>");
        }
        snapshot.forEach(childSnapshot => {
            const c = childSnapshot.val();
            waiting = c.waiting;
            if (users.map(u => u[1]).filter(r => {return r === c.id}).length === 0) {
                firebase.database().ref("rooms/" + c.id).remove();
                $("#winner").text("");
                leader = null;
            }
            if (Object.keys(c).slice().includes("cubers")) {
                for (let u of users) {
                    let arr = c.cubers.map(cu => cu[0]);
                    if (arr.includes(u[0])) {
                        let ind = arr.indexOf(u[0]);
                        if (u[1] !== c.id) {
                            c.cubers.splice(ind, 1);
                            firebase.database().ref("rooms/" + c.id).update({cubers: c.cubers});
                        }
                    }
                }
                if (c.cubers.length === 0) {
                    firebase.database().ref("rooms/" + c.id).remove();
                    leader = null;
                }
                else {
                    firebase.database().ref("rooms/" + c.id).update({leader: c.cubers[0]});
                    leader = c.cubers[0][0];
                    if (cuberId === c.cubers[0][0] && c.waiting === true) {
                        $("#headerOther").hide();
                        $("#headerLeader").show();
                    }
                }
            }
            else {
                firebase.database().ref("rooms/" + ind).remove();
                $("#winner").text("");
            }
            if (!Object.keys(c).includes("name")) {
                firebase.database().ref("rooms/" + ind).remove();
                $("#winner").text("");
            }
            ind++;
        });
    });
}

function createRandomName() {
    randomName = true;
    const adjectives = [
        "Adorable",
        "Adventurous",
        "Aggressive",
        "Agreeable",
        "Alert",
        "Alive",
        "Amused",
        "Angry",
        "Annoyed",
        "Annoying",
        "Anxious",
        "Arrogant",
        "Ashamed",
        "Attractive",
        "Average",
        "Awful",
        "Bad",
        "Beautiful",
        "Better",
        "Bewildered",
        "Black",
        "Bloody",
        "Blue",
        "Blue-Eyed",
        "Blushing",
        "Bored",
        "Brainy",
        "Brave",
        "Breakable",
        "Bright",
        "Busy",
        "Calm",
        "Careful",
        "Cautious",
        "Charming",
        "Cheerful",
        "Clean",
        "Clear",
        "Clever",
        "Cloudy",
        "Clumsy",
        "Colorful",
        "Combative",
        "Comfortable",
        "Concerned",
        "Condemned",
        "Confused",
        "Cooperative",
        "Courageous",
        "Crazy",
        "Creepy",
        "Crowded",
        "Cruel",
        "Curious",
        "Cute",
        "Dangerous",
        "Dark",
        "Dead",
        "Defeated",
        "Defiant",
        "Delightful",
        "Depressed",
        "Determined",
        "Different",
        "Difficult",
        "Disgusted",
        "Distinct",
        "Disturbed",
        "Dizzy",
        "Doubtful",
        "Drab",
        "Dull",
        "Eager",
        "Easy",
        "Elated",
        "Elegant",
        "Embarrassed",
        "Enchanting",
        "Encouraging",
        "Energetic",
        "Enthusiastic",
        "Envious",
        "Evil",
        "Excited",
        "Expensive",
        "Exuberant",
        "Fair",
        "Faithful",
        "Famous",
        "Fancy",
        "Fantastic",
        "Fierce",
        "Filthy",
        "Fine",
        "Foolish",
        "Fragile",
        "Frail",
        "Frantic",
        "Friendly",
        "Frightened",
        "Funny",
        "Gentle",
        "Gifted",
        "Glamorous",
        "Gleaming",
        "Glorious",
        "Good",
        "Gorgeous",
        "Graceful",
        "Grieving",
        "Grotesque",
        "Grumpy",
        "Handsome",
        "Happy",
        "Healthy",
        "Helpful",
        "Helpless",
        "Hilarious",
        "Homeless",
        "Homely",
        "Horrible",
        "Hungry",
        "Hurt",
        "Ill",
        "Important",
        "Impossible",
        "Inexpensive",
        "Innocent",
        "Inquisitive",
        "Itchy",
        "Jealous",
        "Jittery",
        "Jolly",
        "Joyous",
        "Kind",
        "Lazy",
        "Light",
        "Lively",
        "Lonely",
        "Long",
        "Lovely",
        "Lucky",
        "Magnificent",
        "Misty",
        "Modern",
        "Motionless",
        "Muddy",
        "Mushy",
        "Mysterious",
        "Nasty",
        "Naughty",
        "Nervous",
        "Nice",
        "Nutty",
        "Obedient",
        "Obnoxious",
        "Odd",
        "Old-Fashioned",
        "Open",
        "Outrageous",
        "Outstanding",
        "Panicky",
        "Perfect",
        "Plain",
        "Pleasant",
        "Poised",
        "Poor",
        "Powerful",
        "Precious",
        "Prickly",
        "Proud",
        "Putrid",
        "Puzzled",
        "Quaint",
        "Real",
        "Relieved",
        "Repulsive",
        "Rich",
        "Scary",
        "Selfish",
        "Shiny",
        "Shy",
        "Silly",
        "Sleepy",
        "Smiling",
        "Smoggy",
        "Sore",
        "Sparkling",
        "Splendid",
        "Spotless",
        "Stormy",
        "Strange",
        "Stupid",
        "Successful",
        "Super",
        "Talented",
        "Tame",
        "Tasty",
        "Tender",
        "Tense",
        "Terrible",
        "Thankful",
        "Thoughtful",
        "Thoughtless",
        "Tired",
        "Tough",
        "Troubled",
        "Ugliest",
        "Ugly",
        "Uninterested",
        "Unsightly",
        "Unusual",
        "Upset",
        "Uptight",
        "Vast",
        "Victorious",
        "Vivacious",
        "Wandering",
        "Weary",
        "Wicked",
        "Wide-Eyed",
        "Wild",
        "Witty",
        "Worried",
        "Worrisome",
        "Wrong",
        "Zany",
        "Zealous"
    ]

    let userNames = [];

    // Remove taken names
    firebase.database().ref("cubers/").once("value", (snapshot) => {
        userNames = Object.values(snapshot.val()).map(u => u.name.split(" ")[0]).slice();
    });

    let arr = adjectives.slice().filter(a => !userNames.includes(a));

    return arr[Math.floor(Math.random() * arr.length)] + " cuber";
}

function changeUserName() {
    let userName = $("#inpUserName").val();
    if (userName !== "") {
        if (!randomName) {
            localStorage.setItem("cuberName", userName);
        }
        else {
            localStorage.removeItem("cuberName");
            randomName = false;
        }
    }
    else {
        $("#inpUserName").val(createRandomName());
    }
    cuberName = userName;
    cuberRef.update({name: userName});
}

function changeRoomName(inp) {
    if (inp !== "") {
        $("#btnCreateRoom").prop("disabled", false);
    }
    else {
        $("#btnCreateRoom").prop("disabled", true);
    }
}

function createRoom() {
    let i = 0;
    firebase.database().ref("rooms/").once('value', (snapshot) => {
        snapshot.forEach(childSnapshot => {
            const c = childSnapshot.val();
            i++;
        });
    })
    .then(() => {
        roomId = i;
        roomRef = firebase.database().ref("rooms/" + roomId);
    
        roomRef.set({
            id: roomId,
            name: $("#inpRoomName").val(),
            leader: cuberId,
            cubers: [{
                0: cuberId,
                1: $("#inpUserName").val(),
                timing: false
            }],
            waiting: true
        });

        joinRoom(roomId, true);
    
        roomRef.onDisconnect().remove();

        $("#inpRoomName").val("");
        $("#btnCreateRoom").prop("disabled", true);
    });
}

function joinRoom(rid, create = false) {
    curRoom = rid;
    let roomRef = firebase.database().ref("rooms/"+rid);
    $("#chat").html("");

    roomRef.once('value', (snapshot) => {
        let snap = snapshot.val();
        $("#roomName").text(snap.name);
        if (create) {
            $("#headerOther").hide();
        }
        else {
            $("#headerLeader").hide();
            let users = snap.cubers.slice();
            users.push({
                0: cuberId,
                1: $("#inpUserName").val(),
                timing: false
            });
            roomRef.update({ cubers: users });
        }
        cuberRef.update({ room: rid });
    });

    $("#menu").hide();
    $("#room").show();
}

function backToLobby() {
    cuberRef.update({ room: "Lobby" });
    $("#room").hide();
    $("#menu").show();
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

function get5scrambles(event) {
    let scrambles = [];

    for (let i = 0; i < 5; i++) {
        let scramble = "";
        switch (event) {
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
        scrambles.push(scramble);
    }
    return scrambles;
}

function startCubing() {
    let scr = get5scrambles($("#events option:selected").val());
    $("#headerLeader").hide();
    $("#headerOther").hide();

    resetTimer();

    firebase.database().ref("rooms/"+curRoom).update({
        waiting: false,
        scrambles: scr,
        solves: {},
        curScr: 0,
        finished: false
    });
}

function stopCubing() {
    if (curRoom !== null) {
        $("#scrambleDisplay").html("");
        $("#winner").text(getWinner());
        firebase.database().ref("rooms/"+curRoom).update({waiting: true, finished: true});
        if (leader === cuberId) {
            $("#headerLeader").show()
        }
        else {
            $("#headerOther").show();
        }
    }
}

function getWinner() {
    let cubers = {};
    firebase.database().ref("cubers/").once("value", snapshot => {
        cubers = snapshot.val();
    });
    let bestAvg = Object.values(averages).sort((a, b) => {
        return a - b;
    })[0];
    
    let winners = [];
    for (let i = 0; i < Object.keys(averages).length; i++) {
        if (Object.values(averages)[i] === bestAvg) {
            winners.push(cubers[Object.keys(averages)[i]].name);
        }
    }
    
    winners.sort();

    if (winners.length === 1) {
        return winners[0] + " wins!";
    }
    else {
        return "It's a tie between " + winners.join(", ").replace(", "+winners[winners.length - 1]," & "+winners[winners.length - 1]);
    }
}

function submitTime(time, penalty = null) {
    if (isValid(time)) {
        ready = true;
        if (cuberId === leader) {
            $("#scrambleDisplay").html("Waiting for other cubers to submit <button onclick='skip()'>Skip</button>");
        }
        else {
            $("#scrambleDisplay").html("Waiting for other cubers to submit");
        }
        waitForOthers = true;
        
        $("#inpTimeDiv").hide();

        if (penalty) {
            time = addPenalty(time, penalty);
        }

        let s = [];
        let curS;
        firebase.database().ref("rooms/" + curRoom).once("value", snapshot => {
            let snap = snapshot.val();
            if (Object.keys(snap).includes("solves")) {
                s = snap.solves.slice();
                curS = snap.curScr;
                
                if (curS > s.length - 1) {
                    s.push({0:{
                        cid: cuberId, 
                        time: time.toUpperCase()
                    }});
                }
                else {
                    s[curS].push({
                        cid: cuberId, 
                        time: time.toUpperCase()
                    });
                }
            }
            else {
                s.push({0:{
                    cid: cuberId, 
                    time: time.toUpperCase()
                }});
            }
        });
        firebase.database().ref("rooms/" + curRoom).update({
            solves: s
        });

        let cId;
        firebase.database().ref("rooms/" + curRoom + "/cubers").once("value", snapshot => {
            let snap = snapshot.val();
            cId = snap.map(c => c[0]).indexOf(cuberId);
        });
        firebase.database().ref("rooms/" + curRoom + "/cubers/" + cId).update({
            timing: false
        });
    }
    else {
        alert("Type in a valid value! (Stackmat timer, but with 2 decimals)");
    }
    $("#inpTime").val("");
}

function addPenalty(time, penalty) {
    if (penalty === "DNF") {
        time = "DNF";
    }
    else if (penalty === 2) {
        time = getmmsshh(getTime(time) + 2000);
    }

    return time;
}

function skip() {
    let s = [];
    let curS;
    firebase.database().ref("rooms/" + curRoom).once("value", snapshot => {
        let snap = snapshot.val();
        if (Object.keys(snap).includes("solves")) {
            s = snap.solves.slice();
            curS = snap.curScr;
            
            let notSolved = snap.cubers.slice().map(c => c[0]).filter(n => !s[curS].map(c => c.cid).includes(n));
            
            for (let n of notSolved) {
                s[curS].push({
                    cid: n,
                    time: "DNF"
                });
            }
        }
    });
    firebase.database().ref("rooms/" + curRoom).update({
        solves: s
    });
}

function isValid(time) {
    let valid = false;
    if (time.toUpperCase() === "DNF" 
    || time.match(/[1-9][0-9]:[0-9][0-9]\.[0-9][0-9]/g) + "" === time
    || time.match(/[0-9]:[0-9][0-9]\.[0-9][0-9]/g) + "" === time
    || time.match(/[1-9][0-9]\.[0-9][0-9]/g) + "" === time
    || time.match(/[0-9]\.[0-9][0-9]/g) + "" === time) {
        valid = true;
    }

    return valid;
}

function toggleTimerType(val, el = null) {
    localStorage.setItem("timerType", val);
    $(el).blur();
    switch (val) {
        case "type":
            $("#typeDiv").show();
            $("#timerDiv").hide();
            $("#inpTime").focus();
            useTimer = false;
            break;
        case "timer":
            $("#typeDiv").hide();
            $("#timerDiv").show();
            $("#timerDiv").focus();
            useTimer = true;
            break;
    }
}

function togglePositioning(val, el = null) {
    let timerType = localStorage.getItem("timerType");
    localStorage.setItem("positioning", val);
    $(el).blur();
    switch (val) {
        case "left":
            $(".centered").css("text-align", "left");
            $(".centered").css("margin", "0");
            toggleTimerType(timerType);
            break;
        case "center":
            $(".centered").css("text-align", "center");
            $(".centered").css("margin", "auto");
            toggleTimerType(timerType);
            break;
    }
}

function readyTimer() {
    $("#timerDisplay").css("color", "#00FF00");
}

function startTimer() {
    let cId;
    firebase.database().ref("rooms/" + curRoom + "/cubers").once("value", snapshot => {
        let snap = snapshot.val();
        cId = snap.map(c => c[0]).indexOf(cuberId);
    });
    firebase.database().ref("rooms/" + curRoom + "/cubers/" + cId).update({
        timing: true
    });

    timing = true;
    stopped = false;
    ready = false;
    $("#timerDisplay").css("color", "white");
    $("#scrambleDisplay").hide();

    let startTime = new Date().getTime();
    timerInterval = setInterval(function() {
        let rawTime = new Date().getTime() - startTime;
        $("#timerDisplay").text(getmmsshh(rawTime));
    }, 10);
}

function stopTimer() {
    stopped = true;
    timing = false;
    clearInterval(timerInterval);
    $("#timerButtons").show();
    $("#timerHelpText").text("Press Enter for OK");
}

function resetTimer() {
    $("#timerDisplay").text("0.00");
    $("#timerButtons").hide();
    $("#scrambleDisplay").show();
    $("#timerHelpText").text("No inspection. Start/Stop with space.");

    let cId;
    firebase.database().ref("rooms/" + curRoom + "/cubers").once("value", snapshot => {
        let snap = snapshot.val();
        cId = snap.map(c => c[0]).indexOf(cuberId);
    });
    firebase.database().ref("rooms/" + curRoom + "/cubers/" + cId).update({
        timing: false
    });
}

function timeAgain() {
    resetTimer();
    $("#btnReset").blur();
    $("#timerButtons").hide();
    timing = false;
    stopped = true;
    ready = true;
}

function changeChat(inp) {
    if (inp !== "") {
        $("#btnSendChat").prop("disabled", false);
    }
    else {
        $("#btnSendChat").prop("disabled", true);
    }
}

function sendChat(chat) {
    if (chat.split("").length <= 40 && chat !== "") {
        $("#inpChat").val("");
        $("#btnSendChat").prop("disabled", true);

        let chats = [];

        let chatMessage = {
            uid: cuberId,
            message: stripHTML(chat),
            date: Date.now()
        };

        firebase.database().ref("rooms/" + curRoom).once("value", (snapshot) => {
            let snap = snapshot.val();
            if (Object.keys(snap).includes("chat")) {
                chats = snap.chat.slice();
            }
        });
        
        chats.push(chatMessage);

        firebase.database().ref("rooms/" + curRoom).update({
            chat: chats
        });
    }
    else {
        alert("Hey hacker! You're not allowed to send messages longer than 40 characters...");
    }
}

function initApp() {
    $("#loadingScreen").hide();

    firebase.database().ref("cubers/").on("value", (snapshot) => {
        let ind = 0;
        if (Object.values(snapshot.val())) {
            $("#cubers tr").remove();
            $("#cubers").append("<tr><th>Cubers online</th><th>Room</th></tr>");
            for (let u of Object.values(snapshot.val()).sort((a, b) => a.name.localeCompare(b.name))) {
                if (!Object.keys(u).includes("id") || !Object.keys(u).includes("name")) {
                    firebase.database().ref("cubers/" + Object.keys(snapshot.val())[ind]).remove();
                }
                else {
                    firebase.database().ref("rooms/").once('value', (snapshot) => {
                        let snap = snapshot.val();
                        let room = u.room === "Lobby" ? u.room : snap[u.room].name;

                        if (u.id === cuberId) {
                            $("#cubers").append("<tr><td class='cuber'>" + u.name + "</td><td>" + room + "</td></tr>");
                        }
                        else {
                            $("#cubers").append("<tr><td>" + u.name + "</td><td>" + room + "</td></tr>");
                        }
                    });
                }
                ind++;
            }
        }
        let roomUsers = Object.values(snapshot.val()).map(u => [u.id, u.room]);
        checkRooms(roomUsers);
    });
    
    firebase.database().ref("rooms/").on("value", (snapshot) => {
        $("#rooms tr").remove();
        if (snapshot.val() === null) {
            $("#rooms").append("<tr><th>Currently no rooms...</th></tr>");
        }
        else {
            $("#rooms").append("<tr><td><h3>Room name</h3></td><td><h3>Number of cubers</h3></td><td><h3></h3></td></tr>");
            snapshot.forEach(childSnapshot => {
                let snap = childSnapshot.val();
                waiting = snap.waiting;
                
                if (snap.cubers !== undefined) {
                    let p1 = snap.cubers.length;
                    let players = p1 + " / 10";
                    let button = (p1 >= 10 || snap.waiting === false) ? "<button onclick='joinRoom(" + snap.id + ")' disabled>Join</button>" : "<button onclick='joinRoom(" + snap.id + ")'>Join</button>";
                    $("#rooms").append("<tr><td><h3>" + snap.name + "</h3></td><td><h3>" + players + "</h3></td><td><h3>" + button + "</h3></td></tr>");
                }
                if (snap.id === curRoom && snap.id !== "Lobby") {
                    if (snap.waiting) {
                        if (Object.keys(snap).includes("cubers")) {
                            let out = "<tr><th>#</th>";
                            for (let u of snap.cubers.slice()) {
                                if (u[0] === cuberId) {
                                    out += "<th class='cuber'>" + u[1] + "</th>";
                                }
                                else {
                                    out += "<th>" + u[1] + "</th>";
                                }
                            }
                            out += "</tr>";
                            for (let i = 0; i < 5; i++) {
                                out += "<tr><th>" + (i + 1) + "</th>";
                                for (let u of snap.cubers.slice()) {
                                    out += "<td id='" + i + "_" + u[0] + "'></td>";
                                }
                                out += "</tr>";
                            }
                            out += "<tr><th>Avg</th>";
                            for (let u of snap.cubers.slice()) {
                                out += "<td id='avg_" + u[0] + "'></td>";
                            }
                        
                            $("#timeTable").html(out);

                            if (snap.solves) {
                                let s = snap.solves.slice();
                                for (let i = 0; i < 5; i++) {
                                    for (let cub of s[i]) {
                                        $("#" + (i) + "_" + cub.cid).text(cub.time);
                                        $("#" + (i) + "_" + cub.cid).attr("class", "clickableTD");
                                        $("#" + (i) + "_" + cub.cid).attr("onClick", "showTimeStats(\"" + cub.time + "&nbsp;&nbsp;&nbsp;" + snap.scrambles[i] + "\")");
                                    }
                                }
                                for (let cub of s[4]) {
                                    let cuberSolves = [];
                                    for (let sol of s) {
                                        for (let cuSol of sol) {
                                            cuberSolves.push([cuSol.cid, cuSol.time]);
                                        }
                                    }
                                    let c = cub.cid;
                                    let times = cuberSolves.filter(so => so[0] === c).map(so => so[1]);
                                    let avg = getCuberAvg(times);
                                    
                                    $("#avg_" + c).text(avg);
                                   
                                    let out = "avg: " + avg + "<br>";
                                    let j = 0;
                                    for (let so of times) {
                                        out += "<br><br>" + (j + 1) + ". " + so + "&nbsp;&nbsp;&nbsp;" + snap.scrambles[j];
                                        j++;
                                    }
                                    $("#avg_" + c).attr("class", "clickableTD");
                                    $("#avg_" + c).attr("onClick", 'showTimeStats(\"' + out + '\")');
                                }
                            }
                        }

                        if (cuberId === snap.leader[0]) {
                            $("#headerLeader").show();
                            $("#headerOther").hide();
                        }
                        else {
                            $("#headerOther").show();
                            $("#headerLeader").hide();
                        }
                        $("#inpTimeDiv").hide();
                        $("#scrambleDisplay").html("");
                    }
                    else {
                        $("#headerLeader").hide();
                        $("#headerOther").hide();
                    }
                    
                    if (Object.keys(snap).includes("scrambles") && !snap.waiting) {
                        if (Object.keys(snap).includes("solves")) {
                            let s = snap.solves.slice();

                            if (s.length - 1 < snap.curScr || !s[snap.curScr].map(sol => sol.cid).includes(cuberId)) {
                                $("#inpTimeDiv").show();
                                $("#inpTime").focus();
                            }
                            if (s[s.length - 1].length !== 0) {
                                for (let cub of s[s.length - 1]) {
                                    let ind;
                                    let arr = s[s.length - 1].map(sol => sol.cid);
                                    if (arr.includes(cub.cid)) {
                                        ind = arr.indexOf(cub.cid);
                                    }
                                    let solTime = s[s.length - 1].map(sol => sol.time)[ind];
                                    $("#" + (s.length - 1) + "_" + cub.cid).text(solTime);
                                    $("#" + (s.length - 1) + "_" + cub.cid).attr("class", "clickableTD");
                                    $("#" + (s.length - 1) + "_" + cub.cid).attr("onClick", "showTimeStats(\"" + solTime + "&nbsp;&nbsp;&nbsp;" + snap.scrambles[s.length - 1] + "\")");
                                }
                                if (s.length === 5) {
                                    let cuberSolves = [];
                                    for (let sol of s) {
                                        for (let cub of sol) {
                                            cuberSolves.push([cub.cid, cub.time]);
                                        }
                                    }
                                    for (let c of snap.cubers.map(cs => cs[0])) {
                                        let i = 0;
                                        for (let cc of cuberSolves) {
                                            if (cc[0] === c) {
                                                i++;
                                            }
                                        }
                                        if (i === 5) {
                                            let avg = getCuberAvg(cuberSolves.filter(cs => cs[0] === c).map(cso => cso[1]));
                                            averages[c] = getTime(avg);
                                            $("#avg_" + c).text(avg);
                                            let out = "avg: " + avg + "<br>";
                                            let j = 0;
                                            for (let so of cuberSolves.filter(cs => cs[0] === c).map(cso => cso[1])) {
                                                out += "<br><br>" + (j + 1) + ". " + so + "&nbsp;&nbsp;&nbsp;" + snap.scrambles[j];
                                                j++;
                                            }
                                            $("#avg_" + c).attr("class", "clickableTD");
                                            $("#avg_" + c).attr("onClick", "showTimeStats(\"" + out + "\")");
                                        }
                                    }
                                    if (s[snap.curScr].length === snap.cubers.length) {
                                        stopCubing();
                                    }
                                }
                                else if (s[snap.curScr] && s[snap.curScr].length === snap.cubers.length && curRoom !== null) {
                                    $("#scrambleDisplay").html(snap.scrambles[s.length]);
                                    waitForOthers = false;
                                    let newCur = snap.curScr + 1;
                                    firebase.database().ref("rooms/" + curRoom).update({
                                        curScr: newCur
                                    });
                                }
                            }
                        }
                        else {
                            $("#scrambleDisplay").html(snap.scrambles[0]);
                            waitForOthers = false;
                            $("#timeTable td").text("");
                            $("#winner").text("");
                            $("#inpTimeDiv").show();
                            $("#inpTime").focus();
                        }
                        for (let cu of snap.cubers) {
                            if (cu["timing"]) {
                                $("#" + snap.curScr + "_" + cu[0]).text("Timing");
                            }
                            else {
                                $("#" + snap.curScr + "_" + cu[0]).text("");
                            }
                        }
                    }

                    if (Object.keys(snap).includes("chat")) {
                        let chats = snap.chat.slice();
                        chats.sort((a, b) => {
                            return a.date - b.date;
                        });
                        
                        let out = [];

                        for (let c of chats) {
                            if (c.uid === cuberId) {
                                out.push("<div class='chatLine'><b class='cuber'>" + getCuberName(c.uid) + "</b>: " + c.message + "</div>");
                            }
                            else {
                                out.push("<div class='chatLine'><b>" + getCuberName(c.uid) + "</b>: " + c.message + "</div>");
                            }
                        }

                        $("#chat").html(out.join(""));
                        let d = $('#chat').parent();
                        d.scrollTop(d.prop("scrollHeight"));
                    }
                }
            });
        }
    });

    initHTML();
}

function getCuberName(cid) {
    let cuber = "Unknown";
    firebase.database().ref("cubers/").once("value", cSnapshot => {
        let cSnap = Object.values(cSnapshot.val());
        let ind = cSnap.slice().map(c => c.id).indexOf(cid);
        cuber = Object.values(cSnap)[ind].name;
    });
    return cuber;
}

function showTimeStats(info) {
    showingOuterInner = true;
    $("#innerTimeStats div").html(info);
    $("#outerTimeStats").css("display", "block");
}

function closeTimeStats() {
    showingOuterInner = false;
    $("#innerTimeStats div").html("");
    $("#outerTimeStats").css("display", "none");
}

function stripHTML(html){
    return html.replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function initHTML() {
    for (let e of events) {
        $("#events").append("<option value='" + scrTypes[events.indexOf(e)] + "'>" + e + "</option>");
    }

    getLocalStorage();
    
    $("#inpUserName").val(cuberName);
    $("#btnCreateRoom").prop("disabled", true);
    $("#room").hide();

    $("#inpTimeDiv").keypress(function(e) {
        if (e.keyCode === 13) {
            submitTime($('#inpTime').val());
        }
    });
    
    $("#btnSendChat").prop("disabled", true);

    $("#inpChat").keypress(function(e) {
        if (e.keyCode === 13 && $('#inpChat').val() !== "") {
            sendChat($('#inpChat').val());
        }
    });

    $(window).on('keyup', e => {
        if (!showingOuterInner) {
            if (document.activeElement.id !== "inpChat") {
                if (e.keyCode === 32 && useTimer && !timing && stopped && ready && !waiting && !waitForOthers) {
                    startTimer();
                }
                /*else if (e.keyCode === 32 && useTimer && !timing && stopped && !ready) {
                    setTimeout(() => {
                        timing = false;
                    },500);
                }*/
            }
        }
    })
    .on("keydown", e => {
        if (!showingOuterInner) {
            if (document.activeElement.id !== "inpChat") {
                if (e.keyCode !== 27 && useTimer && timing) {
                    stopTimer();
                }
                else if (e.keyCode === 32 && useTimer && !timing && stopped && ready && !waiting && !waitForOthers) {
                    readyTimer();
                }
                else if (e.keyCode === 13 && useTimer && !timing && stopped && !ready && $('#timerDisplay').text() !== "0.00") {
                    submitTime($('#timerDisplay').text());
                    $('#timerButtons').hide();
                    timeAgain();
                }
            }
        }
    });

    adjustSize();

    $(".inner").on("mousedown", function (e) {
        e.stopPropagation();
    });
}

function getLocalStorage() {
    if (localStorage.getItem("cuberName")) {
        cuberName = localStorage.getItem("cuberName");
    }
    else {
        cuberName = createRandomName();
        randomName = false;
    }
    
    if (localStorage.getItem("positioning")) {
        let val = localStorage.getItem("positioning");
        togglePositioning(val);

        $("input:radio[name=contentPos]").val([val]);
    }
    
    if (localStorage.getItem("timerType")) {
        let val = localStorage.getItem("timerType");
        toggleTimerType(val);

        $("input:radio[name=timerType]").val([val]);
    }
}

function adjustSize() {
    $("#inpChat").width($("#outerChat").width() * 0.8);
    $("#btnSendChat").outerWidth($("#outerChat").width() * 0.2);
}