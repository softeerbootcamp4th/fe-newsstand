export function getCurrentCompany(state) {
    switch (state.toggleName) {
        case "left":
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex];
        case "right":
            return getSubscribeCompanies(state)[state.selectedTabIndex];
    }
}

export function getSubscribeCompanies(state) {
    return (Object.values(state.companiesWithArticles)).filter(company => state.subscribedCompanyNameSet.has(company.name));
}

export function getTotalCompanyLength(state) {
    return Object.keys(state.companiesWithArticles).length;
}

