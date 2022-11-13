let step = "0";
let start;
let targets;
let oScrambles;
let scrambles;
let solutions;
$(() => {
    targets = [];
    scrambles = [];
    solutions = [];
    adjustSize();
});

function solveCube(trg, scr) {
    let nTargets = trg.split("\n").filter(s => s.trim() !== "");
    let nScrambles = scr.split("\n").filter(s => s.trim() !== "");

    if (nTargets.length !== nScrambles.length) {
        $("#taTargets").val("");
        $("#taScrambles").val("");
        $("#taSolutions").val("");
        alert("Enter the same amount of targets and scrambles!");
    }
    else {
        for (let j = 0; j < nScrambles.length; j++) {
            for (let i = 0; i < nScrambles.length; i++) {
                if (j !== i && !isOtherOrientation(nTargets[j], nTargets[i])) {
                    targets.push(nTargets[j] + "_" + nTargets[i]);
                    scrambles.push(nScrambles[j] + "*" + inverseAlg(nScrambles[i]));
                }
            }
        }
        oScrambles = scrambles.slice();
        solutions = [];

        for (let i = 0; i < scrambles.length; i++) {
            let s = scrambles[i];
            if (s.includes("(") || s.includes(")")) {
                scrambles[i] = removeRedundantMoves(toAlg(s.split("*")[0])) + " " + removeRedundantMoves(toAlg(s.split("*")[1]));
            }
            if ((s.includes("[") || s.includes("]")) && (s.includes(":") || s.includes(","))) {
                scrambles[i] = removeRedundantMoves(commToAlg(s.split("*")[0])) + " " + removeRedundantMoves(commToAlg(s.split("*")[1]));
            }
        }

        $("#taScrambles").val(scrambles.join("\n"));
        $("#taSolutions").val("");

        $("#progressBar").css("display", "block");
        $("#btnSolve").attr("disabled", true);
        $("#taTargets").attr("disabled", true);
        $("#taScrambles").attr("disabled", true);
        
        solve(scrambles[0], getSolution);
    }
}

function isOtherOrientation(trg1, trg2) {
    let t1 = trg1.split("").sort().join("");
    let t2 = trg2.split("").sort().join("");
    return t1 === t2;
}

function getSolution(solution) {
    if (solution[0] === 1) {
        $("#btnSolve").attr("disabled", false);
        $("#btnScramble").attr("disabled", false);
        $("#inpScramble").attr("disabled", false);
        $("#inpEndState").attr("disabled", false);
        let sol = removeRedundantMoves(cleanMoves(solution[1]));

        solutions.push("{target:\"" + targets[solutions.length] + "\", alg:\"" + oScrambles[solutions.length] + "\", scramble:\"" + sol + "\"},");
        
        calcProgress();

        $("#taSolutions").val(solutions.join("\n"));

        if (solutions.length === scrambles.length) {
            $("#btnSolve").attr("disabled", false);
            $("#taTargets").attr("disabled", false);
            $("#taScrambles").attr("disabled", false);

            setTimeout(() => {
                $("#progressBar").css("display", "none");
                $("#innerBar").css("width", "0%");
            }, 1000);
        }
        else {
            solve(scrambles[solutions.length], getSolution);
        }
    }
}

function toAlg(comm) {
    let leftBrackets = 0;
    let rightBrackets = 0;
    let commArr = [];

    comm = cleanMoves(comm.replaceAll("(", " ( ").replaceAll(")", " ) "));
    for (let c of comm.split(" ")) {
        if (c === "(") {
            commArr.push("b" + leftBrackets);
            leftBrackets++;
        }
        else if (c === ")") {
            commArr.push(c);
            rightBrackets++;
        }
        else if(c !== " ") {
            commArr.push(c);
        }
    }

    if (leftBrackets !== rightBrackets) {
        return "";
    }
    
    for (let i = leftBrackets - 1; i >= 0; i--) {
        let s = commArr.indexOf("b"+i);
        let e = commArr.indexOf(")");
        let c = commArr.slice(s + 1, e);
        let n = parseInt(commArr[e + 1]);
        commArr.splice(s, e + 2, translateComm(c, n));
    }
    
    return commArr.join(" ") || "";

    function translateComm(cm, n) {
        let str = "";
        for (let i = 0; i < n; i++) {
            str += cm.join(" ") + " ";
        }
        return str.trim();
    }
}

function commToAlg(comm) {
    let leftSqBrackets = 0;
    let rightSqBrackets = 0;
    let colons = 0;
    let commas = 0;
    let commArr = [];

    /* 
    [A, B] = A B A' B'
    [A: B] = A B A'
    */

    if (
        comm.split("").filter(c => c === "[").length !== (comm.split("").filter(c => c === ",").length + comm.split("").filter(c => c === ":").length)
    ) {
        comm = comm.replaceAll(":", ":[")+"]";
    }
    comm = cleanMoves(comm.replaceAll("[", " [ ").replaceAll("]", " ] ").replaceAll(",", " , ").replaceAll(":", " : "));
    for (let c of comm.split(" ")) {
        if (c === "[") {
            commArr.push("l" + leftSqBrackets);
            leftSqBrackets++;
        }
        else if (c === "]") {
            commArr.push(c);
            rightSqBrackets++;
        }
        else if (c === ":") {
            commArr.push(c);
            colons++;
        }
        else if (c === ",") {
            commArr.push(c);
            commas++;
        }
        else if (c !== " ") {
            commArr.push(c);
        }
    }
    
    if (leftSqBrackets !== rightSqBrackets || colons > leftSqBrackets || commas > leftSqBrackets) {
        return "";
    }

    let stack = [];
    for (let i = leftSqBrackets - 1; i >= 0; i--) {
        let s = commArr.indexOf("l"+i);
        let e = commArr.indexOf("]");
        let c = commArr.slice(s, e + 1);
        commArr.splice(s, c.length, "stack"+stack.length);
        stack.push(translateComm(c));
    }

    let newAlg = stack.pop() || "";
    while (newAlg.includes("stack")) {
        
        let nArr = newAlg.split(" ");
        for (let i = 0; i < nArr.length; i++) {
            if (nArr[i].includes("stack")) {
                nArr[i] = stack[parseInt(nArr[i].replace("stack", ""))];
            }
        }
        
        newAlg = nArr.join(" ");
    }
    
    return newAlg;

    function translateComm(cm) {
        if (cm.includes(",")) {
            let c1 = cm.slice(1, cm.indexOf(",")).join(" ");
            let c2 = cm.slice(cm.indexOf(",") + 1, -1).join(" ");
            return [c1, c2, inverseAlg(c1), inverseAlg(c2)].join(" ");
        }
        else if (cm.includes(":")) {
            let c1 = cm.slice(1, cm.indexOf(":")).join(" ");
            let c2 = cm.slice(cm.indexOf(":") + 1, -1).join(" ");
            return [c1, c2, inverseAlg(c1)].join(" ");
        }
    }
}

function calcProgress() {
    let progress = (100 * solutions.length / scrambles.length).toFixed(2);

    $("#innerBar").css("width", progress + "%");
    $("#progress").text(progress + "%");
}

function cleanMoves(moves) {
    moves = moves.trim();
    moves = moves.replaceAll(" ", ";");

    while (moves.includes(";;")) {
        moves = moves.replaceAll(";;", ";");
    }

    return moves.replaceAll(";", " ");
}

function solve(scramble, callback, endState = "wwwwwwwwwooooooooogggggggggrrrrrrrrrbbbbbbbbbyyyyyyyyy") {
    let worker = new Worker("./worker.js");
    worker.postMessage([scramble, endState]);
    worker.onmessage = e => {
        callback(e.data);
    }
}

function adjustSize() {
    $("button").css("font-size", "3vh");
}