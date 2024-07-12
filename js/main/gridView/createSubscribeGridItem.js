import { getSubscriptionList } from "../../common/getSubscriptionList.js";
import { setSubscriptionList } from "../../common/setSubscriptionList.js";
import { getTheme } from "../../header/toggleTheme.js";
import { renderSelectedTab } from "../toggleView.js";
import { handleModalBtnClick } from "./handleModalClick.js";

export function createGridSubscribeItem(companies) {
    const gridContainer = document.querySelector('.grid-view-container');
    gridContainer.innerHTML = ""; // 이전 아이템을 모두 제거

    const itemsPerPage = 24;
    const startIdx = 0 * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, companies.length);
    let subscriptionList = getSubscriptionList().reverse();
    const toastAlert = document.querySelector('.toast-alert');
    const modal = document.querySelector('.modal-container');
    const theme = getTheme();


    // 로컬 스토리지에 있는 아이템만 필터링
    const subscribedCompanies = companies.filter(company => subscriptionList.includes(company.company));

    for (let i = 0; i < itemsPerPage; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        if(i < subscribedCompanies.length && i < (endIdx - startIdx)) {
            const company = subscribedCompanies[startIdx + i]?.company;
            const imgElement = document.createElement('img');
            imgElement.classList.add('grid-logo-img');
            imgElement.src = theme === 'light' ? companies[startIdx + i].logoUrl : companies[startIdx + i].logoUrl.replace(/\.[^/.]+$/, "") + '_dark.png';
            imgElement.alt = company;
    
            const subscribeBtn = document.createElement('div');
            subscribeBtn.textContent = subscriptionList.includes(company) ? '+ 해지하기' : '+ 구독하기';
            subscribeBtn.classList.add('grid-sub-btn');
    
            subscribeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (subscriptionList.includes(company)) {
                    document.querySelector('.modal-content').insertAdjacentHTML('afterbegin', `<div class="company-name"><span>${company}</span>을(를)</div>`);
                    modal.classList.add('show');
                    handleModalBtnClick(company);
                } else {
                    subscriptionList.push(company);
                    setSubscriptionList(subscriptionList);
                    subscribeBtn.textContent = '+ 해지하기';
                    toastAlert.classList.add('show');
                    renderSelectedTab('subscribe', 'grid-view');    

                    setTimeout(() => {
                        toastAlert.classList.remove('show');
                        renderSelectedTab('subscribe', 'grid-view');    
                    }, 5000);
                }
            });
    
            gridItem.appendChild(imgElement);
            gridItem.appendChild(subscribeBtn);
                
        }
        gridContainer.appendChild(gridItem);
    }
}
