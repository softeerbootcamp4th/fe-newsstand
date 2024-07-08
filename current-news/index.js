import { getData } from '../utils/fetch.js';
import { rollingDOM } from './rolling.js';

async function initCurrentNews() {
    const currentNews = await getData("../static/data/current-news.json");
    const currentNewsBoxDOMs = document.querySelectorAll('.current-news__box');
    
    currentNewsBoxDOMs.forEach((newsBoxDOM, idx) => {
        const mediaTitleDOM = newsBoxDOM.querySelector('.current-news__media-title');
        const rollingBoxDOM = newsBoxDOM.querySelector('.current-news__rolling-box');

        mediaTitleDOM.textContent = currentNews.data[idx].media;
        rollingDOM(rollingBoxDOM, currentNews.data[idx], idx)
    });
}

initCurrentNews();