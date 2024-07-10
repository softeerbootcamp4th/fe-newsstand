import { showsubscribe } from "../subscribe/subscribe.js";
import { transformToProgress, resetProgress } from "../progressbar/progressbutton.js";
import { newstype } from "../newstab/newstab.js";
import { moveToNextCatidx, animationTimer } from "../progressbar/progressbutton.js";
import { clickArt } from "../mainscript.js";
import { originaltabs, mytabs } from "../newstab/newstab.js";

document.addEventListener('DOMContentLoaded', () => {
    const allArticleButton = document.getElementById('all-article');
    const myArticleButton = document.getElementById('my-article');

    allArticleButton.addEventListener('click', () => {
        clickArt('all-article');
        originaltabs();
        initmain();
    });

    myArticleButton.addEventListener('click', () => {
        clickArt('my-article');
        mytabs();
    });
});

window.newsData = [];
export let testingpages = [];
export var indexstate = {
    pressIndex: 0,
    pageIndex: 0
};

let buttonId = "";

window.onload = async () => {
    try {
        const response = await fetch('../../news/allnews.json');
        const data = await response.json();
        window.newsData = data;
        testingpages = countpages(newsData);

        initmain();
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
};

var btnRight = document.getElementById('btnRight');
var btnLeft = document.getElementById('btnLeft');

function updateList(pridx) {
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

export const updateNewsDisplay = (pressType, pageidx) => {
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

export const initmain = () => {
    clearInterval(animationTimer);
    resetProgress();

    testingpages = countpages(window.newsData); // Ensure testingpages is updated

    const buttons = document.querySelectorAll('.text-button');
    buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
        button.addEventListener('click', handleButtonClick);
    });

    indexstate.pressIndex = 0; // Ensure starting index is reset
    indexstate.pageIndex = 0;  // Ensure starting page index is reset

    updateNewsDisplay("economy", indexstate.pageIndex);
    const ts = document.querySelector(".text-button");
    transformToProgress(ts);
}

const handleButtonClick = (event) => {
    resetProgress();
    indexstate.pressIndex = Number(event.currentTarget.dataset.index);
    indexstate.pageIndex = 0;
    buttonId = event.currentTarget.id;
    updateNewsDisplay(buttonId, indexstate.pageIndex);
    transformToProgress(event.currentTarget);
}
