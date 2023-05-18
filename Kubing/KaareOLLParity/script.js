const op = "Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'";
const moves4x4 = ["R", "R2", "R'", "U", "U2", "U'", "F", "F2", "F'", "D", "D2", "D'"];
let cleanState;

$(() => {
    cleanState = getNumberState(4, "");
});

function gen(n) {
    let out = "";
    let ops = genOPs(n);

    for (let i = 0; i < Object.keys(ops).length; i++) {
        out += "<div style=\"display: grid; grid-template-columns: 1fr 1fr;\"><svg id=\"svgScramble" + i + "\"></svg><h1 id=\"scramble" + i + "\"></h1></div><br><br>";
    }

    $("#scrambleDiv").html(out);

    for (let i = 0; i < Object.keys(ops).length; i++) {
        let alg = inverseAlg(Object.values(ops)[i][0]);
        $("#scramble" + i).text(alg.replace("Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'", "[KP]").replace("Rw U2 Rw U2 Rw3' U Rw U2 R' U Rw U R Rw2 U Rw U' Rw", "[KP]"));
        drawScrambleNxN("#svgScramble" + i, 4, alg, ["white", "gray", "gray", "gray", "gray", "gray"]);
    }
    
    if (Object.keys(ops).length === 0) {
        $("#scrambleDiv").append("Need N to be at least 3");
    }
}

function genOPs(n) {
    let ops = {};
    let depth = 1;
    let arr = moves4x4.slice().filter(a => {return !a.includes("U") && !a.includes("D")});
    
    while (depth <= n) {
        if (depth === 1) {
            for (let m of arr) {
                let alg = inverseAlg(m + " " + op + " " + inverseAlg(m));
                let state = getNumberState(4, inverseAlg(alg));
                if (goodState(state)) {
                    let nState = getNewState(state);
                    if (!ops[nState]) {
                        ops[nState] = [];
                    }
                    ops[nState].push(alg);
                }
            }
        }
        else {
            let tArr = arr.slice();
            for (let m1 of arr) {
                let prevMove = m1.split(" ")[m1.split(" ").length - 1][0];
                let prevPrevMove = m1.split(" ")[m1.split(" ").length - 2] ? m1.split(" ")[m1.split(" ").length - 2][0] : "";
                for (let m2 of moves4x4.filter(m => {return m[0] !== prevMove && prevMove + prevPrevMove !== "UD" && prevMove + prevPrevMove !== "DU"})) {
                    tArr.push(m1 + " " + m2);
                    let alg = m1 + " " + m2 + " " + op + " " + inverseAlg(m1 + " " + m2);
                    let state = getNumberState(4, inverseAlg(alg));
                    if (goodState(state)) {
                        let states = [getNumberState(4, inverseAlg(alg) + " U"), getNumberState(4, inverseAlg(alg) + " U2"), getNumberState(4, inverseAlg(alg) + " U'")];
                        let nState = getNewState(state);
                        let dup = "";

                        foundLoop : for (let s1 of states) {
                            for (let s2 of Object.keys(ops)) {
                                console.log(getNewState(s1), s2);
                                if (getNewState(s1) === s2) {
                                    dup = s2;
                                    break foundLoop;
                                }
                            }
                        }
                        
                        if (dup === "") {
                            if (!ops[nState]) {
                                ops[nState] = [];
                            }
                            ops[nState].push(alg);
                        }
                        else {
                            console.log(dup);
                            ops[dup].push(alg);
                        }
                    }
                }
            }
            arr = tArr.slice();
        }
        depth++;
    }
    console.log(ops);
    return ops;
}

function goodState(state) {
    let u1 = cleanState.slice(0, 16);
    let l1 = cleanState.slice(20, 32);
    let f1 = cleanState.slice(36, 48);
    let r1 = cleanState.slice(52, 64);
    let b1 = cleanState.slice(68, 80);
    let d1 = cleanState.slice(80, 96);

    let u2 = state.slice(0, 16);
    let l2 = state.slice(20, 32);
    let f2 = state.slice(36, 48);
    let r2 = state.slice(52, 64);
    let b2 = state.slice(68, 80);
    let d2 = state.slice(80, 96);

    return l2 === l1 && f2 === f1 && r2 === r1 && b2 === b1 && d2 === d1;
}

function getNewState(state) {
    let u = state.slice(0, 16);
    let l = state.slice(16, 20);
    let f = state.slice(32, 36);
    let r = state.slice(48, 52);
    let b = state.slice(64, 68);

    return (u + l + f + r + b).replaceAll("2", "0").replaceAll("3", "0").replaceAll("4", "0").replaceAll("5", "0").replaceAll("6", "0");
}