import {readFile} from 'node:fs/promises';
import _ from "lodash";

type Coordinate = [number, number];
type Move = {
    coord: Coordinate,
    direction: string
}

export class Lab {
    initLabString: string;
    labMatrix: string[][];
    labWidth: number;
    labHeight: number;
    guardPosition: Coordinate;
    previousMoves: Move[];

    constructor(labString: string) {
        this.initLabString = labString;
        this.generateLabMatrix();

        this.labHeight = this.labMatrix.length;
        this.labWidth = this.labMatrix[0].length;
        this.guardPosition = this.getCurrentGuardPosition();
        this.previousMoves = [];

        // this.getInitialPosition = {
        //     coord: [...this.guardPosition],
        //     direction: this.getGuardDirection()
        // };
    }

    generateLabMatrix() {
        this.labMatrix = this.initLabString.split(/\r?\n/).map(rule => {
            const arr = rule.split("");
    
            return arr;
        });
    }

    getCurrentGuardPosition(): Coordinate {
        for(let i=0; i<this.labMatrix.length; i++) {
            for(let j=0; j<this.labMatrix[i].length; j++) {
                if(
                    this.labMatrix[i][j] === "^" || 
                    this.labMatrix[i][j] === "v" || 
                    this.labMatrix[i][j] === ">" || 
                    this.labMatrix[i][j] === "<"
                ) {
                    return [i, j];
                }
            }
        }

        return [-1, -1];
    }

    getVisitedPositionCount(): number {
        let count: number = 0;
        this.labMatrix.forEach(row => {
            row.forEach(val => {
                if(val === "X") {
                    count++;
                }
            })
        })

        return count
    }

    getGuardDirection(): string {
        return this.labMatrix[this.guardPosition[0]][this.guardPosition[1]];
    }

    // either returns the new lab state or guard has left the lab
    moveGuardOneStep(): string[][] | "exit" | "loop" {
        let guardDirection = this.getGuardDirection();

        let currentPosition: Move = {
            coord: [...this.guardPosition],
            direction: guardDirection
        }

        // let test1: Move = {
        //     coord: [0, 0],
        //     direction: 'v'
        // }

        // let test2: Move = {
        //     coord: [0, 0],
        //     direction: 'v'
        // }

        // if(_.isEqual(test1, test2)) {
        //     debugger;
        // }
        if(!this.previousMoves.length) {
            this.previousMoves.push({...currentPosition});
        } else {
            let currentPosition: Move = {
                coord: [...this.guardPosition],
                direction: guardDirection
            }
            // this.previousMoves.forEach(move => {
            //     if(_.isEqual(move, currentPosition)) {
            //         debugger;
            //         return "loop"
            //     }
            // });

            for(let i=0; i<this.previousMoves.length; i++) {
                if(_.isEqual(this.previousMoves[i], currentPosition)) {
                    return "loop"
                }
            }

            this.previousMoves.push({...currentPosition});
        }

        if (guardDirection === '^') { // going up
            let newPos: Coordinate = [(this.guardPosition[0] - 1), this.guardPosition[1]]

            if(newPos[0] < 0) {
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                return "exit";
            } else if(this.labMatrix[newPos[0]][newPos[1]] === "#") {
                // if blocked, turn direction but do not move
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = ">";
                return this.labMatrix
            } else {
                this.labMatrix[newPos[0]][newPos[1]] = "^";
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                this.guardPosition = [...newPos];
                return this.labMatrix;
            }
        } else if (guardDirection === 'v') { // going down
            let newPos: Coordinate = [(this.guardPosition[0] + 1), this.guardPosition[1]]

            if(newPos[0] >= this.labHeight) {
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                return "exit";
            } else if(this.labMatrix[newPos[0]][newPos[1]] === "#") {
                // if blocked, turn direction but do not move
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "<";
                return this.labMatrix
            } else {
                this.labMatrix[newPos[0]][newPos[1]] = "v";
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                this.guardPosition = [...newPos];
                return this.labMatrix;
            }
        } else if (guardDirection === '>') { // going right
            let newPos: Coordinate = [this.guardPosition[0], (this.guardPosition[1] + 1)]

            if(newPos[1] >= this.labWidth) { // exit
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                return "exit";
            } else if(this.labMatrix[newPos[0]][newPos[1]] === "#") { // blocked
                // if blocked, turn direction but do not move
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "v";
                return this.labMatrix
            } else { // empty
                this.labMatrix[newPos[0]][newPos[1]] = ">";
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                this.guardPosition = [...newPos];
                return this.labMatrix;
            }
        } else if (guardDirection === '<') { // going left
            let newPos: Coordinate = [this.guardPosition[0], (this.guardPosition[1] - 1)]

            if(newPos[1] < 0) {
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                return "exit";
            } else if(this.labMatrix[newPos[0]][newPos[1]] === "#") {
                // if blocked, turn direction but do not move
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "^";
                return this.labMatrix
            } else {
                this.labMatrix[newPos[0]][newPos[1]] = "<";
                this.labMatrix[this.guardPosition[0]][this.guardPosition[1]] = "X";
                this.guardPosition = [...newPos];
                return this.labMatrix;
            }
        }

        return 'exit';
    }

    playToExit(): number {
        while(this.moveGuardOneStep() !== 'exit') {}

        return this.getVisitedPositionCount();
    }

    isLoop(): boolean {
        while(true) {
            let state = this.moveGuardOneStep();

            if(state === 'exit') {
                this.previousMoves = [];
                console.log('exit');
                return false;
            }

            if(state === 'loop') {
                this.previousMoves = [];
                console.log('loop');
                return true;
            }
        }
    }

    countLoopingObstacles(): number {
        let count = 0

        for(let i=0; i<this.labHeight; i++) {
            for(let j=0; j<this.labWidth; j++) {
                if(this.labMatrix[i][j] === '.') {
                    this.labMatrix[i][j] = '#';

                    if(this.isLoop()) {
                        count++;
                        console.log(count);
                    }

                    this.generateLabMatrix(); // reset labMatrix
                    this.guardPosition = this.getCurrentGuardPosition();
                }
            }
        }

        return count;
    }
}

async function main() {
    const labString = await readFile('./day-6/day-6.txt', {
        encoding: 'utf8'
    });
//     const labString = `....#.....
// ....+---+#
// ....|...|.
// ..#.|...|.
// ..+-+-+#|.
// ..|.|.|.|.
// .#+-^-+-+.
// ......#.#.
// #.........
// ......#...
// `

    const lab = new Lab(labString);

// const lab = new Lab(
// `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`);

    console.log(lab.countLoopingObstacles());
}

main();