const data = require("./03-x-data");

const { res } = data.reduce(({ x, res }, curr) => {
    const pos = x%curr.length;

    return {
        x: x + 3,
        res: curr.charAt(pos) === '#' ? (res + 1) : res
    };
}, { x: 0, res: 0 });

console.log(res);