
getTodayDate();

function getTodayDate() {
    const dateDiv = document.querySelector('.header-date');
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth()+1).toString().padStart(2,'0');
    const date = today.getDate().toString().padStart(2,'0');
    const day = today.getDay();
    const days = ['일','월','화','수','목','금','토'];

    const str = `${year}. ${month}. ${date}. ${days[day]}요일`
    dateDiv.textContent = str;

}
