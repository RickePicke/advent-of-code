const data = require("./01-x-data");

const [num1, num2, num3] = data.reduce((acc1, curr1, i, list1) => {
  if (acc1) {
    return acc1;
  }

  return list1.slice(i + 1).reduce((acc2, curr2, j, list2) => {
    if (acc2) {
      return acc2;
    }

    return list2.slice(j + 1).reduce((acc3, curr3) => {
      if (acc3) {
        return acc3;
      }

      return curr1 + curr2 + curr3 === 2020 ? [curr1, curr2, curr3] : null;
    }, null);
  }, null);
}, null);

console.log({ num1, num2, num3, result: num1 * num2 * num3});
