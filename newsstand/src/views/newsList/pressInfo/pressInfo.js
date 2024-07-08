import ChipButton from "../../../components/chipButton/chipButton.js";
import SnackBar from "../../../components/snackBar/snackBar.js";

export const PressInfoContainer = (props) => {
    let element = document.createElement('div');
    element.className = 'press-info-container';

    function render() {
        const chipButton = makeChipButton();
        
        const html = `
        <img src="${props.imageSrc}" alt="press image"/>
        <span class="press-info-edit-date">${props.editTime}</span>
        `;
    
        element.innerHTML = html;
        element.appendChild(chipButton.element);
    }

    function makeChipButton() {
        const icon = props.isSubscribed ? '/newsstand/assets/icons/xmark.svg' : '/newsstand/assets/icons/plus.svg'
        const chipButton = ChipButton({ icon: icon, title: '구독하기' });

        chipButton.element.addEventListener('click', subscribePress);
        return chipButton
    }

    function subscribePress() {
        savePressToStorage();
        showSnackBar();
    }

    function showSnackBar() {
        const snackBar = SnackBar({title: '내가 구독한 언론사에 추가되었습니다.'});
        snackBar.show();
    }

    function savePressToStorage() {
        localStorage.setItem('pressId', pressId);
    }

    render();

    return {
        element
    };
}

export default PressInfoContainer;
