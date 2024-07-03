import { CURRENT_NEWS } from '../static/data/current-news.js'
import { rollingDOM } from './rolling.js';

function initCurrentNews() {
    const currentNewsBoxDOMs = document.querySelectorAll('.current-news__box');
    
    currentNewsBoxDOMs.forEach((newsBoxDOM, idx) => {
        const mediaTitleDOM = newsBoxDOM.querySelector('.current-news__media-title');
        const rollingBoxDOM = newsBoxDOM.querySelector('.current-news__rolling-box');

        mediaTitleDOM.innerText = CURRENT_NEWS.data[idx].media;
        rollingDOM(rollingBoxDOM, CURRENT_NEWS.data[idx], idx)
    });
}

initCurrentNews();