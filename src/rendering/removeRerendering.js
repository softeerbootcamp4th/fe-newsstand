import { removeSubscribedData, getSubscribedData } from "../feature/subscribeData.js";
import { newsListLi } from "./newsListLi.js";
import { newsGrid } from "../feature/newsGrid.js";
import { nonLiList } from "./nonLiList.js";
import { processCategory } from "../feature/fieldTab.js";
import {
  handleCategoryClick,
  getCurrentSelectedIndex,
} from "../feature/handleCategoryClick.js";

/// 구독해지를 누른 다음 리랜더링 해주는 코드
/// 리스트일때, 그리드일때, 전체 언론사일때, 내가 구독한 언론사일때 4가지 경우의 수로 나눠서 랜더링을 다른 방식으로 해줌.

export const removeRerendering = (isFull) => {
  removeSubscribedData();
  const subscribed = getSubscribedData();

  const isNewsGrid = document.getElementById("NewsList").className;
  // grid에서 내가 구독한 언론사일때 랜더링
  if (isNewsGrid === "hidden") {
    const $id = (id, element = document) => element.getElementById(id);
    const buttonClass = $id("allPress").className;
    if (buttonClass === "available-medium16") {
      newsGrid(0, true);
      gridLeftButton.classList.remove("show");
      if (subscribed.length <= 24) {
        gridRightButton.classList.remove("show");
      }
    }
  }
  // list일때 랜더링
  else {
    // 리스트에서 내가 구독한 언론사일때 랜더링
    if (!isFull) {
      const liListTemp = document.querySelectorAll("#NewsList ul li");
      const currentIndex = getCurrentSelectedIndex(liListTemp);
      const NewsListUl = document
        .getElementById("NewsList")
        .querySelector("ul");
      NewsListUl.innerHTML = "";
      const liList = newsListLi(false);

      liList.forEach((li, companyIndex) => {
        li.addEventListener("click", async () => {
          await handleCategoryClick(companyIndex, liList, false);
        });
      });
      if (subscribed.length == 0) {
        nonLiList();
      } else {
        if (currentIndex === subscribed.length) {
          processCategory(0, liList, false, false);
        } else {
          processCategory(currentIndex, liList, false, false);
        }
      }
    }
    // 리스트에서 전체 언론사일때 랜더링
    else {
      const button = document.querySelector(".pressInfoButton");
      button.innerHTML = `<img src='../../images/plus.svg' alt='plus icon'/>
                    <span>구독하기</span>`;
    }
  }
};
