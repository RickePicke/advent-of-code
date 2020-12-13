const fs = require("fs");
const data = fs.readFileSync("./08-x-data.txt").toString().split("\n");

const checkUsedIndex = (usedIndexes) =>
  usedIndexes.length === new Set(usedIndexes).size;

const calcNextIndex = (currIndex, change, input) => {
  const sum = currIndex + change;
  if (sum < 0) {
    return input.length - 1 - Math.abs(sum);
  }

  if (sum > input.length - 1) {
    return sum % (input.length + 1);
  }

  return sum;
};

function run(input) {
  let usedIndexes = [];
  let usedRows = [];
  let acc = 0;
  let currIndex = 0;

  while (true) {
    usedIndexes.push(currIndex);
    usedRows.push(input[currIndex]);

    if (!checkUsedIndex(usedIndexes)) {
      return { acc, currIndex };
    }

    const [type, num] = input[currIndex].split(" ");
    switch (type) {
      case "nop":
        currIndex = calcNextIndex(currIndex, 1, input);
        break;
      case "acc":
        currIndex = calcNextIndex(currIndex, 1, input);
        acc += parseInt(num);
        break;
      case "jmp":
        currIndex = calcNextIndex(currIndex, parseInt(num), input);
        break;
    }

    if (currIndex === input.length - 1) {
      return { acc, currIndex };
    }
  }
}

function start() {
  let flippedIndexes = [];
  let tries = 1;

  while (true) {
    tries += 1;
    const input = data.map((instruction, i) => {
      if (flippedIndexes.includes(i) || flippedIndexes.length === tries) {
        return instruction;
      }

      if (instruction.startsWith("jmp")) {
        flippedIndexes.push(i);
        return instruction.replace("jmp", "nop");
      }

      if (instruction.startsWith("nop")) {
        flippedIndexes.push(i);
        return instruction.replace("nop", "jmp");
      }

      return instruction;
    });

    const { acc, currIndex } = run(input);
    if (currIndex === data.length - 1) {
      return acc;
    }
  }
}

console.log(start());
