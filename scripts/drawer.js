import { getAvailableCompanyNumber,getCurrentArticle } from "./article.js";
import { getCurrentCompany } from "./company.js";
import { addSubscribeEvent } from "./subscribe.js";
import { getTabLength, handleTabClick } from "./tap.js";
export function drawArticles(state) {
    addSubscribeEvent(state);
    drawArrow(state);
    let articleBoxDom = document.querySelector(".news_letter_title_box");
    articleBoxDom.innerHTML = "";

    let selectedTitle = state.articleDataList[state.titleIndex];
    let companies=selectedTitle.companies.filter((company) => {
        if(state.toggleName == "right")return state.subscribedCompanyNameSet.has(company.name);
        else return true;
    });

    let cardImage = "";
    let cardTitle = "";

    if(companies.length !== 0 ){
        let currentCompany = getCurrentCompany(state);
        let currentArticle = getCurrentArticle(state);
        document.querySelector("#register_date").textContent = currentArticle.registerDate;
        document.querySelector("#company_img").src = currentCompany.image;
        cardImage = companies[state.selectedCompanyIndex]
        .articles[state.selectedArticleIndex]
        .image;
        cardTitle = companies[state.selectedCompanyIndex]
        .articles[state.selectedArticleIndex]
        .title;
    }

    let cardImageDom = document.querySelector("#selected_article_img");
    let cardTitleDom = document.querySelector("#selected_article_description");
    let companyHaederDom = document.querySelector("#company_header");
    let validCompanyNumber = getAvailableCompanyNumber(state);

    if(validCompanyNumber===0){
        cardImageDom.classList.add("hidden");
        cardTitleDom.classList.add("hidden");
        companyHaederDom.style.display = "none";
    }else{
        cardImageDom.classList.remove("hidden");
        cardTitleDom.classList.remove("hidden");
        companyHaederDom.style.display = "flex";
    }

    cardImageDom.src="";
    cardTitleDom.innerHTML="";
    if(companies.length===0)return;
    cardImageDom.src=cardImage;
    cardTitleDom.innerHTML=cardTitle;
    
    companies[state.selectedCompanyIndex]
        .articles
        .forEach((article, articleIndex) => {
            const articleDom = document.createElement('div');
            articleDom.classList.add('available-medium16'); // 클래스 추가
            articleDom.classList.add('pointer');
            articleDom.classList.add('hover_underline');
            articleDom.textContent = article.title;
            articleDom.addEventListener("click", function () {
                state.selectedArticleIndex = articleIndex;
                drawArticles(state);
            });
            articleBoxDom.appendChild(articleDom);
        });
    const articleCopyRightDom = document.createElement('div');
    articleCopyRightDom.classList.add('display-medium14');
    articleCopyRightDom.classList.add('color_879298');
    articleCopyRightDom.textContent = `${state.articleDataList[state.titleIndex]
        .companies[state.selectedCompanyIndex].name} 언론사에서 직접 편집한 뉴스입니다.`;
    articleBoxDom.appendChild(articleCopyRightDom);
}


export function drawTapList(state) {
    let tap = document.querySelector(".news_detail_tap_box");
    tap.innerHTML = "";
    state.articleDataList.forEach(articleObject => {
        const tapItem = document.createElement('div');
        let max = getAvailableCompanyNumber(state);
        if(state.titleIndex == articleObject.index){
            tapItem.classList.add('news_detail_tap_item_active');
            tapItem.textContent = articleObject.title+`${max == 0 ? 0 : state.selectedCompanyIndex+1}/${max}`;
        }else{
            tapItem.classList.add('news_detail_tap_item');
            tapItem.textContent = articleObject.title;
        }
        tapItem.addEventListener("click", function () {
            handleTabClick(articleObject.index, state);
        });
        tap.appendChild(tapItem);
    });
}
 
 export function drawArrow(state) {
    const max = getAvailableCompanyNumber(state)-1;
    const min = 0;
    const tabLastIndex = getTabLength(state) - 1;
    let leftArrowDom = document.querySelector(".left_arrow");
    let rightArrowDom = document.querySelector(".right_arrow");
    rightArrowDom.src = "public/right_arrow.svg";
    leftArrowDom.src = "public/left_arrow.svg";
    rightArrowDom.classList.add("arrow_hover");
    leftArrowDom.classList.add("arrow_hover");
    if(state.selectedCompanyIndex==max && state.titleIndex == tabLastIndex){
        rightArrowDom.src = "public/right_arrow_disabled.svg";
        rightArrowDom.classList.remove("arrow_hover");
    }
    if(state.selectedCompanyIndex==min && state.titleIndex == min){
        leftArrowDom.src = "public/left_arrow_disabled.svg";
        leftArrowDom.classList.remove("arrow_hover");
    }
 }

 