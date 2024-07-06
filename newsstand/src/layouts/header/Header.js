import { getTodayString } from '../../utils/dateUtils.js'

const Header = () => {
    let todayString = getTodayString()

    return {
        element: `
        <div class="header-container">
            <div style="display: flex; align-items: center;">
                <img src='./assets/newsstand_ico.svg' style="height: 24px; margin-right: 8px;"/>
                <span style="font-size: 18px;">뉴스스탠드</span>
            </div>
            <div style="font-size: 16px; color: gray;">${todayString}</div>
        </div>
        `,
    }
}

export default Header
