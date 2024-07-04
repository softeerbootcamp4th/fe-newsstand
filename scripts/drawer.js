import { getAvailableCompanyNumber,getCurrentArticle } from "./article.js";
import { getCurrentCompany } from "./company.js";
import { updateSubscribeButton } from "./subscribe.js";
import { getTabLength, handleTabClick, updateTabAnimationStyle } from "./tap.js";
export function drawArticles(state) {
    updateSubscribeButton(state);
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
    let tapDom = document.querySelector("#tab_wrapper");
    tapDom.innerHTML = "";
    state.articleDataList.forEach(articleObject => {
        const tapItemDom = document.createElement('div');
        let max = getAvailableCompanyNumber(state);
        if(state.titleIndex == articleObject.index){
            tapItemDom.classList.add('news_detail_tap_item_active','selected-bold14');
            tapItemDom.innerHTML = `
            <span>
                ${articleObject.title}
            </span>
            <span class="counter_box" >
                ${max == 0 ? 0 : state.selectedCompanyIndex+1}/${max}
            </span>`;
        }else{
            tapItemDom.classList.add('news_detail_tap_item','available-medium14');
            tapItemDom.textContent = articleObject.title;
        }
        tapItemDom.addEventListener("click", function () {
            handleTabClick(articleObject.index, state);
        });
        tapDom.appendChild(tapItemDom);
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

 export function drawTapAnimationList(state) {
    let tapAnimationDom = document.querySelector("#tab_animation_wrapper");
    tapAnimationDom.innerHTML = "";
    let tapDom = document.querySelector("#tab_wrapper");
    tapDom.childNodes.forEach((item,index) => {
        const tapAnimationItemDom = document.createElement('div');
        const tapAnimationHiderItemDom = document.createElement('div');
        const width = window.getComputedStyle(item).width;
        tapAnimationItemDom.id=`title_${index}_tap`;
        tapAnimationHiderItemDom.style.overflowX = "hidden";
        tapAnimationHiderItemDom.style.backgroundColor = "#F5F7F9";
        if(state.titleIndex === index){
            // tapAnimationItemDom.style.zIndex = 1;
            tapAnimationHiderItemDom.style.backgroundColor = "#7890E7";
            tapAnimationItemDom.style.transition = "transform 0.2s ease";
            tapAnimationItemDom.style.transform = "translate(-100%)"
            tapAnimationItemDom.style.backgroundColor = "#4362D0";
        }else{
            // tapAnimationItemDom.style.zIndex = 2;
            tapAnimationItemDom.style.backgroundColor = "transparent";
        }
        tapAnimationHiderItemDom.style.width = width;
        tapAnimationItemDom.style.width = width;
        tapAnimationHiderItemDom.style.height = "40px";
        tapAnimationItemDom.style.height = "40px";
        tapAnimationHiderItemDom.appendChild(tapAnimationItemDom);
        tapAnimationDom.appendChild(tapAnimationHiderItemDom);
    })
 }