import { updateDOMstyle } from "./util.js";

const $subscribeToggleDOM = document.querySelectorAll(".subscribeToggle span");
const $newsgroupDOM = document.querySelector(".newsgroup");
const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

let subscribeState = "whole";
let ctgState = 0;

$subscribeToggleDOM[0].addEventListener("click", () => {
  subscribeState = "whole";
  updateDOMstyle($subscribeToggleDOM[0], {
    fontWeight: "bold",
    color: "black",
  });
  updateDOMstyle($subscribeToggleDOM[1], {
    fontWeight: "normal",
    color: "#879298",
  })
})

$subscribeToggleDOM[1].addEventListener("click", () => {
  subscribeState = "my";
  updateDOMstyle($subscribeToggleDOM[0], {
    fontWeight: "normal",
    color: "#879298",
  });
  updateDOMstyle($subscribeToggleDOM[1], {
    fontWeight: "bold",
    color: "black",
  })
})

categories.forEach((ctg) => {
  const newDOM = document.createElement("div");
  newDOM.innerText = ctg;
  $newsgroupDOM.appendChild(newDOM);
})

const $ctgDOM = document.querySelectorAll(".newsgroup div");

updateDOMstyle($ctgDOM[0], {
  backgroundColor: "#7890E7",
  color: "white",
  fontWeight: "bold"
})

for (let i = 0; i < $ctgDOM.length; i++) {
  $ctgDOM[i].addEventListener("click", () => {
    updateDOMstyle($ctgDOM[ctgState], {
      backgroundColor: "inherit",
      color: "inherit",
      fontWeight: "normal"
    })
    ctgState = i;
    updateDOMstyle($ctgDOM[i], {
      backgroundColor: "#7890E7",
      color: "white",
      fontWeight: "bold"
    })
  })
}