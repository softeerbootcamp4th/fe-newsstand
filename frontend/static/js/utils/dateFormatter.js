export function dateFormatter(date, format) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    const map = {
        yyyy: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        dd: String(date.getDate()).padStart(2, '0'),
        HH: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0'),
        SSS: String(date.getMilliseconds()).padStart(3, '0'),
        DDD: days[date.getDay()]
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss|SSS|DDD/g, (matched) => map[matched]);
}
