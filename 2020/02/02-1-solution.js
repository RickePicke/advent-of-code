const data = require("./02-x-data");

const result = data.reduce((acc, curr) => {
    const { min, max, letter, pwd } = curr;
    const letterAppearences = (pwd.match(new RegExp(letter, "g")) || []).length;
    
    return letterAppearences >= min && letterAppearences <= max 
        ? acc + 1
        : acc;
}, 0);

console.log(result);
