import { createButton } from "../../../../../components/button/button.js";
import { Company, NewsItem } from "../../../../../types/news.js";

/**
 * @param {Company} company
 * @returns {HTMLDivElement}
 */
export function createCompany(company) {
  const container = document.createElement("div");
  container.className = "list-company-container border-box";

  container.appendChild(createHeader(company));
  container.insertAdjacentHTML("beforeend", createNewsContents(company));

  return container;
}

/**
 * @param {Company} company
 * @returns {HTMLDivElement}
 */
function createHeader(company) {
  const { companyLogoUrl, companyName, updatedDate } = company;

  const header = document.createElement("div");
  header.className = "company-container-header display-medium12";

  header.innerHTML = `
    <img src=${companyLogoUrl} alt='${companyName} 로고'/>
    <time>${formatDateString(updatedDate)}</time>
  `;
  header.appendChild(createButton({ iconId: "plus", text: "구독하기" }));

  return header;
}

/**
 * @param {Company} company
 * @returns {string}
 */
function createNewsContents(company) {
  const { newsItems, companyName, mainNews } = company;

  return `<div class='company-container-contents'>
            ${createMainNews(mainNews)}
            ${createNewsList(newsItems, companyName)}
          </div>`;
}

/**
 * @param {NewsItem} mainNews
 * @returns {string}
 */
function createMainNews(mainNews) {
  const { thumbnailUrl } = mainNews;

  return `<div class='main-news'>
            <img loading='lazy' src=${thumbnailUrl} alt='메인 뉴스 썸네일'/>
            ${createNewsTitle(mainNews)}
          </div>`;
}

/**
 * @param {NewsItem[]} newsList
 * @param {string} companyName
 * @returns {string}
 */
function createNewsList(newsList, companyName) {
  const newsItems = newsList.map(createNewsTitle).join("");

  return `
   <ul class="news-list">
     ${newsItems}
     <p class="display-medium14">${companyName}에서 직접 편집한 뉴스입니다.</p>
   </ul>
 `;
}

/**
 * @param {NewsItem} news
 * @returns {string}
 */
function createNewsTitle(news) {
  const { url, title } = news;

  return `<a class='display-medium16 ellipsis' href=${url} target='_blank'>${title}</a>`;
}

/**
 * @param {string} isoString
 * @returns {string}
 */
function formatDateString(isoString) {
  const date = new Date(isoString);

  const formattedDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ".")
    .trim();

  const time = date.toISOString().split("T")[1].substring(0, 5);

  return `${formattedDate} ${time} 편집`;
}
