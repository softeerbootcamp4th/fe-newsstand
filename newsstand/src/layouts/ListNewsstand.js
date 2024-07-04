import Button, { ButtonVariantProps } from '../components/base/Button.js'
import IconView, { Icon } from '../components/base/IconView.js'
import createComponent from '../core/component/component.js'
import ImageView from '../components/base/ImageView.js'
import MediaCategories from './MediaCategories.js'
import { mediaCategoryData, getNewsData, getCompanyCount } from '../datas/mockData.js'
import { generateRandomId } from '../utils/idGenerator.js'
import useState from '../core/hooks/useState.js'
import { getPrevIndexInList, getNextIndexInList } from '../utils/listUtils.js'

const ListNewsstand = () => {
    const [selectedCategory, setSelectedCategory] = useState(mediaCategoryData[0])
    const [currentNewsId, setCurrentNewsId] = useState(1)
    const newsData = getNewsData(selectedCategory, currentNewsId)

    const mediaCategories = createComponent(MediaCategories, {
        id: generateRandomId(10),
        style: 'width:100%; height:10%;',
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        currentNewsId: currentNewsId,
        setCurrentNewsId: setCurrentNewsId,
    })

    const companyIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: newsData.companyLogo || '',
    })

    const subscribeButton = createComponent(Button, {
        id: generateRandomId(10),
        icon: Icon.PLUS,
        text: '구독하기',
        style: 'height:10px;',
        variant: ButtonVariantProps.WHITE,
    })

    const ImageComponent = createComponent(ImageView, {
        id: generateRandomId(10),
        src: newsData.mainNews.src,
        style: 'width: 100%; height:100%',
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

    const newsListElements = newsData.news
        .map(
            (newsItem) => `
        <a class="news-content">${newsItem.title}</a>
    `,
        )
        .join('')

    return {
        element: `
        <div class="carousel-container">
            <button class="carousel-btn left-btn">
                ${leftButtonIcon.element}
            </button>
            <div class="list-news-container">
                ${mediaCategories.element}
                <div class="list-news-body">
                    <div class="list-news-left-container">
                        <div class="list-news-left-top">
                            ${companyIcon.element}
                            <h5>
                                ${newsData.updatedDate}
                            </h5>
                            ${subscribeButton.element}
                        </div>
                        <div class="list-news-left-body">
                            ${ImageComponent.element}
                        </div>
                        <div class="list-news-left-bottom">
                            <h4 class="news-content">
                                ${newsData.mainNews.title}
                            </h4>
                        </div>
                    </div>
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
