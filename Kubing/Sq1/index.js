let sq1 = ["a2","b","c1","c2","d","e1","e2","f","g1","g2","h","a1","i2","j","k1","k2","l","m1","m2","n","o1","o2","p","i1"];
let sq1T = [];
let sq1B = [];
let eFlipped = false;

$(function() {
    reset();
    
    u(0);
    d(0);
    //slice()
});

function u(number) {
    let arr = [];
    let temp = sq1T;

    arr = turnFace(arr, temp, number);

    console.log(arr);
    sq1T = arr;
}

function d(number) {
    let arr = [];
    let temp = sq1B;

    arr = turnFace(arr, temp, number);

    console.log(arr);
    sq1B = arr;
}

function turnFace(arr, temp, number) {
    for (let i=0; i<temp.length; i++) {
        if (number === 0) {
            arr = temp;
        }
        else if (number < 0) {
            if (i-number > temp.length) {
                arr[i] = temp[i+number-temp.length];
            }
            else {
                arr[i] = temp[i+number];
            }
        }
        else if (number > 0) {
            if (i-number < 0) {
                arr[i] = temp[i-number+temp.length];
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

        console.log("arrT",arrT)
        console.log("arrB",arrB)

        sq1T = arrT;
        sq1B = arrB;
        drawTest()
    }
}

function canSlice() {
    return (sq1T[1].split("")[0] !== sq1T[2].split("")[0] && sq1T[7].split("")[0] !== sq1T[8].split("")[0] && 
            sq1B[0].split("")[0] !== sq1B[1].split("")[0] && sq1B[6].split("")[0] !== sq1B[7].split("")[0]);
}

function reset() {
    sq1T = sq1.slice(0,12);
    sq1B = sq1.slice(12,24);
}