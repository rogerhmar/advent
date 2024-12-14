import { expect, test } from "vitest"
import {extrapolate} from "../../utils/position";
import {findAntinodes, parseDay8} from "../solutions/aoc2408";
import {move, parseDay14} from "../solutions/aoc2414";

test("parse", () => {
    const inputs = [
        "p=0,4 v=3,-3",
        "p=6,3 v=-1,-3"
    ]
    expect(parseDay14(inputs)).toEqual([{
        "position": {"x": 0, "y": 4,},
        "velocity": {"dx": 3, "dy": -3},
    }, {
        "position": {"x": 6, "y": 3,},
        "velocity": {"dx": -1, "dy": -3},
    },
    ])
})

test("move", () => {
    let size = {xlen: 5, ylen: 5}
    let robot = {
        "position": {"x": 0, "y": 0},
        "velocity": {"dx": 3, "dy": 3},
    }
    robot = move(robot, size)
    expect(robot.position).toEqual({"x": 3, "y": 3})

    robot = move(robot, size)
    expect(robot.position).toEqual({"x": 1, "y": 1})
})


test("move negatice", () => {
    let size = {xlen: 5, ylen: 5}
    let robot = {
        "position": {"x": 0, "y": 0},
        "velocity": {"dx": -2, "dy": -2},
    }
    robot = move(robot, size)
    expect(robot.position).toEqual({"x": 3, "y": 3})

    robot = move(robot, size)
    expect(robot.position).toEqual({"x": 1, "y": 1})
})

test("move example", () => {
    const inputs = [
        "p=0,4 v=3,-3",
        "p=6,3 v=-1,-3",
        "p=10,3 v=-1,2",
        "p=2,0 v=2,-1",
        "p=0,0 v=1,3",
        "p=3,0 v=-2,-2",
        "p=7,6 v=-1,-3",
        "p=3,0 v=-1,-2",
        "p=9,3 v=2,3",
        "p=7,3 v=-1,2",
        "p=2,4 v=2,-3",
        "p=9,5 v=-3,-3",
    ]
    const robots = parseDay14(inputs)
    const size = {xlen: 7, ylen: 11};
    for (let i = 0; i < 100; i++) {
    }
})


