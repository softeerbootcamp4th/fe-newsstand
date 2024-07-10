import createComponent from '../../core/component/component.js'
import AutoRollingNews from '../../components/news/AutoRollingNews.js'

const SubHeader = () => {
    const leftAutoRollingNews = createComponent(AutoRollingNews, { id: 1, style: 'width: 49.7%;', wait: 0 })
    const rightAutoRollingNews = createComponent(AutoRollingNews, { id: 2, style: 'width: 49.7%;', wait: 1000 })

    return {
        element: `
        <div class="rolling-news-container"> 
            ${leftAutoRollingNews.element}
            ${rightAutoRollingNews.element}
        </div>
        `,
    }
}

export default SubHeader