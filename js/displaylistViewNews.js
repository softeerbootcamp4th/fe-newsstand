import { category } from "./data.js";
import { getSubscriptionList } from "./subscribe.js";

let curCategoryIdx = 0;
let newsData = [];
let curNewsIdx = 0;
let prevCategoryType;
const intervalTime = 20000;
let progressBarTimeout;
let subscriptions;

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
            dataType === 'subscribe' && subscriptions.length === 0 ? showInformation() :displayNews(dataType);
            updateBtnVisibility();
            updateCategoryDisplay();
            startProgressBar(); // 첫 데이터 로드 후 프로그래스바 시작
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        dataType === 'subscribe' && subscriptions.length === 0 ? showInformation() :displayNews(dataType);
        updateBtnVisibility();
        updateCategoryDisplay();
        startProgressBar(); // 데이터 갱신 후 프로그래스바 시작
    }

}

export const showInformation = () => {
    document.querySelector('.news-container').classList.add('hidden');
    document.querySelector('.info').classList.remove('hidden');
}
;

const showNews = () => {
    document.querySelector('.news-container').classList.remove('hidden');
    document.querySelector('.info').classList.add('hidden');

}
/* 현재 카테고리의 뉴스 정보로 div 생성하는 함수 */
function displayNews(dataType) {

    subscriptions = getSubscriptionList().reverse();

    showNews();

    const mainNewsDiv = document.querySelector('.main-news');
    const subNewsDiv = document.querySelector('.sub-news');

    mainNewsDiv.innerHTML = '';
    subNewsDiv.innerHTML = '';

    const news = dataType === 'all' ?  newsData[curCategoryIdx].news[curNewsIdx] : newsData.flatMap(category => category.news.filter(newsItem => newsItem.company === subscriptions[curCategoryIdx]))[0];
    const subscribeBtn = document.querySelector('.subscribe-btn');


    if(subscriptions.includes(news.company)) {
        subscribeBtn.classList.add('my-subscribe');
        subscribeBtn.textContent = 'x';
    } else {
        subscribeBtn.classList.remove('my-subscribe');
        subscribeBtn.textContent = '+ 구독하기';
    }


    document.getElementById('logo').src = news.logoUrl;
    document.getElementById('logo').alt = news.company;
    document.querySelector('.edit-date').textContent = `${news.date} 편집`;

    const thumnbailImg = document.createElement('img');
    thumnbailImg.src = news.thumbnailUrl;
    const thumbnailNews = document.createElement('div');
    thumbnailNews.textContent = news.newsItems[0].title;

    mainNewsDiv.appendChild(thumnbailImg);
    mainNewsDiv.appendChild(thumbnailNews);

    news.newsItems.slice(1).forEach(n => {
        const newsItemDiv = document.createElement('div');
        newsItemDiv.classList.add('sub-news-item');
        newsItemDiv.textContent = n.title;
        newsItemDiv.addEventListener('click', () => {
            window.open(n.url, '_blank');
        });

        subNewsDiv.appendChild(newsItemDiv);
    });

    const explanationDiv = document.createElement('div');
    explanationDiv.classList.add('explanation');
    explanationDiv.textContent = `${news.company} 언론사에서 직접 편집한 뉴스 입니다.`;
    subNewsDiv.appendChild(explanationDiv);

    resetProgressBar();
}

function updateCategoryDisplay() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item, index) => {
        // 기존의 인덱스 요소 제거
        const existingIndexElement = prevCategoryType === 'all' ? item.querySelector('.index-text') : item.querySelector('.arrow-icon');
        if (existingIndexElement) {
            existingIndexElement.remove();
        }

        if(prevCategoryType === 'all') {
            // 새로운 인덱스 요소 생성 및 추가
            const textElement = document.createElement('span');
            textElement.classList.add('index-text');

            if (index === curCategoryIdx) {
                textElement.textContent = `${curNewsIdx + 1} / ${newsData[curCategoryIdx].news.length}`;
                item.classList.add('selected-category'); 
            } else {
                item.classList.remove('selected-category'); 
            }

            item.appendChild(textElement);
        }
        else {
            const imgElement = document.createElement('img');
            imgElement.classList.add('arrow-icon');
            if (index === curCategoryIdx) {
                imgElement.src = './src/icons/chevron-right.svg';
                imgElement.style.display = 'block';
                item.classList.remove('selected-category'); 
            } else {
                item.classList.remove('selected-category'); 
            }
            item.appendChild(imgElement);
        }
    });
}

/* 프로그래스바 삭제 */
function resetProgressBar() {
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
    updateProgressBar();
}

/* 프로그래스바 생성 */
function updateProgressBar() {
    const categoryItems = document.querySelectorAll('.category-item');
    const selectedDiv = categoryItems[curCategoryIdx];

    const progressBarDivElement = document.createElement('div');
    progressBarDivElement.classList.add('progress-bar');
    selectedDiv.appendChild(progressBarDivElement);

    progressBarDivElement.style.animation = `progressAnimation ${intervalTime / 1000}s linear forwards`;
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
        updateBtnVisibility();
        loadCurrentCategoryNews(prevCategoryType);
    }, intervalTime);
}

function showCategory(index) {
    const parentDiv = document.querySelector('.list-view-header');
    const selectedDiv = parentDiv.children[index];
    selectedDiv.classList.add('selected');
}

function updateBtnVisibility() {
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if(prevCategoryType === 'subscribe' || curNewsIdx === 0 ) {
        leftBtn.style.display = "none";
    }
    else {
        leftBtn.style.display = "block";
    }

    if(prevCategoryType === 'subscribe') {        
        rightBtn.style.display = "none";
        return;
    }
        
    if(curNewsIdx === newsData[curCategoryIdx].news.length-1) {
        rightBtn.style.display = "none";
    }
    else {
        rightBtn.style.display = "block";
    }
}

export const initializeArrowBtn = () => {
    const leftBtn = document.querySelector('.left-btn.list');
    const rightBtn = document.querySelector('.right-btn.list');

    leftBtn.addEventListener('click',() => {
        if(curNewsIdx > 0) {
            curNewsIdx--;
            resetProgressBar();
            updateBtnVisibility();
            loadCurrentCategoryNews(prevCategoryType);
        }
    });

    rightBtn.addEventListener('click', () => {
        if(curNewsIdx < newsData[curCategoryIdx].news.length - 1) {
            curNewsIdx++;
            resetProgressBar();
            updateBtnVisibility();
            loadCurrentCategoryNews(prevCategoryType);
        }
    });

}

function initalizeHeaderScroll() {
    const header = document.querySelector('.list-view-header');

    header.addEventListener('wheel', (event) => {
        if (event.deltaY === 0) return;
        event.preventDefault();
        header.scrollLeft += event.deltaY;
});
}

export const initlizeListViewFunction = () => {
    createCategory(category, 'all');
    loadCurrentCategoryNews('all');
    initalizeHeaderScroll();
    initializeArrowBtn();

}

document.addEventListener("DOMContentLoaded", () => {
    if(!document.querySelector('.list-view-container')) return;
    initlizeListViewFunction();
});


