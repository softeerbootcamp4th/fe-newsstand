import { subscribeData } from "../../../data/subscribeData.js";
import { shortenStr } from "../../../util/shortenStr.js";
import { getSubscribeList } from "../../..//util/getSubscribeList.js";

export const subscribeNews = (brandIdx) => {
  // 로컬스토리지에서 받아온 brandId를 사용하여 언론사 뉴스 추출
  let brandId = getSubscribeList()[brandIdx];
  let newsData = subscribeData[brandId];

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

  // news Id 저장
  pressNews.dataset.brandIdx = brandIdx;

  // 구독한 언론사 화면이므로 cateId = -1로 저장
  pressNews.dataset.cateId = -1;

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
