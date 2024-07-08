export const getTodayString = () => {
    const date = new Date()
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const dayName = days[date.getDay()]

    return `${year}.${month}.${day} ${dayName}`
}
