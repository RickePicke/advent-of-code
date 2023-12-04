import { add } from '../../utils/math';
import { asArray } from '../../utils/read-input';

const data = asArray('src/2023/03/input.txt');
const adjacentRegex = /[^a-zA-Z0-9\\.]/;
const isAdjacent = (symbol: string | undefined) => symbol && adjacentRegex.test(symbol);
const removePreviousNumbersFromRow = (row: string, currNumberIndex: number, numbers: string[]) =>
  Array.from(Array(currNumberIndex).keys()).reduce(
    (acc, i) => acc.replace(numbers[i], numbers[i].replace(/\d/g, '.')),
    row
  );

const part1 = () =>
  data
    .map((row, rowIndex) =>
      row.match(/\d+/g)?.filter((number, i, numbers) => {
        const rowMasked = removePreviousNumbersFromRow(row, i, numbers);
        const numberStart = rowMasked.indexOf(number);
        const numberEnd = numberStart + number.length - 1;

        const hasXAdjacent = [numberStart - 1, numberEnd + 1].some((x) => isAdjacent(rowMasked[x]));
        const hasYAdjacent = Array.from(Array(number.length + 2).keys())
          .map((n) => n - 1 + numberStart)
          .some((x) => isAdjacent(data[rowIndex - 1]?.[x]) || isAdjacent(data[rowIndex + 1]?.[x]));

        return hasXAdjacent || hasYAdjacent;
      })
    )
    .flatMap((n) => n)
    .map((n) => Number(n))
    .reduce(add, 0);

const part2 = () => {
  const gearsData: { [id: string]: string[] | undefined } = {};
  const isAdjacentGear = (symbol: string | undefined) => isAdjacent(symbol) && symbol === '*';

  data.forEach((row, rowIndex) => {
    const numbersOnRow: string[] = row.match(/\d+/g) || [];

    numbersOnRow.forEach((number, i, numbers) => {
      const rowMasked = removePreviousNumbersFromRow(row, i, numbers);
      const numberStart = rowMasked.indexOf(number);
      const numberEnd = numberStart + number.length - 1;

      [numberStart - 1, numberEnd + 1].forEach((x) => {
        if (isAdjacentGear(rowMasked[x])) {
          gearsData[`${rowIndex}${x}`] = [...(gearsData[`${rowIndex}${x}`] || []), number];
        }
      });

      Array.from(Array(number.length + 2).keys())
        .map((n) => n - 1 + numberStart)
        .forEach((x) => {
          [rowIndex + 1, rowIndex - 1].forEach((y) => {
            if (isAdjacentGear(data[y]?.[x])) {
              gearsData[`${y}${x}`] = [...(gearsData[`${y}${x}`] || []), number];
            }
          });
        });
    });
  });

  return Object.values(gearsData)
    .filter((numbers): numbers is string[] => numbers?.length === 2)
    .flatMap((numbers) => Number(numbers[0]) * Number(numbers[1]))
    .reduce(add, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
