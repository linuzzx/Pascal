let cells = new Array(30000).fill(0);
let pointer = 0;
let commands = ["<",">","+","-","[","]",",","."];
let inputs = [];
let commas = 0;

function runCode(code) {
    inputs = [];
    commas = code.split("").filter(c => c === ",").length;
    let loopStarts = code.split("").filter(c => c === "[");
    let loopEnds = code.split("").filter(c => c === "]");
    $("#output").css("color","black");
    $("#output").val("");

    if (loopStarts.length !== loopEnds.length) {
        $("#output").val("Syntax error");
        $("#output").css("color","red");
    }
    else if (commas === 0) {
        execCode(code);
    }
    else {
        getInput();
    }
}

function execCode(code) {
    cells = new Array(30000).fill(0);
    let cleanCode = code.split("").filter(c => commands.includes(c));
    let output = "";

    for (let i = 0; i < cleanCode.length; i++) {
        c = cleanCode[i];
        switch (c) {
            case "<":
                pointer !== 0 ? pointer-- : pointer = cells.length - 1;
                break;
            case ">":
                pointer !== cells.length - 1 ? pointer++ : pointer = 0;
                break;
            case "+":
                cells[pointer] !== 255 ? cells[pointer]++ : cells[pointer] = 0;
                break;
            case "-":
                cells[pointer] !== 0 ? cells[pointer]-- : cells[pointer] = 255;
                break;
            case "[":
                break;
            case "]":
                break;
            case ",":
                cells[pointer] = inputs.shift();
                break;
            case ".":
                output+= String.fromCharCode(cells[pointer]);
                break;
        }
    }

    $("#output").val(output);
    $("#output").css("color","black");
}

function getInput() {
    if (inputs.length !== commas) {
        $("#btnRun").prop("disabled",true);
        $("#output").attr("placeholder","Waiting for user input...");
        $("#output").removeAttr("readonly");
        $("#output").attr("maxLength","1");

        $("#output").focus();
        $("#output").on("input",function() {
            let c = $("#output").val();
            if (c !== "") {
                $("#output").prop("readonly", true);
                $("#output").removeAttr("maxLength");
                $("#output").removeAttr("placeholder");
                $("#output").off("input");
                $("#output").val("");
                
                inputs.push(c.charCodeAt(0) ? c.charCodeAt(0) : 0);
                getInput();
            }
        });
    }
    else {
        $("#btnRun").prop("disabled",false);
        execCode($("#input").val());
    }
}