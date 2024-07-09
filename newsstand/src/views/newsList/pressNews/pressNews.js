export const PressNewsContainer = ({pressName, mainNews, subNews}) => {
    let element = document.createElement('div');
    element.className = 'press-news-container';

    console.log(mainNews, subNews);
    function render() {
        const mainNewsHtml = `
            <div class="press-main-news-container">
                <div class ="press-main-news-img-container">
                    <img class="press-main-news-img" src="${mainNews.thumbnailImage}"/>
                </div>
                <p>${mainNews.newsTitle}</p>
            </div>
        `;
        
        const listNewsHtml = subNews.map(news => `
            <li>${news.newsTitle}</li>
        `).join('');

        const html = `
            ${mainNewsHtml}
            <div class="press-list-news-container">
                <ul>${listNewsHtml}</ul>
                <span class="press-list-news-comment">${pressName} 언론사에서 직접 편집한 뉴스입니다.</span>
            </div>
        `;

        element.innerHTML = html;
    }

    render();

    return {
        element
    };
}

export default PressNewsContainer;
