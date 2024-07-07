import createComponent from '../../core/component/component.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import { mediaCategoryData } from '../../datas/mockData.js'
import CategoryBox from '../../components/category/CategoryBox.js'

const MediaCategories = (props) => {
    const categoryComponents = mediaCategoryData.map((category) =>
        createComponent(CategoryBox, {
            id: generateRandomId(10),
            text: category,
            state: props.selectedCategory,
            setState: props.setSelectedCategory,
            currentNewsId: props.currentNewsId,
            setCurrentNewsId: props.setCurrentNewsId,
            onFillComplete: props.onFillComplete,
            style: 'height:100%;',
        }),
    )

    return {
        element: `
        <ul class="list-news-header">
            ${categoryComponents.map((component) => component.element).join('')}
        </ul>
        `,
    }
}

export default MediaCategories
