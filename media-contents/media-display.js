import { renderSubscribedMedia } from "./subscribed-media.js";
import { renderTotalMedia } from "./total-media.js";

/**
 * @description 언론사 필터를 렌더하는 함수
 */
export function renderMediaDisplay() {
    /**
     * @NOTE 기본값으로 그리드가 보여짐
     */
    const mediaDisplayDOM = document.querySelector("#display-style");
    mediaDisplayDOM.addEventListener("click", clickMediaDisplay)
}

/**
 * @description 보기 형식을 클릭했을때 호출되는 함수
 */
function clickMediaDisplay(e) {
    const displayId = e.target.id;
    const mediaDisplayDOM = document.querySelector("#display-style");
    const mediaFilterDOM = document.querySelector("#media-filter");
    const selectedFilter = mediaFilterDOM.dataset.selectedFilter;

    if (displayId === "list-display") {
        setSelectedDisplay("list-display");
        setUnelectedDisplay("grid-display");
        
        mediaDisplayDOM.dataset.selectedDisplay = "list-display";
    } else if (displayId === "grid-display") {
        setSelectedDisplay("grid-display");
        setUnelectedDisplay("list-display");

        mediaDisplayDOM.dataset.selectedDisplay = "grid-display";
    }

    if (selectedFilter === "total-media") {
        renderTotalMedia();
    } else if (selectedFilter === "subscribed-media") {
        renderSubscribedMedia();
    }
}

/**
 * @description 선택된 보기 형식을 처리하는 함수
 */
function setSelectedDisplay(targetId) {
    const selectedDisplayDOM = document.querySelector(`#${targetId}`);
    const imgSrc = selectedDisplayDOM.src;
    const activeImgSrc = imgSrc.replace("-inactive", "-active");

    selectedDisplayDOM.src = activeImgSrc;
}
/**
 * @description 선택되지 않은 보기 형식을 처리하는 함수
 */
function setUnelectedDisplay(targetId) {
    const unselectedDisplayDOM = document.querySelector(`#${targetId}`);
    const imgSrc = unselectedDisplayDOM.src;
    const inactiveImgSrc = imgSrc.replace("-active", "-inactive");

    unselectedDisplayDOM.src = inactiveImgSrc;
}

/**
 * @description 그리드 레이아웃을 그려주는 함수
 */
export function renderGridLayout() {
    const gridLayoutDOM = document.querySelector(".media-contents__grid-layout");
    let gridLayoutDOMString = '';

    const horizontalGap = 96.5;
    const verticalGap = 154.5;

    new Array(3).fill().forEach((_, idx) => {
        gridLayoutDOMString += `<section class="media-contents__grid-horizontal-line" style="top: ${horizontalGap * (idx + 1)}px;"></section>`;
    });
    new Array(5).fill().forEach((_, idx) => {
        gridLayoutDOMString += `<section class="media-contents__grid-vertical-line" style="left: ${verticalGap * (idx + 1)}px;"></section>`;
    });

    gridLayoutDOM.innerHTML = gridLayoutDOMString;
}
