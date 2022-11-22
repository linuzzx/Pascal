function makeDrawings() {
    $("#scrambles").html("");
    let scrambles = $("#taScrambles").val().split("\n");

    let i = 0;
    
    for (let s of scrambles) {
        let ns = [];
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
        let el = "<div style='width: 21cm; height: calc(29.7cm/5); margin: 0; padding: 1%; display: grid; grid-template-columns: 2fr 3fr; border: 1px solid black;'><div><svg id='svgSkewb" + i + "'></svg></div><h1 style='margin: auto'>2gen: " + s/*  + "<br>Optimal: " + optimalSolutions[i] +  */"</h1></div>";
        $("#svgSkewb" + i).attr("height", $("#svgSkewb" + i).attr("width") * 3 / 4);
        $("#svgSkewb" + i).css("height", $("#svgSkewb" + i).attr("height"));
        $("#svgSkewb" + i).css("margin", "auto");
        $("#scrambles").append(el);
        drawScrambleSkewb("#svgSkewb" + i, /* "x' " + */ inverseAlg(ns.join(" ")), true);
        i++;
    }

    $("#btnDownload").css("display", "block");
}

function makePDF() {
    // downloadPDF($("#content").html());

    let mywindow = window.open("", 'PRINT', 'height='+$(window).height()+'",width='+$(window).width());
    mywindow.document.write($("#content").html());
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

async function getBlob(toBlob) {
    let res = await fetch(`data:${toBlob};base64`);

    return await res.blob();
}