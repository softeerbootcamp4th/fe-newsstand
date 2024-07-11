export const Icon = {
    NEWSSTAND: './assets/newsstand_ico.svg',
    PLUS: './assets/plus_ico.svg',
    X: './assets/x_ico.svg',
    LIST_CATEGORY: './assets/list_category_ico.svg',
    GRID_CATEGORY: './assets/grid_category_ico.svg',
    LEFT_BUTTON: './assets/left_button_ico.svg',
    RIGHT_BUTTON: './assets/right_button_ico.svg',
}

const IconView = (props) => {
    const handleMouseClick = () => {
        if (typeof props.onClick === 'function') {
            props.onClick()
        }
    }

    const bindEvents = () => {
        const button = document.getElementById(`icon-view${props.id}`)
        button.addEventListener('click', handleMouseClick)
    }

    const removeEvents = () => {
        const button = document.getElementById(`icon-view${props.id}`)
        button.removeEventListener('click', handleMouseClick)
    }

    return {
        element: `
            <img class="icon-view" id="icon-view${props.id}" src="${props.icon}" alt="icon"/>
        `,
        bindEvents,
        removeEvents,
    }
}

export default IconView
