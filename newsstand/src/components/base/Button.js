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
    const [isHover, setIsHover] = useState(false)

    const handleMouseOver = () => {
        setIsHover(true)
    }

    const handleMouseOut = () => {
        setIsHover(false)
    }

    const handleMouseClick = () => {
        console.log('CLICKED')
    }

    const bindEvents = () => {
        const button = document.getElementById(`button-${props.id}`)
        button.addEventListener('mouseover', handleMouseOver)
        button.addEventListener('mouseout', handleMouseOut)
        button.addEventListener('click', handleMouseClick)
    }

    const { backgroundColor, hoverdColor, color } = buttonVariant(props.variant)

    return {
        element: `
        <div class="button" id="button-${props.id}" style="background-color: ${isHover ? hoverdColor : backgroundColor}; color: ${color};">
            <img class="button-left-icon" src=${props.icon} alt="icon"/>
            ${props.text}
        </div>
        `,
        bindEvents,
    }
}

export default Button