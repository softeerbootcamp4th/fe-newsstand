import { allNewsData } from "./news.js";
import { getSubscribedData } from "./subscribeData.js";

/// 랜더링을 해줘야할 때 progressBar를 업데이트 해주는 함수
/// 리스트일때, 그리드일떄 나눠서 업데이트 해준다.

export const newsListLi = (isFull) => {
  const NewsListUl = document.getElementById("NewsList").querySelector("ul");
  const subscribed = getSubscribedData();

  if (isFull) {
    return allNewsData.map((item) => {
      const li = document.createElement("li");
      li.textContent = item.category;
      li.classList.add("notselectNews");

      NewsListUl.appendChild(li);
      return li;
    });
  } else {
    if (subscribed.length != 0) {
      return subscribed.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.classList.add("notselectNews");

        NewsListUl.appendChild(li);
        return li;
      });
    }
  }
};
