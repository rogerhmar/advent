import { run } from 'aoc-copilot';
import {equal, isOutsideStr, Position} from "../../utils/position";

export function extrapolate(p1: Position, p2: Position ): Position[] {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return [{x: (p1.x-dx), y: (p1.y-dy)},{x: (p2.x+dx), y: (p2.y+dy)}];
}

export function extrapolateAll(p1: Position, p2: Position, inputs:string[]): Position[] {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const all = []
    let i = 0
    while (true) {
        const dyi = i*dy
        const dxi = i*dx

        const n1 = {x: (p1.x-dxi), y: (p1.y-dyi)}
        const n1Out = isOutsideStr(n1, inputs)
        if(!n1Out)
            all.push(n1)

        const n2 = {x: (p2.x+dxi), y: (p2.y+dyi)}
        const n2Out = isOutsideStr(n2, inputs)
        if(!n2Out)
            all.push(n2);

        if (n1Out && n2Out) {
            return all
        }
        i++
    }
}

export function findAntinodes(antennas: any, inputs: string[], part: number) {

    let antinodes = new Set<string>()
    for (const a of antennas) {
        for (const b of antennas) {
            if (equal(a.pos,b.pos)) {
                continue
            }
            if(a.v != b.v) {
                continue
            }
            let candidate = part == 1 ? extrapolate(a.pos, b.pos) : extrapolateAll(a.pos, b.pos,inputs)
            for (const position of candidate) {
                const overlap  = antennas.filter(p => p.pos == position)
                if(overlap.length != 0) {
                    continue
                }
                if(isOutsideStr(position,inputs)) {
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

export function parseDay8(inputs: string[]) {
    const ylen = inputs.length
    const xlen = inputs[0].length
    let antennas = []
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