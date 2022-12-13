$(() => {
    console.log(window.search);
    if (window.location.search !== "") {
        const shortURL = (window.location.search).split("?")[1];
console.log(shortURL);
        firebase.database().ref("URLs/").once("value", (snapshot) => {console.log(snapshot);
            let urls = snapshot.val();
            console.log(urls);
            let ind = Object.values(urls).findIndex(u => u.shortURL === shortURL);

            if (ind && Object.values(urls)[ind]) {
                location.replace(Object.values(urls)[ind].longURL);
            }
            else {
                $("#noContent").css("display", "block");
            }
        });
    }
    else {
        $("#content").css("display", "block");
    }
});

function shortenURL(url) {
    let shortenedURL = "";

    while (shortenedURL === "") {
        let short = "";

        for (let i = 0; i < 5; i++) {
            let r1 = Math.floor(Math.random() * 3);
            let r2;
        }
    }
}

function copyURL(url) {
    navigator.clipboard.writeText(url);
}