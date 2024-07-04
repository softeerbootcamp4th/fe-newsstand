import { getAvailableCompanyNumber } from "./article.js";
import { drawArticles, drawTapList } from "./drawer.js";
import { getTabLength } from "./tap.js";

/**
   * @param {Number} companyIndex - The image element whose source will be changed.
   * @param {"left" | "right"} type - The new source URL for the image.
   */
export function handleCompanySwipe(state,type) {
    rotate(state,type);
    drawTapList(state);
    drawArticles(state,type);
}

 /**
* @param {"left" | "right"} type
*/
 function rotate(state,type) {
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
                        pageGoBack(state);
                    }else if(max !== -1){
                        state.selectedCompanyIndex -= 1;
                    }
                }
            }
            break;
        case "right":
            if(max === -1 && state.titleIndex !== tabLastIndex){
                pageGoForward(state);
                rotate(state,type);
            }else{
                if(!(state.selectedCompanyIndex === max && state.titleIndex === tabLastIndex)){
                    if(state.selectedCompanyIndex == max){
                        pageGoForward(state);
                    }else if(max !== -1){
                        state.selectedCompanyIndex += 1;
                    }
                }
            }
            break;
    }
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