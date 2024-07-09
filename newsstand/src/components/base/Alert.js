import { unSubscribe } from '../../utils/subscribeUtils.js'

const Alert = (props) => {
    const handleYesButtonClick = () => {
        unSubscribe(props.currentCompanyInfo.value.id)
        props.setIsShowAlert(false)
    }

    const handleNoButtonClick = () => {
        props.setIsShowAlert(false)
    }

    const bindEvents = () => {
        const yesButton = document.querySelector(`#yes-btn${props.id}`)
        const noButton = document.querySelector(`#no-btn${props.id}`)

        yesButton.addEventListener('click', handleYesButtonClick)
        noButton.addEventListener('click', handleNoButtonClick)
    }

    return {
        element: `
        <div class="alert" id="alert${props.id}">
            <div class='alert-text-container'>
                <h3>${props.currentCompanyInfo.value && props.currentCompanyInfo.value.name}을(를)<br/>구독해지하시겠습니까?</h3>
            </div>
            <div class='alert-button-container'>
                <div class='alert-button-wrap'>
                    <a class='alert-button yes-btn' id='yes-btn${props.id}'>예, 해지합니다</a>
                    <a class='alert-button no-btn' id='no-btn${props.id}'>아니오</a>
                </div>
            </div>
        </div>
        `,
        bindEvents,
    }
}

export default Alert
