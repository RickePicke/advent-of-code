const fs = require("fs");
const data = fs.readFileSync("./07-x-data.txt");
const bagRules = (bagsWithName = data.toString().split("\n"));

const getBagRuleByName = (bagName) => {
  return bagRules.find((bagRule) => bagRule.startsWith(bagName));
};

const getNumberAndName = (chunk) => {
  [_, number, name] = chunk.match(/^(\d)\s(.*)\sbag/);
  return [parseInt(number), name];
};

const resolveBag = (times, name) => {
  const rule = getBagRuleByName(name);

  const children = rule
    .replace(/^.*\sbags contain\s/, "")
    .split(", ")
    .filter((chunk) => !chunk.includes("no other bags"))
    .map(getNumberAndName)
    .map(([number, name]) => resolveBag(number, name));

  return { children, name, times };
};

const calc = (acc, curr) =>
  acc + curr.times + curr.times * curr.children.reduce(calc, 0);

console.log(JSON.stringify(resolveBag(1, "shiny gold")));
const result = resolveBag(1, "shiny gold").children.reduce(calc, 0);

console.log(result);
