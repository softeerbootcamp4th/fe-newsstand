import { handleThemeChange, initializeGridViewContainer } from "../../common/init.js";
import { filterData } from "./filterData.js";
import { createGridItem } from "./createGridItem.js";
import { createPaginationButtons } from "./createPaginationButton.js";
import { createGridSubscribeItem } from "./createSubscribeGridItem.js";

let companies = [];
let currentPage = 0; // 현재 페이지를 추적하기 위한 변수

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.grid-view-container')) return;
    initializeGridViewContainer('all');
    handleThemeChange();
});


export function fetchNewsData(type) {
    fetch("./data/allNews.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(data => {
            companies = filterData(data);
            type === 'all' ? createGridItem(companies, currentPage) : createGridSubscribeItem(companies);
            if(type === 'all') createPaginationButtons(currentPage, companies);
        })
        .catch(error => {
            console.error(error);
        });
}