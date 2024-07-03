/**
 * @description 숫자와 자리수를 받아서 자리 수에 맞게 앞에 0 패딩을 붙여주는 함수
 * 
 * @returns 2 -> "02"
 */
export function formatNumberDigit(number, digitLength) {
    return String(number).padStart(digitLength, '0')
}
