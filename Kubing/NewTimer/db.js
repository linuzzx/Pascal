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
        store2.createIndex("totalTimeIDX", "totalTime", {unique: false});
        store2.createIndex("ao3IDX", "ao3", {unique: false});
        store2.createIndex("ao5IDX", "ao5", {unique: false});
        store2.createIndex("ao12IDX", "ao12", {unique: false});
        store2.createIndex("ao25IDX", "ao25", {unique: false});
        store2.createIndex("ao50IDX", "ao50", {unique: false});
        store2.createIndex("ao100IDX", "ao100", {unique: false});
        store2.createIndex("ao200IDX", "ao200", {unique: false});
        store2.createIndex("ao500IDX", "ao500", {unique: false});
        store2.createIndex("ao1000IDX", "ao1000", {unique: false});
        store2.createIndex("ao2000IDX", "ao2000", {unique: false});
        store2.createIndex("ao5000IDX", "ao5000", {unique: false});
        store2.createIndex("ao10000IDX", "ao10000", {unique: false});

        localStorage.removeItem("einarkl_timer_settings");
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
        store.add({
            totalTime: s.time + (s.penalty === -1 ? Infinity : s.penalty),
            time: s.time,
            penalty: s.penalty,
            comment: s.comment,
            date: s.date,
            index: i,
            avg: {}
        }, i);
        i++;
    }

    getCurStats();
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

function getAllSolutionsFromDB(exporting = false) {
    const tx = db.transaction("solutions", readonly);
    const store = tx.objectStore("solutions");
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

function getCurStats() {
    
    const tx = db.transaction("solutions", readwrite);
    const store = tx.objectStore("solutions");
    const request = store.getAll();
    let data;
    
    request.onsuccess = e => {
        data = e.target.result;

        for (let n of ["3", "5", "12", "25", "50", "100", "200", "500", "1000", "2000", "5000", "10000"]) {
            averages["cur"][n] = getAvg(data.map(t => t.totalTime).slice(data.length-parseInt(n)), parseInt(n));
        }
        
        let i = 0;
        for (let t of data) {
            let ao3 = getAvg(data.map(s => s.totalTime).slice(i - 2), 3);
            let ao5 = getAvg(data.map(s => s.totalTime).slice(i - 4), 5);
            let ao12 = getAvg(data.map(s => s.totalTime).slice(i - 11), 12);
            let ao25 = getAvg(data.map(s => s.totalTime).slice(i - 24), 25);
            let ao50 = getAvg(data.map(s => s.totalTime).slice(i - 49), 50);
            let ao100 = getAvg(data.map(s => s.totalTime).slice(i - 99), 100);
            let ao200 = getAvg(data.map(s => s.totalTime).slice(i - 199), 200);
            let ao500 = getAvg(data.map(s => s.totalTime).slice(i - 499), 500);
            let ao1000 = getAvg(data.map(s => s.totalTime).slice(i - 999), 1000);
            let ao2000 = getAvg(data.map(s => s.totalTime).slice(i - 1999), 2000);
            let ao5000 = getAvg(data.map(s => s.totalTime).slice(i - 4999), 5000);
            let ao10000 = getAvg(data.map(s => s.totalTime).slice(i - 9999), 10000);
            let sol = {
                totalTime: t.totalTime,
                time: t.time,
                penalty: t.penalty,
                comment: t.comment,
                date: t.date,
                index: t.index,
                ao3: ao3,
                ao5: ao5,
                ao12: ao12,
                ao25: ao25,
                ao50: ao50,
                ao100: ao100,
                ao200: ao200,
                ao500: ao500,
                ao1000: ao1000,
                ao2000: ao2000,
                ao5000: ao5000,
                ao10000: ao10000
            };
            store.put(sol, i);
            i++;
        }

        getBestStats();
    }

    request.onerror = e => {
        console.log(e);
    }
}

function getBestStats() {
    const tx = db.transaction("solutions", readonly);
    const store = tx.objectStore("solutions");
    const idx = store.index("totalTimeIDX");
    const request = idx.getAll();
    let data;
    
    request.onsuccess = e => {
        data = e.target.result;
        solutionsSorted = data;
        for (let n of ["3", "5", "12", "25", "50", "100", "200", "500", "1000", "2000", "5000", "10000"]) {
            getBestAvgFromDB(n);
        }
    }

    request.onerror = e => {
        console.log(e);
    }
}

function getBestAvgFromDB(n) {
    const tx = db.transaction("solutions", readonly);
    const store = tx.objectStore("solutions");
    const idx = store.index("ao" + n + "IDX");
    const request = idx.getAll();
    let data;
    
    request.onsuccess = e => {
        data = e.target.result;
        if (data[0]) {
            let b = data[0]["ao" + n];
            let i = data[0]["index"];
            averages["best"][n] = b === "-" ? "DNF" : b;
            averages["bestLastIDX"][n] = b === "-" ? (n - 1) : i;
        }
        updateStats();
    }

    request.onerror = e => {
        console.log(e);
    }
}