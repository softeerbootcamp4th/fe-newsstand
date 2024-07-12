import { POPUP, TIME, TOGGLE } from "./magicNumber.js";
import { renderArticles, renderPopup, renderTabAnimationList, renderTabList } from "./render.js";
import { unSubscribeCompany } from "./subscribe.js";
import { getTabLength, updateTabAnimationStyle } from "./tab.js";
import { switchToggleWithToggleName } from "./toggle.js";
import state from "./store.js";

export function addToastPopup() {
    const toastMessage = `내가 구독한 언론사에 추가되었습니다.`;
    const toastPopupDom = generateToastPopupDom(toastMessage);
    renderPopup(toastPopupDom);
    setTimeout(()=>{
        toastPopupDom.remove();
        switchToggleWithToggleName(TOGGLE.SUBSCRIBED);
    },TIME.SECOND * 5);
}

export function addDeletePopup(companyName) {
    const deletePopupDom = generateDeletePopupDom(companyName);
    deletePopupDom
    renderPopup(deletePopupDom);    
}

export function generateToastPopupDom(message) {
    const toastPopupDom = document.createElement('div');
    toastPopupDom.classList.add('toast_popup','display-medium16');
    toastPopupDom.textContent = message;
    return toastPopupDom;
}

export function generateDeletePopupDom(companyName) {
    const deletePopupDom = document.createElement('div');
    deletePopupDom.classList.add('delete_popup');
    deletePopupDom.innerHTML = `
        <div class="delete_popup_content_box display-bold16" >
            <div>
            <span class="color_14212B" >${companyName}</span>을(를)
            </div>
            구독해지하시겠습니까?
        </div>
        <div class="delete_popup_answer_warpper" >
            <div class="delete_popup_answer_box available-medium16" style="border-right: 1px solid #D2DAE0;" data-id="${POPUP.ACCEPT}" data-company_name="${companyName}" >
            예,해지합니다
            </div>
            <div class="delete_popup_cancel_box" data-id="${POPUP.REJECT}" >
            아니오
            </div>
        </div>
    `;
    deletePopupDom.addEventListener("click",(event) => handleDeletePopup(event.target));
    return deletePopupDom;
}

function handleDeletePopup(target) {
    if(target.dataset.id === POPUP.ACCEPT){
        handleDeleteAction(target.dataset.company_name);
    }
    document.querySelector(".delete_popup").remove();
}

function handleDeleteAction(companyName) {
    unSubscribeCompany(companyName);
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    if (selectedTabIndex > (getTabLength() - 1)) {
        state.setter.setSelectedTabIndex(selectedTabIndex-1)
    }
    renderTabList();
    renderTabAnimationList();
    updateTabAnimationStyle();
    renderArticles();
}
