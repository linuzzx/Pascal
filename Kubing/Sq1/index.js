let sq1 = ["a2","b","c1","c2","d","e1","e2","f","g1","g2","h","a1","i2","j","k1","k2","l","m1","m2","n","o1","o2","p","i1"];
let sq1T = [];
let sq1B = [];
let eFlipped = false;

$(function() {
    reset();
    
    $("#inpScramble").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            turn();
        }
    });
});

function turn() {
    reset();
    const scramble = $("#inpScramble").val();
    let us = [];
    let ds = [];
    let slices = 0;
    let scr = scramble.replaceAll(" ","");

    for (let s of scr.split("")) {
        if (s === "/") {
            slices++;
        }
    }

    scr = scr.replaceAll("(","");
    scr = scr.replaceAll(")","");

    for (let t of scr.split("/")) {
        if (t.split(",").length === 2) {
            us.push(parseInt(t.split(",")[0]));
            ds.push(parseInt(t.split(",")[1]));
        }
    }

    console.log(scr);
    console.log(us);
    console.log(ds);
    console.log(slices);

    for (let i=0; i<us.length; i++) {
        u(us[i]);
        d(ds[i]);
        if (slices !== 0) {
            slice();
            slices--;
        }
    }
}

function u(number) {
    let arr = [];
    let temp = sq1T;

    arr = turnFace(arr, temp, number);

    sq1T = arr;
        
    drawSq1();
}

function d(number) {
    let arr = [];
    let temp = sq1B;

    arr = turnFace(arr, temp, number);

    sq1B = arr;
        
    drawSq1();
}

function turnFace(arr, temp, number) {
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
        //negative
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

function slice() {
    if (canSlice()) {
        eFlipped = !eFlipped;
        let arrT = sq1T;
        let arrB = sq1B;
        let temp = arrT.concat();

        for (let i=2; i<8; i++) {
            arrT[i] = arrB[i-1];
        }
        for (let i=1; i<7; i++) {
            arrB[i] = temp[i+1];
        }

        sq1T = arrT;
        sq1B = arrB;

        drawSq1();
    }
}

function canSlice() {
    return (sq1T[1].split("")[0] !== sq1T[2].split("")[0] && sq1T[7].split("")[0] !== sq1T[8].split("")[0] && 
            sq1B[0].split("")[0] !== sq1B[1].split("")[0] && sq1B[6].split("")[0] !== sq1B[7].split("")[0]);
}

function reset() {
    sq1T = sq1.slice(0,12);
    sq1B = sq1.slice(12,24);
    eFlipped = false;
}