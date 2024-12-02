import fs from "node:fs";
import * as readline from 'node:readline';

async function readLines() {
    let count = 0;

    const rl = readline.createInterface({
        input: fs.createReadStream('./day-2/day-2.txt'),
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const lineArr = line.split(' ');
        
        if(calculateSafePart2(lineArr)) {
            count++;
        }
    }

    return count;
}

function calculateSafePart1(lineArr) {
    let direction = null;

    for(let i=0; i<lineArr.length - 1; i++) {
        let diff = lineArr[i + 1] - lineArr[i];

        if(!direction) {
            if(diff > 0) {
                direction = "Ascending";
            } else if (diff < 0) {
                direction = "Descending";
            } else {
                return false;
            }
        }

        if(direction === "Ascending") {
            if(diff > 3 || diff < 1) {
                return false;
            }
        }

        if(direction === "Descending") {
            if(diff > -1 || diff < -3) {
                return false;
            } 
        }
    }

    return true;
}

// if it's stupid and it works, it isn't stupid
// time complexity is atrocious tho :)
function calculateSafePart2(lineArr) {
    for(let i=0; i<lineArr.length; i++) {
        let first = [];
        if(i > 0) {
            first = lineArr.slice(0, i);
        }
        let second = lineArr.slice(i+1, lineArr.length);

        if (calculateSafePart1([...first, ...second])) {
            return true
        }
    }

    return false;
}

console.log(await readLines());
console.log(calculateSafePart2([1, 2, 3, 4, 1]))
console.log(true, calculateSafePart2([7, 6, 4, 2, 1]));
console.log(false, calculateSafePart2([1, 2, 7, 8, 9]));
console.log(false, calculateSafePart2([9, 7, 6, 2, 1]));
console.log(true, calculateSafePart2([1, 3, 2, 4, 5]));
console.log(true, calculateSafePart2([8, 6, 4, 4, 1]));
console.log(true, calculateSafePart2([1, 3, 6, 7, 9]));