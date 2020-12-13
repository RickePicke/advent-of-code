const data = require("./02-x-data");

const result = data.reduce((acc, curr) => {
    const { min, max, letter, pwd } = curr;

    const matches = [
        pwd.charAt(min - 1) === letter,
        pwd.charAt(max - 1) === letter
    ].filter(m => m).length;

    return matches === 1 ? (acc + 1) : acc;
}, 0);

console.log(result);
