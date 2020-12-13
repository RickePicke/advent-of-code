const fs = require("fs");
const data = fs.readFileSync("./04-x-data.txt");

const checkPassport = (passport) => [
  /(\s|^)byr:((19[2-9][0-9])|(200[0-2]))(\s|$)/,
  /(\s|^)iyr:(201[0-9])|iyr:2020(\s|$)/,
  /(\s|^)eyr:(202[0-9])|eyr:2030(\s|$)/,
  /(\s|^)hgt:(1[5-8][0-9]cm)|(19[0-3]cm)|(59in)|(6[0-9]in)|(7[0-6]in)(\s|$)/,
  /(\s|^)hcl:#([0-9]|[a-f]){6}(\s|$)/,
  /(\s|^)ecl:(amb|blu|brn|gry|grn|hzl|oth)(\s|$)/,
  /(\s|^)pid:\d{9}(\s|$)/,
].filter((regex) => regex.test(passport)).length > 6;

const { length: result } = data
  .toString()
  .split("\n\n")
  .map((p) => p.replace(/\n/g, " "))
  .filter(checkPassport);

console.log({ result });
