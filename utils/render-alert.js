import { convertToMarkdown } from "./convert-to-markdown.js";

/**
 * @description alert를 렌더하는 함수
 */
export function renderAlert(text, id, leftButtonText, rightButtonText, leftButtonEventHandler, rightButtonEventHandler) {
    const markdownText = convertToMarkdown(text, 16);

    const bodyDOM = document.querySelector("body");
    const alertDOMString = `
    <section id="alert-${id}" class="alert__wrapper">
        <section class="alert__container">
            <section class="alert__contents">${markdownText}</section>
        
            <section class="alert__buttons">
                <p class="alert__button alert__button--left text__medium16">${leftButtonText}</p>
                <p class="alert__button alert__button--right text__medium16 text--strong">${rightButtonText}</p>
            </section>
        </section>
    </section>`;

    bodyDOM.insertAdjacentHTML("beforeend", alertDOMString);

    setAlertEvent(leftButtonEventHandler, rightButtonEventHandler);
    setAlertOutsideEvent(id);
}

/**
 * @description alert 이벤트 리스너 부착하는 함수
 */
function setAlertEvent(leftButtonEventHandler, rightButtonEventHandler) {
    const leftButtonDOM = document.querySelector(".alert__button--left");
    const rightButtonDOM = document.querySelector(".alert__button--right");
    leftButtonDOM.addEventListener("click", leftButtonEventHandler);
    rightButtonDOM.addEventListener("click", rightButtonEventHandler);
}
/**
 * @description alert 외부 영역 클릭 이벤트를 부착하는 함수
 */
function setAlertOutsideEvent(id) {
    const alertWrapperDOM = document.querySelector(`#alert-${id}`);
    alertWrapperDOM.addEventListener("click", clickAlertOutside);
    function clickAlertOutside(e) {
        if (e.target !== alertWrapperDOM) {
            return;
        }

        const bodyDOM = document.querySelector("body");
        bodyDOM.removeChild(alertWrapperDOM);
    }
}