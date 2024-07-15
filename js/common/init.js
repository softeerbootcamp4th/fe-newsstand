import { category } from "../../data/categoryData.js";
import { fetchNewsData } from "../main/gridView/displaygridViewnews.js";
import { createCategory, initializeArrowBtn, loadCurrentCategoryNews } from "../main/listView/displaylistViewNews.js";
import { onThemeChange } from "../header/toggleTheme.js";
import { initializeHeaderScroll } from "../main/listView/inititalizeHeaderComponent.js.js";
import { updateSubButton } from "../main/listView/updateSubButton.js";
import { handleModalBtnClick } from "../main/listView/handleModalBtnClick.js";
import { handleSubscribeBtnClick } from "../main/listView/handleSubscribeBtnClick.js";

let curViewType = 'all';

export const initlizeListViewFunction = () => {
    createCategory(category, 'all');
    loadCurrentCategoryNews('all');
    initializeHeaderScroll();
    initializeArrowBtn();

}

export function initalizeSubscribeFunction() {
    updateSubButton();
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
