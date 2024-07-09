import NewsSourceSelector from '../source-selector/NewsSourceSelector.js'
import useState from '../../core/hooks/useState.js'
import createComponent from '../../core/component/component.js'
import ListNewsstand from './ListNewsstand.js'
import GridNewsstand from './GridNewsstand.js'
import Alert from '../../components/base/Alert.js'
import { mediaCategoryData } from '../../datas/mockData.js'

const NewsContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState({ stateId: 1, initialValue: mediaCategoryData[0] })
    const [selectedSource, setSelectedSource] = useState({ stateId: 2, initialValue: '전체 언론사' })
    const [viewType, setViewType] = useState({ stateId: 3, initialValue: 'list' })
    const [isShowAlert, setIsShowAlert] = useState({ stateId: 4, initialValue: false })
    const [currentCompanyInfo, setCurrentCompanyInfo] = useState({ stateId: 5, initialValue: undefined })

    const alertComponent = createComponent(Alert, {
        id: 1,
        setIsShowAlert: setIsShowAlert,
        currentCompanyInfo: currentCompanyInfo,
    })

    const newsSourceSelectorLayout = createComponent(NewsSourceSelector, {
        id: 1,
        style: 'width:100%; height:8%;',
        selectedSource: selectedSource,
        setSelectedSource: setSelectedSource,
        setSelectedCategory: setSelectedCategory,
        viewType: viewType,
        setViewType: setViewType,
    })

    const listNewsstandLayout = createComponent(ListNewsstand, {
        id: 1,
        selectedSource: selectedSource,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        viewType: viewType,
        setViewType: setViewType,
        setCurrentCompanyInfo: setCurrentCompanyInfo,
        setIsShowAlert: setIsShowAlert,
        style: 'width:100%;',
    })

    const gridNewsstandLayout = createComponent(GridNewsstand, {
        id: 1,
        selectedSource: selectedSource,
        viewType: viewType,
        setCurrentCompanyInfo: setCurrentCompanyInfo,
        setIsShowAlert: setIsShowAlert,
        style: 'width:100%; height:70%;',
    })

    return {
        element: `
        ${newsSourceSelectorLayout.element}
        ${viewType.value === 'list' ? listNewsstandLayout.element : gridNewsstandLayout.element}
        ${isShowAlert.value ? alertComponent.element : ''}
        `,
    }
}

export default NewsContainer
