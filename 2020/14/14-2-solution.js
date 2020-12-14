const fs = require("fs");
const data = fs.readFileSync("./14-x-data.txt").toString().split("\n");

function to36BitString(val) {
  return parseInt(val).toString(2).padStart(36, 0);
}

function bitToInt(bitString) {
  return parseInt(bitString, 2);
}

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

const mem = {};
let mask = "";

data.forEach((row) => {
  const [, newMask] = row.match(/^mask\s=\s((\d|X).+)$/) || [];
  if (newMask) {
    mask = newMask
      .split("")
      .reduce((acc, val, i) => (val !== "0" ? [...acc, { i, val }] : acc), []);
  }

  const [, index, value] = row.match(/^mem\[(\d.*)\]\s=\s(\d.*)$/) || [];
  if (index) {
    const memoryBit = mask.reduce(
      (acc, { i, val }) => acc.replaceAt(i, val),
      to36BitString(index)
    );

    resolveMemoryAddresses(memoryBit)
      .map(bitToInt)
      .forEach((x) => (mem[x] = parseInt(value)));
  }
});

function resolveMemoryAddresses(bitString) {
  return bitString.split("").reduce(
    (acc, val, index) => {
      if (val !== "X") {
        return acc;
      }

      return acc.reduce(
        (allBits, bit) => [
          ...allBits,
          ...[0, 1].map((x) => bit.replaceAt(index, x.toString())),
        ],
        []
      );
    },
    [bitString]
  );
}

const sum = Object.keys(mem).reduce((acc, key) => acc + mem[key], 0);
console.log(sum);
