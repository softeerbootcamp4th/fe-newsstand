import { getCurrentCompany, getSubscribeCompanies } from "./company.js";

 export function getCurrentArticle(state) {
    switch(state.toggleName){
        case "left":
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].articles[state.selectedArticleIndex];
        case "right":
            return getCurrentCompany(state).articles[state.selectedArticleIndex];
    }
    
 }

 export function getCurrentArticleList(state) {
    switch(state.toggleName){
        case "left":
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].articles;
        case "right":
            return state.companiesWithArticles[getCurrentCompany(state).name].articles;
    }
 }