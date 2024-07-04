import allNews from "../data/allNews.js";
import subscribedNews from "../data/subscribedNews.js";

function mediaListController(categoryData) {
    const mediaList = getMediaList();
    addEvents(mediaList, categoryData);
}

function getMediaList() {
    return document.querySelectorAll(".news-list__navbar__category");
}
// 각 언론사 요소에 클릭 이벤트를 설정한다.
function addEvents(mediaList, categoryData) {
    mediaList.forEach((media) => {
        media.addEventListener("click", (event) => mediaClickHandler(event, categoryData)); 
    });
}
// 클릭 시, data 어트리뷰트를 활용하여 선택된 요소를 알 수 있도록 한다.
function mediaClickHandler(event, categoryData) {
    // selected를 yes로 바꾸기 전 이전 선택된 값을 지우기 위해 모든 값을 selected no로 바꾼다.
    resetSelected(event.currentTarget.parentElement.children);
    event.currentTarget.dataset.selected = "yes";
    event.currentTarget.dataset.newsCount = categoryData[event.currentTarget.innerText].length;
    event.currentTarget.dataset.newsIndex = 1;
}

function resetSelected(mediaList) {
    [...mediaList].forEach((media) => {
        media.dataset.selected = "no";
    })
}

export { mediaListController }
