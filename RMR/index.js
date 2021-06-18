let tidList;
let vo2List;
let rerList;
let rer100List;
let vco2List;

let vo2Snitt;
let vco2Snitt;
let vo2StdAvvik;
let vco2StdAvvik;
let vo2VarKoeff;
let vco2VarKoeff;
let rmrList;
let sumList;
let dataList = [];

let tblData, tblHeader;
let rowLength = 0;

let innlogget = false;

const einar = {
    brukernavn: 'einar',
    passord: 'swøo2fgh'
}
const helge = {
    brukernavn: 'helge',
    passord: 'vszusfgh'
}
const therese = {
    brukernavn: 'therese',
    passord: '4vs2s3sfgh'
}

const brukere = [einar, helge, therese];

function loggInn() {
    if (innlogget) {
        const ut = document.getElementById("ut");
        ut.innerHTML =  "   <div id='grid'>\n" +
            "        <div>\n" +
            "            <input type='file' id='input' onchange='lesData(this.files)'>\n" +
            "            <div id='tblData'></div>\n" +
            "        </div>\n" +
            "        <div>\n" +
            "            <button id='btnBeregn' onclick='beregn()'>Beregn</button>\n" +
            "            <h1 id='rmr'></h1>\n" +
            "        </div>\n" +
            "    </div>";
    }
}

function sjekkInnlogging(bNavn, pass) {
    const feil = document.getElementById("feil");
    for (let b of brukere) {
        if (bNavn === b.brukernavn && pass === b.passord) {
            innlogget = true;
            feil.style.setProperty("visibility", "hidden");
            loggInn();
            break;
        }
        else {
            feil.style.setProperty("visibility", "visible");
        }
    }
}

function reset() {
    tidList = null;
    vo2List = null;
    rerList = null;
    rer100List = null;
    vco2List = null;

    vo2Snitt = null;
    vco2Snitt = null;
    vo2StdAvvik = null;
    vco2StdAvvik = null;
    vo2VarKoeff = null;
    vco2VarKoeff = null;
    rmrList = null;
    sumList = null;
    dataList = null;

    tblData = null;
    tblHeader = null;
    rowLength = 0;

    innlogget = false;
}

function lesData(files) {
    reset();
    tblHeader  = document.getElementById("tblHeader");
    tblData  = document.getElementById("tblData");
    readXlsxFile(files[0]).then(function (data) {
        skrivData(data);
    });
}

function skrivData(data) {
    dataList = [];
    for (let i=0; i<data.length; i++) {
        dataList.push(data[i]);
    }

    let header = "<table class='tbl'>";
    let table = "<table class='tbl'>";
    let i=0;
    for (let row of data) {
        if (i > 1) {
            table += "<tr><td>"+row[0]+"</td><td>"+row[1]+"</td><td>"+row[2]+"</td><td>"+row[3]+"</td><td>"+row[4]+"</td></tr>"
            rowLength++;
        }
        else {
            table += "<tr><th>"+row[0]+"</th><th>"+row[1]+"</th><th>"+row[2]+"</th><th>"+row[3]+"</th><th>"+row[4]+"</th></tr>"
        }
        i++;
    }
    header += "</table>";
    table += "</table>";
    //tblHeader.innerHTML = header;
    tblData.innerHTML = table;
}

function hentData() {
    getTid();
    getVo2();
    getRer();
    getRer100();
    getVco2();
}

function getTid() {
    tidList = [];

    for (let i = 0; i<rowLength; i++) {
        const row = dataList[i+2];
        tidList.push(row[0]);
    }
}

function getVo2() {
    vo2List = [];

    for (let i = 0; i<rowLength; i++) {
        const row = dataList[i+2];
        vo2List.push(row[1]);
    }
}

function getRer() {
    rerList = [];

    for (let i = 0; i<rowLength; i++) {
        const row = dataList[i+2];
        rerList.push(row[2]);
    }
}

function getRer100() {
    rer100List = [];

    for (let i = 0; i<rowLength; i++) {
        const row = dataList[i+2];
        rer100List.push(row[3]);
    }
}

function getVco2() {
    vco2List = [];

    for (let i = 0; i<rowLength; i++) {
        const row = dataList[i+2];
        vco2List.push(row[4]);
    }
}

function standardavvik(input) {
    let inputArr = Object.values(input);
    let n = input.length, sum = 0, mean;

    for (let value of inputArr) {
        sum = sum + value;
    }

    mean = sum/n;
    sum = 0;

    for (let v of inputArr) {
        sum += Math.pow((v - mean), 2);
    }

    mean = sum/(n-1);
    const deviation = Math.sqrt(mean);
    return Math.round(deviation);
}

function beregnStdAvvikVo2() {
    vo2StdAvvik = [];
    beregnStdAvvik(vo2List, vo2StdAvvik);
}

function beregnStdAvvikVco2() {
    vco2StdAvvik = [];
    beregnStdAvvik(vco2List, vco2StdAvvik);
}

function beregnStdAvvik(vList, vStdAvvik) {
    for (let i=5; i<vList.length-4; i++) {
        let vList5 = [];
        for (let j=i; j<i+5; j++) {
            vList5.push(vList[j]);
        }
        vStdAvvik.push(standardavvik(vList5));
    }
}

function beregnSnittVo2() {
    vo2Snitt = [];
    beregnGjennomsnitt(vo2List, vo2Snitt);
}

function beregnSnittVco2() {
    vco2Snitt = [];
    beregnGjennomsnitt(vco2List, vco2Snitt);
}

function beregnGjennomsnitt(vList, vSnitt) {
    for (let i = 5; i<vList.length-4; i++) {
        let sum = 0;
        for (let j=i; j<i+5; j++) {
            sum += vList[j];
        }
        vSnitt.push(Math.round(sum/5.0));
    }
}

function beregnVarKoeffVo2() {
    vo2VarKoeff = [];
    for (let i=0; i<vo2StdAvvik.length; i++) {
        vo2VarKoeff.push((vo2StdAvvik[i] / vo2Snitt[i]) * 100);
    }
}

function beregnVarKoeffVco2() {
    vco2VarKoeff = [];
    for (let i=0; i<vco2StdAvvik.length; i++) {
        vco2VarKoeff.push((vco2StdAvvik[i] / vco2Snitt[i]) * 100);
    }
}

function beregnRMR() {
    rmrList = [];
    for (let i=0; i<vo2VarKoeff.length; i++) {
        rmrList.push(rmr(vo2Snitt[i], vco2Snitt[i]));
    }
}

function rmr(vo2, vco2) {
    return (3.94 * vo2 + 1.1 * vco2) * 1.44;
}

function bestemRMR() {
    sumList = [];
    let rmr = "";
    for (let i=0; i<vo2VarKoeff.length; i++) {
        sumList.push(vo2VarKoeff[i] + vco2VarKoeff[i]);
    }
    const minList = sumList.sort(function(a,b) { return a - b;});
    let j=0;
    for (let i=0; i<vo2VarKoeff.length; i++) {
        if (vo2VarKoeff[i] + vco2VarKoeff[i] === minList[j]) {
            if (vo2VarKoeff[i] >= 10 || vco2VarKoeff[i] >= 10) {
                j++;
                i=0;
                rmr = "Kan ikke beregne RMR for disse dataene..."
            }
            else {
                rmr = "RMR: " + rmrList[i];
                break;
            }
        }
    }
    return rmr;
}

function beregn() {
    if (dataList.length === 0) {
        alert("Last opp en excel-fil først!")
    }
    else {
        hentData();
        beregnStdAvvikVo2();
        beregnStdAvvikVco2();
        beregnSnittVo2();
        beregnSnittVco2();
        beregnVarKoeffVo2();
        beregnVarKoeffVco2();
        beregnRMR();

        document.getElementById("rmr").innerText = bestemRMR();
    }
}