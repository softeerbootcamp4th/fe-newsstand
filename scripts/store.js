import { TOGGLE } from "./magicNumber.js";

let store = {
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

export default store;
