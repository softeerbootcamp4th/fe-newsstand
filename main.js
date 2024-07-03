import { addEventToRotatingBox } from "./scripts/addEventToRotatingBox.js";
import { addEventToToggle } from "./scripts/addEventToToggle.js";
import { getCurrentDateString } from "./scripts/getCurrentDateString.js";
let currentDateString = getCurrentDateString();
document.getElementById("date_section").innerHTML = currentDateString;

let toggleState = {
    toggleName: "left"
}

addEventToRotatingBox();
addEventToToggle(toggleState);



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
