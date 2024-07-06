import IconView, { Icon } from '../../components/base/IconView.js'
import createComponent from '../../core/component/component.js'
import MediaCategories from './MediaCategories.js'
import { mediaCategoryData, getNewsData, getCompanyCount } from '../../datas/mockData.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import useState from '../../core/hooks/useState.js'
import { getPrevIndexInList, getNextIndexInList } from '../../utils/listUtils.js'
import MainNews from '../../components/MainNews.js'

const ListNewsstand = () => {
    const [selectedCategory, setSelectedCategory] = useState(mediaCategoryData[0])
    const [currentNewsId, setCurrentNewsId] = useState(1)

    const newsData = getNewsData(selectedCategory, currentNewsId)

    const handleRightButtonClick = () => {
        const currentCategoryCompanyCount = getCompanyCount(selectedCategory)

        if (currentNewsId === currentCategoryCompanyCount) {
            setCurrentNewsId(1)

            const nextIndex = getNextIndexInList(selectedCategory, mediaCategoryData)
            const nextCategory = mediaCategoryData[nextIndex]

            setSelectedCategory(nextCategory)
        } else {
            setCurrentNewsId(currentNewsId + 1)
        }
    }

    const handleLeftButtonClick = () => {
        if (currentNewsId === 1) {
            const prevIndex = getPrevIndexInList(selectedCategory, mediaCategoryData)
            const prevCategory = mediaCategoryData[prevIndex]

            setSelectedCategory(prevCategory)

            const prevCategoryCompanyCount = getCompanyCount(prevCategory)
            setCurrentNewsId(prevCategoryCompanyCount)
        } else {
            setCurrentNewsId(currentNewsId - 1)
        }
    }

    const bindEvents = () => {
        const leftBtn = document.querySelector('.left-btn')
        const rightBtn = document.querySelector('.right-btn')

        leftBtn.addEventListener('click', handleLeftButtonClick)
        rightBtn.addEventListener('click', handleRightButtonClick)
    }

    const mediaCategories = createComponent(MediaCategories, {
        id: generateRandomId(10),
        style: 'width:100%; height:10%;',
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        currentNewsId: currentNewsId,
        setCurrentNewsId: setCurrentNewsId,
        onFillComplete: handleRightButtonClick,
    })

    const mainNewsComponent = createComponent(MainNews, {
        id: generateRandomId(10),
        newsData: newsData,
        style: 'width:40%; padding:2%;',
    })

    const leftButtonIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: Icon.LEFT_BUTTON,
        color: 'red',
    })

    const rightButtonIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: Icon.RIGHT_BUTTON,
        color: 'blue',
    })

    const newsListElements = newsData.news.map((newsItem) => `<a class="news-content">${newsItem.title}</a>`).join('')

    return {
        element: `
        <div class="carousel-container">
            <button class="carousel-btn left-btn">
                ${leftButtonIcon.element}
            </button>
            <div class="list-news-container">
                ${mediaCategories.element}
                <div class="list-news-body">
                    ${mainNewsComponent.element}
                    <div class="list-news-right-container">
                        ${newsListElements}
                    </div>
                </div>
            </div>
            <button class="carousel-btn right-btn">
                ${rightButtonIcon.element}
            </button>
        </div>
        `,
        bindEvents,
    }
}

export default ListNewsstand
