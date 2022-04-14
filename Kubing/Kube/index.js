let cuberId, cuberRef;
let curRoom = null;
let userName;

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
        snapshot.forEach(childSnapshot => {
            let snap = childSnapshot.val();
            $("#rooms").append("<tr><th><h2>" + snap.name + "</h2></th><th><h2><button onclick='joinRoom(" + snap.id + ")'>Join</button></h2></th></tr>");
        });
    });

    initHTML();
});

function checkRooms(users) {
    firebase.database().ref("rooms/").once('value', (snapshot) => {
        snapshot.forEach(childSnapshot => {
            const c = childSnapshot.val();
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
            }
            else {
                firebase.database().ref("rooms/" + c.id).update({leader: c.cubers[0]});
                if (cuberId === c.cubers[0][0]) {
                    $("#headerOther").hide();
                    $("#headerLeader").show();
                }
            }
        });
    })
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

    return adjectives[Math.floor(Math.random() * adjectives.length)] + " cuber";
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
            cubers: [[cuberId, $("#inpUserName").val()]]
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

        let out = "<tr>";
        for (let u of snap.cubers.slice()) {
            out += "<th>" + u[1] + "</th>";
        }
        out += "</tr>";

        $("#timeTable").html(out);
    });

    roomRef.on('value', (snapshot) => {
        let snap = snapshot.val();
        let out = "No current rooms...";
        
        if (snap !== null && Object.keys(snap).includes("cubers")) {
            out = "<tr>";
            for (let u of snap.cubers.slice()) {
                out += "<th>" + u[1] + "</th>";
            }
            out += "</tr>";
        }

        $("#timeTable").html(out);
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
    console.log(uid+" logged out");
    if (curRoom !== "lobby") {
        let roomRef = firebase.database().ref("rooms/"+curRoom);
        roomRef.once('value', (snapshot) => {
            let snap = snapshot.val();
            
            let users = snap.cubers.slice();
            users.splice(users.map((u) => {return u[0]}).indexOf(uid));
            
            if (snap.leader === cuberId) {
                roomRef.set({
                    id: snap.id,
                    name: snap.name,
                    leader: users[0][0],
                    cubers: users
                });
            }
            else {
                roomRef.set({
                    id: snap.id,
                    name: snap.name,
                    leader: snap.leader,
                    cubers: users
                });
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

function initHTML() {
    for (let e of events) {
        $("#events").append("<option value='" + scrTypes[events.indexOf(e)] + "'>" + e + "</option>");
    }
    userName = createRandomName();
    $("#inpUserName").val(userName);
    $("#btnCreateRoom").prop("disabled", true);
    $("#room").hide();
}