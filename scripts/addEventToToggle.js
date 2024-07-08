import { TOGGLE } from "./magicValues.js";
import { renderArticles, renderTabAnimationList, renderTabList } from "./render.js"
import { resetstate } from "./reset.js";
import { updateTabAnimationStyle } from "./tab.js";
import { handleToggle } from "./toggle.js";

export function addEventToToggle(state) {
    const toggleWrapperDom = document.querySelector(".toggle_wrapper");
    toggleWrapperDom.addEventListener("click",(event) => handleToggle(state,event.target));
}

