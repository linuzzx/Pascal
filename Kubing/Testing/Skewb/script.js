let curEvent = "Skewb";
const cornerStates = [
    "235450",
    "431540",
    "354205",
    "315404",
    "233255",
    "214455",
    "442245",
    "410443",
    "255035",
    "551145",
    "215544",
    "311344",
    "431055",
    "433105",
    "411535",
    "513305",
    "343015",
    "045155",
    "313523",
    "115353",
    "223434",
    "234331",
    "502444",
    "530342",
    "243340",
    "254243",
    "352340",
    "350244",
    "422455",
    "430451",
    "404405",
    "435402",
    "442430",
    "430233",
    "554400",
    "535204",
    "324413",
    "335511",
    "003453",
    "034552",
    "344520",
    "345223",
    "153550",
    "144254",
    "521554",
    "424304",
    "531431",
    "534501",
    "304514",
    "005334",
    "334422",
    "135532",
    "341450",
    "445500",
    "351033",
    "555103",
    "355410",
    "055540",
    "355024",
    "155144",
    "423515",
    "023355",
    "433521",
    "133351",
    "203535",
    "501355",
    "233542",
    "331352",
    "543510",
    "044350",
    "533023",
    "134153",
    "254530",
    "551330",
    "234044",
    "331134",
    "025533",
    "522343",
    "035341",
    "332441",
    "402553",
    "403313",
    "432332",
    "533412",
    "145330",
    "540440",
    "145043",
    "340143",
    "450350",
    "453420",
    "440034",
    "543124",
    "542351",
    "550053",
    "455301",
    "453004",
    "532035",
    "520435",
    "545005",
    "523403",
    "345312",
    "353113",
    "053332",
    "054134",
    "335125",
    "303425",
    "143135",
    "104433",
    "332253",
    "310555",
    "443203",
    "414503",
    "322534",
    "340331",
    "503504",
    "544302",
    "333214",
    "314315",
    "043244",
    "014343",
    "323324",
    "354321",
    "103344",
    "154342",
    "444411",
    "435013",
    "054451",
    "035054",
    "444025",
    "425423",
    "154055",
    "125454",
    "244432",
    "235133",
    "552452",
    "530154",
    "244145",
    "205443",
    "352155",
    "300454",
    "544213",
    "515513",
    "055253",
    "013554",
    "524525",
    "545421",
    "105555",
    "143452",
    "245234",
    "213333",
    "552234",
    "510334",
    "225345",
    "253441",
    "302335",
    "350432",
    "043531",
    "044033",
    "550541",
    "541044",
    "053045",
    "024444",
    "330045",
    "321445",
    "440552",
    "441153",
    "454512",
    "445114",
    "450135",
    "401434",
    "534115",
    "505415",
    "153233",
    "114534",
    "531243",
    "512545",
    "123543",
    "144541",
    "301543",
    "342542",
    "451254",
    "412354",
    "434224",
    "415325",
    "421333",
    "452531",
    "504323",
    "555522",
    "454123",
    "351551",
    "253154",
    "034235",
    "124335",
    "341235",
    "224553",
    "045442",
    "452043",
    "554014",
    "135245",
    "400345",
    "540255",
    "500533",
    "033143",
    "113445",
    "243053",
    "511453",
    "525314",
    "204354",
    "541532",
    "432144",
    "015435",
    "342054",
    "312433",
    "420544",
    "155431",
    "405524",
    "553311",
    "320353",
    "553225",
    "334003",
    "133034",
    "305303",
    "455215",
    "542133",
    "413414",
    "443322",
    "344104",
    "514424",
    "325505",
    "004545",
    "255352",
    "033430",
    "330530",
    "245551",
    "441341",
    "134440",
    "451442",
    "532550",
    "535320",
    "343401",
    "353502",
    "434310",
    "333300"
];

const skvib = [
    {state: "333300", solution: "solved"},
    {state: "235450", solution: "R'"},
    {state: "431540", solution: "R"},
    {state: "354205", solution: "r'"},
    {state: "315404", solution: "r"},
    {state: "233255", solution: "r' R'"},
    {state: "214455", solution: "r R'"},
    {state: "442245", solution: "r' R"},
    {state: "410443", solution: "r R"},
    {state: "255035", solution: "R' r'"},
    {state: "551145", solution: "R r'"},
    {state: "215544", solution: "R' r"},
    {state: "311344", solution: "R r"},
    {state: "431055", solution: "R' r' R'"},
    {state: "433105", solution: "R r' R'"},
    {state: "411535", solution: "R' r R'"},
    {state: "513305", solution: "R r R'"},
    {state: "343015", solution: "R' r' R"},
    {state: "045155", solution: "R r' R"},
    {state: "313523", solution: "R' r R"},
    {state: "115353", solution: "R r R"},
    {state: "223434", solution: "r' R' r'"},
    {state: "234331", solution: "r R' r'"},
    {state: "502444", solution: "r' R r'"},
    {state: "530342", solution: "r R r'"},
    {state: "243340", solution: "r' R' r"},
    {state: "254243", solution: "r R' r"},
    {state: "352340", solution: "r' R r"},
    {state: "350244", solution: "r R r"},
    {state: "422455", solution: "r' R' r' R'"},
    {state: "430451", solution: "r R' r' R'"},
    {state: "404405", solution: "r' R r' R'"},
    {state: "435402", solution: "r R r' R'"},
    {state: "442430", solution: "r' R' r R'"},
    {state: "430233", solution: "r R' r R'"},
    {state: "554400", solution: "r' R r R'"},
    {state: "535204", solution: "r R r R'"},
    {state: "324413", solution: "r' R' r' R"},
    {state: "335511", solution: "r R' r' R"},
    {state: "003453", solution: "r' R r' R"},
    {state: "034552", solution: "r R r' R"},
    {state: "344520", solution: "r' R' r R"},
    {state: "345223", solution: "r R' r R"},
    {state: "153550", solution: "r' R r R"},
    {state: "144254", solution: "r R r R"},
    {state: "521554", solution: "R' r' R' r'"},
    {state: "424304", solution: "R r' R' r'"},
    {state: "531431", solution: "R' r R' r'"},
    {state: "534501", solution: "R r R' r'"},
    {state: "304514", solution: "R' r' R r'"},
    {state: "005334", solution: "R r' R r'"},
    {state: "334422", solution: "R' r R r'"},
    {state: "135532", solution: "R r R r'"},
    {state: "341450", solution: "R' r' R' r"},
    {state: "445500", solution: "R r' R' r"},
    {state: "351033", solution: "R' r R' r"},
    {state: "555103", solution: "R r R' r"},
    {state: "355410", solution: "R' r' R r"},
    {state: "055540", solution: "R r' R r"},
    {state: "355024", solution: "R' r R r"},
    {state: "155144", solution: "R r R r"},
    {state: "423515", solution: "R' r' R' r' R'"},
    {state: "023355", solution: "R r' R' r' R'"},
    {state: "433521", solution: "R' r R' r' R'"},
    {state: "133351", solution: "R r R' r' R'"},
    {state: "203535", solution: "R' r' R r' R'"},
    {state: "501355", solution: "R r' R r' R'"},
    {state: "233542", solution: "R' r R r' R'"},
    {state: "331352", solution: "R r R r' R'"},
    {state: "543510", solution: "R' r' R' r R'"},
    {state: "044350", solution: "R r' R' r R'"},
    {state: "533023", solution: "R' r R' r R'"},
    {state: "134153", solution: "R r R' r R'"},
    {state: "254530", solution: "R' r' R r R'"},
    {state: "551330", solution: "R r' R r R'"},
    {state: "234044", solution: "R' r R r R'"},
    {state: "331134", solution: "R r R r R'"},
    {state: "025533", solution: "R' r' R' r' R"},
    {state: "522343", solution: "R r' R' r' R"},
    {state: "035341", solution: "R' r R' r' R"},
    {state: "332441", solution: "R r R' r' R"},
    {state: "402553", solution: "R' r' R r' R"},
    {state: "403313", solution: "R r' R r' R"},
    {state: "432332", solution: "R' r R r' R"},
    {state: "533412", solution: "R r R r' R"},
    {state: "145330", solution: "R' r' R' r R"},
    {state: "540440", solution: "R r' R' r R"},
    {state: "145043", solution: "R' r R' r R"},
    {state: "340143", solution: "R r R' r R"},
    {state: "450350", solution: "R' r' R r R"},
    {state: "453420", solution: "R r' R r R"},
    {state: "440034", solution: "R' r R r R"},
    {state: "543124", solution: "R r R r R"},
    {state: "542351", solution: "r' R' r' R' r'"},
    {state: "550053", solution: "r R' r' R' r'"},
    {state: "455301", solution: "r' R r' R' r'"},
    {state: "453004", solution: "r R r' R' r'"},
    {state: "532035", solution: "r' R' r R' r'"},
    {state: "520435", solution: "r R' r R' r'"},
    {state: "545005", solution: "r' R r R' r'"},
    {state: "523403", solution: "r R r R' r'"},
    {state: "345312", solution: "r' R' r' R r'"},
    {state: "353113", solution: "r R' r' R r'"},
    {state: "053332", solution: "r' R r' R r'"},
    {state: "054134", solution: "r R r' R r'"},
    {state: "335125", solution: "r' R' r R r'"},
    {state: "303425", solution: "r R' r R r'"},
    {state: "143135", solution: "r' R r R r'"},
    {state: "104433", solution: "r R r R r'"},
    {state: "332253", solution: "r' R' r' R' r"},
    {state: "310555", solution: "r R' r' R' r"},
    {state: "443203", solution: "r' R r' R' r"},
    {state: "414503", solution: "r R r' R' r"},
    {state: "322534", solution: "r' R' r R' r"},
    {state: "340331", solution: "r R' r R' r"},
    {state: "503504", solution: "r' R r R' r"},
    {state: "544302", solution: "r R r R' r"},
    {state: "333214", solution: "r' R' r' R r"},
    {state: "314315", solution: "r R' r' R r"},
    {state: "043244", solution: "r' R r' R r"},
    {state: "014343", solution: "r R r' R r"},
    {state: "323324", solution: "r' R' r R r"},
    {state: "354321", solution: "r R' r R r"},
    {state: "103344", solution: "r' R r R r"},
    {state: "154342", solution: "r R r R r"},
    {state: "444411", solution: "r' R' r' R' r' R'"},
    {state: "435013", solution: "r R' r' R' r' R'"},
    {state: "054451", solution: "r' R r' R' r' R'"},
    {state: "035054", solution: "r R r' R' r' R'"},
    {state: "444025", solution: "r' R' r R' r' R'"},
    {state: "425423", solution: "r R' r R' r' R'"},
    {state: "154055", solution: "r' R r R' r' R'"},
    {state: "125454", solution: "r R r R' r' R'"},
    {state: "244432", solution: "r' R' r' R r' R'"},
    {state: "235133", solution: "r R' r' R r' R'"},
    {state: "552452", solution: "r' R r' R r' R'"},
    {state: "530154", solution: "r R r' R r' R'"},
    {state: "244145", solution: "r' R' r R r' R'"},
    {state: "205443", solution: "r R' r R r' R'"},
    {state: "352155", solution: "r' R r R r' R'"},
    {state: "300454", solution: "r R r R r' R'"},
    {state: "544213", solution: "r' R' r' R' r R'"},
    {state: "515513", solution: "r R' r' R' r R'"},
    {state: "055253", solution: "r' R r' R' r R'"},
    {state: "013554", solution: "r R r' R' r R'"},
    {state: "524525", solution: "r' R' r R' r R'"},
    {state: "545421", solution: "r R' r R' r R'"},
    {state: "105555", solution: "r' R r R' r R'"},
    {state: "143452", solution: "r R r R' r R'"},
    {state: "245234", solution: "r' R' r' R r R'"},
    {state: "213333", solution: "r R' r' R r R'"},
    {state: "552234", solution: "r' R r' R r R'"},
    {state: "510334", solution: "r R r' R r R'"},
    {state: "225345", solution: "r' R' r R r R'"},
    {state: "253441", solution: "r R' r R r R'"},
    {state: "302335", solution: "r' R r R r R'"},
    {state: "350432", solution: "r R r R r R'"},
    {state: "043531", solution: "r' R' r' R' r' R"},
    {state: "044033", solution: "r R' r' R' r' R"},
    {state: "550541", solution: "r' R r' R' r' R"},
    {state: "541044", solution: "r R r' R' r' R"},
    {state: "053045", solution: "r' R' r R' r' R"},
    {state: "024444", solution: "r R' r R' r' R"},
    {state: "330045", solution: "r' R r R' r' R"},
    {state: "321445", solution: "r R r R' r' R"},
    {state: "440552", solution: "r' R' r' R r' R"},
    {state: "441153", solution: "r R' r' R r' R"},
    {state: "454512", solution: "r' R r' R r' R"},
    {state: "445114", solution: "r R r' R r' R"},
    {state: "450135", solution: "r' R' r R r' R"},
    {state: "401434", solution: "r R' r R r' R"},
    {state: "534115", solution: "r' R r R r' R"},
    {state: "505415", solution: "r R r R r' R"},
    {state: "153233", solution: "r' R' r' R' r R"},
    {state: "114534", solution: "r R' r' R' r R"},
    {state: "531243", solution: "r' R r' R' r R"},
    {state: "512545", solution: "r R r' R' r R"},
    {state: "123543", solution: "r' R' r R' r R"},
    {state: "144541", solution: "r R' r R' r R"},
    {state: "301543", solution: "r' R r R' r R"},
    {state: "342542", solution: "r R r R' r R"},
    {state: "451254", solution: "r' R' r' R r R"},
    {state: "412354", solution: "r R' r' R r R"},
    {state: "434224", solution: "r' R r' R r R"},
    {state: "415325", solution: "r R r' R r R"},
    {state: "421333", solution: "r' R' r R r R"},
    {state: "452531", solution: "r R' r R r R"},
    {state: "504323", solution: "r' R r R r R"},
    {state: "555522", solution: "r R r R r R"},
    {state: "454123", solution: "R' r R' r' R' r'"},
    {state: "351551", solution: "R r' R r' R' r'"},
    {state: "253154", solution: "R' r R r' R' r'"},
    {state: "034235", solution: "R r' R' r R' r'"},
    {state: "124335", solution: "R r R' r R' r'"},
    {state: "341235", solution: "R r' R r R' r'"},
    {state: "224553", solution: "R' r R r R' r'"},
    {state: "045442", solution: "R' r' R' r' R r'"},
    {state: "452043", solution: "R r R' r' R r'"},
    {state: "554014", solution: "R r R r' R r'"},
    {state: "135245", solution: "R' r' R' r R r'"},
    {state: "400345", solution: "R r R' r R r'"},
    {state: "540255", solution: "R' r' R r R r'"},
    {state: "500533", solution: "R' r R r R r'"},
    {state: "033143", solution: "R r' R' r' R' r"},
    {state: "113445", solution: "R r R' r' R' r"},
    {state: "243053", solution: "R' r' R r' R' r"},
    {state: "511453", solution: "R r R r' R' r"},
    {state: "525314", solution: "R' r' R' r R' r"},
    {state: "204354", solution: "R' r' R r R' r"},
    {state: "541532", solution: "R r R r R' r"},
    {state: "432144", solution: "R r' R' r' R r"},
    {state: "015435", solution: "R' r R' r' R r"},
    {state: "342054", solution: "R' r' R r' R r"},
    {state: "312433", solution: "R' r R r' R r"},
    {state: "420544", solution: "R r' R' r R r"},
    {state: "155431", solution: "R' r R' r R r"},
    {state: "405524", solution: "R r' R r R r"},
    {state: "553311", solution: "R r' R r' R' r' R'"},
    {state: "320353", solution: "R r R' r R' r' R'"},
    {state: "553225", solution: "R r' R r R' r' R'"},
    {state: "334003", solution: "R r R' r' R r' R'"},
    {state: "133034", solution: "R r R r' R r' R'"},
    {state: "305303", solution: "R r R' r R r' R'"},
    {state: "455215", solution: "R' r' R r R r' R'"},
    {state: "542133", solution: "R r' R' r' R' r R'"},
    {state: "413414", solution: "R r R r' R' r R'"},
    {state: "443322", solution: "R r R r R' r R'"},
    {state: "344104", solution: "R r' R' r' R r R'"},
    {state: "514424", solution: "R' r R r' R r R'"},
    {state: "325505", solution: "R r' R' r R r R'"},
    {state: "004545", solution: "R r' R r R r R'"},
    {state: "255352", solution: "r R' r R r' R' r'"},
    {state: "033430", solution: "r R r' R' r R' r'"},
    {state: "330530", solution: "r R r' R r R' r'"},
    {state: "245551", solution: "r' R' r R r R' r'"},
    {state: "441341", solution: "r R r R' r' R r'"},
    {state: "134440", solution: "r R' r' R' r R r'"},
    {state: "451442", solution: "r' R r R' r R r'"},
    {state: "532550", solution: "r R' r' R r R r'"},
    {state: "535320", solution: "r R r' R r R' r' R'"},
    {state: "343401", solution: "r R r R' r' R r' R'"},
    {state: "353502", solution: "r' R r R' r R r' R'"},
    {state: "434310", solution: "r R' r' R r R r' R'"},
];
$(() => {
    genEventOptions();
});

let cW = "1";
let cO = "2";
let cG = "3";
let cR = "4";
let cB = "5";
let cY = "6";

class Corner {
    constructor(c1, c2, c3) {
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
    }
}

class Center {
    constructor(c) {
        this.c = c;
    }
}

let ce1 = new Center(cW);
let ce2 = new Center(cO);
let ce3 = new Center(cG);
let ce4 = new Center(cR);
let ce5 = new Center(cB);
let ce6 = new Center(cY);

let co1 = new Corner(cW, cO, cB);
let co2 = new Corner(cW, cB, cR);
let co3 = new Corner(cW, cR, cG);
let co4 = new Corner(cW, cG, cO);
let co5 = new Corner(cY, cO, cG);
let co6 = new Corner(cY, cG, cR);
let co7 = new Corner(cY, cR, cB);
let co8 = new Corner(cY, cB, cO);

let cleanSkewbCo2 = [co1, co2, co3, co4, co5, co6, co7, co8];
let skewbCo2 = [co1, co2, co3, co4, co5, co6, co7, co8];
let cleanSkewbCe2 = [ce1, ce2, ce3, ce4, ce5, ce6];
let skewbCe2 = [ce1, ce2, ce3, ce4, ce5, ce6];

let cube2 = getSkewbState2("");

function genEventOptions() {
    const events = ["Skewb"];

    let out = "";
    for (let e of events) {
        out += "<option value=\"" + e + "\">" + e + "</option>";
    }

    $("#selEvent").html(out);
}

function changeEvent(ev) {
    curEvent = ev;
}

function makeDrawings() {
    $("#scrambles").html("");
    let scrambles = $("#taScrambles").val().split("\n").filter(s => s.trim() !== "");

    let i = 0;
    let up = "6";
    let down = "1";
    
    for (let j = 0; j < scrambles.length / 5; j++) {
        let nScrambles = scrambles.slice(j * 5, j * 5 + 5);
        $("#scrambles").append("<div class='scrSubDiv' id='scrSubDiv" + j + "' style='width: 21cm; height: 29.5cm; margin: 0.1cm; display: grid; grid-template-rows: 1fr 1fr 1fr 1fr 1fr;'></div>");

        for (let s of skvib) {
            let ns = [];
            if (curEvent === "Skewb") {
                ns = [];
                for (let m of s.solution.split(" ")) {
                    if (m.includes("R")) {
                        ns.push("z " + m + " z'");
                    }
                    else if (m.includes("r")) {
                        ns.push(m.toUpperCase());
                    }
                    else {
                        ns.push(m);
                    }
                }
            }
            let scram = "x' " + inverseAlg(ns.join(" ")) + " z' x'";
            cube2 = getSkewbState2(scram);
            let skewbCorners = Object.values(skewbCo2).map(co => Object.values(co));
            let skewbCenters = Object.values(skewbCe2).map(ce => Object.values(ce));
            // let up = skewbCenters[0][0];
            // let down = skewbCenters[5][0];
            
            let skewbCornerOrientations = [];
            for (let co of skewbCorners.slice(0, 2).concat(skewbCorners.slice(4, 6))) {
                co.includes(up) ? skewbCornerOrientations.push(co.indexOf(up)) : skewbCornerOrientations.push(co.indexOf(down));
            }

            let el = "<div style='width: 100%; height: 100%; margin: 0; padding: 0; display: grid; grid-template-columns: 2fr 3fr; border: 1px solid black;'><div style='width: 80%; height: 80%; margin: auto;'><svg width='100%' id='svgCube" + i + "'></svg></div><h1 style='margin: auto; text-align: left;'>" + "<br>Solution: " + (skvib[i].solution === "solved" ? skvib[i].solution : "x z " + skvib[i].solution + " x") + "</h1></div>";
            if ($("#svgCube" + i).parent().height() >= $("#svgCube" + i).parent().width() * 3 / 4) {
                $("#svgCube" + i).attr("width", $("#svgCube" + i).parent().width() * 0.8);
            }
            else {
                $("#svgCube" + i).attr("width", $("#svgCube" + i).attr("height") * 4 / 3);
            }
            $("#svgCube" + i).css("width", $("#svgCube" + i).attr("width"));
            $("#svgCube" + i).css("height", $("#svgCube" + i).attr("height"));
            $("#svgCube" + i).css("margin", "auto");
            $("#scrSubDiv" + j).append(el);
            drawScrambleSkewb2("#svgCube" + i, scram);
            i++;
        }
    }

    $("#btnDownload").css("display", "block");
}

function inverseAlg(alg) {
    let invAlg = "";
    
    if (alg.trim() === "") {
        return "";
    }
    let arr = [];

    for (let a of alg.split(" ")) {
        if (a.includes("'")) {
            arr.unshift(a.slice(0, -1));
        }
        else if (a.includes("2")) {
            arr.unshift(a);
        }
        else {
            arr.unshift(a + "'");
        }
    }
    invAlg = arr.join(" ");

    return invAlg;
}

function getSymSkewbState(skewbCenters, skewbCorners) {
    const ces = [
        "123456",
        "326415",
        "521463",
        "625431",
        "134526",
        "152346",
        "145236",
        "263154",
        "413652", 
        "643251",
        "364125",
        "312645",
        "341265",
        "256314",
        "436512",
        "546213",
        "514623",
        "562143",
        "231564",
        "451362",
        "654321",
        "632541",
        "215634",
        "465132"
    ];

    let ce = ces[ces.map(c => c.substring(4)).indexOf(skewbCenters.slice(4).join(""))];
    let cent = skewbCenters.slice().join("").replace(ce[0], "a").replace(ce[1], "b").replace(ce[2], "c").replace(ce[3], "d").replace(ce[4], "e").replace(ce[5], "f");

    return cent + corn;
}

function getCenterCase(skewbCenters) {
    const ces = [
        "123456",
        "326415",
        "521463",
        "625431",
        "134526",
        "152346",
        "145236",
        "263154",
        "413652", 
        "643251",
        "364125",
        "312645",
        "341265",
        "256314",
        "436512",
        "546213",
        "514623",
        "562143",
        "231564",
        "451362",
        "654321",
        "632541",
        "215634",
        "465132"
    ];

    let ce = ces[ces.map(c => c.substring(4)).indexOf(skewbCenters.slice(4).join(""))];
    let cent = skewbCenters.slice(0, 4).join("").replace(ce[0], "a").replace(ce[1], "b").replace(ce[2], "c").replace(ce[3], "d").replace(ce[4], "e").replace(ce[5], "f");
    
    switch (cent) {
        case "abcd":
            return "solved";
        case "dbac":
            return "cwR";
        case "cbda":
            return "ccwR";
        case "cabd":
            return "cwL";
        case "bcad":
            return "ccwL";
        case "dacb":
            return "uR";
        case "bdca":
            return "uL";
        case "acdb":
            return "uFR";
        case "adbc":
            return "uFL";
        case "dcba":
            return "zR";
        case "badc":
            return "zL";
        case "cdab":
            return "+";
        default:
            return "other";
    }
}

function getSkewbState2(sol) {
    resetCubeState2();
    sol = cleanMoves2(sol);
    let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
    for (let a of arr) {
        switch (a.replaceAll("*","")) {
            case "R":
                __r();
                break;
            case "R'":
                __ri();
                break;
            case "L":
                __l();
                break;
            case "L'":
                __li();
                break;
            case "B":
                __b();
                break;
            case "B'":
                __bi();
                break;
            case "U":
                __u();
                break;
            case "U'":
                __ui();
                break;
            case "x":
                __x();
                break;
            case "x2":
                __x2();
                break;
            case "x'":
                __xi();
                break;
            case "y":
                __y2();
                break;
            case "y2":
                __y2();
                break;
            case "y'":
                __yi();
                break;
            case "z":
                __z();
                break;
            case "z2":
                __z2();
                break;
            case "z'":
                __zi();
                break;
        }
    }

    return skewbCo2.map(s => s.c1 + s.c2 + s.c3).join("") + skewbCe2.map(s => s.c).join("");

    function cleanMoves2(m) {
        while (m.includes("&nbsp;&nbsp;")) {
            m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
        }
    
        return m.trim();
    }

    function resetCubeState2() {
        skewbCo2 = cleanSkewbCo2.slice();
        skewbCe2 = cleanSkewbCe2.slice();
    }
    
    function __r() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[6] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo2[1] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo2[7] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo2[5] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[3] = new Center(tempCe[5].c);
        skewbCe2[4] = new Center(tempCe[3].c);
        skewbCe2[5] = new Center(tempCe[4].c);
    }
    function __ri() {
        __r();
        __r();
    }
    function __l() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[4] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo2[3] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo2[5] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo2[7] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[1] = new Center(tempCe[5].c);
        skewbCe2[2] = new Center(tempCe[1].c);
        skewbCe2[5] = new Center(tempCe[2].c);
    }
    function __li() {
        __l();
        __l();
    }
    function __b() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[7] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo2[0] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);
        skewbCo2[4] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo2[6] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[1] = new Center(tempCe[4].c);
        skewbCe2[4] = new Center(tempCe[5].c);
        skewbCe2[5] = new Center(tempCe[1].c);
    }
    function __bi() {
        __b();
        __b();
    }
    function __u() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);
        skewbCo2[1] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo2[3] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo2[7] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[0] = new Center(tempCe[4].c);
        skewbCe2[1] = new Center(tempCe[0].c);
        skewbCe2[4] = new Center(tempCe[1].c);
    }
    function __ui() {
        __u();
        __u();
    }
    function __x() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo2[1] = new Corner(tempCo[2].c3, tempCo[2].c1, tempCo[2].c2);
        skewbCo2[2] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo2[3] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo2[4] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo2[5] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo2[6] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo2[7] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[0] = new Center(tempCe[2].c);
        skewbCe2[2] = new Center(tempCe[5].c);
        skewbCe2[5] = new Center(tempCe[4].c);
        skewbCe2[4] = new Center(tempCe[0].c);
    }
    function __x2() {
        __x();
        __x();
    }
    function __xi() {
        __x();
        __x();
        __x();
    }
    function __y() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[3].c1, tempCo[3].c2, tempCo[3].c3);
        skewbCo2[1] = new Corner(tempCo[0].c1, tempCo[0].c2, tempCo[0].c3);
        skewbCo2[2] = new Corner(tempCo[1].c1, tempCo[1].c2, tempCo[1].c3);
        skewbCo2[3] = new Corner(tempCo[2].c1, tempCo[2].c2, tempCo[2].c3);
        skewbCo2[4] = new Corner(tempCo[5].c1, tempCo[5].c2, tempCo[5].c3);
        skewbCo2[5] = new Corner(tempCo[6].c1, tempCo[6].c2, tempCo[6].c3);
        skewbCo2[6] = new Corner(tempCo[7].c1, tempCo[7].c2, tempCo[7].c3);
        skewbCo2[7] = new Corner(tempCo[4].c1, tempCo[4].c2, tempCo[4].c3);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[1] = new Center(tempCe[2].c);
        skewbCe2[2] = new Center(tempCe[3].c);
        skewbCe2[3] = new Center(tempCe[4].c);
        skewbCe2[4] = new Center(tempCe[1].c);
    }
    function __y2() {
        __y();
        __y();
    }
    function __yi() {
        __y();
        __y();
        __y();
    }
    function __z() {
        let tempCo = skewbCo2.slice();
    
        skewbCo2[0] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo2[1] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo2[2] = new Corner(tempCo[3].c3, tempCo[3].c1, tempCo[3].c2);
        skewbCo2[3] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);
        skewbCo2[4] = new Corner(tempCo[5].c3, tempCo[5].c1, tempCo[5].c2);
        skewbCo2[5] = new Corner(tempCo[2].c2, tempCo[2].c3, tempCo[2].c1);
        skewbCo2[6] = new Corner(tempCo[1].c3, tempCo[1].c1, tempCo[1].c2);
        skewbCo2[7] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);
    
        let tempCe = skewbCe2.slice();
    
        skewbCe2[0] = new Center(tempCe[1].c);
        skewbCe2[1] = new Center(tempCe[5].c);
        skewbCe2[5] = new Center(tempCe[3].c);
        skewbCe2[3] = new Center(tempCe[0].c);
    }
    function __z2() {
        __z();
        __z();
    }
    function __zi() {
        __z();
        __z();
        __z();
    }
}

function makePDF() {
    // downloadPDF($("#content").html());

    let mywindow = window.open("", 'PRINT', 'left=0,top=0,height='+$(window).height() * 0.75+'",width='+$(window).width() * 0.75);
    mywindow.document.write($("#scrambles").html());
    mywindow.document.write("<link rel='stylesheet' href='style.css'>");
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    // mywindow.close();
}

function drawScrambleSkewb2(svgID, scr) {
    $(svgID).empty();
    let n = 3;

    let moves = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"];

    let cW = "1";
    let cY = "2";
    let cG = "3";
    let cB = "4";
    let cR = "5";
    let cO = "6";

    class Corner {
        constructor(c1, c2, c3) {
            this.c1 = c1;
            this.c2 = c2;
            this.c3 = c3;
        }
    }

    class Center {
        constructor(c) {
            this.c = c;
        }
    }

    let ce1 = new Center(cW);
    let ce2 = new Center(cO);
    let ce3 = new Center("0");
    let ce4 = new Center("0");
    let ce5 = new Center("0");
    let ce6 = new Center("0");

    let co1 = new Corner(cW, cO, cB);
    let co2 = new Corner(cW, cB, cR);
    let co3 = new Corner(cW, cR, cG);
    let co4 = new Corner(cW, cG, cO);
    let co5 = new Corner(cY, cO, cG);
    let co6 = new Corner(cY, cG, cR);
    let co7 = new Corner(cY, cR, cB);
    let co8 = new Corner(cY, cB, cO);

    let cleanSkewbCo = [co1, co2, co3, co4, co5, co6, co7, co8];
    let skewbCo = [co1, co2, co3, co4, co5, co6, co7, co8];
    let cleanSkewbCe = [ce1, ce2, ce3, ce4, ce5, ce6];
    let skewbCe = [ce1, ce2, ce3, ce4, ce5, ce6];
    
    let cube = getSkewbState(scr);

    let width = $(svgID).width();
    let height = 3 * width / 4;
    $(svgID).height(height);
    let space = width / 20;
    let size = ((width - 3 * space) / 4) / n;
    let fill = "";
    let stroke = "#1E1E1E";
    let strokeWidth = ((size / n) > 1) ? 1 : 0;

    let coordinates = [
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: 0,
            y2: n * size,
        },
        {
            x1: 0,
            x2: n * size,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: 2 * n * size + 2 * space,
            x2: 3 * n * size + 2 * space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: 3 * n * size + 3 * space,
            x2: 4 * n * size + 3 * space,
            y1: n * size + space,
            y2: 2 * n * size + space,
        },
        {
            x1: n * size + space,
            x2: 2 * n * size + space,
            y1: 2 * n * size + 2 * space,
            y2: 3 * n * size + 2 * space,
        }
    ];
    

    let cWhite = [cube[0], cube[3], cube[6], cube[9], cube[24]];
    let cYellow = [cube[12], cube[15], cube[18], cube[21], cube[29]];
    let cGreen = [cube[10], cube[8], cube[16], cube[14], cube[26]];
    let cBlue = [cube[4], cube[2], cube[22], cube[20], cube[28]];
    let cRed = [cube[7], cube[5], cube[19], cube[17], cube[27]];
    let cOrange = [cube[1], cube[11], cube[13], cube[23], cube[25]];
    let colors = [cWhite, cOrange, cGreen, cRed, cBlue, cYellow];

    for (let i = 0; i < 6; i++) {
        let j = 0;
        let x1 = coordinates[i].x1;
        let x2 = coordinates[i].x2;
        let y1 = coordinates[i].y1;
        let y2 = coordinates[i].y2;

        let points = [
            x1+","+y1+" "+(x1+(x2-x1)/2)+","+y1+" "+x1+","+(y1+(y2-y1)/2)+" "+x1+","+y1,
            x2+","+y1+" "+x2+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y1+" "+x2+","+y1,
            x2+","+y2+" "+(x1+(x2-x1)/2)+","+y2+" "+x2+","+(y1+(y2-y1)/2)+" "+x2+","+y2,
            x1+","+y2+" "+x1+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y2+" "+x1+","+y2,
            (x1+(x2-x1)/2)+","+y1+" "+x2+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y2+" "+x1+","+(y1+(y2-y1)/2)+" "+(x1+(x2-x1)/2)+","+y1
        ];

        for (let p of points) {
            fill = getSkewbColor(colors[i].shift());
                
            let poly = document.createElementNS('http://www.w3.org/2000/svg', "polygon");
            $(poly).attr("points", p);
            $(poly).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(poly);
        }
    }

    function getSkewbColor(n) {
        switch (n) {
            case "1":
                return "white";
            case "2":
                return "yellow";
            case "3":
                return "#00FF00";
            case "4":
                return "blue";
            case "5":
                return "red";
            case "6":
                return "#FFAA00";
            case "0":
                return "#cccccc";
        }
    }

    function cleanMoves(m) {
        while (m.includes("&nbsp;&nbsp;")) {
            m.replaceAll("&nbsp;&nbsp;", "&nbsp;");
        }
    
        return m.trim();
    }

    function getSkewbState(sol) {
        resetCubeState();
        sol = cleanMoves(sol);
        let arr = Array.isArray(sol) ? sol : sol.trim().split(" ");
        for (let a of arr) {
            switch (a.replaceAll("*","")) {
                case "R":
                    _r();
                    break;
                case "R'":
                    _ri();
                    break;
                case "L":
                    _l();
                    break;
                case "L'":
                    _li();
                    break;
                case "B":
                    _b();
                    break;
                case "B'":
                    _bi();
                    break;
                case "U":
                    _u();
                    break;
                case "U'":
                    _ui();
                    break;
                case "x":
                    _x();
                    break;
                case "x2":
                    _x2();
                    break;
                case "x'":
                    _xi();
                    break;
                case "y":
                    _y2();
                    break;
                case "y2":
                    _y2();
                    break;
                case "y'":
                    _yi();
                    break;
                case "z":
                    _z();
                    break;
                case "z2":
                    _z2();
                    break;
                case "z'":
                    _zi();
                    break;
            }
        }
    
        return skewbCo.map(s => s.c1 + s.c2 + s.c3).join("") + skewbCe.map(s => s.c).join("");
    }
    
    function resetCubeState() {
        skewbCo = cleanSkewbCo.slice();
        skewbCe = cleanSkewbCe.slice();
    }
    
    function _r() {
        let tempCo = skewbCo.slice();

        skewbCo[6] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo[1] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo[7] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo[5] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);

        let tempCe = skewbCe.slice();

        skewbCe[3] = new Center(tempCe[5].c);
        skewbCe[4] = new Center(tempCe[3].c);
        skewbCe[5] = new Center(tempCe[4].c);
    }
    function _ri() {
        _r();
        _r();
    }
    function _l() {
        let tempCo = skewbCo.slice();

        skewbCo[4] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo[3] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo[5] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo[7] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);

        let tempCe = skewbCe.slice();

        skewbCe[1] = new Center(tempCe[5].c);
        skewbCe[2] = new Center(tempCe[1].c);
        skewbCe[5] = new Center(tempCe[2].c);
    }
    function _li() {
        _l();
        _l();
    }
    function _b() {
        let tempCo = skewbCo.slice();

        skewbCo[7] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo[0] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);
        skewbCo[4] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo[6] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);

        let tempCe = skewbCe.slice();

        skewbCe[1] = new Center(tempCe[4].c);
        skewbCe[4] = new Center(tempCe[5].c);
        skewbCe[5] = new Center(tempCe[1].c);
    }
    function _bi() {
        _b();
        _b();
    }
    function _u() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);
        skewbCo[1] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo[3] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo[7] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);

        let tempCe = skewbCe.slice();

        skewbCe[0] = new Center(tempCe[4].c);
        skewbCe[1] = new Center(tempCe[0].c);
        skewbCe[4] = new Center(tempCe[1].c);
    }
    function _ui() {
        _u();
        _u();
    }
    function _x() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[3].c2, tempCo[3].c3, tempCo[3].c1);
        skewbCo[1] = new Corner(tempCo[2].c3, tempCo[2].c1, tempCo[2].c2);
        skewbCo[2] = new Corner(tempCo[5].c2, tempCo[5].c3, tempCo[5].c1);
        skewbCo[3] = new Corner(tempCo[4].c3, tempCo[4].c1, tempCo[4].c2);
        skewbCo[4] = new Corner(tempCo[7].c2, tempCo[7].c3, tempCo[7].c1);
        skewbCo[5] = new Corner(tempCo[6].c3, tempCo[6].c1, tempCo[6].c2);
        skewbCo[6] = new Corner(tempCo[1].c2, tempCo[1].c3, tempCo[1].c1);
        skewbCo[7] = new Corner(tempCo[0].c3, tempCo[0].c1, tempCo[0].c2);

        let tempCe = skewbCe.slice();

        skewbCe[0] = new Center(tempCe[2].c);
        skewbCe[2] = new Center(tempCe[5].c);
        skewbCe[5] = new Center(tempCe[4].c);
        skewbCe[4] = new Center(tempCe[0].c);
    }
    function _x2() {
        _x();
        _x();
    }
    function _xi() {
        _x();
        _x();
        _x();
    }
    function _y() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[3].c1, tempCo[3].c2, tempCo[3].c3);
        skewbCo[1] = new Corner(tempCo[0].c1, tempCo[0].c2, tempCo[0].c3);
        skewbCo[2] = new Corner(tempCo[1].c1, tempCo[1].c2, tempCo[1].c3);
        skewbCo[3] = new Corner(tempCo[2].c1, tempCo[2].c2, tempCo[2].c3);
        skewbCo[4] = new Corner(tempCo[5].c1, tempCo[5].c2, tempCo[5].c3);
        skewbCo[5] = new Corner(tempCo[6].c1, tempCo[6].c2, tempCo[6].c3);
        skewbCo[6] = new Corner(tempCo[7].c1, tempCo[7].c2, tempCo[7].c3);
        skewbCo[7] = new Corner(tempCo[4].c1, tempCo[4].c2, tempCo[4].c3);

        let tempCe = skewbCe.slice();

        skewbCe[1] = new Center(tempCe[2].c);
        skewbCe[2] = new Center(tempCe[3].c);
        skewbCe[3] = new Center(tempCe[4].c);
        skewbCe[4] = new Center(tempCe[1].c);
    }
    function _y2() {
        _y();
        _y();
    }
    function _yi() {
        _y();
        _y();
        _y();
    }
    function _z() {
        let tempCo = skewbCo.slice();

        skewbCo[0] = new Corner(tempCo[7].c3, tempCo[7].c1, tempCo[7].c2);
        skewbCo[1] = new Corner(tempCo[0].c2, tempCo[0].c3, tempCo[0].c1);
        skewbCo[2] = new Corner(tempCo[3].c3, tempCo[3].c1, tempCo[3].c2);
        skewbCo[3] = new Corner(tempCo[4].c2, tempCo[4].c3, tempCo[4].c1);
        skewbCo[4] = new Corner(tempCo[5].c3, tempCo[5].c1, tempCo[5].c2);
        skewbCo[5] = new Corner(tempCo[2].c2, tempCo[2].c3, tempCo[2].c1);
        skewbCo[6] = new Corner(tempCo[1].c3, tempCo[1].c1, tempCo[1].c2);
        skewbCo[7] = new Corner(tempCo[6].c2, tempCo[6].c3, tempCo[6].c1);

        let tempCe = skewbCe.slice();

        skewbCe[0] = new Center(tempCe[1].c);
        skewbCe[1] = new Center(tempCe[5].c);
        skewbCe[5] = new Center(tempCe[3].c);
        skewbCe[3] = new Center(tempCe[0].c);
    }
    function _z2() {
        _z();
        _z();
    }
    function _zi() {
        _z();
        _z();
        _z();
    }
}