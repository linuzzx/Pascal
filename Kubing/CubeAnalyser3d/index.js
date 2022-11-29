const cubeTypes = ["3x3", "2x2", "4x4", "Square-1"]; //["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx","Pyraminx", "Skewb", "Square-1"];
let setupArray = [];
let movesArray = [];
let planes = [];
let scene, camera, renderer;
let anim = false;
let stdTime = 0.15;
let playMoveTime;
let tween;
let virtualStep;
let usedVirtual;
let locked = false;
let virtualCube = false;
let prevWhich = "";

$(function() {
    usedVirtual = false;
    playMoveTime = stdTime * 1000;
    getParams();
    updateArrays();
    updateTPS();
    
    adjustSize();
});

$(window).resize(() => {
    // adjustSize();
});

function getParams() {
    if (window.location.search !== "") {
        const params = (window.location.search).split("?")[1].split("&");

        for (let p of params) {
            switch (p.split("=")[0]) {
                case "setup":
                    $("#taSetup").val(decodeURIComponent(p.split("=")[1]));
                    break;
                case "moves":
                    $("#taMoves").val(decodeURIComponent(p.split("=")[1]));
                    break;
                case "time":
                    $("#inputTime").val(decodeURIComponent(p.split("=")[1]));
                    break;
                case "cubestyle":
                    $("#selCubestyle").val(decodeURIComponent(p.split("=")[1])).change();
                    break;
            }
        }
    }
}

function encodeURL(param) {
    return param.replaceAll("%20", " ").replaceAll("%27", "'").replaceAll("%2F", "/").replaceAll("%0A", "\n").replaceAll("%26", "&").replaceAll("%3D", "=");
}

function updateArrays() {
    const setup = getMoves("#taSetup");
    const moves = getMoves("#taMoves");
    const time = timeToMs($("#inputTime").val()) || "";
    const cubestyle = $("#selCubestyle").find(":selected").val();

    $("#cubeDisplay cube-player").attr("scramble", setup);
    $("#cubeDisplay cube-player").attr("solution", moves);
    $("#cubeDisplay cube-player").attr("time", time);
    $("#cubeDisplay cube-player").attr("cubestyle", cubestyle);
}

function getMoves(moves) {
    let strSetup = "";
    let arrSetup = [];
    const lines = $(moves).val().split("\n");
    for (let line of lines) {
        arrSetup.push(commToAlg(line.split("//")[0]));
    }

    strSetup = arrSetup.join(" ");

    const arr = strSetup.split(" ").filter(checkEmpty);

    return arr.join(" ");
}

function checkEmpty(move) {
    return move !== "";
}

function updateTPS() {
    let moveCount = 0;

    for (let s of getMoves("#taMoves").split(" ")) {
        if (s.includes("R") || s.includes("L") || s.includes("F") || s.includes("B") || s.includes("U") || s.includes("D")) {
            moveCount++;
        }
        else if (s.includes("M") || s.includes("S") || s.includes("E")) {
            moveCount += 2;
        }
    }

    const tps = (moveCount / timeToMs($("#inputTime").val()) * 1000).toFixed(2);

    $("#tps").val(tps + " TPS (" + moveCount + " HTM)");
}

function updateURL() {
    let rawSetup = $("#taSetup").val();
    let rawMoves = $("#taMoves").val();
    let rawTime = $("#inputTime").val() ? "time=" + $("#inputTime").val() : "";
    let cubestyle = $("#selCubestyle").find(":selected").val() ? "cubestyle=" + $("#selCubestyle").find(":selected").val() : "";
    let urlExtra = "";

    rawSetup = $("#taSetup").val() ? "setup=" + encodeURIComponent(rawSetup) : "";
    rawMoves = $("#taMoves").val() ? "moves=" + encodeURIComponent(rawMoves) : "";

    let urlRest = [rawSetup, rawMoves, rawTime, cubestyle].filter(u => u !== "").join("&");

    if (urlRest !== "") {
        urlExtra = "?" + urlRest;
    }

    const state = {};
    const title = "";

    if (urlExtra !== "") {
        history.pushState(state, title, urlExtra);
    }
}

function resetInputs() {
    $("#inputTime").val("").change();
    $("#taSetup").val("").change();
    $("#taMoves").val("").change();
}

async function connectToGiiker() {
    try {
        const giiker = await connect()
        .then(() => {
            if (!usedVirtual) {
                alert("Select scramble/solution field to enter moves with Giiker Cube");
                usedVirtual = true;
            }
            virtualCube = true;
            
            $("#btnGiiker").text("Disconnect");
            $("#btnGiiker").blur();
            $("#btnGiiker").attr("onclick", "stopGiiker()");
        
            $("#inputTime").attr("readonly", true);
            $("#taSetup").attr("readonly", true);
            $("#taMoves").attr("readonly", true);
            $("#btnVirtual").attr("disabled", true);
            $("#btnPlay").attr("disabled", true);
            $("#btnReset").attr("disabled", true);

            virtualStep = "";

            $("#taSetup").on("focus", () => {
                if (virtualCube) {
                    virtualStep = "scramble";
                    $("#taSetup").css("background-color", "#33C481");
                }
            });
            $("#taSetup").focusout(() => {
                $("#taSetup").css("background-color", "#FFFFFF");
            });
            $("#taMoves").on("focus", () => {
                if (virtualCube) {
                    virtualStep = "solution";
                    $("#taMoves").css("background-color", "#33C481");
                }
            });
            $("#taMoves").focusout(() => {
                $("#taMoves").css("background-color", "#FFFFFF");
            });
        });

        giiker.on('connected', () => {
            alert("Giiker cube connected");
        });

        giiker.on('move', (move) => {/* console.log(move);
            doAlg(move.notation); */
        });

        giiker.on('disconnected', () => {
            alert("Giiker cube disconnected");
            $("#btnGiiker").attr("disabled", false);
        })
    
    } catch(e) {
        $("#btnGiiker").attr("disabled", false);
    }
}

function stopGiiker() {
    $("#btnGiiker").text("Giiker");
    $("#btnGiiker").blur();
    $("#btnGiiker").attr("onclick", "connectToGiiker()");

    $("#inputTime").attr("readonly", false);
    $("#taSetup").attr("readonly", false);
    $("#taMoves").attr("readonly", false);
    $("#btnVirtual").attr("disabled", false);
    $("#btnPlay").attr("disabled", false);
    $("#btnReset").attr("disabled", false);

    const giiker = disconnect();
    virtualCube = false;
}

function giikerMove(move) {
    resetState();
    if (virtualStep === "scramble") {
        let newScramble = $("#taSetup").val();

        if (newScramble !== "" && newScramble.split(" ")[newScramble.split(" ").length - 1] === move) {
            newScramble = newScramble.split(" ").slice(0, newScramble.split(" ").length - 1).join(" ") + " " + move.split("")[0] + "2";
        }
        else {
            newScramble = (newScramble + " " + move).trim();
        }
        $("#taSetup").val(newScramble).change();
    }
    else if (virtualStep === "solution") {
        let newSolution = $("#taMoves").val();

        if (newSolution !== "" && newSolution.split(" ")[newSolution.split(" ").length - 1] === move) {
            newSolution = newSolution.split(" ").slice(0, newSolution.split(" ").length - 1).join(" ") + " " + move.split("")[0] + "2";
        }
        else {
            newSolution = (newSolution + " " + move).trim();
        }
        $("#taMoves").val(newSolution).change();
    }
}

function virtual() {
    if (!usedVirtual) {
        alert("Select scramble/solution field to enter moves with Virtual Cube");
        usedVirtual = true;
    }
    virtualCube = true;
    $("#btnVirtual").text("Stop virtual");
    $("#btnVirtual").blur();
    $("#btnVirtual").attr("onclick", "stopVirtual()");

    $("#inputTime").attr("readonly", true);
    $("#taSetup").attr("readonly", true);
    $("#taMoves").attr("readonly", true);
    $("#btnGiiker").attr("disabled", true);
    $("#btnPlay").attr("disabled", true);
    $("#btnReset").attr("disabled", true);

    virtualStep = "";

    $("#taSetup").on("focus", () => {
        if (virtualCube) {
            virtualStep = "scramble";
            $("#taSetup").css("background-color", "#33C481");
        }
    });
    $("#taSetup").focusout(() => {
        $("#taSetup").css("background-color", "#FFFFFF");
    });
    $("#taMoves").on("focus", () => {
        if (virtualCube) {
            virtualStep = "solution";
            $("#taMoves").css("background-color", "#33C481");
        }
    });
    $("#taMoves").focusout(() => {
        $("#taMoves").css("background-color", "#FFFFFF");
    });

    $(window).keypress(function(e) {
        if (virtualCube && !(locked && e.which === prevWhich)) {
            prevWhich = e.which;
            locked = true;

            getTurn(e);
        }
    });

    $(window).keyup(function(e) {
        locked = false;
    });
}

function stopVirtual() {
    virtualCube = false;
    $("#btnVirtual").text("Virtual");
    $("#btnVirtual").attr("onclick", "virtual()");

    $("#inputTime").attr("readonly", false);
    $("#taSetup").attr("readonly", false);
    $("#taMoves").attr("readonly", false);
    $("#btnGiiker").attr("disabled", false);
    $("#btnPlay").attr("disabled", false);
    $("#btnReset").attr("disabled", false);

    virtualStep = "";

    $("#taSetup").css("background-color", "#FFFFFF");
    $("#taMoves").css("background-color", "#FFFFFF");
}

function getTurn(e) {
    let keyBinds = ["j", "f", "h", "g", "i", "k", "d", "e", "s", "l", "w", "o", ",", ".", "n", "b", "ø", "a", "å", "q", "u", "m", "v", "r"];
    let possibleMoves = ["U", "U'", "F", "F'", "R", "R'", "L", "L'", "D", "D'", "B", "B'", "M", "M'", "x", "x'", "y", "y'", "z", "z'", "Rw", "Rw'", "Lw", "Lw'"];

    const key = keyBinds.indexOf(String.fromCharCode(e.which).toLowerCase());
    const move = possibleMoves[key];
    if (move) {
        let newSolution = virtualStep === "scramble" ? $("#taSetup").val() : virtualStep === "solution" ? $("#taMoves").val() : "";
        
        if (newSolution !== "" && newSolution.split(" ")[newSolution.split(" ").length - 1] === move) {
            newSolution = newSolution.split(" ").slice(0, newSolution.split(" ").length - 1).join(" ") + " " + move.split("")[0] + "2";
            if (move.includes("'")) {
                newSolution += "'";
            }
        }
        else {
            newSolution = (newSolution + " " + move).trim();
        }
        virtualStep === "scramble" ? $("#taSetup").val(newSolution).change() : virtualStep === "solution" ? $("#taMoves").val(newSolution).change() : "";
    }
}

function adjustSize() {
    if ($("body").width() >= $("body").height()) {
        $("body").css("grid-template-columns", "1fr 1fr");
        $("body").css("grid-template-rows", "");
        $("input, textarea, h1, button, select, option").css("font-size", "5vh");
    }
    else {
        $("body").css("grid-template-columns", "");
        $("body").css("grid-template-rows", "1fr 2fr");
        $("input, textarea, h1, button, select, option").css("font-size", "5vw");
    }
}