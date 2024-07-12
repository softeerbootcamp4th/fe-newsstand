import { allNewsData } from "../components/news.js";
import { pressInfoButton } from "../components/button.js";
import { getSubscribedData } from "./subscribeData.js";
import { handlePressInfoButtonClick } from "./handlePressInfoButtonClick.js";
import { scrollRender } from "../rendering/scrollRender.js";

let currentIntervalId = null; // 현재 실행 중인 intervalId
let currentTimeoutId = null; // 현재 실행 중인 timeoutId
let currentMidiaIndex = 0; // 현재 실행중인 카테고리중 언론사의 index

export const clearIntervalVar = () => {
    clearInterval(currentIntervalId);
    clearTimeout(currentTimeoutId);
};


// 카테고리의 정보를 표시하고 일정 시간 간격으로 업데이트하는 함수
export const processCategory = async (
    index,
    liList,
    isFull,
    isClickTopAndViewer,
    nowInnerIndex = 0
) => {
    clearIntervalVar();
    const nowIndex = nowInnerIndex;
    currentMidiaIndex = nowInnerIndex;
    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");

    if (isFull) {
        if (isClickTopAndViewer) {
            currentMidiaIndex = 0;
        }

        const NewsListCategory = liList[index];

        // 선택된 카테고리의 스타일을 변경
        NewsListCategory.classList.replace("notselectNews", "selectNews");
        const totalCompanies = allNewsData[index].company.length;
        const subscribedData = getSubscribedData();

        // 카테고리 정보를 업데이트하는 함수
        const updateNewsCategory = () => {
            const pressInfo = document
                .getElementById("mainNews")
                .querySelector(".pressInfo");
            const newsContainer = document.getElementById("news");
            const mainNewsLeft = newsContainer.querySelector(".newsLeft");
            const mainNewsRight = newsContainer.querySelector(".newsRight");
            const newsData = allNewsData[index].company[currentMidiaIndex];

            const text = `
            <div class="selected-bold14">${allNewsData[index].category}</div>
            <div>
                <span id="currentNewsIndex">${currentMidiaIndex + 1}</span>
                <span class="display-bold12">/ ${totalCompanies}</span>
            </div>`;
            NewsListCategory.innerHTML = text;

            // news 안에 내용을 채워줌 (pressInfo)
            const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(
                subscribedData.includes(newsData.companyName) ? "" : "구독하기"
            )}`;
            pressInfo.innerHTML = pressInfoText;

            const button = pressInfo.querySelector(".pressInfoButton");
            if (button) {
                handlePressInfoButtonClick(button, newsData, subscribedData, true);
            }

            // news 안에 내용을 채워줌 (newsLeft)
            const newsLeftText = `<img src="${newsData.mainNews.src}" alt="Thumbnail Image"/>
                     <p class = "available-medium16">${newsData.mainNews.title}</p>`;
            mainNewsLeft.innerHTML = newsLeftText;

            // news 안에 내용을 채워줌 (newsRight)
            const newsRightText =
                newsData.news
                    .map((item) => `<li class="newsEach">${item.title}</li>`)
                    .join("") +
                `<p class="display-medium14">${newsData.companyName}에서 직접 편집한 뉴스입니다.</p>`;
            mainNewsRight.innerHTML = newsRightText;

            currentMidiaIndex++;

            // 모든 정보를 업데이트한 후에 intervalId를 종료하고, 일정 시간이 지난 후에 스타일을 초기화
            if (currentMidiaIndex >= totalCompanies) {
                clearInterval(currentIntervalId);
                setTimeout(() => {
                    NewsListCategory.classList.replace("selectNews", "notselectNews");
                    NewsListCategory.textContent = allNewsData[index].category;
                    rightButton.classList.remove("hidden");
                    leftButton.classList.remove("show");
                    currentMidiaIndex = 0;
                }, 20000);
            }
        };

        // 일정 시간 간격으로 updateNewsCategory 함수를 실행
        currentIntervalId = setInterval(() => {
            leftButton.className = "show";
            updateNewsCategory();
        }, 20000);

        // 맨 처음 랜더링을 해주기 위해 호출
        updateNewsCategory();

        // 일정 시간이 지난 후에 intervalId를 종료
        await new Promise((resolve) => {
            currentTimeoutId = setTimeout(() => {
                clearInterval(currentIntervalId);
                resolve();
                NewsListCategory.classList.replace("selectNews", "notselectNews");
                NewsListCategory.textContent = allNewsData[index].category;
                currentMidiaIndex = 0;
            }, (totalCompanies - nowIndex) * 20000);
        });
    } else {
        let currentIndex = index;
        const subscribed = getSubscribedData();
        // 카테고리 정보를 업데이트하는 함수
        const updateNewsCategory = (currentIndex) => {
            const NewsListCategory = liList[currentIndex];

            // 선택된 카테고리의 스타일을 변경
            NewsListCategory.classList.replace("notselectNews", "selectNews");
            const pressInfo = document
                .getElementById("mainNews")
                .querySelector(".pressInfo");
            const newsContainer = document.getElementById("news");
            const mainNewsLeft = newsContainer.querySelector(".newsLeft");
            const mainNewsRight = newsContainer.querySelector(".newsRight");
            const newsData = allNewsData
                .flatMap((category) => category.company)
                .find((company) => company.companyName === subscribed[currentIndex]);

            const text = `
            <div class="selected-bold14">${newsData.companyName}</div>
            <div>
                <span class="selected-bold14">></span>
            </div>`;
            NewsListCategory.innerHTML = text;

            // news 안에 내용을 채워줌 (pressInfo)
            const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton("")}`;
            pressInfo.innerHTML = pressInfoText;

            const button = pressInfo.querySelector(".pressInfoButton");
            if (button) {
                button.addEventListener("click", () => {
                    handlePressInfoButtonClick(button, newsData, subscribed, true);
                });
            }

            // news 안에 내용을 채워줌 (newsLeft)
            const newsLeftText = `<img src="${newsData.mainNews.src}" alt="Thumbnail Image"/>
                     <p class = "available-medium16">${newsData.mainNews.title}</p>`;
            mainNewsLeft.innerHTML = newsLeftText;

            // news 안에 내용을 채워줌 (newsRight)
            const newsRightText =
                newsData.news
                    .map((item) => `<li class="newsEach">${item.title}</li>`)
                    .join("") +
                `<p class="display-medium14">${newsData.companyName}에서 직접 편집한 뉴스입니다.</p>`;
            mainNewsRight.innerHTML = newsRightText;
            scrollRender();
        };

        updateNewsCategory(currentIndex);

        currentIntervalId = setInterval(() => {
            const leftButton = document.getElementById("leftButton");
            leftButton.className = "show";
            liList[currentIndex].classList.replace("selectNews", "notselectNews");
            liList[currentIndex].innerText = subscribed[currentIndex];
            currentIndex = (currentIndex + 1) % liList.length;
            updateNewsCategory(currentIndex);
        }, 20000);
    }
};
