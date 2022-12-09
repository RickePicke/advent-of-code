import { asArray } from '../../utils/read-input';

const data = asArray('src/2022/02/input.txt');

const choise = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
} as const;

const codeChoiceMap: Record<string, number> = {
  A: choise.ROCK,
  B: choise.PAPER,
  C: choise.SCISSORS,
  X: choise.ROCK,
  Y: choise.PAPER,
  Z: choise.SCISSORS,
};

const calculateRoundPoints = (userCode: string, oponentCode: string): number => {
  const userChoice = codeChoiceMap[userCode];
  const oponentChoice = codeChoiceMap[oponentCode];

  if (userChoice === oponentChoice) {
    return 3 + userChoice;
  }

  switch (userChoice) {
    case choise.ROCK:
      return (oponentChoice === choise.PAPER ? 0 : 6) + userChoice;
    case choise.PAPER:
      return (oponentChoice === choise.SCISSORS ? 0 : 6) + userChoice;
    case choise.SCISSORS:
      return (oponentChoice === choise.ROCK ? 0 : 6) + userChoice;
    default:
      return 0;
  }
};

const part1 = () => {
  return data.reduce((totalPoints, round) => {
    const [oponentCode, userCode] = round.split(' ');
    return totalPoints + calculateRoundPoints(userCode, oponentCode);
  }, 0);
};

const winningChoiseMap: Record<string, string> = { A: 'Y', B: 'Z', C: 'X' };
const loosingChoiseMap: Record<string, string> = { A: 'Z', B: 'X', C: 'Y' };
const drawChoiseMap: Record<string, string> = { A: 'X', B: 'Y', C: 'Z' };

const getCorrectCode = (scenarioCode: string, oponentCode: string): string => {
  switch (scenarioCode) {
    case 'X':
      return loosingChoiseMap[oponentCode];
    case 'Y':
      return drawChoiseMap[oponentCode];
    case 'Z':
      return winningChoiseMap[oponentCode];
    default:
      return '';
  }
};

const part2 = () => {
  return data.reduce((totalPoints, round) => {
    const [oponentCode, scenarioCode] = round.split(' ');
    const userCode = getCorrectCode(scenarioCode, oponentCode);
    return totalPoints + calculateRoundPoints(userCode, oponentCode);
  }, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
