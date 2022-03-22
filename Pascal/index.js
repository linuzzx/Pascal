function makePascal(i, ud) {
    if (!(/^\d+$/.test(i))) {
        return false;
    }
    let pascal = [];

    for (let n = 0; n < i; n++) {
        let arr = [];
        for (let k = 0; k <= n; k++) {
            //n!/(k!(n−k)!)
            arr.push(Math.round(fact(n)/(fact(k)*fact(n-k))));
        }
        if (ud) {
            pascal.unshift(arr.join(" "));
        }
        else {
            pascal.push(arr.join(" "));
        }
    }
    $("#result").html(pascal.join("<br>"));
}

function fact(n) {
    let f = 1;
    for (let i = 1; i <= n; i++) {
        f *= i;
    }
    return f;
}