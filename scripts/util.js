function getCurrentDateString() {
    let kr_days = ["일","월","화","수","목","금","토"];
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth()+1;
    let date = currentDate.getDate();
    let day = currentDate.getDay();
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