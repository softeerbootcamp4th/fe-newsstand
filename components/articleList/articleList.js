const articleMenuWrapper = document.getElementById('article-menu-wrapper')
const menuList = ['종합/경제', '방송/통신', 'IT', '영자지', '스포츠/연예', '매거진/전문지', '지역']

menuList.forEach((menuItem) => {
    const menuItemElement = document.createElement('h2')
    menuItemElement.classList.add('inline-tag')
    menuItemElement.style.padding = '16px'
    menuItemElement.style.fontWeight = '400'
    menuItemElement.innerHTML = `
      ${menuItem}
    `;
    articleMenuWrapper.appendChild(menuItemElement);
});

// 내용 추가

const mediaName = '서울경제'
const updateDate = '2023.02.10. 18:27'
const thumbnailDetail = '또 국민연금의 몽니..현대차 지주사 불발'
const thumbnailPath = '/icons/newspaper.png'
const mediaImgPath = '/images/asset 35 1.png'
const articleData = [
    '11111111', '2222222', '3333333', '444444', '55555555', '66666666'
]

const infoMsg = `${mediaName} 언론사에서 직접 편집한 뉴스입니다.`

// content header
const contentHeader = document.querySelector('#content-header-wrapper');

contentHeader.innerHTML = `
    <img src="${mediaImgPath}" alt="">
    <h4 class="inline-tag" style="margin: 0px 8px; font-size: 12px; font-weight: 400;">${updateDate} 편집</h4>
    <button id="subscribe-btn" class="btn">+ 구독하기</button>
`

// thumbnail part
const thumbnailPart = document.querySelector('#thumbnail-part')

thumbnailPart.innerHTML = `
    <img src="${thumbnailPath}" alt="" width="320px" height="200px">
    <p>ABC</p>
`

// article li
const articleLiPart = document.querySelector('#article-li-part')
articleData.forEach((articleItem) => {
    const menuItemElement = document.createElement('li')
    // menuItemElement.style.padding = '16px'
    // menuItemElement.style.fontWeight = '400'
    menuItemElement.innerHTML = `
      ${articleItem}
    `;
    articleLiPart.appendChild(menuItemElement);
});
const infoElement = document.createElement('p')
infoElement.innerText = infoMsg
articleLiPart.appendChild(infoElement);