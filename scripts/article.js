export function getAvailableCompanyNumber(state) {
    let max = state.articleDataList[state.titleIndex].companies.length;
    if(state.toggleName=="right"){
        max = state.articleDataList[state.titleIndex].companies.filter(company=>state.subscribedCompanyNameSet.has(company.name)).length;
    }
    return max;
 }

 export function getCurrentArticle(state) {
    return state.articleDataList[state.titleIndex].companies[state.selectedCompanyIndex].articles[state.selectedArticleIndex];
 }