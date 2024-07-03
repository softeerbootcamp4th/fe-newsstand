import { createElement } from "../app/createElement.js";

export const CategoryButton = (props) => {

    return createElement('button', { class: 'news-category-button', onclick: () => props.onClick(props.id) }
    );
};

export default CategoryButton;