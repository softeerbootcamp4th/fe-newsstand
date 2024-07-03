import useState from "../core/hooks/useState.js";
import CategoryText from "../components/CategoryText.js";
import createComponent from "../core/component/component.js";
import IconView, { Icon } from "../components/base/IconView.js";
import { generateRandomId } from "../utils/idGenerator.js";

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체 언론사');

    const wholeCategory = createComponent(CategoryText, {id : generateRandomId(10), text : '전체 언론사', state: selectedCategory, setState: setSelectedCategory});
    const subscribeCategoryText2 = createComponent(CategoryText, {id : generateRandomId(10), text : '내가 구독한 언론사', state: selectedCategory, setState: setSelectedCategory});

    const listCategoryButton = createComponent(IconView, {id : generateRandomId(10), icon: Icon.LIST_CATEGORY});
    const gridCategoryButton = createComponent(IconView, {id : generateRandomId(10), icon: Icon.GRID_CATEGORY});

    return {
        element: `
        <div class="category-container">
            <div class="flex">
                ${wholeCategory.element}
                ${subscribeCategoryText2.element}
            </div>
            <div class="flex">
                ${listCategoryButton.element}
                ${gridCategoryButton.element}
            </div>
        </div>
        `,
    }
}

export default Category;
