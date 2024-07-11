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
    state.selectedArticleIndex = 0;
    switch (state.toggleName) {
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
            if (state.selectedTabIndex > 0) {
                pageGoBack(true);
                animationResetPointer.isNeed = true;
            }
            break;
        case DIRECTION.RIGHT:
            if (state.selectedTabIndex < tabLastIndex) {
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
            const firstTabCondition = state.selectedTabIndex === minIndex;
            const firstCompanyCondition = state.selectedCompanyIndex === minIndex;
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
                        state.selectedCompanyIndex -= 1;
                    }
                }
            }
            break;

        case DIRECTION.RIGHT:
            const lastTabCondition = state.selectedTabIndex === tabLastIndex;
            const lastCompanyCondition = state.selectedCompanyIndex === maxIndex;
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
                        state.selectedCompanyIndex += 1;
                    }
                }
            }
            break;
    }

    return animationResetPointer.isNeed;
}

function pageGoBack(isNeedToGoFirstCompanyIndex = false) {
    state.selectedTabIndex -= 1;
    if (!isNeedToGoFirstCompanyIndex) {
        const nextCompanyIndex = getTabLength() - 1;
        state.selectedCompanyIndex = nextCompanyIndex === -1 ? 0 : nextCompanyIndex;
    }
    state.selectedArticleIndex = 0;
}

function pageGoForward() {
    state.selectedTabIndex += 1;
    state.selectedArticleIndex = 0;
    state.selectedCompanyIndex = 0;
}


function getRotateIndexes() {
    const maxIndex = getSwipeMaxPageNumber() - 1;
    const minIndex = 0;
    const tabLastIndex = getTabLength() - 1;
    return { maxIndex, minIndex, tabLastIndex };
}

function getSwipeMaxPageNumber() {
    switch (state.toggleName) {
        case TOGGLE.ALL:
            return getAllCompanyLength();
        case TOGGLE.SUBSCRIBED:
            return 1;
    }
}