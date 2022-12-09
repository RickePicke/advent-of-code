import { asArray } from '../../utils/read-input';

const data = asArray('src/2022/04/input.txt');

const getAssignments = (pair: string) => {
  const [a1, a2] = pair.split(',');
  return [a1.split('-').map(Number), a2.split('-').map(Number)];
};

const part1 = () => {
  return data
    .map(getAssignments)
    .filter(([a1, a2]) => (a1[0] <= a2[0] && a1[1] >= a2[1]) || (a2[0] <= a1[0] && a2[1] >= a1[1])).length;
};

const part2 = () => {
  return data
    .map(getAssignments)
    .filter(
      ([a1, a2]) =>
        (a1[0] >= a2[0] && a1[0] <= a2[1]) ||
        (a1[1] >= a2[0] && a1[1] <= a2[1]) ||
        (a2[0] >= a1[0] && a2[0] <= a1[1]) ||
        (a2[1] >= a1[0] && a2[1] <= a1[1])
    ).length;
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
