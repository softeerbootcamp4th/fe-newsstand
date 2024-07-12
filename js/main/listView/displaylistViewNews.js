import { category } from "../../../data/categoryData.js";
import { initlizeListViewFunction } from "../init.js";
import { getSubscriptionList } from "./subscribe.js";
import { displayNews } from "./displayNews.js";
import { showCategory } from "./showCategory.js";
import { showInformation } from "./showInformation.js";
import { updateCategoryDisplay } from "./updateCategoryDisplay.js";
import { updateProgressBar } from "./updateProgressBar.js";
import { updateBtnVisibility } from "./updateBtnVisibility.js";

let curCategoryIdx = 0;
let newsData = [];
let curNewsIdx = 0;
let prevCategoryType;
let progressBarTimeout;
let subscriptions;


/* 카테고리 초기화 및 클릭 이벤트 추가 함수 */
export const createCategory = (data, dataType) => {
    const parentDiv = document.querySelector('.list-view-header');
    parentDiv.innerHTML = '';

    checkCurDataType(dataType);

    if(dataType === 'subscribe' && data.length === 0) {
        const divElement = document.createElement('div');
        divElement.classList.add('category-item');
        parentDiv.appendChild(divElement);
        return;
    }

    // 카테고리 아이템 생성 및 추가
    data?.forEach((cat, idx) => {
        const divElement = document.createElement('div');
        divElement.classList.add('category-item');
        
        const textElement = document.createElement('span');
        textElement.textContent = cat;
        textElement.classList.add('category-text');
        
        divElement.appendChild(textElement);
        parentDiv.appendChild(divElement);

        curCategoryIdx = 0;

        // 카테고리명 선택하면 선택한 카테고리의 인덱스 가져옴
        divElement.addEventListener('click', () => {
            curCategoryIdx = idx;
            curNewsIdx = 0;
            resetProgressBar();
            loadCurrentCategoryNews(dataType);
        });
    });

}

/* 다른 탭을 선택했을 때 초기화 함수 */
function checkCurDataType(dataType) {
    if(prevCategoryType !== dataType) {
        newsData = [];
        curCategoryIdx = 0;
        curNewsIdx = 0;
        prevCategoryType = dataType;
        subscriptions = getSubscriptionList().reverse();
    }
}

/* 조회한 카테고리의 전체 뉴스 가져오는 함수 */
export const loadCurrentCategoryNews = (dataType) => {

    checkCurDataType(dataType);
    subscriptions = getSubscriptionList().reverse();

    if(!newsData.length) {
        fetch("./data/allNews.json")
        .then(response => {
            if(!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(data => {
            newsData = data;
            let news = dataType === 'all' ? newsData[curCategoryIdx].news[curNewsIdx] : newsData.flatMap(category => category.news.filter(newsItem => newsItem.company === subscriptions[curCategoryIdx]))[0];
            dataType === 'subscribe' && subscriptions.length === 0 ? showInformation() : displayNews(news);
            updateBtnVisibility(prevCategoryType, curCategoryIdx, curNewsIdx, newsData);
            updateCategoryDisplay(curCategoryIdx, prevCategoryType, newsData, curNewsIdx);
            startProgressBar(); // 첫 데이터 로드 후 프로그래스바 시작
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        let news = dataType === 'all' ? newsData[curCategoryIdx].news[curNewsIdx] : newsData.flatMap(category => category.news.filter(newsItem => newsItem.company === subscriptions[curCategoryIdx]))[0];
        dataType === 'subscribe' && subscriptions.length === 0 ? showInformation() : displayNews(news);
        updateBtnVisibility(prevCategoryType, curCategoryIdx, curNewsIdx, newsData);
        updateCategoryDisplay(curCategoryIdx, prevCategoryType, newsData, curNewsIdx);
        startProgressBar(); // 데이터 갱신 후 프로그래스바 시작
    }

}


function startProgressBar() {
    clearTimeout(progressBarTimeout);
    progressBarTimeout = setTimeout(() => {
        if(prevCategoryType === 'subscribe') {
            subscriptions = getSubscriptionList().reverse();
            if(curCategoryIdx < subscriptions.length-1){
                curCategoryIdx++;
            }
            else curCategoryIdx = 0;
        }
        else {
            if(curNewsIdx < newsData[curCategoryIdx].news.length - 1) {
                curNewsIdx++;
            } else if(curCategoryIdx < category.length - 1) {
                curCategoryIdx++;
                curNewsIdx = 0;
            } else {
                curCategoryIdx = 0;
                curNewsIdx = 0;
            }
        }
        updateBtnVisibility(prevCategoryType, curCategoryIdx, curNewsIdx, newsData);
        loadCurrentCategoryNews(prevCategoryType);
    }, 20000);
}

/* 프로그래스바 삭제 */
export function resetProgressBar() {
    clearTimeout(progressBarTimeout);
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.classList.remove('selected');
        const progressBarDivElement = item.querySelector('.progress-bar');
        if(progressBarDivElement) {
            progressBarDivElement.remove();
        }
    });
    showCategory(curCategoryIdx);
    updateProgressBar(curCategoryIdx);
}



export const initializeArrowBtn = () => {
    const leftBtn = document.querySelector('.left-btn.list');
    const rightBtn = document.querySelector('.right-btn.list');

    leftBtn.addEventListener('click',() => {
        if(curNewsIdx > 0) {
            curNewsIdx--;
            resetProgressBar();
            updateBtnVisibility(prevCategoryType, curCategoryIdx, curNewsIdx, newsData);
            loadCurrentCategoryNews(prevCategoryType);
        }
    });

    rightBtn.addEventListener('click', () => {
        if(curNewsIdx < newsData[curCategoryIdx].news.length - 1) {
            curNewsIdx++;
            resetProgressBar();
            updateBtnVisibility(prevCategoryType, curCategoryIdx, curNewsIdx, newsData);
            loadCurrentCategoryNews(prevCategoryType);
        }
    });

}


document.addEventListener("DOMContentLoaded", () => {
    if(!document.querySelector('.list-view-container')) return;
    initlizeListViewFunction();
});


