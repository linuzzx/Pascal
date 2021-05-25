var c = document.getElementById("drawScramble");
var ctx = c.getContext("2d");

var r1 = "red", r2 = "red", r3 = "red", r4 = "red", r5 = "red", r6 = "red", r7 = "red", r8 = "red", r9 = "red", nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8, nr9;
var l1 = "orange", l2 = "orange", l3 = "orange", l4 = "orange", l5 = "orange", l6 = "orange", l7 = "orange", l8 = "orange", l9 = "orange", nl1, nl2, nl3, nl4, nl5, nl6, nl7, nl8, nl9;
var f1 = "green", f2 = "green", f3 = "green", f4 = "green", f5 = "green", f6 = "green", f7 = "green", f8 = "green", f9 = "green", nf1, nf2, nf3, nf4, nf5, nf6, nf7, nf8, nf9;
var b1 = "blue", b2 = "blue", b3 = "blue", b4 = "blue", b5 = "blue", b6 = "blue", b7 = "blue", b8 = "blue", b9 = "blue", nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9;
var u1 = "white", u2 = "white", u3 = "white", u4 = "white", u5 = "white", u6 = "white", u7 = "white", u8 = "white", u9 = "white", nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8, nu9;
var d1 = "yellow", d2 = "yellow", d3 = "yellow", d4 = "yellow", d5 = "yellow", d6 = "yellow", d7 = "yellow", d8 = "yellow", d9 = "yellow", nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9;

function drawScramble() {
    r1 = "red", r2 = "red", r3 = "red", r4 = "red", r5 = "red", r6 = "red", r7 = "red", r8 = "red", r9 = "red";
    l1 = "orange", l2 = "orange", l3 = "orange", l4 = "orange", l5 = "orange", l6 = "orange", l7 = "orange", l8 = "orange", l9 = "orange";
    f1 = "green", f2 = "green", f3 = "green", f4 = "green", f5 = "green", f6 = "green", f7 = "green", f8 = "green", f9 = "green";
    b1 = "blue", b2 = "blue", b3 = "blue", b4 = "blue", b5 = "blue", b6 = "blue", b7 = "blue", b8 = "blue", b9 = "blue";
    u1 = "white", u2 = "white", u3 = "white", u4 = "white", u5 = "white", u6 = "white", u7 = "white", u8 = "white", u9 = "white";
    d1 = "yellow", d2 = "yellow", d3 = "yellow", d4 = "yellow", d5 = "yellow", d6 = "yellow", d7 = "yellow", d8 = "yellow", d9 = "yellow";

    ctx.fillStyle = "black";
    ctx.fillRect(300, 0, 310, 310);
    ctx.fillRect(0, 300, 310, 310);
    ctx.fillRect(300, 300, 310, 310);
    ctx.fillRect(600, 300, 310, 310);
    ctx.fillRect(900, 300, 310, 310);
    ctx.fillRect(300, 600, 310, 310);

    for (var i = 310; i < 610; i += 100) {
        for (var j = 10; j < 310; j += 100) {
            ctx.fillStyle = "white";
            ctx.fillRect(i, j, 90, 90);
        }
    }
    for (var i = 10; i < 310; i += 100) {
        for (var j = 310; j < 610; j += 100) {
            ctx.fillStyle = "orange";
            ctx.fillRect(i, j, 90, 90);
        }
    }
    for (var i = 310; i < 610; i += 100) {
        for (var j = 310; j < 610; j += 100) {
            ctx.fillStyle = "green";
            ctx.fillRect(i, j, 90, 90);
        }
    }
    for (var i = 610; i < 910; i += 100) {
        for (var j = 310; j < 610; j += 100) {
            ctx.fillStyle = "red";
            ctx.fillRect(i, j, 90, 90);
        }
    }
    for (var i = 910; i < 1210; i += 100) {
        for (var j = 310; j < 610; j += 100) {
            ctx.fillStyle = "blue";
            ctx.fillRect(i, j, 90, 90);
        }
    }
    for (var i = 310; i < 610; i += 100) {
        for (var j = 610; j < 910; j += 100) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(i, j, 90, 90);
        }
    }

    for (var i = 0; i < drawScrambleArray.length; i++) {
        if (drawScrambleArray[i] === "R") {
            r();
        }
        else if (drawScrambleArray[i] === "R2") {
            r();
            r();
        }
        else if (drawScrambleArray[i] === "R'") {
            r();
            r();
            r();
        }
        else if (drawScrambleArray[i] === "L") {
            l();
        }
        else if (drawScrambleArray[i] === "L2") {
            l();
            l();
        }
        else if (drawScrambleArray[i] === "L'") {
            l();
            l();
            l();
        }
        else if (drawScrambleArray[i] === "F") {
            f();
        }
        else if (drawScrambleArray[i] === "F2") {
            f();
            f();
        }
        else if (drawScrambleArray[i] === "F'") {
            f();
            f();
            f();
        }
        else if (drawScrambleArray[i] === "B") {
            b();
        }
        else if (drawScrambleArray[i] === "B2") {
            b();
            b();
        }
        else if (drawScrambleArray[i] === "B'") {
            b();
            b();
            b();
        }
        else if (drawScrambleArray[i] === "U") {
            u();
        }
        else if (drawScrambleArray[i] === "U2") {
            u();
            u();
        }
        else if (drawScrambleArray[i] === "U'") {
            u();
            u();
            u();
        }
        else if (drawScrambleArray[i] === "D") {
            d();
        }
        else if (drawScrambleArray[i] === "D2") {
            d();
            d();
        }
        else if (drawScrambleArray[i] === "D'") {
            d();
            d();
            d();
        }
    }
}

function r() {
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

    ctx.fillStyle = u3;
    ctx.fillRect(510, 10, 90, 90);
    ctx.fillStyle = u6;
    ctx.fillRect(510, 110, 90, 90);
    ctx.fillStyle = u9;
    ctx.fillRect(510, 210, 90, 90);
    ctx.fillStyle = f3;
    ctx.fillRect(510, 310, 90, 90);
    ctx.fillStyle = f6;
    ctx.fillRect(510, 410, 90, 90);
    ctx.fillStyle = f9;
    ctx.fillRect(510, 510, 90, 90);
    ctx.fillStyle = d3;
    ctx.fillRect(510, 610, 90, 90);
    ctx.fillStyle = d6;
    ctx.fillRect(510, 710, 90, 90);
    ctx.fillStyle = d9;
    ctx.fillRect(510, 810, 90, 90);
    ctx.fillStyle = b7;
    ctx.fillRect(910, 510, 90, 90);
    ctx.fillStyle = b4;
    ctx.fillRect(910, 410, 90, 90);
    ctx.fillStyle = b1;
    ctx.fillRect(910, 310, 90, 90);
    ctx.fillStyle = r1;
    ctx.fillRect(610, 310, 90, 90);
    ctx.fillStyle = r2;
    ctx.fillRect(710, 310, 90, 90);
    ctx.fillStyle = r3;
    ctx.fillRect(810, 310, 90, 90);
    ctx.fillStyle = r4;
    ctx.fillRect(610, 410, 90, 90);
    ctx.fillStyle = r6;
    ctx.fillRect(810, 410, 90, 90);
    ctx.fillStyle = r7;
    ctx.fillRect(610, 510, 90, 90);
    ctx.fillStyle = r8;
    ctx.fillRect(710, 510, 90, 90);
    ctx.fillStyle = r9;
    ctx.fillRect(810, 510, 90, 90);
}
function l() {
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

    ctx.fillStyle = u1;
    ctx.fillRect(310, 10, 90, 90);
    ctx.fillStyle = u4;
    ctx.fillRect(310, 110, 90, 90);
    ctx.fillStyle = u7;
    ctx.fillRect(310, 210, 90, 90);
    ctx.fillStyle = f1;
    ctx.fillRect(310, 310, 90, 90);
    ctx.fillStyle = f4;
    ctx.fillRect(310, 410, 90, 90);
    ctx.fillStyle = f7;
    ctx.fillRect(310, 510, 90, 90);
    ctx.fillStyle = d1;
    ctx.fillRect(310, 610, 90, 90);
    ctx.fillStyle = d4;
    ctx.fillRect(310, 710, 90, 90);
    ctx.fillStyle = d7;
    ctx.fillRect(310, 810, 90, 90);
    ctx.fillStyle = b9;
    ctx.fillRect(1110, 510, 90, 90);
    ctx.fillStyle = b6;
    ctx.fillRect(1110, 410, 90, 90);
    ctx.fillStyle = b3;
    ctx.fillRect(1110, 310, 90, 90);
    ctx.fillStyle = l1;
    ctx.fillRect(10, 310, 90, 90);
    ctx.fillStyle = l2;
    ctx.fillRect(110, 310, 90, 90);
    ctx.fillStyle = l3;
    ctx.fillRect(210, 310, 90, 90);
    ctx.fillStyle = l4;
    ctx.fillRect(10, 410, 90, 90);
    ctx.fillStyle = l6;
    ctx.fillRect(210, 410, 90, 90);
    ctx.fillStyle = l7;
    ctx.fillRect(10, 510, 90, 90);
    ctx.fillStyle = l8;
    ctx.fillRect(110, 510, 90, 90);
    ctx.fillStyle = l9;
    ctx.fillRect(210, 510, 90, 90);
}
function f() {
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

    ctx.fillStyle = u7;
    ctx.fillRect(310, 210, 90, 90);
    ctx.fillStyle = u8;
    ctx.fillRect(410, 210, 90, 90);
    ctx.fillStyle = u9;
    ctx.fillRect(510, 210, 90, 90);
    ctx.fillStyle = r1;
    ctx.fillRect(610, 310, 90, 90);
    ctx.fillStyle = r4;
    ctx.fillRect(610, 410, 90, 90);
    ctx.fillStyle = r7;
    ctx.fillRect(610, 510, 90, 90);
    ctx.fillStyle = d3;
    ctx.fillRect(510, 610, 90, 90);
    ctx.fillStyle = d2;
    ctx.fillRect(410, 610, 90, 90);
    ctx.fillStyle = d1;
    ctx.fillRect(310, 610, 90, 90);
    ctx.fillStyle = l9;
    ctx.fillRect(210, 510, 90, 90);
    ctx.fillStyle = l6;
    ctx.fillRect(210, 410, 90, 90);
    ctx.fillStyle = l3;
    ctx.fillRect(210, 310, 90, 90);
    ctx.fillStyle = f1;
    ctx.fillRect(310, 310, 90, 90);
    ctx.fillStyle = f2;
    ctx.fillRect(410, 310, 90, 90);
    ctx.fillStyle = f3;
    ctx.fillRect(510, 310, 90, 90);
    ctx.fillStyle = f4;
    ctx.fillRect(310, 410, 90, 90);
    ctx.fillStyle = f6;
    ctx.fillRect(510, 410, 90, 90);
    ctx.fillStyle = f7;
    ctx.fillRect(310, 510, 90, 90);
    ctx.fillStyle = f8;
    ctx.fillRect(410, 510, 90, 90);
    ctx.fillStyle = f9;
    ctx.fillRect(510, 510, 90, 90);
}
function b() {
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

    ctx.fillStyle = u1;
    ctx.fillRect(310, 10, 90, 90);
    ctx.fillStyle = u2;
    ctx.fillRect(410, 10, 90, 90);
    ctx.fillStyle = u3;
    ctx.fillRect(510, 10, 90, 90);
    ctx.fillStyle = r3;
    ctx.fillRect(810, 310, 90, 90);
    ctx.fillStyle = r6;
    ctx.fillRect(810, 410, 90, 90);
    ctx.fillStyle = r9;
    ctx.fillRect(810, 510, 90, 90);
    ctx.fillStyle = d9;
    ctx.fillRect(510, 810, 90, 90);
    ctx.fillStyle = d8;
    ctx.fillRect(410, 810, 90, 90);
    ctx.fillStyle = d7;
    ctx.fillRect(310, 810, 90, 90);
    ctx.fillStyle = l1;
    ctx.fillRect(10, 310, 90, 90);
    ctx.fillStyle = l4;
    ctx.fillRect(10, 410, 90, 90);
    ctx.fillStyle = l7;
    ctx.fillRect(10, 510, 90, 90);
    ctx.fillStyle = b1;
    ctx.fillRect(910, 310, 90, 90);
    ctx.fillStyle = b2;
    ctx.fillRect(1010, 310, 90, 90);
    ctx.fillStyle = b3;
    ctx.fillRect(1110, 310, 90, 90);
    ctx.fillStyle = b4;
    ctx.fillRect(910, 410, 90, 90);
    ctx.fillStyle = b6;
    ctx.fillRect(1110, 410, 90, 90);
    ctx.fillStyle = b7;
    ctx.fillRect(910, 510, 90, 90);
    ctx.fillStyle = b8;
    ctx.fillRect(1010, 510, 90, 90);
    ctx.fillStyle = b9;
    ctx.fillRect(1110, 510, 90, 90);
}
function u() {
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

    ctx.fillStyle = l1;
    ctx.fillRect(10, 310, 90, 90);
    ctx.fillStyle = l2;
    ctx.fillRect(110, 310, 90, 90);
    ctx.fillStyle = l3;
    ctx.fillRect(210, 310, 90, 90);
    ctx.fillStyle = f1;
    ctx.fillRect(310, 310, 90, 90);
    ctx.fillStyle = f2;
    ctx.fillRect(410, 310, 90, 90);
    ctx.fillStyle = f3;
    ctx.fillRect(510, 310, 90, 90);
    ctx.fillStyle = r1;
    ctx.fillRect(610, 310, 90, 90);
    ctx.fillStyle = r2;
    ctx.fillRect(710, 310, 90, 90);
    ctx.fillStyle = r3;
    ctx.fillRect(810, 310, 90, 90);
    ctx.fillStyle = b1;
    ctx.fillRect(910, 310, 90, 90);
    ctx.fillStyle = b2;
    ctx.fillRect(1010, 310, 90, 90);
    ctx.fillStyle = b3;
    ctx.fillRect(1110, 310, 90, 90);
    ctx.fillStyle = u1;
    ctx.fillRect(310, 10, 90, 90);
    ctx.fillStyle = u2;
    ctx.fillRect(410, 10, 90, 90);
    ctx.fillStyle = u3;
    ctx.fillRect(510, 10, 90, 90);
    ctx.fillStyle = u4;
    ctx.fillRect(310, 110, 90, 90);
    ctx.fillStyle = u6;
    ctx.fillRect(510, 110, 90, 90);
    ctx.fillStyle = u7;
    ctx.fillRect(310, 210, 90, 90);
    ctx.fillStyle = u8;
    ctx.fillRect(410, 210, 90, 90);
    ctx.fillStyle = u9;
    ctx.fillRect(510, 210, 90, 90);
}
function d() {
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

    ctx.fillStyle = l7;
    ctx.fillRect(10, 510, 90, 90);
    ctx.fillStyle = l8;
    ctx.fillRect(110, 510, 90, 90);
    ctx.fillStyle = l9;
    ctx.fillRect(210, 510, 90, 90);
    ctx.fillStyle = f7;
    ctx.fillRect(310, 510, 90, 90);
    ctx.fillStyle = f8;
    ctx.fillRect(410, 510, 90, 90);
    ctx.fillStyle = f9;
    ctx.fillRect(510, 510, 90, 90);
    ctx.fillStyle = r7;
    ctx.fillRect(610, 510, 90, 90);
    ctx.fillStyle = r8;
    ctx.fillRect(710, 510, 90, 90);
    ctx.fillStyle = r9;
    ctx.fillRect(810, 510, 90, 90);
    ctx.fillStyle = b7;
    ctx.fillRect(910, 510, 90, 90);
    ctx.fillStyle = b8;
    ctx.fillRect(1010, 510, 90, 90);
    ctx.fillStyle = b9;
    ctx.fillRect(1110, 510, 90, 90);
    ctx.fillStyle = d1;
    ctx.fillRect(310, 610, 90, 90);
    ctx.fillStyle = d2;
    ctx.fillRect(410, 610, 90, 90);
    ctx.fillStyle = d3;
    ctx.fillRect(510, 610, 90, 90);
    ctx.fillStyle = d4;
    ctx.fillRect(310, 710, 90, 90);
    ctx.fillStyle = d6;
    ctx.fillRect(510, 710, 90, 90);
    ctx.fillStyle = d7;
    ctx.fillRect(310, 810, 90, 90);
    ctx.fillStyle = d8;
    ctx.fillRect(410, 810, 90, 90);
    ctx.fillStyle = d9;
    ctx.fillRect(510, 810, 90, 90);
}

document.onload = function () {
    drawScramble();
}