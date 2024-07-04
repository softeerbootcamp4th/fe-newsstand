export const Icon = {
    NEWSSTAND: './assets/newsstand_ico.svg',
    PLUS: './assets/plus_ico.svg',
    X: './assets/x_ico.svg',
    LIST_CATEGORY: './assets/list_category_ico.svg',
    GRID_CATEGORY: './assets/grid_category_ico.svg',
}

const IconView = (props) => {
    return {
        element: `
        <img class="icon-view" src="${props.icon}" alt="icon"/>
        `,
    }
}

export default IconView
