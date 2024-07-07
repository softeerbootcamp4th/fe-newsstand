import { MEDIA_LIST, CATEGORY_TIMEOUT } from "../../pages/NewsPage.js";
import { newsState } from "../../pages/state/newsState.js";
import { menuInfo, menuCurrentPage, menuLastPage, menuIdx, categoryTimeoutId } from "../../pages/state/newsState.js";

// 초기화 함수
export const initArticleList = async () => {
    try {
        addEventListeners();
        // 첫번째 카테고리 버튼에 class 부여
        console.log(document.querySelector('.article-menu-wrapper'))
        setDataWithTab(document.querySelectorAll('.menu-btn-wrapper')[0], 0);
    } catch (error) {
        console.log(error)
    }
}

// 초기 UI 렌더링 함수
export const createArticleList = (menuInfo) => {
    return `
        <div class="articleList-wrapper">
            <div class="article-header-wrapper flex-row-between">
                <div class="media-wrapper inline-tag">
                    <button class="btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                    <button class="btn mode-selection-btn">내가 구독한 언론사</button>
                </div>
                <div class="icon-wrapper inline-tag flex-row-between">
                    <button class="btn view-btn view-btn-clicked">
                        <img src="/icons/list-view.png" alt="" width="24px" height="24px">
                    </button>
                    <button class="btn view-btn">
                        <img src="/icons/grid-view.png" alt="" width="24px" height="24px">
                    </button>
                </div>
            </div>
            <div class="article-menu-wrapper">
                ${createMenuList(menuInfo)}
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
    `;
}

// 메뉴 리스트 생성 함수
const createMenuList = (menuInfo) => {
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

// 기사 리스트 생성 함수
const createArticleLiPart = (articleData) => {
    return articleData.map((articleItem) => `<li>${articleItem}</li>`).join('');
}

// 이벤트 리스너 추가 함수
const addEventListeners = () => {
    addModeSelectionEventListener();
    addViewSelectionEventListener();
    addCategorySelectionEventListener();
}

const addModeSelectionEventListener = () => {
    // Mode selection event
    document.querySelector('.media-wrapper').addEventListener('click', (event) => {
        if (event.target.classList.contains('mode-selection-btn')) {
            document.querySelectorAll('.mode-selection-btn').forEach(btn => btn.classList.remove('mode-selection-btn-clicked'));
            event.target.classList.add('mode-selection-btn-clicked');
        }
    });
}

const addViewSelectionEventListener = () => {
    // View selection event
    document.querySelector('.icon-wrapper').addEventListener('click', (event) => {
        if (event.target.closest('.view-btn')) {
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('view-btn-clicked'));
            event.target.closest('.view-btn').classList.add('view-btn-clicked');
        }
    });
}

const addCategorySelectionEventListener = () => {
    // Category selection event
    document.querySelector('.article-menu-wrapper').addEventListener('click', (event) => {
        if (event.target.closest('.menu-btn-wrapper')) {
            const btnWrapper = event.target.closest('.menu-btn-wrapper');
            const idx = Array.from(btnWrapper.parentNode.children).indexOf(btnWrapper);
            setDataWithTab(btnWrapper, idx);
        }
    });
}

// 콘텐츠 삽입 함수
const insertContent = (menuIdx, menuCurrentPage, menuLastPage) => {
    const nowInfo = menuInfo[menuIdx].thumbnailDatas[menuCurrentPage - 1];
    
    document.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    document.querySelector('.media-img').src = `/images/logos/${nowInfo.thumbnailMediaName}.png`;
    document.querySelector('.updated-date-tag').innerText = `${nowInfo.thumbnailUpdatedDate} 편집`;
    document.querySelector('.thumbnail-img').src = `/images/logos/${MEDIA_LIST[menuCurrentPage]}.png`;
    document.querySelector('.thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;
    document.querySelector('.article-li-part').innerHTML = `
        ${createArticleLiPart(nowInfo.articleList)}
        <p class="li-part-info">${nowInfo.thumbnailMediaName}에서 직접 편집한 뉴스입니다.</p>
    `;
}

// 페이지 이동 함수
const handleCategoryEvent = (thisBtn, menuInfo) => {
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    const totalMenuLength = menuInfo.length;
    newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);
    
    const timeoutId = setTimeout(() => {
        if (menuCurrentPage === menuLastPage) {
            moveNextCategory();
        } else {
            moveNextPage();
        }
        insertContent(menuIdx, menuCurrentPage, menuLastPage);
    }, CATEGORY_TIMEOUT);
    newsState.setCategoryTimeoutId(timeoutId);
}

const moveNextCategory = () => {
    newsState.setMenuCurrentPage(1);
    newsState.setMenuIdx(menuIdx+1);
    if (menuIdx === totalMenuLength) {
        newsState.setMenuIdx(0);
    }
    thisBtn.classList.remove('menu-btn-wrapper-clicked');
    nextBtn.classList.add('menu-btn-wrapper-clicked');
    handleCategoryEvent(nextBtn, menuInfo);
}

const moveNextPage = () => {
    newsState.setMenuCurrentPage(menuCurrentPage+1);
    thisBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    thisBtn.querySelector('.fill-background').remove();
    
    const fillBackground = document.createElement('div');
    fillBackground.classList.add('fill-background');
    thisBtn.appendChild(fillBackground);
    
    handleCategoryEvent(thisBtn, menuInfo);
}

// 탭 데이터 설정 함수
const setDataWithTab = (btnWrapper, menuIdx) => {
    newsState.setMenuIdx(menuIdx);
    newsState.setMenuCurrentPage(1);
    newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);
    
    insertContent(menuIdx, menuCurrentPage, menuLastPage);

    document.querySelectorAll('.menu-btn-wrapper').forEach((btnWrapper, idx) => {
        btnWrapper.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[idx].totalPages}`;
    });

    clearTimeout(categoryTimeoutId);

    document.querySelectorAll('.menu-btn-wrapper').forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    btnWrapper.classList.add('menu-btn-wrapper-clicked');

    handleCategoryEvent(btnWrapper, menuInfo);
}