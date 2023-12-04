import { sum } from '../../utils/math';
import { asArray } from '../../utils/read-input';

const data = asArray('src/2023/01/input.txt');

const part1 = () => {
  const numbers = data.map((line) => {
    const digits = line.match(/\d/g) || [];
    const first = digits[0];
    const last = digits[digits.length - 1];

    return Number((first ?? '') + (last ?? '')) || 0;
  });

  return sum(numbers);
};

const part2 = () => {
  const letterDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  const numbers = data.map((line) => {
    const fixedLine = letterDigits.reduce(
      (acc, curr, i) => acc.replace(new RegExp(curr, 'g'), `${curr}${i + 1}${curr}`),
      line
    );
    const digits = fixedLine.match(/\d/g) || [];
    const first = digits[0] || '';
    const last = digits[digits.length - 1] || '';

    return Number(first + last);
  });

  return sum(numbers);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
