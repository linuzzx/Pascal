// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAloZyO2dw3stHt_9D0I0boDmjQ4SIElHQ",
  authDomain: "test-abe7e.firebaseapp.com",
  databaseURL: "https://test-abe7e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-abe7e",
  storageBucket: "test-abe7e.appspot.com",
  messagingSenderId: "952368821097",
  appId: "1:952368821097:web:8e7d90acd24560050083f8",
  measurementId: "G-66K5P877M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbref = ref(db);
console.log(db);
console.log(dbref);
class PR {
    constructor(event, single, NRs, CRs, WRs, avg, WRa, CRa, NRa) {
        this.event = event;
        this.single = single;
        this.NRs = NRs;
        this.CRs = CRs;
        this.WRs = WRs;
        this.avg = avg;
        this.NRa = NRa;
        this.CRa = CRa;
        this.WRa = WRa;
    }
}

let prData = [];

get(child(dbref, "PRs")).then((snapshot) => {
    snapshot.forEach(childSnapshot => {
        const c = childSnapshot.val();
        prData.push(new PR(c.event, c.single, c.NRs, c.CRs, c.WRs, c.avg, c.WRa, c.CRa, c.NRa));
    });
    makePRList();
});

function makePRList() {
    const table = $("#tbodyPR");
    let out = "";

    if ($(window).width() >= $(window).height()) {
        out = "<tr><th>Event</th><th>NR</th><th>CR</th><th>WR</th><th>Single</th><th>Average</th><th>WR</th><th>CR</th><th>NR</th></tr>";
        for (let d of prData) {
            out += "<tr>"+"<td>"+d.event+"</td>"+"<td>"+d.NRs+"</td>"+"<td>"+d.CRs+"</td>"+"<td>"+d.WRs+"</td>"+"<td>"+d.single+"</td>"
                    +"<td>"+d.avg+"</td>"+"<td>"+d.WRa+"</td>"+"<td>"+d.CRa+"</td>"+"<td>"+d.NRa+"</td>"+"</tr>";
        }
        $(table).html(out);
        styleRanking();
    }
    else {
        out = "<tr><th>Event</th><th>Single</th><th>Average</th></tr>";
        for (let d of prData) {
            out += "<tr>"+"<td>"+d.event+"</td>"+"<td>"+d.single+"</td>"+"<td>"+d.avg+"</td>"+"</tr>";
        }
        $(table).html(out);
    }

    styleTable();
}

function styleTable() {
    const height = $("#content").css("height").split("px")[0] - $("#content h1").css("height").split("px")[0];

    $("#tablePR").css("height", height);
    $("#tablePR, th, td").css("font-size", "2.5vh");
}

function styleRanking() {
    const rankings = $("#tablePR td:nth-child(2), #tablePR td:nth-child(3), #tablePR td:nth-child(4), #tablePR td:nth-child(7), #tablePR td:nth-child(8), #tablePR td:nth-child(9)");
    for (let r of rankings) {
        if (parseInt(r.textContent) <= 10) {
            $(r).css("color", "#00ff00");
        }
    }
}