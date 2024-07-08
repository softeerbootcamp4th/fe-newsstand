import { addEventToRotatingArrow } from "./addEventToRotatingArrow.js";
import { addEventToRotatingBox } from "./addEventToRotatingBox.js";
import { renderDefaultSceen } from "./render.js";
import { loadSubscribeCompanies } from "./subscribe.js";
import { addEventToToggle } from "./toggle.js";
import { setUpCurrentTime } from "./util.js";

export function initialize(state) {
    setUpCurrentTime();
    loadSubscribeCompanies(state);
    renderDefaultSceen(state);
    addEventToRotatingBox(state);
    addEventToToggle(state);
    addEventToRotatingArrow(state);
}