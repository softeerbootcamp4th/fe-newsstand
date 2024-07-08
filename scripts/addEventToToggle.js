import { TOGGLE } from "./magicValues.js";
import { renderArticles, renderTabAnimationList, renderTabList } from "./render.js"
import { resetstate } from "./reset.js";
import { updateTabAnimationStyle } from "./tab.js";

export function addEventToToggle(state) {
    let leftToggleDom = document.querySelector("#toggle_left");
    let rightToggleDom =document.querySelector("#toggle_right");
    leftToggleDom.addEventListener("click",function() {
        state.toggleName=TOGGLE.ALL;
        document.querySelector("#toggle_left").classList.add('toggle_item_active');
        document.querySelector("#toggle_right").classList.remove('toggle_item_active');
        renderDefaultSceen(state);
    });
    rightToggleDom.addEventListener("click",function() {
        state.toggleName=TOGGLE.SUBSCRIBED;
        document.querySelector("#toggle_right").classList.add('toggle_item_active');
        document.querySelector("#toggle_left").classList.remove('toggle_item_active');
        renderDefaultSceen(state);
    });
}

export function renderDefaultSceen(state) {
    resetstate(state);
    renderTabList(state);
    renderArticles(state);
    renderTabAnimationList(state);
    updateTabAnimationStyle(state);
}