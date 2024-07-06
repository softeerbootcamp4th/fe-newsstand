import NewsBox from '../../components/news/NewsBox.js'
import createComponent from '../../core/component/component.js'
import IconView, { Icon } from '../../components/base/IconView.js'
import { getCompanyDataByPage, getMaxPage } from '../../datas/companyData.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import useState from '../../core/hooks/useState.js'

const GridNewsstand = () => {
    const [page, setPage] = useState(1)
    const maxPage = getMaxPage()
    let companyData = getCompanyDataByPage(page)

    const newsBoxes = companyData.map((news) => {
        return createComponent(NewsBox, {
            id: news.id,
            name: news.name,
            icon: news.logo,
            style: 'width: 100%; height:100%;',
        })
    })

    const leftButtonIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: Icon.LEFT_BUTTON,
    })

    const rightButtonIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: Icon.RIGHT_BUTTON,
    })

    const handleRightButtonClick = () => {
        if (page < maxPage) setPage(page + 1)
    }

    const handleLeftButtonClick = () => {
        if (page > 1) setPage(page - 1)
    }

    const bindEvents = () => {
        const leftBtn = document.querySelector('.left-btn')
        const rightBtn = document.querySelector('.right-btn')

        leftBtn.addEventListener('click', handleLeftButtonClick)
        rightBtn.addEventListener('click', handleRightButtonClick)
    }

    return {
        element: `
        <div class="carousel-container">
            <button class="carousel-btn left-btn">
                ${page > 1 ? leftButtonIcon.element : ''}
            </button>
            <div class="grid-news-container">
                ${newsBoxes.map((box) => box.element).join('')}
            </div>
            <button class="carousel-btn right-btn">
                ${page < maxPage ? rightButtonIcon.element : ''}
            </button>
        </div>
        `,
        bindEvents,
    }
}

export default GridNewsstand
