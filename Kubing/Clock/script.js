let flip = "y2";

let clockFaces = {
    Cf: 0,
    Uf: 0,
    Lf: 0,
    Rf: 0,
    Df: 0,
    Cb: 0,
    Ub: 0,
    Lb: 0,
    Rb: 0,
    Db: 0,
    UL: 0,
    UR: 0,
    DL: 0,
    DR: 0
}

let pins = {
    ul: false,
    ur: false,
    dl: false,
    dr: false
}

$(() => {
    initPins();
    initActions();
    initClockCircles();
});

function initActions() {
    if ($(window).width() > $(window).height()) {
        $("#clockDisplay").css({
            "grid-template-columns": "1fr 1fr",
            "grid-template-rows": "",
        });
    }
    else {
        $("#clockDisplay").css({
            "grid-template-rows": "1fr 1fr",
            "grid-template-columns": "",
        });
    }
    $(".wheel").on("click", e => {
        e.stopPropagation();
        let wheel = $(e.target).data()["wheel"];
        let wheelPos = wheel.slice(0, wheel.length - 1);
        let step = parseInt(wheel[wheel.length - 1] + 1);
        turnClock(wheelPos, step);
    });
    flip = localStorage.getItem("clockFlip") ? localStorage.getItem("clockFlip") : flip;
    updateFlip();
}

function initClockCircles() {
    let clockN = 0;
    $('.clock').each(function() {
        const $clock = $(this); // Current clock
        const clockWidth = $clock.width(); // Assumes square clocks
        const radius = clockWidth / 2; // Radius for positioning circles
        const distance = 7.5; // Additional distance to push circles outwards

        for (let i = 0; i < 12; i++) {
            const angle = Math.PI / 6 * i; // Divide the circle into 12 parts (2 * Math.PI / 12 * i)
            const circleDiameter = clockWidth * 0.075; // Circle diameter as 10% of the clock width
            const circleRadius = circleDiameter / 2;

            // Calculate circle's center point further out from the original position
            const x = radius + (radius + distance) * Math.sin(angle) - circleRadius;
            const y = radius - (radius + distance) * Math.cos(angle) - circleRadius;

            // Create circle element
            const $circle = $('<div></div>').css({
                position: 'absolute',
                width: circleDiameter,
                height: circleDiameter,
                borderRadius: '50%',
                backgroundColor: i === 0 ? 'red' : clockN < 9 ? 'black' : 'white', // Make the top one red
                top: y + 'px',
                left: x + 'px'
            }).addClass('clock-circle');

            // Append circle to the clock
            $clock.append($circle);
        }
        clockN++;
    });
}

function getActiveClockFaces(wheel) {
    let activeClocks = [];
    if (wheel === "UL") {
        activeClocks.push("UL")

        if (pins["ul"]) {
            activeClocks.push("Cf");
            activeClocks.push("Uf");
            activeClocks.push("Lf");

            if (pins["ur"]) {
                activeClocks.push("UR")
                activeClocks.push("Rf");
            }
            if (pins["dl"]) {
                activeClocks.push("DL")
                activeClocks.push("Df");
            }
            if (pins["dr"]) {
                activeClocks.push("DR")
                activeClocks.push("Df");
                activeClocks.push("Rf");
            }
        }
        else {
            activeClocks.push("Cb");
            activeClocks.push("Ub");
            activeClocks.push("Lb");

            if (!pins["ur"]) {
                activeClocks.push("UR")
                activeClocks.push("Rb");
            }
            if (!pins["dl"]) {
                activeClocks.push("DL")
                activeClocks.push("Db");
            }
            if (!pins["dr"]) {
                activeClocks.push("DR")
                activeClocks.push("Db");
                activeClocks.push("Rb");
            }
        }
    }
    else if (wheel === "UR") {
        activeClocks.push("UR")

        if (pins["ur"]) {
            activeClocks.push("Cf");
            activeClocks.push("Uf");
            activeClocks.push("Rf");

            if (pins["ul"]) {
                activeClocks.push("UL")
                activeClocks.push("Lf");
            }
            if (pins["dl"]) {
                activeClocks.push("DL")
                activeClocks.push("Df");
                activeClocks.push("Lf");
            }
            if (pins["dr"]) {
                activeClocks.push("DR")
                activeClocks.push("Df");
            }
        }
        else {
            activeClocks.push("Cb");
            activeClocks.push("Ub");
            activeClocks.push("Rb");

            if (!pins["ul"]) {
                activeClocks.push("UL")
                activeClocks.push("Lb");
            }
            if (!pins["dl"]) {
                activeClocks.push("DL")
                activeClocks.push("Db");
                activeClocks.push("Lb");
            }
            if (!pins["dr"]) {
                activeClocks.push("DR")
                activeClocks.push("Db");
            }
        }
    }
    else if (wheel === "DL") {
        activeClocks.push("DL")

        if (pins["dl"]) {
            activeClocks.push("Cf");
            activeClocks.push("Df");
            activeClocks.push("Lf");

            if (pins["ur"]) {
                activeClocks.push("UR")
                activeClocks.push("Uf");
                activeClocks.push("Rf");
            }
            if (pins["ul"]) {
                activeClocks.push("UL")
                activeClocks.push("Uf");
            }
            if (pins["dr"]) {
                activeClocks.push("DR")
                activeClocks.push("Rf");
            }
        }
        else {
            activeClocks.push("Cb");
            activeClocks.push("Db");
            activeClocks.push("Lb");

            if (!pins["ur"]) {
                activeClocks.push("UR")
                activeClocks.push("Ub");
                activeClocks.push("Rb");
            }
            if (!pins["ul"]) {
                activeClocks.push("UL")
                activeClocks.push("Ub");
            }
            if (!pins["dr"]) {
                activeClocks.push("DR")
                activeClocks.push("Rb");
            }
        }
    }
    else if (wheel === "DR") {
        activeClocks.push("DR")

        if (pins["dr"]) {
            activeClocks.push("Cf");
            activeClocks.push("Df");
            activeClocks.push("Rf");

            if (pins["ur"]) {
                activeClocks.push("UR")
                activeClocks.push("Uf");
            }
            if (pins["dl"]) {
                activeClocks.push("DL")
                activeClocks.push("Lf");
            }
            if (pins["ul"]) {
                activeClocks.push("UL")
                activeClocks.push("Uf");
                activeClocks.push("Lf");
            }
        }
        else {
            activeClocks.push("Cb");
            activeClocks.push("Db");
            activeClocks.push("Rb");

            if (!pins["ur"]) {
                activeClocks.push("UR")
                activeClocks.push("Ub");
            }
            if (!pins["dl"]) {
                activeClocks.push("DL")
                activeClocks.push("Lb");
            }
            if (!pins["ul"]) {
                activeClocks.push("UL")
                activeClocks.push("Ub");
                activeClocks.push("Lb");
            }
        }
    }
    activeClocks = [...new Set(activeClocks)];
    return activeClocks;
}

function turnClock(wheel, steps) {
    let activeClocks = getActiveClockFaces(wheel);
    for (let c of activeClocks) {
        if (c.includes("f") || c.includes("b")) {
            // Not a corner
            if (c.includes("f")) {
                clockFaces[c] = (12 + clockFaces[c] + steps) % 12;
            }
            else {
                clockFaces[c] = (12 + clockFaces[c] - steps) % 12;
            }
        }
        else {
            // Corner
            clockFaces[c] = (12 + clockFaces[c] + steps) % 12;
        }
    }

    updateClockHands();
}

function updateClockHands() {
    for (let c of Object.keys(clockFaces)) {
        let stepDegrees = clockFaces[c] * 360 / 12;
        if (c.includes("f") || c.includes("b")) {
            // Not a corner
            $("#clock" + c + " > .clock-hand").css({"transform":" rotate(" + stepDegrees + "deg)"});
        }
        else {
            // Corner
            $("#clock" + c + "f > .clock-hand").css({"transform":" rotate(" + stepDegrees + "deg)"});
            $("#clock" + c + "b > .clock-hand").css({"transform":" rotate(-" + stepDegrees + "deg)"});
        }
    }
}

function getWorkingWheel(pin, opposite) {
    let wheel = "";
    if (pin === "UR") {
        wheel = opposite ? "UL" : "UR";
    }
    if (pin === "DR") {
        wheel = opposite ? "DL" : "DR";
    }
    if (pin === "DL") {
        wheel = opposite ? "DR" : "DL";
    }
    if (pin === "UL") {
        wheel = opposite ? "UR" : "UL";
    }
    if (pin === "U") {
        wheel = "UR";
    }
    if (pin === "R") {
        wheel = opposite ? "UL" : "UR";
    }
    if (pin === "D") {
        wheel = "DR";
    }
    if (pin === "L") {
        wheel = opposite ? "UR" : "UL";
    }
    if (pin === "ALL") {
        wheel = "UR";
    }

    return wheel;
}

function scrambleClock(scr = "") {
    for (const key in clockFaces) {
        clockFaces[key] = 0;
    }
    
    for (const key in pins) {
        pins[key] = false;
    }
    let scramble = scr === "" ? getScrambleClock().split(" ") : scr.split(" ");
    let back = false;
    for (let i = 0; i < scramble.length; i++) {
        let s = scramble[i];
        if (s === "y2") {
            back = true;
        }
        else {
            let pin = s.slice(0, s.length - 2);
            let wheel = getWorkingWheel(pin, back);
            let step = s.slice(s.length - 2, s.length - 1);
            let posNeg = s.slice(s.length - 1);
            setPins(pin, back);
            updatePins();
            turnClock(wheel, parseInt(back ? -parseInt(posNeg + step) : parseInt(posNeg + step)));
        }
    }
}

function initPins() {
    $('#bClock .pin').addClass('pinActive');
}

function togglePin(pin) {
    pins[pin] = !pins[pin];
    $("#fClock .pin-" + pin).toggleClass("pinActive");
    $("#bClock .pin-" + pin).toggleClass("pinActive");
}

function setPins(pin, opposite = false) {
    for (const key in pins) {
        if (!opposite) {
            pins[key] = false;
        }
        else {
            pins[key] = true;
        }
    }
    if (pin === "UR") {
        if (!opposite) {
            pins["ur"] = true;
        }
        else {
            pins["ur"] = false;
        }
    }
    else if (pin === "DR") {
        if (!opposite) {
            pins["dr"] = true;
        }
        else {
            pins["dr"] = false;
        }
    }
    else if (pin === "DL") {
        if (!opposite) {
            pins["dl"] = true;
        }
        else {
            pins["dl"] = false;
        }
    }
    else if (pin === "UL") {
        if (!opposite) {
            pins["ul"] = true;
        }
        else {
            pins["ul"] = false;
        }
    }
    else if (pin === "U") {
        if (!opposite) {
            pins["ur"] = true;
            pins["ul"] = true;
        }
        else {
            pins["ur"] = false;
            pins["ul"] = false;
        }
    }
    else if (pin === "R") {
        if (!opposite) {
            pins["ur"] = true;
            pins["dr"] = true;
        }
        else {
            pins["ul"] = false;
            pins["dl"] = false;
        }
    }
    else if (pin === "D") {
        if (!opposite) {
            pins["dr"] = true;
            pins["dl"] = true;
        }
        else {
            pins["dr"] = false;
            pins["dl"] = false;
        }
    }
    else if (pin === "L") {
        if (!opposite) {
            pins["dl"] = true;
            pins["ul"] = true;
        }
        else {
            pins["dr"] = false;
            pins["ur"] = false;
        }
    }
    else if (pin === "ALL") {
        if (!opposite) {
            pins["ur"] = true;
            pins["dr"] = true;
            pins["dl"] = true;
            pins["ul"] = true;
        }
        else {
            pins["ur"] = false;
            pins["dr"] = false;
            pins["dl"] = false;
            pins["ul"] = false;
        }
    }
}

function updatePins() {
    for (const key in pins) {
        if (pins[key]) {
            $("#fClock .pin-" + key).addClass("pinActive");
            $("#bClock .pin-" + key).removeClass("pinActive");
        }
        else {
            $("#fClock .pin-" + key).removeClass("pinActive");
            $("#bClock .pin-" + key).addClass("pinActive");
        }
    }
}

function toggleFlip() {
    if (flip === "y2") {
        flip = "x2";
    }
    else {
        flip = "y2";
    }
    localStorage.setItem("clockFlip", flip);
    updateFlip();
}

function updateFlip() {
    let notFlip = flip === "y2" ? "x2" : "y2";
    $("#btnToggleFlip").text("Change flip to " + notFlip);
    if (flip === "y2") {
        $("#bClock").css({"transform": "rotate(0deg)"});
        $("#bClock .pinActive").css({"transform": "rotate(0deg)"});
    }
    else if(flip === "x2") {
        $("#bClock").css({"transform": "rotate(180deg)"});
        $("#bClock .pinActive").css({"transform": "rotate(-180deg)"});
    }
}
