import { formatNumberDigit } from "../utils/format.js";

/**
 * @description 현재 날짜를 포맷해서 반환해주는 함수
 * 
 * @returns 2024. 07. 02. 화요일
 */
export function getCurrentDate() {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const date = new Date();

    const currentYear = date.getFullYear();
    const currentMonth = formatNumberDigit(date.getMonth() + 1, 2);
    const currentDate = formatNumberDigit(date.getDate(), 2);
    const currentDay = date.getDay();

    return `${currentYear}. ${currentMonth}. ${currentDate}. ${days[currentDay]}요일`
}