let letters = "abcdefghijklmnopqrstuvwx".toUpperCase().split("");
let numOfCubes = 1;
const numOfLetters3BLD = 20;
const numOfLetters4BLD = 46;
const numOfLetters5BLD = 86;
let first = false;
let start = 0;
let interval = null;
let time = "00.00";

$(function() {
    $("#inpMemo").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            checkMemo();
        }
    });
    const fontSize = ($("#memo").css("font-size").split("px")[0] * 0.75)

    $("#inpMemo").css("font-size", fontSize);
    adjustSize();
});
        
$(window).resize(function(){
    adjustSize();
});

function getMemo() {
    let memo = "";

    for (let i=0; i<numOfCubes; i++) {
        for (let j=0; j<numOfLetters3BLD; j++) {
            memo += letters[Math.floor(Math.random() * letters.length)] + (j % 2 === 0 ? "":" ");
        }
    }
    
    $("#memo").html(memo);
    $("#result").html("");

    first = true;
    startTimer();
    $("#inpMemo").focus();
}

function showMemo() {
    $("#memo").css("visibility","visible");
}

function hideMemo() {
    if (first) {
        first = false;
        $("#memo").css("visibility","hidden");
        $("#result").html("");
    }
}

function checkMemo() {
    const success = $("#inpMemo").val().toLowerCase().trim().split(" ").join("") === $("#memo").text().toLowerCase().split(" ").join("");
    let out = "<div><br>";
    let inpMemo = $("#inpMemo").val().toLowerCase().trim().split(" ").join("").split("");
    let memo = $("#memo").text().toLowerCase().trim().split(" ").join("").split("");

    while (memo.length < inpMemo.length) {
        memo.push("");
    }

    for (let i=0; i<memo.length; i++) {
        if (inpMemo[i]) {
            if (inpMemo[i] === memo[i]) {
                out += "<e style='color: green'>"+inpMemo[i].toUpperCase()+"</e>";
            }
            else {
                out += "<e style='color: red'>"+inpMemo[i].toUpperCase()+"</e>";
            }
        }
        else {
            out += "<e>"+memo[i].toUpperCase()+"</e>";
        }
    }

    out += "</div>";

    if (success) {
        out += "<br><p style='color: green'>"+getTime(time)+"</p>";
    }
    else {
        out += "<br><p style='color: red'>DNF<br>("+getTime(time)+")</p>";
    }

    $("#result").html(out);

    $("#inpMemo").val("");
    
    $("#memo").html("<button class='btn btn-secondary' onclick='getMemo()'>Start</button>");

    showMemo();
}

function adjustSize() {
    if ($("#content").width() > $("#content").height()) {
        $("#inpMemo").css("width", "50%");
    }
    else {
        $("#inpMemo").css("width", "80%");
    }
}

function startTimer() {
    start = new Date().getTime();
    interval = setInterval(function() {
        time = new Date().getTime() - start;
    }, 10);
}

function stopTimer() {
    clearInterval(interval);
}

function getTime(t) {
    let timeStr = "";
    let cs = Math.floor((t % 1000) / 10);
    let s = Math.floor((t / 1000) % 60);
    let m = Math.floor((t / 60000) % 60);
    let h = Math.floor((t / 3600000) % 24);

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