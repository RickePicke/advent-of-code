const fs = require("fs");
const data = fs.readFileSync("./15-x-data.txt").toString();

const max = 2020;

function getLastIndices(number, numbers) {
  let indices = [];
  for (let i = numbers.length; i > -1; i--) {
    if (number === numbers[i]) {
      indices = [i, ...indices];
      if (indices.length === 2) break;
    }
  }

  return indices;
}

const initialNumbers = data.split(",").map((n) => parseInt(n));
const spokenNumbers = new Array(max);
initialNumbers.forEach((number, i) => {
  spokenNumbers[i] = number;
});

for (let i = initialNumbers.length; i < max; i++) {
  const lastSpoken = spokenNumbers[i - 1];
  if (spokenNumbers.lastIndexOf(lastSpoken) === spokenNumbers.indexOf(lastSpoken)) {
    spokenNumbers[i] = 0;
  } else {
    const lastSpokenIndices = getLastIndices(lastSpoken, spokenNumbers);
    if (lastSpokenIndices.length < 2) {
      spokenNumbers[i] = 0;
    } else {
      spokenNumbers[i] =
        lastSpokenIndices[lastSpokenIndices.length - 1] -
          lastSpokenIndices[lastSpokenIndices.length - 2] || i;
    }
  }
}

console.log(spokenNumbers[max - 1]);
