import { asArrayBlocks } from '../../utils/read-input';

const data = asArrayBlocks('src/2022/01/input.txt');

const part1 = () => {
  const elfCals = data.map((block) =>
    block.split('\n').reduce((acc: number, curr) => acc + parseInt(curr), 0)
  );

  return Math.max(...elfCals);
};

const part2 = () => {
  const sortedElfCals = data
    .map((block) => block.split('\n').reduce((acc: number, curr) => acc + parseInt(curr), 0))
    .sort((a, b) => b - a);

  return sortedElfCals.slice(0, 3).reduce((acc: number, curr) => acc + curr, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
