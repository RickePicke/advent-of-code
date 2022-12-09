import { asArray } from '../../utils/read-input';

const data = asArray('src/2022/05/input.txt');

const createCratePiles = (data: string[]) => {
  const crateRows = data.slice(
    0,
    data.findIndex((row) => !row)
  );

  const pileNumbersRow = crateRows[crateRows.length - 1];
  const pileNumbers = pileNumbersRow.replace(/\s/g, '');
  return pileNumbers.split('').reduce((acc, n) => {
    const pileIndex = pileNumbersRow.indexOf(n);
    return {
      ...acc,
      [n]: crateRows
        .slice(0, -1)
        .map((row) => row[pileIndex].trim())
        .filter((crate) => crate),
    };
  }, {});
};

const moveCrates = (
  cratePiles: Record<string, string[]>,
  instructions: string[],
  index: number,
  multiPickup?: boolean
): Record<string, string[]> => {
  const instruction = instructions[index];
  if (!instruction) {
    return cratePiles;
  }

  const [, move, from, to] = instruction.match(/^move (\d+) from (\d+) to (\d+)$/)?.map(Number) || [];
  const createsToMove = cratePiles[from].slice(0, move);
  const nextPiles = {
    ...cratePiles,
    [from]: cratePiles[from].slice(move),
    [to]: [...(multiPickup ? createsToMove : createsToMove.reverse()), ...cratePiles[to]],
  };

  return moveCrates(nextPiles, instructions, index + 1, multiPickup);
};

const part1 = () => {
  const cratePiles = createCratePiles(data);
  const instructions = data.slice(data.findIndex((row) => !row) + 1);

  const movedCreates = moveCrates(cratePiles, instructions, 0);
  return Object.values(movedCreates)
    .map((pile) => pile[0])
    .join('');
};

const part2 = () => {
  const cratePiles = createCratePiles(data);
  const instructions = data.slice(data.findIndex((row) => !row) + 1);

  const movedCreates = moveCrates(cratePiles, instructions, 0, true);
  return Object.values(movedCreates)
    .map((pile) => pile[0])
    .join('');
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
