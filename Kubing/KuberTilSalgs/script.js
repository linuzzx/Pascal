let cubes = {};
let puzzles = [];
$(() => {
    firebase.database().ref("Kuber/").once("value", (snapshot) => {
        cubes = snapshot.val();
        
        for (let c of Object.values(cubes)) {
            puzzles.push(new Puzzle(c.type, c.name, c.price, c.img, c.info));
        }

        showPuzzles();
        addAccordion();
        adjustSize();
    });
});

$(window).resize(() => {
    adjustSize();
});

function showPuzzles() {
    let ind = 0;
    for (let t of $.uniqueSort(puzzles.map(pz => pz.type))) {
        let h = ind === 0 ? "" : "hidden";
        let out = "<div id='puzzle_" + t + "' class='puzzleContainer' " + h + ">";
        for (let p of puzzles) {
            if (p.type === t) {
                out += "<div class='puzzle'><div class='puzzle-content'>"+
                "<div class='puzzle-front'><h2>"+p.name+"</h2><img src='"+p.image+"'><h2>"+p.price+"kr</h2></div>"+
                "<div class='puzzle-back'><span>"+p.info+"</span></div>"+
                "</div></div>";
            }
        }
        out += "</div>";
        $("#puzzles").append(out);
        ind++;
    }
}

function addAccordion() {
    let accTypes = $("#accTypes");
    let panelTypes = $("#panelTypes");
    
    let types = $.uniqueSort(puzzles.map(p => p.type));
    let out = "";
    for (let t of types) {
        out += "<h3 id='panel_" + t + "' class='panels' onclick='showType(\"" + t + "\")'>" + t + "</h3>";
    }
    $(panelTypes).html(out);

    $("#panel_" + types[0]).prop("style", "background-color: #bbbbbb");
    
    $(accTypes).on("click", () => {
        toggleAccordion();
    });
}

function toggleAccordion() {
    let panelTypes = $("#panelTypes");
    if ($(panelTypes).css("max-height") !== "none") {
        $(panelTypes).css("max-height", "none");
        $("#accTypes h3:nth-child(2)").text("-");
    }
    else {
        $(panelTypes).css("max-height", "0");
        $("#accTypes h3:nth-child(2)").text("+");
    }
}

function showType(type) {
    $(".puzzleContainer").prop("hidden", true);
    $("#puzzle_" + type).prop("hidden", false);
    $("#panelTypes h3").prop("style", "none");
    $("#panel_" + type).prop("style", "background-color: #bbbbbb");
    toggleAccordion();
}

function adjustSize() {
    $(".puzzle").width($("body").width() / 5);
    $(".puzzle").height($(".puzzle").width());

    $(".puzzle img").height(($("body").width() / 5) - 2 * $(".puzzle h2").height());

    if ($("body").width() > $("body").height()) {
        $("#accTypes").css("width", "50vw");
        $("#panelTypes").css("width", "50vw");
    }
    else {
        $("#accTypes").css("width", "90vw");
        $("#panelTypes").css("width", "90vw");
    }
}

class Puzzle {
    constructor(type, name, price, image, info) {
        this.type = type;
        this.name = name;
        this.price = price;
        this.image = image;
        this.info = info;
    }
}