import useState from '../../core/hooks/useState.js'
import Button, { ButtonVariantProps } from '../base/Button.js'
import { generateRandomId } from '../../utils/idGenerator.js'
import createComponent from '../../core/component/component.js'
import IconView, { Icon } from '../base/IconView.js'
import { isSubscribed } from '../../utils/subscribeUtils.js'

const NewsBox = (props) => {
    const [isHover, setIsHover] = useState(false)

    const handleMouseOver = () => {
        setIsHover(true)
    }

    const handleMouseOut = () => {
        setIsHover(false)
    }

    const bindEvents = () => {
        const newsBox = document.getElementById(`news-box-${props.id}`)
        newsBox.addEventListener('mouseover', handleMouseOver)
        newsBox.addEventListener('mouseout', handleMouseOut)
    }

    const subscribeButton = createComponent(Button, {
        id: generateRandomId(10),
        icon: isSubscribed(props.companyName) ? Icon.X : Icon.PLUS,
        text: isSubscribed(props.companyName) ? '구독해제' : '구독하기',
        variant: ButtonVariantProps.WHITE,
        onClick: () => {
            handleSubscription(props.companyName)
        },
    })

    const companyLogo = createComponent(IconView, {
        id: generateRandomId(10),
        icon: props.icon,
    })

    return {
        element: `
        <div class="news-box-container" id="news-box-${props.id}">
            ${isHover ? subscribeButton.element : companyLogo.element}
        </div>
        `,
        bindEvents,
    }
}

export default NewsBox
