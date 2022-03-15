const dbName = "einarkl_timer";
const storeName = "sessions";
const readonly = "readonly";
let db, tx, store;
let curSession;
let nArr = [];
let num = 0;

onmessage = function(e) {
    curSession = e.data[0];
    num = e.data[1];

    const request = indexedDB.open(dbName);

    request.onupgradeneeded = e => {
        db = e.target.result;
        store = db.createObjectStore(storeName);

        calculateAvg();
    }

    request.onsuccess = e => {
        db = e.target.result;
        
        calculateAvg();
    }

    request.onerror = e => {
        console.log(e);
    }
}

function calculateAvg() {
    tx = db.transaction(storeName, readonly);
    store = tx.objectStore(storeName);
    
    store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            let session = cursor.value;

            if (session.rank === curSession + 1) {
                nArr = session.solutions.slice(num - 1,session.solutions.length - 1).map(s => getAvg(session, session.solutions.indexOf(s), num));

                postMessage(nArr);
            }
    
            cursor.continue();
        } 
        else {
            console.log('Entries all displayed.');
        }
    };
}

function getAvg(s, i, num) {
    let avgArr = [];
    let toRemove = Math.ceil(0.05 * num);

    if (i >= (num-1)) {
        let avg = 0;
        let arr = s.solutions.map(s => s.time + (s.penalty === -1 ? Infinity : s.penalty)).slice(i-(num-1),i+1).sort(function(a, b) {return a-b;});

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