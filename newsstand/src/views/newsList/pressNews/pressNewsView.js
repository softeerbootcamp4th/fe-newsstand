const CLASS = Object.freeze({
    PRESS_NEWS_CONTAINER: 'press-news-container',
    PRESS_MAIN_NEWS_CONTAINER: 'press-main-news-container',
    PRESS_MAIN_NEWS_IMG: 'press-main-news-img',
    PRESS_MAIN_NEWS_IMG_CONTAINER: 'press-main-news-img-container',
    PRESS_MAIN_NEWS_TITLE: 'press-main-news-title',
    PRESS_LIST_NEWS_CONTAINER: 'press-list-news-container',
    PRESS_SUB_NEWS_LIST: 'press-sub-news-list',
    PRESS_LIST_NEWS_COMMENT: 'press-list-news-comment'
})

export const IntervalKey = Object.freeze({
    RollingLeft: 'RollingLeft',
    RollingRight: 'RollingRight',
    Progress: 'Progress'
});

class PressNewsView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = CLASS.PRESS_NEWS_CONTAINER;

        this.render();
    }

    render() {
        const html = `
            <div class="${CLASS.PRESS_MAIN_NEWS_CONTAINER}">
                <div class="${CLASS.PRESS_MAIN_NEWS_CONTAINER}">
                    <img class="${CLASS.PRESS_MAIN_NEWS_IMG}" src="" alt="Main news image"/>
                </div>
                <p class="${CLASS.PRESS_MAIN_NEWS_TITLE}"></p>
            </div>
            <div class="${CLASS.PRESS_LIST_NEWS_CONTAINER}">
                <ul class="${CLASS.PRESS_SUB_NEWS_LIST}"></ul>
                <span class="${CLASS.PRESS_LIST_NEWS_COMMENT}"></span>
            </div>
        `;

        this.element.innerHTML = html;
    }

    update(news) {
        const mainNewsImg = this.element.querySelector(`.${CLASS.PRESS_MAIN_NEWS_IMG}`);
        const mainNewsTitle = this.element.querySelector(`.${CLASS.PRESS_MAIN_NEWS_TITLE}`);
        const subNewsList = this.element.querySelector(`.${CLASS.PRESS_SUB_NEWS_LIST}`);
        const newsComment = this.element.querySelector(`.${CLASS.PRESS_LIST_NEWS_COMMENT}`);

        if (news.mainNews) {
            mainNewsImg.src = news.mainNews.thumbnailImage;
            mainNewsImg.alt = news.mainNews.newsTitle;
            mainNewsTitle.textContent = news.mainNews.newsTitle;
        }

        if (news.subNews && Array.isArray(news.subNews)) {
            subNewsList.innerHTML = news.subNews.map(n => `
                <li>${n.newsTitle}</li>
            `).join('');
        }

        newsComment.textContent = `${news.pressName} 언론사에서 직접 편집한 뉴스입니다.`;
    }

    getElement() {
        return this.element;
    }
}

export default PressNewsView;