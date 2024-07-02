export function formatNumberDigit(number, digitLength) {
    return String(number).padStart(digitLength, '0')
}