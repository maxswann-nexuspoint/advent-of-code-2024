import {readFile} from 'node:fs/promises';

function findMulTotalsPart1(input: string): number {
    let total: number = 0;
    const regexp = /mul\(([0-9]+),([0-9]+)\)/g

    const matches = input.matchAll(regexp);

    for (const match of matches) {
        total += parseInt(match[1]) * parseInt(match[2]);
    }

    return total;
}

// need to use lookahead and lookbehind assertions
// I tried, fuck regex
function findMulTotalsPart2(input: string): number {
    let total: number = 0;
    // const match = /(?<!don't\(\).*?)mul\(([0-9]+),([0-9]+)\)+/g
    // const match = /(?<=do\(\).*?)mul\(([0-9]+),([0-9]+)\)+/g
    // const match = /mul\(([0-9]+),([0-9]+)\)(?!.*don't\(\).*mul\(([0-9]+),([0-9]+)\)+.*do\(\))/g;
    const match = /mul\(([0-9]+),([0-9]+)\)(?!(?:(?!do\(\)).)*don't\(\))|(?<=do\(\).*)mul\(([0-9]+),([0-9]+)\)/g
    
    const matches = input.matchAll(match);

    for (const match of matches) {
        console.log(match)
        total += parseInt(match[1]) * parseInt(match[2]);
    }

    return total;
}

// const contents = await readFile('./day-3/day-3.txt', {
//     encoding: 'utf8'
// });

// ========
// Part 1
// ========
// const testString = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
// console.log(findMulTotalsPart1(testString));
// console.log(findMulTotalsPart1(contents));

// ========
// Part 2
// ========
const testString2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
console.log(findMulTotalsPart2(testString2));