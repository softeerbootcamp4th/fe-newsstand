import { drawArticles, drawTapList } from "./drawer.js";
import { resetstate } from "./reset.js";

export function addEventToToggle(state) {
    let leftToggleDom = document.querySelector("#toggle_left");
    let rightToggleDom =document.querySelector("#toggle_right");
    leftToggleDom.addEventListener("click",function() {
        state.toggleName="left";
        document.querySelector("#toggle_left").classList.add('toggle_item_active');
        document.querySelector("#toggle_right").classList.remove('toggle_item_active');
        resetstate(state);
        drawTapList(state);
        drawArticles(state)
    });
    rightToggleDom.addEventListener("click",function() {
        state.toggleName="right";
        document.querySelector("#toggle_right").classList.add('toggle_item_active');
        document.querySelector("#toggle_left").classList.remove('toggle_item_active');
        resetstate(state);
        drawTapList(state);
        drawArticles(state)
    });
    drawTapList(state);
    drawArticles(state)
}

