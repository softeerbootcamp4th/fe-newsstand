
import { addEventToRotatingBox } from "./addEventToRotatingBox.js";
import { renderDefaultSceen } from "./render.js";
import { loadSubscribeCompanies } from "./subscribe.js";
import { addEventToToggle } from "./toggle.js";
import { getNews, setUpCurrentTime } from "./util.js";
import { addEventToRotatingArrow } from "./swiper.js";

export function initialize(state) {
    setUpCurrentTime();
    loadSubscribeCompanies(state);
    renderDefaultSceen(state);
    addEventToRotatingBox(state);
    addEventToToggle(state);
    addEventToRotatingArrow(state);
    getNews();
}