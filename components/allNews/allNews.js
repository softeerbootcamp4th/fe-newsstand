import { allNewsData } from "../../data/allNewsData.js";
import { shortenStr } from "../../util/shortenStr.js";

export const allNews = (cateId, brandId) => {
  const newsData = allNewsData[cateId].data[brandId];

  // press news selector
  const pressNews = document.querySelector(".press-news");

  // brand selector
  const brandLogo = pressNews.querySelector(".brand-logo");
  const brandEditDate = pressNews.querySelector(".brand-edit-date");

  // main news selector
  const mainNewsThumbnail = pressNews.querySelector(".main-news-thumbnail");
  const mainNewsTitle = pressNews.querySelector(".main-news-title");

  // sub news selector
  const subNewsList = pressNews.querySelector(".sub-news-list");

  // brand-id 저장
  pressNews.dataset.brandId = brandId;

  // cate-id 저장
  pressNews.dataset.cateId = cateId;

  // 언론사 로고
  brandLogo.src = newsData.brandImg;

  // 편집 날짜
  brandEditDate.innerHTML = `${newsData.editDate} 편집`;

  // main News
  mainNewsThumbnail.src = newsData.mainNews.thumbnail;
  mainNewsTitle.href = newsData.mainNews.url;
  mainNewsTitle.innerHTML = shortenStr(newsData.mainNews.title);

  // sub News
  subNewsList.innerHTML = "";
  newsData.subNews.map(({ title, url }) => {
    const listItem = `<a href = ${url} class = "available-medium16 text-bold">${shortenStr(
      title,
      40
    )}</a>`;
    subNewsList.innerHTML += listItem;
  });
};
