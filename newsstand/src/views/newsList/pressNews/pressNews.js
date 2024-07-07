export const PressNewsContainer = (props) => {
    let element = document.createElement('div');
    element.className = 'press-news-container';

    function render() {
        const mainNewsHtml = `
            <div class="press-main-news-container">
                <div class ="press-main-news-img-container">
                    <img class="press-main-news-img" src="${props.mainNews.imageSrc}"/>
                </div>
                <p>${props.mainNews.title}</p>
            </div>
        `;
        
        const listNewsHtml = props.listNews.map(news => `
            <li>${news.title}</li>
        `).join('');

        const html = `
            ${mainNewsHtml}
            <div class="press-list-news-container">
                <ul>${listNewsHtml}</ul>
                <span class="press-list-news-comment">데일리안 언론사에서 직접 편집한 뉴스입니다.</span>
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
