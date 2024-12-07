import { run } from 'aoc-copilot';
import {combine} from "../utils/div";

type CombinationsObject =  {[p: number]: string[][]};
type Equation = { input: number[]; test: number };

function calculate1(v1: number, v2: number, op: string) {
    if (op == "*")  return v1 * v2
    else if (op == "+")  return v1 +  v2
    else if (op == "||")  return Number(v1.toString() +  v2.toString())
    else throw Error("Should not happen" + v1 + " '" + op + "' " + v2 )
}

export function calculate(total: number,i: number[], op: string[]): number {
    if(op.length == 1){
        return calculate1(total, i[0], op[0])
    } else{
        return calculate(calculate1(total, i[0], op[0]), i.slice(1), op.slice(1))
    }
}

function calculateAll(equations: Equation[], combinations: CombinationsObject) {
    let total = 0
    for (const eq of equations) {
        const {test, input} = eq
        let result = 0
        for (const variation of combinations[input.length - 1]) {
            result = calculate(input[0],input.slice(1),variation)
            if(result === test) {
                total += result
                break;
            }
        }
    }
    return total
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
   const equations = inputs.map(line => {
       const spl = line.split(":")
       const spl2 = spl[1].trim().split(" ").map(n => Number(n));
       return {test: Number(spl[0]), input: spl2}
   })
    const createCombinations = (operators: string[]) => [1,2,3,4,5,6,7,8,9,10,11].reduce((acc, v) => ({...acc,[v]: combine(operators, v)}), {})
    if (part == 1) {
        return calculateAll(equations, createCombinations(["*", "+"]))
    } else {
        return calculateAll(equations, createCombinations(["*", "+", "||"]))
    }
}

run(__filename, solve);