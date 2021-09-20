const currentAlgset = localStorage.getItem("currentAlgset") || 0;
let nextAlg = 0;
let algList = [];

$(function() {
    showContent();
    draw("");
    
    listCases();
    setAlgset(currentAlgset);
});

$(window).resize(function(){
    //showContent();
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
    algList = [];
    localStorage.setItem("currentAlgset", algset);

    for (let i=1; i<Object.keys(algs[algset]).length; i++) {
        for (let a of algs[algset][i]) {
            algList.push(a);
        }
    }

    showNextAlg();
}

function showNextAlg() {
    const scramble = inverse(algList[nextAlg]);
    draw(scramble);
    $("#setupAlg").html(scramble);
    $("#solutionAlg").html(algList[nextAlg]);
    nextAlg++;
    hideSolution();
}

function showSolution() {
    $("#solutionAlg").css("visibility", "visible");
}

function hideSolution() {
    $("#solutionAlg").css("visibility", "hidden");
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