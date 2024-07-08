import createComponent from '../../core/component/component.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import { mediaCategoryData } from '../../datas/mockData.js'
import CategoryBox from '../../components/category/CategoryBox.js'
import { getSubscribedCompaniesId } from '../../utils/subscribeUtils.js'
import { getCompanyName } from '../../datas/companyData.js'

const MediaCategories = (props) => {
    let categoryDatas = mediaCategoryData
    if (props.selectedSource === '내가 구독한 언론사') {
        let categoryIds = getSubscribedCompaniesId()

        categoryDatas = categoryIds.map((id) => {
            let companyName = getCompanyName(id)
            return companyName
        })
    }

    const categoryComponents = categoryDatas.map((category) =>
        createComponent(CategoryBox, {
            id: generateRandomId(10),
            text: category,
            selectedSource: props.selectedSource,
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
