import ChipButton from "../../../components/chipButton/chipButton.js";
import SnackBar from "../../../components/snackBar/snackBar.js";

export const PressInfoContainer = (props) => {
    let element = document.createElement('div');
    element.className = 'press-info-container';

    let isSubscribed = props.isSubscribed;  

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
        const icon = isSubscribed ? '/newsstand/assets/icons/xmark.svg' : '/newsstand/assets/icons/plus.svg';
        const title = isSubscribed ? '' : '구독하기';
        const chipButton = ChipButton({ icon: icon, title: title });

        chipButton.element.addEventListener('click', subscribePress);
        return chipButton;
    }

    function subscribePress() {
        savePressToStorage();
        showSnackBar();
        render();
    }

    function showSnackBar() {
        isSubscribed = !isSubscribed;
        const snackBar = SnackBar({ title: '내가 구독한 언론사에 추가되었습니다.' });
        snackBar.show();
    }

    function savePressToStorage() {
        let pressId = "경제신문";
        let subscribedPress = localStorage.getItem('pressId');

        subscribedPress += pressId;
        localStorage.setItem('pressId', pressId);
    }

    render();

    return {
        element
    };
}

export default PressInfoContainer;