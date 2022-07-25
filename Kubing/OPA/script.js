let scramble = "";

$(() => {
    restart();
});

function restart() {
    scramble = getScramble4x4(30);
    $("#scramble").text(scramble);
    $("#answer").text("");
}

function scr() {
    let scr = getScramble4x4(15 + Math.round(Math.random() * 5));
    scramble += " " + scr;
    $("#scramble").text(scr);
    $("#answer").text("");
}

function checkParity() {
    let qwt = 0;
    for (let m of scramble.split(" ")) {
        if (m.includes("w") && !m.includes("2")) {
            qwt++;
        }
    }

    let answer = qwt % 2 === 0 ? "Even" : "Odd";

    $("#answer").text(answer);
}

function getScramble4x4(num) {
    let n = 4;
    let scr = "";
    let movesExtra = ["", "'", "2"];
    let axises = [["U","D"], ["F","B"], ["R","L"]];
    let movesAxis = [["",""]];

    for (let i = 4; i <= n; i++) {
        let nW = Math.floor(i/2) === 2 ? "" : Math.floor(i/2);
        let nA = [nW,"w"];
        
        if (!JSON.stringify(movesAxis).includes(JSON.stringify(nA))) {
            movesAxis.push(nA);
        }
    }
    
    let curAxis = -1;
    let moves = [];
    for (let i = 0; i < num; i++) {
        let axis = Math.floor(Math.random() * axises.length);

        if (axis !== curAxis) {
            curAxis = axis;
            moves = movesAxis.map(m => [m[0] + axises[curAxis][0] + m[1]])
                    .concat(movesAxis.map(m => [m[0] + axises[curAxis][1] + m[1]]));
            if (n % 2 === 0) {
                moves.pop();
            }
        }
        else if (moves.length === 0) {
            i--;
            continue;
        }

        let move = moves[Math.floor(Math.random() * moves.length)];
        let moveE = movesExtra[Math.floor(Math.random() * movesExtra.length)];
        
        moves.splice(moves.indexOf(move), 1);

        scr += move + moveE + " ";
    }
    return scr.trim();
}