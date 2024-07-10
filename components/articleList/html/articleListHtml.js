import { menuInfo, menuIdx, menuCurrentPage, menuLastPage, isMediaWhole, newsState } from "../../../pages/state/newsState.js";
import { extractDataWithMedia, getSubscriptionList } from "../../../utils/api.js";
import { addSubscriptionEventListener } from "../articleList.js";
import { addCancleSubscriptionEventListener } from "../event/clickEvent.js";
import { isSubscribed } from "../event/pageEvent.js";

// 메뉴 리스트 생성 함수
export const createMenuList = () => {
    return menuInfo?.map((info, idx) => `
        <div class="menu-btn-wrapper">
            <button class="flex-row-between article-menu-btn ${idx === 0 ? "article-menu-btn-clicked" : ""}">
                <h5>${info?.category}</h5>
                <h5 class="article-menu-pages display-none">1 / ${info?.totalPages}</h5>
            </button>
            <div class="fill-background"></div>
        </div>
    `).join('');
}

export const createSubscriptionMenuList = () => {
    const subList = getSubscriptionList();
    return subList?.map((sub, idx) => `
        <div class="menu-btn-wrapper">
            <button class="flex-row-between article-menu-btn ${idx === 0 ? "article-menu-btn-clicked" : ""}">
                <h5>${sub}</h5>
            </button>
            <div class="fill-background"></div>
        </div>
    `) .join('');
}

// 기사 리스트 생성 함수
export const createArticleLiPart = () => {
    if (isMediaWhole) {
        const articleData = menuInfo[menuIdx].mediaData[menuCurrentPage - 1].articleList;
        return articleData.map((articleItem) => `<li>${articleItem}</li>`).join('');
    } else {
        const subList = getSubscriptionList();
        const mediaName = subList[menuIdx];
        const articleData = extractDataWithMedia(menuInfo)[mediaName].articleList;
        return articleData.map((articleItem) => `<li>${articleItem}</li>`).join('');
    }
}

export const insertSubscriptionContent = () => {
    const subList = getSubscriptionList();
    const mediaName = subList[menuIdx];
    const nowInfo = extractDataWithMedia(menuInfo)[mediaName]

    newsState.setNowMediaName(mediaName);

    document.querySelector('.media-img').src = `/images/logos/${mediaName}.png`;
    document.querySelector('.updated-date-tag').innerText = `${nowInfo.updatedDate} 편집`;
    document.querySelector('.thumbnail-img').src = `https://picsum.photos/500/300?img=95`;
    document.querySelector('.thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;
    document.querySelector('.article-li-part').innerHTML = `
        ${createArticleLiPart()}
        <p class="li-part-info">${nowInfo.mediaName}에서 직접 편집한 뉴스입니다.</p>
    `;
}

// 콘텐츠 삽입 함수
export const insertWholeContent = () => {
    const nowInfo = menuInfo[menuIdx].mediaData[menuCurrentPage - 1];
    
    if (document.querySelector('.article-menu-pages') !== null) {
        document.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    }

    newsState.setNowMediaName(nowInfo.mediaName);

    document.querySelector('.media-img').src = `/images/logos/${nowInfo.mediaName}.png`;
    document.querySelector('.updated-date-tag').innerText = `${nowInfo.updatedDate} 편집`;
    document.querySelector('.thumbnail-img').src = `https://picsum.photos/500/300?img=95`;
    document.querySelector('.thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;
    document.querySelector('.article-li-part').innerHTML = `
        ${createArticleLiPart()}
        <p class="li-part-info">${nowInfo.mediaName}에서 직접 편집한 뉴스입니다.</p>
    `;

    if (isSubscribed()) {
        insertCancleSubscriptionBtn();
    } else {
        insertSubscriptionBtn();

    }
}

export const createArticleList = ({ isSubscription }) => {
    return `
        <div class="articleList-wrapper">
            <div class="article-header-wrapper flex-row-between">
                <div class="media-wrapper inline-tag">
                    <button class="btn whole-media-btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                    <button class="btn subscription-media-btn mode-selection-btn">내가 구독한 언론사</button>
                </div>
                <div class="icon-wrapper inline-tag flex-row-between">
                    <button class="btn list-btn view-btn view-btn-clicked">
                        <img src="/icons/list-view.png" alt="" width="24px" height="24px">
                    </button>
                    <button class="btn grid-btn view-btn">
                        <img src="/icons/grid-view.png" alt="" width="24px" height="24px">
                    </button>
                </div>
            </div>
            <div class="article-body-wrapper">
                <div class="article-menu-wrapper">
                    ${ isSubscription ? createSubscriptionMenuList() : createMenuList() }
                </div>
                <div class="article-wrapper">
                    <div class="article-selection-wrapper"></div>
                    <div class="article-content-wrapper">
                        <div class="content-header-wrapper flex-row">
                            <img class="media-img" src="" alt="">
                            <h4 class="updated-date-tag" style="font-size: 12px; font-weight: 400;"> 편집</h4>
                            <button class="subscribe-btn btn">+ 구독하기</button>
                        </div>
                        <div class="content-body-wrapper flex-row-between">
                            <aside class="thumbnail-part">
                                <img class="thumbnail-img" src="" alt="" width="320px" height="200px">
                                <p class="thumbnail-detail">ABC</p>
                            </aside>
                            <ul class="article-li-part flex-col-between">
                                <p class="li-part-info"></p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export const insertCancleSubscriptionBtn = () => {
    document.querySelectorAll('.subscribe-btn, .cancle-btn')?.forEach((btn) => btn.remove())
    const el = document.createElement('button')
    el.classList.add('cancle-btn')
    const imgEl = document.createElement('img');
    imgEl.src = '/icons/closed.png';
    imgEl.height = 12;
    imgEl.width = 12;
    el.classList.add('btn')
    el.appendChild(imgEl)
    document.querySelector('.content-header-wrapper').appendChild(el);
    addCancleSubscriptionEventListener();
}

export const insertSubscriptionBtn = () => {
    document.querySelectorAll('.cancle-btn, .subscribe-btn')?.forEach((btn) => btn.remove())
    const el = document.createElement('button')
    el.classList.add('subscribe-btn')
    el.classList.add('btn')
    el.innerText = '+ 구독하기'
    document.querySelector('.content-header-wrapper').appendChild(el);
    addSubscriptionEventListener();
}