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

/**
 * @description 주어진 숫자를 경계 내 값에서 리턴하는 함수 
 * 
 * @returns -1 -> maxNumber
 */
export function getBoundNumber(number, minNumber, maxNumber) {
    if (number >= minNumber && number <= maxNumber) {
        return number;
    }

    if (number < minNumber) {
        return maxNumber;
    }

    return minNumber;
}