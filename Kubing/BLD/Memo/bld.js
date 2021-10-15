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

let bufferE = 0;
let bufferOppE = 0;
let bufferC = 0;
let bufferCWC = 0;
let bufferCCWC = 0;

$(function() {
    
});

function scrambleCube() {
    cubeState = applyMoves("U D2 R2 D2 L R U' B U' B' D L U R' L2 D F2 L2 F' U D'");
    //cubeState = applyMoves(getScramble());
}

function getEdgeSolution() {
    let solution = [];
    let unsolved = edges.slice(0);
    let flipped = [];

    edgeState = getEdgeStateBLD();
    bufferE = 20; //Setter buffer til DF //const bufferE = 2; //Setter buffer til UF
    bufferOppE = 10; //Setter bufferOpp til FD //const bufferOppE = 8; //Setter bufferOpp til FU

    let buffer = edgeState[bufferE];//DF
    let target = "";
    
    //Remove buffer piece from unsolved
    unsolved.splice(unsolved.indexOf(edges[bufferE]),1);
    unsolved.splice(unsolved.indexOf(edges[bufferOppE]),1);
    
    //Remove solved edges
    removeSolvedEdges(unsolved);

    //Get flipped edges
    getFlipped(flipped, unsolved);
    
    while (unsolved.length !== 0) {
        //Make new buffer
        buffer = edgeState[bufferE];

        //If buffer is bufferpiece
        if (buffer === edges[bufferE] || buffer === edges[bufferOppE]) {
            edgeState[bufferE] = unsolved[0];
            edgeState[bufferOppE] = unsolved[0].split("")[1]+unsolved[0].split("")[0];

            edgeState[edges.indexOf(unsolved[0])] = buffer;
            edgeState[edges.indexOf(unsolved[0].split("")[1]+unsolved[0].split("")[0])] = buffer.split("")[1]+buffer.split("")[0];

            buffer = unsolved[0];
        }

        //Make target
        target = edgeState[edges.indexOf(buffer)];
        
        //Add buffer to solution
        solution.push(buffer);
        
        //Remove buffer from unsolved
        let toRemove = [];
            
        for (let u of unsolved) {
            //Removes every orientation of target from unsolved
            if (u.includes(buffer.split("")[0]) && u.includes(buffer.split("")[1])) {
                toRemove.push(u);
            }
        }
        if (toRemove.length !== 0) {
            for (let i=toRemove.length-1; i>=0; i--) {
                unsolved.splice(unsolved.indexOf(toRemove[i]),1);
            }
        }

        //Swap buffer and target
        edgeState[bufferE] = target;
        edgeState[bufferOppE] = target.split("")[1]+target.split("")[0];

        edgeState[edges.indexOf(buffer)] = buffer;
        edgeState[edges.indexOf(buffer.split("")[1]+buffer.split("")[0])] = buffer.split("")[1]+buffer.split("")[0];
    }

    let sol = [];

    for (let s of solution) {
        sol.push(letterSchemeEdges[edges.indexOf(s)]);
    }

    if (flipped.length !== 0) {
        sol.push(";");
    }

    for (let f of flipped) {
        sol.push("("+letterSchemeEdges[edges.indexOf(f)]+")");
    }
    return sol;
}

//Fiks
function getCornerSolution() {
    let solution = [];
    let unsolved = corners.slice(0);
    let twisted = [];

    cornerState = getCornerStateBLD();
    bufferC = 0; //Setter bufferC til UBL //bufferC = 2; //Setter bufferC til UFR
    bufferCWC = 4; //Setter bufferCWC til LUB //bufferCWC = 12; //Setter bufferCWC til RUF
    bufferCCWC = 17; //Setter bufferCCWC til BUL //bufferCCWC = 9; //Setter bufferCCWC til FUR

    let buffer = cornerState[bufferC];//UFR
    let target = "";
    
    //Remove buffer piece from unsolved
    unsolved.splice(unsolved.indexOf(corners[bufferC]),1);
    unsolved.splice(unsolved.indexOf(corners[bufferCWC]),1);
    unsolved.splice(unsolved.indexOf(corners[bufferCCWC]),1);
    
    //Remove solved corners
    removeSolvedCorners(unsolved);

    //Get twisted corners
    getTwisted(twisted, unsolved);
    
    while (unsolved.length !== 0) {
        //Make new buffer
        buffer = cornerState[bufferC];

        //If buffer is bufferpiece
        if (buffer === corners[bufferC] || buffer === corners[bufferCWC] || buffer === corners[bufferCCWC]) {
            cornerState[bufferC] = unsolved[0];
            cornerState[bufferCWC] = unsolved[0].split("")[2]+unsolved[0].split("")[0]+unsolved[0].split("")[1];
            cornerState[bufferCCWC] = unsolved[0].split("")[1]+unsolved[0].split("")[2]+unsolved[0].split("")[0];
            
            cornerState[corners.indexOf(unsolved[0])] = buffer;
            cornerState[corners.indexOf(unsolved[0].split("")[2]+unsolved[0].split("")[0]+unsolved[0].split("")[1])] = buffer.split("")[2]+buffer.split("")[0]+buffer.split("")[1];
            cornerState[corners.indexOf(unsolved[0].split("")[1]+unsolved[0].split("")[2]+unsolved[0].split("")[0])] = buffer.split("")[1]+buffer.split("")[2]+buffer.split("")[0];

            buffer = unsolved[0];
        }

        //Make target
        target = cornerState[corners.indexOf(buffer)];
        
        //Add buffer to solution
        solution.push(buffer);
        
        //Remove buffer from unsolved
        let toRemove = [];
            
        for (let u of unsolved) {
            //Removes every orientation of target from unsolved
            if (u.includes(buffer.split("")[0]) && u.includes(buffer.split("")[1]) && u.includes(buffer.split("")[2])) {
                toRemove.push(u);
            }
        }
        if (toRemove.length !== 0) {
            for (let i=toRemove.length-1; i>=0; i--) {
                unsolved.splice(unsolved.indexOf(toRemove[i]),1);
            }
        }

        //Swap buffer and target
        cornerState[bufferC] = target;
        cornerState[bufferCWC] = target.split("")[2]+target.split("")[0]+target.split("")[1];
        cornerState[bufferCCWC] = target.split("")[1]+target.split("")[2]+target.split("")[0];
        
        cornerState[corners.indexOf(buffer)] = buffer;
        cornerState[corners.indexOf(buffer.split("")[2]+buffer.split("")[0]+buffer.split("")[1])] = buffer.split("")[2]+buffer.split("")[0]+buffer.split("")[1];
        cornerState[corners.indexOf(buffer.split("")[1]+buffer.split("")[2]+buffer.split("")[0])] = buffer.split("")[1]+buffer.split("")[2]+buffer.split("")[0];
    }
    /*let buffer = corners[bufferC];
    let target = "";
    
    //Remove buffer piece from unsolved
    unsolved.splice(unsolved.indexOf(corners[bufferC]),1);
    unsolved.splice(unsolved.indexOf(corners[bufferCWC]),1);
    unsolved.splice(unsolved.indexOf(corners[bufferCCWC]),1);    

    //Remove solved corners
    removeSolvedCorners(unsolved);
    //Get twisted corners
    getTwisted(twisted, unsolved);

    while (unsolved.length !== 0) {
        //Make target
        target = cornerState[corners.indexOf(buffer)];
        cycleBreak = false;

        //If target is bufferpiece
        if (target === corners[bufferC] || target === corners[bufferCWC] || target === corners[bufferCCWC]) {
            target = unsolved[0];
            cycleBreak = true;
        }
        
        //Add target to solution
        solution.push(target);
        
        //Remove target from unsolved
        if (!cycleBreak) {
            let toRemove = [];
            
            for (let u of unsolved) {
                //Removes every orientation of target from unsolved
                if (u.includes(target.split("")[0]) && u.includes(target.split("")[1]) && u.includes(target.split("")[2])) {
                    toRemove.push(u);
                }
            }
            if (toRemove.length !== 0) {
                for (let i=toRemove.length-1; i>=0; i--) {
                    unsolved.splice(unsolved.indexOf(toRemove[i]),1);
                }
            }
        }

        //Make new buffer
        buffer = target;
    }*/

    let sol = [];

    for (let s of solution) {
        sol.push(letterSchemeCorners[corners.indexOf(s)].toLowerCase());
    }

    if (twisted.length !== 0) {
        sol.push(";");
    }

    for (let t of twisted) {
        sol.push("("+letterSchemeCorners[corners.indexOf(t)].toLowerCase()+")");
    }
    return sol;
}

function removeSolvedEdges(unsolved) {
    let toRemove = [];
    
    for (let i=0; i<edgeState.length; i++) {
        if (edgeState[i] === edges[i]) {
            toRemove.push(edges[i]);
        }
    }
    
    if (toRemove.length !== 0) {
        for (let i=toRemove.length-1; i>=0; i--) {
            unsolved.splice(unsolved.indexOf(toRemove[i]),1);
        }
    }
}

function getFlipped(flipped, unsolved) {
    //Find all flipped edges
    for (let i=0; i<edgeState.length; i++) {
        let fp = edges[i].split("")[1] + edges[i].split("")[0];
        if (edgeState[i] === fp && i !== bufferE && i !== bufferOppE) {
            flipped.push(fp);
        }
    }

    //Remove flipped from unsolved
    for (let f of flipped) {
        unsolved.splice(unsolved.indexOf(f),1);
    }

    //Reduce flipped edges
    for (let e of ["ub","ur","uf","ul","fr","fl","bl","br","df","dr","db","dl"]) {
        let index = flipped.indexOf(e);
        if (index !== -1) {
            flipped.splice(flipped.indexOf(e.split("")[1]+e.split("")[0]), 1);
        }
    }
}

//Fiks
function removeSolvedCorners(unsolved) {
    let toRemove = [];
    
    for (let i=0; i<cornerState.length; i++) {
        if (cornerState[i] === corners[i]) {
            toRemove.push(corners[i]);
        }
    }
    
    if (toRemove.length !== 0) {
        for (let i=toRemove.length-1; i>=0; i--) {
            unsolved.splice(unsolved.indexOf(toRemove[i]),1);
        }
    }
}

//Fiks
function getTwisted(twisted, unsolved) {
    //Find all twisted corners
    for (let i=0; i<cornerState.length; i++) {
        if (cornerState[i].includes(corners[i].split("")[0]) && 
            cornerState[i].includes(corners[i].split("")[1]) && 
            cornerState[i].includes(corners[i].split("")[2]) &&
            cornerState[i] !== corners[i] && 
            i !== bufferC && i !== bufferCWC && i !== bufferCCWC) {
            twisted.push(cornerState[i]);
        }
    }

    //Remove twisted from unsolved
    for (let t of twisted) {
        unsolved.splice(unsolved.indexOf(t),1);
    }

    //Reduce twisted corners
    for (let c of ["ubl","ubr","ufr","ufl","dfl","dfr","dbr","dbl"]) {
        let index = twisted.indexOf(c);
        if (index !== -1) {
            twisted.splice(twisted.indexOf(c.split("")[2]+c.split("")[0]+c.split("")[1]), 1);
            twisted.splice(twisted.indexOf(c.split("")[1]+c.split("")[2]+c.split("")[0]), 1);
            /*switch (c) {
                case "ubl":
                    twisted.splice(twisted.indexOf("bul"), 1);
                    twisted.splice(twisted.indexOf("lub"), 1);
                    break;
                case "ubr":
                    twisted.splice(twisted.indexOf("bur"), 1);
                    twisted.splice(twisted.indexOf("rub"), 1);
                    break;
                case "ufr":
                    twisted.splice(twisted.indexOf("ruf"), 1);
                    twisted.splice(twisted.indexOf("fur"), 1);
                    break;
                case "ufl":
                    twisted.splice(twisted.indexOf("ful"), 1);
                    twisted.splice(twisted.indexOf("luf"), 1);
                    break;
                case "dfl":
                    twisted.splice(twisted.indexOf("fdl"), 1);
                    twisted.splice(twisted.indexOf("ldf"), 1);
                    break;
                case "dfr":
                    twisted.splice(twisted.indexOf("rdf"), 1);
                    twisted.splice(twisted.indexOf("fdr"), 1);
                    break;
                case "dbr":
                    twisted.splice(twisted.indexOf("bdr"), 1);
                    twisted.splice(twisted.indexOf("rdb"), 1);
                    break;
                case "dbl":
                    twisted.splice(twisted.indexOf("bdl"), 1);
                    twisted.splice(twisted.indexOf("ldb"), 1);
                    break;
            }*/
        }
    }
}