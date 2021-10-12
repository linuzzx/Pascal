let ubl="A",ub="A",ubr="C",ur="C",ufr="E",uf="E",ufl="G",ul="G",lub="H",lu="H",luf="P",lf="P",ldf="W",ld="W",ldb="I",lb="I",
    ful="F",fu="F",fur="N",fr="N",fdr="U",fd="U",fdl="O",fl="O",ruf="D",ru="D",rub="L",rb="L",rdb="S",rd="S",rdf="M",rf="M",
    bur="B",bu="B",bul="J",bl="J",bdl="Q",bd="Q",bdr="K",br="K",dfl="V",df="V",dfr="T",dr="T",dbr="R",db="R",dbl="X",dl="X";
/*let ubl="A",ub="A",ubr="B",ur="B",ufr="C",uf="C",ufl="D",ul="D",lub="E",lu="E",luf="F",lf="F",ldf="G",ld="G",ldb="H",lb="H",
    ful="I",fu="I",fur="J",fr="J",fdr="K",fd="K",fdl="L",fl="L",ruf="M",ru="M",rub="N",rb="N",rdb="O",rd="O",rdf="P",rf="P",
    bur="Q",bu="Q",bul="R",bl="R",bdl="S",bd="S",bdr="T",br="T",dfl="U",df="U",dfr="V",dr="V",dbr="W",db="W",dbl="X",dl="X";*/

let letterScheme = [ubl,ub,ubr,ur,ufr,uf,ufl,ul,lub,lu,luf,lf,ldf,ld,ldb,lb,ful,fu,fur,fr,fdr,fd,fdl,fl,
                    ruf,ru,rub,rb,rdb,rd,rdf,rf,bur,bu,bul,bl,bdl,bd,bdr,br,dfl,df,dfr,dr,dbr,db,dbl,dl];
                    
let letterSchemeEdges = [ub,ur,uf,ul,lu,lf,ld,lb,fu,fr,fd,fl,ru,rb,rd,rf,bu,bl,bd,br,df,dr,db,dl];
                    
let letterSchemeCorners = [ubl,ubr,ufr,ufl,lub,luf,ldf,ldb,ful,fur,fdr,fdl,ruf,rub,rdb,rdf,bur,bul,bdl,bdr,dfl,dfr,dbr,dbl];

let pieces = ["ubl","ub","ubr","ur","ufr","uf","ufl","ul","lub","lu","luf","lf","ldf","ld","ldb","lb","ful","fu","fur","fr","fdr","fd","fdl","fl",
                "ruf","ru","rub","rb","rdb","rd","rdf","rf","bur","bu","bul","bl","bdl","bd","bdr","br","dfl","df","dfr","dr","dbr","db","dbl","dl"];

let edges = ["ub","ur","uf","ul","lu","lf","ld","lb","fu","fr","fd","fl","ru","rb","rd","rf","bu","bl","bd","br","df","dr","db","dl"];

let corners = ["ubl","ubr","ufr","ufl","lub","luf","ldf","ldb","ful","fur","fdr","fdl","ruf","rub","rdb","rdf","bur","bul","bdl","bdr","dfl","dfr","dbr","dbl"];

let cubeState = [];
let edgeState = [];
let cornerState = [];
let cycleBreak = false;

$(function() {
    scrambleCube();
    getEdgeSolution();
});

function scrambleCube() {
    cubeState = applyMoves(scramble());
}

function getEdgeSolution() {
    let solution = [];
    let unsolved = ["ub","ur","uf","ul","lu","lf","ld","lb","fu","fr","fd","fl","ru","rb","rd","rf","bu","bl","bd","br","df","dr","db","dl"];
    let flipped = [];
    
    edgeState = getEdgeStateBLD();
    const bufferE = 20; //Setter buffer til DF
    const bufferOppE = 10; //Setter bufferOpp til FD
    //const bufferE = 2; //Setter buffer til UF
    //const bufferOppE = 8; //Setter bufferOpp til FU

    let buffer = edgeState[bufferE];
    let target = edgeState[edges.indexOf(buffer)];
    
    //Remove buffer piece from unsolved
    unsolved.splice(unsolved.indexOf(edges[bufferE]),1);
    unsolved.splice(unsolved.indexOf(edges[bufferOppE]),1);

    //Remove solved edges
    removeSolved(unsolved);

    //Get flipped edges
    getFlipped(flipped, unsolved);

    while (unsolved.length !== 0) {
        //Make target
        target = edgeState[edges.indexOf(buffer)];
        console.log(buffer);
        console.log(edges.indexOf(buffer));
        console.log(target);
        cycleBreak = false;

        //If target is bufferpiece
        if (target === edges[bufferE] || target === edges[bufferOppE]) {
            target = unsolved[0];
            cycleBreak = true;
        }

        //Add target to solution
        solution.push(target);
        
        //Remove target from unsolved
        if (!cycleBreak) {
            for (let u of unsolved) {
                //Removes every orientation of target from unsolved
                if (u.includes(target.split("")[0]) && u.includes(target.split("")[1])) {
                    unsolved.splice(unsolved.indexOf(u),1);
                }
            }
        }

        //Make new buffer
        buffer = target;

        /*
        
        while (unsolved.length !== 0) {
            //Check if piece is allready solved
            if (solution.indexOf(buffer) === -1) {
                //Add buffer to solution
                if (buffer !== edges[bufferE] && buffer !== edges[bufferOppE]) {
                    solution.push(buffer);
                }
                //Remove buffer from unsolved
                for (let u of unsolved) {
                    //Removes every orientation of buffer
                    if (u.includes(buffer.split("")[0]) && u.includes(buffer.split("")[1])) {
                        unsolved.splice(unsolved.indexOf(u),1);
                    }
                }
                //Make target
                target = edgeState[edges.indexOf(buffer)];
                //Make new buffer
                buffer = target;
            }
            else {
                //Make new buffer from first unsolved
                buffer = unsolved[0];
            }

            removeSolved(unsolved);
        }

        console.log(solution);

        let sol = [];

        for (let s of solution) {
            sol.push(letterSchemeEdges[edges.indexOf(s)]);
        }
        console.log(sol.join(" "));
        return sol;
        */
    }

    console.log(solution);

    let sol = [];

    for (let s of solution) {
        sol.push(letterSchemeEdges[edges.indexOf(s)]);
    }
    console.log(sol.join(" "));
    return sol;
}

function removeSolved(unsolved) {
    let toRemove = [];
    for (let i=0; i<edgeState.length; i++) {
        if (edgeState[i] === edges[i]) {
            toRemove.push(i);
        }
    }
    if (toRemove.length !== 0) {
        for (let i=toRemove.length-1; i>=0; i--) {
            unsolved.splice(toRemove[i],1);
        }
    }
}

function getFlipped(flipped, unsolved) {
    for (let i=0; i<edgeState.length; i++) {
        let fp = edges[i].split("")[1] + edges[i].split("")[0];
        if (edgeState[i] === fp) {
            flipped.push(fp);
        }
    }

    for (let f of flipped) {
        unsolved.splice(unsolved.indexOf(f));
    }
}