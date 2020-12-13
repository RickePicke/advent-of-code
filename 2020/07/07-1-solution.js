const fs = require("fs");
const data = fs.readFileSync("./07-x-data.txt");

const getBagsConatainingName = (allBagsWithName, bagName) => {
  const bagsWithName = data
    .toString()
    .split('\n')
    .reduce((acc, curr) => curr.replace(/^.*\sbags contain\s/, '').includes(bagName)
        ? [ ...acc, curr.match(/^(.*)\sbags contain\s/)[1] ]
        : acc
    , [])
    
    return bagsWithName.length === 0 ? allBagsWithName : [
      ...allBagsWithName,
      ...bagsWithName,
      ...bagsWithName.reduce(getBagsConatainingName, allBagsWithName)
    ].reduce((acc, curr) => acc.includes(curr) ? acc : [ ...acc, curr ], []);
  }

const { length } = getBagsConatainingName([], 'shiny gold')

console.log(length);