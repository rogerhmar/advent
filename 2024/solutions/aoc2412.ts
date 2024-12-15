import {run} from "aoc-copilot";
import {equal, isOutside, makePositionIterator, Position} from "../../utils/position";
import {removeItem} from "../../utils/array";

export function getAdjacent(p: Position, map: number[][] | string[], value: string, exclude: { [p: string]: number }): {
    [p: string]: Position
} {
    const up = {x: p.x, y: p.y - 1}
    const down = {x: p.x, y: p.y + 1}
    const right = {x: p.x + 1, y: p.y}
    const left = {x: p.x - 1, y: p.y}

    let all = {}
    const inExclude = (pos: Position) => exclude?.[JSON.stringify(pos)]

    if (!isOutside(down, map) && map[down.y][down.x] === value && !inExclude(down))
        all = {...all, down}
    if (!isOutside(up, map) && map[up.y][up.x] === value && !inExclude(up))
        all = {...all, up}
    if (!isOutside(right, map) && map[right.y][right.x] === value && !inExclude(right))
        all = {...all, right}
    if (!isOutside(left, map) && map[left.y][down.x] === value && !inExclude(left))
        all = {...all, left}
    return all
}

export function isAdjacent(p1: Position, p2?: Position): boolean {
    if (p2 == undefined)
        return false
    if (equal({x: p1.x + 1, y:p1.y},{x:p2.x, y:p2.y}))
        return true
    if (equal({x: p1.x - 1, y:p1.y},{x:p2.x, y:p2.y}))
        return true
    if (equal({x: p1.x, y:p1.y - 1},{x:p2.x, y:p2.y}))
        return true
    return equal({x: p1.x, y: p1.y + 1}, {x: p2.x, y: p2.y});
}
function unique<T>(result: T[]) {
    return Array.from(new Set(result))
}
export function getGroups(all: Position[]) {
    let temp: { pos: Position, visited: boolean }[] = Array.from(all).map(a => ({pos: a, visited: false}))
    temp[0].visited = true
    let result: Position[] = [temp[0].pos]
    const arr = []
    let candidates: number[] = [0]
    let current: number | undefined = 0
    while (true) {
        for (let i = 0; i < temp.length; i++) {
            if (current != i && !temp[i].visited && isAdjacent(temp[i].pos, temp[current!]?.pos) && !candidates.includes(i)) {
                candidates.push(i)
            }
        }
        current = candidates.shift()
        if (current !== undefined) {
            result.push(temp[current].pos)
            temp[current].visited = true
        } else {
            arr.push(unique(result))
            if (temp.filter(t => !t.visited).length > 0) {
                current = temp.findIndex(a => !a.visited)
                temp[current].visited = true
                result = [temp[current].pos]
            }
        }
        if (candidates.length == 0 && temp.filter(t => !t.visited).length == 0) {
            result.push(temp[current!].pos)
            arr.push(Array.from(new Set(result)))
            return arr
        }
    }
}

export function getSones(inputs: string[]) {
    const positions = Array.from(makePositionIterator(inputs))
    const sones: {[key: string]: {[key:string]: number}} = {}
    while (true) {
        const currPos = positions.shift()
        if(!currPos)
            break
        const curr = inputs[currPos.y][currPos.x]
        if(!sones[curr]) {
            sones[curr] = {}
        }
        sones[curr][JSON.stringify(currPos)] = 1

        for (const [dir, position] of Object.entries(getAdjacent(currPos, inputs,curr, sones[curr] ))) {
            const valInPos = inputs[position.y][position.x];
            if(!sones[curr])
                sones[curr] = {};
            if (valInPos == curr){
                sones[curr][JSON.stringify(position)] = 1
            }
        }
    }
    let gr: {[key:string]: Position[][]} = {}
    for (const [sone, value] of Object.entries(sones)) {
        const positions = Object.keys(value).map(k => JSON.parse(k) as Position)
        const groups = getGroups(positions)
        gr[sone] = groups
    }
    return gr
}

export function solveDay12(inputs: string[]): number {
    let groups: {[key:string]: Position[][]} = getSones(inputs)
    let sum = 0
    let base = 4

    for (const [sone, positions] of Object.entries(groups)) {
        let acc = 0
        for (const pos of positions) {
            let thisSum = {num: 0, len: pos.length}
            for (const position of pos) {
                const numN = pos.filter(p => isAdjacent(p, position)).length
                if (thisSum.num > 0 && numN == 0) {
                    thisSum = {num: 0, len: pos.length}
                }
                thisSum.num += base - numN
            }
            acc += thisSum.num * thisSum.len
        }
        sum += acc

        for (const position of positions) {
            const ps = Array.from(position)
            ps.sort((p1,p2) => p1.x - p2.x)
            let clean = ps.filter(p => ps.filter(pp => isAdjacent(pp, p)).length < 4)
            let current = clean.shift()!
            let dir: "vertical"|"horizontal" = "horizontal"
            let currDir: "vertical"|"horizontal" = "horizontal"
            let edges = 0
            while (true) {
                const dists = clean.map(c => Math.sqrt(Math.pow(c.x - current.x, 2) + Math.pow(c.y - current.y, 2)))
                const a = Object.entries(clean)
                a.sort(([i1, p1], [i2, p2]) => dists[Number(i1)] - dists[Number(i2)])
                let outerPosition = clean[Number(a[0][0])]
                clean = removeItem(clean, Number(a[0][0]))
                if (Math.abs(outerPosition.x - current.x) == 1) {
                    dir = "horizontal"
                } else if (Math.abs(outerPosition.y - current.y) == 1) {
                    dir = "vertical"
                } else throw Error(JSON.stringify(outerPosition))
                if (dir != currDir)
                    edges++
                currDir = dir
            }


            console.log(clean)

        }
    }
    return sum
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
    test: boolean
): Promise<number | string> {
    if (part == 1) {
        return solveDay12(inputs)
    } else {
    }
}

run(__filename, solve);