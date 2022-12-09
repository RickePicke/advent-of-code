import { sum } from '../../utils/math';
import { asArray } from '../../utils/read-input';

const data = asArray('src/2022/03/input.txt');

const getPriority = (char: string) => {
  const charCode = char.charCodeAt(0);
  return /[a-z]/.test(char) ? charCode - 96 : charCode - 38;
};

const getCommonDenominator = (rucksack: string) => {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2);
  const secondCompartment = rucksack.slice(rucksack.length / 2);

  return firstCompartment.split('').find((char) => secondCompartment.includes(char)) || '';
};

const part1 = () => {
  return sum(
    data.map((rucksack) => {
      const commonDenominator = getCommonDenominator(rucksack);
      return getPriority(commonDenominator);
    })
  );
};

const getBadge = ([rucksack1, rucksack2, rucksack3]: string[]): string =>
  rucksack1.split('').find((char) => rucksack2.includes(char) && rucksack3.includes(char)) || '';

const part2 = () => {
  let i = 0;
  const badges: string[] = [];
  while (i < data.length) {
    badges.push(getBadge(data.slice(i, i + 3)));
    i += 3;
  }

  return sum(badges.map(getPriority));
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
