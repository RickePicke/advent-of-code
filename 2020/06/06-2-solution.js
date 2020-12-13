const fs = require("fs");
const data = fs.readFileSync("./06-x-data.txt");

const parseLine = line => line
  .replace(/\n/g, " ")
  .split(' ')
  .reduce((acc, curr, i, list) => i !== list.length - 1 ? (acc + curr) : (acc + curr)
    .split('')
    .sort()
    .join('')
    .match(/((\w)\2*)/g)
    .filter(answers => answers.length === list.length)
    .length, '')

const result = data
  .toString()
  .split("\n\n")
  .reduce((acc, curr) => acc + parseLine(curr), 0)

console.log(result);