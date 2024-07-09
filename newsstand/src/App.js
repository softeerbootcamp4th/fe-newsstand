import createComponent from './core/component/component.js'
import Header from './layouts/header/Header.js'
import SubHeader from './layouts/sub-header/SubHeader.js'
import NewsContainer from './layouts/news-container/NewsContainer.js'

const App = () => {
    const headerLayout = createComponent(Header, { id: 1, style: 'width:100%; height:8%;' })
    const subHeaderLayout = createComponent(SubHeader, { id: 1, style: 'width:100%; height:8%;' })
    const newsContainerLayout = createComponent(NewsContainer, { id: 1, style: 'width:100%; height:80%;' })

    return {
        element: `
        <div class="main-container">
            <div class="contents-container">
                ${/* header layout */ ''}
                ${headerLayout.element}

                ${/* subheader layout */ ''}
                ${subHeaderLayout.element}

                ${/* news container layout */ ''}
                ${newsContainerLayout.element}
            </div>
        </div>
        `,
    }
}

export default App
