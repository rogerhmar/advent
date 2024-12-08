export type Position = { x: number; y: number };

export function isOutside<T>(position: Position, inputs: readonly T[][]) {
    const xlen = inputs[0].length
    const ylen = inputs.length
    return  position.x >= xlen || position.y >= ylen || position.y < 0 || position.x < 0
}

export function isOutsideStr(position: Position, inputs: string []) {
    const xlen = inputs[0].length
    const ylen = inputs.length
    return  position.x >= xlen || position.y >= ylen || position.y < 0 || position.x < 0
}

export function equal(pos1?: Position, pos2?: Position)  {
    if(!pos2)
        return false
    if(!pos1)
        return false
    return (pos1.x == pos2.x && pos1.y == pos2.y)
}