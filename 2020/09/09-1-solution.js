const fs = require("fs");
const data = fs
  .readFileSync("./09-x-data.txt")
  .toString()
  .split("\n")
  .map((num) => parseInt(num));

const preambleLength = 25;

const calcSums = (nums, curr) =>
  nums
    .filter((num) => num <= curr)
    .reduce(
      (acc, curr, i, list) =>
        list.slice(i + 1).reduce((nums, num) => [...nums, num + curr], acc),
      []
    );

const res = data.slice(preambleLength).reduce((acc, curr, i) => {
  const sums = calcSums(data.slice(i, preambleLength + i), curr);
  return acc || (sums.includes(curr) ? acc : curr);
}, null);

console.log(res);
