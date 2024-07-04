const headerArea = document.querySelector('#header-area');

const nowDate = new Date();
const nowDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][nowDate.getDay()]
const dateText = `${nowDate.getFullYear()}.${nowDate.getMonth()+1}.${nowDate.getDate()}.${nowDay}`

headerArea.innerHTML = `
    <div id="header-wrapper" class="flex-row-between">
        <div id="title-wrapper" class="flex-row-between">
            <img id="news-paper" src="/icons/newspaper.png" width="24px" height="24px">
            <h3 id="title-text">
                뉴스 스탠드
            </h3>
        </div>
        <h3 id="date-text" class="inline-tag">
            ${dateText}
        </h3>
    </div>
`