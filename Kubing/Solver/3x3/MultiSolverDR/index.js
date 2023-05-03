let step = "0";
let start;
let scrambles;
let solutions;
let numberOfScrambles = 1;
$(() => {
    scrambles = [];
    solutions = [];
    adjustSize();
});

function solveScrambles() {
    scrambles = [];
    solutions = [];

    $("#btnPDF").attr("disabled", true);
    numberOfScrambles = parseInt($("#inpScrambles").val()) || 1;

    for (let i = 0; i < numberOfScrambles; i++) {
        scrambles.push(getScrambleNxN(3));
    }
    
    solveCube();
}

function solveCube() {
    for (let i = 0; i < scrambles.length; i++) {
        let s = scrambles[i];
        if (s.includes("(") || s.includes(")")) {
            scrambles[i] = removeRedundantMoves(toAlg(s));
        }
        if ((s.includes("[") || s.includes("]")) && (s.includes(":") || s.includes(","))) {
            scrambles[i] = removeRedundantMoves(commToAlg(s));
        }
    }

    $("#taScrambles").val(scrambles.join("\n"));
    $("#taSolutions").val("");

    $("#progressBar").css("display", "block");
    $("#btnSolve").attr("disabled", true);
    $("#taScrambles").attr("disabled", true);
    
    solve(scrambles[0], getSolution);
}

function getSolution(solution) {
    if (solution[0] === 1) {
        $("#btnSolve").attr("disabled", false);
        $("#btnScramble").attr("disabled", false);
        $("#inpScramble").attr("disabled", false);
        $("#inpEndState").attr("disabled", false);
        
        let regExp = /\*(.*?)\*/g;
        let sol = solution[1].trim().split(regExp);
        
        let solObj = {
            "0 Scramble" : scrambles[solutions.length]
        };

        let rawSolution = [];
        
        let j = 1;
        for (let i = 0; i < sol.length; i += 2) {
            if (sol[i + 1] && sol[i] !== "") {
                solObj[j + " " + sol[i + 1]] = sol[i].trim();
                rawSolution.push(sol[i]);
                j++;
            }
        }

        let cleanSolution = removeRedundantMoves(cleanMoves(rawSolution.map(s => s.trim()).join(" ")));

        solObj[j + " Solution"] = cleanSolution;
        j++;
        solObj[j + " Moves"] = cleanSolution.split(" ").length;

        solutions.push(solObj);

        if (solutions.length === numberOfScrambles) {
            complete();
        }

        calcProgress();

        // $("#taSolutions").val(solutions.join("\n"));

        if (solutions.length === scrambles.length) {
            $("#btnSolve").attr("disabled", false);
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

function complete() {
    console.log(solutions);

    makeDrawings();

    $("#btnPDF").attr("disabled", false);
}

function makeDrawings() {
    $("#solutions").html("");

    let i = 0;
    
    for (let j = 0; j < scrambles.length / 5; j++) {
        let nScrambles = scrambles.slice(j * 5, j * 5 + 5);
        $("#solutions").append("<div class='printDiv' id='printDiv" + j + "' style='width: 21cm; height: 29.5cm; margin: 0.1cm; display: grid; grid-template-rows: 1fr 1fr 1fr 1fr 1fr;'></div>");

        for (let s of nScrambles) {
            let el = "<div style='width: 100%; height: 100%; margin: 0; padding: 0; display: grid; grid-template-columns: 2fr 7fr; border: 1px solid black;'><div style='width: 90%; margin: auto;'><einar-drawScramble id='svgCube" + i + "' scramble=\"" + s + "\"></einar-drawScramble></div><div style='margin: auto; text-align: left;'>";

            for (let k of Object.keys(solutions[i])) {
                let v = solutions[i][k];
                if (k.split(" ")[1] !== "Solution" && k.split(" ")[1] !== "Moves") {
                    el += "<p>" + v + " // " + k.split(" ")[1] + "</p>";
                }
                else if (k.split(" ")[1] === "Solution") {
                    el += "<p>" + v + " // " + k.split(" ")[1] + " ";
                }
                else if (k.split(" ")[1] === "Moves") {
                    el += v + " HTM</p>";
                }
            }

            el += "</div>";
            $("#printDiv" + j).append(el);
            i++;
        }
    }

    $("#btnDownload").css("display", "block");
}

function makePDF() {
    // downloadPDF($("#content").html());

    let mywindow = window.open("", 'PRINT', 'left=0,top=0,height='+$(window).height()+'",width='+$(window).width());
    mywindow.document.write($("#solutions").html());
    mywindow.document.write("<link rel='stylesheet' href='style.css'>");
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    // mywindow.close();
}