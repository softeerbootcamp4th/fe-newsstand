import { navSelected, removeSelected } from "./navControl.js";
import { moveToNextPage, moveToPreviousPage } from "./pageControl.js";

let currentArticleIndex = 0;
let currentArticleDetailIndex = 1;
let recentIntervalId = 0;

function initMainContent() {
    // 다음 버튼과 이전버튼에 각각 다음 기사를 볼수있는 로직 추가
    const currentDom = document.querySelector("#mainContentArea");
    document.querySelector("#articlesNextButton").addEventListener('click', () => {
        const nextDom = document.querySelector("#nextMainContentArea");
        moveToNextPage("", currentDom, nextDom);
        // 임시로 현재 index를 check 및 변경 함수
        currentArticleDetailIndex += 1;
        // 새로운 기사를 확인할시 progress를 초기화해야함
        intervalRestart();
    });
    document.querySelector("#articlesPreviousButton").addEventListener('click', () => {
        const previousDom = document.querySelector("#previousMainContentArea");
        moveToPreviousPage("", currentDom, previousDom);
        // 임시로 현재 index를 check 및 변경 함수
        currentArticleDetailIndex -= 1;
        // 새로운 기사를 확인할시 progress를 초기화해야함
        intervalRestart();
    });

    // 초기화로직에서 첫번쨰 nav Element가 선택될수 있도록하기위한 초기화 로직
    const navElements = document.querySelectorAll(".mainContentNavElement");
    navSelected(1, navElements[0]);
    // 모든 navElement에 eventListner 추가
    navElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            // 모든 nav element 비활성화
            removeSelected(navElements);
            // index 초기화
            currentArticleDetailIndex = 1;
            // 현재 선택된 nav element 활성화
            navSelected(currentArticleDetailIndex, element);
            // 현재 IT를 선택했고, 연애를 누른다면 오른쪽으로 기사가 넘어가고
            // 현재 IT를 선택했고, 종합/경제를 누른다면 왼쪽으로 기사가 넘어가기 위한 분기처리
            if (index > currentArticleIndex) {
                const nextDom = document.querySelector("#nextMainContentArea");
                // 다음 페이지로 이동
                moveToNextPage("", currentDom, nextDom);
            }
            else {
                const previousDom = document.querySelector("#previousMainContentArea");
                // 이전 페이지로 이동
                moveToPreviousPage("", currentDom, previousDom);
            }
            currentArticleIndex = index;

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
    navSelected(currentArticleDetailIndex, element);
}

function goToNext() {
    currentArticleDetailIndex += 1;
    const currentDom = document.querySelector("#mainContentArea");
    const nextDom = document.querySelector("#nextMainContentArea");
    moveToNextPage("", currentDom, nextDom);
}

function getSelectedNav() {
    return document.querySelector(".mainContentNavElement.isSelected");
}

function getAllNavElements() {
    return document.querySelectorAll(".mainContentNavElement");
}



initMainContent();
