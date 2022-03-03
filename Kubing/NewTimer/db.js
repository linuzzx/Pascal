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
    /* const request = indexedDB.open(dbName);

    request.onupgradeneeded = e => {
        db = e.target.result;

        const store = db.createObjectStore(storeName);
    } */

    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.put(val, key);
}

function addToDB(key, val) {
    /* const request = indexedDB.open(dbName);

    request.onupgradeneeded = e => {
        db = e.target.result;

        const store = db.createObjectStore(storeName);
    } */
    openDB();

    const tx = db.transaction(storeName, readwrite);
    const store = tx.objectStore(storeName);
    store.add(val, key);
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

function getAllFromDB() {
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    
    request.onsuccess = e => {
        console.log(e.target.result);
        // List opp data
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

/*function getFromDB(key) {
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const item = store.get(key);

    return item;
}

function getAllKeysFromDB() {
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const items = store.getAllKeys();

    return items.source.name;
}

function getAllValuesFromDB() {
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const items = store.getAll();

    return items.result;
}*/