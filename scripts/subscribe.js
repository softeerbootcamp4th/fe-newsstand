import { getSubscribeCompanies } from "./company.js";
import { renderArticles, renderTabAnimationList, renderTabList } from "./render.js";
import { addToastPopup } from "./popup.js";
import { getRightTabValidation } from "./tab.js";
import { getTabLength } from "./tab.js";
import { updateTabAnimationStyle } from "./tab.js";
import { TOGGLE } from "./magicValues.js";

export function updateSubscribeButton(state) {
    if (!getRightTabValidation(state)) return;
    let companyName = "";
    switch (state.toggleName) {
        case TOGGLE.ALL:
            companyName = state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].name;
            break;
        case TOGGLE.SUBSCRIBED:
            companyName = getSubscribeCompanies(state)[state.selectedCompanyIndex].name;
            break;
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
    subscribeButtonDom.addEventListener("click", function () {
        eventFunction(state, companyName, isSubscribed);
    });

    function eventFunction(state, companyName, isSubscribed) {
        if (isSubscribed) {
            state.subscribedCompanyNameSet.delete(companyName);
            if (state.selectedCompanyIndex > (getTabLength(state) - 1)) {
                state.selectedCompanyIndex -= 1;
            }
        } else {
            addToastPopup(companyName);
            state.subscribedCompanyNameSet.add(companyName);
        }
        renderTabList(state);
        if (state.toggleName === TOGGLE.SUBSCRIBED) {
            renderTabAnimationList(state);
        }
        updateTabAnimationStyle(state);
        renderArticles(state);
    }

}

export function loadSubscribeCompanies(state) {
    state.subscribedCompanyNameSet = new Set(parseSetData(loadSubscribeCompaniesFromLocalStorage()));
}

export function subscribeCompany(state, company) {
    state.subscribedCompanyNameSet.add(company);
    saveSubscribeCompaniesToLocalStorage(state.subscribedCompanyNameSet);
}

export function unSubscribeCompany(state, company) {
    state.subscribedCompanyNameSet.delete(company);
    saveSubscribeCompaniesToLocalStorage(state.subscribedCompanyNameSet);
}

function loadSubscribeCompaniesFromLocalStorage() {
    return localStorage.getItem("subscription");
}

function saveSubscribeCompaniesToLocalStorage(companiesSet) {
    return localStorage.setItem("subscription", stringifySetData(companiesSet));
}

function stringifySetData(setData) {
    return JSON.stringify(Array.from(setData));
}

function parseSetData(stringArray) {
    return new Set(JSON.parse(stringArray));
}