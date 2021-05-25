// Variabler
var ready = false;
var timing = false;
var stopped = true;
var interval;
var number = JSON.parse(localStorage.getItem("FRURUFnumber")) || 0;
var time;
var timeFormatted;
var scramble;
var ao5Info;
var ao12Info;
var numbers = JSON.parse(localStorage.getItem("FRURUFnumbers")) || [];
var times = JSON.parse(localStorage.getItem("FRURUFtimes")) || [];
var formattedTimes = JSON.parse(localStorage.getItem("FRURUFformattedTimes")) || [];
var ao5s = JSON.parse(localStorage.getItem("FRURUFao5s")) || [];
var ao12s = JSON.parse(localStorage.getItem("FRURUFao12s")) || [];
var formattedAo5s = JSON.parse(localStorage.getItem("FRURUFformattedAo5s")) || [];
var formattedAo12s = JSON.parse(localStorage.getItem("FRURUFformattedAo12s")) || [];
var scrambles = JSON.parse(localStorage.getItem("FRURUFscrambles")) || [];
var timeInfos = JSON.parse(localStorage.getItem("FRURUFtimeInfos")) || [];
var ao5Infos = JSON.parse(localStorage.getItem("FRURUFao5Infos")) || [];
var ao12Infos = JSON.parse(localStorage.getItem("FRURUFao12Infos")) || [];

// Lag scramble
function scrambleMaker() {
    var frurufArray = ["D' L2 D2 L2 F2 U' B2 R2 F2 L2 D2 F2 U R2 U2 F' U R U' R' F';U2 R U2 R2 F R F' R U2 R' U R' U' R' F R F' U R",
        "U F2 R2 U2 R2 U' R2 F2 U2 F2 U' R2 U2 F' U R U' R' F';U R' F' R U R' U R U2 R' F U2 F' U' F U' R",
        "R2 D2 B2 D' R2 U2 F2 U R2 D' L2 R2 U' F' U R U' R' F';F' U2 F U' R U R' U' R U R' U F' U F",
        "D' L2 D F2 U' L2 U F2 R2 U' L2 U R2 U' F' U R U' R' F';U R' U' R U' R' U2 R r U R' U R U2 r'",
        "U F2 L2 U2 L2 U L2 F2 U2 F2 U L2 U2 F' U R U' R' F';R' U' R U' R' F' U F R U' R' U' F' U F U' R",
        "D' L2 D' L2 D2 F2 U F2 U' F2 R2 U2 R2 U' F' U R U' R' F';U2 r U r' R U R' U' r U' r' U' R U R' U R U2 R'",
        "D' L2 D' L2 D2 R2 F2 U' R2 U F2 U2 R2 U' F' U R U' R' F';U' R U2 R2 F R F2 U F U' R U2 R'",
        "U F2 U F2 U' R2 U F2 U F2 U' R2 F2 U' F' U R U' R' F';U' R U R' U R U2 R' r' U' R U' R' U2 r",
        "U' F2 U F2 U2 L2 U' L2 U' L2 U2 L2 F2 U' F' U R U' R' F';U' F R U R' U' R U R' U' F' r' U2 R U R' U r",
        "R2 D2 B2 U' R2 B2 L2 F2 D2 L2 D' R2 F2 D2 F' U R U' R' F';U' r U r' U2 R U R' U2 R U R' U' r U' r'",
        "F2 U2 F2 U R2 U2 F2 U F2 U R2 U2 F2 U' F' U R U' R' F';F' U2 F R' F R F' R U' R' U F' U2 F",
        "R2 U R2 B2 U R2 U' R2 U' B2 U R2 U' R' U B U' B' R' y;F U R U' R' U R U' R' U y' R' U R U' R' U R U2 R'",
        "U2 F2 U' R2 B2 L2 D L2 B2 R2 U2 F' U R U' R' F';U' R' U' R' F R F' U R U' R' U' R U' R' U2 R",
        "B2 L2 R2 F2 D B2 L2 R2 F' U R U' R' F';U' M U M' U2 M U R' U' F' U F r",
        "U F2 U R2 F2 R2 U2 R2 F2 R2 U F' U R U' R' F';F U' R' U2 R U2 R2 U' F' R U R' U' R'",
        "U' F2 U B2 L2 D' F2 L2 B2 U' R2 U' F' U R U' R' F';U r' R2 U R' U R U2 R' U M' U' F R U R' U' F'",
        "B2 D2 U2 B2 F2 D2 U2 F' U R U' R' F';F R U R' U' F'",
        "U' F2 U2 R2 B2 L2 D L2 B2 R2 U' F' U R U' R' F';U R' F' U' F U R",
        "U' R2 F2 U R2 U' F2 R2 F2 U' F2 U F' U R U' R' F';U2 R U R' U R U2 R' U R U2 R2 F R F' R U2 R'",
        "L2 D' B2 D L2 F2 R2 U R2 U' R2 F' U R U' R' F';U M' U' F R U' R' F' U' r' F2 R",
        "U F2 U R2 B2 L2 D' L2 B2 R2 U2 F' U R U' R' F';U' R2 U R U R' U' R' U' R' U R2 U' F' U F R",
        "F2 D F2 U2 R2 F2 U2 F2 R2 D' F2 U2 F' U R U' R' F';R U2 R2 U' R2 U' R2 U2 R f R U R' U' f'",
        "U' F2 U' R2 F2 R2 U2 R2 F2 R2 U' F' U R U' R' F';U F U R U' R' F' r' U2 R U R' U r",
        "U F2 U2 R2 B2 L2 D' L2 B2 R2 U F' U R U' R' F';R' U' F' U F R U' r U2 R' U' R U' r'",
        "F2 R2 U R2 D' F2 D F2 U' F' U R U' R' F';R U' R' U' F U R U' R' F r U r' F",
        "B2 R2 B2 F2 D F2 R2 U F2 L2 U B2 U' F' U R U' R' F';R' U2 R U2 F R U R' U' R' U R U' F'",
        "U' F2 R2 D' L2 D L2 U' L2 U L2 R2 F' U R U' R' F';U2 R' F U' R' F R U' R U R' U F' R U R' F' R",
        "F2 U2 R2 D R2 D' F2 U R2 U2 R2 F2 U F' U R U' R' F';U' R U R' U F' r' F r F U' R U R' U' R U' R'",
        "D R2 F2 U R2 U' F2 U R2 D' F' U R U' R' F';F R' F' R U R' F' U' F U R U' R U' R'",
        "U2 L2 D R2 B2 D' L2 U R2 U2 F2 U' F2 U' F' U R U' R' F';U' F R' F' r U R U' r' U2 R' F' U' F U R",
        "L2 F2 L2 R2 D' R2 F2 U' R2 B2 U' L2 U R' U B U' B' R' y;U r' U2 R U R' U' R U R' y' R U R' U' R' U F z'",
        "F2 R2 D' L2 D R2 D' L2 D F' U R U' R' F';R2 D R' U R D' R' U' R' F R U R' U' F'",
        "D' L2 B2 U' B2 D L2 U' F2 U F' U R U' R' F';r U' r U2 R' F R U2 r2 F2 R U R' U' F'",
        "U' F2 L2 D R2 D' R2 U R2 U' L2 R2 F' U R U' R' F';F R' F' R U R' F' U' F R2 U' R' U R' U R",
        "L2 D' B2 U B2 L2 D F2 U' F' U R U' R' F';U2 r U R' U' r' F R U R U' R' U R U' R' F'",
        "U F2 U2 R2 U' L2 U R2 F2 U F2 U2 L2 U' F' U R U' R' F';U F R' F' R U R U' R' r' U2 R U R' U r",
        "U F2 L2 U R2 U' L2 B2 L2 F2 D' L2 B2 U' F' U R U' R' F';U' R' U' R' F R F' R U' R' U R' D' R U R' D R2",
        "U F2 R2 U L2 R2 B2 U' L2 F2 D' R2 F2 U' F' U R U' R' F';U2 r' U' R U' R' U' r U r' F' U' F r",
        "R2 D R2 F2 U' F2 U F2 U2 R2 D' R2 U' F' U R U' R' F';U' R U2 R2 F2 R U F U' r U2 r' F U' F'",
        "F2 L2 U R2 U' L2 U R2 U' F' U R U' R' F';U' F' r U R' U' r' F R U F R U R' U' F'",
        "U2 R2 D B2 D L2 D' R2 U2 R2 B2 D' R2 U' F' U R U' R' F';U' r U2 R' U' R U R' U2 r' U' F R F' R' U R",
        "R2 U R2 B2 D2 F2 U B2 D R2 D R2 U2 F' U R U' R' F';U2 R' F R U R' U' F' U R U' R' U' R U' R' U2 R",
        "U' F2 R2 F2 U' F2 D R2 D' R2 U R2 U' F' U R U' R' F';U R' F R F' U' F R U R' U' F' U F' U F",
        "B2 F2 D L2 U' F2 U L2 B2 U R2 U' F' U R U' R' F';F R U' R' U' R U2 R' U' R U' R' F' r' F r",
        "F2 U F2 U L2 D' B2 D' R2 B2 D2 L2 U F' U R U' R' F';U' F' r U R' U' r' F R U2 R' F' U' F U R",
        "U' F2 R2 U' L2 U R2 B2 R2 F2 D R2 B2 U F' U R U' R' F';F U2 r U2 r' U' F' U F r U r' U2 F'",
        "R2 D R2 D' F2 R2 U' R2 U F' U R U' R' F';U r' F R F' r U R' U2 F R U R' U' F'",
        "B2 F2 D L2 D' L2 U L2 U' L2 B2 U' F' U R U' R' F';F R U' R' U' R U R' F' r U2 R' U' R U' r'",
        "U F2 L2 R2 U R2 D' F2 D F2 U' L2 F' U R U' R' F';U' R' F2 R U R U2 R2 F R U' r U' r' R U' R' F",
        "L2 D R2 D R2 D2 L2 F2 U F2 U' F2 U' F' U R U' R' F';U F' U F U2 R U2 R' U2 R U' R' U' F' U F",
        "R2 U' F2 U' F2 U2 R2 U F2 U F2 U' F2 U2 F' U R U' R' F';U' R' U R U' x' U r' F r U2 r U' R' U M x",
        "U' F2 U L2 U2 F2 U' F2 R2 U' L2 U R2 U2 F' U R U' R' F';R U' R' U' F' U R U R' U' R' F U' F' U F R",
        "F2 L2 U R2 D' F2 D F2 U' L2 F2 U F2 R2 F' U R U' R' F';U2 R U' L' U R' U' L R' F' U' F U R",
        "U2 L2 D R2 D B2 R2 D2 L2 U F2 U' F2 U' F' U R U' R' F';U' R' U' R' F R F' U R U r' F R F' r U R'",
        "F2 D R2 D' L2 D R2 D' L2 F' U R U' R' F';F R2 D R' U R D' R2 U' F'",
        "U' F2 D R2 D' R2 U R2 U' R2 F' U R U' R' F';R U R' U' R' F R2 U' R' U' R U2 R' U' F'",
        "U' F2 U' L2 U R2 U' L2 U R2 F' U R U' R' F';R U R' U' R' F R U R' U' R F' R' U R",
        "F2 U F2 U' F2 L2 D' B2 U B2 L2 D U' F' U R U' R' F';F' U R U R' U R' F2 r U2 r' F R2 U' R'",
        "F2 U R2 D2 B2 D' B2 R2 U R2 D' R2 U2 F' U R U' R' F';U2 F U R' U' R U R U' R' F' U' R' U R",
        "R2 U R2 D B2 U2 L2 D' F2 U B2 R2 U' F' U R U' R' F';F R F' U' R U' R U R F' U' F R U' R",
        "F2 U F2 U2 R2 U' L2 U R2 U' L2 F2 U2 F' U R U' R' F';U R U R2 F R2 U R' U' F2 U2 F",
        "U' F2 U' R2 U2 F2 U F2 L2 U R2 U' L2 U2 F' U R U' R' F';F' U' F2 R' F2 U' F U R2 U2 R'",
        "F2 D' L2 D R2 B2 F2 U' R2 U B2 F2 R2 F' U R U' R' F';U2 R U R U' R' F U R2 U' F' R2 F R F' U R",
        "U F2 U' F2 L2 D2 R2 D' B2 D' L2 U R2 U2 F' U R U' R' F';U' R U R' U R U2 R' U2 R U2 R' U2 R' F R F'",
        "R2 B2 U B2 U' B2 U R2 D' F2 L2 D U' F' U R U' R' F';F R U R D r' U2 r D' R' U2 R' U' F'",
        "F2 U R2 U' L2 U R2 U' L2 F' U R U' R' F';U F R U' R' F R U R' U' F' U' R U2 R' U' F'",
        "U F2 U' F2 R2 U2 R2 U' F2 D R2 D' R2 U2 F' U R U' R' F';U2 R' U' R' F' R U R U R' U' R U' R' U2 F R",
        "U2 F2 L2 R2 U' L2 D F2 D' F2 U R2 F' U R U' R' F';R U' R2 F R F' U' F U R' U' F' U R2 U R'",
        "B2 D' R2 D B2 L2 U L2 U F2 U2 L2 U2 F' U R U' R' F';F U R U' R2 F' U2 R U R' U R2 U2 R'",
        "F2 D' L2 D R2 D' L2 D R2 F' U R U' R' F';U' r U R' U' r' F R F' U F R U R' U' F'",
        "D2 R2 D' F2 U L2 U2 F2 D' F2 U' B2 L2 U F' U R U' R' F';U' R U' R2 U' F' U F R U2 R U' R'",
        "U F2 D' L2 D L2 U' L2 U L2 F' U R U' R' F';F R U R' U2 R' F R2 U' R' U' R U R' F' R U R' F'"];

    var scr = frurufArray[Math.floor(Math.random() * frurufArray.length)];
    scramble = scr.split(";")[0];
    var solution = scr.split(";")[1];

    document.getElementById("scramble").innerHTML = "Scramble: " + scramble;
    document.getElementById("solution").innerHTML = "Solution: " + solution;
    document.getElementById("nextScrambleBtn").disabled = true;
    document.getElementById("nextScrambleBtn").disabled = false;
}

// Logo-easter_egg
function changePic() {
    var i = 0;
    interval = setInterval(function() {
        document.getElementById("logo").src = "kube" + i + ".png";
        i++;
        if (i > 6) {
            clearInterval(interval);
            changePicAgain();
        }
    }, 100);
}
function changePicAgain() {
    var i = 6;
    interval = setInterval(function() {
        document.getElementById("logo").src = "kube" + i + ".png";
        i--;
        if (i < 0) {
            clearInterval(interval);
        }
    }, 100);
}

// Ta tid
function timer() {
    if (timing === true) {
        var start = new Date().getTime();
        interval = setInterval(function() {
            time = new Date().getTime() - start;

            var ms = Math.floor((time % 1000) / 10);
            var s = Math.floor((time / 1000) % 60);
            var m = Math.floor((time / 60000) % 60);

            if (ms < 10) ms = "0" + ms;

            if (m === 0) {
                timeFormatted = s + "." + ms;
                document.getElementById("tid").innerHTML = s + "." + ms;
            }
            else {
                if (s < 10) s = "0" + s;
                timeFormatted = m + ":" + s + "." + ms;
                document.getElementById("tid").innerHTML = m + ":" + s + "." + ms;
            }
            // Lagre nummer, tid og scramble
            numbers[number] = parseInt(number)+1;
            localStorage.setItem("FRURUFnumbers",JSON.stringify(numbers));
            times[number] = time;
            localStorage.setItem("FRURUFtimes",JSON.stringify(times));
            formattedTimes[number] = timeFormatted;
            localStorage.setItem("FRURUFformattedTimes",JSON.stringify(formattedTimes));
            scrambles[number] = scramble;
            localStorage.setItem("FRURUFscrambles",JSON.stringify(scrambles));
        }, 10);
    }
}

// Send tid til celler
function sendTime() {
    var numberX = number;
    var node = document.createElement("tr");
    var celle1 = document.createElement("td");
    var celle2 = document.createElement("td");
    var celle3 = document.createElement("td");
    node.setAttribute("class","timeTable");
    celle1.innerHTML = numbers[numberX];
    celle1.style.textAlign = "center";
    celle1.setAttribute("class","cNr");
    celle1.onclick = function() {
        alert(timeInfos[numberX]);
    };
    celle2.innerHTML = formattedTimes[numberX];
    celle2.style.textAlign = "center";
    celle2.setAttribute("class","cTime");
    celle2.onclick = function() {
        alert(timeInfos[numberX]);
    };
    celle3.innerHTML = formattedAo5s[numberX];
    celle3.style.textAlign = "center";
    celle3.setAttribute("class","cAo5");
    celle3.onclick = function () {
        if (celle3.innerHTML !== " - ") {
            alert(ao5Infos[numberX]);
        }
    };

    node.appendChild(celle1);
    node.appendChild(celle2);
    node.appendChild(celle3);

    document.getElementById("timeList").appendChild(node);
    var list = document.getElementById("tableOverskrift");
    list.parentNode.insertBefore(node, list.nextSibling);
}

function getTimes() {
    for (var i=0; i<number; i++) {
        getTimesFunc(i);
    }
    update();
}
function getTimesFunc(i) {
    var numberX = i;
    var node = document.createElement("tr");
    var celle1 = document.createElement("td");
    var celle2 = document.createElement("td");
    var celle3 = document.createElement("td");
    node.setAttribute("class","timeTable");
    celle1.innerHTML = numbers[numberX];
    celle1.style.textAlign = "center";
    celle1.setAttribute("class","cNr");
    celle1.onclick = function() {
        alert(timeInfos[numberX]);
    };
    celle2.innerHTML = formattedTimes[numberX];
    celle2.style.textAlign = "center";
    celle2.setAttribute("class","cTime");
    celle2.onclick = function() {
        alert(timeInfos[numberX]);
    };
    celle3.innerHTML = formattedAo5s[numberX];
    celle3.style.textAlign = "center";
    celle3.setAttribute("class","cAo5");
    celle3.onclick = function () {
        if (celle3.innerHTML !== " - ") {
            alert(ao5Infos[numberX]);
        }
    };

    node.appendChild(celle1);
    node.appendChild(celle2);
    node.appendChild(celle3);

    document.getElementById("timeList").appendChild(node);
    var list = document.getElementById("tableOverskrift");
    list.parentNode.insertBefore(node, list.nextSibling);
}

// Lag info om tid
function currentTimeInfo() {
    if (number >= 1) {
        alert(timeInfos[number-1]);
    }
}

// Lag info om beste tid
function bestTimeInfo() {
    var index = indexOfBest(times);
    if (number >=1) {
        alert(timeInfos[index]);
    }
}

// Lag info om ao5
function currentAo5Info() {
    if (number >= 5) {
        alert(ao5Infos[number-1]);
    }
}

// Lag info om ao12
function currentAo12Info() {
    if (number >= 12) {
        alert(ao12Infos[number-1]);
    }
}

// Lag info om beste ao5
function bestAo5Info() {
    if (number >= 5) {
        var arr = [];
        for (var i=0; i<ao5s.length-4; i++) {
            arr[i] = ao5s[i+4];
        }
        var index = indexOfBest(arr);
        alert(ao5Infos[index+4]);
    }
}

// Lag info om beste ao12
function bestAo12Info() {
    if (number >= 12) {
        var arr = [];
        for (var i=0; i<ao12s.length-11; i++) {
            arr[i] = ao12s[i+11];
        }
        var index = indexOfBest(arr);
        alert(ao12Infos[index+11]);
    }
}

// Lag ao5
function makeAo5() {
    var snitt5 = (times[number] + times[number - 1] + times[number - 2] + times[number - 3] + times[number - 4]
        - Math.max(times[number], times[number - 1], times[number - 2], times[number - 3], times[number - 4])
        - Math.min(times[number], times[number - 1], times[number - 2], times[number - 3], times[number - 4])) / 3;

    if (number >= 4) {
        ao5s[number] = snitt5;
        localStorage.setItem("FRURUFao5s",JSON.stringify(ao5s));
        formatAo5(snitt5);
    }
    else {
        ao5s[number] = " - ";
        localStorage.setItem("FRURUFao5s",JSON.stringify(ao5s));
        formattedAo5s[number] = " - ";
        localStorage.setItem("FRURUFformattedAo5s",JSON.stringify(formattedAo5s));
    }
    makeAo5Info();
}

// Lag ao12
function makeAo12() {
    var snitt12 = ((times[number] + times[number - 1] + times[number - 2] + times[number - 3] +
        times[number - 4] + times[number - 5] + times[number - 6] + times[number - 7] +
        times[number - 8] + times[number - 9] + times[number - 10] + times[number - 11])
        - Math.max(times[number], times[number - 1], times[number - 2], times[number - 3],
            times[number - 4], times[number - 5], times[number - 6], times[number - 7],
            times[number - 8], times[number - 9], times[number - 10], times[number - 11])
        - Math.min(times[number], times[number - 1], times[number - 2], times[number - 3],
            times[number - 4], times[number - 5], times[number - 6], times[number - 7],
            times[number - 8], times[number - 9], times[number - 10], times[number - 11])) / 10;

    if (number >= 11) {
        ao12s[number] = snitt12;
        localStorage.setItem("FRURUFao12s",JSON.stringify(ao12s));
        formatAo12(snitt12);
    }
    else {
        ao12s[number] = " - ";
        localStorage.setItem("FRURUFao12s",JSON.stringify(ao12s));
        formattedAo12s[number] = " - ";
        localStorage.setItem("FRURUFformattedAo12s",JSON.stringify(formattedAo12s));
    }
    makeAo12Info();
}

// Formater ao5
function formatAo5(snitt) {
    var ms = Math.floor((snitt % 1000) / 10);
    var s = Math.floor((snitt / 1000) % 60);
    var m = Math.floor((snitt / 60000) % 60);

    if (ms < 10) ms = "0" + ms;

    if (m === 0) {
        formattedAo5s[number] = s + "." + ms;
        localStorage.setItem("FRURUFformattedAo5s",JSON.stringify(formattedAo5s));
    }
    else {
        if (s < 10) s = "0" + s;
        formattedAo5s[number] = m + ":" + s + "." + ms;
        localStorage.setItem("FRURUFformattedAo5s",JSON.stringify(formattedAo5s));
    }
}

// Formater ao12
function formatAo12(snitt) {
    var ms = Math.floor((snitt % 1000) / 10);
    var s = Math.floor((snitt / 1000) % 60);
    var m = Math.floor((snitt / 60000) % 60);

    if (ms < 10) ms = "0" + ms;

    if (m === 0) {
        formattedAo12s[number] = s + "." + ms;
        localStorage.setItem("FRURUFformattedAo12s",JSON.stringify(formattedAo12s));
    }
    else {
        if (s < 10) s = "0" + s;
        formattedAo12s[number] = m + ":" + s + "." + ms;
        localStorage.setItem("FRURUFformattedAo12s",JSON.stringify(formattedAo12s));
    }
}

// Lag ao5-info
function makeAo5Info() {
    var tid5 = formattedTimes[number];
    var tid4 = formattedTimes[number-1];
    var tid3 = formattedTimes[number-2];
    var tid2 = formattedTimes[number-3];
    var tid1 = formattedTimes[number-4];

    var nyTid5 = times[number];
    var nyTid4 = times[number-1];
    var nyTid3 = times[number-2];
    var nyTid2 = times[number-3];
    var nyTid1 = times[number-4];

    var array = [nyTid5,nyTid4,nyTid3,nyTid2,nyTid1];
    array.sort();
    var max = array[4];
    var min = array[0];

    if (nyTid5 === max) {
        tid5 = "(" + tid5 + ")";
    }
    else if (nyTid4 === max) {
        tid4 = "(" + tid4 + ")";
    }
    else if (nyTid3 === max) {
        tid3 = "(" + tid3 + ")";
    }
    else if (nyTid2 === max) {
        tid2 = "(" + tid2 + ")";
    }
    else if (nyTid1 === max) {
        tid1 = "(" + tid1 + ")";
    }

    if (nyTid5 === min) {
        tid5 = "(" + tid5 + ")";
    }
    else if (nyTid4 === min) {
        tid4 = "(" + tid4 + ")";
    }
    else if (nyTid3 === min) {
        tid3 = "(" + tid3 + ")";
    }
    else if (nyTid2 === min) {
        tid2 = "(" + tid2 + ")";
    }
    else if (nyTid1 === min) {
        tid1 = "(" + tid1 + ")";
    }
    var scramble5 = scrambles[number];
    var scramble4 = scrambles[number-1];
    var scramble3 = scrambles[number-2];
    var scramble2 = scrambles[number-3];
    var scramble1 = scrambles[number-4];

    var space = "     ";

    ao5Info = "ao5: " + formattedAo5s[number] +"\n\n" +
        "Time list:\n" +
        "1. " + tid1 + space + scramble1 + "\n" +
        "2. " + tid2 + space + scramble2 + "\n" +
        "3. " + tid3 + space + scramble3 + "\n" +
        "4. " + tid4 + space + scramble4 + "\n" +
        "5. " + tid5 + space + scramble5;

    ao5Infos[number] = ao5Info;
    localStorage.setItem("FRURUFao5Infos",JSON.stringify(ao5Infos));
}

// Lag ao12-info
function makeAo12Info() {
    var tid12 = formattedTimes[number];
    var tid11 = formattedTimes[number-1];
    var tid10 = formattedTimes[number-2];
    var tid9 = formattedTimes[number-3];
    var tid8 = formattedTimes[number-4];
    var tid7 = formattedTimes[number-5];
    var tid6 = formattedTimes[number-6];
    var tid5 = formattedTimes[number-7];
    var tid4 = formattedTimes[number-8];
    var tid3 = formattedTimes[number-9];
    var tid2 = formattedTimes[number-10];
    var tid1 = formattedTimes[number-11];

    var nyTid12 = formattedTimes[number];
    var nyTid11 = formattedTimes[number-1];
    var nyTid10 = formattedTimes[number-2];
    var nyTid9 = formattedTimes[number-3];
    var nyTid8 = formattedTimes[number-4];
    var nyTid7 = formattedTimes[number-5];
    var nyTid6 = formattedTimes[number-6];
    var nyTid5 = formattedTimes[number-7];
    var nyTid4 = formattedTimes[number-8];
    var nyTid3 = formattedTimes[number-9];
    var nyTid2 = formattedTimes[number-10];
    var nyTid1 = formattedTimes[number-11];

    var array = [nyTid12,nyTid11,nyTid10,nyTid9,nyTid8,nyTid7,nyTid6,nyTid5,nyTid4,nyTid3,nyTid2,nyTid1];
    array.sort();
    var max = array[11];
    var min = array[0];

    if (nyTid12 === max) {
        tid12 = "(" + tid12 + ")";
    }
    else if (nyTid11 === max) {
        tid11 = "(" + tid11 + ")";
    }
    else if (nyTid10 === max) {
        tid10 = "(" + tid10 + ")";
    }
    else if (nyTid9 === max) {
        tid9 = "(" + tid9 + ")";
    }
    else if (nyTid8 === max) {
        tid8 = "(" + tid8 + ")";
    }
    else if (nyTid7 === max) {
        tid7 = "(" + tid7 + ")";
    }
    else if (nyTid6 === max) {
        tid6 = "(" + tid6 + ")";
    }
    else if (nyTid5 === max) {
        tid5 = "(" + tid5 + ")";
    }
    else if (nyTid4 === max) {
        tid4 = "(" + tid4 + ")";
    }
    else if (nyTid3 === max) {
        tid3 = "(" + tid3 + ")";
    }
    else if (nyTid2 === max) {
        tid2 = "(" + tid2 + ")";
    }
    else if (nyTid1 === max) {
        tid1 = "(" + tid1 + ")";
    }

    if (nyTid12 === min) {
        tid12 = "(" + tid12 + ")";
    }
    else if (nyTid11 === min) {
        tid11 = "(" + tid11 + ")";
    }
    else if (nyTid10 === min) {
        tid10 = "(" + tid10 + ")";
    }
    else if (nyTid9 === min) {
        tid9 = "(" + tid9 + ")";
    }
    else if (nyTid8 === min) {
        tid8 = "(" + tid8 + ")";
    }
    else if (nyTid7 === min) {
        tid7 = "(" + tid7 + ")";
    }
    else if (nyTid6 === min) {
        tid6 = "(" + tid6 + ")";
    }
    else if (nyTid5 === min) {
        tid5 = "(" + tid5 + ")";
    }
    else if (nyTid4 === min) {
        tid4 = "(" + tid4 + ")";
    }
    else if (nyTid3 === min) {
        tid3 = "(" + tid3 + ")";
    }
    else if (nyTid2 === min) {
        tid2 = "(" + tid2 + ")";
    }
    else if (nyTid1 === min) {
        tid1 = "(" + tid1 + ")";
    }

    var scramble12 = scrambles[number];
    var scramble11 = scrambles[number-1];
    var scramble10 = scrambles[number-2];
    var scramble9 = scrambles[number-3];
    var scramble8 = scrambles[number-4];
    var scramble7 = scrambles[number-5];
    var scramble6 = scrambles[number-6];
    var scramble5 = scrambles[number-7];
    var scramble4 = scrambles[number-8];
    var scramble3 = scrambles[number-9];
    var scramble2 = scrambles[number-10];
    var scramble1 = scrambles[number-11];

    var space = "     ";

    ao12Info = "ao12: " + formattedAo12s[number] +"\n\n" +
        "Time list:\n" +
        "1. " + tid1 + space + scramble1 + "\n" +
        "2. " + tid2 + space + scramble2 + "\n" +
        "3. " + tid3 + space + scramble3 + "\n" +
        "4. " + tid4 + space + scramble4 + "\n" +
        "5. " + tid5 + space + scramble5 + "\n" +
        "6. " + tid6 + space + scramble6 + "\n" +
        "7. " + tid7 + space + scramble7 + "\n" +
        "8. " + tid8 + space + scramble8 + "\n" +
        "9. " + tid9 + space + scramble9 + "\n" +
        "10. " + tid10 + space + scramble10 + "\n" +
        "11. " + tid11 + space + scramble11 + "\n" +
        "12. " + tid12 + space + scramble12;

    ao12Infos[number] = ao12Info;
    localStorage.setItem("FRURUFao12Infos",JSON.stringify(ao12Infos));
}

// Lag tid-info
function makeTimeInfo() {
    timeInfos[number] = numbers[number] + ". " + formattedTimes[number] + "\n" + scrambles[number];
    localStorage.setItem("FRURUFtimeInfos",JSON.stringify(timeInfos));
}

// Registrer nåværende tid
function registerCurrentTime() {
    if (number >= 1) {
        document.getElementById("currentTid").innerHTML = formattedTimes[number-1];
    }
}

// Registrer nåværende ao5
function registerCurrentAo5() {
    if (number >= 1) {
        document.getElementById("currentAo5").innerHTML = formattedAo5s[number-1];
    }
}

// Registrer nåværende ao12
function registerCurrentAo12() {
    if (number >= 1) {
        document.getElementById("currentAo12").innerHTML = formattedAo12s[number-1];
    }
}

// Registrere beste tid
function registerBestTime() {
    var index = indexOfBest(times);
    if (number >= 1) {
        document.getElementById("bestTid").innerHTML = formattedTimes[index];
    }
}

// Registrere beste ao5
function registerBestAo5() {
    if (number >= 5) {
        var arr = [];
        for (var i=0; i<ao5s.length-4; i++) {
            arr[i] = ao5s[i+4];
        }
        var index = indexOfBest(arr);
        document.getElementById("bestAo5").innerHTML = formattedAo5s[index+4];
    }
    else {
        document.getElementById("bestAo5").innerHTML = " - ";
    }
}

// Registrere beste ao12
function registerBestAo12() {
    if (number >= 12) {
        var arr = [];
        for (var i=0; i<ao12s.length-11; i++) {
            arr[i] = ao12s[i+11];
        }
        var index = indexOfBest(arr);
        document.getElementById("bestAo12").innerHTML = formattedAo12s[index+11];
    }
    else {
        document.getElementById("bestAo12").innerHTML = " - ";
    }
}

// Finn indeks til beste
function indexOfBest(arr) {
    var best = arr[0];
    var bestIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < best) {
            bestIndex = i;
            best = arr[i];
        }
    }

    return bestIndex;
}

// Oppdater
function update() {
    registerCurrentTime();
    registerCurrentAo5();
    registerCurrentAo12();
    registerBestTime();
    registerBestAo5();
    registerBestAo12();
}

// Slett tider
function removeLastShortcut(e) {
    if (number >= 1) {
        if (e.altKey && e.keyCode === 90) {
            removeLastConfirm();
        }
    }
}
function removeLast() {
    document.getElementById("timeList").deleteRow(1);

    document.getElementById("removeLastBtn").disabled = true;
    document.getElementById("removeLastBtn").disabled = false;

    number--;
    numbers.pop();
    times.pop();
    formattedTimes.pop();
    formattedAo5s.pop();
    formattedAo12s.pop();
    ao5s.pop();
    ao12s.pop();
    scrambles.pop();
    timeInfos.pop();
    ao5Infos.pop();
    ao12Infos.pop();
    localStorage.setItem("FRURUFnumber",JSON.stringify(number));
    localStorage.setItem("FRURUFnumbers",JSON.stringify(numbers));
    localStorage.setItem("FRURUFtimes",JSON.stringify(times));
    localStorage.setItem("FRURUFformattedTimes",JSON.stringify(formattedTimes));
    localStorage.setItem("FRURUFformattedAo5s",JSON.stringify(formattedAo5s));
    localStorage.setItem("FRURUFformattedAo12s",JSON.stringify(formattedAo5s));
    localStorage.setItem("FRURUFao5s",JSON.stringify(ao5s));
    localStorage.setItem("FRURUFao12s",JSON.stringify(ao5s));
    localStorage.setItem("FRURUFscrambles",JSON.stringify(scrambles));
    localStorage.setItem("FRURUFtimeInfos",JSON.stringify(timeInfos));
    localStorage.setItem("FRURUFao5Infos",JSON.stringify(ao5Infos));
    localStorage.setItem("FRURUFao12Infos",JSON.stringify(ao5Infos));

    if (number === 0) {
        document.getElementById("currentTid").innerHTML = " - ";
        document.getElementById("bestTid").innerHTML = " - ";
        document.getElementById("currentAo5").innerHTML = " - ";
        document.getElementById("bestAo5").innerHTML = " - ";
        document.getElementById("currentAo12").innerHTML = " - ";
        document.getElementById("bestAo12").innerHTML = " - ";
        document.getElementById("removeAllBtn").disabled = true;
        document.getElementById("removeLastBtn").disabled = true;
    }
    else {
        document.getElementById("removeAllBtn").disabled = false;
        document.getElementById("removeLastBtn").disabled = false;
    }
}
function removeLastConfirm() {
    if (confirm("Remove previous time?")) {
        removeLast();
        update();
    }
    else {
        document.getElementById("removeAllBtn").disabled = true;
        document.getElementById("removeAllBtn").disabled = false;
    }
}
function removeAll() {
    for (var i=number; i>=1; i--) {
        removeLast();
    }
    numbers = [];
    times = [];
    formattedTimes = [];
    formattedAo5s = [];
    formattedAo12s = [];
    ao5s = [];
    ao12s = [];
    scrambles = [];
    timeInfos = [];
    ao5Infos = [];
    ao12Infos = [];
    localStorage.setItem("FRURUFnumbers",JSON.stringify(numbers));
    localStorage.setItem("FRURUFtimes",JSON.stringify(times));
    localStorage.setItem("FRURUFformattedTimes",JSON.stringify(formattedTimes));
    localStorage.setItem("FRURUFformattedAo5s",JSON.stringify(formattedAo5s));
    localStorage.setItem("FRURUFformattedAo12s",JSON.stringify(formattedAo5s));
    localStorage.setItem("FRURUFao5s",JSON.stringify(ao5s));
    localStorage.setItem("FRURUFao12s",JSON.stringify(ao5s));
    localStorage.setItem("FRURUFscrambles",JSON.stringify(scrambles));
    localStorage.setItem("FRURUFtimeInfos",JSON.stringify(timeInfos));
    localStorage.setItem("FRURUFao5Infos",JSON.stringify(ao5Infos));
    localStorage.setItem("FRURUFao12Infos",JSON.stringify(ao5Infos));
}
function removeAllConfirm() {
    if (confirm("Remove all times?")) {
        removeAll();
    }
    else {
        document.getElementById("removeAllBtn").disabled = true;
        document.getElementById("removeAllBtn").disabled = false;
    }
}

// Start/stopp/reset
function readyTimer(e) {
    if (e.keyCode === 32) {
        readyTouch();
    }
}
function readyTouch() {
    if (stopped === true) {
        document.getElementById("tid").innerHTML = "0.00";
        document.getElementById("tid").style.color = "lawngreen";
        document.getElementById("tid").style.textShadow = "0 0 0.5vw greenyellow";
        ready = true;
    }
}
function startTimer(e) {
    if (e.keyCode === 32) {
        startTouch();
    }
}
function startTouch() {
    time = 0;
    if (ready === true) {
        document.getElementById("tid").style.color = "black";
        document.getElementById("tid").style.textShadow = "none";
        ready = false;
        timing = true;
        stopped = false;
        timer();
    }
}
function stopTimer(e) {
    if (e.keyCode !== 27) {
        stopTouch();
    }
}
function stopTouch() {
    if (timing === true) {
        document.getElementById("tid").style.color = "black";
        document.getElementById("tid").style.textShadow = "none";
        ready = false;
        timing = false;
        stopped = true;
        clearInterval(interval);
        document.getElementById("removeAllBtn").disabled = false;
        document.getElementById("removeLastBtn").disabled = false;

        scrambleMaker();
        makeTimeInfo();
        makeAo5();
        makeAo12();
        makeAo5Info();
        makeAo12Info();

        sendTime();

        number++;
        localStorage.setItem("FRURUFnumber",JSON.stringify(number));
        update();
    }
}
function resetDisplay(e) {
    if (e.keyCode === 27) {
        if (stopped === true) {
            document.getElementById("tid").innerHTML = "0.00";
        }
    }
}
function cancelSolve(e) {
    if (e.keyCode === 27) {
        if (timing === true) {
            document.getElementById("tid").innerHTML = "0.00";
            document.getElementById("tid").style.color = "black";
            document.getElementById("tid").style.textShadow = "none";
            ready = false;
            timing = false;
            stopped = true;
            clearInterval(interval);
            document.getElementById("removeAllBtn").disabled = false;
            document.getElementById("removeLastBtn").disabled = false;
        }
    }
}
function nextScrambleShortcut(e) {
    if (e. altKey && e.keyCode === 39) {
        scrambleMaker();
    }
}

// Ved oppstart
window.onload=function() {
    if (screen.height > screen.width) {
        document.location = "timerMob.html";
    }
    if (number !== 0) {
        getTimes();
    }
    else {
        document.getElementById("removeAllBtn").disabled = true;
        document.getElementById("removeLastBtn").disabled = true;
    }
    document.getElementById("grid").addEventListener("contextmenu", function(e) { e.preventDefault(); });
    scrambleMaker();
    document.getElementById("tid").click();

    document.addEventListener("keydown", readyTimer, false);
    document.addEventListener("keyup", startTimer, false);
    document.addEventListener("keypress", stopTimer, false);
    document.addEventListener("keydown", resetDisplay, false);
    document.addEventListener("keydown", removeLastShortcut, false);
    document.addEventListener("keydown", cancelSolve, false);
    document.addEventListener("keydown", nextScrambleShortcut, false);
    document.getElementById("midGrid").addEventListener("touchstart", readyTouch, false);
    document.getElementById("midGrid").addEventListener("touchend", startTouch, false);
    document.getElementById("html").addEventListener("touchstart", stopTouch, false);
};
window.onorientationchange = function() {
    document.location = "timerMob.html";
    if (number !== 0) {
        getTimes();
    }
};