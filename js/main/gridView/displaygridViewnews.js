import { handleThemeChange, initializeGridViewContainer } from "../init.js";
import { getSubscriptionList, setSubscriptionList } from "../listView/subscribe.js";
import { getTheme, onThemeChange } from "../../header/toggleTheme.js";
import { handleTabClick } from "../toggleView.js";

let newsData = [];
let companies = [];
let currentPage = 0; // 현재 페이지를 추적하기 위한 변수
const itemsPerPage = 24; // 한 페이지당 보여줄 아이템 수
let subscriptionList;
let curViewType = 'all';

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.grid-view-container')) return;
    initializeGridViewContainer('all');
    handleThemeChange();
});

function createGridItem() {
    const gridContainer = document.querySelector('.grid-view-container');
    gridContainer.innerHTML = ""; // 이전 아이템을 모두 제거

    const startIdx = currentPage * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, companies.length);

    subscriptionList = getSubscriptionList().reverse();

    const toastAlert = document.querySelector('.toast-alert');
    const modal = document.querySelector('.modal-container');

    const theme = getTheme();
    console.log(theme);


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

    updatePaginationButtons();
}

function createGridSubscribeItem() {
    const gridContainer = document.querySelector('.grid-view-container');
    gridContainer.innerHTML = ""; // 이전 아이템을 모두 제거
    currentPage = 0;
    const startIdx = currentPage * itemsPerPage;
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
                    handleTabClick('subscribe', 'grid-view');    

                    setTimeout(() => {
                        toastAlert.classList.remove('show');
                        handleTabClick('subscribe', 'grid-view');    
                    }, 5000);
                }
            });
    
            gridItem.appendChild(imgElement);
            gridItem.appendChild(subscribeBtn);
                
        }
        gridContainer.appendChild(gridItem);
    }
}

function handleModalBtnClick(company) {
    const modal = document.querySelector('.modal-container');
    /* 구독한 언론사에서 삭제 */
    subscriptionList = getSubscriptionList();

    document.querySelector('.modal-confirm-btn').addEventListener('click', () => {
        modal.classList.remove('show');
        document.querySelector('.company-name')?.remove();
        subscriptionList = subscriptionList.filter(item => item !== company);
        setSubscriptionList(subscriptionList);
        document.querySelector('.grid-sub-btn').textContent = '+ 구독하기'  
        handleTabClick('subscribe', 'grid-view');    
    });

    document.querySelector('.modal-cancle-btn').addEventListener('click', () => {
        modal.classList.remove('show');
        document.querySelector('.company-name')?.remove();
    });
}

function updatePaginationButtons() {
    const leftBtn = document.querySelector('.left-btn.grid');
    const rightBtn = document.querySelector('.right-btn.grid');

    if (currentPage === 0) {
        leftBtn.style.display = 'none';
    } else {
        leftBtn.style.display = 'block';
    }

    if ((currentPage + 1) * itemsPerPage >= companies.length) {
        rightBtn.style.display = 'none';
    } else {
        rightBtn.style.display = 'block';
    }
}

function createPaginationButtons() {
    const leftBtn = document.querySelector('.left-btn.grid');
    const rightBtn = document.querySelector('.right-btn.grid');

    rightBtn.addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < companies.length) {
            currentPage++;
            createGridItem();
        }
    });

    leftBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            createGridItem();
        }
    });

    updatePaginationButtons();
}

export function fetchNewsData(type) {
    fetch("./data/allNews.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(data => {
            newsData = data;
            displayData();
            type === 'all' ? createGridItem() : createGridSubscribeItem();
            if(type === 'all') createPaginationButtons();
        })
        .catch(error => {
            console.error(error);
        });
}

function displayData() {
    let info = [];
    newsData.forEach(data => {
        data.news.forEach(newsItem => {
            info.push({company : newsItem.company, logoUrl : newsItem.logoUrl});
        });
    });

    companies = info;
}
