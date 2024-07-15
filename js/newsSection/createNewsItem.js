// 뉴스 아이템 생성 함수
export function createNewsItem(news, classname = "") {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item", classname);
    newsItem.insertAdjacentHTML(
      "afterbegin",
      `
      <span class="news-company">${news.company}</span>
      <p class="news-title">${news.title}</p>
    `
    );
    newsItem.setAttribute("data-url", news.url);
    newsItem.addEventListener("click", () => {
      window.open(news.url, "_blank");
    });
  
    return newsItem;
  }
  