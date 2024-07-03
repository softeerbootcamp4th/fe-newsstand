import useState from "../core/hooks/useState.js";
import CategoryText from "../components/CategoryText.js";
import createComponent from "../core/component/component.js";

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체 언론사');

    const categoryText = createComponent(CategoryText, {id : 1, text : '전체 언론사', state: selectedCategory, setState: setSelectedCategory});
    const categoryText2 = createComponent(CategoryText, {id : 2, text : '내가 구독한 언론사', state: selectedCategory, setState: setSelectedCategory});

    return {
        element: `
        <div class="category-container">
            ${categoryText.element}
            ${categoryText2.element}
        </div>
        `,
    }
}

export default Category;
