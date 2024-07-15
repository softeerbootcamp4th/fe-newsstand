import { addDragEvent } from "./drag.js";
import { updateArticleBox } from "./article.js";
import { getCurrentCompany, getSubscribeCompanies, getAllToggleCurrentCompanies } from "./company.js";
import { TOGGLE } from "./magicNumber.js";
import { resetstate } from "./reset.js";
import { updateSubscribeButton } from "./subscribe.js";
import { getTabDomWithCleanUp, getTabLength, handleTabClick, updateTabAnimationStyle } from "./tab.js";
import { assignCSS, cleanUpHTML } from "./util.js";
import { updateAllToggleArrow, updateSubscribedToggleArrow } from "./toggle.js";
import state from "./store.js";

export function renderDefaultSceen() {
    resetstate();
    renderTabList();
    renderArticles();
    renderTabAnimationList();
    updateTabAnimationStyle();
}

export function renderArticles() {
    updateSubscribeButton();
    renderArrow();

    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            return renderAllToggleArticles();
        case TOGGLE.SUBSCRIBED:
            return renderSubscribedToggleArticles();
    }
}

function renderAllToggleArticles() {
    const companies = getAllToggleCurrentCompanies();
    const articleBoxDom = document.querySelector(".news_letter_subject_box");
    const selectedCompanyIndex = state.getter.getSelectedCompanyIndex();
    const validCompanyLength = companies.length;
    cleanUpHTML(articleBoxDom);
    updateArticleBox(validCompanyLength);

    if (validCompanyLength === 0) return;
    renderArticleText(companies[selectedCompanyIndex].articles);
}

function renderSubscribedToggleArticles() {
    const companies = getSubscribeCompanies();
    const articleBoxDom = document.querySelector(".news_letter_subject_box");
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    const validCompanyLength = companies.length;

    cleanUpHTML(articleBoxDom);
    updateArticleBox(validCompanyLength);

    if (validCompanyLength === 0) return;
    renderArticleText(companies[selectedTabIndex].articles);

}

function renderArticleText(articles) {
    const articleBoxDom = document.querySelector(".news_letter_subject_box");
    articles
        .filter((_, index) => index < 6)
        .forEach((article, articleIndex) => {
            const articleDom = document.createElement('div');
            articleDom.classList.add('available-medium16', 'pointer', 'hover_underline'); // 클래스 추가
            articleDom.textContent = article.title;
            articleDom.addEventListener("click", function () {
                state.setter.setSelectedArticleIndex(articleIndex);
                renderArticles();
            });
            articleBoxDom.appendChild(articleDom);
        });
    const articleCopyRightDom = document.createElement('div');
    articleCopyRightDom.classList.add('display-medium14', 'color_879298');
    articleCopyRightDom.textContent = getCurrentCompany().name + " 언론사에서 직접 편집한 뉴스입니다.";
    articleBoxDom.appendChild(articleCopyRightDom);
}

export function renderTabList() {
    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            renderLeftToggleTab();
            break;
        case TOGGLE.SUBSCRIBED:
            renderRightToggleTab();
            break;
    }
}

function renderLeftToggleTab() {
    const subjectNames = state.getter.getArticleDataList().map(data => data.subject);
    renderTabItems(subjectNames);
}

function renderRightToggleTab() {
    const subscribedCompanyNames = Object.keys(state.getter.getCompaniesWithArticles()).filter(companyName => state.getter.getSubscribedCompanyNameSet().has(companyName));
    renderTabItems(subscribedCompanyNames);
}



function renderTabItems(tabNames) {
    let mouseDownDate = new Date();
    const tabDom = getTabDomWithCleanUp();
    let isMouseMoved = true;
    tabNames.forEach((name, nameIndex) => {
        const tabItemDom = document.createElement('div');
        if (state.getter.getSelectedTabIndex() == nameIndex) {
            let additionalTailString = ""
            if (state.getter.getToggleName() === TOGGLE.ALL) {
                const max = state.getter.getArticleDataList()[state.getter.getSelectedArticleIndex()].companies.length;
                additionalTailString = `
                    <div class="counter_box" >
                        ${max == 0 ? 0 : state.getter.getSelectedCompanyIndex() + 1}/${max}
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
                handleTabClick(nameIndex);
            }
        });
        tabItemDom.addEventListener("mousemove", function (e) {
            isMouseMoved = true;
        });

        tabDom.appendChild(tabItemDom);
    });
}

export function renderArrow() {
    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            return updateAllToggleArrow();
        case TOGGLE.SUBSCRIBED:
            return updateSubscribedToggleArrow();
    }
}

export function renderTabAnimationList() {
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

        if (state.getter.getSelectedTabIndex() === index) {
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
    addDragEvent();
}

export function renderPopup(toastPopupDom) {
    const toastPopupWrapperDom = document.querySelector("#popup_wrapper");
    toastPopupWrapperDom.appendChild(toastPopupDom);
}