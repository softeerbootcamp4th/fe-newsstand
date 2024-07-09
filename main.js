import { initialize } from "./scripts/initialize.js";
import { TOGGLE } from "./scripts/magicNumber.js";
import { fetchData } from "./scripts/fetchData.js";
import { companies } from "./json/companies.js";
import { articles } from "./json/articles.js";
//store
let state = {
    toggleName: TOGGLE.ALL,
    selectedTabIndex: 0,
    selectedArticleIndex: 0,
    selectedCompanyIndex: 0,
    isDragging: false,
    subscribedCompanyNameSet: new Set(),
    articleDataList: [],
    companiesWithArticles: {},
}

fetchData().then((res) => {
    Object.assign(state,res);
    initialize(state);
});


                

