import fs from "node:fs";
import * as readline from 'node:readline';


async function readLines() {
    const left = [];    
    const right = [];

    const rl = readline.createInterface({
        input: fs.createReadStream('./day-1/day-1.txt'),
        crlfDelay: Infinity,
    });

    // rl.on('line', (line) => {
    //     const lineArr = line.split('   ');
    //     left.push(lineArr[0]);
    //     right.push(lineArr[1]);
    // });
    
    // rl.on('close', () => {
    //     console.log("finished");
    //     console.log(left.length, right.length);
    //     process.exit(0);
    // });
    for await (const line of rl) {
        const lineArr = line.split('   ');
        left.push(lineArr[0]);
        right.push(lineArr[1]);
      }

    return {
        left,
        right
    }
}
const {left, right} = await readLines();

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

// let diffCount = 0;
// for (let i=0; i < left.length; i++) {
//     diffCount += Math.abs((left[i] - right[i]));
// }

// console.log(diffCount);

let leftIndex = 0;
let rightIndex = 0;

let currentNumber = -1;
let leftCount = 0;
let rightCount = 0;

let total = 0;

while (leftIndex < left.length && rightIndex < right.length) {
    currentNumber = left[leftIndex];
    // leftCount++;
    while (currentNumber === left[leftIndex] && leftIndex < left.length) {
        leftCount++;
        leftIndex++;
    }

    while (currentNumber >= right[rightIndex] && rightIndex < right.length) {
        if(currentNumber === right[rightIndex]) {
            rightCount++;
        }
        rightIndex++;
    }

    if(rightCount > 0) {
        debugger;
    }
    total += currentNumber * leftCount * rightCount;

    leftCount = 0;
    rightCount = 0;
}

console.log(total);