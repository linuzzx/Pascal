let scene, camera, renderer;
let cubies = [];

let origo;
let xAxis, yAxis, zAxis;

let u1 = "ubl", u2 = "ub", u3 = "ubr", u4 = "ul", u5 = "u", u6 = "ur", u7 = "ufl", u8 = "uf", u9 = "ufr", nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8, nu9;
let l1 = "lub", l2 = "lu", l3 = "luf", l4 = "lb", l5 = "l", l6 = "lf", l7 = "ldb", l8 = "ld", l9 = "ldf", nl1, nl2, nl3, nl4, nl5, nl6, nl7, nl8, nl9;
let f1 = "ful", f2 = "fu", f3 = "fur", f4 = "fl", f5 = "f", f6 = "fr", f7 = "fdl", f8 = "fd", f9 = "fdr", nf1, nf2, nf3, nf4, nf5, nf6, nf7, nf8, nf9;
let r1 = "ruf", r2 = "ru", r3 = "rub", r4 = "rf", r5 = "r", r6 = "rb", r7 = "rdf", r8 = "rd", r9 = "rdb", nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8, nr9;
let b1 = "bur", b2 = "bu", b3 = "bul", b4 = "br", b5 = "b", b6 = "bl", b7 = "bdr", b8 = "bd", b9 = "bdl", nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9;
let d1 = "dfl", d2 = "df", d3 = "dfr", d4 = "dl", d5 = "d", d6 = "dr", d7 = "dbl", d8 = "db", d9 = "dbr", nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9;

let keyBinds = ["J", "F", "H", "G", "I", "K", "D", "E", "S", "L", "W", "O", ",", ".", "N", "B", "Ø", "A", "Å", "Q", "U", "M", "V", "R"];
let possibleMoves = ["U", "U'", "F", "F'", "R", "R'", "L", "L'", "D", "D'", "B", "B'", "M", "M'", "x", "x'", "y", "y'", "z", "z'", "Rw", "Rw'", "Lw", "Lw'"];;

$(() => {
    $(window).keypress(function(e) {
        getTurn(e.keyCode);
    });
    init();
});

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    
    let white = new THREE.MeshBasicMaterial( { color: 0xffffff });
    let yellow = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let blue = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    let red = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let orange = new THREE.MeshBasicMaterial( { color: 0xff6600 } );
    
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
                let c = new THREE.Mesh(geometry, materials);
                c.position.set(x * 1.01, y * 1.01, z * 1.01);
    
                let edges = new THREE.LineSegments(
                    new THREE.EdgesGeometry( c.geometry ),
                    new THREE.LineBasicMaterial({color: 0x000000, linewidth: 1})
                );
                c.add(edges);
                cubies.push(c);
                scene.add(c);
            }
        }
    }
    ////
    let redcube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), red);
    redcube.position.set(3, 0, 0);
    scene.add(redcube);

    let greencube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), white);
    greencube.position.set(0, 3, 0);
    scene.add(greencube);

    let bluecube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), green);
    bluecube.position.set(0, 0, 3);
    scene.add(bluecube);
    ////
    
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 5;
    
    camera.rotateX(-Math.PI / 4);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    $("body").append( renderer.domElement );

    origo = new THREE.Vector3(0, 0, 0);
    xAxis = new THREE.Vector3(1, 0, 0);
    yAxis = new THREE.Vector3(0, 1, 0);
    zAxis = new THREE.Vector3(0, 0, 1);
    
    animate();
}

function animate() {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

function getTurn(e) {
    const key = keyBinds.indexOf(String.fromCharCode(e).toUpperCase());
    const turn = possibleMoves[key];
    if (turn) {
        applyMoves(turn);
    }
}

function applyMoves(turn) {
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
function rotateAroundPoint(obj, point, axis, theta, pointIsWorld){
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

function doR() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).x > 1) {
            rotateAroundPoint(c, origo, xAxis, -Math.PI / 2, true);
        }
    }
}

function doRi() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).x > 1) {
            rotateAroundPoint(c, origo, xAxis, Math.PI / 2, true);
        }
    }
}

function doL() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).x < -1) {
            rotateAroundPoint(c, origo, xAxis, Math.PI / 2, true);
        }
    }
}

function doLi() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).x < -1) {
            rotateAroundPoint(c, origo, xAxis, -Math.PI / 2, true);
        }
    }
}

function doU() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).y > 1) {
            rotateAroundPoint(c, origo, yAxis, -Math.PI / 2, true);
        }
    }
}

function doUi() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).y > 1) {
            rotateAroundPoint(c, origo, yAxis, Math.PI / 2, true);
        }
    }
}

function doD() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).y < -1) {
            rotateAroundPoint(c, origo, yAxis, Math.PI / 2, true);
        }
    }
}

function doDi() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).y < -1) {
            rotateAroundPoint(c, origo, yAxis, -Math.PI / 2, true);
        }
    }
}

function doF() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).z > 1) {
            rotateAroundPoint(c, origo, zAxis, -Math.PI / 2, true);
        }
    }
}

function doFi() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).z > 1) {
            rotateAroundPoint(c, origo, zAxis, Math.PI / 2, true);
        }
    }
}

function doB() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).z < -1) {
            rotateAroundPoint(c, origo, zAxis, Math.PI / 2, true);
        }
    }
}

function doBi() {
    for (let c of cubies) {
        if (c.getWorldPosition(new THREE.Vector3()).z < -1) {
            rotateAroundPoint(c, origo, zAxis, -Math.PI / 2, true);
        }
    }
}

function doX() {
    for (let c of cubies) {
        rotateAroundPoint(c, origo, xAxis, -Math.PI / 2, true);
    }
}

function doXi() {
    for (let c of cubies) {
        rotateAroundPoint(c, origo, xAxis, Math.PI / 2, true);
    }
}

function doY() {
    for (let c of cubies) {
        rotateAroundPoint(c, origo, yAxis, -Math.PI / 2, true);
    }
}

function doYi() {
    for (let c of cubies) {
        rotateAroundPoint(c, origo, yAxis, Math.PI / 2, true);
    }
}

function doZ() {
    for (let c of cubies) {
        rotateAroundPoint(c, origo, zAxis, -Math.PI / 2, true);
    }
}

function doZi() {
    for (let c of cubies) {
        rotateAroundPoint(c, origo, zAxis, Math.PI / 2, true);
    }
}