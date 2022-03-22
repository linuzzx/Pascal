let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let tdActive = false;

$(function() {
    initActions();
});

function visualize() {
    let out = "<table>";
    for (let j = 0; j < board.length; j++) {
        out += "<tr>";
        for (let i = 0; i < board[j].length; i++) {
            out += "<td>" + (board[j][i] === 0 ? "&nbsp;" : board[j][i]) + "</td>";
        }
        out += "</tr>";
    }
    out += "</table>";
    
    $("#sudokuBoard").html(out);
}

function makeBoard(str) {
    let arr = str.split("").map(n => parseInt(n));
    board = [
        arr.slice(0,9),
        arr.slice(9,18),
        arr.slice(18,27),
        arr.slice(27,36),
        arr.slice(36,45),
        arr.slice(45,54),
        arr.slice(54,63),
        arr.slice(63,72),
        arr.slice(72,89)
    ];
}

function getBoard() {
    let row = 0;
    let col = 0;
    for (let td of $("#sudokuBoard table td").text()) {
        board[row][col] = parseInt(td) || 0;

        col++;
        if (col === 9) {
            col = 0;
            row++;
        }
    }
}

function solve() {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (board[y][x] === 0) {
                for (let n = 1; n < 10; n++) {
                    if (possible(y, x, n)) {
                        board[y][x] = n;
                        if (solve()) {
                            return board;
                        }
                        else {
                            board[y][x] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    visualize();
    return board;
}

function possible(y, x, n) {
    for (let i = 0; i < 9; i++) {
        if (board[y][i] === n) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (board[i][x] == n) {
            return false;
        }
    }
    const x0 = Math.floor(x / 3) * 3;
    const y0 = Math.floor(y / 3) * 3;
    for (let j = 0; j < 3; j++) {   
        for (let i = 0; i < 3; i++) {
            if (board[y0 + j][x0 + i] === n) {
                return false;
            }
        }
    }
    return true;
}

function initActions() {
    visualize();

    $("html").on("click", function(e) {
        if (tdActive) {
            $("#sudokuBoard td").removeClass("activeTD");
        }
    });

    $("#sudokuBoard td").on("click", function(e) {
        $("#sudokuBoard td").removeClass("activeTD");
        tdActive = true;
        $(this).addClass("activeTD");
        e.stopPropagation();
    });
    $("html").on("keydown", function(e) {
        if (tdActive && e.code.includes("Digit")) {
            let newVal;
            if (e.code === "Digit0") {
                newVal = "&nbsp;";
                $(".activeTD").html(newVal);
            }
            else {
                newVal = e.key;
                $(".activeTD").text(newVal);
            }
            tdActive = false;
            $("#sudokuBoard td").removeClass("activeTD");
            getBoard();
        }
        else {
            $("#sudokuBoard td").removeClass("activeTD");
        }
    });

    $(".activeInp").on("click", function(e) {
        alert("Hei")
    });
}