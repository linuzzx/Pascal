let currentSq1 = ["a2","b","c1","c2","d","e1","e2","f","g1","g2","h","a1","i2","j","k1","k2","l","m1","m2","n","o1","o2","p","i1"];
let currentTop = ["a2","b","c1","c2","d","e1","e2","f","g1","g2","h","a1"];
let currentBottom = ["i2","j","k1","k2","l","m1","m2","n","o1","o2","p","i1"];

$(function() {
    
});

function scrambleSq1() {
    let movesBeforeShapeShift = 5;
    let numberOfMoves = 12;
    let scramble = "";

    outerloop:
    for (let i=0; i<numberOfMoves; i++) {
        doReset();
        let curMoves = "";
        let moveU = Math.floor(Math.random() * 12);
        let moveD = Math.floor(Math.random() * 12);

        if (moveU === 0 && moveD === 0) {
            i--;
            continue outerloop;
        }
        if (movesBeforeShapeShift > 0) {
            if ((i === 0 && moveU % 3 === moveD % 3) || (i > 0 && moveU % 3 !== moveD % 3)) {
                i--;
                continue outerloop;
            }
            else {
                curMoves += "("+makeMove(moveU)+","+makeMove(moveD)+")";
                doTurns(scramble + curMoves);
                if (!canDoSlice()) {
                    i--;
                    continue outerloop;
                }
                else {
                    movesBeforeShapeShift--;
                }
            }
        }
        else {
            curMoves += "("+makeMove(moveU)+","+makeMove(moveD)+")";
            doTurns(scramble + curMoves);
            if (!canDoSlice()) {
                i--;
                continue outerloop;
            }
        }

        if (i !== numberOfMoves-1) {
            curMoves += " / ";
        }
        else {
            if (canDoSlice() && Math.random() < 0.5) {
                curMoves += " / ";
                if (Math.random() < 0.25) {
                    numberOfMoves++;
                }
            }
        }
        scramble += curMoves;
    }

    $("#inpScramble").val(scramble);
    turn();
}

function doTurns(scrambleToDo) {
    let us = [];
    let ds = [];
    let slices = 0;
    let scr = scrambleToDo.replaceAll(" ","");

    for (let s of scr.split("")) {
        if (s === "/") {
            slices++;
        }
    }

    scr = scr.replaceAll("(","");
    scr = scr.replaceAll(")","");

    if (scr.split("")[0] === "/") {
        doSlice();
        slices--;
    }

    for (let t of scr.split("/")) {
        if (t.split(",").length === 2) {
            us.push(parseInt(t.split(",")[0]));
            ds.push(parseInt(t.split(",")[1]));
        }
    }
    
    for (let i=0; i<us.length; i++) {
        doU(us[i]);
        doD(ds[i]);
        if (slices !== 0) {
            doSlice();
            slices--;
        }
    }
}

function doU(number) {
    let arr = [];
    let temp = currentTop;

    arr = doTurnFace(arr, temp, number);

    currentTop = arr;
}

function doD(number) {
    let arr = [];
    let temp = currentBottom;

    arr = doTurnFace(arr, temp, number);

    currentBottom = arr;
}

function doSlice() {
    if (canDoSlice()) {
        let arrT = currentTop;
        let arrB = currentBottom;
        let temp = arrT.concat();

        for (let i=2; i<8; i++) {
            arrT[i] = arrB[i-1];
        }
        for (let i=1; i<7; i++) {
            arrB[i] = temp[i+1];
        }

        currentTop = arrT;
        currentBottom = arrB;
    }
}

function doTurnFace(arr, temp, number) {
    for (let i=0; i<temp.length; i++) {
        if (number === 0) {
            arr = temp;
        }
        else if (number > 0) {
            if (i-number < 0) {
                arr[i] = temp[i-number+temp.length];
            }
            else {
                arr[i] = temp[i-number];
            }
        }
        else if (number < 0) {
            if (i-number >= temp.length) {
                arr[i] = temp[i-number-temp.length];
            }
            else {
                arr[i] = temp[i-number];
            }
        }
    }

    return arr;
}

function canDoSlice() {
    return currentTop[1].split("")[0] !== currentTop[2].split("")[0] && currentTop[7].split("")[0] !== currentTop[8].split("")[0] && 
        currentBottom[0].split("")[0] !== currentBottom[1].split("")[0] && currentBottom[6].split("")[0] !== currentBottom[7].split("")[0];
}


function doReset() {
    currentTop = currentSq1.slice(0,12);
    currentBottom = currentSq1.slice(12,24);
}

function makeMove (move) {
    if (move > 6) {
        move = 6-move;
    }

    return move;
}