import { getAvailableCompanyNumber } from "./article.js";
import { drawArticles, drawTapAnimationList, drawTapList } from "./drawer.js";
import { getTabLength, updateTabAnimationStyle } from "./tap.js";

/**
   * @param {Number} companyIndex - The image element whose source will be changed.
   * @param {"left" | "right"} type - The new source URL for the image.
   */
export function handleCompanySwipe(state,type) {
    let isNeedRetrierDrawAnimation = rotate(state,type);
    drawTapList(state);
    updateTabAnimationStyle(state);
    drawArticles(state,type);
    if(isNeedRetrierDrawAnimation){
        drawTapAnimationList(state);
        updateTabAnimationStyle(state);
    }
}

 /**
* @param {"left" | "right"} type
*/
 function rotate(state,type,animationResetPointer = { isNeed: false }) {
    state.selectedArticleIndex = 0;
    const max = getAvailableCompanyNumber(state)-1;
    const min = 0;
    const tabLastIndex = getTabLength(state) - 1;
    switch (type) {
        case "left":
            if(max === -1 && state.titleIndex !== 0){
                pageGoBack(state);
                rotate(state,type);
            }else{
                if(!(state.selectedCompanyIndex === min && state.titleIndex === min)){
                    if(state.selectedCompanyIndex === min){
                        animationResetPointer.isNeed = true;
                        pageGoBack(state);
                    }else if(max !== -1){
                        state.selectedCompanyIndex -= 1;
                    }
                }
            }
            break;
        case "right":
            if(max === -1 && state.titleIndex !== tabLastIndex){
                animationResetPointer.isNeed = true;
                pageGoForward(state);
                rotate(state,type,animationResetPointer);
            }else{
                if(!(state.selectedCompanyIndex === max && state.titleIndex === tabLastIndex)){
                    if(state.selectedCompanyIndex == max){
                        animationResetPointer.isNeed = true;
                        pageGoForward(state);
                    }else if(max !== -1){
                        state.selectedCompanyIndex += 1;
                    }
                }
            }
            break;
    }
    return animationResetPointer.isNeed;
 }

 
 function pageGoBack(state) {
    state.titleIndex -= 1;
    let nextCompanyIndex = getAvailableCompanyNumber(state)-1;
    state.selectedCompanyIndex = nextCompanyIndex === -1 ? 0 : nextCompanyIndex;
    state.selectedArticleIndex = 0;
 }

 function pageGoForward(state) {
    state.titleIndex += 1;
    state.selectedArticleIndex = 0;
    state.selectedCompanyIndex = 0;
 }