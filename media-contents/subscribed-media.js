import { CONTENTS_BY_MEDIA } from "../static/data/media.js";
import { REMOVE_MEDIA_CATEGORY, removeTotalCategoryEvent } from "../utils/events.js";
import { 
    getSelectedCategoryItemDOMString, 
    getUnselectedCategoryItemDOMString,
    getSelectedCategoryContentsDOMString,
    setSubscribeButtonEvent,
} from "./util.js";

/**
 * @description 구독한 언론사를 렌더링하는 함수
 */
export function renderSubscribedMedia() {
    renderMedia();
}

function renderMedia(mediaId) {
    const media = CONTENTS_BY_MEDIA.data;

    const subscribeIdList = JSON.parse(localStorage.getItem("newsstand-subscribe") ?? "[]");
    const subscribedMediaList = subscribeIdList.map((subscribed) => media.find((_media) => _media.id === subscribed));

    const mediaListDOM = document.querySelector(".media-contents__category-list");
    const contentsBoxDOM = document.querySelector(".media-contents__contents-box");

    if (subscribedMediaList.length === 0) {
        mediaListDOM.innerHTML = "";
        contentsBoxDOM.innerHTML = "";
        return;
    }

    /**
     * 언론사 카테고리 렌더링
     */
    const selectedMediaId = mediaId ?? subscribeIdList[0];
    const _selectedMediaIdx = subscribedMediaList.findIndex((media) => media.id === selectedMediaId);
    const selectedMediaIdx = _selectedMediaIdx === -1 ? 0 : _selectedMediaIdx;

    mediaListDOM.innerHTML = "";
    subscribedMediaList.forEach((_media, _mediaIdx) => {
        if (_mediaIdx === selectedMediaIdx) {
            /**
             * 선택된 카테고리인 경우
             */
            mediaListDOM.innerHTML += getSelectedCategoryItemDOMString(_media.name, _mediaIdx, 0);
        } else {
            /**
             * 선택되지 않은 카테고리인 경우
             */
            mediaListDOM.innerHTML += getUnselectedCategoryItemDOMString(_media.name, _mediaIdx);
        }
    });

    /**
     * 카테고리 이벤트 초기화 후 이벤트 리스너 등록
     */
    document.addEventListener(REMOVE_MEDIA_CATEGORY, () => mediaListDOM.removeEventListener('click', clickMediaList))
    document.dispatchEvent(removeTotalCategoryEvent);
    mediaListDOM.addEventListener('click', clickMediaList);

    /**
     * 선택된 카테고리의 콘텐츠 렌더링
     */
    const contentsString = getSelectedCategoryContentsDOMString(subscribedMediaList[selectedMediaIdx]);
    contentsBoxDOM.innerHTML = contentsString;

    setSubscribeButtonEvent(subscribedMediaList[selectedMediaIdx], () => renderMedia(selectedMediaIdx, 0));
}

/**
 * @description 언론사를 클릭했을 때 해당 언론사로 이동하는 함수
 */
function clickMediaList(e) {
    /**
     * media list DOM을 클릭하면 리스트 아이템으로 이벤트 위임이 되고, 해당 리스트 아이템 카테고리로 이동
     */
    const mediaIdx = parseInt(e.target.dataset.categoryIdx);
    if (isNaN(mediaIdx)) {
        /**
         * 잘못된 영역을 클릭한 경우
         */
        return;
    }

    const subscribeIdList = JSON.parse(localStorage.getItem("newsstand-subscribe") ?? "[]");
    const mediaId = subscribeIdList.find((_, idx) => idx === mediaIdx);

    renderMedia(mediaId);
}
