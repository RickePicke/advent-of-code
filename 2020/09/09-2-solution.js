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

const firstInvalid = data.slice(preambleLength).reduce((acc, curr, i) => {
  const sums = calcSums(data.slice(i, preambleLength + i), curr);
  return acc || (sums.includes(curr) ? acc : curr);
}, null);

const findWeakness = (firstInvalid, startIndex) => {
  let nums = [];
  let i = startIndex;

  while (true) {
    if (i > data.length) {
      return null;
    }
    nums.push(data[i]);
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    if (
      nums.length > 1 &&
      nums.reduce((acc, curr) => acc + curr) === firstInvalid
    ) {
      nums.sort();
      return nums[0] + nums[nums.length - 1];
    }
    if (sum > firstInvalid) {
      return null;
    }
    i++;
  }
};

let tries = 0;
while (true) {
  if (tries >= data.length) {
    return;
  }
  const weakness = findWeakness(firstInvalid, tries);
  if (weakness) {
    console.log(weakness);
    return;
  }

  tries++;
}
