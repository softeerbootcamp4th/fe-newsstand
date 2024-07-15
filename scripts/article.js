import { getCurrentCompany } from "./company.js";
import { TOGGLE } from "./magicNumber.js";
import { assignCSS } from "./util.js";
import state from "./store.js";

const articleDataList = state.getter.getArticleDataList();
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    const selectedCompanyIndex = state.getter.getSelectedCompanyIndex();
    const selectedArticleIndex = state.getter.getSelectedArticleIndex();
    const companiesWithArticles = state.getter.getCompaniesWithArticles();

 export function getCurrentArticle() {
    const articleDataList = state.getter.getArticleDataList();
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    const selectedCompanyIndex = state.getter.getSelectedCompanyIndex();
    const selectedArticleIndex = state.getter.getSelectedArticleIndex();
    switch(state.getter.getToggleName()){
        case TOGGLE.ALL:
            return articleDataList[selectedTabIndex].companies[selectedCompanyIndex].articles[selectedArticleIndex];
        case TOGGLE.SUBSCRIBED:
            return getCurrentCompany() ? getCurrentCompany().articles[selectedArticleIndex] : undefined;
    }  
 }

 export function getCurrentArticleList() {
    const articleDataList = state.getter.getArticleDataList();
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    const selectedCompanyIndex = state.getter.getSelectedCompanyIndex();
    const companiesWithArticles = state.getter.getCompaniesWithArticles();
    switch(state.getter.getToggleName()){
        case TOGGLE.ALL:
            return articleDataList[selectedTabIndex].companies[selectedCompanyIndex].articles;
        case TOGGLE.SUBSCRIBED:
            return companiesWithArticles[getCurrentCompany().name].articles;
    }
 }

export function updateArticleBox(){
    const currentCompany = getCurrentCompany();
    const currentArticle = getCurrentArticle();

    const registerDateDom = document.querySelector("#register_date");
    const companyImgDom = document.querySelector("#company_img");

    const cardImageDom = document.querySelector("#selected_article_img");
    const cardTitleDom = document.querySelector("#selected_article_description");

    const companyHeaderDom =  document.querySelector("#company_header");

    if(currentArticle===undefined || currentArticle===undefined){
        //clean up
        registerDateDom.textContent = "";
        companyImgDom.src = "";
        cardImageDom.classList.add("hidden");
        cardImageDom.src = "";
        cardTitleDom.classList.add("hidden");
        cardTitleDom.innerHTML = "";
        assignCSS(companyHeaderDom, { display: "none" });
    }else{
        //update
        registerDateDom.textContent = currentArticle.registerDate;
        companyImgDom.src = currentCompany.image;
        cardImageDom.classList.remove("hidden");
        cardImageDom.src = currentArticle.image;
        cardTitleDom.classList.remove("hidden");
        cardTitleDom.innerHTML = currentArticle.title;
        assignCSS(companyHeaderDom, { display: "flex" });
    }
}
 

