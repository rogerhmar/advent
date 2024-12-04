import { run } from 'aoc-copilot';

function r(n: number, size: number): number {
    return(Math.floor(n/size));
}

enum idx {
    up = 0,
    down = 1,
    left = 2,
    right = 3,
    downleft = 4,
    downright = 5,
    upright = 6,
    upleft = 7,
}

function findWords(inputs: string[], x: number, y: number, word: string) {
    const xlen = inputs[0].length;
    const ylen = inputs.length;

    let up = 0
    let down = 0
    let right = 0
    let left = 0
    let downleft = 0
    let downright = 0
    let upleft = 0
    let upright = 0

    for (let d = 0; d < word.length; d++) {
        let upOk = y - d >= 0
        let downOk = y + d < ylen
        let rightOk = x + d < xlen
        let leftOk = x - d >= 0

        let downMove = y + d
        let upMove = y - d
        let rightMove = x + d
        let leftMove = x - d

        if (upOk && inputs[upMove][x] === word[d]) {
            up++
        }
        if (rightOk && inputs[y][rightMove] === word[d]) {
            right++
        }
        if (leftOk && inputs[y][leftMove] === word[d]) {
            left++
        }
        if (downOk  && inputs[downMove][x] === word[d]) {
            down++
        }

        if (leftOk && downOk  && inputs[downMove][leftMove] === word[d]) {
            downleft++
        }
        if (downOk && rightOk && inputs[downMove][rightMove] === word[d]) {
            downright++
        }
        if (upOk && leftOk && inputs[upMove][leftMove] === word[d]) {
            upleft++
        }
        if (upOk && rightOk && inputs[upMove][rightMove] === word[d]) {
            upright++
        }
    }
    return [r(up,word.length), r(down,word.length), r(left,word.length), r(right,word.length), r(downleft,word.length), r(downright,word.length), r(upright,word.length), r(upleft,word.length)]
}
async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
    test: boolean,    // Indicates whether the solver is being run for an example or actual input
    additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {

    console.log("\nPart " + part + " Test? " + test + (additionalInfo??""));

    let sum = 0
    const xlen = inputs[0].length;
    const ylen = inputs.length;
    let i = 0
    for (let y = 0; y < ylen; y++) {
        for (let x = 0; x < xlen; x++) {
            i++

            if(part == 1) {
                const word = "XMAS"
                if(inputs[y][x] === word[0]) {
                    sum+=findWords(inputs, x, y, word).reduce((acc, n) => acc + n, 0)
                }
                return sum
            }

            if(part == 2) {
                if(inputs[y][x] === 'A' && y > 0 && y + 1 < ylen && x + 1 < xlen && x > 0) {
                    let cadidate = [
                            inputs[y-1][x-1]+inputs[y-1][x]+inputs[y-1][x+1],
                            inputs[y][x-1]+inputs[y][x]+ inputs[y][x+1],
                            inputs[y+1][x-1]+inputs[y+1][x]+inputs[y+1][x+1]
                    ]
                    const word = "MAS"

                    const topL = findWords(cadidate, 0, 0, word)
                    const bottomR  = findWords(cadidate, 2, 2, word)
                    const topR = findWords(cadidate, 2, 0, word)
                    const bottomL  = findWords(cadidate, 0, 2, word)

                    if((topL[idx.downright] && (topR[idx.downleft]  || bottomL[idx.upright])) || (bottomR[idx.upleft] && (topR[idx.downleft]  || bottomL[idx.upright]))) {
                        sum++
                    }
                }
                return sum;
            }

        }
    }
}

run(__filename, solve);