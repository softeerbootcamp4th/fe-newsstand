import { processCategory } from "./fieldTab.js";
import { getSubscribedData } from "./subscribeData.js";
import { allNewsData } from "../components/news.js";

// 카테고리 목록을 클릭하면 실행되는 함수
export const handleCategoryClick = async (index, liList, isFull) => {
  const rightButton = document.getElementById("rightButton");
  const leftButton = document.getElementById("leftButton");
  const currentSelectedIndex = getCurrentSelectedIndex(liList);

  // 현재 선택된 카테고리와 다른 카테고리를 클릭했을 경우
  if (index !== currentSelectedIndex) {
    deselectCategory(currentSelectedIndex, liList, isFull);

    if (isFull) {
      rightButton.classList.remove("hidden");
      leftButton.classList.remove("show");
      // 선택된 카테고리부터 순서대로 processCategory 실행
      while (true) {
        await processCategory(index, liList, isFull, true);
        index = (index + 1) % allNewsData.length;
      }
    } else {
      processCategory(index, liList, false, false);
    }
  }
};

// 현재 selectNews 클래스를 가지고 있는 카테고리의 index를 가져오는 함수
export const getCurrentSelectedIndex = (liList) => {
  return Array.from(liList).findIndex((li) =>
    li.classList.contains("selectNews")
  );
};

// 현재 selectNews 클래스를 가지고 있는 카테고리의 스타일을 notselectNews으로 바꾸고 processCategory함수 종료
const deselectCategory = (index, liList, isFull) => {
  const currentSelectedLi = liList[index];

  // 선택된 카테고리의 스타일을 변경합니다.
  currentSelectedLi.classList.replace("selectNews", "notselectNews");

  if (isFull) {
    currentSelectedLi.textContent = allNewsData[index].category;
  } else {
    const subscribeNewData = getSubscribedData();
    currentSelectedLi.textContent = subscribeNewData[index];
  }
};
