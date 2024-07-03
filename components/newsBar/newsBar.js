const newsBarWrapper = document.querySelector('#news-bar-wrapper');

const mediaImgPath = '/images/asset 35 1.png'
const content = 'ABC'

newsBarWrapper.innerHTML = `
    <div id="news-bar" class="flex-row">
        <img src="${mediaImgPath}" alt="" width="49px" height="17px">
        <p id="news-bar-content">
            <link>
                ${content}
            </link>
        </p>
    </div>
    <div id="news-bar" class="flex-row">
        <img src="${mediaImgPath}" alt="" width="49px" height="17px">
        <p id="news-bar-content">
            <link>
                ${content}
            </link>
        </p>
    </div>
`
