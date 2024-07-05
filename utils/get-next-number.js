/**
 * @description 주어진 숫자의 다음 숫자를 리턴하는 함수 
 * 
 * @returns 1 -> 2
 */
export function getNextNumber(number, maxNumber = Infinity) {
    if (number + 1 < maxNumber) {
        return number + 1;
    }
    return 0;
}