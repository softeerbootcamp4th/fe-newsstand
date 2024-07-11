import { subscribedMediaList } from "../store/subscribed-media.js";
import { getData } from "../utils/fetch.js";
import { getBoundNumber } from "../utils/get-number.js";
import { DATA_COUNT_PER_GRID, DEFAULT_CATEGORY_INDEX, DEFAULT_MEDIA_INDEX, DEFAULT_PAGE } from "./constant.js";
import { 
    getSelectedCategoryItemDOMString, 
    getUnselectedCategoryItemDOMString,
    getSelectedCategoryContentsDOMString,
    setSubscribeButtonEvent,
    getDisplayMode,
    getGridMediaItem,
    clickGridItem,
} from "./util.js";

let categoryData = {};
let mediaListData = {};

/**
 * @description 전체 언론사를 렌더링하는 함수
 */
export async function renderTotalMedia() {
    categoryData = await getData('../static/data/media-by-category.json');
    mediaListData = await getData('../static/data/media.json');

    const displayMode = getDisplayMode();

    const gridBoxDOM = document.querySelector(".media-contents__grid-box");
    const listBoxDOM = document.querySelector(".media-contents__list-box")

    if (displayMode === "list-display") {
        gridBoxDOM.classList.add("non-display");
        listBoxDOM.classList.remove("non-display");

        renderListMedia(DEFAULT_CATEGORY_INDEX, DEFAULT_MEDIA_INDEX);
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
 * @description 전체 언론사 화면이 사라질 때 관련 작업을 초기화해주는 함수
 */
export function resetTotalMedia() {
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
     * 카테고리 목록 이벤트 remove
     */
    const categoryListDOM = document.querySelector(".media-contents__category-list");
    categoryListDOM.removeEventListener('click', clickCategoryList);

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

    const lastPage = Math.floor((mediaListData.data.length - 1) / DATA_COUNT_PER_GRID);
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
 * @description 미디어 카테고리, 콘텐츠를 리스트 형식으로 렌더링하는 함수
 */
function renderGridMedia(page) {
    const media = mediaListData.data;
    const gridListDOM = document.querySelector(".media-contents__grid-list");

    let mediaListDOMString = '';
    media.slice(page * DATA_COUNT_PER_GRID, (page + 1) * DATA_COUNT_PER_GRID).forEach((_media) => {
        mediaListDOMString += getGridMediaItem(_media);
    });

    gridListDOM.innerHTML = mediaListDOMString;

    subscribedMediaList.setCallback(() => renderGridMedia(page));
    setArrowDisplayInGrid(page);
}

/**
 * @description 미디어 카테고리, 콘텐츠를 리스트 형식으로 렌더링하는 함수
 */
function renderListMedia(categoryIdx, mediaIdx) {
    const category = categoryData.data;
    const categoryListDOM = document.querySelector(".media-contents__category-list");

    /**
     * 미디어 카테고리 렌더링
     */
    let categoryListDOMString = ''
    category.forEach((_category, _categoryIdx) => {
        if (_categoryIdx === categoryIdx) {
            /**
             * 선택된 카테고리인 경우
             */
            categoryListDOMString += getSelectedCategoryItemDOMString(_category.categoryName, categoryIdx, mediaIdx, _category.length);
        } else {
            /**
             * 선택되지 않은 카테고리인 경우
             */
            categoryListDOMString += getUnselectedCategoryItemDOMString(_category.categoryName, _categoryIdx);
        }
    });
    categoryListDOM.innerHTML = categoryListDOMString;
    const progressAnimationDOM = document.querySelector(".media-contents__category-item-background");
    progressAnimationDOM.addEventListener("animationiteration", navigateNextMedia);

    /**
     * 카테고리 이벤트 이벤트 리스너 등록
     */
    categoryListDOM.addEventListener('click', clickCategoryList);

    /**
     * 선택된 카테고리의 콘텐츠 렌더링
     */
    const contentsBoxDOM = document.querySelector(".media-contents__contents-box");
    const contentsString = getSelectedCategoryContentsDOMString(category[categoryIdx].media[mediaIdx]);
    contentsBoxDOM.innerHTML = contentsString;

    subscribedMediaList.setCallback(() => renderListMedia(categoryIdx, mediaIdx));
    setSubscribeButtonEvent(category[categoryIdx].media[mediaIdx]);
}

/**
 * @description 카테고리를 클릭했을 때 해당 카테고리로 이동하는 함수
 */
function clickCategoryList(e) {
    /**
     * category list DOM을 클릭하면 리스트 아이템으로 이벤트 위임이 되고, 해당 리스트 아이템 카테고리로 이동
     */
    const categoryIdx = parseInt(e.target.dataset.categoryIdx);
    if (isNaN(categoryIdx)) {
        /**
         * 잘못된 영역을 클릭한 경우
         */
        return;
    }

    renderListMedia(categoryIdx, 0);
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
    const category = categoryData.data;
    const selectedCategory = document.querySelector(".media-contents__category-item--selected");

    const selectedCategoryIdx = parseInt(selectedCategory.dataset.selectedCategoryIdx);
    const selectedMediaIdx = parseInt(selectedCategory.dataset.selectedMediaIdx);

    const currentCategory = category[selectedCategoryIdx];

    /**
     * 이전/다음 언론사 콘텐츠로 이동
     */
    const nextMediaIdx = selectedMediaIdx + step;
    if (nextMediaIdx >= 0 && nextMediaIdx < currentCategory.length) {
        selectedCategory.dataset.selectedMediaIdx = nextMediaIdx;
    } else if (nextMediaIdx < 0) {
        const prevCategoryIdx = selectedCategoryIdx - 1;
        if (prevCategoryIdx < 0) {
            /**
             * 첫 카테고리에 다다른 경우 마지막 카테고리로 이동
             */
            const categoryIdx = categoryData.length - 1;
            selectedCategory.dataset.selectedCategoryIdx = categoryIdx;
            selectedCategory.dataset.selectedMediaIdx = category[categoryIdx].length - 1;
        } else {
            selectedCategory.dataset.selectedCategoryIdx = prevCategoryIdx;
            selectedCategory.dataset.selectedMediaIdx = category[prevCategoryIdx].length - 1;
        }
    } else if (nextMediaIdx === currentCategory.length) {
        const nextCategoryIdx = selectedCategoryIdx + 1;
        if (nextCategoryIdx === categoryData.length) {
            /**
             * 마지막 카테고리에 다다른 경우 첫 카테고리로 이동
             */
            selectedCategory.dataset.selectedCategoryIdx = 0;
            selectedCategory.dataset.selectedMediaIdx = 0;
        } else {
            selectedCategory.dataset.selectedCategoryIdx = nextCategoryIdx;
            selectedCategory.dataset.selectedMediaIdx = 0;
        }
    }

    const categoryIdxNumber = parseInt(selectedCategory.dataset.selectedCategoryIdx);
    const mediaIdxNumber = parseInt(selectedCategory.dataset.selectedMediaIdx);
    renderListMedia(categoryIdxNumber, mediaIdxNumber);
}

/**
 * @description 그리드 보기에서 prev, next 버튼 클릭 동작을 수행하는 함수
 */
function clickGridNavigationButton(step) {
    const gridBoxDOM = document.querySelector(".media-contents__grid-box");
    const currentPage = parseInt(gridBoxDOM.dataset.gridPage);

    const mediaLength = mediaListData.length;
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
