import { TIME } from "./magicValues.js";
import { renderToastPopup } from "./render.js";

export function addToastPopup(name) {
    const toastMessage = `내가 구독한 언론사에\n${name}가 추가되었습니다.`;
    const toastPopupDom = generateToastPopupDom(toastMessage);
    renderToastPopup(toastPopupDom);
    setTimeout(()=>{
        toastPopupDom.remove();
        
    },TIME.SECOND * 5);
}

export function addDeletePopup() {
    //삭제모달    
    
}

export function generateToastPopupDom(message) {
    const toastDom = document.createElement('div');
    toastDom.classList.add('toast_popup');
    toastDom.textContent = message;
    return toastDom;
}