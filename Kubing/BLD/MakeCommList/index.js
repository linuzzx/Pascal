let targets = [];
let comms = [];

$(function() {
    $("#letterPair").html("<button class='btn btn-secondary' onclick='start()'>Start</button>");
    adjustSize();
    
    $("#inputImage").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            checkImage();
        }
    });
});
        
$(window).resize(function(){
    adjustSize();
});

function lesData(files) {
    let val = $("#tableType").val();
    
    readXlsxFile(files[0]).then(data => {
        if (val === "horizontal") {
            skrivDataHorizontal(data);
        }
        else if (val === "vertical") {
            skrivDataVertical(data);
        }

        // alert("Successfully imported excel sheet!");

        $("#taTargets").val(targets.join("\n"));
        $("#taComms").val(comms.join("\n"));

        $("#tableType").val("select");
    });
}

function skrivDataHorizontal(data) {
    let lettersH = [];
    let lettersV = [];

    for (let i=1; i<data[0].length; i++) {
        lettersH.push(data[0][i]);
    }
    for (let j=1; j<data.length; j++) {
        lettersV.push(data[j][0]);
    }
    for (let v of lettersV) {
        for (let h of lettersH) {
            if (h !== v) {
                targets.push(v + "_" + h);
            }
        }
    }

    for (let j=0; j<data.length; j++) {
        for (let i=0; i< data[j].length; i++) {
            if (j !== 0 && i !== 0 && j !== i) {
                comms.push(data[j][i]);
            }
        }
    }
}

function skrivDataVertical(data) {
    let lettersH = [];
    let lettersV = [];

    for (let i=1; i<data[0].length; i++) {
        lettersH.push(data[0][i]);
    }
    for (let j=1; j<data.length; j++) {
        lettersV.push(data[j][0]);
    }
    for (let h of lettersH) {
        for (let v of lettersV) {
            if (h !== v) {
                targets.push(h + "_" + v);
            }
        }
    }

    for (let j=0; j<data.length; j++) {
        for (let i=0; i< data[j].length; i++) {
            if (j !== 0 && i !== 0 && j !== i) {
                comms.push(data[i][j]);
            }
        }
    }
}

function showLetterPairEdit() {
    $("#letterPairEdit").css("display", "block");
    adjustSize();
}

function closeLetterPairEdit() {
    $("#letterPairEdit").css("display", "none");
}

function toggleImport(val) {
    if (val !== "select") {
        $("#fileInput").prop('disabled', false);
    }
    else {
        $("#fileInput").prop('disabled', true);
    }
}

function adjustSize() {
    const inpFontSize = $("#btnHelp").css("font-size").split("px")[0];
    const fontSize = ($("#toolbar").css("font-size").split("px")[0] * 0.75)

    $("#inputImage").css("font-size", fontSize);

    $("img").css("width", $("#innerLetterPairEdit").width() * 0.8);
    $("#inputImage").css("width", "30%");
    $("#inputImage").css("margin", "auto");
    $("#tableType").css("font-size", inpFontSize*1.5);
    $("label").css("font-size", inpFontSize);
}