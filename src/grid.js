import { updateDOMstyle } from "./util.js";

const $listButtonDOM = document.querySelector(".toggle .list-button");
const $gridButtonDOM = document.querySelector(".toggle .grid-button");
const $gridDOM = document.querySelector(".grid-view");

const blueStyle = "invert(44%) sepia(40%) saturate(1022%) hue-rotate(190deg) brightness(83%) contrast(98%)";
const companyPerPage = 24;

let newsCompanyList = [];

const FillCompany = () => {
  $gridDOM.innerHTML = "";
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
};

export default function GridCompanySection(_newsCom) {
  document.querySelector(".toggle .view-toggle").addEventListener("click", (e) => {
    const isTargetListButton = e.target === $listButtonDOM;
    updateDOMstyle($listButtonDOM, { filter: isTargetListButton ? blueStyle : "none" });
    updateDOMstyle($gridButtonDOM, { filter: isTargetListButton ? "none" : blueStyle });
    updateDOMstyle(document.querySelector(".paper"), { display: isTargetListButton ? "block" : "none" });
    updateDOMstyle(document.querySelector(".newsgroup"), { display: isTargetListButton ? "flex" : "none" });
    updateDOMstyle(document.querySelector(".grid-view"), { display: isTargetListButton ? "none" : "grid" });
  });

  newsCompanyList = _newsCom;

  FillCompany();
}