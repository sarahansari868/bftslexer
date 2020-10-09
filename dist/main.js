"use strict";
var fs = require("fs");
var path = require("path");
var SPACE_BUFFER = 50000;
var space = new Uint8Array(SPACE_BUFFER);
var brainFuckGrammar = /[<>\[\].,+-]/g;
var file = "bfinput.bf";
fs.readFile(path.join(__dirname, file), function (err, content) {
    if (err) {
        console.log(err);
    }
    main(content.toString());
});
function main(bfProgram) {
    var parsedInput = bfProgram.match(brainFuckGrammar);
    lex(parsedInput);
}
function lex(bfSymbols) {
    var loop_initializer = 0;
    var programStacks = [];
    var current_position = 0;
    while (loop_initializer != (bfSymbols === null || bfSymbols === void 0 ? void 0 : bfSymbols.length)) {
        var symbol = "";
        if (bfSymbols === null || bfSymbols === void 0 ? void 0 : bfSymbols.length) {
            symbol = bfSymbols[loop_initializer];
        }
        switch (symbol) {
            case "+":
                space[current_position]++;
                break;
            case "-":
                space[current_position]--;
                break;
            case ".":
                process.stdout.write(String.fromCharCode(space[current_position]));
                break;
            case ",":
                break;
            case ">":
                current_position++;
                break;
            case "<":
                current_position--;
                break;
            case "[":
                if (space[current_position]) {
                    programStacks.push(loop_initializer);
                }
                else {
                    if (bfSymbols)
                        while (bfSymbols[loop_initializer] != "]") {
                            loop_initializer++;
                        }
                }
                break;
            case "]":
                if (space[current_position]) {
                    var pos = programStacks.pop();
                    loop_initializer = pos;
                    continue;
                }
                break;
            default:
                break;
        }
        loop_initializer++;
    }
}
//# sourceMappingURL=main.js.map