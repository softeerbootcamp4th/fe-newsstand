import { getData } from "../utils/fetch.js";
import { getBoundNumber } from "../utils/get-number.js";
import { getItem } from "../utils/local-storage.js";
import { 
    getSelectedCategoryItemDOMString,
    getUnselectedCategoryItemDOMString,
    getSelectedCategoryContentsDOMString,
    setSubscribeButtonEvent,
    getDisplayMode,
    getGridMediaItem,
    clickGridItem,
} from "./util.js";

const DEFAULT_MEDIA_INDEX = 0;
const DEFAULT_PAGE = 0;

let mediaData = {};
let mediaListData = {};

/**
 * @description 구독한 언론사를 렌더링하는 함수
 */
export async function renderSubscribedMedia() {
    mediaData = await getData('../static/data/media-detail.json');
    mediaListData = await getData('../static/data/media.json');

    const displayMode = getDisplayMode();

    const gridBoxDOM = document.querySelector(".media-contents__grid-box");
    const listBoxDOM = document.querySelector(".media-contents__list-box")

    if (displayMode === "list-display") {
        gridBoxDOM.classList.add("non-display");
        listBoxDOM.classList.remove("non-display");

        renderListMedia();
    } else if (displayMode === "grid-display") {
        gridBoxDOM.classList.remove("non-display");
        listBoxDOM.classList.add("non-display");

        gridBoxDOM.dataset.gridPage = DEFAULT_PAGE;
        renderGridMedia(DEFAULT_PAGE);
    }

    /**
     * prev, next 버튼 클릭 시 언론사 이동 이벤트
     */
    const prevMediaButton = document.querySelector(".media-contents__left-button");
    const nextMediaButton = document.querySelector(".media-contents__right-button");

    prevMediaButton.addEventListener("click", navigatePrevMedia);
    nextMediaButton.addEventListener("click", navigateNextMedia);

    /**
     * 그리드 목록 클릭 이벤트
     */
    const gridListDOM = document.querySelector(".media-contents__grid-list");   
    gridListDOM.addEventListener("click", clickGridList);    
}

/**
 * @description 내가 구독한 언론사 화면이 사라질 때 관련 작업을 초기화해주는 함수
 */
export function resetSubscribedMedia() {
    /**
     * 그리드 리스트 클릭 이벤트 remove
     */
    const gridListDOM = document.querySelector(".media-contents__grid-list");
    gridListDOM.removeEventListener("click", clickGridList);

    /**
     * 미디어 카테고리 이벤트 초기화
     */
    const mediaListDOM = document.querySelector(".media-contents__category-list");
    mediaListDOM.removeEventListener('click', clickMediaList);

    /**
     * 화살표 이벤트 초기화
     */
    const prevMediaButton = document.querySelector(".media-contents__left-button");
    const nextMediaButton = document.querySelector(".media-contents__right-button");

    prevMediaButton.removeEventListener("click", navigatePrevMedia);
    nextMediaButton.removeEventListener("click", navigateNextMedia);
}


/**
 * @description 내가 구독한 언론사를 그리드 형식으로 렌더링하는 함수
 */
function renderGridMedia(page) {
    const gridListDOM = document.querySelector(".media-contents__grid-list");

    const subscribeIdList = getItem("newsstand-subscribe") ?? [];
    const media = subscribeIdList.map((subscribedId) => mediaListData.data.find((_media) => _media.id === subscribedId));

    let mediaListDOMString = '';
    media.slice(page * 24, (page + 1) * 24).forEach((_media) => {
        mediaListDOMString += getGridMediaItem(_media);
    });

    gridListDOM.innerHTML = mediaListDOMString;
}

/**
 * @description 내가 구독한 언론사를 리스트 형식으로 렌더링하는 함수
 */
function renderListMedia(mediaId) {
    const media = mediaData.data;
    const subscribeIdList = getItem("newsstand-subscribe") ?? [];
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

    let mediaListDOMString = ''
    subscribedMediaList.forEach((_media, _mediaIdx) => {
        if (_mediaIdx === selectedMediaIdx) {
            /**
             * 선택된 카테고리인 경우
             */
            mediaListDOMString += getSelectedCategoryItemDOMString(_media.name, _mediaIdx, DEFAULT_MEDIA_INDEX);
        } else {
            /**
             * 선택되지 않은 카테고리인 경우
             */
            mediaListDOMString += getUnselectedCategoryItemDOMString(_media.name, _mediaIdx);
        }
    });
    mediaListDOM.innerHTML = mediaListDOMString;
    const progressAnimationDOM = document.querySelector(".media-contents__category-item-background");
    progressAnimationDOM.addEventListener("animationiteration", navigateNextMedia);

    /**
     * 카테고리 이벤트 리스너 등록
     */
    mediaListDOM.addEventListener('click', clickMediaList);

    /**
     * 선택된 카테고리의 콘텐츠 렌더링
     */
    const contentsString = getSelectedCategoryContentsDOMString(subscribedMediaList[selectedMediaIdx]);
    contentsBoxDOM.innerHTML = contentsString;

    setSubscribeButtonEvent(subscribedMediaList[selectedMediaIdx], () => renderListMedia(selectedMediaId));
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

    const subscribeIdList = getItem("newsstand-subscribe") ?? [];
    const mediaId = subscribeIdList.find((_, idx) => idx === mediaIdx);

    renderListMedia(mediaId);
}

/**
 * @description 다음 페이지로 이동하는 함수
 */
function navigateNextMedia() {
    const displayMode = getDisplayMode();

    if (displayMode === "list-display") {
        clickListNavigationButton(1);
    } else if (displayMode === "grid-display") {
        clickGridNavigationButton(1);
    }
}
/**
 * @description 이전 페이지로 이동하는 함수
 */
function navigatePrevMedia() {
    const displayMode = getDisplayMode();

    if (displayMode === "list-display") {
        clickListNavigationButton(-1);
    } else if (displayMode === "grid-display") {
        clickGridNavigationButton(-1);
    }
}

/**
 * @description 리스트 보기에서 prev, next 버튼 클릭 동작을 수행하는 함수
 */
function clickListNavigationButton(step) {
    const subscribeIdList = getItem("newsstand-subscribe") ?? [];

    if (subscribeIdList.length === 0) {
        return;
    }

    const selectedCategory = document.querySelector(".media-contents__category-item--selected");
    const selectedCategoryIdx = parseInt(selectedCategory.dataset.selectedCategoryIdx);

    /**
     * 이전/다음 언론사 콘텐츠로 이동
     */
    let nextCategoryIdx = selectedCategoryIdx + step;
    if (nextCategoryIdx < 0) {
        /**
         * 첫 카테고리에 다다른 경우 마지막 카테고리로 이동
         */
        nextCategoryIdx = subscribeIdList.length - 1;
    } else if (nextCategoryIdx === subscribeIdList.length) {
        /**
         * 마지막 카테고리에 다다른 경우 첫 카테고리로 이동
         */
        nextCategoryIdx = 0;
    }

    selectedCategory.dataset.selectedCategoryIdx = nextCategoryIdx;
    const nextCategoryId = subscribeIdList[nextCategoryIdx];
    renderListMedia(nextCategoryId);
}

/**
 * @description 그리드 보기에서 prev, next 버튼 클릭 동작을 수행하는 함수
 */
function clickGridNavigationButton(step) {
    const gridBoxDOM = document.querySelector(".media-contents__grid-box");
    const currentPage = parseInt(gridBoxDOM.dataset.gridPage);

    const subscribeIdList = getItem("newsstand-subscribe") ?? [];
    const media = subscribeIdList.map((subscribedId) => mediaListData.data.find((_media) => _media.id === subscribedId));
    const mediaLength = media.length;
    const nextPage = getBoundNumber(currentPage + step, 0, Math.floor((mediaLength - 1) / 24));

    gridBoxDOM.dataset.gridPage = nextPage;
    renderGridMedia(nextPage);
}

function clickGridList(e) {
    const displayMode = getDisplayMode();

    if (displayMode === "list-display") {
        return;
    }
    const gridBoxDOM = document.querySelector(".media-contents__grid-box");
    const currentPage = parseInt(gridBoxDOM.dataset.gridPage);

    return clickGridItem(e, mediaListData.data, () => renderGridMedia(currentPage));
}
