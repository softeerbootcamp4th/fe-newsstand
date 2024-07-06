import createComponent from '../../core/component/component.js'
import IconView, { Icon } from '../../components/base/IconView.js'
import CategoryText from '../../components/category/CategoryText.js'
import { generateRandomId } from '../../utils/idGenerator.js'

const NewsSourceSelector = (props) => {
    const wholeCategory = createComponent(CategoryText, {
        id: generateRandomId(10),
        text: '전체 언론사',
        state: props.selectedSource,
        onClick: () => props.setSelectedSource('전체 언론사'),
    })
    const subscribeCategory = createComponent(CategoryText, {
        id: generateRandomId(10),
        text: '내가 구독한 언론사',
        state: props.selectedSource,
        onClick: () => props.setSelectedSource('내가 구독한 언론사'),
    })

    const listCategoryButton = createComponent(IconView, {
        id: generateRandomId(10),
        icon: Icon.LIST_CATEGORY,
        onClick: () => props.setViewType('list'),
    })

    const gridCategoryButton = createComponent(IconView, {
        id: generateRandomId(10),
        icon: Icon.GRID_CATEGORY,
        onClick: () => props.setViewType('grid'),
    })

    return {
        element: `
        <div class="category-container">
            <div class="flex">
                ${wholeCategory.element}
                ${subscribeCategory.element}
            </div>
            <div class="flex">
                ${listCategoryButton.element}
                ${gridCategoryButton.element}
            </div>
        </div>
        `,
    }
}

export default NewsSourceSelector
