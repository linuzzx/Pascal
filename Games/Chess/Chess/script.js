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
let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
let rows = [8, 7, 6, 5, 4, 3, 2, 1];

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
    $("#dots").attr("width", $("#board").width());
    $("#dots").attr("height", $("#board").height());
    for (let y = 0; y < 8; y++) {
        let row = "<tr>";
        for (let x = 0; x < 8; x++) {
            let col = (y + x) % 2 === 0 ? "#F0D9B5" : "#B58863";
            let dataCol = (y + x) % 2 === 0 ? "Light" : "Dark";
            let id = columns[x] + rows[y];
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

                let id = columns[x] + rows[y];

                if (x < 8) {
                    $("#" + id).append("<img id='" + piece + "_" + id + "' src='../Pieces/" + svg + ".svg' data-piece='" + piece + "' data-color='" + dataCol + "' data-position='" + id + "' style='" + style + "' draggable='false'></img>");
                }
                x++;
            }
        }
    }

    $(".tiles").on("mousedown", e => {
        onMouseDown(e);
    });
}

function onMouseDown(e) {
    locked = false;
    if (e.which === 1) {
        // Left
        if (curPiece !== null && moves.includes(document.elementsFromPoint(e.clientX, e.clientY)[document.elementsFromPoint(e.clientX, e.clientY).map(t => t.className).indexOf("tiles")].id)) {
            let targets = document.elementsFromPoint(e.clientX, e.clientY);
            let newPos = targets[targets.map(t => t.className).indexOf("tiles")].id;
            movePiece(curPiece, curPiece.dataset.position, newPos);
        }
        mouseDown = 1;
        curPiece = e.target;

        if (curCol === curPiece.dataset.color) {
            curPos = e.target.dataset.position;
            getLegalMoves();
    
            $(curPiece).on("mousemove", e => {
                $("img").css("z-index", "0");
                $(curPiece).css("z-index", "2");
    
                let size = $("#board").width() / 8;
                if (mouseDown === 1) {
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
                if (!locked) {
                    locked = true;
                    mouseDown = 0;
                    let targets = document.elementsFromPoint(e.clientX, e.clientY);
                    let newPos = targets[targets.map(t => t.className).indexOf("tiles")].id;
                    
                    movePiece(curPiece, curPos, newPos);
    
                    $("img").css("z-index", "0");
                    $(".tiles").unbind();
                    $(".tiles").on("mousedown", e => {
                        onMouseDown(e);
                    });
                }
            });
        }
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

    if (oldPos !== newPos && moves.includes(newPos)) {
        moves = [];
        drawMoves();
        curPiece = null;
        curCol = curCol === "Light" ? "Dark" : "Light";
        $("#" + newPos).html(piece);
        $("#" + oldPos).html("");
        piece.dataset.position = newPos;
    }
}

function getLegalMoves() {
    moves = [];
    let pos = curPiece.dataset.position.split("");
    switch (curPiece.dataset.piece) {
        case "P":
            if (curPiece.dataset.color === "Light") {
                if (!getPieceAt(pos[0] + (parseInt(pos[1]) + 1))) {
                    moves.push(pos[0] + (parseInt(pos[1]) + 1));
                    if (pos[1] === "2" && !getPieceAt(pos[0] + (parseInt(pos[1]) + 2))) {
                        moves.push(pos[0] + (parseInt(pos[1]) + 2));
                    }
                }
                if (columns[columns.indexOf(pos[0]) - 1]) {
                    let po = columns[columns.indexOf(pos[0]) - 1] + (parseInt(pos[1]) + 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Dark") {
                        moves.push(po);
                    }
                }
                if (columns[columns.indexOf(pos[0]) + 1]) {
                    let po = columns[columns.indexOf(pos[0]) + 1] + (parseInt(pos[1]) + 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Dark") {
                        moves.push(po);
                    }
                }
            }
            else if (curPiece.dataset.color === "Dark") {
                if (!getPieceAt(pos[0] + (parseInt(pos[1]) - 1))) {
                    moves.push(pos[0] + (parseInt(pos[1]) - 1));
                    if (pos[1] === "7" && !getPieceAt(pos[0] + (parseInt(pos[1]) - 2))) {
                        moves.push(pos[0] + (parseInt(pos[1]) - 2));
                    }
                }
                if (columns[columns.indexOf(pos[0]) - 1]) {
                    let po = columns[columns.indexOf(pos[0]) - 1] + (parseInt(pos[1]) - 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Light") {
                        moves.push(po);
                    }
                }
                if (columns[columns.indexOf(pos[0]) + 1]) {
                    let po = columns[columns.indexOf(pos[0]) + 1] + (parseInt(pos[1]) - 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Light") {
                        moves.push(po);
                    }
                }
            }

            break;
        case "K":

            break;
        case "Q":

            break;
        case "B":

            break;
        case "N":

            break;
        case "R":
            let u = true;
            let d = true;
            let r = true;
            let l = true;
            for (let i = 1; i < 8; i++) {
                if (u && parseInt(pos[1]) !== 8 && (!getPieceAt(pos[0] + (parseInt(pos[1]) + i)) || getPieceAt(pos[0] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color)) {
                    moves.push(pos[0] + (parseInt(pos[1]) + i));
                }
                else {
                    u = false;
                }
                if (d && parseInt(pos[1]) !== 1 && (!getPieceAt(pos[0] + (parseInt(pos[1]) - i)) || getPieceAt(pos[0] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color)) {
                    moves.push(pos[0] + (parseInt(pos[1]) - i));
                }
                else {
                    d = false;
                }
                if (r && pos[0] !== "h" && (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1]) || getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1]).dataset.color !== curPiece.dataset.color)) {
                    moves.push(columns[columns.indexOf(pos[0]) + i] + pos[1]);
                }
                else {
                    r = false;
                }
                if (l && pos[0] !== "a" && (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1]) || getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1]).dataset.color !== curPiece.dataset.color)) {
                    moves.push(columns[columns.indexOf(pos[0]) - i] + pos[1]);
                }
                else {
                    l = false;
                }
            }
            break;
    }

    drawMoves();
}

function drawMoves() {
    let b = $("#board").width();
    let s = b / 8;
    $("#dots").html("");

    for (let m of moves) {
        let col = "#000";
        console.log(m);
        let circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(circ).attr("cx", s * (parseInt(columns.indexOf(m.split("")[0])) + 0.5));
        $(circ).attr("cy", s * (parseInt(rows.indexOf(parseInt(m.split("")[1]))) + 0.5));console.log(rows.indexOf(m.split("")[1]));
        $(circ).attr("r", s / 6);
        $(circ).attr("style", "fill:" + col + ";");
        $(circ).css("opacity", "0.1");
        
        $("#dots").append(circ);
    }
}

function getPieceAt(tile) {
    let p = $("#" + tile).children()[0];
    return p ? p : false;
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
    
    $("#dots").attr("width", size);
    $("#dots").attr("height", size);
    $("#dots").css("top", $("#board").position().top);
    $("#dots").css("left", $("#board").position().left);
}