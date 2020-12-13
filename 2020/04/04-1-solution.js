const fs = require("fs");
const data = fs.readFileSync("./04-x-data.txt");

const keys = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ];
const checkPassport = (passport) => keys
  .map(key => new RegExp(`${key}:`))
  .filter((regex) => regex.test(passport))
  .length > 6;

const { length: result } = data
  .toString()
  .split("\n\n")
  .map((p) => p.replace(/\n/g, ""))
  .filter(checkPassport);

  console.log(result);