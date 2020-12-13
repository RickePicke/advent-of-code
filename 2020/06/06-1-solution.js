
const fs = require("fs");
const data = fs.readFileSync("./06-x-data.txt");

const parseLine = line => line
  .replace(/\n/g, "")
  .split('')
  .reduce((acc, curr) => acc.includes(curr) ? acc : [ ...acc, curr ], [])
  .length

const result = data
  .toString()
  .split("\n\n")
  .reduce((acc, curr) => acc + parseLine(curr), 0)

console.log(result);