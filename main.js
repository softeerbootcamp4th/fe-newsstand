import { addEventToRotatingArrow } from "./scripts/addEventToRotatingArrow.js";
import { addEventToRotatingBox } from "./scripts/addEventToRotatingBox.js";
import { addEventToToggle } from "./scripts/addEventToToggle.js";
import { drawTapAnimationList } from "./scripts/drawer.js";
import { getCurrentDateString } from "./scripts/getCurrentDateString.js";
const currentDateString = getCurrentDateString();
document.getElementById("date_section").innerHTML = currentDateString;

let articleDataList = new Array(10).fill(0).map((d,i)=>{
    return {
        index: i,
        title: `${i}번 제목`,
        companies: new Array(10).fill(0).map((_,companyIndex) => {
            return {
                name: `${companyIndex}번 회사`,
                articles: new Array(6).fill(0).map((_,index)=>{
                    return {
                        title: `${i}번 주제 ${companyIndex}번 회사 ${index} 번 기사`,
                        image: `https://picsum.photos/320/200?test=${i}-${index}`,
                        registerDate: `2023.${Math.floor(Math.random()*13)}.10. ${Math.floor(Math.random()*23)}:${Math.floor(Math.random()*60)}`
                    }
                }),
                image: `https://picsum.photos/320/200?test=${i}-${companyIndex}`
            }
        })
    }
});

let state = {
    toggleName: "left",
    titleIndex: 0,
    selectedArticleIndex: 0,
    selectedCompanyIndex: 0,
    subscribedCompanyNameSet: new Set(),
    articleDataList: articleDataList
}



addEventToRotatingBox(state);
addEventToToggle(state);
addEventToRotatingArrow(state);

