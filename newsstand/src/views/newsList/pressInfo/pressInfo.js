import ChipButton from "../../../components/chipButton/chipButton.js";
import SnackBar from "../../../components/snackBar/snackBar.js";
import Alert from "../../../components/alert/alert.js";

export const PressInfoContainer = ({press}) => {
    let element = document.createElement('div');
    element.className = 'press-info-container';

    let isSubscribed = press.subscribe == 'Y';  

    function render() {
        const chipButton = makeChipButton();
        
        const html = `
            <img src="${press.sourceLogo}" alt="press image"/>
            <span class="press-info-edit-date">${press.newsDate}</span>
        `;
    
        element.innerHTML = html;
        element.appendChild(chipButton.element);
    }

    function makeChipButton() {
        const icon = isSubscribed ? '/newsstand/assets/icons/xmark.svg' : '/newsstand/assets/icons/plus.svg';
        const title = isSubscribed ? '' : '구독하기';
        const chipButton = ChipButton({ icon: icon, title: title });

        chipButton.element.addEventListener('click', isSubscribed ? unSubscribePress : subscribePress);
        return chipButton;
    }

    function subscribePress() {
        savePressToStorage();
        showSnackBar();
        render();
    }

    function unSubscribePress() {
        showAlert();
    }

    function showSnackBar() {
        isSubscribed = !isSubscribed;
        const snackBar = SnackBar({ title: '내가 구독한 언론사에 추가되었습니다.' });
        snackBar.show();
    }

    function showAlert() {
        const alert = Alert({ pressName: press.mediaName, handleOkButtonClick: handleUnsubscribe});
        alert.show();
    }

    function handleUnsubscribe() {
        deletePressFromStorage()
        isSubscribed = false;
        render();
    }

    function savePressToStorage() {
        const name = press.mediaName;
        let subscribedPress = localStorage.getItem('subscribed');
        subscribedPress += subscribedPress ? ","+name : name;
        localStorage.setItem('subscribed', subscribedPress);
    }

    function deletePressFromStorage() {
        const name = press.mediaName;
        let subscribedPress = localStorage.getItem('subscribed');
    
        const subscribedPressArray = subscribedPress.split(',');
        const updatedSubscribedPressArray = subscribedPressArray.filter(item => item.trim() !== name);
        const updatedSubscribedPress = updatedSubscribedPressArray.join(',');
    
        localStorage.setItem('subscribed', updatedSubscribedPress);
    }
    

    render();

    return {
        element
    };
}

export default PressInfoContainer;