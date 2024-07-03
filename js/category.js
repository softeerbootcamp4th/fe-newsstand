import news from "../data/news.js"

const allMedia = document.querySelector(".news-list__menu__selectors__all");
const myMedia = document.querySelector(".news-list__menu__selectors__my");
let selected, unselected;

allMedia.addEventListener("click", onAllClick);
myMedia.addEventListener("click", onMyclick);

function onAllClick() {
    allMedia.dataset.selected = "yes";
    myMedia.dataset.selected = "no";
    changeSelected();
}

function onMyclick() {
    allMedia.dataset.selected = "no";
    myMedia.dataset.selected = "yes";
    changeSelected();
}

function changeSelected() {
    selected = document.querySelector("span[data-selected='yes']");
    unselected = document.querySelector("span[data-selected='no']");
    console.log(selected);
    console.log(unselected);
    selected.style.color = "black";
    unselected.style.color = "gray";
}

