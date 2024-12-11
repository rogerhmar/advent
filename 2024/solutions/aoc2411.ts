import {run} from 'aoc-copilot';
import {sum} from "../../utils/array";

type StoneCounts = {[key: string]: number}
const numOrZero = (stones: StoneCounts, index: number) => (stones[index] ?? 0)

export function blink(stones: StoneCounts) {
    const updatedStones: StoneCounts = {};
    for (const [stone,count] of Object.entries(stones)) {
        const len = stone.length
        if (Number(stone) === 0) {
            updatedStones[1] = numOrZero(updatedStones,1) + count;
        } else if (len%2 === 0) {
            const num1 = Number(stone.slice(0,len/2))
            updatedStones[num1] =  numOrZero(updatedStones, num1) + count

            const num2 = Number(stone.slice(len/2))
            updatedStones[num2] = numOrZero(updatedStones,num2) + count
        } else {
            const num = Number(stone) * 2024
            updatedStones[num] = numOrZero(updatedStones, num) + count
        }
    }
    return updatedStones
}

export function solveDay11(stones: number[], iterations: number) {
    let stoneCounts: StoneCounts = {}
    for (const stone of stones) {
        stoneCounts[stone] = 1
    }
    for (let i = 0; i < iterations; i++) {
        stoneCounts = blink(stoneCounts)
    }
    return sum(Object.values(stoneCounts))
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
    let stones: number[] = inputs[0].split(" ").map(str => Number(str))
    if (part == 1) {
        return solveDay11(stones, 25)
    } else {
        return solveDay11(stones, 75)
    }
}

run(__filename, solve);