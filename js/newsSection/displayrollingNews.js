import { renderNews } from "./renderNews.js";
import { rollingNews } from "./rollingnews.js";

const intervalTime = 5000;
let leftIndex = 0;
let rightIndex = 0;
let leftTimer;
let rightTimer;
let leftNews = [];
let rightNews = [];

document.addEventListener("DOMContentLoaded", () => fetchData());

function fetchData () {
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


}


function createInterval(container, news, index, type) {
  return setInterval(() => {
    if (type === 'left') {
      leftIndex = rollingNews(container, news, index);
    } else {
      rightIndex = rollingNews(container, news, index);
    }
  }, intervalTime);
}


