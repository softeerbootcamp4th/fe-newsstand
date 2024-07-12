import { mytabs } from "../newstab/newstab.js";
import subscribeManager from "../statemanager/subscribeManager.js";
import { subProgressTimer } from "../displaynews/displaySubscribe.js";
import stateManager from "../statemanager/stateManager.js";
export const showsubmodal = () => {
    const modal = document.getElementById('submodal');
    modal.innerText = "내가 구독한 언론사에 추가되었습니다.";
    modal.className = 'active';
    setTimeout(() => {
        modal.classList.remove('active');
    }, 5000);
}

// 모달 창 닫기 함수
const closeModal = () => {
    const modalContainer = document.querySelector('.cancel-modal-container');
    modalContainer.classList.remove('show');
};

//구독 취소 창
export const showCancelmodal = (btn_text) => {
    const modalContainer = document.querySelector('.cancel-modal-container');
    modalContainer.classList.add('show');
    const modalText = document.getElementById('cancel-modal-text');
    modalText.textContent = `${btn_text}`;
};

const cancelyes = document.querySelector('.cancel-yes');
const cancelno = document.querySelector('.cancel-no');

cancelyes.addEventListener('click', () => {
    // 먼저 창닫기
    closeModal();
    let subscribedNews = subscribeManager.getSubscribedData();
    let modaltext = document.getElementById('cancel-modal-text');
    console.log(modaltext.textContent);
    const subscribeButton = document.querySelector(`.news-press-subscribe`);
    subscribeButton.innerHTML = '<img src="../../icons/Subscribe.svg" alt="Subscribe">';

    let filteredNews = subscribedNews.filter(item => item !== modaltext.textContent);
    subscribeManager.setSubscribedData(filteredNews);
    console.log(subscribeManager.getSubscribedData());
    localStorage.setItem('mysubscribe' , JSON.stringify(filteredNews));
    clearInterval(subProgressTimer);
    mytabs();
});

cancelno.addEventListener('click', closeModal);