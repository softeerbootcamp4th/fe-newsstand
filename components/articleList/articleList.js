const articleArea = document.querySelector('#article-list-area');


// 내용
const menuList = ['종합/경제', '방송/통신', 'IT', '영자지', '스포츠/연예', '매거진/전문지', '지역']
const mediaName = '서울경제'
const updateDate = '2023.02.10. 18:27'
const thumbnailDetail = '또 국민연금의 몽니..현대차 지주사 불발'
const thumbnailPath = '/icons/newspaper.png'
const mediaImgPath = '/images/asset 35 1.png'
const articleData = [
    '11111111', '2222222', '3333333', '444444', '55555555', '66666666'
]
const infoMsg = `${mediaName} 언론사에서 직접 편집한 뉴스입니다.`

// create 태그
const createMenuList = (menuList) => {
    return menuList.map((menuItem) => `
        <p class="article-menu-item">${menuItem}</p>
    `).join('');
}

const createArticleLiPart = (articleData) => {
    return articleData.map((articleItem) => `
        <li>${articleItem}</li>
    `).join('')
}

articleArea.innerHTML = `
    <div id="articleList-wrapper">
        <div id="article-header-wrapper" class="flex-row-between">
            <div id="media-wrapper inline-tag">
                <button class="btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                <button class="btn mode-selection-btn">내가 구독한 언론사</button>
            </div>
            <div id="icon-wrapper inline-tag flex-row-between">
                <button class="btn view-btn">
                    <img src="/icons/list-view.png" alt="" width="24px" height="24px">
                </button>
                <button class="btn view-btn">
                    <img src="/icons/grid-view.png" alt="" width="24px" height="24px">
                </button>
            </div>
        </div>
        <div id="article-menu-wrapper">
            ${createMenuList(menuList)}
        </div>
        <div id="article-wrapper">
            <div id="article-selection-wrapper">
            </div>
            <div id="article-content-wrapper">
                <div id="content-header-wrapper" class="flex-row">
                    <img src="${mediaImgPath}" alt="">
                    <h4 style="font-size: 12px; font-weight: 400;">${updateDate} 편집</h4>
                    <button id="subscribe-btn" class="btn">+ 구독하기</button>
                </div>
                <div id="content-body-wrapper" class="flex-row-between">
                    <aside id="thumbnail-part">
                        <img src="${thumbnailPath}" alt="" width="320px" height="200px">
                        <p>ABC</p>
                    </aside>
                    <ul id="article-li-part" class="flex-col-between">
                        ${createArticleLiPart(articleData)}
                        <p>${infoMsg}</p>
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