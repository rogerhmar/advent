import { run } from 'aoc-copilot';
import {getLengths, makePositionIterator} from "../../utils/position";

function findWords(inputs: string[], x: number, y: number, word: string) {
    const xlen = inputs[0].length;
    const ylen = inputs.length;

    const state = [0, 0, 0, 0, 0, 0, 0, 0]

    for (let d = 0; d < word.length; d++) {
        const upOk = y - d >= 0
        const downOk = y + d < ylen
        const rightOk = x + d < xlen
        const leftOk = x - d >= 0

        const downNext = y + d
        const upNext = y - d
        const rightNext = x + d
        const leftNext = x - d

        if (upOk && inputs[upNext][x] === word[d])  state[idx.up]++
        if (rightOk && inputs[y][rightNext] === word[d]) state[idx.right]++
        if (leftOk && inputs[y][leftNext] === word[d]) state[idx.left]++
        if (downOk && inputs[downNext][x] === word[d]) state[idx.down]++
        if (leftOk && downOk  && inputs[downNext][leftNext] === word[d]) state[idx.downleft]++
        if (downOk && rightOk && inputs[downNext][rightNext] === word[d]) state[idx.downright]++
        if (upOk && leftOk && inputs[upNext][leftNext] === word[d]) state[idx.upleft]++
        if (upOk && rightOk && inputs[upNext][rightNext] === word[d]) state[idx.upright]++
    }
    return state.map(s => Math.floor(s/word.length)).map(n => n > 0)
}
async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
    let sum = 0
    const {xlen, ylen} = getLengths(inputs);
    const positions = makePositionIterator(inputs)
    for (const {x,y} of positions) {
        if (part == 1) {
            const word = "XMAS"
            if (inputs[y][x] === word[0]) {
                sum += findWords(inputs, x, y, word).filter(n => n).length
            }
        }
        if (part == 2) {
            if (inputs[y][x] === 'A' && y > 0 && y + 1 < ylen && x + 1 < xlen && x > 0) {
                // 3x3 around the A
                let candidate = [
                    inputs[y - 1][x - 1] + inputs[y - 1][x] + inputs[y - 1][x + 1],
                    inputs[y][x - 1] + inputs[y][x] + inputs[y][x + 1],
                    inputs[y + 1][x - 1] + inputs[y + 1][x] + inputs[y + 1][x + 1]
                ]

                const word = "MAS"
                const topL = findWords(candidate, 0, 0, word)
                const bottomR = findWords(candidate, 2, 2, word)
                const topR = findWords(candidate, 2, 0, word)
                const bottomL = findWords(candidate, 0, 2, word)

                const isSolution1 = topL[idx.downright] && (topR[idx.downleft] || bottomL[idx.upright])
                const isSolution2 = bottomR[idx.upleft] && (topR[idx.downleft] || bottomL[idx.upright])

                if (isSolution1 || isSolution2) {
                    sum++
                }
            }
        }
    }
    return sum;
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

run(__filename, solve);