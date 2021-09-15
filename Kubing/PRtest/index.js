const URL = "https://www.worldcubeassociation.org/persons/2015LUND03";
//const URL = "./data.html";
let events = ["3x3x3","2x2x2","4x4x4","5x5x5","6x6x6","7x7x7","3x3x3 Blindfolded","3x3x3 Fewest Moves","3x3x3 One-Handed","Clock","Megaminx","Pyraminx","Skewb","Square-1","3x3x3 Multi-Blind"];

$(function() {
    $.getJSON('https://api.allorigins.win/get?url=https%3A//www.worldcubeassociation.org/persons/2015LUND03&callback=?', function (data) {
        $('#hiddenDiv').html(data.contents);
        setTimeout(function(){
            makePRList();
        }, 500);
    });
});

$(window).resize(function(){
    styleTable();
});

function makePRList() {
    const table = $("#tbodyPR");
    let out = "<tr><th>Event</th><th>NR</th><th>CR</th><th>WR</th><th>Single</th><th>Average</th><th>WR</th><th>CR</th><th>NR</th></tr>";
    let i = 1;
    for (let event of events) {
        out += "<tr>"+
        "<td>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td:nth-child(1)").text()+"</td>"+
        "<td>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").text()+"</td>"+
        "<td>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").text()+"</td>"+
        "<td>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td:nth-child(4)").text()+"</td>"+
        "<th>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td.single > a").text()+"</th>"+
        "<th>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td.average > a").text()+"</th>"+
        "<td>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td:nth-child(7)").text()+"</td>"+
        "<td>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td:nth-child(8)").text()+"</td>"+
        "<td>"+$("#person > div.personal-records > div > table > tbody > tr:nth-child("+i+") > td:nth-child(9)").text()+"</td>"+
        "</tr>";
        i++;
    }

    $(table).html(out);

    styleTable();
    styleRanking();
}

function styleTable() {
    const height = $("#content").css("height").split("px")[0] - $("#content h1").css("height").split("px")[0];
    $("#tablePR").css("height",height);
}

function styleRanking() {
    const rankings = $("#tablePR td:nth-child(2), #tablePR td:nth-child(3), #tablePR td:nth-child(4), #tablePR td:nth-child(7), #tablePR td:nth-child(8), #tablePR td:nth-child(9)");
    for (let r of rankings) {
        if (parseInt(r.textContent) <= 10) {
            $(r).css("color", "#00ff00");
        }
    }
}