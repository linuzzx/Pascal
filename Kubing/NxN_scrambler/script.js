$(() => {
    $(window).on("keypress", e => {
        if (e.which === 32) {
            scramble();
        }
    });

    if ($(window).width() > $(window).height()) {
        $("#svgScramble").width("40%");
    }
    else {
        $("#svgScramble").width("90%");
    }
    $("#svgScramble").height(3 * $("#svgScramble").width() / 4);
    $("#inpN").val(3);
    scramble();
});

function scramble() {
    let n = parseInt($("#inpN").val());
    if (n) {
        let scr = getScrambleNxN(n);
        $("#scramble").text(scr);
        if (n !== 1) {
            drawScrambleNxN("#svgScramble", n, scr);
        }
        else {
            drawScrambleNxN("#svgScramble", n, "");
        }
    }
}