import ChipButton from "../../../components/chipButton/chipButton.js";
import SnackBar from "../../../components/snackBar/snackBar.js";
import Alert from "../../../components/alert/alert.js";
import { separateId } from "../../../utils/utils.js";

const CLASS = Object.freeze({
    PRESS_INFO_CONTAINER: 'press-info-container',
    PRESS_INFO_LOGO: 'press-info-logo',
    PRESS_INFO_EDIT_DATE: 'press-info-edit-date',
    CHIP_BUTTON_CONTAINER: 'chip-button-container'
})

const ICON = Object.freeze({
    XMARK: '/newsstand/assets/icons/xmark.svg',
    PLUS: '/newsstand/assets/icons/plus.svg'
})

class PressInfoView {
    constructor({onClickChipButton}) {
        this.element = document.createElement('div');
        this.element.className = CLASS.PRESS_INFO_CONTAINER;
        this.chipButton = null;
        this.onClickChipButton = onClickChipButton;
    }

    render() {
        const html = `
            <img class="${CLASS.PRESS_INFO_LOGO}" src="" alt="press image"/>
            <span class="${CLASS.PRESS_INFO_EDIT_DATE}"></span>
            <div class="${CLASS.CHIP_BUTTON_CONTAINER}"></div>
        `;
        this.element.innerHTML = html;

        const icon = ICON.PLUS;
        const title = '구독하기';

        this.renderChipButton(icon, title);
    }

    update(press) {
        const { sourceLogo, newsDate, subscribe } = press;
        const isSubscribed = subscribe === 'Y';
        const icon = isSubscribed ? ICON.XMARK : ICON.PLUS;
        const title = isSubscribed ? '' : '구독하기';

        this.element.querySelector(`.${CLASS.PRESS_INFO_LOGO}`).src = sourceLogo;
        this.element.querySelector(`.${CLASS.PRESS_INFO_EDIT_DATE}`).textContent = newsDate;

        this.renderChipButton(icon, title);
    }

    renderChipButton(icon, title) {
        if (this.chipButton) {
            this.element.querySelector(`.${CLASS.CHIP_BUTTON_CONTAINER}`).innerHTML = '';
        }

        this.chipButton = ChipButton({ icon: icon, title: title });
        this.chipButton.element.addEventListener('click', () => this.onClickChipButton());
        this.element.querySelector(`.${CLASS.CHIP_BUTTON_CONTAINER}`).appendChild(this.chipButton.element);
    }

    showSnackBar() {
        const snackBar = SnackBar({ title: '내가 구독한 언론사에 추가되었습니다.' });
        snackBar.show();
    }

    showAlert(press) {
        const { mediaName } = press;
        const alert = Alert({ pressName: mediaName, handleOkButtonClick: () => this.onAlertOkButtonClick() });
        alert.show();
    }

    onAlertOkButtonClick() {
        this.onClickChipButton();
    }

    onClickCategory(callback) {
        this.element.addEventListener('click', (event) => {
            const intId = separateId(event.target.id);
            callback(intId);
        });
    }

    getElement() {
        return this.element;
    }
}

export default PressInfoView;