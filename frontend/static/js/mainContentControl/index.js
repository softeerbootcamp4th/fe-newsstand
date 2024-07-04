import { navSelected, removeSelected } from "./navControl.js";
import { moveToNextPage, moveToPreviousPage } from "./pageControl.js";

let currentArticleIndex = 0;
let currentArticleDetailIndex = 1;
let recentIntervalId = 0;

function initMainContent() {
    const currentDom = document.querySelector("#mainContentArea");
    document.querySelector("#articlesNextButton").addEventListener('click', () => {
        const nextDom = document.querySelector("#nextMainContentArea");
        moveToNextPage("", currentDom, nextDom);
        currentArticleDetailIndex += 1;
        intervalRestart();
    });
    document.querySelector("#articlesPreviousButton").addEventListener('click', () => {
        const previousDom = document.querySelector("#previousMainContentArea");
        moveToPreviousPage("", currentDom, previousDom);
        currentArticleDetailIndex -= 1;
        intervalRestart();
    });

    const navElements = document.querySelectorAll(".mainContentNavElement");
    navSelected(1, navElements[0]);
    navElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            removeSelected(navElements);
            currentArticleDetailIndex = 1;
            navSelected(currentArticleDetailIndex, element);
            if (index > currentArticleIndex) {
                const nextDom = document.querySelector("#nextMainContentArea");
                moveToNextPage("", currentDom, nextDom);
            }
            else {
                const previousDom = document.querySelector("#previousMainContentArea");
                moveToPreviousPage("", currentDom, previousDom);
            }
            currentArticleIndex = index;

        });
    });
    recentIntervalId = setInterval(() => {
        restartProgress();
        goToNext();
    }, 20000);
}

function intervalRestart() {
    restartProgress();
    clearInterval(recentIntervalId);
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
