import { getSubscribeCompanies, getTotalCompanyLength } from "./company.js";
import { DIRECTION, TIME, TOGGLE } from "./magicNumber.js";
import { renderArticles, renderTabAnimationList, renderTabList } from "./render.js";
import { getTabLength, updateTabAnimationStyle } from "./tab.js";

export function addEventToRotatingArrow(state) {
    // setInterval(function() {
    //     handleCompanySwipe(state,DIRECTION.RIGHT);
    // },TIME.SECOND*1);
    document.querySelector(".right_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,DIRECTION.RIGHT);
    });
    document.querySelector(".left_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,DIRECTION.LEFT);
    });
}

export function handleCompanySwipe(state, direction) {
    let isNeedToResetAnimationStyle = rotate(state, direction);
    renderTabList(state);
    updateTabAnimationStyle(state);
    renderArticles(state);
    if (isNeedToResetAnimationStyle) {
        renderTabAnimationList(state);
        updateTabAnimationStyle(state);
    }
}

function rotate(state, direction, animationResetPointer = { isNeed: false }) {
    state.selectedArticleIndex = 0;
    switch (state.toggleName) {
        case TOGGLE.ALL:
            return rotateAllToglePage(state, direction, animationResetPointer);
        case TOGGLE.SUBSCRIBED:
            return rotateSubscribedTogglePage(state, direction, animationResetPointer);
    }
}

function rotateSubscribedTogglePage(state, direction, animationResetPointer) {
    let { maxIndex, minIndex, tabLastIndex } = getRotateIndexes(state);
    switch (direction) {
        case DIRECTION.LEFT:
            if (state.selectedTabIndex > 0) {
                pageGoBack(state, true);
                animationResetPointer.isNeed = true;
            }
            break;
        case DIRECTION.RIGHT:
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
        case DIRECTION.LEFT:
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
        case DIRECTION.RIGHT:
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
        case TOGGLE.ALL:
            return getTotalCompanyLength(state);
        case TOGGLE.SUBSCRIBED:
            return 1;
    }
}