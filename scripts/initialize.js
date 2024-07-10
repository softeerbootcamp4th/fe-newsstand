
import { addEventToRollingBox } from "./rolling.js";
import { renderDefaultSceen } from "./render.js";
import { loadSubscribeCompanies } from "./subscribe.js";
import { addEventToToggle } from "./toggle.js";
import { setUpCurrentTime } from "./util.js";
import { addEventToRotatingArrow } from "./swiper.js";
import { fetchData } from "./fetchData.js";

export function initializeScreen(state) {
    setUpCurrentTime();
    renderDefaultSceen(state);
}

export async function initializeData(state) {
    return new Promise((resolve,reject) => {
        loadSubscribeCompanies(state);
        fetchData().then(([
            articleData,
            previewArticleData
        ]) => {
            const { articleDataList,companiesWithArticles } = articleData;
            state.articleDataList = articleDataList;
            state.companiesWithArticles = companiesWithArticles;
            state.previewArticleData = previewArticleData;
            resolve();
        });
    })
}

export function initializeEvent(state) {
    addEventToRollingBox(state);
    addEventToToggle(state);
    addEventToRotatingArrow(state);
}

