document.addEventListener('DOMContentLoaded', () => {
    handleSubscribe();
    updateButton();
});

export const getSubscriptionList =  () =>  {
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

    if(subscriptions.includes(company)) {
        subscribeBtn.classList.add('my-subscribe');
        subscribeBtn.textContent = 'x';
    } else {
        subscribeBtn.classList.remove('my-subscribe');
        subscribeBtn.textContent = '+ 구독하기';
    }
}

function handleSubscribe() {
    let subscriptor = getSubscriptionList();

    const subscribeBtn = document.querySelector('.subscribe-btn');

    subscribeBtn.addEventListener('click', () => {
        const company = document.getElementById('logo').getAttribute('alt');

        if(subscriptor.includes(company)) {
            subscriptor = subscriptor.filter(item => item !== company);
        } else {
            subscriptor.push(company);
        }

        setSubscriptionList(subscriptor);
        updateButton(); // 버튼 상태 업데이트
    });
}
