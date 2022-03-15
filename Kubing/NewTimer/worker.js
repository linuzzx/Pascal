let solves;
let n;

onmessage = function(e) {
    solves = e.data[0];
    n = e.data[1];

    /*let avgArray = [];
    for (let i = n - 1; i < solves.length; i++) {
        avgArray.push(getAvg(i, n));
    }
    console.log(n,avgArray);*/
    postMessage("");
}

function getAvg(i, num) {
    let avgArr = [];
    let toRemove = Math.ceil(0.05 * num);

    if (i >= (num-1)) {
        let avg = 0;
        let arr = solves.map(s => s.time + (s.penalty === -1 ? Infinity : s.penalty)).slice(i-(num-1),i+1).sort(function(a, b) {return a-b;});

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
        }
    }
    else {
        return "-";
    }
}