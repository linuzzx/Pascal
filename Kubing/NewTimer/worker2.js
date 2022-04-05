let solves;

onmessage = function(e) {
    let averages = {
        "3" : getAvg(e.data, 3),
        "5" : getAvg(e.data, 5),
        "12" : getAvg(e.data, 12),
        "25" : getAvg(e.data, 25),
        "50" : getAvg(e.data, 50),
        "100" : getAvg(e.data, 100),
        /*"200" : getAvg(e.data, 200),
        "500" : getAvg(e.data, 500),
        "1000" : getAvg(e.data, 1000),
        "2000" : getAvg(e.data, 2000),
        "5000" : getAvg(e.data, 5000),
        "10000" : getAvg(e.data, 10000),*/
    }
    postMessage(averages);
}

function getAvg(solves, n) {
    let bestAvg = Infinity;
    let firstIndex = 0;
    let lastIndex = 0;
    let toRemove = remove5(n);
    for (let i = 0; i < solves.length; i++) {
        if (i >= n-1) {
            let sArr = solves.slice(i - n + 1, i + 1);
            if (n !== 3) {
                sArr = sArr.sort((a, b) => (b.time + (b.penalty === -1 ? Infinity : b.penalty)) - (a.time + (a.penalty === -1 ? Infinity : a.penalty)))
                .slice(toRemove, -toRemove);
            }
            avg = 10 * Math.round(sumArr(sArr) / sArr.length);
            if (avg < bestAvg) {
                bestAvg = avg;
                firstIndex = i - (n - 1);
                lastIndex = i;
            }
        }
    }

    return {firstIndex, lastIndex, bestAvg};
}

function sumArr(arr) {
    let sum = 0;
    for (let a of arr) {
        let penalty = a.penalty === -1 ? Infinity : a.penalty;
        sum += Math.floor((a.time + penalty) / 10);
    }
    return sum;
}

function remove5(num) {
    return Math.ceil(0.05 * num);
}