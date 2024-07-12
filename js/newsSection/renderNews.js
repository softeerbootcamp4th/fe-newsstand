import { createNewsItem } from "./createNewsItem.js";

export function renderNews(container, news, index) {
    container.innerHTML = "";
    const newsItem = createNewsItem(news[index], "show");
    const nextNewsItem = createNewsItem(
      news[(index + 1) % news.length],
      "hidden"
    );
    container.appendChild(newsItem);
    container.appendChild(nextNewsItem);
  }
  