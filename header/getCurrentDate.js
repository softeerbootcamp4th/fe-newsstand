import { formatNumberDigit } from "../utils/format.js";

export function getCurrentDate() {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const date = new Date();

    const currentYear = date.getFullYear();
    const currentMonth = formatNumberDigit(date.getMonth() + 1, 2);
    const currentDate = formatNumberDigit(date.getDate(), 2);
    const currentDay = date.getDay();

    return `${currentYear}. ${currentMonth}. ${currentDate}. ${days[currentDay]}요일`
}