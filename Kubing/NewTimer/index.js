let audioContext;
let analyser;
let mic;

$(function () {
    
});

function readyTimer() {
    $("#display").css("color", "yellow");
}

function startTimer() {
    $("#display").css("color", "green");
}

function stopTimer() {
    $("#display").css("color", "red");
}

function resetTimer() {
    $("#display").css("color", "white");
}

//StackMat
function initMic() {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {
            mic = audioContext.createMediaStreamSource(stream);
            console.log(stream);
        }).catch((err) => {
            console.log(err);
            console.log("browser unable to access microphone\n(check to see if microphone is attached)");
        });
    } else {
        console.log("browser unable to access media devices\n(update your browser)");
    }
}