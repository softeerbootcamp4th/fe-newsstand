import { menuInfo, menuIdx, menuCurrentPage, menuLastPage } from "../../../pages/state/newsState.js";
import { extractDataWithMedia } from "../../../utils/api.js";

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
    const subList = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
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
    const articleData = menuInfo[menuIdx].mediaData[menuCurrentPage - 1].articleList;
    return articleData.map((articleItem) => `<li>${articleItem}</li>`).join('');
}

export const insertSubscriptionContent = () => {
    const subList = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
    const mediaName = subList[menuIdx];
    const nowInfo = extractDataWithMedia(menuInfo)[mediaName]
    document.querySelector('.media-img').src = `/images/logos/${mediaName}.png`;
    document.querySelector('.updated-date-tag').innerText = `${nowInfo.updatedDate} 편집`;
    document.querySelector('.thumbnail-img').src = `https://picsum.photos/500/300?img=95`;
    document.querySelector('.thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;
    document.querySelector('.article-li-part').innerHTML = `
        ${createArticleLiPart(nowInfo.articleList)}
        <p class="li-part-info">${nowInfo.thumbnailMediaName}에서 직접 편집한 뉴스입니다.</p>
    `;
}

// 콘텐츠 삽입 함수
export const insertWholeContent = () => {
    const nowInfo = menuInfo[menuIdx].mediaData[menuCurrentPage - 1];
    
    if (document.querySelector('.article-menu-pages') !== null) {
        document.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    }
    document.querySelector('.media-img').src = `/images/logos/${nowInfo.mediaName}.png`;
    document.querySelector('.updated-date-tag').innerText = `${nowInfo.updatedDate} 편집`;
    document.querySelector('.thumbnail-img').src = `https://picsum.photos/500/300?img=95`;
    document.querySelector('.thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;
    document.querySelector('.article-li-part').innerHTML = `
        ${createArticleLiPart()}
        <p class="li-part-info">${nowInfo.mediaName}에서 직접 편집한 뉴스입니다.</p>
    `;
}