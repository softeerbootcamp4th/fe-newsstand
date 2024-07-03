import { getTimetoString } from "./getTimeToString.js";

export function initNewsstandHeaderTime() {
    const currentDateString = getTimetoString("yyyy. MM. dd. DDD요일");
    const currentDateDOM = document.querySelector('.titleDate');

    currentDateDOM.textContent = currentDateString;
}

initNewsstandHeaderTime();

