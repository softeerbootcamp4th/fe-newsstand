import { renderSubscribedMedia, resetSubscribedMedia } from "./subscribed-media.js";
import { renderTotalMedia, resetTotalMedia } from "./total-media.js"

/**
 * @description 언론사 필터를 렌더하는 함수
 */
export function renderMediaFilter() {
    /**
     * @NOTE 기본값으로 전체 언론사가 보여짐
     */
    renderMediaContents("total-media");

    const filterMediaDOM = document.querySelector("#media-filter");
    filterMediaDOM.addEventListener("click", clickMediaFilter)

    setDragCategory();
}

/**
 * @description 언론사 필터를 클릭했을때 호출되는 함수
 */
function clickMediaFilter(e) {
    const mediaId = e.target.id;

    renderMediaContents(mediaId);
}

/**
 * @description 필터에 맞는 언론사 콘텐츠를 렌더하는 함수
 */
function renderMediaContents(mediaId) {
    if (mediaId === "total-media") {
        setTotalMedia();
        renderTotalMedia();
    } else if (mediaId === "subscribed-media") {
        setSubscribedMedia();
        renderSubscribedMedia();
    }
}

/**
 * @description 전체 언론사로 전환해주는 함수
 */
export function setTotalMedia() {
    const filterMediaDOM = document.querySelector("#media-filter");

    setSelectedMedia("total-media");
    setUnselectedMedia("subscribed-media");

    filterMediaDOM.dataset.selectedFilter = "total-media";

    resetSubscribedMedia();
}
/**
 * @description 내가 구독한 언론사로 전환해주는 함수
 */
export function setSubscribedMedia() {
    const filterMediaDOM = document.querySelector("#media-filter");

    setSelectedMedia("subscribed-media");
    setUnselectedMedia("total-media");

    filterMediaDOM.dataset.selectedFilter = "subscribed-media";

    resetTotalMedia();
}

/**
 * @description 선택된 언론사 카테고리에 css 부여하는 함수
 */
function setSelectedMedia(id) {
    const selectedMediaDOM = document.querySelector(`#${id}`);
    selectedMediaDOM.classList.add("media--selected");
    selectedMediaDOM.classList.remove("media--unselected");
}
/**
 * @description 선택되지 않은 언론사 카테고리에 css 부여하는 함수
 */
function setUnselectedMedia(id) {
    const unselectedMediaDOM = document.querySelector(`#${id}`);
    unselectedMediaDOM.classList.add("media--unselected");
    unselectedMediaDOM.classList.remove("media--selected");
}

/**
 * @description 카테고리 데이터가 DOM의 크기를 벗어날 때 드래그로 스크롤 가능하도록 이벤트를 부여하는 함수
 */
function setDragCategory() {
    const categoryListDOM = document.querySelector(".media-contents__category-list");
    let throttle = null, prevX = -1;

    function moveMouse(e) {
        if (throttle !== null) {
            return;
        }

        throttle = setTimeout(() => {
            if (prevX !== -1) {
                const diffByPrevX = prevX - e.x;
                categoryListDOM.scrollBy({ left: diffByPrevX, behavior: "smooth" });
            }
            
            prevX = e.x;
            throttle = null;
        }, 100);
    }

    categoryListDOM.addEventListener("mousedown", () => {
        categoryListDOM.addEventListener("mousemove", moveMouse);
    });
    document.addEventListener("mouseup", () => {
        categoryListDOM.removeEventListener("mousemove", moveMouse);
    });
}