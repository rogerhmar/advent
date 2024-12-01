
export function ArrCount(a1: number[], num: number): number {
    return a1.reduce((acc, n) => num == n ? acc+1 : acc,0)
}

export function SplitInArrays(inputs: string[], splitBy: string) {
    let x1 = []
    let x2 = []
    for(let i in inputs) {
        let [x,y] = inputs[i].split(splitBy);
        x1.push(Number(x));
        x2.push(Number(y));
    }
    return [x1,x2];
}