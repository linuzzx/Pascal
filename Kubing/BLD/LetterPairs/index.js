$(function() {
    adjustSize();
});
        
$(window).resize(function(){
    adjustSize();
});

function lesData(files=document.getElementById("input").files) {
    reset();
    tblData  = document.getElementById("tblData");
    readXlsxFile(files[0]).then(function (data) {
        skrivData(data);
    });
}

function skrivData(data) {
    dataList = [];

    let table = "<table class='tbl'>" +
        "<tr><th>TID</th><th>VO2</th><th>RER</th><th>RER/100</th><th>VCO2</th></tr>" +
        "<tr><th></th><th>ml/min</th><th>l/min</th><th></th><th>ml/min</th></tr>";

    let i=0;
    for (let row of data) {
        if (i > 9 && i < data.length -1) {
            dataList.push(row);
        }
        if (i === data.length-1) {
            break;
        }
        else if (i > 11) {
            table += "<tr><td>"+row[0]+"</td><td>"+row[1]+"</td><td>"+row[5]+"</td><td>"+row[5]/100+"</td><td>"+row[12]+"</td></tr>"
            rowLength++;
        }
        i++;
    }

    table += "</table>";
    tblData.innerHTML = table;
}

function adjustSize() {

}