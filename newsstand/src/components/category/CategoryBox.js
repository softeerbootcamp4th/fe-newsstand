import useEffect from '../../core/hooks/useEffect.js'
import { mediaCategoryData, getCompanyCount } from '../../datas/mockData.js'
import { isIn } from '../../utils/listUtils.js'
let intervalId = null

const CategoryBox = (props) => {
    const companyCount = isIn(props.text, mediaCategoryData) ? getCompanyCount(props.text) : 1
    const countText = props.selectedSource.value === '전체 언론사' ? `${props.currentNewsId.value}/${companyCount}` : `>`

    const moveAutoScroll = () => {
        const element = document.getElementById(`category-text-${props.id}`)
        if (!element) return

        const rect = element.getBoundingClientRect()

        const parentElement = document.querySelector('.list-news-header')
        if (parentElement) {
            const parentRect = parentElement.getBoundingClientRect()
            const scrollLeft = parentElement.scrollLeft + rect.left - parentRect.left - parentElement.clientWidth + rect.width
            parentElement.scrollBy(scrollLeft, 0, 'smooth')
        }
    }
    useEffect(
        () => {
            if (props.state.value === props.text) setTimeout(() => moveAutoScroll(), 60)
        },
        [props.state],
        1,
    )

    const handleMouseClick = () => {
        props.setState(props.text)
        props.setCurrentNewsId(1)
    }

    const bindEvents = () => {
        const button = document.getElementById(`category-text-${props.id}`)
        button.addEventListener('click', handleMouseClick)
    }

    const removeEvents = () => {
        const button = document.getElementById(`category-text-${props.id}`)
        button.removeEventListener('click', handleMouseClick)
    }

    const fillGauge = () => {
        clearInterval(intervalId)
        const fill = document.getElementById(`category-fill-${props.id}`)
        if (fill) {
            let width = 0
            intervalId = setInterval(() => {
                if (width > 100) {
                    clearInterval(intervalId)
                    if (props.onFillComplete) {
                        props.onFillComplete()
                    }
                } else {
                    width += 2
                    fill.style.width = width + '%'
                }
            }, 400)
        }
    }

    const clearIntervalForce = () => {
        clearInterval(intervalId)
        intervalId = null
    }

    if (props.state.value === props.text) {
        clearIntervalForce()
        setTimeout(fillGauge, 0)
    } else {
        clearIntervalForce()
    }
    return {
        element: `
            <div class="category-box-wrap id="category-box-wrap-${props.id}"
                style="background-color: ${props.state.value === props.text ? '#7890E7' : 'transparent'};"
            >
                <div class="category-box-fill" id="category-fill-${props.id}"></div>
                <li class="category-text-wrap" id="category-text-${props.id}"
                    style="font-weight: ${props.state.value === props.text ? 'bold' : 400};
                    color: ${props.state.value === props.text ? 'white' : 'black'};"
                >
                    <span class="category-text">
                        ${props.text} 
                    </span>
                    <span class="category-count-text">
                        ${companyCount > 0 && props.state.value === props.text ? countText : ''}
                    </span>
                </li>
            </div>
        `,
        bindEvents,
        removeEvents,
    }
}

export default CategoryBox
