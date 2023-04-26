let steps = {};

$(() => {
    initEvents();
});

function initEvents() {
    $("#inpScramble").on("input", () => {
        $("#inpInverseScramble").val(inverseAlg($("#inpScramble").val().trim()));
        updateSolution();
    });

    // $(".niss").on("click", e => {
    $(".btnAddStep").on("click", e => {
        addStep(e);
    });

    $(".niss input").on("click", e => {
        e.stopPropagation();
        console.log(e);
    });
}

function deleteStep(n) {
    for (let i = n; i < Object.keys(steps).length; i++) {
        steps[i] = steps[i + 1];
    }

    delete steps[Object.keys(steps).reverse()[0]];

    updateSteps();
}

function addStep(e) {
    let n = Object.keys(steps).length + 1;
    
    steps[n] = {
        // niss: e.currentTarget.dataset.niss,
        niss: $(e.currentTarget).prev()[0].dataset.niss,
        moves: "",
        comment: ""
    };

    updateSteps();
}

function editSteps() {
    for (let n of Object.keys(steps)) {
        steps[n].moves = $("#inpStepsM" + n).val();
        steps[n].comment = $("#inpStepsC" + n).val();
    }

    updateSolution();
}

function updateSteps() {
    $("#normal").html("");
    $("#inverse").html("");
    for (let n of Object.keys(steps)) {
        let step = "<div class='steps' id='step" + n +"'>" +
                "<input id='inpStesN" + n + "' class='inpStepsN' type='number' placeholder='#' value='" + n + "' oninput='editSteps()'>" +
                "<input id='inpStepsM" + n + "' class='inpStepsM' type='text' placeholder='Moves' value=\"" + steps[n].moves + "\" oninput='editSteps()'>" +
                "<input id='inpStepsC" + n + "' class='inpStepsC' type='text' placeholder='Comment' value=\"" + steps[n].comment + "\" oninput='editSteps()'>" +
                "<button id='btnDeleteStep" + n + "' class='btnDeleteStep' onclick='deleteStep(" + n + ")'>X</button>" +
                "</div>";
        $("#" + steps[n].niss).append(step);
    }
    
    updateSolution();
}

function updateSolution() {
    let normal = [];
    let inverse = [];

    for (let s of Object.keys(steps)) {
        if (steps[s].niss === "normal") {
            normal.push(steps[s].moves);
        }
        else {
            inverse.push(steps[s].moves);
        }
    }

    let sol = removeRedundantMoves(normal.join(" ").trim() + " " + inverseAlg(inverse.join(" ").trim())).trim();
    $("#solution").html("<h1>" + [sol, (sol === "" ? 0 : sol.split(" ").length)].join("&nbsp;&nbsp;&nbsp;") + " (HTM)</h1>");
    $("einar-drawscramble").attr("scramble", $("#inpScramble").val().trim() + " " + sol);
}