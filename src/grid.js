import { updateDOMstyle, getSubscribeList } from "./util.js";

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
  if (state.subscribeToggle === "whole") {
    for (let i = 1; i <= companyPerPage; i++) {
      const newCellDOM = document.createElement("div");
      newCellDOM.setAttribute("class", "cell");
      if (i <= newsCompanyList.length) {
        const newImgDOM = document.createElement("img");
        newImgDOM.setAttribute("src", `../img/${i}.png`);
        newCellDOM.appendChild(newImgDOM);
      }
      $gridDOM.appendChild(newCellDOM);
    }
  }
  else if (state.subscribeToggle === "my") {
    for (let i = 0; i < companyPerPage; i++) {
      const newCellDOM = document.createElement("div");
      newCellDOM.setAttribute("class", "cell");
      if (i < getSubscribeList().length) {
        const newImgDOM = document.createElement("img");
        newImgDOM.setAttribute("src", `../img/${getSubscribeList()[i]}.png`);
        newCellDOM.appendChild(newImgDOM);
      }
      $gridDOM.appendChild(newCellDOM);
    }
  }
};

export default function GridCompanySection(_newsCom) {
  document.querySelector(".toggle").addEventListener("click", (e) => {
    const { className: targetClassName } = e.target;
    if (targetClassName === "list-button" || targetClassName === "grid-button") {
      const isListButton = targetClassName === "list-button";
      updateDOMstyle($listButtonDOM, { filter: isListButton ? blueStyle : "none" });
      updateDOMstyle($gridButtonDOM, { filter: isListButton ? "none" : blueStyle });
      updateDOMstyle(document.querySelector(".paper"), { display: isListButton ? "block" : "none" });
      updateDOMstyle(document.querySelector(".newsgroup"), { display: isListButton ? "flex" : "none" });
      updateDOMstyle(document.querySelector(".grid-view"), { display: isListButton ? "none" : "grid" });
    }
    else if (targetClassName === "whole" || targetClassName === "my") {
      if (targetClassName !== state.subscribeToggle) {
        state.subscribeToggle = targetClassName;
        refillCompany();
      }
    }
  });

  newsCompanyList = _newsCom;

  refillCompany();
}