let leftIndex = 0;
let rightIndex = 0;
const intervalTime = 5000;

let leftTimer;
let rightTimer;

let leftNews = [];
let rightNews = [];

document.addEventListener("DOMContentLoaded", () => {
  const leftNewsContainer = document.querySelector(".news-container-left");
  const rightNewsContainer = document.querySelector(".news-container-right");

  fetch("./data/latestNews.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Error");
      }
      return response.json();
    })
    .then((newsData) => {
      leftNews = newsData.slice(0, 5);
      rightNews = newsData.slice(5, 10);

      renderNews(leftNewsContainer, leftNews, leftIndex);
      renderNews(rightNewsContainer, rightNews, rightIndex);

      leftTimer = createInterval(leftNewsContainer, leftNews, leftIndex, 'left');

      setTimeout(() => {
        rightTimer = createInterval(rightNewsContainer, rightNews, rightIndex, 'right');
      }, 1000);

      // 마우스 호버 시 롤링 일시정지 및 밑줄 표시
      leftNewsContainer.addEventListener("mouseenter", () => {
        clearInterval(leftTimer);
        leftNewsContainer.querySelector(".news-item").classList.add("hovered");
      });
      leftNewsContainer.addEventListener("mouseleave", () => {
        leftNewsContainer
          .querySelector(".news-item")
          .classList.remove("hovered");
        leftTimer = createInterval(leftNewsContainer, leftNews, leftIndex, 'left');
      });

      rightNewsContainer.addEventListener("mouseenter", () => {
        clearInterval(rightTimer);
        rightNewsContainer.querySelector(".news-item").classList.add("hovered");
      });
      rightNewsContainer.addEventListener("mouseleave", () => {
        rightNewsContainer
          .querySelector(".news-item")
          .classList.remove("hovered");
        rightTimer = createInterval(rightNewsContainer, rightNews, rightIndex, 'right');
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});

// 뉴스 아이템 생성 함수
function createNewsItem(news, classname = "") {
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

function createInterval(container, news, index, type) {
  return setInterval(() => {
    if (type === 'left') {
      leftIndex = rollingNews(container, news, leftIndex);
    } else {
      rightIndex = rollingNews(container, news, rightIndex);
    }
  }, intervalTime);
}

function renderNews(container, news, index) {
  container.innerHTML = "";
  const newsItem = createNewsItem(news[index], "show");
  const nextNewsItem = createNewsItem(
    news[(index + 1) % news.length],
    "hidden"
  );
  container.appendChild(newsItem);
  container.appendChild(nextNewsItem);
}

function rollingNews(container, news, index) {
  const curNewsItem = container.querySelector(".news-item.show");
  const nextNewsItem = container.querySelector(".news-item.hidden");

  if (curNewsItem) {
    curNewsItem.classList.remove("show");
    curNewsItem.classList.add("exit");
  }

  if (nextNewsItem) {
    nextNewsItem.classList.remove("hidden");
    nextNewsItem.classList.add("show");
  }

  setTimeout(() => {
    if (curNewsItem) curNewsItem.remove();
    const newNewsItem = createNewsItem(
      news[(index + 2) % news.length],
      "hidden"
    );
    container.appendChild(newNewsItem);
  }, 1000);

  return (index + 1) % news.length;
}
