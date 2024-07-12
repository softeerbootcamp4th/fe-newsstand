import { showsubscribe, subscribePress } from "../subscribe/subscribe.js";

import { transformToProgress, resetProgress, animationTimer } from "../progressbar/progressbutton.js";
import { newstype } from "../newstab/newstab.js";
import { subProgressTimer } from "./displaySubscribe.js";
import stateManager from "../statemanager/stateManager.js";

let buttonId = "";

window.onload = async () => {
    try {
        const response = await fetch('../../news/allnews.json');
        const data = await response.json();
        stateManager.setAllNews(data);
        stateManager.setPages(countpages(stateManager.getAllNews()));
        initmain();
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
};

var btnRight = document.getElementById('btnRight');
var btnLeft = document.getElementById('btnLeft');

function updateList(pridx) {
    if (stateManager.getPageIndex() === 0) {
        btnLeft.classList.add('disabled');
    } else {
        btnLeft.classList.remove('disabled');
    }
    const pageindex = stateManager.getPages();
    
    if (stateManager.getPageIndex() >= pageindex[pridx] - 1) {
        stateManager.setPressIndex(getNextPressIndex(pridx));
        stateManager.setPageIndex(0);
        buttonId = newstype[stateManager.getPressIndex()];
        resetProgress();
        const nextButton = document.querySelector(`.text-button[data-index="${stateManager.getPressIndex()}"]`);
        transformToProgress(nextButton);
        updateNewsDisplay(buttonId, stateManager.getPageIndex());
    } else {
        stateManager.setPageIndex(stateManager.getPageIndex()+1);
        resetProgress();
        transformToProgress(buttonId);
        updateNewsDisplay(buttonId, stateManager.getPageIndex());
    }
}

btnRight.addEventListener('click', () => {
    rightButtonClick(stateManager.getPressIndex());
});

btnLeft.addEventListener('click', () => {
    leftButtonClick();
});

function rightButtonClick(pridx) {
    //clearInterval(animationTimer); // 애니메이션 타이머 초기화
    const pageindex = stateManager.getPages();
    if (stateManager.getPageIndex() < pageindex[pridx] - 1) {
        updateList(stateManager.getPressIndex());
        //updateNewsDisplay(buttonId, stateManager.getPageIndex());
    } else {
        buttonId = newstype[stateManager.getPressIndex()];
        resetProgress();
        const nextButton = document.querySelector(`.text-button[data-index="${stateManager.getPressIndex()}"]`);
        transformToProgress(nextButton);
        updateList(stateManager.getPressIndex());
        updateNewsDisplay(buttonId, stateManager.getPageIndex());
    }
    
}

function leftButtonClick() {
    //clearInterval(animationTimer); // 애니메이션 타이머 초기화
    const pageindex = stateManager.getPages();
    if (stateManager.getPageIndex() > 0) {
        stateManager.setPageIndex(stateManager.getPageIndex() - 1);
    } else {
        if (stateManager.getPressIndex() > 0) {
            stateManager.setPressIndex(stateManager.getPressIndex() - 1);
        } else {
            stateManager.setPressIndex(newstype.length - 1);
        }
        stateManager.setPageIndex(pageindex[stateManager.getPressIndex()] - 1);
        buttonId = newstype[stateManager.getPressIndex()];
        resetProgress();
        const nextButton = document.querySelector(`.text-button[data-index="${stateManager.getPressIndex()}"]`);
        transformToProgress(nextButton);
    }
    updateList(stateManager.getPressIndex());
    updateNewsDisplay(buttonId, stateManager.getPageIndex());
}

export const updateNewsDisplay = (pressType, pageidx) => {
    const filteredNews = stateManager.getAllNews().filter(item => item.pressType === pressType);
    const newsItem = filteredNews.find(item => item.pid === pageidx);

    if (newsItem) {
        stateManager.setClickedNews(newsItem.pressName);
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

export const initmain = () => {
    clearInterval(subProgressTimer);
    //원래
    resetProgress();
    stateManager.setPages(countpages(stateManager.getAllNews()));
    const buttons = document.querySelectorAll('.text-button');

    buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
        button.addEventListener('click', handleButtonClick);
    });

    stateManager.setPressIndex(0); 
    stateManager.setPageIndex(0); 
    //기존 코드 아래
    updateNewsDisplay("economy", stateManager.getPageIndex());
    const defaultbutton = document.querySelector(".text-button");
    transformToProgress(defaultbutton);
}

const handleButtonClick = (event) => {
    resetProgress();
    stateManager.setPressIndex(Number(event.currentTarget.dataset.index));
    stateManager.setPageIndex(0);
    buttonId = event.currentTarget.id;
    updateNewsDisplay(buttonId, stateManager.getPageIndex());
    transformToProgress(event.currentTarget);
}