import { getCurrentCompany } from "./company.js";
import { TOGGLE } from "./magicNumber.js";
import { assignCSS } from "./util.js";
import state from "./store.js";

 export function getCurrentArticle() {
    switch(state.toggleName){
        case TOGGLE.ALL:
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].articles[state.selectedArticleIndex];
        case TOGGLE.SUBSCRIBED:
            return getCurrentCompany(state) ? getCurrentCompany(state).articles[state.selectedArticleIndex] : undefined;
    }  
 }

 export function getCurrentArticleList() {
    switch(state.toggleName){
        case TOGGLE.ALL:
            return state.articleDataList[state.selectedTabIndex].companies[state.selectedCompanyIndex].articles;
        case TOGGLE.SUBSCRIBED:
            return state.companiesWithArticles[getCurrentCompany(state).name].articles;
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
 

