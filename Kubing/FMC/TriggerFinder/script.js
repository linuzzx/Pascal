let triggers = {};
let movesEO = ["U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2"];
let movesDR = ["U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F2", "B2"];
let movesHTR = ["U", "U'", "U2", "D", "D'", "D2", "R2", "L2", "F2", "B2"];
let movesFinal = ["U2", "D2", "R2", "L2", "F2", "B2"];

$(() => {
    findTriggers(100)
});

function findTriggers(n) {
    /* let scrambles = [];

    for (let i = 0; i < n; i++) {
        scrambles.push(getSubsetScramble(movesHTR, 10));
    } */

    // for (let s of scrambles) {
    for (let s of solutionsHTR.map(s => s.solution)) {
        let state = getNumberState(3, s);
        let trigger = "";
        let badEdges = 0;
        let badCorners = 0;

        let stateArr = state.split("");
        badEdges = [stateArr[19], stateArr[21], stateArr[23], stateArr[25], stateArr[37], stateArr[39], stateArr[41], stateArr[43]].map(s => s === stateArr[22] || s === stateArr[40]).filter(s => s === false).length +
                    [stateArr[10], stateArr[12], stateArr[14], stateArr[16], stateArr[28], stateArr[30], stateArr[32], stateArr[34]].map(s => s === stateArr[13] || s === stateArr[31]).filter(s => s === false).length;
        badCorners = [stateArr[18], stateArr[20], stateArr[24], stateArr[26], stateArr[36], stateArr[38], stateArr[42], stateArr[44]].map(s => s === stateArr[22] || s === stateArr[40]).filter(s => s === false).length/*  +
                    [stateArr[9], stateArr[11], stateArr[15], stateArr[17], stateArr[27], stateArr[29], stateArr[33], stateArr[35]].map(s => s === stateArr[13] || s === stateArr[31]).filter(s => s === false).length; */
        
        if (stateArr.slice(18, 27).filter(s => s === stateArr[22] || s === stateArr[40]).length === 9) {
            if (!triggers[badEdges + "e" + badCorners + "c"]) {
                triggers[badEdges + "e" + badCorners + "c"] = [];
            }
            triggers[badEdges + "e" + badCorners + "c"].push(inverseAlg(s));
        }

        /* if (!triggers[badEdges + "e"]) {
            triggers[badEdges + "e"] = [];
        }
        triggers[badEdges + "e"].push(inverseAlg(s));
        if (!triggers[badCorners + "c"]) {
            triggers[badCorners + "c"] = [];
        }
        triggers[badCorners + "c"].push(inverseAlg(s)); */
    }

    let nTriggers = Object.fromEntries(
        Object.entries(triggers).map(([k, v]) => [k, v[0]])
    );
    console.log(nTriggers);
    // console.log(triggers);
}