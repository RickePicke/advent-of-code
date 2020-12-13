const fs = require("fs");
const { start } = require("repl");
const data = fs
  .readFileSync("./10-x-data.txt")
  .toString()
  .split("\n")
  .map((num) => parseInt(num))
  .sort((a, b) => a - b);

const countValidVariations = function (inputNumbers) {
  const subLists = splitOnGaps([0, ...inputNumbers], 3);
  return subLists
    .map((list) => {
      const x = helper(list);
      return x;
    })
    .reduce((total, next) => total * next, 1);

  function helper([x, ...xs], startAt = -3) {
    if (xs.length === 0) {
      return 1;
    }
    if (x >= startAt + 3) {
      return helper(xs, x);
    } else {
      return helper(xs, x) + helper(xs, startAt);
    }
  }
};

function splitOnGaps(inputNumbers, gap) {
  const subLists = [];
  let lastNumber = -gap;
  for (const number of inputNumbers) {
    if (number - lastNumber >= gap) {
      subLists.push([]);
    }
    subLists[subLists.length - 1].push(number);
    lastNumber = number;
  }
  return subLists;
}

console.log(countValidVariations(data));
