import useState from '../../core/hooks/useState.js'

export const ButtonVariantProps = {
    WHITE: 'white',
    GRAY: 'gray',
}

export const buttonVariant = (type) => {
    const variant = {
        white: {
            backgroundColor: 'var(--white)',
            hoverdColor: 'var(--gray50)',
            color: 'var(--gray200)',
        },
        gray: {
            backgroundColor: 'var(--gray50)',
            hoverdColor: 'var(--white)',
            color: 'var(--gray200)',
        },
    }

    return variant[type]
}

const Button = (props) => {
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
        const button = document.getElementById(`button-${props.id}`)
        button.addEventListener('mouseenter', handleMouseEnter)
        button.addEventListener('mouseleave', handleMouseLeave)
        button.addEventListener('click', handleMouseClick)
    }

    const removeEvents = () => {
        const button = document.getElementById(`button-${props.id}`)
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
        button.removeEventListener('click', handleMouseClick)
    }

    const { backgroundColor, hoverdColor, color } = buttonVariant(props.variant)

    return {
        element: `
        <div class="button" id="button-${props.id}" style="background-color: ${isHover.value ? hoverdColor : backgroundColor}; color: ${color};">
            ${props.icon ? `<img class="button-left-icon" src=${props.icon} alt="icon"/>` : ''}
            ${props.text}
        </div>
        `,
        bindEvents,
        removeEvents,
    }
}

export default Button
