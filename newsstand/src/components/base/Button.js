import useState from '../../core/hooks/useState.js'

export const ButtonVariantProps = {
    WHITE: 'white',
    GRAY: 'gray',
}

const buttonVariant = (type) => {
    const variant = {
        white: {
            light: {
                backgroundColor: '#fff',
                hoverdColor: '#f0f0f0',
                color: 'gray',
            },
            dark: {
                backgroundColor: '#375a7f',
                hoverdColor: '#2d4866',
                color: '#fff',
            },
        },
        gray: {
            light: {
                backgroundColor: 'gainsboro',
                hoverdColor: '#bcbcbc',
                color: 'gray',
            },
            dark: {
                backgroundColor: '#444950',
                hoverdColor: '#3a3f46',
                color: '#fff',
            },
        },
    }

    return variant[type].light
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
        const button = document.getElementById(`button${props.id}`)

        // 기존의 리스너가 있다면 제거
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
        button.removeEventListener('click', handleMouseClick)

        // 새로운 리스너 등록
        button.addEventListener('mouseenter', handleMouseEnter)
        button.addEventListener('mouseleave', handleMouseLeave)
        button.addEventListener('click', handleMouseClick)
    }

    const { backgroundColor, hoverdColor, color } = buttonVariant(props.variant)

    return {
        element: `
        <div class="button" id="button${props.id}" style="background-color: ${isHover.value ? hoverdColor : backgroundColor}; color: ${color};">
            ${props.icon ? `<img class="button-left-icon" src=${props.icon} alt="icon"/>` : ''}
            ${props.text}
        </div>
        `,
        bindEvents,
    }
}

export default Button
