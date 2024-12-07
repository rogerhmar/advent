import { expect, test } from "vitest"
import {calculate} from "../solutions/aoc2407";

test("2 + 2", () => {
    expect(calculate(2, [2], ["+"])).toBe(4);
});

test("2 + 2 + 2", () => {
    expect(calculate(2, [2,2], ["+","+"])).toBe(6);
});

test("2 + 2 + 2 + 2", () => {
    expect(calculate(2, [2,2,2], ["+","+","+"])).toBe(8)
});

test("2 + 2 + 2 + 2 * 3", () => {
    expect(calculate(11, [6,16,20], ["+","*","+"])).toBe(292)
});

test("81 40 27", () => {
    expect(calculate(81 , [40, 27], ["*","+"])).toBe(3267)
});

test("8 23 23 4", () => {
    expect(calculate(8 , [23, 23, 4], ["||","||", "*"])).toBe(82323*4)
});
