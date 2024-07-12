import useState from '../../core/hooks/useState.js'
import useEffect from '../../core/hooks/useEffect.js'
import Button, { ButtonVariantProps } from '../base/Button.js'
import createComponent from '../../core/component/component.js'
import IconView, { Icon } from '../base/IconView.js'
import { isSubscribed, subscribe, moveToSubscribedCategory } from '../../utils/subscribeUtils.js'
import { toastOn } from '../../utils/toastUtils.js'
import { debounce } from '../../core/hooks/useState.js'
import { changeIconByFoundation } from '../../utils/iconUtils.js'

const NewsBox = (props) => {
    const [isHover, setIsHover] = useState({ stateId: 1, initialValue: false })
    const [subscribed, setSubscribed] = useState({ stateId: 2, initialValue: false })

    const debouncedSetIsHover = debounce(setIsHover, 60)

    useEffect(
        () => {
            isHover &&
                isSubscribed(props.news.id).then((res) => {
                    setSubscribed(res)
                })
        },
        [isHover],
        1,
    )

    const handleMouseEnter = () => {
        debouncedSetIsHover(true)
    }

    const handleMouseLeave = () => {
        debouncedSetIsHover(false)
    }

    const bindEvents = () => {
        const newsBox = document.getElementById(`news-box${props.id}`)
        newsBox.addEventListener('mouseenter', handleMouseEnter)
        newsBox.addEventListener('mouseleave', handleMouseLeave)
    }
    const removeEvents = () => {
        const newsBox = document.getElementById(`news-box${props.id}`)
        newsBox.removeEventListener('mouseenter', handleMouseEnter)
        newsBox.removeEventListener('mouseleave', handleMouseLeave)
    }

    const handleSubscriptionButtonClick = () => {
        props.setCurrentCompanyInfo({ id: props.news.id, name: props.news.name })

        if (subscribed.value) {
            props.setIsShowAlert(true)
        } else {
            subscribe(props.news.id)

            toastOn()

            moveToSubscribedCategory({
                companyName: props.news.name,
                setSelectedCategory: props.setSelectedCategory,
                setSelectedSource: props.setSelectedSource,
                setViewType: props.setViewType,
            })
        }
    }

    const subscribeButton = createComponent(Button, {
        id: props.news.id + props.id,
        icon: subscribed.value ? Icon.X : Icon.PLUS,
        text: subscribed.value ? '구독해제' : '구독하기',
        variant: ButtonVariantProps.WHITE,
        style: 'margin-right: 10px;',
        onClick: () => {
            handleSubscriptionButtonClick()
        },
    })

    const companyIcon = createComponent(IconView, {
        id: props.id,
        icon: changeIconByFoundation(props.news.icon),
    })

    return {
        element: `
        <div class="news-box-container" id="news-box${props.id}">
            ${isHover.value ? subscribeButton.element : companyIcon.element}
        </div>
        `,
        bindEvents,
        removeEvents,
    }
}

export default NewsBox
