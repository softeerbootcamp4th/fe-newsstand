import { getSubscriptionList } from "../../common/getSubscriptionList.js";
import { setSubscriptionList } from "../../common/setSubscriptionList.js";
import { createCategory, loadCurrentCategoryNews } from "./displaylistViewNews.js";
import { showInformation } from "./showInformation.js";
import { updateSubButton } from "./updateSubButton.js";

export function handleModalBtnClick() {
    const modal = document.querySelector('.modal-container');
    

    /* 구독한 언론사에서 삭제 */
    document.querySelector('.modal-confirm-btn').addEventListener('click', () => {
        const company = document.getElementById('logo').getAttribute('alt');
        modal.classList.remove('show');
        document.querySelector('.company-name')?.remove();
        let subscriptor = getSubscriptionList();

        subscriptor = subscriptor.filter(item => item !== company);

        setSubscriptionList(subscriptor);
        updateSubButton();
        createCategory(subscriptor.reverse(), 'subscribe');
        subscriptor.length === 0 ? showInformation() : loadCurrentCategoryNews('subscribe');
        
    });

    document.querySelector('.modal-cancle-btn').addEventListener('click', () => {
        modal.classList.remove('show');
        document.querySelector('.company-name')?.remove();
    });
}
