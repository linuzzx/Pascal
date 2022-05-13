let cubes = {};
let puzzles = [];
$(() => {
    firebase.database().ref("Kuber/").once("value", (snapshot) => {
        cubes = snapshot.val();
        
        for (let c of Object.values(cubes)) {
            puzzles.push(new Puzzle(c.type, c.name, c.price, c.img));
        }

        showPuzzles();
        adjustSize();
    });

    adjustSize();
});

$(window).resize(() => {
    adjustSize();
});

function showPuzzles() {
    for (let p of puzzles) {
        $("#puzzles").append("<puzzle><h1>"+p.name+"</h1><img src='"+p.image+"'><h1>"+p.price+"kr</h1></puzzle>");
    }
}

function adjustSize() {
    $("puzzle").height($("body").width() / 3);
    $("puzzle").width($("puzzle").height());
}

class Puzzle {
    constructor(type, name, price, image) {
        this.type = type;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}