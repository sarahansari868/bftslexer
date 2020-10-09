const fs = require("fs");
const path = require("path");

const SPACE_BUFFER: number = 50000;
const space: Uint8Array = new Uint8Array(SPACE_BUFFER);

const brainFuckGrammar: RegExp = /[<>\[\].,+-]/g;

const file: string = "bfinput.bf";

fs.readFile(path.join(__dirname, file), (err:Error, content:string) => {
  if(err) {
    console.log(err);
  }
  main(content.toString())
});

function main(bfProgram: string): void {
  let parsedInput:RegExpMatchArray | null = bfProgram.match(brainFuckGrammar);
  lex(parsedInput);
}

function lex(bfSymbols: RegExpMatchArray | null) {
  let loop_initializer: number | any = 0;
  let programStacks = [];
  let current_position = 0;
  while (loop_initializer != bfSymbols?.length) {
    let symbol:string = "";
    if(bfSymbols?.length) {
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
        } else {
          if(bfSymbols)
          while (bfSymbols[loop_initializer] != "]") {
            loop_initializer++;
          }
        }
        break;
      case "]":
        if (space[current_position]) {
          let pos = programStacks.pop();
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

