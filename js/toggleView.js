import { category } from "./data.js";
import { initializeGridViewContainer } from "./displaygridViewnews.js";
import { createCategory, initlizeListViewFunction, loadCurrentCategoryNews } from "./displaylistViewNews.js";
import { getSubscriptionList, initalizeSubscribeFunction } from "./subscribe.js";

let prevViewType = null;
let prevTabType = 'all';

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.list-view-container')) {
        handleClickTab('list-view');
    } else {
        handleClickTab('grid-view');
    }

    setupViewToggle();
});

const setupViewToggle = () => {
    const listViewIcon = document.querySelector(".list-view");
    const gridViewIcon = document.querySelector(".grid-view");

    listViewIcon.addEventListener("click", () => {
        switchView('list-view');
    });

    gridViewIcon.addEventListener("click", () => {
        switchView('grid-view');
    });
};

const switchView = (viewType) => {
    const mainHeader = document.querySelector('.main-header');
    const listViewIcon = document.querySelector(".list-view");
    const gridViewIcon = document.querySelector(".grid-view");

    if (viewType === 'list-view') {
        gridViewIcon.classList.remove("selected-icon");
        gridViewIcon.src = "./src/icons/grid-view.svg";

        document.querySelector('.grid-view-container').remove();
        document.querySelector('.arrow.right-btn.grid').remove();
        document.querySelector('.arrow.left-btn.grid').remove();

        listViewIcon.classList.add("selected-icon");
        listViewIcon.src = "./src/icons/list-view-checked.svg";

        mainHeader.insertAdjacentHTML(
            "afterend",
            `
            <div class="list-view-container selected-view column-flex">
                <div class="list-view-header"></div>
                <div class="info hidden">구독한 언론사가 없습니다.</div>
                <div class="news-container column-flex">
                    <div class="container-header">
                        <img alt="company-logo" id="logo">
                        <p class="edit-date"></p>
                        <div class="subscribe-btn"><span>+</span>구독하기</div>
                    </div>
                    <div class="news-item-container">
                        <div class="main-news column-flex"></div>
                        <div class="sub-news column-flex"></div>
                    </div>
                </div>
            </div>
            <div class="arrow left-btn list">
                <img src="./src/images/LeftButton.png" alt="left-arrow">
            </div>
            <div class="arrow right-btn list">
                <img src="./src/images/RightButton.png" alt="left-arrow">
            </div>
            `
        );

        initalizeSubscribeFunction();
        initlizeListViewFunction();
        handleClickTab('list-view', prevTabType);

    } else if (viewType === 'grid-view') {
        listViewIcon.classList.remove("selected-icon");
        listViewIcon.src = "./src/icons/list-view.svg";

        document.querySelector('.list-view-container').remove();
        document.querySelector('.arrow.right-btn.list').remove();
        document.querySelector('.arrow.left-btn.list').remove();

        gridViewIcon.classList.add("selected-icon");
        gridViewIcon.src = "./src/icons/grid-view-checked.svg";

        mainHeader.insertAdjacentHTML(
            "afterend",`
            <div class="grid-view-container selected-view"></div>
            <div class="arrow left-btn grid">
                <img src="./src/images/LeftButton.png" alt="left-arrow">
            </div>
            <div class="arrow right-btn grid">
                <img src="./src/images/RightButton.png" alt="left-arrow">
            </div>
            `
        );

        initializeGridViewContainer('prevTabType');
        handleClickTab('grid-view', prevTabType);
    }

    checkCurViewType(viewType);
};

const handleTabClick = (tabType, viewType) => {
    const allTab = document.querySelector('.all');
    const subscribeTab = document.querySelector('.subscribe');

    allTab.classList.remove('selected-tab');
    subscribeTab.classList.remove('selected-tab');

    prevTabType = tabType; 

    if (tabType === 'all') {
        allTab.classList.add('selected-tab');
        if (viewType === 'list-view') {
            createCategory(category, 'all');
            loadCurrentCategoryNews('all');
        } else if (viewType === 'grid-view') {
            initializeGridViewContainer('all');
        }
    } else if (tabType === 'subscribe') {
        subscribeTab.classList.add('selected-tab');
        if (viewType === 'list-view') {
            let subscriptions = getSubscriptionList().reverse();
            createCategory(subscriptions, 'subscribe');
            loadCurrentCategoryNews('subscribe');
        } else if (viewType === 'grid-view') {
            initializeGridViewContainer('subscribe');
        }
    }
};

let allTabClickHandler = null;
let subscribeTabClickHandler = null;

export const handleClickTab = (viewType, initialTabType = 'all') => {
    const allTab = document.querySelector('.all');
    const subscribeTab = document.querySelector('.subscribe');

    if (allTabClickHandler) allTab.removeEventListener('click', allTabClickHandler);
    if (subscribeTabClickHandler) subscribeTab.removeEventListener('click', subscribeTabClickHandler);

    allTabClickHandler = () => handleTabClick('all', viewType);
    subscribeTabClickHandler = () => handleTabClick('subscribe', viewType);

    allTab.addEventListener('click', allTabClickHandler);
    subscribeTab.addEventListener('click', subscribeTabClickHandler);

    handleTabClick(initialTabType, viewType);
};

const checkCurViewType = (viewType) => {
    if (prevViewType !== viewType) {
        prevViewType = viewType;
    }
};

export const moveToSubscribeTab = () => {
    handleTabClick('subscribe', 'list-view');
};