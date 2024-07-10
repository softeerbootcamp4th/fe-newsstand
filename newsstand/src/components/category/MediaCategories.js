import createComponent from '../../core/component/component.js'
import { mediaCategoryData } from '../../datas/mockData.js'
import CategoryBox from '../../components/category/CategoryBox.js'
import { getCompanyName } from '../../datas/companyData.js'
import useEffect from '../../core/hooks/useEffect.js'
import useState from '../../core/hooks/useState.js'

const MediaCategories = (props) => {
    const [categoryDatas, setCategoryDatas] = useState({ stateId: 1, initialValue: mediaCategoryData })

    useEffect(
        () => {
            if (props.selectedSource.value === '내가 구독한 언론사') {
                let datas = props.subscribedCompanyIdList.value.map((id) => {
                    let companyName = getCompanyName(id)
                    return companyName
                })
                setCategoryDatas(datas)
            } else {
                setCategoryDatas(mediaCategoryData)
            }
        },
        [props.selectedSource, props.subscribedCompanyIdList],
        1,
    )

    const categoryComponents = categoryDatas.value.map((category, index) =>
        createComponent(CategoryBox, {
            id: `${category}_${index}`,
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
