import { run } from 'aoc-copilot';
import {ArrCount, SplitInArrays} from "./helpers";

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
    let [x1, x2] = SplitInArrays(inputs, "   ").map(arr => arr.sort())

    if (part == 2) {
        return x1.reduce((acc, num) => acc + num * ArrCount(x2, num), 0);
    } else {
        return x1.reduce((acc, num, i) => acc + Math.abs(num - x2[i]), 0);
    }
}

run(__filename, solve);