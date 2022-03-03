const dbName = "einarkl_timer";
const storeName = "sessions";
const version = 1;
const readwrite = "readwrite";
const readonly = "readonly";

let db = null;

function openDB(func) {
    console.log(func);
    const request = indexedDB.open(dbName);

    request.onupgradeneeded = e => {
        db = e.target.result;

        const store = db.createObjectStore(storeName);
    }
    
    request.onsuccess = e => {
        db = e.target.result;
        if (func) {
            func();
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
    openDB();

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
    console.log("HER ER JEG");
    const tx = db.transaction(storeName, readonly);
    const store = tx.objectStore(storeName);
    const request = store.openCursor();
    request.onsuccess = e => {
        const cursor = e.target.result;

        if (cursor) {
            console.log(cursor.key,cursor.value);
            return cursor.value;
            // Do something with the cursor
            cursor.continue();
        }
    }
    
    request.onerror = e => {
        console.log(e);
    };
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