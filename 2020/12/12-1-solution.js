const fs = require("fs");
const data = fs.readFileSync("./12-x-data.txt").toString().split("\n");

const directions = ["E", "S", "W", "N"];
const calcNextDirection = (action, value, currentDirection) => {
  const currIndex = directions.indexOf(currentDirection);
  const steps = (value / 90);
  const nextIndex = action === 'R'
    ? (currIndex + steps)%4
    : (4 + (currIndex - steps))%4;

  return directions[nextIndex];
}

const result = data.reduce(({ sum, direction }, curr) => {
  const [_, action, value] = curr.match(/^([A-Z])(\d.*)$/);

  switch (action) {
    case 'E':
    case 'S':
    case 'N':
    case 'W':
      return { direction, sum: { ...sum, [action]: sum[action] + parseInt(value) } };
    case 'F':
      return { direction, sum: { ...sum, [direction]: sum[direction] + parseInt(value) } };
    case 'L':
    case 'R':
      return { direction: calcNextDirection(action, value, direction), sum };
  }
}, { direction: "E", sum: {E: 0, S: 0, N: 0, W: 0 } });

const { E, S, N, W } = result.sum;
const manhattanPostion = Math.abs(N - S) + Math.abs(W - E);
console.log(result.sum);
console.log(manhattanPostion);
