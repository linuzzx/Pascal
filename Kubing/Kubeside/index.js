function openItem(evt, item) {
    var i, menuItems, menuLinks;
    menuItems = document.getElementsByClassName("menuItems");
    for (i = 0; i < menuItems.length; i++) {
        menuItems[i].style.display = "none";
    }
    menuLinks = document.getElementsByClassName("menuLinks");
    for (i = 0; i < menuLinks.length; i++) {
        menuLinks[i].className = menuLinks[i].className.replace(" active", "");
    }
    document.getElementById(item).style.display = "block";
    evt.currentTarget.className += " active";
}

// Logo-easter_egg
function changePic() {
    var i = 0;
    interval = setInterval(function() {
        document.getElementById("logo").src = "bilder/kube" + i + ".png";
        i++;
        if (i > 6) {
            clearInterval(interval);
            changePicAgain();
        }
    }, 100);
}
function changePicAgain() {
    var i = 6;
    interval = setInterval(function() {
        document.getElementById("logo").src = "bilder/kube" + i + ".png";
        i--;
        if (i < 0) {
            clearInterval(interval);
        }
    }, 100);
}

window.onload = function () {
    document.getElementById("btnHjem").click();
}