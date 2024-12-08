import { expect, test } from "vitest"
import {calculate} from "../solutions/aoc2407";
import {combine} from "../../utils/div";
import {extrapolate, extrapolateAll, findAntinodes, parseDay8} from "../solutions/aoc2408";

test("extrapolated1", () => {
    const p1 = {x:3, y:0}
    const p2 = {x:2, y:0}
    expect(extrapolate(p1,p2)).toEqual([{x:4,y:0},{x:1,y:0}]);
});

test("extrapolated22", () => {
    const p1 = {x:0, y:2}
    const p2 = {x:0, y:3}
    expect(extrapolate(p1,p2)).toEqual([{x:0,y:1},{x:0,y:4}]);
});

test("extrapolated11", () => {
    const p2 = {x:3, y:0}
    const p1 = {x:2, y:0}
    expect(extrapolate(p1,p2)).toEqual([{x:1,y:0},{x:4,y:0}]);
});

test("extrapolated23", () => {
    const p1 = {x:0, y:3}
    const p2 = {x:0, y:2}
    expect(extrapolate(p1,p2)).toEqual([{x:0,y:4},{x:0,y:1}]);
});

test("extrapolated24", () => {
    const p1 = {x:4, y:3}
    const p2 = {x:5, y:5}
    expect(extrapolate(p1,p2)).toEqual([{x:3,y:1},{x:6,y:7}]);
});

test("findAntinodes", () => {
    const inputs = [
'T.........',
'...T......',
'.T........',
'..........',
'..........',
'..........',
'..........',
'..........',
'..........',
'..........',
    ]
    const antennas = parseDay8(inputs);
    expect(findAntinodes(antennas, inputs, 1)).toEqual(3)
    expect(findAntinodes(antennas, inputs, 2)).toEqual(9)
})

