import { getTodayString, generateNode } from "../utils/utils.js";

export function generateListContent(container, newsData) {
  const divContentTitle = generateNode("div", "content_title");
  const pMedia = generateNode("p", "media");
  const pDate = generateNode("p", "date");
  pDate.textContent = getTodayString();

  divContentTitle.appendChild(pMedia);
  divContentTitle.appendChild(pDate);

  const divNewsListWrapper = generateNode("div", "newsList_wrapper");

  const divImageNews = generateNode("div", "imageNews");
  const imgThumbnail = document.createElement("img");
  imgThumbnail.src = newsData.thumbnailUrl;
  imgThumbnail.alt = newsData.title;
  const divImageNewsTitle = generateNode("div", "imageNews_title");
  divImageNewsTitle.textContent = newsData.title;

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
}
