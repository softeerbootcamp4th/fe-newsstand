import { getTodayString } from '../../utils/dateUtils.js'

const Header = () => {
    let todayString = getTodayString()

    document.addEventListener('DOMContentLoaded', () => {
        const mainLogo = document.getElementById('main-logo')
        mainLogo.addEventListener('click', () => {
            window.location.reload()
        })
    })

    return {
        element: `
        <div class="header-container">
            <div class="main-logo" id="main-logo">
                <img src='./assets/newsstand_ico.svg' style="height: 24px; margin-right: 8px;"/>
                <span>뉴스스탠드</span>
            </div>
            <div style="font-size: 16px; color: var(--gray200);">${todayString}</div>
        </div>
        `,
    }
}

export default Header
