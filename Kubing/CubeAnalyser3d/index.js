let url = "Kubing/CubeAnalyser/?";

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
});

$(window).resize(() => {
    // adjustSize();
});

function getParams() {
    if (window.location.search !== "") {
        const params = (window.location.search).split("?")[1].split("&");

        for (let p of params) {
            switch (p.split("=")[0]) {
                /* case "setup":
                    $("#taSetup").val(decode(p.split("=")[1]));
                    break;
                case "moves":
                    $("#taMoves").val(encodeURL(p.split("=")[1]));
                    break;
                case "time":
                    $("#inputTime").val(encodeURL(p.split("=")[1]));
                    break; */
                case "setup":
                    $("#taSetup").val(decodeURIComponent(p.split("=")[1]));
                    break;
                case "moves":
                    $("#taMoves").val(decodeURIComponent(p.split("=")[1]));
                    break;
                case "time":
                    $("#inputTime").val(decodeURIComponent(p.split("=")[1]));
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
    const time = timeToMs($("#inputTime").val() || "");

    $("#cubeDisplay cube-player").attr("scramble", setup);
    $("#cubeDisplay cube-player").attr("solution", moves);
    $("#cubeDisplay cube-player").attr("time", time);
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
    let rawTime = $("#inputTime").val();
    let urlExtra = "?";

    rawSetup = encodeURIComponent(rawSetup);
    rawMoves = encodeURIComponent(rawMoves);
    if (rawSetup !== "") {
        urlExtra += "setup="+rawSetup;
        if (rawMoves !== "") {
            urlExtra += "&moves="+rawMoves;
        }
        if (rawTime !== "") {
            urlExtra += "&time="+rawTime;
        }
    }
    else if (rawMoves !== "") {
        urlExtra += "moves="+rawMoves;
        if (rawTime !== "") {
            urlExtra += "&time="+rawTime;
        }
    }
    else if (rawTime !== "") {
        urlExtra += "time="+rawTime;
    }

    const state = {};
    const title = "";

    history.pushState(state, title, urlExtra);
}

function applyMove(turn) {
    switch (turn) {
        case "R":
            doR();
            break;
        case "R'":
            doRi();
            break;
        case "R2":
            doR2();
            break;
        case "R2'":
            doR2i();
            break;
        case "L":
            doL();
            break;
        case "L'":
            doLi();
            break;
        case "L2":
            doL2();
            break;
        case "L2'":
            doL2i();
            break;
        case "F":
            doF();
            break;
        case "F'":
            doFi();
            break;
        case "F2":
            doF2();
            break;
        case "F2'":
            doF2i();
            break;
        case "B":
            doB();
            break;
        case "B'":
            doBi();
            break;
        case "B2":
            doB2();
            break;
        case "B2'":
            doB2i();
            break;
        case "U":
            doU();
            break;
        case "U'":
            doUi();
            break;
        case "U2":
            doU2();
            break;
        case "U2'":
            doU2i();
            break;
        case "D":
            doD();
            break;
        case "D'":
            doDi();
            break;
        case "D2":
            doD2();
            break;
        case "D2'":
            doD2i();
            break;
        case "x":
            doX();
            break;
        case "x'":
            doXi();
            break;
        case "x2":
            doX2();
            break;
        case "x2'":
            doX2i();
            break;
        case "y":
            doY();
            break;
        case "y'":
            doYi();
            break;
        case "y2":
            doY2();
            break;
        case "y2'":
            doY2i();
            break;
        case "z":
            doZ();
            break;
        case "z'":
            doZi();
            break;
        case "z2":
            doZ2();
            break;
        case "z2'":
            doZ2i();
            break;
        case "M":
            doM();
            break;
        case "M'":
            doMi();
            break;
        case "M2":
            doM2();
            break;
        case "M2'":
            doM2i();
            break;
        case "S":
            doS();
            break;
        case "S'":
            doSi();
            break;
        case "S2":
            doS2();
            break;
        case "S2'":
            doS2i();
            break;
        case "E":
            doE();
            break;
        case "E'":
            doEi();
            break;
        case "E2":
            doE2();
            break;
        case "E2'":
            doE2i();
            break;
        case "Rw":
            doRw();
            break;
        case "Rw'":
            doRwi();
            break;
        case "Rw2":
            doRw2();
            break;
        case "Rw2'":
            doRw2i();
            break;
        case "Lw":
            doLw();
            break;
        case "Lw'":
            doLwi();
            break;
        case "Lw2":
            doLw2();
            break;
        case "Lw2'":
            doLw2i();
            break;
        case "Fw":
            doFw();
            break;
        case "Fw'":
            doFwi();
            break;
        case "Fw2":
            doFw2();
            break;
        case "Fw2'":
            doFw2i();
            break;
        case "Bw":
            doBw();
            break;
        case "Bw'":
            doBwi();
            break;
        case "Bw2":
            doBw2();
            break;
        case "Bw2'":
            doBw2i();
            break;
        case "Uw":
            doUw();
            break;
        case "Uw'":
            doUwi();
            break;
        case "Uw2":
            doUw2();
            break;
        case "Uw2'":
            doUw2i();
            break;
        case "Dw":
            doDw();
            break;
        case "Dw'":
            doDwi();
            break;
        case "Dw2":
            doDw2();
            break;
        case "Dw2'":
            doDw2i();
            break;
    }
}

function doMove(cubies, xyz, angle) {
    /* let axis = xyz === "x" ? xAxis : xyz === "y" ? yAxis : zAxis;
    let euler = calcRotationAroundAxis(xyz, angle); */
    let tempCube = new THREE.Object3D();
    
    for (let cubie of cubies) {
        scene.attach(tempCube);
        tempCube.attach(cubie);
    }
    
    if (anim) {
        tween = gsap.to(tempCube.rotation, {
            duration: playMoveTime / 1000,
            x: xyz === "x" ? angle : 0,
            y: xyz === "y" ? angle : 0,
            z: xyz === "z" ? angle : 0
        });
    }
    else {
        tween = gsap.to(tempCube.rotation, {
            duration: 0,
            x: xyz === "x" ? angle : 0,
            y: xyz === "y" ? angle : 0,
            z: xyz === "z" ? angle : 0
        });
    }
}

function doR() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
    doMove(c, "x", -Math.PI / 2);
}

function doRi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
    doMove(c, "x", Math.PI / 2);
}

function doR2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
    doMove(c, "x", -Math.PI);
}

function doR2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
    doMove(c, "x", Math.PI);
}

function doL() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
    doMove(c, "x", Math.PI / 2);
}

function doLi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
    doMove(c, "x", -Math.PI / 2);
}

function doL2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
    doMove(c, "x", Math.PI);
}

function doL2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
    doMove(c, "x", -Math.PI);
}

function doU() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
    doMove(c, "y", -Math.PI / 2);
}

function doUi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
    doMove(c, "y", Math.PI / 2);
}

function doU2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
    doMove(c, "y", -Math.PI);
}

function doU2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
    doMove(c, "y", Math.PI);
}

function doD() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
    doMove(c, "y", Math.PI / 2);
}

function doDi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
    doMove(c, "y", -Math.PI / 2);
}

function doD2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
    doMove(c, "y", Math.PI);
}

function doD2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
    doMove(c, "y", -Math.PI);
}

function doF() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
    doMove(c, "z", -Math.PI / 2);
}

function doFi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
    doMove(c, "z", Math.PI / 2);
}

function doF2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
    doMove(c, "z", -Math.PI);
}

function doF2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
    doMove(c, "z", Math.PI);
}

function doB() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
    doMove(c, "z", Math.PI / 2);
}

function doBi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
    doMove(c, "z", -Math.PI / 2);
}

function doB2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
    doMove(c, "z", Math.PI);
}

function doB2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
    doMove(c, "z", -Math.PI);
}

function doX() {
    let c = planes;
    doMove(c, "x", -Math.PI / 2);
}

function doXi() {
    let c = planes;
    doMove(c, "x", Math.PI / 2);
}

function doX2() {
    let c = planes;
    doMove(c, "x", -Math.PI);
}

function doX2i() {
    let c = planes;
    doMove(c, "x", Math.PI);
}

function doY() {
    let c = planes;
    doMove(c, "y", -Math.PI / 2);
}

function doYi() {
    let c = planes;
    doMove(c, "y", Math.PI / 2);
}

function doY2() {
    let c = planes;
    doMove(c, "y", -Math.PI);
}

function doY2i() {
    let c = planes;
    doMove(c, "y", Math.PI);
}

function doZ() {
    let c = planes;
    doMove(c, "z", -Math.PI / 2);
}

function doZi() {
    let c = planes;
    doMove(c, "z", Math.PI / 2);
}

function doZ2() {
    let c = planes;
    doMove(c, "z", -Math.PI);
}

function doZ2i() {
    let c = planes;
    doMove(c, "z", Math.PI);
}

function doM() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", Math.PI / 2);
}

function doMi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", -Math.PI / 2);
}

function doM2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", Math.PI);
}

function doM2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", -Math.PI);
}

function doS() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", -Math.PI / 2);
}

function doSi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", Math.PI / 2);
}

function doS2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", -Math.PI);
}

function doS2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", Math.PI);
}

function doE() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", Math.PI / 2);
}

function doEi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", -Math.PI / 2);
}

function doE2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", Math.PI);
}

function doE2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", -Math.PI);
}

function doRw() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", -Math.PI / 2);
}

function doRwi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", Math.PI / 2);
}

function doRw2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", -Math.PI);
}

function doRw2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
    doMove(c, "x", Math.PI);
}

function doLw() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
    doMove(c, "x", Math.PI / 2);
}

function doLwi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
    doMove(c, "x", -Math.PI / 2);
}

function doLw2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
    doMove(c, "x", Math.PI);
}

function doLw2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
    doMove(c, "x", -Math.PI);
}

function doUw() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", -Math.PI / 2);
}

function doUwi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", Math.PI / 2);
}

function doUw2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", -Math.PI);
}

function doUw2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
    doMove(c, "y", Math.PI);
}

function doDw() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
    doMove(c, "y", Math.PI / 2);
}

function doDwi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
    doMove(c, "y", -Math.PI / 2);
}

function doDw2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
    doMove(c, "y", Math.PI);
}

function doDw2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
    doMove(c, "y", -Math.PI);
}

function doFw() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", -Math.PI / 2);
}

function doFwi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", Math.PI / 2);
}

function doFw2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", -Math.PI);
}

function doFw2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
    doMove(c, "z", Math.PI);
}

function doBw() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
    doMove(c, "z", Math.PI / 2);
}

function doBwi() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
    doMove(c, "z", -Math.PI / 2);
}

function doBw2() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
    doMove(c, "z", Math.PI);
}

function doBw2i() {
    let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
    doMove(c, "z", -Math.PI);
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
                virtualStep = "scramble";
                $("#taSetup").css("background-color", "#33C481");
            });
            $("#taSetup").focusout(() => {
                $("#taSetup").css("background-color", "#FFFFFF");
            });
            $("#taMoves").on("focus", () => {
                virtualStep = "solution";
                $("#taMoves").css("background-color", "#33C481");
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
}

function giikerMove(move) {
    resetState();
    if (virtualStep === "scramble") {
        let newScramble = $("#taSetup").val();

        anim = false;
        for (let m of newScramble.split(" ")) {
            applyMove(m);
        }

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

        anim = false;
        for (let m of $("#taSetup").val().split(" ")) {
            applyMove(m);
        }
        for (let m of newSolution.split(" ")) {
            applyMove(m);
        }

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
        virtualStep = "scramble";
        $("#taSetup").css("background-color", "#33C481");
    });
    $("#taSetup").focusout(() => {
        $("#taSetup").css("background-color", "#FFFFFF");
    });
    $("#taMoves").on("focus", () => {
        virtualStep = "solution";
        $("#taMoves").css("background-color", "#33C481");
    });
    $("#taMoves").focusout(() => {
        $("#taMoves").css("background-color", "#FFFFFF");
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

function getTurn(e) {console.log("hei");
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
        $("input, textarea, h1, button").css("font-size", "5vh");
    }
    else {
        $("body").css("grid-template-columns", "");
        $("body").css("grid-template-rows", "1fr 2fr");
        $("input, textarea, h1, button").css("font-size", "5vw");
    }
}