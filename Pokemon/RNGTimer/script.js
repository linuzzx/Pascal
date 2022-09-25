// const frameTime = 17;
let framerate;
let interval;
let calibration;
let frameHit;

let beeps = 6;
let beepTime = 500;

const GBA_FPS = 59.7275;
const NDS_FPS = 59.8261;
const NDS_GBA_FPS = 59.6555;
const GBA_FRAMERATE = 1000 / GBA_FPS;
const NDS_FRAMERATE = 1000 / NDS_FPS;
const NDS_GBA_FRAMERATE = 1000 / NDS_GBA_FPS;

$(() => {
    $("#inpPretimer").val(5000);
    $("#inpFrame").val(4384);

    frameHit = $("#inpFrame").val();
    framerate = $("#radDevices input[type='radio']:checked").val() === "gba" ? GBA_FRAMERATE : $("input[type='radio']:checked").val() === "ndsgba" ? NDS_GBA_FRAMERATE : NDS_FRAMERATE;
    $("#timer").text(getHHMMssmmm($("#inpPretimer").val()));
    calibration = 0;

    $("#radDevices input[type='radio']").on("change", ()=> {
        changeDevice();
    });
    
    $("#btnStop").css("display", "none");
});

function startTimer() {
    let start = new Date().getTime();
    $("#btnStart").css("display", "none");
    $("#btnStop").css("display", "block");
    let preTime = parseFloat($("#inpPretimer").val());
    let time = parseFloat($("#inpFrame").val()) * framerate + calibration;
    let totalTime = preTime + time;

    let pre = preTime !== 0;
    let curTime = pre ? preTime : time;

    let i = curTime >= beeps * beepTime ? beeps - 1 : Math.floor(curTime / beepTime);

    interval = setInterval(() => {
        let newTime = Math.round(curTime - (new Date().getTime() - start));
        if (newTime <= beepTime * i) {
            beep();
            i--;
        }
        if (newTime <= 0) {
            if (pre) {
                pre = false;
                curTime = totalTime;
                i = curTime >= beeps * beepTime ? beeps - 1 : Math.floor(curTime / beepTime);
            }
            else {
                stopTimer();
            }
        }
        $("#timer").text(getHHMMssmmm(newTime));
    }, 1);
}

function beep() {
    /* let vol = 40;
    let freq = 1700;
    let duration = 100;
    let a = new AudioContext();
    let v = a.createOscillator();
    let u = a.createGain();
    v.connect(u);
    v.frequency.value = freq;
    v.type = "square";
    u.connect(a.destination);
    u.gain.value = vol * 0.01;
    v.start(a.currentTime);
    v.stop(a.currentTime + duration * 0.001); */

    /* const audio = new Audio("beep.wav");
    audio.play(); */

    // $("#timer").css("background-color", "blue");
    $("html").css("background-color", "blue");
    setTimeout(() => {
        // $("#timer").css("background-color", "");
        $("html").css("background-color", "");
    }, framerate);
}

function stopTimer() {
    clearInterval(interval);
    setTimeout(() => {
        $("#timer").text(getHHMMssmmm($("#inpPretimer").val()));
    }, 10);
    $("#btnStart").css("display", "block");
    $("#btnStop").css("display", "none");
}

function updateTimer() {
    if ($("#inpFrameHit").val() !== "") {
        calibration += Math.round(($("#inpFrame").val() - $("#inpFrameHit").val()) * framerate);
        $("#inpCalibration").val(calibration);
        $("#inpFrameHit").val("");
    }
}

function updateFrameHit() {
    if ($("#inpFrameHit").val() !== "") {
        frameHit = $("#inpFrameHit").val();
    }
}

function updateCalibration() {
    calibration = parseInt($("#inpCalibration").val());
}

function changeDevice() {
    framerate = $("input[type='radio']:checked").val() === "gba" ? GBA_FRAMERATE : $("input[type='radio']:checked").val() === "ndsgba" ? NDS_GBA_FRAMERATE : NDS_FRAMERATE;
    calibration = Math.round(($("#inpFrame").val() - frameHit) * framerate);
    $("#inpCalibration").val(calibration);
}

function getHHMMssmmm(ms) {
    let timeStr = "";
    let s = Math.floor((ms / 1000) % 60);
    let m = Math.floor((ms / 60000) % 60);
    let h = Math.floor((ms / 3600000) % 24);
    let millis = ms - (h * 3600000 + m * 60000 + s * 1000);

    if (h !== 0) {
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (millis < 100) {
            if (millis < 10) {
                millis = "00" + millis;
            }
            else {
                millis = "0" + millis;
            }
        }
        timeStr = h + ":" + m + ":" + s + "." + millis;
    }
    else {
        if (m !== 0) {
            if (s < 10) {
                s = "0" + s;
            }
            if (millis < 100) {
                if (millis < 10) {
                    millis = "00" + millis;
                }
                else {
                    millis = "0" + millis;
                }
            }
            timeStr = m + ":" + s + "." + millis;
        }
        else {
            if (millis < 100) {
                if (millis < 10) {
                    millis = "00" + millis;
                }
                else {
                    millis = "0" + millis;
                }
            }
            timeStr = s + "." + millis;
        }
    }
    
    return timeStr;
}