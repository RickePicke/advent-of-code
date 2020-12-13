const data = require("./03-x-data");

const patterns = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 }
];

const createResultForPattern = ({ right, down }) => {
    const parsedData = data.filter((_ , i) => i%down === 0);

    return parsedData.reduce(({ x, res }, curr) => {
        const pos = x%curr.length;
        return {
            x: x + right,
            res: curr.charAt(pos) === '#' ? (res + 1) : res
        }
    }, { x: 0, res: 0 });
}

const results = patterns
    .map(createResultForPattern)
    .reduce((acc, curr, _, list) => {
        return { allResults: list.map(({res}) => res), product: acc.product * curr.res }
    }, { product: 1 });

console.log(results)
