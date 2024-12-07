
export function combine(values: string[], length: number) {
    const result: string[] = [];
    const total = Math.pow(values.length, length);
    for (let i = 0; i < total; i++) {
        let combination = '';
        let index = i;
        for (let j = 0; j < length; j++) {
            combination = values[index % values.length] + "," +  combination;
            index = Math.floor(index / values.length);
        }
        result.push(combination.slice(0, combination.length-1));
    }
    return result.map(r => r.trim().split(",").map(v => v.trim()));
}