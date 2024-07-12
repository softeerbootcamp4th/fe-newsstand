import { getTheme } from "../../header/toggleTheme.js";
import { resetProgressBar } from "./displaylistViewNews.js";
import { getSubscriptionList } from "./subscribe.js";

const showNews = () => {
    document.querySelector('.news-container')?.classList.remove('hidden');
    document.querySelector('.info').classList.add('hidden');

}
/* 현재 카테고리의 뉴스 정보로 div 생성하는 함수 */
export function displayNews(news) {
    const theme = getTheme();
    let subscriptions = getSubscriptionList().reverse();
    let mainEventHandler;

    showNews();

    const mainNewsDiv = document.querySelector('.main-news');
    const subNewsDiv = document.querySelector('.sub-news');

    mainNewsDiv.innerHTML = '';
    subNewsDiv.innerHTML = '';

    const subscribeBtn = document.querySelector('.subscribe-btn');

    if(subscriptions.includes(news.company)) {
        subscribeBtn.classList.add('my-subscribe');
        subscribeBtn.textContent = 'x';
    } else {
        subscribeBtn.classList.remove('my-subscribe');
        subscribeBtn.textContent = '+ 구독하기';
    }

    document.getElementById('logo').src = theme === 'light' ? news.logoUrl : news.logoUrl.replace(/\.[^/.]+$/, "") + '_dark.png';
    document.getElementById('logo').alt = news.company;
    document.querySelector('.edit-date').textContent = `${news.date} 편집`;

    const thummnailImg = document.createElement('img');
    thummnailImg.src = news.thumbnailUrl;
    thummnailImg.classList.add('thumbnail-img');
    
    const thumbnailNews = document.createElement('div');
    thumbnailNews.textContent = news.newsItems[0].title;

    mainNewsDiv.appendChild(thummnailImg);
    mainNewsDiv.appendChild(thumbnailNews);

    if(mainEventHandler) mainNewsDiv.removeEventListener('click', mainEventHandler);

    mainEventHandler = () => {
        window.open(news.newsItems[0].url, '_blank');
    };

    mainNewsDiv.addEventListener('click', mainEventHandler);

    news.newsItems.slice(1).forEach(n => {
        const newsItemDiv = document.createElement('div');
        newsItemDiv.classList.add('sub-news-item');
        newsItemDiv.textContent = n.title;
        newsItemDiv.addEventListener('click', () => {
            window.open(n.url, '_blank');
        });

        subNewsDiv.appendChild(newsItemDiv);
    });

    const explanationDiv = document.createElement('div');
    explanationDiv.classList.add('explanation');
    explanationDiv.textContent = `${news.company} 언론사에서 직접 편집한 뉴스 입니다.`;
    subNewsDiv.appendChild(explanationDiv);

    resetProgressBar();
}

