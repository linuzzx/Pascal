const verdier = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const typer = ["s","k","h","r"];

function trekkKort() {
    let verdi = verdier[Math.floor(Math.random() * verdier.length)];
    let type = typer[Math.floor(Math.random() * typer.length)];

    document.getElementById("kort").querySelector("h1").innerText = verdi;
    document.getElementById("kort").querySelector("img").src = "../bilder/" + type + ".png";
}