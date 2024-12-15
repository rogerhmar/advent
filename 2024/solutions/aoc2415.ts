import {run} from "aoc-copilot";
import {isOutside, makePositionIterator, Position} from "../../utils/position";
import {arrayEquals} from "../../utils/array";

export function  parseDay15(inputs: string[], double: boolean) {
    let startStopWalls = inputs[0].split("");
    let i = 1
    let map: string[][] = [double ?  inputs[0].replaceAll("#", "##").split("") : startStopWalls];
    let robot: Position = {x:-1,y:-1};
    while (true) {
        let th = inputs[i++]
        if (double) {
            startStopWalls = inputs[0].replaceAll("#", "##").split("")
            th = th.replaceAll("O", "[]")
            th = th.replaceAll(".", "..")
            th = th.replaceAll("@", "@.")
            th = th.replaceAll("#", "##")
        }
        let thisLine = th.split("");
        let rob = thisLine.findIndex(m => m == "@")
        if (rob != -1) {
            robot = {x: rob, y: i-1}
            thisLine[rob] = "."
        }
        map.push(thisLine)
        if(arrayEquals(thisLine, startStopWalls))
            break
    }
    let instructions = [];
    while (true) {
        let thisLine = inputs[i++];
        if(thisLine == undefined)
            break
        if(thisLine == "")
            continue;
        instructions.push(...thisLine.split(""));
    }
    return {map, instructions, robot};
}

export function printMap(map: string[][], robot?: Position, instruction?: string) {
    let all = ""
    let y = 0
    for (const mapElement of map) {
        let x = 0
        let str = y+""
        for (const s of mapElement) {
            if (x == robot?.x && y == robot?.y) {
                str += instruction ? instruction : "@"
            } else {
                str += `${s ?? "."}`
            }
            x++
        }
        all += str + "\n";
        y++
    }
    console.log(all);
}

function countObject(map: string[][], object: string) {
    let pos = makePositionIterator(map)
    let count = 0
    for (const po of pos) {
        if (map[po.y][po.x] == object) {
            count++
        }
    }
    return count
}

function shiftObjects(positions: Position[], map: string[][]) {
    let first = positions[0];
    let last = positions[positions.length - 1];
    if (positions.length == 1)
        return;
    let obstBefore = countObject(map, "#")

    map[first.y][first.x] = ".";
    map[last.y][last.x] = "O";
    if(obstBefore != countObject(map, "#"))
        throw new Error("Nooooo");

}

type BoxPos = {left: Position, right: Position}
const counts = [0,0,0,0]

function getNextLayer(positions: BoxPos[], {dx,dy}: Change, map: string[][]) {
    if (Math.abs(dy) == 0 || Math.abs(dx) > 0)
        throw new Error("Should not");
    let newPositions: BoxPos[] = [];
    for (const {left, right} of positions) {
        if (map[left.y + dy][left.x-1] == "[" && map[left.y + dy][left.x] == "]" && map[right.y + dy][right.x] == "[" && map[right.y + dy][right.x + 1] == "]") {
            //[][]
            // []
            counts[0]++
            newPositions.push(
                {
                    left: {y: left.y + dy, x: left.x - 1},
                    right: {y: right.y + dy, x: left.x}
                },
                {
                    left: {y: left.y + dy, x: right.x },
                    right: {y: right.y + dy, x: right.x + 1}
                });
        } else if(map[left.y + dy][left.x] == "[" && map[right.y + dy][right.x] == "]") {
            counts[1]++

            //[]
            //[]
            newPositions.push(
                {
                    left: {y: left.y + dy, x: left.x},
                    right: {y: right.y + dy, x: right.x}
                });
        } else if(map[left.y + dy][left.x] == "]") {
            counts[2]++

            //[]
            // []
            newPositions.push(
                {
                    left: {y: left.y + dy, x: left.x - 1},
                    right: {y: right.y + dy, x: left.x}
                }
                );
        } else if(map[right.y + dy][right.x] == "[") {
            counts[3]++

            // []
            //[]
            newPositions.push(
                {
                    left: {y: left.y + dy, x: right.x},
                    right: {y: right.y + dy, x: right.x + 1}
                });
        }
    }
    return newPositions
}

function shift(p: Position, {dx, dy}: Change, map: string[][]) {
    let before = map[p.y + dy][p.x + dx]
    map[p.y + dy][p.x + dx] = map[p.y][p.x]
    map[p.y][p.x] = before;
}

function nextIsBlocked(pos: BoxPos, {dx, dy}: Change, map: string[][]){
    let leftBlocked = map[pos.left.y + dy][pos.left.x + dx] == "#"
    let rightBlocked = map[pos.right.y + dy][pos.right.x + dx] == "#"
    return leftBlocked || rightBlocked
}

function tryShiftLargeObjects(to: Position, {dx,dy}: Change, map: string[][]): boolean{
    if (Math.abs(dx) > 0) {
        let allToShift = []
        let i = 0
        while (true) {
            i++
            let nextPosition ={x: to.x + (i * dx), y: to.y}
            allToShift.push(nextPosition);
            if(map[nextPosition.y][nextPosition.x] == "#")
                return false
            if (map[nextPosition.y][nextPosition.x] == ".") {
                let shifted = allToShift.length > 0
                while (true) {
                    let shi = allToShift.pop()
                    if (!shi)
                        return shifted
                    shift(shi, {dx: -dx, dy}, map)
                }
            }
        }
    } else if (Math.abs(dy) > 0) {
        let aligned: BoxPos = map[to.y][to.x] == "]"
            ? {left: {y: to.y, x: to.x -1 }, right: {y: to.y, x:to.x}}
            : {left: {y: to.y, x: to.x }, right: {y: to.y, x:to.x + 1}};
        if (map[aligned.left.y][aligned.left.x] != "[" || map[aligned.right.y][aligned.right.x] != "]")
            throw new Error("Wrong object" + JSON.stringify(aligned) + " " + map[aligned.left.y][aligned.left.x] + " " +  map[aligned.right.y][aligned.right.x]);

        let allPositions: BoxPos[][] = []
        let current = [aligned]
        allPositions.push(current)
        while (true) {
            current = getNextLayer(current, {dy,dx}, map)
            if (current.length > 0) {
                allPositions.push(current)
            } else {
                let blocked = allPositions.filter(pos => pos.filter(c => nextIsBlocked(c, {dx, dy}, map)).length > 0)
                if (blocked.length > 0) {
                    return false
                }
                while (true) {
                    let curr = allPositions.pop()
                    if (!curr)
                        return true

                    for (const boxPo of curr) {
                        shift(boxPo.right, {dx, dy}, map)
                        shift(boxPo.left, {dx, dy}, map)
                    }
                }
            }
        }
    }
    throw new Error("Should not")

}

type Change = {dy: number, dx: number}
type Movement = {from: Position, to: Position, change: Change}
function tryToPush({from, to,change}: Movement, map: string[][]): Position {
    if (map[to.y][to.x] == ".")
        return to
    else if (map[to.y][to.x] == "#")
        return from
    else if (map[to.y][to.x] == "[" || map[to.y][to.x] == "]") {
        return tryShiftLargeObjects(to, change, map) ? to : from
    } else if (map[to.y][to.x] == "O"){
        let {dy, dx} = change
        let i = 0
        let positions: Position[] = [to]
        while (true) {
            i++
            let nextPos = {y: to.y + (i * dy), x: to.x + (i * dx)}
            if (isOutside(nextPos, map))
                return from
            positions.push(nextPos)
            let next = map[nextPos.y][nextPos.x]
            if (next == "#")
                return from
            else if (next == ".") {
                if (map[to.y][to.x] == "O")
                    shiftObjects(positions, map)
                else
                    throw new Error("Not implemented");
                return to;
            }
        }
    }
    else throw new Error("Not implemented");
}

function getMovement(from: Position, instruction: string) {
    let change: Change;
    switch(instruction) {
        case "^":  change = {dx: 0, dy: - 1}; break;
        case "v":  change = {dx: 0, dy: 1}; break;
        case "<":  change = {dx: -1, dy: 0};  break;
        case ">":   change = {dx: 1, dy: 0};  break;
        default: throw new Error("invalid position")
    }
    return {from, to: {x: from.x + change.dx, y: from.y + change.dy} , change};
}

export function calculateGPSScore(map: string[][]) {
    let positions = makePositionIterator(map)
    let sum = 0
    for (const position of positions) {
        if (map[position.y][position.x] == "O")
            sum += position.x + 100 * position.y
        if (map[position.y][position.x] == "[") {
            sum += position.x + 100 * position.y
        }
    }
    return sum
}

export function solveDay15Silver(inputs: string[]) {
    let {map, instructions, robot} = parseDay15(inputs,false)
    //printMap(map, robot)
    while (true) {
        let instruction = instructions.shift()
        if(!instruction)
            break
        robot = tryToPush(getMovement(robot, instruction), map)
      //  printMap(map, robot)
    }
    return calculateGPSScore(map)
}

export function solveDay15Gold(inputs: string[]) {
    let {map, instructions, robot} = parseDay15(inputs, true)
    printMap(map, robot)
    while (true) {
        let instruction = instructions.shift()
        if(!instruction)
            break

        let move = getMovement(robot, instruction)

        try {
            robot = tryToPush(move, map)
        } catch (e) {
            printMap(map, robot)
            throw new Error("Not right" + map[0].length + " " )
        }
    }
    return calculateGPSScore(map)
}
async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {


    if(part == 1) {
        return solveDay15Silver(inputs)
    } else {
        return solveDay15Gold(inputs)
    }
}

run(__filename, solve, {skipTests: true});
