import { getAllCompanyLength } from "./company.js";
import { DIRECTION, TIME, TOGGLE } from "./magicNumber.js";
import { renderArticles, renderTabAnimationList, renderTabList } from "./render.js";
import { getTabLength, updateTabAnimationStyle } from "./tab.js";
import state from "./store.js";

export function addEventToRotatingArrow() {
    setInterval(function () {
        handleCompanySwipe(DIRECTION.RIGHT);
    }, TIME.SECOND * 1);
    document.querySelector(".right_arrow").addEventListener("click", function () {
        handleCompanySwipe(DIRECTION.RIGHT);
    });
    document.querySelector(".left_arrow").addEventListener("click", function () {
        handleCompanySwipe(DIRECTION.LEFT);
    });
}

export function handleCompanySwipe(direction) {
    const isNeedToResetAnimationStyle = rotate(direction);
    renderTabList();
    updateTabAnimationStyle();
    renderArticles();
    if (isNeedToResetAnimationStyle) {
        renderTabAnimationList();
        updateTabAnimationStyle();
    }
}

function rotate(direction, animationResetPointer = { isNeed: false }) {
    state.setter.setSelectedArticleIndex(0);
    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            return rotateAllToglePage(direction, animationResetPointer);
        case TOGGLE.SUBSCRIBED:
            return rotateSubscribedTogglePage(direction, animationResetPointer);
    }
}

function rotateSubscribedTogglePage(direction, animationResetPointer) {
    const { tabLastIndex } = getRotateIndexes();
    switch (direction) {
        case DIRECTION.LEFT:
            if (state.getter.getSelectedTabIndex() > 0) {
                pageGoBack(true);
                animationResetPointer.isNeed = true;
            }
            break;
        case DIRECTION.RIGHT:
            if (state.getter.getSelectedTabIndex() < tabLastIndex) {
                pageGoForward();
                animationResetPointer.isNeed = true;
            }
            break;
    }
    return animationResetPointer.isNeed;
}

function rotateAllToglePage(direction, animationResetPointer) {
    //코드 분리 가능하면 추후에 진행
    const { maxIndex, minIndex, tabLastIndex } = getRotateIndexes();
    const validToGo = maxIndex !== -1;

    switch (direction) {
        case DIRECTION.LEFT:
            const firstTabCondition = state.getter.getSelectedTabIndex() === minIndex;
            const firstCompanyCondition = state.getter.getSelectedCompanyIndex() === minIndex;
            if (!validToGo && !firstTabCondition) {
                animationResetPointer.isNeed = true;
                pageGoBack();
                rotate(animationResetPointer);
            } else {
                if (!(firstCompanyCondition && firstTabCondition)) {
                    if (firstCompanyCondition) {
                        animationResetPointer.isNeed = true;
                        pageGoBack();
                    } else if (validToGo) {
                        state.setter.setSelectedCompanyIndex(state.getter.getSelectedCompanyIndex() - 1);
                    }
                }
            }
            break;

        case DIRECTION.RIGHT:
            const lastTabCondition = state.getter.getSelectedTabIndex() === tabLastIndex;
            const lastCompanyCondition = state.getter.getSelectedCompanyIndex() === maxIndex;
            if (!validToGo && !lastTabCondition) {
                animationResetPointer.isNeed = true;
                pageGoForward();
                rotate(animationResetPointer);
            } else {
                if (!(lastCompanyCondition && lastTabCondition)) {
                    if (lastCompanyCondition) {
                        animationResetPointer.isNeed = true;
                        pageGoForward();
                    } else if (validToGo) {
                        state.setter.setSelectedCompanyIndex(state.getter.getSelectedCompanyIndex() + 1);
                    }
                }
            }
            break;
    }

    return animationResetPointer.isNeed;
}

function pageGoBack(isNeedToGoFirstCompanyIndex = false) {
    state.setter.setSelectedTabIndex(state.getter.getSelectedTabIndex() - 1);
    if (!isNeedToGoFirstCompanyIndex) {
        const nextCompanyIndex = getTabLength() - 1;
        state.selectedCompanyIndex = nextCompanyIndex === -1 ? 0 : nextCompanyIndex;
    }
    state.setter.setSelectedArticleIndex(0);
}

function pageGoForward() {
    state.setter.setSelectedTabIndex(state.getter.getSelectedTabIndex() + 1);
    state.setter.setSelectedArticleIndex(0);
    state.setter.setSelectedCompanyIndex(0)
}


function getRotateIndexes() {
    const maxIndex = getSwipeMaxPageNumber() - 1;
    const minIndex = 0;
    const tabLastIndex = getTabLength() - 1;
    return { maxIndex, minIndex, tabLastIndex };
}

function getSwipeMaxPageNumber() {
    switch (state.getter.getToggleName()) {
        case TOGGLE.ALL:
            return getAllCompanyLength();
        case TOGGLE.SUBSCRIBED:
            return 1;
    }
}