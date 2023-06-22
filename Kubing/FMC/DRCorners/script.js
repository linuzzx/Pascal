$(() => {
    $("body").on("keyup", e => {
        if (e.which === 32) {
            nextScramble();
        }
    });

    nextScramble();
});

function nextScramble() {
    const solution = cornerAlgs[Math.floor(Math.random() * cornerAlgs.length)];
    const scramble = inverseAlg(solution);

    drawScrambleNxN("#svgCube", 3, scramble);
    $("#solution").text(solution);
}

const cornerAlgs = [
    "R2",
    "F2 R2",
    "R2 U R2",
    "F2 R2 F2",
    "F2 U2 R2",
    "F2 U' F2 R2",
    "R2 U' R2 U R2",
    "R2 U R2 U R2",
    "R2 U2 F2 U' R2",
    "R2 U F2 U2 R2",
    "F2 U' F2 U F2 R2",
    "F2 R2 U R2 U F2",
    "R2 U F2 U' F2 U F2",
    "F2 U F2 U2 R2 U F2",
    "F2 U' F2 U F2 U2 R2",
    "R2 U2 F2 U' F2 U F2",
    "R2 U' R2 U R2 U' R2",
    "F2 U R2 U2 F2 U F2",
    "R2 U F2 U2 R2 U' F2",
    "F2 U R2 U2 F2 U' R2",
    "F2 U2 R2 U' R2 U2 F2",
    "F2 U F2 U' F2 R2 U' F2",
    "F2 R2 U' F2 U R2 U' R2",
    "F2 U R2 U2 F2 U F2 U' R2",
    "R2 U' R2 U R2 U' R2 U R2",
    "F2 U R2 U R2 U2 F2 U' R2",
    "R2 U R2 U2 F2 U' F2 U F2",
    "R2 U' F2 U R2 U' F2 U R2",
    "F2 U R2 U' F2 U R2 U' R2",
    "F2 U F2 U2 R2 U' R2 U2 F2",
    "R2 U R2 U' F2 U R2 U' F2",
    "F2 U2 R2 U R2 U2 F2 U' F2",
    "F2 U' F2 U F2 U' F2 U' R2",
    "R2 U F2 U F2 U' F2 U F2",
    "F2 R2 U' R2 U F2 U' R2 U F2",
    "F2 R2 U F2 U' F2 U R2 U' R2",
    "F2 U F2 U' F2 U F2 R2 U R2",
    "F2 R2 U R2 U' R2 U F2 U' R2",
    "F2 U2 R2 U F2 U2 R2 U R2 U2 F2",
    "F2 U F2 U2 R2 U F2 U2 R2 U' R2",
    "F2 U F2 U R2 U2 F2 U' R2 U F2",
    "R2 U' F2 U' R2 U R2 U' R2 U' F2",
    "F2 U F2 U2 R2 U R2 U2 F2 U' F2"
];