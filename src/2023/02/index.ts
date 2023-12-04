import { add, sum } from '../../utils/math';
import { asArray } from '../../utils/read-input';

const data = asArray('src/2023/02/input.txt');
const colors = ['red', 'green', 'blue'] as const;

const part1 = () => {
  const redMax = 12;
  const greenMax = 13;
  const blueMax = 14;

  const parsed = data.map((game) => {
    const [, id, gameInput] = game.match(/Game (\d+):\s(.*)/) || [];
    const recordData = gameInput.split(';').map((record) => {
      const [red, green, blue] = colors.map((color) => {
        return (
          (record.match(new RegExp(`\\d+ ${color}`, 'g')) || [])
            .join('')
            .match(/\d+/g)
            ?.map((n) => Number(n))
            .reduce(add) || 0
        );
      });

      return red <= redMax && green <= greenMax && blue <= blueMax;
    });

    return recordData.every((match) => match) ? Number(id) : 0;
  });

  return sum(parsed);
};

const part2 = () => {
  const parsed = data.map((game) => {
    const [, , gameInput] = game.match(/Game (\d+):\s(.*)/) || [];
    const [redMax, greenMax, blueMax] = colors.map((color) => {
      const numbers = (gameInput.match(new RegExp(`\\d+ ${color}`, 'g')) || [])
        .join('')
        .match(/\d+/g)
        ?.map((n) => Number(n));
      return Math.max(...(numbers || [1]));
    });

    return redMax * greenMax * blueMax;
  });

  return sum(parsed);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
