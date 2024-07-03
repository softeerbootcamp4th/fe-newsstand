export function getCurrentCompany(state) {
    return state.articleDataList[state.titleIndex].companies[state.selectedCompanyIndex];
}