import { getSubscribeCompanies, getTotalCompanyLength } from "./company.js";
import { drawArticles, drawTabAnimationList, drawTabList } from "./drawer.js";
import { getTabLength, updateTabAnimationStyle } from "./tab.js";

export function handleCompanySwipe(state, direction) {
    let isNeedToResetAnimationStyle = rotate(state, direction);
    drawTabList(state);
    updateTabAnimationStyle(state);
    drawArticles(state);
    if (isNeedToResetAnimationStyle) {
        drawTabAnimationList(state);
        updateTabAnimationStyle(state);
    }
}

function rotate(state, direction, animationResetPointer = { isNeed: false }) {
    state.selectedArticleIndex = 0;
    switch (state.toggleName) {
        case "left":
            return rotateAllToglePage(state, direction, animationResetPointer);
        case "right":
            return rotateSubscribedTogglePage(state, direction, animationResetPointer);
    }
}

function rotateSubscribedTogglePage(state, direction, animationResetPointer) {
    let { maxIndex, minIndex, tabLastIndex } = getRotateIndexes(state);
    switch (direction) {
        case "left":
            if (state.selectedTabIndex > 0) {
                pageGoBack(state, true);
                animationResetPointer.isNeed = true;
            }
            break;
        case "right":
            if (state.selectedTabIndex < tabLastIndex) {
                pageGoForward(state);
                animationResetPointer.isNeed = true;
            }
            break;
    }
    return animationResetPointer.isNeed;
}

function rotateAllToglePage(state, direction, animationResetPointer) {
    //코드 분리 가능하면 추후에 진행
    let { maxIndex, minIndex, tabLastIndex } = getRotateIndexes(state);
    switch (direction) {
        case "left":
            if (maxIndex === -1 && state.selectedTabIndex !== 0) {
                pageGoBack(state);
                rotate(state);
            } else {
                if (!(state.selectedCompanyIndex === minIndex && state.selectedTabIndex === minIndex)) {
                    if (state.selectedCompanyIndex === minIndex) {
                        animationResetPointer.isNeed = true;
                        pageGoBack(state);
                    } else if (maxIndex !== -1) {
                        state.selectedCompanyIndex -= 1;
                    }
                }
            }
            break;
        case "right":
            if (maxIndex === -1 && state.selectedTabIndex !== tabLastIndex) {
                animationResetPointer.isNeed = true;
                pageGoForward(state);
                rotate(state, animationResetPointer);
            } else {
                if (!(state.selectedCompanyIndex === maxIndex && state.selectedTabIndex === tabLastIndex)) {
                    if (state.selectedCompanyIndex == maxIndex) {
                        animationResetPointer.isNeed = true;
                        pageGoForward(state);
                    } else if (maxIndex !== -1) {
                        state.selectedCompanyIndex += 1;
                    }
                }
            }
            break;
    }
    return animationResetPointer.isNeed;
}

function pageGoBack(state, isNeedToGoFirstCompanyIndex = false) {
    state.selectedTabIndex -= 1;
    if (!isNeedToGoFirstCompanyIndex) {
        let nextCompanyIndex = getTabLength(state) - 1;
        state.selectedCompanyIndex = nextCompanyIndex === -1 ? 0 : nextCompanyIndex;
    }
    state.selectedArticleIndex = 0;
}

function pageGoForward(state) {
    state.selectedTabIndex += 1;
    state.selectedArticleIndex = 0;
    state.selectedCompanyIndex = 0;
}


function getRotateIndexes(state) {
    const maxIndex = getSwipeMaxPageNumber(state) - 1;
    const minIndex = 0;
    const tabLastIndex = getTabLength(state) - 1;
    return { maxIndex, minIndex, tabLastIndex };
}

function getSwipeMaxPageNumber(state) {
    switch (state.toggleName) {
        case "left":
            return getTotalCompanyLength(state);
        case "right":
            return 1;
    }
}