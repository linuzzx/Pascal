var valgtFarge = "";
var solved = false;
var solvedCorners = false;

var r1 = "red", r2 = "red", r3 = "red", r4 = "red", r5 = "red", r6 = "red", r7 = "red", r8 = "red", r9 = "red", nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8, nr9;
var l1 = "orange", l2 = "orange", l3 = "orange", l4 = "orange", l5 = "orange", l6 = "orange", l7 = "orange", l8 = "orange", l9 = "orange", nl1, nl2, nl3, nl4, nl5, nl6, nl7, nl8, nl9;
var f1 = "green", f2 = "green", f3 = "green", f4 = "green", f5 = "green", f6 = "green", f7 = "green", f8 = "green", f9 = "green", nf1, nf2, nf3, nf4, nf5, nf6, nf7, nf8, nf9;
var b1 = "blue", b2 = "blue", b3 = "blue", b4 = "blue", b5 = "blue", b6 = "blue", b7 = "blue", b8 = "blue", b9 = "blue", nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9;
var u1 = "white", u2 = "white", u3 = "white", u4 = "white", u5 = "white", u6 = "white", u7 = "white", u8 = "white", u9 = "white", nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8, nu9;
var d1 = "yellow", d2 = "yellow", d3 = "yellow", d4 = "yellow", d5 = "yellow", d6 = "yellow", d7 = "yellow", d8 = "yellow", d9 = "yellow", nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9;

function tegnKube() {
    var ct1;
    var ct2;
    var ct3;
    var ct4;
    var ct5;
    var ct6;
    var ct7;
    var ct8;
    var ct9;
    var ctx1;
    var ctx2;
    var ctx3;
    var ctx4;
    var ctx5;
    var ctx6;
    var ctx7;
    var ctx8;
    var ctx9;
    // Tom
    {
        ct1 = document.getElementById("tom1");
        ct2 = document.getElementById("tom2");
        ct3 = document.getElementById("tom3");
        ct4 = document.getElementById("tom4");
        ct5 = document.getElementById("tom5");
        ct6 = document.getElementById("tom6");
        ctxt1 = ct1.getContext("2d");
        ctxt2 = ct2.getContext("2d");
        ctxt3 = ct3.getContext("2d");
        ctxt4 = ct4.getContext("2d");
        ctxt5 = ct5.getContext("2d");
        ctxt6 = ct6.getContext("2d");
        ctxt1.fillStyle = "#3C3F41";
        ctxt2.fillStyle = "#3C3F41";
        ctxt3.fillStyle = "#3C3F41";
        ctxt4.fillStyle = "#3C3F41";
        ctxt5.fillStyle = "#3C3F41";
        ctxt6.fillStyle = "#3C3F41";
        ctxt1.fillRect(0, 0, 170, 170);
        ctxt2.fillRect(0, 0, 170, 170);
        ctxt3.fillRect(0, 0, 170, 170);
        ctxt4.fillRect(0, 0, 170, 170);
        ctxt5.fillRect(0, 0, 170, 170);
        ctxt6.fillRect(0, 0, 170, 170);}
    // Up
    {
        c1 = document.getElementById("up1");
        c2 = document.getElementById("up2");
        c3 = document.getElementById("up3");
        c4 = document.getElementById("up4");
        c5 = document.getElementById("up5");
        c6 = document.getElementById("up6");
        c7 = document.getElementById("up7");
        c8 = document.getElementById("up8");
        c9 = document.getElementById("up9");
        ctx1 = c1.getContext("2d");
        ctx2 = c2.getContext("2d");
        ctx3 = c3.getContext("2d");
        ctx4 = c4.getContext("2d");
        ctx5 = c5.getContext("2d");
        ctx6 = c6.getContext("2d");
        ctx7 = c7.getContext("2d");
        ctx8 = c8.getContext("2d");
        ctx9 = c9.getContext("2d");
        ctx1.fillStyle = "white";
        ctx2.fillStyle = "white";
        ctx3.fillStyle = "white";
        ctx4.fillStyle = "white";
        ctx5.fillStyle = "white";
        ctx6.fillStyle = "white";
        ctx7.fillStyle = "white";
        ctx8.fillStyle = "white";
        ctx9.fillStyle = "white";
        ctx1.fillRect(0, 0, 50, 50);
        ctx2.fillRect(0, 0, 50, 50);
        ctx3.fillRect(0, 0, 50, 50);
        ctx4.fillRect(0, 0, 50, 50);
        ctx5.fillRect(0, 0, 50, 50);
        ctx6.fillRect(0, 0, 50, 50);
        ctx7.fillRect(0, 0, 50, 50);
        ctx8.fillRect(0, 0, 50, 50);
        ctx9.fillRect(0, 0, 50, 50);}
    // Left
    {
        c1 = document.getElementById("left1");
        c2 = document.getElementById("left2");
        c3 = document.getElementById("left3");
        c4 = document.getElementById("left4");
        c5 = document.getElementById("left5");
        c6 = document.getElementById("left6");
        c7 = document.getElementById("left7");
        c8 = document.getElementById("left8");
        c9 = document.getElementById("left9");
        ctx1 = c1.getContext("2d");
        ctx2 = c2.getContext("2d");
        ctx3 = c3.getContext("2d");
        ctx4 = c4.getContext("2d");
        ctx5 = c5.getContext("2d");
        ctx6 = c6.getContext("2d");
        ctx7 = c7.getContext("2d");
        ctx8 = c8.getContext("2d");
        ctx9 = c9.getContext("2d");
        ctx1.fillStyle = "orange";
        ctx2.fillStyle = "orange";
        ctx3.fillStyle = "orange";
        ctx4.fillStyle = "orange";
        ctx5.fillStyle = "orange";
        ctx6.fillStyle = "orange";
        ctx7.fillStyle = "orange";
        ctx8.fillStyle = "orange";
        ctx9.fillStyle = "orange";
        ctx1.fillRect(0, 0, 50, 50);
        ctx2.fillRect(0, 0, 50, 50);
        ctx3.fillRect(0, 0, 50, 50);
        ctx4.fillRect(0, 0, 50, 50);
        ctx5.fillRect(0, 0, 50, 50);
        ctx6.fillRect(0, 0, 50, 50);
        ctx7.fillRect(0, 0, 50, 50);
        ctx8.fillRect(0, 0, 50, 50);
        ctx9.fillRect(0, 0, 50, 50);}
    // Front
    {
        c1 = document.getElementById("front1");
        c2 = document.getElementById("front2");
        c3 = document.getElementById("front3");
        c4 = document.getElementById("front4");
        c5 = document.getElementById("front5");
        c6 = document.getElementById("front6");
        c7 = document.getElementById("front7");
        c8 = document.getElementById("front8");
        c9 = document.getElementById("front9");
        ctx1 = c1.getContext("2d");
        ctx2 = c2.getContext("2d");
        ctx3 = c3.getContext("2d");
        ctx4 = c4.getContext("2d");
        ctx5 = c5.getContext("2d");
        ctx6 = c6.getContext("2d");
        ctx7 = c7.getContext("2d");
        ctx8 = c8.getContext("2d");
        ctx9 = c9.getContext("2d");
        ctx1.fillStyle = "green";
        ctx2.fillStyle = "green";
        ctx3.fillStyle = "green";
        ctx4.fillStyle = "green";
        ctx5.fillStyle = "green";
        ctx6.fillStyle = "green";
        ctx7.fillStyle = "green";
        ctx8.fillStyle = "green";
        ctx9.fillStyle = "green";
        ctx1.fillRect(0, 0, 50, 50);
        ctx2.fillRect(0, 0, 50, 50);
        ctx3.fillRect(0, 0, 50, 50);
        ctx4.fillRect(0, 0, 50, 50);
        ctx5.fillRect(0, 0, 50, 50);
        ctx6.fillRect(0, 0, 50, 50);
        ctx7.fillRect(0, 0, 50, 50);
        ctx8.fillRect(0, 0, 50, 50);
        ctx9.fillRect(0, 0, 50, 50);}
    // Right
    {
        c1 = document.getElementById("right1");
        c2 = document.getElementById("right2");
        c3 = document.getElementById("right3");
        c4 = document.getElementById("right4");
        c5 = document.getElementById("right5");
        c6 = document.getElementById("right6");
        c7 = document.getElementById("right7");
        c8 = document.getElementById("right8");
        c9 = document.getElementById("right9");
        ctx1 = c1.getContext("2d");
        ctx2 = c2.getContext("2d");
        ctx3 = c3.getContext("2d");
        ctx4 = c4.getContext("2d");
        ctx5 = c5.getContext("2d");
        ctx6 = c6.getContext("2d");
        ctx7 = c7.getContext("2d");
        ctx8 = c8.getContext("2d");
        ctx9 = c9.getContext("2d");
        ctx1.fillStyle = "red";
        ctx2.fillStyle = "red";
        ctx3.fillStyle = "red";
        ctx4.fillStyle = "red";
        ctx5.fillStyle = "red";
        ctx6.fillStyle = "red";
        ctx7.fillStyle = "red";
        ctx8.fillStyle = "red";
        ctx9.fillStyle = "red";
        ctx1.fillRect(0, 0, 50, 50);
        ctx2.fillRect(0, 0, 50, 50);
        ctx3.fillRect(0, 0, 50, 50);
        ctx4.fillRect(0, 0, 50, 50);
        ctx5.fillRect(0, 0, 50, 50);
        ctx6.fillRect(0, 0, 50, 50);
        ctx7.fillRect(0, 0, 50, 50);
        ctx8.fillRect(0, 0, 50, 50);
        ctx9.fillRect(0, 0, 50, 50);}
    // Back
    {
        c1 = document.getElementById("back1");
        c2 = document.getElementById("back2");
        c3 = document.getElementById("back3");
        c4 = document.getElementById("back4");
        c5 = document.getElementById("back5");
        c6 = document.getElementById("back6");
        c7 = document.getElementById("back7");
        c8 = document.getElementById("back8");
        c9 = document.getElementById("back9");
        ctx1 = c1.getContext("2d");
        ctx2 = c2.getContext("2d");
        ctx3 = c3.getContext("2d");
        ctx4 = c4.getContext("2d");
        ctx5 = c5.getContext("2d");
        ctx6 = c6.getContext("2d");
        ctx7 = c7.getContext("2d");
        ctx8 = c8.getContext("2d");
        ctx9 = c9.getContext("2d");
        ctx1.fillStyle = "blue";
        ctx2.fillStyle = "blue";
        ctx3.fillStyle = "blue";
        ctx4.fillStyle = "blue";
        ctx5.fillStyle = "blue";
        ctx6.fillStyle = "blue";
        ctx7.fillStyle = "blue";
        ctx8.fillStyle = "blue";
        ctx9.fillStyle = "blue";
        ctx1.fillRect(0, 0, 50, 50);
        ctx2.fillRect(0, 0, 50, 50);
        ctx3.fillRect(0, 0, 50, 50);
        ctx4.fillRect(0, 0, 50, 50);
        ctx5.fillRect(0, 0, 50, 50);
        ctx6.fillRect(0, 0, 50, 50);
        ctx7.fillRect(0, 0, 50, 50);
        ctx8.fillRect(0, 0, 50, 50);
        ctx9.fillRect(0, 0, 50, 50);}
    // Down
    {
        c1 = document.getElementById("down1");
        c2 = document.getElementById("down2");
        c3 = document.getElementById("down3");
        c4 = document.getElementById("down4");
        c5 = document.getElementById("down5");
        c6 = document.getElementById("down6");
        c7 = document.getElementById("down7");
        c8 = document.getElementById("down8");
        c9 = document.getElementById("down9");
        ctx1 = c1.getContext("2d");
        ctx2 = c2.getContext("2d");
        ctx3 = c3.getContext("2d");
        ctx4 = c4.getContext("2d");
        ctx5 = c5.getContext("2d");
        ctx6 = c6.getContext("2d");
        ctx7 = c7.getContext("2d");
        ctx8 = c8.getContext("2d");
        ctx9 = c9.getContext("2d");
        ctx1.fillStyle = "yellow";
        ctx2.fillStyle = "yellow";
        ctx3.fillStyle = "yellow";
        ctx4.fillStyle = "yellow";
        ctx5.fillStyle = "yellow";
        ctx6.fillStyle = "yellow";
        ctx7.fillStyle = "yellow";
        ctx8.fillStyle = "yellow";
        ctx9.fillStyle = "yellow";
        ctx1.fillRect(0, 0, 50, 50);
        ctx2.fillRect(0, 0, 50, 50);
        ctx3.fillRect(0, 0, 50, 50);
        ctx4.fillRect(0, 0, 50, 50);
        ctx5.fillRect(0, 0, 50, 50);
        ctx6.fillRect(0, 0, 50, 50);
        ctx7.fillRect(0, 0, 50, 50);
        ctx8.fillRect(0, 0, 50, 50);
        ctx9.fillRect(0, 0, 50, 50);}

    lagreFarger();

}

function lagreFarger() {
    u1 = document.getElementById("up1").getContext("2d").fillStyle;
    u2 = document.getElementById("up2").getContext("2d").fillStyle;
    u3 = document.getElementById("up3").getContext("2d").fillStyle;
    u4 = document.getElementById("up4").getContext("2d").fillStyle;
    u6 = document.getElementById("up6").getContext("2d").fillStyle;
    u7 = document.getElementById("up7").getContext("2d").fillStyle;
    u8 = document.getElementById("up8").getContext("2d").fillStyle;
    u9 = document.getElementById("up9").getContext("2d").fillStyle;

    d1 = document.getElementById("down1").getContext("2d").fillStyle;
    d2 = document.getElementById("down2").getContext("2d").fillStyle;
    d3 = document.getElementById("down3").getContext("2d").fillStyle;
    d4 = document.getElementById("down4").getContext("2d").fillStyle;
    d6 = document.getElementById("down6").getContext("2d").fillStyle;
    d7 = document.getElementById("down7").getContext("2d").fillStyle;
    d8 = document.getElementById("down8").getContext("2d").fillStyle;
    d9 = document.getElementById("down9").getContext("2d").fillStyle;

    l1 = document.getElementById("left1").getContext("2d").fillStyle;
    l2 = document.getElementById("left2").getContext("2d").fillStyle;
    l3 = document.getElementById("left3").getContext("2d").fillStyle;
    l4 = document.getElementById("left4").getContext("2d").fillStyle;
    l6 = document.getElementById("left6").getContext("2d").fillStyle;
    l7 = document.getElementById("left7").getContext("2d").fillStyle;
    l8 = document.getElementById("left8").getContext("2d").fillStyle;
    l9 = document.getElementById("left9").getContext("2d").fillStyle;

    r1 = document.getElementById("right1").getContext("2d").fillStyle;
    r2 = document.getElementById("right2").getContext("2d").fillStyle;
    r3 = document.getElementById("right3").getContext("2d").fillStyle;
    r4 = document.getElementById("right4").getContext("2d").fillStyle;
    r6 = document.getElementById("right6").getContext("2d").fillStyle;
    r7 = document.getElementById("right7").getContext("2d").fillStyle;
    r8 = document.getElementById("right8").getContext("2d").fillStyle;
    r9 = document.getElementById("right9").getContext("2d").fillStyle;

    f1 = document.getElementById("front1").getContext("2d").fillStyle;
    f2 = document.getElementById("front2").getContext("2d").fillStyle;
    f3 = document.getElementById("front3").getContext("2d").fillStyle;
    f4 = document.getElementById("front4").getContext("2d").fillStyle;
    f6 = document.getElementById("front6").getContext("2d").fillStyle;
    f7 = document.getElementById("front7").getContext("2d").fillStyle;
    f8 = document.getElementById("front8").getContext("2d").fillStyle;
    f9 = document.getElementById("front9").getContext("2d").fillStyle;

    b1 = document.getElementById("back1").getContext("2d").fillStyle;
    b2 = document.getElementById("back2").getContext("2d").fillStyle;
    b3 = document.getElementById("back3").getContext("2d").fillStyle;
    b4 = document.getElementById("back4").getContext("2d").fillStyle;
    b6 = document.getElementById("back6").getContext("2d").fillStyle;
    b7 = document.getElementById("back7").getContext("2d").fillStyle;
    b8 = document.getElementById("back8").getContext("2d").fillStyle;
    b9 = document.getElementById("back9").getContext("2d").fillStyle;
}

function tegnCanvas() {
    var cw = document.getElementById("white");
    var ctxw = cw.getContext("2d");
    ctxw.fillStyle = "white";
    ctxw.fillRect(0, 0, 100, 100);

    var cy = document.getElementById("yellow");
    var ctxy = cy.getContext("2d");
    ctxy.fillStyle = "yellow";
    ctxy.fillRect(0, 0, 100, 100);

    var cg = document.getElementById("green");
    var ctxg = cg.getContext("2d");
    ctxg.fillStyle = "green";
    ctxg.fillRect(0, 0, 100, 100);

    var cb = document.getElementById("blue");
    var ctxb = cb.getContext("2d");
    ctxb.fillStyle = "blue";
    ctxb.fillRect(0, 0, 100, 100);

    var cr = document.getElementById("red");
    var ctxr = cr.getContext("2d");
    ctxr.fillStyle = "red";
    ctxr.fillRect(0, 0, 100, 100);

    var co = document.getElementById("orange");
    var ctxo = co.getContext("2d");
    ctxo.fillStyle = "orange";
    ctxo.fillRect(0, 0, 100, 100);
}

var white = document.getElementById("white");
var yellow = document.getElementById("yellow");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var red = document.getElementById("red");
var orange = document.getElementById("orange");

function velgW() {
    valgtFarge = "white";

    white.style.opacity = "0.5";
    yellow.style.opacity = "1";
    green.style.opacity = "1";
    blue.style.opacity = "1";
    red.style.opacity = "1";
    orange.style.opacity = "1";
}
function velgY() {
    valgtFarge = "yellow";

    white.style.opacity = "1";
    yellow.style.opacity = "0.5";
    green.style.opacity = "1";
    blue.style.opacity = "1";
    red.style.opacity = "1";
    orange.style.opacity = "1";
}
function velgG() {
    valgtFarge = "green";

    white.style.opacity = "1";
    yellow.style.opacity = "1";
    green.style.opacity = "0.5";
    blue.style.opacity = "1";
    red.style.opacity = "1";
    orange.style.opacity = "1";
}
function velgB() {
    valgtFarge = "blue";

    white.style.opacity = "1";
    yellow.style.opacity = "1";
    green.style.opacity = "1";
    blue.style.opacity = "0.5";
    red.style.opacity = "1";
    orange.style.opacity = "1";
}
function velgR() {
    valgtFarge = "red";

    white.style.opacity = "1";
    yellow.style.opacity = "1";
    green.style.opacity = "1";
    blue.style.opacity = "1";
    red.style.opacity = "0.5";
    orange.style.opacity = "1";
}
function velgO() {
    valgtFarge = "orange";

    white.style.opacity = "1";
    yellow.style.opacity = "1";
    green.style.opacity = "1";
    blue.style.opacity = "1";
    red.style.opacity = "1";
    orange.style.opacity = "0.5";
}

function settFarge(e) {
    var cw = document.getElementById(e);
    var ctxw = cw.getContext("2d");
    ctxw.fillStyle = valgtFarge;
    ctxw.fillRect(0, 0, 50, 50);
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
}


var solutionTxt = document.getElementById("solutionTxt");
let solution = "";
var trekk = "";
var trekkArray = ["R", "L", "F", "B", "U", "D"];
var tilleggArray = ["", "'", "2"];
var trekkListe = ["R", "R2", "R'", "L", "L2", "L'", "U", "U2", "U'", "D", "D2", "D'", "F", "F2", "F'", "B", "B2", "B'"];
var scrambleArray = [];

class Node {
    constructor(data) {
        this.data = data;
        this.l = null;
        this.l2 = null;
        this.li = null;
        this.r = null;
        this.r2 = null;
        this.ri = null;
        this.f = null;
        this.f2 = null;
        this.fi = null;
        this.b = null;
        this.b2 = null;
        this.bi = null;
        this.u = null;
        this.u2 = null;
        this.ui = null;
        this.d = null;
        this.d2 = null;
        this.di = null;
    }
}

var root = new Node("Solution: ");
function lagNode(nd) {
    var node = nd;

    node.l = new Node("L");
    node.l2 = new Node("L2");
    node.li = new Node("L'");
    node.r = new Node("R");
    node.r2 = new Node("R2");
    node.ri = new Node("R'");
    node.f = new Node("F");
    node.f2 = new Node("F2");
    node.fi = new Node("F'");
    node.b = new Node("B");
    node.b2 = new Node("B2");
    node.bi = new Node("B'");
    node.u = new Node("U");
    node.u2 = new Node("U2");
    node.ui = new Node("U'");
    node.d = new Node("D");
    node.d2 = new Node("D2");
    node.di = new Node("D'");
}

function solveCorners() {
    lagreFarger();

    for (var i=0; i<11; i++) {

    }
}

function solve() {
    lagreFarger();
    scrambleArray = [];

    solutionTxt.innerHTML = "Solving...";

    check();
    if (solved === true) {
        solutionTxt.innerHTML = "Solved!";
        return;
    }
    while (solved === false) {

    }
    solutionTxt.innerHTML = solution;
}

function checkCorners() {
    if (r1 === "#ff0000" && r3 === "#ff0000" && r7 === "#ff0000" && r9 === "#ff0000" &&
        l1 === "#ffa500" && l3 === "#ffa500" && l7 === "#ffa500" && l9 === "#ffa500" &&
        f1 === "#008000" && f3 === "#008000" && f7 === "#008000" && f9 === "#008000" &&
        b1 === "#0000ff" && b3 === "#0000ff" && b7 === "#0000ff" && b9 === "#0000ff" &&
        u1 === "#ffffff" && u3 === "#ffffff" && u7 === "#ffffff" && u9 === "#ffffff" &&
        d1 === "#ffff00" && d3 === "#ffff00" && d7 === "#ffff00" && d9 === "#ffff00") {

        solvedCorners = true;
    }
    else {
        solvedCorners = false;
    }
}

function check() {
    if (r1 === "#ff0000" && r2 === "#ff0000" && r3 === "#ff0000" && r4 === "#ff0000" && r6 === "#ff0000" && r7 === "#ff0000" && r8 === "#ff0000" && r9 === "#ff0000" &&
        l1 === "#ffa500" && l2 === "#ffa500" && l3 === "#ffa500" && l4 === "#ffa500" && l6 === "#ffa500" && l7 === "#ffa500" && l8 === "#ffa500" && l9 === "#ffa500" &&
        f1 === "#008000" && f2 === "#008000" && f3 === "#008000" && f4 === "#008000" && f6 === "#008000" && f7 === "#008000" && f8 === "#008000" && f9 === "#008000" &&
        b1 === "#0000ff" && b2 === "#0000ff" && b3 === "#0000ff" && b4 === "#0000ff" && b6 === "#0000ff" && b7 === "#0000ff" && b8 === "#0000ff" && b9 === "#0000ff" &&
        u1 === "#ffffff" && u2 === "#ffffff" && u3 === "#ffffff" && u4 === "#ffffff" && u6 === "#ffffff" && u7 === "#ffffff" && u8 === "#ffffff" && u9 === "#ffffff" &&
        d1 === "#ffff00" && d2 === "#ffff00" && d3 === "#ffff00" && d4 === "#ffff00" && d6 === "#ffff00" && d7 === "#ffff00" && d8 === "#ffff00" && d9 === "#ffff00") {

        solved = true;
    }
    else {
        solved = false;
    }
}

window.onload=function () {
    tegnCanvas();
    tegnKube();
}