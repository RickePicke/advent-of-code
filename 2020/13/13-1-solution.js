const fs = require("fs");
const data = fs.readFileSync("./13-x-data.txt").toString().split("\n");

const [ estimate, busIds ] = data;

const res = busIds.split(',')
  .filter(busId => busId != 'x')
  .map(busId => ({ busId: parseInt(busId), minWait: parseInt(busId) - estimate%busId }))
  .sort((a, b) => a.minWait - b.minWait);

console.log(res[0].busId * res[0].minWait);