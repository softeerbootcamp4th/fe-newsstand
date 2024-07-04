import useState from '../core/hooks/useState.js'
import CategoryText from '../components/CategoryText.js'
import createComponent from '../core/component/component.js'
import { generateRandomId } from '../utils/idGenerator.js'
import { mediaCategoryData } from '../datas/mockData.js'

const MediaCategories = (props) => {
    const categoryComponents = mediaCategoryData.map((category) =>
        createComponent(CategoryText, {
            id: generateRandomId(10),
            text: category,
            state: props.selectedCategory,
            setState: props.setSelectedCategory,
            currentNewsId: props.currentNewsId,
            setCurrentNewsId: props.setCurrentNewsId,
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
