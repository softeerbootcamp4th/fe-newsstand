/**
 * @description localStorage에서 데이터를 get 해오는 함수
 */
export function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * @description localStorage에 데이터를 set 하는 함수
 */
export function setItem(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
}