import { TIME, TOGGLE } from "./magicValues.js";
import { renderToastPopup } from "./render.js";
import { handleToggleWithToggleName } from "./toggle.js";

export function addToastPopup(state) {
    const toastMessage = `내가 구독한 언론사에 추가되었습니다.`;
    const toastPopupDom = generateToastPopupDom(toastMessage);
    renderToastPopup(toastPopupDom);
    setTimeout(()=>{
        toastPopupDom.remove();
        handleToggleWithToggleName(state,TOGGLE.SUBSCRIBED);
    },TIME.SECOND * 5);
}

export function addDeletePopup() {
    //삭제모달    
    
}

export function generateToastPopupDom(message) {
    const toastDom = document.createElement('div');
    toastDom.classList.add('toast_popup','display-medium16');
    toastDom.textContent = message;
    return toastDom;
}