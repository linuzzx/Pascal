//const URL = "https://www.worldcubeassociation.org/persons/2015LUND03";
const URL = "./data.html";
let events = ["3x3x3","2x2x2","4x4x4","5x5x5","6x6x6","7x7x7","3x3x3 Blindfolded","3x3x3 Fewest Moves","3x3x3 One-Handed","Clock","Megaminx","Pyraminx","Skewb","Square-1","3x3x3 Multi-Blind"];

$(function() {
    $.ajax({
        headers: "Access-Control-Allow-Origin",
        type: 'GET',
        url: URL,
        crossDomain: true,
        beforeSend: function(xhr){
            xhr.withCredentials = true;
    },
        success: function(data, textStatus, request){
            $("#hiddenDiv").load(URL + " tbody");
            const out = $("#hiddenDiv")[0];

            setTimeout(function(){
                makePRList();
            }, 500);
            
        }
    });
});

function makePRList() {
    const table = $("#tbodyPR");
    let out = "<tr><th>Event</th><th>NR</th><th>CR</th><th>WR</th><th>Single</th><th>Average</th><th>WR</th><th>CR</th><th>NR</th></tr>";
    let i = 1;
    for (let event of events) {
        out += "<tr>"+
        "<td>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(1)").text()+"</td>"+
        "<td>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(2)").text()+"</td>"+
        "<td>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(3)").text()+"</td>"+
        "<td>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(4)").text()+"</td>"+
        "<th>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(5)").text()+"</th>"+
        "<th>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(6)").text()+"</th>"+
        "<th>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(7)").text()+"</th>"+
        "<td>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(8)").text()+"</td>"+
        "<td>"+$("#hiddenDiv > tbody:nth-child(3) > tr:nth-child("+i+") > td:nth-child(9)").text()+"</td>"+
        "</tr>";
        i++;
    }

    $(table).html(out);

    const height = $("#content").css("height").split("px")[0] - $("#content h1").css("height").split("px")[0];
    $("#tablePR").css("height",height);
    console.log($("#content").css("height"));
    console.log($("#content h1").css("height"));
    console.log(height);
}