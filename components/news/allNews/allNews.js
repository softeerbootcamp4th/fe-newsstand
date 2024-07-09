import { cateData } from "../../../data/cateData.js";
import { shortenStr } from "../../../util/shortenStr.js";
import { renderSubscribeBtn } from "../../subscription/renderSubscriptionBtn.js";

export const allNews = (cateIdx, brandIdx) => {
  const newsData = cateData[cateIdx].data[brandIdx];

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

  // brandId
  const brandId = cateData[cateIdx].data[brandIdx].brandId;

  // 구독한 언론사가 없는 경우 예외처리
  pressNews.classList.remove("hidden");
  document.querySelector(".no-subscribe").classList.add("hidden");

  // brand-idx 저장
  pressNews.dataset.brandIdx = brandIdx;

  // cate-idx 저장
  pressNews.dataset.cateIdx = cateIdx;

  // brandId 저장
  pressNews.dataset.brandId = brandId;

  // 구독버튼 hidden 처리
  renderSubscribeBtn(brandId);

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
