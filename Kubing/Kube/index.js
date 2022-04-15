let cuberId, cuberRef;
let curRoom = null;
let userName;
let leader = null;

const events = ["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx", "Pyraminx", "Skewb", "Square-1"];
const scrTypes = ["333", "222", "444", "555", "666", "777", "clock", "minx", "pyram", "skewb", "sq1"];

$(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //You're logged in
            cuberId = user.uid;
            cuberRef = firebase.database().ref("cubers/" + cuberId);

            cuberRef.set({
                id: cuberId,
                name: userName,
                room: "lobby"
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

    firebase.database().ref("cubers/").on("value", (snapshot) => {
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
                if (Object.keys(snap).includes("scrambles")) {
                    $("#scrambleDisplay").text(snap.scrambles[snap.curScr]);
                    $("#inpTimeDiv").show();
                }
                if (Object.keys(snap).includes("solves")) {
                    let s = snap.solves.slice();
                    if (s[s.length - 1].length !== 0) {
                        for (let cub of s[snap.curScr]) {
                            let ind;
                            let arr = s[snap.curScr].map(sol => sol.cid);
                            if (arr.includes(cub.cid)) {
                                ind = arr.indexOf(cub.cid);
                            }
                            $("#" + snap.curScr + "_" + cub.cid).text(s[snap.curScr].map(sol => sol.time)[ind]);
                        }
                    }
                    if (s[s.length - 1].length === snap.cubers.length) {
                        console.log("Alle har løst!");
                    }
                }
            });
        }
    });

    initHTML();
});

function checkRooms(users) {
    firebase.database().ref("rooms/").once('value', (snapshot) => {
        if (snapshot.val() === null) {
            $("#rooms").html("<tr><th>Currently no rooms...</th></tr>");
        }
        snapshot.forEach(childSnapshot => {
            const c = childSnapshot.val();
            if (users.map(u => u[1]).filter(r => {return r === c.id}).length === 0) {
                firebase.database().ref("rooms/" + c.id).remove();
                leader = null;
            }
            else {
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
            }
        });
    });
}

function createRandomName() {
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
    cuberRef.set({
        id: cuberId,
        name: $("#inpUserName").val()
    });
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

    roomRef.on('value', (snapshot) => {
        let snap = snapshot.val();
        let out = "";
        
        if (snap !== null) {
            if (Object.keys(snap).includes("cubers")) {
                out = "<tr><th>#</th>";
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
                    out += "<th id='avg_" + u[0] + "'></th>";
                }
            }
    
            $("#timeTable").html(out);
    
            if (snap.waiting === true) {
                if (cuberId === leader) {
                    $("#headerLeader").show();
                }
                else {
                    $("#headerOther").show();
                }
            }
            else {
                $("#headerLeader").hide();
                $("#headerOther").hide();
            }
        }
    });

    $("#menu").hide();
    $("#room").show();
}

function backToLobby() {
    cuberRef.update({ room: "lobby" });
    $("#room").hide();
    $("#menu").show();
}

function logOut(uid) {
    if (curRoom !== "lobby") {
        let roomRef = firebase.database().ref("rooms/"+curRoom);
        roomRef.once('value', (snapshot) => {
            let snap = snapshot.val();
            
            let users = snap.cubers.slice();
            users.splice(users.map((u) => {return u[0]}).indexOf(uid));
            
            if (snap.leader === cuberId) {
                roomRef.update({leader: users[0][0],cubers: users});
            }
            else {
                roomRef.set({cubers: users});
            }

            let out = "<tr>";
            for (let u of snap.cubers.slice()) {
                out += "<th>" + u[1] + "</th>";
            }
            out += "</tr>";

            $("#timeTable").html(out);
        });
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
    
    firebase.database().ref("rooms/"+curRoom).update({
        waiting: false,
        scrambles: scr,
        curScr: 0
    });
}

function stopCubing() {
    firebase.database().ref("rooms/"+curRoom).update({waiting: true});
}

function submitTime(time) {
    if (time.toUpperCase() === "DNF" 
    || time.match(/[1-9][0-9]:[0-9][0-9].[0-9][0-9]/g) + "" === time
    || time.match(/[0-9]:[0-9][0-9].[0-9][0-9]/g) + "" === time
    || time.match(/[1-9][0-9].[0-9][0-9]/g) + "" === time
    || time.match(/[0-9].[0-9][0-9]/g) + "" === time
    ) {
        let s = [];
        let curS;
        firebase.database().ref("rooms/" + curRoom).once("value", snapshot => {
            let snap = snapshot.val();
            if (Object.keys(snap).includes("solves")) {
                s = snap.solves.slice();
                curS = snap.curScr;
                
                if (curS > s.length) {
                    s.push({curS:{
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
        $("#scrambleDisplay").text("Waiting for other cubers to submit");
        $("#inpTimeDiv").hide();
    }
    else {
        alert("Type in a valid value!");
    }
    $("#inpTime").val("");
}

function initHTML() {
    for (let e of events) {
        $("#events").append("<option value='" + scrTypes[events.indexOf(e)] + "'>" + e + "</option>");
    }
    userName = createRandomName();
    $("#inpUserName").val(userName);
    $("#btnCreateRoom").prop("disabled", true);
    $("#room").hide();
}