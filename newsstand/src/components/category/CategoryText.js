import useState from '../../core/hooks/useState.js'

const CategoryText = (props) => {
    const [isHover, setIsHover] = useState({ stateId: 1, initialValue: false })

    const handleMouseOver = () => {
        setIsHover(true)
    }

    const handleMouseOut = () => {
        setIsHover(false)
    }

    const handleMouseClick = () => {
        props.onClick()
    }

    const bindEvents = () => {
        const button = document.getElementById(`category-text-${props.id}`)

        button.removeEventListener('mouseover', handleMouseOver)
        button.removeEventListener('mouseout', handleMouseOut)
        button.removeEventListener('click', handleMouseClick)

        button.addEventListener('mouseover', handleMouseOver)
        button.addEventListener('mouseout', handleMouseOut)
        button.addEventListener('click', handleMouseClick)
    }

    return {
        element: `
        <div class="category-text" id="category-text-${props.id}" 
            style="font-weight: ${isHover.value || props.state.value === props.text ? 'bold' : 400}; padding-left: 1px;"
        >
            ${props.text}
        </div>
        `,
        bindEvents,
    }
}

export default CategoryText
