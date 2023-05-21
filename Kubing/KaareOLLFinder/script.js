const kp = "Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'";

$(() => {
    $("#inpPre").val("").trigger("change");
    $("#inpSuf").val("").trigger("change");
    updateCube();
});

function updateCube() {
    let pre = $("#inpPre").val();
    let suf = $("#inpSuf").val();
    let alg = [pre, kp, suf].join(" ");

    drawScrambleNxN("#svgScramble", 4, inverseAlg(alg)/* , ["white", "gray", "gray", "gray", "gray", "gray"] */);
}