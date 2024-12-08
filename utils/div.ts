export function combine(values: string[], length: number): string[][] {
    if (length === 1) {
        return values.map(value => [value]);
    } else {
        const result: string[][] = [];
        for (const combination of combine(values, length - 1)) {
            for (const value of values) {
                result.push([...combination, value]);
            }
        }
        return result;
    }
}