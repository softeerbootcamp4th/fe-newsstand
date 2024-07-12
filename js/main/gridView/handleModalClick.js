import { getSubscriptionList } from "../../common/getSubscriptionList.js";
import { setSubscriptionList } from "../../common/setSubscriptionList.js";

export function handleModalBtnClick(company) {
    const modal = document.querySelector('.modal-container');
    /* 구독한 언론사에서 삭제 */
    let subscriptionList = getSubscriptionList();

    document.querySelector('.modal-confirm-btn').addEventListener('click', () => {
        modal.classList.remove('show');
        document.querySelector('.company-name')?.remove();
        subscriptionList = subscriptionList.filter(item => item !== company);
        setSubscriptionList(subscriptionList);
        document.querySelector('.grid-sub-btn').textContent = '+ 구독하기'  
        renderSelectedTab('subscribe', 'grid-view');    
    });

    document.querySelector('.modal-cancle-btn').addEventListener('click', () => {
        modal.classList.remove('show');
        document.querySelector('.company-name')?.remove();
    });
}