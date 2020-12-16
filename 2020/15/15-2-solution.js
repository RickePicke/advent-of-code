const fs = require("fs");
const data = fs.readFileSync("./15-x-data.txt").toString();
const max = 30000000;

const initialNumbers = data.split(",").map((n) => parseInt(n));
const spokenNumbers = new Array(max);

initialNumbers.forEach((number, i) => {
  spokenNumbers[number] = i;
});

let lastSpoken = spokenNumbers[initialNumbers[initialNumbers.length - 1]];
for (let i = initialNumbers.length - 1; i < max - 1; i++) {
  const numberLastSpokenIndex = spokenNumbers[lastSpoken];
  const next =
    numberLastSpokenIndex !== undefined ? i - numberLastSpokenIndex : 0;
  spokenNumbers[lastSpoken] = i;
  lastSpoken = next;
}

console.log(lastSpoken);
