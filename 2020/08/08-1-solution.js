const fs = require("fs");
const data = fs.readFileSync("./08-x-data.txt").toString().split('\n');

const checkUsedIndex = usedIndexes => usedIndexes.length === new Set(usedIndexes).size;

const calcNextIndex = (currIndex, change) => {
    const sum = currIndex + change;
    if(sum < 0) {
        return data.length - 1 - Math.abs(sum);
    } 
    
    if (sum > data.length -1){
        return sum%(data.length + 1)
    }

    return sum;
}

function run() {
    let usedIndexes = [];
    let usedRows = [];
    let acc = 0;
    let currIndex = 0;
    while(true) {
        usedIndexes.push(currIndex);
        usedRows.push(data[currIndex]);
        if(!checkUsedIndex(usedIndexes)) {
            return acc;
        }

        const [ type, num ] = data[currIndex].split(' ');
        switch(type) {
            case 'nop':
                currIndex = calcNextIndex(currIndex, 1);
                break;
            case 'acc':
                currIndex = calcNextIndex(currIndex, 1)
                acc += parseInt(num);
                break;                
            case 'jmp':
                currIndex = calcNextIndex(currIndex, parseInt(num));
                break;
        }
    }
}

console.log(run());