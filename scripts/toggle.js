import { TOGGLE } from "./magicValues.js";
import { renderDefaultSceen } from "./render.js";

export function addEventToToggle(state) {
    const toggleWrapperDom = document.querySelector(".toggle_wrapper");
    toggleWrapperDom.addEventListener("click",(event) => handleToggleWithToggleDom(state,event.target));
}

export function handleToggleWithToggleDom(state,toggleDom) {
    const toggleName = toggleDom.id.split("_")[1];
    handleToggleWithToggleName(state,toggleName);
}

export function handleToggleWithToggleName(state,toggleName) {
    switch (toggleName) {
        case TOGGLE.ALL:
            document.querySelector("#toggle_all").classList.add('toggle_item_active');
            document.querySelector("#toggle_subscribed").classList.remove('toggle_item_active');
            break;
        case TOGGLE.SUBSCRIBED:
            document.querySelector("#toggle_subscribed").classList.add('toggle_item_active');
            document.querySelector("#toggle_all").classList.remove('toggle_item_active');
            break;
    }
    state.toggleName=toggleName;
    renderDefaultSceen(state);
}