$(() => {
    console.log(window.search);
    if (window.location.search !== "") {
        const shortURL = (window.location.search).split("?")[1];
console.log(shortURL);
        firebase.database().ref("URLs/").once("value", (snapshot) => {console.log(snapshot);
            let urls = snapshot.val();
            console.log(urls);
            let ind = Object.values(urls).findIndex(u => u.shortURL === shortURL);

            if (ind) {
                location.replace(Object.values(urls)[ind].longURL);
            }
            else {
                location.replace("./noURL.html");
            }
        });
    }
    else {
        $("#content").css("display", "block");
    }
});

function shortenURL(url) {
    
}

function copyURL(url) {
    navigator.clipboard.writeText(url);
}