import state from "./store.js";
export function resetstate() {
    state.setter.setSelectedTabIndex(0);
    state.setter.setSelectedArticleIndex(0);
    state.setter.setSelectedCompanyIndex(0);
}