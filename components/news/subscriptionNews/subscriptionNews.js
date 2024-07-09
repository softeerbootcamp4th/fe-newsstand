import { brandData } from "../../../data/brandData.js";
import { shortenStr } from "../../../util/shortenStr.js";
import { getSubscribeList } from "../../../util/getSubscribeList.js";

/**
 *
 * @param {number} brandIdx
 * brandIdx === -1이면 구독한 언론사가 없습니다 렌더링
 */
export const subscribeNews = (brandIdx) => {
  // 로컬스토리지에서 받아온 brandId를 사용하여 언론사 뉴스 추출
  let brandId = getSubscribeList()[brandIdx];
  let newsData = brandData[brandId];

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

  // 구독한 언론사가 없는 경우
  if (brandIdx === -1) {
    renderNoSubscribe(pressNews);
    return;
  }

  // news Id 저장
  pressNews.dataset.brandIdx = brandIdx;

  // brandId 업데이트
  pressNews.dataset.brandId = brandId;

  // 구독한 언론사 화면이므로 cateIdx = -1로 저장
  pressNews.dataset.cateIdx = -1;

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

/**
 *
 * 구독한 언론사가 없는 경우 구독 유도문구 렌더링
 * @param pressNews
 */
const renderNoSubscribe = (pressNews) => {
  pressNews.classList.add("hidden");
  pressNews.dataset.brandIdx = -1;
  pressNews.dataset.brandId = -1;
  document.querySelector(".no-subscribe").classList.remove("hidden");
};
