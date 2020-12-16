const fs = require("fs");
const { betweenOrEquals } = require("../utils/common");
const data = fs
  .readFileSync("./16-x-data.txt")
  .toString()
  .split("\n\n")
  .map((chunk) => chunk.split("\n"));

const nearbyTickets = data[2]
  .slice(1)
  .map((ticket) => ticket.split(",").map((number) => parseInt(number)));

const fieldsAndRules = data[0].map((fieldAndRules) => {
  const [fieldName, rules] = fieldAndRules.split(": ");
  return { fieldName, rules: createMinMAx(rules) };
});

function createMinMAx(rules) {
  return rules.split(" or ").map((rule) => {
    const [, min, max] = rule.match(/^(\d.*)-(\d.*)$/);
    return { min, max };
  });
}

const allRules = fieldsAndRules.reduce(
  (acc, { rules }) => [...acc, ...rules],
  []
);
const invalids = nearbyTickets.reduce(
  (acc, ticket) => [
    ...acc,
    ...ticket.filter(
      (number) =>
        !allRules.reduce(
          (acc, { min, max }) => acc || betweenOrEquals(min, max, number),
          false
        )
    ),
  ],
  []
);

const sum = invalids.reduce((acc, curr) => acc + curr);
console.log({ sum });
