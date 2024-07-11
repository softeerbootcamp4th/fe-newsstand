import { allNewsData } from "./news.js";
import { pressInfoButton } from "./button.js";
import { getSubscribedData } from "./subscribeData.js";
import { removeRerendering } from "./removeRerendering.js";
import { init } from "./init.js";
import { getCurrentSelectedIndex } from "./handleCategoryClick.js";
import { clickSubscribeNews } from "./clickSubscribeNews.js";
import { handlePressInfoButtonClick } from "./handlePressInfoButtonClick.js";

let currentIntervalId = null; // 현재 실행 중인 intervalId
let currentTimeoutId = null; // 현재 실행 중인 timeoutId
let currentMidiaIndex = 0; // 현재 실행중인 카테고리중 언론사의 index

export const clearIntervalVar = () => {
  clearInterval(currentIntervalId);
  clearTimeout(currentTimeoutId);
};

document.addEventListener("DOMContentLoaded", async () => {
  const cancelAlert = document.getElementById("cancelAlert");
  const positiveButton = document.getElementById("positiveButton");
  const negativeButton = document.getElementById("negativeButton");
  const rightButton = document.getElementById("rightButton");
  const leftButton = document.getElementById("leftButton");

  positiveButton.addEventListener("mouseenter", () => {
    positiveButton.classList.replace("available-medium16", "hover-medium16");
  });

  negativeButton.addEventListener("mouseenter", () => {
    negativeButton.classList.replace("available-medium16", "hover-medium16");
  });

  positiveButton.addEventListener("mouseleave", () => {
    positiveButton.classList.replace("hover-medium16", "available-medium16");
  });

  negativeButton.addEventListener("mouseleave", () => {
    negativeButton.classList.replace("hover-medium16", "available-medium16");
  });

  positiveButton.addEventListener("click", () => {
    const $id = (id, element = document) => element.getElementById(id);
    const buttonClass = $id("allPress").className;
    removeRerendering(buttonClass === "selected-bold16");
  });

  negativeButton.addEventListener("click", () => {
    cancelAlert.classList.remove("show");
  });

  rightButton.addEventListener("click", async () => {
    const button = document.getElementById("allPress").className;
    if (button === "selected-bold16") {
      clearIntervalVar();
      leftButton.className = "show";
      const liList = document.querySelectorAll("#NewsList ul li");
      let categoryIndex = getCurrentSelectedIndex(liList);
      const totalCompanies = allNewsData[categoryIndex].company.length;
      const currentSelectedLi = liList[categoryIndex];
      currentSelectedLi.classList.add("restartAnimation");
      setTimeout(() => {
        currentSelectedLi.classList.remove("restartAnimation");
        //restartAnimation(currentSelectedLi);
      }, 1);
      if (currentMidiaIndex + 1 === totalCompanies) {
        rightButton.className = `hidden`;
      }

      while (true) {
        await processCategory(categoryIndex, liList, true, false);
        categoryIndex = (categoryIndex + 1) % allNewsData.length;
      }
    } else {
      const selectedLi = document.querySelector("#NewsList ul li.selectNews");
      const nextLi = selectedLi.nextElementSibling;

      if (nextLi) {
        const nextLiText = nextLi.textContent.trim();
        clickSubscribeNews(nextLiText);
      } else {
        const firstLiText =
          selectedLi.parentElement.firstElementChild.textContent.trim();
        clickSubscribeNews(firstLiText);
      }
    }
  });

  leftButton.addEventListener("click", async () => {
    const button = document.getElementById("allPress").className;
    if (button === "selected-bold16") {
      rightButton.classList.remove("hidden");
      clearIntervalVar();
      const liList = document.querySelectorAll("#NewsList ul li");
      currentMidiaIndex = currentMidiaIndex - 2;
      const categoryIndex = getCurrentSelectedIndex(liList);
      const currentSelectedLi = liList[categoryIndex];
      currentSelectedLi.classList.add("restartAnimation");
      setTimeout(() => {
        currentSelectedLi.classList.remove("restartAnimation");
        //restartAnimation(currentSelectedLi);
      }, 1);
      if (currentMidiaIndex === 0) {
        leftButton.classList.remove("show");
      }

      while (true) {
        await processCategory(categoryIndex, liList, true, false);
        categoryIndex = (categoryIndex + 1) % allNewsData.length;
      }
    } else {
      const selectedLi = document.querySelector("#NewsList ul li.selectNews");
      const nextLi = selectedLi.previousElementSibling;

      if (nextLi) {
        const prevLiText = nextLi.textContent.trim();
        clickSubscribeNews(prevLiText);
      } else {
        const lastLiText =
          selectedLi.parentElement.lastElementChild.textContent.trim();
        clickSubscribeNews(lastLiText);
      }
    }
  });

  init();
  currentMidiaIndex = 0;
});

// 카테고리의 정보를 표시하고 일정 시간 간격으로 업데이트하는 함수
export const processCategory = async (
  index,
  liList,
  isFull,
  isClickTopAndViewer
) => {
  clearIntervalVar();
  const nowIndex = currentMidiaIndex;
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
