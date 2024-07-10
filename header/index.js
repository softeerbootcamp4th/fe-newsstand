import { getCurrentDate } from "./get-current-date.js";

function initHeader() {
    const currentDate = getCurrentDate();
    const currentDateDOM = document.querySelector('#header__current-date');
    
    currentDateDOM.textContent = currentDate;
}

initHeader();