import { initialize } from "./scripts/initialize.js";
import { TOGGLE } from "./scripts/magicValues.js";
import { fetchData } from "./scripts/fetchData.js";

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
                



//신기능
// document.querySelector("a").querySelector("b").querySelector("wow").querySelector
// document.querySelector("a").dataset DOM에 데이터 저장하는거


// concat때리면 쉽게 한방에 스타일 가능
// Object.assign(exampleElement.style, {
//     backgroundColor: 'blue',
//     color: 'white',
//     border: '2px solid black'
// });

