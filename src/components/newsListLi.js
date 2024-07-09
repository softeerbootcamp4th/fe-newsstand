import { allNewsData } from './news.js';
import { getSubscribedData } from './fieldTab.js';

export const newsListLi = (isFull) => {
    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
    const subscribed = getSubscribedData();

    if (isFull) {
        return allNewsData.map((item) => {
            const li = document.createElement('li');
            li.textContent = item.category;
            li.classList.add('notselectNews');

            NewsListUl.appendChild(li);
            return li;
        });
    }
    else {
        if (subscribed.length != 0) {
            return subscribed.map((item) => {
                const li = document.createElement('li');
                li.textContent = item;
                li.classList.add('notselectNews');

                NewsListUl.appendChild(li);
                return li;
            });
        }
    }
};