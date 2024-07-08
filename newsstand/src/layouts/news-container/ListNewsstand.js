import IconView, { Icon } from '../../components/base/IconView.js'
import MainNews from '../../components/news/MainNews.js'
import MediaCategories from '../../components/category/MediaCategories.js'
import createComponent from '../../core/component/component.js'
import useState from '../../core/hooks/useState.js'
import { isIn } from '../../utils/listUtils.js'
import { mediaCategoryData, getNewsData, getCompanyCount, getNewsDataFromSubscribedCompany } from '../../datas/mockData.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import { getPrevIndexInList, getNextIndexInList } from '../../utils/listUtils.js'
import { getSubscribedCompaniesId } from '../../utils/subscribeUtils.js'
import { getCompanyName, getCompanyIdByName } from '../../datas/companyData.js'

const ListNewsstand = (props) => {
    const [currentNewsId, setCurrentNewsId] = useState(1)
    const lastIndex = 6
    const lastCategoryCompanyCount = getCompanyCount(mediaCategoryData[lastIndex])
    let newsData = []
    let subscribedCompanyIdList = getSubscribedCompaniesId()

    if (props.selectedSource === '전체 언론사') {
        let category = props.selectedCategory
        if (!isIn(category, mediaCategoryData)) {
            category = '종합/경제'
            setCurrentNewsId(1)
        }
        newsData = getNewsData(category, currentNewsId)
    } else {
        let category = props.selectedCategory
        if (isIn(category, mediaCategoryData)) {
            category = getCompanyName(subscribedCompanyIdList[0])
        }

        newsData = getNewsDataFromSubscribedCompany(subscribedCompanyIdList, category)
    }

    const handleRightButtonClick = () => {
        if (props.selectedSource === '전체 언론사') {
            const currentCategoryCompanyCount = getCompanyCount(props.selectedCategory)

            if (currentNewsId === currentCategoryCompanyCount) {
                setCurrentNewsId(1)

                const nextIndex = getNextIndexInList(props.selectedCategory, mediaCategoryData)
                const nextCategory = mediaCategoryData[nextIndex]

                props.setSelectedCategory(nextCategory)
            } else {
                setCurrentNewsId(currentNewsId + 1)
            }
        } else {
            const nextIndex = getNextIndexInList(getCompanyIdByName(props.selectedCategory), subscribedCompanyIdList)
            const nextCategory = subscribedCompanyIdList[nextIndex]
            props.setSelectedCategory(getCompanyName(nextCategory))
        }
    }

    const handleLeftButtonClick = () => {
        if (props.selectedSource === '전체 언론사') {
            if (currentNewsId === 1) {
                const prevIndex = getPrevIndexInList(props.selectedCategory, mediaCategoryData)
                const prevCategory = mediaCategoryData[prevIndex]

                props.setSelectedCategory(prevCategory)

                const prevCategoryCompanyCount = getCompanyCount(prevCategory)
                setCurrentNewsId(prevCategoryCompanyCount)
            } else {
                setCurrentNewsId(currentNewsId - 1)
            }
        } else {
            const prevIndex = getPrevIndexInList(getCompanyIdByName(props.selectedCategory), subscribedCompanyIdList)
            const prevCategory = subscribedCompanyIdList[prevIndex]
            props.setSelectedCategory(getCompanyName(prevCategory))
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
        selectedSource: props.selectedSource,
        selectedCategory: props.selectedCategory,
        setSelectedCategory: props.setSelectedCategory,
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

    const newsListElements = newsData && newsData.news.map((newsItem) => `<a class="news-content">${newsItem.title}</a>`).join('')

    return {
        element: `
        <div class="carousel-container">
            <button class="carousel-btn left-btn">
                ${currentNewsId === 1 && props.selectedCategory === mediaCategoryData[0] ? '' : leftButtonIcon.element}
            </button>
            <div class="list-news-container">
                ${mediaCategories.element}
                <div class="list-news-body">
                    ${mainNewsComponent.element}
                    ${newsListElements ? `<div class="list-news-right-container">${newsListElements}</div>` : ''}
                </div>
            </div>
            <button class="carousel-btn right-btn">
                ${currentNewsId === lastCategoryCompanyCount && props.selectedCategory === mediaCategoryData[lastIndex] ? '' : rightButtonIcon.element}
            </button>
        </div>
        `,
        bindEvents,
    }
}

export default ListNewsstand
