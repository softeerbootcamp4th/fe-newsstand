import { updateDOMstyle, getSubscribeList, removeSubscribe, pushSubscribe } from "./util.js";

const $listButtonDOM = document.querySelector(".toggle .list-button");
const $gridButtonDOM = document.querySelector(".toggle .grid-button");
const $gridDOM = document.querySelector(".grid-view");

const blueStyle = "invert(44%) sepia(40%) saturate(1022%) hue-rotate(190deg) brightness(83%) contrast(98%)";
const companyPerPage = 24;

let newsCompanyList = [];
let state = {
  subscribeToggle: "whole",
};

const insertDOM = () => {

}

const refillCompany = () => {
  $gridDOM.innerHTML = "";
  const isStateWhole = state.subscribeToggle === "whole";

  for (let i = 0; i < companyPerPage; i++) {
    const newCellDOM = document.createElement("div");
    newCellDOM.setAttribute("class", "cell");
    if (i < (isStateWhole ? newsCompanyList.length : getSubscribeList().length)) {
      const newImgDOM = document.createElement("img");
      const newButtonDOM = document.createElement("button");
      const companyId = isStateWhole ? i + 1 : getSubscribeList()[i];
      const isSubscribed = getSubscribeList().some((com) => com === companyId);

      newImgDOM.setAttribute("src", `../img/${companyId}.png`);
      newButtonDOM.innerText = isSubscribed ? "× 해지하기" : "+ 구독하기";
      newCellDOM.addEventListener("mouseenter", () => {
        updateDOMstyle(newImgDOM, { display: "none" });
        updateDOMstyle(newButtonDOM, { display: "block" });
      });
      newCellDOM.addEventListener("mouseleave", () => {
        updateDOMstyle(newImgDOM, { display: "block" });
        updateDOMstyle(newButtonDOM, { display: "none" });
      });

      newButtonDOM.addEventListener("click", () => {
        if (isSubscribed) removeSubscribe(companyId);
        else pushSubscribe(companyId);
        refillCompany();
      });

      newCellDOM.appendChild(newImgDOM);
      newCellDOM.appendChild(newButtonDOM);
    }
    $gridDOM.appendChild(newCellDOM);
  }
};

export default function GridCompanySection(_newsCom) {
  newsCompanyList = _newsCom;
  refillCompany();

  document.querySelector(".toggle").addEventListener("click", (e) => {
    const { className: targetClassName } = e.target;
    if (targetClassName === "list-button" || targetClassName === "grid-button") {
      const isListButton = targetClassName === "list-button";
      updateDOMstyle($listButtonDOM, { filter: isListButton ? blueStyle : "none" });
      updateDOMstyle($gridButtonDOM, { filter: isListButton ? "none" : blueStyle });
      updateDOMstyle(document.querySelector(".paper"), { display: isListButton ? "block" : "none" });
      updateDOMstyle(document.querySelector(".newsgroup"), { display: isListButton ? "flex" : "none" });
      updateDOMstyle($gridDOM, { display: isListButton ? "none" : "grid" });
    }
    else if (targetClassName === "whole" || targetClassName === "my") {
      if (targetClassName !== state.subscribeToggle) {
        state.subscribeToggle = targetClassName;
        refillCompany();
      }
    }
  });

}