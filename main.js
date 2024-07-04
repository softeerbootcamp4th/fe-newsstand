import { addEventToRotatingArrow } from "./scripts/addEventToRotatingArrow.js";
import { addEventToRotatingBox } from "./scripts/addEventToRotatingBox.js";
import { addEventToToggle, drawDefaultSceen } from "./scripts/addEventToToggle.js";
import { drawTabAnimationList } from "./scripts/drawer.js";
import { getCurrentDateString } from "./scripts/getCurrentDateString.js";
const currentDateString = getCurrentDateString();
document.getElementById("date_section").innerHTML = currentDateString;

//타이틀 기준 회사 정렬(메인 데이터)
const articleDataList = new Array(30).fill(0).map((d, i) => {
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

let state = {
    //togleName left right에서 all subscribed로 변경해야함
    toggleName: "left",
    selectedTabIndex: 0,
    selectedArticleIndex: 0,
    selectedCompanyIndex: 0,
    subscribedCompanyNameSet: new Set(),
    articleDataList: articleDataList,
    companiesWithArticles: companiesWithArticles
}


drawDefaultSceen(state);
addEventToRotatingBox(state);
addEventToToggle(state);
addEventToRotatingArrow(state);

