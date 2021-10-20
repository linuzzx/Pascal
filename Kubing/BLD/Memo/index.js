let letters = "abcdefghijklmnopqrstuvwx".toUpperCase().split("");
const numOfLetters3BLD = 20;
const numOfLetters4BLD = 46;
const numOfLetters5BLD = 86;
let first = false;
let start = 0;
let interval = null;
let time = "00.00";
let edgeBuffer = localStorage.getItem("edgeBuffer") || "UF";
let cornerBuffer = localStorage.getItem("cornerBuffer") || "UFR";
let letterSchemeOption = localStorage.getItem("letterSchemeOption") || "Speffz";
let cubeType = localStorage.getItem("cubeType") || "3BLD";
let numOfCubes = localStorage.getItem("numOfCubes") || 2;
let grouping = localStorage.getItem("grouping") || "1";
let checkable = false;

let edgeSolution = [];
let edgesSol = [];
let edgesFlipped = [];
let cornerSolution = [];
let cornersSol = [];
let cornersTwisted = [];

$(function() {
    $("#inpMemo").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            checkMemo();
        }
    });
    const fontSize = ($("#options").css("font-size").split("px")[0] * 0.75)

    $("#inpMemo").css("font-size", fontSize);

    getOptions();
    adjustSize();
});
        
$(window).resize(function(){
    adjustSize();
});

function getMemo() {
    let memo = "";
    edgesFlipped = [];
    edgesSol = [];
    cornersTwisted = [];
    cornersSol = [];

    if (cubeType === "3BLD") {
        scrambleCube();
        
        edgeSolution = getEdgeSolution();
        cornerSolution = getCornerSolution();

        edgesSol = edgeSolution.slice(0);

        edgesFlipped = [];
        if (edgeSolution.join(" ").includes(";")) {
            edgesSol = edgeSolution.slice(0, edgeSolution.indexOf(";"));
            edgesFlipped = edgeSolution.slice(edgeSolution.indexOf(";")+1);
        }

        cornersSol = cornerSolution.slice(0);

        cornersTwisted = [];
        if (cornerSolution.join(" ").includes(";")) {
            cornersSol = cornerSolution.slice(0, cornerSolution.indexOf(";"));
            cornersTwisted = cornerSolution.slice(cornerSolution.indexOf(";")+1);
        }

        for (let i=0; i<edgesSol.length; i++) {
            memo += edgesSol[i] + ((i+1) % grouping === 0 ? " ":"");
        }
        memo = memo.trim() + " ";
        for (let e of edgesFlipped) {
            if (e !== "") {
                memo += "("+e+")";
            }
        }
        memo = memo.trim() + " ";
        for (let i=0; i<cornersSol.length; i++) {
            memo += cornersSol[i] + ((i+1) % grouping === 0 ? " ":"");
        }
        memo = memo.trim() + " ";
        for (let c of cornersTwisted) {
            if (c !== "") {
                memo += "("+c+")";
            }
        }
        memo = memo.trim();
    }
    else if (cubeType === "4BLD") {
        for (let i=0; i<numOfLetters4BLD; i++) {
            for (let j=0; j<numOfLetters; j++) {
                memo += letters[Math.floor(Math.random() * letters.length)] + ((j+1) % grouping === 0 ? " ":"");
            }
        }
    }
    else if (cubeType === "5BLD") {
        for (let i=0; i<numOfLetters5BLD; i++) {
            for (let j=0; j<numOfLetters; j++) {
                memo += letters[Math.floor(Math.random() * letters.length)] + ((j+1) % grouping === 0 ? " ":"");
            }
        }
    }
    else if (cubeType === "MBLD") {
        for (let i=0; i<numOfCubes; i++) {
            scrambleCube();
            
            edgeSolution = getEdgeSolution();
            cornerSolution = getCornerSolution();

            let eSol = edgeSolution.slice(0);
            let eFlipped = [];
            if (edgeSolution.join(" ").includes(";")) {
                eSol = edgeSolution.slice(0, edgeSolution.indexOf(";"));
                eFlipped = edgeSolution.slice(edgeSolution.indexOf(";")+1);
            }
            edgesSol.push(eSol);
            edgesFlipped.push(eFlipped);

            let cSol = cornerSolution.slice(0);
            let cTwisted = [];
            if (cornerSolution.join(" ").includes(";")) {
                cSol = cornerSolution.slice(0, cornerSolution.indexOf(";"));
                cTwisted = cornerSolution.slice(cornerSolution.indexOf(";")+1);
            }
            cornersSol.push(cSol);
            cornersTwisted.push(cTwisted);

            for (let j=0; j<edgesSol[i].length; j++) {
                memo += edgesSol[i][j] + ((j+1) % grouping === 0 ? " ":"");
            }
            memo = memo.trim() + " ";
            for (let e of edgesFlipped[i]) {
                if (e !== "") {
                    memo += "("+e+")";
                }
            }
            memo = memo.trim() + " ";
            for (let j=0; j<cornersSol[i].length; j++) {
                memo += cornersSol[i][j] + ((j+1) % grouping === 0 ? " ":"");
            }
            memo = memo.trim() + " ";
            for (let c of cornersTwisted[i]) {
                if (c !== "") {
                    memo += "("+c+")";
                }
            }
            memo = memo.trim()+"<br>";
        }
    }

    $("#options").html(memo);
    $("#memo").html("");

    first = true;
    startTimer();
    $("#inpMemo").focus();
}

function showMemo() {
    $("#options").css("visibility","visible");
    adjustSize();
}

function hideMemo() {
    $("#options").css("visibility","hidden");
        $("#memo").html("");
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
        if (cubeType === "MBLD") {
            const success = $("#inpMemo").val().toUpperCase().trim().split(" ").join("").replaceAll("(","").replaceAll(")","") === 
                        $("#options").text().toUpperCase().split(" ").join("").replaceAll("(","").replaceAll(")","");
            let out = "<div><br>";
            let inpMemo = $("#inpMemo").val().toUpperCase().trim().split(" ").join("").replaceAll("(","").replaceAll(")","").split("");
            let memos = ($("#options").html().replaceAll("<br>","/").toUpperCase().trim().split(" ").join("").replaceAll("(","").replaceAll(")","")+"_").replaceAll("/_"," ").trim().split("/");
            
            console.log($("#inpMemo").val());

            //edgesFlipped = edgesFlipped.join("").split("");
            //cornersTwisted = cornersTwisted.join("").split("");

            let firstMemo = true;
            let i = 0;
            
            for (let j=0; j<numOfCubes; j++) {
                if (!firstMemo) {
                    out += "<br>";
                }

                let ii = 0;

                let ie = 0;
                let ief = 0;
                let ic = 0;
                let ict = 0;
    
                let firstEF = true;
                let firstC = true;
                let firstCT = true;

                let memo = memos[j].split("");

                console.log(memo);

                for (let m of memo) {
                    if (edgesSol[j] && ie<edgesSol[j].length) {
                        if (inpMemo[i]) {
                            if (inpMemo[i] === edgesSol[j][ie]) {
                                out += "<e style='color: green'>"+m + ((ie+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                            else {
                                out += "<e style='color: red'>"+m + ((ie+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                        }
                        else {
                            out += "<e>"+m + ((ie+1) % grouping === 0 ? " ":"")+"</e>";
                        }
                        
                        ie++;
                    }
                    else if (edgesFlipped[j].join("").split("") && ief<edgesFlipped[j].join("").split("").length) {
                        if (firstEF) {
                            ii % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
                            firstEF = false;
                        }
                        if (inpMemo[i]) {
                            if (inpMemo[i] === edgesFlipped[j].join("").split("")[ief]) {
                                out += "<e style='color: green'>"+m + ((ief+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                            else {
                                out += "<e style='color: red'>"+m + ((ief+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                        }
                        else {
                            out += "<e>"+m + ((ief+1) % grouping === 0 ? " ":"")+"</e>";
                        }
                        
                        ief++;
                    }
                    else if (cornersSol[j].join("").split("") && ic<cornersSol[j].join("").split("").length) {
                        if (firstC) {
                            ii % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
                            firstC = false;
                        }
                        if (inpMemo[i]) {
                            if (inpMemo[i].toLowerCase() === cornersSol[j].join("").split("")[ic]) {
                                out += "<e style='color: green'>"+m.toLowerCase() + ((ic+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                            else {
                                out += "<e style='color: red'>"+m.toLowerCase() + ((ic+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                        }
                        else {
                            out += "<e>"+m.toLowerCase() + ((ic+1) % grouping === 0 ? " ":"")+"</e>";
                        }
                        
                        ic++;
                    }
                    else if (cornersTwisted[j].join("").split("") && ict<cornersTwisted[j].join("").split("").length) {
                        if (firstCT) {
                            ii % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
                            firstCT = false;
                        }
                        if (inpMemo[i]) {
                            if (inpMemo[i].toLowerCase() === cornersTwisted[j].join("").split("")[ict]) {
                                out += "<e style='color: green'>"+m.toLowerCase() + ((ict+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                            else {
                                out += "<e style='color: red'>"+m.toLowerCase() + ((ict+1) % grouping === 0 ? " ":"")+"</e>";
                            }
                        }
                        else {
                            out += "<e>"+m.toLowerCase() + ((ict+1) % grouping === 0 ? " ":"")+"</e>";
                        }
                        
                        ict++;
                    }

                    i++;
                    ii++;
                }
                firstMemo = false;
            }
            let fullMemo = ($("#options").html().replaceAll("<br>","").toUpperCase().trim().split(" ").join("").replaceAll("(","").replaceAll(")",""));
            if (inpMemo.length > fullMemo.length) {
                i % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
                for (let j=fullMemo.length; j<inpMemo.length; j++) {
                    out += "<e style='color: orange; font-style: italic'>"+inpMemo[j] + ((j+1) % grouping === 0 ? " ":"")+"</e>";
                }
            }

            out += "</div>";

            if (success) {
                out += "<br><p style='color: green'>Success!<br>"+getTime(time)+"</p>";
            }
            else {
                out += "<br><p style='color: red'>DNF<br>("+getTime(time)+")</p>";
            }

            $("#memo").html(out);

            $("#inpMemo").val("");

            getOptions();
            checkable = false;
        }
        else {
            const success = $("#inpMemo").val().toUpperCase().trim().split(" ").join("").replaceAll("(","").replaceAll(")","") === 
                        $("#options").text().toUpperCase().split(" ").join("").replaceAll("(","").replaceAll(")","");
            let out = "<div><br>";
            let inpMemo = $("#inpMemo").val().toUpperCase().trim().split(" ").join("").replaceAll("(","").replaceAll(")","").split("");
            let memo = $("#options").text().toUpperCase().trim().split(" ").join("").replaceAll("(","").replaceAll(")","").split("");

            edgesFlipped = edgesFlipped.join("").split("");
            cornersTwisted = cornersTwisted.join("").split("");
            
            let i = 0;
            let ie = 0;
            let ief = 0;
            let ic = 0;
            let ict = 0;

            let firstEF = true;
            let firstC = true;
            let firstCT = true;

            for (let m of memo) {
            if (ie<edgesSol.length) {
                if (inpMemo[i]) {
                    if (inpMemo[i] === edgesSol[ie]) {
                        out += "<e style='color: green'>"+m + ((ie+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                    else {
                        out += "<e style='color: red'>"+m + ((ie+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                }
                else {
                    out += "<e>"+m + ((ie+1) % grouping === 0 ? " ":"")+"</e>";
                }
                
                ie++;
            }
            else if (ief<edgesFlipped.length) {
                if (firstEF) {
                    i % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
                    firstEF = false;
                }
                if (inpMemo[i]) {
                    if (inpMemo[i] === edgesFlipped[ief]) {
                        out += "<e style='color: green'>"+m + ((ief+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                    else {
                        out += "<e style='color: red'>"+m + ((ief+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                }
                else {
                    out += "<e>"+m + ((ief+1) % grouping === 0 ? " ":"")+"</e>";
                }
                
                ief++;
            }
            else if (ic<cornersSol.length) {
                if (firstC) {
                    i % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
                    firstC = false;
                }
                if (inpMemo[i]) {
                    if (inpMemo[i].toLowerCase() === cornersSol[ic]) {
                        out += "<e style='color: green'>"+m.toLowerCase() + ((ic+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                    else {
                        out += "<e style='color: red'>"+m.toLowerCase() + ((ic+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                }
                else {
                    out += "<e>"+m.toLowerCase() + ((ic+1) % grouping === 0 ? " ":"")+"</e>";
                }
                
                ic++;
            }
            else if (ict<cornersTwisted.length) {
                if (firstCT) {
                    i % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
                    firstCT = false;
                }
                if (inpMemo[i]) {
                    if (inpMemo[i].toLowerCase() === cornersTwisted[ict]) {
                        out += "<e style='color: green'>"+m.toLowerCase() + ((ict+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                    else {
                        out += "<e style='color: red'>"+m.toLowerCase() + ((ict+1) % grouping === 0 ? " ":"")+"</e>";
                    }
                }
                else {
                    out += "<e>"+m.toLowerCase() + ((ict+1) % grouping === 0 ? " ":"")+"</e>";
                }
                
                ict++;
            }

            i++;
            }

            if (inpMemo.length > memo.length) {
            i % 2 === 1 ? out += "<e>&nbsp</e>": out += "";
            for (let j=memo.length; j<inpMemo.length; j++) {
                out += "<e style='color: orange; font-style: italic'>"+inpMemo[j] + ((j+1) % grouping === 0 ? " ":"")+"</e>";
            }
            }

            out += "</div>";

            if (success) {
            out += "<br><p style='color: green'>Success!<br>"+getTime(time)+"</p>";
            }
            else {
            out += "<br><p style='color: red'>DNF<br>("+getTime(time)+")</p>";
            }

            $("#memo").html(out);

            $("#inpMemo").val("");

            getOptions();
            checkable = false;
        }
    }
}

function getOptions() {
    let numOfCubesOption = "";
    for (let i=2; i<= 100; i++) {
        numOfCubesOption += "<option value='"+i+"'>"+i+"</option>";
    }
    const options = "<label for='selectEdgeBuffer'>Edge buffer&nbsp<select id='selectEdgeBuffer' onchange='setEdgeBuffer(this.value)'><option value='UF'>UF</option><option value='DF'>DF</option></select>&nbsp</label>"+
                    "<label for='selectCornerBuffer'>Corner buffer&nbsp<select id='selectCornerBuffer' onchange='setCornerBuffer(this.value)'><option value='UFR'>UFR</option><option value='UBL'>UBL</option></select>&nbsp</label>"+
                    "<label for='selectLetterScheme'>Letter scheme&nbsp<select id='selectLetterScheme' onchange='setLetterScheme(this.value)'><option value='Speffz'>Speffz</option><option value='Einar'>Einar's scheme</option></select>&nbsp</label>"+
                    "<label for='selectCubeType'>Event&nbsp<select id='selectCubeType' onchange='setCubeType(this.value)'><option value='3BLD'>3BLD</option><option value='4BLD'>4BLD (Not finished)</option><option value='5BLD'>5BLD (Not finished)</option><option>MBLD</option></select>&nbsp</label>"+
                    "<label for='selectNumOfCubes'>Cubes (MBLD)&nbsp<select id='selectNumOfCubes' onchange='setNumOfCubes(this.value)'>"+numOfCubesOption+"</select>&nbsp</label>"+
                    "<label for='selectGrouping'>Grouping&nbsp</label><select id='selectGrouping' onchange='setGrouping(this.value)'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select>&nbsp</label>"+
                    "<br><button class='btn btn-secondary' onclick='getMemo()'>Start</button>";
    
    $("#options").html(options);

    $("#selectEdgeBuffer").val(edgeBuffer);
    $("#selectCornerBuffer").val(cornerBuffer);
    $("#selectLetterScheme").val(letterSchemeOption);
    $("#selectCubeType").val(cubeType);
    $("#selectNumOfCubes").val(numOfCubes);
    $("#selectGrouping").val(grouping);

    changeEdgeBuffer(edgeBuffer);
    changeCornerBuffer(cornerBuffer);
    changeLetterScheme(letterSchemeOption);

    $("#btnCheck").prop("disabled", true);

    showMemo();
}

function setEdgeBuffer(eb) {
    edgeBuffer = eb;
    localStorage.setItem("edgeBuffer", edgeBuffer);

    changeEdgeBuffer(eb);
}

function setCornerBuffer(cb) {
    cornerBuffer = cb;
    localStorage.setItem("cornerBuffer", cornerBuffer);

    changeCornerBuffer(cb);
}

function setLetterScheme(ls) {
    letterSchemeOption = ls;
    localStorage.setItem("letterSchemeOption", letterSchemeOption);

    changeLetterScheme(ls);
}

function setCubeType(ct) {
    cubeType = ct;
    localStorage.setItem("cubeType", cubeType);
}

function setNumOfCubes(noc) {
    numOfCubes = noc;
    localStorage.setItem("numOfCubes", numOfCubes);
}

function setGrouping(g) {
    grouping = g;
    localStorage.setItem("grouping", grouping);
}

function adjustSize() {
    const inpFontSize = $("#btnCheck").css("font-size").split("px")[0]*1.5;

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