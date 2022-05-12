let cubes = {};
$(() => {
    firebase.database().ref("Kuber/").once("value", (snapshot) => {
        cubes = snapshot.val();
        console.log(cubes);
        let out = "";
        let cubeTypes = Object.values(cubes).map(t => t.type);
        console.log(cubeTypes);
        for (let c of Object.values(cubes)) {
            out += "<div class='puzzleBox'><h1>"+c.type+"</h1><h1>"+c.name+"</h1><img src='"+c.img+"'><br><h1>"+c.price+"</h1></div><br>";
        }
        $("#puzzles").html(out);
        adjustSize();
    });

    adjustSize();
});

function adjustSize() {
    $(".puzzleBox").width($("body").width() / 3);
    $(".puzzleBox").height($(".puzzleBox").width());
    $("img").width($("body").width() / 4);
    $("img").height($("img").width());
    $("img").css("margin", "auto");
}