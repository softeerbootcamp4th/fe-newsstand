import state from "./store.js";
export function resetstate() {
    state.selectedTabIndex = 0;
    state.selectedArticleIndex = 0;
    state.selectedCompanyIndex = 0;
}