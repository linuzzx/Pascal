let cubes = {};
//let puzzles = [];
let puzzles = {};
$(() => {
    firebase.database().ref("Kuber/").once("value", (snapshot) => {
        cubes = snapshot.val();
        
        /*for (let c of Object.values(cubes)) {
            puzzles.push(new Puzzle(c.type, c.name, c.price, c.img, c.info));
        }*/
        for (let c of Object.values(cubes)) {
            if (!puzzles[c.type]) {
                puzzles[c.type] = [];
            }
            puzzles[c.type].push(new Puzzle(c.name, c.price, c.img, c.info));
        }

        showPuzzles();
        adjustSize();
    });
});

$(window).resize(() => {
    adjustSize();
});

function showPuzzles() {
    let id = 0;
    for (let p of puzzles) {
        $("#puzzles").append("<div class='puzzle'><div class='puzzle-content'>"+
        "<div class='puzzle-front'><h2>"+p.name+"</h2><img src='"+p.image+"'><h2>"+p.price+"kr</h2></div>"+
        "<div class='puzzle-back'><span>"+p.info+"</span></div>"+
        "</div></div>");
        id++;
    }
}

function adjustSize() {
    $(".puzzle").width($("body").width() / 5);
    $(".puzzle").height($(".puzzle").width());

    $(".puzzle img").height(($("body").width() / 5) - 2 * $(".puzzle h2").height());
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