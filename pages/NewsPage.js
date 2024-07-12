import { createArrow, initArrow } from "../components/arrow/arrow.js";
import { createArticleList } from "../components/articleList/html/articleListHtml.js";
import { initArticleList } from "../components/articleList/articleList.js";
import { createHeader } from "../components/header/header.js"
import { createNewsBar, initNewsBar } from "../components/newsBar/newsBar.js"
import { fetchData } from "../utils/api.js";
import { newsState } from "./state/newsState.js";

export const MENU_INFO_DATA_SRC = '/datas/menuInfo.json';
export const MEDIA_LIST = ['데일리안', '서울경제', '세계일보', '스포츠동아', '스포츠서울', '아시아경제', '이데일리', '조선일보', '파이낸셜뉴스', '헤럴드경제'];  // 썸네일에 임의의 이미지 경로를 넣기 위해

export const NewsPage = async (app) => {
    await fetchNewsPageData({ menuInfoSrc: MENU_INFO_DATA_SRC });
    Header(app);
    NewsBar(app);
    ArticleList(app);
    Arrow(app);
}

const fetchNewsPageData = async ({ menuInfoSrc }) => {
    newsState.setMenuInfo((await fetchData(menuInfoSrc)).data);
}

const Header = (app) => {
    const el = document.createElement('div')
    el.setAttribute('class', 'header-area')
    
    app.appendChild(el)
    el.innerHTML = createHeader();
}

const NewsBar = (app) => {
    const el = document.createElement('div')
    el.setAttribute('class', 'news-bar-area')
    
    app.appendChild(el)
    el.innerHTML = createNewsBar();
    initNewsBar();
}

const ArticleList = (app) => {
    const el = document.createElement('div')
    el.setAttribute('class', 'article-list-area')
    
    app.appendChild(el)
    el.innerHTML = createArticleList({ isSubscription: false });
    initArticleList();
}

const Arrow = (app) => {
    const el = document.createElement('div')
    el.setAttribute('class', 'arrow-area')
    
    app.appendChild(el)
    el.innerHTML = createArrow();
    initArrow();
}