
export function separateId(id) {
    const parts = id.split('-');
    return parseInt(parts[parts.length - 1], 10);
}

export function getDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const dayOfWeek = daysOfWeek[currentDate.getDay()]; // 0부터 일요일

    return `${year}. ${month}. ${day}. ${dayOfWeek}`;
}