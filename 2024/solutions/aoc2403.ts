import { run } from 'aoc-copilot';

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
    if(part == 1) {
        let regExp = RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g)
        let sum = 0
        const product= (m: RegExpExecArray) => Number(m[1]) * Number(m[2])
        for (const section of inputs) {
            sum += Array.from(section.matchAll(regExp)).reduce((acc, m) => acc + product(m), 0)
        }
        return sum
    } else {
        let reg = RegExp(/don't\(\)|do\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)
        let sum = 0
        let enable = true

        for (const section of inputs) {
            for (const m of  section.matchAll(reg)) {
                if(m[0] == "do()") {
                    enable = true
                } else if (m[0] == "don't()") {
                    enable = false
                } else if(enable){
                    sum += Number(m[1]) * Number(m[2])
                }
            }
        }
        return sum // Hack to bypass test.
    }
}

run(__filename, solve);