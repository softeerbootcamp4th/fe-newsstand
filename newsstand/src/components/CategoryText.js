import useState from '../core/hooks/useState.js'
import { mediaCategoryData } from '../datas/mockData.js'
import { getCompanyCount } from '../datas/mockData.js'
import { isIn } from '../utils/listUtils.js'

const CategoryText = (props) => {
    const [isHover, setIsHover] = useState(false)

    let companyCount = 0
    if (isIn(props.text, mediaCategoryData)) {
        companyCount = getCompanyCount(props.text)
    }

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

    return {
        element: `
        <li class="category-text" id="category-text-${props.id}" style="font-weight: ${isHover || props.state === props.text ? 'bold' : 400}">
            ${props.text} ${companyCount > 0 && props.state === props.text ? props.currentNewsId + '/' + companyCount : ''}
        </li>
        `,
        bindEvents,
    }
}

export default CategoryText
