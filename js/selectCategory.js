import news from "../data/allNews.js"
import subscribeInfo from "../data/subscribedNews.js";

const allMedia = document.querySelector(".news-list__menu__selectors__all");
const myMedia = document.querySelector(".news-list__menu__selectors__my");

allMedia.addEventListener("click", onAllClick);
myMedia.addEventListener("click", onMyclick);

function onAllClick() {
    allMedia.dataset.selected = "yes";
    myMedia.dataset.selected = "no";
    categoryController();
}

function onMyclick() {
    allMedia.dataset.selected = "no";
    myMedia.dataset.selected = "yes";
    categoryController();
}

function categoryController() {
    const selected = changeSelected();
    const categoryData = chooseData(selected);
    changeCategoryUI(categoryData);
}

// data 어트리뷰트를 사용하여 선택된 카테고리를 가져온다.
function changeSelected() {
    const selected = document.querySelector("span[data-selected='yes']");
    const unselected = document.querySelector("span[data-selected='no']");

    selected.style.color = "black";
    unselected.style.color = "gray";
    
    return selected;
}

// 선택된 카테고리를 바탕으로 화면에 표시할 카테고리 데이터를 선택한다.
function chooseData(selected) {
    let categoryData;

    if (selected.innerText === "전체언론사") categoryData = news;
    else categoryData = subscribeInfo;

    console.log(categoryData)

    return categoryData;
}

// 표시할 데이터에 대한 DOM Element를 만들어 추가한다.
function changeCategoryUI(categoryData) {
    const parentNode = document.querySelector(".news-list__navbar");

    // 데이터 추가 전, 이전 데이터 삭제
    while(parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }

    Object.keys(categoryData).forEach((category, index) => {
        const childNode = document.createElement("li");

        if(index === 0) {
            childNode.dataset.selected = "yes";
            childNode.dataset.newsCount = categoryData[category].length;
            childNode.dataset.newsIndex = 1;
        }

        childNode.className = "news-list__navbar__category";
        childNode.innerHTML = category;
        parentNode.appendChild(childNode);
    })
}

categoryController();