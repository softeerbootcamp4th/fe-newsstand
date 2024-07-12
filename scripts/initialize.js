
import { addEventToRollingBox } from "./rolling.js";
import { renderDefaultSceen } from "./render.js";
import { loadSubscribeCompanies } from "./subscribe.js";
import { addEventToToggle } from "./toggle.js";
import { setUpCurrentTime } from "./util.js";
import { addEventToRotatingArrow } from "./swiper.js";
import { fetchData } from "./fetchData.js";
import state from "./store.js";

export function initializeScreen() {
    setUpCurrentTime();
    renderDefaultSceen();
}

export async function initializeData() {
    return new Promise((resolve,reject) => {
        loadSubscribeCompanies();
        fetchData().then(([
            articleData,
            previewArticleData
        ]) => {
            const { articleDataList,companiesWithArticles } = articleData;
            state.setter.setArticleDataList(articleDataList);
            state.setter.setCompaniesWithArticles(companiesWithArticles);
            state.setter.setPreviewArticleData(previewArticleData);
            resolve();
        });
    })
}

export function initializeEvent() {
    addEventToRollingBox();
    addEventToToggle();
    addEventToRotatingArrow();
}

