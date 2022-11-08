import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
export * as $ from 'https://code.jquery.com/jquery-3.6.0.min.js';

export function initThreeJS() {
    let scriptGsap = document.createElement('script');
    scriptGsap.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js');
    document.head.appendChild(scriptGsap);
}

export class CubePlayer extends HTMLElement {
    connectedCallback() {
        initThreeJS();
        let scramble = this.getAttribute("scramble") || "";
        let solution = this.getAttribute("solution") || "";
        let time = this.getAttribute("time") || "";

        this.innerHTML = "<button id='btnPlay'>Play</button><br><div id='cubePlayer'></div>";

        let url = "Kubing/CubeAnalyser/?";
        const cubeTypes = ["3x3", "2x2", "4x4", "Square-1"]; //["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "Clock", "Megaminx","Pyraminx", "Skewb", "Square-1"];
        let setupArray = [];
        let movesArray = [];
        let planes = [];
        let scene, camera, renderer;
        let anim = false;
        let stdTime = 0.15;
        let playMoveTime;
        let tween;
        let planeCube;
        let origo, xAxis, yAxis, zAxis;

        // updateArrays();
        // updateTPS();
        init();
        adjustSize();

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 1000 );
        
            // cube = new THREE.Object3D();
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
                            //cubies.push(c);
                            //cube.add(c);
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
                    planes.push(plane);
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
                    planes.push(plane);
                }
            }
            // Green
            for (let y = -1; y < 2; y++) {
                for (let x = -1; x < 2; x++) {
                    let planeMaterial = new THREE.MeshBasicMaterial( {color: colGreen, side: THREE.DoubleSide} );
                    let plane = new THREE.Mesh( planeGeometry, planeMaterial );
        
                    plane.position.set(x * m1, y * m1, 1*m2 * m1);
                    planeCube.add(plane);
                    planes.push(plane);
                }
            }
            // Blue
            for (let y = -1; y < 2; y++) {
                for (let x = -1; x < 2; x++) {
                    let planeMaterial = new THREE.MeshBasicMaterial( {color: colBlue, side: THREE.DoubleSide} );
                    let plane = new THREE.Mesh( planeGeometry, planeMaterial );
        
                    plane.position.set(x * m1, y * m1, -1*m2 * m1);
                    planeCube.add(plane);
                    planes.push(plane);
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
                    planes.push(plane);
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
                    planes.push(plane);
                }
            }
        
            scene.add(planeCube);
            
            camera.position.x = 0;
            camera.position.y = 5;
            camera.position.z = 5;
            
            camera.rotateX(-Math.PI / 4);
            
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setClearColor( 0x000000, 0 );
            renderer.setSize($("#cubePlayer").parent().width(), $("#cubePlayer").parent().width());
            $("#cubePlayer").append( renderer.domElement );
        
            origo = new THREE.Vector3(0, 0, 0);
            xAxis = new THREE.Vector3(1, 0, 0);
            yAxis = new THREE.Vector3(0, 1, 0);
            zAxis = new THREE.Vector3(0, 0, 1);
        
            anim = false;
            animate();
        }
        
        function animate() {
            requestAnimationFrame( animate );
        
            renderer.render( scene, camera );
        }
        
        function resetState() {
            let u = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1.5});
            let d = planes.filter(cd => {return cd.getWorldPosition(new THREE.Vector3()).y < -1.5});
            let f = planes.filter(cf => {return cf.getWorldPosition(new THREE.Vector3()).z > 1.5});
            let b = planes.filter(cb => {return cb.getWorldPosition(new THREE.Vector3()).z < -1.5});
            let r = planes.filter(cr => {return cr.getWorldPosition(new THREE.Vector3()).x > 1.5});
            let l = planes.filter(cl => {return cl.getWorldPosition(new THREE.Vector3()).x < -1.5});
        
            for (let p of u) {
                p.material.color.r = 1;
                p.material.color.g = 1;
                p.material.color.b = 1;
            }
            for (let p of d) {
                p.material.color.r = 1;
                p.material.color.g = 1;
                p.material.color.b = 0;
            }
            for (let p of f) {
                p.material.color.r = 0;
                p.material.color.g = 1;
                p.material.color.b = 0;
            }
            for (let p of b) {
                p.material.color.r = 0;
                p.material.color.g = 0;
                p.material.color.b = 1;
            }
            for (let p of r) {
                p.material.color.r = 1;
                p.material.color.g = 0;
                p.material.color.b = 0;
            }
            for (let p of l) {
                p.material.color.r = 1;
                p.material.color.g = 2/3;
                p.material.color.b = 0;
            }
        }
        
        $("#btnPlay").on("click", () => {
            $("#btnPlay").prop('disabled', true);
            resetState();
            const setup = scramble;
            const moves = solution;
        
            for (let m of (setup).split(" ")) {
                mv(m);
            }
        
            anim = true;
            let mvs = (moves).split(" ");
            playMoveTime = time === "" ? stdTime * 1000 : time / mvs.length;
            
            let i = 0;
            let interval = setInterval(() => {
                if (i === mvs.length) {
                    clearInterval(interval);
                    anim = false;
                    $("#btnPlay").prop('disabled', false);
                }
                else {
                    if (tween) {
                        tween.progress(1);
                    }
                    mv(mvs[i]);
                }
                i++;
            }, playMoveTime);
        });
        
        function mv(turn) {
            switch (turn) {
                case "R":
                    doR();
                    break;
                case "R'":
                    doRi();
                    break;
                case "R2":
                    doR2();
                    break;
                case "R2'":
                    doR2i();
                    break;
                case "L":
                    doL();
                    break;
                case "L'":
                    doLi();
                    break;
                case "L2":
                    doL2();
                    break;
                case "L2'":
                    doL2i();
                    break;
                case "F":
                    doF();
                    break;
                case "F'":
                    doFi();
                    break;
                case "F2":
                    doF2();
                    break;
                case "F2'":
                    doF2i();
                    break;
                case "B":
                    doB();
                    break;
                case "B'":
                    doBi();
                    break;
                case "B2":
                    doB2();
                    break;
                case "B2'":
                    doB2i();
                    break;
                case "U":
                    doU();
                    break;
                case "U'":
                    doUi();
                    break;
                case "U2":
                    doU2();
                    break;
                case "U2'":
                    doU2i();
                    break;
                case "D":
                    doD();
                    break;
                case "D'":
                    doDi();
                    break;
                case "D2":
                    doD2();
                    break;
                case "D2'":
                    doD2i();
                    break;
                case "x":
                    doX();
                    break;
                case "x'":
                    doXi();
                    break;
                case "x2":
                    doX2();
                    break;
                case "x2'":
                    doX2i();
                    break;
                case "y":
                    doY();
                    break;
                case "y'":
                    doYi();
                    break;
                case "y2":
                    doY2();
                    break;
                case "y2'":
                    doY2i();
                    break;
                case "z":
                    doZ();
                    break;
                case "z'":
                    doZi();
                    break;
                case "z2":
                    doZ2();
                    break;
                case "z2'":
                    doZ2i();
                    break;
                case "M":
                    doM();
                    break;
                case "M'":
                    doMi();
                    break;
                case "M2":
                    doM2();
                    break;
                case "M2'":
                    doM2i();
                    break;
                case "S":
                    doS();
                    break;
                case "S'":
                    doSi();
                    break;
                case "S2":
                    doS2();
                    break;
                case "S2'":
                    doS2i();
                    break;
                case "E":
                    doE();
                    break;
                case "E'":
                    doEi();
                    break;
                case "E2":
                    doE2();
                    break;
                case "E2'":
                    doE2i();
                    break;
                case "Rw":
                    doRw();
                    break;
                case "Rw'":
                    doRwi();
                    break;
                case "Rw2":
                    doRw2();
                    break;
                case "Rw2'":
                    doRw2i();
                    break;
                case "Lw":
                    doLw();
                    break;
                case "Lw'":
                    doLwi();
                    break;
                case "Lw2":
                    doLw2();
                    break;
                case "Lw2'":
                    doLw2i();
                    break;
                case "Fw":
                    doFw();
                    break;
                case "Fw'":
                    doFwi();
                    break;
                case "Fw2":
                    doFw2();
                    break;
                case "Fw2'":
                    doFw2i();
                    break;
                case "Bw":
                    doBw();
                    break;
                case "Bw'":
                    doBwi();
                    break;
                case "Bw2":
                    doBw2();
                    break;
                case "Bw2'":
                    doBw2i();
                    break;
                case "Uw":
                    doUw();
                    break;
                case "Uw'":
                    doUwi();
                    break;
                case "Uw2":
                    doUw2();
                    break;
                case "Uw2'":
                    doUw2i();
                    break;
                case "Dw":
                    doDw();
                    break;
                case "Dw'":
                    doDwi();
                    break;
                case "Dw2":
                    doDw2();
                    break;
                case "Dw2'":
                    doDw2i();
                    break;
            }
        }
        
        function doMv(cubies, xyz, angle) {
            /* let axis = xyz === "x" ? xAxis : xyz === "y" ? yAxis : zAxis;
            let euler = calcRotationAroundAxis(xyz, angle); */
            let tempCube = new THREE.Object3D();
            
            for (let cubie of cubies) {
                scene.attach(tempCube);
                tempCube.attach(cubie);
            }
            
            if (anim) {
                tween = gsap.to(tempCube.rotation, {
                    duration: playMoveTime / 1000,
                    x: xyz === "x" ? angle : 0,
                    y: xyz === "y" ? angle : 0,
                    z: xyz === "z" ? angle : 0
                });
            }
            else {
                tween = gsap.to(tempCube.rotation, {
                    duration: 0,
                    x: xyz === "x" ? angle : 0,
                    y: xyz === "y" ? angle : 0,
                    z: xyz === "z" ? angle : 0
                });
            }
        }
        
        function doR() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
            doMv(c, "x", -Math.PI / 2);
        }
        
        function doRi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
            doMv(c, "x", Math.PI / 2);
        }
        
        function doR2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
            doMv(c, "x", -Math.PI);
        }
        
        function doR2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > 1});
            doMv(c, "x", Math.PI);
        }
        
        function doL() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
            doMv(c, "x", Math.PI / 2);
        }
        
        function doLi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
            doMv(c, "x", -Math.PI / 2);
        }
        
        function doL2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
            doMv(c, "x", Math.PI);
        }
        
        function doL2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < -1});
            doMv(c, "x", -Math.PI);
        }
        
        function doU() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
            doMv(c, "y", -Math.PI / 2);
        }
        
        function doUi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
            doMv(c, "y", Math.PI / 2);
        }
        
        function doU2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
            doMv(c, "y", -Math.PI);
        }
        
        function doU2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > 1});
            doMv(c, "y", Math.PI);
        }
        
        function doD() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
            doMv(c, "y", Math.PI / 2);
        }
        
        function doDi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
            doMv(c, "y", -Math.PI / 2);
        }
        
        function doD2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
            doMv(c, "y", Math.PI);
        }
        
        function doD2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < -1});
            doMv(c, "y", -Math.PI);
        }
        
        function doF() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
            doMv(c, "z", -Math.PI / 2);
        }
        
        function doFi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
            doMv(c, "z", Math.PI / 2);
        }
        
        function doF2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
            doMv(c, "z", -Math.PI);
        }
        
        function doF2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > 1});
            doMv(c, "z", Math.PI);
        }
        
        function doB() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
            doMv(c, "z", Math.PI / 2);
        }
        
        function doBi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
            doMv(c, "z", -Math.PI / 2);
        }
        
        function doB2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
            doMv(c, "z", Math.PI);
        }
        
        function doB2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < -1});
            doMv(c, "z", -Math.PI);
        }
        
        function doX() {
            let c = planes;
            doMv(c, "x", -Math.PI / 2);
        }
        
        function doXi() {
            let c = planes;
            doMv(c, "x", Math.PI / 2);
        }
        
        function doX2() {
            let c = planes;
            doMv(c, "x", -Math.PI);
        }
        
        function doX2i() {
            let c = planes;
            doMv(c, "x", Math.PI);
        }
        
        function doY() {
            let c = planes;
            doMv(c, "y", -Math.PI / 2);
        }
        
        function doYi() {
            let c = planes;
            doMv(c, "y", Math.PI / 2);
        }
        
        function doY2() {
            let c = planes;
            doMv(c, "y", -Math.PI);
        }
        
        function doY2i() {
            let c = planes;
            doMv(c, "y", Math.PI);
        }
        
        function doZ() {
            let c = planes;
            doMv(c, "z", -Math.PI / 2);
        }
        
        function doZi() {
            let c = planes;
            doMv(c, "z", Math.PI / 2);
        }
        
        function doZ2() {
            let c = planes;
            doMv(c, "z", -Math.PI);
        }
        
        function doZ2i() {
            let c = planes;
            doMv(c, "z", Math.PI);
        }
        
        function doM() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", Math.PI / 2);
        }
        
        function doMi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", -Math.PI / 2);
        }
        
        function doM2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", Math.PI);
        }
        
        function doM2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1 &&  cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", -Math.PI);
        }
        
        function doS() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", -Math.PI / 2);
        }
        
        function doSi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", Math.PI / 2);
        }
        
        function doS2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", -Math.PI);
        }
        
        function doS2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1 &&  cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", Math.PI);
        }
        
        function doE() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", Math.PI / 2);
        }
        
        function doEi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", -Math.PI / 2);
        }
        
        function doE2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", Math.PI);
        }
        
        function doE2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1 &&  cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", -Math.PI);
        }
        
        function doRw() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", -Math.PI / 2);
        }
        
        function doRwi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", Math.PI / 2);
        }
        
        function doRw2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", -Math.PI);
        }
        
        function doRw2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x > -1});
            doMv(c, "x", Math.PI);
        }
        
        function doLw() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
            doMv(c, "x", Math.PI / 2);
        }
        
        function doLwi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
            doMv(c, "x", -Math.PI / 2);
        }
        
        function doLw2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
            doMv(c, "x", Math.PI);
        }
        
        function doLw2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).x < 1});
            doMv(c, "x", -Math.PI);
        }
        
        function doUw() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", -Math.PI / 2);
        }
        
        function doUwi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", Math.PI / 2);
        }
        
        function doUw2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", -Math.PI);
        }
        
        function doUw2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y > -1});
            doMv(c, "y", Math.PI);
        }
        
        function doDw() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
            doMv(c, "y", Math.PI / 2);
        }
        
        function doDwi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
            doMv(c, "y", -Math.PI / 2);
        }
        
        function doDw2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
            doMv(c, "y", Math.PI);
        }
        
        function doDw2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).y < 1});
            doMv(c, "y", -Math.PI);
        }
        
        function doFw() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", -Math.PI / 2);
        }
        
        function doFwi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", Math.PI / 2);
        }
        
        function doFw2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", -Math.PI);
        }
        
        function doFw2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z > -1});
            doMv(c, "z", Math.PI);
        }
        
        function doBw() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
            doMv(c, "z", Math.PI / 2);
        }
        
        function doBwi() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
            doMv(c, "z", -Math.PI / 2);
        }
        
        function doBw2() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
            doMv(c, "z", Math.PI);
        }
        
        function doBw2i() {
            let c = planes.filter(cu => {return cu.getWorldPosition(new THREE.Vector3()).z < 1});
            doMv(c, "z", -Math.PI);
        }
        
        function adjustSize() {
            $("#cubePlayer").css("width", "100%");
            $("#cubePlayer").css("height", "100%");
            $("#cubePlayer").css("position", "relative");


            $("#cubePlayer > canvas").css("margin", "auto");

            $("#btnPlay").css("position", "absolute");
            $("#btnPlay").css("z-index", "1");
            
            if ($("body").width() >= $("body").height()) {
                $("body").css("grid-template-columns", "1fr 1fr");
                $("body").css("grid-template-rows", "");
                renderer.setSize( $("#cubePlayer").width(), $("#cubePlayer").width() );
            }
            else {
                $("body").css("grid-template-columns", "");
                $("body").css("grid-template-rows", "1fr 2fr");
                renderer.setSize( $("#cubePlayer").height(), $("#cubePlayer").height() );
            }
        }
    }
}

customElements.define("cube-player", CubePlayer);