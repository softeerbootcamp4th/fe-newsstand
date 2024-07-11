import { newsListLi } from "./newsListLi.js";
import { processCategory } from "./fieldTab.js";
import { handleCategoryClick } from "./handleCategoryClick.js";

export const init = async () => {
  const leftButton = document.getElementById("leftButton");
  leftButton.classList.remove("show");
  const NewsListUl = document.getElementById("NewsList").querySelector("ul");
  NewsListUl.innerHTML = "";
  // 카테고리 목록을 생성하고 이벤트 리스너를 추가
  const liList = newsListLi(true);
  liList.forEach((li, companyIndex) => {
    li.addEventListener("click", async () => {
      await handleCategoryClick(companyIndex, liList, true);
    });
  });

  let newsIndex = 0;

  // 초기 실행을 위해 첫 번째 카테고리를 선택
  while (true) {
    await processCategory(newsIndex, liList, true, true);
    newsIndex = (newsIndex + 1) % allNewsData.length;
  }
};
