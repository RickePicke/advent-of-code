const fs = require("fs");
const { betweenOrEquals } = require("../utils/common");
const data = fs
  .readFileSync("./16-x-data.txt")
  .toString()
  .split("\n\n")
  .map((chunk) => chunk.split("\n"));

const myTicket = data[1][1].split(",").map((number) => parseInt(number));
const nearbyTickets = data[2]
  .slice(1)
  .map((ticket) => ticket.split(",").map((number) => parseInt(number)));

const fieldsAndRules = data[0].map((fieldAndRules) => {
  const [fieldName, rules] = fieldAndRules.split(": ");
  return { fieldName, rules: createMinMax(rules) };

  function createMinMax(rules) {
    return rules.split(" or ").map((rule) => {
      const [, min, max] = rule.match(/^(\d.*)-(\d.*)$/);
      return { min: parseInt(min), max: parseInt(max) };
    });
  }
});

function numberIsValid(rules, number) {
  return rules.reduce(
    (acc, { min, max }) => acc || betweenOrEquals(min, max, number),
    false
  );
}

const allRules = fieldsAndRules.reduce(
  (acc, { rules }) => [...acc, ...rules],
  []
);

const validTickets = [myTicket, ...nearbyTickets].filter((ticket) => {
  return ticket.every((number) => numberIsValid(allRules, number));
});

function findPossibleIndexes(rules) {
  const allIndexes = Array.from(new Array(myTicket.length).keys());
  const possibleIndexes = [];

  for (const index of allIndexes) {
    let allValid = true;
    for (const ticket of validTickets) {
      if (!numberIsValid(rules, ticket[index])) {
        allValid = false;
        break;
      }
    }

    if (allValid) {
      possibleIndexes.push(index);
    }
  }
  return possibleIndexes;
}

const fieldNamePossibleIndexesMaps = fieldsAndRules.reduce(
  (acc, { fieldName, rules }) => {
    const possibleIndexes = findPossibleIndexes(rules);
    return [...acc, { fieldName, possibleIndexes }];
  },
  []
);

let fieldNameIndexMaps = [];
for (let i = 0; i < fieldNamePossibleIndexesMaps.length; i++) {
  const allSetNames = fieldNameIndexMaps.map(({ fieldName }) => fieldName);
  const allSetindexes = fieldNameIndexMaps.map(({ index }) => index);

  const { fieldName, possibleIndexes } = fieldNamePossibleIndexesMaps
    .filter(({ fieldName }) => !allSetNames.includes(fieldName))
    .map(({ fieldName, possibleIndexes }) => ({
      fieldName,
      possibleIndexes: possibleIndexes.filter(
        (index) => !allSetindexes.includes(index)
      ),
    }))
    .find(({ possibleIndexes }) => possibleIndexes.length === 1);

  fieldNameIndexMaps.push({ fieldName, index: possibleIndexes[0] });
}

const res = fieldNameIndexMaps
  .filter(({ fieldName }) => fieldName.startsWith("departure"))
  .reduce((acc, { index }) => acc * myTicket[index], 1);

console.log(res);
