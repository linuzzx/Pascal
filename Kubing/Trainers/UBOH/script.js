const ubohStates = ["0", "+", "-", "R", "U"];
const ubohMoves = ["Rw", "R", "U", "Uw", "Rw2", "R2", "U2", "Uw2", "Rw'", "R'", "U'", "Uw'"];
let curState;
let started;
let moves;
let first;
let guess;
let keybindings = {
    "m" : "1",
    "0" : "2",
    "p" : "3",
    "U" : "4",
    "R" : "5",
};

const label_update = {
    "0": 
    {
        "F": "-",
        "F2": "2g",
        "F'": "+",
        "R": "+",
        "R2": "R",
        "R'": "-",
        "U": "+",
        "U2": "U",
        "U'": "-"
    },
    "+": 
    {
        "F": "0",
        "F2": "R",
        "F'": "-",
        "R": "R",
        "R2": "-",
        "R'": "0",
        "U": "U",
        "U2": "-",
        "U'": "0"
    },
    "-": 
    {
        "F": "+",
        "F2": "U",
        "F'": "0",
        "R": "0",
        "R2": "+",
        "R'": "R",
        "U": "0",
        "U2": "+",
        "U'": "U"
    },
    "R": 
    {
        "F": "U",
        "F2": "+",
        "F'": "2g",
        "R": "-",
        "R2": "0",
        "R'": "+",
        "U": "R",
        "U2": "R",
        "U'": "R"
    },
    "U": 
    {
        "F": "2g",
        "F2": "-",
        "F'": "R",
        "R": "U",
        "R2": "U",
        "R'": "U",
        "U": "-",
        "U2": "0",
        "U'": "+"
    },
    "2g": 
    {
        "F": "R",
        "F2": "0",
        "F'": "U",
        "R": "2g",
        "R2": "2g",
        "R'": "2g",
        "U": "2g",
        "U2": "2g",
        "U'": "2g"
    }
}

$(() => {
    initActions();
    first = true;
    guess = false;
});

function initActions() {
    if (localStorage.getItem("ubohKeys")) {
        keybindings = JSON.parse(localStorage.getItem("ubohKeys"));
        $("#kbm").val(keybindings["m"]);
        $("#kb0").val(keybindings["0"]);
        $("#kbp").val(keybindings["p"]);
        $("#kbU").val(keybindings["U"]);
        $("#kbR").val(keybindings["R"]);

        updateBindings();
    }

    curState = ubohStates[Math.floor(Math.random() * ubohStates.length)];
    $("#ubohState").text(curState);

    /* $(window).on("keyup", e => {
        if (e.which === 32) {
            playMoves();
        }
        else if (e.which === 49 || e.which === 97) {// 1
            guessState("-");
        }
        else if (e.which === 50 || e.which === 98) {// 2
            guessState("0");
        }
        else if (e.which === 51 || e.which === 99) {// 3
            guessState("+");
        }
        else if (e.which === 52 || e.which === 100) {// 4
            guessState("U");
        }
        else if (e.which === 53 || e.which === 101) {// 5
            guessState("R");
        }
    }); */
    $(window).on("keyup", e => {
        if (e.which === 32) {
            playMoves();
        }
        else if (e.key.toLowerCase() === keybindings["m"]) {// 1
            guessState("-");
        }
        else if (e.key.toLowerCase() === keybindings["0"]) {// 2
            guessState("0");
        }
        else if (e.key.toLowerCase() === keybindings["p"]) {// 3
            guessState("+");
        }
        else if (e.key.toLowerCase() === keybindings["U"]) {// 4
            guessState("U");
        }
        else if (e.key.toLowerCase() === keybindings["R"]) {// 5
            guessState("R");
        }
    });
}

function updateTPS() {
    let solution = $("cube-player").attr("solution");
    let tps = parseFloat($("#inpTPS").val());
    if (tps <= 0) {
        tps = 1;
        $("#inpTPS").val(1);
    }
    
    let time = 1000 * solution.split(" ").length / tps;

    $("cube-player").attr("time", time);
}

function updateMoves() {
    let nMoves = parseInt($("#inpNMoves").val());
    if (nMoves < 1) {
        nMoves = 1;
        $("#inpNMoves").val(1);
    }
    moves = getSubsetScramble(ubohMoves, nMoves);
    $("cube-player").attr("scramble", inverseAlg(moves));
    $("cube-player").attr("solution", moves);
    console.log("Old state: " + curState);
    console.log(moves);
    let states = [];
    for (let i = 0; i < moves.split(" ").length; i++) {
        let m = moves.split(" ")[i].replace("w", "");
        let nState = label_update[curState][m];
        curState = nState;
        states.push(nState);
    }
    console.log(states.join(" "));
}

function cubeFinished() {
    $("#btnPlay").prop("disabled", false);
    $(".guessButtons").prop("disabled", false);
}

function playMoves() {
    if (first) {
        first = false;
        $("#btnPlay").text("Show current state");
        $(".inpKB").prop("disabled", true);
    }
    $("#ubohState").text(curState);

    updateMoves();
    updateTPS();
    $("#cubePlayerDiv > cube-player > div:nth-child(2) > button:nth-child(1)").click();
    $("#btnPlay").prop("disabled", true);
    $(".guessButtons").prop("disabled", true);
    if (!guess) {
        $("#ubohState").css("color", "#aaa");
    }
    guess = false;
}

function guessState(state) {
    if (!first) {
        if (state === curState) {
            $("#ubohState").css("color", "green");
            let sleepTime = 1000;
            setTimeout(() => {
                $("#ubohState").css("color", "#aaa");
            }, sleepTime);
            guess = true;
            playMoves();
        }
        else {
            $("#ubohState").css("color", "red");
        }
    }
}

function updateBindings() {
    keybindings = {
        "m" : String($("#kbm").val()).toLowerCase(),
        "0" : String($("#kb0").val()).toLowerCase(),
        "p" : String($("#kbp").val()).toLowerCase(),
        "U" : String($("#kbU").val()).toLowerCase(),
        "R" : String($("#kbR").val()).toLowerCase(),
    };
    localStorage.setItem("ubohKeys", JSON.stringify(keybindings));

    $("#infom").text("[" + keybindings["m"] + "]");
    $("#info0").text("[" + keybindings["0"] + "]");
    $("#infop").text("[" + keybindings["p"] + "]");
    $("#infoU").text("[" + keybindings["U"] + "]");
    $("#infoR").text("[" + keybindings["R"] + "]");
}