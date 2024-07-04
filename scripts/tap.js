import { getAvailableCompanyNumber } from "./article.js";
import { drawArticles, drawTapAnimationList, drawTapList } from "./drawer.js";
import { resetstate } from "./reset.js";

export function handleTabClick(titleIndex,state) {
    resetstate(state);
    state.titleIndex = titleIndex;
    drawTapList(state);
    drawArticles(state);
    drawTapAnimationList(state);
    updateTabAnimationStyle(state);
} 

export function getTabLength(state) {
    return state.articleDataList.length;
} 

export function updateTabAnimationStyle(state) {
    let animationTabDom = document.querySelector(`#title_${state.titleIndex}_tap`);
    let max = getAvailableCompanyNumber(state);
    if(max <= 0){
        animationTabDom.style.transform = "translate(-100%)";
    }else{
        animationTabDom.style.transform = `translate(-${100 - ((state.selectedCompanyIndex+1)/max*100)}%)`;
    }
} 

