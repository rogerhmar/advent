import { expect, test } from "vitest"
import {
    calculateGPSScore,
    doubleBoard,
    parseDay15,
    printMap,
    solveDay15Gold,
    solveDay15Silver
} from "../solutions/aoc2415";

let bigStr= "##########\n" +
    "#..O..O.O#\n" +
    "#......O.#\n" +
    "#.OO..O.O#\n" +
    "#..O@..O.#\n" +
    "#O#..O...#\n" +
    "#O..O..O.#\n" +
    "#.OO.O.OO#\n" +
    "#....O...#\n" +
    "##########\n" +
    "\n" +
    "<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\n" +
    "vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n" +
    "><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n" +
    "<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n" +
    "^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n" +
    "^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n" +
    ">^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n" +
    "<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n" +
    "^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\n" +
    "v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^"

test("parse", () => {
    let inputs = bigStr.split("\n")
    expect(solveDay15Silver(inputs)).toEqual(10092)
})

test("12", () => {
    let smallStr = "########\n" +
        "#..O.O.#\n" +
        "##@.O..#\n" +
        "#...O..#\n" +
        "#.#.O..#\n" +
        "#...O..#\n" +
        "#......#\n" +
        "########\n" +
        "\n" +
        "<^^>>>vv<v>>v<<"

    let inputs = smallStr.split("\n")
    expect(solveDay15Silver(inputs)).toEqual(2028)

})

test("solveGold", () => {
    let inputs = bigStr.split("\n")
    expect(solveDay15Gold(inputs)).toEqual(9021)
})

test("123", () => {
    let state = "######\n#@O.O#\n######\n\n>>>>"
    let solution = solveDay15Gold(state.split("\n"))

})

test("1234", () => {
    let state = "######\n#.O.O@#\n######\n\n<<<<"
    let solution = solveDay15Gold(state.split("\n"))

})

test("12345", () => {
    let state =
        "#####\n" +
        "#....#\n" +
        "#....#\n" +
        "#.O..#\n" +
        "#.O..#\n" +
        "#.@..#\n" +
        "#####\n" +
        "\n" +
        "^^^"
    let solution = solveDay15Gold(state.split("\n"))

})

test("1234567", () => {
let inp = ["##################################################",
                    "#..O.O.....#O..#.#O.#.....#.OO...#O#.O...##...OO.#",
                    "#.#....##..#....#....@......O...O.....O.O...OOOOO#",
                "##################################################",
                ">"
                ]

    let {map, robot, instructions} = parseDay15(inp)
    expect(instructions).toEqual([">"])
    expect(robot).toEqual({x:21,y:2})

    let {map: map2, robot: robot2} = doubleBoard(map, robot)

    let doubleInp = inp.map(i => {
        i = i.replaceAll("O", "[]")
        i = i.replaceAll(".", "..")
        i = i.replaceAll("@", "@.")
        i = i.replaceAll("#", "##")
        return i
    })

    console.log(doubleInp)
    let {map: map3, instructions: instr, robot: robot3} = parseDay15(doubleInp)

    printMap(map2, robot2)
    printMap(map3, robot3)

})

test("12345678", () => {
    let map = [
        "##########".split("") ,
        "##..[]..##".split(""),
        "##########".split("")]
    expect(calculateGPSScore(map)).toEqual(104)

    let map2 = [
        "##########".split("") ,
        "##...[].##".split(""),
        "##########".split("")]
    expect(calculateGPSScore(map2)).toEqual(102)

})


test("123456789", () => {

    let map2 = [
        "##########".split("") ,
        "##...[].##".split(""),
        "##########".split("")]
    expect(calculateGPSScore(map2)).toEqual(103)

})

test("12345678910", () => {

    let map2 = [
        "##########".split("") ,
        "##.[]...##".split(""),
        "##########".split("")]
    expect(calculateGPSScore(map2)).toEqual(103)

})



