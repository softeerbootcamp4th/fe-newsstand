import { initializeGridViewContainer } from "./displaygridViewnews.js";
import { handleClickTab } from "./toggleView.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainHeader = document.querySelector('.main-header');
  mainHeader.insertAdjacentHTML(
    "afterend",`
        <div class="grid-view-container selected-view"></div>
        <div class="arrow left-btn grid">
            <img src="./src/images/LeftButton.png" alt="left-arrow">
        </div>
        <div class="arrow right-btn grid">
            <img src="./src/images/RightButton.png" alt="left-arrow">
        </div>

    `);
    handleClickTab('grid-view');
    initializeGridViewContainer('all');
});

