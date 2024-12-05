import {readFile} from 'node:fs/promises';

function generateBeforeMap(rules: number[][]): Map<number, number[]> {
    const map = new Map();

    rules.forEach(rule => {
        if(!map.get(rule[1])) {
            map.set(rule[1], [rule[0]]);
        } else {
            map.set(rule[1], [...map.get(rule[1]), rule[0]]);
        }
    });

    return map;
}

function generateAfterMap(rules: number[][]): Map<number, number[]> {
    const map = new Map();

    rules.forEach(rule => {
        if(!map.get(rule[0])) {
            map.set(rule[0], [rule[1]]);
        } else {
            map.set(rule[0], [...map.get(rule[0]), rule[1]]);
        }
    });

    return map;
}

function rulesToTuple(rules: string): number[][] {
    return rules.split(/\r?\n/).map(rule => {
        const arr = rule.split("|");

        return arr.map(val => parseInt(val));
    })
}

function testsTo2dArr(tests: string): number[][] {
    return tests.split(/\r?\n/).map(test => {
        const arr = test.split(",");

        return arr.map(val => parseInt(val));
    })
}

function testIsValid(test: number[], beforeMap: Map<number, number[]>, afterMap: Map<number, number[]>): boolean {
    for(let i=0; i<test.length; i++) {
        // go forward in array, check that no numbers are in beforeMap
        for(let j=i; j<test.length; j++) {
            if(beforeMap.get(test[i])?.includes(test[j])) {
                return false;
            }
        }

        // go backwards in array, check that no numbers are in afterMap
        for(let j=i; j>=0; j--) {
            if(afterMap.get(test[i])?.includes(test[j])) {
                return false;
            }
        }
    }

    return true;
}

const getMiddleIndex = (arr: number[]): number => (arr.length/2) - 0.5

function generateCountPart1(tests: number[][], beforeMap: Map<number, number[]>, afterMap: Map<number, number[]>): number {
    let middleCount = 0;

    tests.forEach(test => {
        if(testIsValid(test, beforeMap, afterMap)) {
            middleCount += test[getMiddleIndex(test)];
        }
    });

    return middleCount;
}

// function randomiseArr(test: number[]): number[] {
//     const arr: number[] = new Array(test.length).fill(-1);
//     test.forEach(val => {
//         let randIndex = Math.floor(Math.random() * test.length);
//         while(arr[randIndex] !== -1) {
//             randIndex = Math.floor(Math.random() * test.length);
//         }

//         arr[randIndex] = val;
//     })

//     return arr;
// }

// function shuffle(array: number[]) {
//     let currentIndex = array.length;
  
//     // While there remain elements to shuffle...
//     while (currentIndex != 0) {
  
//       // Pick a remaining element...
//       let randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
  
//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }
//   }

// function bogoSort(test: number[], beforeMap: Map<number, number[]>, afterMap: Map<number, number[]>): number[] {
//     // if(testIsValid(test, beforeMap, afterMap)) {
//     //     return test
//     // }

//     // shuffle(test);
//     // return bogoSort(test, beforeMap, afterMap);

//     while(!testIsValid(test, beforeMap, afterMap)) {
//         shuffle(test);
//     }

//     return test;
// }
// function quickSortTest(array: number[], beforeMap: Map<number, number[]>, afterMap: Map<number, number[]>): number[] {
//     if (array.length <= 1) {
//         return array;
//     }

//     var pivot = array[0];
    
//     var left: number[] = []; 
//     var right: number[] = [];

//     for (var i = 1; i < array.length; i++) {
//         // array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
//         if(beforeMap.get(pivot)?.includes(array[i])) {
//             left.push(array[i]);
//         } else if(beforeMap.get(pivot)?.includes(array[i])) {
//             right.push(array[i]);
//         }
//     }

//     return sortTest(left, beforeMap, afterMap).concat(pivot, sortTest(right, beforeMap, afterMap));
// }

function sortTest(test: number[], beforeMap: Map<number, number[]>, afterMap: Map<number, number[]>): number[] {
    if(testIsValid(test, beforeMap, afterMap)) {
        return test;
    }

    for(let i=0; i<test.length; i++) {
        for(let j=0; j<test.length; j++) {
            if(beforeMap.get(test[i])?.includes(test[j])) {
                let temp = test[i];
                test[i] = test[j];
                test[j] = temp;
            }
        }
    }

    for(let i=0; i<test.length; i++) {
        for(let j=0; j<test.length; j++) {
            if(afterMap.get(test[i])?.includes(test[j])) {
                let temp = test[i];
                test[i] = test[j];
                test[j] = temp;
            }
        }
    }

    return test;
}

function generateCountPart2(tests: number[][], beforeMap: Map<number, number[]>, afterMap: Map<number, number[]>): number {
    let middleCount = 0;

    tests.forEach(test => {
        if(!testIsValid(test, beforeMap, afterMap)) {
            // middleCount += test[getMiddleIndex(test)];
            // let validTest = bogoSort(test, beforeMap, afterMap);
            let validTest = sortTest(test, beforeMap, afterMap);
            middleCount += validTest[getMiddleIndex(test)];

            console.log(middleCount);
        }
    });

    return middleCount;
}

// const rulesString = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13`

// const testsString = `75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`

const rulesString = await readFile('./day-5/day-5-rules.txt', {
    encoding: 'utf8'
});

const testsString = await readFile('./day-5/day-5-tests.txt', {
    encoding: 'utf8'
});

const rulesTuple = rulesToTuple(rulesString);
const tests2dArr = testsTo2dArr(testsString);
const beforeMap: Map<number, number[]> = generateBeforeMap(rulesTuple);
const afterMap:  Map<number, number[]> = generateAfterMap(rulesTuple);

// PART 1
// =============
// console.log(generateCount(tests2dArr, beforeMap, afterMap));

// const testString1: number[] = [75,47,61,53,29]
// const testString2: number[] = [97,61,53,29,13]
// const testString3: number[] = [75,29,13]
// const testString4: number[] = [75,97,47,61,53]
// const testString5: number[] = [61,13,29]
// const testString6: number[] = [97,13,75,29,47]
// console.log(testIsValid(testString1, beforeMap, afterMap));
// console.log(testIsValid(testString2, beforeMap, afterMap));
// console.log(testIsValid(testString3, beforeMap, afterMap));
// console.log(testIsValid(testString4, beforeMap, afterMap));
// console.log(testIsValid(testString5, beforeMap, afterMap));
// console.log(testIsValid(testString6, beforeMap, afterMap));

// PART 2
// =============

// console.log(testQuicksortIndividual(testQuicksortIndividual([75,97,47,61,53], beforeMap), afterMap));
// console.log(bogoSort([75,97,47,61,53], beforeMap, afterMap))
// console.log(bogoSort([75,97,47,61,53], beforeMap, afterMap))
// console.log(bogoSort([61, 13, 29], beforeMap, afterMap))
// console.log(sortTest([61, 13, 29], beforeMap, afterMap))
console.log(generateCountPart2(tests2dArr, beforeMap, afterMap));
