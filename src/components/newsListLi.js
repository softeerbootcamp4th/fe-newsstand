import { allNewsData } from './news.js';

export const newsListLi = (isFull) => {
    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
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
        return allNewsData.reduce((acc, category) => {
            category.company.forEach((company) => {
                if (company.isSubscribe) {
                    const li = document.createElement('li');
                    li.textContent = company.companyName;
                    li.classList.add('notselectNews');

                    NewsListUl.appendChild(li);
                    acc.push(li);
                }
            });
            return acc;
        }, []);
    }
};