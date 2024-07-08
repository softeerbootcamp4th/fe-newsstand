import { TOP_NEWS_DATA } from "../../data/topNewsData.js";

function renderTopNews(idx, topNewsItemId) {
  const topNewsItem = document.getElementById(topNewsItemId);
  const rollingList = topNewsItem.querySelector('.rolling');
  const allNews = TOP_NEWS_DATA.data[0].topNews[idx].newsLists;

  rollingList.innerHTML = allNews.map(news => `
   <li>
     <span class="company">${news.name}</span>
     <span class="description">
       <a href="${news.url}" target="_blank" rel="noopener noreferrer">${news.description}</a>
     </span>
   </li>
 `).join('');

  return rollingList;
}

function startRolling() {
  const rollingList1 = renderTopNews(0, 'top-news-item-1');
  const rollingList2 = renderTopNews(1, 'top-news-item-2');

  function roll(list) {
    const itemHeight = list.children[0].offsetHeight;
    const totalItems = list.children.length;
    let currentIdx = 0;
    let rollingInterval;

    function moveToNext() {
      list.style.transition = 'top 0.5s ease';
      list.style.top = `-${currentIdx * itemHeight}px`;
      currentIdx = (currentIdx + 1) % totalItems;
    }

    function startInterval() {
      rollingInterval = setInterval(() => {
        moveToNext();
      }, 5000);
    }

    list.addEventListener('mouseenter', () => {
      clearInterval(rollingInterval);
    });

    list.addEventListener('mouseleave', () => {
      startInterval();
    });

    moveToNext();
    startInterval();
  }

  roll(rollingList1);
  setTimeout(() => {roll(rollingList2)}, 1000);
}

startRolling();