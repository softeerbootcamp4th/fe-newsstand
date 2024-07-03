/*
    1. 카운트를 세는곳에서 hover action을 달아야한다.
    2. 여기서 카운트를 세고 hover에 들어갈 function을 정의해서 파라미터로 넘기고 안에서는 그걸 실행한다.
*/
import { NEWS } from "../../data/data.js";
import { rollingNews } from "./rollingNews.js";
let currentRecentNewsIndex = 0;
let currentIntervalID;

function startRecentNewsRolling() {
    const currentDom = document.querySelector(".currentDom");
    currentDom.textContent = NEWS[0];
    currentIntervalID = setInterval(function () {
        currentRecentNewsIndex = (currentRecentNewsIndex + 1) % NEWS.length;
        const currentDom = document.querySelector(".currentDom");
        rollingNews(currentDom, NEWS[currentRecentNewsIndex]);
    }, 5000);


    const rollingBox = document.querySelector("#rollingBox");
    rollingBox.addEventListener('mouseenter', () => {
        const currentDom = document.querySelector(".currentDom");
        clearInterval(currentIntervalID);
        currentDom.classList.add("hoverInRecentNews");
        console.log("finish");
    });

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
