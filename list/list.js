import { deleteNav, generateNav } from "../components/content/nav.js";
import { updateMyList } from "../resources/data.js";
import { getTodayString, generateNode } from "../utils/utils.js";

export function generateListContent(container, headerCategoryIndex) {
  container.classList.remove("grid");
  container.classList.add("list");

  const divContentTitle = generateNode("div", "content_title");
  const pMedia = generateNode("p", "media");
  const pDate = generateNode("p", "date");
  pDate.textContent = getTodayString();

  divContentTitle.appendChild(pMedia);
  divContentTitle.appendChild(pDate);

  const divNewsListWrapper = generateNode("div", "newsList_wrapper");

  const divImageNews = generateNode("div", "imageNews");
  const imgThumbnail = document.createElement("img");
  imgThumbnail.src = sampleNewsData.thumbnailUrl;
  imgThumbnail.alt = sampleNewsData.title;
  const divImageNewsTitle = generateNode("div", "imageNews_title");
  divImageNewsTitle.textContent = sampleNewsData.title;

  divImageNews.appendChild(imgThumbnail);
  divImageNews.appendChild(divImageNewsTitle);

  const divNewsListContainer = document.createElement("div");
  divNewsListContainer.id = "newsList_container";

  divNewsListWrapper.appendChild(divImageNews);
  divNewsListWrapper.appendChild(divNewsListContainer);

  const divNewsItem = generateNode("div", "newsItem");
  divNewsItem.appendChild(divContentTitle);
  divNewsItem.appendChild(divNewsListWrapper);

  container.appendChild(divNewsItem);

  deleteNav();

  const navContainer = document.getElementById("nav_container");
  generateNav(navContainer, headerCategoryIndex);
  updateMyList();
}

const sampleNewsData = {
  thumbnailUrl: "../resources/Thumbnail.png",
  title: "이미지 뉴스 제목",
};
