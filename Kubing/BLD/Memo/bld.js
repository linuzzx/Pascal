let ubl="A",ub="A",ubr="B",ur="B",ufr="C",uf="C",ufl="D",ul="D",lub="E",lu="E",luf="F",lf="F",ldf="G",ld="G",ldb="H",lb="H",
    ful="I",fu="I",fur="J",fr="J",fdr="K",fd="K",fdl="L",fl="L",ruf="M",ru="M",rub="N",rb="N",rdb="O",rd="O",rdf="P",rf="P",
    bur="Q",bu="Q",bul="R",bl="R",bdl="S",bd="S",bdr="T",br="T",dfl="U",df="U",dfr="V",dr="V",dbr="W",db="W",dbl="X",dl="X";

let letterScheme = [ubl,ub,ubr,ur,ufr,uf,ufl,ul,lub,lu,luf,lf,ldf,ld,ldb,lb,ful,fu,fur,fr,fdr,fd,fdl,fl,
                    ruf,ru,rub,rb,rdb,rd,rdf,rf,bur,bu,bul,bl,bdl,bd,bdr,br,dfl,df,dfr,dr,dbr,db,dbl,dl];

let edges = [ub,ur,uf,ul,lu,lf,ld,lb,fu,fr,fd,fl,ru,rb,rd,rf,bu,bl,bd,br,df,dr,db,dl];
let corners = [ubl,ubr,ufr,ufl,lub,luf,ldf,ldb,ful,fur,fdr,fdl,ruf,rub,rdb,rdf,bur,bul,bdl,bdr,dfl,dfr,dbr,dbl];

let rawEdges = ["ub","ur","uf","ul","lu","lf","ld","lb","fu","fr","fd","fl","ru","rb","rd","rf","bu","bl","bd","br","df","dr","db","dl"];

let bufferE = uf;
let bufferC = ufr;

let cubeState = [];
let solvedEdges = false;
let solvedCorners = false;

$(function() {
    scrambleCube();
    getEdgeSolution();
});

function scrambleCube() {
    cubeState = applyMoves(scramble());
}

function getEdgeSolution() {
    let solution = [];
    let unsolved = [ub,ur,uf,ul,lu,lf,ld,lb,fu,fr,fd,fl,ru,rb,rd,rf,bu,bl,bd,br,df,dr,db,dl];
    bufferE = rawEdges[edges.indexOf(uf)];

    solvedEdges = checkIfSolvedEdges();
    let edgeState = getEdgeStateBLD();
    
    while (unsolved.length !== 0) {
        if (solution.indexOf(bufferE) === -1) {
            solution.push(edges[rawEdges.indexOf(bufferE)]);
            unsolved.splice(unsolved.indexOf(bufferE),1);
            console.log(rawEdges.indexOf(bufferE));
            bufferE = edges[rawEdges.indexOf(edgeState[rawEdges.indexOf(bufferE)])];
        }
        else {
            bufferE = unsolved[0];
        }

        solvedEdges = checkIfSolvedEdges();
    }

    console.log(solution);

    return solution;
}

function checkIfSolvedEdges() {
    let isSolved = true;
    let edgeState = getEdgeStateBLD();

    outerloop:
    for (let i=0; i<edgeState.length; i++) {
        if (edgeState[i] !== edges[i]) {
            isSolved = false;
            break outerloop;
        }
    }

    return isSolved;
}

function checkIfSolvedCorners() {
    return ubl==="A" && ubr==="B" && ufr==="C" && ufl==="D" && lub==="E" && luf==="F" && ldf==="G" && ldb==="H" && 
    ful==="I" && fur==="J" && fdr==="K" && fdl==="L" && ruf==="M" && rub==="N"&& rdb==="O" && rdf==="P" && 
    bur==="Q" && bul==="R" && bdl==="S" && bdr==="T" && dfl==="U" && dfr==="V" && dbr==="W" && dbl==="X";
}

function checkIfSolved() {
    return ubl==="A" && ub==="A" && ubr==="B" && ur==="B" && ufr==="C" && uf==="C" && ufl==="D" && ul==="D" && lub==="E" && lu==="E" && luf==="F" && lf==="F" && ldf==="G" && ld==="G" && ldb==="H" && lb==="H" && 
    ful==="I" && fu==="I" && fur==="J" && fr==="J" && fdr==="K" && fd==="K" && fdl==="L" && fl==="L" && ruf==="M" && ru==="M" && rub==="N" && rb==="N" && rdb==="O" && rd==="O" && rdf==="P" && rf==="P" && 
    bur==="Q" && bu==="Q" && bul==="R" && bl==="R" && bdl==="S" && bd==="S" && bdr==="T" && br==="T" && dfl==="U" && df==="U" && dfr==="V" && dr==="V" && dbr==="W" && db==="W" && dbl==="X" && dl==="X";
}