const dbName = "einarkl_timer";
const storeName = "sessions";
const version = 1;
const readwrite = "readwrite";
const readonly = "readonly";

let db = null;

let arrays = {
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

function openDB(func, arg1 = null, arg2 = null, arg3 = null) {
    const request = indexedDB.open(dbName);
    
    request.onupgradeneeded = e => {
        db = e.target.result;

        const store = db.createObjectStore(storeName);
    }
    
    request.onsuccess = e => {
        db = e.target.result;
        if (func) {
            if (arg3) {
                func(arg1,arg2,arg3);
            }
            else if (arg2) {
                func(arg1,arg2);
            }
            else if (arg1) {
                func(arg1);
            }
            else {
                func();
            }
        }
    }
    
    request.onerror = e => {
        console.log(e);
    }
}

function editDB(key, val, dontGetAll = false) {
    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.put(val, key);
    
    if (!dontGetAll) {
        getAllFromDB();
    }
}

function addToDB(key, val, dontGetAll = false) {
    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.add(val, key);
    
    if (!dontGetAll) {
        getAllFromDB();
    }
}

function getFromDB(key) {
    var tx = db.transaction(storeName);
    var store = tx.objectStore(storeName);
    var request = store.get(key);
    
    request.onsuccess = e => {
        if (request.result) {
            return request.result;
        }
        else {
            console.log(e);
        }
    };
    
    request.onerror = e => {
       console.log(e);
    };
}

function getAllFromDB(exporting = false) {
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    let data;
    
    request.onsuccess = e => {
        data = e.target.result;
        // List opp data
        if (exporting) {
            getExportData(data);
        }
        else {
            getData(data);
            //handleDataFromDB(data);
        }
    }

    request.onerror = e => {
        console.log(e);
    }
}

function handleDataFromDB(data) {
    let start = Date.now();
    let w = new Worker("worker.js");
    let averagesArr;
    let solves = data[curSession].solutions;

    if (solves) {
        w.postMessage(solves);
        w.onmessage = function(e) {
            averagesArr = e.data;
            console.log(averagesArr);
            console.log("in " + (Date.now() - start) + "ms");
            w.terminate()
        }
    }
}

function handleDataFromDB2(data) {
    let start = Date.now();
    let w3 = new Worker("worker.js");
    let w5 = new Worker("worker.js");
    let w12 = new Worker("worker.js");
    let w25 = new Worker("worker.js");
    let w50 = new Worker("worker.js");

    w3.postMessage([data[curSession].solutions,3]);
    w5.postMessage([data[curSession].solutions,5]);
    w12.postMessage([data[curSession].solutions,12]);
    w25.postMessage([data[curSession].solutions,25]);
    w50.postMessage([data[curSession].solutions,50]);

    w3.onmessage = function() {console.log(Date.now() - start); w3.terminate()}
    w5.onmessage = function() {w5.terminate()}
    w12.onmessage = function() {w12.terminate()}
    w25.onmessage = function() {w25.terminate()}
    w50.onmessage = function() {w50.terminate()}

    /*let solArr = sessionList[curSession].solutions.map(s => s.time);
    let arr = solArr.slice();
    
    // pbList
    $("#pbList").empty();
    $("#pbList").append("<tr><th>Single</th><td id='curSingle' class='cellToClick'>-</td><td id='bestSingle' class='cellToClick'>-</td></tr>");

    // timeList
    $("#timeList").empty();

    emptyAvgArrays();

    if (arr.length !== 0) {
        // timeList
        for (let s of sessionList[curSession].solutions) {
            let i = sessionList[curSession].solutions.indexOf(s);
            let i5 = i - 4;
            let i12 = i - 11;
            let c = s.comment !== "" ? "*" : "&nbsp;";
            
            let single = "<td class='cellToClick' onclick='showInfo("+i+", 1)'>"+getHHmmsshh(s.time, s.penalty)+"</td>";
            let ao5 = "<td class='cellToClick' onclick='showInfo("+i5+", 5)'>"+getHHmmsshh(getAo5(sessionList[curSession], i))+"</td>";
            let ao12 = "<td class='cellToClick' onclick='showInfo("+i12+", 12)'>"+getHHmmsshh(getAo12(sessionList[curSession], i))+"</td>";
            $("#timeList").append("<tr><td>"+(i + 1) + c +"</td>"+single+ao5+ao12+"</tr>");
            getMo3(sessionList[curSession], i);
            getAo25(sessionList[curSession], i);
            getAo50(sessionList[curSession], i);
            getAo100(sessionList[curSession], i);*/
            /*getAo200(sessionList[curSession], i);
            getAo500(sessionList[curSession], i);
            getAo1000(sessionList[curSession], i);
            getAo2000(sessionList[curSession], i);
            getAo5000(sessionList[curSession], i);
            getAo10000(sessionList[curSession], i);*/
        /*}

        if (listLatestFirst) {
            reverseTable("#timeList");
        }

        // pbList
        let rArr = arr.reverse();
        curSingle = rArr[0];

        let sArr = arr.sort(function(a, b){return a-b});
        bestSingle = sArr[0];

        $("#curSingle").text(getHHmmsshh(curSingle));
        $("#bestSingle").text(getHHmmsshh(bestSingle));
        
        $("#curSingle").on("click", function() {
            let i = solArr.indexOf(curSingle);
            showInfo(i, 1, true);
        });
        
        $("#bestSingle").on("click", function() {
            let i = solArr.indexOf(bestSingle);
            showInfo(i, 1, true);
        });
        
        if (arr.length >= 3) {
            addToPBList(3, mo3s);
        }
        if (arr.length >= 5) {
            addToPBList(5, ao5s);
        }
        if (arr.length >= 12) {
            addToPBList(12, ao12s);
        }
        if (arr.length >= 25) {
            addToPBList(25, ao25s);
        }
        if (arr.length >= 50) {
            addToPBList(50, ao50s);
        }
        if (arr.length >= 100) {
            addToPBList(100, ao100s);
        }*/
        /*if (arr.length >= 200) {
            addToPBList(200, ao200s);
        }
        if (arr.length >= 500) {
            addToPBList(500, ao500s);
        }
        if (arr.length >= 1000) {
            addToPBList(1000, ao1000s);
        }
        if (arr.length >= 2000) {
            addToPBList(2000, ao2000s);
        }
        if (arr.length >= 5000) {
            addToPBList(5000, ao5000s);
        }
        if (arr.length >= 10000) {
            addToPBList(10000, ao10000s);
        }*/
    /*}
    adjustSize();*/
}

function removeFromDB(key) {
    const request = db.transaction(storeName, readwrite)
    .objectStore(storeName)
    .delete(key);
    
    request.onsuccess = e => {
       
    };
    
    request.onerror = e => {
        console.log(e);
    };
}

function removeAllFromDB() {
    doNotCreateNew = true;
    const request = db.transaction(storeName, readwrite)
    .objectStore(storeName)
    .clear();
    
    request.onsuccess = e => {
        
    };
    
    request.onerror = e => {
        console.log(e);
    };
}

async function getStats() {
    let worker3 = new Worker('webWorker.js');
    let worker5 = new Worker('webWorker.js');
    let worker12 = new Worker('webWorker.js');
    let worker25 = new Worker('webWorker.js');
    let worker50 = new Worker('webWorker.js');
    let worker100 = new Worker('webWorker.js');
    let worker200 = new Worker('webWorker.js');
    let worker500 = new Worker('webWorker.js');
    let worker1000 = new Worker('webWorker.js');
    let worker2000 = new Worker('webWorker.js');
    let worker5000 = new Worker('webWorker.js');
    let worker10000 = new Worker('webWorker.js');

    worker3.postMessage([curSession, 3]);
    worker5.postMessage([curSession, 5]);
    worker12.postMessage([curSession, 12]);
    worker25.postMessage([curSession, 25]);
    worker50.postMessage([curSession, 50]);
    worker100.postMessage([curSession, 100]);
    worker200.postMessage([curSession, 200]);
    worker500.postMessage([curSession, 500]);
    worker1000.postMessage([curSession, 1000]);
    worker2000.postMessage([curSession, 2000]);
    worker5000.postMessage([curSession, 5000]);
    worker10000.postMessage([curSession, 10000]);

    worker3.onmessage = function (e) {
        mo3s = e.data;
        worker3.terminate();
    }
    worker5.onmessage = function (e) {
        ao5s = e.data;
        worker5.terminate();
    }
    worker12.onmessage = function (e) {
        ao12s = e.data;
        worker12.terminate();
    }
    worker25.onmessage = function (e) {
        ao25s = e.data;
        worker25.terminate();
    }
    worker50.onmessage = function (e) {
        ao50s = e.data;
        worker50.terminate();
    }
    worker100.onmessage = function (e) {
        ao100s = e.data;
        worker100.terminate();
    }
    worker200.onmessage = function (e) {
        ao200s = e.data;
        worker200.terminate();
    }
    worker500.onmessage = function (e) {
        ao500s = e.data;
        worker500.terminate();
    }
    worker1000.onmessage = function (e) {
        ao1000s = e.data;
        worker1000.terminate();
    }
    worker2000.onmessage = function (e) {
        ao2000s = e.data;
        worker2000.terminate();
    }
    worker5000.onmessage = function (e) {
        ao5000s = e.data;
        worker5000.terminate();
    }
    worker10000.onmessage = function (e) {
        ao10000s = e.data;
        worker10000.terminate();
    }
}

async function getStats2(curSes, num) {
    let worker = new Worker('webWorker.js');
    worker.postMessage([curSes, num]);

    worker.onmessage = function (e) {
        if (num === 3) {
            //mo3s = e.data;
            arrays["3"] = e.data;
        }
        else if (num === 5) {
            //ao5s = e.data;
            arrays["5"] = e.data;
        }
        else if (num === 12) {
            //ao12s = e.data;
            arrays["12"] = e.data;
        }
        else if (num === 25) {
            //ao25s = e.data;
            arrays["25"] = e.data;
        }
        else if (num === 50) {
            //ao50s = e.data;
            arrays["50"] = e.data;
        }
        else if (num === 100) {
            //ao100s = e.data;
            arrays["100"] = e.data;
        }
        else if (num === 200) {
            //ao200s = e.data;
            arrays["200"] = e.data;
        }
        else if (num === 500) {
            //ao500s = e.data;
            arrays["500"] = e.data;
        }
        else if (num === 1000) {
            //ao1000s = e.data;
            arrays["1000"] = e.data;
        }
        else if (num === 2000) {
            //ao2000s = e.data;
            arrays["2000"] = e.data;
        }
        else if (num === 5000) {
            //ao5000s = e.data;
            arrays["5000"] = e.data;
        }
        else if (num === 10000) {
            //ao10000s = e.data;
            arrays["10000"] = e.data;
        }

        console.log(arrays);
        worker.terminate();
    }
}