let sq1 = [];
let sq1T = [];
let sq1B = [];
let eFlipped = false;

$(function() {
    reset();
    let out = "";

    out = "sq1T: "+sq1T.length+", Bottom: "+sq1B.length;
    $("body").html(out);
    u(0);
    d(0);
    slice()
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
    }
}

function canSlice() {
    console.log((sq1T[1] !== sq1T[2] && sq1T[7] !== sq1T[8] && sq1B[0] !== sq1B[1] && sq1B[6] !== sq1B[7]));
    return (sq1T[1] !== sq1T[2] && sq1T[7] !== sq1T[8] && sq1B[0] !== sq1B[1] && sq1B[6] !== sq1B[7]);
}

function reset() {
    sq1 = ["a","b","c","c","d","e","e","f","g","g","h","a","i","j","k","k","l","m","m","n","o","o","p","i"];
    sq1T = sq1.slice(0,12);
    sq1B = sq1.slice(12,24);
}