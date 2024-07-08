import { addDragEvent } from "./addDragEvent.js";
import { getCurrentArticle } from "./article.js";
import { getCurrentCompany, getSubscribeCompanies } from "./company.js";
import { TOGGLE } from "./magicValues.js";
import { updateSubscribeButton } from "./subscribe.js";
import { getTabLength, handleTabClick } from "./tab.js";

export function renderArticles(state) {
    updateSubscribeButton(state);
    renderArrow(state);
    switch (state.toggleName) {
        case TOGGLE.ALL:
            return renderAllToggleArticles(state);
        case TOGGLE.SUBSCRIBED:
            return renderSubscribedToggleArticles(state);
    }

}

function renderAllToggleArticles(state) {
    let articleBoxDom = document.querySelector(".news_letter_subject_box");
    articleBoxDom.innerHTML = "";

    let selectedSubject = state.articleDataList[state.selectedTabIndex];
    let companies = selectedSubject.companies.filter((company) => {
        if (state.toggleName == TOGGLE.SUBSCRIBED) return state.subscribedCompanyNameSet.has(company.name);
        else return true;
    });

    let cardImage = "";
    let cardTitle = "";

    if (companies.length !== 0) {
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
    let validCompanyNumber = getTabLength(state);

    if (validCompanyNumber === 0) {
        cardImageDom.classList.add("hidden");
        cardTitleDom.classList.add("hidden");
        companyHaederDom.style.display = "none";
    } else {
        cardImageDom.classList.remove("hidden");
        cardTitleDom.classList.remove("hidden");
        companyHaederDom.style.display = "flex";
    }

    cardImageDom.src = "";
    cardTitleDom.innerHTML = "";
    if (companies.length === 0) return;
    cardImageDom.src = cardImage;
    cardTitleDom.innerHTML = cardTitle;

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
                renderArticles(state);
            });
            articleBoxDom.appendChild(articleDom);
        });
    const articleCopyRightDom = document.createElement('div');
    articleCopyRightDom.classList.add('display-medium14');
    articleCopyRightDom.classList.add('color_879298');
    articleCopyRightDom.textContent = `${state.articleDataList[state.selectedTabIndex]
        .companies[state.selectedCompanyIndex].name} 언론사에서 직접 편집한 뉴스입니다.`;
    articleBoxDom.appendChild(articleCopyRightDom);
}

function renderSubscribedToggleArticles(state) {
    let articleBoxDom = document.querySelector(".news_letter_subject_box");
    articleBoxDom.innerHTML = "";

    let companies = getSubscribeCompanies(state);

    let cardImage = "";
    let cardTitle = "";

    if (companies.length !== 0) {
        let currentCompany = getCurrentCompany(state);
        let currentArticle = getCurrentArticle(state);
        document.querySelector("#register_date").textContent = currentArticle.registerDate;
        document.querySelector("#company_img").src = currentCompany.image;
        cardImage = currentArticle.image;
        cardTitle = currentArticle.title;
    }

    let cardImageDom = document.querySelector("#selected_article_img");
    let cardTitleDom = document.querySelector("#selected_article_description");
    let companyHaederDom = document.querySelector("#company_header");
    let validCompanyNumber = getTabLength(state);

    if (validCompanyNumber === 0) {
        cardImageDom.classList.add("hidden");
        cardTitleDom.classList.add("hidden");
        companyHaederDom.style.display = "none";
    } else {
        cardImageDom.classList.remove("hidden");
        cardTitleDom.classList.remove("hidden");
        companyHaederDom.style.display = "flex";
    }

    cardImageDom.src = "";
    cardTitleDom.innerHTML = "";
    if (companies.length === 0) return;
    cardImageDom.src = cardImage;
    cardTitleDom.innerHTML = cardTitle;

    companies[state.selectedTabIndex]
        .articles
        .filter((_, index) => index < 6)
        .forEach((article, articleIndex) => {
            const articleDom = document.createElement('div');
            articleDom.classList.add('available-medium16'); // 클래스 추가
            articleDom.classList.add('pointer');
            articleDom.classList.add('hover_underline');
            articleDom.textContent = article.title;
            articleDom.addEventListener("click", function () {
                state.selectedArticleIndex = articleIndex;
                renderArticles(state);
            });
            articleBoxDom.appendChild(articleDom);
        });
    const articleCopyRightDom = document.createElement('div');
    articleCopyRightDom.classList.add('display-medium14');
    articleCopyRightDom.classList.add('color_879298');
    articleCopyRightDom.textContent = `${state.articleDataList[state.selectedTabIndex]
        .companies[state.selectedCompanyIndex].name} 언론사에서 직접 편집한 뉴스입니다.`;
    articleBoxDom.appendChild(articleCopyRightDom);
}

export function renderTabList(state) {
    switch (state.toggleName) {
        case TOGGLE.ALL:
            renderLeftToggleTab(state);
            break;
        case TOGGLE.SUBSCRIBED:
            renderRightToggleTab(state);
            break;
    }
}

function renderLeftToggleTab(state) {
    let subjectNames = state.articleDataList.map(data => data.subject);
    renderTabItems(state, subjectNames);
}

function renderRightToggleTab(state) {
    let subscribedCompanyNames = Object.keys(state.companiesWithArticles).filter(companyName => state.subscribedCompanyNameSet.has(companyName));
    renderTabItems(state, subscribedCompanyNames);
}

function getTabDomWithCleanUp() {
    let tabDom = document.querySelector("#tab_wrapper");
    tabDom.innerHTML = "";
    return tabDom;
}

function renderTabItems(state, tabNames) {
    let mouseDownDate = new Date();
    let isMouseMoved = true;
    let tabDom = getTabDomWithCleanUp();
    tabNames.forEach((name, nameIndex) => {
        const tabItemDom = document.createElement('div');
        if (state.selectedTabIndex == nameIndex) {
            let additionalCountString = ""
            if (state.toggleName === TOGGLE.ALL) {
                const max = state.articleDataList[state.selectedArticleIndex].companies.length;
                additionalCountString = `
                    <div class="counter_box" >
                        ${max == 0 ? 0 : state.selectedCompanyIndex + 1}/${max}
                    </div>
                `;
            } else {
                additionalCountString = `
                    <img src="public/tab_arrow.svg" />
                `;
            }
            tabItemDom.classList.add('news_detail_tab_item_active', 'selected-bold14');
            tabItemDom.innerHTML = `
                <div>
                    ${name}
                </div>
                ${additionalCountString}
            `;

        } else {
            tabItemDom.classList.add('news_detail_tab_item', 'available-medium14');
            tabItemDom.textContent = name;
        }

        //부모 스크롤 이벤트와 중첩이라 click이벤트 -> mouse이벤트로 변경
        tabItemDom.addEventListener("mousedown", function (e) {
            mouseDownDate = new Date();
            isMouseMoved = false;
        });
        tabItemDom.addEventListener("mouseup", function (e) {
            const timeGap = new Date().getTime() - mouseDownDate.getTime();
            //대부분의 스크롤이 150밀리 이상은 걸리기에 150밀리로 지정 (사람 반응속도보다 빠름)
            if (isMouseMoved === false || timeGap < 150) {
                handleTabClick(nameIndex, state);
            }
        });
        tabItemDom.addEventListener("mousemove", function (e) {
            isMouseMoved = true;
        });

        tabDom.appendChild(tabItemDom);
    });
}



export function renderArrow(state) {
    switch (state.toggleName) {
        case TOGGLE.ALL:
            return renderAllToggleArrow(state);
        case TOGGLE.SUBSCRIBED:
            return renderSubscribedToggleArrow(state);
    }
}

function renderAllToggleArrow(state) {
    const max = getTabLength(state) - 1;
    const min = 0;
    const tabLastIndex = getTabLength(state) - 1;
    let leftArrowDom = document.querySelector(".left_arrow");
    let rightArrowDom = document.querySelector(".right_arrow");
    rightArrowDom.src = "public/right_arrow.svg";
    leftArrowDom.src = "public/left_arrow.svg";
    rightArrowDom.classList.add("arrow_hover");
    leftArrowDom.classList.add("arrow_hover");
    if (state.selectedCompanyIndex == max && state.selectedTabIndex == tabLastIndex) {
        rightArrowDom.src = "public/right_arrow_disabled.svg";
        rightArrowDom.classList.remove("arrow_hover");
    }
    if (state.selectedCompanyIndex == min && state.selectedTabIndex == min) {
        leftArrowDom.src = "public/left_arrow_disabled.svg";
        leftArrowDom.classList.remove("arrow_hover");
    }
}

function renderSubscribedToggleArrow(state) {
    const max = getTabLength(state) - 1;
    const min = 0;
    let leftArrowDom = document.querySelector(".left_arrow");
    let rightArrowDom = document.querySelector(".right_arrow");
    rightArrowDom.src = "public/right_arrow.svg";
    leftArrowDom.src = "public/left_arrow.svg";
    rightArrowDom.classList.add("arrow_hover");
    leftArrowDom.classList.add("arrow_hover");
    if (state.selectedTabIndex == max) {
        rightArrowDom.src = "public/right_arrow_disabled.svg";
        rightArrowDom.classList.remove("arrow_hover");
    }
    if (state.selectedTabIndex == min) {
        leftArrowDom.src = "public/left_arrow_disabled.svg";
        leftArrowDom.classList.remove("arrow_hover");
    }
}

export function renderTabAnimationList(state) {
    let tabAnimationDom = document.querySelector("#tab_animation_wrapper");
    tabAnimationDom.innerHTML = "";
    let tabDom = document.querySelector("#tab_wrapper");
    tabDom.childNodes.forEach((item, index) => {
        const tabAnimationItemDom = document.createElement('div');
        const tabAnimationHiderItemDom = document.createElement('div');
        const width = window.getComputedStyle(item).width;
        tabAnimationItemDom.id = `animation_${index}_tab`;
        tabAnimationHiderItemDom.style.overflowX = "hidden";
        tabAnimationHiderItemDom.style.backgroundColor = "#F5F7F9";
        if (state.selectedTabIndex === index) {
            // tabAnimationItemDom.style.zIndex = 1;
            tabAnimationHiderItemDom.style.backgroundColor = "#7890E7";
            tabAnimationItemDom.style.transition = "transform 1.2s ease";
            tabAnimationItemDom.style.transform = "translate(-100%)"
            tabAnimationItemDom.style.backgroundColor = "#4362D0";
        } else {
            // tabAnimationItemDom.style.zIndex = 2;
            tabAnimationItemDom.style.backgroundColor = "transparent";
        }
        tabAnimationHiderItemDom.style.minWidth = width;
        tabAnimationItemDom.style.width = width;
        tabAnimationHiderItemDom.style.height = "40px";
        tabAnimationItemDom.style.height = "40px";
        tabAnimationHiderItemDom.appendChild(tabAnimationItemDom);
        tabAnimationDom.appendChild(tabAnimationHiderItemDom);
    });
    addDragEvent(state);
}

export function renderToastPopup(message) {
    let toastPopupWrapperDom = document.querySelector("#toast_popup_wrapper");
    const toastDom = document.createElement('div');
    toastDom.classList.add('toast_popup');
    toastDom.textContent = message;
    toastPopupWrapperDom.appendChild(toastDom);
    setTimeout(function() {
        toastDom.remove();
    },3000);
}