const fs = require("fs");
const data = fs.readFileSync("./13-x-data.txt").toString().split("\n");

// Brute force solution. Works with all exameples but will take years to run with real input data
function bruteForceSolution() {
  const idsAndIntervals = data[1]
    .split(",")
    .map((id, i) => ({ busId: parseInt(id), tInterval: parseInt(i) }))
    .filter(({ busId }) => busId);

  let i = 1;
  let timestamp = null;
  while (!timestamp) {
    for (idx = 0; idx < idsAndIntervals.length; idx++) {
      const { busId, tInterval } = idsAndIntervals[idx];

      if (!timestamp) {
        timestamp = busId * i;
      } else if (busId - (timestamp % busId) !== tInterval) {
        timestamp = null;
        break;
      }
    }
    i++;
  }
  console.log("res:", timestamp);
}

// This soltuion is nice, did not come up with this myself tho...
function niceSolution() {
  const inputs = data[1]
    .split(",")
    .map((id, i) => ({ id: parseInt(id), i }))
    .filter((bus) => !Number.isNaN(bus.id))
    .sort((b1, b2) => b2.id - b1.id)
    .map(({ id, i }) => ({
      id: BigInt(id),
      offset: BigInt(absmod(id - i, id)),
      i,
    }));

  let cN = inputs[0].id;
  let cA = inputs[0].offset;
  for (let i = 1; i < inputs.length; i++) {
    const bus = inputs[i];
    while (cA % bus.id !== bus.offset) {
      cA += cN;
    }
    cN *= bus.id;
  }

  function absmod(a, n) {
    while (a < 0) {
      a += n;
    }
    return a % n;
  }

  console.log(cA);
}

module.exports = {
  bruteForceSolution,
  niceSolution,
};
