const data = require("./05-x-data");

const getHalfByLetter = (list, letter) => {
  const half = Math.ceil(list.length / 2);
  switch (letter) {
    case "F":
    case "L":
      return list.splice(0, half);
    case "B":
    case "R":
      return list.slice(-half);
  }
};

const { highestSeatId, allIds } = data.reduce(
  (acc, [rowData, columnData]) => {
    const [row] = rowData
      .split("")
      .reduce(getHalfByLetter, Array.from(Array(128).keys()));

    const [column] = columnData
      .split("")
      .reduce(getHalfByLetter, Array.from(Array(8).keys()));

    const sum = row * 8 + column;
    return {
      highestSeatId: sum >= acc.highestSeatId ? sum : acc.highestSeatId,
      allIds: [...acc.allIds, sum].sort((a, b) => b - a),
    };
  },
  { allIds: [], highestSeatId: 0 }
);

console.log({ allIds });
console.log({ highestSeatId });
