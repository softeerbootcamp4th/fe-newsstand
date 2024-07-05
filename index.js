import { createNewsTicker } from "./src/components/newsTicker/newsTicker.js";
import { createSwitcher } from "./src/components/switcher/switcher.js";

import { leftNewsItems, rightNewsItems } from "./src/data/headlineNews.js";
import { dataTabItems, viewTabItems } from "./src/data/tabItems.js";

import {
  switchCompanyTab,
  switchCompanyView,
} from "./src/features/renderNews/utils/updateStates.js";

/* render current time */
document.addEventListener("DOMContentLoaded", () => {
  const timeElement = document.getElementById("current-date");
  const now = new Date();
  const formattedDate = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  });

  timeElement.dateTime = now.toISOString();
  timeElement.textContent = formattedDate;
});

/* render headline news ticker */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("news-ticker-container");

  const left = createNewsTicker({ newsItems: leftNewsItems, tag: "연합뉴스" });
  const right = createNewsTicker({ newsItems: rightNewsItems, tag: "연합뉴스" }, 1);

  container.appendChild(left);
  container.appendChild(right);
});

/* render switcher */
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("switcher-container");

  const tabSwitcher = createSwitcher({
    className: "tab-switcher",
    items: dataTabItems,
    onClick: (event) => switchCompanyTab(event.target.id),
  });

  const viewSwitcher = createSwitcher({
    className: "view-switcher",
    items: viewTabItems,
    onClick: (event) => switchCompanyView(event.target.id),
  });

  navContainer.appendChild(tabSwitcher);
  navContainer.appendChild(viewSwitcher);
});

/** render news view */
document.addEventListener("DOMContentLoaded", () => {
  switchCompanyTab("all-news-tab");
});
