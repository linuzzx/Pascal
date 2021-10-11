let r1 = "red", r2 = "red", r3 = "red", r4 = "red", r5 = "red", r6 = "red", r7 = "red", r8 = "red", r9 = "red", nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8, nr9;
let l1 = "orange", l2 = "orange", l3 = "orange", l4 = "orange", l5 = "orange", l6 = "orange", l7 = "orange", l8 = "orange", l9 = "orange", nl1, nl2, nl3, nl4, nl5, nl6, nl7, nl8, nl9;
let f1 = "green", f2 = "green", f3 = "green", f4 = "green", f5 = "green", f6 = "green", f7 = "green", f8 = "green", f9 = "green", nf1, nf2, nf3, nf4, nf5, nf6, nf7, nf8, nf9;
let b1 = "blue", b2 = "blue", b3 = "blue", b4 = "blue", b5 = "blue", b6 = "blue", b7 = "blue", b8 = "blue", b9 = "blue", nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9;
let u1 = "white", u2 = "white", u3 = "white", u4 = "white", u5 = "white", u6 = "white", u7 = "white", u8 = "white", u9 = "white", nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8, nu9;
let d1 = "yellow", d2 = "yellow", d3 = "yellow", d4 = "yellow", d5 = "yellow", d6 = "yellow", d7 = "yellow", d8 = "yellow", d9 = "yellow", nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9;

function scramble() {
    scramble = "";
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

    return scramble;
}

function applyMoves(scramble) {

    return state;
}

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