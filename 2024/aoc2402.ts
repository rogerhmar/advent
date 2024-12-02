import { run } from 'aoc-copilot';
import {arrayEquals, ArrCount, removeItem, SplitInArrays} from "./helpers";

function isSafe(rapport:number[],) {
    let before = Array.from(rapport)
    let rapp = Array.from(rapport)

    if(arrayEquals(rapp.sort((a, b) => b - a), before)) { // Desc
        for (let i = 0; i < rapp.length - 1; i++) {
            let diff = rapp[i] - rapp[i+1]
            if(diff <= 0 || diff >3) {
                return false
            }
        }
    } else if (arrayEquals(rapp.sort((a, b) => a - b), before)) { // Asc
        for (let i = 0; i < rapp.length - 1; i++) {
            let diff = rapp[i+1] - rapp[i];
            if(diff <= 0 || diff >3) {
                return false;
            }
        }
    }
    else {
        return false;
    }

    return true;
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
    test: boolean,    // Indicates whether the solver is being run for an example or actual input
    additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {

    console.log("\nPart " + part + " Test? " + test + (additionalInfo??""));
    let reports = inputs.map(i => i.split(" ").map(n => Number(n)));

    if(part == 1) {
        let safe = 0
        for (const rapport of reports) {
            if (isSafe(rapport)) {
                safe++
            }
        }
        return safe;
    } else {
        let safe = 0
        for (const rapport of reports) {
            for (let i = 0; i < rapport.length; i++) {
                let temp = removeItem(rapport, i)
                if (isSafe(temp)) {
                    safe++;
                    break
                }
            }
        }
        return safe;
    }
}

run(__filename, solve);