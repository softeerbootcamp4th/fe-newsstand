import useState from '../core/hooks/useState.js'
import { mediaCategoryData } from '../datas/mockData.js'
import { getCompanyCount } from '../datas/mockData.js'
import { isIn } from '../utils/listUtils.js'

const CategoryBox = (props) => {
    const [isHover, setIsHover] = useState(false)

    let companyCount = 0
    if (isIn(props.text, mediaCategoryData)) {
        companyCount = getCompanyCount(props.text)
    }

    let countText = `${props.currentNewsId}/${companyCount}`

    const handleMouseOver = () => {
        setIsHover(true)
    }

    const handleMouseOut = () => {
        setIsHover(false)
    }

    const handleMouseClick = () => {
        props.setState(props.text)
        props.setCurrentNewsId(1)
    }

    const bindEvents = () => {
        const button = document.getElementById(`category-text-${props.id}`)
        button.addEventListener('mouseover', handleMouseOver)
        button.addEventListener('mouseout', handleMouseOut)
        button.addEventListener('click', handleMouseClick)
    }

    const fillGauge = () => {
        const fill = document.getElementById(`category-fill-${props.id}`)
        if (fill) {
            let width = 0
            const interval = setInterval(() => {
                if (width >= 110) {
                    clearInterval(interval)
                    if (props.onFillComplete) {
                        props.onFillComplete()
                    }
                } else {
                    width++
                    fill.style.width = width + '%'
                }
            }, 190)
        }
    }

    if (props.state === props.text) {
        setTimeout(fillGauge, 0)
    }

    return {
        element: `
        <div class="category-box-wrap"
            style="background-color: ${props.state === props.text ? '#7890E7' : 'transparent'};"
        >
            <div class="category-box-fill" id="category-fill-${props.id}"></div>
            <li class="category-text" id="category-text-${props.id}"
                style="font-weight: ${isHover || props.state === props.text ? 'bold' : 400};
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
