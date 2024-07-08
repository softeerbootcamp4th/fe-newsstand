import NewsSourceSelector from '../source-selector/NewsSourceSelector.js'
import useState from '../../core/hooks/useState.js'
import createComponent from '../../core/component/component.js'
import ListNewsstand from './ListNewsstand.js'
import GridNewsstand from './GridNewsstand.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import { mediaCategoryData } from '../../datas/mockData.js'

const NewsContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState(mediaCategoryData[0])
    const [selectedSource, setSelectedSource] = useState('전체 언론사')
    const [viewType, setViewType] = useState('list')

    const newsSourceSelectorLayout = createComponent(NewsSourceSelector, {
        id: generateRandomId(10),
        style: 'width:100%; height:8%;',
        selectedSource: selectedSource,
        setSelectedSource: setSelectedSource,
        setSelectedCategory: setSelectedCategory,
        viewType: viewType,
        setViewType: setViewType,
    })

    const listNewsstandLayout = createComponent(ListNewsstand, {
        id: generateRandomId(10),
        selectedSource: selectedSource,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        style: 'width:100%;',
    })

    const gridNewsstandLayout = createComponent(GridNewsstand, {
        id: generateRandomId(10),
        selectedSource: selectedSource,
        style: 'width:100%; height:70%;',
    })

    return {
        element: `
        ${newsSourceSelectorLayout.element}
        ${viewType === 'list' ? listNewsstandLayout.element : gridNewsstandLayout.element}
        `,
    }
}

export default NewsContainer
