const headerArea = document.querySelector('#header-area');

headerArea.innerHTML = `
    <div id="header-wrapper" class="flex-row-between">
        <div id="title-wrapper" class="inline-tag">
            <img id="news-paper" src="/icons/newspaper.png" alt="A" width="24px" height="24px">
            <h3 id="title-text" class="inline-tag">
                뉴스 스탠드
            </h3>
        </div>
        <h3 id="date-text" class="inline-tag">
        </h3>
    </div>
`

const nowDate = new Date();
const nowDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][nowDate.getDay()]
const dateText = `${nowDate.getFullYear()}.${nowDate.getMonth()+1}.${nowDate.getDate()}.${nowDay}`

document.querySelector('#date-text').textContent = dateText