import { getCurrentCompany } from "./company.js";
import { addDeletePopup, addToastPopup } from "./popup.js";
import { getSubscribedTabValidation } from "./tab.js";
import state from "./store.js";

export function updateSubscribeButton() {
    if (!getSubscribedTabValidation()) return;
    const companyName = getCurrentCompany()?.name;
    const isSubscribed = state.getter.getSubscribedCompanyNameSet().has(companyName);
    document.querySelector("#subscribe_button_wrapper").innerHTML = getSerializedSubscribeButtonHTML(isSubscribed);
    const subscribeButtonDom = document.querySelector("#subscribe_button");
    subscribeButtonDom.addEventListener("click", function () {
        subscribeEventFunction(companyName, isSubscribed);
    });
}

function subscribeEventFunction(companyName, isSubscribed) {
    if (isSubscribed) {
        addDeletePopup(companyName);
    } else {
        addToastPopup();
        subscribeCompany(companyName);
        updateSubscribeButton();
    }
}

function getSerializedSubscribeButtonHTML(isSubscribed) {
    return isSubscribed ?
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
}

export function loadSubscribeCompanies() {
    const tmp = parseSetData(loadSubscribeCompaniesFromLocalStorage());
    state.setter.setSubscribedCompanyNameSet(tmp);
}

export function subscribeCompany(company) {
    const subscribedCompanyNameSet = state.getter.getSubscribedCompanyNameSet();
    subscribedCompanyNameSet.add(company);
    saveSubscribeCompaniesToLocalStorage(subscribedCompanyNameSet);
}

export function unSubscribeCompany(company) {
    const subscribedCompanyNameSet = state.getter.getSubscribedCompanyNameSet();
    subscribedCompanyNameSet.delete(company);
    saveSubscribeCompaniesToLocalStorage(subscribedCompanyNameSet);
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