import {run} from "aoc-copilot";
import {getDiff, isOutside, Position} from "../../utils/position";
import {InputAsNumbers} from "../../utils/div";

function getCandidates(p: Position, map: number[][]) {
    const candidates: Position[] = []

    const down = {y:p.y + 1, x:p.x}
    const up = {y:p.y - 1, x:p.x}
    const left = {y:p.y, x:p.x - 1}
    const right = {y:p.y, x:p.x + 1}

    for (const dir of [down, up, left, right]) {
        const inside = !isOutside(dir, map)
        if (inside) {
            const diff = getDiff(p, dir, map)
            if(diff === 1) {
                candidates.push(dir);
            }
        }
    }
    return candidates
}

export function getNumberOfPaths(trailhead: Position, map: number[][], distict: boolean) {
    let heads = [trailhead]
    let allDone = []
    const max = 9
    const isDone = (pos: Position) => map[pos.y][pos.x] === max

    while (true) {
        const path = heads.shift()
        if (path != undefined) {
            const candidates = getCandidates(path, map)
            const candidatesDone = candidates.filter(c => isDone(c))
            if (candidatesDone.length > 0) {
                allDone.push(...candidatesDone)
            }
            const candidatesNotDone = candidates.filter(c => !isDone(c))
            if (candidatesNotDone.length > 0)
                heads.push(...candidatesNotDone)
        } else {
            let str = allDone.map(d => JSON.stringify(d))
            if(distict)
                return new Set(str).size
            else
                return str.length
        }
    }
}

export function getTrailheads(map: number[][]) {
    let trailheads = []
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            if (map[y][x] == 0) {
                trailheads.push({x, y});
            }
        }
    }
    return trailheads
}

export function solveDay10(inputs: string[], distict: boolean) {
    let map = InputAsNumbers(inputs);
    return getTrailheads(map).reduce((sum, trailhead) => sum +  getNumberOfPaths(trailhead, map, distict), 0)
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
    test: boolean,
): Promise<number | string> {

    if (test) {
        inputs = [
            "89010123",
            "78121874",
            "87430965",
            "96549874",
            "45678903",
            "32019012",
            "01329801",
            "10456732"
        ]
    }
    return solveDay10(inputs, part == 1)
}

run(__filename, solve);