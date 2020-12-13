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

const { seats } = data.reduce(
  (acc, [rowData, columnData]) => {
    const [row] = rowData
      .split("")
      .reduce(getHalfByLetter, Array.from(Array(128).keys()));

    const [column] = columnData
      .split("")
      .reduce(getHalfByLetter, Array.from(Array(8).keys()));

    const id = row * 8 + column;
    return {
      highestSeatId: id >= acc.highestSeatId ? id : acc.highestSeatId,
      seats: [...acc.seats, { id, row, column }].sort((a, b) => b.row - a.row),
    };
  },
  { seats: [], highestSeatId: 0 }
);

const rowsAndSeats = seats.reduce((acc, curr) => {
  return { ...acc, [curr.row]: [...(acc[curr.row] || []), curr] };
}, {});

const emptySeats = Object.entries(rowsAndSeats).reduce((acc, [row, seats]) => {
  if (seats.length < 8) {
    const possibleSeatColumns = Array.from(Array(8).keys());
    const missingSeatColumns = possibleSeatColumns.filter((possibleColumn) => {
      return !seats.map((seat) => seat.column).includes(possibleColumn);
    });

    return [
      ...acc,
      ...missingSeatColumns.map((column) => ({
        column,
        row,
        id: row * 8 + column,
      })),
    ];
  }

  return acc;
}, []);

const allSeatsIds = seats.map(({ id }) => id);
const [mySeat] = emptySeats.filter((emptySeat) => {
  return (
    allSeatsIds.includes(emptySeat.id + 1) &&
    allSeatsIds.includes(emptySeat.id + -1)
  );
});

console.log(mySeat);
