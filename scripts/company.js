import { TOGGLE } from "./magicNumber.js";

export function getCurrentCompany(state) {
    switch (state.toggleName) {
        case TOGGLE.ALL:
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex];
        case TOGGLE.SUBSCRIBED:
            return getSubscribeCompanies(state)[state.selectedTabIndex];
    }
}

export function getAllToggleCurrentCompanies(state) {
    return state.articleDataList[state.selectedTabIndex].companies;
}

export function getSubscribeCompanies(state) {
    return (Object.values(state.companiesWithArticles)).filter(company => state.subscribedCompanyNameSet.has(company.name));
}

export function getAllCompanyLength(state) {
    return Object.keys(state.companiesWithArticles).length;
}

