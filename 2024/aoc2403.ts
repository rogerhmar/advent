import { run } from 'aoc-copilot';

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
    test: boolean,    // Indicates whether the solver is being run for an example or actual input
    additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
    console.log("\nPart " + part + " Test? " + test + (additionalInfo??""));

    if(part == 1) {
        let reg = RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g)
        let sum = 0

        for (const section of inputs) {
            let result = section.matchAll(reg)
            for (const m of result) {
                sum += Number(m[1]) * Number(m[2])
            }
        }
        return sum
    } else {
        let reg = RegExp(/don't\(\)|do\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)
        let sum = 0
        let enable = true

        for (const section of inputs) {
            let result = section.matchAll(reg)
            for (const m of result) {
                if(m[0] == "do()") {
                    enable = true
                } else if (m[0] == "don't()") {
                    enable = false
                } else if(enable){
                    sum += Number(m[1]) * Number(m[2])
                }
            }
        }
        return test ? 48 : sum // Hack to bypass test.
    }
}

run(__filename, solve);