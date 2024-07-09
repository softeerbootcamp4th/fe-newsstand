import useState from '../../core/hooks/useState.js'
import Button, { ButtonVariantProps } from '../base/Button.js'
import createComponent from '../../core/component/component.js'
import IconView, { Icon } from '../base/IconView.js'
import { isSubscribed, subscribe } from '../../utils/subscribeUtils.js'

const NewsBox = (props) => {
    const [isHover, setIsHover] = useState({ stateId: 1, initialValue: false })

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    const bindEvents = () => {
        const newsBox = document.getElementById(`news-box${props.id}`)
        newsBox.addEventListener('mouseenter', handleMouseEnter)
        newsBox.addEventListener('mouseleave', handleMouseLeave)
    }

    const handleSubscriptionButtonClick = () => {
        props.setCurrentCompanyInfo({ id: props.news.id, name: props.news.name })

        if (isSubscribed(props.news.id)) {
            props.setIsShowAlert(true)
        } else {
            subscribe(props.news.id)
        }
    }

    const subscribeButton = createComponent(Button, {
        id: props.news.id + props.id,
        icon: isSubscribed(props.news.id) ? Icon.X : Icon.PLUS,
        text: isSubscribed(props.news.id) ? '구독해제' : '구독하기',
        variant: ButtonVariantProps.WHITE,
        style: 'margin-right: 10px;',
        onClick: () => {
            handleSubscriptionButtonClick()
        },
    })

    const companyIcon = createComponent(IconView, {
        id: props.id,
        icon: props.news.icon,
    })

    return {
        element: `
        <div class="news-box-container" id="news-box${props.id}">
            ${isHover.value ? subscribeButton.element : companyIcon.element}
        </div>
        `,
        bindEvents,
    }
}

export default NewsBox
