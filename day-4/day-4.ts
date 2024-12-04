import {readFile} from 'node:fs/promises';

const testString = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

// const testArr = testString.split(/\r?\n/);
// console.log(testArr);
type Dimensions = {
    height: number;
    width: number;
}

function getHeightWidth(matrix: string[][]): Dimensions {
    return {
        height: matrix.length,
        width: matrix[0].length
    }
}

function generateMatrix(string: string): string[][] {
    const horizontalStrings = string.split(/\r?\n/);
    return horizontalStrings.map((horizontal: string) => {
        return horizontal.split("");
    });
}

function countInstancesPart1(matrix: string[][]): number {
    let count = 0;
    const {height, width} = getHeightWidth(matrix);
    const regex: RegExp = /(?=XMAS|SAMX)/g

    // horizontals
    for(let i = 0; i<height; i++) {
        const horizontal = matrix[i].join("")

        count += [...horizontal.matchAll(regex)].length;
    }

    // Verticals
    for(let i = 0; i<width; i++) {
        const vertical = matrix.map((horizontal) => {
            return horizontal[i];
        }).join("");

        count += [...vertical.matchAll(regex)].length;
    }

    // TL->BR
    for(let i=0; i<width; i++) {
        let x = i;
        let y = 0;
        let diagonalArr: string[] = [];

        while(x<width && y<height) {
            diagonalArr.push(matrix[x][y]);
            x++;
            y++;
        }
        
        count += [...diagonalArr.join("").matchAll(regex)].length;
    }
    for(let i=1; i<height; i++) {
        let x = 0;
        let y = i;
        let diagonalArr: string[] = [];

        while(x<width && y<height) {
            diagonalArr.push(matrix[x][y]);
            x++;
            y++;
        }

        count += [...diagonalArr.join("").matchAll(regex)].length;
    }

    // TR -> BL
    for(let i=width - 1; i>=0; i--) {
        let x = i;
        let y = 0;
        let diagonalArr: string[] = [];

        while(x>=0 && y<height) {
            diagonalArr.push(matrix[x][y]);
            x--;
            y++;
        }

        count += [...diagonalArr.join("").matchAll(regex)].length;
    }
    for(let i=1; i<height; i++) {
        let x = width - 1;
        let y = i;
        let diagonalArr: string[] = [];

        while(x>=0 && y<height) {
            diagonalArr.push(matrix[x][y]);
            x--;
            y++;
        }

        count += [...diagonalArr.join("").matchAll(regex)].length;
    }


    return count;
}

function countInstancesPart2(matrix: string[][]): number {
    let count = 0;
    const {height, width} = getHeightWidth(matrix);
    const regex = /MAS|SAM/g
    for(let i=0;i<height;i++) {
        for(let j=0; j<width; j++) {
            let tlbr:string[] = [];
            let trbl: string[] = [];

            let x = 0;
            let y = 0;
            while((y<3 && (i+y)<height) && (x<3 && (j+x)<width)) {
                tlbr.push(matrix[i+y][j+x]);
                trbl.push(matrix[i+y][j+(2-x)]);
                x++;
                y++;
            }

            let foundCount = 0;
            foundCount += [...tlbr.join("").matchAll(regex)].length;
            foundCount += [...trbl.join("").matchAll(regex)].length;

            if(foundCount === 2) {
                count++;
            }
        }
    }

    //get all squares

    return count;
}

const fileContent = await readFile('./day-4/day-4.txt', {
    encoding: 'utf8'
});

// console.log(countInstancesPart1(generateMatrix(testString)));
// console.log(countInstancesPart1(generateMatrix(fileContent)));

const testString1 = `123
456
789`
const testString2 = `1234
5678
9abc`
const testString3 = `M0M
0A0
S0S
`
const testString4 = `M0MS0S
0A00A0
S0SM0M
`
console.log(countInstancesPart2(generateMatrix(fileContent)));