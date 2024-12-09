import {run} from "aoc-copilot";
type SectorId = {idx: number, size: number, block: number[], blockIndex: number}

export function parseDay9(inputs: string[]) {
    let sectors:SectorId[] = []
    let curr = 0
    for (let i = 0; i < inputs[0].length; i+=2) {
        const block:number[] = []
        const free = Number(inputs[0][i + 1]?? "0")
        const blocks = Number(inputs[0][i]?? "0")
        const id = Math.floor(i/2)
        for (let j = 0; j < blocks; j++) {
            block.push(id)
        }
        sectors.push({idx: curr, block, size: free + blocks, blockIndex: id})
        curr += free + blocks
    }
    return sectors
}

export function compact(sectors: SectorId[]) {
    let currentFree = sectors.findIndex(s => s.size > s.block.length)
    let currentBlock = sectors.length-1
    let tempSectors: SectorId[] = Array.from(sectors).map(s => ({...s}))

    while (tempSectors[currentFree].idx < tempSectors[currentBlock].idx) {
        while (tempSectors[currentBlock].block.length > 0) {
             currentFree = tempSectors.findIndex(s => s.size > s.block.length)
            if (currentFree >= currentBlock)
                return tempSectors
            if (currentFree == -1)
                continue
            let toMove = tempSectors[currentBlock].block.shift()
            if (toMove) {
                tempSectors[currentFree].block.push(toMove)
            }
        }
        currentBlock--
    }
    return tempSectors
}


export function compactFullBlock(sectors: SectorId[]) {
    let sectorsRev = Array.from(sectors).reverse()
    let tempSect: SectorId[] = Array.from(sectors).map(s => ({...s}))
    let sectionNumber = tempSect.length

    for (const sect of sectorsRev) {
        sectionNumber--
        let blockToMove = sect.block.filter(n => n == sect.blockIndex)

        let currentFree = tempSect.findIndex(s => (s.size >= s.block.length + blockToMove.length))
        if (currentFree == -1 || currentFree > sectionNumber)
            continue

        let toMove = Array.from(blockToMove)

        for (const number of toMove) {
            const index = tempSect[sectionNumber].block.lastIndexOf(number)
            if (index > -1) {
                if (index < tempSect[sectionNumber].block.length -1) {
                    tempSect[sectionNumber].block[index] = 0 // HACK: To handle moving elements before the end.
                } else {
                    tempSect[sectionNumber].block.splice(index, 1) // Delete element
                }
            }
        }

        tempSect[currentFree].block.push(...toMove)
    }
    return tempSect
}

export function getChecksum(sectors: SectorId[]) {
    const checksum = (sector: SectorId) =>
        sector.block.reduce((acc, n, ind) =>
            acc + (sector.idx + ind)*n,0)

    return sectors.reduce((sum, sector) => sum + checksum(sector),0)
}

async function solve(
    inputs: string[], // Contents of the example or actual inputs
    part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {

    if (part == 2) {
        return getChecksum(compactFullBlock(parseDay9(inputs)))
    } else {
        return getChecksum(compact(parseDay9(inputs)))
    }

}

run(__filename, solve);
