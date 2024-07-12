import { category } from "../../data/categoryData.js";
import { createCategory, loadCurrentCategoryNews } from "./listView/displaylistViewNews.js";
import { initializeGridViewContainer } from "./init.js";
import { switchView } from "./switchView.js";
import { getSubscriptionList } from "../common/getSubscriptionList.js";

let prevTabType = 'all';
let allTabClickHandler = null;
let subscribeTabClickHandler = null;


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.list-view-container') ? handleClickTab('list-view') : handleClickTab('grid-view');
    setupViewToggle();
});

const setupViewToggle = () => {
    const listViewIcon = document.querySelector(".list-view");
    const gridViewIcon = document.querySelector(".grid-view");

    listViewIcon.addEventListener("click", () => {
        switchView(prevTabType, 'list-view');
    });

    gridViewIcon.addEventListener("click", () => {
        switchView(prevTabType, 'grid-view');
    });
};

export const renderSelectedTab = (tabType, viewType) => {
    const allTab = document.querySelector('.all');
    const subscribeTab = document.querySelector('.subscribe');
    const leftBtn = document.querySelector('.left-btn.grid');
    const rightBtn = document.querySelector('.right-btn.grid');

    allTab.classList.remove('selected-tab');
    subscribeTab.classList.remove('selected-tab');

    prevTabType = tabType;

    if (tabType === 'all') {
        allTab.classList.add('selected-tab');
        if (viewType === 'list-view') {
            createCategory(category, 'all');
            loadCurrentCategoryNews('all');
        } else {
            initializeGridViewContainer('all');
            if (leftBtn) leftBtn.style.display = 'block';
            if (rightBtn) rightBtn.style.display = 'block';
        }
    } else if (tabType === 'subscribe') {
        subscribeTab.classList.add('selected-tab');
        if (viewType === 'list-view') {
            let subscriptions = getSubscriptionList().reverse();
            createCategory(subscriptions, 'subscribe');
            loadCurrentCategoryNews('subscribe');
        } else {
            initializeGridViewContainer('subscribe');
            if (leftBtn) leftBtn.style.display = 'none';
            if (rightBtn) rightBtn.style.display = 'none';
        }
    }
};

export const handleClickTab = (viewType, initialTabType = 'all') => {
    const allTab = document.querySelector('.all');
    const subscribeTab = document.querySelector('.subscribe');

    if (allTabClickHandler) allTab.removeEventListener('click', allTabClickHandler);
    if (subscribeTabClickHandler) subscribeTab.removeEventListener('click', subscribeTabClickHandler);

    allTabClickHandler = () => renderSelectedTab('all', viewType);
    subscribeTabClickHandler = () => renderSelectedTab('subscribe', viewType);

    allTab.addEventListener('click', allTabClickHandler);
    subscribeTab.addEventListener('click', subscribeTabClickHandler);

    renderSelectedTab(initialTabType, viewType);
};
