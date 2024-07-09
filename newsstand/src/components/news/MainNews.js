import Button, { ButtonVariantProps } from '../base/Button.js'
import IconView, { Icon } from '../base/IconView.js'
import createComponent from '../../core/component/component.js'
import ImageView from '../base/ImageView.js'
import { isSubscribed, subscribe } from '../../utils/subscribeUtils.js'

const MainNews = (props) => {
    if (props.newsData.value.news.length === 0) {
        return {
            element: `
                <h5>
                    구독한 언론사가 없습니다.
                    언론사 구독 설정에서 관심 있는 언론사를 구독하시면
                    언론사가 직접 편집한 뉴스들을 네이버 홈에서 바로 보실 수 있습니다.
                </h5>
            `,
        }
    }

    const handleSubscriptionButtonClick = () => {
        if (isSubscribed(props.newsData.value.companyId)) {
            props.setIsShowAlert(true)
        } else {
            subscribe(props.newsData.value.companyId)
        }
    }

    const companyIcon = createComponent(IconView, {
        id: 1,
        icon: props.newsData.value ? props.newsData.value.companyIcon : '',
    })

    const subscribeButton = createComponent(Button, {
        id: `${props.selectedSource.value}-sub-btn-${props.newsData.value.companyId}-${props.id}`,
        icon: isSubscribed(props.newsData.value.companyId) ? Icon.X : Icon.PLUS,
        text: isSubscribed(props.newsData.value.companyId) ? '' : '구독하기',
        style: 'height:10px;',
        variant: ButtonVariantProps.WHITE,
        onClick: () => {
            handleSubscriptionButtonClick()
        },
    })

    const ImageComponent = createComponent(ImageView, {
        id: 1,
        src: props.newsData.value.mainNews.src,
        style: 'width: 100%; height:100%',
    })

    return {
        element: `
            <div class="list-news-left-container">
                <div class="list-news-left-top">
                    ${companyIcon.element}
                    <h5>
                        ${props.newsData.value.updatedDate}
                    </h5>
                    ${subscribeButton.element}
                </div>
                <div class="list-news-left-body">
                    ${ImageComponent.element}
                </div>
                <div class="list-news-left-bottom">
                    <h4 class="news-content">
                        ${props.newsData.value.mainNews.title}
                    </h4>
                </div>
            </div>
        `,
    }
}

export default MainNews
