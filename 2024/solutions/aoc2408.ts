import { run } from 'aoc-copilot';
import {equal, extrapolate, extrapolateAll, isOutside, Position} from "../../utils/position";

export type Antenna = {
    pos: Position,
    v: string
}

export function findAntinodes(antennas: Antenna[], inputs: string[], part: number) {
    let antinodes = new Set<string>()
    for (const a of antennas) {
        for (const b of antennas) {
            if (equal(a.pos,b.pos)) {
                continue
            }
            if(a.v != b.v) {
                continue
            }
            let isOut = (p: Position) => isOutside(p, inputs)
            let candidate = part == 1 ? extrapolate(a.pos, b.pos) : extrapolateAll(a.pos, b.pos, isOut)
            for (const position of candidate) {
                const overlap  = antennas.filter(p => p.pos == position)
                if(overlap.length != 0) {
                    continue
                }
                if(isOutside(position,inputs)) {
                    continue
                }
                if(!antinodes.has(JSON.stringify(position))) {
                    antinodes.add(JSON.stringify(position))
                }
            }
        }
    }
    return antinodes.size
}

export function parseDay8(inputs: string[]): Antenna[] {
    const ylen = inputs.length
    const xlen = inputs[0].length
    let antennas: Antenna[] = []
    for (let y = 0; y < ylen; y++) {
        for (let x= 0; x < xlen; x++) {
            if (inputs[y][x] != ".") {
                antennas.push({pos:{x,y},v:inputs[y][x]});
            }
        }
    }
    return antennas
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
    let antennas = parseDay8(inputs);
    return findAntinodes(antennas, inputs, part)
}

run(__filename, solve);