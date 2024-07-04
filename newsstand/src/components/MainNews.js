import Button, { ButtonVariantProps } from '../components/base/Button.js'
import IconView, { Icon } from '../components/base/IconView.js'
import createComponent from '../core/component/component.js'
import ImageView from '../components/base/ImageView.js'
import { generateRandomId } from '../utils/idGenerator.js'

const MainNews = (props) => {
    const companyIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: props.newsData.companyLogo || '',
    })

    const subscribeButton = createComponent(Button, {
        id: generateRandomId(10),
        icon: Icon.PLUS,
        text: '구독하기',
        style: 'height:10px;',
        variant: ButtonVariantProps.WHITE,
    })

    const ImageComponent = createComponent(ImageView, {
        id: generateRandomId(10),
        src: props.newsData.mainNews.src,
        style: 'width: 100%; height:100%',
    })

    return {
        element: `
            <div class="list-news-left-container">
                <div class="list-news-left-top">
                    ${companyIcon.element}
                    <h5>
                        ${props.newsData.updatedDate}
                    </h5>
                    ${subscribeButton.element}
                </div>
                <div class="list-news-left-body">
                    ${ImageComponent.element}
                </div>
                <div class="list-news-left-bottom">
                    <h4 class="news-content">
                        ${props.newsData.mainNews.title}
                    </h4>
                </div>
            </div>
        `,
    }
}

export default MainNews
