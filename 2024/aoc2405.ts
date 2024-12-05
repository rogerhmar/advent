import { run } from 'aoc-copilot';

function isOrdered(update: number[], rules: { [key: number]: number[] }) {
    for (let i = 0; i < update.length; i++) {
        for (let j = i + 1; j <update.length; j++) {
            if(!rules[update[i]]?.includes(update[j])){
                return false
            }
        }
    }
    return true
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
    test: boolean,    // Indicates whether the solver is being run for an example or actual input
    additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {

    let rules:{ [key: number]: number[] }  = {}
    let parseRules = true
    let updates = []

    for (const input of inputs) {
        if (input == "") {
            parseRules = false
        } else if(parseRules) {
            const [n1, n2] = input.split("|").map(n => Number(n))
            if (rules[n1]) {
                rules[n1].push(n2);
                rules[n1] = rules[n1];
            } else {
                rules[n1] = [n2];
            }
        } else {
            updates.push(input.split(",").map(n => Number(n)))
        }
    }

    if(part == 1) {
        let sum = 0
        for (const update of updates) {
            const half = (update.length - 1)/2
            sum += isOrdered(update, rules) ? update[half] : 0
        }
        return sum
    } else {
        let sum = 0
        for (const s of updates) {
            const half = (s.length - 1)/2
            if(!isOrdered(s, rules)){
                const rankedCandidates = s
                    .filter(n => rules[n])
                    .map(c => ({num: c,  rank: (rules[c]!.filter(n => s.includes(n)).length)}))

                const sorted = rankedCandidates.sort((a, b) => b.rank! - a.rank!).map(n => n.num)
                sum += sorted[half]
            }
        }
        return sum
    }
}

run(__filename, solve);