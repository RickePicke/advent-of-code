const fs = require("fs");
const data = fs.readFileSync("./12-x-data.txt").toString().split("\n");

const directions = ["E", "S", "W", "N"];
const calcNextDirection = (action, value, currentDirection) => {
  const currIndex = directions.indexOf(currentDirection);
  const steps = (parseInt(value) / 90);
  const nextIndex = action === 'R'
    ? (currIndex + steps)%4
    : (4 + (currIndex - steps))%4;

  return directions[nextIndex];
}

const move = (waypoint, sum, value) => {
    return directions.reduce((acc, curr) => {
      return { ...acc, [curr]: sum[curr] + waypoint[curr] * parseInt(value) }
    }, {});
}

const calcNextWaypoint = (waypoint, action, value) => {
  const x = directions.reduce((acc, curr) => {
    return { ...acc, [calcNextDirection(action, value, curr)]: waypoint[curr]  }
  }, {});
  return x;
}

const result = data.reduce(({ sum, waypoint }, curr) => {
  const [_, action, value] = curr.match(/^([A-Z])(\d.*)$/);

  switch (action) {
    case 'E':
    case 'S':
    case 'N':
    case 'W':
      return { waypoint: { ...waypoint, [action]: waypoint[action] + parseInt(value) }, sum };
    case 'F':
      return { waypoint, sum: move(waypoint, sum, value) };
    case 'L':
    case 'R':
      return { waypoint: calcNextWaypoint(waypoint, action, value), sum };
  }
}, { waypoint: { E: 10, S: 0, N: 1, W: 0 }, sum: { E: 0, S: 0, N: 0, W: 0 } });

const { E, S, N, W } = result.sum;
const manhattanPostion = Math.abs(N - S) + Math.abs(W - E);
console.log(result);
console.log(manhattanPostion);
