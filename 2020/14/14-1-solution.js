const fs = require("fs");
const data = fs.readFileSync("./14-x-data.txt").toString().split("\n");

function to36BitString(val) {
  return parseInt(val).toString(2).padStart(36, 0);
}

function bitToString(bitString) {
  return parseInt(bitString, 2);
}

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

const mem = [];
let mask = "";

data.forEach((row) => {
  const [, newMask] = row.match(/^mask\s=\s((\d|X).+)$/) || [];
  if (newMask) {
    mask = newMask
      .split("")
      .reduce((acc, val, i) => (val !== "X" ? [...acc, { i, val }] : acc), []);
  }

  const [, index, value] = row.match(/^mem\[(\d.*)\]\s=\s(\d.*)$/) || [];
  if (index && value) {
    mem[index] = mask.reduce((acc, { i, val }) => {
      return acc.replaceAt(i, val);
    }, to36BitString(value));
  }
});

const sum = mem.reduce((acc, curr) => {
  return curr ? acc + bitToString(curr) : acc;
}, 0);

console.log(sum);
