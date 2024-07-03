import { getAvailableCompanyNumber } from "./article.js";
import { drawArticles, drawTapList } from "./drawer.js";

export function addSubscribeEvent(state) {
    if(getAvailableCompanyNumber(state)===0)return;
    const companyName = state.articleDataList[state.titleIndex].companies[state.selectedCompanyIndex].name;
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
    subscribeButtonDom.addEventListener("click", eventFunction);

    function eventFunction() {
        const companyName = state.articleDataList[state.titleIndex].companies[state.selectedCompanyIndex].name;
        const isSubscribed = state.subscribedCompanyNameSet.has(companyName);
        if (isSubscribed) {
            state.subscribedCompanyNameSet.delete(companyName);
        } else {
            state.subscribedCompanyNameSet.add(companyName);
        }
        drawTapList(state);
        drawArticles(state);
    }

}
