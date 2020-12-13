const fs = require("fs");
const arrays = require("../utils/arrays");
const data = fs.readFileSync("./11-x-data.txt").toString().split("\n");
const directions = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const calcNextSeat = (seat, seatIndex, rowIndex, seatsMap) => {
  switch (seat) {
    case "L":
      return !getAdjacent("#").length ? "#" : seat;
    case "#":
      return getAdjacent("#").length >= 5 ? "L" : seat;
    default:
      return seat;
  }

  function getAdjacent(type) {
    const adjecentSeats = directions.map(checkSeatInDirection);
    return (adjecentSeats.join("").match(new RegExp(type, "g")) || []).join("");

    function checkSeatInDirection([x, y]) {
      let dirIndex = 1;
      let curr = "";

      while (typeof curr === "string" && !/^#|L$/.test(curr)) {
        const row = seatsMap[rowIndex + y * dirIndex];
        curr = (row ? row[seatIndex + x * dirIndex] : null) || null;
        dirIndex++;
      }
      return curr || "";
    }
  }
};

const calcNextRow = (currRow, rwoIndex, seatsMap) => {
  return currRow
    .split("")
    .map((seat, seatIndex) => calcNextSeat(seat, seatIndex, rwoIndex, seatsMap))
    .join("");
};

const calcSeats = (seatsMap) => {
  let currSeatsMap = seatsMap;
  let nextSeatsMap = [];
  
  while (true) {
    nextSeatsMap = currSeatsMap.map((row, rowIndex) => {
      return calcNextRow(row, rowIndex, currSeatsMap);
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
