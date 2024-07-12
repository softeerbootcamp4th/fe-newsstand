import { getSubscriptionList } from "../../common/getSubscriptionList.js";
import { setSubscriptionList } from "../../common/setSubscriptionList.js";
import { getTheme } from "../../header/toggleTheme.js";
import { handleModalBtnClick } from "./handleModalClick.js";
import { updatePaginationButtons } from "./updatePaginationButtons.js";

const itemsPerPage = 24; // 한 페이지당 보여줄 아이템 수

export function createGridItem(companies, currentPage) {
    const gridContainer = document.querySelector('.grid-view-container');
    gridContainer.innerHTML = ""; // 이전 아이템을 모두 제거

    const startIdx = currentPage * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, companies.length);
    let subscriptionList = getSubscriptionList().reverse();
    const toastAlert = document.querySelector('.toast-alert');
    const modal = document.querySelector('.modal-container');
    const theme = getTheme();

    for (let i = 0; i < itemsPerPage; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        if (i < (endIdx - startIdx)) {
            const company = companies[startIdx + i].company;
            const imgElement = document.createElement('img');
            imgElement.classList.add('grid-logo-img');
            imgElement.src = theme === 'light' ? companies[startIdx + i].logoUrl : companies[startIdx + i].logoUrl.replace(/\.[^/.]+$/, "") + '_dark.png';
            imgElement.alt = company;

            const subscribeBtn = document.createElement('div');
            subscribeBtn.textContent = subscriptionList.includes(company) ? '+ 해지하기' : '+ 구독하기';
            subscribeBtn.classList.add('grid-sub-btn');

            subscribeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if(subscriptionList.includes(company)) {
                    document.querySelector('.modal-content').insertAdjacentHTML('afterbegin', `<div class="company-name"><span>${company}</span>을(를)</div>`);
                    modal.classList.add('show');
                    handleModalBtnClick(company);
                } else {
                    subscriptionList.push(company);
                    subscribeBtn.textContent = '+ 해지하기'
                    toastAlert.classList.add('show');
                    setTimeout(() => {
                        toastAlert.classList.remove('show');
                    }, 500);
                }
                setSubscriptionList(subscriptionList);


            });
            gridItem.appendChild(imgElement);
            gridItem.appendChild(subscribeBtn);

        }
        gridContainer.appendChild(gridItem);
    }

    updatePaginationButtons(currentPage, companies.length);
}
