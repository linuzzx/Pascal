let currentAlgset = localStorage.getItem("currentAlgset") || 0;
let nextAlg = 0;
let algList = [];
let currentAlg = "";

$(function() {
    showContent();
    draw("");
    
    getCustomAlgs();
    listCases();
    setAlgset(currentAlgset);
    adjustSize();

    $(window).keypress(function(e) {
        keyListener(e.keyCode);
    });
});

$(window).resize(function(){
    adjustSize();
});

function showContent() {
    let out = "";
    const select = "<div><label for='selectAlgset'>Choose algset</label><select id='selectAlgset' onchange='setAlgset(this.value)'></select></div>";
    const cubeDiv = "<div id='cubeDisplay'><h1 id='setupAlg'></h1><canvas id='cubeCanvas' width='400' height='400' style='margin: auto;'></canvas><button onclick='showSolution()'>Show solution</button><h1 id='solutionAlg'></h1></div>";

    if ($(window).width() >= $(window).height()) {
        //out = cubeDiv + select;
        $("#content").css("grid-template-columns", "3fr 1fr");
    }
    else {
        //out = select + cubeDiv;
        $("#content").css("grid-template-columns", "1fr");
    }
    //$("#content").html(out);
}

function listCases() {

    let out = "";

    let i = 0;
    for (let a of algs) {
        out += "<option value='"+i+"'>"+a.name+"</option>";
        i++;
    }

    $("#selectAlgset").append(out);

    $("#selectAlgset").val(currentAlgset);
}

function setAlgset(algset) {
    localStorage.setItem("currentAlgset", algset);
    currentAlgset = algset;
    
    if (algs[algset].name !== "Custom") {
        const cbCount = Object.keys(algs[algset]).length;
        let out = "";
        
        for (let i=1; i<cbCount; i++) {
            out += "<label>"+i+"<input type='checkbox' value='"+i+"' onchange='setSubsets()'></label>";
        }

        $("#cbSubsetDiv").html(out);
    }
    else {
        $("#cbSubsetDiv").html("<button id='btnRemoveAllCustom' onclick='removeAllCustomAlgs()'>Remove all from custom</button>");
    }

    adjustSize();
    setSubsets();
}

function setSubsets() {
    const algset = localStorage.getItem("currentAlgset") || 0;
    let checkedCBs = [];
    algList = [];

    for (let c of $("#cbSubsetDiv input:checked")) {
        checkedCBs.push(c.value);
    }
    
    if (checkedCBs.length === 0) {
        for (let i=1; i<Object.keys(algs[algset]).length; i++) {
            for (let a of algs[algset][i]) {
                algList.push(a);
            }
        }
    }
    else {
        for (let c of checkedCBs) {
            for (let a of algs[algset][c]) {
                algList.push(a);
            }
        }
    }

    nextAlg = 0;
    nextCase();
}

function nextCase() {
    currentAlg = algList[nextAlg];
    
    if (currentAlg) {
        const scramble = inverse(currentAlg);
        draw(scramble);
        $("#setupAlg").html(scramble);
        $("#solutionAlg").html(algList[nextAlg]);
        $("#btnRemoveAllCustom").prop("disabled", false);
        addCustomAlgButton();
        nextAlg++;

        if (nextAlg === algList.length) {
            nextAlg = 0;
        }

        hideSolution();
    }
    else {
        draw("");
        $("#setupAlg").html("Currently no algs");
        $("#btnRemoveAllCustom").prop("disabled", true);
        $("#addToCustom").html("");
    }
}

function addCustomAlgButton() {
    let out = "";

    if (!algs[algs.length-1][1].includes(currentAlg)) {
        out = "<button id='customAlgButton' onclick='addCustomAlg()'>Add to custom</button>";
    }
    else {
        out = "<button id='customAlgButton' onclick='removeCustomAlg()'>Remove from custom</button>";
    }
    
    $("#addToCustom").html(out);
}

function addCustomAlg() {
    algs[algs.length-1][1].push(currentAlg);
    addCustomAlgButton();
    saveCustomAlgs();
}

function removeCustomAlg() {
    const index = algs[algs.length-1][1].indexOf(currentAlg);
    if (index !== -1) {
        algs[algs.length-1][1].splice(index, 1);
    }
    addCustomAlgButton();
    setAlgset(currentAlgset);
    saveCustomAlgs();
}

function removeAllCustomAlgs() {
    while (algs[algs.length-1][1].length > 0) {
        algs[algs.length-1][1].pop();
    }
    addCustomAlgButton();
    setAlgset(currentAlgset);
    saveCustomAlgs();
}

function saveCustomAlgs() {
    localStorage.setItem("customAlgs", algs[algs.length-1][1].join(";"));
}

function getCustomAlgs() {
    if (localStorage.getItem("customAlgs")) {
        const customAlgs = localStorage.getItem("customAlgs").split(";");

        for (let a of customAlgs) {
            algs[algs.length-1][1].push(a);
        }
    }
}

function toggleSolution() {
    if ($("#solutionAlg").css("visibility") === "hidden") {
        showSolution();
    }
    else {
        hideSolution();
    }
}

function showSolution() {
    $("#solutionAlg").css("visibility", "visible");
    $("#btnShowSolution").text("Hide solution");
}

function hideSolution() {
    $("#solutionAlg").css("visibility", "hidden");
    $("#btnShowSolution").text("Show solution");
}

function inverse(alg) {
    let newAlg = "";

    for (let m of alg.split(" ").slice().reverse()) {
        if (m.includes("'")) {
            newAlg += m.replace("'"," ");
        }
        else if (m.includes("2")) {
            newAlg += m.replace("2","2 ");
        }
        else {
            newAlg += m + "' ";
        }
    }

    return newAlg;
}

function adjustSize() {
    let cbSize = 0;
    if ($("#content").width() >= $("#content").height()) {
        cbSize = $("#content").height() / 40;
        $("#cubeDisplay").css("grid-template-rows","0fr 1fr 5fr 1fr 1fr 1fr");
        $("#setupAlg").css("font-size", $("#content").height() / 25);
        $("#solutionAlg").css("font-size", $("#content").height() / 25);
    }
    else {
        cbSize = $("#content").width() / 40;
        $("#cubeDisplay").css("grid-template-rows","1fr 1fr 5fr 1fr 1fr 1fr");
        $("#setupAlg").css("font-size", $("#content").width() / 15);
        $("#solutionAlg").css("font-size", $("#content").width() / 15);
    }
    $("input[type='checkbox']").css("width", cbSize);
    $("input[type='checkbox']").css("height", cbSize);
    $("#selectDiv label").css("font-size", cbSize);
    $("#selectAlgset").css("font-size", cbSize);
    $("#buttonDiv").css("font-size", $("#buttonDiv").height() / 2);
    $("#customAlgButton").css("font-size", $("#buttonDiv").height() / 2);
    $("#btnRemoveAllCustom").css("font-size", $("#buttonDiv").height() / 2);
}

function keyListener(e) {
    // Space
    if (e === 32) {
        toggleSolution();
    }
    // Enter
    else if (e === 13) {
        nextCase();
    }
}