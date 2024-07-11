import { category } from "./data.js";
import { fetchNewsData } from "./displaygridViewnews.js";
import { createCategory, initalizeHeaderScroll, initializeArrowBtn, loadCurrentCategoryNews } from "./displaylistViewNews.js";
import { handleModalBtnClick, handleSubscribeBtnClick, updateButton } from "./subscribe.js";
import { onThemeChange } from "./toggleTheme.js";

let curViewType = 'all';

export const initlizeListViewFunction = () => {
    createCategory(category, 'all');
    loadCurrentCategoryNews('all');
    initalizeHeaderScroll();
    initializeArrowBtn();

}

export function initalizeSubscribeFunction() {
    updateButton();
    handleSubscribeBtnClick();
    handleModalBtnClick();
}

export const initializeGridViewContainer = (type) => {
    fetchNewsData(type);
    curViewType = type;
}

export const handleThemeChange = () => {
    if(document.querySelector('.list-view-container')) {
        curViewType === 'all' ? initlizeListViewFunction() : initalizeSubscribeFunction();
        return;
    }
    onThemeChange(initializeGridViewContainer(curViewType));
}
