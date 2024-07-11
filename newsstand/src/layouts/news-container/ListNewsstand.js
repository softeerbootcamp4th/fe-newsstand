import IconView, { Icon } from '../../components/base/IconView.js'
import MainNews from '../../components/news/MainNews.js'
import MediaCategories from '../../components/category/MediaCategories.js'
import createComponent from '../../core/component/component.js'
import useState from '../../core/hooks/useState.js'
import useEffect from '../../core/hooks/useEffect.js'
import { isIn, getPrevIndexInList, getNextIndexInList } from '../../utils/listUtils.js'
import { getSubscribedCompaniesId } from '../../utils/subscribeUtils.js'
import { mediaCategoryData, getCompanyCount } from '../../datas/mockData.js'
import { getCompanyName, getCompanyIdByName } from '../../datas/companyData.js'
import { fetchNewsData, fetchNewsDataFromSubscribedCompany } from '../../api/newsApi.js'

const ListNewsstand = (props) => {
    const [currentNewsId, setCurrentNewsId] = useState({ stateId: 1, initialValue: 1 })
    const [newsData, setNewsData] = useState({ stateId: 2, initialValue: { news: [] } })
    const [subNewsListElements, setSubNewsListElements] = useState({ stateId: 3, initialValue: [] })

    const lastIndex = 6
    const lastCompanyCount = 10

    const initNewsData = () => {
        if (props.viewType.value === 'grid') return
        if (props.selectedSource.value === '전체 언론사') initWholeNewsData()
        else initSubscribedCopaniesNewsData()
    }

    const initWholeNewsData = () => {
        let category = props.selectedCategory.value
        if (!isIn(category, mediaCategoryData)) {
            category = '종합/경제'
            setCurrentNewsId(1)
        }
        fetchNewsData(category, currentNewsId.value).then((res) => {
            setNewsData(res)
        })
    }

    const initSubscribedCopaniesNewsData = () => {
        let category = props.selectedCategory.value

        getSubscribedCompaniesId()
            .then((idList) => {
                props.setSubscribedCompanyIdList(idList)
                return idList
            })
            .then((idList) => {
                if (isIn(category, mediaCategoryData)) {
                    category = getCompanyName(idList[0])
                    props.setSelectedCategory(category)
                }

                if (!category) return

                fetchNewsDataFromSubscribedCompany(idList, category).then((res) => {
                    setNewsData(res)
                })
            })
    }

    const fetchSubNewsList = async () => {
        if (newsData.value.news && newsData.value.news.length > 0) {
            let newsListElements = newsData.value.news.map((newsItem) => `<a class="news-content">${newsItem.title}</a>`).join('')
            return newsListElements
        }
        return ''
    }

    useEffect(
        () => {
            initNewsData()
        },
        [props.selectedCategory, props.selectedSource, props.viewType, currentNewsId, props.subscribedCompanyIdList, props.isShowAlert],
        0,
    )

    useEffect(
        () => {
            fetchSubNewsList().then((res) => {
                setSubNewsListElements(res)
            })
            props.setCurrentCompanyInfo({ id: newsData.value.companyId, name: newsData.value.companyName })
        },
        [newsData],
        1,
    )

    const handleRightButtonClick = () => {
        if (props.selectedSource.value === '전체 언론사') {
            const currentCategoryCompanyCount = getCompanyCount(props.selectedCategory.value)

            if (currentNewsId.value === currentCategoryCompanyCount) {
                setCurrentNewsId(1)

                const nextIndex = getNextIndexInList(props.selectedCategory.value, mediaCategoryData)
                const nextCategory = mediaCategoryData[nextIndex]

                props.setSelectedCategory(nextCategory)
            } else {
                setCurrentNewsId(currentNewsId.value + 1)
            }
        } else {
            const nextIndex = getNextIndexInList(getCompanyIdByName(props.selectedCategory.value), props.subscribedCompanyIdList.value)
            const nextCategory = props.subscribedCompanyIdList.value[nextIndex]

            props.setSelectedCategory(getCompanyName(nextCategory))
        }
    }

    const handleLeftButtonClick = () => {
        if (props.selectedSource.value === '전체 언론사') {
            if (currentNewsId.value === 1) {
                const prevIndex = getPrevIndexInList(props.selectedCategory.value, mediaCategoryData)
                const prevCategory = mediaCategoryData[prevIndex]

                props.setSelectedCategory(prevCategory)

                const prevCategoryCompanyCount = getCompanyCount(prevCategory)
                setCurrentNewsId(prevCategoryCompanyCount)
            } else {
                setCurrentNewsId(currentNewsId.value - 1)
            }
        } else {
            const prevIndex = getPrevIndexInList(getCompanyIdByName(props.selectedCategory.value), props.subscribedCompanyIdList.value)
            const prevCategory = props.subscribedCompanyIdList.value[prevIndex]
            props.setSelectedCategory(getCompanyName(prevCategory))
        }
    }

    const bindEvents = () => {
        const leftBtn = document.querySelector('.left-btn')
        const rightBtn = document.querySelector('.right-btn')
        leftBtn.addEventListener('click', handleLeftButtonClick)
        rightBtn.addEventListener('click', handleRightButtonClick)
    }

    const removeEvents = () => {
        const leftBtn = document.querySelector('.left-btn')
        const rightBtn = document.querySelector('.right-btn')
        leftBtn.removeEventListener('click', handleLeftButtonClick)
        rightBtn.removeEventListener('click', handleRightButtonClick)
    }

    const mediaCategories = createComponent(MediaCategories, {
        id: 1,
        style: 'width:100%; height:10%;',
        selectedSource: props.selectedSource,
        selectedCategory: props.selectedCategory,
        setSelectedCategory: props.setSelectedCategory,
        currentNewsId: currentNewsId,
        setCurrentNewsId: setCurrentNewsId,
        subscribedCompanyIdList: props.subscribedCompanyIdList,
        onFillComplete: handleRightButtonClick,
    })

    let mainNewsComponent = createComponent(MainNews, {
        id: 1,
        newsData: newsData,
        selectedSource: props.selectedSource,
        selectedCategory: props.selectedCategory,
        setIsShowAlert: props.setIsShowAlert,
        setSelectedCategory: props.setSelectedCategory,
        setSelectedSource: props.setSelectedSource,
        setViewType: props.setViewType,
        isShowAlert: props.isShowAlert,
        style: 'width:40%; padding:2%;',
    })

    const leftButtonIcon = createComponent(IconView, {
        id: 'list-left-btn-1',
        icon: Icon.LEFT_BUTTON,
    })

    const rightButtonIcon = createComponent(IconView, {
        id: 'list-right-btn-1',
        icon: Icon.RIGHT_BUTTON,
    })

    return {
        element: `
        <div class="carousel-container">
            <button class="carousel-btn left-btn">
                ${currentNewsId.value === 1 && props.selectedCategory.value === mediaCategoryData[0] ? '' : leftButtonIcon.element}
            </button>
            <div class="list-news-container">
                ${mediaCategories.element}
                <div class="list-news-body">
                    ${mainNewsComponent.element}
                    <div class="list-news-right-container">
                        ${props.selectedCategory.value ? subNewsListElements.value : ''} 
                    </div>
                </div>
            </div>
            <button class="carousel-btn right-btn">
                ${currentNewsId.value === lastCompanyCount && props.selectedCategory.value === mediaCategoryData[lastIndex] ? '' : rightButtonIcon.element}
            </button>
        </div>
        `,
        bindEvents,
        removeEvents,
    }
}

export default ListNewsstand
