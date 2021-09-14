const URL = "https://www.worldcubeassociation.org/persons/2015LUND03";
//const URL = "./data.html";

$(function() {
    $.ajax({
        headers: "Access-Control-Allow-Origin",
        type: 'GET',
        url: URL,
        responseType: 'jsonp',
        crossDomain: true,
        beforeSend: function(xhr){
            xhr.withCredentials = true;
    },
        success: function(data, textStatus, request){
            console.log(data);
        }
    });
});