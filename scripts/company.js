export function getCurrentCompany(state) {
    return state.articleDataList[state.titleIndex].companies[state.selectedCompanyIndex];
}

export function getSubscribeCompanies(state) {
    const currentCompanise = state.articleDataList[state.titleIndex].companies;
    const subscribedCompanies = currentCompanise.filter(company => state.subscribedCompanyNameSet.has(company.name));
    return subscribedCompanies;
}