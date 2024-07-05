// 상수 정의
const DATA_SRC = '/datas/menuInfo.json';
const MEDIA_LIST = ['데일리안', '서울경제', '세계일보', '스포츠동아', '스포츠서울', '아시아경제', '이데일리', '조선일보', '파이낸셜뉴스', '헤럴드경제'];  // 썸네일에 임의의 이미지 경로를 넣기 위해
const CATEGORY_TIMEOUT = 1000 * 20;

// 전역 변수 선언
let menuInfo;
let menuCurrentPage = 1;
let menuLastPage = 0;
let nowMenuIdx = 0;
let categoryTimeoutId;

// 초기화 함수
const init = async () => {
    try {
        menuInfo = await loadJsonData(DATA_SRC);
        menuInfo = menuInfo.data;
        const articleArea = document.querySelector('#article-list-area');
        renderInitialUI(menuInfo, articleArea);
        addEventListeners();

        // 첫번째 카테고리 버튼에 class 부여
        setDataWithTab(document.querySelectorAll('.menu-btn-wrapper')[0], 0);
    } catch (error) {
        alert('fail');
    }
}

// JSON 데이터 로드 함수
const loadJsonData = async (src) => {
    const res = await fetch(src);
    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${src}`);
    }
    return res.json();
}

// 초기 UI 렌더링 함수
const renderInitialUI = (menuInfo, articleArea) => {
    articleArea.innerHTML = `
        <div id="articleList-wrapper">
            <div id="article-header-wrapper" class="flex-row-between">
                <div id="media-wrapper" class="inline-tag">
                    <button class="btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                    <button class="btn mode-selection-btn">내가 구독한 언론사</button>
                </div>
                <div id="icon-wrapper" class="inline-tag flex-row-between">
                    <button class="btn view-btn view-btn-clicked">
                        <img src="/icons/list-view.png" alt="" width="24px" height="24px">
                    </button>
                    <button class="btn view-btn">
                        <img src="/icons/grid-view.png" alt="" width="24px" height="24px">
                    </button>
                </div>
            </div>
            <div id="article-menu-wrapper">
                ${createMenuList(menuInfo)}
            </div>
            <div id="article-wrapper">
                <div id="article-selection-wrapper"></div>
                <div id="article-content-wrapper">
                    <div id="content-header-wrapper" class="flex-row">
                        <img id="media-img" src="" alt="">
                        <h4 id="updated-date-tag" style="font-size: 12px; font-weight: 400;"> 편집</h4>
                        <button id="subscribe-btn" class="btn">+ 구독하기</button>
                    </div>
                    <div id="content-body-wrapper" class="flex-row-between">
                        <aside id="thumbnail-part">
                            <img id="thumbnail-img" src="" alt="" width="320px" height="200px">
                            <p id="thumbnail-detail">ABC</p>
                        </aside>
                        <ul id="article-li-part" class="flex-col-between">
                            <p id="li-part-info"></p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 메뉴 리스트 생성 함수
const createMenuList = (menuInfo) => {
    return menuInfo.map((info, idx) => `
        <div class="menu-btn-wrapper">
            <button class="flex-row-between article-menu-btn ${idx === 0 ? "article-menu-btn-clicked" : ""}">
                <h5>${info.category}</h5>
                <h5 class="article-menu-pages display-none">1 / ${info.totalPages}</h5>
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
    // Mode selection event
    document.querySelector('#media-wrapper').addEventListener('click', (event) => {
        if (event.target.classList.contains('mode-selection-btn')) {
            document.querySelectorAll('.mode-selection-btn').forEach(btn => btn.classList.remove('mode-selection-btn-clicked'));
            event.target.classList.add('mode-selection-btn-clicked');
        }
    });

    // View selection event
    document.querySelector('#icon-wrapper').addEventListener('click', (event) => {
        if (event.target.closest('.view-btn')) {
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('view-btn-clicked'));
            event.target.closest('.view-btn').classList.add('view-btn-clicked');
        }
    });

    // Category selection event
    document.querySelector('#article-menu-wrapper').addEventListener('click', (event) => {
        if (event.target.closest('.menu-btn-wrapper')) {
            const btnWrapper = event.target.closest('.menu-btn-wrapper');
            const idx = Array.from(btnWrapper.parentNode.children).indexOf(btnWrapper);
            setDataWithTab(btnWrapper, idx);
        }
    });
}

// 콘텐츠 삽입 함수
const insertContent = (nowMenuIdx, menuCurrentPage, menuLastPage) => {
    const nowInfo = menuInfo[nowMenuIdx].thumbnailDatas[menuCurrentPage - 1];
    
    document.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    document.querySelector('#media-img').src = `/images/logos/${nowInfo.thumbnailMediaName}.png`;
    document.querySelector('#updated-date-tag').innerText = `${nowInfo.thumbnailUpdatedDate} 편집`;
    document.querySelector('#thumbnail-img').src = `/images/logos/${MEDIA_LIST[menuCurrentPage]}.png`;
    document.querySelector('#thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;
    document.querySelector('#article-li-part').innerHTML = `
        ${createArticleLiPart(nowInfo.articleList)}
        <p id="li-part-info">${nowInfo.thumbnailMediaName}에서 직접 편집한 뉴스입니다.</p>
    `;
}

// 페이지 이동 함수
const moveToNextPage = (thisBtn) => {
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    const totalMenuLength = menuInfo.length;
    menuLastPage = menuInfo[nowMenuIdx].totalPages;
    
    categoryTimeoutId = setTimeout(() => {
        if (menuCurrentPage === menuLastPage) {
            menuCurrentPage = 1;
            nowMenuIdx += 1;
            if (nowMenuIdx === totalMenuLength) {
                nowMenuIdx = 0;
            }
            thisBtn.classList.remove('menu-btn-wrapper-clicked');
            nextBtn.classList.add('menu-btn-wrapper-clicked');
            moveToNextPage(nextBtn);
        } else {
            menuCurrentPage += 1;
            thisBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
            thisBtn.querySelector('.fill-background').remove();
            
            const fillBackground = document.createElement('div');
            fillBackground.classList.add('fill-background');
            thisBtn.appendChild(fillBackground);
            
            moveToNextPage(thisBtn);
        }
        insertContent(nowMenuIdx, menuCurrentPage, menuLastPage);
    }, CATEGORY_TIMEOUT);
}

// 탭 데이터 설정 함수
const setDataWithTab = (btnWrapper, idx) => {
    nowMenuIdx = idx;
    menuCurrentPage = 1;
    menuLastPage = menuInfo[nowMenuIdx].totalPages;

    insertContent(nowMenuIdx, menuCurrentPage, menuLastPage);

    document.querySelectorAll('.menu-btn-wrapper').forEach((btnWrapper, idx) => {
        btnWrapper.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[idx].totalPages}`;
    });

    clearTimeout(categoryTimeoutId);

    document.querySelectorAll('.menu-btn-wrapper').forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    btnWrapper.classList.add('menu-btn-wrapper-clicked');

    moveToNextPage(btnWrapper);
}

// 초기화 호출
init();