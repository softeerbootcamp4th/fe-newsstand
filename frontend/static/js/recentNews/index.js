import { NEWS } from "../../data/data.js";
import { rollingNews } from "./rollingNews.js";
let currentRecentNewsIndex = 0;
let currentIntervalID;

function startRecentNewsRolling() {
    // 첫 기사 초기화 로직
    const currentDom = document.querySelector(".currentDom");
    currentDom.textContent = NEWS[0];

    // interval을 사용하여 5초마다 rollingNews함수 호출 
    // 이때 현재 index를 check하여 앞으로 바뀌게될 data를 보냄
    currentIntervalID = setInterval(function () {
        currentRecentNewsIndex = (currentRecentNewsIndex + 1) % NEWS.length;
        const currentDom = document.querySelector(".currentDom");
        rollingNews(currentDom, NEWS[currentRecentNewsIndex]);
    }, 5000);

    // 각 글자를 감싸고 있는 rollingBox에 hover event add 함 
    // 이때 rolling박스에 hover하여 현재보이는 글씨에 underline css를 적용함
    // 이때 위에서 저장해둔 현재 intervalId를 멈춤으로써 interval에서 정의함 함수가 적용되지 않음
    const rollingBox = document.querySelector("#rollingBox");
    rollingBox.addEventListener('mouseenter', () => {
        const currentDom = document.querySelector(".currentDom");
        clearInterval(currentIntervalID);
        currentDom.classList.add("hoverInRecentNews");
    });

    // 마찬가지로 hover에서 벗어날때 위에 적용한 css를 제거하고
    // 다시 interval을 5초 시작함
    // 지금 시작한 interval이 최신 ID가 되어 후에 interval을 다시 멈출수 있음
    rollingBox.addEventListener('mouseleave', () => {
        const currentDom = document.querySelector(".currentDom");
        currentDom.classList.remove("hoverInRecentNews");
        currentIntervalID = setInterval(function () {
            currentRecentNewsIndex = (currentRecentNewsIndex + 1) % NEWS.length;
            rollingNews(currentDom, NEWS[currentRecentNewsIndex]);
        }, 5000);
    });
}

startRecentNewsRolling();
