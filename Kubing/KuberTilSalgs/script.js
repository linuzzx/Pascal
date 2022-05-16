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

function adjustSize() {
    $(".puzzle").width($("body").width() / 5);
    $(".puzzle").height($(".puzzle").width());

    $(".puzzle img").height(($("body").width() / 5) - 2 * $(".puzzle h2").height());
}

function addAccordion() {
    let accTypes = $("#accTypes");
    let panelTypes = $("#panelTypes");
    
    let types = $.uniqueSort(puzzles.map(p => p.type));
    let out = "";
    for (let t of types) {
        out += "<h3 onclick='showType(\"" + t + "\")'>" + t + "</h3>";
    }
    $(panelTypes).html(out);
    
    $(accTypes).on("click", () => {
        toggleAccordion();
    });
}

function toggleAccordion() {
    let panelTypes = $("#panelTypes");
    $("#accTypes").toggleClass("active");
        if ($(panelTypes).css("max-height") !== "none") {
            $(panelTypes).css("max-height", "none");
        }
        else {
            $(panelTypes).css("max-height", "0");
        } 
}

function showType(type) {
    $(".puzzleContainer").prop("hidden", true);
    $("#puzzle_" + type).prop("hidden", false);
    toggleAccordion();
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