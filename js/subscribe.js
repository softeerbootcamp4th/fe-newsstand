import { createCategory, displayInformation, loadCurrentCategoryNews } from "./category.js";
import { moveToSubscribeTab } from './mainTab.js';

document.addEventListener('DOMContentLoaded', () => {
    updateButton();
    handleSubscribeBtnClick();
    handleModalBtnClick();
});

function handleModalBtnClick() {
    const modal = document.querySelector('.modal-container');
    

    /* 구독한 언론사에서 삭제 */
    document.querySelector('.modal-confirm-btn').addEventListener('click', () => {
        const company = document.getElementById('logo').getAttribute('alt');
        modal.classList.remove('show');
        document.querySelector('.company-name').remove();
        let subscriptor = getSubscriptionList();

        subscriptor = subscriptor.filter(item => item !== company);

        setSubscriptionList(subscriptor);
        updateButton();
        createCategory(subscriptor, 'subscribe');
        subscriptor.length === 0 ? displayInformation() : loadCurrentCategoryNews('subscribe');
        
    });

    document.querySelector('.modal-cancle-btn').addEventListener('click', () => {
        modal.classList.remove('show');
        document.querySelector('.company-name').remove();
    });
}

export const getSubscriptionList = () => {
    const subscriptionList = localStorage.getItem('subscriptions');
    return subscriptionList ? JSON.parse(subscriptionList) : [];
}

function setSubscriptionList(subscriptionList) {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptionList));
}

function updateButton() {
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

function handleSubscribeBtnClick() {
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
            updateButton();

            // 토스트 알림 표시
            toastAlert.classList.add('show');
            setTimeout(() => {
                toastAlert.classList.remove('show');
                moveToSubscribeTab();
            }, 500);
        }
    });
}
