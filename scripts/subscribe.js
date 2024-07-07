import { getSubscribeCompanies } from "./company.js";
import { drawArticles, drawTabAnimationList, drawTabList } from "./drawer.js";
import { getRightTabValidation } from "./tab.js";
import { getTabLength } from "./tab.js";
import { updateTabAnimationStyle } from "./tab.js";

export function updateSubscribeButton(state) {
    if(!getRightTabValidation(state))return;
    let companyName = "";
    if(state.toggleName === "left"){
        companyName = state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].name;
    }else{
        companyName = getSubscribeCompanies(state)[state.selectedCompanyIndex].name;
    }
    const isSubscribed = state.subscribedCompanyNameSet.has(companyName);

    document.querySelector("#subscribe_button_wrapper").innerHTML =
        isSubscribed ?
            `
            <div id="subscribe_button" class="pointer flex_row_center" >
                <img width="20" height="20" src="public/unsubscribe_icon.svg" />
            </div>
            `
            :
            `
            <div class="news_subscribe_button available-medium12" id="subscribe_button">
                <img src="public/subscribe_icon.svg" />
                구독하기
            </div>
            `
    ;

    const subscribeButtonDom = document.querySelector("#subscribe_button");
    subscribeButtonDom.addEventListener("click", function() {
        eventFunction(state,companyName,isSubscribed);
    });

    function eventFunction(state,companyName,isSubscribed) {
        if (isSubscribed) {
            state.subscribedCompanyNameSet.delete(companyName);
            if(state.selectedCompanyIndex > (getTabLength(state)-1)){
                state.selectedCompanyIndex-=1;
            }
        } else {
            state.subscribedCompanyNameSet.add(companyName);
        }
        drawTabList(state);
        if(state.toggleName === "right"){
            drawTabAnimationList(state);
        }
        updateTabAnimationStyle(state);
        drawArticles(state);
    }

}
