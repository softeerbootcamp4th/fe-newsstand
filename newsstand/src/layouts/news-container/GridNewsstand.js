import NewsBox from '../../components/news/NewsBox.js'
import createComponent from '../../core/component/component.js'
import IconView, { Icon } from '../../components/base/IconView.js'
import useState from '../../core/hooks/useState.js'
import { wholeCompanyData } from '../../datas/companyData.js'
import { fetchMaxPageNumber } from '../../api/companyApis.js'
import { fetchCompanyDataByPage } from '../../api/companyApis.js'
import { getSubscribedCompanies, getSubscribedCompaniesId } from '../../utils/subscribeUtils.js'
import useEffect from '../../core/hooks/useEffect.js'

const GridNewsstand = (props) => {
    const [page, setPage] = useState({ stateId: 1, initialValue: 1 })
    const [maxPage, setMaxPage] = useState({ stateId: 2, initialValue: 0 })
    const [companyData, setCompanyData] = useState({ stateId: 3, initialValue: [] })
    const [subscribedCompanyIdList, setSubscribedCompanyIdList] = useState({ stateId: 2, initialValue: [] })

    const initCompanyData = () => {
        if (props.viewType.value === 'list') return
        if (props.selectedSource.value === '전체 언론사') initWholeCompaniesData()
        else initSubscribedCompaniesData()
    }

    const initWholeCompaniesData = () => {
        fetchCompanyDataByPage(page.value).then((res) => {
            setCompanyData(res)

            fetchMaxPageNumber().then((res) => {
                setMaxPage(res.maxPage)
            })
        })
    }

    const initSubscribedCompaniesData = () => {
        getSubscribedCompanies(wholeCompanyData)
            .then((res) => {
                setCompanyData(res)
                return res
            })
            .then((res) => {
                setMaxPage(Math.ceil(res.length / 24)) // todo magicNumber -> constant
            })

        getSubscribedCompaniesId().then((idList) => {
            setSubscribedCompanyIdList(idList)
        })
    }

    useEffect(() => initCompanyData(), [props.viewType, props.selectedSource, page], 1)

    const newsBoxes = companyData.value.map((news, index) => {
        return createComponent(NewsBox, {
            id: `${props.viewType.value}-${index}`,
            news: news,
            setIsShowAlert: props.setIsShowAlert,
            setCurrentCompanyInfo: props.setCurrentCompanyInfo,
            setSelectedCategory: props.setSelectedCategory,
            setSelectedSource: props.setSelectedSource,
            setViewType: props.setViewType,
            style: 'width: 100%; height:100%;',
        })
    })

    const leftButtonIcon = createComponent(IconView, {
        id: 'grid-left-btn-1',
        icon: Icon.LEFT_BUTTON,
    })

    const rightButtonIcon = createComponent(IconView, {
        id: 'grid-right-btn-1',
        icon: Icon.RIGHT_BUTTON,
    })

    const handleRightButtonClick = () => {
        if (page.value < maxPage.value) setPage(page.value + 1)
    }

    const handleLeftButtonClick = () => {
        if (page.value > 1) setPage(page.value - 1)
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

    return {
        element: `
        <div class="carousel-container">
            <button class="carousel-btn left-btn">
                ${page.value > 1 ? leftButtonIcon.element : ''}
            </button>
            <div class="grid-news-container">
                ${newsBoxes.map((box) => box.element).join('')}
            </div>
            <button class="carousel-btn right-btn">
                ${page.value < maxPage.value ? rightButtonIcon.element : ''}
            </button>
        </div>
        `,
        bindEvents,
        removeEvents,
    }
}

export default GridNewsstand
