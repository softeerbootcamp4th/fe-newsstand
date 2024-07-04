import createComponent from './core/component/component.js'
import Header from './layouts/Header.js'
import SubHeader from './layouts/SubHeader.js'
import Category from './layouts/Category.js'
import ListNewsstand from './layouts/ListNewsstand.js'
import { generateRandomId } from './utils/idGenerator.js'

const App = () => {
    const headerLayout = createComponent(Header, { id: generateRandomId(10), style: 'width:100%; height:8%;' })
    const SubHeaderLayout = createComponent(SubHeader, { id: generateRandomId(10), style: 'width:100%; height:8%;' })
    const categoryLayout = createComponent(Category, { id: generateRandomId(10), style: 'width:100%; height:8%;' })
    const ListNewsstandLayout = createComponent(ListNewsstand, {
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
                ${SubHeaderLayout.element}

                ${/* category layout */ ''}
                ${categoryLayout.element}

                ${/* news container layout */ ''}
                ${ListNewsstandLayout.element}
            </div>
        </div>
        `,
    }
}

export default App
