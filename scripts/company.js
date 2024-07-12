import { TOGGLE } from "./magicNumber.js";
import state from "./store.js";

export function getCurrentCompany() {
    const articleDataList = state.getter.getArticleDataList();
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    const selectedCompanyIndex = state.getter.getSelectedCompanyIndex();
    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            return articleDataList[selectedTabIndex].companies[selectedCompanyIndex];
        case TOGGLE.SUBSCRIBED:
            return getSubscribeCompanies()[selectedTabIndex];
    }
}

export function getAllToggleCurrentCompanies() {
    const articleDataList = state.getter.getArticleDataList();
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    return articleDataList[selectedTabIndex].companies;
}

export function getSubscribeCompanies() {
    const subscribedCompanyNameSet = state.getter.getSubscribedCompanyNameSet();
    const companiesWithArticles = state.getter.getCompaniesWithArticles();
    return (Object.values(companiesWithArticles)).filter(company => subscribedCompanyNameSet.has(company.name));
}

export function getAllCompanyLength() {
    const companiesWithArticles = state.getter.getCompaniesWithArticles();
    return Object.keys(companiesWithArticles).length;
}


