let board = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

$(function() {
    visualize("530070000600195000098000060800060003400803001700020006060000280000419005000080079");
});

function visualize(board) {
    let arr = board.split("").map(n => parseInt(n));
    let arr2 = [
        arr.slice(0,9),
        arr.slice(9,18),
        arr.slice(18,27),
        arr.slice(27,36),
        arr.slice(36,45),
        arr.slice(45,54),
        arr.slice(54,63),
        arr.slice(63,72),
        arr.slice(72,89)
    ];console.log(arr2);
    let out = "<table>";
    for (let j = 0; j < arr2.length; j++) {
        out += "<tr>";
        for (let i = 0; i < arr2[j].length; i++) {
            out += "<td>" + (arr2[j][i] === 0 ? " " : arr2[j][i]) + "</td>";
        }
        out += "</tr>";
    }
    out += "</table>";
    
    $("#sudokuBoard").html(out);
    getBoard();
}

function getBoard() {
    let row = 0;
    let col = 0;
    for (let td of $("#sudokuBoard table td").text()) {
        if (td === " ") {
            td = 0;
        }
        board[row][col] = parseInt(td);

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
                        solve();
                        board[y][x] = 0;
                    }
                }
                break;
            }
        }
    }
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