import { run } from 'aoc-copilot';
import {ArrCount, SplitInArrays} from "./helpers";

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
    test: boolean,    // Indicates whether the solver is being run for an example or actual input
    additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
    console.log("\nPart " + part + " Test? " + test + (additionalInfo??""));
    let [x1,x2] = SplitInArrays(inputs, "   ")
    x1.sort((a, b) => a - b);
    x2.sort((a, b) => a - b);

    if(part == 2) {
        return x1.reduce((acc, num) => acc + num * ArrCount(x2,num), 0);
    } else {
        return x1.reduce((acc, num,i) => acc + Math.abs(num - x2[i]), 0);
    }
}

run(__filename, solve);