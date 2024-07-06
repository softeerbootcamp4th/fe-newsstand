export const displayDate = () => {
    const days = ["일","월","화","수","목","금","토"];
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (1 + today.getMonth())).slice(-2);
    const date = ("0" + today.getDate()).slice(-2);
    const day = today.getDay();
    const formattedDate = `${year}. ${month}. ${date}. ${days[day]}요일`;

    document.getElementById('currentDate').innerText = formattedDate;
}