let letters = "abcdefghijklmnopqrstuvwx".toUpperCase().split("");
let numOfCubes = 1;
const numOfLetters3BLD = 20;
const numOfLetters4BLD = 46;
const numOfLetters5BLD = 86;
let first = false;
let start = 0;
let interval = null;
let time = "00.00";
let cubeType = localStorage.getItem("cubeType") || "3BLD";
let grouping = localStorage.getItem("grouping") || "1";
let checkable = false;

$(function() {
    $("#inpMemo").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            checkMemo();
        }
    });
    const fontSize = ($("#memo").css("font-size").split("px")[0] * 0.75)

    $("#inpMemo").css("font-size", fontSize);

    getOptions();
    adjustSize();
});
        
$(window).resize(function(){
    adjustSize();
});

function getMemo() {
    let memo = "";
    let numOfLetters = 0;
    if (cubeType === "3BLD") {
        numOfLetters = numOfLetters3BLD;
    }
    else if (cubeType === "4BLD") {
        numOfLetters = numOfLetters4BLD;
    }
    else if (cubeType === "5BLD") {
        numOfLetters = numOfLetters5BLD;
    }

    //Fiks dette
    if (cubeType === "x3BLD") {
        const sol = getSolution();
        for (let i=0; i<sol.length; i++) {
            if (sol[i].includes("(")) {
                memo += sol[i] + " ";
            }
            else {
                memo += sol[i] + ((i+1) % grouping === 0 ? " ":"");
            }
        }
    }
    else {
        for (let i=0; i<numOfCubes; i++) {
            for (let j=0; j<numOfLetters; j++) {
                memo += letters[Math.floor(Math.random() * letters.length)] + ((j+1) % grouping === 0 ? " ":"");
            }
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
    adjustSize();
}

function hideMemo() {
    $("#memo").css("visibility","hidden");
        $("#result").html("");
}

function startRecon() {
    if (first) {
        first = false;
        hideMemo();
        stopTimer();
        $("#btnCheck").prop("disabled", false);

        checkable = true;
    }
}

function checkMemo() {
    if (checkable) {
        const success = $("#inpMemo").val().toUpperCase().trim().split(" ").join("") === $("#memo").text().toUpperCase().split(" ").join("");
        let out = "<div><br>";
        let inpMemo = $("#inpMemo").val().toUpperCase().trim().split(" ").join("").split("");
        let memo = $("#memo").text().toUpperCase().trim().split(" ").join("").split("");

        while (memo.length < inpMemo.length) {
            memo.push("");
        }

        for (let i=0; i<memo.length; i++) {
            if (inpMemo[i]) {
                if (inpMemo[i] === memo[i]) {
                    
                    out += "<e style='color: green'>"+memo[i] + ((i+1) % grouping === 0 ? " ":"")+"</e>";
                }
                else {
                    out += "<e style='color: red'>"+memo[i] + ((i+1) % grouping === 0 ? " ":"")+"</e>";
                }
            }
            else {
                out += "<e>"+memo[i] + ((i+1) % grouping === 0 ? " ":"")+"</e>";
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

        getOptions();
        checkable = false;
    }
}

function getOptions() {
    const options = "<label for='selectCubeType'>Event&nbsp<select id='selectCubeType' onchange='setCubeType(this.value)'><option value='3BLD'>3BLD</option><option value='4BLD'>4BLD</option><option value='5BLD'>5BLD</option></select>&nbsp</label>"+
                    "<label for='selectGrouping'>Grouping&nbsp</label><select id='selectGrouping' onchange='setGrouping(this.value)'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select>&nbsp</label>"+
                    "<button class='btn btn-secondary' onclick='getMemo()'>Start</button>";
    
    $("#memo").html(options);

    $("#selectCubeType").val(cubeType);
    $("#selectGrouping").val(grouping);

    $("#btnCheck").prop("disabled", true);

    showMemo();
}

function setCubeType(ct) {
    cubeType = ct;
    localStorage.setItem("cubeType", cubeType);
}

function setGrouping(g) {
    grouping = g;
    localStorage.setItem("grouping", grouping);
}

function adjustSize() {
    const inpFontSize = $("#btnCheck").css("font-size").split("px")[0]*1.5;
    
    /*if ($("#content").width() > $("#content").height()) {
        $("#inpMemo").css("width", "50%");
    }
    else {
        $("#inpMemo").css("width", "80%");
    }*/

    $("#inpMemo").css("width", "80%");
    $("#selectCubeType").css("font-size", inpFontSize);
    $("#selectGrouping").css("font-size", inpFontSize);
    $("label").css("font-size", inpFontSize);
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