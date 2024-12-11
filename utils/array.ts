export function arrCount(a1: number[], num: number): number {
    return a1.reduce((acc, n) => num == n ? acc+1 : acc,0)
}

export function arrayEquals<T>(a:T[], b:T[]) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

export function removeItem<T>(arr: Array<T>, index: number): Array<T> {
    return [...arr.slice(0, index), ...arr.slice(index+1)]
}

export function sum(numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};
