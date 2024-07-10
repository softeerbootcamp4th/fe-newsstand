import { initializeData, initializeEvent, initializeScreen } from "./scripts/initialize.js";
import { TIME, TOGGLE } from "./scripts/magicNumber.js";
//store
let state = {
    toggleName: TOGGLE.ALL,
    selectedTabIndex: 0,
    selectedArticleIndex: 0,
    selectedCompanyIndex: 0,
    isDragging: false,
    subscribedCompanyNameSet: new Set(),
    previewArticleData: {},
    articleDataList: [],
    companiesWithArticles: {},
}

initializeData(state)
.then(_ => {
    initializeEvent(state);
    initializeScreen(state);
})
