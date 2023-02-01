let currentMove = "";
let prevMove = "";
let tiles = [];
let moves = {};
let legalMoves = [];
let mouseDown = 0;
let curCol = "Light";
let curPos = null;
let curPiece = null;
let locked = false;
let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
let rows = [8, 7, 6, 5, 4, 3, 2, 1];
let flipped = false;
let castling = {
    "K" : true,
    "Q" : true,
    "k" : true,
    "q" : true
};

const circLight ="#D8C3A3";
const circDark ="#A37A59";

$(() => {
    init();
});

function init() {
    adjustSize();
    createSquares();
    createLetters();
    placePieces();

    curCol = "Light";

    $("#board").on('contextmenu', e => {
        e.preventDefault();
    });
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

function createLetters(flipped = false) {
    $("#lettersNumbers").html("");
    let tileSize = $("#board").width() / 8;
    let ro = flipped ? rows.reverse() : rows;
    for (let r of ro) {
        let col = ro.indexOf(r) % 2 === 0 ? "#B58863" : "#F0D9B5";
        let l = document.createElementNS("http://www.w3.org/2000/svg", "text");
        $(l).attr("x", tileSize * 0.05);
        $(l).attr("y", tileSize * (parseInt(ro.indexOf(r)) + 0.25));
        $(l).attr("font-size", tileSize * 0.25);
        $(l).attr("font-family", "arial");
        $(l).attr("fill", col);
        $(l).text(r);

        $("#lettersNumbers").append(l);
    }
    let co = flipped ? columns.reverse() : columns;
    for (let c of co) {
        let col = co.indexOf(c) % 2 === 0 ? "#F0D9B5" : "#B58863";
        let l = document.createElementNS("http://www.w3.org/2000/svg", "text");
        $(l).attr("x", tileSize * (parseInt(co.indexOf(c)) + 0.8));
        $(l).attr("y", 8 * (tileSize - 0.6));
        $(l).attr("font-size", tileSize * 0.25);
        $(l).attr("font-family", "arial");
        $(l).attr("fill", col);
        $(l).text(c);

        $("#lettersNumbers").append(l);
    }
}

function flipTable() {
    createLetters(!flipped);
    let fen = flipped ? "RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr" : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    placePieces(fen);
    flipped = !flipped;
}

// function placePieces(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
function placePieces(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
    clearBoard();
    let style = "position: relative; width: 100%; height: 100%;";
    for (let y = 0; y < 8; y++) {
        let pieces = fen.split(" ")[0].split("/")[y];
        curCol = fen.split(" ")[1] ? (fen.split(" ")[1] === "w" ? "Light" : "Dark") : "Light";
        if (fen.split(" ")[2]) {
            for (let c of Object.keys(castling)) {
                castling[c] = false;
            }
            for (let c of fen.split(" ")[2].split("")) {
                castling[c] = true;
            }
        }
        enPassant = fen.split(" ")[3] ? fen.split(" ")[3] : "-";
        halfMoves = fen.split(" ")[4] ? parseInt(fen.split(" ")[4]) : 0;
        fullMoves = fen.split(" ")[5] ? parseInt(fen.split(" ")[5]) : 0;
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
                    $("#" + id).append("<img id='" + piece + "_" + id + "' class='pieces' src='../Pieces/" + svg + ".svg' data-piece='" + piece + "' data-color='" + dataCol + "' data-position='" + id + "' style='" + style + "' draggable='false'></img>");
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
        if (curPiece !== null && legalMoves.includes(document.elementsFromPoint(e.clientX, e.clientY)[document.elementsFromPoint(e.clientX, e.clientY).map(t => t.className).indexOf("tiles")].id)) {
            let targets = document.elementsFromPoint(e.clientX, e.clientY);
            let newPos = targets[targets.map(t => t.className).indexOf("tiles")].id;
            movePiece(curPiece, curPiece.dataset.position, newPos);
        }
        else {
            mouseDown = 1;
            curPiece = e.target;

            if (curCol === curPiece.dataset.color && curPiece.className === "pieces") {
                curPos = e.target.dataset.position;
                getLegalMoves();
        
                $(curPiece).on("mousemove", e => {
                    $("img").css("z-index", "1");
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
                        if (targets[targets.map(t => t.className).indexOf("tiles")]) {
                            let newPos = targets[targets.map(t => t.className).indexOf("tiles")].id;
                        
                            movePiece(curPiece, curPos, newPos);
                        }
                        else {
                            movePiece(curPiece, curPos, curPos);
                        }
        
                        $("img").css("z-index", "1");
                        $(".tiles").unbind();
                        $(".tiles").on("mousedown", e => {
                            onMouseDown(e);
                        });
                    }
                });
            }
            else {
                curPiece = null;
                legalMoves = [];
                drawMoves();
            }
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
    $(piece).attr("style", style);

    if (oldPos !== newPos && legalMoves.includes(newPos) && curPiece !== null) {
        legalMoves = [];
        drawMoves();

        let capture = $("#" + newPos).children().length === 1 ? "x" : "";
        let pieceType = piece.dataset.piece === "P" ? (capture ? piece.dataset.position.split("")[0] : "") : piece.dataset.piece;
        let multipPos = true ? "" : "x"; // If multiple possible pieces
        let mate = false;
        let check = true ? (mate ? "#" : "+") : "";

        if (curCol === "Light") {
            moves[(Object.keys(moves).length + 1) + "."] = [];
        }
        
        moves[(Object.keys(moves).length) + "."].push(pieceType + multipPos + capture + newPos);

        $("#" + newPos).html(piece);
        $("#" + oldPos).html("");
        piece.dataset.position = newPos;

        curPiece = null;
        curCol = curCol === "Light" ? "Dark" : "Light";
    }
    else if (oldPos === newPos && piece) {
        piece.dataset.position = newPos;
    }
}

function getLegalMoves() {
    // Also check checks, mates and discovered checks
    legalMoves = [];
    let pos = curPiece.dataset.position.split("");
    let u = true;
    let d = true;
    let r = true;
    let l = true;
    let ur = true;
    let ul = true;
    let dr = true;
    let dl = true;
    switch (curPiece.dataset.piece) {
        case "P":
            if (curPiece.dataset.color === "Light") {
                if (!getPieceAt(pos[0] + (parseInt(pos[1]) + 1))) {
                    legalMoves.push(pos[0] + (parseInt(pos[1]) + 1));
                    if (pos[1] === "2" && !getPieceAt(pos[0] + (parseInt(pos[1]) + 2))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) + 2));
                    }
                }
                if (columns[columns.indexOf(pos[0]) - 1]) {
                    let po = columns[columns.indexOf(pos[0]) - 1] + (parseInt(pos[1]) + 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Dark") {
                        legalMoves.push("x" + po);
                    }
                }
                if (columns[columns.indexOf(pos[0]) + 1]) {
                    let po = columns[columns.indexOf(pos[0]) + 1] + (parseInt(pos[1]) + 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Dark") {
                        legalMoves.push("x" + po);
                    }
                }
            }
            else if (curPiece.dataset.color === "Dark") {
                if (!getPieceAt(pos[0] + (parseInt(pos[1]) - 1))) {
                    legalMoves.push(pos[0] + (parseInt(pos[1]) - 1));
                    if (pos[1] === "7" && !getPieceAt(pos[0] + (parseInt(pos[1]) - 2))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) - 2));
                    }
                }
                if (columns[columns.indexOf(pos[0]) - 1]) {
                    let po = columns[columns.indexOf(pos[0]) - 1] + (parseInt(pos[1]) - 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Light") {
                        legalMoves.push("x" + po);
                    }
                }
                if (columns[columns.indexOf(pos[0]) + 1]) {
                    let po = columns[columns.indexOf(pos[0]) + 1] + (parseInt(pos[1]) - 1);
                    let p = getPieceAt(po);
                    if (p && p.dataset.color === "Light") {
                        legalMoves.push("x" + po);
                    }
                }
            }

            break;
        case "K":
            for (let i = 1; i < 2; i++) {
                if (u && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(pos[0] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) + i));
                    }
                    else if (getPieceAt(pos[0] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + pos[0] + (parseInt(pos[1]) + i));
                        u = false;
                    }
                    else {
                        u = false;
                    }
                }
                else {
                    u = false;
                }
                if (d && parseInt(pos[1]) - i >= 1) {
                    if (!getPieceAt(pos[0] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) - i));
                    }
                    else if (getPieceAt(pos[0] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + pos[0] + (parseInt(pos[1]) - i));
                        d = false;
                    }
                    else {
                        d = false;
                    }
                }
                else {
                    d = false;
                }
                if (r && columns.indexOf(pos[0]) + i < 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1])) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + pos[1]);
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1]).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + pos[1]);
                        r = false;
                    }
                    else {
                        r = false;
                    }
                }
                else {
                    r = false;
                }
                if (l && columns.indexOf(pos[0]) - i > 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1])) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + pos[1]);
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1]).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + pos[1]);
                        l = false;
                    }
                    else {
                        l = false;
                    }
                }
                else {
                    l = false;
                }
            }
            for (let i = 1; i < 2; i++) {
                if (ur && columns.indexOf(pos[0]) + i < 8 && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i));
                        ur = false;
                    }
                    else {
                        ur = false;
                    }
                }
                else {
                    ur = false;
                }
                if (ul && columns.indexOf(pos[0]) - i >= 0 && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i));
                        ul = false;
                    }
                    else {
                        ul = false;
                    }
                }
                else {
                    ul = false;
                }
                if (dr && columns.indexOf(pos[0]) + i < 8 && parseInt(pos[1]) - i > 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i));
                        dr = false;
                    }
                    else {
                        dr = false;
                    }
                }
                else {
                    dr = false;
                }
                if (dl && columns.indexOf(pos[0]) - i >= 0 && parseInt(pos[1]) - i > 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i));
                        dl = false;
                    }
                    else {
                        dl = false;
                    }
                }
                else {
                    dl = false;
                }
            }
            break;
        case "Q":
            for (let i = 1; i < 8; i++) {
                if (u && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(pos[0] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) + i));
                    }
                    else if (getPieceAt(pos[0] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + pos[0] + (parseInt(pos[1]) + i));
                        u = false;
                    }
                    else {
                        u = false;
                    }
                }
                else {
                    u = false;
                }
                if (d && parseInt(pos[1]) - i >= 1) {
                    if (!getPieceAt(pos[0] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) - i));
                    }
                    else if (getPieceAt(pos[0] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + pos[0] + (parseInt(pos[1]) - i));
                        d = false;
                    }
                    else {
                        d = false;
                    }
                }
                else {
                    d = false;
                }
                if (r && columns.indexOf(pos[0]) + i < 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1])) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + pos[1]);
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1]).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + pos[1]);
                        r = false;
                    }
                    else {
                        r = false;
                    }
                }
                else {
                    r = false;
                }
                if (l && columns.indexOf(pos[0]) - i >= 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1])) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + pos[1]);
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1]).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + pos[1]);
                        l = false;
                    }
                    else {
                        l = false;
                    }
                }
                else {
                    l = false;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (ur && columns.indexOf(pos[0]) + i < 8 && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i));
                        ur = false;
                    }
                    else {
                        ur = false;
                    }
                }
                else {
                    ur = false;
                }
                if (ul && columns.indexOf(pos[0]) - i >= 0 && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i));
                        ul = false;
                    }
                    else {
                        ul = false;
                    }
                }
                else {
                    ul = false;
                }
                if (dr && columns.indexOf(pos[0]) + i < 8 && parseInt(pos[1]) - i > 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i));
                        dr = false;
                    }
                    else {
                        dr = false;
                    }
                }
                else {
                    dr = false;
                }
                if (dl && columns.indexOf(pos[0]) - i >= 0 && parseInt(pos[1]) - i > 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i));
                        dl = false;
                    }
                    else {
                        dl = false;
                    }
                }
                else {
                    dl = false;
                }
            }
            break;
        case "B":
            for (let i = 1; i < 8; i++) {
                if (ur && columns.indexOf(pos[0]) + i < 8 && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) + i));
                        ur = false;
                    }
                    else {
                        ur = false;
                    }
                }
                else {
                    ur = false;
                }
                if (ul && columns.indexOf(pos[0]) - i >= 0 && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) + i));
                        ul = false;
                    }
                    else {
                        ul = false;
                    }
                }
                else {
                    ul = false;
                }
                if (dr && columns.indexOf(pos[0]) + i < 8 && parseInt(pos[1]) - i > 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + (parseInt(pos[1]) - i));
                        dr = false;
                    }
                    else {
                        dr = false;
                    }
                }
                else {
                    dr = false;
                }
                if (dl && columns.indexOf(pos[0]) - i >= 0 && parseInt(pos[1]) - i > 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i)).toString();
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + (parseInt(pos[1]) - i));
                        dl = false;
                    }
                    else {
                        dl = false;
                    }
                }
                else {
                    dl = false;
                }
            }
            break;
        case "N":

            break;
        case "R":
            for (let i = 1; i < 8; i++) {
                if (u && parseInt(pos[1]) + i <= 8) {
                    if (!getPieceAt(pos[0] + (parseInt(pos[1]) + i))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) + i));
                    }
                    else if (getPieceAt(pos[0] + (parseInt(pos[1]) + i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + pos[0] + (parseInt(pos[1]) + i));
                        u = false;
                    }
                    else {
                        u = false;
                    }
                }
                else {
                    u = false;
                }
                if (d && parseInt(pos[1]) - i >= 1) {
                    if (!getPieceAt(pos[0] + (parseInt(pos[1]) - i))) {
                        legalMoves.push(pos[0] + (parseInt(pos[1]) - i));
                    }
                    else if (getPieceAt(pos[0] + (parseInt(pos[1]) - i)).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + pos[0] + (parseInt(pos[1]) - i));
                        d = false;
                    }
                    else {
                        d = false;
                    }
                }
                else {
                    d = false;
                }
                if (r && columns.indexOf(pos[0]) + i < 8) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1])) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) + i] + pos[1]);
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) + i] + pos[1]).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) + i] + pos[1]);
                        r = false;
                    }
                    else {
                        r = false;
                    }
                }
                else {
                    r = false;
                }
                if (l && columns.indexOf(pos[0]) - i >= 0) {
                    if (!getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1])) {
                        legalMoves.push(columns[columns.indexOf(pos[0]) - i] + pos[1]);
                    }
                    else if (getPieceAt(columns[columns.indexOf(pos[0]) - i] + pos[1]).dataset.color !== curPiece.dataset.color) {
                        legalMoves.push("x" + columns[columns.indexOf(pos[0]) - i] + pos[1]);
                        l = false;
                    }
                    else {
                        l = false;
                    }
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

    let i = 0;
    for (let m of legalMoves) {
        console.log(m);
        let col = "#000";
        let circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(circ).attr("cx", s * (parseInt(columns.indexOf(m.replace("x", "").split("")[0])) + 0.5));
        $(circ).attr("cy", s * (parseInt(rows.indexOf(parseInt(m.replace("x", "").split("")[1]))) + 0.5));

        if (m.includes("x")) {
            $(circ).attr("r", s * 0.45);
            $(circ).attr("fill", "transparent");
            $(circ).attr("stroke", col);
            $(circ).attr("stroke-width", s / 10);
            $(circ).css("opacity", "0.1");
        }
        else {
            $(circ).attr("r", s / 6);
            $(circ).attr("fill:", col);
            $(circ).css("opacity", "0.1");
        }
        
        $("#dots").append(circ);

        legalMoves[i] = m.replace("x", "");
        i++;
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
    
    $("#lettersNumbers").attr("width", size);
    $("#lettersNumbers").attr("height", size);
    $("#lettersNumbers").css("top", $("#board").position().top);
    $("#lettersNumbers").css("left", $("#board").position().left);
}