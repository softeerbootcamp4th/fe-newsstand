const newsBarArea = document.querySelector('#news-bar-area');

const mediaImgPath = '/images/logos/조선일보.png'
const content = '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출'

export const createNewsBar = () => {
    return `
        <div class="news-bar-wrapper flex-row-between">
            <div class="news-bar flex-row">
                <img class="news-bar-media-img" src="${mediaImgPath}" alt="" width="49px" height="17px">
                <p class="news-bar-content">
                    <link>
                        ${content}
                    </link>
                </p>
            </div>
            <div class="news-bar flex-row">
                <img class="news-bar-media-img" src="${mediaImgPath}" alt="" width="49px" height="17px">
                <p class="news-bar-content">
                    <link>
                        ${content}
                    </link>
                </p>
            </div>
        </div>
    `
}
