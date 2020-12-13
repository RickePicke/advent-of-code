const fs = require("fs");
const data = fs
  .readFileSync("./10-x-data.txt")
  .toString()
  .split("\n")
  .map((num) => parseInt(num))
  .sort((a, b) => a - b);
  
const dataWithMinAndMax = [ 0, ...data, Math.max(...data) + 3 ];

const calcAdapterJoltage = ({ jolt1, jolt2, jolt3, currJolt, adapters, i }) => {
  const nextJolt = adapters[0];
  const diff = nextJolt - currJolt;

  const acc = {
    i: i + 1,
    adapters: adapters.slice(1),
    currJolt: nextJolt,
    jolt1: diff === 1 ? jolt1 + 1 : jolt1,
    jolt2: diff === 2 ? jolt2 + 1 : jolt2,
    jolt3: diff === 3 ? jolt3 + 1 : jolt3,
  };

  return diff <= 3 || i < dataWithMinAndMax.length - 1
    ? calcAdapterJoltage(acc)
    : acc;
};

const initAcc = { adapters: dataWithMinAndMax, i: 0, currJolt: 0, jolt1: 0, jolt2: 0, jolt3: 0 };
const { jolt1, jolt3 } = calcAdapterJoltage(initAcc);

console.log(jolt1 * jolt3);
