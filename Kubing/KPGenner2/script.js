const op = "Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'";
const moves4x4 = ["R", "R2", "R'", "U", "U2", "U'", "F", "F2", "F'", "D", "D2", "D'"];
let cleanState;
let affixes = [""];

$(() => {
    cleanState = getNumberState(4, "");
    affixes = [""];
});

function gen(n) {
    let out = "";
    genAffixes(n);
    let ops = genOPs(n);

    for (let i = 0; i < Object.keys(ops).length; i++) {
        out += "<div style=\"display: grid; grid-template-columns: 1fr 1fr;\"><svg id=\"svgScramble" + i + "\"></svg><div id=\"scramble" + i + "\" style=\"height: 25vh; overflow-y: scroll;\"></div></div><br><br>";
    }

    $("#scrambleDiv").html(out);

    for (let i = 0; i < Object.keys(ops).length; i++) {
        let alg = inverseAlg(Object.values(ops)[i][0]);
        for (let j = 1; j <= Object.values(ops)[i].length; j++) {
            $("#scramble" + i).append("<h2>" + j + ". " + inverseAlg(Object.values(ops)[i][j - 1]).replace("Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'", "[KP]").replace("Rw U2 Rw U2 Rw3' U Rw U2 R' U Rw U R Rw2 U Rw U' Rw", "[KP]") + "</h2>");
        }
        // $("#scramble" + i).text(alg.replace("Rw' U Rw' U' Rw2 R' U' Rw' U' R U2 Rw' U' Rw3 U2 Rw' U2 Rw'", "[KP]").replace("Rw U2 Rw U2 Rw3' U Rw U2 R' U Rw U R Rw2 U Rw U' Rw", "[KP]"));
        drawScrambleNxN("#svgScramble" + i, 4, alg, ["white", "gray", "gray", "gray", "gray", "gray"]);
    }
    
    if (Object.keys(ops).length === 0) {
        $("#scrambleDiv").append("Need N to be at least 3");
    }
}

function genAffixes(n) {
    let depth = 1;
    let arr = moves4x4.slice().filter(a => {return !a.includes("U") && !a.includes("D")});
    
    while (depth <= n) {
        if (depth === 1) {
            for (let m of arr) {
                affixes.push(m);
            }
        }
        else {
            let tArr = arr.slice();
            for (let m1 of arr) {
                let prevMove = m1.split(" ")[m1.split(" ").length - 1][0];
                let prevPrevMove = m1.split(" ")[m1.split(" ").length - 2] ? m1.split(" ")[m1.split(" ").length - 2][0] : "";
                for (let m2 of moves4x4.filter(m => {
                    if (m[0] === prevMove) {
                        return false;
                    }
                    if (prevMove === "D" && m[0] === "U") {
                        return false;
                    }
                    return true;
                })) {
                    tArr.push(m1 + " " + m2);
                    affixes.push(m1 + " " + m2);
                }
            }
            arr = tArr.slice();
        }
        depth++;
    }
}

function genOPs() {
    let ops = {};
    
    for (let m1 of affixes) {
        for (let m2 of affixes) {
            let alg = [m1, op, m2].join(" ");
            let state = getNumberState(4, inverseAlg(alg));
            if (goodState(state)) {
                let states = [getNumberState(4, inverseAlg(alg) + " U"), getNumberState(4, inverseAlg(alg) + " U2"), getNumberState(4, inverseAlg(alg) + " U'")];
                let nState = getNewState(state);
                let dup = "";

                foundLoop : for (let s1 of states) {
                    for (let s2 of Object.keys(ops)) {
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
                    ops[dup].push(alg);
                }
            }
        }
    }

    for (let k of Object.keys(ops)) {
        ops[k] = [...new Set(ops[k])];
    }
    ops = sortOps(ops);

    return ops;
}

function sortOps(ops) {
    let nOps = {};

    for (let k of Object.keys(ops)) {
        let arr = ops[k].sort((a, b) => {
            return getAlgScore(a) - getAlgScore(b);
        });
        nOps[k] = arr;
    }

    return nOps;
}

function getAlgScore(alg) {
    let sum = 0;

    for (let m of alg.split(" ")) {
        let p = 0;

        if (m.includes("R") || m.includes("U")) {
            p += 1;
        }
        else if (m.includes("F") || m.includes("D")) {
            p += 2;
        }
        if (m.includes("2")) {
            p *= 2;
        }

        sum += p;
    }

    return sum;
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