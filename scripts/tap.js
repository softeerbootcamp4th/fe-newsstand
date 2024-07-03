import { drawArticles, drawTapList } from "./drawer.js";
import { resetstate } from "./reset.js";

export function handleTabClick(titleIndex,state) {
    resetstate(state);
    state.titleIndex = titleIndex;
    drawTapList(state);
    drawArticles(state);
} 

export function getTabLength(state) {
    return state.articleDataList.length;
} 

