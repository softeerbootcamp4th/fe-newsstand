import { newsListEventNameList } from "../events/newsListEvent.js";
import { Renderer } from "./Renderer.js";

class NewsListRenderer extends Renderer {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.newsListContainer = document.querySelector(".news-list__with-btn");
    }

    /**
     * 이 클래스에서 실행 될 이벤트인지 확인한다.
     * @param {string} event.eventName - 이벤트의 이름 
     * @returns {boolean}
     */
    _checkEventName(event) {
        return newsListEventNameList.includes(event.eventName);
    }

    /**
     * 생성된 element를 렌더링하는 함수
     */
    _render({ newsList }) {
        const newsListElement = this.#generateNewsListElement(newsList);
        this.newsListContainer.innerHTML = '';
        this.newsListContainer.innerHTML += newsListElement;
    }

    /**
     * 표시될 element를 생성하는 함수
     * @param {Array} newsList - State에서 받아온 뉴스 목록
     * @returns {Element}
     */
    #generateNewsListElement(newsList) {
        const headerNewsElement = this.#generateHeaderNewsElement(newsList[0])
        const newsListElement = this.#generateSideNewsListElement(newsList.slice(1));
        return `<button class="news-list__btn-left"></button>
                <main class="news-list__main">
                    ${headerNewsElement}
                    ${newsListElement}
                </main>
                <button class="news-list__btn-right"></button>`
    }

    /**
     * 헤더 뉴스로 보여질 DOM Element를 생성한다.
     * @param {Array} headerNews - DOM Element를 생성할 뉴스
     * @returns {Array}
     */
    #generateHeaderNewsElement(headerNews) {
        return `<div class="news-list__main__heading__headers">
                    <span class="news-list__main__heading__company">${headerNews.media}</span>
                    <span class="news-list__main__heading__date">${headerNews.date}</span>
                </div>
                <ul class="news-list__main__heading">
                    <img src="./images/default.jpg" alt="default" class="news-list__main__heading__image">
                    <li class="news-list__main__heading__title">${headerNews.title}</li>
                </ul>`
    }

    /**
     * 뉴스 목록을 순회하며 리스트로 보여질 DOM Element를 생성한다.
     * @param {Array} newsList - DOM Element를 생성할 뉴스 목록
     * @returns {Array}
     */
    #generateSideNewsListElement(newsList) {
        const newsListElements = newsList.map((news) => `<li class="news-list__main__list__title">${news.title}</li>`)
        return `<ul class="news-list__main__list">
                    ${newsListElements.join('')}
                    <li class="news-list__main__list__media-annotation">${newsList[0].media} 언론사에서 직접 편집한 뉴스입니다.</li>
                <ul>`
    }
}

export { NewsListRenderer }