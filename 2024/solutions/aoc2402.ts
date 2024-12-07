import { run } from 'aoc-copilot';
import {arrayEquals, removeItem} from "../utils/array";

function isSafe(rapport:number[]) {
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
): Promise<number | string> {
    let reports = inputs.map(i => i.split(" ").map(n => Number(n)));

    if(part == 1) {
        return reports.filter(r => isSafe(r)).length;
    } else {
        return reports.filter(rapport => rapport
            .map((_, i) => isSafe(removeItem(rapport, i))).filter(s => s).length > 0)
            .length
    }
}

run(__filename, solve);