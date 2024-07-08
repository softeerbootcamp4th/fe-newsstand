import { TOGGLE } from "./magicNumber.js";
import { renderArticles, renderTabAnimationList, renderTabList } from "./render.js";
import { resetstate } from "./reset.js";

export function handleTabClick(selectedTabIndex,state,isDragging) {
    if(!isDragging){
        resetstate(state);
        state.selectedTabIndex = selectedTabIndex;
        renderTabList(state);
        renderArticles(state);
        renderTabAnimationList(state);
        updateTabAnimationStyle(state);
    }    
} 

export function getTabLength(state) {
    switch (state.toggleName) {
        case TOGGLE.ALL: 
            return state.articleDataList.length;
        case TOGGLE.SUBSCRIBED:
            return state.subscribedCompanyNameSet.size;
    }
    
} 

export function updateTabAnimationStyle(state) {
    switch (state.toggleName){
        case TOGGLE.ALL:
            updateAllTabAnimation(state);
            break;
        case TOGGLE.SUBSCRIBED:
            updateSubscribedTabAnimation(state);
            break;
    }
} 

function updateSubscribedTabAnimation(state) {
    const max = 1;
    if(!getSubscribedTabValidation(state))return;
    updateTabAnimation(state,max);
}

function updateAllTabAnimation(state) {
    const max = state.articleDataList[state.selectedArticleIndex].companies.length - 1;
    updateTabAnimation(state,max);
    
}

function updateTabAnimation(state,max) {
    const animationTabDom = document.querySelector(`#animation_${state.selectedTabIndex}_tab`);
    let transform = "";
    if(max <= 0){
        transform = "translate(-100%)";
    }else{
        switch(state.toggleName){
            case TOGGLE.ALL: 
                transform = `translate(-${100 - ((state.selectedCompanyIndex+1)/max*100)}%)`;
                break;
            case TOGGLE.SUBSCRIBED:
                transform = `translate(calc(-${100 - ((state.selectedCompanyIndex+1)/max*100)}% - 10px))`;
                break;
        }
    }
    if(animationTabDom){
        animationTabDom.style.transform = transform;
    }
}


export function getSubscribedTabValidation(state) {
    return !(state.toggleName === TOGGLE.SUBSCRIBED && state.subscribedCompanyNameSet.size === 0);
}