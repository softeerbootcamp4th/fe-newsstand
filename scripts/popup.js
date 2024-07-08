import { POPUP, TIME, TOGGLE } from "./magicValues.js";
import { renderArticles, renderPopup, renderTabAnimationList, renderTabList } from "./render.js";
import { unSubscribeCompany } from "./subscribe.js";
import { getTabLength, updateTabAnimationStyle } from "./tab.js";
import { switchToggleWithToggleName } from "./toggle.js";

export function addToastPopup(state) {
    const toastMessage = `내가 구독한 언론사에 추가되었습니다.`;
    const toastPopupDom = generateToastPopupDom(toastMessage);
    renderPopup(toastPopupDom);
    setTimeout(()=>{
        toastPopupDom.remove();
        switchToggleWithToggleName(state,TOGGLE.SUBSCRIBED);
    },TIME.SECOND * 5);
}

export function addDeletePopup(state,companyName) {
    const deletePopupDom = generateDeletePopupDom(state,companyName);
    deletePopupDom
    renderPopup(deletePopupDom);

    
}

export function generateToastPopupDom(message) {
    const toastPopupDom = document.createElement('div');
    toastPopupDom.classList.add('toast_popup','display-medium16');
    toastPopupDom.textContent = message;
    return toastPopupDom;
}

export function generateDeletePopupDom(state,companyName) {
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
            <div class="delete_popup_answer_box" data-id="${POPUP.REJECT}" >
            아니오
            </div>
        </div>
    `;
    deletePopupDom.addEventListener("click",(event) => handleDeletePopup(state,event.target));
    return deletePopupDom;
}

function handleDeletePopup(state,target) {
    if(target.dataset.id === POPUP.ACCEPT){
        handleDeleteAction(state,target.dataset.company_name);
    }
    document.querySelector(".delete_popup").remove();
}

function handleDeleteAction(state,companyName) {
    unSubscribeCompany(state,companyName);
    if (state.selectedTabIndex > (getTabLength(state) - 1)) {
        state.selectedTabIndex -= 1;
    }
    renderTabList(state);
    renderTabAnimationList(state);
    updateTabAnimationStyle(state);
    renderArticles(state);
}
