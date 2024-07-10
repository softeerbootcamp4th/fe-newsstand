import { category } from "./data.js";
import { initalizeGridViewContainer } from "./gridView.js";
import { initlizeListViewFunction } from "./listView.js";
import { initalizeSubscribeFunction } from "./subscribe.js";

document.addEventListener("DOMContentLoaded", () => {
  const listViewIcon = document.querySelector(".list-view");
  const gridViewIcon = document.querySelector(".grid-view");
  const mainHeader = document.querySelector('.main-header')

  listViewIcon.addEventListener("click", () => {
    gridViewIcon.classList.remove("selected-icon");
    gridViewIcon.src = "./src/icons/grid-view.svg";
    document.querySelector('.grid-view-container').remove();

    listViewIcon.classList.add("selected-icon");
    listViewIcon.src = "./src/icons/list-view-checked.svg";
    mainHeader.insertAdjacentHTML(
      "afterend",
      `
        <div class="list-view-container selected-view column-flex ">
            <div class="list-view-header"></div>
            <div class="info hidden">구독한 언론사가 없습니다.</div>
            <div class="news-container column-flex">
                <div class="container-header">
                    <img alt="company-logo" id="logo">
                    <p class="edit-date"></p>
                    <div class="subscribe-btn"><span>+</span>구독하기</div>
                </div>
                <div class="news-item-container">
                    <div class="main-news column-flex"></div>
                    <div class="sub-news column-flex"></div>
                </div>
            </div>
        </div>
        `
    );
    initalizeSubscribeFunction();
    initlizeListViewFunction();

  });

  gridViewIcon.addEventListener("click", () => {
    listViewIcon.classList.remove("selected-icon");
    listViewIcon.src = "./src/icons/list-view.svg";
    document.querySelector('.list-view-container').remove();


    gridViewIcon.classList.add("selected-icon");
    gridViewIcon.src = "./src/icons/grid-view-checked.svg";
    mainHeader.insertAdjacentHTML(
        "afterend",`
            <div class="grid-view-container selected-view"></div>
        `);

    initalizeGridViewContainer();
  });
});
