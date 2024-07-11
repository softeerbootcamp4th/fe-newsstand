import { newsListLi } from "./newsListLi.js";
import { nonLiList } from "./nonLiList.js";
import { clearIntervalVar, processCategory } from "./fieldTab.js";
import { handleCategoryClick } from "./handleCategoryClick.js";
import { getSubscribedData } from "./subscribeData.js";

export const clickSubscribeNews = (currentCompanyName) => {
  clearIntervalVar();
  const allPress = document.getElementById("allPress");
  const subscribedPress = document.getElementById("subscribedPress");
  const NewsListUl = document.getElementById("NewsList").querySelector("ul");
  NewsListUl.innerHTML = "";

  const liList = newsListLi(false);

  subscribedPress.classList.replace("available-medium16", "selected-bold16");
  allPress.classList.replace("selected-bold16", "available-medium16");

  if (liList === undefined) {
    nonLiList();
  } else {
    liList.forEach((li, companyIndex) => {
      li.addEventListener("click", async () => {
        await handleCategoryClick(companyIndex, liList, false);
      });
    });

    const subscribed = getSubscribedData();
    // currentCompanyName과 일치하는 회사의 index를 찾음
    let newsIndex = subscribed.findIndex(
      (company) => company === currentCompanyName
    );

    // 만약 currentCompanyName과 일치하는 회사가 없다면 newsIndex를 0으로 설정
    if (newsIndex === -1) {
      newsIndex = 0;
    }

    processCategory(newsIndex, liList, false, false);
  }
};
