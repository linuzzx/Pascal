let displayWidth = 0;
let size = 0;
let gap = 1;

function drawCube(canvas, allMoves) {
    displayWidth = $(".canvasCase").width();
    size = Math.floor(displayWidth / 5);

    const c = $(canvas)[0];
    const ctx = c.getContext("2d");
    drawScrambleArray = allMoves.split(" ");

    scrambleCube(allMoves);

    updateCube(canvas);
}

function drawCubeF2l(canvas, allMoves) {
    displayWidth = $(".canvasCase").width();
    size = Math.floor(displayWidth / 5);

    const c = $(canvas)[0];
    const ctx = c.getContext("2d");
    drawScrambleArray = allMoves.split(" ");

    scrambleCube(allMoves);

    updateCubeF2l(canvas);
}

function updateCube(canvas) {
    const c = $(canvas)[0];
    const ctx = c.getContext("2d");

    const up = [u1,u2,u3,u4,u5,u6,u7,u8,u9];
    const left = [l1,l2,l3];
    const right = [r1,r2,r3];
    const front = [f1,f2,f3];
    const back = [b1,b2,b3];

    ctx.fillStyle = "black";
    ctx.fillRect(size+gap, 0, 3*size+4*gap, 5*size+6*gap);
    ctx.fillRect(0, size+gap, 5*size+6*gap, 3*size+4*gap);

    let index = 0;
    for (let j = size+2*gap; j < 4*(size+gap); j += size+gap) {
        for (let i = size+2*gap; i < 4*(size+gap); i += size+gap) {
            ctx.fillStyle = up[index];
            ctx.fillRect(i, j, size, size);
            index++;
        }
    }
    index = back.length-1;
    for (let i = size+2*gap; i < 4*(size+gap); i += size+gap) {
        ctx.fillStyle = back[index];
        ctx.fillRect(i, gap, size, size);
        index--;
    }
    index = 0;
    for (let i = size+2*gap; i < 4*(size+gap); i += size+gap) {
        ctx.fillStyle = front[index];
        ctx.fillRect(i, 4*size+5*gap, size, size);
        index++;
    }
    index = 0;
    for (let j = size+2*gap; j < 4*(size+gap); j += size+gap) {
        ctx.fillStyle = left[index];
        ctx.fillRect(gap, j, size, size);
        index++;
    }
    index = right.length-1;
    for (let j = size+2*gap; j < 4*(size+gap); j += size+gap) {
        ctx.fillStyle = right[index];
        ctx.fillRect(4*size+5*gap, j, size, size);
        index--;
    }
}

function updateCubeF2l(canvas) {
    const c = $(canvas)[0];
    const ctx = c.getContext("2d");

    const up = [u1,u2,u3,u4,u5,u6,u7,u8,u9];
    const left = [l1,l2,l3];
    const right = [r1,r2,r3];
    const right2 = [r4,r7];
    const front = [f1,f2,f3,f4,f5,f6,f7,f8,f9];
    const back = [b1,b2,b3];
    const down = [d1,d2,d3];

    ctx.fillStyle = "black";
    ctx.fillRect(size+gap, 0, 3*size+4*gap, 5*size+6*gap);
    ctx.fillRect(0, size+gap, 5*size+6*gap, 3*size+4*gap);
    ctx.fillRect(size+gap, 5*size+5*gap, 5*size+6*gap, 2*size+3*gap);

    let index = 0;
    for (let j = size+2*gap; j < 4*(size+gap); j += size+gap) {
        for (let i = size+2*gap; i < 4*(size+gap); i += size+gap) {
            ctx.fillStyle = up[index];
            ctx.fillRect(i, j, size, size);
            index++;
        }
    }
    index = back.length-1;
    for (let i = size+2*gap; i < 4*(size+gap); i += size+gap) {
        ctx.fillStyle = back[index];
        ctx.fillRect(i, gap, size, size);
        index--;
    }
    index = 0;
    for (let j = 4*size+5*gap; j < 7*(size+gap); j += size+gap) {
        for (let i = size+2*gap; i < 4*(size+gap); i += size+gap) {
            ctx.fillStyle = front[index];
            ctx.fillRect(i, j, size, size);
            index++;
        }
    }
    index = 0;
    for (let j = size+2*gap; j < 4*(size+gap); j += size+gap) {
        ctx.fillStyle = left[index];
        ctx.fillRect(gap, j, size, size);
        index++;
    }
    index = right.length-1;
    for (let j = size+2*gap; j < 4*(size+gap); j += size+gap) {
        ctx.fillStyle = right[index];
        ctx.fillRect(4*size+5*gap, j, size, size);
        index--;
    }
    index = 0;
    for (let j = 5*size+6*gap; j < 7*(size+gap); j += size+gap) {
        ctx.fillStyle = right2[index];
        ctx.fillRect(4*size+5*gap, j, size, size);
        index++;
    }
}