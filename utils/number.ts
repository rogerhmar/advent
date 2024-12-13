
export function isNaturalNumber(number: number) {
    if (number < 0)
        return false;
    let numStr = number.toString();
    let n1 = Math.abs(number);
    let n2 = parseInt(numStr, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === numStr;
}
