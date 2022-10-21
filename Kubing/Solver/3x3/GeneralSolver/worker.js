let scramble;
let endState;

onmessage = e => {
    scramble = e.data[0];
    endState = e.data[1];

    solve(scramble, endState);
}

function solve(scramble, endState) {
    let solution = "F R U R' U' F'";
    postMessage(solution);
}