import { initalizeSubscribeFunction } from "../init.js";
import { renderSelectedTab } from '../toggleView.js';
import { getSubscriptionList } from "../../common/getSubscriptionList.js";
import { setSubscriptionList } from "../../common/setSubscriptionList.js";
import { updateSubButton } from "./updateSubButton.js";


export function handleSubscribeBtnClick() {
    document.querySelector('.subscribe-btn').addEventListener('click', () => {
        const company = document.getElementById('logo').getAttribute('alt');
        let subscriptions = getSubscriptionList();
        const toastAlert = document.querySelector('.toast-alert');
        const modal = document.querySelector('.modal-container');

        if (subscriptions.includes(company)) {
            // 구독 해지 모달을 띄움
            document.querySelector('.modal-content').insertAdjacentHTML('afterbegin', `<div class="company-name"><span>${company}</span>을(를)</div>`);
            modal.classList.add('show');
        } else {
            // 구독 추가
            subscriptions.push(company);
            setSubscriptionList(subscriptions);
            updateSubButton();

            // 토스트 알림 표시
            toastAlert.classList.add('show');
            setTimeout(() => {
                toastAlert.classList.remove('show');
                renderSelectedTab('subscribe', 'list-view');
            }, 500);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    if(!document.querySelector('.list-view-container')) return;
    initalizeSubscribeFunction();
});
