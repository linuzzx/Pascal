const dbName = "einarkl_timer";
const storeName = "sessions";
const version = 1;
const readwrite = "readwrite";
const readonly = "readonly";

let db = null;

function openDB(func, arg1 = null, arg2 = null) {
    const request = indexedDB.open(dbName);

    request.onupgradeneeded = e => {
        db = e.target.result;

        const store = db.createObjectStore(storeName);
    }
    
    request.onsuccess = e => {
        db = e.target.result;
        if (func) {
            if (arg2) {
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

function editDB(key, val) {
    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.put(val, key);
    getAllFromDB();
}

function addToDB(key, val) {
    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.add(val, key);
    getAllFromDB();
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
    let data = null;
    
    request.onsuccess = e => {
        data = e.target.result;
        // List opp data
        if (exporting) {
            getExportData(data);
        }
        else {
            getData(data);
        }
    }
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

    worker3.postMessage([curSession, mo3s, 3]);
    worker5.postMessage([curSession, ao5s, 5]);
    worker12.postMessage([curSession, ao12s, 12]);
    worker25.postMessage([curSession, ao25s, 25]);
    worker50.postMessage([curSession, ao50s, 50]);
    worker100.postMessage([curSession, ao100s, 100]);
    worker200.postMessage([curSession, ao100s, 200]);
    worker500.postMessage([curSession, ao100s, 500]);
    worker1000.postMessage([curSession, ao100s, 1000]);
    worker2000.postMessage([curSession, ao100s, 2000]);
    worker5000.postMessage([curSession, ao100s, 5000]);
    worker10000.postMessage([curSession, ao100s, 10000]);

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

async function getStats2(curSes, arr, num) {
    let worker = new Worker('webWorker.js');

    worker.postMessage([curSes, arr, num]);

    worker.onmessage = function (e) {
        arr = e.data;
        worker.terminate();
        console.log(arr);
    }
}