export function initScripts() {
    let script = document.createElement('script');
    let url = "https://einarkl.github.io/Kubing/Tools/tools.js";
    script.setAttribute('src', url);
    let scripts = document.getElementsByTagName("script");

    document.head.appendChild(script);
}

export class EinarDrawScramble extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        initScripts();
        setTimeout(() => {
            let puzzle = this.getAttribute("puzzle") ? getPuzzle(this.getAttribute("puzzle")) : "3x3";
            let scramble = this.getAttribute("scramble") ? this.getAttribute("scramble") : "";

            let svg = document.createElement("svg");
            svg.setAttribute("id", "svgEinarDrawScramble");
            svg.setAttribute("width", "80%");
            svg.setAttribute("height", "80%");
            svg.removeAttribute("style");
            this.appendChild(svg);
            this.setAttribute("width", "80%");
            this.setAttribute("height", "80%");

            drawScramble(puzzle, scramble);
        }, 1000);
    }
}

const colors = ["white", "#FFAA00", "#00FF00", "red", "blue", "yellow"];

function getPuzzle(puzzle) {
    if (["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle) !== -1) {
        return puzzle;
    }
    else {
        return "3x3";
    }
}

function drawScramble(puzzle, scramble) {
    let functions = [drawScrambleSkewb, drawScramblePyraminx, drawScrambleMegaminx, drawScrambleClock, drawScrambleSq1, drawScrambleSq1];
    const id = "#svgEinarDrawScramble";
    let n = puzzle.split("x").length === 2 && puzzle.split("x")[0] === puzzle.split("x")[1] ? parseInt(puzzle.split("x")[0]) : -1;
    n !== -1 ? drawScrambleNxN(id, n, scramble) : functions[["skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle)](id, scramble);
    n === -1 && functions[["skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle)] === -1 ? drawMissingSvg(id) : "";
}

customElements.define("einar-drawscramble", EinarDrawScramble);