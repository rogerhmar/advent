import { expect, test } from "vitest"
import {calculate} from "../solutions/aoc2407";
import {combine} from "../../utils/div";
import {equal, getAdjacent, isOutside, makePositionIterator, Position} from "../../utils/position";
import {sum} from "../../utils/array";
import {solveDay12} from "../solutions/aoc2412";

// A = 4 * 1 = 4        4
// AA = 6 * 2 = 12      8
// AAA = 8 * 3 => 24    12
// AAAA = 10 * 4 => 40  16

// AAA
//  A   == 10 -> 23

// AA
// A

// AA
// AA   == 8 -> +2

// AAA
// AAA
// AAA


// AAA
// AAA   == 10 + 1


test("2", () => {
    const input = [
    "RRRRIICCFF",
    "RRRRIICCCF",
    "VVRRRCCFFF",
    "VVRCCCJFFF",
    "VVVVCJJCFE",
    "VVIVCCJJEE",
    "VVIIICJJEE",
    "MIIIIIJJEE",
    "MIIISIJEEE",
    "MMMISSJEEE",
        ]

    const s = solveDay12(input)
    expect(s).toEqual(1930)

})


test("1", () => {
    const inputs = [
        "AAAA",
        "BBCD",
        "BBCC",
        "EEEC"
    ]

    expect(solveDay12(inputs)).toBe(140);

});

