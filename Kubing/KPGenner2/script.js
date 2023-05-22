const op = "Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'";
const moves4x4 = ["R", "R2", "R'", "U", "U2", "U'", "F", "F2", "F'", "D", "D2", "D'"];
let cleanState;
let affixes = [""];
let ops = {};
let maxN = 1;

$(() => {
    cleanState = getNumberState(4, "");
    affixes = [""];
});

function gen(n) {
    let w = new Worker("worker.js");
    w.postMessage(n);
    w.onmessage = e => {
        if (typeof e.data === "number") {
            // console.log(+parseFloat(e.data / maxN).toFixed(2));
        }
        else if (typeof e.data === "string") {
            // maxN = parseInt(e.data);
        }
        else {
            ops = e.data;
            getOps(e.data);
        }
    }
}

function getOps(ops) {
    let out = "";

    out += "<button onclick=\"downloadFile()\">Download</button>";
    for (let i = 0; i < Object.keys(ops).length; i++) {
        out += "<div style=\"display: grid; grid-template-columns: 1fr 1fr;\"><svg id=\"svgScramble" + i + "\"></svg><div id=\"scramble" + i + "\" style=\"height: 25vh; overflow-y: scroll;\"></div></div><br><br>";
    }

    $("#scrambleDiv").html(out);

    for (let i = 0; i < Object.keys(ops).length; i++) {
        let alg = Object.values(ops)[i][0];
        for (let j = 1; j <= Object.values(ops)[i].length; j++) {
            $("#scramble" + i).append("<h2>" + j + ". " + Object.values(ops)[i][j - 1].replace("Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'", "[KP]").replace("Rw U2 Rw U2 Rw3' U Rw U2 R' U Rw U R Rw2 U Rw U' Rw", "[KP]") + "</h2>");
        }
        // $("#scramble" + i).text(alg.replace("Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'", "[KP]").replace("Rw U2 Rw U2 Rw3' U Rw U2 R' U Rw U R Rw2 U Rw U' Rw", "[KP]"));
        drawScrambleNxN("#svgScramble" + i, 4, inverseAlg(alg), ["white", "gray", "gray", "gray", "gray", "gray"]);
    }
    
    if (Object.keys(ops).length === 0) {
        $("#scrambleDiv").append("No algs found with the chosen N");
    }
}

function downloadFile() {
    const link = document.createElement("a");
    const content = JSON.stringify(ops).replaceAll("Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'", "[KP]").replaceAll("Rw U2 Rw U2 Rw3' U Rw U2 R' U Rw U R Rw2 U Rw U' Rw", "[KP]");
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
};
/* 
const downloadFile = () => {
    const link = document.createElement("a");
    const content = document.querySelector("textarea").value;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}; */