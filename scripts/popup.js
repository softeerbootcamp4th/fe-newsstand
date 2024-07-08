import { renderToastPopup } from "./render.js";

export function addToastPopup(name) {
    let toastMessage = `내가 구독한 언론사에\n${name}가 추가되었습니다.`;
    renderToastPopup(toastMessage);
}

export function addDeletePopup() {
    //삭제모달    
    
}