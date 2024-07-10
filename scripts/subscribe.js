import { getCurrentCompany, getSubscribeCompanies } from "./company.js";
import { addDeletePopup, addToastPopup } from "./popup.js";
import { getSubscribedTabValidation } from "./tab.js";

export function updateSubscribeButton(state) {
    if (!getSubscribedTabValidation(state)) return;
    const companyName = getCurrentCompany(state).name;
    const isSubscribed = state.subscribedCompanyNameSet.has(companyName);
    document.querySelector("#subscribe_button_wrapper").innerHTML = getSerializedSubscribeButtonHTML(isSubscribed);
    const subscribeButtonDom = document.querySelector("#subscribe_button");
    subscribeButtonDom.addEventListener("click", function () {
        subscribeEventFunction(state, companyName, isSubscribed);
    });
}

function subscribeEventFunction(state, companyName, isSubscribed) {
    if (isSubscribed) {
        addDeletePopup(state, companyName);
    } else {
        addToastPopup(state);
        subscribeCompany(state, companyName);
        updateSubscribeButton(state);
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

export function loadSubscribeCompanies(state) {
    let tmp = parseSetData(loadSubscribeCompaniesFromLocalStorage());
    state.subscribedCompanyNameSet = tmp;
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