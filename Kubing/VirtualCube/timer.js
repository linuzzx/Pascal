// Variabler
/*var ready = false;
var timing = false;
var stopped = true;
var interval;
var number = JSON.parse(localStorage.getItem("number")) || 0;
var time;
var timeFormatted;
var scramble;
var ao5Info;
var ao12Info;
var drawScrambleArray = [];
var numbers = JSON.parse(localStorage.getItem("numbers")) || [];
var times = JSON.parse(localStorage.getItem("times")) || [];
var formattedTimes = JSON.parse(localStorage.getItem("formattedTimes")) || [];
var ao5s = JSON.parse(localStorage.getItem("ao5s")) || [];
var ao12s = JSON.parse(localStorage.getItem("ao12s")) || [];
var formattedAo5s = JSON.parse(localStorage.getItem("formattedAo5s")) || [];
var formattedAo12s = JSON.parse(localStorage.getItem("formattedAo12s")) || [];
var scrambles = JSON.parse(localStorage.getItem("scrambles")) || [];
var timeInfos = JSON.parse(localStorage.getItem("timeInfos")) || [];
var ao5Infos = JSON.parse(localStorage.getItem("ao5Infos")) || [];
var ao12Infos = JSON.parse(localStorage.getItem("ao12Infos")) || [];*/

// Lag scramble
function scrambleMaker() {
    scramble = "";
    var trekkArray = ["R", "L", "F", "B", "U", "D"];
    var tilleggArray = ["", "'", "2"];
    var antallTrekkArray = [19, 20, 21];
    var antallTrekk = antallTrekkArray[Math.floor(Math.random() * antallTrekkArray.length)];
    var scrambleArray = [];

    for (var i=0; i<antallTrekk; i++) {
        if (scrambleArray.length < 1) { //Sjekker om array er tomt
            scrambleArray[i] = trekkArray[Math.floor(Math.random() * trekkArray.length)];
        }
        else if (scrambleArray.length >= 1) {
            var like = true;
            while (like === true) {
                var trekk1 = trekkArray[Math.floor(Math.random() * trekkArray.length)];
                scrambleArray[i] = trekk1;

                if (scrambleArray[i] === trekkArray[0]) {        //R
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[1]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[0]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[1]) {   //L
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[0]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[1]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[2]) {   //F
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[3]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[2]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[3]) {   //B
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[2]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[3]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[4]) {   //U
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[5]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[4]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[5]) {   //D
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[4]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[5]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
            }
        }
    }

    drawScrambleArray2.length = 0;
    for (var j=0; j<scrambleArray.length; j++) {
        scramble += scrambleArray[j] + tilleggArray[Math.floor(Math.random() * tilleggArray.length)] + " ";

        drawScrambleArray2[j] = scramble.split(" ")[j];
    }

    document.getElementById("scramble").innerHTML = scramble;
    
    draw(scramble);
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
            localStorage.setItem("numbers",JSON.stringify(numbers));
            times[number] = time;
            localStorage.setItem("times",JSON.stringify(times));
            formattedTimes[number] = timeFormatted;
            localStorage.setItem("formattedTimes",JSON.stringify(formattedTimes));
            scrambles[number] = scramble;
            localStorage.setItem("scrambles",JSON.stringify(scrambles));
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
        kopier(formattedTimes[numberX] + "   " + scrambles[numberX]);
    };
    celle2.innerHTML = formattedTimes[numberX];
    celle2.style.textAlign = "center";
    celle2.setAttribute("class","cTime");
    celle2.onclick = function() {
        alert(timeInfos[numberX]);
        kopier(formattedTimes[numberX] + "   " + scrambles[numberX]);
    };
    celle3.innerHTML = formattedAo5s[numberX];
    celle3.style.textAlign = "center";
    celle3.setAttribute("class","cAo5");
    celle3.onclick = function () {
        if (celle3.innerHTML !== " - ") {
            alert(ao5Infos[numberX]);
            kopier(ao5Infos[numberX]);
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
        kopier(formattedTimes[number-1] + "   " + scrambles[number-1]);
    }
}

// Lag info om beste tid
function bestTimeInfo() {
    var index = indexOfBest(times);
    if (number >=1) {
        alert(timeInfos[index]);
        kopier(formattedTimes[index] + "   " + scrambles[index]);
    }
}

// Lag info om ao5
function currentAo5Info() {
    if (number >= 5) {
        alert(ao5Infos[number-1]);
        kopier(ao5Infos[number-1]);
    }
}

// Lag info om ao12
function currentAo12Info() {
    if (number >= 12) {
        alert(ao12Infos[number-1]);
        kopier(ao12Infos[number-1]);
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
        kopier(ao5Infos[index+4]);
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
        kopier(ao12Infos[index+11]);
    }
}

// Lag ao5
function makeAo5() {
    var snitt5 = (times[number] + times[number - 1] + times[number - 2] + times[number - 3] + times[number - 4]
        - Math.max(times[number], times[number - 1], times[number - 2], times[number - 3], times[number - 4])
        - Math.min(times[number], times[number - 1], times[number - 2], times[number - 3], times[number - 4])) / 3;

    if (number >= 4) {
        ao5s[number] = snitt5;
        localStorage.setItem("ao5s",JSON.stringify(ao5s));
        formatAo5(snitt5);
    }
    else {
        ao5s[number] = " - ";
        localStorage.setItem("ao5s",JSON.stringify(ao5s));
        formattedAo5s[number] = " - ";
        localStorage.setItem("formattedAo5s",JSON.stringify(formattedAo5s));
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
        localStorage.setItem("ao12s",JSON.stringify(ao12s));
        formatAo12(snitt12);
    }
    else {
        ao12s[number] = " - ";
        localStorage.setItem("ao12s",JSON.stringify(ao12s));
        formattedAo12s[number] = " - ";
        localStorage.setItem("formattedAo12s",JSON.stringify(formattedAo12s));
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
        localStorage.setItem("formattedAo5s",JSON.stringify(formattedAo5s));
    }
    else {
        if (s < 10) s = "0" + s;
        formattedAo5s[number] = m + ":" + s + "." + ms;
        localStorage.setItem("formattedAo5s",JSON.stringify(formattedAo5s));
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
        localStorage.setItem("formattedAo12s",JSON.stringify(formattedAo12s));
    }
    else {
        if (s < 10) s = "0" + s;
        formattedAo12s[number] = m + ":" + s + "." + ms;
        localStorage.setItem("formattedAo12s",JSON.stringify(formattedAo12s));
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
    localStorage.setItem("ao5Infos",JSON.stringify(ao5Infos));
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
    localStorage.setItem("ao12Infos",JSON.stringify(ao12Infos));
}

// Lag tid-info
function makeTimeInfo() {
    timeInfos[number] = numbers[number] + ". " + formattedTimes[number] + "\n" + scrambles[number];
    localStorage.setItem("timeInfos",JSON.stringify(timeInfos));
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
    localStorage.setItem("number",JSON.stringify(number));
    localStorage.setItem("numbers",JSON.stringify(numbers));
    localStorage.setItem("times",JSON.stringify(times));
    localStorage.setItem("formattedTimes",JSON.stringify(formattedTimes));
    localStorage.setItem("formattedAo5s",JSON.stringify(formattedAo5s));
    localStorage.setItem("formattedAo12s",JSON.stringify(formattedAo5s));
    localStorage.setItem("ao5s",JSON.stringify(ao5s));
    localStorage.setItem("ao12s",JSON.stringify(ao5s));
    localStorage.setItem("scrambles",JSON.stringify(scrambles));
    localStorage.setItem("timeInfos",JSON.stringify(timeInfos));
    localStorage.setItem("ao5Infos",JSON.stringify(ao5Infos));
    localStorage.setItem("ao12Infos",JSON.stringify(ao5Infos));

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
    localStorage.setItem("numbers",JSON.stringify(numbers));
    localStorage.setItem("times",JSON.stringify(times));
    localStorage.setItem("formattedTimes",JSON.stringify(formattedTimes));
    localStorage.setItem("formattedAo5s",JSON.stringify(formattedAo5s));
    localStorage.setItem("formattedAo12s",JSON.stringify(formattedAo5s));
    localStorage.setItem("ao5s",JSON.stringify(ao5s));
    localStorage.setItem("ao12s",JSON.stringify(ao5s));
    localStorage.setItem("scrambles",JSON.stringify(scrambles));
    localStorage.setItem("timeInfos",JSON.stringify(timeInfos));
    localStorage.setItem("ao5Infos",JSON.stringify(ao5Infos));
    localStorage.setItem("ao12Infos",JSON.stringify(ao5Infos));
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
function startTimer2(e) {
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
function stopTimer2(e) {
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
        localStorage.setItem("number",JSON.stringify(number));
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

// Kopier
function kopier(kopi) {
    var inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.value = kopi;
    inp.select();
    document.execCommand('copy',false);
    inp.remove();
}

// Ved oppstart
window.onload=function() {
    //document.getElementById("grid").addEventListener("contextmenu", function(e) { e.preventDefault(); });
    //scrambleMaker();
    /*document.getElementById("tid").click();

    document.addEventListener("keydown", readyTimer, false);
    document.addEventListener("keyup", startTimer, false);
    document.addEventListener("keypress", stopTimer, false);
    document.addEventListener("keydown", resetDisplay, false);
    document.addEventListener("keydown", removeLastShortcut, false);
    document.addEventListener("keydown", cancelSolve, false);
    document.addEventListener("keydown", nextScrambleShortcut, false);
    document.getElementById("midGrid").addEventListener("touchstart", readyTouch, false);
    document.getElementById("midGrid").addEventListener("touchend", startTouch, false);
    document.getElementById("html").addEventListener("touchstart", stopTouch, false);*/
};