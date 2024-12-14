import {run} from "aoc-copilot";
import {makePositionIterator, Position} from "../../utils/position";

export type Velocity = { dx: number; dy: number };
export type Robot = {
    position: Position,
    velocity: Velocity,
}
export type Size = {xLen: number, yLen: number};

export function move(robot: Robot, size: Size) {
    const {x,y} = robot.position
    const {dx, dy} = robot.velocity
    return {
        velocity: robot.velocity,
        position: {
            x: (x + dx + size.xLen) % size.xLen,
            y: (y + dy + size.yLen) % size.yLen,
        }
    }
}

export function parseDay14(inputs: string[]){
    const robots = []
    const regex = /p=(\d+),(\d+)\s+v=(-*\d+),(-*\d+)/
    for (const input of inputs) {
        const match = regex.exec(input)
        if (!match) {
            throw new Error(input)
        }
        robots.push({
            position: {x: Number(match[1]),y: Number(match[2])},
            velocity: {dx: Number(match[3]),dy: Number(match[4])},
        })
    }
    return robots
}

function moveRobots(robots: Robot[], size: Size, steps: number) {
    for (let i = 0; i <steps; i++) {
        for (let i = 0; i <robots.length; i++) {
            robots[i] = move(robots[i], size);
        }
    }
}

function countQuadrants(robots: Robot[], size: Size) {
    const {xLen, yLen} = {xLen: Math.floor(size.xLen/2), yLen: Math.floor(size.yLen/2)};
    const quadrants = [0,0,0,0];
    for (const robot of robots) {
        if (robot.position.y < yLen && robot.position.x < xLen) quadrants[0]++
        else if (robot.position.y < yLen && robot.position.x > xLen) quadrants[1]++
        else if (robot.position.y > yLen && robot.position.x < xLen) quadrants[2]++
        else if (robot.position.y > yLen && robot.position.x > xLen) quadrants[3]++
    }
    return Array.from(quadrants);
}

function printMap(map: number[][], size: Size, quadrants: boolean) {
    let str = ""
    const half = {xlen: Math.floor(size.xLen/2), ylen: Math.floor(size.yLen/2)};
    let toPrint: string[] = []
    for (let y = 0; y < size.yLen; y++) {
        str = ""
        for (let x = 0; x < size.xLen; x++) {
            if(quadrants && (x == half.xlen || y == half.ylen)) {
                str += " "
            } else {
                str+= map[y][x] > 0 ?  `${map[y][x]}` : "."
            }
        }
        toPrint.push(str)
    }
    console.log(toPrint)
}


function asMap(robots: Robot[], size: Size) {
    let map: number[][] = []
    map.length = size.yLen
    for (let i = 0; i < map.length; i++) {
        map[i] = []
        map[i].length = size.xLen
    }

    for (let y = 0; y < size.yLen; y++) {
        for (let x = 0; x < size.xLen; x++) {
            map[y][x] = 0
        }
    }
    for (const robot of robots) {
        map[robot.position.y][robot.position.x]++
    }
    return map
}

async function solve(
    inputs: string[],
    part: number,
    test: boolean,
): Promise<number | string> {
    const robots = parseDay14(inputs);
    let size = {xLen: 101, yLen: 103};
    if (part == 1) {
        if (test)
            size = {xLen: 11, yLen: 7};
        moveRobots(robots, size, 100)
        return countQuadrants(robots, size).reduce((prod, v) => prod*v, 1)
    } else {
        let steps = 0
        let max = 0
        while (true) {
            steps++
            moveRobots(robots, size, 1)
            let map = asMap(robots, size)
            for (const {x,y} of makePositionIterator(map)) {
                let num = 1
                while (map[y][x+num] > 0) {
                    num++
                }
                max = Math.max(max, num)
            }

            if (max > 10) {
                printMap(map, size, false)
                return steps
            }
        }
    }
}

run(__filename, solve, {skipTests: false});