import { category } from "./data.js";

let curCategoryIdx = 0;
let newsData = [];
let curNewsIdx = 0;
const intervalTime = 20000;

/* 카테고리 초기화 및 클릭 이벤트 추가 함수 */
function createCategory() {
    const parentDiv = document.querySelector('.all-cate-header');

    // 카테고리 아이템 생성 및 추가
    category.forEach((cat, idx) => {
        const divElement = document.createElement('div');
        divElement.classList.add('category-item');
        
        const textElement = document.createElement('span');
        textElement.textContent = cat;
        textElement.classList.add('category-text');
        
        divElement.appendChild(textElement);
        parentDiv.appendChild(divElement);

        // 카테고리명 선택하면 선택한 카테고리의 인덱스 가져옴
        divElement.addEventListener('click', () => {
            curCategoryIdx = idx;
            curNewsIdx = 0;
            resetProgressBar();
            loadCurrentCategoryNews();
            updateBtnVisibility();
        })
    });
   
}


/* 조회한 카테고리의 전체 뉴스 가져오는 함수 */
function loadCurrentCategoryNews() {

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
            displayNews();
            updateBtnVisibility();
            updateCategoryDisplay();
        })
        .catch(error => {
            console.error(error);
        });
    }
    else {
        displayNews();
        updateBtnVisibility();
        updateCategoryDisplay();
    }

    

}

/* 현재 카테고리의 뉴스 정보로 div 생성하는 함수 */
function displayNews() {
    const mainNewsDiv = document.querySelector('.main-news');
    const subNewsDiv = document.querySelector('.sub-news');

    mainNewsDiv.innerHTML = '';
    subNewsDiv.innerHTML = '';


    const news = newsData[curCategoryIdx].news[curNewsIdx];

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
        })

        subNewsDiv.appendChild(newsItemDiv);
    });

    const explanationDiv = document.createElement('div');
    explanationDiv.classList.add('explanation');
    explanationDiv.textContent = `${news.company} 언론사에서 직접 편집한 뉴스 입니다.`
    subNewsDiv.appendChild(explanationDiv);

    resetProgressBar();

}

function updateCategoryDisplay() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item, index) => {
        // 기존의 인덱스 요소 제거
        const existingIndexElement = item.querySelector('.index-text');
        if (existingIndexElement) {
            existingIndexElement.remove();
        }

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
    });
}


/* 프로그래스바 삭제 */
function resetProgressBar() {
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

function showCategory(index) {
    const parentDiv = document.querySelector('.all-cate-header');
    const selectedDiv = parentDiv.children[index];
    selectedDiv.classList.add('selected');
    selectedDiv.querySelector('.category-text').textContent = category[index];
}

function updateBtnVisibility() {
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if(curNewsIdx === 0) {
        leftBtn.style.display = "none";
    }
    else {
        leftBtn.style.display = "block";

    }

    if(curNewsIdx === newsData[curCategoryIdx].news.length-1) {
        rightBtn.style.display = "none";
    }
    else {
        rightBtn.style.display = "block";

    }

}

document.addEventListener("DOMContentLoaded", () => {
    createCategory();
    loadCurrentCategoryNews();

    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    leftBtn.addEventListener('click',() => {
        if(curNewsIdx > 0) {
            curNewsIdx--;
            resetProgressBar();
            updateBtnVisibility();
            loadCurrentCategoryNews();

        }
    });

    rightBtn.addEventListener('click', () => {
        if(curNewsIdx < newsData[curCategoryIdx].news.length - 1) {
            curNewsIdx++;
            resetProgressBar();
            updateBtnVisibility();
            loadCurrentCategoryNews();
        }
    });

    setInterval(() => {
        if(curNewsIdx < newsData[curCategoryIdx].news.length -1) {
            curNewsIdx++;
        }
        else if(curCategoryIdx < category.length -1) {
            curCategoryIdx++;
            curNewsIdx = 0;
        }
        else {
            curCategoryIdx = 0;
            curNewsIdx = 0;
        }
        updateBtnVisibility();
        loadCurrentCategoryNews();
    },intervalTime);
});    