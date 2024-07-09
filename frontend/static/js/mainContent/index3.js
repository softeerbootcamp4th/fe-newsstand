import { NEWS } from "../../data/data.js";
import { navSelected, removeSelected } from "./navControl.js";
import { moveToNextPage, moveToPreviousPage } from "./pageControl.js";

const categories = ["종합/경제", "방송/통신", "IT", "스포츠/연애", "매거진/전문지", "지역"];
const NEWS_Sorted = categories.map((category) => {
    return NEWS.filter((element) => element.category == category);
});
let currentArticleIndex = 0;
let currentArticleDetailIndex = 0;
let recentIntervalId = 0;

function initMainContent() {
    // 최초 초기화 로직
    const currentData = NEWS_Sorted[currentArticleIndex][currentArticleDetailIndex];
    const template = `<div id="mainContentTitle" class="Layout__row alignItems-center gap10"><img src="${currentData.mediaCompanyImageURL}" style="width: 52.5px; height:20px;" alt="img"><span>${currentData.lastDate}편집</span><img class="modeImg" src="./static/assets/images/subscribeButton.svg" alt="Description of SVG"></div><div id="mainContentArticles" class="Layout__row"><div id="mainContentRepresentiveArticle" class="Layout__column-center"><img src="${currentData.articles[0].imageURL}" alt="Description of SVG" style="width: 320px; height: 200px"><span class="marginTop16">${currentData.articles[0].articleTitle}</span></div><div id="mainContentAritcleList"><ui><li>${currentData.articles[1].articleTitle}</li><li>${currentData.articles[2].articleTitle}</li><li>${currentData.articles[3].articleTitle}</li><li>${currentData.articles[4].articleTitle}</li><li>${currentData.articles[5].articleTitle}</li><li>${currentData.articles[6].articleTitle}</li></ui><div>${currentData.name} 언론사에서 직접 편집한 뉴스입니다.</div></div></div>`
    const currentDom = document.querySelector("#mainContentArea");
    currentDom.insertAdjacentHTML('beforeend', template);
    // 다음 버튼과 이전버튼에 각각 다음 기사를 볼수있는 로직 추가
    document.querySelector("#articlesNextButton").addEventListener('click', () => {
        const nextDom = document.querySelector("#nextMainContentArea");
        addIndex();
        moveToNextPage(NEWS_Sorted[currentArticleIndex], currentDom, nextDom, currentArticleDetailIndex);

        intervalRestart();
    });
    document.querySelector("#articlesPreviousButton").addEventListener('click', () => {
        const previousDom = document.querySelector("#previousMainContentArea");
        subtractIndex();
        moveToPreviousPage(NEWS_Sorted[currentArticleIndex], currentDom, previousDom, currentArticleDetailIndex);
        intervalRestart();
    });

    // 초기화로직에서 첫번쨰 nav Element가 선택될수 있도록하기위한 초기화 로직
    const navElements = document.querySelectorAll(".mainContentNavElement");
    navSelected(0, NEWS_Sorted[currentArticleIndex].length, navElements[0]);
    // 모든 navElement에 eventListner 추가
    navElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            // 모든 nav element 비활성화
            removeSelected(navElements);
            // index 초기화
            const beforeIndex = currentArticleIndex;
            currentArticleIndex = index;
            currentArticleDetailIndex = 0;
            // 현재 선택된 nav element 활성화
            navSelected(currentArticleDetailIndex, NEWS_Sorted[currentArticleIndex].length, element);
            // 현재 IT를 선택했고, 연애를 누른다면 오른쪽으로 기사가 넘어가고
            // 현재 IT를 선택했고, 종합/경제를 누른다면 왼쪽으로 기사가 넘어가기 위한 분기처리
            if (index > beforeIndex) {
                const nextDom = document.querySelector("#nextMainContentArea");
                // 다음 페이지로 이동
                moveToNextPage(NEWS_Sorted[currentArticleIndex], currentDom, nextDom, 0);
            }
            else {
                const previousDom = document.querySelector("#previousMainContentArea");
                // 이전 페이지로 이동
                moveToPreviousPage(NEWS_Sorted[currentArticleIndex], currentDom, previousDom, 0);
            }
        });
    });
    recentIntervalId = setInterval(() => {
        // 다음 페이지
        goToNext();
        // 현재활성화된 nav element에 있는 progress 초기화 및 재시작
        restartProgress();
    }, 20000);
}

function intervalRestart() {
    // progress 초기화 및 재시작
    restartProgress();
    // 기존 interval 취소
    clearInterval(recentIntervalId);
    // 새로운 interval 설정
    recentIntervalId = setInterval(() => {
        restartProgress();
        goToNext();
    }, 20000);
}

function restartProgress() {
    const element = getSelectedNav();
    const navElements = getAllNavElements();
    removeSelected(navElements);
    navSelected(currentArticleDetailIndex, NEWS_Sorted[currentArticleIndex].length, element);
}

function goToNext() {
    addIndex();
    const currentDom = document.querySelector("#mainContentArea");
    const nextDom = document.querySelector("#nextMainContentArea");
    moveToNextPage(NEWS_Sorted[currentArticleIndex], currentDom, nextDom, currentArticleDetailIndex);
}

const getSelectedNav = () => document.querySelector(".mainContentNavElement.isSelected")

const getAllNavElements = () => document.querySelectorAll(".mainContentNavElement");

function addIndex() {
    var currentLenth = NEWS_Sorted[currentArticleIndex].length;
    if (currentArticleDetailIndex == currentLenth - 1) {
        currentArticleIndex = (currentArticleIndex + 1) % NEWS_Sorted.length;
        currentArticleDetailIndex = 0;
        const navElements = getAllNavElements();
        const element = navElements[currentArticleIndex];
        removeSelected(navElements);
        navSelected(currentArticleDetailIndex, NEWS_Sorted[currentArticleIndex].length, element);
    }
    else {
        currentArticleDetailIndex += 1;
    }
}

function subtractIndex() {
    if (currentArticleDetailIndex == 0) {
        currentArticleIndex = (currentArticleIndex + NEWS_Sorted.length - 1) % NEWS_Sorted.length;
        currentArticleDetailIndex = 0;
        const navElements = getAllNavElements();
        const element = navElements[currentArticleIndex];
        removeSelected(navElements);
        navSelected(currentArticleDetailIndex, NEWS_Sorted[currentArticleIndex].length, element); restartProgress();
    }
    else {
        currentArticleDetailIndex -= 1;
    }
}


initMainContent();
