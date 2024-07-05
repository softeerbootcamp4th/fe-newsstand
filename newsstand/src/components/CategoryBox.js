import { mediaCategoryData, getCompanyCount } from '../datas/mockData.js'
import { isIn } from '../utils/listUtils.js'
let intervalId = null

const CategoryBox = (props) => {
    const companyCount = isIn(props.text, mediaCategoryData) ? getCompanyCount(props.text) : 0
    const countText = `${props.currentNewsId}/${companyCount}`

    const handleMouseClick = () => {
        props.setState(props.text)
        props.setCurrentNewsId(1)
    }

    const bindEvents = () => {
        const button = document.getElementById(`category-text-${props.id}`)
        button.addEventListener('click', handleMouseClick)
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

    if (props.state === props.text) {
        clearIntervalForce()
        setTimeout(fillGauge, 0)
    } else {
        clearIntervalForce()
    }

    return {
        element: `
            <div class="category-box-wrap"
                style="background-color: ${props.state === props.text ? '#7890E7' : 'transparent'};"
            >
                <div class="category-box-fill" id="category-fill-${props.id}"></div>
                <li class="category-text" id="category-text-${props.id}"
                    style="font-weight: ${props.state === props.text ? 'bold' : 400};
                    color: ${props.state === props.text ? 'white' : 'black'};"
                >
                    ${props.text} 
                    <span style="font-size: 14px; padding-left: 12px">
                        ${companyCount > 0 && props.state === props.text ? countText : ''}
                    </span>
                </li>
            </div>
        `,
        bindEvents,
    }
}

export default CategoryBox
