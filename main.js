import { addEventToRotatingArrow } from "./scripts/addEventToRotatingArrow.js";
import { addEventToRotatingBox } from "./scripts/addEventToRotatingBox.js";
import { addEventToToggle } from "./scripts/addEventToToggle.js";
import { getCurrentDateString } from "./scripts/getCurrentDateString.js";
let currentDateString = getCurrentDateString();
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


// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn moredd
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
