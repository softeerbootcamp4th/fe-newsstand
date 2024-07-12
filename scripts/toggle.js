import { getAllCompanyLength, getSubscribeCompanies } from "./company.js";
import { TOGGLE } from "./magicNumber.js";
import { renderDefaultSceen } from "./render.js";
import { getTabLength } from "./tab.js";
import state from "./store.js";

export function addEventToToggle() {
    const toggleWrapperDom = document.querySelector(".toggle_wrapper");
    toggleWrapperDom.addEventListener("click", (event) => switchToggleWithToggleDom(event.target));
}

export function switchToggleWithToggleDom(toggleDom) {
    const toggleName = toggleDom.id.split("_")[1];
    switchToggleWithToggleName(toggleName);
}

export function switchToggleWithToggleName(toggleName) {
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
    state.setter.setToggleName(toggleName);
    renderDefaultSceen();
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

export function updateAllToggleArrow() {
    const max = getAllCompanyLength() - 1;
    const min = 0;
    const tabLastIndex = getTabLength() - 1;
    const selectedCompanyIndex = state.getter.getSelectedCompanyIndex();
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    setUpToggleWithDisabledCondition({
        left: selectedCompanyIndex == min && selectedTabIndex == min,
        right: selectedCompanyIndex == max && selectedTabIndex == tabLastIndex
    });
}

export function updateSubscribedToggleArrow() {
    const max = getTabLength() - 1;
    const min = 0;
    const selectedTabIndex = state.getter.getSelectedTabIndex();
    setUpToggleWithDisabledCondition({
        left: selectedTabIndex === min,
        right: selectedTabIndex === max
    });
}