let cuberId, cuberRef;
let curRoom = null;
let cuberName;
let randomName = false;
let leader = null;
let averages = {};

const events = ["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx", "Pyraminx", "Skewb", "Square-1"];
const scrTypes = ["333", "222", "444", "555", "666", "777", "clock", "minx", "pyram", "skewb", "sq1"];

$(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            initApp();
            //You're logged in
            cuberId = user.uid;
            cuberRef = firebase.database().ref("cubers/" + cuberId);

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
    if ($("#inpUserName").val() !== "") {
        cuberRef.update({name: $("#inpUserName").val()});
    }
    else {
        $("#inpUserName").val(createRandomName()).trigger("change");
    }

    if (!randomName) {
        alert("Ikke random")
        localStorage.setItem("cuberName", $("#inpUserName").val());
    }
    else {
        alert("Random")
        localStorage.removeItem("cuberName");
    }
    randomName = false;
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
            cubers: [[cuberId, $("#inpUserName").val()]],
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

    roomRef.once('value', (snapshot) => {
        let snap = snapshot.val();
        $("#roomName").text(snap.name);
        if (create) {
            $("#headerOther").hide();
        }
        else {
            $("#headerLeader").hide();
            let users = snap.cubers.slice();
            users.push([cuberId, $("#inpUserName").val()]);
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

function submitTime(time) {
    if (isValid(time)) {
        if (cuberId === leader) {
            $("#scrambleDisplay").html("Waiting for other cubers to submit <button onclick='skip()'>Skip</button>");
        }
        else {
            $("#scrambleDisplay").html("Waiting for other cubers to submit");
        }
        
        $("#inpTimeDiv").hide();
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
    }
    else {
        alert("Type in a valid value! (Stackmat timer, but with 2 decimals)");
    }
    $("#inpTime").val("");
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
    let arr = time.split("");
    if (time.toUpperCase() === "DNF" 
    || time.match(/[1-9][0-9]:[0-9][0-9]\.[0-9][0-9]/g) + "" === time
    || time.match(/[0-9]:[0-9][0-9]\.[0-9][0-9]/g) + "" === time
    || time.match(/[1-9][0-9]\.[0-9][0-9]/g) + "" === time
    || time.match(/[0-9]\.[0-9][0-9]/g) + "" === time) {
        valid = true;
    }
    /*time.toUpperCase() === "DNF" 
    || time.match(/[1-9][0-9]:[0-9][0-9].[0-9][0-9]/g) + "" === time
    || time.match(/[0-9]:[0-9][0-9].[0-9][0-9]/g) + "" === time
    || time.match(/[1-9][0-9].[0-9][0-9]/g) + "" === time
    || time.match(/[0-9].[0-9][0-9]/g) + "" === time*/
    
    /*if (time.toUpperCase() === "DNF") {
        valid = true;
    }
    else if (time.split("").length === 8) {
        if (9 >= parseInt(arr[0]) >= 1 && 9 >= parseInt(arr[1]) >= 0 && arr[2] === ":" && 9 >= parseInt(arr[3]) >= 0 && 9 >= parseInt(arr[4]) >= 0 && arr[5] === "." && 9 >= parseInt(arr[6]) >= 0 && 9 >= parseInt(arr[7]) >= 0) {
            valid = true;
        }
    }
    else if (time.split("").length === 7) {
        if (9 >= parseInt(arr[0]) >= 1 && 9 >= parseInt(arr[1]) >= 0 && arr[2] === ":" && 9 >= parseInt(arr[3]) >= 0 && 9 >= parseInt(arr[4]) >= 0 && arr[5] === "." && 9 >= parseInt(arr[6]) >= 0 && 9 >= parseInt(arr[7]) >= 0) {
            valid = true;
        }
    }
    else if (time.split("").length === 5) {
        
    }
    else if (time.split("").length === 4) {
        
    }*/

    return valid;
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
                
                if (snap.cubers !== undefined) {
                    let p1 = snap.cubers.length;
                    let players = p1 + " / 10";
                    let button = (p1 >= 10 || snap.waiting === false) ? "<button onclick='joinRoom(" + snap.id + ")' disabled>Join</button>" : "<button onclick='joinRoom(" + snap.id + ")'>Join</button>";
                    $("#rooms").append("<tr><td><h3>" + snap.name + "</h3></td><td><h3>" + players + "</h3></td><td><h3>" + button + "</h3></td></tr>");
                }
                if (snap.id === curRoom) {
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
                                console.log("Har løst før");
                                let s = snap.solves.slice();
                                for (let i = 0; i < 5; i++) {
                                    for (let cub of s[i]) {
                                        $("#" + (i) + "_" + cub.cid).text(cub.time);
                                        $("#" + (i) + "_" + cub.cid).attr("class", "clickableTD");
                                        $("#" + (i) + "_" + cub.cid).attr("onClick", "window.alert(\"" + cub.time + "   " + snap.scrambles[i] + "\")");
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
                                   
                                    let out = "avg: " + avg + "\\n";
                                    let j = 0;
                                    for (let so of times) {
                                        out += "\\n" + (j + 1) + ". " + so + "   " + snap.scrambles[j];
                                        j++;
                                    }
                                    $("#avg_" + c).attr("class", "clickableTD");
                                    $("#avg_" + c).attr("onClick", 'window.alert(\"' + out + '\")');
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
                                    $("#" + (s.length - 1) + "_" + cub.cid).attr("onClick", "window.alert(\"" + solTime + "   " + snap.scrambles[s.length - 1] + "\")");
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
                                            let out = "avg: " + avg + "\\n";
                                            let j = 0;
                                            for (let so of cuberSolves.filter(cs => cs[0] === c).map(cso => cso[1])) {
                                                out += "\\n" + (j + 1) + ". " + so + "   " + snap.scrambles[j];
                                            }
                                            $("#avg_" + c).attr("class", "clickableTD");
                                            $("#avg_" + c).attr("onClick", "window.alert(\"" + out + "\")");
                                        }
                                    }
                                    if (s[snap.curScr].length === snap.cubers.length) {
                                        console.log("Alle er ferdige");
                                        stopCubing();
                                    }
                                }
                                else if (s[snap.curScr] && s[snap.curScr].length === snap.cubers.length && curRoom !== null) {
                                    //$("#scrambleDisplay").html(snap.scrambles[snap.curScr]);
                                    $("#scrambleDisplay").html(snap.scrambles[s.length]);
                                    let newCur = snap.curScr + 1;
                                    firebase.database().ref("rooms/" + curRoom).update({
                                        curScr: newCur
                                    });
                                }
                            }
                        }
                        else {
                            $("#scrambleDisplay").html(snap.scrambles[0]);
                            $("#inpTimeDiv").show();
                            $("#timeTable td").text("");
                            $("#winner").text("");
                        }
                    }
                }
            });
        }
    });

    initHTML();
}

function initHTML() {
    for (let e of events) {
        $("#events").append("<option value='" + scrTypes[events.indexOf(e)] + "'>" + e + "</option>");
    }
    
    if (localStorage.getItem("cuberName")) {
        cuberName = localStorage.getItem("cuberName")
    }
    else {
        cuberName = createRandomName();
    }
    $("#inpUserName").val(cuberName);
    $("#btnCreateRoom").prop("disabled", true);
    $("#room").hide();
}