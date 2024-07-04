import { renderSubscribedMedia } from "./subscribed-media.js";
import { renderTotalMedia } from "./total-media.js"

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
}

/**
 * @description 언론사 필터를 클릭했을때 호출되는 함수
 */
function clickMediaFilter(e) {
    const mediaId = e.target.id;

    renderMediaContents(mediaId)
}

/**
 * @description 필터에 맞는 언론사 콘텐츠를 렌더하는 함수
 */
function renderMediaContents(mediaId) {
    const filterMediaDOM = document.querySelector("#media-filter");

    if (mediaId === "total-media") {
        filterMediaDOM.dataset.selectedFilter = "total-media";
        renderTotalMedia();
    } else if (mediaId === "subscribed-media") {
        filterMediaDOM.dataset.selectedFilter = "subscribed-media";
        renderSubscribedMedia();
    }
}