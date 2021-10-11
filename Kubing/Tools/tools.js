function scrambleMaker() {
    scramble = "";
    var trekkArray = ["R", "L", "F", "B", "U", "D"];
    var tilleggArray = ["", "'", "2"];
    var antallTrekkArray = [19, 20, 21];
    var antallTrekk = antallTrekkArray[Math.floor(Math.random() * antallTrekkArray.length)];
    var scrambleArray = [];

    for (var i=0; i<antallTrekk; i++) {
        if (scrambleArray.length < 1) { //Sjekker om array er tomt
            scrambleArray[i] = trekkArray[Math.floor(Math.random() * trekkArray.length)];
        }
        else if (scrambleArray.length >= 1) {
            var like = true;
            while (like === true) {
                var trekk1 = trekkArray[Math.floor(Math.random() * trekkArray.length)];
                scrambleArray[i] = trekk1;

                if (scrambleArray[i] === trekkArray[0]) {        //R
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[1]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[0]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[1]) {   //L
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[0]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[1]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[2]) {   //F
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[3]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[2]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[3]) {   //B
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[2]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[3]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[4]) {   //U
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[5]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[4]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
                else if (scrambleArray[i] === trekkArray[5]) {   //D
                    if (scrambleArray[i] === scrambleArray[i-1]) {   //Sjekker om trekket er likt det forrige
                        i--;
                        scrambleArray[i] = trekk1;
                    }
                    else if (scrambleArray[i-1] === trekkArray[4]) {   //Sjekker om trekket er motsatt av forrige
                        if (scrambleArray[i-2] === trekkArray[5]) {  //Sjekker om trekket er det samme som forrige forrige
                            i--;
                            scrambleArray[i] = trekk1;
                        }
                        else {
                            like = false;
                        }
                    }
                    else {
                        like = false;
                    }
                }
            }
        }
    }

    for (var j=0; j<scrambleArray.length; j++) {
        scramble += scrambleArray[j] + tilleggArray[Math.floor(Math.random() * tilleggArray.length)] + " ";
    }

    return scramble;
}