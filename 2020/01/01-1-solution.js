const data = require("./01-x-data");

const [num1, num2] = data.reduce((acc, curr, i, list) => {
  if (acc) {
    return acc;
  }

  return list.slice(i + 1).reduce((res, num) => {
    return res ? res : curr + num === 2020 ? [curr, num] : null;
  }, null);
}, null);

console.log({ num1, num2, result: num1 * num2});
