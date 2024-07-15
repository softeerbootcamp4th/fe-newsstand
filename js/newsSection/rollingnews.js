import { createNewsItem } from "./createNewsItem.js";

export function rollingNews(container, news, index) {
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
  