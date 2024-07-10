import { addDragEvent } from "./drag.js";
import { getCurrentArticle, getCurrentArticleList, updateArticleBox } from "./article.js";
import { getCurrentCompany, getSubscribeCompanies, getAllToggleCurrentCompanies } from "./company.js";
import { TOGGLE } from "./magicNumber.js";
import { generateToastPopupDom } from "./popup.js";
import { resetstate } from "./reset.js";
import { updateSubscribeButton } from "./subscribe.js";
import { getTabDomWithCleanUp, getTabLength, handleTabClick, updateTabAnimationStyle } from "./tab.js";
import { assignCSS, cleanUpHTML } from "./util.js";
import { updateAllToggleArrow, updateSubscribedToggleArrow } from "./toggle.js";

export function renderDefaultSceen(state) {
    resetstate(state);
    renderTabList(state);
    renderArticles(state);
    renderTabAnimationList(state);
    updateTabAnimationStyle(state);
}

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
    const companies = getAllToggleCurrentCompanies(state);
    const articleBoxDom = document.querySelector(".news_letter_subject_box");
    const validCompanyLength = companies.length;
    cleanUpHTML(articleBoxDom);
    updateArticleBox(state, validCompanyLength);

    if (validCompanyLength === 0) return;
    renderArticleText(state, companies[state.selectedCompanyIndex].articles);
}


function renderSubscribedToggleArticles(state) {
    const companies = getSubscribeCompanies(state);
    const articleBoxDom = document.querySelector(".news_letter_subject_box");
    const validCompanyLength = companies.length;

    cleanUpHTML(articleBoxDom);
    updateArticleBox(state, validCompanyLength);

    if (validCompanyLength === 0) return;
    renderArticleText(state, companies[state.selectedTabIndex].articles);

}

function renderArticleText(state, articles) {
    const articleBoxDom = document.querySelector(".news_letter_subject_box");
    articles
        .filter((_, index) => index < 6)
        .forEach((article, articleIndex) => {
            const articleDom = document.createElement('div');
            articleDom.classList.add('available-medium16', 'pointer', 'hover_underline'); // 클래스 추가
            articleDom.textContent = article.title;
            articleDom.addEventListener("click", function () {
                state.selectedArticleIndex = articleIndex;
                renderArticles(state);
            });
            articleBoxDom.appendChild(articleDom);
        });
    const articleCopyRightDom = document.createElement('div');
    articleCopyRightDom.classList.add('display-medium14', 'color_879298');
    articleCopyRightDom.textContent = getCurrentCompany(state).name + " 언론사에서 직접 편집한 뉴스입니다.";
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
    const subjectNames = state.articleDataList.map(data => data.subject);
    renderTabItems(state, subjectNames);
}

function renderRightToggleTab(state) {
    const subscribedCompanyNames = Object.keys(state.companiesWithArticles).filter(companyName => state.subscribedCompanyNameSet.has(companyName));
    renderTabItems(state, subscribedCompanyNames);
}



function renderTabItems(state, tabNames) {
    let mouseDownDate = new Date();
    const tabDom = getTabDomWithCleanUp();
    let isMouseMoved = true;
    tabNames.forEach((name, nameIndex) => {
        const tabItemDom = document.createElement('div');
        if (state.selectedTabIndex == nameIndex) {
            let additionalTailString = ""
            if (state.toggleName === TOGGLE.ALL) {
                const max = state.articleDataList[state.selectedArticleIndex].companies.length;
                additionalTailString = `
                    <div class="counter_box" >
                        ${max == 0 ? 0 : state.selectedCompanyIndex + 1}/${max}
                    </div>
                `;
            } else {
                additionalTailString = `
                    <img src="public/tab_arrow.svg" />
                `;
            }
            tabItemDom.classList.add('news_detail_tab_item_active', 'selected-bold14');
            tabItemDom.innerHTML = `
                <div>
                    ${name}
                </div>
                ${additionalTailString}
            `;

        } else {
            tabItemDom.classList.add('news_detail_tab_item', 'available-medium14');
            tabItemDom.textContent = name;
        }

        //부모 스크롤 이벤트와 중첩이라 click이벤트 -> mouse이벤트로 변경
        tabItemDom.addEventListener("mousedown", function () {
            mouseDownDate = new Date();
            isMouseMoved = false;
        });
        tabItemDom.addEventListener("mouseup", function () {
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
            return updateAllToggleArrow(state);
        case TOGGLE.SUBSCRIBED:
            return updateSubscribedToggleArrow(state);
    }
}

export function renderTabAnimationList(state) {
    const tabAnimationDom = document.querySelector("#tab_animation_wrapper");
    cleanUpHTML(tabAnimationDom);
    const tabDom = document.querySelector("#tab_wrapper");

    tabDom.childNodes.forEach((item, index) => {
        const tabAnimationItemDom = document.createElement('div');
        const tabAnimationHiderItemDom = document.createElement('div');
        const tabItemWidth = window.getComputedStyle(item).width;

        tabAnimationItemDom.id = `animation_${index}_tab`;

        assignCSS(tabAnimationHiderItemDom, {
            overflowX: "hidden",
            backgroundColor: "#F5F7F9",
            height: "40px",
        });

        if (state.selectedTabIndex === index) {
            assignCSS(tabAnimationHiderItemDom, { backgroundColor: "#7890E7" });
            assignCSS(tabAnimationItemDom, {
                transition: "transform 1.2s ease",
                transform: "translate(-100%)",
                backgroundColor: "#4362D0"
            });
        } else {
            assignCSS(tabAnimationItemDom, { backgroundColor: "transparent" });
        }

        assignCSS(tabAnimationHiderItemDom, {
            minWidth: tabItemWidth,
        });
        assignCSS(tabAnimationItemDom, {
            width: tabItemWidth,
            height: "40px",
        });
        
        tabAnimationHiderItemDom.appendChild(tabAnimationItemDom);
        tabAnimationDom.appendChild(tabAnimationHiderItemDom);
    });
    addDragEvent(state);
}

export function renderPopup(toastPopupDom) {
    const toastPopupWrapperDom = document.querySelector("#popup_wrapper");
    toastPopupWrapperDom.appendChild(toastPopupDom);
}