import { getItem } from "../utils/local-storage.js";

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
    const bodyDOM = document.querySelector("body");
    const isDarkmode = getItem("dark-mode") ?? false;

    const darkmodeButtonDOMString = `
    <button class="dark-mode__button">
        ${isDarkmode ? `
            <img class="dark-mode__icon" alt="라이트모드 전환 아이콘" src="./static/icons/moon.png" />
            ` : `
            <img class="dark-mode__icon" alt="다크모드 전환 아이콘" src="./static/icons/sun.png" />
            `}
    </button>
    `

    bodyDOM.insertAdjacentHTML("beforeend", darkmodeButtonDOMString);
}

/**
 * @description 다크모드 관련 로직을 처리하는 함수
 */
function setDarkmode() {

}