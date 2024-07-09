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
        button.addEventListener('mouseover', handleMouseOver)
        button.addEventListener('mouseout', handleMouseOut)
        button.addEventListener('click', handleMouseClick)
    }

    return {
        element: `
        <div class="category-text" id="category-text-${props.id}" 
            style="font-weight: ${isHover || props.state === props.text ? 'bold' : 400}; padding-left: 1px;"
        >
            ${props.text}
        </div>
        `,
        bindEvents,
    }
}

export default CategoryText