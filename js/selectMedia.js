import { newsListController } from "./newsList.js";

function mediaListController(categoryData) {
    const mediaList = getMediaList();
    addMediaListClickEvent(mediaList, categoryData);

    const selectedMedia = getSelectedMedia();
    const selectedMediaIndex = getSelectedMediaIndex(selectedMedia);

    addNewsListButtonEvent(categoryData);

    newsListController(categoryData[selectedMedia.innerText], selectedMediaIndex);
}

function getMediaList() {
    return document.querySelectorAll(".news-list__navbar__category");
}

function getSelectedMedia() {
    return document.querySelector(".news-list__navbar__category[data-selected='yes']")
}

function getSelectedMediaIndex(selectedMedia) {
    return selectedMedia.dataset.newsIndex;
}

// 각 언론사 요소에 클릭 이벤트를 설정한다.
function addMediaListClickEvent(mediaList, categoryData) {
    mediaList.forEach((media) => {
        media.addEventListener("click", (event) => mediaClickHandler(event, categoryData)); 
    });
}

// 클릭 시, data 어트리뷰트를 활용하여 선택된 요소를 알 수 있도록 한다.
function mediaClickHandler(event, categoryData) {
    resetSelected(event.currentTarget.parentElement.children);
    event.currentTarget.dataset.selected = "yes";
    event.currentTarget.dataset.newsCount = categoryData[event.currentTarget.innerText].length;
    event.currentTarget.dataset.newsIndex = 1;

    const selectedMedia = getSelectedMedia();
    const selectedMediaIndex = getSelectedMediaIndex(selectedMedia);

    newsListController(categoryData[selectedMedia.innerText], selectedMediaIndex);
}

// selected를 yes로 바꾸기 전 이전 선택된 값을 지우기 위해 모든 값을 selected no로 바꾼다.
function resetSelected(mediaList) {
    [...mediaList].forEach((media) => {
        media.dataset.selected = "no";
    })
}

// 뉴스 목록 버튼 클릭 핸들러 추가
function addNewsListButtonEvent(categoryData) {
    const leftButton = document.querySelector(".news-list__btn-left");
    const rightButton = document.querySelector(".news-list__btn-right");

    leftButton.addEventListener("click", (event) => leftButtonHandler(event, categoryData));
    rightButton.addEventListener("click", (event) => rightButtonHandler(event, categoryData));
}

function leftButtonHandler(event, categoryData) {
    const selectedMedia = getSelectedMedia();
    const selectedMediaIndex = getSelectedMediaIndex(selectedMedia);

    if (selectedMediaIndex === "1") {
        const previousElement = selectedMedia.previousElementSibling;

        if (previousElement) {
            const mediaList = getMediaList();
            resetSelected(mediaList);
            previousElement.dataset.selected = "yes";
            previousElement.dataset.newsCount = categoryData[previousElement.innerText].length;
            previousElement.dataset.newsIndex = previousElement.dataset.newsCount;
        } 
    } else {
        selectedMedia.dataset.newsIndex--;
    }   

    const changedMedia = getSelectedMedia();
    const changedMediaIndex = getSelectedMediaIndex(changedMedia);
    newsListController(categoryData[changedMedia.innerText], changedMediaIndex);
}

function rightButtonHandler(event, categoryData) {
    const selectedMedia = getSelectedMedia();
    const selectedMediaIndex = getSelectedMediaIndex(selectedMedia);

    if (selectedMediaIndex === selectedMedia.dataset.newsCount) {
        const nextElement = selectedMedia.nextElementSibling;

        if (nextElement) {
            const mediaList = getMediaList();
            resetSelected(mediaList);
            nextElement.dataset.selected = "yes";
            nextElement.dataset.newsCount = categoryData[nextElement.innerText].length;
            nextElement.dataset.newsIndex = 1;
        } 
    } else {
        selectedMedia.dataset.newsIndex++;
    }   

    const changedMedia = getSelectedMedia();
    const changedMediaIndex = getSelectedMediaIndex(changedMedia);
    newsListController(categoryData[changedMedia.innerText], changedMediaIndex);
}

export { mediaListController }