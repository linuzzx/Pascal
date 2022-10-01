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

function openDB(func, storeName, arg1 = false, arg2 = false, arg3 = false) {
    const request = indexedDB.open(dbName);
    
    request.onupgradeneeded = e => {
        db = e.target.result;

        const store1 = db.createObjectStore("sessions");
        const store2 = db.createObjectStore("solutions");
        store2.createIndex("timeIDX", "time", {unique: false});
    }
    
    request.onsuccess = e => {
        db = e.target.result;
        if (func) {
            if (arg3 !== null) {
                func(storeName,arg1,arg2,arg3);
            }
            else if (arg2 !== null) {
                func(storeName,arg1,arg2);
            }
            else if (arg1 !== null) {
                func(storeName,arg1);
            }
            else {
                func(storeName);
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

function addSolutionsToDB(val) {
    removeAllFromDB("solutions");
    const tx = db.transaction("solutions", readwrite);
    const store = tx.objectStore("solutions");
    
    let i = 0;
    for (let s of val) {
        store.add({time: s.time + (s.penalty === -1 ? Infinity : s.penalty)}, i);
        i++;
    }
    
    getStats();
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
        }
    }

    request.onerror = e => {
        console.log(e);
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

function removeAllFromDB(s = storeName) {
    doNotCreateNew = true;
    const request = db.transaction(s, readwrite)
    .objectStore(s)
    .clear();
    
    request.onsuccess = e => {
        
    };
    
    request.onerror = e => {
        console.log(e);
    };
}

function getStats() {
    updateStats();
}