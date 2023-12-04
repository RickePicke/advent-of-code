import { add, sum } from '../../utils/math';
import { asArray } from '../../utils/read-input';

const data = asArray('src/2023/04/input.txt');

const part1 = () => {
  const res = data
    .map((card) => {
      const [winningNumbers, myNumbers] = card
        .replace(/^Card\s+\d+:/, '')
        .split('|')
        .map((chunk) => chunk.match(/\d+/g));

      return myNumbers?.filter((n) => winningNumbers?.includes(n));
    })
    .map((numbers) => (numbers?.length ? Math.pow(2, (numbers?.length || 1) - 1) : 0));

  return sum(res);
};

const part2 = () => {
  const cardCopies = data.reduce((acc: Record<number, number>, _, i) => ({ ...acc, [i]: 1 }), {});
  data.forEach((card, i) => {
    const [winningNumbers, myNumbers] = card
      .replace(/^Card\s+\d+:/, '')
      .split('|')
      .map((chunk) => chunk.match(/\d+/g));

    const winning = myNumbers?.filter((n) => winningNumbers?.includes(n)) || [];
    const copies = cardCopies[i];

    for (let k = 0; k < copies; k++) {
      for (let j = 0; j < winning.length; j++) {
        cardCopies[j + i + 1] = cardCopies[j + i + 1] + 1;
      }
    }
  });

  return Object.values(cardCopies).reduce(add, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
