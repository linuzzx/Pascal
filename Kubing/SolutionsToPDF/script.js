let curEvent = "3x3";

$(() => {
    genEventOptions();
});

function genEventOptions() {
    const events = ["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx", "Pyraminx", "Skewb", "Square-1"];

    let out = "";
    for (let e of events) {
        out += "<option value=\"" + e + "\" onchange='changeEvent(this.value)'>" + e + "</option>";
    }

    $("#selEvent").html(out);
}

function changeEvent(ev) {
    curEvent = ev;
}

function makeDrawings() {
    $("#scrambles").html("");
    let scrambles = $("#taScrambles").val().split("\n").filter(s => s.trim() !== "");

    let i = 0;
    
    for (let j = 0; j < scrambles.length / 5; j++) {
        let nScrambles = scrambles.slice(j * 5, j * 5 + 5);
        $("#scrambles").append("<div class='scrSubDiv' id='scrSubDiv" + j + "' style='width: 21cm; height: 29.5cm; margin: 0.1cm; display: grid; grid-template-rows: 1fr 1fr 1fr 1fr 1fr;'></div>");

        for (let s of nScrambles) {
            let ns = s.split(" ").slice();
            if (curEvent === "Skewb") {
                ns = [];
                for (let m of s.split(" ")) {
                    if (m.includes("R")) {
                        ns.push("z " + m + " z'");
                    }
                    else if (m.includes("r")) {
                        ns.push(m.toUpperCase());
                    }
                    else {
                        ns.push(m);
                    }
                }
            }
            let el = "<div style='width: 100%; height: 100%; margin: 0; padding: 0; display: grid; grid-template-columns: 2fr 3fr; border: 1px solid black;'><div style='width: 80%; height: 80%; margin: auto;'><svg width='100%' id='svgCube" + i + "'></svg></div><h1 style='margin: auto; text-align: left;'>" /* + "2gen: " */ + s/*  + "<br>Optimal: " + optimalSolutions[i] */ + "</h1></div>";
            if ($("#svgCube" + i).parent().height() >= $("#svgCube" + i).parent().width() * 3 / 4) {
                $("#svgCube" + i).attr("width", $("#svgCube" + i).parent().width() * 0.8);
            }
            else {
                $("#svgCube" + i).attr("width", $("#svgCube" + i).attr("height") * 4 / 3);
            }
            $("#svgCube" + i).css("width", $("#svgCube" + i).attr("width"));
            $("#svgCube" + i).css("height", $("#svgCube" + i).attr("height"));
            $("#svgCube" + i).css("margin", "auto");
            $("#scrSubDiv" + j).append(el);
            drawScramble("#svgCube" + i, /* "x' " + */ inverseAlg(ns.join(" ")));
            i++;
        }
    }

    $("#btnDownload").css("display", "block");
}

function drawScramble(id, scr) {
    switch (curEvent) {
        case "3x3":
            drawScrambleNxN(id, 3, scr);
            break;
        case "2x2":
            drawScrambleNxN(id, 2, scr);
            break;
        case "4x4":
            drawScrambleNxN(id, 4, scr);
            break;
        case "5x5":
            drawScrambleNxN(id, 5, scr);
            break;
        case "6x6":
            drawScrambleNxN(id, 6, scr);
            break;
        case "7x7":
            drawScrambleNxN(id, 7, scr);
            break;
        case "Clock":
            drawScrambleClock(id, scr);
            break;
        case "Megaminx":
            drawScrambleMegaminx(id, scr);
            break;
        case "Pyraminx":
            drawScramblePyraminx(id, scr);
            break;
        case "Skewb":
            drawScrambleSkewb(id, scr);
            break;
        case "Square-1":
            drawScrambleSq1(id, scr);
            break;
    }
}

function makePDF() {
    // downloadPDF($("#content").html());

    let mywindow = window.open("", 'PRINT', 'left=0,top=0,height='+$(window).height()+'",width='+$(window).width());
    mywindow.document.write($("#scrambles").html());
    mywindow.document.write("<link rel='stylesheet' href='style.css'>");
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    // mywindow.close();
}

async function downloadPDF(el) {
    let fileName = "skvib.pdf";

    const link = document.createElement("a");
    link.href = URL.createObjectURL(el);
    link.download = fileName;
    link.target = "_blank";
    link.setAttribute("type", "hidden");

    document.body.appendChild(link);

    link.click();
    link.remove();
};