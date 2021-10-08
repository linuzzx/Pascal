let letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
let numOfCubes = 1;

$(function() {
    getMemo();
});
        
$(window).resize(function(){
    
});

function getMemo() {
    let memo = "";

    for (let i=0; i<numOfCubes; i++) {
        for (let j=0; j<10; j++) {
            memo += letters[Math.floor(Math.random() * letters.length)] + " ";
        }
    }
console.log(memo);
    $("#memo").html(memo);
}

function showMemo() {
    $("#memo").css("visibility","visible");
}

function hideMemo() {
    $("#memo").css("visibility","hidden");
}

function checkMemo() {
    const success = $("#inpMemo").val().toLowerCase() === $("#memo").text().toLowerCase();
    $("#inpMemo").val("");
    alert(success)
    getMemo();
    showMemo();
}