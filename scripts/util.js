function getCurrentDateString() {
    const kr_days = ["일", "월", "화", "수", "목", "금", "토"];
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const day = currentDate.getDay();
    return `${year}. ${month}. ${date}. ${kr_days[day]}요일`;
}

export function setUpCurrentTime() {
    const currentDateString = getCurrentDateString();
    document.getElementById("date_section").innerHTML = currentDateString;
}

export function createDomFromString(htmlString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, 'text/html');
    return dom;
}

export function responseToJson(res) {
    return res.json();
}

export function assignCSS(DOM,styleJson) {
    Object.assign(DOM.style, styleJson);    
}

export function cleanUpHTML(DOM) {
    DOM.innerHTML = "";
}