import { getCurrentCompany, getSubscribeCompanies } from "./company.js";
import { TOGGLE } from "./magicNumber.js";

 export function getCurrentArticle(state) {
    switch(state.toggleName){
        case TOGGLE.ALL:
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].articles[state.selectedArticleIndex];
        case TOGGLE.SUBSCRIBED:
            return getCurrentCompany(state).articles[state.selectedArticleIndex];
    }  
 }

 export function getCurrentArticleList(state) {
    switch(state.toggleName){
        case TOGGLE.ALL:
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].articles;
        case TOGGLE.SUBSCRIBED:
            return state.companiesWithArticles[getCurrentCompany(state).name].articles;
    }
 }