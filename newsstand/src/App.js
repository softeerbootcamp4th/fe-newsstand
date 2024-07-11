import createComponent from './core/component/component.js'
import Header from './layouts/header/Header.js'
import SubHeader from './layouts/sub-header/SubHeader.js'
import NewsContainer from './layouts/news-container/NewsContainer.js'
import Toast from './components/base/Toast.js'
import Button, { ButtonVariantProps } from './components/base/Button.js'
import FoundationButton from './components/base/FoundationButton.js'
import { Icon } from './components/base/IconView.js'
import useState from './core/hooks/useState.js'
import useEffect from './core/hooks/useEffect.js'

const App = () => {
    const headerLayout = createComponent(Header, { id: 1, style: 'width:100%; height:8%;' })
    const subHeaderLayout = createComponent(SubHeader, { id: 1, style: 'width:100%; height:8%;' })
    const newsContainerLayout = createComponent(NewsContainer, { id: 1, style: 'width:100%; height:74%;' })
    const toastComponent = createComponent(Toast, { text: '내가 구독한 언론사에 추가되었습니다.' })

    const savedFoundation = localStorage.getItem('foundation') || 'white'
    const [foundation, setFoundation] = useState({ stateId: 1, initialValue: savedFoundation })

    useEffect(
        () => {
            changeFoundation()
            localStorage.setItem('foundation', foundation.value)
        },
        [foundation],
        1,
    )

    function changeFoundation() {
        const body = document.querySelector('body')

        if (foundation.value === 'dark') {
            body.classList.add('dark')
            body.classList.remove('light')
        } else {
            body.classList.add('light')
            body.classList.remove('dark')
        }
    }

    const foundationButton = createComponent(FoundationButton, {
        id: 'foundattion_btn',
        icon: foundation.value === 'dark' ? Icon.SUN : Icon.MOON,
        variant: foundation.value === 'dark' ? ButtonVariantProps.WHITE : ButtonVariantProps.GRAY,
        onClick: () => {
            if (foundation.value === 'white') setFoundation('dark')
            else setFoundation('white')
        },
    })

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

                ${toastComponent.element}

                ${foundationButton.element}
            </div>
        </div>
        `,
    }
}

export default App
