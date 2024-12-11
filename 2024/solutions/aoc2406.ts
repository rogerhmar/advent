import { run } from 'aoc-copilot';
import {equal, getLengths, isOutside, makePositionIterator, Position} from "../../utils/position";

type Direction = "up" | "down" | "right" | "left";
type State = {position: Position, direction: Direction };

function getState(inputs: readonly string[][]): State {
    let y = 0;
    for (const input of inputs) {
        const idxUp = input.indexOf("^")
        const idxRight = input.indexOf(">")
        const idxLeft = input.indexOf("<")
        const idxDown = input.indexOf("v")

        if (idxUp > -1) return {position: {x: idxUp, y}, direction: "up"}
        if (idxRight > -1) return {position: {x: idxRight, y}, direction: "right"}
        if (idxLeft > -1) return {position: {x: idxLeft, y}, direction: "left"}
        if (idxDown > -1) return {position: {x: idxDown, y}, direction: "down"}
        y++
    }
    throw new Error("Should not happen")
}

function nextPosition(state: State): Position {
    switch(state.direction) {
        case "down": return {x: state.position.x, y: state.position.y + 1};
        case "up": return {x: state.position.x, y: state.position.y - 1};
        case "right": return  { x: state.position.x + 1, y: state.position.y,};
        case "left": return  {x: state.position.x - 1, y: state.position.y};
    }
}

function changeDirection(direction: Direction): Direction {
    switch(direction) {
        case "down": return "left"
        case "left": return "up"
        case "up":  return  "right"
        case "right": return "down"
    }
}

const getKey = (pos: Position) => `${pos.x + "," + pos.y}`

function getAllVisited(state: State, inputs: readonly string[][]) {
    let visited: { [key: string]: Direction[] } = {[getKey(state.position)]: [state.direction]}
    let currentState = {...state}
    while (true) {
        const nextPos = nextPosition(currentState)
        if(isOutside(nextPos, inputs))
            return {visited, loop:false}

        if(inputs[nextPos.y][nextPos.x] == "#" )
            currentState.direction = changeDirection(currentState.direction);
        else {
            currentState.position = nextPos
            let key = getKey(currentState.position)
            if (visited[key]) {
                if(visited[key].includes(currentState.direction)) {
                    return {visited, loop:true}
                }
                visited[key].push(currentState.direction)
            } else
                visited[key] = [currentState.direction]
        }
    }
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
    const inputArray = Object.freeze(inputs.map(i => Array.from(i)))
    const state = Object.freeze(getState(inputArray));
    const startPosition = state.position

    if (part == 1) {
        let visited = getAllVisited(state, inputArray);
        return Object.keys(visited.visited).length;
    } else {
        let loops = 0
        let test = Array.from(inputArray.map(i => Array.from(i)))
        for (const {x, y} of makePositionIterator(inputs)) {
            if (equal(startPosition, {x, y})) {
                continue
            }
            test[y][x] = "#" // Set
            let visited = getAllVisited(state, test);
            if (visited.loop) {
                loops++
            }
            test[y][x] = inputs[y][x] // Reset
        }
        return loops;
    }
}

run(__filename, solve);