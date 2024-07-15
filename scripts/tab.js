import { TOGGLE } from "./magicNumber.js";
import { renderArticles, renderTabAnimationList, renderTabList } from "./render.js";
import { resetstate } from "./reset.js";
import { cleanUpHTML } from "./util.js";
import state from "./store.js";

export function handleTabClick(selectedTabIndex, isDragging) {
    if (!isDragging) {
        resetstate();
        updateSelectedTabIndex(selectedTabIndex);
        renderTabList();
        renderArticles();
        renderTabAnimationList();
        updateTabAnimationStyle();
    }
}

export function updateSelectedTabIndex(newIndex) {
    state.setter.setSelectedTabIndex(newIndex);
}

export function getTabLength() {
    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            return state.getter.getArticleDataList().length;
        case TOGGLE.SUBSCRIBED:
            return state.getter.getSubscribedCompanyNameSet().size;
    }

}

export function updateTabAnimationStyle() {
    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            updateAllTabAnimation();
            break;
        case TOGGLE.SUBSCRIBED:
            updateSubscribedTabAnimation();
            break;
    }
}

function updateSubscribedTabAnimation() {
    const max = 1;
    if (!getSubscribedTabValidation()) return;
    updateTabAnimation(max);
}

function updateAllTabAnimation() {
    const max = state.getter.getArticleDataList()[state.getter.getSelectedArticleIndex()].companies.length - 1;
    updateTabAnimation(max);

}

function updateTabAnimation(max) {
    const animationTabDom = document.querySelector(`#animation_${state.getter.getSelectedTabIndex()}_tab`);
    let transform = "";
    if (max <= 0) {
        transform = "translate(-100%)";
    } else {

        const selectedCompanyIndex = state.getter.getSelectedCompanyIndex();
        switch (state.getter.getToggleName()) {
            case TOGGLE.ALL:
                transform = `translate(-${100 - ((selectedCompanyIndex + 1) / max * 100)}%)`;
                break;
            case TOGGLE.SUBSCRIBED:
                transform = `translate(calc(-${100 - ((selectedCompanyIndex + 1) / max * 100)}% - 10px))`;
                break;
        }
    }
    if (animationTabDom) {
        animationTabDom.style.transform = transform;
    }
}


export function getSubscribedTabValidation() {
    return !(state.getter.getToggleName() === TOGGLE.SUBSCRIBED && state.getter.getSubscribedCompanyNameSet().size === 0);
}

export function getTabDomWithCleanUp() {
    const tabDom = document.querySelector("#tab_wrapper");
    cleanUpHTML(tabDom);
    return tabDom;
}