import useState from '../../core/hooks/useState.js'
import { buttonVariant } from './Button.js'

const FoundationButton = (props) => {
    const [isHover, setIsHover] = useState({ stateId: 1, initialValue: false })

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    const handleMouseClick = () => {
        props.onClick()
    }

    const bindEvents = () => {
        const button = document.getElementById(`foundation-btn-${props.id}`)
        button.addEventListener('mouseenter', handleMouseEnter)
        button.addEventListener('mouseleave', handleMouseLeave)
        button.addEventListener('click', handleMouseClick)
    }

    const removeEvents = () => {
        const button = document.getElementById(`foundation-btn-${props.id}`)
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
        button.removeEventListener('click', handleMouseClick)
    }

    const { backgroundColor, hoverdColor, color } = buttonVariant(props.variant)

    return {
        element: `
        <div class="foundation-btn" id="foundation-btn-${props.id}" style="background-color: ${
            isHover.value ? hoverdColor : backgroundColor
        }; color: ${color};">
            <img class="foundation-btn-icon" src=${props.icon} alt="icon"/>
        </div>
        `,
        bindEvents,
        removeEvents,
    }
}

export default FoundationButton
