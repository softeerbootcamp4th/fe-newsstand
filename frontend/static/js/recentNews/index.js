import { NEWS } from "../../data/data.js";
import { rollingNews } from "./rollingNews.js";
let currentRecentNewsIndexLeft = 0;
let currentRecentNewsIndexRight = 0;
let currentIntervalIDLeft;
let currentIntervalIDRight;

function startRecentNewsRolling() {
    // 첫 기사 초기화 로직
    const currentDom_left = document.querySelector(".currentDom_left");
    const template = getRollingBoxContentTemplate(NEWS[0].name, NEWS[0].articles[currentRecentNewsIndexLeft].articleTitle);
    currentDom_left.insertAdjacentHTML('beforeend', template);

    // interval을 사용하여 5초마다 rollingNews함수 호출 
    // 이때 현재 index를 check하여 앞으로 바뀌게될 data를 보냄
    currentIntervalIDLeft = setInterval(function () {
        currentRecentNewsIndexLeft = (currentRecentNewsIndexLeft + 1) % 5;
        const currentDom = document.querySelector(".currentDom_left");
        rollingNews(currentDom, getRollingBoxContentTemplate(NEWS[0].name, NEWS[0].articles[currentRecentNewsIndexLeft].articleTitle), true);
    }, 5000);

    // 각 글자를 감싸고 있는 rollingBox에 hover event add 함 
    // 이때 rolling박스에 hover하여 현재보이는 글씨에 underline css를 적용함
    // 이때 위에서 저장해둔 현재 intervalId를 멈춤으로써 interval에서 정의함 함수가 적용되지 않음
    const rollingBox_left = document.querySelector("#rollingBox_left");
    rollingBox_left.addEventListener('mouseenter', () => {
        const currentDom = document.querySelector(".currentDom_left");
        clearInterval(currentIntervalIDLeft);
        currentDom.classList.add("hoverInRecentNews");
    });

    // 마찬가지로 hover에서 벗어날때 위에 적용한 css를 제거하고
    // 다시 interval을 5초 시작함
    // 지금 시작한 interval이 최신 ID가 되어 후에 interval을 다시 멈출수 있음
    rollingBox_left.addEventListener('mouseleave', () => {
        const currentDom = document.querySelector(".currentDom_left");
        currentDom.classList.remove("hoverInRecentNews");
        currentIntervalIDLeft = setInterval(function () {
            currentRecentNewsIndexLeft = (currentRecentNewsIndexLeft + 1) % 5;
            rollingNews(currentDom, getRollingBoxContentTemplate(NEWS[0].name, NEWS[0].articles[currentRecentNewsIndexLeft].articleTitle), true);
        }, 5000);
    });

    // 오른쪽
    const currentDom_right = document.querySelector(".currentDom_right");
    const template_right = getRollingBoxContentTemplate(NEWS[1].name, NEWS[1].articles[currentRecentNewsIndexRight].articleTitle);
    currentDom_right.insertAdjacentHTML('beforeend', template_right);

    setTimeout(() => {
        currentIntervalIDRight = setInterval(function () {
            currentRecentNewsIndexRight = (currentRecentNewsIndexRight + 1) % 5;
            const currentDom = document.querySelector(".currentDom_right");
            rollingNews(currentDom, getRollingBoxContentTemplate(NEWS[1].name, NEWS[1].articles[currentRecentNewsIndexRight].articleTitle), false);
        }, 5000);

        // 각 글자를 감싸고 있는 rollingBox에 hover event add 함 
        // 이때 rolling박스에 hover하여 현재보이는 글씨에 underline css를 적용함
        // 이때 위에서 저장해둔 현재 intervalId를 멈춤으로써 interval에서 정의함 함수가 적용되지 않음
        const rollingBox_right = document.querySelector("#rollingBox_right");
        rollingBox_right.addEventListener('mouseenter', () => {
            const currentDom = document.querySelector(".currentDom_right");
            clearInterval(currentIntervalIDRight);
            currentDom.classList.add("hoverInRecentNews");
        });

        // 마찬가지로 hover에서 벗어날때 위에 적용한 css를 제거하고
        // 다시 interval을 5초 시작함
        // 지금 시작한 interval이 최신 ID가 되어 후에 interval을 다시 멈출수 있음
        rollingBox_right.addEventListener('mouseleave', () => {
            const currentDom = document.querySelector(".currentDom_right");
            currentDom.classList.remove("hoverInRecentNews");
            currentIntervalIDRight = setInterval(function () {
                currentRecentNewsIndexRight = (currentRecentNewsIndexRight + 1) % 5;
                rollingNews(currentDom, getRollingBoxContentTemplate(NEWS[1].name, NEWS[1].articles[currentRecentNewsIndexRight].articleTitle), false);
            }, 5000);
        });
    }, 1000);

}

function getRollingBoxContentTemplate(companyName, articleTitle) {
    return `<span class="recentArticleMedia">${companyName}</span><span class="recentArticleTitle">${articleTitle}</span>`;
}

startRecentNewsRolling();
