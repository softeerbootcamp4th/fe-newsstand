import { getSubscriptionList } from "../../common/getSubscriptionList.js";

export function updateSubButton() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const company = document.getElementById('logo').getAttribute('alt');
    const subscriptions = getSubscriptionList();

    if (subscriptions.includes(company)) {
        subscribeBtn.classList.remove('unsub');
        subscribeBtn.classList.add('my-subscribe');
        subscribeBtn.textContent = 'x';
    } else {
        subscribeBtn.classList.remove('my-subscribe');
        subscribeBtn.classList.add('unsub');
        subscribeBtn.textContent = '+ 구독하기';
    }
}
