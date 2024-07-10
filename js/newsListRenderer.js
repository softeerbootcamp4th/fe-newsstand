/**
 * 뉴스 정보를 받아와 뉴스 목록을 화면에 표시한다.
 * @param {object} newsInfo - 인덱스 정보, 카테고리 정보, 구독 or 전체 언론사 정보, 그리드 or 리스트 정보를 담은 객체
 * @param {number} newsInfo.indexInfo - 뉴스 목록의 시작 인덱스 (기본값: 1)
 * @param {string} newsInfo.gridListInfo - 뉴스 목록을 그리드 또는 리스트로 표시하는 정보
 * @param {string} newsInfo.categoryInfo - 뉴스 카테고리를 나타내는 문자열 (예: 'sports', 'politics', 'technology')
 * @param {string} newsInfo.subAllInfo - 구독한 언론사 또는 전체 언론사 정보를 나타내는 문자열 (기본값: 'all')
 * 
 */
async function renderNewsList({ indexInfo = 1, gridListInfo, categoryInfo, subAllInfo = 'all' }) {
    const newsList = await fetchNewsList(subAllInfo);
    const headerNewsElement = generateHeaderNewsElement(newsList[categoryInfo][indexInfo * 7])
    const newsListElement = generateNewsListElement(newsList[categoryInfo].slice(indexInfo * 7 + 1, indexInfo * 7 + 7));
    appendElementToHTML(headerNewsElement, newsListElement);
}

/**
 * 구독 or 전체 언론사 정보를 바탕으로 뉴스 목록을 fetch로 받아온다.
 * @param {string} subAllInfo - 구독 or 전체 언론사 정보를 담은 객체
 * @returns {json} - fetch를 통해 서버에서 받아온 뉴스 목록
 */
async function fetchNewsList(subAllInfo) {
    return fetch(`http://127.0.0.1:8000/newsList?subAllInfo=${subAllInfo}`)
        .then((response) => response.json())
}

/**
 * 뉴스 목록을 순회하며 리스트로 보여질 DOM Element를 생성한다.
 * @param {Array} newsList - DOM Element를 생성할 뉴스 목록
 * @returns {Array}
 */
function generateNewsListElement(newsList) {
    const newsListElements = newsList.map((news) => ` <li class="news-list__main__list__title">${news.title}</li>`)
    return `<ul class="news-list__main__list">${newsListElements.join('')}<ul>`
}

/**
 * 헤더 뉴스로 보여질 DOM Element를 생성한다.
 * @param {Array} headerNews - DOM Element를 생성할 뉴스
 * @returns {Array}
 */
function generateHeaderNewsElement(headerNews) {
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
 * HTML에 뉴스 DOM Element를 표시한다.
 * @param {String} headerNewsElement 
 * @param {String} newsListElement 
 */
function appendElementToHTML(headerNewsElement, newsListElement) {
    const mainElement = document.querySelector(".news-list__main")
    mainElement.innerHTML = ''; // 모든 자식 노드 제거

    mainElement.innerHTML += headerNewsElement;
    mainElement.innerHTML += newsListElement;
}

export { renderNewsList }