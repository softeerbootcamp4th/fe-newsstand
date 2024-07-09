import { createCategory, loadCurrentCategoryNews } from "./category.js";
import { category } from './data.js';
import { getSubscriptionList } from "./subscribe.js";


document.addEventListener("DOMContentLoaded", () => {

    const allTab = document.querySelector('.all');
    const subscribeTab = document.querySelector('.subscribe');

    allTab.addEventListener('click', () => {
        subscribeTab.classList.remove('selected-tab');
        allTab.classList.add('selected-tab');
        createCategory(category, 'all');
        loadCurrentCategoryNews('all');
    })
    subscribeTab.addEventListener('click', () => {
        moveToSubscribeTab();
    })
})

export const moveToSubscribeTab = () => {
    const allTab = document.querySelector('.all');
    const subscribeTab = document.querySelector('.subscribe');

    let subscriptions = getSubscriptionList().reverse();
    allTab.classList.remove('selected-tab');
    subscribeTab.classList.add('selected-tab');
    createCategory(subscriptions, 'subscribe');
    loadCurrentCategoryNews('subscribe');
}
