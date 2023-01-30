let currentMove = "";
let prevMove = "";
let tiles = [];
let moves = [];
let mouseDown = 0;
let curCol = "Light";
let curPos = null;
let curPiece = null;
let locked = false;
let legalMoves = [];

const circLight ="#D8C3A3";
const circDark ="#A37A59";

$(() => {
    init();
});

function init() {
    adjustSize();
    createSquares();
    placePieces();

    curCol = "Light";

    $(document).on("mouseup", () => {
        mouseDown = 0;
    });
}

function createSquares() {
    let size = $("#board").width() / 8;
    for (let y = 0; y < 8; y++) {
        let row = "<tr>";
        for (let x = 0; x < 8; x++) {
            let col = (y + x) % 2 === 0 ? "#F0D9B5" : "#B58863";
            let dataCol = (y + x) % 2 === 0 ? "Light" : "Dark";
            let id = ["a", "b", "c", "d", "e", "f", "g", "h"][x] + [8, 7, 6, 5, 4, 3, 2, 1][y];
            let style = "background-color: " + col + "; width: " + size + "px; height: " + size + "px; text-align: center;";
            let tile = "<td><div id='" + id + "' class='tiles' data-color='" + dataCol + "' style='" + style + "' onclick='clickTile(\"" + id + "\")'></div></td>";
            row += tile;
        }
        row += "</tr>";
        $("#board").append(row);
    }
    for (let t of $(".tiles")) {
        tiles.push(t);
    }
}

function clearBoard() {
    for (t of tiles) {
        $("#" + t.id).html("");
    }
}

function placePieces(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR") {
    clearBoard();
    let style = "position: relative; width: 100%; height: 100%;";
    for (let y = 0; y < 8; y++) {
        let pieces = fen.split("/")[y];
        let x = 0;
        dataCol = "";
        for (let p of pieces.split("")) {
            let svg = "";
            let piece = "";
            if (!isNaN(parseInt(p))) {
                x += parseInt(p);
            }
            else {
                switch (p) {
                    case "r":
                        svg = "Rb";
                        piece = "R";
                        dataCol = "Dark";
                        break;
                    case "n":
                        svg = "Nb";
                        piece = "N";
                        dataCol = "Dark";
                        break;
                    case "b":
                        svg = "Bb";
                        piece = "B";
                        dataCol = "Dark";
                        break;
                    case "q":
                        svg = "Qb";
                        piece = "Q";
                        dataCol = "Dark";
                        break;
                    case "k":
                        svg = "Kb";
                        piece = "K";
                        dataCol = "Dark";
                        break;
                    case "p":
                        svg = "Pb";
                        piece = "P";
                        dataCol = "Dark";
                        break;
                    case "R":
                        svg = "Rw";
                        piece = "R";
                        dataCol = "Light";
                        break;
                    case "N":
                        svg = "Nw";
                        piece = "N";
                        dataCol = "Light";
                        break;
                    case "B":
                        svg = "Bw";
                        piece = "B";
                        dataCol = "Light";
                        break;
                    case "Q":
                        svg = "Qw";
                        piece = "Q";
                        dataCol = "Light";
                        break;
                    case "K":
                        svg = "Kw";
                        piece = "K";
                        dataCol = "Light";
                        break;
                    case "P":
                        svg = "Pw";
                        piece = "P";
                        dataCol = "Light";
                        break;
                }

                let id = ["a", "b", "c", "d", "e", "f", "g", "h"][x] + [8, 7, 6, 5, 4, 3, 2, 1][y];

                if (x < 8) {
                    $("#" + id).append("<img id='" + piece + "_" + id + "' src='../Pieces/" + svg + ".svg' data-piece='" + piece + "' data-color='" + dataCol + "' data-position='" + id + "' style='" + style + "' draggable='false'></img>");
                }
                x++;
            }
        }
    }

    $("img").on("mousedown", e => {
        onMouseDown(e);
    });
}

function onMouseDown(e) {
    locked = false;
    if (e.which === 1) {
        // Left
        mouseDown = 1;
        curPiece = e.target;
        curPos = e.target.dataset.position;
        getLegalMoves();

        $(curPiece).on("mousemove", e => {
            $("img").css("z-index", "0");
            $(curPiece).css("z-index", "1");

            let size = $("#board").width() / 8;
            if (mouseDown === 1 && curCol === curPiece.dataset.color) {
                $(curPiece).css("position", "absolute");
                $(curPiece).css("width", size);
                $(curPiece).css("height", size);
                $(curPiece).css({
                    left: e.pageX - (size / 2),
                    top: e.pageY - (size / 2)
                });
            }
        });

        $(document).on("mouseup", e => {
            if (!locked && curCol === curPiece.dataset.color) {
                locked = true;
                mouseDown = 0;
                let targets = document.elementsFromPoint(e.clientX, e.clientY);
                let newPos = targets[targets.map(t => t.className).indexOf("tiles")].id;
                
                movePiece(curPiece, curPos, newPos);

                $("img").css("z-index", "1");
                $("img").unbind();
                $("img").on("mousedown", e => {
                    onMouseDown(e);
                });
            }
        });
    }
    else if (e.which === 2) {
        // Middle
        mouseDown = 2;
    }
    else if (e.which === 3) {
        // Right
        mouseDown = 3;
    }
}

function movePiece(piece, oldPos, newPos) {
    let style = "position: relative; width: 100%; height: 100%;";
    piece.style = style;

    if (oldPos !== newPos) {
        curCol = curCol === "Light" ? "Dark" : "Light";
        $("#" + newPos).html(piece);
        $("#" + oldPos).html("");
        piece.dataset.position = newPos;

    }
}

function getLegalMoves() {
    console.log(curPiece);
}

function clickTile(tile) {

}

function adjustSize() {
    let size;
    if ($("body").width() >= $("body").height()) {
        size = $("#content").height() * 8 / 10;
    }
    else {
        size = $("#content").width() * 8 / 10;
    }
    $("#board").width(size);
    $("#board").height(size);
}