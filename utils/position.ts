export type Position = { x: number; y: number };

export function isOutside<T>(position: Position, inputs: string [] | readonly T[][]) {
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

export function extrapolate(p1: Position, p2: Position ): Position[] {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return [{x: (p1.x-dx), y: (p1.y-dy)},{x: (p2.x+dx), y: (p2.y+dy)}];
}

export function extrapolateAll(p1: Position, p2: Position, isOut: (p: Position) => boolean): Position[] {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const all = []
    let i = 0
    while (true) {
        const dyi = i*dy
        const dxi = i*dx

        const n1 = {x: (p1.x-dxi), y: (p1.y-dyi)}
        const n1Out = isOut(n1)
        if(!n1Out)
            all.push(n1)

        const n2 = {x: (p2.x+dxi), y: (p2.y+dyi)}
        const n2Out = isOut(n2)
        if(!n2Out)
            all.push(n2);

        if (n1Out && n2Out) {
            return all
        }
        i++
    }
}