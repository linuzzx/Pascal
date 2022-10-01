const dbName = "einarkl_timer";
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

        const store = db.createObjectStore("sessions");
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

function editDB(storeName, key, val, dontGetAll = false) {
    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.put(val, key);
    
    if (!preventGetAll) {
        getAllFromDB();
    }
    preventGetAll = false;
}

function saveToDB(storeName, sol, dontGetAll = false) {
    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.put(val);
    
    if (!dontGetAll) {
        getAllFromDB();
    }
}

function createSolDB(storeName, dontGetAll = false) {console.log("hei");
    const store = db.createObjectStore(storeName);
    store.createIndex("timeIDX", "totalTime", {unique: false});
}

function addToDB(key, val, dontGetAll = false) {
    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.add(val, key);
    
    if (!dontGetAll) {
        getAllFromDB();
    }
}

function getFromDB(storeName, key) {
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
    let storeName = "sessions";
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    let data;
    
    request.onsuccess = e => {
        data = e.target.result;
        getAllFromDB2(data, exporting);
    }

    request.onerror = e => {
        console.log(e);
    }
}

function getAllFromDB2(dt, exporting = false) {
    let storeName = "solutions" + (curSession+1);
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    let data = {
        "sessions": dt,
        "solutions": []
    };
    console.log(exporting);
    request.onsuccess = e => {
        data.solutions = e.target.result;
        // List opp data
        if (exporting) {
            getExportData(data);
        }
        else {
            getData(data);
            console.log(data);
        }
    }

    request.onerror = e => {
        console.log(e);
    }
}

function removeFromDB(storeName, key) {
    const request = db.transaction(storeName, readwrite)
    .objectStore(storeName)
    .delete(key);
    
    request.onsuccess = e => {
       
    };
    
    request.onerror = e => {
        console.log(e);
    };
}

function removeAllFromDB(storeName) {
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

function getStats() {

}