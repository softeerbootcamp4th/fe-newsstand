export const getDate = () => {
    const now = document.getElementById("nowDate");
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const nowDay = String(date.getDate()).padStart(2, "0");
    const days = ["일", "월", "화", "수", "목", "금", "토"]
    const day = date.getDay();
    now.innerText = `${year}. ${month}. ${nowDay}. ${days[day]}요일`;
};

