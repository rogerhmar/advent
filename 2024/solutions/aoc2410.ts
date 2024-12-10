import {run} from "aoc-copilot";
import {getDiff, isOutside, Position} from "../../utils/position";
import {InputAsNumbers} from "../../utils/div";

function getCandidates(from: Position, map: number[][]) {
    const candidates: Position[] = []

    const down = {y:from.y + 1, x:from.x}
    const up = {y:from.y - 1, x:from.x}
    const left = {y:from.y, x:from.x - 1}
    const right = {y:from.y, x:from.x + 1}

    for (const to of [down, up, left, right]) {
        if (!isOutside(to, map)) {
            if(getDiff(from, to, map) === 1) {
                candidates.push(to);
            }
        }
    }
    return candidates
}

export function getNumberOfPaths(trailhead: Position, map: number[][], distinct: boolean) {
    let heads = [trailhead]
    let allDone = []
    const MAX = 9
    const isDone = (pos: Position) => map[pos.y][pos.x] === MAX

    while (true) {
        const path = heads.shift()
        if (path != undefined) {
            const candidates = getCandidates(path, map)
            allDone.push(...candidates.filter(c => isDone(c)))
            heads.push(...candidates.filter(c => !isDone(c)))
        } else {
            let str = allDone.map(d => JSON.stringify(d))
            if(distinct)
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
): Promise<number | string> {
    return solveDay10(inputs, part == 1)
}

run(__filename, solve);