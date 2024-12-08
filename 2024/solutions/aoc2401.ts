import { run } from 'aoc-copilot';
import {arrCount} from "../../utils/array";

export function SplitInArrays(inputs: string[], splitBy: string) {
    let x1 = []
    let x2 = []
    for(let i in inputs) {
        let [x,y] = inputs[i].split(splitBy);
        x1.push(Number(x));
        x2.push(Number(y));
    }
    return [x1,x2];
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
    let [x1, x2] = SplitInArrays(inputs, "   ").map(arr => arr.sort())

    if (part == 2) {
        return x1.reduce((acc, num) => acc + num * arrCount(x2, num), 0);
    } else {
        return x1.reduce((acc, num, i) => acc + Math.abs(num - x2[i]), 0);
    }
}

run(__filename, solve);