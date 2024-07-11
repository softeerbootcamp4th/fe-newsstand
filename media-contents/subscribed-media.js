import { subscribedMediaList } from "../store/subscribed-media.js";
import { getData } from "../utils/fetch.js";
import { getBoundNumber } from "../utils/get-number.js";
import { DATA_COUNT_PER_GRID, DEFAULT_MEDIA_INDEX, DEFAULT_PAGE } from "./constant.js";
import { 
    getSelectedCategoryItemDOMString,
    getUnselectedCategoryItemDOMString,
    getSelectedCategoryContentsDOMString,
    setSubscribeButtonEvent,
    getDisplayMode,
    getGridMediaItem,
    clickGridItem,
} from "./util.js";

let mediaDetailData = {};
let mediaListData = {};

/**
 * @description 구독한 언론사를 렌더링하는 함수
 */
export async function renderSubscribedMedia() {
    mediaDetailData = await getData('../static/data/media-detail.json');
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

        renderGridMedia(DEFAULT_PAGE);
    }

    setClickEvent();
}

/**
 * @description 클릭 이벤트를 붙여주는 함수
 */
function setClickEvent() {
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
     * 그리드 페이지 초기화
     */
    const gridBoxDOM = document.querySelector(".media-contents__grid-box");
    gridBoxDOM.dataset.gridPage = DEFAULT_PAGE;

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
    prevMediaButton.classList.remove("non-display");
    nextMediaButton.classList.remove("non-display");
}

/**
 * @description 화살표의 가시성 조절하는 함수
 */
function setArrowDisplayInGrid(page) {
    const prevMediaButton = document.querySelector(".media-contents__left-button");
    const nextMediaButton = document.querySelector(".media-contents__right-button");

    const lastPage = Math.floor((subscribedMediaList.getSubscribedMediaLength() - 1) / DATA_COUNT_PER_GRID);
    const maxPage = lastPage >= 4 ? 3 : lastPage;


    if (page === 0) {
        prevMediaButton.classList.add("non-display");
    } else {
        prevMediaButton.classList.remove("non-display");
    }
    if (page === maxPage) {
        nextMediaButton.classList.add("non-display");
    } else {
        nextMediaButton.classList.remove("non-display");
    }
}

/**
 * @description 내가 구독한 언론사를 그리드 형식으로 렌더링하는 함수
 */
function renderGridMedia(page) {
    const gridListDOM = document.querySelector(".media-contents__grid-list");

    let mediaListDOMString = '';
    subscribedMediaList.data.slice(page * DATA_COUNT_PER_GRID, (page + 1) * DATA_COUNT_PER_GRID).forEach((_media) => {
        mediaListDOMString += getGridMediaItem(_media);
    });

    gridListDOM.innerHTML = mediaListDOMString;

    subscribedMediaList.setCallback(() => renderGridMedia(page));
    setArrowDisplayInGrid(page);
}

/**
 * @description 내가 구독한 언론사를 리스트 형식으로 렌더링하는 함수
 */
function renderListMedia(mediaId) {
    const mediaListDOM = document.querySelector(".media-contents__category-list");
    const contentsBoxDOM = document.querySelector(".media-contents__contents-box");
    const subscribedMediaDetailList = subscribedMediaList.data.map((subscribed) => mediaDetailData.data.find((_media) => _media.id === subscribed.id))

    if (subscribedMediaList.getSubscribedMediaLength() === 0) {
        mediaListDOM.innerHTML = "";
        contentsBoxDOM.innerHTML = "";
        return;
    }

    /**
     * 언론사 카테고리 렌더링
     */
    const selectedMediaId = mediaId ?? subscribedMediaList.data[0].id;
    const _selectedMediaIdx = subscribedMediaList.data.findIndex((media) => media.id === selectedMediaId);
    const selectedMediaIdx = _selectedMediaIdx === -1 ? 0 : _selectedMediaIdx;

    let mediaListDOMString = ''
    subscribedMediaDetailList.forEach((_media, _mediaIdx) => {
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
    const contentsString = getSelectedCategoryContentsDOMString(subscribedMediaDetailList[selectedMediaIdx]);
    contentsBoxDOM.innerHTML = contentsString;

    subscribedMediaList.setCallback(() => renderListMedia(selectedMediaId));
    setSubscribeButtonEvent(subscribedMediaList.data[selectedMediaIdx]);
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

    renderListMedia(subscribedMediaList.data[mediaIdx].id);
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
    const mediaLength = subscribedMediaList.getSubscribedMediaLength();

    if (mediaLength === 0) {
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
        nextCategoryIdx = mediaLength - 1;
    } else if (nextCategoryIdx === mediaLength) {
        /**
         * 마지막 카테고리에 다다른 경우 첫 카테고리로 이동
         */
        nextCategoryIdx = 0;
    }

    selectedCategory.dataset.selectedCategoryIdx = nextCategoryIdx;
    const nextCategory = subscribedMediaList.data[nextCategoryIdx];
    renderListMedia(nextCategory.id);
}

/**
 * @description 그리드 보기에서 prev, next 버튼 클릭 동작을 수행하는 함수
 */
function clickGridNavigationButton(step) {
    const gridBoxDOM = document.querySelector(".media-contents__grid-box");
    const currentPage = parseInt(gridBoxDOM.dataset.gridPage);

    const media = subscribedMediaList.data.map((subscribed) => mediaListData.data.find((_media) => _media.id === subscribed.id));
    const mediaLength = media.length;
    const nextPage = getBoundNumber(currentPage + step, 0, Math.floor((mediaLength - 1) / DATA_COUNT_PER_GRID));

    gridBoxDOM.dataset.gridPage = nextPage;
    renderGridMedia(nextPage);
}

/**
 * @description 그리드 클릭 이벤트 리스너
 */
function clickGridList(e) {
    const displayMode = getDisplayMode();

    if (displayMode === "list-display") {
        return;
    }

    return clickGridItem(e, mediaListData.data);
}
