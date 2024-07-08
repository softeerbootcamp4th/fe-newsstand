import { addEventToRotatingArrow } from "./scripts/addEventToRotatingArrow.js";
import { addEventToRotatingBox } from "./scripts/addEventToRotatingBox.js";
import { addEventToToggle, renderDefaultSceen } from "./scripts/addEventToToggle.js";
import { getCurrentDateString } from "./scripts/util.js";
import { TOGGLE } from "./scripts/magicValues.js";
const currentDateString = getCurrentDateString();
document.getElementById("date_section").innerHTML = currentDateString;

//타이틀 기준 회사 정렬(메인 데이터)
const articleDataList = new Array(10).fill(0).map((d, i) => {
    return {
        index: i,
        subject: `${i}번 제목`,
        companies: new Array(10).fill(0).map((_, companyIndex) => {
            return {
                name: `${companyIndex}번 회사`,
                articles: new Array(6).fill(0).map((_, index) => {
                    return {
                        title: `${i}번 주제 ${companyIndex}번 회사 ${index} 번 기사`,
                        image: `https://picsum.photos/320/200?test=${i}-${index}`,
                        registerDate: `2023.${Math.floor(Math.random() * 13)}.10. ${Math.floor(Math.random() * 23)}:${Math.floor(Math.random() * 60)} 편집`
                    }
                }),
                image: `https://picsum.photos/320/200?test=${i}-${companyIndex}`
            }
        })
    }
});

//회사명 기준 아티클 정렬
const companiesWithArticles = {};
articleDataList.forEach(subjectObject => {
    subjectObject.companies.forEach(company => {
        if(companiesWithArticles[company.name] === undefined){
            companiesWithArticles[company.name] = { 
               name: company.name,
               articles: [],
               image: company.image
             };
        }
        companiesWithArticles[company.name].articles =companiesWithArticles[company.name].articles.concat(company.articles);
    });
});
// console.log(JSON.stringify(articleDataList));
let state = {
    //togleName left right에서 all subscribed로 변경해야함
    toggleName: TOGGLE.ALL,
    selectedTabIndex: 0,
    selectedArticleIndex: 0,
    selectedCompanyIndex: 0,
    isDragging: false,
    subscribedCompanyNameSet: new Set(),
    articleDataList: articleDataList,
    companiesWithArticles: companiesWithArticles,
}

//신기능
// document.querySelector("a").querySelector("b").querySelector("wow").querySelector
// document.querySelector("a").dataset DOM에 데이터 저장하는거


// concat때리면 쉽게 한방에 스타일 가능
// Object.assign(exampleElement.style, {
//     backgroundColor: 'blue',
//     color: 'white',
//     border: '2px solid black'
// });


renderDefaultSceen(state);
addEventToRotatingBox(state);
addEventToToggle(state);
addEventToRotatingArrow(state);