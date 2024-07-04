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
    return {
        element: `
            <img class="icon-view" src="${props.icon}" alt="icon"/>
        `,
    }
}

export default IconView
