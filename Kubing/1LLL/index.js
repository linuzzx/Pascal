const currentAlgset = localStorage.getItem("currentAlgset") || 0;
let nextAlg = 0;
let algList = [];

$(function() {
    draw("");
    
    listCases();
    setAlgset(currentAlgset);
});

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
    $("#solutionAlg").css("display", "block");
}

function hideSolution() {
    $("#solutionAlg").css("display", "none");
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