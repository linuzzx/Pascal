function inverseAlg(alg) {
    let invAlg = "";

    if (alg.includes("[") || alg.includes("]") || alg.includes(":") || alg.includes(",")) {
        invAlg = inverseComm(alg);
    }
    else {
        let arr = [];
        for (let a of alg.split(" ")) {
            if (a.includes("'")) {
                arr.unshift(a.split("")[0]);
            }
            else if (a.split("").length === 1) {
                arr.unshift(a + "'");
            }
            else {
                arr.unshift(a);
            }
        }
        invAlg = arr.join(" ");
    }

    return invAlg;
}

function inverseComm(alg) {
    let invAlg = "";
    let leftBrackets = 0;
    let rightBrackets = 0;
    let colons = 0;
    let commas = 0;

    for (let a of alg.split(" ")) {
        if (a === "[") {
            leftBrackets++;
        }
        else if (a === "]") {
            rightBrackets++;
        }
        else if (a === ":") {
            colons++;
        }
        else if (a === ",") {
            commas++;
        }
    }

    if (leftBrackets !== rightBrackets || commas > leftBrackets || colons > leftBrackets) {
        return "Illegal alg";
    }
    else if (leftBrackets > 2 || commas >= 2 || colons >= 2) {
        return "Alg format not supported";
    }

    let comm = alg.match(/\[(.*)\,(.*)\]/);
    let conj = alg.match(/\[(.*)\:(.*)\]/);

    if (comm) {
        invAlg = "[" + comm[2] + ", " + comm[1] + "]";
    }
    else if (conj) {
        invAlg = "[" + conj[1] + ": " + inverseAlg(conj[2]) + "]";
    }

    return invAlg;
}