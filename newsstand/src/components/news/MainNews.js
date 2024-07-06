import Button, { ButtonVariantProps } from '../base/Button.js'
import IconView, { Icon } from '../base/IconView.js'
import createComponent from '../../core/component/component.js'
import ImageView from '../base/ImageView.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import { isSubscribed, handleSubscription } from '../../utils/subscribeUtils.js'

const MainNews = (props) => {
    const companyIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: props.newsData.companyLogo || '',
    })

    const subscribeButton = createComponent(Button, {
        id: generateRandomId(10),
        icon: isSubscribed(props.newsData.companyName) ? Icon.X : Icon.PLUS,
        text: isSubscribed(props.newsData.companyName) ? '구독해제' : '구독하기',
        style: 'height:10px;',
        variant: ButtonVariantProps.WHITE,
        onClick: () => {
            handleSubscription(props.newsData.companyName)
        },
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
