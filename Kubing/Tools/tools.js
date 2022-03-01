let u1 = "ubl", u2 = "ub", u3 = "ubr", u4 = "ul", u5 = "u", u6 = "ur", u7 = "ufl", u8 = "uf", u9 = "ufr", nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8, nu9;
let l1 = "lub", l2 = "lu", l3 = "luf", l4 = "lb", l5 = "l", l6 = "lf", l7 = "ldb", l8 = "ld", l9 = "ldf", nl1, nl2, nl3, nl4, nl5, nl6, nl7, nl8, nl9;
let f1 = "ful", f2 = "fu", f3 = "fur", f4 = "fl", f5 = "f", f6 = "fr", f7 = "fdl", f8 = "fd", f9 = "fdr", nf1, nf2, nf3, nf4, nf5, nf6, nf7, nf8, nf9;
let r1 = "ruf", r2 = "ru", r3 = "rub", r4 = "rf", r5 = "r", r6 = "rb", r7 = "rdf", r8 = "rd", r9 = "rdb", nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8, nr9;
let b1 = "bur", b2 = "bu", b3 = "bul", b4 = "br", b5 = "b", b6 = "bl", b7 = "bdr", b8 = "bd", b9 = "bdl", nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9;
let d1 = "dfl", d2 = "df", d3 = "dfr", d4 = "dl", d5 = "d", d6 = "dr", d7 = "dbl", d8 = "db", d9 = "dbr", nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9;

const solvedState333 = [
    u1,u2,u3,u4,u5,u6,u7,u8,u9,
    l1,l2,l3,l4,l5,l6,l7,l8,l9,
    f1,f2,f3,f4,f5,f6,f7,f8,f9,
    r1,r2,r3,r4,r5,r6,r7,r8,r9,
    b1,b2,b3,b4,b5,b6,b7,b8,b9,
    d1,d2,d3,d4,d5,d6,d7,d8,d9
];

let colors333 = [
    "white", "white", "white", "white", "white", "white", "white", "white", "white",
    "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange",
    "green", "green", "green", "green", "green", "green", "green", "green", "green",
    "red", "red", "red", "red", "red", "red", "red", "red", "red",
    "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue",
    "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"
];

function getScramble333() {
    let scramble = "";
    var trekkArray = ["R", "L", "F", "B", "U", "D"];
    var tilleggArray = ["", "'", "2"];
    var antallTrekkArray = [19, 20, 21];
    var antallTrekk = antallTrekkArray[Math.floor(Math.random() * antallTrekkArray.length)];
    var scrambleArray = [];

    for (var i=0; i<antallTrekk; i++) {
        if (scrambleArray.length < 1) { //Sjekker om array er tomt
            scrambleArray[i] = trekkArray[Math.floor(Math.random() * trekkArray.length)];
        }
        else if (scrambleArray.length >= 1) {
            var like = true;
            while (like === true) {
                var trekk1 = trekkArray[Math.floor(Math.random() * trekkArray.length)];
                scrambleArray[i] = trekk1;

                if (scrambleArray[i] === trekkArray[0]) {        //R
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[1]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[0]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[1]) {   //L
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[0]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[1]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[2]) {   //F
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[3]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[2]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[3]) {   //B
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[2]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[3]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[4]) {   //U
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[5]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[4]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[5]) {   //D
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[4]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[5]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
            }
        }
    }

    for (var j=0; j<scrambleArray.length; j++) {
        scramble += scrambleArray[j] + tilleggArray[Math.floor(Math.random() * tilleggArray.length)] + " ";
    }

    return scramble.trim();
}

function draw333svg(svgID, scr) {
    let arr = applyMoves(scr);
    
    let w = $(svgID).width() / 12;
    console.log($(svgID).width()+"###");
    let h = w;
    let fill = "red";
    let stroke = "black";
    let strokeWidth = 1;

    let num = 0;
    for (var y = 0*h; y < 3*h; y += h) {
        for (let x = 3*w; x < 6*w; x += w) {
            fill = colors333[solvedState333.indexOf(arr[num])];
            
            let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
            $(rect).attr("x", x);
            $(rect).attr("y", y);
            $(rect).attr("width", w);
            $(rect).attr("height", h);
            $(rect).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(rect);

            num++;
        }
    }
    for (var y = 3*h; y < 6*h; y += h) {
        for (let x = 0*w; x < 3*w; x += w) {
            fill = colors333[solvedState333.indexOf(arr[num])];
            
            let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
            $(rect).attr("x", x);
            $(rect).attr("y", y);
            $(rect).attr("width", w);
            $(rect).attr("height", h);
            $(rect).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(rect);

            num++;
        }
    }
    for (var y = 3*h; y < 6*h; y += h) {
        for (let x = 3*w; x < 6*w; x += w) {
            fill = colors333[solvedState333.indexOf(arr[num])];
            
            let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
            $(rect).attr("x", x);
            $(rect).attr("y", y);
            $(rect).attr("width", w);
            $(rect).attr("height", h);
            $(rect).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(rect);

            num++;
        }
    }
    for (var y = 3*h; y < 6*h; y += h) {
        for (let x = 6*w; x < 9*w; x += w) {
            fill = colors333[solvedState333.indexOf(arr[num])];
            
            let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
            $(rect).attr("x", x);
            $(rect).attr("y", y);
            $(rect).attr("width", w);
            $(rect).attr("height", h);
            $(rect).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(rect);

            num++;
        }
    }
    for (var y = 3*h; y < 6*h; y += h) {
        for (let x = 9*w; x < 12*w; x += w) {
            fill = colors333[solvedState333.indexOf(arr[num])];
            
            let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
            $(rect).attr("x", x);
            $(rect).attr("y", y);
            $(rect).attr("width", w);
            $(rect).attr("height", h);
            $(rect).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(rect);

            num++;
        }
    }
    for (var y = 6*h; y < 9*h; y += h) {
        for (let x = 3*w; x < 6*w; x += w) {
            fill = colors333[solvedState333.indexOf(arr[num])];
            
            let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
            $(rect).attr("x", x);
            $(rect).attr("y", y);
            $(rect).attr("width", w);
            $(rect).attr("height", h);
            $(rect).attr("style", "fill:"+fill+";stroke:"+stroke+";stroke-width:"+strokeWidth);
            
            $(svgID).append(rect);

            num++;
        }
    }
}

function getHHmmsshh(ms) {
    let timeStr = "";
    let cs = Math.floor((ms % 1000) / 10);
    let s = Math.floor((ms / 1000) % 60);
    let m = Math.floor((ms / 60000) % 60);
    let h = Math.floor((ms / 3600000) % 24);

    if (h !== 0) {
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (cs < 10) {
            cs = "0" + cs;
        }
        timeStr = h + ":" + m + ":" + s + "." + cs;
    }
    else {
        if (m !==0) {
            if (s < 10) {
                s = "0" + s;
            }
            if (cs < 10) {
                cs = "0" + cs;
            }
            timeStr = m + ":" + s + "." + cs;
        }
        else {
            if (cs < 10) {
                cs = "0" + cs;
            }
            timeStr = s + "." + cs;
        }
    }

    return timeStr;
}

function resetCubeState() {
    u1 = "ubl", u2 = "ub", u3 = "ubr", u4 = "ul", u5 = "u", u6 = "ur", u7 = "ufl", u8 = "uf", u9 = "ufr",
    l1 = "lub", l2 = "lu", l3 = "luf", l4 = "lb", l5 = "l", l6 = "lf", l7 = "ldb", l8 = "ld", l9 = "ldf",
    f1 = "ful", f2 = "fu", f3 = "fur", f4 = "fl", f5 = "f", f6 = "fr", f7 = "fdl", f8 = "fd", f9 = "fdr",
    r1 = "ruf", r2 = "ru", r3 = "rub", r4 = "rf", r5 = "r", r6 = "rb", r7 = "rdf", r8 = "rd", r9 = "rdb",
    b1 = "bur", b2 = "bu", b3 = "bul", b4 = "br", b5 = "b", b6 = "bl", b7 = "bdr", b8 = "bd", b9 = "bdl",
    d1 = "dfl", d2 = "df", d3 = "dfr", d4 = "dl", d5 = "d", d6 = "dr", d7 = "dbl", d8 = "db", d9 = "dbr";
}

function applyMoves(allMoves) {
    console.log(allMoves);
    scrambleArray = allMoves.split(" ");

    resetCubeState();

    for (var i = 0; i < scrambleArray.length; i++) {
        switch (scrambleArray[i]) {
            case "R":
                _r();
                break;
            case "R2":
            case "R2'":
                _r2();
                break;
            case "R'":
                _ri();
                break;
            case "L":
                _l();
                break;
            case "L2":
            case "L2'":
                _l2();
                break;
            case "L'":
                _li();
                break;
            case "F":
                _f();
                break;
            case "F2":
            case "F2'":
                _f2();
                break;
            case "F'":
                _fi();
                break;
            case "B":
                _b();
                break;
            case "B2":
            case "B2'":
                _b2();
                break;
            case "B'":
                _bi();
                break;
            case "U":
                _u();
                break;
            case "U2":
            case "U2'":
                _u2();
                break;
            case "U'":
                _ui();
                break;
            case "D":
                _d();
                break;
            case "D2":
            case "D2'":
                _d2();
                break;
            case "D'":
                _di();
                break;
            case "x":
                _x();
                break;
            case "x2":
            case "x2'":
                _x2();
                break;
            case "x'":
                _xi();
                break;
            case "y":
                _y();
                break;
            case "y2":
            case "y2'":
                _y2();
                break;
            case "y'":
                _yi();
                break;
            case "z":
                _z();
                break;
            case "z2":
            case "z2'":
                _z2();
                break;
            case "z'":
                _zi();
                break;
            case "M":
                _m();
                break;
            case "M2":
            case "M2'":
                _m2();
                break;
            case "M'":
                _mi();
                break;
            case "S":
                _s();
                break;
            case "S2":
            case "S2'":
                _s2();
                break;
            case "S'":
                _si();
                break;
            case "E":
                _e();
                break;
            case "E2":
            case "E2'":
                _e2();
                break;
            case "E'":
                _ei();
                break;
            case "Uw":
                _uw();
                break;
            case "Uw2":
            case "Uw2'":
                _uw2();
                break;
            case "Uw'":
                _uwi();
                break;
            case "Dw":
                _dw();
                break;
            case "Dw2":
            case "Dw2'":
                _dw2();
                break;
            case "Dw'":
                _dwi();
                break;
            case "Fw":
                _fw();
                break;
            case "Fw2":
            case "Fw2'":
                _fw2();
                break;
            case "Fw'":
                _fwi();
                break;
            case "Bw":
                _bw();
                break;
            case "Bw2":
            case "Bw2'":
                _bw2();
                break;
            case "Bw'":
                _bwi();
                break;
            case "Rw":
                _rw();
                break;
            case "Rw2":
            case "Rw2'":
                _rw2();
                break;
            case "Rw'":
                _rwi();
                break;
            case "Lw":
                _lw();
                break;
            case "Lw2":
            case "Lw2'":
                _lw2();
                break;
            case "Lw'":
                _lwi();
                break;
        }
    }

    return getCubeState();
}

function getCubeState() {
    return [
        u1,u2,u3,u4,u5,u6,u7,u8,u9,
        l1,l2,l3,l4,l5,l6,l7,l8,l9,
        f1,f2,f3,f4,f5,f6,f7,f8,f9,
        r1,r2,r3,r4,r5,r6,r7,r8,r9,
        b1,b2,b3,b4,b5,b6,b7,b8,b9,
        d1,d2,d3,d4,d5,d6,d7,d8,d9
    ];
}

function getCubeStateWoCenters() {
    return [
        u1,u2,u3,u4,u6,u7,u8,u9,
        l1,l2,l3,l4,l6,l7,l8,l9,
        f1,f2,f3,f4,f6,f7,f8,f9,
        r1,r2,r3,r4,r6,r7,r8,r9,
        b1,b2,b3,b4,b6,b7,b8,b9,
        d1,d2,d3,d4,d6,d7,d8,d9
    ];
}

function getEdgeState() {
    return [
        u2,u4,u6,u8,
        l2,l4,l6,l8,
        f2,f4,f6,f8,
        r2,r4,r6,r8,
        b2,b4,b6,b8,
        d2,d4,d6,d8
    ];
}

function getEdgeStateBLD() {
    return [
        u2,u6,u8,u4,
        l2,l6,l8,l4,
        f2,f6,f8,f4,
        r2,r6,r8,r4,
        b2,b6,b8,b4,
        d2,d6,d8,d4
    ];
}

function getCornerState() {
    return [
        u1,u3,u7,u9,
        l1,l3,l7,l9,
        f1,f3,f7,f9,
        r1,r3,r7,r9,
        b1,b3,b7,b9,
        d1,d3,d7,d9
    ];
}

function getCornerStateBLD() {
    return [
        u1,u3,u9,u7,
        l1,l3,l9,l7,
        f1,f3,f9,f7,
        r1,r3,r9,r7,
        b1,b3,b9,b7,
        d1,d3,d9,d7
    ];
}

function getCenters() {
    return [
        u5,l5,f5,r5,b5,d5
    ];
}

function mirror(alg) {
    let newAlg = alg;

    //U
    newAlg.replaceAll("U2","/")
    newAlg.replaceAll("U'","i")
    newAlg.replaceAll("U","U'")
    newAlg.replaceAll("/","U2")
    newAlg.replaceAll("i","U")

    //D
    newAlg.replaceAll("D2","/")
    newAlg.replaceAll("D'","i")
    newAlg.replaceAll("D","D'")
    newAlg.replaceAll("/","D2")
    newAlg.replaceAll("i","D")

    //F
    newAlg.replaceAll("F2","/")
    newAlg.replaceAll("F'","i")
    newAlg.replaceAll("F","F'")
    newAlg.replaceAll("/","F2")
    newAlg.replaceAll("i","F")

    //B
    newAlg.replaceAll("B2","/")
    newAlg.replaceAll("B'","i")
    newAlg.replaceAll("B","B'")
    newAlg.replaceAll("/","B2")
    newAlg.replaceAll("i","B")

    //L
    newAlg.replaceAll("L2","/")
    newAlg.replaceAll("L'","i")
    newAlg.replaceAll("L","R'")
    newAlg.replaceAll("/","R2")
    newAlg.replaceAll("i","R")

    //R
    newAlg.replaceAll("R2","/")
    newAlg.replaceAll("R'","i")
    newAlg.replaceAll("R","L'")
    newAlg.replaceAll("/","L2")
    newAlg.replaceAll("i","L")

    //S
    newAlg.replaceAll("S2","/")
    newAlg.replaceAll("S'","i")
    newAlg.replaceAll("S","S'")
    newAlg.replaceAll("/","S2")
    newAlg.replaceAll("i","S")

    //E
    newAlg.replaceAll("E2","/")
    newAlg.replaceAll("E'","i")
    newAlg.replaceAll("E","E'")
    newAlg.replaceAll("/","E2")
    newAlg.replaceAll("i","E")

    return newAlg;
}

{
    function _r() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u3 = nf3; u6 = nf6; u9 = nf9;
        f3 = nd3; f6 = nd6; f9 = nd9;
        d3 = nb7; d6 = nb4; d9 = nb1;
        b7 = nu3; b4 = nu6; b1= nu9;
        r1 = nr7; r2 = nr4; r3 = nr1; r4 = nr8; r6 = nr2; r7 = nr9; r8 = nr6; r9 = nr3;
    }
    function _r2() {
        _r();
        _r();
    }
    function _ri() {
        _r();
        _r();
        _r();
    }
    function _l() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u1 = nb9; u4 = nb6; u7 = nb3;
        f1 = nu1; f4 = nu4; f7 = nu7;
        d1 = nf1; d4 = nf4; d7 = nf7;
        b9 = nd1; b6 = nd4; b3= nd7;
        l1 = nl7; l2 = nl4; l3 = nl1; l4 = nl8; l6 = nl2; l7 = nl9; l8 = nl6; l9 = nl3;
    }
    function _l2() {
        _l();
        _l();
    }
    function _li() {
        _l();
        _l();
        _l();
    }
    function _f() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u7 = nl9; u8 = nl6; u9 = nl3;
        r1 = nu7; r4 = nu8; r7 = nu9;
        d3 = nr1; d2 = nr4; d1 = nr7;
        l9 = nd3; l6 = nd2; l3 = nd1;
        f1 = nf7; f2 = nf4; f3 = nf1; f4 = nf8; f6 = nf2; f7 = nf9; f8 = nf6; f9 = nf3;
    }
    function _f2() {
        _f();
        _f();
    }
    function _fi() {
        _f();
        _f();
        _f();
    }
    function _b() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u1 = nr3; u2 = nr6; u3 = nr9;
        r3 = nd9; r6 = nd8; r9 = nd7;
        d9 = nl7; d8 = nl4; d7 = nl1;
        l1 = nu3; l4 = nu2; l7 = nu1;
        b1 = nb7; b2 = nb4; b3 = nb1; b4 = nb8; b6 = nb2; b7 = nb9; b8 = nb6; b9 = nb3;
    }
    function _b2() {
        _b();
        _b();
    }
    function _bi() {
        _b();
        _b();
        _b();
    }
    function _u() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        l1 = nf1; l2 = nf2; l3 = f3;
        f1 = nr1; f2 = nr2; f3 = nr3;
        r1 = nb1; r2 = nb2; r3 = nb3;
        b1 = nl1; b2 = nl2; b3= nl3;
        u1 = nu7; u2 = nu4; u3 = nu1; u4 = nu8; u6 = nu2; u7 = nu9; u8 = nu6; u9 = nu3;
    }
    function _u2() {
        _u();
        _u();
    }
    function _ui() {
        _u();
        _u();
        _u();
    }
    function _d() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        l7 = nb7; l8 = nb8; l9 = nb9;
        f7 = nl7; f8 = nl8; f9 = nl9;
        r7 = nf7; r8 = nf8; r9 = nf9;
        b7 = nr7; b8 = nr8; b9 = nr9;
        d1 = nd7; d2 = nd4; d3 = nd1; d4 = nd8; d6 = nd2; d7 = nd9; d8 = nd6; d9 = nd3;
    }
    function _d2() {
        _d();
        _d();
    }
    function _di() {
        _d();
        _d();
        _d();
    }
    function _x() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf5 = f5; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb5 = b5; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr5 = r5; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl5 = l5; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu5 = u5; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd5 = d5; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u1 = nf1; u2 = nf2; u3 = nf3; u4 = nf4; u5 = nf5; u6 = nf6; u7 = nf7; u8 = nf8; u9 = nf9;
        d1 = nb9; d2 = nb8; d3 = nb7; d4 = nb6; d5 = nb5; d6 = nb4; d7 = nb3; d8 = nb2; d9 = nb1;
        f1 = nd1; f2 = nd2; f3 = nd3; f4 = nd4; f5 = nd5; f6 = nd6; f7 = nd7; f8 = nd8; f9 = nd9;
        b1 = nu9; b2 = nu8; b3 = nu7; b4 = nu6; b5 = nu5; b6 = nu4; b7 = nu3; b8 = nu2; b9 = nu1;
        r1 = nr7; r2 = nr4; r3 = nr1; r4 = nr8; r6 = nr2; r7 = nr9; r8 = nr6; r9 = nr3;
        l1 = nl3; l2 = nl6; l3 = nl9; l4 = nl2; l6 = nl8; l7 = nl1; l8 = nl4; l9 = nl7;
    }
    function _x2() {
        _x();
        _x();
    }
    function _xi() {
        _x();
        _x();
        _x();
    }
    function _y() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf5 = f5; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb5 = b5; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr5 = r5; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl5 = l5; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu5 = u5; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd5 = d5; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u1 = nu7; u2 = nu4; u3 = nu1; u4 = nu8; u6 = nu2; u7 = nu9; u8 = nu6; u9 = nu3;
        d1 = nd3; d2 = nd6; d3 = nd9; d4 = nd2; d6 = nd8; d7 = nd1; d8 = nd4; d9 = nd7;
        l1 = nf1; l2 = nf2; l3 = nf3; l4 = nf4; l5 = nf5; l6 = nf6; l7 = nf7; l8 = nf8; l9 = nf9;
        f1 = nr1; f2 = nr2; f3 = nr3; f4 = nr4; f5 = nr5; f6 = nr6; f7 = nr7; f8 = nr8; f9 = nr9;
        r1 = nb1; r2 = nb2; r3 = nb3; r4 = nb4; r5 = nb5; r6 = nb6; r7 = nb7; r8 = nb8; r9 = nb9;
        b1 = nl1; b2 = nl2; b3 = nl3; b4 = nl4; b5 = nl5; b6 = nl6; b7 = nl7; b8 = nl8; b9 = nl9;
    }
    function _y2() {
        _y();
        _y();
    }
    function _yi() {
        _y();
        _y();
        _y();
    }
    function _z() {
        nf1 = f1; nf2 = f2; nf3 = f3; nf4 = f4; nf5 = f5; nf6=f6; nf7=f7; nf8=f8; nf9=f9;
        nb1 = b1; nb2 = b2; nb3 = b3; nb4 = b4; nb5 = b5; nb6=b6; nb7=b7; nb8=b8; nb9=b9;
        nr1 = r1; nr2 = r2; nr3 = r3; nr4 = r4; nr5 = r5; nr6=r6; nr7=r7; nr8=r8; nr9=r9;
        nl1 = l1; nl2 = l2; nl3 = l3; nl4 = l4; nl5 = l5; nl6=l6; nl7=l7; nl8=l8; nl9=l9;
        nu1 = u1; nu2 = u2; nu3 = u3; nu4 = u4; nu5 = u5; nu6=u6; nu7=u7; nu8=u8; nu9=u9;
        nd1 = d1; nd2 = d2; nd3 = d3; nd4 = d4; nd5 = d5; nd6=d6; nd7=d7; nd8=d8; nd9=d9;

        u1 = nl7; u2 = nl4; u3 = nl1; u4 = nl8; u5 = nl5; u6 = nl2; u7 = nl9; u8 = nl6; u9 = nl3;
        d1 = nr7; d2 = nr4; d3 = nr1; d4 = nr8; d5 = nr5; d6 = nr2; d7 = nr9; d8 = nr6; d9 = nr3;
        r1 = nu7; r2 = nu4; r3 = nu1; r4 = nu8; r5 = nu5; r6 = nu2; r7 = nu9; r8 = nu6; r9 = nu3;
        l1 = nd7; l2 = nd4; l3 = nd1; l4 = nd8; l5 = nd5; l6 = nd2; l7 = nd9; l8 = nd6; l9 = nd3;
        f1 = nf7; f2 = nf4; f3 = nf1; f4 = nf8; f6 = nf2; f7 = nf9; f8 = nf6; f9 = nf3;
        b1 = nb3; b2 = nb6; b3 = nb9; b4 = nb2; b6 = nb8; b7 = nb1; b8 = nb4; b9 = nb7;
    }
    function _z2() {
        _z();
        _z();
    }
    function _zi() {
        _z();
        _z();
        _z();
    }
    function _m() {
        _xi();
        _r();
        _li();
    }
    function _m2() {
        _m();
        _m();
    }
    function _mi() {
        _m();
        _m();
        _m();
    }
    function _s() {
        _z();
        _fi();
        _b();
    }
    function _s2() {
        _s();
        _s();
    }
    function _si() {
        _s();
        _s();
        _s();
    }
    function _e() {
        _yi();
        _u();
        _di();
    }
    function _e2() {
        _e();
        _e();
    }
    function _ei() {
        _e();
        _e();
        _e();
    }
    function _uw() {
        _u();
        _ei();
    }
    function _uw2() {
        _u2();
        _e2();
    }
    function _uwi() {
        _ui();
        _e();
    }
    function _dw() {
        _d();
        _e();
    }
    function _dw2() {
        _d2();
        _e2();
    }
    function _dwi() {
        _di();
        _ei();
    }
    function _fw() {
        _f();
        _s();
    }
    function _fw2() {
        _f2();
        _s2();
    }
    function _fwi() {
        _fi();
        _si();
    }
    function _bw() {
        _b();
        _si();
    }
    function _bw2() {
        _b2();
        _s2();
    }
    function _bwi() {
        _bi();
        _s();
    }
    function _rw() {
        _r();
        _mi();
    }
    function _rw2() {
        _r2();
        _m2();
    }
    function _rwi() {
        _ri();
        _m();
    }
    function _lw() {
        _l();
        _m();
    }
    function _lw2() {
        _l2();
        _m2();
    }
    function _lwi() {
        _li();
        _mi();
    }
}