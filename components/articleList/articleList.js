// 초기 상태

const loadJsonData = async (src) => {
    const res = await fetch(src);
    return res.json();
}

let menuInfo = await loadJsonData('/datas/menuInfo.json')
menuInfo = menuInfo.data

const articleArea = document.querySelector('#article-list-area');

let menuCurrentPage = 1;
let menuLastpage = 0;
let nowMenuIdx = 0;

// create 태그
const createMenuList = (menuInfo) => {
    return menuInfo.map((info) => (
        {
            menuName: info.category,
            menuLastPage: info.totalPages
        }
    )).map((info, idx) => `
        <div class="menu-btn-wrapper">
            <button class="flex-row-between article-menu-btn ${idx === 0 ? "article-menu-btn-clicked" : ""}">
                <h5>
                    ${info.menuName}
                </h5>
                <h5 class="article-menu-pages display-none">
                    ${1} / ${info.menuLastPage}
                </h5>
            </button>
            <div class="fill-background">
            </div>
        </div>
    `).join('');
}

const createArticleLiPart = (articleData) => 
    {return articleData.map((articleItem) => `
        <li>${articleItem}</li>
    `).join('')}

articleArea.innerHTML = `
    <div id="articleList-wrapper">
        <div id="article-header-wrapper" class="flex-row-between">
            <div id="media-wrapper inline-tag">
                <button class="btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                <button class="btn mode-selection-btn">내가 구독한 언론사</button>
            </div>
            <div id="icon-wrapper inline-tag flex-row-between">
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
            <div id="article-selection-wrapper">
            </div>
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
`

// mode-selection-event
const modeSelectionBtns = document.querySelectorAll('.mode-selection-btn');
modeSelectionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        modeSelectionBtns.forEach(b => b.classList.remove('mode-selection-btn-clicked'));
        this.classList.add('mode-selection-btn-clicked');
    });
});

// view-selection-event
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        viewBtns.forEach(b => b.classList.remove('view-btn-clicked'));
        this.classList.add('view-btn-clicked');
    });
});

// category-selection-event
let categoryTimeoutId; // setTimeoutId

const mediaList = ['데일리안', '서울경제', '세계일보', '스포츠동아', '스포츠서울', '아시아경제', '이데일리', '조선일보', '파이낸셜뉴스', '헤럴드경제'];

const insertContent = (nowMenuIdx, menuCurrentPage, menuLastpage) => {
    const nowInfo = menuInfo[nowMenuIdx].thumbnailDatas[menuCurrentPage-1]
    
    // 페이지 정보
    document.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastpage}`

    // 미디어 사진
    document.querySelector('#media-img').src = `/images/logos/${nowInfo.thumbnailMediaName}.png`
    
    // 수정일
    document.querySelector('#updated-date-tag').innerText = `${nowInfo.thumbnailUpdatedDate} 편집`
    
    // 구독하기에 해당 신문사 정보 삽입
    
    // 썸네일 경로
    document.querySelector('#thumbnail-img').src = `/images/logos/${mediaList[menuCurrentPage]}.png`
    
    // 썸네일 디테일
    document.querySelector('#thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;

    // 목록 리스트, 안내 문구
    document.querySelector('#article-li-part').innerHTML = `
        ${createArticleLiPart(nowInfo.articleList)}
        <p id="li-part-info">${nowInfo.thumbnailMediaName}에서 직접 편집한 뉴스입니다.</p>
    `
}

const moveToNextPage = (thisBtn) => {
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    const totalMenuLength = menuInfo.length;
    menuLastpage = menuInfo[nowMenuIdx].totalPages
    categoryTimeoutId = setTimeout(() => { // 타이머 식별자 저장
        // 다음 메뉴로 넘어감
        if (menuCurrentPage === menuLastpage) {
            // 페이지 세팅
            menuCurrentPage = 1;
            nowMenuIdx += 1;
            if (nowMenuIdx === totalMenuLength) {
                nowMenuIdx = 0;
            }
            
            // 다음 버튼으로 이동
            thisBtn.classList.remove('menu-btn-wrapper-clicked')
            nextBtn.classList.add('menu-btn-wrapper-clicked')
            
            moveToNextPage(nextBtn)
        // 다음 페이지로 넘어감
        } else {
            // 페이지 세팅
            menuCurrentPage += 1;
            thisBtn.firstElementChild.children[1].innerText = `${menuCurrentPage} / ${menuLastpage}`   
            thisBtn.children[1].remove();

            // fillBackground를 지웠다가 다시 생성
            const fillBackground = document.createElement('div');
            fillBackground.classList.add('fill-background');
            thisBtn.appendChild(fillBackground);

            moveToNextPage(thisBtn)
        }
        insertContent(nowMenuIdx, menuCurrentPage, menuLastpage)
    }, 1000 * 20)
}

const articleMenuWrapper = document.querySelectorAll('.menu-btn-wrapper');
const setDataWithTab = (btnWrapper, idx) => {
    nowMenuIdx = idx;
    menuCurrentPage = 1;
    menuLastpage = menuInfo[nowMenuIdx].totalPages
    
    // 클릭 시 초기 정보 삽입
    insertContent(nowMenuIdx, menuCurrentPage, menuLastpage)
    
    // 클릭 시 모든 탭들의 페이지 정보 초기화
    document.querySelectorAll('.menu-btn-wrapper').forEach((btnWrapper, idx) => {
        btnWrapper.children[0].children[1].innerText = `${menuCurrentPage} / ${menuInfo[idx].totalPages}`
    })

    // timeout 초기화
    clearTimeout(categoryTimeoutId);
    
    // 클릭한 버튼에만 클래스 부여
    const articleMenuWrapper = document.querySelectorAll('.menu-btn-wrapper');
    articleMenuWrapper.forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    btnWrapper.classList.add('menu-btn-wrapper-clicked');

    moveToNextPage(btnWrapper)
}

articleMenuWrapper.forEach((btnWrapper, idx) => {
    btnWrapper.addEventListener('click', function() {
        // 초기 페이지 세팅

        nowMenuIdx = idx;
        menuCurrentPage = 1;
        menuLastpage = menuInfo[nowMenuIdx].totalPages
        
        // 클릭 시 초기 정보 삽입
        btnWrapper.children[0].children[1].innerText = `1 / ${menuLastpage}`
        insertContent(nowMenuIdx, menuCurrentPage, menuLastpage)
        
        // 클릭 시 모든 탭들의 페이지 정보 초기화
        articleMenuWrapper.forEach((btnWrapper, idx) => {
            btnWrapper.children[0].children[1].innerText = `${menuCurrentPage} / ${menuInfo[idx].totalPages}`
        })
        
        // timeout 초기화
        clearTimeout(categoryTimeoutId);
        
        // 클릭한 버튼에만 클래스 부여
        articleMenuWrapper.forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
        this.classList.add('menu-btn-wrapper-clicked');
        
        moveToNextPage(btnWrapper)
    });
});

// 렌더링 시 초기 상태
setDataWithTab(document.querySelectorAll('.menu-btn-wrapper')[0], 0)