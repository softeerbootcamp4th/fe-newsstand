const Header = () => {
    const date = new Date()
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const dayName = days[date.getDay()]

    return {
        element: `
        <div class="header-container">
            <div style="display: flex; align-items: center;">
                <img src='./assets/newsstand_ico.svg' style="height: 24px; margin-right: 8px;"/>
                <span style="font-size: 18px;">뉴스스탠드</span>
            </div>
            <div style="font-size: 16px; color: gray;">${year}.${month}.${day} ${dayName}</div>
        </div>
        `,
    }
}

export default Header
