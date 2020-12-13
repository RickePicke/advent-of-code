const fs = require("fs");
const arrays = require("../utils/arrays");
const data = fs.readFileSync("./11-x-data.txt").toString().split("\n");

const calcNextSeat = (rows) => (seat, i) => {
  switch (seat) {
    case "L":
      return !getAdjacent("#").length ? "#" : seat;
    case "#":
      return getAdjacent("#").length >= 4 ? "L" : seat;
    default:
      return seat;
  }

  function getAdjacent(type) {
    const adjecentSeats = [0, 1, 2].reduce((acc, n) => {
      const rowFrag =
        n === 1
          ? (rows[n][i - 1] || "") + (rows[n][i + 1] || "")
          : rows[n].substring(i - 1, i + 2);

      return acc + rowFrag;
    }, "");
    return (adjecentSeats.match(new RegExp(type, "g")) || []).join("");
  }
};

const calcNextRow = (rowAbove, currRow, rowBelow) => {
  return currRow
    .split("")
    .map(calcNextSeat([rowAbove || "", currRow, rowBelow || ""]))
    .join("");
};

const calcSeats = (seatsMap) => {
  let currSeatsMap = seatsMap;
  let nextSeatsMap = [];
  while (true) {
    nextSeatsMap = currSeatsMap.map((row, i) => {
      return calcNextRow(currSeatsMap[i - 1], row, currSeatsMap[i + 1]);
    });

    if (arrays.equals(currSeatsMap, nextSeatsMap)) {
      return nextSeatsMap.reduce((acc, curr) => {
        const occupiedOnRows = (curr.match(/\#/g) || []).join("").length;
        return acc + occupiedOnRows;
      }, 0);
    }

    currSeatsMap = nextSeatsMap;
  }
};

console.log(calcSeats(data));
