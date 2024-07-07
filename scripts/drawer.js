import { addDragEvent } from "./addDragEvent.js";
import { getCurrentArticle } from "./article.js";
import { getCurrentCompany, getSubscribeCompanies } from "./company.js";
import { updateSubscribeButton } from "./subscribe.js";
import { getTabLength, handleTabClick } from "./tab.js";

export function drawArticles(state) {
    updateSubscribeButton(state);
    drawArrow(state);
    switch (state.toggleName) {
        case "left":
            return drawAllToggleArticles(state);
        case "right":
            return drawSubscribedToggleArticles(state);
    }

}

function drawAllToggleArticles(state) {
    let articleBoxDom = document.querySelector(".news_letter_subject_box");
    articleBoxDom.innerHTML = "";

    let selectedSubject = state.articleDataList[state.selectedTabIndex];
    let companies = selectedSubject.companies.filter((company) => {
        if (state.toggleName == "right") return state.subscribedCompanyNameSet.has(company.name);
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
                drawArticles(state);
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

function drawSubscribedToggleArticles(state) {
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
                drawArticles(state);
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

export function drawTabList(state) {
    switch (state.toggleName) {
        case "left":
            drawLeftToggleTab(state);
            break;
        case "right":
            drawRightToggleTab(state);
            break;
    }
}

function drawLeftToggleTab(state) {
    let subjectNames = state.articleDataList.map(data => data.subject);
    drawTabItems(state, subjectNames);
}

function drawRightToggleTab(state, tabNames) {
    let subscribedCompanyNames = Object.keys(state.companiesWithArticles).filter(companyName => state.subscribedCompanyNameSet.has(companyName));
    drawTabItems(state, subscribedCompanyNames);
}

function getTabDomWithCleanUp() {
    let tabDom = document.querySelector("#tab_wrapper");
    tabDom.innerHTML = "";
    return tabDom;
}

function drawTabItems(state, tabNames) {
    let mouseDownDate = new Date();
    let isMouseMoved = true;
    let tabDom = getTabDomWithCleanUp();
    tabNames.forEach((name, nameIndex) => {
        const tabItemDom = document.createElement('div');
        if (state.selectedTabIndex == nameIndex) {
            let additionalCountString = ""
            if (state.toggleName === "left") {
                const max = getTabLength(state);
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



export function drawArrow(state) {
    switch (state.toggleName) {
        case "left":
            return drawAllToggleArrow(state);
        case "right":
            return drawSubscribedToggleArrow(state);
    }
}

function drawAllToggleArrow(state) {
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

function drawSubscribedToggleArrow(state) {
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

export function drawTabAnimationList(state) {
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
            tabAnimationItemDom.style.transition = "transform 0.2s ease";
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