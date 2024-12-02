
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

export function arrayEquals(a:number[], b:number[]) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

export function removeItem<T>(arr: Array<T>, index: number): Array<T> {
    return [...arr.slice(0, index), ...arr.slice(index+1)]
}