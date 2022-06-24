let scene, camera, renderer;

let cubies = [];
let planes = [];

let cube, planeCube;

let origo;
let xAxis, yAxis, zAxis;

let anim;

/* let u1 = "ubl", u2 = "ub", u3 = "ubr", u4 = "ul", u5 = "u", u6 = "ur", u7 = "ufl", u8 = "uf", u9 = "ufr", nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8, nu9;
let l1 = "lub", l2 = "lu", l3 = "luf", l4 = "lb", l5 = "l", l6 = "lf", l7 = "ldb", l8 = "ld", l9 = "ldf", nl1, nl2, nl3, nl4, nl5, nl6, nl7, nl8, nl9;
let f1 = "ful", f2 = "fu", f3 = "fur", f4 = "fl", f5 = "f", f6 = "fr", f7 = "fdl", f8 = "fd", f9 = "fdr", nf1, nf2, nf3, nf4, nf5, nf6, nf7, nf8, nf9;
let r1 = "ruf", r2 = "ru", r3 = "rub", r4 = "rf", r5 = "r", r6 = "rb", r7 = "rdf", r8 = "rd", r9 = "rdb", nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8, nr9;
let b1 = "bur", b2 = "bu", b3 = "bul", b4 = "br", b5 = "b", b6 = "bl", b7 = "bdr", b8 = "bd", b9 = "bdl", nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9;
let d1 = "dfl", d2 = "df", d3 = "dfr", d4 = "dl", d5 = "d", d6 = "dr", d7 = "dbl", d8 = "db", d9 = "dbr", nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9; */

let keyBinds = ["J", "F", "H", "G", "I", "K", "D", "E", "S", "L", "W", "O", ",", ".", "N", "B", "Ø", "A", "Å", "Q", "U", "M", "V", "R"];
let possibleMoves = ["U", "U'", "F", "F'", "R", "R'", "L", "L'", "D", "D'", "B", "B'", "M", "M'", "x", "x'", "y", "y'", "z", "z'", "Rw", "Rw'", "Lw", "Lw'"];;

$(() => {
    $(window).keypress(function(e) {
        if (e.keyCode === 32) {
            applyScramble();
        }
        else {
            getTurn(e.keyCode);
        }
    });
    init();
});

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    cube = new THREE.Object3D();
    planeCube = new THREE.Object3D();
    
    let planeSize = 0.9;
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let planeGeometry = new THREE.PlaneGeometry( planeSize, planeSize );

    let colWhite = 0xffffff;
    let colYellow = 0xffff00;
    let colGreen = 0x00ff00;
    let colBlue = 0x0000ff;
    let colRed = 0xff0000;
    let colOrange = 0xffaa00;
    
    let white = new THREE.MeshBasicMaterial( { color: colWhite });
    let yellow = new THREE.MeshBasicMaterial( { color: colYellow } );
    let green = new THREE.MeshBasicMaterial( { color: colGreen } );
    let blue = new THREE.MeshBasicMaterial( { color: colBlue } );
    let red = new THREE.MeshBasicMaterial( { color: colRed } );
    let orange = new THREE.MeshBasicMaterial( { color: colOrange } );
    
    let materials = [
        red,
        orange,
        white,
        yellow,
        green,
        blue
    ];

    for (let z = -1; z < 2; z++) {
        for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
                if (!(x === 0 && y === 0 && z === 0)) {
                    let c = new THREE.Mesh(geometry, materials);
                    c.position.set(x * 1.01, y * 1.01, z * 1.01);
        
                    let edges = new THREE.LineSegments(
                        new THREE.EdgesGeometry( c.geometry ),
                        new THREE.LineBasicMaterial({color: 0x000000, linewidth: 1})
                    );
                    c.add(edges);
                    cubies.push(c);
                    cube.add(c);
                }
            }
        }
    }
    let m1 = 1.01;
    let m2 = 1.5// + planeSize / 2;
    // White
    for (let z = -1; z < 2; z++) {
        for (let x = -1; x < 2; x++) {
            let planeMaterial = new THREE.MeshBasicMaterial( {color: colWhite, side: THREE.DoubleSide} );
            let plane = new THREE.Mesh( planeGeometry, planeMaterial );

            plane.position.set(x * m1, 1*m2 * m1, z * m1);
            plane.rotateX(-Math.PI / 2);
            planeCube.add(plane);
            cubies.push(plane);
        }
    }
    // Yellow
    for (let z = -1; z < 2; z++) {
        for (let x = -1; x < 2; x++) {
            let planeMaterial = new THREE.MeshBasicMaterial( {color: colYellow, side: THREE.DoubleSide} );
            let plane = new THREE.Mesh( planeGeometry, planeMaterial );

            plane.position.set(x * m1, -1*m2 * m1, z * m1);
            plane.rotateX(Math.PI / 2);
            planeCube.add(plane);
            cubies.push(plane);
        }
    }
    // Green
    for (let y = -1; y < 2; y++) {
        for (let x = -1; x < 2; x++) {
            let planeMaterial = new THREE.MeshBasicMaterial( {color: colGreen, side: THREE.DoubleSide} );
            let plane = new THREE.Mesh( planeGeometry, planeMaterial );

            plane.position.set(x * m1, y * m1, 1*m2 * m1);
            planeCube.add(plane);
            cubies.push(plane);
        }
    }
    // Blue
    for (let y = -1; y < 2; y++) {
        for (let x = -1; x < 2; x++) {
            let planeMaterial = new THREE.MeshBasicMaterial( {color: colBlue, side: THREE.DoubleSide} );
            let plane = new THREE.Mesh( planeGeometry, planeMaterial );

            plane.position.set(x * m1, y * m1, -1*m2 * m1);
            planeCube.add(plane);
            cubies.push(plane);
        }
    }
    // Orange
    for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
            let planeMaterial = new THREE.MeshBasicMaterial( {color: colOrange, side: THREE.DoubleSide} );
            let plane = new THREE.Mesh( planeGeometry, planeMaterial );

            plane.position.set(-1*m2 * m1, y * m1, z * m1);
            plane.rotateY(-Math.PI / 2);
            planeCube.add(plane);
            cubies.push(plane);
        }
    }
    // Red
    for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
            let planeMaterial = new THREE.MeshBasicMaterial( {color: colRed, side: THREE.DoubleSide} );
            let plane = new THREE.Mesh( planeGeometry, planeMaterial );

            plane.position.set(1*m2 * m1, y * m1, z * m1);
            plane.rotateY(-Math.PI / 2);
            planeCube.add(plane);
            cubies.push(plane);
        }
    }

    //scene.add(cube);
    scene.add(planeCube);
    
    // Cubes for axises
    /* let redcube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), red);
    redcube.position.set(3, 0, 0);
    scene.add(redcube);

    let greencube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), white);
    greencube.position.set(0, 3, 0);
    scene.add(greencube);

    let bluecube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), green);
    bluecube.position.set(0, 0, 3);
    scene.add(bluecube); */
    
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 5;
    
    camera.rotateX(-Math.PI / 4);
    
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    $("body").append( renderer.domElement );

    origo = new THREE.Vector3(0, 0, 0);
    xAxis = new THREE.Vector3(1, 0, 0);
    yAxis = new THREE.Vector3(0, 1, 0);
    zAxis = new THREE.Vector3(0, 0, 1);
    
    anim = true;
    animate();
}

function animate() {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

function applyScramble() {
    anim = false;
    let scr = getScrambleNxN(3);
    for (let s of scr.split(" ")) {
        applyMove(s);
    }
    anim = true;
}

function getTurn(e) {
    const key = keyBinds.indexOf(String.fromCharCode(e).toUpperCase());
    const turn = possibleMoves[key];
    if (turn) {
        applyMove(turn);
    }
}

function applyMove(turn) {
    switch (turn) {
        case "R":
            doR();
            break;
        case "R'":
            doRi();
            break;
        case "L":
            doL();
            break;
        case "L'":
            doLi();
            break;
        case "F":
            doF();
            break;
        case "F'":
            doFi();
            break;
        case "B":
            doB();
            break;
        case "B'":
            doBi();
            break;
        case "U":
            doU();
            break;
        case "U'":
            doUi();
            break;
        case "D":
            doD();
            break;
        case "D'":
            doDi();
            break;
        case "x":
            doX();
            break;
        case "x'":
            doXi();
            break;
        case "y":
            doY();
            break;
        case "y'":
            doYi();
            break;
        case "z":
            doZ();
            break;
        case "z'":
            doZi();
            break;
        case "M":
            doM();
            break;
        case "M'":
            doMi();
            break;
        case "Rw":
            doRw();
            break;
        case "Rw'":
            doRwi();
            break;
        case "Lw":
            doLw();
            break;
        case "Lw'":
            doLwi();
            break;
    }
}

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
function rotateAroundPoint(obj, point, axis, theta, pointIsWorld = true){
    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

    if (pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if (pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

function calcRotationAroundAxis( obj3D, axis, angle ){

    let euler;

    if ( axis === "x" ){
        euler = new THREE.Euler( angle, 0, 0, 'XYZ' );      
    }

    if ( axis === "y" ){
        euler = new THREE.Euler( 0, angle, 0, 'XYZ' );              
    }

    if ( axis === "z" ){
        euler = new THREE.Euler( 0, 0, angle, 'XYZ' );      
    }
    obj3D.position.applyEuler( euler );
}

function doMove(cubie, xyz, angle) {
    let axis = xyz === "x" ? xAxis : xyz === "y" ? yAxis : zAxis;

    /* if (anim) {
        let steps = 1000;
        let a = angle / steps;

        for (let i = 0; i < steps; i++) {
            calcRotationAroundAxis(cubie, xyz, a);
            cubie.rotateOnWorldAxis(axis, a);
        }
    }
    else { */
        calcRotationAroundAxis(cubie, xyz, angle);
        cubie.rotateOnWorldAxis(axis, angle);
    //}
}

function doR() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1})) {
        doMove(c, "x", -Math.PI / 2);
    }
}

function doRi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1})) {
        doMove(c, "x", Math.PI / 2);
    }
}

function doL() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1})) {
        doMove(c, "x", Math.PI / 2);
    }
}

function doLi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1})) {
        doMove(c, "x", -Math.PI / 2);
    }
}

function doU() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1})) {
        doMove(c, "y", -Math.PI / 2);
    }
}

function doUi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1})) {
        doMove(c, "y", Math.PI / 2);
    }
}

function doD() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1})) {
        doMove(c, "y", Math.PI / 2);
    }
}

function doDi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1})) {
        doMove(c, "y", -Math.PI / 2);
    }
}

function doF() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1})) {
        doMove(c, "z", -Math.PI / 2);
    }
}

function doFi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1})) {
        doMove(c, "z", Math.PI / 2);
    }
}

function doB() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1})) {
        doMove(c, "z", Math.PI / 2);
    }
}

function doBi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1})) {
        doMove(c, "z", -Math.PI / 2);
    }
}

function doX() {
    for (let c of cubies) {
        doMove(c, "x", -Math.PI / 2);
    }
}

function doXi() {
    for (let c of cubies) {
        doMove(c, "x", Math.PI / 2);
    }
}

function doY() {
    for (let c of cubies) {
        doMove(c, "y", -Math.PI / 2);
    }
}

function doYi() {
    for (let c of cubies) {
        doMove(c, "y", Math.PI / 2);
    }
}

function doZ() {
    for (let c of cubies) {
        doMove(c, "z", -Math.PI / 2);
    }
}

function doZi() {
    for (let c of cubies) {
        doMove(c, "z", Math.PI / 2);
    }
}

function doM() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1})) {
        doMove(c, "x", Math.PI / 2);
    }
}

function doMi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1})) {
        doMove(c, "x", -Math.PI / 2);
    }
}

function doRw() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1})) {
        doMove(c, "x", -Math.PI / 2);
    }
}

function doRwi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1})) {
        doMove(c, "x", Math.PI / 2);
    }
}

function doLw() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1})) {
        doMove(c, "x", Math.PI / 2);
    }
}

function doLwi() {
    for (let c of cubies.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1})) {
        doMove(c, "x", -Math.PI / 2);
    }
}