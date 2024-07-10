import { showsubscribe } from "../subscribe/subscribe.js";
import { transformToProgress, resetProgress } from "../progressbar/progressbutton.js";
//카테고리별 제목이 들어있는 배열
import { newstype } from "../newstab/newstab.js";
import { moveToNextCatidx } from "../progressbar/progressbutton.js";

window.newsData = [];
//각 카테고리별 페이지수 배열
export let testingpages = [];
//전역변수 - 포인터
export var indexstate = {
    //현재 뉴스 종류
    pressIndex: 0,
    //현재 페이지 인덱스
    pageIndex: 0
};
let buttonId = "";

window.onload = async () => {
    try {
        const response = await fetch('../../news/allnews.json');
        const data = await response.json();
        window.newsData = data;
        testingpages = countpages(newsData);
        const buttons = document.querySelectorAll('.text-button');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                resetProgress();
                indexstate.pressIndex = Number(button.dataset.index);
                indexstate.pageIndex = 0;
                buttonId = button.id;
                updateNewsDisplay(buttonId, indexstate.pageIndex);
                transformToProgress(event.currentTarget);
            });            
        });
        //초기에는 경제기사를 디폴트 값으로 한다.
        updateNewsDisplay("economy", indexstate.pageIndex);
        const ts = document.querySelector(".text-button");
        transformToProgress(ts);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}; 

var btnRight = document.getElementById('btnRight');
var btnLeft = document.getElementById('btnLeft');

function updateList(pridx) {
    // 왼쪽 버튼 상태 업데이트
    if (indexstate.pageIndex === 0) {
        btnLeft.classList.add('disabled');
    } else {
        btnLeft.classList.remove('disabled');
    }

    if (indexstate.pageIndex >= testingpages[pridx] - 1) {
        indexstate.pressIndex = getNextPressIndex(pridx);
        indexstate.pageIndex = 0;
        buttonId = newstype[indexstate.pressIndex];
        resetProgress();
        const nextButton = document.querySelector(`.text-button[data-index="${indexstate.pressIndex}"]`);
        transformToProgress(nextButton);
        updateNewsDisplay(buttonId, indexstate.pageIndex);
    } else {
        btnRight.classList.remove('disabled');
    } 
}

btnRight.addEventListener('click', () => {
    rightButtonClick(indexstate.pressIndex);
});

btnLeft.addEventListener('click', () => {
    leftButtonClick();
});

function rightButtonClick(pridx) {
    if (indexstate.pageIndex < testingpages[pridx] - 1) {
        indexstate.pageIndex++;
    } else {
        indexstate.pressIndex = getNextPressIndex(pridx);
        indexstate.pageIndex = 0;
        buttonId = newstype[indexstate.pressIndex];
        resetProgress();
        const nextButton = document.querySelector(`.text-button[data-index="${indexstate.pressIndex}"]`);
        transformToProgress(nextButton);
    }
    updateList(indexstate.pressIndex);
    updateNewsDisplay(buttonId, indexstate.pageIndex);
}

function leftButtonClick() {
    if (indexstate.pageIndex > 0) {
        indexstate.pageIndex--;
    } else {
        if (indexstate.pressIndex > 0) {
            indexstate.pressIndex--;
        } else {
            indexstate.pressIndex = newstype.length - 1;
        }
        indexstate.pageIndex = testingpages[indexstate.pressIndex] - 1;
        buttonId = newstype[indexstate.pressIndex];
        resetProgress();
        const nextButton = document.querySelector(`.text-button[data-index="${indexstate.pressIndex}"]`);
        transformToProgress(nextButton);
    }
    updateList(indexstate.pressIndex);
    updateNewsDisplay(buttonId, indexstate.pageIndex);
}

//뉴스 종류를 선택하였을 때, 페이지 넘김에 따른 컨텐츠 변화 함수 
export const updateNewsDisplay = (pressType, pageidx)  =>{
    const filteredNews = window.newsData.filter(item => item.pressType === pressType);
    const newsItem = filteredNews.find(item => item.pid === pageidx);

    if (newsItem) {
        window.btntext = newsItem.pressName;
        document.querySelector('.news-press-img img').src = newsItem.pressImg;
        document.querySelector('.news-press-edit').textContent = newsItem.edittime;
        document.querySelector('.news-image-container img').src = newsItem.mainphoto;
        document.querySelector('.news-title').textContent = newsItem.maintitle;
        document.querySelector('.pressedby').textContent = newsItem.pressName + " 언론사에서 직접 편집한 뉴스입니다.";
        const newsSubTitles = document.querySelectorAll('.news-sub-titles');
        newsItem.news.forEach((nws1, index) => {
            newsSubTitles[index].textContent = nws1.title;
            newsSubTitles[index].href = nws1.url;
        });
        showsubscribe(newsItem.pressName);
    }
}

const countpages = (allvalues) => {
    const variables = [];
    newstype.map(type => {
        const tmp = allvalues.filter(item => item.pressType === type);
        const tmps = tmp.length;
        variables.push(tmps);
    });
    return variables;
}

const getNextPressIndex = (pridx) => {
    return (pridx + 1) % newstype.length;
}
