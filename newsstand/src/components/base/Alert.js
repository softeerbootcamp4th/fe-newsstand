import { unSubscribe } from '../../utils/subscribeUtils.js'
import { getSubscribedCompaniesId } from '../../utils/subscribeUtils.js'
import { getNextIndexInList } from '../../utils/listUtils.js'
import { getCompanyName } from '../../datas/companyData.js'

const Alert = (props) => {
    const handleYesButtonClick = () => {
        const nextIndex = getNextIndexInList(props.currentCompanyInfo.value.id, props.subscribedCompanyIdList.value)
        const nextCategory = props.subscribedCompanyIdList.value[nextIndex]
        props.setSelectedCategory(getCompanyName(nextCategory))

        unSubscribe(props.currentCompanyInfo.value.id)
        props.setIsShowAlert(false)
    }

    const handleNoButtonClick = () => {
        props.setIsShowAlert(false)
        getSubscribedCompaniesId().then((idList) => {
            props.setSubscribedCompanyIdList(idList)
        })
    }

    const bindEvents = () => {
        const yesButton = document.querySelector(`#yes-btn${props.id}`)
        const noButton = document.querySelector(`#no-btn${props.id}`)

        yesButton.addEventListener('click', handleYesButtonClick)
        noButton.addEventListener('click', handleNoButtonClick)
    }

    const removeEvents = () => {
        const yesButton = document.querySelector(`#yes-btn${props.id}`)
        const noButton = document.querySelector(`#no-btn${props.id}`)

        yesButton.removeEventListener('click', handleYesButtonClick)
        noButton.removeEventListener('click', handleNoButtonClick)
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
        removeEvents,
    }
}

export default Alert
