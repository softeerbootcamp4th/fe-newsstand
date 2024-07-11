import { getItem, setItem } from "../utils/local-storage.js";

/**
 * @description 다크모드 설정을 렌더하는 함수
 */
export function renderDarkmode() {
    renderDarkmodeButton();

    setDarkmode();
}

/**
 * @description 다크모드 버튼을 렌더하는 함수
 */
function renderDarkmodeButton() {
    const darkmodeButtonDOM = document.querySelector(".dark-mode__button");
    const isDarkmode = getItem("dark-mode") ?? false;

    const darkmodeButtonDOMString = isDarkmode ? `
            <img class="dark-mode__icon dark-mode__icon--dark" alt="라이트모드 전환 아이콘" src="./static/icons/moon.png" />
            ` : `
            <img class="dark-mode__icon" alt="다크모드 전환 아이콘" src="./static/icons/sun.png" />
            `;

    darkmodeButtonDOM.innerHTML = darkmodeButtonDOMString;

    const bodyDOM = document.querySelector("body");
    if (isDarkmode) {
        bodyDOM.classList.add("dark-mode");
    } else {
        bodyDOM.classList.remove("dark-mode");
    }
}

/**
 * @description 다크모드 관련 로직을 처리하는 함수
 */
function setDarkmode() {
    const darkmodeButtonDOM = document.querySelector(".dark-mode__button");

    darkmodeButtonDOM.addEventListener("click", clickDarkMode);
}

/**
 * @description 다크모드 버튼 클릭 이벤트 리스너
 */
function clickDarkMode() {
    const isDarkmode = getItem("dark-mode") ?? false;
    setItem("dark-mode", !isDarkmode);

    renderDarkmodeButton();
}