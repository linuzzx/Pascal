$(() => {
    if (window.location.search !== "") {
        let shortURL = (window.location.search).split("?")[1];
        if (shortURL.includes("&")) {
            shortURL = shortURL.split("&")[0];
        }
        if (shortURL.includes("=")) {
            location.replace("https://einarkl.github.io/URL");
        }
        else {
            firebase.database().ref("URLs/").once("value", (snapshot) => {
                let urls = snapshot.val() ? snapshot.val() : [];
                
                let ind = Object.keys(urls).indexOf(shortURL);
                
                if (ind !== -1) {
                    location.replace(Object.values(snapshot.val())[ind]);
                }
                else {
                    $("#noContent").css("display", "block");
                }
            });
        }
    }
    else {
        $("#content").css("display", "block");
    }
});

function shortenURL(url) {
    url = url.trim();
    if (url !== "") {
        let shortenedURL = "";
        let shorts = [];

        firebase.database().ref("URLs/").once("value", (snapshot) => {
            shorts = snapshot.val() ? Object.keys(snapshot.val()) : [];
        });
    /* 
    48-57	0-9
    65-90	A-Z
    97-122	a-z */
        while (shortenedURL === "") {
            let short = "";

            for (let i = 0; i < 5; i++) {
                let r1 = Math.floor(Math.random() * 3);
                let r2 = [[48, 57], [65, 90], [97, 122]][r1];

                short += String.fromCharCode(Math.floor(Math.random() * (r2[1] - r2[0] + 1) + r2[0]));
            }
            
            if (shorts.indexOf(short) === -1) {
                shortenedURL = short;
                firebase.database().ref("URLs/").update({[short] : url});
            }
        }

        $("#inpShortURL").val("https://einarkl.github.io/URL?" + shortenedURL);
        toggleCopyBtn();
    }
    else {
        $("#inpShortURL").val("");
        toggleCopyBtn();
    }
}

function copyURL(url) {
    navigator.clipboard.writeText(url);
}

function toggleCopyBtn() {
    if ($("#inpShortURL").val() !== "") {
        $("#btnCopy").prop("disabled", false);
    }
    else {
        $("#btnCopy").prop("disabled", true);
    }
}