import { nowMediaName } from "../../pages/state/newsState.js"

export const createAlert = () => {
    return `
        <div class="alert-wrapper flex-col">
            <div class="alert-msg-wrapper">
                <p class="alert-msg">${`${nowMediaName}을(를)`}</p>
                <p>구독해지하시겠습니까</p>
            </div>
            <div class="alert-btn-wrapper flex-row-between">
                <button class="alert-accept-btn">예, 해지합니다</button>
                <button class="alert-cancle-btn">아니오</button>
            </div>        
        <div>
    `
}