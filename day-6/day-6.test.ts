import { expect, test } from 'vitest'
import { Lab } from './day-6';

test('Generate Lab Matrix', () => {
    const labMatrix = new Lab(
`...
.#^
.##`).labMatrix;

    expect(labMatrix).toStrictEqual([
        ['.','.','.',],
        ['.','#','^',],
        ['.','#','#',],
    ]);
});

test('get Height Width', () => {
    const lab = new Lab(
`...
.#^
.##`);

    expect(lab.labHeight).toBe(3);
    expect(lab.labWidth).toBe(3);
})

test('get guard position', () => {
const lab1 = new Lab(
`...
.#^
.##`);

    expect(lab1.getCurrentGuardPosition()).toStrictEqual([1, 2]);

const lab2 = new Lab(
`...
.#.
.##`);

    expect(lab2.getCurrentGuardPosition()).toStrictEqual([-1, -1]);
});

test('Uniquely visited', () => {
const lab = new Lab(
`XXX
X#^
X#.`);
    expect(lab.getVisitedPositionCount()).toBe(5);
});

// test('move guard Up', () => {
// const lab1 = new Lab(
// `...
// .#^
// .##`);
//     expect(lab1.moveGuard('up')).toStrictEqual([0, 2]);
//     expect(lab1.getVisitedPositionCount()).toBe(1);

// const lab2 = new Lab(
// `..#
// .#^
// .##`);
//     expect(lab2.moveGuard('up')).toBe(false);
//     expect(lab1.getVisitedPositionCount()).toBe(1);

// const lab3 = new Lab(
// `.^.
// .#.
// .##`);
//     expect(lab3.moveGuard('up')).toBe(true);
// })

test('move guard Once Up', () => {
const lab1 = new Lab(
`...
.#^
.##`);
const expectedLab1 = new Lab(
`..^
.#X
.##`)
    expect(lab1.moveGuardOneStep()).toStrictEqual(expectedLab1.labMatrix);
    expect(lab1.getVisitedPositionCount()).toBe(1);

const lab2 = new Lab(
`..#
.#^
.##`);
const expectedLab2 = new Lab(
`..#
.#>
.##`)
    expect(lab2.moveGuardOneStep()).toStrictEqual(expectedLab2.labMatrix);
    expect(lab2.getVisitedPositionCount()).toBe(0);

const lab3 = new Lab(
`..^
.#.
.##`);
    expect(lab3.moveGuardOneStep()).toBe('exit');
    expect(lab3.getVisitedPositionCount()).toBe(1);
});

test('move guard Once Right empty', () => {
const lab1 = new Lab(
`...
.>.
.##`);
const expectedLab1 = new Lab(
`...
.X>
.##`)
    expect(lab1.moveGuardOneStep()).toStrictEqual(expectedLab1.labMatrix);
    expect(lab1.getVisitedPositionCount()).toBe(1);
});

test('move guard Once Right blocked', () => {
const lab2 = new Lab(
`...
.>#
.##`);
const expectedLab2 = new Lab(
`...
.v#
.##`)
    expect(lab2.moveGuardOneStep()).toStrictEqual(expectedLab2.labMatrix);
    expect(lab2.getVisitedPositionCount()).toBe(0);
});

test('move guard Once Right exit', () => {
const lab3 = new Lab(
`...
..>
.##`);
    expect(lab3.moveGuardOneStep()).toBe('exit');
    expect(lab3.getVisitedPositionCount()).toBe(1);
});

test('move guard Once Down empty', () => {
const lab1 = new Lab(
`.v.
...
.##`);
const expectedLab1 = new Lab(
`.X.
.v.
.##`)
    expect(lab1.moveGuardOneStep()).toStrictEqual(expectedLab1.labMatrix);
    expect(lab1.getVisitedPositionCount()).toBe(1);
});

test('move guard Once Down blocked', () => {
const lab2 = new Lab(
`...
.v.
.##`);
const expectedLab2 = new Lab(
`...
.<.
.##`)
    expect(lab2.moveGuardOneStep()).toStrictEqual(expectedLab2.labMatrix);
    expect(lab2.getVisitedPositionCount()).toBe(0);
});

test('move guard Once Down exit', () => {
const lab3 = new Lab(
`...
...
v##`);
    expect(lab3.moveGuardOneStep()).toBe('exit');
    expect(lab3.getVisitedPositionCount()).toBe(1);
});

test('move guard Once Left empty', () => {
const lab1 = new Lab(
`...
.<.
.##`);
const expectedLab1 = new Lab(
`...
<X.
.##`)
    expect(lab1.moveGuardOneStep()).toStrictEqual(expectedLab1.labMatrix);
    expect(lab1.getVisitedPositionCount()).toBe(1);
});

test('move guard Once Left blocked', () => {
const lab2 = new Lab(
`...
#<#
.##`);
const expectedLab2 = new Lab(
`...
#^#
.##`)
    expect(lab2.moveGuardOneStep()).toStrictEqual(expectedLab2.labMatrix);
    expect(lab2.getVisitedPositionCount()).toBe(0);
});

test('move guard Once Left exit', () => {
const lab3 = new Lab(
`...
<..
.##`);
    expect(lab3.moveGuardOneStep()).toBe('exit');
    expect(lab3.getVisitedPositionCount()).toBe(1);
});

test('Play To Exit', () => {
const lab = new Lab(
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`);
    expect(lab.playToExit()).toBe(41);
})

test('Confirm Loop1', () => {
    const lab = new Lab(
`....#.....
....+---+#
....|...|.
..#.|...|.
....|..#|.
....|...|.
.#.#^---+.
........#.
#.........
......#...
`
    );

    expect(lab.isLoop()).toBe(true);
});
test('Confirm Loop2', () => {

    const lab = new Lab(
`....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
......#.#.
#.........
......#...
`
            );
        
            expect(lab.isLoop()).toBe(true)
});
test('Confirm Loop3', () => {

    const lab = new Lab(
`....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----+##.
#+----+...
......#...
`
            );
        
            expect(lab.isLoop()).toBe(true)
})
test('Confirm Loop4', () => {

    const lab = new Lab(
`....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
..|...|.#.
##+---+...
......#...
`
            );
        
            expect(lab.isLoop()).toBe(true)
})
test('Confirm Loop5', () => {

    const lab = new Lab(
`....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
....|.|.#.
#..#+-+...
......#...
`
            );
        
            expect(lab.isLoop()).toBe(true)
})

test('Not a Loop', () => {
    const lab = new Lab(
    `....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..^.....
    ........#.
    #.........
    ......#...`);
        expect(lab.isLoop()).toBe(false);
    })