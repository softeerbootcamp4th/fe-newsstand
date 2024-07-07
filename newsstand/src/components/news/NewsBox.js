import useState from '../../core/hooks/useState.js'
import Button, { ButtonVariantProps } from '../base/Button.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import createComponent from '../../core/component/component.js'
import IconView, { Icon } from '../base/IconView.js'
import { isSubscribed, handleSubscription } from '../../utils/subscribeUtils.js'

const NewsBox = (props) => {
    const [isHover, setIsHover] = useState(false)

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

    const subscribeButton = createComponent(Button, {
        id: generateRandomId(10),
        icon: isSubscribed(props.news.id) ? Icon.X : Icon.PLUS,
        text: isSubscribed(props.news.id) ? '구독해제' : '구독하기',
        variant: ButtonVariantProps.WHITE,
        onClick: () => {
            handleSubscription(props.news.id)
        },
    })

    const companyIcon = createComponent(IconView, {
        id: generateRandomId(10),
        icon: props.news.icon,
    })

    return {
        element: `
        <div class="news-box-container" id="news-box${props.id}">
            ${isHover ? subscribeButton.element : companyIcon.element}
        </div>
        `,
        bindEvents,
    }
}

export default NewsBox
