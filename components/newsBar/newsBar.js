const newsBarArea = document.querySelector('#news-bar-area');
const newsBarWrapper = document.querySelector('#news-bar-wrapper');

const mediaImgPath = '/images/asset 35 1.png'
const content = '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출'
newsBarArea.innerHTML = `
    <div id="news-bar-wrapper" class="flex-row-between">
    </div>
`


newsBarWrapper.innerHTML = `
    <div id="news-bar" class="flex-row">
        <img id="news-bar-media-img" src="${mediaImgPath}" alt="" width="49px" height="17px">
        <p id="news-bar-content">
            <link>
                ${content}
            </link>
        </p>
    </div>
    <div id="news-bar" class="flex-row">
        <img id="news-bar-media-img" src="${mediaImgPath}" alt="" width="49px" height="17px">
        <p id="news-bar-content">
            <link>
                ${content}
            </link>
        </p>
    </div>
`
