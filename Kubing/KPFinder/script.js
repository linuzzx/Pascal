const kp = "Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'";

$(() => {
    $("#inpOri").val("").trigger("change");
    $("#inpPre").val("").trigger("change");
    $("#inpSuf").val("").trigger("change");
    updateCube();
});

function updateCube() {
    let ori = $("#inpOri").val();
    let pre = $("#inpPre").val();
    let suf = $("#inpSuf").val();
    let alg = [pre, kp, suf].join(" ");

    drawScrambleNxN("#svgScramble", 4, [ori, inverseAlg(alg)].join(" ")/* , ["white", "gray", "gray", "gray", "gray", "gray"] */);
}