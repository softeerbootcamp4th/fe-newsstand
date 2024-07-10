import { getSubscribeCompanies } from "./company.js";
import { TOGGLE } from "./magicNumber.js";
import { renderDefaultSceen } from "./render.js";
import { getTabLength } from "./tab.js";

export function addEventToToggle(state) {
    const toggleWrapperDom = document.querySelector(".toggle_wrapper");
    toggleWrapperDom.addEventListener("click", (event) => switchToggleWithToggleDom(state, event.target));
}

export function switchToggleWithToggleDom(state, toggleDom) {
    const toggleName = toggleDom.id.split("_")[1];
    switchToggleWithToggleName(state, toggleName);
}

export function switchToggleWithToggleName(state, toggleName) {
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
    state.toggleName = toggleName;
    renderDefaultSceen(state);
}

export function setUpToggleWithDefaultOption(leftDom, rightDom) {
    rightDom.src = "public/right_arrow.svg";
    leftDom.src = "public/left_arrow.svg";
    rightDom.classList.add("arrow_hover");
    leftDom.classList.add("arrow_hover");
}

function setUpToggleWithDisabledCondition(disabledCondition) {
    const leftArrowDom = document.querySelector(".left_arrow");
    const rightArrowDom = document.querySelector(".right_arrow");
    setUpToggleWithDefaultOption(leftArrowDom, rightArrowDom);
    if (disabledCondition.right) {
        rightArrowDom.src = "public/right_arrow_disabled.svg";
        rightArrowDom.classList.remove("arrow_hover");
    }
    if (disabledCondition.left) {
        leftArrowDom.src = "public/left_arrow_disabled.svg";
        leftArrowDom.classList.remove("arrow_hover");
    }
}

export function updateAllToggleArrow(state) {
    const max = getSubscribeCompanies(state).length - 1;
    const min = 0;
    const tabLastIndex = getTabLength(state) - 1;
    setUpToggleWithDisabledCondition({
        left: state.selectedCompanyIndex == min && state.selectedTabIndex == min,
        right: state.selectedCompanyIndex == max && state.selectedTabIndex == tabLastIndex
    });
}

export function updateSubscribedToggleArrow(state) {
    const max = getTabLength(state) - 1;
    const min = 0;
    setUpToggleWithDisabledCondition({
        left: state.selectedTabIndex === min,
        right: state.selectedTabIndex === max
    });
}