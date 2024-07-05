import createComponent from './core/component/component.js'
import Header from './layouts/Header.js'
import SubHeader from './layouts/SubHeader.js'
import NewsSourceSelector from './layouts/NewsSourceSelector.js'
import ListNewsstand from './layouts/ListNewsstand.js'
import { generateRandomId } from './utils/idGenerator.js'

const App = () => {
    const headerLayout = createComponent(Header, { id: generateRandomId(10), style: 'width:100%; height:8%;' })
    const subHeaderLayout = createComponent(SubHeader, { id: generateRandomId(10), style: 'width:100%; height:8%;' })
    const newsSourceSelectorLayout = createComponent(NewsSourceSelector, { id: generateRandomId(10), style: 'width:100%; height:8%;' })
    const listNewsstandLayout = createComponent(ListNewsstand, {
        id: generateRandomId(10),
        style: 'width:100%; height:70%;',
    })

    return {
        element: `
        <div class="main-container">
            <div class="contents-container">
                ${/* header layout */ ''}
                ${headerLayout.element}

                ${/* subheader layout */ ''}
                ${subHeaderLayout.element}

                ${/* news source selector layout */ ''}
                ${newsSourceSelectorLayout.element}

                ${/* news container layout */ ''}
                ${listNewsstandLayout.element}
            </div>
        </div>
        `,
    }
}

export default App
