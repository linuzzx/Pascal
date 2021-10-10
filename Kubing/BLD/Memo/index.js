let letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
let numOfCubes = 1;
const numOfLetters3BLD = 20;
const numOfLetters4BLD = 46;
const numOfLetters5BLD = 86;

$(function() {
    getMemo();

    $("#inpMemo").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            checkMemo();
        }
    });
    const fontSize = ($("#memo").css("font-size").split("px")[0] * 0.75)

    $("#inpMemo").css("font-size", fontSize);
    adjustSize();
});
        
$(window).resize(function(){
    adjustSize();
});

function getMemo() {
    let memo = "";

    for (let i=0; i<numOfCubes; i++) {
        for (let j=0; j<numOfLetters3BLD; j++) {
            memo += letters[Math.floor(Math.random() * letters.length)] + (j % 2 === 0 ? "":" ");
        }
    }
    
    $("#memo").html(memo);
}

function showMemo() {
    $("#memo").css("visibility","visible");
}

function hideMemo() {
    $("#memo").css("visibility","hidden");
    $("#result").html("");
}

function checkMemo() {
    const success = $("#inpMemo").val().toLowerCase().trim().split(" ").join("") === $("#memo").text().toLowerCase().split(" ").join("");
    $("#inpMemo").val("");
    if (success) {
        $("#result").html("Success");
        $("#result").css("color","green");
    }
    else {
        $("#result").html("DNF<br>"+$("#memo").html());
        $("#result").css("color","red");
    }
    
    getMemo();
    showMemo();
}

function adjustSize() {
    if ($("#content").width() > $("#content").height()) {
        $("#inpMemo").css("width", "50%");
    }
    else {
        $("#inpMemo").css("width", "80%");
    }
}