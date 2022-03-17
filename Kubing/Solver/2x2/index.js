let cube2x2 = "wwwwooooggggrrrrbbbbyyyy".split("");

function solve2x2(scrambledCube) {

}

function resetCubeState() {
    cube2x2 = "wwwwooooggggrrrrbbbbyyyy".split("");
}

function moveR() {
    let tempCube = cube2x2.slice();

    //Right slice
    tempCube[1] = cube2x2[9];
    tempCube[2] = cube2x2[10];
    tempCube[9] = cube2x2[21];
    tempCube[10] = cube2x2[22];
    tempCube[21] = cube2x2[19];
    tempCube[22] = cube2x2[16];
    tempCube[19] = cube2x2[1];
    tempCube[16] = cube2x2[2];
    //Right side
    tempCube[12] = cube2x2[15];
    tempCube[13] = cube2x2[12];
    tempCube[14] = cube2x2[13];
    tempCube[15] = cube2x2[14];

    cube2x2 = tempCube.slice();

    printNiceCube()
}

function printNiceCube() {
    let niceCube = "&nbsp;&nbsp;" + cube2x2[0] + cube2x2[1] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[3] + cube2x2[2] + "<br/>" +
                    cube2x2[4] + cube2x2[5] + cube2x2[8] + cube2x2[9] + cube2x2[12] + cube2x2[13] + cube2x2[16] + cube2x2[17] + "<br/>" +
                    cube2x2[7] + cube2x2[6] + cube2x2[11] + cube2x2[10] + cube2x2[15] + cube2x2[14] + cube2x2[19] + cube2x2[18] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[20] + cube2x2[21] + "<br/>" +
                    "&nbsp;&nbsp;" + cube2x2[23] + cube2x2[22];

    $("html").html(niceCube);
}

printNiceCube()