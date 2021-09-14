const url = "https://www.worldcubeassociation.org/persons/";

$(function() {
    
});

function search() {
    const URL = url+$("#wcaID").val().toUpperCase();
    console.log(URL);
    $.ajax({
        url: URL,
        dataType: 'document',
        success: function(data) {
            console.log(data);
        }
   });
}