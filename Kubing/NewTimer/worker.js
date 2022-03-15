let solves;
let n;

let averages = {
    3 : [],
    5 : [],
    12 : [],
    25 : [],
    50 : [],
    100 : [],
    200 : [],
    500 : [],
    1000 : [],
    2000 : [],
    5000 : [],
    10000 : []
};

onmessage = function(e) {
    solves = e.data;
    for (let i = 2; i < solves.length; i++) {
        getAvg(i);
    }
    postMessage(averages);
}

function getAvg(i) {
    let toRemove = 0;

    let arr = solves.map(s => s.time + (s.penalty === -1 ? Infinity : s.penalty));

    if (i > 1) {
        let avg = arr.slice(i - 2, i + 1).reduce((a, b) => a + b) / 3;
        averages["3"].push(avg);
    }
    if (i > 3) {
        toRemove = remove5(5);
        let avg = arr.slice(i - 4, i + 1).reduce((a, b) => a + b) / (5 - 2 * toRemove);
        averages["5"].push(avg);
    }
    if (i > 10) {
        toRemove = remove5(12);
        let avg = arr.slice(i - 11, i + 1).reduce((a, b) => a + b) / (12 - 2 * toRemove);
        averages["12"].push(avg);
    }
    if (i > 23) {
        toRemove = remove5(25);
        let avg = arr.slice(i - 24, i + 1).reduce((a, b) => a + b) / (25 - 2 * toRemove);
        averages["25"].push(avg);
    }
    if (i > 48) {
        toRemove = remove5(50);
        let avg = arr.slice(i - 49, i + 1).reduce((a, b) => a + b) / (50 - 2 * toRemove);
        averages["50"].push(avg);
    }
    if (i > 98) {
        toRemove = remove5(100);
        let avg = arr.slice(i - 99, i + 1).reduce((a, b) => a + b) / (100 - 2 * toRemove);
        averages["100"].push(avg);
    }
    if (i > 198) {
        toRemove = remove5(200);
        let avg = arr.slice(i - 199, i + 1).reduce((a, b) => a + b) / (200 - 2 * toRemove);
        averages["200"].push(avg);
    }
    if (i > 498) {
        toRemove = remove5(500);
        let avg = arr.slice(i - 499, i + 1).reduce((a, b) => a + b) / (500 - 2 * toRemove);
        averages["500"].push(avg);
    }
    if (i > 998) {
        toRemove = remove5(1000);
        let avg = arr.slice(i - 999, i + 1).reduce((a, b) => a + b) / (1000 - 2 * toRemove);
        averages["1000"].push(avg);
    }
    if (i > 1998) {
        toRemove = remove5(2000);
        let avg = arr.slice(i - 1999, i + 1).reduce((a, b) => a + b) / (2000 - 2 * toRemove);
        averages["2000"].push(avg);
    }
    if (i > 4998) {
        toRemove = remove5(5000);
        let avg = arr.slice(i - 4999, i + 1).reduce((a, b) => a + b) / (5000 - 2 * toRemove);
        averages["5000"].push(avg);
    }
    if (i > 9998) {
        toRemove = remove5(1000);
        let avg = arr.slice(i - 9999, i + 1).reduce((a, b) => a + b) / (10000 - 2 * toRemove);
        averages["10000"].push(avg);
    }

    /*
    let nArr;
    if (num === 3) {
        nArr = arr.slice();
    }
    else {
        nArr = arr.slice(toRemove,(num-toRemove));
    }

    for (let a of nArr) {
        avg += Math.floor(a/10);
    }
    
    avg /= nArr.length;
    
    if (avg === Infinity) {
        avgArr.push("DNF");
        return ("DNF");
    }
    else {
        avgArr.push(avg*10);
        return avg*10;
    }*/
}

function remove5(num) {
    return Math.ceil(0.05 * num);
}