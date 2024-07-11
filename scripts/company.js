import { TOGGLE } from "./magicNumber.js";
import state from "./store.js";

export function getCurrentCompany() {
    switch (state.toggleName) {
        case TOGGLE.ALL:
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex];
        case TOGGLE.SUBSCRIBED:
            return getSubscribeCompanies(state)[state.selectedTabIndex];
    }
}

export function getAllToggleCurrentCompanies() {
    return state.articleDataList[state.selectedTabIndex].companies;
}

export function getSubscribeCompanies() {
    return (Object.values(state.companiesWithArticles)).filter(company => state.subscribedCompanyNameSet.has(company.name));
}

export function getAllCompanyLength() {
    return Object.keys(state.companiesWithArticles).length;
}


