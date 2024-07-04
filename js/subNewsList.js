import { news } from "../data/news.js";

(() => {
  const subNewsList = document.querySelector(".sub-news-list");

  news.forEach((article) => {
    const listItem = `<a herf = "#" class = "available-medium16 text-bold">${article}</a>`;
    subNewsList.innerHTML += listItem;
  });
})();
