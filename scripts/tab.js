import { drawArticles, drawTabAnimationList, drawTabList } from "./drawer.js";
import { resetstate } from "./reset.js";

export function handleTabClick(selectedTabIndex,state,isDragging) {
    if(!isDragging){
        resetstate(state);
        state.selectedTabIndex = selectedTabIndex;
        drawTabList(state);
        drawArticles(state);
        drawTabAnimationList(state);
        updateTabAnimationStyle(state);
    }    
} 

export function getTabLength(state) {
    switch (state.toggleName) {
        case "left": 
            return state.articleDataList.length;
        case "right":
            return state.subscribedCompanyNameSet.size;
    }
    
} 

export function updateTabAnimationStyle(state) {
    switch (state.toggleName){
        case "left":
            updateLeftTabAnimation(state);
            break;
        case "right":
            updateRightTabAnimation(state);
            break;
    }
} 

function updateRightTabAnimation(state) {
    const max = 1;
    if(!getRightTabValidation(state))return;
    updateTabAnimation(state,max);
}

function updateLeftTabAnimation(state) {
    const max = getTabLength(state);
    updateTabAnimation(state,max);
    
}

function updateTabAnimation(state,max) {
    const animationTabDom = document.querySelector(`#animation_${state.selectedTabIndex}_tab`);
    let transform = "";
    if(max <= 0){
        transform = "translate(-100%)";
    }else{
        switch(state.toggleName){
            case "left": 
                transform = `translate(-${100 - ((state.selectedCompanyIndex+1)/max*100)}%)`;
                break;
            case "right":
                transform = `translate(calc(-${100 - ((state.selectedCompanyIndex+1)/max*100)}% - 10px))`;
                break;
        }
    }
    animationTabDom.style.transform = transform;
}


export function getRightTabValidation(state) {
    return !(state.toggleName === "right" && state.subscribedCompanyNameSet.size === 0);
}